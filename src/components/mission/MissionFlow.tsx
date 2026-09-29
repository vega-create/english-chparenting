'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import GameButton from '@/components/GameButton';
import { stopAllAudio } from '@/lib/audioBus';
import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import { stopSpeaking } from '@/lib/speech';
import { getLevelFromMissionId, playVega, stepAudio, CHAR_CUE_AUDIO } from '@/lib/vega-audio';
import { wordSlug, buildLessonAudioIndex } from '@/lib/audio';

// 單字卡小圖：有去背 PNG 就用圖，沒有用 emoji
function WordImg({ en, emoji }: { en: string; emoji: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // SSR 時圖若已載入失敗（naturalWidth=0），onError 可能沒觸發 → 掛載後補判
    if (ref.current && ref.current.complete && ref.current.naturalWidth === 0) setOk(false);
  }, []);
  return ok
    ? <img ref={ref} src={`/words/${wordSlug(en)}.png`} alt={en} onError={() => setOk(false)} className="w-full h-full object-contain" />
    : <span className="text-[2.4rem] leading-none">{emoji}</span>;
}
import Welcome from '@/components/mission/Welcome';
import WakeUp from '@/components/mission/WakeUp';
import Discover from '@/components/mission/Discover';
import Challenge from '@/components/mission/Challenge';
import ParentHelp from '@/components/mission/ParentHelp';
import TalkTime from '@/components/mission/TalkTime';
import { activeKid } from '@/lib/kids';
import MissionComplete, { PASS_PERCENT } from '@/components/mission/MissionComplete';
import FixRound, { type FixKind } from '@/components/mission/FixRound';
import AdSlot from '@/components/AdSlot';
import { bumpDaily } from '@/lib/missionProgress';
import { track } from '@/lib/analytics';

// fix＝訂正回合：沒過關時只把錯的／跳過的題目再做一次（在 talktime 和 complete 之間）
type Step = 'intro' | 'welcome' | 'wakeup' | 'discover' | 'challenge' | 'talktime' | 'fix' | 'complete';

/** sessionStorage 讀回來的題號清單：只收非負整數，壞資料當空的 */
function idxList(v: unknown): number[] {
  return Array.isArray(v) ? [...new Set(v.filter((x): x is number => Number.isInteger(x) && x >= 0))] : [];
}

const STEPS: { key: Step; label: string; icon: string; color: string }[] = [
  { key: 'wakeup', label: 'Wake Up!', icon: '🔔', color: 'bg-yellow-400' },
  { key: 'discover', label: 'Discover', icon: '📖', color: 'bg-blue-400' },
  { key: 'challenge', label: 'Challenge', icon: '🎮', color: 'bg-orange-400' },
  { key: 'talktime', label: 'Talk Time', icon: '💬', color: 'bg-indigo-400' },
  { key: 'complete', label: 'Done!', icon: '⭐', color: 'bg-green-400' },
];

interface Props {
  levelSlug: string;
  missionId: number;
}

export default function MissionFlow({ levelSlug, missionId }: Props) {
  const course = COURSES.find(c => c.slug === levelSlug);
  const mission = MISSIONS.find(m => m.level === course?.level && m.id === missionId);

  const [step, setStep] = useState<Step>('intro');
  // 換步驟（熱身→探索→挑戰…）先把聲音停乾淨
  useEffect(() => { stopAllAudio(); }, [step]);
  const [warmupScore, setWarmupScore] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [sentenceOk, setSentenceOk] = useState(0);   // 句子練習真的念過關的句數（跳過不算）
  const [talkOk, setTalkOk] = useState(0);           // 聊天關真的回答的題數（跳過不算）
  const [retrying, setRetrying] = useState(false);   // 沒過關重玩：從句子練習開始（沒有錯題清單可訂正時的備案）
  // 還沒答對的題號（整課原本的題號）：沒過關時「只訂正錯的題目」用
  const [missedS, setMissedS] = useState<number[]>([]);   // 句子練習跳過的
  const [missedC, setMissedC] = useState<number[]>([]);   // 闖關答錯的（含口說跳過）
  const [missedT, setMissedT] = useState<number[]>([]);   // 聊天關跳過的
  // 訂正回合補回來的題號（每訂正一題加 1 分）；有值＝這次是靠訂正過關的，星星固定 1 顆
  const [fixed, setFixed] = useState<Record<FixKind, number[]>>({ s: [], c: [], t: [] });
  const discoverBackRef = useRef<(() => boolean) | null>(null); // Discover 內部逐層退

  const stepKey = course && mission ? `ae_mstep_${course.level}_${mission.id}` : '';

  // 沒過關的成績與錯題清單：存在 localStorage（每個孩子、每一課各一份），留 14 天
  const pendingKey = () => {
    if (!course || !mission) return '';
    let kid = 'x';
    try { kid = activeKid().id; } catch {}
    return `ae_fixpending_${kid}_${course.level}_${mission.id}`;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readPending = (): any | null => {
    try {
      const k = pendingKey();
      const v = k ? JSON.parse(localStorage.getItem(k) || 'null') : null;
      if (!v || !v.at || Date.now() - v.at > 14 * 24 * 3600 * 1000) { if (k && v) localStorage.removeItem(k); return null; }
      const left = idxList(v.ms).length + idxList(v.mc).length + idxList(v.mt).length;
      return left > 0 ? v : null;
    } catch { return null; }
  };
  const clearPending = () => { try { const k = pendingKey(); if (k) localStorage.removeItem(k); } catch {} };

  // 重整後留在同一步驟（sessionStorage，關掉分頁才清）
  // 但破關後再進來＝想重玩，從頭開始（不然會直接跳到結算畫面，Vega 抓的）
  useEffect(() => {
    if (!stepKey) return;
    const saved = sessionStorage.getItem(stepKey) as Step | null;
    // 上次沒過關、還有題目沒訂正：隔天（或關掉分頁）再進同一課，直接回到「再答對 N 題就過關」畫面接著訂正
    if (!saved || saved === 'complete') {
      const pend = readPending();
      if (pend) {
        setWarmupScore(pend.w || 0); setChallengeScore(pend.c || 0); setSentenceOk(pend.s || 0); setTalkOk(pend.t || 0);
        setMissedS(idxList(pend.ms)); setMissedC(idxList(pend.mc)); setMissedT(idxList(pend.mt));
        setFixed({ s: idxList(pend.fx?.s), c: idxList(pend.fx?.c), t: idxList(pend.fx?.t) });
        setStep('complete');
        return;
      }
    }
    if (saved === 'complete') { sessionStorage.removeItem(stepKey); return; }
    if (saved) setStep(saved);
    // 分數也要跟著留著：現在有過關標準，重整後分數歸零會害孩子明明答對卻不過
    try {
      const sc = JSON.parse(sessionStorage.getItem(stepKey + '_sc') || 'null');
      if (sc && saved) {
        setWarmupScore(sc.w || 0); setChallengeScore(sc.c || 0); setSentenceOk(sc.s || 0); setTalkOk(sc.t || 0);
        // 錯題清單和訂正進度也要留著，不然訂正到一半重整就不知道還剩哪幾題
        setMissedS(idxList(sc.ms)); setMissedC(idxList(sc.mc)); setMissedT(idxList(sc.mt));
        setFixed({ s: idxList(sc.fx?.s), c: idxList(sc.fx?.c), t: idxList(sc.fx?.t) });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey]);

  useEffect(() => {
    if (!stepKey) return;
    try { sessionStorage.setItem(stepKey + '_sc', JSON.stringify({ w: warmupScore, c: challengeScore, s: sentenceOk, t: talkOk, ms: missedS, mc: missedC, mt: missedT, fx: fixed })); } catch {}
  }, [stepKey, warmupScore, challengeScore, sentenceOk, talkOk, missedS, missedC, missedT, fixed]);

  useEffect(() => {
    if (stepKey) sessionStorage.setItem(stepKey, step);
  }, [stepKey, step]);

  // Stop TTS on step change and unmount
  useEffect(() => {
    return () => stopSpeaking();
  }, [step]);

  // 學習行為記錄：每個步驟停留多久（家長沒同意就不會寫入）
  const stepStart = useRef<number>(Date.now());
  const lessonStart = useRef<number>(Date.now());
  const reachedComplete = useRef(false);

  // 中途離開：關頁／切走時還沒走到破關，就記一筆 abandon
  // （流失分析要的是「在哪一步放棄」，不是只知道沒完成）
  useEffect(() => {
    if (!course || !mission) return;
    const bail = () => {
      if (reachedComplete.current) return;
      track({
        kind: 'abandon',
        level: mission.level, mission: mission.id, step,
        ms: Date.now() - lessonStart.current,
      });
      reachedComplete.current = true;   // 只記一次，切走再切回來不重複
    };
    window.addEventListener('pagehide', bail);
    return () => window.removeEventListener('pagehide', bail);
  }, [course, mission, step]);
  useEffect(() => {
    stepStart.current = Date.now();
    if (!course || !mission) return;
    if (step === 'intro') {
      track({ kind: 'lesson_start', level: mission.level, mission: mission.id });
    }
    return () => {
      if (!course || !mission) return;
      track({
        kind: step === 'complete' ? 'lesson_end' : 'session',
        level: mission.level, mission: mission.id, step,
        ms: Date.now() - stepStart.current,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // 進到每個步驟時播 Vega 引導語 + 該關負責角色的口號
  const lang = course && course.level <= 4 ? 'low' : 'high';
  useEffect(() => {
    if (!course) return;
    const cue: Partial<Record<Step, string>> = {
      discover: CHAR_CUE_AUDIO.read,    // Benny 帶讀
      challenge: CHAR_CUE_AUDIO.listen, // Coco 帶聽
      talktime: CHAR_CUE_AUDIO.speak,   // Polly 帶說
    };
    if (step === 'intro' || step === 'welcome' || step === 'fix') return;   // 訂正回合沒有專屬引導語
    let cancelled = false;
    (async () => {
      await playVega(stepAudio(step as 'wakeup' | 'discover' | 'challenge' | 'talktime' | 'complete', lang));
      if (!cancelled && cue[step]) playVega(cue[step]!, { interrupt: false });
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, lang]);

  if (!course || !mission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <img src="/characters/finn/finn-normal.png" alt="Finn" className="w-24 h-24 mx-auto mb-4 object-contain" />
          <p className="text-xl text-gray-600">找不到這個任務</p>
          <a href={`/courses/${levelSlug}`} className="text-blue-500 underline mt-4 inline-block">
            回到課程
          </a>
        </div>
      </div>
    );
  }

  // 該課「文字→錄音」對照：讓答案是整句的題目也能播真人錄音
  const audioIndex = buildLessonAudioIndex(mission.level, mission.id, mission.story, mission.sentences);

  // 訂正回合在進度條上算在最後一格（⭐ 那格暫時換成 ✏️）
  const currentStepIndex = STEPS.findIndex(s => s.key === (step === 'fix' ? 'complete' : step));
  // 暖身補到 8 題（Vega 定案）：原本 3 題不動，用本課單字自動加聽力選字題
  const warmUp8 = useMemo(() => {
    const base = [...mission.warmUpQuestions];
    const pool = mission.words.filter(w => w.en && /^[A-Za-z' -]{1,20}$/.test(w.en));
    if (pool.length < 3) return base;
    const extras = [...pool].sort(() => Math.random() - 0.5).map(w => {
      const distract = pool.filter(x => x.en !== w.en).sort(() => Math.random() - 0.5).slice(0, 2).map(x => x.en);
      return {
        type: 'listen-pick' as const,
        question: '🔊 聽聽看，你聽到哪個單字？',
        options: [w.en, ...distract].sort(() => Math.random() - 0.5),
        answer: w.en,
      };
    });
    return [...base, ...extras].slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission]);

  // 過關成績＝句子練習＋闖關＋聊天關（口說跳過的不給分）。
  // 暖身題在上課「前」作答，那時還沒學，所以只加小星星、不算進正確率。
  // 訂正回合每訂正一題加 1 分，各部分都不會超過該部分的題數。
  const sentenceMax = mission.sentences.length;
  const talkMax = mission.talkTimePrompts.length;
  const challengeMax = mission.challenges.length;
  const scored = Math.min(challengeScore + fixed.c.length, challengeMax)
    + Math.min(sentenceOk + fixed.s.length, sentenceMax)
    + Math.min(talkOk + fixed.t.length, talkMax);
  const scoredMax = challengeMax + sentenceMax + talkMax;
  const totalStars = warmupScore + scored;
  const missedCount = missedS.length + missedC.length + missedT.length;
  const viaFix = fixed.s.length + fixed.c.length + fixed.t.length > 0;
  const passedNow = scoredMax > 0 ? Math.round((scored / scoredMax) * 100) >= PASS_PERCENT : true;

  // 結算／訂正時：沒過關且還有錯題 → 存起來下次接著訂正；過關了就清掉
  useEffect(() => {
    if (step !== 'complete' && step !== 'fix') return;
    if (passedNow || missedCount === 0) { clearPending(); return; }
    try {
      localStorage.setItem(pendingKey(), JSON.stringify({ at: Date.now(), w: warmupScore, c: challengeScore, s: sentenceOk, t: talkOk, ms: missedS, mc: missedC, mt: missedT, fx: fixed }));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, passedNow, missedCount, warmupScore, challengeScore, sentenceOk, talkOk, missedS, missedC, missedT, fixed]);

  // 從頭進句子練習：句子的成績、錯題、訂正紀錄一起歸零
  const resetSentences = () => { setSentenceOk(0); setMissedS([]); setFixed(f => ({ ...f, s: [] })); };
  // 訂正成功一題：從錯題清單拿掉、加 1 分（記題號，同一題不會加兩次）
  const handleFixed = (kind: FixKind, index: number) => {
    const drop = (list: number[]) => list.filter(i => i !== index);
    if (kind === 's') setMissedS(drop); else if (kind === 'c') setMissedC(drop); else setMissedT(drop);
    setFixed(f => (f[kind].includes(index) ? f : { ...f, [kind]: [...f[kind], index] }));
  };

  return (
    <>
    <div
      className="min-h-screen bg-cover bg-top bg-fixed"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.4)), url(/images/maps/bg-sky-castles.webp)' }}
    >
      {/* 頂部導覽 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <a href={course.level === 1 ? '/adventure-map/rainbow-valley' : `/courses/${course.slug}`} className="text-gray-500 hover:text-gray-700 text-sm">
                ← {course.island}
              </a>
              {step !== 'intro' && (
                <button
                  onClick={() => {
                    stopSpeaking();
                    // 探索步驟內先逐層退（句型→拼讀→單字→電子書逐頁→封面→影片）
                    if (step === 'discover' && discoverBackRef.current?.()) return;
                    // 訂正回合按上一步＝回結算畫面（已訂正的題目照算，清單只剩還沒訂正的）
                    const prevMap: Record<Step, Step> = { intro: 'intro', welcome: 'intro', wakeup: 'intro', discover: course.level === 1 && mission.id === 1 ? 'welcome' : 'wakeup', challenge: 'discover', talktime: 'challenge', fix: 'complete', complete: 'talktime' };
                    setStep(prevMap[step]);
                  }}
                  className="text-purple-500 hover:text-purple-700 text-sm font-bold bg-purple-50 px-3 py-0.5 rounded-full"
                >← 上一步</button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐ {totalStars}</span>
            </div>
          </div>

          {step !== 'intro' && (
            <div className="flex items-center gap-1">
              {STEPS.map((s, i) => (
                <div key={s.key} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                    i < currentStepIndex ? 'bg-green-400 text-white' :
                    i === currentStepIndex ? `${step === 'fix' ? 'bg-orange-400' : s.color} text-white scale-110` :
                    'bg-gray-200 text-gray-400'
                  } transition-all`}>
                    {i < currentStepIndex ? '✓' : step === 'fix' && s.key === 'complete' ? '✏️' : s.icon}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-1 flex-1 mx-1 rounded ${
                      i < currentStepIndex ? 'bg-green-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 內容區 */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {step === 'intro' && (
          <>
            <div className="fixed inset-0 bg-black/25 pointer-events-none z-0" />
            <div className="animate-slide-up relative z-10 w-full max-w-[460px] mx-auto">
              {/* 羊皮紙外框 + 疊字 */}
              <div className="relative w-full" style={{ aspectRatio: "1000 / 925" }}>
                <img src="/images/lesson-frame.webp" alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />

                {/* 標題（木牌/緞帶） */}
                <div className="absolute left-0 right-0 text-center" style={{ top: "6%" }}>
                  <span className="inline-block bg-pink-500 text-white text-[10px] font-black px-4 py-0.5 rounded-full shadow">LEVEL {course.level}</span>
                  <h1 className="text-2xl sm:text-3xl cute-text leading-tight">{course.island}</h1>
                  <p className="text-[11px] text-amber-50 font-bold" style={{ textShadow: "0 1px 2px rgba(90,45,10,.8)" }}>{course.islandEn}</p>
                </div>

                {/* 學習目標（對準面板1，垂直置中） */}
                <div className="absolute flex flex-col justify-center" style={{ left: "20%", right: "20%", top: "30%", height: "13%" }}>
                  <p className="text-[11px] font-black text-pink-500 leading-none mb-1">🎯 學習目標</p>
                  <p className="text-[12px] text-gray-700 leading-snug line-clamp-2">{mission.focus || `${mission.titleEn}：${mission.words.slice(0, 4).map(w => w.en).join(", ")}`}</p>
                </div>

                {/* Miss Vega 引導（對準面板2，一律填） */}
                <div className="absolute flex items-center gap-2" style={{ left: "20%", right: "20%", top: "46%", height: "12%" }}>
                  <img src="/characters/vega/vega-happy.png" alt="Vega" className="w-9 h-9 rounded-full object-cover object-top bg-purple-100 border-2 border-purple-200 flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-[9px] font-black text-purple-500 leading-none mb-0.5">Miss Vega · 引導老師</p>
                    <p className="text-[11px] text-gray-700 leading-snug line-clamp-2">{mission.goal?.zh || "準備好了嗎？跟著 Miss Vega 一起出發冒險吧！"}</p>
                  </div>
                </div>

                {/* 4 單字格（各自對準框內 4 個槽，大小一致） */}
                {mission.words.slice(0, 4).map((w, i) => (
                  <div key={w.en} className="absolute flex flex-col items-center" style={{ left: `${[25, 41.5, 58.5, 75][i]}%`, top: "76%", width: "14%", transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-center" style={{ width: "82%", aspectRatio: "1" }}>
                      <WordImg en={w.en} emoji={w.image} />
                    </div>
                    <span className="text-[8px] font-bold text-gray-600 leading-none truncate max-w-full mt-0.5">{w.en}</span>
                  </div>
                ))}
              </div>

              {/* 按鈕（框下方） */}
              <div className="-mt-1 px-8 space-y-2">
                <GameButton
                  onClick={() => {
                    playVega(CHAR_CUE_AUDIO.start);   // Finn：Let's go!
                    setStep(course.level === 1 && mission.id === 1 ? 'welcome' : 'wakeup');
                  }}
                  color="gold" size="lg" className="w-full block text-center"
                >⭐ ▶ 開始任務 ⭐</GameButton>
                {/* 開發用捷徑：正式站不能出現，不然孩子一點就跳過整關、進度還會記成完成 */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={() => setStep('complete')}
                    className="w-full py-2.5 bg-white border-2 border-green-300 text-green-600 font-black rounded-full shadow active:scale-95 transition text-sm"
                  >✓ 完成關卡（測試用）</button>
                )}
              </div>
            </div>
          </>
        )}

        {step === 'welcome' && (
          <Welcome onComplete={() => { resetSentences(); setStep('discover'); }} />
        )}

        {step === 'wakeup' && (
          <WakeUp questions={warmUp8} level={course.level} audioIndex={audioIndex} onComplete={(score) => { setWarmupScore(score); resetSentences(); setStep('discover'); }} />
        )}

        {step === 'discover' && <ParentHelp stage="discover" level={course.level} />}
        {step === 'discover' && (
          <Discover key={retrying ? 'retry' : 'first'} startAtSentences={retrying} level={mission.level} story={mission.story} words={mission.words} sentences={mission.sentences} phonicsLetters={mission.phonicsLetters} videoScript={mission.videoScript} videoUrl={mission.videoUrl} tip={mission.tip} title={mission.title} titleEn={mission.titleEn} missionId={mission.id} onRegisterBack={fn => { discoverBackRef.current = fn; }} onSentenceResult={(ok, i) => {
            if (ok) setSentenceOk(n => n + 1);
            // 跳過的句子記進錯題清單；後來念過關就拿掉
            setMissedS(list => ok ? list.filter(x => x !== i) : list.includes(i) ? list : [...list, i]);
          }} onComplete={() => { bumpDaily('story'); setStep('challenge'); }} />
        )}

        {step === 'challenge' && <ParentHelp stage="challenge" level={course.level} />}
        {step === 'challenge' && (
          <Challenge challenges={mission.challenges} praiseLevel={getLevelFromMissionId(levelSlug)} level={course.level} audioIndex={audioIndex} onComplete={(score, _total, missed) => { setChallengeScore(score); setMissedC(missed); setFixed(f => ({ ...f, c: [] })); setStep('talktime'); }} />
        )}

        {step === 'talktime' && <ParentHelp stage="talktime" level={course.level} />}
        {step === 'talktime' && (
          <TalkTime prompts={mission.talkTimePrompts} level={course.level} missionId={mission.id} audioIndex={audioIndex} onComplete={(answered, missed) => { setTalkOk(answered); setMissedT(missed); setFixed(f => ({ ...f, t: [] })); bumpDaily('speak'); setStep('complete'); }} />
        )}

        {step === 'fix' && (
          <FixRound level={mission.level} missionId={mission.id} sentences={mission.sentences} challenges={mission.challenges} prompts={mission.talkTimePrompts}
            missedS={missedS} missedC={missedC} missedT={missedT}
            praiseLevel={getLevelFromMissionId(levelSlug)} audioIndex={audioIndex}
            onFixed={handleFixed} onComplete={() => setStep('complete')} />
        )}

        {step === 'complete' && (
          <MissionComplete missionTitle={mission.title} missionTitleEn={mission.titleEn} stars={totalStars} scored={scored} scoredMax={scoredMax} reviewQuiz={mission.reviewQuiz} courseSlug={course.slug} missionId={mission.id}
            viaFix={viaFix} missedCount={missedCount}
            onFix={() => setStep('fix')}
            onRestart={() => { clearPending(); setWarmupScore(0); setChallengeScore(0); setTalkOk(0); setSentenceOk(0); setMissedS([]); setMissedC([]); setMissedT([]); setFixed({ s: [], c: [], t: [] }); setRetrying(false); setStep('intro'); }}
            onRetry={() => { setChallengeScore(0); setTalkOk(0); setSentenceOk(0); setMissedS([]); setMissedC([]); setMissedT([]); setFixed({ s: [], c: [], t: [] }); setRetrying(true); setStep('discover'); }} />
        )}
      </div>

    </div>

    {/* 廣告放在背景圖「外面」的白底區，不壓在天空場景上。
        位置一樣是整頁最下方，孩子要捲到底才看得到；答題／電子書區完全不放 */}
    <div className="bg-white border-t border-gray-100">
      <AdSlot place="lessonBottom" className="pb-6 pt-3" />
    </div>
    </>
  );
}

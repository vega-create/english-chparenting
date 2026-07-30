'use client';
import { useState, useEffect, useRef } from 'react';
import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import { stopSpeaking } from '@/lib/speech';
import { getLevelFromMissionId } from '@/lib/vega-audio';
import { wordSlug } from '@/lib/audio';

// 單字卡小圖：有去背 PNG 就用圖，沒有用 emoji
function WordImg({ en, emoji }: { en: string; emoji: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // SSR 時圖若已載入失敗（naturalWidth=0），onError 可能沒觸發 → 掛載後補判
    if (ref.current && ref.current.complete && ref.current.naturalWidth === 0) setOk(false);
  }, []);
  return ok
    ? <img ref={ref} src={`/words/${wordSlug(en)}.png`} alt={en} onError={() => setOk(false)} className="w-12 h-12 object-contain" />
    : <span className="text-3xl">{emoji}</span>;
}
import Welcome from '@/components/mission/Welcome';
import WakeUp from '@/components/mission/WakeUp';
import Discover from '@/components/mission/Discover';
import Challenge from '@/components/mission/Challenge';
import TalkTime from '@/components/mission/TalkTime';
import MissionComplete from '@/components/mission/MissionComplete';

type Step = 'intro' | 'welcome' | 'wakeup' | 'discover' | 'challenge' | 'talktime' | 'complete';

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
  const [warmupScore, setWarmupScore] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);

  // Stop TTS on step change and unmount
  useEffect(() => {
    return () => stopSpeaking();
  }, [step]);

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

  const currentStepIndex = STEPS.findIndex(s => s.key === step);
  const totalStars = warmupScore + challengeScore;
  const maxStars = (mission.warmUpQuestions.length) + (mission.challenges.length);

  return (
    <div
      className="min-h-screen bg-cover bg-top bg-fixed"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.4)), url(/images/maps/bg-sky-castles.webp)' }}
    >
      {/* 頂部導覽 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <a href={`/courses/${course.slug}`} className="text-gray-500 hover:text-gray-700 text-sm">
              ← {course.island}
            </a>
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
                    i === currentStepIndex ? `${s.color} text-white scale-110` :
                    'bg-gray-200 text-gray-400'
                  } transition-all`}>
                    {i < currentStepIndex ? '✓' : s.icon}
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

                {/* 學習目標 */}
                <div className="absolute" style={{ left: "15%", right: "15%", top: "29%" }}>
                  <p className="text-[11px] font-black text-pink-500 leading-none mb-0.5">🎯 學習目標</p>
                  <p className="text-[12px] text-gray-700 leading-snug line-clamp-2">{mission.focus || `${mission.titleEn}：${mission.words.slice(0, 4).map(w => w.en).join(", ")}`}</p>
                </div>

                {/* Miss Vega */}
                {mission.goal && (
                  <div className="absolute flex items-center gap-1.5" style={{ left: "15%", right: "15%", top: "43.5%" }}>
                    <img src="/characters/vega/vega-happy.png" alt="Vega" className="w-9 h-9 rounded-full object-cover object-top bg-purple-100 border-2 border-purple-200 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-purple-500 leading-none">Miss Vega · 引導老師</p>
                      <p className="text-[11px] text-gray-700 leading-snug line-clamp-2">{mission.goal.zh}</p>
                    </div>
                  </div>
                )}

                {/* 4 單字格 */}
                <div className="absolute flex justify-between" style={{ left: "13.5%", right: "13.5%", top: "64%" }}>
                  {mission.words.slice(0, 4).map(w => (
                    <div key={w.en} className="flex flex-col items-center justify-center" style={{ width: "22%", aspectRatio: "1" }}>
                      <WordImg en={w.en} emoji={w.image} />
                      <span className="text-[8px] font-bold text-gray-600 leading-none truncate max-w-full">{w.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 按鈕（框下方） */}
              <div className="-mt-1 px-8 space-y-2">
                <button
                  onClick={() => setStep(course.level === 1 && mission.id <= 3 ? 'welcome' : 'wakeup')}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-black rounded-full shadow-lg hover:from-pink-500 active:scale-95 transition text-lg"
                >⭐ ▶ 開始任務 ⭐</button>
                <button
                  onClick={() => setStep('complete')}
                  className="w-full py-2.5 bg-white border-2 border-green-300 text-green-600 font-black rounded-full shadow active:scale-95 transition text-sm"
                >✓ 完成關卡（測試用）</button>
              </div>
            </div>
          </>
        )}

        {step === 'welcome' && (
          <Welcome onComplete={() => setStep('discover')} />
        )}

        {step === 'wakeup' && (
          <WakeUp questions={mission.warmUpQuestions} onComplete={(score) => { setWarmupScore(score); setStep('discover'); }} />
        )}

        {step === 'discover' && (
          <Discover level={mission.level} story={mission.story} words={mission.words} sentences={mission.sentences} phonicsLetters={mission.phonicsLetters} videoScript={mission.videoScript} videoUrl={mission.videoUrl} tip={mission.tip} title={mission.title} titleEn={mission.titleEn} onComplete={() => setStep('challenge')} />
        )}

        {step === 'challenge' && (
          <Challenge challenges={mission.challenges} praiseLevel={getLevelFromMissionId(levelSlug)} onComplete={(score) => { setChallengeScore(score); setStep('talktime'); }} />
        )}

        {step === 'talktime' && (
          <TalkTime prompts={mission.talkTimePrompts} onComplete={() => setStep('complete')} />
        )}

        {step === 'complete' && (
          <MissionComplete missionTitle={mission.title} missionTitleEn={mission.titleEn} stars={totalStars} maxStars={maxStars} reviewQuiz={mission.reviewQuiz} courseSlug={course.slug} missionId={mission.id} />
        )}
      </div>
    </div>
  );
}

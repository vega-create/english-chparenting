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
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.35)), url(/images/lesson-bg.webp)' }}
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
            {/* 後面壓黑，讓卡片浮出來 */}
            <div className="fixed inset-0 bg-black/30 pointer-events-none z-0" />
            <div className="animate-slide-up relative z-10 max-w-xl mx-auto">

              {/* 木牌島名 */}
              <div
                className="relative mx-auto w-full max-w-[440px] h-[168px] flex flex-col items-center justify-center text-center -mb-6"
                style={{ backgroundImage: 'url(/images/wood-sign.webp)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
              >
                <span className="inline-block bg-pink-500 text-white text-xs font-black px-4 py-0.5 rounded-full shadow mb-1">LEVEL {course.level}</span>
                <h1 className="text-3xl cute-text">{course.island}</h1>
                <p className="text-sm font-bold text-amber-50" style={{ textShadow: '0 1px 2px rgba(90,45,10,0.8)' }}>{course.islandEn}</p>
              </div>

              {/* 羊皮紙卡 */}
              <div className="relative bg-gradient-to-b from-[#fdf3dc] to-[#f3e2ba] rounded-[28px] border-4 border-[#e6cd9c] shadow-2xl px-4 sm:px-6 pt-9 pb-5">

                {/* 學習目標 */}
                <div className="bg-white/70 rounded-2xl px-4 py-3 mb-3 border border-amber-200">
                  <p className="text-sm font-black text-pink-500 mb-1">🎯 學習目標</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{mission.focus || `${mission.titleEn}：${mission.words.slice(0, 4).map(w => w.en).join(', ')}`}</p>
                </div>

                {/* Miss Vega 提示 */}
                {mission.goal && (
                  <div className="bg-white/70 rounded-2xl px-4 py-3 mb-4 border border-amber-200 flex items-start gap-2.5">
                    <img src="/images/guide/vega-point.webp" alt="Vega" className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-purple-200" />
                    <div>
                      <p className="text-xs font-black text-purple-500 mb-0.5">Miss Vega · 引導老師</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{mission.goal.zh}</p>
                    </div>
                  </div>
                )}

                {/* 今天會用到的字 */}
                <p className="text-center text-sm font-black text-amber-600 mb-2">✦ 今天會用到的字 ✦</p>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-5">
                  {mission.words.map(w => (
                    <div key={w.en} className="bg-white rounded-2xl border-2 border-amber-100 p-2 flex flex-col items-center shadow-sm">
                      <WordImg en={w.en} emoji={w.image} />
                      <span className="text-[11px] font-bold text-gray-700 mt-0.5 truncate max-w-full">{w.en}</span>
                    </div>
                  ))}
                </div>

                {/* 開始任務 */}
                <button
                  onClick={() => setStep(course.level === 1 && mission.id <= 3 ? 'welcome' : 'wakeup')}
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-black text-lg py-3.5 rounded-full shadow-lg hover:from-pink-500 hover:to-rose-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>⭐</span><span>▶ 開始任務</span><span>⭐</span>
                </button>
              </div>

              {/* Coco 嚮導 + 對話泡泡 */}
              <div className="flex items-end gap-2 mt-4 max-w-[440px] mx-auto">
                <img src="/characters/coco/coco-point.png" alt="Coco" className="w-24 h-24 object-contain flex-shrink-0" />
                <div className="bg-white rounded-2xl rounded-bl-none border-2 border-pink-200 px-4 py-2 shadow mb-3">
                  <p className="text-sm text-gray-700">嗨～我是 <span className="font-black text-pink-500">Coco</span>！一起去{course.island}冒險吧！💗</p>
                </div>
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

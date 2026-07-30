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
            <div className="fixed inset-0 bg-black/25 pointer-events-none z-0" />
            <div className="animate-slide-up relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-center gap-2 md:gap-0">

              {/* 左：Mission 羊皮紙卡 */}
              <div className="w-full max-w-lg mx-auto md:mx-0">
                {/* Mission 緞帶 */}
                <div className="flex justify-center relative z-10 -mb-4">
                  <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white font-black text-xl px-10 py-2 rounded-full shadow-lg border-2 border-white/40">Mission {mission.id}</div>
                </div>

                {/* 羊皮紙 */}
                <div className="bg-gradient-to-b from-[#fdf3dc] to-[#efdcac] rounded-[28px] border-4 border-[#d8bd88] shadow-2xl px-5 sm:px-7 pt-8 pb-5 text-center">
                  <h1 className="text-4xl sm:text-5xl font-black text-[#7a4a1f] leading-tight">{mission.titleEn}</h1>
                  <p className="text-lg font-bold text-amber-700 mb-3">{mission.title}</p>

                  {/* 三個數量 */}
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    <span className="bg-white/80 border border-amber-200 rounded-full px-3 py-1 text-sm font-bold text-gray-600">📝 {mission.words.length} 單字</span>
                    <span className="bg-white/80 border border-amber-200 rounded-full px-3 py-1 text-sm font-bold text-gray-600">💬 {mission.sentences.length} 句型</span>
                    <span className="bg-white/80 border border-amber-200 rounded-full px-3 py-1 text-sm font-bold text-gray-600">🎮 {mission.challenges.length} 挑戰</span>
                  </div>

                  {/* 今天會用到的字 */}
                  <p className="text-sm font-black text-amber-600 mb-2">✦ 今天會用到的字 ✦</p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-5">
                    {mission.words.map(w => (
                      <div key={w.en} className="bg-white rounded-2xl border-2 border-amber-100 p-2 flex flex-col items-center shadow-sm">
                        <WordImg en={w.en} emoji={w.image} />
                        <span className="text-[11px] font-bold text-gray-700 mt-0.5 truncate max-w-full">{w.en}</span>
                      </div>
                    ))}
                  </div>

                  {/* 開始冒險 */}
                  <button
                    onClick={() => setStep(course.level === 1 && mission.id <= 3 ? 'welcome' : 'wakeup')}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-xl py-4 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 active:scale-95 transition-all"
                  >
                    開始冒險 ⭐
                  </button>
                </div>
              </div>

              {/* 右：Miss Vega + 泡泡 */}
              <div className="flex md:flex-col items-end md:items-center justify-center flex-shrink-0 md:w-56 -mt-2 md:mt-0">
                <div className="bg-white rounded-2xl rounded-br-none md:rounded-bl-none border-2 border-purple-200 px-4 py-3 shadow-lg max-w-[220px] md:mb-2 order-1 md:order-none">
                  <p className="text-base text-gray-700 leading-relaxed">Hi! 我是 <span className="font-black text-purple-500">Miss Vega</span>！{mission.goal ? mission.goal.zh : '準備好一起冒險了嗎？'}</p>
                </div>
                <img src="/characters/vega/vega-point.png" alt="Miss Vega" className="w-40 md:w-56 object-contain flex-shrink-0 drop-shadow-xl order-2 md:order-none" />
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

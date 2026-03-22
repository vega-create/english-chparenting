'use client';
import { useState } from 'react';
import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import WakeUp from '@/components/mission/WakeUp';
import Discover from '@/components/mission/Discover';
import Challenge from '@/components/mission/Challenge';
import TalkTime from '@/components/mission/TalkTime';
import MissionComplete from '@/components/mission/MissionComplete';

type Step = 'intro' | 'wakeup' | 'discover' | 'challenge' | 'talktime' | 'complete';

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

  if (!course || !mission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🦊</p>
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
    <div className={`min-h-screen bg-gradient-to-b ${course.bgGradient} to-white`}>
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
          <div className="animate-slide-up text-center">
            <div className="text-8xl mb-4">{mission.themeEmoji}</div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 max-w-md mx-auto mb-6">
              <p className="text-sm text-gray-400 mb-1">
                {course.worldEmoji} {course.world} · {course.island}
              </p>
              <h1 className="text-3xl font-black text-gray-800 mb-2">Mission {mission.id}</h1>
              <h2 className="text-xl font-bold text-gray-600 mb-1">{mission.titleEn}</h2>
              <p className="text-lg text-gray-500 mb-4">{mission.title}</p>

              <div className="flex justify-center gap-4 mb-4 text-sm text-gray-400">
                <span>📝 {mission.words.length} 單字</span>
                <span>💬 {mission.sentences.length} 句型</span>
                <span>🎮 {mission.challenges.length} 挑戰</span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">今天學的單字：</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {mission.words.map(w => (
                    <span key={w.en} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                      {w.image} {w.en}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-400">Phonics: {mission.phonicsLetters.join(', ')}</p>
            </div>

            <div className="flex justify-center gap-4 mb-6 text-4xl">
              {['🦊', '🐱', '🦜', '🐻', '🐰'].map((c, i) => (
                <span key={c} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{c}</span>
              ))}
            </div>

            <button
              onClick={() => setStep('wakeup')}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:from-yellow-500 hover:to-orange-500 transition-all active:scale-95 shadow-xl"
            >
              Let&apos;s Go! 出發！🚀
            </button>
            <p className="text-sm text-gray-400 mt-4">約 15-20 分鐘</p>
          </div>
        )}

        {step === 'wakeup' && (
          <WakeUp questions={mission.warmUpQuestions} onComplete={(score) => { setWarmupScore(score); setStep('discover'); }} />
        )}

        {step === 'discover' && (
          <Discover words={mission.words} sentences={mission.sentences} phonicsLetters={mission.phonicsLetters} onComplete={() => setStep('challenge')} />
        )}

        {step === 'challenge' && (
          <Challenge challenges={mission.challenges} onComplete={(score) => { setChallengeScore(score); setStep('talktime'); }} />
        )}

        {step === 'talktime' && (
          <TalkTime prompts={mission.talkTimePrompts} onComplete={() => setStep('complete')} />
        )}

        {step === 'complete' && (
          <MissionComplete missionTitle={mission.title} missionTitleEn={mission.titleEn} stars={totalStars} maxStars={maxStars} reviewQuiz={mission.reviewQuiz} courseSlug={course.slug} />
        )}
      </div>
    </div>
  );
}

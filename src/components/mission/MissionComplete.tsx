'use client';
import { useState } from 'react';
import type { QuizQuestion } from '@/data/missions';

interface Props {
  missionTitle: string;
  missionTitleEn: string;
  stars: number;
  maxStars: number;
  reviewQuiz: QuizQuestion[];
  courseSlug: string;
}

export default function MissionComplete({ missionTitle, missionTitleEn, stars, maxStars, reviewQuiz, courseSlug }: Props) {
  const [quizDone, setQuizDone] = useState(false);
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const starPercent = Math.round((stars / maxStars) * 100);
  const starCount = starPercent >= 90 ? 3 : starPercent >= 70 ? 2 : 1;

  function handleQuizAnswer(answer: string) {
    if (showResult) return;
    setSelected(answer);
    const correct = answer === reviewQuiz[quizCurrent].answer;
    if (correct) setQuizScore(s => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (quizCurrent < reviewQuiz.length - 1) {
        setQuizCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setQuizDone(true);
      }
    }, 1200);
  }

  // 結算畫面
  if (!showQuiz || quizDone) {
    return (
      <div className="animate-slide-up text-center">
        {/* 慶祝動畫 */}
        <div className="relative mb-6">
          <div className="text-8xl mb-4">🎉</div>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <span key={i} className={`text-5xl transition-all duration-500 ${
                i <= starCount ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
              }`} style={{ animationDelay: `${i * 0.3}s` }}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-black text-gray-800 mb-2">Mission Complete!</h2>
        <p className="text-xl text-gray-600 mb-1">{missionTitleEn}</p>
        <p className="text-lg text-gray-500 mb-6">{missionTitle}</p>

        {/* 成績 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-yellow-200 max-w-md mx-auto mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-black text-yellow-500">{stars}</p>
              <p className="text-sm text-gray-500">星星</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-500">{starPercent}%</p>
              <p className="text-sm text-gray-500">正確率</p>
            </div>
            <div>
              <p className="text-3xl font-black text-blue-500">💎 10</p>
              <p className="text-sm text-gray-500">寶石</p>
            </div>
          </div>

          {quizDone && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">小測驗：{quizScore}/{reviewQuiz.length} 答對</p>
            </div>
          )}
        </div>

        {/* 角色祝賀 */}
        <div className="bg-orange-50 rounded-3xl p-4 max-w-md mx-auto mb-6 border border-orange-200">
          <p className="text-lg">
            <img src="/characters/finn/finn-happy.png" alt="Finn" className="inline w-28 h-28 object-contain mr-2" />
            Finn: &ldquo;{starCount === 3 ? 'PERFECT! You are amazing!' : starCount === 2 ? 'Great job! Keep going!' : 'Good try! Practice makes perfect!'}&rdquo;
          </p>
        </div>

        {/* 操作按鈕 */}
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          {!quizDone && !showQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-500 transition active:scale-95 shadow-lg"
            >
              📝 小測驗（{reviewQuiz.length} 題）
            </button>
          )}
          <a
            href={`/courses/${courseSlug}`}
            className="bg-gray-200 text-gray-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 transition active:scale-95 text-center"
          >
            回到課程列表
          </a>
        </div>
      </div>
    );
  }

  // 小測驗
  const q = reviewQuiz[quizCurrent];
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-4">
        <div className="inline-block text-5xl mb-2">📝</div>
        <p className="text-lg font-bold text-gray-700">小測驗 Mini Quiz</p>
      </div>

      <div className="flex gap-1 mb-6 max-w-xl mx-auto">
        {reviewQuiz.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < quizCurrent ? 'bg-green-400' : i === quizCurrent ? 'bg-yellow-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-200 max-w-xl mx-auto">
        <p className="text-xl font-bold text-center text-gray-800 mb-6">{q.question}</p>
        <div className="grid grid-cols-2 gap-3">
          {q.options?.map((option) => {
            let btnClass = 'bg-white border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50';
            if (showResult && option === q.answer) {
              btnClass = 'bg-green-100 border-2 border-green-500 scale-105';
            } else if (showResult && option === selected && option !== q.answer) {
              btnClass = 'bg-red-100 border-2 border-red-400';
            }
            return (
              <button key={option} onClick={() => handleQuizAnswer(option)} disabled={showResult}
                className={`${btnClass} rounded-2xl p-4 text-lg font-medium text-gray-700 transition-all active:scale-95`}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect, useCallback } from 'react';
import type { QuizQuestion } from '@/data/missions';
import { speak } from '@/lib/speech';

interface Props {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function WakeUp({ questions, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];

  // 每題出現時自動播放答案音檔
  const playAnswer = useCallback(() => {
    if (q.type === 'listen-pick') {
      setTimeout(() => speak(q.answer), 500);
    }
  }, [q]);

  useEffect(() => {
    playAnswer();
  }, [current, playAnswer]);

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    const correct = option === q.answer;
    if (correct) setScore(s => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        onComplete(score + (correct ? 1 : 0));
      }
    }, 1200);
  }

  return (
    <div className="animate-slide-up">
      {/* 進度條 */}
      <div className="flex gap-1 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all ${
            i < current ? 'bg-green-400' : i === current ? 'bg-yellow-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* 角色提示 */}
      <div className="text-center mb-6">
        <img src="/characters/finn/finn-talk.png" alt="Finn" className="inline-block w-44 h-44 object-contain mb-2 animate-bounce" />
        <p className="text-lg font-bold text-gray-700">
          Finn: &ldquo;Let&apos;s warm up! 來暖身吧！&rdquo;
        </p>
      </div>

      {/* 題目 */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-200 max-w-xl mx-auto">
        {q.image && <div className="text-center text-5xl mb-4">{q.image}</div>}
        <p className="text-xl font-bold text-center text-gray-800 mb-4">{q.question}</p>

        {/* 聽力題播放按鈕 */}
        {q.type === 'listen-pick' && (
          <div className="text-center mb-4">
            <button
              onClick={() => speak(q.answer)}
              className="bg-blue-100 text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95"
            >
              🔊 再聽一次
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {q.options?.map((option) => {
            let btnClass = 'bg-white border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50';
            if (showResult && option === q.answer) {
              btnClass = 'bg-green-100 border-2 border-green-500 scale-105';
            } else if (showResult && option === selected && option !== q.answer) {
              btnClass = 'bg-red-100 border-2 border-red-400';
            } else if (selected === option) {
              btnClass = 'bg-yellow-100 border-2 border-yellow-400';
            }

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={`${btnClass} rounded-2xl p-4 text-lg font-medium text-gray-700 transition-all duration-200 active:scale-95`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-4 text-center animate-slide-up">
            {selected === q.answer ? (
              <p className="text-green-600 font-bold text-lg">
                ⭐ Great job! 太棒了！
              </p>
            ) : (
              <p className="text-orange-500 font-bold text-lg">
                💪 Almost! 再試試看！答案是 {q.answer}
              </p>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        {current + 1} / {questions.length}
      </p>
    </div>
  );
}

'use client';
import { useState } from 'react';
import type { QuizQuestion } from '@/data/missions';
import { speak } from '@/lib/speech';

interface Props {
  challenges: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

const typeLabel: Record<string, { icon: string; label: string; character: string }> = {
  'listen-pick': { icon: '🎧', label: '聽力挑戰', character: '🐱' },
  'speak': { icon: '🗣', label: '口說挑戰', character: '🦜' },
  'match': { icon: '🔗', label: '配對挑戰', character: '🐻' },
  'spell': { icon: '✍️', label: '拼寫挑戰', character: '🐰' },
  'fill-blank': { icon: '📝', label: '填空挑戰', character: '🦊' },
};

export default function Challenge({ challenges, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [spellInput, setSpellInput] = useState('');
  const [combo, setCombo] = useState(0);

  const q = challenges[current];
  const info = typeLabel[q.type] || typeLabel['fill-blank'];

  // speak imported from @/lib/speech

  function handleAnswer(answer: string) {
    if (showResult) return;
    setSelected(answer);
    const correct = answer.toLowerCase().trim() === q.answer.toLowerCase().trim();
    if (correct) {
      setScore(s => s + 1);
      setCombo(c => c + 1);
    } else {
      setCombo(0);
    }
    setShowResult(true);

    setTimeout(() => {
      if (current < challenges.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
        setSpellInput('');
      } else {
        onComplete(score + (correct ? 1 : 0), challenges.length);
      }
    }, 1500);
  }

  return (
    <div className="animate-slide-up">
      {/* 進度 + Combo */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1 flex-1">
          {challenges.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all ${
              i < current ? 'bg-green-400' : i === current ? 'bg-orange-400' : 'bg-gray-200'
            }`} />
          ))}
        </div>
        {combo >= 3 && (
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
            🔥 Combo x{combo}!
          </div>
        )}
      </div>

      {/* 角色 + 題型 */}
      <div className="text-center mb-4">
        <div className="inline-block text-5xl mb-1">{info.character}</div>
        <p className="text-sm font-medium text-gray-500">
          {info.icon} {info.label}
        </p>
      </div>

      {/* 星星計分 */}
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: challenges.length }).map((_, i) => (
          <span key={i} className={`text-2xl ${i < score ? 'opacity-100' : 'opacity-20'}`}>⭐</span>
        ))}
      </div>

      {/* 題目區 */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-200 max-w-xl mx-auto">
        {q.image && <div className="text-center text-4xl mb-3">{q.image}</div>}
        <p className="text-xl font-bold text-center text-gray-800 mb-6">{q.question}</p>

        {/* 聽力題：加播放按鈕 */}
        {q.type === 'listen-pick' && (
          <div className="text-center mb-4">
            <button
              onClick={() => speak(q.answer)}
              className="bg-blue-100 text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95"
            >
              🔊 播放音檔
            </button>
          </div>
        )}

        {/* 口說題 */}
        {q.type === 'speak' && (
          <div className="text-center mb-4">
            <button
              onClick={() => speak(q.answer)}
              className="bg-green-100 text-green-600 px-6 py-3 rounded-2xl font-bold hover:bg-green-200 transition active:scale-95 mb-3"
            >
              🔊 先聽示範
            </button>
            <p className="text-sm text-gray-400 mb-3">跟著念一次，然後按下面的按鈕</p>
            <button
              onClick={() => handleAnswer(q.answer)}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition active:scale-95"
            >
              🎤 我念完了！
            </button>
          </div>
        )}

        {/* 拼寫題 */}
        {q.type === 'spell' && (
          <div className="text-center mb-4">
            <input
              type="text"
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAnswer(spellInput); }}
              placeholder="在這裡打字..."
              className="text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl px-6 py-3 w-48 focus:outline-none focus:border-orange-400 transition"
              autoFocus
              disabled={showResult}
            />
            <div className="mt-3">
              <button
                onClick={() => handleAnswer(spellInput)}
                disabled={!spellInput.trim() || showResult}
                className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition active:scale-95 disabled:opacity-50"
              >
                確認 ✓
              </button>
            </div>
          </div>
        )}

        {/* 選擇題（listen-pick, match, fill-blank） */}
        {(q.type === 'listen-pick' || q.type === 'match' || q.type === 'fill-blank') && q.options && (
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((option) => {
              let btnClass = 'bg-white border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50';
              if (showResult && option === q.answer) {
                btnClass = 'bg-green-100 border-2 border-green-500 scale-105';
              } else if (showResult && option === selected && option !== q.answer) {
                btnClass = 'bg-red-100 border-2 border-red-400';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`${btnClass} rounded-2xl p-4 text-lg font-medium text-gray-700 transition-all duration-200 active:scale-95`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* 結果顯示 */}
        {showResult && (
          <div className="mt-4 text-center animate-slide-up">
            {(selected?.toLowerCase().trim() === q.answer.toLowerCase().trim()) ? (
              <div>
                <p className="text-green-600 font-bold text-lg">
                  {combo >= 5 ? '💥 SUPER COMBO!' : combo >= 3 ? '🔥 Combo!' : '⭐ Correct!'}
                </p>
                {combo >= 3 && <p className="text-orange-500 text-sm">連續答對 {combo} 題！</p>}
              </div>
            ) : (
              <p className="text-orange-500 font-bold text-lg">
                💪 Almost! 答案是：{q.answer}
              </p>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        {current + 1} / {challenges.length}
      </p>
    </div>
  );
}

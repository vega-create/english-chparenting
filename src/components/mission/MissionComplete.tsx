'use client';
import { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/data/missions';
import { playPraise, getLevelFromMissionId, playReward } from '@/lib/vega-audio';
import { playFanfare } from '@/lib/sfx';
import { speak } from '@/lib/speech';
import { recordMissionComplete } from '@/lib/missionProgress';

interface Props {
  missionTitle: string;
  missionTitleEn: string;
  stars: number;
  maxStars: number;
  reviewQuiz: QuizQuestion[];
  courseSlug: string;
  missionId: number;
}

export default function MissionComplete({ missionTitle, missionTitleEn, stars, maxStars, reviewQuiz, courseSlug, missionId }: Props) {
  const [quizDone, setQuizDone] = useState(false);
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [spellInput, setSpellInput] = useState('');

  const starPercent = Math.round((stars / maxStars) * 100);
  const starCount = starPercent >= 90 ? 3 : starPercent >= 70 ? 2 : 1;

  // 進到結算畫面時播 Miss Vega 鼓勵語音 + 星數獎勵語音 + 記錄完成進度
  useEffect(() => {
    const lv = parseInt(String(courseSlug).match(/l?(\d+)/)?.[1] ?? '1', 10);
    playFanfare(starCount);                       // 先響破關配樂
    setTimeout(() => playPraise(getLevelFromMissionId(courseSlug)), 1200);  // 再接 Vega 鼓勵語
    // 鼓勵語播完接星數獎勵（reward-star-1/2/3，L5+ 用英文版）
    const t = setTimeout(() => playReward(`reward-star-${starCount}`, lv), 3200);
    recordMissionComplete(courseSlug, missionId, starCount);
    return () => clearTimeout(t);
  }, [courseSlug, missionId, starCount]);

  function handleQuizAnswer(answer: string) {
    if (showResult) return;
    setSelected(answer);
    const correct = answer.toLowerCase().trim() === reviewQuiz[quizCurrent].answer.toLowerCase().trim();
    if (correct) setQuizScore(s => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (quizCurrent < reviewQuiz.length - 1) {
        setQuizCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
        setSpellInput('');
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
              <p className="text-sm text-gray-500">🎁 寶藏挑戰：找到 {quizScore}/{reviewQuiz.length} 個寶藏</p>
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
              🎁 寶藏挑戰（{reviewQuiz.length} 關）
            </button>
          )}
          <a
            href={`/courses/${courseSlug}`}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-500 hover:to-emerald-600 transition active:scale-95 text-center"
          >
            繼續冒險 · 下一站 🗺 →
          </a>
        </div>
      </div>
    );
  }

  // 寶藏挑戰
  const q = reviewQuiz[quizCurrent];
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-4">
        <div className="inline-block text-5xl mb-2">🎁</div>
        <p className="text-lg font-bold text-gray-700">寶藏挑戰</p>
      </div>

      <div className="flex gap-1 mb-6 max-w-xl mx-auto">
        {reviewQuiz.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < quizCurrent ? 'bg-green-400' : i === quizCurrent ? 'bg-yellow-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-200 max-w-xl mx-auto">
        {/* 閱讀理解短文 */}
        {q.type === 'read' && q.passage && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-5">
            <p className="text-base leading-relaxed text-gray-800 whitespace-pre-line">{q.passage}</p>
          </div>
        )}

        <p className="text-xl font-bold text-center text-gray-800 mb-6">{q.question}</p>

        {/* 聽力題：播放按鈕 */}
        {q.type === 'listen-pick' && (
          <div className="text-center mb-4">
            <button onClick={() => speak(q.answer)}
              className="bg-blue-100 text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95">
              🔊 播放音檔
            </button>
          </div>
        )}

        {/* 拼寫題：打字框 */}
        {q.type === 'spell' ? (
          <div className="text-center">
            <input
              type="text"
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && spellInput.trim() && !showResult) handleQuizAnswer(spellInput); }}
              placeholder="在這裡打字..."
              className="text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl px-6 py-3 w-48 focus:outline-none focus:border-yellow-400 transition"
              autoFocus
              disabled={showResult}
            />
            <div className="mt-3">
              <button onClick={() => handleQuizAnswer(spellInput)} disabled={!spellInput.trim() || showResult}
                className="bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-yellow-600 transition active:scale-95 disabled:opacity-50">
                確認 ✓
              </button>
            </div>
            {showResult && spellInput.toLowerCase().trim() !== q.answer.toLowerCase().trim() && (
              <p className="text-orange-500 font-bold mt-3">💪 答案是：{q.answer}</p>
            )}
          </div>
        ) : q.type === 'speak' ? (
          /* 口說題 */
          <div className="text-center">
            <button onClick={() => speak(q.answer)}
              className="bg-green-100 text-green-600 px-6 py-3 rounded-2xl font-bold hover:bg-green-200 transition active:scale-95 mb-3">
              🔊 先聽示範
            </button>
            <p className="text-sm text-gray-400 mb-3">跟著念一次，再按下面按鈕</p>
            <button onClick={() => handleQuizAnswer(q.answer)} disabled={showResult}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition active:scale-95 disabled:opacity-50">
              🎤 我念完了！
            </button>
          </div>
        ) : (
          /* 選擇題（listen-pick / match / fill-blank / read） */
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
        )}
      </div>
    </div>
  );
}

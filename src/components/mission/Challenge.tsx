'use client';
import { useState, useEffect, useRef } from 'react';
import { speakChinese } from '@/lib/speech';
import GameButton from '@/components/GameButton';
import type { QuizQuestion } from '@/data/missions';
import { speak } from '@/lib/speech';
import { playLesson, findLessonAudio, type LessonAudioIndex } from '@/lib/audio';
import { playStar, playClick } from '@/lib/sfx';
import { playPraise, playReward } from '@/lib/vega-audio';
import { track } from '@/lib/analytics';
import { bumpDaily } from '@/lib/missionProgress';

interface Props {
  challenges: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  praiseLevel?: 'low' | 'mid' | 'high';
  level?: number;   // 課程級別，決定獎勵語音用中文(L1-4)或英文(L5+)
  audioIndex?: LessonAudioIndex;   // 該課的「文字→錄音」對照，讓整句題目也能播真人錄音
}

const typeLabel: Record<string, { icon: string; label: string; characterKey: string; characterAction: string }> = {
  'listen-pick': { icon: '🎧', label: '聲音偵探', characterKey: 'coco', characterAction: 'listen' },
  'speak': { icon: '🗣', label: '魔法咒語', characterKey: 'polly', characterAction: 'sing' },
  'match': { icon: '🔗', label: '連連看尋寶', characterKey: 'benny', characterAction: 'read' },
  'spell': { icon: '✍️', label: '字母拼圖', characterKey: 'ruby', characterAction: 'write' },
  'fill-blank': { icon: '📝', label: '缺字之謎', characterKey: 'finn', characterAction: 'talk' },
  'read': { icon: '📖', label: '故事解謎', characterKey: 'benny', characterAction: 'read' },
};

export default function Challenge({ challenges, onComplete, praiseLevel = 'low', level = 1, audioIndex = {} }: Props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [spellInput, setSpellInput] = useState('');
  const [combo, setCombo] = useState(0);
  // 作答耗時：從題目出現到按下答案。能分辨「會但慢」和「猜對」，分數看不出這個差別
  const qStart = useRef<number>(Date.now());
  const attempts = useRef<Record<number, number>>({});
  useEffect(() => { qStart.current = Date.now(); }, [current]);
  // 低年級（L1–L4）看不懂中文題目 → 每題出現時自動唸出來（Vega 2026-09-02）；高年級不自動唸，但點題目一樣可以聽
  const AUTO_READ_ZH_MAX_LEVEL = 4;
  useEffect(() => {
    if (level > AUTO_READ_ZH_MAX_LEVEL || !q?.question) return;
    const t = setTimeout(() => speakChinese(q.question), 350);
    return () => clearTimeout(t);
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  // 題目的答案多半是課文單字，先試真人錄音，沒有才用 TTS
  async function sayAnswer(text: string, rate = 0.7) {
    const path = findLessonAudio(audioIndex, level, text);
    if (path && await playLesson(path)) {
      track({ kind: 'replay', level, step: 'challenge', item: text, audioSrc: 'el' });
      return;
    }
    track({ kind: 'replay', level, step: 'challenge', item: text, audioSrc: 'tts' });
    speak(text, rate);
  }

  const q = challenges[current];
  const info = typeLabel[q.type] || typeLabel['fill-blank'];

  // speak imported from @/lib/speech

  function handleAnswer(answer: string) {
    if (showResult) return;
    setSelected(answer);
    const correct = answer.toLowerCase().trim() === q.answer.toLowerCase().trim();
    attempts.current[current] = (attempts.current[current] ?? 0) + 1;
    track({
      kind: 'answer', level, step: 'challenge',
      item: `q${current + 1}:${q.answer}`,          // 題目 ID：第幾題＋答案
      correct,
      ms: Date.now() - qStart.current,              // 作答耗時
      attempt: attempts.current[current],
      meta: { type: q.type, chose: answer },
    });
    if (correct) {
      // 今日任務「字母拼圖」只算拼字題，選擇題不算——不然一課就破表
      if (q.type === 'spell') bumpDaily('spell');
      playStar();
      const newCombo = combo + 1;
      // 連對 3/5/10 題播專屬獎勵語音，其餘節點播鼓勵語
      if (newCombo === 3 || newCombo === 5 || newCombo === 10) {
        playReward(`reward-streak-${newCombo}`, level);
      } else if (newCombo === 7) {
        playPraise(praiseLevel);
      }
      setScore(s => s + 1);
      setCombo(newCombo);
    } else {
      playClick();
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
        <img src={`/characters/${info.characterKey}/${info.characterKey}-${info.characterAction}.png`} alt={info.label} className="inline-block w-40 h-40 object-contain mb-1" />
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

        {/* 閱讀理解：先顯示短文/對話（讀，不自動播音，可點🔊選聽） */}
        {q.type === 'read' && q.passage && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-5">
            <p className="text-base leading-relaxed text-gray-800 whitespace-pre-line">{q.passage}</p>
            <button
              onClick={() => sayAnswer(q.passage!.replace(/\n/g, '. '))}
              className="mt-3 text-amber-600 text-sm font-bold hover:underline"
            >
              🔊 聽一次（可選）
            </button>
          </div>
        )}

        <button
          onClick={() => speakChinese(q.question)}
          className="block w-full text-xl font-bold text-center text-gray-800 mb-6 active:scale-[0.99] transition"
          aria-label="唸出題目"
        >
          {q.question} <span className="text-base align-middle text-gray-400">🔊</span>
        </button>

        {/* 聽力題：加播放按鈕 */}
        {q.type === 'listen-pick' && (
          <div className="text-center mb-4">
            <button
              onClick={() => sayAnswer(q.answer)}
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
              onClick={() => sayAnswer(q.answer)}
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
        {(q.type === 'listen-pick' || q.type === 'match' || q.type === 'fill-blank' || q.type === 'read') && q.options && (
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
                  className={`${btnClass} rounded-2xl p-4 text-lg font-medium text-gray-700 transition-all duration-200 active:scale-95 relative`}
                >
                  {option}
                  {/* 低年級看不懂英文選項 → 小喇叭先聽再選（點喇叭不算作答） */}
                  {level <= AUTO_READ_ZH_MAX_LEVEL && !showResult && (
                    <span
                      role="button"
                      aria-label="唸出這個選項"
                      onClick={e => { e.stopPropagation(); sayAnswer(option); }}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm flex items-center justify-center shadow"
                    >🔊</span>
                  )}
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

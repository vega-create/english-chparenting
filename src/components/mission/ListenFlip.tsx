'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import GameButton from '@/components/GameButton';
import type { Word } from '@/data/missions';
import { playLesson, lessonPath, wordSlug, SLOW_CLIP_RATE, SLOW_TTS_RATE } from '@/lib/audio';
import { speak } from '@/lib/speech';
import { playStar, playClick, playSuccess } from '@/lib/sfx';
import { track } from '@/lib/analytics';

/**
 * 聽力翻卡（Vega 2026-09-28 提的點子）：單字卡看完之後的小遊戲。
 *
 * 卡片全部蓋著。喇叭念一個單字 → 孩子翻卡找那張圖。
 *   - 翻對：卡片留著、亮出英文字，接著念下一個單字
 *   - 翻錯：讓他看一眼是什麼，1 秒後蓋回去（所以要邊聽邊記位置）
 * 全程只有英文聲音，沒有中文提示——這一關練的是耳朵。
 */

function CardFace({ en, emoji }: { en: string; emoji: string }) {
  const [imgOk, setImgOk] = useState(true);
  if (imgOk) {
    return <img src={`/words/${wordSlug(en)}.png`} alt="" onError={() => setImgOk(false)} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />;
  }
  return <div className="text-5xl">{emoji}</div>;
}

/** 這一課的單字夠不夠玩（至少 3 張一般單字；字母卡不算） */
export function listenFlipWords(words: Word[]): Word[] {
  const seen = new Set<string>();
  return words.filter(w => {
    const k = w.en.trim().toLowerCase();
    if (!/^[a-z][a-z' -]{1,19}$/.test(k) || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const MAX_CARDS = 6;

export default function ListenFlip({ words, level, missionId, onDone }: {
  words: Word[]; level: number; missionId?: number; onDone: () => void;
}) {
  // 每次進來隨機抽最多 6 張、位置洗牌；要找的順序另外洗一次
  const { cards, order } = useMemo(() => {
    const rand = () => Math.random() - 0.5;
    const pool = [...listenFlipWords(words)].sort(rand).slice(0, MAX_CARDS);
    return { cards: pool, order: pool.map((_, i) => i).sort(rand) };
  }, [words]);

  const [step, setStep] = useState(0);              // 現在要找第幾個
  const [found, setFound] = useState<number[]>([]); // 已經翻對的卡
  const [peek, setPeek] = useState<number | null>(null); // 翻錯、正在偷看的那張
  const [busy, setBusy] = useState(false);
  const misses = useRef(0);
  const qStart = useRef(Date.now());

  const done = step >= order.length;
  const target = done ? null : cards[order[step]];

  async function say(w: Word, slow = false) {
    if (await playLesson(lessonPath.word(level, w.en), undefined, slow ? SLOW_CLIP_RATE : 1)) return;
    speak(w.en, slow ? SLOW_TTS_RATE : 0.7);
  }

  // 換題就自動念
  useEffect(() => {
    if (!target) return;
    qStart.current = Date.now();
    misses.current = 0;
    const t = setTimeout(() => say(target), 500);
    return () => clearTimeout(t);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  function flip(i: number) {
    if (busy || done || !target || found.includes(i) || peek !== null) return;
    const hit = i === order[step];
    track({
      kind: 'answer', level, mission: missionId, step: 'listen-flip',
      item: target.en, correct: hit, ms: Date.now() - qStart.current,
      attempt: misses.current + 1,
    });
    if (hit) {
      playStar();
      setFound(f => [...f, i]);
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        if (step + 1 >= order.length) playSuccess();
        setStep(s => s + 1);
      }, 900);
    } else {
      playClick();
      misses.current += 1;
      setPeek(i);
      setTimeout(() => setPeek(null), 1000);
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-purple-600 bg-purple-50 inline-block px-4 py-1 rounded-full">
          🎧 聽力翻卡 · 找到 {found.length}/{cards.length}
        </p>
      </div>

      {/* 喇叭區 */}
      <div className="text-center mb-5 min-h-[92px]">
        {!done ? (
          <>
            <p className="text-sm font-bold text-gray-600 mb-2">聽聽看，翻出你聽到的那一張！</p>
            <button onClick={() => target && say(target)} aria-label="再聽一次"
              className="bg-purple-100 text-purple-700 px-6 py-3 rounded-2xl font-bold hover:bg-purple-200 transition active:scale-95 cursor-pointer">
              🔊 再聽一次
            </button>
            <button onClick={() => target && say(target, true)} aria-label="慢速再聽一次"
              className="ml-2 bg-blue-50 text-blue-600 px-5 py-3 rounded-2xl font-bold hover:bg-blue-100 transition active:scale-95 cursor-pointer">
              🐢 慢慢聽
            </button>
          </>
        ) : (
          <p className="text-green-600 font-black text-xl pt-4">⭐ 全部找到了！耳朵好厲害！</p>
        )}
      </div>

      {/* 卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
        {cards.map((w, i) => {
          const isFound = found.includes(i);
          const open = isFound || peek === i;
          return (
            <div key={w.en} style={{ perspective: '800px' }}>
              <div
                role="button"
                aria-label={open ? w.en : `第 ${i + 1} 張卡`}
                onClick={() => flip(i)}
                className={`relative transition-transform duration-500 ${isFound ? '' : 'cursor-pointer active:scale-95'}`}
                style={{ transformStyle: 'preserve-3d', transform: open ? 'rotateY(180deg)' : 'rotateY(0)', minHeight: '130px' }}
              >
                {/* 蓋著的那一面 */}
                <div className="absolute inset-0 rounded-2xl shadow-md border-2 border-purple-300 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}>
                  <span className="text-4xl text-white/90 font-black">?</span>
                </div>
                {/* 翻開的那一面 */}
                <div className={`absolute inset-0 rounded-2xl shadow-md border-2 flex flex-col items-center justify-center p-2 text-center ${isFound ? 'bg-green-50 border-green-400' : 'bg-white border-orange-300'}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <CardFace en={w.en} emoji={w.image} />
                  {isFound && <p className="m-0 mt-1 text-lg font-black text-gray-800 leading-tight">{w.en}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        {done ? (
          <GameButton onClick={onDone} color="green" size="md">繼續 ▶</GameButton>
        ) : (
          <button onClick={() => { playClick(); onDone(); }} className="text-xs text-gray-400 underline cursor-pointer">
            先跳過這個遊戲
          </button>
        )}
      </div>
    </div>
  );
}

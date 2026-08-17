'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameButton from '@/components/GameButton';
import { playLesson, lessonPath } from '@/lib/audio';
import { speak } from '@/lib/speech';
import { playStar, playClick, playSuccess } from '@/lib/sfx';
import type { GrammarGuide } from '@/data/grammarGuides';

/**
 * 文法引導卡（Vega 設計）：影片後、電子書前的一小關。
 * 圖卡示範（點了唸、字尾發光動畫）→ 孩子自己練 2-3 題 → 繼續。
 * 無中文旁白——中文只出現在畫面小字；聲音只有英文單字（真人錄音優先）。
 */

async function sayWord(level: number, en: string) {
  if (await playLesson(lessonPath.word(level, en))) return;
  speak(en, 0.7);
}

export default function GrammarGuideCard({ guide, level, onDone }: {
  guide: GrammarGuide; level: number; onDone: () => void;
}) {
  const [stage, setStage] = useState<'demo' | 'practice'>('demo');
  const [heard, setHeard] = useState<Set<number>>(new Set());
  const [pi, setPi] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);

  const q = guide.practice[pi];

  function tapDemo(i: number) {
    const d = guide.demos[i];
    sayWord(level, d.base).then(() => setTimeout(() => sayWord(level, d.target), 600));
    playStar();
    setHeard(prev => new Set(prev).add(i));
  }

  function pick(opt: string) {
    if (opt === q.answer) {
      playSuccess();
      setWrong(null);
      if (pi + 1 < guide.practice.length) setPi(pi + 1);
      else onDone();
    } else {
      playClick();
      setWrong(opt);
      setTimeout(() => setWrong(null), 600);
    }
  }

  return (
    <div className="animate-slide-up min-h-[72vh] flex flex-col justify-center">
      <div className="text-center mb-4">
        <p className="ae-name-plaque inline-block text-white font-black text-xl px-2 py-1 drop-shadow">
          🔍 發現小規則
        </p>
      </div>

      <div className="ae-frame max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {stage === 'demo' ? (
            <motion.div key="demo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="m-0 font-black text-gray-700">{guide.title}</p>
              <p className="m-0 mt-1 text-4xl font-black text-purple-600">{guide.concept}</p>
              <div className="mt-4 space-y-3">
                {guide.demos.map((d, i) => (
                  <button key={i} onClick={() => tapDemo(i)}
                    className="w-full flex items-center justify-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl py-3 active:scale-[0.98] transition">
                    <span className="text-3xl">{d.emoji}</span>
                    <span className="text-xl font-black text-gray-700">{d.base}</span>
                    <span className="text-xl text-gray-400">→</span>
                    <span className="text-xl font-black text-gray-800">
                      {d.target.slice(0, d.target.length - d.highlight.length)}
                      <motion.span
                        className="text-purple-600 bg-purple-100 rounded px-0.5"
                        animate={heard.has(i) ? { scale: [1, 1.35, 1] } : { scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                      >{d.highlight}</motion.span>
                    </span>
                    <span className="text-sm">🔊</span>
                  </button>
                ))}
              </div>
              <p className="m-0 mt-2 text-[11px] text-gray-400 font-bold">👆 每一組都點點看、聽聽看</p>
              <div className="mt-4">
                <GameButton onClick={() => setStage('practice')} color="purple" size="md">
                  我發現了！換我試試 →
                </GameButton>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`p${pi}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="text-center">
              <p className="m-0 text-xs font-black text-gray-400">換你了 {pi + 1}/{guide.practice.length}</p>
              <button onClick={() => sayWord(level, q.prompt)}
                className="mt-2 text-3xl font-black text-gray-800 underline decoration-dotted decoration-purple-300 underline-offset-4">
                {q.prompt} 🔊
              </button>
              <p className="m-0 mt-1 text-sm text-gray-500 font-bold">{q.hint}</p>
              <div className="mt-4 grid gap-2">
                {q.options.map(opt => (
                  <motion.button key={opt} onClick={() => pick(opt)}
                    animate={wrong === opt ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                    className={`ae-frame !py-2.5 font-black text-lg text-gray-800 active:scale-[0.98] transition ${wrong === opt ? 'opacity-60' : ''}`}>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

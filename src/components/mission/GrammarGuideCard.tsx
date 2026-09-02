'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameButton from '@/components/GameButton';
import { playLesson, lessonPath } from '@/lib/audio';
import { speak, speakChinese } from '@/lib/speech';
import { playStar, playClick, playSuccess } from '@/lib/sfx';
import type { GrammarGuide, GrammarPractice } from '@/data/grammarGuides';
import SentenceMic from '@/components/mission/SentenceMic';

/**
 * 文法引導卡（Vega 設計）：影片後、電子書前的一小關。
 * 圖卡示範（點了唸、字尾發光動畫）→ 孩子自己練 2-3 題 → 繼續。
 * 無中文旁白——中文只出現在畫面小字；聲音只有英文單字（真人錄音優先）。
 */

async function sayWord(level: number, en: string) {
  if (await playLesson(lessonPath.word(level, en))) return;
  speak(en, 0.7);
}

export default function GrammarGuideCard({ guide, level, missionId, onDone }: {
  guide: GrammarGuide; level: number; missionId?: number; onDone: () => void;
}) {
  const [stage, setStage] = useState<'demo' | 'practice'>(guide.demos.length ? 'demo' : 'practice');
  // 每次進來隨機抽 5 題、選項也洗牌（Vega：每次要不一樣）
  const quiz = useMemo(() => {
    const rand = () => Math.random() - 0.5;
    const plain = guide.practice.filter(x => !x.type);
    let pool: GrammarPractice[];
    if (plain.length) {
      pool = [...plain].sort(rand).slice(0, 5);
    } else {
      // 混合小挑戰：2 聽力＋2 句型配對＋1 口說，缺的用其他題補滿
      const by = (t: string) => guide.practice.filter(x => x.type === t).sort(rand);
      pool = [...by('listen').slice(0, 2), ...by('match').slice(0, 2), ...by('speak').slice(0, 1)];
      if (pool.length < 5) {
        const used = new Set(pool);
        pool.push(...guide.practice.filter(x => !used.has(x)).sort(rand).slice(0, 5 - pool.length));
      }
      pool.sort(rand);
    }
    return pool.map(q => ({ ...q, options: [...q.options].sort(rand) }));
  }, [guide]);
  const [heard, setHeard] = useState<Set<number>>(new Set());
  const [pi, setPi] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);

  const q = quiz[pi];

  // 播題目音：聽力題播單字、句型題播整句（真人錄音優先）
  async function sayItem(item: GrammarPractice) {
    if (item.si != null) {
      if (await playLesson(lessonPath.sentence(level, missionId ?? 0, item.si))) return;
      speak(item.prompt, 0.8);
      return;
    }
    sayWord(level, item.prompt);
  }

  // 混合題自動播音（進題就唸，聽力題不顯示字、靠耳朵）
  useEffect(() => {
    if (stage === 'practice' && q?.type) {
      const t = setTimeout(() => sayItem(q), 400);
      // 低年級（L1–L4）：英文題目播完後，把中文提示也唸出來（孩子看不懂「這句是什麼意思？」）
      const zh = q.type === 'speak' ? `${q.zh}，跟著唸唸看` : q.hint;
      const t2 = level <= 4 && zh ? setTimeout(() => speakChinese(zh), q.type === 'listen' ? 1800 : 2600) : null;
      return () => { clearTimeout(t); if (t2) clearTimeout(t2); };
    }
  }, [stage, pi]); // eslint-disable-line react-hooks/exhaustive-deps

  function nextQ() {
    setWrong(null);
    if (pi + 1 < quiz.length) setPi(pi + 1);
    else onDone();
  }

  function tapDemo(i: number) {
    const d = guide.demos[i];
    sayWord(level, d.base).then(() => setTimeout(() => sayWord(level, d.target), 600));
    playStar();
    setHeard(prev => new Set(prev).add(i));
  }

  function pick(opt: string) {
    if (opt === q.answer) {
      playSuccess();
      nextQ();
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
          ⚔️ 小挑戰時間
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
              <p className="m-0 text-xs font-black text-gray-400">換你了 {pi + 1}/{quiz.length}</p>
              {q.type === 'listen' && (
                <button onClick={() => sayItem(q)} aria-label="再聽一次"
                  className="mt-2 mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 border-4 border-purple-300 text-4xl active:scale-95 transition animate-pulse">
                  🔊
                </button>
              )}
              {(q.type === 'match' || q.type === 'speak') && (
                <button onClick={() => sayItem(q)}
                  className="mt-2 text-2xl font-black text-gray-800 leading-snug">
                  {q.prompt} <span className="text-base">🔊</span>
                </button>
              )}
              {!q.type && (
                <button onClick={() => sayWord(level, q.prompt)}
                  className="mt-2 text-3xl font-black text-gray-800 underline decoration-dotted decoration-purple-300 underline-offset-4">
                  {q.prompt} 🔊
                </button>
              )}
              <button
                onClick={() => speakChinese(q.type === 'speak' ? `${q.zh}，跟著唸唸看` : q.hint)}
                className="m-0 mt-1 mx-auto block text-sm text-gray-500 font-bold active:scale-[0.98] transition"
                aria-label="唸出中文提示"
              >
                {q.type === 'speak' ? `（${q.zh}）跟著唸唸看！` : q.hint} <span className="text-xs">🔊</span>
              </button>
              {q.type === 'speak' ? (
                <div className="mt-4 flex justify-center">
                  <SentenceMic target={q.prompt} onDone={() => { setTimeout(nextQ, 900); }} />
                </div>
              ) : (
                <div className="mt-4 grid gap-2">
                  {q.options.map(opt => (
                    <motion.button key={opt} onClick={() => pick(opt)}
                      animate={wrong === opt ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                      className={`ae-frame !py-2.5 font-black text-lg text-gray-800 active:scale-[0.98] transition ${wrong === opt ? 'opacity-60' : ''}`}>
                      {opt}
                      {/* 中文選項（句型配對）：小喇叭可以聽，點喇叭不算作答 */}
                      {q.type === 'listen' && level <= 4 && (
                        <span
                          role="button"
                          aria-label="唸出這個選項"
                          onClick={e => { e.stopPropagation(); sayWord(level, opt); }}
                          className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-sm align-middle"
                        >🔊</span>
                      )}
                      {q.type === 'match' && (
                        <span
                          role="button"
                          aria-label="唸出這個選項"
                          onClick={e => { e.stopPropagation(); speakChinese(opt); }}
                          className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-sm align-middle"
                        >🔊</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

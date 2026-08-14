'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PLACEMENT_ITEMS, saveResult, loadResults, type PlacementResult } from '@/lib/placement';
import { track } from '@/lib/analytics';
import { setStartLevel } from '@/lib/progress';
import { playClick, playStar } from '@/lib/sfx';
import { loadProgress, completedCount } from '@/lib/missionProgress';

/**
 * 起點測驗。前測與後測用同一份題目、同一個元件，只差 kind。
 * 刻意不給對錯回饋——這是測驗不是練習，給了回饋就變成學習事件，
 * 後測時孩子會記得答案，前後測就不能比了。
 */
export default function PlacementClient() {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<PlacementResult | null>(null);
  const [kind, setKind] = useState<'pre' | 'post'>('pre');

  const testStart = useRef(0);
  const itemStart = useRef(0);
  const answers = useRef<{ id: string; correct: boolean; ms: number }[]>([]);

  useEffect(() => {
    const rs = loadResults();
    setKind(rs.some(r => r.kind === 'pre') ? 'post' : 'pre');
  }, []);

  const item = PLACEMENT_ITEMS[i];
  const total = PLACEMENT_ITEMS.length;

  function begin() {
    playClick();
    testStart.current = Date.now();
    itemStart.current = Date.now();
    setStarted(true);
  }

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === item.answer;
    answers.current.push({ id: item.id, correct, ms: Date.now() - itemStart.current });
    if (correct) playStar(); else playClick();

    setTimeout(() => {
      if (i < total - 1) {
        setI(i + 1);
        setPicked(null);
        itemStart.current = Date.now();
        return;
      }
      const score = answers.current.filter(a => a.correct).length;
      const result: PlacementResult = {
        kind, score, total,
        ms: Date.now() - testStart.current,
        at: new Date().toISOString(),
        perItem: [...answers.current],
      };
      saveResult(result);
      // 整份測驗一筆總結
      track({
        kind: kind === 'pre' ? 'pretest' : 'posttest',
        step: 'placement', score, ms: result.ms,
        meta: { total, lessonsDone: completedCount(loadProgress()) },
      });
      // 每一題也各記一筆，才做得了題目層次的分析
      for (const a of answers.current) {
        track({
          kind: kind === 'pre' ? 'pretest' : 'posttest',
          step: 'placement', item: a.id, correct: a.correct, ms: a.ms,
        });
      }
      setDone(result);
    }, 450);
  }

  // ── 結果頁 ──
  if (done) {
    const rs = loadResults();
    const pre = rs.find(r => r.kind === 'pre');
    const improved = done.kind === 'post' && pre ? done.score - pre.score : null;
    return (
      <Wrap>
        <div className="text-center">
          <div className="text-6xl mb-3">🎉</div>
          <h1 className="text-2xl font-black text-gray-800">測驗完成！</h1>
          <p className="mt-2 text-4xl font-black text-purple-600">{done.score} / {done.total}</p>

          {improved !== null && (
            <p className="mt-3 text-sm font-bold text-green-600">
              {improved > 0 ? `比上次進步了 ${improved} 題 🎊`
               : improved === 0 ? '跟上次一樣，繼續加油！'
               : '這次比較難一點，沒關係，再多練幾課！'}
            </p>
          )}

          <p className="mt-5 text-sm text-gray-500 leading-relaxed">
            這個分數只是<strong>起點紀錄</strong>，不是考試成績。
          </p>

          {done.kind === 'pre' && (() => {
            // 依分數建議起點：0-3 從頭、4-6 聲音島、7+ 市場街（保守估，寧低勿高）
            const rec = done.score <= 3 ? { level: 1, name: 'L1 字母島', href: '/courses/l1-letter-island/mission/1' }
                      : done.score <= 6 ? { level: 2, name: 'L2 聲音島', href: '/courses/l2-sound-island/mission/1' }
                      : { level: 3, name: 'L3 市場街', href: '/courses/l3-market-street/mission/1' };
            return (
              <div className="mt-5 rounded-2xl bg-purple-50 border-2 border-purple-200 p-4">
                <p className="m-0 text-sm font-black text-purple-800">建議從「{rec.name}」開始</p>
                <p className="m-0 mt-1 text-[11px] text-gray-500 font-bold leading-snug">
                  按下面按鈕會把起點設在這裡：前面的島直接開門（之後想回頭玩也可以），從這裡開始一關一關解鎖。
                </p>
                <Link href={rec.href} onClick={() => setStartLevel(rec.level)}
                  className="mt-3 inline-block rounded-full bg-purple-500 px-6 py-2.5 font-black text-white shadow active:scale-95 no-underline">
                  就從{rec.name}出發 →
                </Link>
              </div>
            );
          })()}

          <Link href="/adventure-map"
            className="mt-4 inline-block rounded-full bg-white border-2 border-purple-300 px-8 py-3 font-black text-purple-600 shadow active:scale-95">
            自己選，去冒險地圖 →
          </Link>
        </div>
      </Wrap>
    );
  }

  // ── 說明頁 ──
  if (!started) {
    return (
      <Wrap>
        <h1 className="text-2xl font-black text-gray-800">
          {kind === 'pre' ? '🧭 起點測驗' : '🔁 再測一次'}
        </h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {kind === 'pre'
            ? '開始冒險之前，先做 10 題小測驗，記下你現在的起點。之後再測一次，就看得出自己進步多少了。'
            : '用一模一樣的 10 題再測一次，跟你的起點比比看進步了多少。'}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
          <li>• 只有 10 題，大概 3 分鐘</li>
          <li>• <strong>不會告訴你答對答錯</strong>（這樣下次才測得準）</li>
          <li>• 不會的就猜一個，猜錯完全沒關係</li>
          <li>• 分數不影響任何課程，所有關卡本來就都開著</li>
        </ul>
        <button onClick={begin}
          className="mt-6 w-full rounded-full bg-purple-500 py-3 font-black text-white shadow active:scale-95">
          開始測驗
        </button>
        <Link href="/adventure-map" className="mt-3 block text-center text-xs text-gray-400 underline">
          先跳過，直接去冒險
        </Link>
      </Wrap>
    );
  }

  // ── 作答中 ──
  return (
    <Wrap>
      <div className="mb-5 flex gap-1">
        {PLACEMENT_ITEMS.map((_, k) => (
          <div key={k} className={`h-2 flex-1 rounded-full ${k < i ? 'bg-purple-400' : k === i ? 'bg-purple-200' : 'bg-gray-200'}`} />
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">{i + 1} / {total}</p>
      <p className="mt-4 text-center text-4xl font-black text-gray-800 ebook-text">{item.en}</p>
      <p className="mt-1 text-center text-sm text-gray-400">這個字是什麼意思？</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {item.options.map(opt => (
          <button key={opt} onClick={() => pick(opt)} disabled={!!picked}
            className={`rounded-2xl border-2 p-4 text-base font-bold transition active:scale-95 ${
              picked === opt
                ? 'border-purple-400 bg-purple-100 text-purple-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
            }`}>
            {opt}
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-xs text-gray-400">不知道就猜一個，沒關係的</p>
    </Wrap>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="mx-auto max-w-md px-5 py-12">{children}</div>
    </main>
  );
}

'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { COURSES } from '@/data/courses';
import { loadProgress, totalStars, totalGems, collectedWordCount, islandStats } from '@/lib/missionProgress';

// 我的小屋：孩子的專屬基地 + 單字圖鑑（各島收集進度）。進度存 localStorage，闖關後自動累積。
export default function CabinPage() {
  const [p, setP] = useState(() => ({ completed: {} as Record<string, number> }));
  useEffect(() => {
    const refresh = () => setP(loadProgress());
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  const stats = islandStats(p);
  const totalWords = Object.values(stats).reduce((s, x) => s + x.total, 0);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/home" className="text-gray-400 hover:text-emerald-600 text-sm no-underline">← 回冒險基地</Link>

        <div className="text-center my-8 animate-slide-up">
          <div className="text-6xl mb-3">🏠</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2"><span className="gradient-text">我的小屋</span></h1>
          <p className="text-gray-500">你的專屬小屋，收藏一路上找到的寶物！</p>
        </div>

        {/* 寶物總覽 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: '⭐', label: '星星', val: totalStars(p) },
            { icon: '💎', label: '寶石', val: totalGems(p) },
            { icon: '📖', label: '單字圖鑑', val: `${collectedWordCount(p)} / ${totalWords}` },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow border border-emerald-100 text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <p className="text-lg font-black text-gray-800">{s.val}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 單字圖鑑：各島收集進度 */}
        <h2 className="text-xl font-black mb-4 flex items-center gap-2">📖 單字圖鑑</h2>
        <p className="text-sm text-gray-500 mb-4">每闖過一課，就會收集到那課的單字卡。點島嶼去收集！</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COURSES.map(c => {
            const st = stats[c.slug] || { collected: 0, total: c.vocabulary || 0 };
            const done = st.total > 0 && st.collected >= st.total;
            return (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className={`no-underline ${c.color} border-2 ${c.borderColor} rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] transition`}
              >
                <div className="text-3xl flex-shrink-0">{c.worldEmoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">{c.island}</p>
                  <p className="text-xs text-gray-500">{done ? '✅' : st.collected > 0 ? '📖' : '🔒'} 已收集 {st.collected} / {st.total} 個單字</p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">收集越多單字卡，小屋就會越熱鬧 ✨</p>
      </div>
    </main>
  );
}

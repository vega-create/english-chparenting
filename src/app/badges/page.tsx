'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadProgress, getBadges, type Badge } from '@/lib/missionProgress';

// 成就徽章：完成里程碑解鎖，全部由進度推導、達標即點亮。
export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>(() => getBadges({ completed: {} }));
  useEffect(() => {
    const refresh = () => setBadges(getBadges(loadProgress()));
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  const gotCount = badges.filter(b => b.got).length;
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/home" className="text-gray-400 hover:text-blue-600 text-sm no-underline">← 回冒險基地</Link>

        <div className="text-center my-8 animate-slide-up">
          <div className="text-6xl mb-3">🏆</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2"><span className="gradient-text">成就徽章</span></h1>
          <p className="text-gray-500">收集徽章，成為最棒的冒險家！已解鎖 {gotCount} / {badges.length}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges.map(b => (
            <div
              key={b.name}
              className={`rounded-2xl p-5 text-center border-2 ${
                b.got ? 'bg-white border-yellow-300 shadow' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className={`text-5xl mb-2 ${b.got ? '' : 'grayscale opacity-40'}`}>{b.got ? b.icon : '🔒'}</div>
              <p className={`font-bold text-sm mb-0.5 ${b.got ? 'text-gray-800' : 'text-gray-400'}`}>{b.name}</p>
              <p className="text-xs text-gray-400">{b.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">每完成一個里程碑，就會點亮一枚徽章 ✨</p>
      </div>
    </main>
  );
}

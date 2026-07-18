'use client';
import Link from 'next/link';

// 成就徽章：完成里程碑解鎖。目前全部鎖定，之後接闖關紀錄逐一點亮。
const BADGES = [
  { icon: '🌱', name: '冒險新手', desc: '完成第一課', got: false },
  { icon: '🔥', name: '連勝高手', desc: '一課連對 5 題', got: false },
  { icon: '🔊', name: '拼讀達人', desc: '通關聲音島', got: false },
  { icon: '🛒', name: '生活小達人', desc: '通關市場街', got: false },
  { icon: '📚', name: '故事讀者', desc: '讀完 10 本故事書', got: false },
  { icon: '✍️', name: '拼字大師', desc: '拼對 50 個單字', got: false },
  { icon: '🗣', name: '開口說王', desc: '完成 20 次跟讀', got: false },
  { icon: '⭐', name: '滿星勇者', desc: '一課拿滿 3 顆星', got: false },
  { icon: '🏝️', name: '環島英雄', desc: '通關所有島嶼', got: false },
  { icon: '🎓', name: '畢業勇者', desc: '完成全部冒險', got: false },
];

export default function BadgesPage() {
  const gotCount = BADGES.filter(b => b.got).length;
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/home" className="text-gray-400 hover:text-blue-600 text-sm no-underline">← 回冒險基地</Link>

        <div className="text-center my-8 animate-slide-up">
          <div className="text-6xl mb-3">🏆</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2"><span className="gradient-text">成就徽章</span></h1>
          <p className="text-gray-500">收集徽章，成為最棒的冒險家！已解鎖 {gotCount} / {BADGES.length}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BADGES.map(b => (
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

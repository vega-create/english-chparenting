'use client';
import Link from 'next/link';

// 今日任務：每天 3 個小任務，完成拿獎勵。目前是靜態架構（進度之後接闖關紀錄）。
const TASKS = [
  { icon: '🗣', name: '魔法咒語', desc: '大聲念一課的句子', href: '/courses', reward: '⭐ x2' },
  { icon: '📖', name: '故事解謎', desc: '讀完一課的故事書', href: '/courses', reward: '⭐ x2' },
  { icon: '✍️', name: '字母拼圖', desc: '拼出 5 個新單字', href: '/courses', reward: '💎 x5' },
];

export default function TasksPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/home" className="text-gray-400 hover:text-orange-500 text-sm no-underline">← 回冒險基地</Link>

        <div className="text-center my-8 animate-slide-up">
          <div className="text-6xl mb-3">📜</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2"><span className="gradient-text">今日任務</span></h1>
          <p className="text-gray-500">完成今天的任務，拿到冒險獎勵！</p>
        </div>

        {/* 進度條 */}
        <div className="bg-white rounded-2xl p-4 shadow border border-orange-100 mb-6 flex items-center gap-4">
          <div className="text-3xl">🎁</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-700 mb-1">今日進度 0 / {TASKS.length}</p>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>

        {/* 任務清單 */}
        <div className="space-y-3">
          {TASKS.map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-4 shadow border border-gray-100 flex items-center gap-4">
              <div className="text-3xl flex-shrink-0">{t.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-amber-500 font-bold mb-1">{t.reward}</p>
                <Link href={t.href} className="inline-block bg-gradient-to-r from-orange-400 to-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full no-underline active:scale-95 transition">
                  去完成 →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">任務每天更新 · 完成越多，收集越多寶物 🏠</p>
      </div>
    </main>
  );
}

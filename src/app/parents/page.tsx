'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadProgress, completedCount, totalStars, currentIsland, type Progress } from '@/lib/missionProgress';
import AutoAds from "@/components/AutoAds";
import ResearchConsent from "@/components/ResearchConsent";
import PlacementPrompt from "@/components/PlacementPrompt";
import LoginNudge from "@/components/LoginNudge";

// 家長中心：家長視角的進度/報告/時間管理。可追蹤的數據由進度推導；時間類尚未追蹤，誠實留白。
export default function ParentsPage() {
  const [p, setP] = useState<Progress>({ completed: {} });
  useEffect(() => {
    const refresh = () => setP(loadProgress());
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  const SECTIONS = [
    {
      icon: '📈', title: '學習進度追蹤', color: 'border-pink-200 bg-pink-50',
      desc: '看孩子走到哪座島、完成幾課、累積幾顆星。',
      stats: [
        { label: '完成課程', val: `${completedCount(p)} 課` },
        { label: '目前所在', val: currentIsland(p) },
        { label: '累計星星', val: `⭐ ${totalStars(p)}` },
      ],
    },
    {
      icon: '📊', title: '學習報告分析', color: 'border-purple-200 bg-purple-50',
      desc: '整理孩子的強項與需要多練的地方（聽、說、讀、寫、字彙）。',
      stats: [
        { label: '完成課程', val: `${completedCount(p)} 課` },
        { label: '最強能力', val: '學習中' },
        { label: '建議加強', val: '學習中' },
      ],
    },
    {
      icon: '⏰', title: '使用時間管理', color: 'border-rose-200 bg-rose-50',
      desc: '養成規律又不過量的好習慣（時間上限功能開發中）。',
      stats: [
        { label: '連續天數', val: `${p.streak || 0} 天` },
        { label: '每日上限', val: '未設定' },
        { label: '今日使用', val: '—' },
      ],
    },
  ];

  return (
    <main className="min-h-screen py-12 px-4">
      <AutoAds />
      <div className="max-w-3xl mx-auto px-4"><LoginNudge />
        <PlacementPrompt />
        <ResearchConsent /></div>
      <div className="max-w-3xl mx-auto">
        <Link href="/home" className="text-gray-400 hover:text-rose-600 text-sm no-underline">← 回冒險基地</Link>

        <div className="text-center my-8 animate-slide-up">
          <div className="text-6xl mb-3">👨‍👩‍👧</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2"><span className="gradient-text">家長中心</span></h1>
          <p className="text-gray-500">關注孩子的學習進度，陪伴成長每一步。</p>
        </div>

        <div className="space-y-5">
          {SECTIONS.map(s => (
            <div key={s.title} className={`rounded-2xl p-5 border-2 ${s.color}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">{s.icon}</div>
                <div>
                  <h2 className="font-black text-gray-800">{s.title}</h2>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {s.stats.map(st => (
                  <div key={st.label} className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="font-black text-gray-800">{st.val}</p>
                    <p className="text-xs text-gray-500">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 mt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">數據會在孩子開始學習後自動累積。想先了解怎麼陪孩子用？</p>
          <Link href="/guide" className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold px-6 py-3 rounded-full no-underline active:scale-95 transition">
            看使用說明 📖
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">本平台完全免費，不需要註冊帳號。</p>
      </div>
    </main>
  );
}

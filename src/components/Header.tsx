"use client";
import { useState } from "react";
import Link from "next/link";
import { VegaMuteButton } from "@/components/VegaAudio";

const NAV = [
  { href: "/", label: "首頁" },
  { href: "/adventure-map", label: "🗺️ 冒險地圖" },
  { href: "/tasks", label: "📜 今日任務" },
  { href: "/cabin", label: "🏠 我的小屋" },
  { href: "/badges", label: "🏆 成就徽章" },
  { href: "/parents", label: "👨‍👩‍👧 家長中心" },
  { href: "/guide", label: "📖 使用說明" },
  { href: "/blog", label: "✏️ 學習文章" },
  { href: "/books", label: "📕 推薦書單" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 gap-2">
        <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
          <img src="/characters/finn/finn-normal.png" alt="Finn" className="w-9 h-9 object-contain" />
          <span className="font-black text-base text-purple-800 whitespace-nowrap hidden sm:inline">Adventure English</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-0.5 items-center">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="px-2.5 py-1.5 rounded-full text-[13px] font-medium text-gray-700 whitespace-nowrap hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline">
              {n.label}
            </Link>
          ))}
        </nav>
        {/* Vega 靜音按鈕 */}
        <div className="hidden lg:block ml-1 flex-shrink-0"><VegaMuteButton /></div>
        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600" aria-label="選單">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <nav className="lg:hidden bg-white border-t border-gray-100 py-2">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 no-underline">
              {n.label}
            </Link>
          ))}
          <div className="px-6 py-3 flex items-center gap-2"><VegaMuteButton /><span className="text-sm text-gray-600">Vega 語音</span></div>
        </nav>
      )}
    </header>
  );
}

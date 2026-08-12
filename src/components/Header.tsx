"use client";
import { useState } from "react";
import Link from "next/link";
import { VegaMuteButton } from "@/components/VegaAudio";

// 選單 icon 用畫的（/images/ui/nav/），不用 emoji——每台裝置的 emoji 長相不同
const NAV = [
  { href: "/", label: "首頁", icon: "home" },
  { href: "/adventure-map", label: "冒險地圖", icon: "map" },
  { href: "/tasks", label: "今日任務", icon: "tasks" },
  { href: "/cabin", label: "我的小屋", icon: "cabin" },
  { href: "/badges", label: "成就徽章", icon: "badges" },
  { href: "/parents", label: "家長冒險中心", icon: "parents" },
  { href: "/guide", label: "使用說明", icon: "guide" },
  { href: "/blog", label: "冒險圖書館", icon: "blog" },
  { href: "/books", label: "閱讀花園", icon: "books" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 gap-2">
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-0.5 items-center flex-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="px-2.5 py-1.5 rounded-full text-[13px] font-medium text-gray-700 whitespace-nowrap hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline flex items-center gap-1">
              <img src={`/images/ui/nav/${n.icon}.webp`} alt="" className="w-5 h-5 object-contain" />
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
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 no-underline">
              <img src={`/images/ui/nav/${n.icon}.webp`} alt="" className="w-6 h-6 object-contain" />
              {n.label}
            </Link>
          ))}
          <div className="px-6 py-3 flex items-center gap-2"><VegaMuteButton /><span className="text-sm text-gray-600">Vega 語音</span></div>
        </nav>
      )}
    </header>
  );
}

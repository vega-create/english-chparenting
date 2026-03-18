"use client";
import { useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "/", label: "首頁" },
  { href: "/map", label: "🗺️ 學習地圖" },
  { href: "/courses", label: "📚 課程介紹" },
  { href: "/guide", label: "📖 使用說明" },
  { href: "/blog", label: "✏️ 學習文章" },
  { href: "/books", label: "📕 推薦書單" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl">🦊</span>
          <span className="font-black text-lg text-purple-800">Adventure English</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline">
              {n.label}
            </Link>
          ))}
        </nav>
        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600" aria-label="選單">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 py-2">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 no-underline">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

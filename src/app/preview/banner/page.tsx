"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playClick, playSwoosh, playStar, playOpen, playSuccess, setSfxMuted, isSfxMuted } from "@/lib/sfx";

// 兩種 hotspot 樣式：
// - "invisible"（隱形）：給卡片、角色用 — hover 才有微微光暈
// - "glow"（發光按鈕）：給 CTA 按鈕 — 一直閃、有文字

type Hotspot = {
  x: number; y: number; w: number; h: number;
  href: string;
  label: string;
  sfx: string;
  style?: "invisible" | "glow";
  glowColor?: string; // glow 按鈕的顏色
};

// 桌機（image banner1 - 1666×944）
const DESKTOP_HOTSPOTS: Hotspot[] = [
  // ===== 頂部 nav 6.5% 間距、3.5% 寬 =====
  { x: 21.9, y: 1, w: 3.5, h: 10, href: "#", label: "冒險地圖", sfx: "click" },
  { x: 28.4, y: 1, w: 3.5, h: 10, href: "#", label: "六大世界", sfx: "click" },
  { x: 34.9, y: 1, w: 3.5, h: 10, href: "#", label: "AI口說", sfx: "click" },
  { x: 41.4, y: 1, w: 3.5, h: 10, href: "#", label: "閱讀故事", sfx: "click" },
  { x: 47.9, y: 1, w: 3.5, h: 10, href: "#", label: "每日任務", sfx: "click" },
  { x: 54.4, y: 1, w: 3.5, h: 10, href: "#", label: "成就徽章", sfx: "click" },
  { x: 60.9, y: 1, w: 3.5, h: 10, href: "#", label: "我的小屋", sfx: "click" },
  { x: 67.4, y: 1, w: 3.5, h: 10, href: "#", label: "家長中心", sfx: "click" },
  { x: 82, y: 1.5, w: 6.5, h: 8, href: "#", label: "登入", sfx: "click" },
  { x: 89.5, y: 1.5, w: 6.5, h: 8, href: "#", label: "註冊", sfx: "success" },

  // ===== Hero CTA =====
  { x: 9, y: 56, w: 14, h: 8, href: "/preview/v4", label: "🚀 開始冒險", sfx: "star" },
  { x: 24, y: 56, w: 14, h: 8, href: "#", label: "▶ 觀看介紹", sfx: "swoosh" },

  // ===== 底部 4 張卡片整張都可點 =====
  { x: 4, y: 72, w: 22, h: 27, href: "#", label: "今日任務", sfx: "click" },
  { x: 26, y: 72, w: 22, h: 27, href: "#", label: "我的小屋", sfx: "open" },
  { x: 48, y: 72, w: 24, h: 27, href: "#", label: "成就徽章", sfx: "click" },
  { x: 72, y: 72, w: 27, h: 27, href: "#", label: "家長中心", sfx: "click" },
];

// 手機（banner_2 - 862×1825）
const MOBILE_HOTSPOTS: Hotspot[] = [
  // 頂部 hamburger
  { x: 1, y: 0.5, w: 11, h: 3.5, href: "menu", label: "☰", sfx: "open" },

  // 頂部 5 個 nav 圖示（高度 6.5）
  { x: 24.5, y: 0, w: 8, h: 6.5, href: "#", label: "冒險地圖", sfx: "click" },
  { x: 37.5, y: 0, w: 8, h: 6.5, href: "#", label: "AI口說", sfx: "click" },
  { x: 50.5, y: 0, w: 8, h: 6.5, href: "#", label: "閱讀故事", sfx: "click" },
  { x: 63.5, y: 0, w: 8, h: 6.5, href: "#", label: "成就徽章", sfx: "click" },
  { x: 76.5, y: 0, w: 8, h: 6.5, href: "#", label: "我的小屋", sfx: "click" },

  // 5 個角色卡片（包到「認識我」按鈕）
  { x: 3, y: 34, w: 17, h: 15, href: "/preview/v4", label: "Finn", sfx: "click" },
  { x: 22, y: 34, w: 17, h: 15, href: "/preview/v4", label: "Coco", sfx: "click" },
  { x: 41, y: 34, w: 17, h: 15, href: "/preview/v4", label: "Polly", sfx: "click" },
  { x: 60, y: 34, w: 17, h: 15, href: "/preview/v4", label: "Benny", sfx: "click" },
  { x: 79, y: 34, w: 17, h: 15, href: "/preview/v4", label: "Ruby", sfx: "click" },

  // 6 個世界卡片（兩排 × 3）
  { x: 1.5, y: 53.5, w: 32.5, h: 11, href: "/preview/v6", label: "彩虹谷", sfx: "click" },
  { x: 34, y: 53.5, w: 32.5, h: 11, href: "/preview/v6", label: "友善小鎮", sfx: "click" },
  { x: 66.5, y: 53.5, w: 32.5, h: 11, href: "/preview/v6", label: "海洋灣", sfx: "click" },
  { x: 1.5, y: 65, w: 32.5, h: 11, href: "/preview/v6", label: "故事城堡", sfx: "click" },
  { x: 34, y: 65, w: 32.5, h: 11, href: "/preview/v6", label: "探索大陸", sfx: "click" },
  { x: 66.5, y: 65, w: 32.5, h: 11, href: "/preview/v6", label: "冠軍峰", sfx: "click" },

  // 3 個底部 banner 條
  { x: 1, y: 78, w: 98, h: 5.5, href: "#", label: "今日冒險", sfx: "star" },
  { x: 1, y: 84, w: 98, h: 5.5, href: "#", label: "我的小屋", sfx: "open" },
  { x: 1, y: 90, w: 98, h: 5.5, href: "#", label: "成就徽章", sfx: "click" },

  // 底部 nav（5 個圖示）
  { x: 1, y: 96, w: 19, h: 4, href: "#", label: "冒險地圖", sfx: "click" },
  { x: 20.5, y: 96, w: 19, h: 4, href: "#", label: "AI口說", sfx: "click" },
  { x: 40, y: 96, w: 19, h: 4, href: "#", label: "閱讀故事", sfx: "click" },
  { x: 59.5, y: 96, w: 19, h: 4, href: "#", label: "成就徽章", sfx: "click" },
  { x: 79, y: 96, w: 19, h: 4, href: "#", label: "我的小屋", sfx: "click" },
];

const GLOW_STYLES: Record<string, { bg: string; ring: string; text: string }> = {
  purple: { bg: "from-purple-500 to-pink-500", ring: "ring-purple-300", text: "text-white" },
  white:  { bg: "from-white to-gray-100",      ring: "ring-purple-200", text: "text-purple-700" },
  orange: { bg: "from-orange-500 to-amber-500", ring: "ring-orange-300", text: "text-white" },
  green:  { bg: "from-emerald-500 to-green-500", ring: "ring-emerald-300", text: "text-white" },
  yellow: { bg: "from-yellow-400 to-amber-500", ring: "ring-yellow-300", text: "text-amber-900" },
  blue:   { bg: "from-sky-500 to-blue-500",    ring: "ring-sky-300", text: "text-white" },
};

function playSfx(name: string) {
  if (name === "click") playClick();
  else if (name === "swoosh") playSwoosh();
  else if (name === "star") playStar();
  else if (name === "open") playOpen();
  else if (name === "success") playSuccess();
}

export default function HomePreview() {
  const [muted, setMuted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const [debugAllowed, setDebugAllowed] = useState(false);

  useEffect(() => {
    setMuted(isSfxMuted());
    // 只有 ?debug=1 才能用 debug 模式
    setDebugAllowed(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  function toggleMute() {
    const next = !muted;
    setSfxMuted(next);
    setMuted(next);
    if (!next) playClick();
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Debug 切換（只有 ?debug=1 才顯示） */}
      {debugAllowed && (
        <button
          onClick={() => setShowHotspots(s => !s)}
          className="fixed top-3 left-3 z-[60] bg-black/70 text-white text-xs px-3 py-1 rounded-full font-bold"
        >
          🎯 {showHotspots ? "隱藏" : "顯示"} 隱形按鈕
        </button>
      )}

      {/* 音效切換 */}
      <button
        onClick={toggleMute}
        className="fixed top-3 right-3 z-[60] bg-white/90 backdrop-blur w-10 h-10 rounded-full shadow flex items-center justify-center text-xl"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* ===== 桌機 — 限制最大高度 vh 不被裁切 ===== */}
      <div className="hidden md:flex w-full justify-center relative">
        <div className="relative" style={{
          width: "min(100vw, calc(100vh * 1666 / 944))",
          maxWidth: "100vw",
        }}>
          <img src="/images/maps/home-desktop.webp" alt="" className="w-full h-auto block" />
          {DESKTOP_HOTSPOTS.map((h, i) => (
            <HotspotButton key={`d-${i}`} hotspot={h} debug={showHotspots} />
          ))}
        </div>
      </div>

      {/* ===== 手機 — 限制最大寬度，居中顯示 ===== */}
      <div className="md:hidden w-full flex justify-center relative">
        <div className="relative" style={{
          width: "min(100vw, calc(100vh * 862 / 1825))",
          maxWidth: "100vw",
        }}>
          <img src="/images/maps/home-mobile.webp" alt="" className="w-full h-auto block" />
          {MOBILE_HOTSPOTS.map((h, i) => (
            <HotspotButton
              key={`m-${i}`}
              hotspot={h}
              debug={showHotspots}
              onMenu={() => { playOpen(); setMobileMenu(true); }}
            />
          ))}
        </div>
      </div>

      {/* 手機側邊選單 */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenu(false)}>
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="bg-white w-72 h-full shadow-2xl p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-black text-purple-800">選單</p>
              <button onClick={() => { playClick(); setMobileMenu(false); }} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-1">
              {[
                { icon: "🗺", label: "冒險地圖", href: "/preview/v6" },
                { icon: "🌍", label: "六大世界", href: "/preview/v6" },
                { icon: "🤖", label: "AI 口說", href: "#" },
                { icon: "📖", label: "閱讀故事", href: "#" },
                { icon: "📜", label: "每日任務", href: "#" },
                { icon: "🏆", label: "成就徽章", href: "#" },
                { icon: "🏠", label: "我的小屋", href: "#" },
                { icon: "👨‍👩‍👧", label: "家長中心", href: "#" },
              ].map(n => (
                <a key={n.label} href={n.href} onClick={() => { playClick(); setMobileMenu(false); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-yellow-50 no-underline">
                  <span className="text-2xl">{n.icon}</span>
                  <span className="font-bold text-gray-700">{n.label}</span>
                </a>
              ))}
              <div className="border-t border-gray-100 my-3" />
              <button onClick={() => playClick()} className="w-full px-3 py-3 rounded-xl bg-white border-2 border-sky-400 text-sky-600 font-black">登入</button>
              <button onClick={() => playSuccess()} className="w-full px-3 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black">註冊</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function HotspotButton({ hotspot, debug, onMenu }: { hotspot: Hotspot; debug?: boolean; onMenu?: () => void }) {
  const isMenu = hotspot.href === "menu";
  const isGlow = hotspot.style === "glow";
  const glow = GLOW_STYLES[hotspot.glowColor ?? "purple"];

  const style = {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
    width: `${hotspot.w}%`,
    height: `${hotspot.h}%`,
  };

  // 隱形 hotspot（純透明點擊區）
  const invisibleInner = (
    <div
      className={`w-full h-full relative ${
        debug ? "bg-pink-400/40 border-2 border-pink-500 rounded-2xl" : ""
      }`}
      style={{ cursor: "pointer" }}
    >
      {debug && (
        <span className="text-[10px] text-white font-bold absolute top-0 left-0 bg-black/60 px-1 rounded">
          {hotspot.label}
        </span>
      )}
    </div>
  );

  // 發光按鈕（CTA 用）
  const glowInner = (
    <motion.div
      animate={{
        boxShadow: [
          "0 0 0px rgba(255,255,255,0)",
          "0 0 24px rgba(255,255,255,0.7)",
          "0 0 0px rgba(255,255,255,0)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full h-full rounded-full bg-gradient-to-r ${glow.bg} ${glow.text} flex items-center justify-center font-black shadow-2xl ring-4 ${glow.ring} relative overflow-hidden`}
      style={{ fontSize: "min(2vw, 1rem)", cursor: "pointer" }}
    >
      {/* 閃光效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
      />
      <span className="relative z-10 whitespace-nowrap px-2 truncate">{hotspot.label}</span>
    </motion.div>
  );

  const inner = isGlow ? glowInner : invisibleInner;

  if (isMenu && onMenu) {
    return (
      <button onClick={() => onMenu()} className="absolute" style={style} title={hotspot.label}>
        {inner}
      </button>
    );
  }

  if (hotspot.href.startsWith("#") || hotspot.href === "#") {
    return (
      <a
        href={hotspot.href}
        onClick={() => playSfx(hotspot.sfx)}
        className="absolute no-underline"
        style={style}
        title={hotspot.label}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={hotspot.href}
      onClick={() => playSfx(hotspot.sfx)}
      className="absolute no-underline"
      style={style}
      title={hotspot.label}
    >
      {inner}
    </Link>
  );
}

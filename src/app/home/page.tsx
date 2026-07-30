"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playClick, playSwoosh, playStar, playOpen, playSuccess, setSfxMuted, isSfxMuted } from "@/lib/sfx";
import { COURSES } from "@/data/courses";

// 島嶼 slug → 島嶼圖（缺的用漸層占位）
const ISLAND_IMG: Record<string, string> = {
  "l1-letter-island": "island-letter", "l2-sound-island": "island-sound",
  "l3-market-street": "island-market", "l4-school-road": "island-school",
  "l5-coral-beach": "island-coral", "l6-lighthouse-point": "island-lighthouse",
  "l7-grammar-gate": "island-grammar", "l8-question-tower": "island-question",
  "l10-future-bridge": "island-future", "l11-challenge-arena": "island-challenge",
};
// 夥伴（頭像用 -normal；vega 用嚮導圖）
const PALS = [
  { key: "finn", name: "Finn", color: "border-orange-300" },
  { key: "coco", name: "Coco", color: "border-pink-300" },
  { key: "ruby", name: "Ruby", color: "border-red-300" },
  { key: "benny", name: "Benny", color: "border-amber-300" },
  { key: "polly", name: "Polly", color: "border-green-300" },
  { key: "vega", name: "Vega", color: "border-purple-300" },
];

// 六大世界（首頁探索冒險世界輪播）
const WORLDS = [
  { img: "world-rainbow-valley", zh: "彩虹谷", en: "Rainbow Valley", href: "/adventure-map/rainbow-valley" },
  { img: "world-friendly-town", zh: "友善小鎮", en: "Friendly Town", href: "/adventure-map/world/2" },
  { img: "world-ocean-bay", zh: "海洋灣", en: "Ocean Bay", href: "/adventure-map/world/3" },
  { img: "world-story-castle", zh: "故事城堡", en: "Story Castle", href: "/adventure-map/world/4" },
  { img: "world-explorer-land", zh: "探索大陸", en: "Discovery Land", href: "/adventure-map/world/5" },
  { img: "world-champion-peak", zh: "冠軍峰", en: "Champion Peak", href: "/adventure-map/world/6" },
];

const NAV = [
  { icon: "🗺", label: "冒險地圖", href: "/adventure-map" },
  { icon: "🌍", label: "六大世界", href: "/courses" },
  { icon: "📜", label: "今日任務", href: "/tasks" },
  { icon: "🏠", label: "我的小屋", href: "/cabin" },
  { icon: "🏆", label: "成就徽章", href: "/badges" },
  { icon: "👨‍👩‍👧", label: "家長中心", href: "/parents" },
  { icon: "📖", label: "使用說明", href: "/guide" },
  { icon: "✏️", label: "學習文章", href: "/blog" },
  { icon: "📕", label: "推薦書單", href: "/books" },
];

export default function LayeredBanner() {
  const [muted, setMuted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => setMuted(isSfxMuted()), []);

  function toggleMute() {
    const next = !muted;
    setSfxMuted(next);
    setMuted(next);
    if (!next) playClick();
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* 音效切換 */}
      <button onClick={toggleMute} className="fixed top-3 right-3 z-[60] bg-white/90 backdrop-blur w-10 h-10 rounded-full shadow flex items-center justify-center text-xl">
        {muted ? "🔇" : "🔊"}
      </button>

      {/* ===== Top Nav 桌機（純 CSS）— 用 div 不用 header，避免被 layout 的 body header{display:none} 隱藏 ===== */}
      <div className="relative z-30 hidden md:block bg-white/90 backdrop-blur-md shadow-sm border-b-2 border-yellow-200/50">
        <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center gap-2">
          <nav className="flex-1 flex justify-center gap-1 mx-2">
            {NAV.map(n => (
              <a key={n.label} href={n.href} onClick={() => playClick()} className="px-2 py-1.5 rounded-lg hover:bg-yellow-100/60 hover:-translate-y-0.5 transition flex flex-col items-center no-underline group">
                <span className="text-2xl group-hover:scale-110 transition">{n.icon}</span>
                <span className="text-[11px] font-bold text-gray-700">{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => playClick()} className="px-5 py-2 rounded-full bg-white border-2 border-sky-400 text-sky-600 font-black text-sm shadow active:scale-95 hover:bg-sky-50 transition">
              登入
            </button>
            <button onClick={() => playSuccess()} className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-sm shadow active:scale-95 hover:from-purple-600 hover:to-pink-600 transition">
              註冊
            </button>
          </div>
        </div>
      </div>

      {/* ===== Top Nav 手機 ===== */}
      <div className="relative z-30 md:hidden bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-between px-4 py-2 border-b-2 border-yellow-200/50">
        <button onClick={() => { playOpen(); setMobileMenu(true); }} className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-xl">☰</button>
        <button className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-lg">🔔</button>
      </div>

      {/* ===== Hero 分層（手機+iPad:直式 / 桌機(xl+):16:9 寬螢幕） ===== */}
      <section className="relative w-full overflow-hidden min-h-[640px] sm:min-h-[720px] md:min-h-[780px] lg:min-h-[820px] xl:min-h-[860px]">
        {/* Layer 1: 背景圖（不動）*/}
        <img
          src="/images/maps/bg-sky-castles.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 0: 左上角 Logo（最頂層）*/}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-3 left-3 md:top-5 md:left-5 z-30"
        >
          <Link href="/" className="block no-underline">
            <motion.img
              src="/images/logo-260530.webp"
              alt="Adventure English"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 md:w-44 lg:w-52 h-auto"
              style={{
                filter: "drop-shadow(0 0 15px rgba(255,255,255,1)) drop-shadow(0 0 30px rgba(255,255,255,0.9)) drop-shadow(0 0 50px rgba(255,255,255,0.7)) drop-shadow(0 0 80px rgba(255,255,255,0.4))",
              }}
            />
          </Link>
        </motion.div>

        {/* Layer 2: 飄移的扁長雲（雙向飄移，SVG 噪聲邊緣） */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            {[101, 202, 303, 404, 505, 606, 707, 808].map((seed) => (
              <filter key={seed} id={`cloud-puff-${seed}`} x="-15%" y="-50%" width="130%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed={seed} />
                <feDisplacementMap in="SourceGraphic" scale="28" />
                <feGaussianBlur stdDeviation="2" />
              </filter>
            ))}
          </defs>
        </svg>
        {[
          // 向右飄
          { top: "6%",  size: 1.5, duration: 100, delay: 0,  opacity: 0.55, seed: 101, dir: "right" as const },
          { top: "20%", size: 2.0, duration: 140, delay: 20, opacity: 0.4,  seed: 202, dir: "right" as const },
          { top: "48%", size: 1.7, duration: 120, delay: 40, opacity: 0.45, seed: 303, dir: "right" as const },
          { top: "75%", size: 1.3, duration: 95,  delay: 10, opacity: 0.5,  seed: 404, dir: "right" as const },
          // 向左飄
          { top: "12%", size: 1.2, duration: 110, delay: 30, opacity: 0.5,  seed: 505, dir: "left" as const },
          { top: "32%", size: 1.8, duration: 130, delay: 55, opacity: 0.4,  seed: 606, dir: "left" as const },
          { top: "60%", size: 1.4, duration: 105, delay: 15, opacity: 0.5,  seed: 707, dir: "left" as const },
          { top: "85%", size: 1.6, duration: 115, delay: 65, opacity: 0.45, seed: 808, dir: "left" as const },
        ].map((c, i) => {
          const widthRem = 30 * c.size;
          return (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: c.top,
                [c.dir === "right" ? "left" : "right"]: `-${widthRem}rem`,
                opacity: c.opacity,
              }}
              animate={c.dir === "right" ? { x: ["0vw", "130vw"] } : { x: ["0vw", "-130vw"] }}
              transition={{ duration: c.duration, repeat: Infinity, ease: "linear", delay: c.delay }}
            >
              <svg
                viewBox="0 0 600 100"
                style={{
                  width: `${widthRem}rem`,
                  height: `${5 * c.size}rem`,
                  filter: `url(#cloud-puff-${c.seed})`,
                }}
              >
                <g fill="white">
                  {/* 扁長雲：水平拉長的雲底 */}
                  <ellipse cx="300" cy="75" rx="280" ry="14" />
                  {/* 沿水平線散布的圓鼓（高度都不高） */}
                  <ellipse cx="80"  cy="58" rx="38" ry="26" />
                  <ellipse cx="150" cy="50" rx="42" ry="32" />
                  <ellipse cx="225" cy="45" rx="48" ry="35" />
                  <ellipse cx="305" cy="42" rx="55" ry="38" />
                  <ellipse cx="385" cy="46" rx="50" ry="35" />
                  <ellipse cx="460" cy="52" rx="45" ry="32" />
                  <ellipse cx="525" cy="60" rx="38" ry="26" />
                  {/* 填補中層 */}
                  <ellipse cx="115" cy="65" rx="30" ry="20" />
                  <ellipse cx="190" cy="62" rx="32" ry="22" />
                  <ellipse cx="265" cy="60" rx="35" ry="22" />
                  <ellipse cx="345" cy="60" rx="35" ry="22" />
                  <ellipse cx="425" cy="62" rx="32" ry="22" />
                  <ellipse cx="495" cy="65" rx="30" ry="20" />
                </g>
              </svg>
            </motion.div>
          );
        })}

        {/* Layer 3: 飄浮的小星星粒子（CSS）*/}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `${(i * 8 + 5) % 95}%`, top: `${(i * 17) % 80 + 5}%`, fontSize: i % 3 === 0 ? "24px" : "16px" }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Layer 4: 大標題 + 副標題 + 按鈕（純 CSS） */}
        <div className="absolute inset-0 flex flex-col xl:flex-row z-20">
          {/* 左側(桌機 xl+) / 上方(手機+iPad)：文字區 */}
          <div className="w-full xl:w-[45%] px-5 sm:px-6 xl:pl-[8%] 2xl:pl-[10%] xl:pr-4 pt-20 sm:pt-24 xl:pt-[5%] flex flex-col items-center xl:items-start text-center xl:text-left relative">
            {/* 文字區後方的大片白色霧光（柔焦雲團，讓文字更立體）*/}
            <div
              className="absolute pointer-events-none -z-0"
              style={{
                inset: "5% 0 5% 5%",
                background: "radial-gradient(ellipse 85% 70% at 45% 50%, rgba(255,255,255,0.9) 0%, rgba(255,250,245,0.65) 35%, rgba(255,240,250,0.35) 60%, rgba(255,255,255,0) 85%)",
                filter: "blur(35px)",
              }}
            />

            {/* 大標題：使用 explain.png（放大 + 浮動動畫） */}
            <motion.img
              src="/images/maps/explain.webp?v=1"
              alt="Adventure English"
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                scale: { duration: 0.8, type: "spring", stiffness: 80 },
                opacity: { duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              className="relative z-10 w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl mb-3 md:mb-4 xl:-ml-4"
              style={{
                filter: "drop-shadow(0 0 25px rgba(255,255,255,0.95)) drop-shadow(0 0 50px rgba(255,255,255,0.8)) drop-shadow(0 0 80px rgba(255,255,255,0.5))",
              }}
            />

            {/* 中文標題（Noto Sans TC 黑體粗體 + 深藍色 + 後方白色霧光，無外框） */}
            <div className="relative inline-block mb-3 xl:mb-4 z-10 whitespace-nowrap">
              {/* 標題後方的白色霧光（緊貼字後）*/}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-25% -10%",
                  background: "radial-gradient(ellipse 75% 65% at 50% 55%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 30%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0) 85%)",
                  filter: "blur(18px)",
                  zIndex: -1,
                }}
              />
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-noto), "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
                  fontWeight: 900,
                  fontSize: "clamp(20px, 5vw, 64px)",
                  color: "#4338ca",
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                }}
              >
                你的英文冒險即將啟航！
              </motion.h2>
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6 xl:mb-10 relative z-10 w-full max-w-[420px] xl:max-w-[40vw] mx-auto xl:mx-0 text-center"
              style={{
                fontFamily: 'var(--font-noto), "Noto Sans TC", "PingFang TC", sans-serif',
                fontWeight: 600,
                fontSize: "clamp(14px, 1.6vw, 24px)",
                color: "#3a1f0a",
                lineHeight: "1.7",
                letterSpacing: "0.03em",
                textShadow: "0 0 8px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.7), 0 0 36px rgba(255,255,255,0.5)",
              }}
            >
              透過 AI、故事、任務與冒險世界，快樂學習英文，成為自信的世界小小探險家！
            </motion.p>

            {/* CTA 按鈕（對齊文字置中、下移、放大 1.5 倍） */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-5 md:gap-6 justify-center w-full relative z-10 mt-2"
            >
              <Link href="/adventure-map" onClick={() => playStar()} className="no-underline">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(168,85,247,0.4)",
                      "0 10px 50px rgba(168,85,247,0.8)",
                      "0 10px 30px rgba(168,85,247,0.4)",
                    ],
                  }}
                  transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                  className="px-7 md:px-14 py-3 md:py-5 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white font-black flex items-center gap-2.5 cursor-pointer relative overflow-hidden"
                  style={{
                    fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
                    letterSpacing: "0.05em",
                    fontSize: "clamp(15px, 1.8vw, 26px)",
                  }}
                >
                  {/* 跑光 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative">開始冒險！</span>
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >⭐</motion.span>
                </motion.div>
              </Link>
              <motion.button
                onClick={() => playSwoosh()}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 md:px-14 py-3 md:py-5 rounded-full bg-white/95 backdrop-blur border-2 border-purple-300 text-purple-700 font-black flex items-center gap-2.5 shadow-xl"
                style={{
                  fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
                  letterSpacing: "0.05em",
                  fontSize: "clamp(15px, 1.8vw, 26px)",
                }}
              >
                <span>觀看介紹</span>
                <span style={{ fontSize: "0.85em" }}>▶</span>
              </motion.button>
            </motion.div>
          </div>

          {/* 右側(桌機 xl+) / 下方(手機+iPad)：飛船 PNG（浮動）*/}
          <motion.div
            className="w-full xl:w-[55%] flex items-center justify-center relative xl:-ml-12 mt-0 px-2 xl:px-0 flex-1 xl:flex-none min-h-0 overflow-hidden"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.img
              src="/images/maps/hero-ship-crew.webp?v=2"
              alt="Adventure English crew"
              className="object-contain"
              style={{
                width: "auto",
                height: "100%",
                maxWidth: "min(125%, 1000px)",
                maxHeight: "100%",
                filter: "drop-shadow(0 25px 35px rgba(60, 30, 100, 0.45))",
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            {/* 飛船周圍金粉 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 pointer-events-none"
                style={{ left: `${20 + (i * 11) % 70}%`, top: `${20 + (i * 13) % 60}%`, fontSize: "20px" }}
                animate={{
                  scale: [0, 1.2, 0],
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                ⭐
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Layer 5: 滾動提示 */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-purple-900/70 text-sm font-bold flex flex-col items-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>↓ 往下看更多</span>
        </motion.div>
      </section>

      {/* ===== 下方內容區（世界輪播 / 任務+夥伴 / 徽章+課程 / 收集+家長） ===== */}
      <section
        className="px-3 sm:px-4 md:px-6 pt-8 pb-4"
        style={{ background: "linear-gradient(180deg, #fef9ec 0%, #fdf0d5 100%)" }}
      >
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

          {/* 1) 探索冒險世界 —— 島嶼輪播 */}
          <div>
            <h2 className="text-center text-2xl md:text-3xl font-black text-purple-800 mb-5">⭐ 探索冒險世界 ⭐</h2>
            <div className="flex gap-4 overflow-x-auto pb-3 px-1 snap-x justify-start md:justify-center" style={{ scrollbarWidth: "thin" }}>
              {WORLDS.map(w => (
                <Link key={w.img} href={w.href} onClick={() => playClick()}
                  className="snap-start flex-shrink-0 w-40 bg-white rounded-3xl p-3 shadow-md border-2 border-amber-100 hover:-translate-y-1 hover:shadow-lg transition no-underline text-center">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-gradient-to-br from-sky-100 to-emerald-100">
                    <img src={`/images/worlds/${w.img}.webp`} alt={w.zh} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-gray-800 text-sm">{w.zh}</p>
                  <p className="text-xs text-gray-400">{w.en}</p>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Link href="/adventure-map" onClick={() => playStar()}
                className="no-underline inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black px-8 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition">
                🗺️ 進入世界地圖 →
              </Link>
            </div>
          </div>

          {/* 2) 今日任務 + 夥伴 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 今日冒險任務 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border-2 border-amber-200 shadow-sm">
              <h3 className="text-xl font-black text-orange-500 text-center mb-3">📜 今日冒險任務</h3>
              <div className="flex items-start gap-3">
                <img src="/characters/finn/finn-happy.png" alt="Finn" className="w-24 h-24 object-contain flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">陪 Finn 去冒險，完成任務拿豐富獎勵！</p>
                  {[
                    { t: "完成一個故事", n: "0/1" }, { t: "完成一個遊戲", n: "0/1" }, { t: "找到 3 個蘋果", n: "0/3" },
                  ].map(x => (
                    <div key={x.t} className="flex items-center justify-between bg-white/70 rounded-xl px-3 py-1.5 mb-1.5">
                      <span className="text-sm text-gray-700">✅ {x.t}</span>
                      <span className="text-xs font-bold text-orange-400">{x.n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/tasks" onClick={() => playStar()} className="no-underline mt-3 block text-center bg-gradient-to-r from-orange-400 to-amber-500 text-white font-black py-2.5 rounded-full hover:from-orange-500 transition">開始任務 →</Link>
            </div>

            {/* 和夥伴一起冒險 */}
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-3xl p-5 border-2 border-sky-200 shadow-sm">
              <h3 className="text-xl font-black text-indigo-500 text-center mb-4">✨ 和夥伴一起冒險！</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PALS.map((p, i) => (
                  <motion.div
                    key={p.key}
                    className="text-center cursor-pointer"
                    whileHover={{ scale: 1.12, y: -6 }}
                    whileTap={{ scale: 0.95, rotate: -4 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ y: { duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" } }}
                    onClick={() => playStar()}
                  >
                    <img
                      src={`/characters/${p.key}/${p.key}-normal.png`}
                      alt={p.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto object-contain"
                      style={{ filter: "drop-shadow(0 6px 8px rgba(80,60,120,0.25))", transform: p.key === "ruby" ? "scale(1.3)" : undefined }}
                    />
                    <p className="text-sm font-bold text-gray-600 -mt-1">{p.name}</p>
                  </motion.div>
                ))}
              </div>
              <Link href="/guide" onClick={() => playClick()} className="no-underline block text-center bg-white text-indigo-500 font-black py-2.5 rounded-full border-2 border-indigo-200 hover:bg-indigo-50 transition">認識更多夥伴 🐾</Link>
            </div>
          </div>

          {/* 3) 成就徽章 + 最新課程 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 成就徽章 */}
            <div className="bg-white rounded-3xl p-5 border-2 border-yellow-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-800 text-center mb-4">🏆 我的成就徽章</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {["🌱", "✍️", "📖", "⭐"].map((e, i) => (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-200 flex items-center justify-center text-2xl grayscale opacity-50">{e}</div>
                  </div>
                ))}
              </div>
              <Link href="/badges" onClick={() => playClick()} className="no-underline block text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-black py-2.5 rounded-full hover:from-blue-600 transition">查看全部徽章 🏆</Link>
            </div>

            {/* 最新冒險課程 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border-2 border-purple-200 shadow-sm">
              <h3 className="text-xl font-black text-purple-600 text-center mb-3">🆕 最新冒險課程</h3>
              <Link href="/courses/l3-market-street/mission/1" onClick={() => playClick()} className="no-underline flex items-center gap-3">
                <div className="w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-4xl">🍎</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">市場街 · 生活單字</p>
                  <p className="font-black text-gray-800">Market Adventure</p>
                  <p className="text-yellow-400">⭐⭐⭐</p>
                </div>
              </Link>
              <Link href="/courses/l3-market-street/mission/1" onClick={() => playStar()} className="no-underline mt-3 block text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-2.5 rounded-full hover:from-purple-600 transition">開始學習 →</Link>
            </div>
          </div>

          {/* 4) 收集 + 家長專區 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 學習越多，收集越多 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-5 border-2 border-cyan-200 shadow-sm">
              <h3 className="text-xl font-black text-cyan-600 text-center mb-4">🎁 學習越多，收集越多！</h3>
              <div className="grid grid-cols-4 gap-2">
                {[{ e: "🏅", t: "徽章" }, { e: "💎", t: "寶石" }, { e: "🧰", t: "道具" }, { e: "🎩", t: "角色裝扮" }].map(x => (
                  <Link key={x.t} href="/cabin" onClick={() => playClick()} className="no-underline text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white border-2 border-cyan-100 flex items-center justify-center text-2xl shadow-sm">{x.e}</div>
                    <p className="text-xs text-gray-500 mt-1">{x.t}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* 家長專區 */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-5 border-2 border-rose-200 shadow-sm flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-black text-rose-500 mb-1">👨‍👩‍👧 家長專區</h3>
                <p className="text-sm text-gray-600 mb-3">了解孩子的學習進度，陪伴成長每一步。</p>
                <Link href="/parents" onClick={() => playClick()} className="no-underline inline-block bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black px-6 py-2.5 rounded-full hover:from-pink-600 transition">進入家長專區 🔒</Link>
              </div>
              <img src="/images/guide/vega-book.webp" alt="家長" className="w-24 h-24 object-contain flex-shrink-0 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer（用 div 不用 footer，避開 layout 的 body footer{display:none}） ===== */}
      <div className="py-6 px-4 text-center" style={{ background: "#fdf0d5" }}>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-2">
          <Link href="/guide" className="hover:text-purple-600 no-underline">使用說明</Link>
          <Link href="/blog" className="hover:text-purple-600 no-underline">學習文章</Link>
          <Link href="/books" className="hover:text-purple-600 no-underline">推薦書單</Link>
          <Link href="/parents" className="hover:text-purple-600 no-underline">家長專區</Link>
        </div>
        <p className="text-xs text-gray-400">© 2026 Adventure English 冒險英語 · 智慧媽咪國際有限公司</p>
      </div>

      {/* 手機側邊選單 */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenu(false)}>
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="bg-white w-72 h-full shadow-2xl p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-black text-purple-800">選單</p>
              <button onClick={() => { playClick(); setMobileMenu(false); }} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-1">
              {NAV.map(n => (
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

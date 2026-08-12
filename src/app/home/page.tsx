"use client";
import Link from "next/link";
import PlacementPrompt from "@/components/PlacementPrompt";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GameButton from "@/components/GameButton";
import { useEffect, useState } from "react";
import { playClick, playSwoosh, playStar, playOpen, playSuccess, setSfxMuted, isSfxMuted } from "@/lib/sfx";
import { COURSES } from "@/data/courses";
import { playGreeting, isMuted as isVegaMuted, setMuted as setVegaMuted, playVega, stopVega } from "@/lib/vega-audio";
import AdSlot from '@/components/AdSlot';
import AuthButton from '@/components/AuthButton';

// 島嶼 slug → 島嶼圖（缺的用漸層占位）
const ISLAND_IMG: Record<string, string> = {
  "l1-letter-island": "island-letter", "l2-sound-island": "island-sound",
  "l3-market-street": "island-market", "l4-school-road": "island-school",
  "l5-coral-beach": "island-coral", "l6-lighthouse-point": "island-lighthouse",
  "l7-grammar-gate": "island-grammar", "l8-question-tower": "island-question",
  "l10-future-bridge": "island-future", "l11-challenge-arena": "island-challenge",
};
// 冒險夥伴介紹（課程裡的六位教學夥伴；頭像用 -normal，vega 用嚮導圖）
const PALS = [
  { key: "finn", name: "Finn" },
  { key: "coco", name: "Coco" },
  { key: "ruby", name: "Ruby" },
  { key: "benny", name: "Benny" },
  { key: "polly", name: "Polly" },
  { key: "vega", name: "Vega" },
];
// 自選角色（跟 /choose-character 同一組）——「目前角色」小卡用
const AVATARS = [
  { key: "elly", name: "艾莉" },
  { key: "sky", name: "小飛" },
  { key: "coco", name: "可可" },
  { key: "leo", name: "雷歐" },
  { key: "vera", name: "薇拉" },
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
  { icon: "👨‍👩‍👧", label: "家長冒險中心", href: "/parents" },
  { icon: "📖", label: "使用說明", href: "/guide" },
  { icon: "✏️", label: "冒險圖書館", href: "/blog" },
  { icon: "📕", label: "閱讀花園", href: "/books" },
];

export default function LayeredBanner() {
  const [muted, setMuted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => { try { setAvatar(localStorage.getItem('ae_avatar')); } catch {} }, []);
  const router = useRouter();

  useEffect(() => setMuted(isSfxMuted() && isVegaMuted()), []);

  // Vega 語音：第一次來播歡迎詞，之後每天第一次回來播「歡迎回來」
  useEffect(() => { playGreeting(); }, []);

  // 開始冒險：第一次先看使用說明→選夥伴→地圖；看過就直接跳過
  function startAdventure() {
    playStar();
    let seenGuide = false, hasAvatar = false;
    try {
      seenGuide = !!localStorage.getItem('ae_seen_guide');
      hasAvatar = !!localStorage.getItem('ae_avatar');
    } catch {}
    if (!seenGuide) router.push('/guide');
    else if (!hasAvatar) router.push('/choose-character');
    else router.push('/adventure-map');
  }

  // 🔊 一顆鈕同時管音效與 Vega 語音（之前只管音效，首頁關不掉語音）
  function toggleMute() {
    const next = !muted;
    setSfxMuted(next);
    setVegaMuted(next);
    setMuted(next);
    if (next) stopVega(); else playClick();
  }

  // 瀏覽器規定：使用者互動前不能自動出聲，所以歡迎詞給一顆按鈕自己點
  function sayHello() {
    if (isVegaMuted()) { setVegaMuted(false); setMuted(false); }
    playVega('01-welcome');
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* 聲音控制：聽 Vega 說話 + 全站靜音（放 header 下方，別蓋住右上角的家長登入／🔔） */}
      <div className="fixed top-[60px] md:top-[80px] right-3 z-[60] flex items-center gap-2">
        <button onClick={sayHello} title="聽 Vega 說話"
          className="bg-white/90 backdrop-blur rounded-full shadow border-2 border-purple-200 px-3 h-10 flex items-center gap-1.5 font-black text-purple-700 text-sm active:scale-95 transition hover:bg-white">
          <span className="text-lg">🔊</span><span className="hidden sm:inline">聽 Vega 說話</span>
        </button>
        <button onClick={toggleMute} title={muted ? "開啟聲音" : "關閉聲音"}
          className="bg-white/90 backdrop-blur w-10 h-10 rounded-full shadow flex items-center justify-center text-xl active:scale-95 transition">
          {muted ? "🔇" : "🔈"}
        </button>
      </div>

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
          <div className="flex gap-2 flex-shrink-0 items-center">
            <AuthButton />
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
              <div onClick={startAdventure} className="no-underline cursor-pointer">
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
              </div>
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
            // 這裡本來有 overflow-hidden：飛船算出來比容器高（205 vs 196），
            // 就被切掉上下各一條，看起來像鸚鵡旁邊卡了一條線。飛船本來就去背有陰影，不需要裁。
            className="w-full xl:w-[55%] flex items-center justify-center relative xl:-ml-12 mt-0 px-2 xl:px-0 flex-1 xl:flex-none min-h-0"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.img
              src="/images/maps/hero-ship-crew.webp?v=4"
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
              <GameButton href="/adventure-map" color="purple" size="lg">🗺️ 進入世界地圖 →</GameButton>
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
              <div className="mt-3 text-center"><GameButton href="/tasks" color="gold">開始任務 →</GameButton></div>
            </div>

          </div>

          {/* 2b) 我的冒險夥伴 —— 六位教學夥伴的介紹（照設計稿）；旁邊小卡點進去是「自己的角色」/choose-character */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-amber-200 shadow-lg">
            <img src="/images/home/pals-band.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative px-3 pt-3 pb-4">
              <h3 className="text-lg sm:text-2xl font-black text-white mb-2" style={{ textShadow: "0 2px 6px rgba(20,60,20,.75)" }}>
                ⭐ 我的冒險夥伴
              </h3>
              <div className="flex items-end gap-2 sm:gap-4">
                <div className="flex-1 grid grid-cols-6 gap-0.5 sm:gap-2 items-end">
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
                      {/* 圖檔同高但寬度不一，要用「高度」縮放才會一樣大；用寬度縮的話寬的變矮、窄的變高 */}
                      <img
                        src={`/characters/${p.key}/${p.key}-normal.png`}
                        alt={p.name}
                        className="h-[76px] sm:h-[120px] w-auto mx-auto object-contain"
                        style={{ filter: "drop-shadow(0 6px 8px rgba(30,60,30,0.4))" }}
                      />
                      <span className="ae-name-plaque">{p.name}</span>
                    </motion.div>
                  ))}
                </div>
                {/* 目前角色（桌機才放得下）：點進去到 /choose-character 選自己的角色 */}
                <div className="hidden lg:block shrink-0 w-36 ae-frame text-center">
                  <p className="m-0 font-black text-amber-900 text-xs">目前角色</p>
                  <p className="m-0 font-black text-amber-700 text-lg leading-tight">{AVATARS.find(a => a.key === avatar)?.name ?? "還沒選"}</p>
                  <div className="mt-1.5"><GameButton href="/choose-character" color="gold" size="sm" sound="click">我的角色 →</GameButton></div>
                </div>
              </div>
              <div className="text-center mt-2 lg:hidden">
                <GameButton href="/choose-character" color="gold" size="sm" sound="click">我的角色 →</GameButton>
              </div>
            </div>
          </div>

          {/* 3) 成就徽章 —— 六格木架，圖上的凹槽就是格子，位置量測自 badge-shelf.webp */}
          <div>
            {/* 框跟圖同比例，格子才對得上凹槽；只限寬度，不要限高度（限高會讓框比圖寬，格子就飛出去了）*/}
            <div className="relative w-full mx-auto" style={{ aspectRatio: "1536 / 1024", maxWidth: "640px" }}>
              <img src="/images/home/badge-shelf.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
              <h3 className="absolute left-1/2 -translate-x-1/2 top-[4%] font-black text-white text-base sm:text-2xl whitespace-nowrap"
                style={{ textShadow: "0 2px 6px rgba(20,60,20,.85)" }}>🏆 我的成就徽章</h3>
              <div className="absolute flex items-center justify-between" style={{ left: "15.5%", right: "15.5%", top: "42%", height: "16%" }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <img key={i} src="/images/badges/ach-locked.webp" alt="" className="h-full object-contain opacity-75" />
                ))}
              </div>
            </div>
            <div className="text-center -mt-2">
              <GameButton href="/badges" color="purple" sound="click">查看全部徽章 🏆</GameButton>
            </div>
          </div>

          {/* 4) 最新課程 + 收集 */}
          <div className="grid md:grid-cols-2 gap-6">
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
              <div className="mt-3 text-center"><GameButton href="/courses/l3-market-street/mission/1" color="orange">開始學習 →</GameButton></div>
            </div>

            {/* 學習越多，收集越多 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-5 border-2 border-cyan-200 shadow-sm">
              <h3 className="text-xl font-black text-cyan-600 text-center mb-4">🎁 學習越多，收集越多！</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[{ e: "🏅", t: "徽章" }, { e: "💎", t: "寶石" }, { e: "🧰", t: "道具" }, { e: "🎩", t: "角色裝扮" }].map(x => (
                  <Link key={x.t} href="/cabin" onClick={() => playClick()} className="no-underline text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white border-2 border-cyan-100 flex items-center justify-center text-2xl shadow-sm">{x.e}</div>
                    <p className="text-xs text-gray-500 mt-1">{x.t}</p>
                  </Link>
                ))}
              </div>
              <div className="text-center"><GameButton href="/cabin" color="green" sound="click">打開我的收藏 →</GameButton></div>
            </div>
          </div>

          {/* 5) 家長專區 —— 左邊放插圖，右邊講重點 */}
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-0 rounded-3xl overflow-hidden border-4 border-rose-200 shadow-lg bg-rose-50">
            <img src="/images/home/parent-photo.webp" alt="" className="w-full h-44 md:h-full object-cover" />
            <div className="p-4 sm:p-6 flex flex-col justify-center">
              <h3 className="text-lg sm:text-2xl font-black text-rose-600 m-0">了解孩子學習進度，陪伴成長每一步！</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-3">在家長專區查看學習報告、推薦書單與學習攻略。</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[{ i: "📗", t: "學習報告" }, { i: "📕", t: "推薦書單" }, { i: "💡", t: "學習攻略" }].map(x => (
                  <div key={x.t} className="bg-white rounded-xl border-2 border-rose-200 px-1 py-2 text-center">
                    <div className="text-xl sm:text-2xl leading-none">{x.i}</div>
                    <p className="m-0 font-black text-gray-600 text-[11px] sm:text-xs mt-1">{x.t}</p>
                  </div>
                ))}
              </div>
              <div><GameButton href="/parents" color="orange" sound="click">進入家長專區 →</GameButton></div>
            </div>
          </div>

          {/* 6) 收尾 CTA */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-amber-300 shadow-lg">
            <img src="/images/maps/bg-sky-castles.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-amber-900/30" />
            <div className="relative px-4 py-7 text-center">
              <h3 className="font-black text-white text-lg sm:text-3xl m-0" style={{ textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>
                準備好開始你的英文冒險了嗎？
              </h3>
              <p className="text-white/95 font-bold text-xs sm:text-base mt-2 mb-4" style={{ textShadow: "0 1px 5px rgba(0,0,0,.55)" }}>
                跟著 Finn 和夥伴們，一起探索 6 大世界、完成 240 堂課程！
              </p>
              <GameButton href="/adventure-map" color="gold" size="lg">🗺️ 探索學習地圖 →</GameButton>
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
              <div className="flex justify-center"><AuthButton /></div>
            </div>
          </motion.div>
        </div>
      )}
      {/* 廣告：整頁最下方，不擋內容 */}
      <div className="max-w-3xl mx-auto px-4">
        <PlacementPrompt />
      </div>

      <AdSlot place="homeBottom" className="pb-6 pt-2" />
    </div>
  );
}

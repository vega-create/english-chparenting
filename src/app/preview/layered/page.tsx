"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playClick, playSwoosh, playStar, playOpen, playSuccess, setSfxMuted, isSfxMuted } from "@/lib/sfx";

const NAV = [
  { icon: "🗺", label: "冒險地圖", href: "#" },
  { icon: "🌍", label: "六大世界", href: "#" },
  { icon: "🤖", label: "AI 口說", href: "#" },
  { icon: "📖", label: "閱讀故事", href: "#" },
  { icon: "📜", label: "每日任務", href: "#" },
  { icon: "🏆", label: "成就徽章", href: "#" },
  { icon: "🏠", label: "我的小屋", href: "#" },
  { icon: "👨‍👩‍👧", label: "家長中心", href: "#" },
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

      {/* ===== Top Nav 桌機（純 CSS） ===== */}
      <header className="relative z-30 hidden md:block bg-white/90 backdrop-blur-md shadow-sm border-b-2 border-yellow-200/50">
        <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center gap-2">
          <Link href="/preview/layered" className="flex items-center gap-1 no-underline flex-shrink-0" onClick={() => playClick()}>
            <div className="font-black text-lg lg:text-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-none whitespace-nowrap">
              Adventure<br />English
            </div>
            <span className="text-amber-500">🐾</span>
          </Link>
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
      </header>

      {/* ===== Top Nav 手機 ===== */}
      <header className="relative z-30 md:hidden bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-between px-4 py-2 border-b-2 border-yellow-200/50">
        <button onClick={() => { playOpen(); setMobileMenu(true); }} className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-xl">☰</button>
        <Link href="/preview/layered" className="font-black text-lg bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-none no-underline text-center">
          Adventure<br />English
        </Link>
        <button className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-lg">🔔</button>
      </header>

      {/* ===== Hero 分層（手機+iPad:直式 / 桌機(xl+):16:9 寬螢幕） ===== */}
      <section className="relative w-full overflow-hidden min-h-[640px] sm:min-h-[720px] md:min-h-[780px] lg:min-h-[820px] xl:min-h-0 xl:aspect-[16/9] xl:max-h-[calc(100vh-60px)]">
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
                  fontSize: "clamp(24px, 5vw, 64px)",
                  color: "#4338ca",
                  letterSpacing: "0.03em",
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
              <Link href="/preview/v4" onClick={() => playStar()} className="no-underline">
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

      {/* ===== 下方功能卡片區（4 張圖 + 按鈕，響應式，填滿整排） ===== */}
      <section
        className="py-8 sm:py-10 md:py-14 px-3 sm:px-4 md:px-6 lg:px-8"
        style={{
          background: "linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
        }}
      >
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
            {[
              { img: "today-task",    btn: "前往任務",     btnIcon: "📜", href: "/courses", color: "from-orange-400 to-amber-500", shadow: "rgba(234,88,12,0.4)" },
              { img: "my-cabin",      btn: "進入小屋",     btnIcon: "🏠", href: "/adventure-map", color: "from-emerald-400 to-green-600", shadow: "rgba(5,150,105,0.4)" },
              { img: "achievements",  btn: "查看全部",     btnIcon: "🏆", href: "/preview", color: "from-blue-500 to-indigo-600",   shadow: "rgba(37,99,235,0.4)" },
              { img: "parent-center", btn: "前往家長中心", btnIcon: "👨‍👩‍👧", href: "/guide",  color: "from-pink-500 to-rose-600",     shadow: "rgba(225,29,72,0.4)" },
            ].map((card, i) => (
              <motion.div
                key={card.img}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                {/* 卡片圖片（可點擊）*/}
                <Link href={card.href} onClick={() => playClick()} className="block no-underline">
                  <motion.img
                    src={`/images/cards/${card.img}.webp?v=2`}
                    alt={card.btn}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full h-auto rounded-3xl"
                    style={{
                      filter: "drop-shadow(0 8px 20px rgba(120,53,15,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.12))",
                    }}
                  />
                </Link>

                {/* CTA 按鈕 */}
                <Link href={card.href} onClick={() => playStar()} className="no-underline block">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r ${card.color} text-white font-black text-center flex items-center justify-center gap-2 cursor-pointer`}
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 18px)",
                      letterSpacing: "0.05em",
                      boxShadow: `0 6px 16px ${card.shadow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                    }}
                  >
                    <span>{card.btn}</span>
                    <span>{card.btnIcon}</span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { playPageIntro } from '@/lib/vega-audio';
import {
  WORLDS,
  isWorldUnlocked,
  getWorldCompletion,
  getCurrentWorldId,
  resetProgress,
  type WorldDef,
} from "@/lib/progress";
import { playClick, playStar, playSwoosh } from "@/lib/sfx";
import MapDialogue from "@/components/MapDialogue";
import HomeButton from "@/components/HomeButton";
import AdSlot from '@/components/AdSlot';

// 六個世界在 adventure-map.png 上的位置（百分比，覆蓋整個島）
const HOTSPOTS = [
  { id: 1, x: 17,  y: 22, w: 22, h: 32 },  // 彩虹谷 左上
  { id: 2, x: 42,  y: 15, w: 22, h: 32 },  // 友善小鎮 中上
  { id: 3, x: 75,  y: 22, w: 22, h: 30 },  // 海洋灣 右上
  { id: 4, x: 15,  y: 56, w: 24, h: 30 },  // 故事城堡 左下
  { id: 5, x: 45,  y: 52, w: 22, h: 32 },  // 探索大陸 中下
  { id: 6, x: 76,  y: 55, w: 22, h: 32 },  // 冠軍峰 右下
];

export default function AdventureMapPage() {
  useEffect(() => { playPageIntro('adventure-map'); }, []);

  const [tick, setTick] = useState(0);                            // 重新渲染用
  const [showLocked, setShowLocked] = useState<WorldDef | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [currentWorld, setCurrentWorld] = useState(1);
  // 依 localStorage 重新渲染
  useEffect(() => {
    const refresh = () => { setTick(t => t + 1); setCurrentWorld(getCurrentWorldId()); };
    refresh();
    window.addEventListener("ae-progress-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ae-progress-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // 從 URL 開啟 debug 模式
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowDebug(new URLSearchParams(window.location.search).has("debug"));
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: "linear-gradient(180deg, #cbe6ff 0%, #ffd5e8 35%, #fff0a8 65%, #b8dec0 100%)",
    }}>
      <HomeButton />
      {/* 上方工具列 */}
      <Link href="/" style={{ top: "calc(0.75rem + env(safe-area-inset-top))", left: "calc(0.75rem + env(safe-area-inset-left))" }} className="fixed z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回
      </Link>
      <div style={{ top: "calc(0.75rem + env(safe-area-inset-top))", right: "calc(0.75rem + env(safe-area-inset-right))" }} className="fixed z-50 flex gap-2">
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1">
          <span>🗺️</span>
          <span className="text-purple-700">World {currentWorld}/{WORLDS.length}</span>
        </div>
        {showDebug && (
          <button onClick={() => { resetProgress(); playSwoosh(); }} className="bg-red-100 px-3 py-1.5 rounded-full text-xs font-black text-red-700 shadow">
            🔄 重置
          </button>
        )}
      </div>

      {/* 地圖容器（依比例填滿視窗，不自動旋轉）*/}
      <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
        <div
          className="relative w-full"
          style={{
            maxWidth: "min(100vw, calc(100vh * 1536 / 1024), calc(100svh * 1536 / 1024))",
            aspectRatio: "1536 / 1024",
          }}
        >
          <img src="/images/maps/adventure-map.webp" alt="Adventure English Map" className="absolute inset-0 w-full h-full object-contain block select-none" draggable={false} />

          {/* 底部羊皮紙橫幅：嚮導對話框（跟著地圖縮放） */}
          <div className="absolute z-30" style={{ left: "5%", right: "5%", top: "79%", bottom: "4%" }}>
            <MapDialogue />
          </div>

          {/* ===== 動畫層：大朵雲 + 熱氣球 + 魔法粒子 ===== */}

          {/* SVG 噪聲濾鏡：雲的不規則邊緣 */}
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
            <defs>
              {[111, 222, 333, 444, 555, 666].map(seed => (
                <filter key={seed} id={`am-cloud-${seed}`} x="-20%" y="-50%" width="140%" height="200%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="3" seed={seed} />
                  <feDisplacementMap in="SourceGraphic" scale="28" />
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              ))}
            </defs>
          </svg>

          {/* 各種雲（粗細混合、雙向、速度較快）*/}
          {[
            { kind: "thin"   as const, top: "3%",  w: 28, dur: 65, delay: 0,  op: 0.28, dir: "right" as const, seed: 111, yPath: [0, -2.5, 1, -1.5, 2, -0.5, 0] },
            { kind: "medium" as const, top: "9%",  w: 18, dur: 55, delay: 15, op: 0.26, dir: "right" as const, seed: 222, yPath: [0, 1.5, -2, 1, -1.5, 2.5, 0] },
            { kind: "thick"  as const, top: "17%", w: 14, dur: 75, delay: 30, op: 0.28, dir: "right" as const, seed: 333, yPath: [0, -1, 2, -1.5, 1, -2, 0] },
            { kind: "thin"   as const, top: "26%", w: 32, dur: 80, delay: 8,  op: 0.20, dir: "right" as const, seed: 111, yPath: [0, 2, -1, 1.5, -2, 0.5, 0] },
            { kind: "medium" as const, top: "6%",  w: 20, dur: 60, delay: 22, op: 0.28, dir: "left"  as const, seed: 444, yPath: [0, 2, -1.5, 1.5, -2.5, 1, 0] },
            { kind: "thick"  as const, top: "13%", w: 12, dur: 70, delay: 5,  op: 0.30, dir: "left"  as const, seed: 555, yPath: [0, -2.5, 1, -2, 1.5, -1, 0] },
            { kind: "thin"   as const, top: "20%", w: 30, dur: 75, delay: 35, op: 0.20, dir: "left"  as const, seed: 666, yPath: [0, -1.5, 2, -1, 1.5, -2, 0] },
            { kind: "medium" as const, top: "28%", w: 16, dur: 50, delay: 12, op: 0.28, dir: "left"  as const, seed: 333, yPath: [0, 2.5, -1, 2, -1.5, 0.5, 0] },
          ].map((c, i) => (
            <motion.div
              key={`am-cloud-${i}`}
              className="absolute pointer-events-none"
              style={{
                top: c.top,
                [c.dir === "right" ? "left" : "right"]: `-${c.w * 1.3}%`,
                opacity: c.op,
                width: `${c.w}%`,
                zIndex: 5,
              }}
              animate={{
                x: c.dir === "right" ? ["0%", "900%"] : ["0%", "-900%"],
                y: c.yPath.map(v => `${v}%`),
              }}
              transition={{
                x: { duration: c.dur, repeat: Infinity, ease: "linear", delay: c.delay },
                y: { duration: c.dur * 0.7, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {c.kind === "thin" && (
                <svg viewBox="0 0 700 60" style={{ width: "100%", height: "auto", display: "block", filter: `url(#am-cloud-${c.seed})` }}>
                  <g fill="white">
                    <ellipse cx="350" cy="38" rx="320" ry="11" />
                    <ellipse cx="140" cy="30" rx="65" ry="15" />
                    <ellipse cx="250" cy="25" rx="80" ry="17" />
                    <ellipse cx="370" cy="22" rx="85" ry="18" />
                    <ellipse cx="490" cy="26" rx="75" ry="16" />
                    <ellipse cx="590" cy="32" rx="60" ry="14" />
                  </g>
                </svg>
              )}
              {c.kind === "medium" && (
                <svg viewBox="0 0 600 50" style={{ width: "100%", height: "auto", display: "block", filter: `url(#am-cloud-${c.seed})` }}>
                  <g fill="white">
                    <ellipse cx="300" cy="32" rx="280" ry="9" />
                    <ellipse cx="120" cy="25" rx="55" ry="12" />
                    <ellipse cx="220" cy="22" rx="65" ry="14" />
                    <ellipse cx="320" cy="20" rx="70" ry="15" />
                    <ellipse cx="420" cy="24" rx="60" ry="13" />
                    <ellipse cx="500" cy="28" rx="45" ry="11" />
                  </g>
                </svg>
              )}
              {c.kind === "thick" && (
                <svg viewBox="0 0 500 100" style={{ width: "100%", height: "auto", display: "block", filter: `url(#am-cloud-${c.seed})` }}>
                  <g fill="white">
                    <ellipse cx="250" cy="70" rx="220" ry="15" />
                    <ellipse cx="110" cy="55" rx="50" ry="28" />
                    <ellipse cx="200" cy="42" rx="60" ry="35" />
                    <ellipse cx="290" cy="40" rx="65" ry="36" />
                    <ellipse cx="380" cy="50" rx="55" ry="30" />
                  </g>
                </svg>
              )}
            </motion.div>
          ))}

          {/* 真實感熱氣球（PNG 圖檔，雙向飄移）*/}
          {[
            { top: "5%",  w: 7, dur: 90,  delay: 0,  dir: "right" as const, src: "/images/balloons/balloon-1.webp", yPath: [0, -3, 1.5, -2, 1, -3.5, 0], rotPath: [0, 3, -2, 4, -1, 0] },
            { top: "15%", w: 5, dur: 105, delay: 25, dir: "left"  as const, src: "/images/balloons/balloon-2.webp", yPath: [0, 2, -1.5, 3, -2.5, 1.5, 0], rotPath: [0, -3, 2, -4, 1, 0] },
            { top: "25%", w: 6, dur: 95,  delay: 12, dir: "right" as const, src: "/images/balloons/balloon-3.webp", yPath: [0, -2, 3, -2, 1.5, -3, 0],   rotPath: [0, 2, -3, 1, -2, 0] },
          ].map((b, i) => (
            <motion.img
              key={`am-balloon-${i}`}
              src={b.src}
              alt=""
              className="absolute pointer-events-none"
              style={{
                top: b.top,
                [b.dir === "right" ? "left" : "right"]: `-${b.w + 2}%`,
                width: `${b.w}%`,
                minWidth: "50px",
                maxWidth: "120px",
                filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
                zIndex: 8,
              }}
              animate={{
                x: b.dir === "right" ? ["0%", "1400%"] : ["0%", "-1400%"],
                y: b.yPath.map(v => `${v}%`),
                rotate: b.rotPath,
              }}
              transition={{
                x:      { duration: b.dur, repeat: Infinity, ease: "linear", delay: b.delay },
                y:      { duration: 9, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }}
              draggable={false}
            />
          ))}

          {/* 魔法粒子 */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`am-spark-${i}`}
              className="absolute pointer-events-none text-xs md:text-sm"
              style={{
                left: `${(i * 8 + 7) % 95}%`,
                top: `${(i * 11 + 15) % 70 + 15}%`,
                filter: "drop-shadow(0 0 4px rgba(255,235,80,0.8))",
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 180] }}
              transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
            >✨</motion.div>
          ))}

          {/* 路徑閃光：在世界與世界之間，從每個解鎖世界往下一個飄過去（中心點計算）*/}
          {HOTSPOTS.slice(0, -1).map((spot, i) => {
            const next = HOTSPOTS[i + 1];
            const fromUnlocked = isWorldUnlocked(spot.id);
            if (!fromUnlocked) return null;
            const x1 = spot.x + spot.w / 2;
            const y1 = spot.y + spot.h / 2;
            const x2 = next.x + next.w / 2;
            const y2 = next.y + next.h / 2;
            const toUnlocked = isWorldUnlocked(next.id);
            return [0, 0.3, 0.6].map((offset) => (
              <motion.div
                key={`am-pathspark-${spot.id}-${offset}`}
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: toUnlocked
                    ? "radial-gradient(circle, rgba(255,235,80,1) 0%, rgba(255,200,0,0.6) 40%, rgba(255,200,0,0) 70%)"
                    : "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%)",
                  filter: "blur(0.5px)",
                  marginLeft: "-7px",
                  marginTop: "-7px",
                  zIndex: 14,
                }}
                animate={{
                  left:    [`${x1}%`, `${x2}%`],
                  top:     [`${y1}%`, `${y2}%`],
                  opacity: [0, 1, 1, 0],
                  scale:   [0.5, 1.2, 1.2, 0.3],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: offset * 3.5,
                  ease: "linear",
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            ));
          })}

          {/* 6 個世界 hotspot */}
          {HOTSPOTS.map((spot) => {
            const world = WORLDS.find(w => w.id === spot.id)!;
            const unlocked = isWorldUnlocked(world.id);
            const { done, total, isComplete } = getWorldCompletion(world.id);

            return (
              <div
                key={world.id}
                className="absolute"
                style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.w}%`, height: `${spot.h}%` }}
              >
                {/* 鎖頭：只有圖示周圍的圓形柔焦暗影，不蓋整個島 */}
                {!unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="relative flex items-center justify-center"
                      style={{ width: "min(45%, 80px)", height: "min(45%, 80px)" }}
                    >
                      {/* 圓形柔焦暗影背景 */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "radial-gradient(circle, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 75%)",
                        }}
                      />
                      {/* 鎖頭圖示 */}
                      <span
                        className="relative text-3xl md:text-5xl"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
                      >
                        🔒
                      </span>
                    </motion.div>
                  </div>
                )}

                {/* 已解鎖：脈衝光暈（當前世界更明顯） */}
                {unlocked && !isComplete && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,220,0,0.4) 0%, rgba(255,220,0,0) 70%)" }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* 完成勾勾 */}
                {isComplete && (
                  <div className="absolute top-1 right-1 z-10 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-base md:text-2xl shadow-lg border-2 border-white">
                    ✓
                  </div>
                )}

                {/* 互動按鈕 — World 1 走客製化彩虹谷地圖，其他走通用 lesson 列表 */}
                {unlocked ? (
                  <Link
                    href={world.id === 1 ? "/adventure-map/rainbow-valley" : `/adventure-map/world/${world.id}`}
                    onClick={() => playStar()}
                    className="absolute inset-0 cursor-pointer no-underline"
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full h-full"
                    />
                  </Link>
                ) : (
                  <button
                    onClick={() => { playClick(); setShowLocked(world); }}
                    className="absolute inset-0 cursor-pointer"
                    aria-label={`${world.name} (locked)`}
                  />
                )}

                {/* 進度小條（已解鎖才顯示）*/}
                {unlocked && total > 0 && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-2 py-0.5 rounded-full text-[10px] md:text-xs font-black shadow pointer-events-none whitespace-nowrap">
                    {done}/{total}
                  </div>
                )}

                {/* Debug 框 */}
                {showDebug && (
                  <div className="absolute inset-0 border-2 border-red-500 bg-red-500/10 pointer-events-none rounded">
                    <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1 font-bold">{world.id}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* === Locked World NPC 對話 === */}
      <AnimatePresence>
        {showLocked && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLocked(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* 頂部世界 banner（半透明 + 鎖頭） */}
              <div className={`relative bg-gradient-to-br ${showLocked.color} p-6 text-center text-white`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative">
                  <div className="text-5xl mb-2 opacity-60">{showLocked.emoji}</div>
                  <p className="text-xs font-bold opacity-90">World {showLocked.id}</p>
                  <p className="text-2xl font-black drop-shadow">{showLocked.name}</p>
                  <p className="text-sm opacity-90">{showLocked.nameEn} · {showLocked.level}</p>
                  <div className="absolute top-0 right-0 text-3xl">🔒</div>
                </div>
              </div>

              {/* NPC 對話 */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <img src="/characters/finn/finn-normal.png" alt="Finn" className="w-16 h-16 object-contain flex-shrink-0" />
                  <div className="flex-1 bg-amber-50 border-2 border-amber-200 rounded-2xl rounded-tl-none p-3">
                    <p className="text-xs text-amber-700 font-bold mb-1">Finn 狐狸</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{showLocked.npcLine}</p>
                  </div>
                </div>

                {/* 上一關進度 */}
                {showLocked.id > 1 && (() => {
                  const prev = WORLDS[showLocked.id - 2];
                  const prevProg = getWorldCompletion(prev.id);
                  return (
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3 mb-4">
                      <p className="text-xs text-purple-700 font-bold mb-2">先完成 → World {prev.id} {prev.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                            style={{ width: `${(prevProg.done / prevProg.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-purple-700">{prevProg.done}/{prevProg.total}</span>
                      </div>
                      <Link
                        href={`/adventure-map/world/${prev.id}`}
                        onClick={() => { playStar(); setShowLocked(null); }}
                        className="mt-3 w-full block text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-2 rounded-full text-sm no-underline"
                      >
                        前往 {prev.name} →
                      </Link>
                    </div>
                  );
                })()}

                <button onClick={() => { playClick(); setShowLocked(null); }} className="w-full py-2.5 text-sm text-gray-500">
                  關閉
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 廣告：整頁最下方，不擋內容 */}
      <AdSlot place="mapBottom" className="pb-6 pt-2" />
    </div>
  );
}

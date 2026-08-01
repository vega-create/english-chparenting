"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { playClick, playStar, playSuccess, playSwoosh } from "@/lib/sfx";
import { wordSlug } from "@/lib/audio";

// 單字小圖：有去背 PNG 就用圖，沒有用 emoji（emoji 從單字推不到，這裡只放圖或字）
function WordImg({ en }: { en: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { if (ref.current && ref.current.complete && ref.current.naturalWidth === 0) setOk(false); }, []);
  return ok
    ? <img ref={ref} src={`/words/${wordSlug(en)}.png`} alt={en} onError={() => setOk(false)} className="w-[70%] h-[70%] object-contain" />
    : <span className="text-lg">🔤</span>;
}

// ============ 12 個關卡資料 ============
interface LevelDef {
  id: number;
  name: string;
  nameEn: string;
  goal: string;
  npcLine: string;
  x: number;
  y: number;
  emoji: string;
}

// 12 關固定資料（對齊字母島 L1 M1–M12）— 位置依裝置在下方獨立定義
const LEVELS_BASE = [
  { id: 1,  name: "彩虹入口",   nameEn: "Rainbow Gate",   goal: "認識 5 位夥伴，學會打招呼",            npcLine: "歡迎來到彩虹谷！我是 Miss Vega，先來認識大家、學會說 Hello 吧～",              emoji: "🌈" },
  { id: 2,  name: "字母沙灘",   nameEn: "Letter Beach",   goal: "字母 A B C D：apple, ball, cat, dog",  npcLine: "沙灘洞窟藏著字母 A 到 D！A is for Apple 🍎",                                    emoji: "🏖️" },
  { id: 3,  name: "字母森林",   nameEn: "Letter Forest",  goal: "字母 E F G H：egg, fish, goat, hat",   npcLine: "走進字母森林，找找 E、F、G、H 開頭的東西！",                                    emoji: "🌲" },
  { id: 4,  name: "字母山丘",   nameEn: "Letter Hills",   goal: "字母 I J K L：igloo, jam, kite, lion", npcLine: "爬上字母山丘！I、J、K、L 在等你～L is for Lion 🦁",                             emoji: "⛰️" },
  { id: 5,  name: "篝火晚會",   nameEn: "Campfire Song",  goal: "唱字母歌，複習 A 到 L",                 npcLine: "坐到營火旁，一起唱字母歌複習 A 到 L！🎵",                                       emoji: "🔥" },
  { id: 6,  name: "燈塔海邊",   nameEn: "Lighthouse Bay", goal: "字母 M N O P：moon, nest, orange, pig",npcLine: "走到燈塔海邊，找 M、N、O、P！M is for Moon 🌙",                                 emoji: "🌊" },
  { id: 7,  name: "字母城堡",   nameEn: "Letter Castle",  goal: "字母 Q R S T：queen, rabbit, sun, tiger",npcLine: "推開城堡大門！Q、R、S、T 住在這裡～Q is for Queen 👑",                          emoji: "🏰" },
  { id: 8,  name: "字母雲端",   nameEn: "Sky Letters",    goal: "字母 U V W X：umbrella, van, watch, fox",npcLine: "飛上雲端找字母 U、V、W、X！",                                                   emoji: "☁️" },
  { id: 9,  name: "字母之巔",   nameEn: "Letter Peak",    goal: "字母 Y Z：yoyo, zebra（A–Z 完成！）",  npcLine: "最後兩個字母 Y 和 Z 在山頂！完成就會 26 個字母囉～",                            emoji: "🏔️" },
  { id: 10, name: "星空音樂會", nameEn: "Starry Concert", goal: "唱完整字母歌，複習 M 到 Z",             npcLine: "星空下開音樂會，唱完整的 ABC 歌！🌟",                                           emoji: "🌟" },
  { id: 11, name: "字母工坊",   nameEn: "Letter Workshop",goal: "大小寫配對 + 字母書寫",                 npcLine: "來字母工坊！把大寫和小寫配對，練習寫字母～",                                    emoji: "✏️" },
  { id: 12, name: "彩虹守護龍", nameEn: "Rainbow Dragon", goal: "A–Z 總驗收！擊敗守護龍拿字母徽章",     npcLine: "我是守護彩虹的龍！用上你所有字母 A 到 Z，打敗我吧 🐉🌈",                        emoji: "🐉" },
];

// === 三種裝置的地圖配置（圖檔、比例、12 關位置）===
type DeviceKind = "desktop" | "ipad" | "phone";

const MAP_CONFIG: Record<DeviceKind, { src: string; aspectRatio: string; positions: { x: number; y: number }[] }> = {
  // 桌機橫向 (1536×1024, 3:2)
  desktop: {
    src: "/images/maps/rainbow-valley.webp?v=3",
    aspectRatio: "1536 / 1024",
    positions: [
      { x: 20, y: 90 }, // 1 RAINBOW VALLEY
      { x: 25, y: 75 }, // 2 字母花園
      { x: 12, y: 65 }, // 3 ABC 瀑布
      { x: 27, y: 38 }, // 4 彩虹橋
      { x: 35, y: 22 }, // 5 聲音森林
      { x: 52, y: 16 }, // 6 魔法山洞
      { x: 65, y: 26 }, // 7 字母神殿
      { x: 52, y: 49 }, // 8 聲音湖
      { x: 72, y: 65 }, // 9 拼讀小徑
      { x: 48, y: 82 }, // 10 拼讀森林
      { x: 84, y: 82 }, // 11 彩虹競技場
      { x: 82, y: 24 }, // 12 彩虹守護龍
    ],
  },
  // iPad (1448×1086, ~4:3)
  ipad: {
    src: "/images/maps/rainbow-valley_ipad.webp?v=3",
    aspectRatio: "1448 / 1086",
    positions: [
      { x: 13, y: 90 }, // 1 RAINBOW VALLEY
      { x: 25, y: 75 }, // 2 字母花園
      { x: 13, y: 50 }, // 3 ABC 瀑布
      { x: 28, y: 36 }, // 4 彩虹橋
      { x: 30, y: 25 }, // 5 聲音森林
      { x: 50, y: 19 }, // 6 魔法山洞
      { x: 65, y: 26 }, // 7 字母神殿
      { x: 50, y: 50 }, // 8 聲音湖
      { x: 74, y: 62 }, // 9 拼讀小徑
      { x: 45, y: 80 }, // 10 拼讀森林
      { x: 82, y: 80 }, // 11 彩虹競技場
      { x: 86, y: 19 }, // 12 彩虹守護龍
    ],
  },
  // 手機直式 (853×1844, ~9:19)
  phone: {
    src: "/images/maps/rainbow-valley_p.webp?v=3",
    aspectRatio: "853 / 1844",
    positions: [
      { x: 25, y: 90 }, // 1 RAINBOW VALLEY
      { x: 25, y: 75 }, // 2 ABC 花園
      { x: 15, y: 50 }, // 3 ABC 瀑布
      { x: 28, y: 36 }, // 4 彩虹橋
      { x: 30, y: 27 }, // 5 聲音森林
      { x: 50, y: 19 }, // 6 山洞
      { x: 67, y: 30 }, // 7 神殿
      { x: 69, y: 50 }, // 8 青蛙湖
      { x: 75, y: 62 }, // 9 cat/bat
      { x: 55, y: 75 }, // 10 松鼠
      { x: 76, y: 82 }, // 11 星星擂台
      { x: 78, y: 19 }, // 12 城堡 龍
    ],
  },
};

// 玩家角色列表（之後可以無限擴充）
const CHARACTERS = [
  { key: "girl3_1", name: "小冒險家",   src: "/images/characters/girl3_1.webp?v=2" },
  // 之後加新角色：{ key: "boy1", name: "小勇者", src: "/images/characters/boy1.webp" },
];

type Status = "completed" | "current" | "locked";
const LS_KEY = "rainbowValleyProgress";
const LS_CHAR = "rainbowValleyCharacter";

interface Props {
  onAllComplete?: () => void;
}

export default function RainbowValleyMap({ onAllComplete }: Props) {
  const [currentId, setCurrentId] = useState(1);
  const [openLevel, setOpenLevel] = useState<LevelDef | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [device, setDevice] = useState<DeviceKind>("desktop");
  const [showDebug, setShowDebug] = useState(false);
  const [characterKey, setCharacterKey] = useState(CHARACTERS[0].key);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null); // 選角頁選的角色
  const [showCharSwitcher, setShowCharSwitcher] = useState(false);

  // 偵測裝置：phone / ipad / desktop（依視窗大小 + 方向 + UA）
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ua = navigator.userAgent;
      const portrait = h > w;
      setIsPortrait(portrait && w < 900);

      // 真實裝置 UA 偵測（最可靠）
      const isPhone = /iPhone|Android.*Mobile/i.test(ua);
      const isIPad = /iPad|Macintosh.*Touch|Android(?!.*Mobile)/i.test(ua) || (ua.includes("Mac") && navigator.maxTouchPoints > 1);

      let kind: DeviceKind;
      if (isPhone) {
        kind = "phone";
      } else if (isIPad) {
        kind = "ipad";
      } else {
        // fallback 用視窗尺寸
        if (w < 768) kind = "phone";
        else if (w < 1400) kind = "ipad";    // iPad Pro 12.9" 橫向 1366px 也算 iPad
        else kind = "desktop";
        if (h < 500) kind = "phone";          // 手機橫向
      }
      setDevice(kind);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  // 統一用桌機版地圖（手機請橫向玩，不再分版）
  const mapCfg = MAP_CONFIG.desktop;
  void device;
  const LEVELS: LevelDef[] = LEVELS_BASE.map((l, i) => ({
    ...l,
    x: mapCfg.positions[i].x,
    y: mapCfg.positions[i].y,
  }));

  // 讀 localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const n = parseInt(saved, 10);
        if (!isNaN(n) && n >= 1 && n <= LEVELS.length + 1) setCurrentId(n);
      }
      const ch = localStorage.getItem(LS_CHAR);
      if (ch && CHARACTERS.some(c => c.key === ch)) setCharacterKey(ch);
      // 選角頁選的角色（elly/sky/coco/leo/vera）→ 走關卡的主角
      const av = localStorage.getItem("ae_avatar");
      if (av && /^[a-z]+$/.test(av)) setAvatarSrc(`/images/avatars/${av}.webp`);
      // debug 模式（網址 ?debug=1）
      if (new URLSearchParams(window.location.search).has("debug")) setShowDebug(true);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_KEY, String(currentId)); } catch {}
  }, [currentId, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_CHAR, characterKey); } catch {}
  }, [characterKey, hydrated]);

  function statusOf(id: number): Status {
    if (id < currentId) return "completed";
    if (id === currentId) return "current";
    return "locked";
  }

  function completeLevel() {
    if (!openLevel) return;
    if (openLevel.id !== currentId) return;
    playSuccess();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);

    const next = currentId + 1;
    if (next > LEVELS.length) {
      setCurrentId(LEVELS.length + 1);
      setOpenLevel(null);
      onAllComplete?.();
    } else {
      setCurrentId(next);
      setOpenLevel(null);
    }
  }

  function resetProgress() {
    playSwoosh();
    setCurrentId(1);
    setOpenLevel(null);
  }

  const playerLevel = LEVELS.find(l => l.id === Math.min(currentId, LEVELS.length))!;
  const allDone = currentId > LEVELS.length;
  const currentChar = CHARACTERS.find(c => c.key === characterKey) || CHARACTERS[0];

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, #ffe5e5 0%, #fff0d4 35%, #d4f0ff 70%, #c8efd0 100%)",
      }}
    >
      {/* 頂部工具列 */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3">
        <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xl flex items-center gap-1.5">
          <span>🌈</span>
          <span className="text-purple-700">彩虹谷</span>
          <span className="text-gray-400">·</span>
          <span className="text-pink-600">{Math.min(currentId - 1, LEVELS.length)}/{LEVELS.length}</span>
        </div>
        <button
          onClick={() => { playClick(); setShowCharSwitcher(true); }}
          className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border-2 border-purple-200 text-purple-700 active:scale-95 transition flex items-center gap-1"
        >
          🧒 角色
        </button>
        <button
          onClick={resetProgress}
          className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border-2 border-red-200 text-red-600 active:scale-95 transition"
        >
          🔄
        </button>
      </div>

      {/* 手機直式時：建議橫向操作 */}
      {isPortrait && (
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-white/95 backdrop-blur rounded-2xl shadow-2xl px-5 py-4 text-center max-w-[280px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            className="text-5xl mb-2"
            animate={{ rotate: [0, 90, 90, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.3, 0.6, 0.9, 1] }}
          >📱</motion.div>
          <p className="font-black text-purple-700 text-base">把手機轉橫向</p>
          <p className="text-xs text-gray-600 mt-1">橫著拿才看得清楚整張地圖喔！</p>
          <button
            onClick={() => setIsPortrait(false)}
            className="mt-3 text-xs text-purple-500 underline"
          >直立繼續（地圖會比較小）</button>
        </motion.div>
      )}

      {/* 地圖區（滿版，依裝置切換圖檔與比例）*/}
      <div className="relative w-full overflow-hidden" style={{ height: "100vh", maxHeight: "100svh" }}>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            // 比例對應該裝置的圖檔，依視窗限制填滿較小那一邊
            width: `min(100vw, calc(100vh * ${mapCfg.aspectRatio.replace(' / ', '/')}), calc(100svh * ${mapCfg.aspectRatio.replace(' / ', '/')}))`,
            aspectRatio: mapCfg.aspectRatio,
          }}
        >
        <img
          src={mapCfg.src}
          alt="Rainbow Valley Map"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* ============ 動畫層：大朵雲 + 熱氣球 + 魔法粒子 ============ */}

        {/* SVG 噪聲濾鏡：雲的不規則邊緣（像 banner 那樣） */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            {[11, 22, 33, 44, 55, 66].map(seed => (
              <filter key={seed} id={`rv-cloud-${seed}`} x="-20%" y="-50%" width="140%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="3" seed={seed} />
                <feDisplacementMap in="SourceGraphic" scale="28" />
                <feGaussianBlur stdDeviation="2" />
              </filter>
            ))}
          </defs>
        </svg>

        {/* ===== 彩虹閃光（地圖左上彩虹區域） ===== */}
        {/* 彩虹周圍的大光暈呼吸 */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: "3%",
            top: "30%",
            width: "20%",
            height: "30%",
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,200,255,0.2) 35%, rgba(255,255,255,0) 70%)",
            zIndex: 6,
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ===== 大彩虹閃光（橫跨地圖頂部的拱形彩虹） ===== */}
        {/* 沿著彩虹拱形分布的閃星：x 從 5 → 85，y 為拋物線（峰值在中央 5%）*/}
        {[
          { x: 6,  y: 24, color: "#ef4444", size: 14, delay: 0   },
          { x: 13, y: 17, color: "#f97316", size: 12, delay: 0.3 },
          { x: 22, y: 11, color: "#facc15", size: 15, delay: 0.6 },
          { x: 30, y: 7,  color: "#22c55e", size: 13, delay: 0.9 },
          { x: 40, y: 5,  color: "#3b82f6", size: 16, delay: 0.2 },
          { x: 48, y: 4,  color: "#a855f7", size: 14, delay: 0.5 },
          { x: 56, y: 5,  color: "#ec4899", size: 13, delay: 0.8 },
          { x: 64, y: 8,  color: "#fde047", size: 15, delay: 1.1 },
          { x: 72, y: 12, color: "#06b6d4", size: 12, delay: 0.4 },
          { x: 80, y: 18, color: "#f472b6", size: 14, delay: 0.7 },
          { x: 86, y: 25, color: "#fb923c", size: 13, delay: 1.0 },
          // 拱形內部隨機亮光
          { x: 35, y: 14, color: "white",   size: 10, delay: 1.3 },
          { x: 55, y: 12, color: "white",   size: 11, delay: 0.1 },
        ].map((s, i) => (
          <motion.div
            key={`rv-big-rainbow-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              color: s.color,
              filter: `drop-shadow(0 0 6px ${s.color}) drop-shadow(0 0 10px white)`,
              zIndex: 7,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >✦</motion.div>
        ))}

        {/* 大彩虹拱形整體呼吸光暈 */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: "10%",
            top: "0%",
            width: "80%",
            height: "30%",
            background: "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(255,255,255,0.35) 0%, rgba(255,220,255,0.15) 40%, rgba(255,255,255,0) 75%)",
            zIndex: 6,
            filter: "blur(12px)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 彩虹沿線的彩色閃光粒子 */}
        {[
          { x: 4,  y: 32, color: "#ef4444", size: 14, delay: 0 },
          { x: 7,  y: 26, color: "#f97316", size: 12, delay: 0.4 },
          { x: 11, y: 22, color: "#facc15", size: 16, delay: 0.8 },
          { x: 16, y: 24, color: "#22c55e", size: 13, delay: 1.2 },
          { x: 20, y: 28, color: "#3b82f6", size: 15, delay: 0.2 },
          { x: 22, y: 34, color: "#a855f7", size: 12, delay: 0.6 },
          { x: 6,  y: 38, color: "#ec4899", size: 11, delay: 1.0 },
          { x: 19, y: 40, color: "#fde047", size: 14, delay: 0.5 },
        ].map((s, i) => (
          <motion.div
            key={`rv-rb-sparkle-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              color: s.color,
              filter: `drop-shadow(0 0 6px ${s.color}) drop-shadow(0 0 10px white)`,
              zIndex: 7,
            }}
            animate={{
              scale: [0, 1.4, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >✦</motion.div>
        ))}

        {/* 彩虹端點散發的光線 */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: "4%",
            top: "44%",
            width: "8%",
            height: "12%",
            background: "radial-gradient(circle, rgba(255,235,150,0.7) 0%, rgba(255,200,100,0) 70%)",
            zIndex: 6,
            filter: "blur(4px)",
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 各種雲（雙向，速度較快，粗細混合）
            kind: "thin" = 超細卷雲 (viewBox 800x30) | "medium" = 中等扁雲 (600x50) | "thick" = 較粗雲團 (500x90) */}
        {[
          // 向右
          { kind: "thin"   as const, top: "3%",  w: 28, dur: 60, delay: 0,   op: 0.30, dir: "right" as const, seed: 11, yPath: [0, -2.5, 1, -1.5, 2, -0.5, 0] },
          { kind: "medium" as const, top: "9%",  w: 18, dur: 50, delay: 15,  op: 0.28, dir: "right" as const, seed: 22, yPath: [0, 1.5, -2, 1, -1.5, 2.5, 0] },
          { kind: "thick"  as const, top: "17%", w: 14, dur: 70, delay: 30,  op: 0.30, dir: "right" as const, seed: 33, yPath: [0, -1, 2, -1.5, 1, -2, 0] },
          { kind: "thin"   as const, top: "26%", w: 32, dur: 75, delay: 8,   op: 0.22, dir: "right" as const, seed: 11, yPath: [0, 2, -1, 1.5, -2, 0.5, 0] },
          // 向左
          { kind: "medium" as const, top: "6%",  w: 20, dur: 55, delay: 20,  op: 0.28, dir: "left"  as const, seed: 44, yPath: [0, 2, -1.5, 1.5, -2.5, 1, 0] },
          { kind: "thick"  as const, top: "13%", w: 12, dur: 65, delay: 5,   op: 0.32, dir: "left"  as const, seed: 55, yPath: [0, -2.5, 1, -2, 1.5, -1, 0] },
          { kind: "thin"   as const, top: "20%", w: 30, dur: 70, delay: 35,  op: 0.20, dir: "left"  as const, seed: 66, yPath: [0, -1.5, 2, -1, 1.5, -2, 0] },
          { kind: "medium" as const, top: "28%", w: 16, dur: 45, delay: 12,  op: 0.30, dir: "left"  as const, seed: 33, yPath: [0, 2.5, -1, 2, -1.5, 0.5, 0] },
        ].map((c, i) => (
          <motion.div
            key={`rv-cloud-${i}`}
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
              <svg viewBox="0 0 700 60" style={{ width: "100%", height: "auto", display: "block", filter: `url(#rv-cloud-${c.seed})` }}>
                <g fill="white">
                  {/* 細卷雲：薄但有厚度，不是一條線 */}
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
              <svg viewBox="0 0 600 50" style={{ width: "100%", height: "auto", display: "block", filter: `url(#rv-cloud-${c.seed})` }}>
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
              <svg viewBox="0 0 500 100" style={{ width: "100%", height: "auto", display: "block", filter: `url(#rv-cloud-${c.seed})` }}>
                <g fill="white">
                  {/* 較粗：有點蓬鬆但不算大 */}
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
          { top: "6%",  w: 8,  dur: 80, delay: 0,  dir: "right" as const, src: "/images/balloons/balloon-1.webp", yPath: [0, -3, 1.5, -2, 1, -3.5, 0], rotPath: [0, 3, -2, 4, -1, 0] },
          { top: "16%", w: 6,  dur: 95, delay: 25, dir: "left"  as const, src: "/images/balloons/balloon-2.webp", yPath: [0, 2, -1.5, 3, -2.5, 1.5, 0], rotPath: [0, -3, 2, -4, 1, 0] },
          { top: "26%", w: 7,  dur: 85, delay: 12, dir: "right" as const, src: "/images/balloons/balloon-3.webp", yPath: [0, -2, 3, -2, 1.5, -3, 0],   rotPath: [0, 2, -3, 1, -2, 0] },
        ].map((b, i) => (
          <motion.img
            key={`balloon-${i}`}
            src={b.src}
            alt=""
            className="absolute pointer-events-none"
            style={{
              top: b.top,
              [b.dir === "right" ? "left" : "right"]: `-${b.w + 2}%`,
              width: `${b.w}%`,
              minWidth: "60px",
              maxWidth: "140px",
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

        {/* 魔法粒子（散落） */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute pointer-events-none text-xs md:text-base"
            style={{
              left: `${(i * 7 + 5) % 95}%`,
              top: `${(i * 13 + 10) % 80 + 10}%`,
              filter: "drop-shadow(0 0 4px rgba(255,235,80,0.8))",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.3, 0.5],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >✨</motion.div>
        ))}

        {/* 路徑連線 + 閃光 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {LEVELS.slice(0, -1).map((lvl, i) => {
            const next = LEVELS[i + 1];
            const isPassed = lvl.id < currentId;
            const isCurrent = lvl.id === currentId - 1 || (lvl.id === currentId && next.id === currentId + 1);
            return (
              <g key={lvl.id}>
                {/* 底線 */}
                <line
                  x1={lvl.x} y1={lvl.y} x2={next.x} y2={next.y}
                  stroke={isPassed ? "rgba(255,215,0,0.85)" : "rgba(255,255,255,0.5)"}
                  strokeWidth="0.5"
                  strokeDasharray={isPassed ? "0" : "1.5 1.5"}
                  strokeLinecap="round"
                />
                {/* 已通過的路：金光流動 */}
                {isPassed && (
                  <line
                    x1={lvl.x} y1={lvl.y} x2={next.x} y2={next.y}
                    stroke="white"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeDasharray="2 4"
                    opacity="0.7"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1.2s" repeatCount="indefinite" />
                  </line>
                )}
              </g>
            );
          })}
        </svg>

        {/* 路徑上的旅行閃光（從每關往下一關移動）*/}
        {LEVELS.slice(0, -1).map((lvl, i) => {
          const next = LEVELS[i + 1];
          const isPassed = lvl.id < currentId;
          const isActive = lvl.id <= currentId;
          if (!isActive) return null;
          // 3 個閃光以不同 offset 出發
          return [0, 0.33, 0.66].map((offset) => (
            <motion.div
              key={`spark-${lvl.id}-${offset}`}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: "10px",
                height: "10px",
                background: isPassed
                  ? "radial-gradient(circle, rgba(255,235,80,1) 0%, rgba(255,200,0,0.6) 40%, rgba(255,200,0,0) 70%)"
                  : "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%)",
                filter: "blur(0.5px)",
                marginLeft: "-5px",
                marginTop: "-5px",
                zIndex: 14,
              }}
              animate={{
                left:    [`${lvl.x}%`, `${next.x}%`],
                top:     [`${lvl.y}%`, `${next.y}%`],
                opacity: [0, 1, 1, 0],
                scale:   [0.5, 1, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: offset * 3,
                ease: "linear",
                times: [0, 0.15, 0.85, 1],
              }}
            />
          ));
        })}

        {/* 12 個關卡點 */}
        {LEVELS.map((lvl) => {
          const status = statusOf(lvl.id);
          return (
            <button
              key={lvl.id}
              onClick={() => { playClick(); setOpenLevel(lvl); }}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${lvl.x}%`, top: `${lvl.y}%`, zIndex: 15 }}
              aria-label={`Level ${lvl.id}: ${lvl.name}`}
            >
              {/* Debug 框 */}
              {showDebug && (
                <div className="absolute -inset-6 border-2 border-red-500 bg-red-500/10 rounded pointer-events-none">
                  <span className="absolute -top-4 left-0 bg-red-500 text-white text-[10px] px-1 font-bold rounded">L{lvl.id} ({lvl.x},{lvl.y})</span>
                </div>
              )}

              {status === "current" && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(255,235,80,0.7) 0%, rgba(255,235,80,0) 70%)" }}
                    animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full border-4 border-yellow-300"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}

              <motion.div
                whileHover={status !== "locked" ? { scale: 1.15 } : { scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                animate={status === "current" ? { y: [0, -6, 0] } : {}}
                transition={status === "current" ? { y: { duration: 1.4, repeat: Infinity } } : {}}
                className={`relative flex items-center justify-center font-black shadow-2xl border-[3px] sm:border-4 transition
                  w-[36px] h-[36px] text-[17px]
                  sm:w-[52px] sm:h-[52px] sm:text-2xl
                  md:w-[62px] md:h-[62px] md:text-3xl
                  rounded-full
                  ${status === "completed" ? "bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 border-white text-amber-900" : ""}
                  ${status === "current"   ? "bg-gradient-to-br from-white via-yellow-50 to-yellow-200 border-yellow-400 text-purple-700" : ""}
                  ${status === "locked"    ? "bg-gradient-to-br from-gray-400 to-gray-600 border-gray-300/60 text-white opacity-85" : ""}
                `}
                style={{
                  filter: status === "current"
                    ? "drop-shadow(0 0 12px rgba(255,215,0,0.9)) drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                    : status === "completed"
                    ? "drop-shadow(0 0 8px rgba(255,200,0,0.6)) drop-shadow(0 3px 5px rgba(0,0,0,0.25))"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  textShadow: status === "completed"
                    ? "0 1px 2px rgba(255,255,255,0.6)"
                    : status === "locked"
                    ? "0 1px 2px rgba(0,0,0,0.5)"
                    : "0 1px 2px rgba(255,255,255,0.8)",
                }}
              >
                {/* 永遠顯示關卡編號 */}
                {lvl.id}
                {/* 已完成右上角小星星 */}
                {status === "completed" && (
                  <span className="absolute -top-1.5 -right-1.5 text-xs sm:text-sm md:text-base drop-shadow-md">⭐</span>
                )}
                {/* 鎖住右上角小鎖頭 */}
                {status === "locked" && (
                  <span className="absolute -top-1.5 -right-1.5 text-xs sm:text-sm md:text-base drop-shadow-md">🔒</span>
                )}
              </motion.div>

              {status === "current" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white/95 backdrop-blur px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black whitespace-nowrap shadow-md pointer-events-none">
                  L{lvl.id} · {lvl.name}
                </div>
              )}
            </button>
          );
        })}

        {/* 玩家角色 */}
        {!allDone && (
          <motion.img
            src={avatarSrc || currentChar.src}
            alt={currentChar.name}
            className="absolute pointer-events-none"
            style={{
              left: `${playerLevel.x}%`,
              top: `${playerLevel.y}%`,
              // clamp(最小, 期望, 最大) — 手機小、桌機大
              width: "clamp(36px, 5vw, 84px)",
              transform: "translate(-50%, -100%)",
              // 白色光暈 + 黑色陰影：讓角色明顯浮起
              filter: "drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 0 24px rgba(255,255,255,0.8)) drop-shadow(0 0 40px rgba(255,255,255,0.55)) drop-shadow(0 10px 14px rgba(0,0,0,0.5))",
              zIndex: 30,
            }}
            initial={false}
            animate={{ left: `${playerLevel.x}%`, top: `${playerLevel.y}%`, y: [0, -12, 0] }}
            transition={{
              left:  { type: "spring", stiffness: 80, damping: 14 },
              top:   { type: "spring", stiffness: 80, damping: 14 },
              y:     { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
            }}
            draggable={false}
          />
        )}

        {/* 全部完成 */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 100, rotate: { duration: 1, repeat: Infinity } }}
              className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl pointer-events-auto"
            >
              <div className="text-6xl sm:text-7xl mb-2">🏆🌈</div>
              <p className="text-xl sm:text-2xl font-black text-purple-700">恭喜征服彩虹谷！</p>
              <p className="text-sm text-gray-600 mt-1">你已經完成所有 12 個關卡！</p>
              <button
                onClick={resetProgress}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-6 py-2.5 rounded-full text-sm shadow-lg active:scale-95"
              >
                🔄 再玩一次
              </button>
            </motion.div>
          </motion.div>
        )}
        </div>
      </div>

      <p className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 text-center text-[11px] sm:text-xs text-purple-700 bg-white/85 backdrop-blur px-3 py-1 rounded-full shadow whitespace-nowrap">
        💡 點 <span className="font-black">數字</span> 開始 · <span className="font-black">⭐</span> 可複習 · 🔒 解鎖中{showDebug ? ` · 🐛 ${device.toUpperCase()}` : ""}
      </p>

      {/* ============= RPG 對話框（Miss Vega） ============= */}
      <AnimatePresence>
        {openLevel && (
          <motion.div
            className="fixed inset-0 z-50 bg-cover bg-center flex items-center justify-center p-3 sm:p-4"
            style={{ backgroundImage: "linear-gradient(rgba(70,50,120,0.15), rgba(70,50,120,0.3)), url(/images/maps/bg-sky-castles.webp)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenLevel(null)}
          >
            <motion.div
              className="w-full max-w-[440px]"
              initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={e => e.stopPropagation()}
            >
              {/* 木牌：彩虹谷 / 字母島 / N/12 */}
              <div
                className="relative mx-auto w-full max-w-[360px] h-[175px] flex flex-col items-center justify-center text-center"
                style={{ backgroundImage: "url(/images/wood-sign.webp)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
              >
                <p className="text-amber-50 text-base font-bold mb-0.5" style={{ textShadow: "0 1px 2px rgba(90,45,10,.8)" }}>✦ 彩虹谷 ✦</p>
                <h2 className="text-5xl cute-text leading-none">字母島</h2>
                <p className="text-amber-50 text-lg font-black mt-2" style={{ textShadow: "0 1px 2px rgba(90,45,10,.8)" }}>{openLevel.id} / 12</p>
              </div>

              {/* Coco（大，左）+ 對話泡泡（右下） */}
              <div className="flex items-end gap-0 -mt-3">
                <img src="/characters/coco/coco-point.png" alt="Coco" className="w-48 h-48 sm:w-52 sm:h-52 object-contain flex-shrink-0 drop-shadow-xl -ml-3" />
                <div className="flex-1 bg-white rounded-2xl rounded-bl-none border-2 border-pink-200 px-4 py-3.5 shadow-lg mb-10">
                  <p className="text-base text-gray-700 leading-relaxed font-medium">嗨～我是 <span className="font-black text-pink-500">Coco</span>！這裡是彩虹谷的字母島，我們一起來認讀字母吧！</p>
                </div>
              </div>

              {/* 按鈕 */}
              <div className="-mt-2 px-4 space-y-2">
                {statusOf(openLevel.id) === "locked" ? (
                  <button onClick={() => { playClick(); setOpenLevel(null); }} className="w-full py-3 bg-gray-300 text-gray-600 font-black rounded-full active:scale-95">🔒 先完成前一關</button>
                ) : statusOf(openLevel.id) === "completed" ? (
                  <button onClick={() => { playClick(); setOpenLevel(null); }} className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black rounded-full shadow-lg active:scale-95">⭐ 已完成 · 之後可重新挑戰</button>
                ) : (
                  <Link href={`/courses/l1-letter-island/mission/${openLevel.id}`} onClick={() => playStar()} className="block w-full py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-black rounded-full shadow-lg active:scale-95 text-xl text-center no-underline">Let&apos;s Go! 開始冒險 ⭐</Link>
                )}
                <button onClick={() => { playClick(); setOpenLevel(null); }} className="w-full py-1.5 text-sm text-white/80">關閉</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============= 角色選擇 ============= */}
      <AnimatePresence>
        {showCharSwitcher && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCharSwitcher(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-center font-black text-purple-700 text-lg mb-3">🧒 選擇你的角色</p>
              <div className="grid grid-cols-3 gap-3">
                {CHARACTERS.map(c => (
                  <button
                    key={c.key}
                    onClick={() => { setCharacterKey(c.key); playStar(); setShowCharSwitcher(false); }}
                    className={`rounded-2xl p-2 border-4 transition active:scale-95 ${
                      characterKey === c.key ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <img src={c.src} alt={c.name} className="w-full h-auto" />
                    <p className="text-xs font-black text-purple-700 mt-1">{c.name}</p>
                  </button>
                ))}
                {CHARACTERS.length < 3 && (
                  <div className="rounded-2xl p-2 border-4 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-bold">
                    + 更多<br/>即將推出
                  </div>
                )}
              </div>
              <button onClick={() => setShowCharSwitcher(false)} className="w-full mt-4 py-2 text-sm text-gray-500">關閉</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============= 撒花 ============= */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl sm:text-3xl"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  opacity: 0,
                  scale: [0, 1.4, 0.5],
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              >
                {["⭐", "✨", "🌟", "💫", "🎉"][i % 5]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// 12 個關卡點，位置百分比（手調讓路徑漂亮）
const ISLANDS = [
  { id: 1,  name: "字母島",   emoji: "🔤", world: "rainbow",   x: 12, y: 78, locked: false, current: true },
  { id: 2,  name: "聲音島",   emoji: "🔊", world: "rainbow",   x: 28, y: 68 },
  { id: 3,  name: "市場街",   emoji: "🛒", world: "town",      x: 42, y: 76 },
  { id: 4,  name: "學校路",   emoji: "🎒", world: "town",      x: 55, y: 65 },
  { id: 5,  name: "珊瑚灘",   emoji: "🐚", world: "ocean",     x: 70, y: 75 },
  { id: 6,  name: "燈塔角",   emoji: "💡", world: "ocean",     x: 82, y: 60 },
  { id: 7,  name: "文法門",   emoji: "📖", world: "castle",    x: 70, y: 45 },
  { id: 8,  name: "問題塔",   emoji: "❓", world: "castle",    x: 55, y: 42 },
  { id: 9,  name: "時光道",   emoji: "⏳", world: "explorer",  x: 38, y: 35 },
  { id: 10, name: "未來橋",   emoji: "🌉", world: "explorer",  x: 25, y: 28 },
  { id: 11, name: "挑戰場",   emoji: "⚔️", world: "champion",  x: 40, y: 18 },
  { id: 12, name: "勝利峰",   emoji: "🏔️", world: "champion",  x: 60, y: 12 },
];

const WORLD_LABELS = [
  { name: "彩虹谷", x: 18, y: 86, emoji: "🌈" },
  { name: "友善小鎮", x: 48, y: 85, emoji: "🏡" },
  { name: "海洋灣", x: 78, y: 85, emoji: "🌊" },
  { name: "故事城堡", x: 64, y: 50, emoji: "🏰" },
  { name: "探索大陸", x: 30, y: 38, emoji: "🌍" },
  { name: "冠軍峰", x: 50, y: 8, emoji: "🎓" },
];

const KID_EMOJI: Record<string, string> = {
  "kid-1": "👦", "kid-2": "👧", "kid-3": "🧒", "kid-4": "👶", "kid-5": "🧑‍🦱", "kid-6": "👦🏽",
};
const PET_EMOJI: Record<string, string> = {
  dragon: "🐲", unicorn: "🦄", penguin: "🐧", panda: "🐼", butterfly: "🦋",
};

export default function MapPage() {
  const [player, setPlayer] = useState<{ name: string; kid: string; pet: string; stars?: number; gems?: number; streak?: number; lastLogin?: string } | null>(null);
  const [selected, setSelected] = useState<typeof ISLANDS[0] | null>(null);
  const [welcomeBack, setWelcomeBack] = useState<{ days: number; bonus: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ae-player");
    if (saved) {
      const data = JSON.parse(saved);
      setPlayer(data);

      // 判斷是否「歡迎回來」
      if (data.lastLogin) {
        const last = new Date(data.lastLogin);
        const now = new Date();
        const days = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

        if (days >= 1) {
          // 隔天回來，給驚喜
          const bonus = days === 1 ? 10 : Math.min(50, days * 5);
          setWelcomeBack({ days, bonus });
          const updated = {
            ...data,
            gems: (data.gems || 0) + bonus,
            lastLogin: now.toISOString(),
            streak: days === 1 ? (data.streak || 0) + 1 : 1,
          };
          localStorage.setItem("ae-player", JSON.stringify(updated));
          setPlayer(updated);
        } else {
          // 同一天再回來，更新時間就好
          const updated = { ...data, lastLogin: now.toISOString() };
          localStorage.setItem("ae-player", JSON.stringify(updated));
          setPlayer(updated);
        }
      }
    }
  }, []);

  const stars = player?.stars ?? 0;
  const gems = player?.gems ?? 0;
  const streak = player?.streak ?? 1;

  if (!player) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 px-4 text-center">
        <p className="text-purple-800 mb-4 text-xl">還沒建立你的冒險者！</p>
        <Link href="/preview/v4" className="bg-purple-500 text-white px-8 py-3 rounded-full font-bold no-underline">建立角色</Link>
      </div>
    );
  }

  const kidEmoji = KID_EMOJI[player.kid] || "👦";
  const petEmoji = PET_EMOJI[player.pet] || "🥚";
  const current = ISLANDS.find(i => i.current) ?? ISLANDS[0];

  // 從沒登入過？也算第一次到地圖
  const firstTimeVisit = !player.stars && !welcomeBack;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* === 歡迎回來彈窗 === */}
      <AnimatePresence>
        {welcomeBack && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWelcomeBack(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-7 max-w-sm w-full shadow-2xl border-4 border-white relative overflow-hidden"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={e => e.stopPropagation()}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -right-10 text-8xl opacity-30">✨</motion.div>
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl text-center mb-3">🎁</motion.div>
              <h2 className="text-3xl font-black text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-1">
                歡迎回來，{player.name}！
              </h2>
              <p className="text-center text-purple-700 mb-4">
                {welcomeBack.days === 1 ? "再次冒險！" : `已經 ${welcomeBack.days} 天沒見了！`}
              </p>
              <div className="bg-white/80 rounded-2xl p-4 text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">每日回歸獎勵</p>
                <p className="text-3xl font-black text-cyan-600">💎 +{welcomeBack.bonus}</p>
                {welcomeBack.days === 1 && (
                  <p className="text-sm text-orange-600 font-bold mt-2">🔥 連續登入 {streak} 天！</p>
                )}
              </div>
              <button
                onClick={() => setWelcomeBack(null)}
                className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg rounded-2xl shadow-lg active:scale-95"
              >
                ✨ 領取繼續冒險
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* === 漸層水彩風背景 === */}
      <div className="fixed inset-0 bg-gradient-to-b from-sky-200 via-pink-100 via-yellow-100 to-emerald-100" />
      <div className="fixed inset-0 opacity-40">
        <div className="absolute top-[5%] left-[10%] text-9xl select-none pointer-events-none">🌈</div>
        <div className="absolute top-[10%] right-[15%] text-7xl select-none pointer-events-none">☁️</div>
        <div className="absolute top-[20%] left-[40%] text-6xl select-none pointer-events-none">☁️</div>
        <div className="absolute top-[35%] right-[8%] text-7xl select-none pointer-events-none">⛅</div>
        <div className="absolute bottom-[50%] left-[20%] text-9xl select-none pointer-events-none">⛰️</div>
        <div className="absolute bottom-[40%] right-[20%] text-9xl select-none pointer-events-none">🏔️</div>
        <div className="absolute bottom-[10%] left-[5%] text-9xl select-none pointer-events-none">🌊</div>
        <div className="absolute bottom-[15%] right-[5%] text-8xl select-none pointer-events-none">🌳</div>
        <div className="absolute bottom-[30%] left-[60%] text-7xl select-none pointer-events-none">🌲</div>
        <div className="absolute top-[50%] left-[5%] text-6xl select-none pointer-events-none">🌸</div>
      </div>

      {/* === Top HUD === */}
      <header className="relative z-30 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="bg-white/80 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border-2 border-white">
            <span className="text-2xl">{kidEmoji}</span>
            <div>
              <div className="text-[10px] text-purple-600 leading-none">冒險者</div>
              <div className="text-sm font-black text-purple-800 leading-none">{player.name}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/80 backdrop-blur rounded-full px-3 py-2 shadow border-2 border-white flex items-center gap-1.5 text-sm font-black">
              <span>⭐</span><span className="text-amber-600">{stars}</span>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-full px-3 py-2 shadow border-2 border-white flex items-center gap-1.5 text-sm font-black">
              <span>💎</span><span className="text-cyan-600">{gems}</span>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-full px-3 py-2 shadow border-2 border-white flex items-center gap-1.5 text-sm font-black">
              <span>🔥</span><span className="text-orange-600">{streak}</span>
            </div>
          </div>
        </div>
      </header>

      {/* === Map === */}
      <main className="relative z-20 max-w-5xl mx-auto h-[calc(100vh-160px)] my-2 mx-4 md:mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-200/70 via-yellow-100/60 to-sky-100/70 shadow-2xl border-4 border-white/60 backdrop-blur">
        {/* 路徑 SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d={ISLANDS.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
            stroke="url(#pathGrad)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* World 標籤 */}
        {WORLD_LABELS.map(w => (
          <div key={w.name} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ left: `${w.x}%`, top: `${w.y}%` }}>
            <div className="bg-white/80 backdrop-blur rounded-full px-3 py-1 text-xs font-black text-purple-700 shadow-md border border-white flex items-center gap-1 whitespace-nowrap">
              <span>{w.emoji}</span>{w.name}
            </div>
          </div>
        ))}

        {/* 12 個關卡 */}
        {ISLANDS.map((island, i) => {
          const isCurrent = island.current;
          const isUnlocked = !island.locked;
          return (
            <motion.button
              key={island.id}
              onClick={() => isUnlocked && setSelected(island)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${island.x}%`, top: `${island.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              whileHover={isUnlocked ? { scale: 1.15 } : {}}
              whileTap={isUnlocked ? { scale: 0.9 } : {}}
            >
              <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-xl border-4 ${
                isCurrent ? "bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-200 animate-pulse" :
                isUnlocked ? "bg-gradient-to-br from-white to-purple-100 border-white" :
                "bg-gray-300 border-gray-200 opacity-60"
              }`}>
                {isUnlocked ? island.emoji : "🔒"}
                {isCurrent && (
                  <motion.div className="absolute -inset-2 rounded-full border-4 border-yellow-400" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                )}
              </div>
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-2 py-0.5 text-[10px] md:text-xs font-bold text-gray-700 whitespace-nowrap shadow">
                L{island.id} {island.name}
              </div>
            </motion.button>
          );
        })}

        {/* 玩家角色站在當前位置 */}
        <motion.div
          className="absolute -translate-x-1/2 pointer-events-none"
          style={{ left: `${current.x}%`, top: `${current.y - 12}%` }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-5xl md:text-6xl drop-shadow-2xl">{kidEmoji}</div>
          <div className="text-3xl md:text-4xl drop-shadow-lg -mt-2 ml-6">{petEmoji}</div>
        </motion.div>

        {/* Vega 在右上角懸浮 */}
        <motion.div
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20"
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <img src="/images/guide/vega-book.webp" alt="Vega" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-2xl" />
        </motion.div>
      </main>

      {/* === Bottom Action Bar === */}
      <div className="relative z-30 px-4 pb-4">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur rounded-3xl shadow-2xl border-2 border-white p-2 flex gap-1">
          {[
            { icon: "🗺", label: "地圖", active: true },
            { icon: "🎒", label: "背包" },
            { icon: "🐾", label: "寵物" },
            { icon: "🏆", label: "成就" },
            { icon: "⚙️", label: "設定" },
          ].map(b => (
            <button key={b.label} className={`flex-1 py-2 rounded-2xl text-center transition ${b.active ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <div className="text-2xl">{b.icon}</div>
              <div className="text-[10px] font-bold">{b.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* === 關卡彈窗 === */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-7xl mb-2">{selected.emoji}</div>
                <p className="text-xs text-purple-600 font-bold">Level {selected.id}</p>
                <h2 className="text-3xl font-black text-purple-800 mb-2">{selected.name}</h2>
                <p className="text-gray-600 mb-4">完成 5 個任務解鎖島嶼勳章！</p>
                <div className="flex justify-center gap-3 mb-5">
                  <div className="bg-amber-50 px-3 py-2 rounded-xl text-sm font-black text-amber-700">⭐ 0 / 15</div>
                  <div className="bg-cyan-50 px-3 py-2 rounded-xl text-sm font-black text-cyan-700">💎 0 / 30</div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg rounded-2xl shadow-lg active:scale-95">
                  🚀 開始挑戰！
                </button>
                <button onClick={() => setSelected(null)} className="mt-2 text-sm text-gray-500">關閉</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

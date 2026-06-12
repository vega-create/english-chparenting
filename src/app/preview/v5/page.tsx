"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// V5 地圖上 6 個世界的位置（百分比，依據圖片視覺位置手調）
const WORLDS = [
  { id: 1, name: "彩虹谷",   nameEn: "Rainbow Valley", x: 20.5, y: 28, color: "from-pink-400 to-rose-400",
    islands: [{ id: 1, name: "字母島" }, { id: 2, name: "聲音島" }], current: true },
  { id: 2, name: "友善小鎮", nameEn: "Friendly Town",  x: 47, y: 27, color: "from-amber-400 to-orange-400",
    islands: [{ id: 3, name: "市場街" }, { id: 4, name: "學校路" }] },
  { id: 3, name: "海洋灣",   nameEn: "Ocean Bay",      x: 72, y: 25, color: "from-cyan-400 to-blue-400",
    islands: [{ id: 5, name: "珊瑚灘" }, { id: 6, name: "燈塔角" }] },
  { id: 4, name: "故事城堡", nameEn: "Story Castle",   x: 20.5, y: 72, color: "from-purple-400 to-violet-400",
    islands: [{ id: 7, name: "文法門" }, { id: 8, name: "問題塔" }] },
  { id: 5, name: "探索大陸", nameEn: "Discovery Land", x: 47, y: 75, color: "from-emerald-400 to-green-400",
    islands: [{ id: 9, name: "時光道" }, { id: 10, name: "未來橋" }] },
  { id: 6, name: "冠軍峰",   nameEn: "Champion Peak",  x: 72, y: 70, color: "from-yellow-400 to-amber-400",
    islands: [{ id: 11, name: "挑戰場" }, { id: 12, name: "勝利峰" }] },
];

export default function V5Page() {
  const [selected, setSelected] = useState<typeof WORLDS[0] | null>(null);
  const [unlocked] = useState([1]); // 哪些世界已解鎖

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Back button */}
      <Link href="/preview" className="fixed top-3 left-3 z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回
      </Link>

      {/* HUD */}
      <div className="fixed top-3 right-3 z-50 flex gap-2">
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1"><span>⭐</span><span className="text-amber-600">12</span></div>
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1"><span>💎</span><span className="text-cyan-600">45</span></div>
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1"><span>🔥</span><span className="text-orange-600">3</span></div>
      </div>

      {/* Map container - 保持圖片完整可見 */}
      <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
        <div className="relative w-full" style={{ maxWidth: 'min(100vw, calc(100vh * 16 / 9))' }}>
          {/* Background map */}
          <img src="/images/maps/map-v5.webp" alt="" className="w-full h-auto block" />

          {/* 6 個世界 hotspot 覆蓋 */}
          {WORLDS.map(world => {
            const isUnlocked = unlocked.includes(world.id);
            return (
              <motion.button
                key={world.id}
                onClick={() => isUnlocked && setSelected(world)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${world.x}%`, top: `${world.y}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: world.id * 0.1, type: "spring" }}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.9 } : {}}
              >
                {/* 圓形光暈點擊區（透明，hover 才顯示）*/}
                <div className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center ${
                  isUnlocked
                    ? "bg-yellow-400/0 group-hover:bg-yellow-400/30"
                    : "bg-black/30 backdrop-blur-sm"
                } transition`}>
                  {/* 進行中世界：脈衝光環 */}
                  {world.current && isUnlocked && (
                    <>
                      <motion.div className="absolute inset-0 rounded-full border-4 border-yellow-300" animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="absolute inset-0 rounded-full border-4 border-yellow-400" animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                    </>
                  )}
                  {!isUnlocked && (
                    <div className="text-3xl md:text-5xl">🔒</div>
                  )}
                </div>
              </motion.button>
            );
          })}

          {/* 玩家位置標記（當前世界）*/}
          {WORLDS.filter(w => w.current).map(w => (
            <motion.div
              key={w.id}
              className="absolute -translate-x-1/2 pointer-events-none"
              style={{ left: `${w.x}%`, top: `${w.y - 6}%` }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-3xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">📍</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === 世界詳細彈窗 === */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7, y: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-br ${selected.color} rounded-2xl p-4 mb-4 text-center text-white`}>
                <p className="text-xs font-bold opacity-90">World {selected.id}</p>
                <p className="text-3xl font-black drop-shadow">{selected.name}</p>
                <p className="text-sm opacity-90">{selected.nameEn}</p>
              </div>
              <div className="space-y-3 mb-5">
                {selected.islands.map((island, i) => (
                  <button
                    key={island.id}
                    className={`w-full bg-gradient-to-r ${i === 0 ? "from-purple-50 to-pink-50 border-purple-200" : "from-gray-50 to-gray-100 border-gray-200 opacity-60"} border-2 rounded-2xl p-4 text-left active:scale-95 transition`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{i === 0 ? "🌟" : "🔒"}</div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">L{island.id}</p>
                        <p className="font-black text-gray-800">{island.name}</p>
                      </div>
                      {i === 0 && <div className="text-purple-500">→</div>}
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setSelected(null)} className="w-full py-2.5 text-sm text-gray-500">關閉</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// 橫向地圖（桌機）的 6 個世界位置
const WORLDS_LANDSCAPE = [
  { id: 1, x: 21, y: 27 },
  { id: 2, x: 46, y: 21 },
  { id: 3, x: 78, y: 28 },
  { id: 4, x: 20, y: 67 },
  { id: 5, x: 44, y: 60 },
  { id: 6, x: 78, y: 66 },
];

// 直向地圖（手機）的 6 個世界位置
const WORLDS_PORTRAIT = [
  { id: 1, x: 27, y: 10 },
  { id: 2, x: 67, y: 19 },
  { id: 3, x: 28, y: 32 },
  { id: 4, x: 70, y: 43 },
  { id: 5, x: 30, y: 60 },
  { id: 6, x: 64, y: 75 },
];

const WORLD_DATA = [
  { id: 1, name: "彩虹谷",   nameEn: "Rainbow Valley", color: "from-pink-400 to-rose-400",
    islands: [{ id: 1, name: "字母島" }, { id: 2, name: "聲音島" }], current: true },
  { id: 2, name: "友善小鎮", nameEn: "Friendly Town",  color: "from-green-400 to-emerald-400",
    islands: [{ id: 3, name: "市場街" }, { id: 4, name: "學校路" }] },
  { id: 3, name: "海洋灣",   nameEn: "Ocean Bay",      color: "from-cyan-400 to-blue-400",
    islands: [{ id: 5, name: "珊瑚灘" }, { id: 6, name: "燈塔角" }] },
  { id: 4, name: "故事城堡", nameEn: "Story Castle",   color: "from-purple-400 to-violet-400",
    islands: [{ id: 7, name: "文法門" }, { id: 8, name: "問題塔" }] },
  { id: 5, name: "探索大陸", nameEn: "Discovery Land", color: "from-orange-400 to-amber-400",
    islands: [{ id: 9, name: "時光道" }, { id: 10, name: "未來橋" }] },
  { id: 6, name: "冠軍峰",   nameEn: "Champion Peak",  color: "from-rose-400 to-pink-500",
    islands: [{ id: 11, name: "挑戰場" }, { id: 12, name: "勝利峰" }] },
];

const CHARS = [
  { key: "finn",  emoji: "🦊", name: "Finn" },
  { key: "coco",  emoji: "🐱", name: "Coco" },
  { key: "polly", emoji: "🦜", name: "Polly" },
  { key: "benny", emoji: "🐻", name: "Benny" },
  { key: "ruby",  emoji: "🐰", name: "Ruby" },
];

export default function V6Page() {
  const [selected, setSelected] = useState<(typeof WORLD_DATA)[0] | null>(null);
  const [showChar, setShowChar] = useState<string | null>(null);
  const [unlocked] = useState([1]);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    function check() {
      // 直式畫面（手機）切換到直版地圖
      setIsPortrait(window.innerHeight > window.innerWidth);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const positions = isPortrait ? WORLDS_PORTRAIT : WORLDS_LANDSCAPE;
  const mapSrc = isPortrait ? "/images/maps/map-v6-portrait.webp" : "/images/maps/map-v6.webp";
  // 直式 9:16，橫式 16:9
  const maxWidthStyle = isPortrait
    ? { maxWidth: 'min(100vw, calc(100vh * 9 / 16))' }
    : { maxWidth: 'min(100vw, calc(100vh * 16 / 9))' };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: isPortrait
        ? "linear-gradient(180deg, #cbe6ff 0%, #ffd5e8 35%, #fff0a8 65%, #b8dec0 100%)"
        : "linear-gradient(180deg, #c4e3ff 0%, #ffe1ee 50%, #fff0a8 100%)"
    }}>
      <Link href="/preview" className="fixed top-3 left-3 z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回
      </Link>

      <div className="fixed top-3 right-3 z-50 flex gap-2">
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1"><span>⭐</span><span className="text-amber-600">12</span></div>
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1"><span>💎</span><span className="text-cyan-600">45</span></div>
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow flex items-center gap-1"><span>🔥</span><span className="text-orange-600">3</span></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
        <div className="relative w-full" style={maxWidthStyle}>
          <img src={mapSrc} alt="" className="w-full h-auto block" />

          {WORLD_DATA.map((world, i) => {
            const pos = positions[i];
            const isUnlocked = unlocked.includes(world.id);
            return (
              <motion.button
                key={world.id}
                onClick={() => isUnlocked && setSelected(world)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: world.id * 0.1, type: "spring" }}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.9 } : {}}
              >
                <div className={`relative ${isPortrait ? "w-16 h-16" : "w-24 h-24 md:w-36 md:h-36"} rounded-full flex items-center justify-center ${
                  isUnlocked ? "bg-yellow-400/0 group-hover:bg-yellow-400/30" : "bg-black/30 backdrop-blur-sm"
                } transition`}>
                  {world.current && isUnlocked && (
                    <>
                      <motion.div className="absolute inset-0 rounded-full border-4 border-yellow-300" animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="absolute inset-0 rounded-full border-4 border-yellow-400" animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                    </>
                  )}
                  {!isUnlocked && <div className={`${isPortrait ? "text-2xl" : "text-3xl md:text-5xl"}`}>🔒</div>}
                </div>
              </motion.button>
            );
          })}

          {WORLD_DATA.filter(w => w.current).map((w, idx) => {
            const pos = positions[WORLD_DATA.indexOf(w)];
            return (
              <motion.div
                key={w.id}
                className="absolute -translate-x-1/2 pointer-events-none"
                style={{ left: `${pos.x}%`, top: `${pos.y - (isPortrait ? 3.5 : 6)}%` }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className={`${isPortrait ? "text-2xl" : "text-3xl md:text-5xl"} drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]`}>📍</div>
              </motion.div>
            );
          })}

          {/* 底部 5 個角色 hotspot — 只有橫向版有畫在圖裡 */}
          {!isPortrait && (
            <div className="absolute bottom-[3%] left-[20%] right-[55%] flex justify-center gap-1 md:gap-2">
              {CHARS.map(c => (
                <button
                  key={c.key}
                  onClick={() => setShowChar(c.key)}
                  className="bg-white/0 hover:bg-yellow-400/40 rounded-full w-9 h-9 md:w-14 md:h-14 transition active:scale-90"
                  title={c.name}
                />
              ))}
            </div>
          )}
          {/* 直版底部 5 角色 hotspot */}
          {isPortrait && (
            <div className="absolute bottom-[5.5%] left-[5%] right-[42%] flex justify-around">
              {CHARS.map(c => (
                <button
                  key={c.key}
                  onClick={() => setShowChar(c.key)}
                  className="bg-white/0 hover:bg-yellow-400/40 rounded-full w-10 h-10 transition active:scale-90"
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl" initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7, y: 30 }} onClick={e => e.stopPropagation()}>
              <div className={`bg-gradient-to-br ${selected.color} rounded-2xl p-4 mb-4 text-center text-white`}>
                <p className="text-xs font-bold opacity-90">World {selected.id}</p>
                <p className="text-3xl font-black drop-shadow">{selected.name}</p>
                <p className="text-sm opacity-90">{selected.nameEn}</p>
              </div>
              <div className="space-y-3 mb-5">
                {selected.islands.map((island, i) => (
                  <button key={island.id} className={`w-full bg-gradient-to-r ${i === 0 ? "from-purple-50 to-pink-50 border-purple-200" : "from-gray-50 to-gray-100 border-gray-200 opacity-60"} border-2 rounded-2xl p-4 text-left active:scale-95 transition`}>
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

      <AnimatePresence>
        {showChar && (
          <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowChar(null)}>
            <motion.div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} onClick={e => e.stopPropagation()}>
              <img src={`/characters/${showChar}/${showChar}-wave.png`} alt="" className="w-32 h-32 mx-auto mb-2" />
              <h3 className="text-2xl font-black text-purple-800 mb-1">{CHARS.find(c => c.key === showChar)?.name}</h3>
              <p className="text-gray-600 mb-4">點下去聽我介紹自己！</p>
              <button onClick={() => setShowChar(null)} className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl">關閉</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const KIDS = [
  { id: "kid-1", emoji: "👦", name: "小男孩 A", color: "from-blue-200 to-cyan-200" },
  { id: "kid-2", emoji: "👧", name: "小女孩 A", color: "from-pink-200 to-rose-200" },
  { id: "kid-3", emoji: "🧒", name: "小男孩 B", color: "from-amber-200 to-orange-200" },
  { id: "kid-4", emoji: "👶", name: "小寶寶", color: "from-yellow-200 to-amber-200" },
  { id: "kid-5", emoji: "🧑‍🦱", name: "捲髮女孩", color: "from-purple-200 to-fuchsia-200" },
  { id: "kid-6", emoji: "👦🏽", name: "戴帽子的男孩", color: "from-green-200 to-emerald-200" },
];

const PETS = [
  { id: "dragon",  emoji: "🐲", name: "小龍",   color: "from-red-300 to-orange-300" },
  { id: "unicorn", emoji: "🦄", name: "獨角獸", color: "from-pink-300 to-purple-300" },
  { id: "penguin", emoji: "🐧", name: "小企鵝", color: "from-cyan-300 to-blue-300" },
  { id: "panda",   emoji: "🐼", name: "貓熊",   color: "from-gray-200 to-slate-300" },
  { id: "butterfly", emoji: "🦋", name: "彩虹蝶", color: "from-purple-300 to-pink-300" },
];

// 教學彈窗步驟（進站前看的）
const TUTORIAL = [
  {
    img: "/images/guide/vega-book.webp",
    title: "我是 Miss Vega ✨",
    desc: "我會陪你一起學英文，給你溫暖的引導跟鼓勵。",
  },
  {
    img: "/characters/finn/finn-wave.png",
    title: "認識五個動物朋友 🦊",
    desc: "Finn、Coco、Polly、Benny、Ruby — 各自有不同的專長，會在不同關卡幫助你。",
  },
  {
    img: "/images/worlds/world-rainbow-valley.webp",
    title: "六大冒險世界 🗺️",
    desc: "彩虹谷、海洋灣、故事城堡⋯⋯一路冒險到冠軍峰，學會英檢初級！",
  },
  {
    img: "/images/guide/vega-point.webp",
    title: "你準備好了嗎？",
    desc: "選一個小冒險家造型，孵化你的寵物蛋，開始我們的冒險吧！",
  },
];

export default function CharacterSelect() {
  const router = useRouter();
  const [step, setStep] = useState<"checking" | "welcome-back" | "tutorial" | "name" | "avatar" | "pet" | "done">("checking");
  const [tutStep, setTutStep] = useState(0);
  const [name, setName] = useState("");
  const [kid, setKid] = useState<string | null>(null);
  const [pet, setPet] = useState<string | null>(null);
  const [existingPlayer, setExistingPlayer] = useState<{ name: string; kid: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ae-player");
    if (saved) {
      setExistingPlayer(JSON.parse(saved));
      setStep("welcome-back");
    } else {
      setStep("tutorial");
    }
  }, []);

  function finish() {
    localStorage.setItem("ae-player", JSON.stringify({
      name, kid, pet,
      createdAt: new Date().toISOString(),
      stars: 0, gems: 50, streak: 1, lastLogin: new Date().toISOString(),
      unlocked: [1],
    }));
    setStep("done");
    setTimeout(() => router.push("/preview/v4/map"), 2500);
  }

  if (step === "checking") return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* === 多層背景：水彩漸層 === */}
      <div className="fixed inset-0 bg-gradient-to-b from-sky-200 via-pink-100 via-orange-50 to-amber-100" />
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-200/40 via-transparent to-yellow-200/40" />

      {/* === 飄浮裝飾 === */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 雲朵 */}
        <motion.div animate={{ x: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-[8%] left-[10%] text-7xl opacity-70">☁️</motion.div>
        <motion.div animate={{ x: [0, -25, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute top-[15%] right-[15%] text-6xl opacity-60">☁️</motion.div>
        <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 30, repeat: Infinity }} className="absolute top-[40%] left-[5%] text-5xl opacity-50">☁️</motion.div>
        {/* 彩虹 */}
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[5%] left-[40%] text-7xl opacity-50">🌈</motion.div>
        {/* 星星 */}
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[20%] right-[8%] text-5xl opacity-60">⭐</motion.div>
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-[30%] left-[8%] text-4xl opacity-50">✨</motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-[15%] right-[20%] text-5xl opacity-60">⭐</motion.div>
        {/* 氣球 */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-[12%] right-[30%] text-6xl opacity-60">🎈</motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute bottom-[35%] right-[5%] text-5xl opacity-50">🎈</motion.div>
        {/* 蝴蝶 */}
        <motion.div animate={{ x: [0, 50, 0], y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-[60%] left-[15%] text-4xl opacity-60">🦋</motion.div>
        <motion.div animate={{ x: [0, -40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-[35%] right-[25%] text-3xl opacity-60">🦋</motion.div>
        {/* 花朵 */}
        <div className="absolute bottom-[10%] left-[12%] text-5xl opacity-60">🌸</div>
        <div className="absolute bottom-[8%] right-[15%] text-4xl opacity-50">🌷</div>
        <div className="absolute bottom-[18%] left-[40%] text-4xl opacity-60">🌻</div>
        {/* 草地 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-200/60 to-transparent" />
      </div>

      {/* === 5 個角色躲在四周（增加豐富感） === */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.img src="/characters/finn/finn-wave.png" alt="" className="absolute bottom-2 left-2 md:left-8 w-24 md:w-36 opacity-90 drop-shadow-2xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.img src="/characters/coco/coco-wave.png" alt="" className="absolute bottom-2 right-2 md:right-8 w-24 md:w-32 opacity-90 drop-shadow-2xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} />
        <motion.img src="/characters/polly/polly-wave.png" alt="" className="hidden md:block absolute top-1/2 -translate-y-1/2 left-2 w-24 opacity-80 drop-shadow-2xl" animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} />
        <motion.img src="/characters/benny/benny-wave.png" alt="" className="hidden md:block absolute top-1/3 right-4 w-24 opacity-80 drop-shadow-2xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }} />
        <motion.img src="/characters/ruby/ruby-wave.png" alt="" className="hidden md:block absolute top-2/3 left-1/4 w-20 opacity-70 drop-shadow-2xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, delay: 2 }} />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {/* === 歡迎回來 === */}
          {step === "welcome-back" && existingPlayer && (
            <motion.div
              key="welcome-back"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-2xl border-2 border-white text-center">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-2">🎉</motion.div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                  歡迎回來，{existingPlayer.name}！
                </h2>
                <p className="text-purple-600 mb-6">繼續你的冒險吧 🚀</p>
                <motion.button
                  onClick={() => router.push("/preview/v4/map")}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-black text-lg shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🗺️ 進入冒險地圖
                </motion.button>
                <button
                  onClick={() => {
                    if (confirm("確定要重新建立新角色嗎？目前的進度會清掉。")) {
                      localStorage.removeItem("ae-player");
                      setExistingPlayer(null);
                      setStep("tutorial");
                    }
                  }}
                  className="mt-3 text-sm text-purple-600/60 hover:text-purple-800 underline"
                >
                  重新建立新角色
                </button>
              </div>
            </motion.div>
          )}

          {/* === 教學彈窗 === */}
          {step === "tutorial" && (
            <motion.div
              key="tutorial"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              {/* Glass card */}
              <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_70px_-15px_rgba(168,85,247,0.4)] border-2 border-white overflow-hidden">
                {/* Top picture */}
                <div className="relative h-56 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={tutStep}
                      src={TUTORIAL[tutStep].img}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain p-4"
                      initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  </AnimatePresence>
                  {/* sparkles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{ left: `${10 + i * 14}%`, top: `${20 + (i % 3) * 30}%` }}
                        animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                      >✨</motion.div>
                    ))}
                  </div>
                </div>

                {/* Text content */}
                <div className="px-7 py-6 text-center">
                  <AnimatePresence mode="wait">
                    <motion.div key={tutStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <h2 className="text-2xl font-black text-purple-800 mb-2">{TUTORIAL[tutStep].title}</h2>
                      <p className="text-gray-700 leading-relaxed">{TUTORIAL[tutStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-1.5 mt-5 mb-4">
                    {TUTORIAL.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setTutStep(i)}
                        className="h-2 rounded-full"
                        animate={{ width: i === tutStep ? 24 : 8, backgroundColor: i === tutStep ? "#a855f7" : "#e9d5ff" }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {tutStep > 0 && (
                      <button
                        onClick={() => setTutStep(s => s - 1)}
                        className="flex-1 py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-bold hover:bg-purple-50 transition active:scale-95"
                      >
                        ← 上一步
                      </button>
                    )}
                    <motion.button
                      onClick={() => tutStep < TUTORIAL.length - 1 ? setTutStep(s => s + 1) : setStep("name")}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-black shadow-lg"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {tutStep < TUTORIAL.length - 1 ? "下一步 →" : "🚀 開始我的冒險"}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Skip */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setStep("name")}
                  className="text-sm text-purple-600/70 hover:text-purple-800 underline"
                >
                  跳過介紹
                </button>
              </div>
            </motion.div>
          )}

          {/* === 取名字 === */}
          {step === "name" && (
            <motion.div key="name" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-2xl border-2 border-white text-center">
                <motion.img
                  src="/images/guide/vega-point.webp"
                  alt="Vega"
                  className="w-32 h-32 mx-auto mb-3 drop-shadow-2xl"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <h2 className="text-3xl font-black text-purple-800 mb-1">你叫什麼名字？</h2>
                <p className="text-purple-600 mb-6">告訴 Vega 你的名字 ✨</p>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="輸入名字"
                  maxLength={10}
                  autoFocus
                  className="w-full text-2xl text-center px-5 py-4 rounded-2xl border-4 border-purple-200 bg-white shadow-inner focus:outline-none focus:border-pink-400 font-bold text-purple-800"
                />
                <motion.button
                  onClick={() => name.trim() && setStep("avatar")}
                  disabled={!name.trim()}
                  className="mt-5 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-black text-lg shadow-xl disabled:opacity-30"
                  whileHover={name.trim() ? { scale: 1.02 } : {}}
                  whileTap={name.trim() ? { scale: 0.98 } : {}}
                >
                  下一步 →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* === 選造型 === */}
          {step === "avatar" && (
            <motion.div key="avatar" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-3xl">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-2xl border-2 border-white">
                <div className="text-center mb-5">
                  <div className="text-5xl mb-1">🧒</div>
                  <h2 className="text-2xl md:text-3xl font-black text-purple-800">選你的造型，{name}！</h2>
                  <p className="text-purple-600 text-sm mt-1">點一個你喜歡的</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {KIDS.map(k => (
                    <motion.button
                      key={k.id}
                      onClick={() => setKid(k.id)}
                      className={`aspect-square rounded-3xl p-3 bg-gradient-to-br ${k.color} relative shadow-md ${kid === k.id ? "ring-4 ring-purple-500 scale-105" : ""}`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-5xl md:text-6xl">{k.emoji}</div>
                      {kid === k.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-black rounded-full w-8 h-8 flex items-center justify-center shadow">
                          ✓
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  onClick={() => kid && setStep("pet")}
                  disabled={!kid}
                  className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-black text-lg shadow-xl disabled:opacity-30"
                  whileHover={kid ? { scale: 1.02 } : {}}
                  whileTap={kid ? { scale: 0.98 } : {}}
                >
                  下一步 →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* === 選寵物 === */}
          {step === "pet" && (
            <motion.div key="pet" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-2xl">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-2xl border-2 border-white">
                <div className="text-center mb-5">
                  <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl mb-1">🥚</motion.div>
                  <h2 className="text-2xl md:text-3xl font-black text-purple-800">選你的寵物蛋！</h2>
                  <p className="text-purple-600 text-sm mt-1">學越多牠長越大 🌱 → 🌳</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {PETS.map(p => (
                    <motion.button
                      key={p.id}
                      onClick={() => setPet(p.id)}
                      className={`aspect-square rounded-3xl p-3 bg-gradient-to-br ${p.color} relative shadow-md ${pet === p.id ? "ring-4 ring-purple-500 scale-105" : ""}`}
                      whileHover={{ y: -6, rotate: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-5xl mb-1">🥚</div>
                      <div className="text-xs font-black text-gray-700">{p.name}</div>
                      {pet === p.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-black rounded-full w-8 h-8 flex items-center justify-center">
                          ✓
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  onClick={() => pet && finish()}
                  disabled={!pet}
                  className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-black text-lg shadow-xl disabled:opacity-30"
                  whileHover={pet ? { scale: 1.02 } : {}}
                  whileTap={pet ? { scale: 0.98 } : {}}
                >
                  🚀 開始我的冒險！
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* === 完成動畫 === */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <motion.div animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="text-9xl mb-4">✨</motion.div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
                太棒了，{name}！
              </h2>
              <p className="text-purple-700 text-xl font-medium">前往冒險地圖中⋯</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

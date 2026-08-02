"use client";
import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  WORLDS,
  isWorldUnlocked,
  isLessonComplete,
  setLessonComplete,
  getWorldCompletion,
} from "@/lib/progress";
import { playClick, playStar, playSuccess } from "@/lib/sfx";
import HomeButton from "@/components/HomeButton";

// 每個世界的關卡地圖圖（1=彩虹谷有自己的頁；這裡處理 2~6）
const WORLD_IMG: Record<number, string> = {
  1: "world-rainbow-valley", 2: "world-friendly-town", 3: "world-ocean-bay",
  4: "world-story-castle", 5: "world-explorer-land", 6: "world-champion-peak",
};

// 各世界第一座島（此圖即該島的關卡地圖）
const WORLD_ISLAND: Record<number, { zh: string; en: string; emoji: string }> = {
  2: { zh: "市場街", en: "Market Street",   emoji: "🛒" },
  3: { zh: "珊瑚灘", en: "Coral Beach",     emoji: "🏖️" },
  4: { zh: "魔法門", en: "Magic Gate",      emoji: "✨" },
  5: { zh: "時光道", en: "Time Road",       emoji: "⏳" },
  6: { zh: "挑戰場", en: "Challenge Arena", emoji: "🏟️" },
};

// 各世界第二座島（完成第一座島後前往）
const SECOND_ISLAND: Record<number, { zh: string; slug: string; emoji: string }> = {
  2: { zh: "學校路", slug: "school-road",      emoji: "🏫" },
  3: { zh: "燈塔角", slug: "lighthouse-point", emoji: "🗼" },
  4: { zh: "問題塔", slug: "question-tower",   emoji: "❓" },
  5: { zh: "未來橋", slug: "future-bridge",    emoji: "🌉" },
  6: { zh: "勝利峰", slug: "victory-peak",     emoji: "🏔️" },
};

// 各世界第一座島對應的課程 slug（點關卡進課程）
const ISLAND_COURSE: Record<number, string> = {
  2: "l3-market-street", 3: "l5-coral-beach", 4: "l7-grammar-gate",
  5: "l9-time-travel-path", 6: "l11-challenge-arena",
};

// 20 關節點位置（%）— 依各地圖路徑自動排點
const NODES: Record<number, { x: number; y: number }[]> = {
  2: [{x:29.1,y:91.8},{x:13.7,y:80.1},{x:24.4,y:66.9},{x:24.3,y:54.1},{x:22.7,y:37.9},{x:37.4,y:27.3},{x:56.4,y:28.6},{x:69.4,y:39.2},{x:78.1,y:46.9},{x:83.5,y:28.4},{x:79.6,y:15.3},{x:60.3,y:15.1},{x:41.1,y:12.3},{x:22.7,y:9.0},{x:14.1,y:7.6},{x:24.6,y:23.9},{x:35.0,y:40.2},{x:45.5,y:56.5},{x:56.0,y:72.7},{x:66.6,y:88.9}],
  3: [{x:16.9,y:82.4},{x:36.0,y:90.2},{x:46.0,y:85.9},{x:37.0,y:67.4},{x:42.2,y:47.9},{x:28.5,y:45.7},{x:30.5,y:31.3},{x:33.9,y:16.5},{x:52.8,y:16.2},{x:68.1,y:30.1},{x:62.4,y:45.5},{x:68.7,y:61.7},{x:72.2,y:76.2},{x:89.3,y:77.4},{x:86.0,y:58.2},{x:81.0,y:38.2},{x:70.6,y:29.7},{x:52.0,y:38.6},{x:33.4,y:47.5},{x:14.8,y:56.5}],
  4: [{x:22.2,y:82.0},{x:24.7,y:74.6},{x:25.9,y:68.1},{x:41.0,y:63.3},{x:49.4,y:51.0},{x:53.8,y:45.5},{x:39.0,y:43.2},{x:27.0,y:32.9},{x:18.3,y:33.4},{x:15.1,y:17.9},{x:18.4,y:8.2},{x:34.1,y:9.9},{x:49.5,y:13.8},{x:64.7,y:18.3},{x:73.2,y:27.7},{x:77.6,y:41.0},{x:74.2,y:56.5},{x:84.1,y:63.0},{x:73.7,y:74.7},{x:63.1,y:86.5}],
  5: [{x:15.9,y:83.0},{x:14.5,y:64.4},{x:16.5,y:46.0},{x:27.2,y:33.7},{x:45.3,y:29.6},{x:63.8,y:28.1},{x:82.3,y:30.1},{x:86.1,y:42.0},{x:78.7,y:57.3},{x:60.5,y:56.9},{x:45.0,y:58.6},{x:42.3,y:76.2},{x:52.1,y:86.5},{x:70.7,y:88.4},{x:62.7,y:74.3},{x:52.4,y:58.7},{x:42.1,y:43.2},{x:31.8,y:27.6},{x:21.5,y:12.1},{x:5.7,y:8.0}],
  6: [{x:16.2,y:85.6},{x:17.1,y:76.0},{x:25.9,y:57.3},{x:18.8,y:41.4},{x:36.1,y:44.2},{x:52.1,y:56.4},{x:72.0,y:61.9},{x:86.6,y:75.3},{x:82.8,y:88.0},{x:62.7,y:92.6},{x:58.1,y:82.2},{x:68.2,y:64.0},{x:78.3,y:45.8},{x:66.9,y:31.9},{x:49.8,y:21.8},{x:36.1,y:9.3},{x:15.4,y:7.4},{x:27.4,y:9.6},{x:48.1,y:12.0},{x:68.7,y:14.3}],
};

export default function WorldDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const worldId = parseInt(id, 10);
  const world = WORLDS.find(w => w.id === worldId);

  const router = useRouter();
  const [tick, setTick] = useState(0);
  const [justUnlocked, setJustUnlocked] = useState<number | null>(null);
  const [wasUnlocked, setWasUnlocked] = useState(false);

  // 地圖頁永遠可看（是否解鎖只影響能不能玩；之後接登入）
  useEffect(() => {
    setWasUnlocked(true);
  }, [world]);

  // 監聽 progress 變化
  useEffect(() => {
    const refresh = () => setTick(t => t + 1);
    window.addEventListener("ae-progress-change", refresh);
    return () => window.removeEventListener("ae-progress-change", refresh);
  }, []);

  if (!world || !wasUnlocked) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">載入中...</div>;
  }

  const { done, total, isComplete } = getWorldCompletion(world.id);

  // mock: 點下去就完成 lesson（之後真實課程接上會用真實邏輯）
  function completeLesson(lessonId: string) {
    if (!world) return;
    const wasComplete = isLessonComplete(lessonId);
    if (wasComplete) {
      // 已完成 → 取消（除錯方便）
      setLessonComplete(lessonId, false);
      playClick();
      return;
    }
    setLessonComplete(lessonId, true);
    playSuccess();
    // 檢查是否解鎖了下一個世界
    const after = getWorldCompletion(world.id);
    if (after.isComplete && world.id < WORLDS.length) {
      setJustUnlocked(world.id + 1);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(50,35,100,0.25), rgba(50,35,100,0.4)), url(/images/worlds/${WORLD_IMG[world.id] || "world-friendly-town"}.webp)`,
    }}>
      <HomeButton />
      <Link href="/adventure-map" onClick={() => playClick()} className="fixed top-3 left-3 z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回地圖
      </Link>

      {/* 20 關節點（沿地圖路徑） */}
      {NODES[world.id] && ISLAND_COURSE[world.id] && (
        <div className="absolute inset-0 z-30">
          {NODES[world.id].map((n, i) => (
            <Link
              key={i}
              href={`/courses/${ISLAND_COURSE[world.id]}/mission/${i + 1}`}
              onClick={() => playStar()}
              className="absolute flex items-center justify-center rounded-full font-black text-white no-underline shadow-xl border-[3px] border-white/90 bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110 active:scale-95 transition"
              style={{
                left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)",
                width: "clamp(28px,3.4vw,54px)", height: "clamp(28px,3.4vw,54px)",
                fontSize: "clamp(12px,1.5vw,22px)",
              }}
            >{i + 1}</Link>
          ))}
        </div>
      )}

      {/* 島名浮動標示（此圖＝該世界第一座島的關卡地圖） */}
      {WORLD_ISLAND[world.id] && (
        <div className="fixed animate-float pointer-events-none z-40" style={{ left: "3%", top: "10%" }}>
          <div className="bg-white/90 backdrop-blur rounded-2xl px-4 py-1.5 shadow-xl border-2 border-amber-300 text-center">
            <p className="font-black text-amber-700" style={{ fontSize: "clamp(13px,1.4vw,20px)" }}>{WORLD_ISLAND[world.id].emoji} {WORLD_ISLAND[world.id].zh}</p>
            <p className="text-[9px] sm:text-[11px] font-bold text-amber-500 leading-none">{WORLD_ISLAND[world.id].en}</p>
          </div>
        </div>
      )}

      {/* 地圖本身已印有名字＋關卡踏腳石，只在底部放一張不擋圖的狀態小卡 */}
      <div className="min-h-screen flex flex-col items-center justify-end px-4 pb-8 text-center">
        {isWorldUnlocked(world.id) ? (
          NODES[world.id] ? (
            <p className="bg-white/85 backdrop-blur rounded-full px-4 py-1 shadow text-[11px] sm:text-xs font-bold text-purple-700">
              💡 點 <span className="font-black">數字</span> 開始闖關 · 共 20 關
            </p>
          ) : (
          <div className="bg-white/90 backdrop-blur rounded-2xl px-6 py-3.5 shadow-xl max-w-xs">
            <p className="font-black text-gray-800 text-base mb-0.5">🗺️ 關卡即將開放</p>
            <p className="text-xs text-gray-500">這個世界的關卡正在設定中，敬請期待！<span className="text-gray-400"> · {done}/{total}</span></p>
          </div>
          )
        ) : (
          <div className="bg-black/55 backdrop-blur rounded-2xl px-6 py-3.5 shadow-xl max-w-xs border border-white/30">
            <p className="font-black text-white text-base mb-0.5">🔒 尚未解鎖</p>
            <p className="text-xs text-white/85">先完成前一個世界，才能來這裡冒險！</p>
          </div>
        )}
        {SECOND_ISLAND[world.id] && (
          <Link href={`/adventure-map/island/${SECOND_ISLAND[world.id].slug}`} onClick={() => playClick()}
            className="mt-2.5 bg-sky-500/90 backdrop-blur text-white font-black text-sm px-5 py-2 rounded-full shadow-xl no-underline active:scale-95 transition">
            ⛵ 第二座島：{SECOND_ISLAND[world.id].emoji} {SECOND_ISLAND[world.id].zh}
          </Link>
        )}
      </div>

      {/* === 新解鎖通知 === */}
      <AnimatePresence>
        {justUnlocked && (() => {
          const next = WORLDS.find(w => w.id === justUnlocked)!;
          return (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setJustUnlocked(null)}
            >
              <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 50 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center"
                onClick={e => e.stopPropagation()}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-7xl mb-3"
                >🎉</motion.div>
                <p className="text-sm text-purple-600 font-bold">新世界解鎖！</p>
                <div className={`mt-3 bg-gradient-to-br ${next.color} rounded-2xl p-4 text-white`}>
                  <p className="text-5xl">{next.emoji}</p>
                  <p className="text-xs opacity-90">World {next.id}</p>
                  <p className="text-2xl font-black">{next.name}</p>
                  <p className="text-sm opacity-90">{next.nameEn}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => { playClick(); setJustUnlocked(null); }} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-black rounded-full text-sm">繼續這關</button>
                  <Link href={`/adventure-map/world/${next.id}`} onClick={() => playStar()} className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-full text-sm no-underline">
                    前往新世界 →
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

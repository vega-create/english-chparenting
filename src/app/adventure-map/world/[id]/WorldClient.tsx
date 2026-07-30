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

// 每個世界的關卡地圖圖（1=彩虹谷有自己的頁；這裡處理 2~6）
const WORLD_IMG: Record<number, string> = {
  1: "world-rainbow-valley", 2: "world-friendly-town", 3: "world-ocean-bay",
  4: "world-story-castle", 5: "world-explorer-land", 6: "world-champion-peak",
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
      <Link href="/adventure-map" onClick={() => playClick()} className="fixed top-3 left-3 z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回地圖
      </Link>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* 世界名 */}
        <p className="text-white/90 font-bold text-sm mb-1" style={{ textShadow: "0 1px 3px rgba(0,0,0,.55)" }}>World {world.id} · {world.level}</p>
        <h1 className="text-4xl sm:text-6xl cute-text mb-1">{world.name}</h1>
        <p className="text-white font-bold text-lg mb-6" style={{ textShadow: "0 1px 3px rgba(0,0,0,.55)" }}>{world.nameEn}</p>

        {/* 狀態卡：解鎖=關卡即將開放；未解鎖=鎖定 */}
        {isWorldUnlocked(world.id) ? (
          <div className="bg-white/90 backdrop-blur rounded-3xl px-7 py-6 shadow-2xl max-w-sm">
            <p className="text-5xl mb-2">🗺️</p>
            <p className="font-black text-gray-800 text-lg mb-1">關卡即將開放</p>
            <p className="text-sm text-gray-500 mb-3">這個世界的關卡正在設定中，敬請期待！</p>
            <p className="text-xs text-gray-400">進度 {done}/{total}</p>
          </div>
        ) : (
          <div className="bg-black/50 backdrop-blur rounded-3xl px-7 py-6 shadow-2xl max-w-sm border-2 border-white/30">
            <p className="text-5xl mb-2">🔒</p>
            <p className="font-black text-white text-lg mb-1">尚未解鎖</p>
            <p className="text-sm text-white/85">先完成前一個世界，才能來這裡冒險！</p>
          </div>
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

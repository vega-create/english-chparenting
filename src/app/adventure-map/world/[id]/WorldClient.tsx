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
          <div className="bg-white/90 backdrop-blur rounded-2xl px-6 py-3.5 shadow-xl max-w-xs">
            <p className="font-black text-gray-800 text-base mb-0.5">🗺️ 關卡即將開放</p>
            <p className="text-xs text-gray-500">這個世界的關卡正在設定中，敬請期待！<span className="text-gray-400"> · {done}/{total}</span></p>
          </div>
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

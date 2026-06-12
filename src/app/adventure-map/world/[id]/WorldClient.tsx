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

export default function WorldDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const worldId = parseInt(id, 10);
  const world = WORLDS.find(w => w.id === worldId);

  const router = useRouter();
  const [tick, setTick] = useState(0);
  const [justUnlocked, setJustUnlocked] = useState<number | null>(null);
  const [wasUnlocked, setWasUnlocked] = useState(false);

  // 判斷此 world 是否允許進入
  useEffect(() => {
    if (!world) return;
    if (!isWorldUnlocked(world.id)) {
      router.replace("/adventure-map");
      return;
    }
    setWasUnlocked(true);
  }, [world, router]);

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
    <div className="relative min-h-screen overflow-hidden" style={{
      background: "linear-gradient(180deg, #cbe6ff 0%, #ffd5e8 35%, #fff0a8 65%, #b8dec0 100%)",
    }}>
      <Link href="/adventure-map" onClick={() => playClick()} className="fixed top-3 left-3 z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回地圖
      </Link>

      <div className="max-w-2xl mx-auto px-4 pt-16 pb-16">
        {/* World 標題卡片 */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`bg-gradient-to-br ${world.color} rounded-3xl p-6 text-center text-white shadow-2xl mb-6 relative overflow-hidden`}
        >
          <div className="absolute -top-8 -right-8 text-8xl opacity-20">{world.emoji}</div>
          <p className="text-xs font-bold opacity-90 relative">World {world.id}</p>
          <p className="text-4xl font-black drop-shadow relative">{world.name}</p>
          <p className="text-sm opacity-90 relative">{world.nameEn} · {world.level}</p>

          {/* 進度條 */}
          <div className="mt-4 relative">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>進度</span>
              <span>{done}/{total} {isComplete && "🎉 完成"}</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(done / total) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson 列表 */}
        <div className="space-y-3">
          {world.lessons.map((lesson, i) => {
            const isDone = isLessonComplete(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => completeLesson(lesson.id)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left ${
                    isDone
                      ? "bg-green-50 border-green-300"
                      : "bg-white border-purple-200 hover:border-purple-400 hover:shadow-lg"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0 ${
                    isDone ? "bg-gradient-to-br from-green-400 to-emerald-600 text-white" : "bg-purple-100"
                  }`}>
                    {isDone ? "✓" : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Lesson {i + 1}</p>
                    <p className="font-black text-gray-800 text-lg">{lesson.name}</p>
                    <p className="text-xs text-gray-500">{lesson.nameEn}</p>
                  </div>
                  {!isDone && <div className="text-purple-500 text-xl">→</div>}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* 全部完成提示 */}
        {isComplete && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 bg-gradient-to-r from-amber-200 to-yellow-300 border-2 border-amber-400 rounded-2xl p-4 text-center"
          >
            <p className="text-3xl mb-1">🏆</p>
            <p className="font-black text-amber-900">恭喜完成 {world.name}！</p>
            {world.id < WORLDS.length && (
              <Link href="/adventure-map" onClick={() => playStar()} className="inline-block mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-5 py-2 rounded-full text-sm no-underline">
                回地圖看下一關 →
              </Link>
            )}
          </motion.div>
        )}

        <p className="text-xs text-center text-gray-400 mt-6">
          （測試：點 lesson 切換完成狀態；完成全部會解鎖下個世界）
        </p>
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

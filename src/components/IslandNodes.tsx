"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { loadProgress, type Progress } from "@/lib/missionProgress";
import { missionStatus } from "@/lib/progress";
import { playClick, playStar } from "@/lib/sfx";

/**
 * 一座島的 20 個關卡節點（世界頁的第一座島、island/[slug] 的第二座島共用）。
 * 狀態全部從 ae_mission_progress_v1 推導：
 *   ⭐ 已完成（顯示星數，可重玩）／ 可玩（發光）／ 🔒 鎖住（先完成前一關）
 */
export function useProgressState(): Progress {
  const [p, setP] = useState<Progress>({ completed: {} });
  useEffect(() => {
    const refresh = () => setP(loadProgress());
    refresh();
    window.addEventListener("ae-mission-progress-change", refresh);
    window.addEventListener("ae-progress-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ae-mission-progress-change", refresh);
      window.removeEventListener("ae-progress-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return p;
}

export default function IslandNodes({ courseSlug, nodes, progress }: {
  courseSlug: string;
  nodes: { x: number; y: number }[];
  progress: Progress;
}) {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const size = { width: "clamp(28px,3.4vw,54px)", height: "clamp(28px,3.4vw,54px)", fontSize: "clamp(12px,1.5vw,22px)" };

  return (
    <div className="absolute inset-0 z-30">
      {nodes.map((n, i) => {
        const id = i + 1;
        const status = missionStatus(progress, courseSlug, id);
        const stars = progress.completed[`${courseSlug}/${id}`] || 0;
        const pos = { left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", ...size };
        const base = "absolute flex items-center justify-center rounded-full font-black no-underline shadow-xl border-[3px] border-white/90 transition";

        if (status === "locked") {
          return (
            <button key={id} type="button" aria-label={`第 ${id} 關（先完成前一關）`}
              onClick={() => { playClick(); setToast(`🔒 第 ${id} 關：先完成第 ${id - 1} 關`); }}
              className={`${base} text-white bg-gradient-to-br from-gray-400 to-gray-600 opacity-85 cursor-pointer active:scale-95`}
              style={pos}>
              {id}
              <span className="absolute -top-1.5 -right-1.5 text-[10px] sm:text-xs drop-shadow-md">🔒</span>
            </button>
          );
        }
        return (
          <Link key={id} href={`/courses/${courseSlug}/mission/${id}`} onClick={() => playStar()}
            aria-label={status === "completed" ? `第 ${id} 關（已完成 ${stars} 星，可重玩）` : `第 ${id} 關`}
            className={`${base} hover:scale-110 active:scale-95 ${
              status === "completed"
                ? "text-amber-900 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500"
                : "text-white bg-gradient-to-br from-purple-500 to-pink-500"
            }`}
            style={{
              ...pos,
              filter: status === "current" ? "drop-shadow(0 0 10px rgba(255,215,0,0.9))" : undefined,
            }}>
            {status === "current" && (
              <motion.span className="absolute inset-0 rounded-full border-4 border-yellow-300 pointer-events-none"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            )}
            {id}
            {status === "completed" && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[11px] leading-none whitespace-nowrap drop-shadow-md">
                {"⭐".repeat(Math.max(1, Math.min(3, stars)))}
              </span>
            )}
          </Link>
        );
      })}

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-black/75 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg pointer-events-none whitespace-nowrap">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

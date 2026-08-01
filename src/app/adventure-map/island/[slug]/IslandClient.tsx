"use client";
import Link from "next/link";
import { playClick } from "@/lib/sfx";

interface Island {
  slug: string; zh: string; en: string; emoji: string; world: string; backHref: string;
}

export default function IslandClient({ island }: { island: Island }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(50,35,100,0.15), rgba(50,35,100,0.25)), url(/images/islands/${island.slug}.webp)`,
    }}>
      <Link href={island.backHref} onClick={() => playClick()} className="fixed top-3 left-3 z-50 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow no-underline">
        ← 返回{island.world}
      </Link>

      {/* 島名浮動標示 */}
      <div className="fixed animate-float pointer-events-none z-40" style={{ left: "3%", top: "10%" }}>
        <div className="bg-white/90 backdrop-blur rounded-2xl px-4 py-1.5 shadow-xl border-2 border-amber-300 text-center">
          <p className="font-black text-amber-700" style={{ fontSize: "clamp(13px,1.4vw,20px)" }}>{island.emoji} {island.zh}</p>
          <p className="text-[9px] sm:text-[11px] font-bold text-amber-500 leading-none">{island.en}</p>
        </div>
      </div>

      {/* 狀態卡（不擋圖） */}
      <div className="min-h-screen flex flex-col items-center justify-end px-4 pb-8 text-center">
        <div className="bg-white/90 backdrop-blur rounded-2xl px-6 py-3.5 shadow-xl max-w-xs">
          <p className="font-black text-gray-800 text-base mb-0.5">🗺️ 關卡即將開放</p>
          <p className="text-xs text-gray-500">{island.zh}的 20 個關卡正在建造中，敬請期待！</p>
        </div>
      </div>
    </div>
  );
}

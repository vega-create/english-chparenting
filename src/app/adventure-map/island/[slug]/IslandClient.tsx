"use client";
import Link from "next/link";
import { playClick } from "@/lib/sfx";
import HomeButton from "@/components/HomeButton";

interface Island {
  slug: string; zh: string; en: string; emoji: string; world: string; backHref: string;
}

// 各島對應課程
const ISLAND_COURSE: Record<string, string> = {
  "sound-island": "l2-sound-island", "school-road": "l4-school-road",
  "lighthouse-point": "l6-lighthouse-point", "question-tower": "l8-question-tower",
  "future-bridge": "l10-future-bridge", "victory-peak": "l12-victory-summit",
};

// 20 關節點（S 型佈局，吸附到地圖可行走區）
const NODES: Record<string, { x: number; y: number }[]> = {
  "sound-island": [{x:13.9,y:88.1},{x:35.8,y:88.4},{x:61.4,y:88.1},{x:86.1,y:88.4},{x:86.1,y:69.1},{x:61.6,y:69.5},{x:33.3,y:67.2},{x:12.2,y:69.5},{x:14.2,y:48.9},{x:38.0,y:49.8},{x:61.4,y:51.4},{x:86.1,y:49.8},{x:88.2,y:30.9},{x:62.0,y:31.8},{x:38.2,y:31.2},{x:13.9,y:32.2},{x:13.9,y:11.3},{x:38.2,y:13.8},{x:59.7,y:11.9},{x:86.1,y:14.8}],
  "school-road": [{x:16.7,y:89.1},{x:38.0,y:88.1},{x:62.0,y:88.1},{x:85.8,y:88.4},{x:86.1,y:68.8},{x:62.0,y:69.1},{x:38.2,y:68.8},{x:13.9,y:69.1},{x:13.9,y:51.8},{x:40.6,y:48.9},{x:61.6,y:50.2},{x:83.3,y:54.7},{x:85.4,y:30.2},{x:62.0,y:31.2},{x:38.0,y:30.9},{x:11.4,y:29.6},{x:17.6,y:11.9},{x:38.0,y:11.9},{x:62.4,y:11.9},{x:86.1,y:11.6}],
  "lighthouse-point": [{x:13.7,y:83.9},{x:33.3,y:83.3},{x:59.2,y:88.1},{x:87.3,y:89.1},{x:87.8,y:69.5},{x:62.9,y:69.1},{x:39.3,y:69.5},{x:15.7,y:67.5},{x:13.5,y:49.8},{x:38.0,y:51.1},{x:62.0,y:49.8},{x:86.3,y:49.8},{x:85.4,y:29.3},{x:63.3,y:29.9},{x:35.8,y:29.6},{x:13.3,y:29.6},{x:11.8,y:13.5},{x:40.3,y:13.8},{x:62.0,y:12.2},{x:85.2,y:10.6}],
  "question-tower": [{x:12.0,y:88.1},{x:38.2,y:88.1},{x:64.6,y:87.5},{x:85.8,y:86.5},{x:85.6,y:69.1},{x:62.0,y:69.1},{x:39.5,y:66.9},{x:12.9,y:69.8},{x:15.5,y:49.8},{x:38.0,y:49.8},{x:60.7,y:47.9},{x:86.1,y:49.8},{x:84.1,y:28.3},{x:67.0,y:25.7},{x:36.9,y:30.9},{x:13.3,y:30.5},{x:20.8,y:18.0},{x:38.0,y:20.6},{x:70.4,y:17.7},{x:83.0,y:12.5}],
  "future-bridge": [{x:10.5,y:86.8},{x:38.8,y:91.3},{x:61.8,y:86.5},{x:83.5,y:88.1},{x:83.5,y:72.3},{x:64.6,y:66.6},{x:41.2,y:70.1},{x:15.5,y:67.5},{x:14.6,y:49.5},{x:39.5,y:50.5},{x:66.7,y:49.5},{x:85.4,y:44.7},{x:86.1,y:32.5},{x:63.7,y:33.1},{x:36.7,y:33.1},{x:15.7,y:32.2},{x:16.5,y:10.3},{x:38.4,y:9.0},{x:57.1,y:11.3},{x:86.1,y:11.9}],
  "victory-peak": [{x:12.9,y:88.1},{x:39.3,y:88.1},{x:62.9,y:85.9},{x:85.8,y:86.5},{x:81.8,y:70.1},{x:66.3,y:73.3},{x:34.8,y:67.5},{x:14.4,y:70.1},{x:13.9,y:55.3},{x:38.0,y:57.6},{x:58.8,y:48.6},{x:84.1,y:54.7},{x:83.3,y:22.2},{x:64.2,y:31.5},{x:36.5,y:30.9},{x:16.3,y:25.4},{x:13.9,y:11.9},{x:38.0,y:12.2},{x:63.1,y:11.9},{x:82.0,y:10.3}],
};

export default function IslandClient({ island }: { island: Island }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(50,35,100,0.15), rgba(50,35,100,0.25)), url(/images/islands/${island.slug}.webp)`,
    }}>
      <HomeButton />
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

      {/* 20 關節點 */}
      {NODES[island.slug] && ISLAND_COURSE[island.slug] && (
        <div className="absolute inset-0 z-30">
          {NODES[island.slug].map((n, i) => (
            <Link
              key={i}
              href={`/courses/${ISLAND_COURSE[island.slug]}/mission/${i + 1}`}
              onClick={() => playClick()}
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

      {/* 提示 */}
      <div className="min-h-screen flex flex-col items-center justify-end px-4 pb-4 text-center">
        <p className="bg-white/85 backdrop-blur rounded-full px-4 py-1 shadow text-[11px] sm:text-xs font-bold text-purple-700">
          💡 點 <span className="font-black">數字</span> 開始闖關 · {island.zh}共 20 關
        </p>
      </div>
    </div>
  );
}

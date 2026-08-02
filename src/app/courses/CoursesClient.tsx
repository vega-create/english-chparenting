"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { WORLDS, COURSES } from "@/data/courses";
import { playClick } from "@/lib/sfx";

// 6 個世界卡框（座標依藏寶圖實際框線量測）
const CARD = { top: 22.0, height: 37.5, width: 12.5 };
const CARD_CX = [15.2, 29.2, 43.1, 57.0, 70.9, 84.8];

const WORLD_LINK: Record<string, string> = {
  彩虹谷: "/adventure-map/rainbow-valley",
  友善小鎮: "/adventure-map/world/2",
  海洋灣: "/adventure-map/world/3",
  故事城堡: "/adventure-map/world/4",
  探索大陸: "/adventure-map/world/5",
  冠軍峰: "/adventure-map/world/6",
};

const FEATURES = [
  { icon: "📖", title: "240 堂課程", desc: "系統化學習，循序漸進", color: "bg-purple-500" },
  { icon: "⭐", title: "有趣的互動學習", desc: "遊戲、故事、歌曲，讓學習更快樂", color: "bg-orange-500" },
  { icon: "🛡️", title: "銜接英檢初級", desc: "培養聽、說、讀、寫完整英語能力", color: "bg-blue-500" },
  { icon: "🎁", title: "完成挑戰", desc: "收集獎章，兌換專屬獎勵！", color: "bg-pink-500" },
];

export default function CoursesClient() {
  return (
    <div className="relative w-full min-h-screen">
      {/* 固定滿版底圖（不隨捲動移動、也不留白） */}
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/images/courses/intro-bg.webp)" }} />

      {/* 天空動畫層：飄動的雲 + 熱氣球 */}
      <div className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden">
        {[
          { top: "6%",  size: 90,  dur: 48, delay: 0,  op: 0.85 },
          { top: "14%", size: 62,  dur: 62, delay: 8,  op: 0.7 },
          { top: "24%", size: 110, dur: 74, delay: 20, op: 0.6 },
          { top: "3%",  size: 70,  dur: 56, delay: 32, op: 0.75 },
        ].map((c, i) => (
          <motion.div key={`cloud-${i}`} className="absolute" style={{ top: c.top, opacity: c.op }}
            initial={{ x: "-20vw" }} animate={{ x: "115vw" }}
            transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "linear" }}>
            <div style={{ width: c.size, height: c.size * 0.42, background: "#fff", borderRadius: "999px", filter: "blur(1px)", boxShadow: `${c.size*0.22}px -${c.size*0.14}px 0 ${c.size*0.02}px #fff, ${c.size*0.45}px 0 0 -${c.size*0.03}px #fff` }} />
          </motion.div>
        ))}
        {/* 熱氣球（原本的圖檔，左右飄＋上下浮） */}
        {[
          { src: "/images/balloons/balloon-1.webp", top: "16%", left: "6%",  h: "13vh", dur: 26, rise: 26, delay: 0 },
          { src: "/images/balloons/balloon-2.webp", top: "30%", left: "78%", h: "10vh", dur: 34, rise: 18, delay: 5 },
          { src: "/images/balloons/balloon-3.webp", top: "8%",  left: "58%", h: "8vh",  dur: 42, rise: 14, delay: 12 },
        ].map((b, i) => (
          <motion.img key={`bal-${i}`} src={b.src} alt="" className="absolute object-contain drop-shadow-[0_6px_10px_rgba(60,40,90,0.2)]"
            style={{ top: b.top, left: b.left, height: b.h, width: "auto" }}
            animate={{ x: [0, 70, -35, 0], y: [0, -b.rise, b.rise * 0.5, 0] }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </div>

      {/* ===== 上方：標題 + 飛船 ===== */}
      <div className="relative w-full px-[3vw] pt-[1.5vh]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 pt-[1vh]">
            <h1 className="font-black text-amber-900 leading-tight" style={{ fontSize: "clamp(20px,3vw,42px)" }}>
              展開英語冒險之旅！
            </h1>
            <p className="mt-1.5 font-bold text-amber-800/90 leading-snug" style={{ fontSize: "clamp(11px,1.35vw,18px)" }}>
              從 12 座冒險島、240 堂課程，<br />陪伴孩子勇敢學習，自信開口！
            </p>
          </div>
          {/* 飛船（漂浮動畫） */}
          <motion.img
            src="/images/courses/intro-ship.webp"
            alt="冒險飛船"
            className="object-contain drop-shadow-[0_10px_18px_rgba(40,30,80,0.28)] -mt-[3vh]"
            style={{ height: "26vh", width: "auto" }}
            animate={{ y: [0, -14, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          />
        </div>
      </div>

      {/* ===== 藏寶圖：6 座冒險島 ===== */}
      <div className="relative mx-auto px-1 pb-[1vh] -mt-[2vh]" style={{ maxWidth: "min(94vw, calc(62vh * 1500 / 1006))" }}>
        <div className="relative w-full" style={{ aspectRatio: "1500 / 1006" }}>
          <img src="/images/courses/intro-map.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />

          {/* 標題牌 */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: "7.5%" }}>
            <p className="font-black text-amber-900" style={{ fontSize: "clamp(13px,1.9vw,28px)" }}>選擇你的冒險島</p>
            <p className="font-bold text-amber-700/80 mt-[0.2em]" style={{ fontSize: "clamp(6px,0.8vw,12px)" }}>點島圖去闖關 · 點 <span className="text-purple-600">L1 L2</span> 看課程內容</p>
          </div>

          {/* 6 個世界卡：點島圖→關卡地圖／點 L1 L2→該級課程介紹 */}
          {WORLDS.map((w, i) => (
            <div key={w.name} className="absolute"
              style={{ left: `${CARD_CX[i]}%`, top: `${CARD.top}%`, width: `${CARD.width}%`, height: `${CARD.height}%`, transform: "translateX(-50%)" }}>
              {/* 整張卡 → 關卡地圖 */}
              <Link href={WORLD_LINK[w.name] || "/adventure-map"} onClick={() => playClick()}
                className="absolute inset-0 no-underline group">
                <div className="w-full h-full flex flex-col items-center justify-start pt-[6%] px-[6%] transition-transform group-hover:scale-[1.04] group-active:scale-95">
                  <div className="w-full rounded-lg overflow-hidden shadow-md border-2 border-amber-800/30" style={{ aspectRatio: "1/1" }}>
                    <img src={w.image} alt={w.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-amber-900 mt-[7%] leading-none" style={{ fontSize: "clamp(9px,1.25vw,19px)" }}>{w.name}</p>
                  <p className="font-bold text-amber-700/80 leading-none mt-[2%]" style={{ fontSize: "clamp(6px,0.85vw,13px)" }}>{w.nameEn}</p>
                  <p className="font-bold text-amber-800 mt-[3%]" style={{ fontSize: "clamp(7px,0.95vw,14px)" }}>⭐ 40 課</p>
                </div>
              </Link>
              {/* 級數徽章 → 該級課程介紹（疊在卡片上、獨立可點） */}
              <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 z-10" style={{ bottom: "4%" }}>
                {w.levels.map(lv => {
                  const c = COURSES.find(x => x.level === lv);
                  return (
                    <Link key={lv} href={c ? `/courses/${c.slug}` : "#"} onClick={e => { e.stopPropagation(); playClick(); }}
                      title={c ? `${c.island} 課程內容` : ""}
                      className="no-underline bg-gradient-to-b from-purple-500 to-indigo-600 text-white font-black rounded-full px-[0.55em] py-[0.12em] shadow-md border border-white/60 hover:from-purple-400 hover:scale-110 active:scale-95 transition"
                      style={{ fontSize: "clamp(8px,1vw,15px)" }}>L{lv}</Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* 底部特色列（4 格） */}
          <div className="absolute flex" style={{ left: "8%", right: "8%", top: "62.5%", height: "13%" }}>
            {FEATURES.map(f => (
              <div key={f.title} className="flex-1 flex items-center justify-start gap-[5%] px-[3%]">
                <span className={`${f.color} text-white rounded-full flex items-center justify-center shrink-0 shadow`}
                  style={{ width: "clamp(20px,2.6vw,42px)", height: "clamp(20px,2.6vw,42px)", fontSize: "clamp(10px,1.3vw,20px)" }}>{f.icon}</span>
                <div className="min-w-0 flex flex-col justify-center" style={{ height: "80%" }}>
                  <p className="font-black text-amber-900 leading-tight whitespace-nowrap" style={{ fontSize: "clamp(8px,1.05vw,16px)" }}>{f.title}</p>
                  <p className="font-bold text-amber-700/85 leading-snug mt-[0.2em]" style={{ fontSize: "clamp(6px,0.78vw,12px)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-4">
          <Link href="/adventure-map" onClick={() => playClick()}
            className="inline-block no-underline bg-gradient-to-b from-amber-400 to-orange-500 text-white font-black px-10 py-3 rounded-full shadow-xl border-2 border-white/70 hover:from-amber-500 active:scale-95 transition"
            style={{ fontSize: "clamp(14px,1.8vw,22px)" }}>
            開始冒險 →
          </Link>
        </div>
      </div>
    </div>
  );
}

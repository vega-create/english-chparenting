"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Course } from "@/data/courses";
import { playClick, playStar } from "@/lib/sfx";

// 各級 → 世界圖 / 關卡地圖連結
const WORLD_IMG: Record<number, string> = {
  1: "world-rainbow-valley", 2: "world-rainbow-valley", 3: "world-friendly-town", 4: "world-friendly-town",
  5: "world-ocean-bay", 6: "world-ocean-bay", 7: "world-story-castle", 8: "world-story-castle",
  9: "world-explorer-land", 10: "world-explorer-land", 11: "world-champion-peak", 12: "world-champion-peak",
};
const MAP_LINK: Record<number, string> = {
  1: "/adventure-map/rainbow-valley", 2: "/adventure-map/island/sound-island",
  3: "/adventure-map/world/2", 4: "/adventure-map/island/school-road",
  5: "/adventure-map/world/3", 6: "/adventure-map/island/lighthouse-point",
  7: "/adventure-map/world/4", 8: "/adventure-map/island/question-tower",
  9: "/adventure-map/world/5", 10: "/adventure-map/island/future-bridge",
  11: "/adventure-map/world/6", 12: "/adventure-map/island/victory-peak",
};
const AGE: Record<number, string> = {
  1: "3-6 歲", 2: "4-7 歲", 3: "5-8 歲", 4: "5-8 歲", 5: "6-9 歲", 6: "7-10 歲",
  7: "8-11 歲", 8: "8-11 歲", 9: "9-12 歲", 10: "9-12 歲", 11: "10-13 歲", 12: "11-14 歲",
};
const PALS = ["finn", "coco", "benny", "ruby", "polly", "vega"];
const PAL_NAME: Record<string, string> = { finn: "Finn", coco: "Coco", benny: "Benny", ruby: "Ruby", polly: "Polly", vega: "Vega" };

// hero 框槽位（量測自 frames/hero.webp）
const HERO = {
  img:   { left: "6.6%",  top: "14.4%", width: "24.5%", height: "66.2%" },
  main:  { left: "34.9%", top: "14.4%", width: "57.5%", height: "42.0%" },
  info:  [{ left: "35.5%", top: "64.3%", width: "16.9%", height: "17.6%" },
          { left: "55.3%", top: "63.6%", width: "17.7%", height: "18.3%" },
          { left: "76.1%", top: "63.8%", width: "16.3%", height: "17.6%" }],
};
// section 框 6 槽
const SEC_SLOTS = [
  { left: "11.2%", top: "23.7%" }, { left: "38.3%", top: "23.7%" }, { left: "64.8%", top: "23.7%" },
  { left: "11.2%", top: "54.0%" }, { left: "38.3%", top: "54.0%" }, { left: "64.8%", top: "54.0%" },
];
const SEC_W = "24.1%", SEC_H = "27%";
// progress 5 個石台（等距）
const PROG_CX = [17.5, 33.8, 50.0, 66.2, 82.5];

const FEATURES = [
  { icon: "📅", t: "40 堂課", d: "完整學習內容" },
  { icon: "⭐", t: "300+ 互動活動", d: "豐富有趣練習" },
  { icon: "🎮", t: "遊戲闖關", d: "學習更有動力" },
  { icon: "🎤", t: "AI 發音評測", d: "即時偵測發音" },
  { icon: "🏅", t: "勳章獎勵系統", d: "完成任務都有獎勵" },
  { icon: "📖", t: "沉浸式故事", d: "沉浸式學習體驗" },
];

export default function CourseDetailClient({ course }: { course: Course }) {
  const lv = course.level;
  const zones = ["第一區", "第二區", "第三區", "第四區", "勝利寶藏"];
  const zoneSub = [...course.skills.slice(0, 4), "完成" + course.island + "探險！"];

  return (
    <div className="relative w-full min-h-screen">
      {/* 背景 */}
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/images/courses/intro-bg.webp)", backgroundAttachment: "fixed" }} />
      <div className="fixed inset-0 -z-20" style={{ background: "linear-gradient(180deg,#8fd0f5 0%,#a8dc84 100%)" }} />

      <div className="relative mx-auto px-[2vw] py-[2vh]" style={{ maxWidth: "1500px" }}>
        {/* 返回 */}
        <Link href="/courses" onClick={() => playClick()}
          className="inline-flex items-center gap-1.5 no-underline bg-amber-50/95 text-amber-800 font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-amber-700/40 mb-2 hover:bg-white active:scale-95 transition"
          style={{ fontSize: "clamp(14px,1.43vw,20px)" }}>
          <span className="bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">←</span> 返回冒險地圖
        </Link>

        {/* ===== 1. Hero 框 ===== */}
        <div className="relative w-full" style={{ aspectRatio: "1500 / 541" }}>
          <img src="/images/courses/frames/hero.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
          {/* 島圖 */}
          <div className="absolute overflow-hidden rounded-2xl" style={HERO.img}>
            <img src={`/images/worlds/${WORLD_IMG[lv]}.webp`} alt={course.island} className="w-full h-full object-cover" />
          </div>
          {/* 主資訊 */}
          <div className="absolute flex" style={HERO.main}>
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="font-black text-amber-900 leading-none" style={{ fontSize: "clamp(23px,3.38vw,49px)" }}>{course.island}</h1>
                <span className="bg-purple-500 text-white font-black rounded-full px-3 py-0.5" style={{ fontSize: "clamp(12px,1.30vw,20px)" }}>L{lv}</span>
              </div>
              <p className="font-bold text-amber-700/80 leading-none mt-1" style={{ fontSize: "clamp(13px,1.56vw,22px)" }}>{course.islandEn}</p>
              <p className="text-amber-900/90 font-medium leading-snug mt-1.5 line-clamp-3" style={{ fontSize: "clamp(10px,1.30vw,18px)" }}>{course.longDescription}</p>
            </div>
            {/* 角色排 */}
            <div className="flex items-end shrink-0" style={{ width: "42%" }}>
              {PALS.map((p, i) => (
                <motion.div key={p} className="flex-1 flex flex-col items-center"
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 2.4, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}>
                  <img src={`/characters/${p}/${p}-normal.png`} alt={PAL_NAME[p]} className="w-full object-contain" style={{ maxHeight: "clamp(44px,7.15vw,112px)" }} />
                  <span className="bg-white/85 text-amber-800 font-black rounded-full px-1.5 leading-tight mt-0.5" style={{ fontSize: "clamp(8px,0.85vw,13px)" }}>{PAL_NAME[p]}</span>
                </motion.div>
              ))}
            </div>
          </div>
          {/* 三個資訊格 */}
          {[
            { icon: "👶", t: "建議年齡", v: AGE[lv] },
            { icon: "🕐", t: "學習時間", v: `${course.lessons} 堂課` },
            { icon: "⭐", t: "學習目標", v: course.skills[0] },
          ].map((info, i) => (
            <div key={info.t} className="absolute flex items-center gap-[4%] px-[3%]" style={HERO.info[i]}>
              <span style={{ fontSize: "clamp(14px,1.82vw,29px)" }}>{info.icon}</span>
              <div className="min-w-0">
                <p className="font-black text-amber-900 leading-tight" style={{ fontSize: "clamp(9px,1.10vw,17px)" }}>{info.t}</p>
                <p className="font-bold text-amber-700/85 leading-tight truncate" style={{ fontSize: "clamp(9px,1.04vw,16px)" }}>{info.v}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== 2. 我會學到 / 特色 ===== */}
        <div className="grid md:grid-cols-2 gap-[1.5vw] mt-[1.5vh]">
          {[
            { tag: "我會學到", items: course.topics.slice(0, 6).map((t, i) => ({ icon: ["🔤", "🔊", "👂", "✏️", "🎵", "🎮"][i], t, d: course.skills[i % course.skills.length] })) },
            { tag: `${course.island}特色`, items: FEATURES },
          ].map(sec => (
            <div key={sec.tag} className="relative w-full" style={{ aspectRatio: "1396 / 1050" }}>
              <img src="/images/courses/frames/section.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
              {/* 紫緞帶標題 */}
              <p className="absolute font-black text-white" style={{ left: "6%", top: "6.5%", width: "34%", textAlign: "center", fontSize: "clamp(12px,1.49vw,22px)", textShadow: "0 1px 2px rgba(60,25,100,.5)" }}>{sec.tag}</p>
              {/* 6 格 */}
              {sec.items.map((it, i) => (
                <div key={i} className="absolute flex flex-col items-center justify-center text-center px-[1.5%]"
                  style={{ ...SEC_SLOTS[i], width: SEC_W, height: SEC_H }}>
                  <span style={{ fontSize: "clamp(20px,3.12vw,49px)" }}>{it.icon}</span>
                  <p className="font-black text-amber-900 leading-tight mt-[6%] line-clamp-2" style={{ fontSize: "clamp(9px,1.20vw,18px)" }}>{it.t}</p>
                  <p className="font-bold text-amber-700/75 leading-tight mt-[3%] line-clamp-2" style={{ fontSize: "clamp(8px,0.94vw,14px)" }}>{it.d}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ===== 3. 探險地圖 ===== */}
        <div className="relative w-full mt-[1.5vh]" style={{ aspectRatio: "1500 / 456" }}>
          <img src="/images/courses/frames/progress.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
          <p className="absolute font-black text-white" style={{ left: "2%", top: "6%", width: "22%", textAlign: "center", fontSize: "clamp(12px,1.49vw,22px)", textShadow: "0 1px 2px rgba(60,25,100,.5)" }}>{course.island}探險地圖</p>
          {zones.map((z, i) => (
            <div key={z} className="absolute text-center" style={{ left: `${PROG_CX[i]}%`, top: "45%", width: "16%", transform: "translate(-50%,-50%)" }}>
              <span style={{ fontSize: "clamp(18px,2.86vw,44px)" }}>{i === 4 ? "🎁" : "🔒"}</span>
            </div>
          ))}
          {zones.map((z, i) => (
            <div key={`t-${z}`} className="absolute text-center" style={{ left: `${PROG_CX[i]}%`, top: "76%", width: "18%", transform: "translateX(-50%)" }}>
              <p className="font-black text-amber-900 leading-tight" style={{ fontSize: "clamp(9px,1.20vw,18px)" }}>{z}</p>
              <p className="font-bold text-amber-700/75 leading-tight line-clamp-1" style={{ fontSize: "clamp(8px,0.94vw,14px)" }}>{zoneSub[i]}</p>
            </div>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center mt-[1.5vh] pb-[2vh]">
          <Link href={MAP_LINK[lv] || "/adventure-map"} onClick={() => playStar()}
            className="inline-flex items-center gap-2 no-underline bg-gradient-to-b from-amber-300 to-orange-500 text-white font-black px-10 py-3 rounded-full shadow-2xl border-[3px] border-white/80 hover:from-amber-400 active:scale-95 transition"
            style={{ fontSize: "clamp(21px,2.86vw,42px)", textShadow: "0 2px 3px rgba(120,60,0,.4)" }}>
            ⭐ 開始{course.island}冒險！
          </Link>
        </div>
      </div>
    </div>
  );
}

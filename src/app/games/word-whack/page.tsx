"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { playStar, playClick, playSuccess, playSwoosh } from "@/lib/sfx";
import { speak } from "@/lib/speech";

/* ============================================================
   冒險島打地鼠 Island Word Whack
   地鼠從浮島的洞冒出、舉著英文單字；打「符合上方圖片」的那隻
   打對：發音 + 星星 + 連擊；打錯：搖一下、連擊歸零（不扣命，低年級友善）
   60 秒計時，難度溫和
============================================================ */

const WORDS = [
  { en: "apple", zh: "蘋果", emoji: "🍎" },
  { en: "banana", zh: "香蕉", emoji: "🍌" },
  { en: "cat", zh: "貓", emoji: "🐱" },
  { en: "dog", zh: "狗", emoji: "🐶" },
  { en: "ball", zh: "球", emoji: "⚽" },
  { en: "sun", zh: "太陽", emoji: "☀️" },
  { en: "star", zh: "星星", emoji: "⭐" },
  { en: "fish", zh: "魚", emoji: "🐟" },
];

const MOLE_FACES = ["🦊", "🐻", "🐰", "🐱", "🦜"]; // 冒出的可愛角色
const HOLES = 9; // 3×3

type Phase = "start" | "playing" | "over";
interface Mole { word: typeof WORDS[0]; correct: boolean; id: number; life: number; face: string; hit?: boolean; wrong?: boolean; }
interface Burst { id: number; hole: number; text: string; kind: "good" | "bad"; }

export default function WordWhackPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [holes, setHoles] = useState<(Mole | null)[]>(Array(HOLES).fill(null));
  const [target, setTarget] = useState(WORDS[0]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [best, setBest] = useState(0);
  const [bursts, setBursts] = useState<Burst[]>([]);

  // refs（給 interval / 事件讀最新值）
  const holesRef = useRef(holes);
  const targetRef = useRef(target);
  const comboRef = useRef(0);
  const correctCountRef = useRef(0);
  const uid = useRef(1);

  const setHolesSync = useCallback((updater: (p: (Mole | null)[]) => (Mole | null)[]) => {
    setHoles(prev => { const next = updater(prev); holesRef.current = next; return next; });
  }, []);

  useEffect(() => {
    try { setBest(parseInt(localStorage.getItem("wordWhackBest") || "0", 10)); } catch {}
  }, []);

  const newTarget = useCallback(() => {
    let n = targetRef.current;
    while (n.en === targetRef.current.en) n = WORDS[Math.floor(Math.random() * WORDS.length)];
    targetRef.current = n;
    setTarget(n);
  }, []);

  const start = useCallback(() => {
    setScore(0); setCombo(0); comboRef.current = 0; correctCountRef.current = 0;
    setTimeLeft(60);
    setBursts([]);
    const t0 = WORDS[Math.floor(Math.random() * WORDS.length)];
    targetRef.current = t0; setTarget(t0);
    const empty = Array(HOLES).fill(null);
    holesRef.current = empty; setHoles(empty);
    setPhase("playing");
  }, []);

  const addBurst = useCallback((hole: number, text: string, kind: "good" | "bad") => {
    const id = uid.current++;
    setBursts(b => [...b, { id, hole, text, kind }]);
    setTimeout(() => setBursts(b => b.filter(x => x.id !== id)), 750);
  }, []);

  // 遊戲主 tick（200ms）：地鼠壽命遞減 + 每 5 tick 冒一批
  useEffect(() => {
    if (phase !== "playing") return;
    let tick = 0;
    const iv = setInterval(() => {
      tick++;
      setHolesSync(prev => {
        // life 到 0 開始「縮回」動畫，到 -1 才真正移除（自己控制，不靠 AnimatePresence 離場）
        let next = prev.map(h => (h && !h.hit ? { ...h, life: h.life - 1 } : h));
        next = next.map(h => (h && h.life <= -1 ? null : h));
        if (tick % 5 === 0) {
          const empties: number[] = [];
          next.forEach((h, i) => { if (!h) empties.push(i); });
          shuffle(empties);
          const count = Math.min(3, empties.length);
          for (let k = 0; k < count; k++) {
            const idx = empties[k];
            // 第一隻保證是正確答案，其餘隨機
            const word = k === 0 ? targetRef.current : WORDS[Math.floor(Math.random() * WORDS.length)];
            next[idx] = {
              word, correct: word.en === targetRef.current.en,
              id: uid.current++, life: 9, face: MOLE_FACES[Math.floor(Math.random() * MOLE_FACES.length)],
            };
          }
        }
        return next;
      });
    }, 200);
    return () => clearInterval(iv);
  }, [phase, setHolesSync]);

  // 計時器
  useEffect(() => {
    if (phase !== "playing") return;
    const iv = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(iv);
          setScore(s => {
            try { const b = parseInt(localStorage.getItem("wordWhackBest") || "0", 10); if (s > b) { localStorage.setItem("wordWhackBest", String(s)); setBest(s); } } catch {}
            return s;
          });
          setPhase("over");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [phase]);

  function whack(i: number) {
    const h = holesRef.current[i];
    if (!h || h.hit) return;
    if (h.correct) {
      playStar();
      speak(h.word.en);
      const gain = 10 + comboRef.current * 2;
      setScore(s => s + gain);
      comboRef.current += 1; setCombo(comboRef.current);
      addBurst(i, `+${gain}`, "good");
      correctCountRef.current += 1;
      if (correctCountRef.current % 4 === 0) newTarget();
      // 標記被打中（播縮小動畫）後移除
      setHolesSync(prev => { const n = [...prev]; if (n[i]) n[i] = { ...n[i]!, hit: true }; return n; });
      setTimeout(() => setHolesSync(prev => { const n = [...prev]; if (n[i] && n[i]!.id === h.id) n[i] = null; return n; }), 200);
    } else {
      playClick();
      comboRef.current = 0; setCombo(0);
      addBurst(i, "✗", "bad");
      setHolesSync(prev => { const n = [...prev]; if (n[i]) n[i] = { ...n[i]!, wrong: true }; return n; });
      setTimeout(() => setHolesSync(prev => { const n = [...prev]; if (n[i] && n[i]!.id === h.id) n[i] = { ...n[i]!, wrong: false }; return n; }), 350);
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "linear-gradient(180deg,#7dd3fc 0%,#c4b5fd 55%,#fbcfe8 100%)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes moleShake { 0%,100%{transform:translateY(0) rotate(0)} 25%{transform:translateY(0) rotate(-11deg)} 75%{transform:translateY(0) rotate(11deg)} }
        .mole-wrong { animation: moleShake .35s ease-in-out; }
      `}} />
      {/* 天空裝飾 */}
      {[["8%", "10%", 1], ["68%", "7%", 1.3], ["40%", "16%", .8]].map(([l, t, s], i) => (
        <motion.div key={i} className="absolute text-5xl opacity-80 pointer-events-none" style={{ left: l as string, top: t as string, scale: s as number }}
          animate={{ x: [0, 18, 0] }} transition={{ duration: 9 + i * 2, repeat: Infinity }}>☁️</motion.div>
      ))}

      <div className="relative w-full max-w-[480px] h-full mx-auto flex flex-col">
        {/* 頂部 HUD */}
        <div className="flex items-center justify-between p-3 z-20">
          <Link href="/adventure-map/rainbow-valley" className="bg-white/85 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-purple-700 shadow no-underline">← 離開</Link>
          <div className="bg-white/85 backdrop-blur px-4 py-1.5 rounded-full shadow font-black text-purple-700">⭐ {score}</div>
          <div className={`bg-white/85 backdrop-blur px-4 py-1.5 rounded-full shadow font-black ${timeLeft <= 10 ? "text-rose-500" : "text-gray-600"}`}>⏰ {timeLeft}</div>
        </div>

        {phase === "playing" && (
          <>
            {/* 目標卡 */}
            <div className="flex justify-center z-20 -mt-1">
              <motion.div key={target.en} initial={{ scale: 0.7, y: -8 }} animate={{ scale: 1, y: 0 }}
                className="bg-white/92 backdrop-blur px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 ring-2 ring-amber-300">
                <span className="text-sm font-black text-gray-500">打這個 →</span>
                <span className="text-3xl">{target.emoji}</span>
                <span className="text-2xl font-black text-purple-700">{target.en}</span>
                <button onClick={() => speak(target.en)} className="text-xl">🔊</button>
              </motion.div>
            </div>
            {combo >= 2 && (
              <div className="flex justify-center mt-1.5 z-20">
                <span className="bg-pink-500 text-white text-sm font-black px-3 py-0.5 rounded-full shadow">🔥 {combo} 連擊！</span>
              </div>
            )}

            {/* 冒險島 + 地鼠洞 */}
            <div className="flex-1 flex items-center justify-center px-4 pb-6">
              <div className="relative w-full" style={{ maxWidth: 420 }}>
                {/* 浮島底座 */}
                <div className="absolute -inset-x-2 -top-2 bottom-6 rounded-[2.5rem] bg-gradient-to-b from-emerald-300 to-green-500 shadow-2xl" />
                <div className="absolute -inset-x-2 top-[62%] bottom-6 rounded-b-[2.5rem] bg-gradient-to-b from-amber-700 to-amber-900 -z-0" style={{ clipPath: "polygon(0 0,100% 0,86% 60%,60% 100%,40% 100%,14% 60%)" }} />
                {/* 島上小裝飾 */}
                <div className="absolute -top-6 left-2 text-3xl">🌴</div>
                <div className="absolute -top-5 right-3 text-3xl">🏰</div>

                {/* 3×3 洞 */}
                <div className="relative grid grid-cols-3 gap-x-4 gap-y-3 p-5 pt-8">
                  {Array.from({ length: HOLES }).map((_, i) => (
                    <Hole key={i} mole={holes[i]} onWhack={() => whack(i)} burst={bursts.find(b => b.hole === i)} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 開始畫面 */}
      {phase === "start" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-7xl mb-3">🦊</motion.div>
          <h1 className="text-3xl font-black text-white mb-1" style={{ textShadow: "0 3px 12px rgba(0,0,0,.35)" }}>冒險島打地鼠</h1>
          <p className="text-white/95 font-bold mb-6">動物從島上的洞冒出來，<br />打「上面那張圖」的英文單字！</p>
          <div className="bg-white/90 backdrop-blur rounded-2xl px-5 py-4 mb-6 text-sm font-bold text-gray-700 space-y-1">
            <p>🎯 看上方目標圖片，打對應英文的動物</p>
            <p>✅ 打對 = 加分＋發音｜連續打對有加成</p>
            <p>⏰ 60 秒內拿越高分越好！打錯不扣分</p>
          </div>
          <button onClick={() => { playSwoosh(); start(); }}
            className="px-10 py-4 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-black text-xl rounded-full shadow-xl ring-2 ring-white/70 active:scale-95">
            開始遊戲 🚀
          </button>
          {best > 0 && <p className="text-white/85 font-bold mt-4">🏆 最高分：{best}</p>}
        </div>
      )}

      {/* 結束畫面 */}
      {phase === "over" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-7xl mb-2">{score >= best && score > 0 ? "🏆" : "🎉"}</div>
          <h2 className="text-2xl font-black text-white mb-1">時間到！</h2>
          <p className="text-5xl font-black text-amber-300 my-3" style={{ textShadow: "0 3px 12px rgba(0,0,0,.4)" }}>{score}</p>
          <p className="text-white/95 font-bold mb-6">🏆 最高分：{best}{score >= best && score > 0 ? "（新紀錄！）" : ""}</p>
          <div className="flex gap-3">
            <button onClick={() => { playSwoosh(); start(); }}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-black text-lg rounded-full shadow-xl ring-2 ring-white/70 active:scale-95">
              再玩一次 🔄
            </button>
            <Link href="/adventure-map/rainbow-valley" onClick={() => playClick()}
              className="px-6 py-3.5 bg-white/90 text-purple-700 font-black text-lg rounded-full shadow-xl no-underline active:scale-95">
              回地圖
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ 單一地鼠洞
   地鼠元素常駐，用 CSS transform 切換升(0)/降(76) — 穩定不重掛載 */
function Hole({ mole, onWhack, burst }: { mole: Mole | null; onWhack: () => void; burst?: Burst }) {
  const up = !!mole && !mole.hit && mole.life > 0;
  return (
    <div className="relative flex items-end justify-center" style={{ height: 78 }}>
      {/* 洞（暗橢圓） */}
      <div className="absolute bottom-0 w-[72px] h-6 rounded-[50%] bg-amber-950/70 shadow-inner" />

      {/* 地鼠（overflow 裁切成從洞內升起） */}
      <div className="absolute bottom-1 w-[72px] h-[72px] overflow-hidden flex items-end justify-center">
        <button
          onClick={() => { if (up) onWhack(); }}
          className={`flex flex-col items-center ${up ? "cursor-pointer" : "pointer-events-none"} ${mole?.wrong ? "mole-wrong" : ""}`}
          style={{
            transform: `translateY(${up ? 0 : 78}px) scale(${mole?.hit ? 0.55 : 1})`,
            transition: "transform .22s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          <div className="text-3xl leading-none -mb-0.5">{mole ? mole.face : "🦊"}</div>
          <div className={`px-2 py-0.5 rounded-lg text-sm font-black shadow whitespace-nowrap ${mole?.wrong ? "bg-red-100 text-red-600" : "bg-white text-purple-700"}`}>
            {mole ? mole.word.en : "?"}
          </div>
        </button>
      </div>

      {/* 洞前緣（蓋住地鼠底部，強化「從洞冒出」感） */}
      <div className="absolute bottom-0 w-[74px] h-3 rounded-[50%] bg-gradient-to-b from-amber-800 to-amber-950 pointer-events-none z-10" />

      {/* 打擊特效 */}
      <AnimatePresence>
        {burst && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 0.6 }} animate={{ y: -34, opacity: 0, scale: 1.3 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`absolute bottom-8 font-black text-lg pointer-events-none ${burst.kind === "good" ? "text-amber-500" : "text-rose-500"}`}
          >
            {burst.kind === "good" ? `⭐${burst.text}` : burst.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function shuffle<T>(a: T[]) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } }

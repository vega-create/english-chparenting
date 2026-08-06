"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { playStar, playClick, playSuccess, playSwoosh } from "@/lib/sfx";
import { speak } from "@/lib/speech";
import { playPageIntro } from '@/lib/vega-audio';

/* ============================================================
   單字流星雨 Word Catcher — 真實 Canvas 遊戲迴圈 (60fps)
   籃子接掉落單字：接對星星爆發+發音+連擊、接錯扣命、難度遞增
   鍵盤(←→/AD) + 觸控/滑鼠拖曳
============================================================ */

// L1 單字庫（emoji 教語意，英文練認字）
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

type Phase = "start" | "playing" | "over";

interface FallWord { x: number; y: number; vy: number; w: number; text: string; correct: boolean; caught: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; ch: string; }

export default function WordCatcherPage() {
  useEffect(() => { playPageIntro('games'); }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [finalScore, setFinalScore] = useState(0);
  const [best, setBest] = useState(0);
  const [targetInfo, setTargetInfo] = useState(WORDS[0]);

  // 遊戲可變狀態（放 ref 避免每格 re-render）
  const g = useRef<any>(null);

  useEffect(() => {
    try { setBest(parseInt(localStorage.getItem("wordCatcherBest") || "0", 10)); } catch {}
  }, []);

  const start = useCallback(() => {
    setFinalScore(0);
    const t0 = Math.floor(rand() * WORDS.length);
    setTargetInfo(WORDS[t0]);
    g.current = {
      basketX: 0, wantX: 0, words: [] as FallWord[], particles: [] as Particle[],
      score: 0, combo: 0, lives: 3, frame: 0, spawnAt: 0,
      targetIdx: t0, correctCount: 0, flash: 0, flashColor: "0,200,0", shake: 0,
      running: true,
    };
    setPhase("playing");
  }, []);

  // 主遊戲迴圈
  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0, H = 0, dpr = 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (g.current && g.current.basketX === 0) { g.current.basketX = W / 2; g.current.wantX = W / 2; }
    }
    resize();
    window.addEventListener("resize", resize);

    const BASKET_W = 92, BASKET_H = 60;

    // 輸入
    const keys: Record<string, boolean> = {};
    const onKeyDown = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = true; };
    const onKeyUp = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = false; };
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      g.current.wantX = e.clientX - rect.left;
    };
    const onPointerMove = (e: PointerEvent) => { if (e.buttons || e.pointerType === "touch") onPointer(e); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointer);
    canvas.addEventListener("pointermove", onPointerMove);

    function spawn() {
      const s = g.current;
      // 難度：分數越高掉越快、目標比例略降
      const speed = 2.2 + Math.min(s.score / 120, 4.5) + rand() * 1.2;
      const useTarget = rand() < 0.5;
      const word = useTarget ? WORDS[s.targetIdx] : WORDS[Math.floor(rand() * WORDS.length)];
      ctx.font = "700 22px 'Noto Sans TC', sans-serif";
      const tw = ctx.measureText(word.en).width + 34;
      s.words.push({ x: 30 + rand() * (W - 60 - tw), y: -40, vy: speed, w: tw, text: word.en, correct: word.en === WORDS[s.targetIdx].en, caught: false });
    }

    function burst(x: number, y: number, color: string) {
      const s = g.current;
      const chars = color === "star" ? ["⭐", "✨", "💫", "🌟"] : ["💥", "✖️"];
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        s.particles.push({ x, y, vx: Math.cos(a) * (2 + rand() * 3), vy: Math.sin(a) * (2 + rand() * 3) - 1, life: 1, ch: chars[i % chars.length] });
      }
    }

    function newTarget() {
      const s = g.current;
      let n = s.targetIdx;
      while (n === s.targetIdx) n = Math.floor(rand() * WORDS.length);
      s.targetIdx = n;
      setTargetInfo(WORDS[n]);
    }

    function endGame() {
      const s = g.current;
      s.running = false;
      setFinalScore(s.score);
      try {
        const b = parseInt(localStorage.getItem("wordCatcherBest") || "0", 10);
        if (s.score > b) { localStorage.setItem("wordCatcherBest", String(s.score)); setBest(s.score); }
      } catch {}
      setPhase("over");
    }

    function update() {
      const s = g.current;
      s.frame++;
      // 籃子移動（鍵盤）
      if (keys["arrowleft"] || keys["a"]) s.wantX -= 9;
      if (keys["arrowright"] || keys["d"]) s.wantX += 9;
      s.wantX = Math.max(BASKET_W / 2, Math.min(W - BASKET_W / 2, s.wantX));
      s.basketX += (s.wantX - s.basketX) * 0.25;

      // 生成
      const interval = Math.max(38, 78 - Math.floor(s.score / 25));
      if (s.frame - s.spawnAt > interval) { spawn(); s.spawnAt = s.frame; }

      const basketTop = H - 30 - BASKET_H;
      for (const w of s.words) {
        w.y += w.vy;
        if (!w.caught && w.y + 34 >= basketTop && w.y + 34 <= basketTop + 46) {
          const cx = w.x + w.w / 2;
          if (Math.abs(cx - s.basketX) < BASKET_W / 2 + w.w / 2 - 14) {
            w.caught = true;
            if (w.correct) {
              s.combo++;
              s.score += 10 + (s.combo - 1) * 2;
              burst(cx, basketTop, "star");
              s.flash = 0.5; s.flashColor = "80,220,120";
              playStar();
              speak(w.text);
              s.correctCount++;
              if (s.correctCount % 4 === 0) newTarget();
            } else {
              s.combo = 0; s.lives--;
              burst(cx, basketTop, "bad");
              s.flash = 0.6; s.flashColor = "240,80,80"; s.shake = 12;
              playClick();
              if (s.lives <= 0) { endGame(); return; }
            }
          }
        }
      }
      s.words = s.words.filter((w: FallWord) => !w.caught && w.y < H + 50);
      for (const p of s.particles) { p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.02; }
      s.particles = s.particles.filter((p: Particle) => p.life > 0);
      if (s.flash > 0) s.flash -= 0.03;
      if (s.shake > 0) s.shake *= 0.85;
    }

    function render() {
      const s = g.current;
      ctx.save();
      if (s.shake > 0.5) ctx.translate((rand() - 0.5) * s.shake, (rand() - 0.5) * s.shake);

      // 天空漸層
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#7dd3fc"); grad.addColorStop(0.5, "#c4b5fd"); grad.addColorStop(1, "#fbcfe8");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

      // 掉落單字
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (const w of s.words) {
        const cx = w.x + w.w / 2, cy = w.y + 17;
        roundRect(ctx, w.x, w.y, w.w, 34, 17);
        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
        ctx.strokeStyle = "rgba(147,51,234,0.25)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "#5b21b6"; ctx.font = "700 22px 'Noto Sans TC', sans-serif";
        ctx.fillText(w.text, cx, cy + 1);
      }

      // 籃子
      const bx = s.basketX, by = H - 30 - BASKET_H;
      ctx.font = "56px serif";
      ctx.fillText("🧺", bx, by + 34);

      // 粒子
      for (const p of s.particles) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.font = "26px serif";
        ctx.fillText(p.ch, p.x, p.y);
      }
      ctx.globalAlpha = 1;

      // 閃光
      if (s.flash > 0) { ctx.fillStyle = `rgba(${s.flashColor},${s.flash * 0.35})`; ctx.fillRect(0, 0, W, H); }

      // HUD：分數
      ctx.textAlign = "left"; ctx.fillStyle = "#4338ca"; ctx.font = "900 26px 'Noto Sans TC', sans-serif";
      ctx.fillText(`⭐ ${s.score}`, 16, 40);
      if (s.combo >= 2) { ctx.fillStyle = "#db2777"; ctx.font = "900 20px 'Noto Sans TC', sans-serif"; ctx.fillText(`🔥 ${s.combo} 連擊`, 16, 68); }
      // 命
      ctx.textAlign = "right"; ctx.font = "24px serif";
      ctx.fillText("❤️".repeat(Math.max(0, s.lives)) + "🤍".repeat(Math.max(0, 3 - s.lives)), W - 14, 38);

      ctx.restore();
    }

    function loop() {
      if (!g.current.running) return;
      update();
      if (!g.current.running) return;
      render();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointer);
      canvas.removeEventListener("pointermove", onPointerMove);
      if (g.current) g.current.running = false;
    };
  }, [phase]);

  return (
    <div className="fixed inset-0 flex flex-col items-center" style={{ background: "linear-gradient(160deg,#312e81,#6d28d9,#be185d)" }}>
      <div className="relative w-full max-w-[480px] h-full mx-auto">
        {/* 遊戲畫布 */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" />

        {/* 目標提示條（playing 時） */}
        {phase === "playing" && (
          <div className="absolute top-[86px] left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur px-5 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-none">
            <span className="text-sm font-black text-gray-500">接住</span>
            <span className="text-2xl">{targetInfo.emoji}</span>
            <span className="text-xl font-black text-purple-700">{targetInfo.en}</span>
          </div>
        )}

        <Link href="/adventure-map/rainbow-valley" className="absolute top-3 left-3 z-20 bg-white/85 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-purple-700 shadow no-underline">← 離開</Link>

        {/* 開始畫面 */}
        {phase === "start" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-7xl mb-3 animate-bounce">🧺</div>
            <h1 className="text-3xl font-black text-white mb-1" style={{ textShadow: "0 3px 12px rgba(0,0,0,.4)" }}>單字流星雨</h1>
            <p className="text-white/90 font-bold mb-6">單字從天上掉下來，<br />接住畫面上指定的英文字！</p>
            <div className="bg-white/90 backdrop-blur rounded-2xl px-5 py-4 mb-6 text-sm font-bold text-gray-700 space-y-1">
              <p>🖥️ 電腦：← → 或 A D 移動籃子</p>
              <p>📱 手機：手指左右滑動</p>
              <p>✅ 接對 = 加分＋發音｜❌ 接錯 = 扣一顆愛心</p>
            </div>
            <button onClick={() => { playSwoosh(); start(); }}
              className="px-10 py-4 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-black text-xl rounded-full shadow-xl ring-2 ring-white/70 active:scale-95">
              開始遊戲 🚀
            </button>
            {best > 0 && <p className="text-white/80 font-bold mt-4">🏆 最高分：{best}</p>}
          </div>
        )}

        {/* 結束畫面 */}
        {phase === "over" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-7xl mb-2">{finalScore >= best && finalScore > 0 ? "🏆" : "🎮"}</div>
            <h2 className="text-2xl font-black text-white mb-1">遊戲結束！</h2>
            <p className="text-5xl font-black text-amber-300 my-3" style={{ textShadow: "0 3px 12px rgba(0,0,0,.4)" }}>{finalScore}</p>
            <p className="text-white/90 font-bold mb-6">🏆 最高分：{best}{finalScore >= best && finalScore > 0 ? " （新紀錄！）" : ""}</p>
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
    </div>
  );
}

// 不用 Math.random 直接命名以便日後可控；這裡遊戲用隨機 OK
function rand() { return Math.random(); }

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

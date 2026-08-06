'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { playClick, playStar } from '@/lib/sfx';
import { playVega, stopVega } from '@/lib/vega-audio';
import { CharacterPlayButton } from '@/components/VegaAudio';
import HomeButton from "@/components/HomeButton";

// 每張 guide 背景（1600 寬）的高度 → 算 aspect，讓疊層對齊圖
const HEIGHTS = [893, 735, 617, 616, 602];
const N = HEIGHTS.length;

// slide 3「認識夥伴」：5 隻動物依序放進 紫/藍/粉/綠/黃 框
const FRIENDS = [
  { key: 'finn',  name: 'Finn',  en: 'Brave team leader', cx: 16.3, sc: 0.88, pill: 'bg-purple-500' },
  { key: 'coco',  name: 'Coco',  en: 'A great listener',  cx: 32.9, sc: 0.84, pill: 'bg-sky-500' },
  { key: 'polly', name: 'Polly', en: 'Loves to speak',    cx: 49.5, sc: 0.95, pill: 'bg-pink-500' },
  { key: 'benny', name: 'Benny', en: 'Loves reading',     cx: 66.2, sc: 0.92, pill: 'bg-green-600' },
  { key: 'ruby',  name: 'Ruby',  en: 'Writing star',      cx: 82.9, sc: 0.92, pill: 'bg-amber-500' },
];

// slide 2「How You'll Learn」：4 個學習步驟圖示進框
const STEPS = [
  { img: 'intro-book',     en: 'Read Story', zh: '讀故事', cx: 18.7, sc: 1.32, dy: '-6%', color: '#67a32e' },
  { img: 'intro-listen',   en: 'Listen',     zh: '聽力',   cx: 39.5, sc: 1,    dy: '4%',  color: '#f29601' },
  { img: 'intro-speak',    en: 'Speak',      zh: '口說',   cx: 59.5, sc: 1,    dy: '0%',  color: '#2c8be8' },
  { img: 'intro-playgame', en: 'Play Game',  zh: '玩遊戲', cx: 79.7, sc: 1,    dy: '7%',  color: '#945cc6' },
];

// slide 4「Collect Rewards」：4 個獎勵圖示橫排（場景無框）
const REWARDS = [
  { img: 'intro-star', en: 'Earn Stars',  zh: '得星星', cx: 31, pill: 'bg-amber-500' },
  { img: 'intro-gem',  en: 'Get Gems',    zh: '收寶石', cx: 44, pill: 'bg-sky-500' },
  { img: 'intro-king', en: 'Win Badges',  zh: '拿徽章', cx: 57, pill: 'bg-purple-500' },
  { img: 'intro-gift', en: 'Open Chests', zh: '開寶箱', cx: 70, pill: 'bg-green-600' },
];

// slide 1「Welcome」：中間站 5 個玩家角色（人類），混一些 happy 表情
const PLAYERS = [
  { slug: 'elly', pose: '', cx: 30, sc: 1.14 },
  { slug: 'sky',  pose: '', cx: 41, sc: 1 },
  { slug: 'coco', pose: '', cx: 52, sc: 1 },
  { slug: 'leo',  pose: '', cx: 63, sc: 1 },
  { slug: 'vera', pose: '', cx: 74, sc: 1 },
];

export default function GuideSlides() {
  const [i, setI] = useState(0);
  const router = useRouter();
  const touchX = useRef<number | null>(null);

  // 重整後留在同一頁（sessionStorage）；讀取完成前不顯示，避免先閃第1頁
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const s = sessionStorage.getItem('ae_guide_slide');
    if (s !== null) setI(Math.min(N - 1, Number(s)));
    setReady(true);
  }, []);
  useEffect(() => {
    sessionStorage.setItem('ae_guide_slide', String(i));
  }, [i]);

  // 每張 slide 播對應的 Vega 說明（guide-step-1…5）
  useEffect(() => {
    if (!ready) return;
    playVega(`guide-step-${i + 1}`);
    return () => stopVega();
  }, [i, ready]);

  function go(n: number) {
    const x = Math.max(0, Math.min(N - 1, n));
    if (x !== i) { playClick(); setI(x); }
  }
  function onTouchStart(e: React.TouchEvent) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) { go(dx < 0 ? i + 1 : i - 1); }
    touchX.current = null;
  }
  function markSeen() { try { localStorage.setItem('ae_seen_guide', '1'); } catch {} }
  function finish() { playStar(); markSeen(); router.push('/choose-character'); }

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-sky-200"
      style={{ height: '100dvh' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <HomeButton />

      {HEIGHTS.map((h, idx) => (
        <div key={idx} className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready && idx === i ? 1 : 0, pointerEvents: idx === i ? 'auto' : 'none' }}>
          {/* 模糊填滿層 */}
          <div className="absolute inset-0"
            style={{ backgroundImage: `url(/images/guide/guide${idx + 1}.webp)`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(24px)', transform: 'scale(1.12)' }} />
          {/* 完整 slide（鎖定比例的容器，疊層對齊圖） */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ aspectRatio: `1600 / ${h}`, width: '100%', maxWidth: `calc(100dvh * 1600 / ${h})`, maxHeight: '100%' }}>
              <img src={`/images/guide/guide${idx + 1}.webp`} alt="" className="absolute inset-0 w-full h-full object-fill" />

              {/* slide 1：Welcome（左文字+Start / 中5個玩家角色 / 右Vega講話） */}
              {idx === 0 && (
                <>
                  <div className="absolute" style={{ left: '4.5%', top: '11%', width: '35%' }}>
                    <span className="inline-flex w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-purple-500 text-white font-black items-center justify-center mb-1 shadow" style={{ fontSize: 'clamp(13px,1.6vw,22px)' }}>1</span>
                    <h2 className="font-black leading-[0.92]" style={{ fontSize: 'clamp(22px,3.7vw,52px)', letterSpacing: '-0.01em' }}>
                      <span className="text-amber-900">Welcome,</span><br /><span className="text-purple-600">Explorer!</span>
                    </h2>
                    <p className="font-bold text-amber-800/90 mt-2 mb-3 leading-snug" style={{ fontSize: 'clamp(10px,1.35vw,18px)' }}>Today begins your<br />Adventure English journey!</p>
                    <button onClick={() => go(i + 1)} className="rounded-full bg-gradient-to-b from-amber-400 to-orange-500 text-white font-black shadow-lg border-2 border-white/70 active:scale-95 hover:from-amber-500 transition" style={{ fontSize: 'clamp(14px,1.9vw,26px)', padding: '0.42em 1.6em' }}>Start ▶</button>
                  </div>
                  {PLAYERS.map(p => (
                    <div key={p.slug} className="absolute flex items-end justify-center" style={{ left: `${p.cx}%`, bottom: '5%', width: '11%', height: '35%', transform: 'translateX(-50%)' }}>
                      <img src={`/images/avatars/${p.slug}${p.pose}.webp`} alt="" className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.3)]" />
                    </div>
                  ))}
                  {/* Miss Vega 嚮導講話（右下，較小） */}
                  <img src="/characters/vega/vega-talk.png" alt="Vega" className="absolute object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]" style={{ right: '1.5%', bottom: '3%', width: '8%' }} />
                  <div className="absolute" style={{ right: '3%', bottom: '30%', width: '14%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation1.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[13%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>歡迎一起<br />來冒險島！</p>
                    </div>
                  </div>
                </>
              )}

              {/* slide 2：How You'll Learn（標題 + 4 步驟圖示 + 底部副標 + Vega 講話） */}
              {idx === 1 && (
                <>
                  {/* 標題 */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ top: '6%' }}>
                    <span className="inline-flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 text-white font-black items-center justify-center" style={{ fontSize: 'clamp(14px,1.8vw,24px)' }}>2</span>
                    <h2 className="font-black text-amber-900" style={{ fontSize: 'clamp(18px,2.7vw,40px)' }}>How You&apos;ll <span className="text-green-600">Learn</span></h2>
                  </div>
                  {/* 4 圖示（下拉、放大、貼近底色條） */}
                  {/* 人物（去背，下緣裁在背景原色條上緣＝藏在按鈕後） */}
                  {STEPS.map(s => (
                    <div key={s.img} className="absolute flex items-end justify-center overflow-hidden" style={{ left: `${s.cx}%`, top: '25%', width: '15%', height: '35.4%', transform: 'translateX(-50%)', zIndex: 1 }}>
                      <img src={`/images/guide/${s.img}.webp`} alt={s.en} className="max-w-[92%] object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.25)]" style={{ height: '112%', transform: `translateY(${s.dy}) scale(${s.sc})`, transformOrigin: 'bottom center' }} />
                    </div>
                  ))}
                  {/* 標籤（背景原本的色條上） */}
                  {STEPS.map(s => (
                    <div key={`l-${s.img}`} className="absolute text-center leading-tight" style={{ left: `${s.cx}%`, top: '62.5%', width: '18%', transform: 'translateX(-50%)', zIndex: 10 }}>
                      <p className="text-white font-black" style={{ fontSize: 'clamp(11px,1.5vw,20px)', textShadow: '0 1px 2px rgba(0,0,0,.28)' }}>{s.en}</p>
                      <p className="text-white/95 font-bold" style={{ fontSize: 'clamp(9px,1.1vw,14px)' }}>{s.zh}</p>
                    </div>
                  ))}
                  {/* Speak 卡：白色 Hello 對話框（女孩右上） */}
                  <div className="absolute" style={{ left: '64.5%', top: '26%', transform: 'translate(-50%,-50%)', zIndex: 12 }}>
                    <div className="relative bg-white rounded-xl shadow-md border border-gray-200 px-2.5 py-1">
                      <span className="font-black text-sky-500 leading-none" style={{ fontSize: 'clamp(11px,1.4vw,20px)' }}>Hello!</span>
                      <span className="absolute left-2.5 -bottom-1 w-2.5 h-2.5 bg-white border-b border-r border-gray-200" style={{ transform: 'rotate(45deg)' }} />
                    </div>
                  </div>
                  {/* 底部副標 */}
                  <p className="absolute left-1/2 -translate-x-1/2 text-center font-black text-white whitespace-nowrap" style={{ bottom: '5%', fontSize: 'clamp(11px,1.6vw,22px)', WebkitTextStroke: '3px #6b3e12', paintOrder: 'stroke fill' }}>
                    每個關卡<span className="text-yellow-300">多元好玩</span>！
                  </p>
                  {/* 右下 Miss Vega 講話 + 泡泡（泡泡在 Vega 左下、較小不擋人） */}
                  <div className="absolute flex items-end justify-center" style={{ right: '0.5%', bottom: '1%', width: '11%', height: '27%' }}><img src="/characters/vega/vega-talk.png" alt="Vega" className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]" /></div>
                  <div className="absolute" style={{ right: '9%', bottom: '10%', width: '8.5%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation1.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[13%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>一起來<br />闖關吧！</p>
                    </div>
                  </div>
                </>
              )}

              {/* slide 3：認識夥伴（動物疊進框 + Vega 講話） */}
              {idx === 2 && (
                <>
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" style={{ top: '4%' }}>
                    <span className="inline-flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-500 text-white font-black items-center justify-center" style={{ fontSize: 'clamp(14px,1.8vw,24px)' }}>3</span>
                    <h2 className="font-black text-amber-900" style={{ fontSize: 'clamp(18px,2.7vw,40px)', textShadow: '0 1px 3px rgba(255,255,255,.6)' }}>Meet Your <span className="text-pink-500">Friends</span></h2>
                  </div>
                  {FRIENDS.map(f => (
                    <div key={f.key} className="absolute flex items-end justify-center" style={{ left: `${f.cx}%`, top: '20%', width: '13%', height: '44%', transform: 'translateX(-50%)', zIndex: 1 }}>
                      <img src={`/characters/${f.key}/${f.key}-wave.png`} alt={f.name}
                        className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.3)]"
                        style={{ transform: `scale(${f.sc})`, transformOrigin: 'bottom center' }} />
                      {/* 🔊 Vega 中文介紹 → 角色英文自介 */}
                      <CharacterPlayButton characterKey={f.key}
                        className="absolute z-20 px-1.5 py-0.5" style={{ right: '-4%', top: '-2%' }} />
                    </div>
                  ))}
                  {/* 名字 + 特質（框底色條上） */}
                  {FRIENDS.map(f => (
                    <div key={`t-${f.key}`} className="absolute text-center" style={{ left: `${f.cx}%`, top: '65%', width: '16%', transform: 'translateX(-50%)', zIndex: 10 }}>
                      <span className={`${f.pill} inline-block text-white font-black px-3 py-0.5 rounded-full border-2 border-white shadow-md`} style={{ fontSize: 'clamp(9px,1.25vw,18px)' }}>⭐ {f.name}</span>
                      <p className="text-white font-black mt-1 leading-tight" style={{ fontSize: 'clamp(7px,0.95vw,13px)', WebkitTextStroke: '1.5px #5a3410', paintOrder: 'stroke fill' }}>{f.en}</p>
                    </div>
                  ))}
                  {/* Vega 講話（右下角，較小） */}
                  <img src="/characters/vega/vega-talk.png" alt="Vega"
                    className="absolute object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]"
                    style={{ right: '1%', bottom: '1%', width: '7.5%' }} />
                  {/* 對話泡泡（Vega 正上方 far-right，不進 Ruby 框） */}
                  <div className="absolute" style={{ right: '9%', bottom: '3%', width: '8.5%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-pink-500 px-[15%] pb-[8%]" style={{ fontSize: 'clamp(9px,1.1vw,15px)' }}>
                        跟夥伴<br />說 Hi 吧！
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* slide 4：Collect Rewards（4 獎勵橫排） */}
              {idx === 3 && (
                <>
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ top: '6%' }}>
                    <span className="inline-flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-white font-black items-center justify-center" style={{ fontSize: 'clamp(14px,1.8vw,24px)' }}>4</span>
                    <h2 className="font-black text-amber-900" style={{ fontSize: 'clamp(18px,2.7vw,40px)', textShadow: '0 1px 3px rgba(255,255,255,.5)' }}>Collect <span className="text-orange-500">Rewards</span></h2>
                  </div>
                  {REWARDS.map(r => (
                    <div key={r.img} className="absolute flex items-center justify-center rounded-2xl" style={{ left: `${r.cx}%`, top: '30%', width: '13%', height: '27%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.38)', border: '3px solid rgba(255,255,255,0.85)', boxShadow: '0 6px 16px rgba(60,40,90,0.22)', backdropFilter: 'blur(2px)' }}>
                      <img src={`/images/guide/${r.img}.webp`} alt={r.en} className="max-w-[80%] max-h-[85%] object-contain drop-shadow-[0_4px_6px_rgba(60,40,90,0.3)]" />
                    </div>
                  ))}
                  {['37.5', '50.5', '63.5'].map(x => (
                    <span key={x} className="absolute text-green-600 font-black" style={{ left: `${x}%`, top: '40%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(14px,2vw,30px)' }}>➜</span>
                  ))}
                  {REWARDS.map(r => (
                    <div key={`l-${r.img}`} className="absolute text-center leading-tight" style={{ left: `${r.cx}%`, top: '60%', width: '15%', transform: 'translateX(-50%)' }}>
                      <span className={`${r.pill} inline-block text-white font-black px-3 py-0.5 rounded-full shadow`} style={{ fontSize: 'clamp(9px,1.2vw,16px)' }}>{r.en}</span>
                      <p className="text-white font-black mt-0.5" style={{ fontSize: 'clamp(9px,1.1vw,14px)', WebkitTextStroke: '1.8px #5a3410', paintOrder: 'stroke fill' }}>{r.zh}</p>
                    </div>
                  ))}
                  <p className="absolute left-1/2 -translate-x-1/2 text-center font-black text-white whitespace-nowrap" style={{ bottom: '6%', fontSize: 'clamp(11px,1.6vw,22px)', WebkitTextStroke: '3px #6b3e12', paintOrder: 'stroke fill' }}>
                    冒險成功，有機會變成<span className="text-yellow-300">小冠軍</span> 🏆
                  </p>
                  {/* 右下 Miss Vega 講話 */}
                  <div className="absolute flex items-end justify-center" style={{ right: '0.5%', bottom: '1%', width: '11%', height: '27%' }}><img src="/characters/vega/vega-talk.png" alt="Vega" className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]" /></div>
                  <div className="absolute" style={{ right: '9%', bottom: '10%', width: '8.5%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation1.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[13%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>哇～闖關過<br />還有禮物！</p>
                    </div>
                  </div>
                </>
              )}

              {/* slide 5：Ready?（火箭噴火焰 + 3 2 1 GO! + Vega） */}
              {idx === 4 && (
                <>
                  {/* 標題 */}
                  <div className="absolute flex items-center gap-2" style={{ left: '4%', top: '7%' }}>
                    <span className="inline-flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white font-black items-center justify-center" style={{ fontSize: 'clamp(14px,1.8vw,24px)' }}>5</span>
                    <h2 className="font-black text-blue-500" style={{ fontSize: 'clamp(20px,3vw,44px)', WebkitTextStroke: '3px #fff', paintOrder: 'stroke fill', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.25))' }}>Ready?</h2>
                  </div>
                  {/* 火箭（圖已含真火焰＋尾巴） */}
                  <img src="/images/guide/guide5-ship.webp" alt="" className="absolute animate-float drop-shadow-[0_10px_18px_rgba(40,30,80,0.35)]" style={{ left: '1%', top: '27%', width: '48%' }} />
                  {/* 星芒噴發（旋轉動畫，在數字後方） */}
                  <div className="absolute" style={{ left: '62%', top: '31%', width: '30%', aspectRatio: '1', transform: 'translate(-50%,-50%)', zIndex: 1 }}>
                    <div className="ae-rays w-full h-full" style={{ borderRadius: '50%', background: 'repeating-conic-gradient(rgba(255,222,85,.7) 0deg 4deg, transparent 4deg 24deg)', WebkitMaskImage: 'radial-gradient(circle, #000 12%, transparent 56%)', maskImage: 'radial-gradient(circle, #000 12%, transparent 56%)' }} />
                  </div>
                  {/* 3 2 1 GO!（弧形排列、大間距、脈動動畫） */}
                  <div className="absolute ae-count" style={{ left: '60%', top: '12%', width: '18%', height: '62%', transform: 'translateX(-50%)', zIndex: 2 }}>
                    <div className="absolute font-black text-red-500"    style={{ left: '38%', top: '0%',  transform: 'rotate(-10deg)', fontSize: 'clamp(24px,3.8vw,58px)', WebkitTextStroke: '2.5px #fff', paintOrder: 'stroke fill', filter: 'drop-shadow(0 3px 3px rgba(0,0,0,.25))' }}>3</div>
                    <div className="absolute font-black text-orange-500" style={{ left: '58%', top: '25%', transform: 'rotate(-4deg)',  fontSize: 'clamp(24px,3.8vw,58px)', WebkitTextStroke: '2.5px #fff', paintOrder: 'stroke fill', filter: 'drop-shadow(0 3px 3px rgba(0,0,0,.25))' }}>2</div>
                    <div className="absolute font-black text-amber-400"  style={{ left: '66%', top: '50%', transform: 'rotate(4deg)',   fontSize: 'clamp(24px,3.8vw,58px)', WebkitTextStroke: '2.5px #fff', paintOrder: 'stroke fill', filter: 'drop-shadow(0 3px 3px rgba(0,0,0,.25))' }}>1</div>
                    <div className="absolute font-black text-blue-600"   style={{ left: '8%',  top: '72%', transform: 'rotate(-6deg)',  fontSize: 'clamp(30px,5vw,80px)',  WebkitTextStroke: '3px #fff', paintOrder: 'stroke fill', filter: 'drop-shadow(0 4px 4px rgba(0,0,0,.3))' }}>GO!</div>
                  </div>
                  {/* Miss Vega 右下 + 泡泡 */}
                  <div className="absolute flex items-end justify-center" style={{ right: '0.5%', bottom: '1%', width: '11%', height: '27%' }}><img src="/characters/vega/vega-talk.png" alt="Vega" className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]" /></div>
                  <div className="absolute" style={{ right: '9%', bottom: '10%', width: '8.5%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation1.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[12%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>準備好<br />出發囉！</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 頂部圓點 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HEIGHTS.map((_, idx) => (
          <button key={idx} onClick={() => go(idx)} aria-label={`第 ${idx + 1} 頁`}
            className={`h-2.5 rounded-full transition-all ${idx === i ? 'w-7 bg-purple-500' : 'w-2.5 bg-white/80 hover:bg-white'}`} />
        ))}
      </div>

      <Link href="/choose-character" onClick={() => { playClick(); markSeen(); }}
        className="absolute top-3 right-4 z-20 no-underline bg-white/85 text-purple-600 text-xs font-black px-3 py-1.5 rounded-full shadow hover:bg-white">
        略過 ›
      </Link>

      {i > 0 && (
        <button onClick={() => go(i - 1)} aria-label="上一頁"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 text-purple-600 text-2xl shadow-lg flex items-center justify-center hover:bg-white active:scale-95">‹</button>
      )}
      {i < N - 1 ? (
        <button onClick={() => go(i + 1)} aria-label="下一頁"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 text-purple-600 text-2xl shadow-lg flex items-center justify-center hover:bg-white active:scale-95">›</button>
      ) : (
        <button onClick={finish}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-10 sm:px-12 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-lg sm:text-xl shadow-xl hover:from-amber-500 active:scale-95">
          開始冒險 →
        </button>
      )}
    </div>
  );
}

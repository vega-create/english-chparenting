'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { playClick, playStar } from '@/lib/sfx';

// 每張 guide 背景（1600 寬）的高度 → 算 aspect，讓疊層對齊圖
const HEIGHTS = [893, 735, 617, 616, 602];
const N = HEIGHTS.length;

// slide 3「認識夥伴」：5 隻動物依序放進 紫/藍/粉/綠/黃 框
const FRIENDS = [
  { key: 'finn',  name: 'Finn',  trait: '勇敢探險隊長', cx: 16.3, sc: 1 },
  { key: 'coco',  name: 'Coco',  trait: '聽力小高手',   cx: 32.9, sc: 0.86 },
  { key: 'polly', name: 'Polly', trait: '口說小達人',   cx: 49.5, sc: 1 },
  { key: 'benny', name: 'Benny', trait: '閱讀小博士',   cx: 66.2, sc: 1 },
  { key: 'ruby',  name: 'Ruby',  trait: '寫作小天才',   cx: 82.9, sc: 1 },
];

// slide 2「How You'll Learn」：4 個學習步驟圖示進框
const STEPS = [
  { img: 'intro-book',     en: 'Read Story', zh: '讀故事', cx: 18.7, sc: 1.32 },
  { img: 'intro-listen',   en: 'Listen',     zh: '聽力',   cx: 39.5, sc: 1 },
  { img: 'intro-speak',    en: 'Speak',      zh: '口說',   cx: 59.5, sc: 1 },
  { img: 'intro-playgame', en: 'Play Game',  zh: '玩遊戲', cx: 79.7, sc: 1 },
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
  { slug: 'elly', pose: '-happy', cx: 30 },
  { slug: 'sky',  pose: '',       cx: 41 },
  { slug: 'coco', pose: '',       cx: 52 },
  { slug: 'leo',  pose: '',       cx: 63 },
  { slug: 'vera', pose: '-happy', cx: 74 },
];

export default function GuideSlides() {
  const [i, setI] = useState(0);
  const router = useRouter();
  const touchX = useRef<number | null>(null);

  // 重整後留在同一頁（sessionStorage）
  useEffect(() => {
    const s = sessionStorage.getItem('ae_guide_slide');
    if (s !== null) setI(Math.min(N - 1, Number(s)));
  }, []);
  useEffect(() => {
    sessionStorage.setItem('ae_guide_slide', String(i));
  }, [i]);

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

      {HEIGHTS.map((h, idx) => (
        <div key={idx} className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? 'auto' : 'none' }}>
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
                  <div className="absolute" style={{ left: '4%', top: '13%', width: '33%' }}>
                    <span className="inline-flex w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-purple-500 text-white font-black items-center justify-center mb-1" style={{ fontSize: 'clamp(13px,1.6vw,22px)' }}>1</span>
                    <h2 className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(20px,3.2vw,46px)' }}>Welcome,<br /><span className="text-purple-600">Explorer!</span></h2>
                    <p className="font-bold text-amber-800 mt-1.5 mb-2 sm:mb-3" style={{ fontSize: 'clamp(10px,1.4vw,18px)' }}>今天就出發，展開你的英語大冒險！</p>
                    <button onClick={() => go(i + 1)} className="rounded-full bg-gradient-to-b from-amber-400 to-orange-500 text-white font-black shadow-lg active:scale-95 hover:from-amber-500" style={{ fontSize: 'clamp(13px,1.8vw,24px)', padding: '0.4em 1.4em' }}>Start ▶</button>
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
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[13%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>歡迎來到<br />我們的學校！</p>
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
                  {STEPS.map(s => (
                    <div key={s.img} className="absolute flex items-end justify-center" style={{ left: `${s.cx}%`, top: '28%', width: '16%', height: '34%', transform: 'translateX(-50%)' }}>
                      <img src={`/images/guide/${s.img}.webp`} alt={s.en} className="max-w-[92%] max-h-full object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.25)]" style={{ transform: `scale(${s.sc})`, transformOrigin: 'bottom center' }} />
                    </div>
                  ))}
                  {/* 標籤 */}
                  {STEPS.map(s => (
                    <div key={`l-${s.img}`} className="absolute text-center leading-tight" style={{ left: `${s.cx}%`, top: '62.5%', width: '18%', transform: 'translateX(-50%)' }}>
                      <p className="text-white font-black" style={{ fontSize: 'clamp(11px,1.5vw,20px)', textShadow: '0 1px 2px rgba(0,0,0,.28)' }}>{s.en}</p>
                      <p className="text-white/95 font-bold" style={{ fontSize: 'clamp(9px,1.1vw,14px)' }}>{s.zh}</p>
                    </div>
                  ))}
                  {/* 底部副標 */}
                  <p className="absolute left-1/2 -translate-x-1/2 text-center font-bold text-amber-900" style={{ bottom: '5%', fontSize: 'clamp(10px,1.5vw,20px)', textShadow: '0 1px 2px rgba(255,255,255,.5)' }}>
                    每堂課只要 <span className="text-orange-500">5–10 分鐘</span>，學習超好玩！
                  </p>
                  {/* 右下 Miss Vega 講話 + 泡泡（移到紫框下方） */}
                  <img src="/characters/vega/vega-talk.png" alt="Vega" className="absolute object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]" style={{ right: '1%', bottom: '2%', width: '8.5%' }} />
                  <div className="absolute" style={{ right: '1.5%', bottom: '17%', width: '12%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation1.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[13%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>一起來<br />學習吧！</p>
                    </div>
                  </div>
                </>
              )}

              {/* slide 3：認識夥伴（動物疊進框 + Vega 講話） */}
              {idx === 2 && (
                <>
                  {FRIENDS.map(f => (
                    <div key={f.key} className="absolute flex items-end justify-center" style={{ left: `${f.cx}%`, top: '20%', width: '13%', height: '44%', transform: 'translateX(-50%)' }}>
                      <img src={`/characters/${f.key}/${f.key}-wave.png`} alt={f.name}
                        className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.3)]"
                        style={{ transform: `scale(${f.sc})`, transformOrigin: 'bottom center' }} />
                    </div>
                  ))}
                  {/* 名字 + 特質（框底色條上） */}
                  {FRIENDS.map(f => (
                    <div key={`t-${f.key}`} className="absolute text-center leading-tight" style={{ left: `${f.cx}%`, top: '68%', width: '15%', transform: 'translateX(-50%)' }}>
                      <p className="text-white font-black" style={{ fontSize: 'clamp(12px,1.5vw,20px)', textShadow: '0 1px 2px rgba(80,50,20,.35)' }}>{f.name}</p>
                      <p className="text-white/95 font-bold" style={{ fontSize: 'clamp(9px,1.1vw,14px)' }}>{f.trait}</p>
                    </div>
                  ))}
                  {/* Vega 講話（右下角） */}
                  <img src="/characters/vega/vega-talk.png" alt="Vega"
                    className="absolute object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]"
                    style={{ right: '1%', bottom: '1%', width: '8.5%' }} />
                  {/* 對話泡泡（黃框下方、Vega 上方，較小） */}
                  <div className="absolute" style={{ right: '1%', bottom: '19%', width: '11%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-pink-500 px-[15%] pb-[8%]" style={{ fontSize: 'clamp(9px,1.1vw,15px)' }}>
                        我們都是你的<br />好夥伴！
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
                    <div key={r.img} className="absolute flex items-end justify-center" style={{ left: `${r.cx}%`, top: '32%', width: '13%', height: '24%', transform: 'translateX(-50%)' }}>
                      <img src={`/images/guide/${r.img}.webp`} alt={r.en} className="max-w-full max-h-full object-contain drop-shadow-[0_5px_8px_rgba(60,40,90,0.35)]" />
                    </div>
                  ))}
                  {['37.5', '50.5', '63.5'].map(x => (
                    <span key={x} className="absolute text-green-600 font-black" style={{ left: `${x}%`, top: '40%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(14px,2vw,30px)' }}>➜</span>
                  ))}
                  {REWARDS.map(r => (
                    <div key={`l-${r.img}`} className="absolute text-center leading-tight" style={{ left: `${r.cx}%`, top: '60%', width: '15%', transform: 'translateX(-50%)' }}>
                      <span className={`${r.pill} inline-block text-white font-black px-3 py-0.5 rounded-full shadow`} style={{ fontSize: 'clamp(9px,1.2vw,16px)' }}>{r.en}</span>
                      <p className="text-amber-900 font-bold mt-0.5" style={{ fontSize: 'clamp(9px,1.1vw,14px)', textShadow: '0 1px 2px rgba(255,255,255,.6)' }}>{r.zh}</p>
                    </div>
                  ))}
                  <p className="absolute left-1/2 -translate-x-1/2 text-center font-bold text-amber-900" style={{ bottom: '6%', fontSize: 'clamp(10px,1.5vw,20px)', textShadow: '0 1px 2px rgba(255,255,255,.6)' }}>
                    完成課程、收集獎勵，成為<span className="text-orange-500">小冠軍</span> 🏆
                  </p>
                </>
              )}

              {/* slide 5：太空船飛過 */}
              {idx === 4 && (
                <img src="/images/guide/guide5-ship.webp" alt=""
                  className="absolute animate-float drop-shadow-[0_10px_18px_rgba(40,30,80,0.35)]"
                  style={{ left: '5%', top: '24%', width: '40%' }} />
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

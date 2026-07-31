'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { playClick, playStar } from '@/lib/sfx';

// 每張 guide 背景（1600 寬）的高度 → 算 aspect，讓疊層對齊圖
const HEIGHTS = [893, 735, 617, 616, 602];
const N = HEIGHTS.length;

// slide 3「認識夥伴」：5 隻動物依序放進 紫/藍/粉/綠/黃 框
const FRIENDS = [
  { key: 'finn',  name: 'Finn',  trait: '勇敢探險隊長', cx: 16.6 },
  { key: 'coco',  name: 'Coco',  trait: '聽力小高手',   cx: 32.5 },
  { key: 'polly', name: 'Polly', trait: '口說小達人',   cx: 48.3 },
  { key: 'benny', name: 'Benny', trait: '閱讀小博士',   cx: 64.0 },
  { key: 'ruby',  name: 'Ruby',  trait: '寫作小天才',   cx: 79.9 },
];

// slide 1「Welcome」：中間站 5 個玩家角色（人類）
const PLAYERS = ['elly', 'sky', 'coco', 'leo', 'vera'];
const PLAYER_CX = [37, 44.5, 52, 59.5, 67];

export default function GuideSlides() {
  const [i, setI] = useState(0);
  const router = useRouter();
  const touchX = useRef<number | null>(null);

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
                  {PLAYERS.map((p, k) => (
                    <img key={p} src={`/images/avatars/${p}.webp`} alt=""
                      className="absolute object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.3)]"
                      style={{ left: `${PLAYER_CX[k]}%`, bottom: '5%', width: '8.5%', transform: 'translateX(-50%)' }} />
                  ))}
                  <div className="absolute" style={{ right: '2%', bottom: '4%', width: '13%' }}>
                    <div className="absolute" style={{ right: '52%', bottom: '58%', width: '175%' }}>
                      <div className="relative">
                        <img src="/images/guide/intro-conversation1.webp" alt="" className="w-full" />
                        <p className="absolute inset-0 flex items-center justify-center text-center font-black text-amber-800 px-[14%] pb-[8%]" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>歡迎來到<br />我們的學校！</p>
                      </div>
                    </div>
                    <img src="/images/avatars/vera.webp" alt="Vega" className="w-full object-contain object-bottom drop-shadow-[0_6px_8px_rgba(60,40,90,0.35)]" />
                  </div>
                </>
              )}

              {/* slide 3：認識夥伴（動物疊進框 + Vega 講話） */}
              {idx === 2 && (
                <>
                  {FRIENDS.map(f => (
                    <div key={f.key} className="absolute flex flex-col items-center" style={{ left: `${f.cx}%`, top: '22%', width: '14%', transform: 'translateX(-50%)' }}>
                      <img src={`/characters/${f.key}/${f.key}-wave.png`} alt={f.name}
                        className="w-[92%] object-contain object-bottom drop-shadow-[0_5px_6px_rgba(60,40,90,0.3)]" style={{ height: '30vh', maxHeight: '210px' }} />
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
                    style={{ right: '0.5%', bottom: '0%', width: '12%' }} />
                  {/* 對話泡泡（右上，不擋 Ruby） */}
                  <div className="absolute" style={{ right: '1%', bottom: '46%', width: '19%' }}>
                    <div className="relative">
                      <img src="/images/guide/intro-conversation.webp" alt="" className="w-full" />
                      <p className="absolute inset-0 flex items-center justify-center text-center font-black text-pink-500 px-[15%] pb-[8%]" style={{ fontSize: 'clamp(9px,1.1vw,15px)' }}>
                        我們都是你的<br />好夥伴！
                      </p>
                    </div>
                  </div>
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

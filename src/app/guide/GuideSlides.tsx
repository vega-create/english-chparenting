'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { playClick, playStar } from '@/lib/sfx';

const N = 5; // guide1..guide5

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
  function finish() { playStar(); router.push('/choose-character'); }

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-sky-200"
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* 5 張背景（淡入淡出切換） */}
      {Array.from({ length: N }, (_, idx) => (
        <div key={idx} className="absolute inset-0 transition-opacity duration-500 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/guide/guide${idx + 1}.webp)`,
            opacity: idx === i ? 1 : 0,
            pointerEvents: idx === i ? 'auto' : 'none',
          }}>
          {/* slide 5：太空船疊在左邊天空飛 */}
          {idx === 4 && (
            <img src="/images/guide/guide5-ship.webp" alt=""
              className="absolute animate-float drop-shadow-[0_10px_18px_rgba(40,30,80,0.35)]"
              style={{ left: '4%', top: '26%', width: '46%', maxWidth: '640px' }} />
          )}
        </div>
      ))}

      {/* 頂部圓點 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: N }, (_, idx) => (
          <button key={idx} onClick={() => go(idx)} aria-label={`第 ${idx + 1} 頁`}
            className={`h-2.5 rounded-full transition-all ${idx === i ? 'w-7 bg-purple-500' : 'w-2.5 bg-white/80 hover:bg-white'}`} />
        ))}
      </div>

      {/* 略過 */}
      <Link href="/choose-character" onClick={() => playClick()}
        className="absolute top-3 right-4 z-20 no-underline bg-white/85 text-purple-600 text-xs font-black px-3 py-1.5 rounded-full shadow hover:bg-white">
        略過 ›
      </Link>

      {/* 左右箭頭 */}
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

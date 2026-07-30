'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { playClick, playStar } from '@/lib/sfx';

// 玩家可挑選的冒險角色（人物圖 Vega 陸續生成，放 /images/avatars/<slug>.webp）
const AVATARS = [
  { slug: 'elly', zh: '艾莉', role: '熱愛探索的大冒險家', traits: '勇敢、好奇、充滿活力', pill: 'bg-indigo-500', glow: 'from-teal-200 to-emerald-100' },
  { slug: 'sky',  zh: '小飛', role: '機智勇敢的探險家', traits: '聰明、勇敢、愛挑戰', pill: 'bg-blue-500', glow: 'from-sky-200 to-blue-100' },
  { slug: 'coco', zh: '可可', role: '聰明可愛的小學者', traits: '喜愛學習、細心又善良', pill: 'bg-rose-500', glow: 'from-pink-200 to-rose-100' },
  { slug: 'leo',  zh: '雷歐', role: '沉著冷靜的觀察家', traits: '冷靜、可靠、愛自然', pill: 'bg-green-600', glow: 'from-lime-200 to-green-100' },
  { slug: 'vera', zh: '薇拉', role: '創意滿滿的藝術家', traits: '想像力豐富、愛創作', pill: 'bg-purple-500', glow: 'from-purple-200 to-fuchsia-100' },
];

// 有去背人物圖就用圖，沒有先用柔和剪影佔位
function AvatarImg({ slug, zh }: { slug: string; zh: string }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={`/images/avatars/${slug}.webp`}
      alt={zh}
      onError={() => setOk(false)}
      className="w-full h-full object-contain object-bottom drop-shadow-[0_8px_10px_rgba(80,60,120,0.25)]"
    />
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-end gap-2 text-purple-300">
      <span className="text-6xl">🧭</span>
      <span className="text-xs font-bold text-purple-300/80">人物即將登場</span>
    </div>
  );
}

export default function ChooseCharacterPage() {
  const router = useRouter();
  const [sel, setSel] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    playClick();
    rowRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  }

  function confirm() {
    if (!sel) return;
    playStar();
    try { localStorage.setItem('ae_avatar', sel); } catch {}
    router.push('/adventure-map');
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url(/images/choose-bg.webp)' }}
    >
      <div className="absolute inset-0 bg-white/10" />

      {/* Logo */}
      <img src="/images/logo-260530.webp" alt="Adventure English" className="absolute top-4 left-4 w-32 sm:w-44 z-20 drop-shadow" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-3 py-6 sm:py-8">
        {/* 標題緞帶 */}
        <div className="mt-14 sm:mt-4 text-center">
          <h1 className="inline-block bg-amber-50/90 text-amber-900 text-2xl sm:text-4xl font-black px-8 sm:px-14 py-2.5 sm:py-3 rounded-full shadow-lg border-2 border-amber-200"
            style={{ textShadow: '0 1px 0 #fff' }}>
            選擇你的冒險夥伴
          </h1>
          <p className="mt-3 text-white font-bold text-sm sm:text-base" style={{ textShadow: '0 1px 4px rgba(60,40,90,.7)' }}>
            ⭐ 選擇一位角色，和你一起開啟英語冒險之旅！⭐
          </p>
        </div>

        {/* 角色列（手機可左右滑，桌機箭頭捲動） */}
        <div className="relative w-full max-w-5xl flex-1 flex items-center mt-4">
          <button onClick={() => scroll(-1)} aria-label="上一個"
            className="hidden sm:flex absolute left-0 z-20 w-11 h-11 items-center justify-center rounded-full bg-purple-500/90 text-white text-xl shadow-lg hover:bg-purple-600 active:scale-95">‹</button>

          <div ref={rowRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory px-1 sm:px-12 py-2 w-full scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}>
            {AVATARS.map(a => {
              const active = sel === a.slug;
              return (
                <button
                  key={a.slug}
                  onClick={() => { playClick(); setSel(a.slug); }}
                  className={`snap-center shrink-0 w-40 sm:w-44 rounded-3xl p-3 text-center transition-all border-2 ${
                    active
                      ? 'bg-amber-50/95 border-amber-300 scale-[1.04] shadow-2xl ring-4 ring-amber-200'
                      : 'bg-white/75 border-white/60 hover:bg-white/90 shadow-lg'
                  }`}
                >
                  {active && <div className="text-2xl -mt-1 -mb-1">⭐</div>}
                  <div className={`relative h-52 sm:h-56 rounded-2xl bg-gradient-to-b ${a.glow} overflow-hidden flex items-end justify-center`}>
                    <AvatarImg slug={a.slug} zh={a.zh} />
                  </div>
                  <div className={`inline-block mt-2 ${a.pill} text-white font-black text-lg px-6 py-1 rounded-full shadow`}>{a.zh}</div>
                  <p className="mt-1.5 text-[13px] font-bold text-gray-700 leading-tight">{a.role}</p>
                  <p className="text-[11px] text-gray-500 leading-tight">{a.traits}</p>
                </button>
              );
            })}
          </div>

          <button onClick={() => scroll(1)} aria-label="下一個"
            className="hidden sm:flex absolute right-0 z-20 w-11 h-11 items-center justify-center rounded-full bg-purple-500/90 text-white text-xl shadow-lg hover:bg-purple-600 active:scale-95">›</button>
        </div>

        {/* 確認 / 稍後 */}
        <div className="text-center mb-2">
          <button
            onClick={confirm}
            disabled={!sel}
            className={`px-12 sm:px-16 py-3.5 rounded-full font-black text-xl text-white shadow-xl transition-all active:scale-95 ${
              sel ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' : 'bg-gray-400/70 cursor-not-allowed'
            }`}
          >
            確認選擇 ⭐
          </button>
          <div className="mt-3">
            <Link href="/adventure-map" onClick={() => playClick()} className="no-underline text-white/90 text-sm font-bold hover:text-white" style={{ textShadow: '0 1px 3px rgba(60,40,90,.7)' }}>
              🔒 稍後再選擇
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

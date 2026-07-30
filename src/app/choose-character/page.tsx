'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { playClick, playStar } from '@/lib/sfx';

// 底圖已畫好 5 個玻璃卡框，內容用 % 疊進框裡（框中心 cx、上緣 34.2%、高 43.9%、寬 14%）
const AVATARS = [
  { slug: 'elly', zh: '艾莉', role: '熱愛探索的大冒險家', traits: '勇敢、好奇、充滿活力', pill: 'bg-indigo-500', cx: 15.5 },
  { slug: 'sky',  zh: '小飛', role: '機智勇敢的探險家', traits: '聰明、勇敢、愛挑戰', pill: 'bg-blue-500', cx: 33 },
  { slug: 'coco', zh: '可可', role: '聰明可愛的小學者', traits: '喜愛學習、細心又善良', pill: 'bg-rose-500', cx: 50.8 },
  { slug: 'leo',  zh: '雷歐', role: '沉著冷靜的觀察家', traits: '冷靜、可靠、愛自然', pill: 'bg-green-600', cx: 67.5 },
  { slug: 'vera', zh: '薇拉', role: '創意滿滿的藝術家', traits: '想像力豐富、愛創作', pill: 'bg-purple-500', cx: 84.2 },
];
const FRAME = { top: 34.2, height: 43.9 };
const CARD_H = FRAME.height + 18; // 卡片(可點區)高＝框高+下方文字區

function AvatarImg({ slug, zh }: { slug: string; zh: string }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img src={`/images/avatars/${slug}.webp`} alt={zh} onError={() => setOk(false)}
      className="w-full h-full object-contain object-bottom drop-shadow-[0_6px_8px_rgba(80,60,120,0.28)]" />
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-purple-300/70">
      <span className="text-4xl sm:text-6xl">🧭</span>
      <span className="text-[9px] sm:text-xs font-bold">人物即將登場</span>
    </div>
  );
}

export default function ChooseCharacterPage() {
  const router = useRouter();
  const [sel, setSel] = useState<string | null>(null);

  function confirm() {
    if (!sel) return;
    playStar();
    try { localStorage.setItem('ae_avatar', sel); } catch {}
    router.push('/adventure-map');
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-center"
      style={{ backgroundImage: 'url(/images/choose-bg.webp)', backgroundSize: '100% 100%' }}>

        <img src="/images/logo-260530.webp" alt="Adventure English" className="absolute top-[2%] left-[2%] w-[16%] max-w-[150px] z-20"
          style={{ filter: 'drop-shadow(1.5px 0 0 #fff) drop-shadow(-1.5px 0 0 #fff) drop-shadow(0 1.5px 0 #fff) drop-shadow(0 -1.5px 0 #fff) drop-shadow(0 0 4px rgba(255,255,255,.9))' }} />

        {/* 標題緞帶 */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center z-20" style={{ top: '5%', width: '80%' }}>
          <h1 className="inline-block bg-amber-50/90 text-amber-900 text-lg sm:text-3xl font-black px-6 sm:px-12 py-1.5 sm:py-2.5 rounded-full shadow-lg border-2 border-amber-200" style={{ textShadow: '0 1px 0 #fff' }}>
            選你自己的角色
          </h1>
          <p className="mt-1.5 text-white font-bold text-[11px] sm:text-base" style={{ textShadow: '0 1px 4px rgba(60,40,90,.7)' }}>
            ⭐ 選一位角色，一起開啟英語冒險！⭐
          </p>
        </div>

        {/* 5 個角色（疊進框內） */}
        {AVATARS.map(a => {
          const active = sel === a.slug;
          return (
            <button key={a.slug} onClick={() => { playClick(); setSel(a.slug); }}
              className="absolute z-10"
              style={{ left: `${a.cx}%`, top: `${FRAME.top}%`, width: '14.5%', height: `${CARD_H}%`, transform: 'translateX(-50%)' }}>
              {/* 選中：星星（無黃框） */}
              {active && <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-3xl z-10 drop-shadow">⭐</div>}
              {/* 人物：靠下站在框底、整組下移 */}
              <div className="absolute flex items-end justify-center" style={{ left: '4%', right: '4%', top: '10%', bottom: '32%' }}>
                <AvatarImg slug={a.slug} zh={a.zh} />
              </div>
              {/* 名字 + 介紹（下移，靠近腳邊） */}
              <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ bottom: '6%', width: '150%' }}>
                <div className={`${a.pill} inline-block text-white font-black text-base sm:text-2xl px-5 sm:px-8 py-1 sm:py-1.5 rounded-full shadow ${active ? 'ring-2 ring-white' : ''}`}>{a.zh}</div>
                <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[15px] font-bold text-gray-700 leading-tight">{a.role}</p>
                <p className="text-[10px] sm:text-[13px] text-gray-500 leading-tight">{a.traits}</p>
              </div>
            </button>
          );
        })}

        {/* 確認 / 稍後（疊在下方步道上） */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center z-20" style={{ bottom: '2.5%' }}>
          <button onClick={confirm} disabled={!sel}
            className={`px-12 sm:px-16 py-2.5 sm:py-3 rounded-full font-black text-base sm:text-xl text-white shadow-xl transition-all active:scale-95 ${
              sel ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' : 'bg-gray-400/70 cursor-not-allowed'
            }`}>
            確認選擇 ⭐
          </button>
          <div className="mt-1.5">
            <Link href="/adventure-map" onClick={() => playClick()} className="no-underline text-white/90 text-xs sm:text-sm font-bold hover:text-white" style={{ textShadow: '0 1px 3px rgba(60,40,90,.7)' }}>
              🔒 稍後再選擇
            </Link>
          </div>
        </div>
    </div>
  );
}

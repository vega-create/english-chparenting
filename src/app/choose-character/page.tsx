'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { playClick, playStar } from '@/lib/sfx';

// 底圖已畫好 5 個玻璃卡框，內容用 % 疊進框裡（框中心 cx、上緣 34.2%、高 43.9%、寬 14%）
const AVATARS = [
  { slug: 'elly', zh: '艾莉', role: '熱愛探索的大冒險家', traits: '勇敢、好奇、充滿活力', pill: 'bg-indigo-500', cx: 15.6 },
  { slug: 'sky',  zh: '小飛', role: '機智勇敢的探險家', traits: '聰明、勇敢、愛挑戰', pill: 'bg-blue-500', cx: 32.3 },
  { slug: 'coco', zh: '可可', role: '聰明可愛的小學者', traits: '喜愛學習、細心又善良', pill: 'bg-rose-500', cx: 48.8 },
  { slug: 'leo',  zh: '雷歐', role: '沉著冷靜的觀察家', traits: '冷靜、可靠、愛自然', pill: 'bg-green-600', cx: 65.5 },
  { slug: 'vera', zh: '薇拉', role: '創意滿滿的藝術家', traits: '想像力豐富、愛創作', pill: 'bg-purple-500', cx: 82.2 },
];
const FRAME = { top: 34.2, height: 43.9, width: 14 };

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 via-purple-100 to-amber-100 px-2 py-4">
      {/* 對準底圖框的舞台（鎖定 3:2 比例，內容用 % 定位） */}
      <div className="relative w-full max-w-[1120px] aspect-[3/2] bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
        style={{ backgroundImage: 'url(/images/choose-bg.webp)' }}>

        <img src="/images/logo-260530.webp" alt="Adventure English" className="absolute top-[2%] left-[2%] w-[16%] max-w-[150px] z-20"
          style={{ filter: 'drop-shadow(1.5px 0 0 #fff) drop-shadow(-1.5px 0 0 #fff) drop-shadow(0 1.5px 0 #fff) drop-shadow(0 -1.5px 0 #fff) drop-shadow(0 0 4px rgba(255,255,255,.9))' }} />

        {/* 標題緞帶 */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center z-20" style={{ top: '5%', width: '80%' }}>
          <h1 className="inline-block bg-amber-50/90 text-amber-900 text-lg sm:text-3xl font-black px-6 sm:px-12 py-1.5 sm:py-2.5 rounded-full shadow-lg border-2 border-amber-200" style={{ textShadow: '0 1px 0 #fff' }}>
            選擇你的冒險夥伴
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
              className="absolute z-10 flex flex-col items-center text-center"
              style={{ left: `${a.cx}%`, top: `${FRAME.top}%`, width: '15.5%', transform: 'translateX(-50%)' }}>
              {/* 框內：人物 + 選中光框 */}
              <div className={`relative w-[90%] rounded-2xl transition-all ${active ? 'ring-4 ring-amber-300 bg-amber-100/30' : ''}`}
                style={{ height: 0, paddingBottom: '118%' }}>
                {active && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">⭐</div>}
                <div className="absolute inset-0 flex items-end justify-center p-1">
                  <AvatarImg slug={a.slug} zh={a.zh} />
                </div>
              </div>
              {/* 名字 + 介紹 */}
              <div className={`${a.pill} text-white font-black text-sm sm:text-lg px-4 sm:px-6 py-0.5 sm:py-1 rounded-full shadow -mt-3 sm:-mt-4 relative z-10`}>{a.zh}</div>
              <p className="mt-1 text-[10px] sm:text-[13px] font-bold text-gray-700 leading-tight">{a.role}</p>
              <p className="text-[8px] sm:text-[11px] text-gray-500 leading-tight">{a.traits}</p>
            </button>
          );
        })}
      </div>

      {/* 確認 / 稍後 */}
      <div className="text-center mt-4">
        <button onClick={confirm} disabled={!sel}
          className={`px-12 sm:px-16 py-3 rounded-full font-black text-lg sm:text-xl text-white shadow-xl transition-all active:scale-95 ${
            sel ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' : 'bg-gray-400/70 cursor-not-allowed'
          }`}>
          確認選擇 ⭐
        </button>
        <div className="mt-2">
          <Link href="/adventure-map" onClick={() => playClick()} className="no-underline text-gray-500 text-sm font-bold hover:text-gray-700">
            🔒 稍後再選擇
          </Link>
        </div>
      </div>
    </div>
  );
}

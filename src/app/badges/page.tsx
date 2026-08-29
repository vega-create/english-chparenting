'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  loadProgress, getBadges, totalStars, totalGems, nextChestIn,
  BADGE_CATS, type Badge, type BadgeCat, type Progress,
} from '@/lib/missionProgress';
import { playPageIntro } from '@/lib/vega-audio';
import { playClick } from '@/lib/sfx';
import HomeButton from '@/components/HomeButton';
import LoginNudge from '@/components/LoginNudge';

const img = (key: string) => `/images/badges/ach-${key}.webp`;
const LOCKED = '/images/badges/ach-locked.webp';

/** Finn 的下一步提示：挑「差最少就能拿到」的那一枚來講，而不是照順序念。
 *  講「還差幾個」比講門檻有用——孩子看得到自己快到了。 */
function finnHint(badges: Badge[]): string {
  const near = badges
    .filter(b => !b.got && b.need)
    .sort((a, b) => (a.need! - (a.now || 0)) - (b.need! - (b.now || 0)))[0];
  if (near) {
    const left = near.need! - (near.now || 0);
    return `再${near.verb} ${left} ${near.unit}，就有「${near.name}」徽章囉！`;
  }
  const first = badges.find(b => !b.got);
  return first ? `下一個目標：${first.desc}，拿到「${first.name}」！` : '全部徽章都收齊了，你是最強冒險家！';
}

export default function BadgesPage() {
  useEffect(() => { playPageIntro('badges'); }, []);

  const [progress, setProgress] = useState<Progress>({ completed: {} });
  const [cat, setCat] = useState<BadgeCat | 'all'>('all');

  useEffect(() => {
    const refresh = () => setProgress(loadProgress());
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  const badges = useMemo(() => getBadges(progress), [progress]);
  const got = badges.filter(b => b.got);
  const pct = Math.round((got.length / badges.length) * 100);
  const shown = cat === 'all' ? badges : badges.filter(b => b.cat === cat);

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: 'url(/images/courses/intro-bg.webp)' }} />
      <HomeButton />

      <div className="relative mx-auto px-3 py-[2.5vh]" style={{ maxWidth: '980px' }}>

        {/* ===== 標題 + 星星寶石 ===== */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link href="/home" onClick={() => playClick()}
            className="no-underline bg-white/85 backdrop-blur text-amber-800 font-black px-3 py-1.5 rounded-full shadow border-2 border-amber-300 text-sm whitespace-nowrap">
            ← 回冒險基地
          </Link>
          <div className="flex items-center gap-2 bg-white/85 backdrop-blur rounded-full border-2 border-amber-300 shadow px-3 py-1.5">
            <img src="/images/tasks/icon-star.webp" alt="" className="h-5 w-auto" />
            <span className="font-black text-amber-900 text-sm">{totalStars(progress)}</span>
            <img src="/images/tasks/icon-gem.webp" alt="" className="h-5 w-auto ml-1" />
            <span className="font-black text-amber-900 text-sm">{totalGems(progress)}</span>
          </div>
        </div>

        {/* ===== 展示櫃：徽章擺在木架上，沒拿到的是灰鎖 ===== */}
        <div className="rounded-3xl border-4 border-amber-800/70 shadow-xl overflow-hidden"
          style={{ background: 'linear-gradient(#8b5a2b,#6d4420)' }}>
          <div className="text-center py-2 bg-amber-100/90 border-b-4 border-amber-800/50">
            <h1 className="font-black text-amber-900 text-xl sm:text-2xl m-0">成就徽章</h1>
            <p className="text-amber-800/80 font-bold text-xs sm:text-sm m-0">收集徽章，成為最棒的冒險家！</p>
          </div>

          {/* 兩層架子，各五格 */}
          {[0, 1].map(row => (
            <div key={row} className="px-2 sm:px-4 pt-3">
              <div className="grid grid-cols-5 gap-1 sm:gap-3 place-items-center">
                {badges.slice(row * 5, row * 5 + 5).map(b => (
                  <img key={b.key} src={b.got ? img(b.key) : LOCKED} alt={b.got ? b.name : '尚未解鎖'}
                    title={b.got ? b.name : `${b.name}：${b.desc}`}
                    className="w-full max-w-[74px] object-contain drop-shadow-[0_3px_5px_rgba(0,0,0,.45)]" />
                ))}
              </div>
              {/* 木層板 */}
              <div className="h-2 sm:h-2.5 rounded-full mt-1" style={{ background: 'linear-gradient(#c98a4b,#8b5a2b)' }} />
            </div>
          ))}
          <div className="h-3" />
        </div>

        {/* ===== Finn 的提示 ===== */}
        <div className="flex items-end gap-2 mt-3">
          <img src="/characters/finn/finn-talk.png" alt="Finn" className="w-14 sm:w-16 shrink-0" />
          <div className="relative bg-white/92 backdrop-blur rounded-2xl border-2 border-amber-300 shadow px-3 py-2 mb-2">
            <p className="m-0 font-bold text-amber-900 text-xs sm:text-sm leading-snug">
              <span className="text-amber-600">Finn：</span>{finnHint(badges)}
            </p>
          </div>
        </div>

        {/* ===== 解鎖進度 + 寶箱 ===== */}
        <div className="mt-3 bg-amber-50/95 backdrop-blur rounded-2xl border-4 border-amber-700/60 shadow-lg p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="m-0 font-black text-amber-900 text-sm sm:text-base">
              已解鎖 <span className="text-orange-600 text-lg sm:text-xl">{got.length}</span> / {badges.length}
            </p>
            <div className="relative h-3.5 rounded-full bg-amber-200 border border-amber-700/40 overflow-hidden mt-1">
              <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-400 to-green-600"
                initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 border-l-2 border-amber-300 pl-3">
            <img src="/images/badges/ach-chest.webp" alt="" className="w-11 sm:w-14" />
            <p className="m-0 font-bold text-amber-900 text-xs sm:text-sm leading-tight">
              再解鎖 {nextChestIn(badges)} 個徽章<br />可領取神祕寶箱！
            </p>
          </div>
        </div>

        {/* ===== 分類頁籤 ===== */}
        <div className="flex gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-1">
          {BADGE_CATS.map(c => (
            <button key={c.key} onClick={() => { playClick(); setCat(c.key); }}
              className={`shrink-0 font-black rounded-full border-2 px-3 py-1.5 text-xs sm:text-sm transition active:scale-95 ${
                cat === c.key
                  ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white border-white/70 shadow'
                  : 'bg-amber-50/90 text-amber-800 border-amber-300 hover:bg-white'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* ===== 徽章卡 ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-2">
          {shown.map((b, i) => (
            <motion.div key={b.key}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border-4 p-2 sm:p-3 text-center shadow ${
                b.got ? 'bg-amber-50/95 border-amber-400' : 'bg-white/70 border-amber-200'
              }`}>
              <img src={b.got ? img(b.key) : LOCKED} alt=""
                className={`w-full max-w-[84px] mx-auto object-contain ${b.got ? '' : 'opacity-80'}`} />
              <p className={`font-black text-sm sm:text-base mt-1 mb-0 ${b.got ? 'text-amber-900' : 'text-gray-500'}`}>{b.name}</p>
              <p className="text-xs sm:text-[13px] text-amber-800/70 font-bold m-0 leading-tight">{b.desc}</p>

              {/* 狀態：拿到打勾、看得到進度的畫條、其餘上鎖 */}
              <div className="mt-1.5 h-5 flex items-center justify-center">
                {b.got ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white font-black text-sm">✓</span>
                ) : b.need ? (
                  <div className="relative w-full h-5 rounded-full bg-amber-100 border border-amber-300 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-400 to-green-600"
                      style={{ width: `${Math.min(100, ((b.now || 0) / b.need) * 100)}%` }} />
                    <span className="absolute inset-0 flex items-center justify-center font-black text-xs text-amber-900">
                      {b.now}/{b.need}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 font-black text-sm">🔒</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== 底部橫幅 ===== */}
        <div className="flex items-center gap-2 mt-4 rounded-2xl border-4 border-purple-300/70 shadow-lg px-3 py-2"
          style={{ background: 'linear-gradient(#7c3aed,#5b21b6)' }}>
          <img src="/characters/coco/coco-cheer.png" alt="" className="w-12 sm:w-16 shrink-0" />
          <p className="m-0 flex-1 text-white font-black text-sm sm:text-base leading-snug text-center">
            每完成一個挑戰，就能獲得一枚徽章！<br />收集更多徽章，成為最厲害的冒險家吧！
          </p>
          <img src="/images/rewards/chest-explorer.webp" alt="" className="w-12 sm:w-16 shrink-0" />
        </div>

        {/* 沒登入的話徽章只存在這台裝置——這頁最該講這件事 */}
        <div className="mt-3"><LoginNudge /></div>

        <div className="text-center mt-4 pb-[2vh]">
          <Link href="/home" onClick={() => playClick()}
            className="inline-block no-underline bg-white/85 backdrop-blur text-amber-800 font-black px-6 py-2 rounded-full shadow border-2 border-amber-300 hover:bg-white active:scale-95 transition text-sm">
            ← 回冒險基地
          </Link>
        </div>
      </div>

    </main>
  );
}

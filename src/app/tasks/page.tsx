'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HomeButton from '@/components/HomeButton';
import { playClick, playStar } from '@/lib/sfx';
import { playPageIntro } from '@/lib/vega-audio';

// 今日任務：每天 3 個小任務，完成拿獎勵。（進度之後接闖關紀錄）
// 圖示不用 emoji——emoji 在每台裝置長得不一樣，跟這頁的木牌插畫也搭不起來。
// 改用站上原本就有的技能徽章與獎勵圖。
const TASKS = [
  { icon: '/images/tasks/icon-speaking.webp', name: '魔法咒語', desc: '大聲念一課的句子', href: '/courses', reward: '/images/tasks/icon-star.webp', count: 2 },
  { icon: '/images/tasks/icon-reading.webp', name: '故事解謎', desc: '讀完一課的故事書', href: '/courses', reward: '/images/tasks/icon-star.webp', count: 2 },
  { icon: '/images/tasks/icon-writing.webp', name: '字母拼圖', desc: '拼出 5 個新單字', href: '/courses', reward: '/images/tasks/icon-gem.webp', count: 5 },
];

export default function TasksPage() {
  useEffect(() => { playPageIntro('tasks'); }, []);

  const done = 0;

  return (
    <main className="relative min-h-screen">
      {/* 背景 */}
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: 'url(/images/courses/intro-bg.webp)' }} />
      <HomeButton />

      <div className="relative mx-auto px-3 py-[2.5vh]" style={{ maxWidth: '1000px' }}>
        {/* ===== 標題 banner ===== */}
        <div className="relative w-full" style={{ aspectRatio: '1400 / 576' }}>
          <img src="/images/tasks/banner.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
          {/* 「每日冒險」寫在中央的小卷軸上（緞帶被卷軸打斷，字放緞帶中央會壓到卷軸） */}
          <p className="absolute left-1/2 -translate-x-1/2 font-black text-amber-900 whitespace-nowrap"
            style={{ top: '11.5%', fontSize: 'clamp(10px,1.3vw,19px)' }}>
            每日冒險
          </p>
          {/* 主標題＋副標：放在緞帶(41.7%)與凹槽(62%)之間的空白帶 */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: '43%', width: '70%' }}>
            <h1 className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(18px,2.9vw,40px)' }}>
              今日任務
            </h1>
            <p className="font-bold text-amber-800/85 mt-1" style={{ fontSize: 'clamp(9px,1.2vw,16px)' }}>
              完成今天的任務，拿到冒險獎勵！
            </p>
          </div>
          {/* 進度填色：對準圖上畫好的凹槽（y 62–74%、x 25.5–90%） */}
          <div className="absolute" style={{ left: '25.7%', right: '10%', top: '63%', height: '10.5%' }}>
            <motion.div className="absolute inset-y-[12%] left-[0.5%] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              initial={{ width: 0 }} animate={{ width: `${(done / TASKS.length) * 99}%` }} transition={{ duration: 0.8 }} />
          </div>
          {/* 今日進度：寫在禮物圓框正下方 */}
          <p className="absolute text-center font-black text-amber-900 whitespace-nowrap"
            style={{ left: '8%', width: '13.5%', top: '80%', fontSize: 'clamp(9px,1.15vw,16px)' }}>
            今日進度 {done} / {TASKS.length}
          </p>
        </div>

        {/* ===== 3 張任務卡 ===== */}
        <div className="space-y-[1.2vh] mt-[1vh]">
          {TASKS.map((t, i) => (
            <motion.div key={t.name} className="relative w-full" style={{ aspectRatio: '1400 / 304' }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
              <img src="/images/tasks/card.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
              {/* 吊牌圖示 */}
              <div className="absolute flex items-center justify-center" style={{ left: '6.6%', top: '22%', width: '11%', height: '58%' }}>
                <img src={t.icon} alt="" className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(90,55,20,.35)]" />
              </div>
              {/* 任務名 + 說明 */}
              <div className="absolute flex flex-col justify-center" style={{ left: '20%', right: '30%', top: '22%', height: '56%' }}>
                <p className="font-black text-amber-900 leading-tight" style={{ fontSize: 'clamp(13px,1.9vw,28px)' }}>{t.name}</p>
                <p className="font-bold text-amber-800/80 leading-tight mt-[1.5%]" style={{ fontSize: 'clamp(9px,1.15vw,17px)' }}>{t.desc}</p>
              </div>
              {/* 獎勵 */}
              <div className="absolute flex items-center gap-1" style={{ right: '9%', top: '20%' }}>
                <img src={t.reward} alt="" className="object-contain" style={{ height: 'clamp(16px,2.2vw,34px)' }} />
                <span className="font-black text-amber-900" style={{ fontSize: 'clamp(10px,1.3vw,20px)' }}>×{t.count}</span>
              </div>
              {/* 去完成 */}
              <Link href={t.href} onClick={() => playStar()}
                className="absolute no-underline bg-gradient-to-b from-amber-400 to-orange-500 text-white font-black rounded-full border-2 border-white/80 shadow-lg flex items-center justify-center hover:from-amber-500 active:scale-95 transition whitespace-nowrap"
                style={{ right: '7%', top: '52%', padding: '0.35em 1.1em', fontSize: 'clamp(9px,1.25vw,19px)', textShadow: '0 1px 2px rgba(150,70,0,.4)' }}>
                去完成 →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ===== 底部橫幅 ===== */}
        <div className="relative w-full mt-[1.5vh]" style={{ aspectRatio: '1400 / 124' }}>
          <img src="/images/tasks/bottom.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
          <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-black text-amber-900 whitespace-nowrap"
            style={{ fontSize: 'clamp(9px,1.25vw,18px)' }}>
            任務每天更新，完成越多，收穫越多寶物
          </p>
        </div>

        {/* 返回 */}
        <div className="text-center mt-[1.5vh] pb-[2vh]">
          <Link href="/home" onClick={() => playClick()}
            className="inline-block no-underline bg-white/85 backdrop-blur text-amber-800 font-black px-6 py-2 rounded-full shadow border-2 border-amber-300 hover:bg-white active:scale-95 transition"
            style={{ fontSize: 'clamp(11px,1.2vw,17px)' }}>
            ← 回冒險基地
          </Link>
        </div>
      </div>
      {/* 廣告：整頁最下方，不擋內容 */}
    </main>
  );
}

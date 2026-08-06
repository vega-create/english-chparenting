'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HomeButton from '@/components/HomeButton';
import { playClick, playStar } from '@/lib/sfx';
import { playPageIntro } from '@/lib/vega-audio';

// 今日任務：每天 3 個小任務，完成拿獎勵。（進度之後接闖關紀錄）
const TASKS = [
  { icon: '🗣️', name: '魔法咒語', desc: '大聲念一課的句子', href: '/courses', reward: '⭐', count: 2 },
  { icon: '📖', name: '故事解謎', desc: '讀完一課的故事書', href: '/courses', reward: '⭐', count: 2 },
  { icon: '✏️', name: '字母拼圖', desc: '拼出 5 個新單字', href: '/courses', reward: '💎', count: 5 },
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
          {/* 紫緞帶 */}
          <p className="absolute left-1/2 -translate-x-1/2 font-black text-white whitespace-nowrap"
            style={{ top: '26%', fontSize: 'clamp(10px,1.25vw,18px)', textShadow: '0 1px 2px rgba(60,25,100,.55)' }}>
            每日冒險
          </p>
          {/* 主標題 */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: '48%', width: '70%' }}>
            <h1 className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(22px,3.4vw,46px)' }}>
              🌿 今日任務 🌿
            </h1>
            <p className="font-bold text-amber-800/85 mt-1.5" style={{ fontSize: 'clamp(10px,1.3vw,18px)' }}>
              完成今天的任務，拿到冒險獎勵！
            </p>
          </div>
          {/* 進度：文字在左，填色直接畫進圖上原本的凹槽 */}
          <div className="absolute flex items-center gap-[2%]" style={{ left: '13%', right: '10%', top: '80%', height: '10%' }}>
            <span className="font-black text-amber-900 whitespace-nowrap" style={{ fontSize: 'clamp(9px,1.15vw,16px)' }}>
              今日進度 {done} / {TASKS.length}
            </span>
            <div className="relative flex-1 h-[70%]">
              <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                initial={{ width: 0 }} animate={{ width: `${(done / TASKS.length) * 100}%` }} transition={{ duration: 0.8 }} />
            </div>
          </div>
        </div>

        {/* ===== 3 張任務卡 ===== */}
        <div className="space-y-[1.2vh] mt-[1vh]">
          {TASKS.map((t, i) => (
            <motion.div key={t.name} className="relative w-full" style={{ aspectRatio: '1400 / 304' }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
              <img src="/images/tasks/card.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
              {/* 吊牌圖示 */}
              <div className="absolute flex items-center justify-center" style={{ left: '7.5%', top: '28%', width: '9%', height: '46%' }}>
                <span style={{ fontSize: 'clamp(16px,2.6vw,40px)' }}>{t.icon}</span>
              </div>
              {/* 任務名 + 說明 */}
              <div className="absolute flex flex-col justify-center" style={{ left: '20%', right: '30%', top: '22%', height: '56%' }}>
                <p className="font-black text-amber-900 leading-tight" style={{ fontSize: 'clamp(13px,1.9vw,28px)' }}>{t.name}</p>
                <p className="font-bold text-amber-800/80 leading-tight mt-[1.5%]" style={{ fontSize: 'clamp(9px,1.15vw,17px)' }}>{t.desc}</p>
              </div>
              {/* 獎勵 */}
              <div className="absolute flex items-center gap-1" style={{ right: '9%', top: '20%' }}>
                <span style={{ fontSize: 'clamp(12px,1.7vw,26px)' }}>{t.reward}</span>
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
            任務每天更新，完成越多，收穫越多寶物 🏠
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
    </main>
  );
}

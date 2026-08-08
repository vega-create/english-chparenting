'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HomeButton from '@/components/HomeButton';
import { playClick, playStar } from '@/lib/sfx';
import { loadProgress, islandStats } from '@/lib/missionProgress';
import { playPageIntro } from '@/lib/vega-audio';
import AdSlot from '@/components/AdSlot';

type Member = 'guest' | 'free' | 'vip';
const KEY = 'ae_member';

// 未登入時介紹「我的小屋可以…」
const PERKS = [
  { icon: '🏆', t: '記錄學習成果' },
  { icon: '📚', t: '收藏故事書' },
  { icon: '🧰', t: '收集寶物' },
  { icon: '🛡️', t: '獲得徽章' },
  { icon: '🪑', t: '裝飾專屬小屋' },
  { icon: '🪟', t: '解鎖更多風景' },
];

// 免費/付費的功能卡
const FEATURES = [
  { icon: '⭐', t: '我的成就', vip: false },
  { icon: '📘', t: '我的圖書', vip: false },
  { icon: '🧰', t: '我的收藏', vip: true },
  { icon: '🪑', t: '我的家具', vip: true },
  { icon: '🎖️', t: '我的徽章', vip: true },
  { icon: '🐱', t: '我的寵物', vip: true },
];

// 成就展示櫃
const TROPHIES = [
  { icon: '🏆', t: '任務達成', n: 120 },
  { icon: '🛡️', t: '課程完成', n: 48 },
  { icon: '👑', t: '連續登入', n: 28 },
  { icon: '🐾', t: '單字學習', n: 256 },
  { icon: '💠', t: '挑戰完成', n: 16 },
  { icon: '💎', t: '活動參與', n: 8 },
];

/** 圖片框面板（banner 木牌） */
function Panel({ title, children, className = '', img = 'banner' }: { title?: string; children: React.ReactNode; className?: string; img?: 'banner' | 'none' }) {
  if (img === 'none') {
    return <div className={className}>{children}</div>;
  }
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-3xl border-[3px] border-amber-800/45 shadow-2xl"
        style={{ background: 'linear-gradient(180deg,#fdf3d8,#f6e3b8)' }} />
      {title && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 px-4 py-0.5 font-black text-white shadow-lg border-2 border-white/60"
          style={{ fontSize: 'clamp(10px,1.15vw,16px)' }}>{title}</div>
      )}
      <div className={`relative ${title ? 'pt-5 px-3 pb-3 sm:pt-6 sm:px-4 sm:pb-4' : 'p-3 sm:p-4'}`}>{children}</div>
    </div>
  );
}

// 成就展示櫃 6 格座標（量測自 trophy-shelf.webp）
const SHELF_SLOTS = [7.1, 21.6, 36.2, 50.8, 65.5, 80.1];
const SLOT = { width: '12.4%', top: '35%', height: '46%' };
const SLOT_TXT = { textShadow: '0 1px 2px rgba(0,0,0,.75)' };

// 角色名（對應 choose-character 存的 ae_avatar）
const AVATAR_NAME: Record<string, string> = { elly: '艾莉', sky: '小飛', coco: '可可', leo: '雷歐', vera: '薇拉' };

export default function CabinClient() {
  useEffect(() => { playPageIntro('cabin'); }, []);

  const [member, setMember] = useState<Member>('guest');
  const [avatar, setAvatar] = useState('coco');
  const [p, setP] = useState(() => ({ completed: {} as Record<string, number> }));

  useEffect(() => {
    try {
      const m = localStorage.getItem(KEY) as Member | null;
      if (m === 'free' || m === 'vip') setMember(m);
      const av = localStorage.getItem('ae_avatar');
      if (av && AVATAR_NAME[av]) setAvatar(av);
    } catch {}
    const refresh = () => setP(loadProgress());
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  function setM(m: Member) {
    playClick();
    setMember(m);
    try { m === 'guest' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, m); } catch {}
  }

  const stats = islandStats(p);
  const learned = Object.values(stats).reduce((s, x) => s + x.collected, 0);
  const isVip = member === 'vip';

  // 目前進度（之後接真資料）
  const CUR = isVip
    ? { lv: 12, title: '冒險家 Adventurer', slug: 'l3-market-street', zh: 'L3 市場街', en: 'Market Street', xp: 1250, xpMax: 2000, days: 28, mins: 45, done: 32, words: 12, course: 'Course 12', lesson: 'What Is It?' }
    : { lv: 5, title: '見習生 Explorer', slug: 'l1-letter-island', zh: 'L1 字母島', en: 'Letter Island', xp: 230, xpMax: 500, days: 3, mins: 25, done: 18, words: 8, course: 'Course 05', lesson: 'I to L' };

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: 'url(/images/cabin/bg.webp)' }} />
      <div className="fixed inset-0 -z-[5] bg-amber-950/25" />
      <HomeButton />

      {/* 開發用：切換身分（之後接真登入可移除） */}
      <div className="fixed left-3 z-50 flex gap-1" style={{ top: 'calc(0.75rem + env(safe-area-inset-top))' }}>
        {(['guest', 'free', 'vip'] as Member[]).map(m => (
          <button key={m} onClick={() => setM(m)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-black shadow border-2 transition ${
              member === m ? 'bg-purple-600 text-white border-white/70' : 'bg-white/85 text-purple-700 border-purple-200'
            }`}>
            {m === 'guest' ? '未登入' : m === 'free' ? '免費' : '付費'}
          </button>
        ))}
      </div>

      <div className="relative mx-auto px-3 py-[3vh]" style={{ maxWidth: '1200px' }}>
        {/* ===== 標題木牌（頭標圖框） ===== */}
        <div className="relative w-full mx-auto" style={{ aspectRatio: '1200 / 378', maxWidth: 'min(94%, 560px)' }}>
          <img src="/images/cabin/title-plate.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
          <h1 className="absolute left-1/2 -translate-x-1/2 font-black text-amber-900 leading-none whitespace-nowrap"
            style={{ top: '22%', fontSize: 'clamp(20px,3vw,40px)', textShadow: '0 2px 3px rgba(255,240,200,.55)' }}>
            🏠 我的小屋
          </h1>
          <p className="absolute text-center font-black text-white whitespace-nowrap"
            style={{ left: '24.8%', width: '52.2%', top: '64%', fontSize: 'clamp(10px,1.3vw,19px)', textShadow: '0 1px 2px rgba(55,20,95,.7)' }}>
            {member === 'guest' ? '訪客模式' : isVip ? '💎 冒險會員' : '免費會員'}
          </p>
        </div>

        {/* ============ 未登入 ============ */}
        {member === 'guest' && (
          <div className="mt-5">
            {/* 我的小屋可以…（展示櫃 6 格） */}
            <div className="relative w-full mx-auto" style={{ aspectRatio: '1200 / 412', maxWidth: '900px' }}>
              <img src="/images/cabin/trophy-shelf.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
              <p className="absolute left-1/2 -translate-x-1/2 font-black text-white whitespace-nowrap z-10"
                style={{ top: '3%', fontSize: 'clamp(9px,1.15vw,16px)', textShadow: '0 1px 2px rgba(60,25,100,.6)' }}>我的小屋可以…</p>
              {PERKS.map((k, i) => (
                <div key={k.t} className="absolute flex flex-col items-center justify-center gap-[6%]"
                  style={{ left: `${SHELF_SLOTS[i]}%`, ...SLOT }}>
                  <span style={{ fontSize: 'clamp(18px,2.5vw,40px)' }}>{k.icon}</span>
                  <p className="text-center font-black text-amber-50 leading-tight px-[4%]"
                    style={{ fontSize: 'clamp(7px,0.88vw,13px)', ...SLOT_TXT }}>{k.t}</p>
                </div>
              ))}
            </div>

            {/* 登入卡（圖框疊字） */}
            <div className="relative w-full mx-auto mt-3" style={{ aspectRatio: '1116 / 1383', maxWidth: '340px' }}>
              <img src="/images/cabin/login-card.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
              <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: '18%', width: '72%' }}>
                <img src="/images/cabin/lock.webp" alt="" className="mx-auto" style={{ width: 'clamp(38px,5vw,72px)' }} />
                <p className="font-black text-amber-900 leading-snug mt-2" style={{ fontSize: 'clamp(11px,1.35vw,19px)' }}>
                  登入後即可開啟<br />自己的冒險小屋
                </p>
              </div>
              <button onClick={() => setM('free')}
                className="absolute left-1/2 -translate-x-1/2 font-black text-white active:scale-95 transition"
                style={{ top: '60.5%', width: '62%', height: '9%', fontSize: 'clamp(12px,1.45vw,20px)', textShadow: '0 1px 2px rgba(60,25,100,.6)' }}>登入</button>
              <button onClick={() => setM('free')}
                className="absolute left-1/2 -translate-x-1/2 font-black text-white active:scale-95 transition"
                style={{ top: '73%', width: '62%', height: '9%', fontSize: 'clamp(12px,1.45vw,20px)', textShadow: '0 1px 2px rgba(10,60,110,.6)' }}>免費註冊</button>
            </div>
            <div className="text-center mt-3 pb-[2vh]">
              <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-1.5 font-black text-white shadow-lg border-2 border-white/50"
                style={{ fontSize: 'clamp(11px,1.3vw,18px)' }}>🔒 登入或註冊，開啟屬於你的冒險旅程！⭐</span>
            </div>
          </div>
        )}

        {/* ============ 免費 / 付費 ============ */}
        {member !== 'guest' && (
          <div className="mt-5 grid lg:grid-cols-[2.65fr_1fr] gap-3 sm:gap-4 items-start">
            {/* ===== 左＋中（含下方功能卡，讓卡片緊接在展示櫃下面） ===== */}
            <div className="space-y-3 sm:space-y-4">
            <div className="grid lg:grid-cols-[0.95fr_1.7fr] gap-3 sm:gap-4 items-start">
            {/* 左：角色卡（圓框木牌） */}
            <div className="relative w-full mx-auto" style={{ aspectRatio: '869 / 1667', maxWidth: 'clamp(190px, 27vw, 330px)' }}>
              <img src="/images/cabin/avatar-frame.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
              {/* 圓框內的大頭像 */}
              <div className="absolute overflow-hidden rounded-full"
                style={{ left: '17.5%', top: '2.5%', width: '65%', aspectRatio: '1 / 1', background: 'linear-gradient(180deg,#bfe6ff 0%,#d9f2e4 55%,#f4e6c4 100%)' }}>
                <motion.img src={`/images/avatars/face/${avatar}.webp`} alt=""
                  className="w-full h-full object-contain"
                  animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
              </div>
              {/* 紫緞帶：名字 */}
              <p className="absolute text-center font-black text-white whitespace-nowrap"
                style={{ left: '10%', width: '76%', top: '43.2%', fontSize: 'clamp(10px,1.15vw,17px)', textShadow: '0 1px 2px rgba(55,20,95,.65)' }}>
                {AVATAR_NAME[avatar]}
              </p>
              {/* 第 1 格：等級 + 稱號 */}
              <div className="absolute text-center" style={{ left: '10%', width: '80%', top: '52%' }}>
                <p className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(15px,1.95vw,28px)' }}>⭐ LV.{CUR.lv}</p>
                <p className="font-bold text-amber-700 leading-none mt-[4%]" style={{ fontSize: 'clamp(8px,0.92vw,13px)' }}>{CUR.title}</p>
              </div>
              {/* 第 2～3 格：目前世界（縮圖＋中英島名） */}
              <div className="absolute flex flex-col items-center" style={{ left: '10%', width: '80%', top: '63.5%' }}>
                <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.9vw,13px)' }}>目前世界</p>
                <div className="flex items-center gap-[5%] mt-[3%] w-full justify-center">
                  <img src={`/images/courses/hero/${CUR.slug}.webp`} alt=""
                    className="rounded-lg border-2 border-amber-800/35 object-cover shrink-0"
                    style={{ width: 'clamp(22px,2.6vw,44px)', height: 'clamp(22px,2.6vw,44px)' }} />
                  <div className="min-w-0">
                    <p className="font-black text-amber-900 leading-none whitespace-nowrap" style={{ fontSize: 'clamp(9px,1.1vw,16px)' }}>{CUR.zh}</p>
                    <p className="font-bold text-amber-700/85 leading-none mt-[8%] whitespace-nowrap" style={{ fontSize: 'clamp(7px,0.8vw,12px)' }}>{CUR.en}</p>
                  </div>
                </div>
              </div>
              {/* 第 4 格：EXP 條（數字在條內） */}
              <div className="absolute flex items-center gap-[4%]" style={{ left: '11%', width: '78%', top: '82.5%' }}>
                <span className="font-black text-amber-800 shrink-0" style={{ fontSize: 'clamp(7px,0.85vw,12px)' }}>EXP</span>
                <div className="relative flex-1 rounded-full bg-amber-200 overflow-hidden border border-amber-700/30"
                  style={{ height: 'clamp(11px,1.3vw,20px)' }}>
                  <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: `${CUR.xp / CUR.xpMax * 100}%` }} />
                  <span className="absolute inset-0 flex items-center justify-center font-black text-amber-900 leading-none"
                    style={{ fontSize: 'clamp(6px,0.72vw,11px)' }}>{CUR.xp} / {CUR.xpMax}</span>
                </div>
              </div>
              {/* 底部按鈕槽 */}
              <Link href="/adventure-map" onClick={() => playClick()}
                className="absolute no-underline flex items-center justify-center font-black text-amber-900 active:scale-95 transition"
                style={{ left: '13.8%', width: '72.5%', top: '89.4%', height: '6%', fontSize: 'clamp(9px,1.1vw,16px)' }}>
                🗺️ 查看冒險地圖
              </Link>
            </div>

            {/* 中：冒險日誌 + 成就展示櫃 */}
            <div className="space-y-3 sm:space-y-4 mx-auto w-full" style={{ maxWidth: 'min(100%, 680px)' }}>
              {/* 冒險日誌（大書圖框） */}
              <div className="relative w-full" style={{ aspectRatio: '1200 / 766' }}>
                <img src="/images/cabin/journal.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                {/* 紫緞帶標題 */}
                <p className="absolute font-black text-white text-center whitespace-nowrap z-10"
                  style={{ left: '28%', width: '40%', top: '4.5%', fontSize: 'clamp(10px,1.2vw,17px)', textShadow: '0 1px 2px rgba(60,25,100,.6)' }}>冒險日誌</p>

                {/* 左頁：今日學習 4 項 ＋ 連續登入 */}
                <div className="absolute flex flex-col justify-between" style={{ left: '5.5%', width: '36%', top: '13%', bottom: '6%' }}>
                  <div>
                    <p className="font-black text-amber-900 text-center leading-none" style={{ fontSize: 'clamp(10px,1.25vw,18px)' }}>今日學習</p>
                    <div className="mt-[6%] space-y-[4%]">
                      {[
                        { i: '📖', t: '故事閱讀', v: '1 篇' },
                        { i: '⭐', t: '魔法學習', v: '1 課' },
                        { i: '🧩', t: '拼圖挑戰', v: '1 次' },
                        { i: '✏️', t: '單字練習', v: `${learned || CUR.words} 個` },
                      ].map(r => (
                        <div key={r.t} className="flex items-center gap-[4%]">
                          <span style={{ fontSize: 'clamp(10px,1.25vw,19px)' }}>{r.i}</span>
                          <span className="flex-1 font-bold text-amber-800 whitespace-nowrap" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>{r.t}</span>
                          <span className="font-black text-amber-900 whitespace-nowrap" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>{r.v}</span>
                          <span className="text-green-600 font-black" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>✓</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-[3%]">
                      <span style={{ fontSize: 'clamp(11px,1.35vw,20px)' }}>📅</span>
                      <span className="font-bold text-amber-800" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>連續登入</span>
                    </div>
                    <p className="font-black text-amber-900 leading-none mt-[2%]" style={{ fontSize: 'clamp(16px,2.1vw,32px)' }}>
                      {CUR.days} <span style={{ fontSize: '0.45em' }}>天</span>
                    </p>
                    <p className="leading-none mt-[2%] whitespace-nowrap" style={{ fontSize: 'clamp(8px,1vw,16px)' }}>
                      {'🔥'.repeat(Math.min(CUR.days, 6))}
                    </p>
                  </div>
                </div>

                {/* 右頁 3 格 */}
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '14.4%', height: '24.8%' }}>
                  <div className="flex items-center gap-[4%]">
                    <span style={{ fontSize: 'clamp(12px,1.6vw,24px)' }}>⏱️</span>
                    <span className="font-bold text-amber-700" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>學習時間</span>
                  </div>
                  <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(14px,1.95vw,28px)' }}>{CUR.mins} <span style={{ fontSize: '0.55em' }}>分鐘</span></p>
                  <div className="mt-[5%] h-[0.5em] rounded-full bg-amber-200 overflow-hidden border border-amber-800/20" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: isVip ? '75%' : '42%' }} />
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '40.5%', height: '24.8%' }}>
                  <div className="flex items-center gap-[4%]">
                    <span style={{ fontSize: 'clamp(12px,1.6vw,24px)' }}>✅</span>
                    <span className="font-bold text-amber-700" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>完成任務</span>
                  </div>
                  <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(14px,1.95vw,28px)' }}>{CUR.done} <span style={{ fontSize: '0.5em' }}>/ 40</span></p>
                  <div className="mt-[5%] h-[0.5em] rounded-full bg-amber-200 overflow-hidden border border-amber-800/20" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: `${CUR.done / 40 * 100}%` }} />
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '66.6%', height: '24.8%' }}>
                  <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>最近完成</p>
                  <div className="flex items-center gap-[5%] mt-[4%]">
                    <img src={`/images/courses/hero/${CUR.slug}.webp`} alt=""
                      className="rounded-lg border-2 border-amber-800/30 object-cover shrink-0"
                      style={{ width: 'clamp(24px,2.9vw,48px)', height: 'clamp(24px,2.9vw,48px)' }} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-amber-700 leading-none whitespace-nowrap" style={{ fontSize: 'clamp(7px,0.85vw,13px)' }}>{CUR.course}</p>
                      <p className="font-black text-amber-900 leading-tight mt-[6%]" style={{ fontSize: 'clamp(9px,1.1vw,16px)' }}>{CUR.lesson}</p>
                    </div>
                    <Link href="/courses" onClick={() => playClick()}
                      className="no-underline shrink-0 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 flex items-center justify-center font-black text-white border-2 border-white/60 shadow active:scale-95 transition"
                      style={{ width: 'clamp(16px,1.9vw,30px)', height: 'clamp(16px,1.9vw,30px)', fontSize: 'clamp(8px,1vw,15px)' }}>›</Link>
                  </div>
                </div>
              </div>

              {/* 成就展示櫃（木櫃圖框 6 格） */}
              <div className="relative w-full" style={{ aspectRatio: '1200 / 412' }}>
                <img src="/images/cabin/trophy-shelf.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                <p className="absolute left-1/2 -translate-x-1/2 font-black text-white whitespace-nowrap z-10"
                  style={{ top: '3%', fontSize: 'clamp(9px,1.15vw,16px)', textShadow: '0 1px 2px rgba(60,25,100,.6)' }}>成就展示櫃</p>
                {TROPHIES.map((t, i) => {
                  const locked = !isVip && i >= 3;
                  return (
                    <div key={t.t} className="absolute flex flex-col items-center justify-center gap-[3%]"
                      style={{ left: `${SHELF_SLOTS[i]}%`, ...SLOT }}>
                      {locked
                        ? <img src="/images/cabin/lock.webp" alt="" className="object-contain" style={{ width: 'clamp(15px,2.1vw,34px)' }} />
                        : <span style={{ fontSize: 'clamp(15px,2.1vw,34px)' }}>{t.icon}</span>}
                      {!locked && <span className="font-black text-amber-200 leading-none" style={{ fontSize: 'clamp(8px,1vw,15px)', ...SLOT_TXT }}>{t.n}</span>}
                      <p className="text-center font-black text-amber-50 leading-tight px-[4%]"
                        style={{ fontSize: 'clamp(6px,0.8vw,12px)', ...SLOT_TXT }}>{locked ? 'VIP 解鎖' : t.t}</p>
                    </div>
                  );
                })}
              </div>
              {!isVip && <p className="text-center font-black text-white" style={{ fontSize: 'clamp(8px,0.95vw,13px)', textShadow: '0 2px 3px rgba(50,25,0,.85)' }}>升級會員可解鎖更多成就！</p>}
            </div>
            </div>

            {/* 下方 6 個功能卡（緊接在成就展示櫃下面） */}
            <div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                {FEATURES.map(f => {
                  const locked = f.vip && !isVip;
                  return (
                    <div key={f.t} className="relative w-full" style={{ aspectRatio: '1095 / 1128' }}>
                      <img src="/images/cabin/feature-card.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                      {f.vip && (
                        <span className="absolute z-10 rounded-full bg-purple-600 px-[0.55em] font-black text-white border border-white/60 shadow"
                          style={{ right: '4%', top: '2%', fontSize: 'clamp(7px,0.8vw,11px)' }}>VIP</span>
                      )}
                      <div className="absolute flex flex-col items-center justify-center gap-[4%]"
                        style={{ left: '6.8%', top: '4.3%', width: '86.7%', height: '81.7%' }}>
                        <div className="flex items-center justify-center" style={{ fontSize: 'clamp(20px,2.6vw,40px)', height: '1.15em' }}>
                          {locked
                            ? <img src="/images/cabin/lock.webp" alt="" className="object-contain h-full w-auto" />
                            : f.icon}
                        </div>
                        <p className="font-black text-amber-900 leading-tight text-center whitespace-nowrap"
                          style={{ fontSize: 'clamp(9px,1.05vw,16px)' }}>{f.t}</p>
                        <span className={`rounded-full px-[0.7em] py-[0.2em] font-black text-white border-2 border-white/50 whitespace-nowrap ${
                          locked ? 'bg-purple-600' : 'bg-green-600'
                        }`} style={{ fontSize: 'clamp(7px,0.82vw,12px)' }}>{locked ? 'VIP 解鎖' : '可查看'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2.5 text-center font-black text-white" style={{ fontSize: 'clamp(10px,1.2vw,17px)', textShadow: '0 2px 4px rgba(60,30,0,.85)' }}>
                {isVip ? '打造專屬於你的夢幻小屋！🏠' : '升級會員，解鎖所有收藏與裝飾，打造專屬於你的夢幻小屋！'}
              </p>
            </div>
            </div>

            {/* 右：圖書館 + 每日獎勵 (+升級) */}
            <div className="space-y-3 sm:space-y-4 mx-auto w-full" style={{ maxWidth: 'min(100%, 420px)' }}>
              {/* 我的圖書館（書櫃框） */}
              <div className="relative w-full" style={{ aspectRatio: '1170 / 1345' }}>
                <img src="/images/cabin/library.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                {/* 紫緞帶 */}
                <p className="absolute text-center font-black text-white whitespace-nowrap"
                  style={{ left: '12.9%', width: '73.7%', top: '4%', fontSize: 'clamp(10px,1.2vw,18px)', textShadow: '0 1px 2px rgba(55,20,95,.65)' }}>我的圖書館</p>
                {/* 側邊層板放書 */}
                {[['📕', 8.5, 20.5], ['📗', 8.5, 45.5], ['📘', 8.5, 70.5], ['📙', 75.6, 20.5], ['📓', 75.6, 45.5], ['📔', 75.6, 70.5]].map(([e, x, y], i) => (
                  <div key={i} className="absolute flex items-end justify-center pb-[2%]"
                    style={{ left: `${x}%`, top: `${y}%`, width: '15%', height: '18.5%' }}>
                    <span style={{ fontSize: 'clamp(11px,1.5vw,24px)' }}>{e}</span>
                  </div>
                ))}
                {/* 中央木板 */}
                <div className="absolute flex flex-col items-center justify-center"
                  style={{ left: '23.4%', top: '19.5%', width: '52.2%', height: '71.4%' }}>
                  <span style={{ fontSize: 'clamp(24px,3.1vw,48px)' }}>📖</span>
                  <p className="font-bold text-amber-100/85 leading-none mt-[4%]" style={{ fontSize: 'clamp(8px,0.95vw,14px)', ...SLOT_TXT }}>已閱讀</p>
                  <p className="font-black text-amber-50 leading-none mt-[3%]" style={{ fontSize: 'clamp(20px,2.6vw,40px)', ...SLOT_TXT }}>
                    {isVip ? 86 : 12} <span style={{ fontSize: '0.42em' }}>本</span>
                  </p>
                  <Link href="/books" onClick={() => playClick()}
                    className="no-underline mt-[8%] rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 px-[1em] py-[0.28em] font-black text-white shadow-lg border-2 border-white/50 active:scale-95 transition whitespace-nowrap"
                    style={{ fontSize: 'clamp(8px,1vw,15px)' }}>查看全部</Link>
                </div>
              </div>

              {/* 每日小獎勵（去背寶箱） */}
              <div className="relative w-full" style={{ aspectRatio: '848 / 900' }}>
                <img src="/images/cabin/reward.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
                <p className="absolute text-center font-black text-white whitespace-nowrap"
                  style={{ left: '14%', width: '63.2%', top: '4%', fontSize: 'clamp(10px,1.25vw,19px)', textShadow: '0 1px 2px rgba(55,20,95,.65)' }}>每日小獎勵</p>
                {isVip ? (
                  <div className="absolute flex items-center justify-center font-black text-white"
                    style={{ left: '17.9%', top: '79.7%', width: '63.7%', height: '9.9%', fontSize: 'clamp(10px,1.2vw,18px)', textShadow: '0 1px 2px rgba(20,60,10,.7)' }}>
                    已領取 ⏱ 12:45
                  </div>
                ) : (
                  <button onClick={() => playStar()}
                    className="absolute flex items-center justify-center font-black text-white active:scale-95 transition"
                    style={{ left: '17.9%', top: '79.7%', width: '63.7%', height: '9.9%', fontSize: 'clamp(10px,1.25vw,19px)', textShadow: '0 1px 2px rgba(20,60,10,.7)' }}>
                    領取獎勵 ❗
                  </button>
                )}
              </div>

              {/* 升級會員（星空框） */}
              {!isVip && (
                <div className="relative w-full" style={{ aspectRatio: '1200 / 925' }}>
                  <img src="/images/cabin/upgrade.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                  <div className="absolute text-center" style={{ left: '12%', width: '76%', top: '13%' }}>
                    <p className="font-black text-amber-200 leading-none" style={{ fontSize: 'clamp(13px,1.6vw,24px)', textShadow: '0 2px 4px rgba(20,5,50,.8)' }}>✨ 升級會員</p>
                    <p className="font-bold text-white/90 leading-snug mt-[4%]" style={{ fontSize: 'clamp(8px,0.95vw,14px)', textShadow: '0 1px 3px rgba(20,5,50,.8)' }}>
                      解鎖所有功能與裝飾，<br />享受完整冒險體驗！
                    </p>
                    <div className="mt-[6%]" style={{ fontSize: 'clamp(14px,1.8vw,28px)' }}>🧰 🪑 🎖️ 🐱 💎</div>
                  </div>
                  <button onClick={() => setM('vip')}
                    className="absolute flex items-center justify-center font-black text-amber-900 active:scale-95 transition"
                    style={{ left: '13.6%', top: '71.2%', width: '73.6%', height: '11.9%', fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    立即升級
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* 廣告：整頁最下方，不擋內容 */}
      <AdSlot place="cabinBottom" className="pb-6 pt-2" />
    </main>
  );
}

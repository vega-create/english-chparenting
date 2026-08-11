'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HomeButton from '@/components/HomeButton';
import { playClick, playStar } from '@/lib/sfx';
import type { Progress } from '@/lib/missionProgress';
import { loadProgress, islandStats, completedCount, totalStars, totalGems, collectedWordCount, getBadges, currentIsland } from '@/lib/missionProgress';
import { COURSES } from '@/data/courses';
import { playPageIntro } from '@/lib/vega-audio';
import { useAuth } from '@/components/AuthProvider';
import AuthButton from '@/components/AuthButton';
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

// 功能卡。soon = 功能還沒做（標「即將推出」，不要用 VIP 鎖騙孩子）
const FEATURES = [
  { icon: '⭐', t: '我的成就', href: '/badges', soon: false },
  { icon: '📘', t: '推薦書單', href: '/books', soon: false },
  { icon: '🗺️', t: '冒險地圖', href: '/adventure-map', soon: false },
  { icon: '📜', t: '今日任務', href: '/tasks', soon: false },
  { icon: '🧰', t: '我的收藏', href: '', soon: true },
  { icon: '🐱', t: '我的寵物', href: '', soon: true },
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

  const { user, signIn } = useAuth();
  // 身分現在由登入狀態決定：沒登入=訪客、登入=免費會員。
  // VIP 那一層先保留（版面都做好了），等之後接付費再啟用。
  const [member, setMember] = useState<Member>('guest');
  useEffect(() => { setMember(user ? 'free' : 'guest'); }, [user]);
  const [avatar, setAvatar] = useState('coco');
  const [p, setP] = useState<Progress>(() => ({ completed: {} }));

  useEffect(() => {
    try {
      const av = localStorage.getItem('ae_avatar');
      if (av && AVATAR_NAME[av]) setAvatar(av);
    } catch {}
    const refresh = () => setP(loadProgress());
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  // ── 全部改成真實數據（之前是寫死的假數字）──
  const stats = islandStats(p);
  const learned = collectedWordCount(p);          // 已學單字
  const done = completedCount(p);                 // 完成課數
  const stars = totalStars(p);                    // 總星數
  const gems = totalGems(p);                      // 寶石
  const badges = getBadges(p);
  const days = p.streak ?? 0;                     // 連續學習天數
  const curSlug = currentIsland(p);
  const course = COURSES.find(c => c.slug === curSlug) ?? COURSES[0];

  // 等級：每 10 顆星升一級（可調），經驗條顯示離下一級還差多少
  const lv = Math.max(1, Math.floor(stars / 10) + 1);
  const xp = stars % 10, xpMax = 10;
  const title = lv >= 20 ? '冒險大師 Master'
              : lv >= 10 ? '冒險家 Adventurer'
              : lv >= 5  ? '探險者 Explorer'
              : '見習生 Beginner';

  const CUR = {
    lv, title, slug: course.slug, zh: `L${course.level} ${course.island}`, en: course.islandEn,
    xp, xpMax, days, done, words: learned,
  };
  const isVip = false;   // 付費還沒做；版面保留，之後接金流再啟用

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: 'url(/images/cabin/bg.webp)' }} />
      <div className="fixed inset-0 -z-[5] bg-amber-950/25" />
      <HomeButton />

      {/* 登入／頭像 */}
      <div className="fixed left-3 z-50" style={{ top: 'calc(0.75rem + env(safe-area-inset-top))' }}>
        <AuthButton compact />
      </div>

      <div className="relative mx-auto px-3 py-[3vh]" style={{ maxWidth: '1200px' }}>
        {/* ===== 標題木牌（頭標圖框） ===== */}
        <div className="relative w-full mx-auto" style={{ aspectRatio: '1200 / 346', maxWidth: 'min(94%, 560px)' }}>
          <img src="/images/cabin/title-plate.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
          <h1 className="absolute left-1/2 -translate-x-1/2 font-black text-amber-900 leading-none whitespace-nowrap"
            style={{ top: '24%', fontSize: 'clamp(20px,3vw,40px)', textShadow: '0 2px 3px rgba(255,240,200,.55)' }}>
            🏠 我的小屋
          </h1>
          <p className="absolute text-center font-black text-white whitespace-nowrap"
            style={{ left: '24.8%', width: '52.2%', top: '70%', fontSize: 'clamp(10px,1.3vw,19px)', textShadow: '0 1px 2px rgba(55,20,95,.7)' }}>
            {member === 'guest' ? '訪客模式' : isVip ? '💎 冒險會員' : '免費會員'}
          </p>
        </div>

        {/* 沒登入也看得到自己的成果；登入只是為了換裝置也保留 */}
        {!user && (
          <div className="mt-4 mx-auto max-w-3xl rounded-2xl bg-white/90 backdrop-blur border-2 border-amber-300 shadow-lg px-4 py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <img src="/images/cabin/lock.webp" alt="" className="w-7 h-7 object-contain" />
            <p className="font-bold text-amber-900" style={{ fontSize: 'clamp(11px,1.25vw,16px)' }}>
              進度目前只存在這台裝置上
            </p>
            <button onClick={() => { playClick(); signIn('/cabin'); }}
              className="rounded-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black px-4 py-1.5 shadow border-2 border-white/60 active:scale-95 transition whitespace-nowrap"
              style={{ fontSize: 'clamp(11px,1.2vw,15px)' }}>
              家長登入，換手機也保留 →
            </button>
          </div>
        )}

        {/* ============ 小屋主體（登入與否都看得到）============ */}

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
                    <p className="font-black text-amber-900 text-center leading-none" style={{ fontSize: 'clamp(10px,1.25vw,18px)' }}>學習總覽</p>
                    <div className="mt-[6%] space-y-[4%]">
                      {[
                        { i: '📖', t: '完成課程', v: `${done} 課` },
                        { i: '⭐', t: '累積星星', v: `${stars} 顆` },
                        { i: '💎', t: '收集寶石', v: `${gems} 個` },
                        { i: '✏️', t: '學會單字', v: `${learned} 個` },
                      ].map(r => (
                        <div key={r.t} className="flex items-center gap-[4%]">
                          <span style={{ fontSize: 'clamp(10px,1.25vw,19px)' }}>{r.i}</span>
                          <span className="flex-1 font-bold text-amber-800 whitespace-nowrap" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>{r.t}</span>
                          <span className="font-black text-amber-900 whitespace-nowrap" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>{r.v}</span>
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
                    <span style={{ fontSize: 'clamp(12px,1.6vw,24px)' }}>⭐</span>
                    <span className="font-bold text-amber-700" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>累積星星</span>
                  </div>
                  <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(14px,1.95vw,28px)' }}>{stars} <span style={{ fontSize: '0.55em' }}>顆</span></p>
                  <div className="mt-[5%] h-[0.5em] rounded-full bg-amber-200 overflow-hidden border border-amber-800/20" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: `${Math.min(100, Math.round(stars / 720 * 100))}%` }} />
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '40.5%', height: '24.8%' }}>
                  <div className="flex items-center gap-[4%]">
                    <span style={{ fontSize: 'clamp(12px,1.6vw,24px)' }}>✅</span>
                    <span className="font-bold text-amber-700" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>完成任務</span>
                  </div>
                  <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(14px,1.95vw,28px)' }}>{done} <span style={{ fontSize: '0.5em' }}>/ 240 課</span></p>
                  <div className="mt-[5%] h-[0.5em] rounded-full bg-amber-200 overflow-hidden border border-amber-800/20" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: `${Math.min(100, done / 240 * 100)}%` }} />
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '66.6%', height: '24.8%' }}>
                  <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>最近完成</p>
                  <div className="flex items-center gap-[5%] mt-[4%]">
                    <img src={`/images/courses/hero/${CUR.slug}.webp`} alt=""
                      className="rounded-lg border-2 border-amber-800/30 object-cover shrink-0"
                      style={{ width: 'clamp(24px,2.9vw,48px)', height: 'clamp(24px,2.9vw,48px)' }} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-amber-700 leading-none whitespace-nowrap" style={{ fontSize: 'clamp(7px,0.85vw,13px)' }}>{CUR.zh}</p>
                      <p className="font-black text-amber-900 leading-tight mt-[6%]" style={{ fontSize: 'clamp(9px,1.1vw,16px)' }}>
                        {done > 0 ? `已完成 ${done} 課` : '還沒開始，出發吧！'}
                      </p>
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
                {/* 這裡是「已經拿到的」獎盃櫃，不是待辦清單——拿到的排前面，
                    條件、進度、還沒解鎖的全部留給 /badges，兩頁才不會講一樣的事 */}
                {[...badges].sort((a, b) => Number(b.got) - Number(a.got)).slice(0, 6).map((b, i) => (
                  <div key={b.key} className="absolute flex flex-col items-center justify-center gap-[3%]"
                    style={{ left: `${SHELF_SLOTS[i]}%`, ...SLOT }}>
                    <img src={b.got ? `/images/badges/ach-${b.key}.webp` : '/images/badges/ach-locked.webp'}
                      alt="" className="object-contain" style={{ height: '58%', opacity: b.got ? 1 : 0.45 }} />
                    <p className="text-center font-black leading-tight px-[4%]"
                      style={{ fontSize: 'clamp(6px,0.8vw,12px)', color: b.got ? '#fffbeb' : '#d6c7ae', ...SLOT_TXT }}>{b.got ? b.name : '未解鎖'}</p>
                  </div>
                ))}
              </div>
              <p className="text-center font-black text-white" style={{ fontSize: 'clamp(8px,0.95vw,13px)', textShadow: '0 2px 3px rgba(50,25,0,.85)' }}>
                已獲得 {badges.filter(b => b.got).length} / {badges.length} 個徽章 —— <Link href="/badges" onClick={() => playClick()} className="underline text-amber-200">看全部</Link>
              </p>
            </div>
            </div>

            {/* 下方 6 個功能卡（緊接在成就展示櫃下面） */}
            <div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                {FEATURES.map(f => {
                  const inner = (
                    <>
                      <img src="/images/cabin/feature-card.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                      <div className="absolute flex flex-col items-center justify-center gap-[4%]"
                        style={{ left: '6.8%', top: '4.3%', width: '86.7%', height: '81.7%' }}>
                        <div className="flex items-center justify-center" style={{ fontSize: 'clamp(20px,2.6vw,40px)', height: '1.15em', opacity: f.soon ? 0.4 : 1 }}>
                          {f.icon}
                        </div>
                        <p className="font-black text-amber-900 leading-tight text-center whitespace-nowrap"
                          style={{ fontSize: 'clamp(9px,1.05vw,16px)', opacity: f.soon ? 0.55 : 1 }}>{f.t}</p>
                        <span className={`rounded-full px-[0.7em] py-[0.2em] font-black text-white border-2 border-white/50 whitespace-nowrap ${
                          f.soon ? 'bg-gray-400' : 'bg-green-600'
                        }`} style={{ fontSize: 'clamp(7px,0.82vw,12px)' }}>{f.soon ? '即將推出' : '去看看'}</span>
                      </div>
                    </>
                  );
                  return f.soon
                    ? <div key={f.t} className="relative w-full" style={{ aspectRatio: '1095 / 1128' }}>{inner}</div>
                    : <Link key={f.t} href={f.href} onClick={() => playClick()}
                        className="relative w-full no-underline hover:scale-[1.03] active:scale-95 transition"
                        style={{ aspectRatio: '1095 / 1128' }}>{inner}</Link>;
                })}
              </div>
              <p className="mt-2.5 text-center font-black text-white" style={{ fontSize: 'clamp(10px,1.2vw,17px)', textShadow: '0 2px 4px rgba(60,30,0,.85)' }}>
                繼續冒險，收集更多寶物，打造專屬於你的小木屋！🏠
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
                  style={{ left: '12.9%', width: '73.7%', top: '4%', fontSize: 'clamp(10px,1.2vw,18px)', textShadow: '0 1px 2px rgba(55,20,95,.65)' }}>我的單字櫃</p>
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
                  <p className="font-bold text-amber-100/85 leading-none mt-[4%]" style={{ fontSize: 'clamp(8px,0.95vw,14px)', ...SLOT_TXT }}>單字圖鑑</p>
                  <p className="font-black text-amber-50 leading-none mt-[3%]" style={{ fontSize: 'clamp(20px,2.6vw,40px)', ...SLOT_TXT }}>
                    {learned} <span style={{ fontSize: '0.42em' }}>個</span>
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

            </div>
          </div>
      </div>
      {/* 廣告：整頁最下方，不擋內容 */}
      <AdSlot place="cabinBottom" className="pb-6 pt-2" />
    </main>
  );
}

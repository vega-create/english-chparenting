'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HomeButton from '@/components/HomeButton';
import { playClick, playStar } from '@/lib/sfx';
import { loadProgress, islandStats } from '@/lib/missionProgress';

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
        {/* ===== 標題木牌 ===== */}
        <div className="text-center">
          <div className="inline-block rounded-3xl border-[4px] border-amber-900/50 px-8 py-2 shadow-2xl"
            style={{ background: 'linear-gradient(180deg,#f5dfae,#e8c98a)' }}>
            <h1 className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(22px,3.4vw,44px)' }}>
              🏠 我的小屋
            </h1>
          </div>
          {member !== 'guest' && (
            <div className="mt-2">
              <span className={`inline-block rounded-full px-5 py-1 font-black text-white shadow-lg border-2 border-white/60 ${
                isVip ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-indigo-600'
              }`} style={{ fontSize: 'clamp(11px,1.3vw,18px)' }}>
                {isVip ? '💎 冒險會員' : '免費會員'}
              </span>
            </div>
          )}
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
          <div className="mt-5 grid lg:grid-cols-[0.95fr_1.7fr_1fr] gap-3 sm:gap-4 items-start">
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
              {/* 第 1 格：等級 + 經驗條 */}
              <div className="absolute text-center" style={{ left: '12%', width: '76%', top: '52%' }}>
                <p className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(14px,1.85vw,26px)' }}>⭐ LV.{isVip ? 12 : 5}</p>
                <div className="mx-auto mt-[6%] h-[0.55em] w-[86%] rounded-full bg-amber-200 overflow-hidden border border-amber-700/30"
                  style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                  <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: isVip ? '62%' : '46%' }} />
                </div>
              </div>
              {/* 第 2 格：目前關卡 */}
              <div className="absolute text-center" style={{ left: '12%', width: '76%', top: '64.5%' }}>
                <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.9vw,13px)' }}>目前位置</p>
                <p className="font-black text-amber-900 leading-none mt-[4%]" style={{ fontSize: 'clamp(10px,1.2vw,17px)' }}>{isVip ? 'L3 市場街' : 'L1 字母島'}</p>
              </div>
              {/* 第 3 格：已學單字 */}
              <div className="absolute text-center" style={{ left: '12%', width: '76%', top: '73.6%' }}>
                <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.9vw,13px)' }}>已學單字</p>
                <p className="font-black text-amber-900 leading-none mt-[4%]" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                  {learned || (isVip ? 256 : 42)} <span style={{ fontSize: '0.55em' }}>個</span>
                </p>
              </div>
              {/* 第 4 格：連續登入 */}
              <div className="absolute text-center" style={{ left: '12%', width: '76%', top: '82.6%' }}>
                <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.9vw,13px)' }}>連續登入</p>
                <p className="font-black text-orange-600 leading-none mt-[4%]" style={{ fontSize: 'clamp(11px,1.35vw,20px)' }}>{isVip ? 28 : 3} 天 🔥</p>
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

                {/* 左頁：今日學習 */}
                <div className="absolute" style={{ left: '5.5%', width: '36%', top: '16%', bottom: '8%' }}>
                  <p className="font-black text-amber-900 text-center leading-none" style={{ fontSize: 'clamp(10px,1.25vw,18px)' }}>📅 今日學習</p>
                  <div className="mt-[6%] space-y-[3.5%]">
                    {[
                      { i: '📖', t: '故事閱讀', v: '1 本' },
                      { i: '⭐', t: '魔法學習', v: '1 課' },
                      { i: '🧩', t: '拼圖挑戰', v: '1 次' },
                      { i: '✏️', t: '單字練習', v: `${learned || (isVip ? 12 : 8)} 個` },
                      { i: '🎤', t: '發音練習', v: isVip ? '6 句' : '3 句' },
                    ].map(r => (
                      <div key={r.t} className="flex items-center gap-[4%] border-b border-amber-800/15 pb-[2%]">
                        <span style={{ fontSize: 'clamp(11px,1.35vw,20px)' }}>{r.i}</span>
                        <span className="flex-1 font-bold text-amber-800 whitespace-nowrap" style={{ fontSize: 'clamp(8px,1vw,15px)' }}>{r.t}</span>
                        <span className="font-black text-amber-900 whitespace-nowrap" style={{ fontSize: 'clamp(8px,1vw,15px)' }}>{r.v} ✓</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 右頁 3 格 */}
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '14.4%', height: '24.8%' }}>
                  <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>⏱️ 學習時間</p>
                  <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(14px,1.95vw,28px)' }}>{isVip ? 45 : 25} <span style={{ fontSize: '0.55em' }}>分鐘</span></p>
                  <div className="mt-[4%] h-[0.5em] rounded-full bg-amber-200 overflow-hidden border border-amber-800/20" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: isVip ? '75%' : '42%' }} />
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '40.5%', height: '24.8%' }}>
                  <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>✅ 完成任務</p>
                  <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(14px,1.95vw,28px)' }}>{isVip ? 32 : 18} <span style={{ fontSize: '0.5em' }}>/ 40</span></p>
                  <div className="mt-[4%] h-[0.5em] rounded-full bg-amber-200 overflow-hidden border border-amber-800/20" style={{ fontSize: 'clamp(12px,1.5vw,22px)' }}>
                    <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: isVip ? '80%' : '45%' }} />
                  </div>
                </div>
                <div className="absolute flex flex-col justify-center" style={{ left: '51.5%', width: '38%', top: '66.6%', height: '24.8%' }}>
                  <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>🏁 最近完成</p>
                  <p className="font-black text-amber-900 leading-tight mt-[3%]" style={{ fontSize: 'clamp(9px,1.15vw,17px)' }}>
                    {isVip ? 'L3 市場街 · Course 12' : 'L1 字母島 · Course 05'}
                  </p>
                  <p className="font-bold text-amber-700 leading-none mt-[3%]" style={{ fontSize: 'clamp(8px,0.9vw,13px)' }}>{isVip ? 'What Is It?' : 'I to L'}</p>
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

            {/* 右：圖書館 + 每日獎勵 (+升級) */}
            <div className="space-y-3 sm:space-y-4 mx-auto w-full" style={{ maxWidth: 'min(100%, 420px)' }}>
              {/* 我的圖書館（木牌） */}
              <div className="relative w-full" style={{ aspectRatio: '1200 / 382' }}>
                <img src="/images/cabin/banner.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                <div className="absolute flex items-center gap-[4%]" style={{ left: '7%', width: '86%', top: '17%', height: '73%' }}>
                  <span style={{ fontSize: 'clamp(22px,2.9vw,44px)' }}>📖</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-amber-700 leading-none truncate" style={{ fontSize: 'clamp(8px,0.9vw,13px)' }}>我的圖書館</p>
                    <p className="font-black text-amber-900 leading-none mt-[4%] whitespace-nowrap" style={{ fontSize: 'clamp(15px,1.9vw,28px)' }}>
                      {isVip ? 86 : 12} <span style={{ fontSize: '0.45em' }}>本</span>
                    </p>
                  </div>
                  <Link href="/books" onClick={() => playClick()}
                    className="no-underline shrink-0 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 px-[0.9em] py-[0.3em] font-black text-white shadow border-2 border-white/50 active:scale-95 transition whitespace-nowrap"
                    style={{ fontSize: 'clamp(8px,1vw,15px)' }}>查看全部</Link>
                </div>
              </div>

              {/* 每日小獎勵（木牌） */}
              <div className="relative w-full" style={{ aspectRatio: '1200 / 382' }}>
                <img src="/images/cabin/banner.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                <div className="absolute flex items-center gap-[4%]" style={{ left: '7%', width: '86%', top: '17%', height: '73%' }}>
                  <motion.span animate={{ y: [0, -5, 0], scale: [1, 1.06, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                    style={{ fontSize: 'clamp(22px,2.9vw,44px)', display: 'inline-block' }}>🎁</motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-amber-700 leading-none" style={{ fontSize: 'clamp(8px,0.95vw,14px)' }}>每日小獎勵</p>
                    {isVip ? (
                      <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(11px,1.35vw,20px)' }}>⏱ 12:45:33</p>
                    ) : (
                      <p className="font-black text-amber-900 leading-none mt-[3%]" style={{ fontSize: 'clamp(10px,1.2vw,18px)' }}>今天還沒領！</p>
                    )}
                  </div>
                  {isVip ? (
                    <span className="shrink-0 rounded-full bg-amber-200/80 px-[0.9em] py-[0.3em] font-black text-amber-800 border-2 border-amber-700/25 whitespace-nowrap"
                      style={{ fontSize: 'clamp(8px,1vw,15px)' }}>已領取</span>
                  ) : (
                    <button onClick={() => playStar()}
                      className="shrink-0 rounded-full bg-gradient-to-b from-lime-400 to-green-600 px-[0.9em] py-[0.3em] font-black text-white shadow border-2 border-white/60 active:scale-95 transition whitespace-nowrap"
                      style={{ fontSize: 'clamp(8px,1vw,15px)' }}>領取 ❗</button>
                  )}
                </div>
              </div>

              {/* 升級會員（木牌） */}
              {!isVip && (
                <div className="relative w-full" style={{ aspectRatio: '1200 / 382' }}>
                  <img src="/images/cabin/banner.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                  <div className="absolute flex flex-col justify-center" style={{ left: '7%', width: '86%', top: '17%', height: '73%' }}>
                    <p className="font-black text-purple-700 leading-none" style={{ fontSize: 'clamp(10px,1.2vw,17px)' }}>✨ 升級會員</p>
                    <p className="font-bold text-amber-800/85 leading-tight mt-[2%]" style={{ fontSize: 'clamp(6px,0.75vw,11px)' }}>
                      解鎖所有功能與裝飾，享受完整冒險體驗！
                    </p>
                    <button onClick={() => setM('vip')}
                      className="mt-[3%] w-full rounded-full bg-gradient-to-b from-amber-300 to-orange-500 py-[0.25em] font-black text-white shadow border-2 border-white/70 active:scale-95 transition"
                      style={{ fontSize: 'clamp(9px,1.1vw,16px)', textShadow: '0 1px 2px rgba(150,70,0,.5)' }}>立即升級</button>
                  </div>
                </div>
              )}
            </div>

            {/* 下方 6 個功能卡 */}
            <div className="lg:col-span-3">
              {/* 6 個功能：木牌框 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {FEATURES.map(f => {
                  const locked = f.vip && !isVip;
                  return (
                    <div key={f.t} className="relative w-full" style={{ aspectRatio: '1200 / 382' }}>
                      <img src="/images/cabin/banner.webp" alt="" className="absolute inset-0 w-full h-full object-fill" />
                      {f.vip && (
                        <span className="absolute z-10 rounded-full bg-purple-600 px-[0.6em] font-black text-white border border-white/60"
                          style={{ right: '6%', top: '10%', fontSize: 'clamp(7px,0.8vw,11px)' }}>VIP</span>
                      )}
                      <div className="absolute flex items-center gap-[4%]" style={{ left: '7%', width: '86%', top: '17%', height: '73%' }}>
                        <div className="flex items-center justify-center shrink-0" style={{ fontSize: 'clamp(18px,2.4vw,36px)', height: '1.15em' }}>
                          {locked
                            ? <img src="/images/cabin/lock.webp" alt="" className="object-contain h-full w-auto" />
                            : f.icon}
                        </div>
                        <p className="flex-1 min-w-0 font-black text-amber-900 leading-tight truncate"
                          style={{ fontSize: 'clamp(9px,1.1vw,17px)' }}>{f.t}</p>
                        <span className={`shrink-0 rounded-full px-[0.8em] py-[0.25em] font-black text-white border-2 border-white/50 whitespace-nowrap ${
                          locked ? 'bg-purple-600' : 'bg-green-600'
                        }`} style={{ fontSize: 'clamp(7px,0.85vw,12px)' }}>{locked ? 'VIP 解鎖' : '可查看'}</span>
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
        )}
      </div>
    </main>
  );
}

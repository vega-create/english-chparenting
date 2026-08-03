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

/** 羊皮紙面板 */
function Panel({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-3xl border-[3px] border-amber-800/45 shadow-2xl ${className}`}
      style={{ background: 'linear-gradient(180deg,#fdf3d8,#f6e3b8)' }}>
      {title && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 px-4 py-0.5 font-black text-white shadow-lg border-2 border-white/60"
          style={{ fontSize: 'clamp(10px,1.15vw,16px)' }}>{title}</div>
      )}
      <div className={title ? 'pt-5 px-3 pb-3 sm:pt-6 sm:px-4 sm:pb-4' : 'p-3 sm:p-4'}>{children}</div>
    </div>
  );
}

export default function CabinClient() {
  const [member, setMember] = useState<Member>('guest');
  const [p, setP] = useState(() => ({ completed: {} as Record<string, number> }));

  useEffect(() => {
    try {
      const m = localStorage.getItem(KEY) as Member | null;
      if (m === 'free' || m === 'vip') setMember(m);
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
          <div className="mt-6 grid md:grid-cols-[1.4fr_1fr] gap-4 items-start">
            <Panel title="我的小屋可以…">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {PERKS.map(k => (
                  <div key={k.t} className="flex flex-col items-center rounded-2xl bg-amber-50/70 border-2 border-amber-700/20 py-3">
                    <span style={{ fontSize: 'clamp(22px,3vw,40px)' }}>{k.icon}</span>
                    <p className="mt-1 font-black text-amber-900 text-center leading-tight" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>{k.t}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <div className="text-center py-2">
                <div style={{ fontSize: 'clamp(38px,5vw,64px)' }}>🔒</div>
                <p className="font-black text-amber-900 leading-snug mt-2" style={{ fontSize: 'clamp(12px,1.5vw,20px)' }}>
                  登入後即可開啟<br />自己的冒險小屋
                </p>
                <button onClick={() => setM('free')}
                  className="mt-4 w-full rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 py-2.5 font-black text-white shadow-lg border-2 border-white/60 active:scale-95 transition"
                  style={{ fontSize: 'clamp(13px,1.5vw,20px)' }}>登入</button>
                <button onClick={() => setM('free')}
                  className="mt-2 w-full rounded-full bg-gradient-to-b from-sky-400 to-blue-500 py-2.5 font-black text-white shadow-lg border-2 border-white/60 active:scale-95 transition"
                  style={{ fontSize: 'clamp(13px,1.5vw,20px)' }}>免費註冊</button>
              </div>
            </Panel>
            <div className="md:col-span-2 text-center">
              <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-1.5 font-black text-white shadow-lg border-2 border-white/50"
                style={{ fontSize: 'clamp(11px,1.3vw,18px)' }}>🔒 登入或註冊，開啟屬於你的冒險旅程！⭐</span>
            </div>
          </div>
        )}

        {/* ============ 免費 / 付費 ============ */}
        {member !== 'guest' && (
          <div className="mt-5 grid lg:grid-cols-[0.85fr_1.6fr_0.9fr] gap-3 sm:gap-4 items-start">
            {/* 左：角色卡 */}
            <Panel>
              <div className="text-center">
                <div className="mx-auto w-[62%] rounded-full overflow-hidden border-4 border-amber-700/40 bg-gradient-to-b from-sky-200 to-emerald-100">
                  <img src="/characters/coco/coco-wave.png" alt="Coco" className="w-full object-contain" />
                </div>
                <p className="mt-2 inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-0.5 font-black text-white border-2 border-white/50"
                  style={{ fontSize: 'clamp(12px,1.4vw,19px)' }}>Coco</p>
                <p className="mt-2 font-black text-amber-900" style={{ fontSize: 'clamp(15px,2vw,26px)' }}>⭐ LV.{isVip ? 12 : 5}</p>
                <div className="mx-auto mt-1 h-2.5 w-[80%] rounded-full bg-amber-200 overflow-hidden border border-amber-700/25">
                  <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: isVip ? '62%' : '46%' }} />
                </div>
                <p className="mt-0.5 font-bold text-amber-700" style={{ fontSize: 'clamp(8px,0.95vw,13px)' }}>{isVip ? '1250 / 2000' : '230 / 500'}</p>
                <p className="mt-2 font-black text-amber-900" style={{ fontSize: 'clamp(10px,1.15vw,16px)' }}>{isVip ? 'L3 友善小鎮' : '字母島 L1'}</p>
                <Link href="/adventure-map" onClick={() => playClick()}
                  className="mt-2 inline-block no-underline rounded-full bg-gradient-to-b from-sky-400 to-blue-500 px-4 py-1.5 font-black text-white shadow border-2 border-white/60 active:scale-95 transition"
                  style={{ fontSize: 'clamp(10px,1.15vw,16px)' }}>🗺️ 查看冒險地圖</Link>
              </div>
            </Panel>

            {/* 中：冒險日誌 + 成就展示櫃 */}
            <div className="space-y-3 sm:space-y-4">
              <Panel title="冒險日誌">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <p className="font-black text-amber-900 text-center" style={{ fontSize: 'clamp(11px,1.3vw,18px)' }}>今日學習</p>
                    {[
                      { i: '📖', t: '故事閱讀', v: isVip ? '1 篇' : '1 本' },
                      { i: '⭐', t: '魔法學習', v: '1 課' },
                      { i: '🧩', t: '拼圖挑戰', v: '1 次' },
                      { i: '✏️', t: '單字練習', v: `${learned || (isVip ? 12 : 8)} 個` },
                    ].map(r => (
                      <div key={r.t} className="flex items-center gap-2 border-b border-amber-700/15 pb-1">
                        <span style={{ fontSize: 'clamp(12px,1.4vw,20px)' }}>{r.i}</span>
                        <span className="flex-1 font-bold text-amber-800" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>{r.t}</span>
                        <span className="font-black text-amber-900" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>{r.v} ✓</span>
                      </div>
                    ))}
                    <div className="pt-1">
                      <p className="font-black text-amber-900" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>📅 連續登入</p>
                      <p className="font-black text-orange-600" style={{ fontSize: 'clamp(14px,1.9vw,26px)' }}>{isVip ? 28 : 3} 天 {'🔥'.repeat(isVip ? 4 : 2)}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold text-amber-800" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>⏱️ 學習時間</p>
                      <p className="font-black text-amber-900" style={{ fontSize: 'clamp(16px,2.1vw,28px)' }}>{isVip ? 45 : 25} <span style={{ fontSize: '0.6em' }}>分鐘</span></p>
                      <div className="h-2 rounded-full bg-amber-200 overflow-hidden border border-amber-700/20">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: isVip ? '75%' : '42%' }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-amber-800" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>✅ 完成任務</p>
                      <p className="font-black text-amber-900" style={{ fontSize: 'clamp(16px,2.1vw,28px)' }}>{isVip ? 32 : 18} <span style={{ fontSize: '0.55em' }}>/ 40</span></p>
                      <div className="h-2 rounded-full bg-amber-200 overflow-hidden border border-amber-700/20">
                        <div className="h-full bg-gradient-to-r from-lime-400 to-green-500" style={{ width: isVip ? '80%' : '45%' }} />
                      </div>
                    </div>
                    <div className="rounded-xl bg-amber-50/80 border-2 border-amber-700/20 p-2">
                      <p className="font-bold text-amber-700" style={{ fontSize: 'clamp(8px,0.95vw,13px)' }}>最近完成</p>
                      <p className="font-black text-amber-900" style={{ fontSize: 'clamp(10px,1.15vw,16px)' }}>{isVip ? 'Course 12 · What Is It?' : 'Course 05 · I to L'}</p>
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel title="成就展示櫃">
                <div className="grid grid-cols-6 gap-1.5">
                  {TROPHIES.map((t, i) => {
                    const locked = !isVip && i >= 3;
                    return (
                      <div key={t.t} className={`flex flex-col items-center rounded-xl border-2 py-2 ${
                        locked ? 'bg-stone-800/70 border-stone-900/40' : 'bg-amber-50/70 border-amber-700/25'
                      }`}>
                        <span style={{ fontSize: 'clamp(15px,2.1vw,32px)' }}>{locked ? '🔒' : t.icon}</span>
                        {!locked && <span className="font-black text-amber-900" style={{ fontSize: 'clamp(8px,1vw,14px)' }}>{t.n}</span>}
                        <p className={`mt-0.5 font-black text-center leading-tight ${locked ? 'text-stone-300' : 'text-amber-800'}`}
                          style={{ fontSize: 'clamp(6px,0.75vw,11px)' }}>{locked ? 'VIP 解鎖' : t.t}</p>
                      </div>
                    );
                  })}
                </div>
                {!isVip && <p className="mt-2 text-center font-black text-amber-800" style={{ fontSize: 'clamp(8px,0.95vw,13px)' }}>升級會員可解鎖更多成就！</p>}
              </Panel>
            </div>

            {/* 右：圖書館 + 每日獎勵 (+升級) */}
            <div className="space-y-3 sm:space-y-4">
              <Panel title="我的圖書館">
                <div className="text-center">
                  <div style={{ fontSize: 'clamp(28px,3.6vw,52px)' }}>📖</div>
                  <p className="font-bold text-amber-800" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>已閱讀</p>
                  <p className="font-black text-amber-900 leading-none" style={{ fontSize: 'clamp(22px,2.8vw,40px)' }}>{isVip ? 86 : 12} <span style={{ fontSize: '0.45em' }}>本</span></p>
                  <Link href="/books" onClick={() => playClick()}
                    className="mt-2 inline-block no-underline rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 px-4 py-1 font-black text-white shadow border-2 border-white/50 active:scale-95 transition"
                    style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>查看全部</Link>
                </div>
              </Panel>

              <Panel title="每日小獎勵">
                <div className="text-center">
                  <motion.div animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                    style={{ fontSize: 'clamp(30px,4vw,56px)' }}>🎁</motion.div>
                  {isVip ? (
                    <>
                      <p className="font-black text-amber-800 mt-1" style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>明天再來領取吧！</p>
                      <p className="font-black text-amber-900" style={{ fontSize: 'clamp(11px,1.3vw,18px)' }}>⏱ 12:45:33</p>
                    </>
                  ) : (
                    <button onClick={() => playStar()}
                      className="mt-2 rounded-full bg-gradient-to-b from-lime-400 to-green-600 px-5 py-1.5 font-black text-white shadow-lg border-2 border-white/60 active:scale-95 transition"
                      style={{ fontSize: 'clamp(10px,1.2vw,17px)' }}>領取獎勵 ❗</button>
                  )}
                </div>
              </Panel>

              {!isVip && (
                <Panel>
                  <div className="text-center rounded-2xl bg-gradient-to-b from-purple-600 to-indigo-700 p-3 border-2 border-amber-300/70">
                    <p className="font-black text-amber-200" style={{ fontSize: 'clamp(12px,1.5vw,20px)' }}>✨ 升級會員</p>
                    <p className="font-bold text-white/90 leading-snug mt-1" style={{ fontSize: 'clamp(8px,0.95vw,13px)' }}>
                      解鎖所有功能與裝飾，<br />享受完整冒險體驗！
                    </p>
                    <div className="my-2" style={{ fontSize: 'clamp(13px,1.7vw,24px)' }}>🧰 🪑 🎖️ 🐱 💎</div>
                    <button onClick={() => setM('vip')}
                      className="w-full rounded-full bg-gradient-to-b from-amber-300 to-orange-500 py-2 font-black text-white shadow-lg border-2 border-white/70 active:scale-95 transition"
                      style={{ fontSize: 'clamp(12px,1.4vw,20px)', textShadow: '0 1px 2px rgba(150,70,0,.5)' }}>立即升級</button>
                  </div>
                </Panel>
              )}
            </div>

            {/* 下方 6 個功能卡 */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                {FEATURES.map(f => {
                  const locked = f.vip && !isVip;
                  return (
                    <div key={f.t} className={`relative rounded-2xl border-[3px] p-2 text-center shadow-lg ${
                      locked ? 'border-purple-400/60 bg-stone-700/80' : 'border-amber-800/40'
                    }`} style={!locked ? { background: 'linear-gradient(180deg,#fdf3d8,#f6e3b8)' } : undefined}>
                      {f.vip && (
                        <span className="absolute -top-2 right-1 rounded-full bg-purple-600 px-2 font-black text-white border border-white/60"
                          style={{ fontSize: 'clamp(7px,0.8vw,11px)' }}>VIP</span>
                      )}
                      <div style={{ fontSize: 'clamp(20px,2.6vw,38px)' }}>{locked ? '🔒' : f.icon}</div>
                      <p className={`font-black leading-tight mt-1 ${locked ? 'text-stone-200' : 'text-amber-900'}`}
                        style={{ fontSize: 'clamp(9px,1.05vw,15px)' }}>{f.t}</p>
                      <p className={`mt-1 rounded-full py-0.5 font-black text-white ${locked ? 'bg-purple-600' : 'bg-green-600'}`}
                        style={{ fontSize: 'clamp(7px,0.85vw,12px)' }}>{locked ? 'VIP 解鎖' : '可查看'}</p>
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

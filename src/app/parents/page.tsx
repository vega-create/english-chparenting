'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  loadProgress, completedCount, totalStars, currentIsland, getBadges, type Progress,
} from '@/lib/missionProgress';
import { WORLDS, COURSES } from '@/data/courses';
import AutoAds from '@/components/AutoAds';
import ResearchConsent from '@/components/ResearchConsent';
import PlacementPrompt from '@/components/PlacementPrompt';
import LoginNudge from '@/components/LoginNudge';

// 家長補給站
const SUPPLY = [
  { img: '/images/parents/card-guide.webp', t: '使用指南', d: '了解課程特色與使用方式', href: '/guide', btn: 'from-purple-500 to-purple-700' },
  { img: '/images/parents/card-books.webp', t: '推薦書單', d: '精選英文繪本與橋樑書', href: '/books', btn: 'from-green-500 to-green-700' },
  { img: '/images/parents/card-blog.webp', t: '學習攻略', d: '家長必讀的英文學習方法', href: '/blog', btn: 'from-orange-500 to-orange-600' },
  { img: '/images/parents/card-map.webp', t: '學習地圖', d: '看看各島嶼學習重點與對應能力', href: '/adventure-map', btn: 'from-blue-500 to-blue-700' },
];

/**
 * 家長中心。
 *
 * 只顯示**真的有在記的東西**：完成幾課、幾顆星、連續幾天、走到哪座島。
 * 使用時間與五大能力目前沒有追蹤，就標「即將推出」——寫假數字給家長看是最糟的。
 */
export default function ParentsPage() {
  const [p, setP] = useState<Progress>({ completed: {} });
  useEffect(() => {
    const refresh = () => setP(loadProgress());
    refresh();
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  const done = completedCount(p);
  const stars = totalStars(p);
  const streak = p.streak || 0;
  const island = currentIsland(p);
  const badges = getBadges(p);

  // 目前在哪個世界：用已完成課推最高等級，再回推它屬於哪個世界
  const worldIdx = useMemo(() => {
    let maxLevel = 0;
    for (const key of Object.keys(p.completed)) {
      const c = COURSES.find(x => x.slug === key.split('/')[0]);
      if (c && c.level > maxLevel) maxLevel = c.level;
    }
    const i = WORLDS.findIndex(w => w.levels.includes(maxLevel || 1));
    return i < 0 ? 0 : i;
  }, [p]);

  // 下一個目標：本島還差幾課
  const nextGoal = useMemo(() => {
    const c = COURSES.find(x => x.island === island);
    if (!c) return null;
    const doneHere = Object.keys(p.completed).filter(k => k.startsWith(c.slug + '/')).length;
    const left = 20 - doneHere;
    return left > 0 ? { left, island } : null;
  }, [p, island]);

  const STATS = [
    { img: '/images/parents/stat-lessons.webp', val: done, unit: '', label: '課程完成', note: `總共完成 ${done} 課` },
    { img: '/images/parents/stat-stars.webp', val: stars, unit: '', label: '顆星星', note: `總共獲得 ${stars} 顆` },
    { img: '/images/parents/stat-streak.webp', val: streak, unit: '天', label: '連續學習天數', note: streak > 0 ? '保持下去！' : '今天開始吧！' },
  ];

  return (
    <main className="min-h-screen">
      <AutoAds />

      {/* ===== 主視覺 ===== */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 2', maxHeight: '380px' }}>
        <img src="/images/parents/hero-center.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[8%] w-[88%] max-w-[560px] text-center">
          <div className="rounded-2xl border-4 border-amber-900/70 shadow-xl px-4 py-3"
            style={{ background: 'linear-gradient(#e6c08a,#c99a5c)' }}>
            <p className="m-0 text-amber-900/80 font-black tracking-[0.18em] text-[10px] sm:text-xs">PARENT ADVENTURE CENTER</p>
            <h1 className="m-0 font-black text-amber-950 text-lg sm:text-3xl leading-tight whitespace-nowrap">家長冒險中心</h1>
          </div>
          <p className="inline-block mt-2 rounded-full px-4 py-1.5 font-black text-white text-[11px] sm:text-sm shadow-lg"
            style={{ background: 'linear-gradient(#8b5cf6,#6d28d9)', textShadow: '0 1px 2px rgba(50,20,90,.6)' }}>
            看見孩子的每一步成長，陪伴他勇敢向前冒險！
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* ===== 冒險旅程 + 數字 ===== */}
        <section className="-mt-5 relative bg-amber-50/95 backdrop-blur rounded-3xl border-4 border-amber-200 shadow-xl p-3 sm:p-4">
          <h2 className="font-black text-amber-900 text-base sm:text-lg m-0 mb-3">孩子的冒險旅程 ⭐</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center justify-between gap-0.5 min-w-0">
              {WORLDS.map((w, i) => (
                <div key={w.name} className="flex items-center min-w-0">
                  <div className="text-center min-w-0">
                    <div className="relative">
                      <img src={w.image} alt="" className={`w-10 sm:w-14 mx-auto rounded-full object-cover border-2 ${
                        i === worldIdx ? 'border-orange-400' : 'border-amber-200'} ${i > worldIdx ? 'grayscale opacity-50' : ''}`} />
                      {i === worldIdx && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-black text-[8px] rounded-full px-1.5 whitespace-nowrap">進行中</span>
                      )}
                    </div>
                    <p className="m-0 font-black text-amber-900 text-[9px] sm:text-[11px] leading-tight mt-1 whitespace-nowrap">{w.name}</p>
                  </div>
                  {i < WORLDS.length - 1 && <span className="text-amber-400 font-black text-xs px-0.5">→</span>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 lg:w-[340px] shrink-0">
              {STATS.map(s => (
                <div key={s.label} className="bg-white rounded-2xl border-2 border-amber-200 shadow px-2 py-2 text-center">
                  <img src={s.img} alt="" className="w-7 sm:w-9 mx-auto object-contain" />
                  <p className="m-0 font-black text-gray-800 text-lg sm:text-2xl leading-none">{s.val}<span className="text-xs">{s.unit}</span></p>
                  <p className="m-0 font-black text-gray-600 text-[10px] leading-tight">{s.label}</p>
                  <p className="m-0 text-gray-400 font-bold text-[9px] leading-tight mt-0.5">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-4 mt-5">

          {/* ===== 能力成長花園（還沒有資料，誠實標即將推出）===== */}
          <section className="rounded-3xl border-4 border-green-200 bg-green-50/80 shadow-lg p-4 relative overflow-hidden">
            <h2 className="font-black text-green-800 text-base m-0">🌿 能力成長花園</h2>
            <p className="m-0 text-green-700/70 font-bold text-[11px]">聽、說、讀、寫、字彙五大能力成長狀況</p>
            <ul className="mt-3 mb-0 space-y-1.5 list-none pl-0">
              {['Listening 聽力', 'Speaking 口說', 'Reading 閱讀', 'Writing 寫作', 'Vocabulary 字彙'].map(s => (
                <li key={s} className="flex items-center gap-2">
                  <span className="font-black text-green-900/40 text-xs w-32 shrink-0">{s}</span>
                  <span className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map(i => <span key={i} className="opacity-25 text-sm">🌱</span>)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px] flex flex-col items-center justify-center">
              <p className="m-0 font-black text-green-800 text-sm">即將推出</p>
              <p className="m-0 text-green-700/80 font-bold text-[11px] text-center px-6 mt-1">
                需要先幫每一課標上它主要練哪個能力，<br />才算得出來——不想給你估的數字。
              </p>
            </div>
          </section>

          {/* ===== 學習報告 ===== */}
          <section className="rounded-3xl border-4 border-amber-300 bg-amber-50 shadow-lg p-4">
            <h2 className="font-black text-amber-900 text-base m-0 mb-2">📖 學習報告</h2>
            <div className="space-y-1.5">
              {[
                ['📗 完成課程', `${done} 課`],
                ['⭐ 獲得星星', `${stars} 顆`],
                ['🔥 連續學習', `${streak} 天`],
                ['🏆 解鎖徽章', `${badges.filter(b => b.got).length} / ${badges.length}`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between bg-white rounded-xl border border-amber-200 px-3 py-1.5">
                  <span className="font-bold text-gray-600 text-xs">{k}</span>
                  <span className="font-black text-amber-900 text-sm">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-white rounded-xl border border-amber-200 px-3 py-2">
              <p className="m-0 font-black text-amber-800 text-xs">🚩 下一個目標</p>
              <p className="m-0 text-gray-600 font-bold text-[11px] leading-snug mt-0.5">
                {done === 0
                  ? '還沒開始，陪孩子完成第一課吧！'
                  : nextGoal
                    ? `再完成 ${nextGoal.left} 課，就能通關${nextGoal.island}！`
                    : `${island}已經通關，往下一座島出發！`}
              </p>
            </div>
          </section>

          {/* ===== 使用時間（沒有追蹤）===== */}
          <section className="rounded-3xl border-4 border-purple-200 bg-purple-50/80 shadow-lg p-4 relative overflow-hidden">
            <h2 className="font-black text-purple-800 text-base m-0">🕐 健康學習時間</h2>
            <p className="m-0 text-purple-700/70 font-bold text-[11px]">建立好習慣，快樂學習每一天！</p>
            <div className="mt-3 bg-white rounded-xl border border-purple-200 px-3 py-4 text-center">
              <p className="m-0 text-purple-400 font-bold text-[11px]">今天的學習時間</p>
              <p className="m-0 font-black text-purple-300 text-3xl leading-none mt-1">— / — 分鐘</p>
            </div>
            <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px] flex flex-col items-center justify-center">
              <p className="m-0 font-black text-purple-800 text-sm">即將推出</p>
              <p className="m-0 text-purple-700/80 font-bold text-[11px] text-center px-6 mt-1">
                每日時間上限與提醒功能開發中。
              </p>
            </div>
          </section>
        </div>

        {/* ===== 孩子該從哪裡開始 =====
             站上沒有別的地方回答這件事，家長最常問的也是這一題，所以放在家長中心。 */}
        <section className="mt-6 rounded-3xl border-4 border-sky-200 bg-sky-50/80 shadow-lg p-4 sm:p-5">
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="font-black text-sky-800 text-base sm:text-lg m-0">孩子該從哪裡開始？</h2>
            <p className="m-0 text-gray-500 font-bold text-[11px]">不用先問程度，照下面對一下就好</p>
          </div>
          <div className="grid md:grid-cols-3 gap-3 mt-3">
            {[
              { tag: '完全沒學過', from: 'L1 字母島', why: '從 26 個字母的形狀與聲音開始，先認得字母再談其他。', href: '/courses/l1-letter-island/mission/1' },
              { tag: '認得字母，但不會拼', from: 'L2 聲音島', why: '自然發音：看到 c-a-t 能自己拼讀出 cat，是閱讀的關鍵一步。', href: '/courses/l2-sound-island/mission/1' },
              { tag: '會拼、也讀得懂短句', from: 'L3 市場街', why: '進入生活單字與句型，開始用英文講日常的事。', href: '/courses/l3-market-street/mission/1' },
            ].map(x => (
              <Link key={x.tag} href={x.href} className="no-underline">
                <article className="h-full bg-white rounded-2xl border-2 border-sky-200 shadow p-3 hover:shadow-lg hover:-translate-y-0.5 transition">
                  <p className="m-0 inline-block bg-sky-100 text-sky-700 font-black text-[11px] rounded-full px-2 py-0.5">{x.tag}</p>
                  <p className="m-0 font-black text-gray-800 text-base mt-1.5">從 {x.from} 開始</p>
                  <p className="m-0 text-gray-500 font-bold text-[11px] leading-snug mt-1">{x.why}</p>
                </article>
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-500 font-bold text-[11px] mt-3 mb-0">
            還是不確定？<Link href="/placement" className="text-sky-700 font-black underline">做個起點測驗</Link>，10 題 3 分鐘，系統直接告訴你從哪一課開始。
          </p>
        </section>

        {/* ===== 家長補給站 ===== */}
        <section className="mt-6">
          <div className="flex items-baseline gap-2 mb-3">
            <h2 className="font-black text-amber-900 text-base sm:text-lg m-0">家長補給站</h2>
            <p className="m-0 text-gray-500 font-bold text-[11px]">更多資源陪伴孩子，讓學習更有效！</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {SUPPLY.map(s => (
              <Link key={s.t} href={s.href} className="no-underline">
                <article className="h-full bg-amber-50 rounded-2xl border-2 border-amber-200 shadow p-3 text-center hover:shadow-lg hover:-translate-y-0.5 transition">
                  <img src={s.img} alt="" className="w-12 sm:w-16 mx-auto object-contain" />
                  <p className="m-0 font-black text-gray-800 text-[13px] sm:text-sm mt-1">{s.t}</p>
                  <p className="m-0 text-gray-500 font-bold text-[10px] leading-snug mt-0.5">{s.d}</p>
                  <span className={`inline-block mt-2 rounded-full bg-gradient-to-b ${s.btn} text-white font-black text-[10px] px-3 py-1`}>前往查看 →</span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto mt-6"><LoginNudge /><PlacementPrompt /><ResearchConsent /></div>

        <p className="text-center text-xs text-gray-400 mt-6">本平台完全免費，不需要註冊帳號。</p>
      </div>
    </main>
  );
}

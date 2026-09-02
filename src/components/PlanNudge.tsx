'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadProgress, weekStats, daysSinceActive, type Progress } from '@/lib/missionProgress';

/**
 * 鼓勵提醒（Vega 2026-09-02）：進度沒跟上計畫、或好幾天沒來，在冒險地圖底部浮一張小卡。
 * 語氣一定是鼓勵不是催——「今天一課就追上」，不寫「你落後了」。一天最多出現一次（關掉記今天）。
 */
const DISMISS = 'ae_nudge_dismissed';

export default function PlanNudge() {
  const [p, setP] = useState<Progress | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const refresh = () => setP(loadProgress());
    refresh();
    try { setHidden(localStorage.getItem(DISMISS) === new Date().toDateString()); } catch { setHidden(false); }
    window.addEventListener('ae-mission-progress-change', refresh);
    return () => window.removeEventListener('ae-mission-progress-change', refresh);
  }, []);

  if (!p || hidden) return null;
  const w = weekStats(p);
  const idle = daysSinceActive(p);
  let msg = '';
  if (w.behind) msg = w.gap === 1 ? '這週還差 1 課，今天做完就達標了 ✨' : `這週還差 ${w.gap} 課，今天先來一課就追上囉 ✨`;
  else if (!p.plan && idle >= 3 && idle < 999) msg = `${idle} 天沒來冒險了，夥伴們都在等你，今天玩一課吧 🐾`;
  if (!msg) return null;

  const close = () => { try { localStorage.setItem(DISMISS, new Date().toDateString()); } catch {} setHidden(true); };
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,420px)] rounded-2xl bg-white/95 backdrop-blur border-2 border-amber-300 shadow-xl px-4 py-3 flex items-center gap-3 animate-slide-up">
      <img src="/characters/finn/finn-happy.png" alt="" className="w-12 h-12 object-contain shrink-0" />
      <p className="m-0 flex-1 text-sm font-black text-gray-800 leading-snug">{msg}</p>
      <Link href="/adventure-map" onClick={close} className="shrink-0 rounded-full bg-orange-500 text-white text-xs font-black px-3 py-2 no-underline">出發</Link>
      <button onClick={close} aria-label="關閉" className="shrink-0 text-gray-400 text-lg leading-none">×</button>
    </div>
  );
}

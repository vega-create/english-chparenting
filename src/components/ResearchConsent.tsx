'use client';
import { useEffect, useState } from 'react';
import { hasConsent, setConsent } from '@/lib/analytics';
import { playClick } from '@/lib/sfx';

/**
 * 研究資料同意開關（家長中心）。
 * 預設關閉；沒開就完全不記錄任何學習行為。
 */
export default function ResearchConsent() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setOn(hasConsent()); setReady(true); }, []);

  function toggle() {
    playClick();
    const next = !on;
    setOn(next);
    setConsent(next);
  }

  if (!ready) return null;

  return (
    <section className="glass rounded-2xl p-5 my-8 border-2 border-purple-100">
      <h2 className="text-lg font-black text-gray-800 mb-2">📊 學習資料與研究</h2>

      <p className="text-sm text-gray-600 leading-relaxed">
        冒險英語同時是一個<strong className="text-gray-800">研究場域</strong>，
        長期觀察「遊戲化設計如何幫助孩子持續學英文」。
        累積的匿名資料一方面用來把平台做得更好，
        一方面可能整理成研究成果對外發表。
        如果你願意，孩子的學習行為可以匿名納入這項研究。
      </p>

      <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 leading-relaxed">
        <p className="font-bold text-gray-700 mb-1">會記錄什麼</p>
        <p>完成了哪一課、花多少時間、答對答錯、聽了幾次音檔、口說的分數。</p>
        <p className="font-bold text-gray-700 mt-2 mb-1">不會記錄什麼</p>
        <p>
          姓名、email、孩子念出來的聲音內容，都<strong className="text-gray-800">不會</strong>
          存進研究資料。口說只存「分數」，不存說了什麼。
        </p>
        <p className="font-bold text-gray-700 mt-2 mb-1">怎麼辨識是誰</p>
        <p>
          沒登入時只用一組隨機代號認裝置。
          有登入的話，紀錄會連到你的<strong className="text-gray-800">帳號代號</strong>
          （一串亂碼，不是 email），這樣孩子換手機、換平板，學習紀錄才接得起來。
          分析時只看這串代號，不會回頭去對是哪一個帳號。
        </p>
        <p className="font-bold text-gray-700 mt-2 mb-1">發表的時候長什麼樣</p>
        <p>
          只會出現整體統計（例如「平均第三次遇到同一個單字時答對率上升到 80%」），
          不會出現任何一個孩子的個別紀錄。
        </p>
        <p className="font-bold text-gray-700 mt-2 mb-1">你隨時可以關掉</p>
        <p>關掉之後就立刻停止記錄，不影響任何學習功能。</p>
      </div>

      <button
        onClick={toggle}
        className={`mt-3 w-full rounded-full py-2.5 font-black transition active:scale-95 border-2 ${
          on
            ? 'bg-green-500 text-white border-white/60 shadow'
            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
        }`}
      >
        {on ? '✓ 已同意提供匿名學習資料（點此關閉）' : '同意提供匿名學習資料'}
      </button>

      {!on && (
        <p className="mt-2 text-center text-[11px] text-gray-400">
          目前沒有記錄任何學習行為
        </p>
      )}
    </section>
  );
}

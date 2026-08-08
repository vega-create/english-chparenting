'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { setConsent } from '@/lib/analytics';
import { RETENTION_YEARS } from '@/lib/research';

const ASKED_KEY = 'ae_consent_asked';

/**
 * 登入（＝註冊）後問一次研究同意。
 *
 * 為什麼放在登入時而不是進站時：
 *   進站的多半是孩子自己點進來的，問了也不是有效同意；
 *   會走到 Google 登入這一步的是家長，那時候問才算數。
 *
 * 只問一次。不管選同意或不同意都記下來，不再打擾。
 * 之後想改隨時到家長中心。
 */
export default function ConsentGate() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;
    try {
      if (localStorage.getItem(ASKED_KEY)) return;
    } catch { return; }
    setShow(true);
  }, [user]);

  function answer(agree: boolean) {
    try { localStorage.setItem(ASKED_KEY, '1'); } catch {}
    setConsent(agree);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <p className="text-xs font-bold text-purple-500">給家長</p>
        <h2 className="mt-1 text-lg font-black text-gray-800">可以把孩子的學習紀錄用在研究上嗎？</h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          冒險英語同時是一個<strong>研究場域</strong>，長期觀察遊戲化設計怎麼幫助孩子持續學英文。
          累積的資料會用來改善平台，也可能整理成研究成果對外發表。
        </p>

        <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
          <p>
            <strong className="text-gray-700">會記</strong>：完成哪一課、花多少時間、答對答錯、重聽幾次、口說分數。
          </p>
          <p className="mt-1">
            <strong className="text-gray-700">不會記</strong>：姓名、孩子念出來的聲音內容。紀錄只連到一串帳號代號，不是 email。
          </p>
          <p className="mt-1">
            保存最多 {RETENTION_YEARS} 年，發表時只出現整體統計。隨時可以到家長中心關掉或要求刪除。
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={() => answer(false)}
            className="flex-1 rounded-full border-2 border-gray-200 py-2.5 text-sm font-black text-gray-500 active:scale-95">
            先不要
          </button>
          <button onClick={() => answer(true)}
            className="flex-1 rounded-full bg-purple-500 py-2.5 text-sm font-black text-white shadow active:scale-95">
            我同意
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-gray-400">
          選「先不要」完全不影響任何學習功能 ·{' '}
          <Link href="/privacy" className="underline">看完整說明</Link>
        </p>
      </div>
    </div>
  );
}

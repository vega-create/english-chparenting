'use client';
import { useState } from 'react';
import { supa } from '@/lib/supabase';
import { playClick } from '@/lib/sfx';

/**
 * 退出問卷。
 *
 * ⚠️ 設計上最重要的一條：**問卷永遠出現在動作完成之後**。
 *    如果擋在刪除前面問，等於拿資料交換當事人的權利，
 *    這在研究倫理上是脅迫，IRB 會直接退件。
 *    所以呼叫端要先把事情做完（關掉／刪掉），再顯示這個元件。
 *
 * 全部選填。直接關掉視窗也完全沒關係。
 *
 * 研究上的價值：把「流失」從威脅變成資料。
 * 光看數字只知道「有人走了」，退出原因才知道「為什麼走」——
 * 而後者是唯一能直接拿去改產品的東西。
 */

const REASONS = [
  { key: 'too_hard',    label: '對孩子來說太難了' },
  { key: 'too_easy',    label: '太簡單，沒有挑戰性' },
  { key: 'no_interest', label: '孩子沒興趣、玩不下去' },
  { key: 'ads',         label: '廣告讓人不舒服' },
  { key: 'privacy',     label: '不放心提供學習資料' },
  { key: 'no_need',     label: '暫時用不到了' },
  { key: 'bug',         label: '功能有問題（當掉、沒聲音…）' },
  { key: 'other',       label: '其他' },
];

interface Props {
  exitType: 'consent_off' | 'delete';
  /** 退出時的狀態，跟著問卷一起寫入（不含任何身分欄位） */
  context: { events_count?: number | null; lessons_done?: number | null; had_pretest?: boolean; bucket?: string; app_version?: string };
  onClose: () => void;
}

export default function ExitSurvey({ exitType, context, onClose }: Props) {
  const [reason, setReason] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  /**
   * 退出紀錄只在這裡寫，而且**填不填都寫一筆**。
   * 沒填就是 reason = null，還是算一位退出者——
   * 只在有填時才寫的話，流失率會被嚴重低估。
   */
  async function record(withAnswers: boolean) {
    try {
      await supa().from('ae_withdrawals').insert({
        ...context,
        exit_type: exitType,
        reason: withAnswers ? reason : null,
        comment: withAnswers ? (comment.trim() || null) : null,
      });
    } catch { /* 寫不進去也不擋使用者，當事人的權利優先於研究方便 */ }
  }

  async function send() {
    playClick();
    await record(true);
    setSent(true);
    setTimeout(onClose, 1200);
  }

  async function skip() {
    playClick();
    await record(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        {sent ? (
          <div className="py-6 text-center">
            <div className="text-4xl">🙏</div>
            <p className="mt-2 font-black text-gray-800">謝謝你告訴我們</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-black text-gray-800">
              {exitType === 'delete' ? '已經刪除了。' : '已經關掉了。'}
              方便告訴我們原因嗎？
            </p>
            <p className="mt-1 text-xs text-gray-400">
              全部選填，直接關掉也完全沒關係。你的回答只用來改進這個網站。
            </p>

            <div className="mt-4 space-y-1.5">
              {REASONS.map(r => (
                <button key={r.key}
                  onClick={() => { playClick(); setReason(reason === r.key ? null : r.key); }}
                  className={`w-full rounded-xl border-2 px-3 py-2 text-left text-sm transition active:scale-95 ${
                    reason === r.key
                      ? 'border-purple-400 bg-purple-50 font-bold text-purple-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200'
                  }`}>
                  {r.label}
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={2}
              maxLength={300}
              placeholder="想多說一點的話（選填）"
              className="mt-3 w-full rounded-xl border-2 border-gray-200 p-2.5 text-sm text-gray-700 outline-none focus:border-purple-300"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              請不要在這裡填姓名、電話、email 等個人資料。
            </p>

            <div className="mt-4 flex gap-2">
              <button onClick={skip}
                className="flex-1 rounded-full border-2 border-gray-200 py-2.5 text-sm font-black text-gray-400 active:scale-95">
                不用了
              </button>
              <button onClick={send} disabled={!reason && !comment.trim()}
                className="flex-1 rounded-full bg-purple-500 py-2.5 text-sm font-black text-white shadow active:scale-95 disabled:opacity-40">
                送出
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

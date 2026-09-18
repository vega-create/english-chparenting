'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getSyncStatus, retryPendingSync, type SyncStatus as Status } from '@/lib/auth';
import { playClick } from '@/lib/sfx';

/**
 * 家長中心：雲端同步狀態。
 * 有登入才顯示；正常時只有一行「上次同步 HH:MM」，失敗時提示「尚未同步」並可手動再試。
 */
export default function SyncStatus() {
  const { user } = useAuth();
  const [st, setSt] = useState<Status>({ pending: false, lastAt: null, error: null });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const refresh = () => setSt(getSyncStatus());
    refresh();
    window.addEventListener('ae-sync-change', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('ae-sync-change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  if (!user) return null;

  const when = st.lastAt ? new Date(st.lastAt) : null;
  const sameDay = when && when.toDateString() === new Date().toDateString();
  const label = when
    ? (sameDay ? when.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
               : when.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }))
    : '尚未同步過';

  async function retry() {
    playClick();
    setBusy(true);
    await retryPendingSync(user!.id);
    setBusy(false);
  }

  return (
    <div className={`mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-bold ${st.pending ? 'text-amber-700' : 'text-gray-400'}`}>
      {st.pending ? (
        <>
          <span>⚠️ 進度尚未同步到雲端（上次成功：{label}）。恢復連線後會自動重試。</span>
          <button onClick={retry} disabled={busy} className="underline disabled:opacity-50 cursor-pointer">
            {busy ? '同步中…' : '立即重試'}
          </button>
        </>
      ) : (
        <span>☁️ 上次同步：{label}</span>
      )}
    </div>
  );
}

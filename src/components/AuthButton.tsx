'use client';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { playClick } from '@/lib/sfx';

/**
 * 登入／頭像按鈕。
 * 沒登入 → 顯示「登入」；登入後 → 顯示家長頭像，點開可登出。
 * 文案刻意寫「家長登入」，因為這是家長帳號、孩子不需要自己註冊。
 */
export default function AuthButton({ compact = false }: { compact?: boolean }) {
  const { user, loading, signIn, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!user) {
    return (
      <button
        onClick={() => { playClick(); signIn(); }}
        className={`rounded-full bg-white border-2 border-sky-400 text-sky-600 font-black shadow active:scale-95 hover:bg-sky-50 transition ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-5 py-2 text-sm'
        }`}
      >
        家長登入
      </button>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => { playClick(); setOpen(o => !o); }}
        className="flex items-center gap-1.5 rounded-full bg-white/90 border-2 border-purple-200 pl-1 pr-2.5 py-1 shadow active:scale-95 transition">
        {user.avatarUrl
          ? <img src={user.avatarUrl} alt="" className="w-7 h-7 rounded-full" referrerPolicy="no-referrer" />
          : <span className="w-7 h-7 rounded-full bg-purple-500 text-white text-xs font-black flex items-center justify-center">
              {user.name.slice(0, 1)}
            </span>}
        {!compact && <span className="text-xs font-black text-purple-700 max-w-[7rem] truncate">{user.name}</span>}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[80]" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-[81] w-56 rounded-2xl bg-white shadow-2xl border-2 border-purple-100 p-3">
            <p className="text-xs font-black text-gray-700 truncate">{user.name}</p>
            <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
            <p className="mt-2 text-[11px] text-green-600 font-bold">☁️ 進度已同步，換裝置也在</p>
            <button
              onClick={() => { playClick(); setOpen(false); logout(); }}
              className="mt-2.5 w-full rounded-full border-2 border-gray-200 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 active:scale-95 transition"
            >
              登出
            </button>
          </div>
        </>
      )}
    </div>
  );
}

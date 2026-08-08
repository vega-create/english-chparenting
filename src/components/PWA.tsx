'use client';
import { useEffect, useState } from 'react';
import { playClick } from '@/lib/sfx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InstallPrompt = any;

const DISMISS_KEY = 'ae_pwa_dismissed';

/**
 * PWA：註冊 Service Worker，並在支援的裝置上顯示「加到主畫面」提示。
 * 提示只在首頁顯示、關掉之後 30 天內不再出現。
 */
export default function PWA() {
  const [prompt, setPrompt] = useState<InstallPrompt>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // 已經是安裝後開啟的就不用提示
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // 30 天內關過就不再顯示
    try {
      const t = Number(localStorage.getItem(DISMISS_KEY) || 0);
      if (t && Date.now() - t < 30 * 24 * 3600 * 1000) return;
    } catch {}

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
      setTimeout(() => setShow(true), 4000);   // 讓使用者先看到內容再提示
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  function dismiss() {
    playClick();
    setShow(false);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
  }

  async function install() {
    playClick();
    setShow(false);
    if (!prompt) return;
    prompt.prompt();
    try { await prompt.userChoice; } catch {}
    setPrompt(null);
  }

  if (!show || !prompt) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-sm rounded-2xl border-2 border-amber-300 bg-white/95 backdrop-blur p-3 shadow-2xl">
      <div className="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="" className="w-12 h-12 rounded-xl shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-black text-amber-900 text-sm leading-tight">把冒險英語加到主畫面</p>
          <p className="text-[11px] text-gray-500 leading-tight mt-0.5">像 App 一樣打開，全螢幕玩</p>
        </div>
      </div>
      <div className="flex gap-2 mt-2.5">
        <button onClick={dismiss}
          className="flex-1 rounded-full border-2 border-gray-200 py-1.5 text-xs font-bold text-gray-500 active:scale-95 transition">
          以後再說
        </button>
        <button onClick={install}
          className="flex-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-1.5 text-xs font-black text-white shadow active:scale-95 transition">
          加到主畫面
        </button>
      </div>
    </div>
  );
}

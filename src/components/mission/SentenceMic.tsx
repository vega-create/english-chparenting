'use client';
import { useRef, useState } from 'react';
import { playClick, playStar } from '@/lib/sfx';

type Status = 'idle' | 'listening' | 'ok' | 'close' | 'again' | 'unsupported';

/** 只留字母與數字，用來比對念得對不對（忽略標點與大小寫） */
function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

/** 逐字比對，回傳念對的比例 0~1 */
function score(said: string, target: string) {
  const a = norm(said).split(' ').filter(Boolean);
  const b = norm(target).split(' ').filter(Boolean);
  if (!b.length) return 0;
  const pool = [...a];
  let hit = 0;
  for (const w of b) {
    const i = pool.indexOf(w);
    if (i >= 0) { hit++; pool.splice(i, 1); }
  }
  return hit / b.length;
}

/**
 * 句型的錄音鈕：按一下開始錄，念完自動停，比對後給回饋。
 * 用瀏覽器內建語音辨識（Chrome / Safari 支援；不支援時退回「我念完了」）。
 */
export default function SentenceMic({ target, onDone }: { target: string; onDone: () => void }) {
  const [status, setStatus] = useState<Status>('idle');
  const [heard, setHeard] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  function start() {
    if (status === 'listening') { recRef.current?.stop(); return; }
    playClick();
    setHeard('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const API = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!API) { setStatus('unsupported'); onDone(); return; }

    const rec = new API();
    recRef.current = rec;
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setStatus('listening');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript as string;
      setHeard(text);
      const s = score(text, target);
      if (s >= 0.8) { setStatus('ok'); playStar(); }
      else if (s >= 0.5) setStatus('close');
      else setStatus('again');
      onDone();
    };
    rec.onerror = () => { setStatus('again'); onDone(); };
    rec.onend = () => setStatus(st => (st === 'listening' ? 'idle' : st));
    rec.start();
  }

  const label: Record<Status, string> = {
    idle: '🎤 換我念',
    listening: '🔴 錄音中…再按一次結束',
    ok: '⭐ 念得很好！',
    close: '👍 差一點點，再試一次',
    again: '💪 再念一次看看',
    unsupported: '🎤 我念完了',
  };
  const color: Record<Status, string> = {
    idle: 'bg-green-500 hover:bg-green-600',
    listening: 'bg-red-500 animate-pulse',
    ok: 'bg-green-600',
    close: 'bg-amber-500 hover:bg-amber-600',
    again: 'bg-orange-500 hover:bg-orange-600',
    unsupported: 'bg-green-500 hover:bg-green-600',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={start}
        className={`${color[status]} text-white px-6 py-4 rounded-2xl font-bold transition active:scale-95 whitespace-nowrap`}>
        {label[status]}
      </button>
      {heard && (
        <p className="text-xs text-gray-500">
          你念的是：<span className="font-bold text-gray-700">{heard}</span>
        </p>
      )}
    </div>
  );
}

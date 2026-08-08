'use client';
import { useEffect, useRef, useState } from 'react';
import { playClick, playStar } from '@/lib/sfx';

type Status = 'idle' | 'listening' | 'ok' | 'close' | 'again' | 'denied';

/** 只留字母數字，比對時忽略標點與大小寫 */
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
 * 句型錄音鈕。
 *
 * ⚠️ 重點：只有「真的聽到孩子說話」才算完成。
 * 之前的版本在辨識失敗／瀏覽器不支援時也呼叫 onDone，
 * 結果小朋友一按就跳「Great!」，根本沒開口。
 *
 * iOS Safari 多半不支援語音辨識，那種情況改成手動確認的「我念完了」。
 */
export default function SentenceMic({ target, onDone }: { target: string; onDone: () => void }) {
  const [status, setStatus] = useState<Status>('idle');
  const [heard, setHeard] = useState('');
  const [tries, setTries] = useState(0);
  const [supported, setSupported] = useState<boolean | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => { try { recRef.current?.abort?.(); } catch {} };
  }, []);

  function start() {
    if (status === 'listening') { try { recRef.current?.stop(); } catch {} return; }
    playClick();
    setHeard('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const API = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!API) return;

    let got = false;
    const rec = new API();
    recRef.current = rec;
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => setStatus('listening');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      got = true;
      const text = String(e.results[0][0].transcript);
      setHeard(text);
      const s = score(text, target);
      if (s >= 0.75) { setStatus('ok'); playStar(); onDone(); }   // 只有念得夠像才過關
      else if (s >= 0.4) { setStatus('close'); setTries(t => t + 1); }
      else { setStatus('again'); setTries(t => t + 1); }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      // 沒給麥克風權限 → 直接改用手動確認，不要一直卡在這
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
        setStatus('denied');
        return;
      }
      setStatus('again');
      setTries(t => t + 1);   // 沒聽到聲音也算一次嘗試，但不算過關
    };
    rec.onend = () => setStatus(st => (st === 'listening' ? (got ? st : 'again') : st));

    try { rec.start(); } catch { setStatus('again'); }
  }

  // 不支援 or 沒權限：改成孩子自己按「我念完了」
  if (supported === false || status === 'denied') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <button onClick={() => { playStar(); onDone(); }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold transition active:scale-95 whitespace-nowrap">
          🎤 我念完了！
        </button>
        <p className="text-[11px] text-gray-400">
          {status === 'denied' ? '沒有麥克風權限，先用手動確認' : '這個瀏覽器不能自動聽，先用手動確認'}
        </p>
      </div>
    );
  }

  const label: Record<Status, string> = {
    idle: '🎤 換我念',
    listening: '🔴 聽你念…（念完會自動停）',
    ok: '⭐ 念得很好！',
    close: '👍 差一點點，再念一次',
    again: '💪 沒聽清楚，再念一次',
    denied: '',
  };
  const color: Record<Status, string> = {
    idle: 'bg-green-500 hover:bg-green-600',
    listening: 'bg-red-500 animate-pulse',
    ok: 'bg-green-600',
    close: 'bg-amber-500 hover:bg-amber-600',
    again: 'bg-orange-500 hover:bg-orange-600',
    denied: '',
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button onClick={start} disabled={status === 'ok'}
        className={`${color[status]} text-white px-6 py-4 rounded-2xl font-bold transition active:scale-95 whitespace-nowrap disabled:opacity-80`}>
        {label[status]}
      </button>

      {heard && status !== 'ok' && (
        <p className="text-xs text-gray-500">
          聽到你念：<span className="font-bold text-gray-700">{heard}</span>
        </p>
      )}

      {/* 試很多次還是不行就讓他過，不要卡住 */}
      {tries >= 3 && status !== 'ok' && (
        <button onClick={() => { playStar(); onDone(); }}
          className="text-xs text-gray-400 underline">
          先跳過這一句
        </button>
      )}
    </div>
  );
}

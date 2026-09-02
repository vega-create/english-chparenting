'use client';
import { useEffect, useRef, useState } from 'react';
import { playClick, playStar } from '@/lib/sfx';
import { track } from '@/lib/analytics';

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
export default function SentenceMic({ target, onDone, compact = false }: { target: string; onDone: () => void; compact?: boolean }) {
  // compact：電子書內頁用的紫色藥丸（麥克風圈＋要念的句子），字級跟著書寬（cqw）縮放
  const [status, setStatus] = useState<Status>('idle');
  const [heard, setHeard] = useState('');
  const [tries, setTries] = useState(0);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [denyReason, setDenyReason] = useState<string>('');
  const denyHint: Record<string, string> = {
    'not-allowed': '瀏覽器沒開放麥克風給這個網站：點網址列左邊的鎖頭 → 麥克風 → 允許，再按「再試一次」',
    'service-not-allowed': '這個瀏覽器的語音辨識用不了（Safari 請到設定開啟「Siri 與聽寫」；或改用 Chrome）',
    'network': '語音辨識需要網路，請確認連線後再試一次',
    'audio-capture': '找不到麥克風，請確認裝置有麥克風且沒被其他 App 占用',
  };
  const retry = () => { setDenyReason(''); setStatus('idle'); setTries(0); };
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
      // 只記分數，不記孩子說了什麼
      track({ kind: 'speak', item: target, score: Number(s.toFixed(2)), attempt: tries + 1, correct: s >= 0.75 });
      if (s >= 0.75) { setStatus('ok'); playStar(); onDone(); }   // 只有念得夠像才過關
      else if (s >= 0.4) { setStatus('close'); setTries(t => t + 1); }
      else { setStatus('again'); setTries(t => t + 1); }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      // 分清楚是哪一種（Vega 2026-09-02：她明明開了麥克風卻看到「沒有權限」）：
      //  not-allowed         → 瀏覽器沒把麥克風給這個網站（網址列鎖頭→麥克風→允許）
      //  service-not-allowed → 瀏覽器的語音辨識服務不能用（Safari 要開「Siri 與聽寫」、Brave／內嵌瀏覽器不支援）
      //  network             → 語音辨識要連網
      // 三種都改用手動確認，但提示不同，而且可以按「再試一次」，不用重新整理
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed' || e?.error === 'network' || e?.error === 'audio-capture') {
        setDenyReason(e.error);
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
    if (compact) {
      return (
        <div className="flex flex-col items-start gap-[0.8cqw]">
          <button onClick={() => { playStar(); onDone(); }}
            className="flex items-center gap-[2cqw] rounded-full border-[0.4cqw] border-dashed border-green-300 bg-green-100 text-green-700 px-[1cqw] py-[0.8cqw] pr-[3cqw] font-black transition active:scale-95">
            <span className="shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-[3cqw] shadow" style={{ width: '7.2cqw', height: '7.2cqw' }}>🎤</span>
            <span className="text-[3.2cqw] leading-tight text-left">“{target}” 我念完了！</span>
          </button>
          <p className="m-0 text-[2cqw] leading-snug text-gray-500">
            {status === 'denied' ? (denyHint[denyReason] || '麥克風暫時用不了，念完按上面就好') : '這個瀏覽器不能自動聽，念完按上面就好'}
            {status === 'denied' && <button onClick={retry} className="ml-[1cqw] underline text-purple-500 font-bold">再試一次</button>}
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-1.5">
        <button onClick={() => { playStar(); onDone(); }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold transition active:scale-95 whitespace-nowrap">
          🎤 我念完了！
        </button>
        <p className="text-[11px] text-gray-500 text-center max-w-xs">
          {status === 'denied' ? (denyHint[denyReason] || '麥克風暫時用不了，先用手動確認') : '這個瀏覽器不能自動聽，先用手動確認'}
          {status === 'denied' && <button onClick={retry} className="ml-1 underline text-purple-500 font-bold">再試一次</button>}
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

  if (compact) {
    const pillTone: Record<Status, string> = {
      idle: 'bg-purple-100 border-purple-300 text-purple-700',
      listening: 'bg-red-100 border-red-300 text-red-600 animate-pulse',
      ok: 'bg-green-100 border-green-300 text-green-700',
      close: 'bg-amber-100 border-amber-300 text-amber-700',
      again: 'bg-orange-100 border-orange-300 text-orange-700',
      denied: '',
    };
    return (
      <div className="flex flex-col items-start gap-[0.8cqw]">
        <button onClick={start} disabled={status === 'ok'}
          className={`flex items-center gap-[2cqw] rounded-full border-[0.4cqw] border-dashed px-[1cqw] py-[0.8cqw] pr-[3cqw] font-black transition active:scale-95 disabled:opacity-80 ${pillTone[status]}`}>
          <span className={`shrink-0 rounded-full flex items-center justify-center text-white text-[3cqw] shadow ${status === 'listening' ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: '7.2cqw', height: '7.2cqw' }}>🎤</span>
          <span className="text-[3.2cqw] leading-tight text-left">
            {status === 'idle' ? `“${target}”` : label[status].replace(/^\S+\s/, '')}
          </span>
        </button>
        {heard && status !== 'ok' && (
          <p className="m-0 text-[2.1cqw] text-gray-500">聽到你念：<span className="font-bold text-gray-700">{heard}</span></p>
        )}
        {tries >= 3 && status !== 'ok' && (
          <button onClick={() => { playStar(); onDone(); }} className="text-[2.1cqw] text-gray-400 underline">先跳過這一句</button>
        )}
      </div>
    );
  }

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

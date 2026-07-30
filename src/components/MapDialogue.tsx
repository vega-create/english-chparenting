'use client';
import { useState, useEffect, useRef } from 'react';
import { playClick } from '@/lib/sfx';

// 地圖嚮導對話（打字機效果 + 點擊繼續）；之後可換成真正的對話腳本
const LINES = [
  { name: 'Finn', char: 'finn', text: '哈囉！歡迎來到冒險世界～我是探險隊長 Finn！🦊' },
  { name: 'Finn', char: 'finn', text: '點點看地圖上的世界，就能開始你的英語大冒險！' },
  { name: 'Finn', char: 'finn', text: '建議先從「彩虹谷」出發，那裡最適合新手喔 ⭐' },
];

export default function MapDialogue() {
  const [line, setLine] = useState(0);
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const idx = useRef(0);
  const cur = LINES[line];

  // 打字機
  useEffect(() => {
    setShown(''); setDone(false); idx.current = 0;
    const t = setInterval(() => {
      idx.current++;
      setShown(cur.text.slice(0, idx.current));
      if (idx.current >= cur.text.length) { clearInterval(t); setDone(true); }
    }, 45);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  function advance() {
    playClick();
    if (!done) { setShown(cur.text); setDone(true); return; } // 打字中 → 直接顯示整句
    if (line < LINES.length - 1) setLine(line + 1);
    else setHidden(true);
  }

  if (hidden) {
    return (
      <button onClick={() => { playClick(); setHidden(false); setLine(0); }}
        className="fixed bottom-4 left-4 z-40 w-12 h-12 rounded-full bg-white/90 shadow-lg border-2 border-purple-200 text-2xl flex items-center justify-center active:scale-95"
        aria-label="打開對話">💬</button>
    );
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl px-1">
      <div className="relative flex items-end gap-2 cursor-pointer" onClick={advance}>
        <img src={`/characters/${cur.char}/${cur.char}-talk.png`} alt={cur.name}
          className="w-16 h-16 sm:w-24 sm:h-24 object-contain object-bottom drop-shadow-[0_6px_8px_rgba(80,60,120,0.3)] flex-shrink-0 -mb-1" />
        <div className="flex-1 bg-white/95 backdrop-blur rounded-2xl rounded-bl-none border-2 border-purple-200 shadow-xl px-4 py-2.5 sm:py-3">
          <p className="text-[11px] sm:text-xs font-black text-purple-500 mb-0.5">{cur.name}</p>
          <p className="text-sm sm:text-lg font-bold text-gray-800 leading-snug min-h-[2.6em]">
            {shown}<span className={done ? 'hidden' : 'animate-pulse'}>▍</span>
          </p>
          <div className="flex items-center justify-between mt-0.5">
            <div className="flex gap-1">
              {LINES.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === line ? 'w-4 bg-purple-400' : 'w-1.5 bg-gray-300'}`} />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 font-bold">
              {done ? (line < LINES.length - 1 ? '點擊繼續 ▶' : '點擊收起 ✕') : '點擊跳過'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

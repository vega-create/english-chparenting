'use client';
import { useState, useEffect, useRef } from 'react';
import { playClick } from '@/lib/sfx';

// 地圖嚮導對話（打字機 + 點擊繼續）；之後可換成真正的對話腳本
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
    if (!done) { setShown(cur.text); setDone(true); return; }
    if (line < LINES.length - 1) setLine(line + 1);
    else setHidden(true);
  }

  if (hidden) {
    return (
      <button onClick={() => { playClick(); setHidden(false); setLine(0); }}
        className="absolute bottom-1 right-2 w-10 h-10 rounded-full bg-white/90 shadow border-2 border-amber-300 text-xl flex items-center justify-center active:scale-95"
        aria-label="打開對話">💬</button>
    );
  }

  return (
    // 填滿父層（地圖底部橫幅），Finn 站左、文字印在羊皮紙上
    <div className="absolute inset-0 flex items-center gap-2 sm:gap-4 px-[2%] cursor-pointer" onClick={advance}>
      <img src={`/characters/${cur.char}/${cur.char}-talk.png`} alt={cur.name}
        className="w-auto object-contain object-bottom flex-shrink-0 drop-shadow-[0_6px_8px_rgba(80,60,120,0.3)]"
        style={{ height: '128%', alignSelf: 'flex-end' }} />
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[11px] sm:text-sm font-black text-purple-600 mb-0.5">{cur.name}</p>
        <p className="font-black text-amber-950 leading-snug" style={{ fontSize: 'clamp(13px, 1.7vw, 22px)' }}>
          {shown}<span className={done ? 'hidden' : 'animate-pulse'}>▍</span>
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex gap-1">
            {LINES.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === line ? 'w-4 bg-amber-500' : 'w-1.5 bg-amber-800/30'}`} />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-amber-800/70 font-bold ml-auto">
            {done ? (line < LINES.length - 1 ? '點擊繼續 ▶' : '點擊收起 ✕') : '點擊跳過'}
          </span>
        </div>
      </div>
    </div>
  );
}

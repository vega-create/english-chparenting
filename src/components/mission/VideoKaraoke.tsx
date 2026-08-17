'use client';
import { useEffect, useRef, useState } from 'react';
import type { VideoLine } from '@/data/missions';
import { stopAllAudio } from '@/lib/audioBus';

/**
 * 課程影片＋卡拉OK字幕（講到哪、亮到哪）。
 *
 * 字幕資料：跟影片同路徑的 m{n}.words.json（R2），格式
 *   { lines: [{ speaker, zh, words: [{ w, s, e }] }] }
 * 沒有這個檔（404）就只播影片、不顯示字幕——舊影片不會壞。
 *
 * 字幕做在網頁上而不是燒進影片：字可放大、中英雙行、可開關（Vega 定案）。
 */

interface KWord { w: string; s: number; e: number }
interface KLine { speaker: string; zh: string; words: KWord[] }

const SUB_KEY = 'ae-video-subs'; // '0' = 關；預設開

const SPEAKER_COLOR: Record<string, string> = {
  Finn: 'text-red-500', Coco: 'text-pink-500', Polly: 'text-sky-500',
  Benny: 'text-amber-600', Ruby: 'text-fuchsia-500', Vega: 'text-emerald-600',
};

export default function VideoKaraoke({ videoUrl, videoScript, onEnded }: {
  videoUrl: string;
  videoScript?: VideoLine[];
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lines, setLines] = useState<KLine[] | null>(null);
  const [pos, setPos] = useState<{ line: number; word: number }>({ line: -1, word: -1 });
  const [subOn, setSubOn] = useState(true);

  useEffect(() => {
    try { setSubOn(localStorage.getItem(SUB_KEY) !== '0'); } catch {}
  }, []);

  // 抓字幕時間軸；404 就靜默略過
  useEffect(() => {
    let dead = false;
    fetch(videoUrl.replace(/\.mp4(\?.*)?$/, '.words.json'))
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!dead && d?.lines?.length) setLines(d.lines); })
      .catch(() => {});
    return () => { dead = true; };
  }, [videoUrl]);

  function onTime() {
    const v = videoRef.current;
    if (!v || !lines) return;
    const t = v.currentTime;
    for (let li = 0; li < lines.length; li++) {
      const ws = lines[li].words;
      if (!ws.length) continue;
      if (t >= ws[0].s - 0.15 && t <= ws[ws.length - 1].e + 0.35) {
        let wi = ws.length - 1;
        for (let i = 0; i < ws.length; i++) if (t < ws[i].e) { wi = i; break; }
        if (pos.line !== li || pos.word !== wi) setPos({ line: li, word: wi });
        return;
      }
    }
    if (pos.line !== -1) setPos({ line: -1, word: -1 });
  }

  function toggleSubs() {
    const next = !subOn;
    setSubOn(next);
    try { localStorage.setItem(SUB_KEY, next ? '1' : '0'); } catch {}
  }

  const cur = lines && pos.line >= 0 ? lines[pos.line] : null;
  const zhFallback = cur && !cur.zh && videoScript?.[pos.line]?.lineZh;

  return (
    <div>
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full"
          controls
          autoPlay
          src={videoUrl}
          onPlay={() => stopAllAudio()}  // 影片一響就把 Vega 引導語等其他聲音停掉，不疊音
          onTimeUpdate={onTime}
          onEnded={onEnded}
        />
        {/* 開關浮在影片右上角，字幕區才不會被擋（Vega 抓的） */}
        {lines && (
          <button
            onClick={toggleSubs}
            className={`absolute top-2 right-2 z-10 text-[11px] font-black rounded-full px-2.5 py-1 border-2 transition ${
              subOn ? 'bg-purple-500/90 border-purple-400 text-white' : 'bg-white/80 border-gray-300 text-gray-500'
            }`}
            aria-label={subOn ? '關閉字幕' : '開啟字幕'}
          >
            字幕 {subOn ? '開' : '關'}
          </button>
        )}
      </div>
      {lines && (
        <div className="bg-purple-50/70 px-4 pt-3 pb-4 min-h-[76px]">
          {subOn && (cur ? (
            <div className="text-center">
              <p className="m-0 text-lg sm:text-xl font-black leading-relaxed">
                <span className={`mr-2 ${SPEAKER_COLOR[cur.speaker] || 'text-purple-600'}`}>{cur.speaker}</span>
                {cur.words.map((w, i) => (
                  <span
                    key={i}
                    className={`inline-block mx-0.5 rounded px-0.5 transition-colors duration-100 ${
                      i === pos.word ? 'bg-amber-300 text-gray-900' : i < pos.word ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {w.w}
                  </span>
                ))}
              </p>
              <p className="m-0 mt-1 text-sm text-gray-500 font-bold">{cur.zh || zhFallback}</p>
            </div>
          ) : (
            <p className="m-0 text-center text-sm text-gray-300 font-bold pt-3">♪</p>
          ))}
        </div>
      )}
    </div>
  );
}

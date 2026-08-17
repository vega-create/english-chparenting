'use client';
import { useEffect, useState } from 'react';

/**
 * 電子書小動畫：蝴蝶/小鳥/螢火蟲偶爾飛過故事頁（Vega 2026-08-17）。
 *
 * - 純裝飾、pointer-events-none，不擋點擊
 * - 每頁隨機 1 隻、隨機路徑，畫的貼圖跟全站風格一致
 * - 做在共用元件 → 全部 80 課的電子書同步生效
 */

const CRITTERS = [
  '/images/ebook/critters/butterfly-orange.webp',
  '/images/ebook/critters/butterfly-blue.webp',
  '/images/ebook/critters/bird.webp',
  '/images/ebook/critters/firefly.webp',
];

interface Flight {
  img: string;
  top: string;        // 起始高度
  dur: number;        // 飛行秒數
  delay: number;      // 開始前等待
  flip: boolean;      // 反向飛（右到左）
  size: number;       // px
}

export default function StoryCritters({ pageKey }: { pageKey: string | number }) {
  const [flight, setFlight] = useState<Flight | null>(null);

  useEffect(() => {
    // 每次翻頁 55% 機率派一隻，隨機延遲登場，不搶戲
    if (Math.random() > 0.55) { setFlight(null); return; }
    const f: Flight = {
      img: CRITTERS[Math.floor(Math.random() * CRITTERS.length)],
      top: `${12 + Math.random() * 55}%`,
      dur: 7 + Math.random() * 5,
      delay: 1 + Math.random() * 4,
      flip: Math.random() < 0.5,
      size: 34 + Math.random() * 22,
    };
    setFlight(f);
  }, [pageKey]);

  if (!flight) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20" aria-hidden>
      <img
        src={flight.img}
        alt=""
        className="absolute ae-critter"
        style={{
          top: flight.top,
          width: flight.size,
          height: flight.size,
          animationDuration: `${flight.dur}s`,
          animationDelay: `${flight.delay}s`,
          ['--critter-dir' as string]: flight.flip ? '-1' : '1',
          left: flight.flip ? '104%' : '-10%',
        }}
      />
    </div>
  );
}

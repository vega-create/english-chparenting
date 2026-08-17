'use client';
import { isSfxMuted } from '@/lib/sfx';

/**
 * 電子書自然環境音（Vega 定案：要「真的」流水鳥叫，不要合成噪音）。
 *
 * 真實音檔（ElevenLabs 音效引擎生成、無縫循環 20 秒）放 R2 sfx/：
 *   ambience-forest / ambience-stream / ambience-beach
 * 翻書時低音量循環鋪底，離開電子書就停；跟旁白/課文語音互不打架
 * （音量壓在 0.06，語音疊上來也聽得清楚，所以不用進 audioBus 互踩）。
 */

const R2 = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/sfx';

let current: HTMLAudioElement | null = null;
let fadeTimer: ReturnType<typeof setInterval> | null = null;

function fadeTo(a: HTMLAudioElement, target: number, done?: () => void) {
  if (fadeTimer) clearInterval(fadeTimer);
  fadeTimer = setInterval(() => {
    const diff = target - a.volume;
    if (Math.abs(diff) < 0.015) {
      a.volume = target;
      if (fadeTimer) clearInterval(fadeTimer);
      done?.();
      return;
    }
    a.volume += diff > 0 ? 0.015 : -0.015;
  }, 80);
}

/** 依世界選環境音：海洋灣(L5+)聽海浪，其他隨機森林/溪流 */
export function startAmbience(level: number) {
  if (typeof window === 'undefined' || isSfxMuted()) return;
  const name = level >= 5 ? 'ambience-beach' : (Math.random() < 0.5 ? 'ambience-forest' : 'ambience-stream');
  const src = `${R2}/${name}.mp3`;
  if (current && current.src === src && !current.paused) return; // 已在播同一首
  stopAmbience();
  const a = new Audio(src);
  a.loop = true;
  a.volume = 0;
  current = a;
  a.play().then(() => fadeTo(a, 0.06)).catch(() => { current = null; });
}

export function stopAmbience() {
  const a = current;
  current = null;
  if (!a) return;
  fadeTo(a, 0, () => { a.pause(); a.src = ''; });
}

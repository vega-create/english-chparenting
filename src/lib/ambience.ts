'use client';
import { isSfxMuted } from '@/lib/sfx';

/**
 * 電子書自然環境音（Vega 定案：要「真的」流水鳥叫，不要合成噪音；音量若有似無）。
 *
 * 真實音檔（ElevenLabs 音效引擎生成、無縫循環 20 秒）放 R2 sfx/：
 *   ambience-forest / ambience-stream / ambience-wind / ambience-insects / ambience-beach
 * 翻書時低音量循環鋪底，離開電子書就停。
 *
 * ⚠️ 教訓：淡入淡出若共用一支計時器，快速開闔書會互相取消，
 * 留下一條永遠關不掉的水聲循環（Vega 抓的「水聲一直持續」bug）。
 * 所以每個 Audio 各自帶計時器，且 stop 時全部元素都收掉＋1 秒後保底硬停。
 */

const R2 = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/sfx';
const VOLUME = 0.06;

interface Amb { el: HTMLAudioElement; timer: ReturnType<typeof setInterval> | null }
const alive = new Set<Amb>();
let current: Amb | null = null;

function fade(amb: Amb, target: number, done?: () => void) {
  if (amb.timer) clearInterval(amb.timer);
  amb.timer = setInterval(() => {
    const diff = target - amb.el.volume;
    if (Math.abs(diff) < 0.015) {
      amb.el.volume = target;
      if (amb.timer) clearInterval(amb.timer);
      amb.timer = null;
      done?.();
      return;
    }
    amb.el.volume = Math.min(1, Math.max(0, amb.el.volume + (diff > 0 ? 0.015 : -0.015)));
  }, 80);
}

function kill(amb: Amb) {
  fade(amb, 0, () => { amb.el.pause(); amb.el.src = ''; alive.delete(amb); });
  // 保底：一秒後不管淡出到哪都硬停，絕不留背景循環
  setTimeout(() => { amb.el.pause(); amb.el.src = ''; if (amb.timer) clearInterval(amb.timer); alive.delete(amb); }, 1000);
}

/** 依世界選環境音：海洋灣(L5+)聽海浪，其他隨機森林/溪流 */
const AMB_KEY = 'ae_ambience_off';
/** 爸媽可以把背景環境音關掉（記在這台裝置） */
export function isAmbienceOff(): boolean {
  try { return localStorage.getItem(AMB_KEY) === '1'; } catch { return false; }
}
export function setAmbienceOff(off: boolean) {
  try { localStorage.setItem(AMB_KEY, off ? '1' : '0'); } catch {}
  if (off) stopAmbience();
}

export function startAmbience(level: number) {
  if (typeof window === 'undefined' || isSfxMuted() || isAmbienceOff()) return;
  // 風聲、蟲鳴那兩軌在喇叭上聽起來像機器嗡嗡聲（Vega 2026-09-02 反映），只留森林和溪水
  const pool = ['ambience-forest', 'ambience-stream'];
  const name = level >= 5 ? 'ambience-beach' : pool[Math.floor(Math.random() * pool.length)];
  const src = `${R2}/${name}.mp3`;
  if (current && current.el.src === src && !current.el.paused) return; // 已在播同一首
  stopAmbience();
  const el = new Audio(src);
  el.loop = true;
  el.volume = 0;
  const amb: Amb = { el, timer: null };
  alive.add(amb);
  current = amb;
  el.play().then(() => fade(amb, VOLUME)).catch(() => { alive.delete(amb); if (current === amb) current = null; });
}

export function stopAmbience() {
  current = null;
  alive.forEach(kill);
}

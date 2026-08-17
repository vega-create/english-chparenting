// Vega 語音播放系統
// 音檔放在 Cloudflare R2 bucket `adventure-audio`（冒險英語專用，與 learn 站分開）
//   vega/     Vega 旁白、角色台詞、獎勵音效
//   lessons/  課文音檔（之後放這裡）

import { registerAudioChannel, stopOtherChannels } from './audioBus';

const R2_BASE = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/vega';

// 音檔改稿後瀏覽器還是會播舊的（R2 沒帶版本、瀏覽器整份快取住）。
// 每次重錄旁白就把這個數字 +1，網址不同就會重抓。
const AUDIO_V = '7';

// localStorage keys
const MUTE_KEY = 'vega-muted';
const WELCOMED_KEY = 'vega-welcomed';

let currentAudio: HTMLAudioElement | null = null;

export function isMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MUTE_KEY) === '1';
}

export function setMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  if (muted) {
    localStorage.setItem(MUTE_KEY, '1');
    stopVega();
  } else {
    localStorage.removeItem(MUTE_KEY);
  }
}

export function stopVega(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

/**
 * 播放 Vega 音檔
 * @param filename 例如 'world-1-rainbow-valley'（不含 .mp3）
 * @param options.interrupt 是否打斷正在播的（預設 true）
 */
export function playVega(filename: string, options: { interrupt?: boolean } = {}): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (isMuted()) return Promise.resolve();

  const { interrupt = true } = options;
  if (interrupt) { stopVega(); stopOtherChannels('vega'); }
  else if (currentAudio && !currentAudio.paused) return Promise.resolve();

  const audio = new Audio(`${R2_BASE}/${filename}.mp3?v=${AUDIO_V}`);
  currentAudio = audio;
  return new Promise(resolve => {
    audio.onended = () => { currentAudio = null; resolve(); };
    audio.onerror = () => { currentAudio = null; resolve(); };
    audio.play().catch(() => { currentAudio = null; resolve(); });
  });
}

/**
 * 首次訪問播 welcome（用 localStorage 紀錄）
 */
export function playWelcomeIfFirstTime(): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(WELCOMED_KEY)) return;
  localStorage.setItem(WELCOMED_KEY, '1');
  // 延遲 1 秒讓頁面載入完成
  setTimeout(() => playVega('01-welcome'), 1000);
}

/**
 * 隨機鼓勵句（依世界級別）
 */
export function playPraise(level: 'low' | 'mid' | 'high' = 'low'): void {
  const idx = Math.floor(Math.random() * 10) + 1;
  playVega(`praise-${level}-${idx}`);
}

/**
 * 依 mission ID 取得級別 (L1-L2: low, L3-L8: mid, L9-L12: high)
 * mission ID 格式可能是字串 "l1-letter-island" 或數字
 */
export function getLevelFromMissionId(missionId: string | number): 'low' | 'mid' | 'high' {
  const str = String(missionId).toLowerCase();
  const match = str.match(/l?(\d+)/);
  if (!match) return 'low';
  const level = parseInt(match[1], 10);
  if (level <= 2) return 'low';
  if (level <= 8) return 'mid';
  return 'high';
}

// 世界 ID → 音檔名
export const WORLD_AUDIO: Record<string, string> = {
  'rainbow-valley':  'world-1-rainbow-valley',
  'friendly-town':   'world-2-friendly-town',
  'ocean-bay':       'world-3-ocean-bay',
  'story-castle':    'world-4-story-castle',
  'explorer-land':   'world-5-explorer-land',
  'champion-peak':   'world-6-champion-peak',
};

// 島嶼 ID → 音檔名
export const ISLAND_AUDIO: Record<string, string> = {
  'letter':     'island-1-letter',
  'sound':      'island-2-sound',
  'market':     'island-3-market',
  'school':     'island-4-school',
  'coral':      'island-5-coral',
  'lighthouse': 'island-6-lighthouse',
  'grammar':    'island-7-grammar',
  'question':   'island-8-question',
  'time':       'island-9-time',
  'future':     'island-10-future',
  'challenge':  'island-11-challenge',
  'victory':    'island-12-victory',
};

// 角色 ID → Vega 介紹音檔
export const VEGA_INTRO_AUDIO: Record<string, string> = {
  finn:  'vega-intro-finn',
  coco:  'vega-intro-coco',
  polly: 'vega-intro-polly',
  benny: 'vega-intro-benny',
  ruby:  'vega-intro-ruby',
};

// 角色 ID → 自我介紹音檔
export const CHAR_INTRO_AUDIO: Record<string, string> = {
  finn:  'char-finn',
  coco:  'char-coco',
  polly: 'char-polly',
  benny: 'char-benny',
  ruby:  'char-ruby',
};

// 步驟名 → 音檔（low/high 版）
export function stepAudio(step: 'wakeup' | 'discover' | 'challenge' | 'talktime' | 'complete', level: 'low' | 'high' = 'low') {
  return `step-${step}-${level}`;
}

// 獎勵類型 → 音檔
export function rewardAudio(type: string, useEnglish = false) {
  return useEnglish ? `${type}-en` : type;
}

/**
 * 頁面導覽語音：進到該頁時 Vega 說一句。
 * 同一個分頁內每頁只播一次，避免來回切換一直重播。
 */
const PAGE_PLAYED = new Set<string>();
export function playPageIntro(page: string): void {
  if (typeof window === 'undefined') return;
  if (PAGE_PLAYED.has(page)) return;
  PAGE_PLAYED.add(page);
  playVega(`page-${page}`);
}

// 角色關卡口號：進到該步驟時，由負責的角色喊一句
export const CHAR_CUE_AUDIO: Record<string, string> = {
  start:     'finn-go',      // 點「開始」
  listen:    'coco-listen',  // 聽力
  speak:     'polly-speak',  // 口說
  read:      'benny-read',   // 閱讀
  treasure:  'ruby-treasure', // 破關後的寶藏挑戰（Ruby 守這一關）
};

/** L1–L4 用中文版(low)，L5 以上用英文版(high) */
export function audioLangByLevel(level: number): 'low' | 'high' {
  return level <= 4 ? 'low' : 'high';
}

/** 播獎勵音效（依級別自動選中/英文版） */
export function playReward(type: string, level: number): void {
  playVega(rewardAudio(type, level > 4));
}

/**
 * 進首頁的招呼語：第一次來播 01-welcome，之後每天第一次回來播 welcome-back。
 * 兩者互斥（第一次來不會又播「歡迎回來」）。
 */
const BACK_KEY = 'vega-back-date';
export function playGreeting(level = 1): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toDateString();
  const firstEver = !localStorage.getItem(WELCOMED_KEY);
  if (firstEver) {
    localStorage.setItem(WELCOMED_KEY, '1');
    localStorage.setItem(BACK_KEY, today);   // 今天已打過招呼
    setTimeout(() => playVega('01-welcome'), 1000);
    return;
  }
  if (localStorage.getItem(BACK_KEY) === today) return;
  localStorage.setItem(BACK_KEY, today);
  playVega(`welcome-back-${audioLangByLevel(level)}`);
}

registerAudioChannel('vega', stopVega);

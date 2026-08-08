// 逐課學習進度（星數/寶石/單字圖鑑/徽章）。目前存 localStorage；
// 之後接「登入」只要換底層 load/save 兩個函式，頁面與其他邏輯都不用動。
// 設計：只存「已完成的課 + 最佳星數 + 連續天數」，其餘全部由此推導，避免重複計分。
// 註：與既有的 progress.ts（世界解鎖 aeLessonProgress）分開，互不影響。
import { MISSIONS } from '@/data/missions';
import { COURSES } from '@/data/courses';

const KEY = 'ae_mission_progress_v1';

export interface Progress {
  completed: Record<string, number>; // "<courseSlug>/<missionId>" -> 最佳星數
  lastActive?: string;               // YYYY-M-D
  streak?: number;                   // 連續學習天數
}

const EMPTY: Progress = { completed: {} };

// ── 底層存取（未來換登入 API 就改這兩個）──
export function loadProgress(): Progress {
  if (typeof window === 'undefined') return { ...EMPTY };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const p = JSON.parse(raw);
    return { completed: p.completed || {}, lastActive: p.lastActive, streak: p.streak };
  } catch {
    return { ...EMPTY };
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event('ae-mission-progress-change'));
    // 有登入的話由 AuthProvider 接手上傳雲端（用事件解耦，這支檔不相依 auth）
    window.dispatchEvent(new CustomEvent('ae-progress-save', { detail: p }));
  } catch { /* 容量問題忽略 */ }
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// 完成一課時呼叫：記錄最佳星數 + 更新連續天數
export function recordMissionComplete(courseSlug: string, missionId: number, stars: number) {
  const p = loadProgress();
  const key = `${courseSlug}/${missionId}`;
  p.completed[key] = Math.max(p.completed[key] || 0, stars);

  const today = todayStr();
  if (p.lastActive !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yStr = `${y.getFullYear()}-${y.getMonth() + 1}-${y.getDate()}`;
    p.streak = p.lastActive === yStr ? (p.streak || 0) + 1 : 1;
    p.lastActive = today;
  } else if (!p.streak) {
    p.streak = 1;
  }
  saveProgress(p);
}

export function resetMissionProgress() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('ae-mission-progress-change'));
}

// ── 索引（由課程資料建一次）──
const levelToSlug: Record<number, string> = Object.fromEntries(COURSES.map(c => [c.level, c.slug]));
const missionWords: Record<string, string[]> = {};
const islandTotalWords: Record<string, Set<string>> = {};
for (const m of MISSIONS) {
  const slug = levelToSlug[m.level];
  if (!slug) continue;
  const words = (m.words || []).map(w => w.en.toLowerCase());
  missionWords[`${slug}/${m.id}`] = words;
  (islandTotalWords[slug] ||= new Set());
  words.forEach(w => islandTotalWords[slug].add(w));
}

// ── selectors（全部由進度推導）──
export function completedCount(p: Progress): number {
  return Object.keys(p.completed).length;
}
export function totalStars(p: Progress): number {
  return Object.values(p.completed).reduce((a, b) => a + b, 0);
}
export function totalGems(p: Progress): number {
  return completedCount(p) * 10;
}
export function isMissionDone(p: Progress, courseSlug: string, missionId: number): boolean {
  return `${courseSlug}/${missionId}` in p.completed;
}

export function collectedWords(p: Progress): Set<string> {
  const set = new Set<string>();
  for (const key of Object.keys(p.completed)) {
    (missionWords[key] || []).forEach(w => set.add(w));
  }
  return set;
}
export function collectedWordCount(p: Progress): number {
  return collectedWords(p).size;
}

// 各島收集進度：{ slug: { collected, total } }
// collected 只算「該島已完成課」的單字，避免跨島重複字讓沒玩的島也顯示進度。
export function islandStats(p: Progress): Record<string, { collected: number; total: number }> {
  const out: Record<string, { collected: number; total: number }> = {};
  for (const slug of Object.keys(islandTotalWords)) {
    const got = new Set<string>();
    for (const key of Object.keys(p.completed)) {
      if (key.startsWith(slug + '/')) (missionWords[key] || []).forEach(w => got.add(w));
    }
    out[slug] = { collected: got.size, total: islandTotalWords[slug].size };
  }
  return out;
}

function islandCleared(p: Progress, slug: string): boolean {
  const total = MISSIONS.filter(m => levelToSlug[m.level] === slug).length;
  if (!total) return false;
  const done = Object.keys(p.completed).filter(k => k.startsWith(slug + '/')).length;
  return done >= total;
}

export interface Badge { icon: string; name: string; desc: string; got: boolean; }

export function getBadges(p: Progress): Badge[] {
  const count = completedCount(p);
  const words = collectedWordCount(p);
  const hasThreeStar = Object.values(p.completed).some(s => s >= 3);
  const allCleared = COURSES.every(c => islandCleared(p, c.slug));
  return [
    { icon: '🌱', name: '冒險新手', desc: '完成第一課', got: count >= 1 },
    { icon: '⭐', name: '滿星勇者', desc: '一課拿滿 3 顆星', got: hasThreeStar },
    { icon: '🔊', name: '拼讀達人', desc: '通關聲音島', got: islandCleared(p, 'l2-sound-island') },
    { icon: '🛒', name: '生活小達人', desc: '通關市場街', got: islandCleared(p, 'l3-market-street') },
    { icon: '📚', name: '故事讀者', desc: '完成 10 課', got: count >= 10 },
    { icon: '✍️', name: '拼字大師', desc: '收集 50 個單字', got: words >= 50 },
    { icon: '🗺️', name: '半程英雄', desc: '完成 100 課', got: count >= 100 },
    { icon: '💯', name: '單字收藏家', desc: '收集 300 個單字', got: words >= 300 },
    { icon: '🏝️', name: '環島英雄', desc: '通關所有島嶼', got: allCleared },
    { icon: '🎓', name: '畢業勇者', desc: '完成勝利峰大魔王', got: !!p.completed['l12-victory-summit/20'] },
  ];
}

export function currentIsland(p: Progress): string {
  let maxLevel = 0;
  for (const key of Object.keys(p.completed)) {
    const c = COURSES.find(x => x.slug === key.split('/')[0]);
    if (c && c.level > maxLevel) maxLevel = c.level;
  }
  const c = COURSES.find(x => x.level === (maxLevel || 1));
  return c ? c.island : '字母島';
}

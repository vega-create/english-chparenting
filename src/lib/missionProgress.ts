// 逐課學習進度（星數/寶石/單字圖鑑/徽章）。目前存 localStorage；
// 之後接「登入」只要換底層 load/save 兩個函式，頁面與其他邏輯都不用動。
// 設計：只存「已完成的課 + 最佳星數 + 連續天數」，其餘全部由此推導，避免重複計分。
// 註：世界／島嶼／關卡的解鎖（progress.ts）全部從這份進度推導，全站只有這一套進度。
import { MISSIONS } from '@/data/missions';
import { COURSES } from '@/data/courses';

const KEY = 'ae_mission_progress_v1';

export interface Progress {
  completed: Record<string, number>; // "<courseSlug>/<missionId>" -> 最佳星數
  lastActive?: string;               // YYYY-MM-DD（舊資料可能是未補零的 YYYY-M-D，讀取時會轉正）
  streak?: number;                   // 連續學習天數
  guard?: number;                    // 守島戰累計守成次數（登入會同步）
  daily?: DailyTasks;                // 今日任務計數（跨日自動歸零）
  plan?: LearnPlan;                  // 學習計畫（家長設定：每週幾天、每天幾課）
  log?: Record<string, number>;      // 每天新完成的課數（YYYY-MM-DD → n），只留 90 天，算「這週做了幾課」用
}

/** 學習計畫（Vega 2026-09-02）：家長在家長中心設定，用來算本週目標、預計完成日、落後時的鼓勵提醒 */
export interface LearnPlan {
  daysPerWeek: number;   // 每週幾天（3／5／7）
  lessonsPerDay: number; // 每天幾課（1／2）
  since: string;         // 設定日 YYYY-MM-DD
  updatedAt: string;     // ISO，雲端合併時取新的
}

/** 今日任務：只記「哪一天 + 三個計數」，換日就重來。
 *  放在 Progress 裡是刻意的——這樣它跟著既有的雲端同步走，
 *  登入的孩子換裝置也會保留，不必另外開一張表。 */
export interface DailyTasks {
  date: string;   // YYYY-MM-DD
  speak: number;  // 魔法咒語：念完一課的句子
  story: number;  // 故事解謎：讀完一課的故事書
  spell: number;  // 字母拼圖：拼對的新單字
}

export type DailyKind = 'speak' | 'story' | 'spell';

/** 每個任務要做幾次才算完成，跟 tasks 頁上顯示的 ×N 對齊 */
export const DAILY_GOALS: Record<DailyKind, number> = { speak: 2, story: 2, spell: 5 };

const EMPTY: Progress = { completed: {} };

// ── 日期：一律 YYYY-MM-DD（補零），字串比較才會等於日期比較 ──
// 2026-09 以前存的是未補零的 "2026-9-18"，字串比較會把 "2026-9-30" 排在 "2026-10-02" 後面，
// 雲端合併時會挑錯邊。所以：輸出一律補零、讀進來的舊格式先轉正、比較用 parseDay。
export function dayKey(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}
/** 解析 YYYY-MM-DD 或舊的 YYYY-M-D（本地時區、當天 00:00）；壞字串回 null */
export function parseDay(key: string | undefined | null): Date | null {
  if (!key) return null;
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(key.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}
/** 舊格式轉正（"2026-9-8" → "2026-09-08"）；解析不了就原樣回傳 */
export function normalizeDay(key: string): string {
  const d = parseDay(key);
  return d ? dayKey(d) : key;
}
/** 把整份進度裡的日期全部轉成補零格式（讀取時做，之後所有比較都安全） */
export function normalizeProgress(p: Progress): Progress {
  const out: Progress = { ...p, completed: p.completed || {} };
  if (out.lastActive) out.lastActive = normalizeDay(out.lastActive);
  if (out.daily?.date) out.daily = { ...out.daily, date: normalizeDay(out.daily.date) };
  if (out.plan?.since) out.plan = { ...out.plan, since: normalizeDay(out.plan.since) };
  if (out.log) {
    const log: Record<string, number> = {};
    for (const [k, v] of Object.entries(out.log)) {
      const nk = normalizeDay(k);
      log[nk] = Math.max(log[nk] ?? 0, v);   // 同一天新舊兩種寫法都有就取大的
    }
    out.log = log;
  }
  return out;
}

// ── 底層存取（未來換登入 API 就改這兩個）──
export function loadProgress(): Progress {
  if (typeof window === 'undefined') return { ...EMPTY };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const p = JSON.parse(raw);
    return normalizeProgress({ completed: p.completed || {}, lastActive: p.lastActive, streak: p.streak, guard: p.guard, daily: p.daily, plan: p.plan, log: p.log });
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

export function todayStr(): string { return dayKey(new Date()); }

// 完成一課時呼叫：記錄最佳星數 + 更新連續天數
export function recordMissionComplete(courseSlug: string, missionId: number, stars: number) {
  const p = loadProgress();
  const key = `${courseSlug}/${missionId}`;
  const isNew = !p.completed[key];
  p.completed[key] = Math.max(p.completed[key] || 0, stars);

  const today = todayStr();
  // 每天新完成的課數（重玩同一課不算）；只留 90 天
  if (isNew) {
    const log = { ...(p.log || {}) };
    log[today] = (log[today] || 0) + 1;
    const keep = Object.keys(log).sort((a, b) => toDate(b).getTime() - toDate(a).getTime()).slice(0, 90);
    p.log = Object.fromEntries(keep.map(k => [k, log[k]]));
  }
  if (p.lastActive !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    p.streak = p.lastActive === dayKey(y) ? (p.streak || 0) + 1 : 1;
    p.lastActive = today;
  } else if (!p.streak) {
    p.streak = 1;
  }
  saveProgress(p);
}

/**
 * 顯示用的連續天數：lastActive 是今天或昨天才算還在連續中，否則就是 0。
 * 存的 streak 只在完成課時更新，隔了一週沒來，家長中心不該還顯示「連續 5 天」。
 */
export function currentStreak(p: Progress): number {
  if (!p.streak || !p.lastActive) return 0;
  const last = parseDay(p.lastActive);
  if (!last) return 0;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today.getTime() - last.getTime()) / 86400000);
  return diffDays <= 1 ? p.streak : 0;
}

// ── 今日任務 ──
const EMPTY_DAILY = (): DailyTasks => ({ date: todayStr(), speak: 0, story: 0, spell: 0 });

/** 讀今日計數。存的是昨天以前的就當作全新的一天（不寫回，讀取不該有副作用）。 */
export function getDaily(p: Progress): DailyTasks {
  const d = p.daily;
  return d && d.date === todayStr() ? d : EMPTY_DAILY();
}

/** 完成一個動作時 +1。跨日會自動從 0 重新算。 */
export function bumpDaily(kind: DailyKind, by = 1) {
  const p = loadProgress();
  const d = getDaily(p);
  p.daily = { ...d, [kind]: d[kind] + by };
  saveProgress(p);            // 觸發 ae-progress-save → 有登入就上雲
}

/** 三個任務裡完成了幾個（tasks 頁的進度條用） */
export function dailyDoneCount(p: Progress): number {
  const d = getDaily(p);
  return (Object.keys(DAILY_GOALS) as DailyKind[]).filter(k => d[k] >= DAILY_GOALS[k]).length;
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
  return completedCount(p) * 10 + (p.guard || 0) * 5; // 守島每場 +5 寶石（可推導、不怕重複計）
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

/** 徽章分類，成就頁上方的頁籤用。 */
export type BadgeCat = 'learn' | 'explore' | 'collect' | 'final';
export const BADGE_CATS: { key: BadgeCat | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'learn', label: '學習' },
  { key: 'explore', label: '探索' },
  { key: 'collect', label: '收藏' },
  { key: 'final', label: '終極成就' },
];

export interface Badge {
  key: string;          // 對應 /images/badges/ach-<key>.webp
  icon: string;         // 圖還沒好時的備援
  name: string;
  desc: string;
  got: boolean;
  cat: BadgeCat;
  now?: number;         // 還沒拿到時顯示的進度，例如 8 / 10
  need?: number;
  verb?: string;        // Finn 提示用：「再<verb> N <unit>」
  unit?: string;
}

export function getBadges(p: Progress): Badge[] {
  const count = completedCount(p);
  const words = collectedWordCount(p);
  const hasThreeStar = Object.values(p.completed).some(s => s >= 3);
  const clearedIslands = COURSES.filter(c => islandCleared(p, c.slug)).length;
  const allCleared = clearedIslands === COURSES.length;
  return [
    { key: 'rookie', icon: '🌱', name: '冒險新手', desc: '完成第一課', got: count >= 1, cat: 'learn' },
    { key: 'starhero', icon: '⭐', name: '滿星勇者', desc: '一課拿滿 3 顆星', got: hasThreeStar, cat: 'learn' },
    { key: 'phonics', icon: '🔊', name: '拼讀達人', desc: '通關聲音島', got: islandCleared(p, 'l2-sound-island'), cat: 'explore' },
    { key: 'market', icon: '🛒', name: '生活小達人', desc: '通關市場街', got: islandCleared(p, 'l3-market-street'), cat: 'explore' },
    { key: 'reader', icon: '📚', name: '故事讀者', desc: '完成 10 課', got: count >= 10, cat: 'learn', now: count, need: 10, verb: '完成', unit: '課' },
    { key: 'speller', icon: '✍️', name: '拼字大師', desc: '收集 50 個單字', got: words >= 50, cat: 'collect', now: words, need: 50, verb: '收集', unit: '個單字' },
    { key: 'halfway', icon: '🗺️', name: '半程英雄', desc: '完成 100 課', got: count >= 100, cat: 'learn', now: count, need: 100, verb: '完成', unit: '課' },
    { key: 'collector', icon: '💯', name: '單字收藏家', desc: '收集 300 個單字', got: words >= 300, cat: 'collect', now: words, need: 300, verb: '收集', unit: '個單字' },
    { key: 'islands', icon: '🏝️', name: '環島英雄', desc: '通關所有島嶼', got: allCleared, cat: 'explore', now: clearedIslands, need: COURSES.length, verb: '通關', unit: '座島嶼' },
    { key: 'guard1', icon: '🛡️', name: '守島新兵', desc: '守島戰勝利 3 次', got: (p.guard || 0) >= 3, cat: 'explore', now: p.guard || 0, need: 3, verb: '守成', unit: '次' },
    { key: 'guard2', icon: '🛡️', name: '守島騎士', desc: '守島戰勝利 10 次', got: (p.guard || 0) >= 10, cat: 'explore', now: p.guard || 0, need: 10, verb: '守成', unit: '次' },
    { key: 'guard3', icon: '🛡️', name: '守島大將軍', desc: '守島戰勝利 30 次', got: (p.guard || 0) >= 30, cat: 'explore', now: p.guard || 0, need: 30, verb: '守成', unit: '次' },
    { key: 'graduate', icon: '🎓', name: '畢業勇者', desc: '完成勝利峰大魔王', got: !!p.completed['l12-victory-summit/20'], cat: 'final' },
  ];
}

/** 「再解鎖 N 個就能開寶箱」——每 6 枚一個寶箱，湊個看得到的近程目標。 */
export const CHEST_EVERY = 6;
export function nextChestIn(badges: Badge[]): number {
  const got = badges.filter(b => b.got).length;
  return CHEST_EVERY - (got % CHEST_EVERY);
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


// ── 學習計畫 ──
function toDate(key: string): Date { return parseDay(key) ?? new Date(0); }
export const TOTAL_LESSONS = 240;
export const LESSONS_PER_LEVEL = 20;

export function setPlan(daysPerWeek: number, lessonsPerDay: number) {
  const p = loadProgress();
  p.plan = { daysPerWeek, lessonsPerDay, since: p.plan?.since || todayStr(), updatedAt: new Date().toISOString() };
  saveProgress(p);
}
export function clearPlan() {
  const p = loadProgress();
  delete p.plan;
  saveProgress(p);
}

/** 本週（週一起算）做了幾課、目標幾課、到今天為止算不算落後 */
export function weekStats(p: Progress) {
  const now = new Date();
  const dow = (now.getDay() + 6) % 7;            // 週一=0 … 週日=6
  const monday = new Date(now); monday.setDate(now.getDate() - dow); monday.setHours(0, 0, 0, 0);
  let done = 0;
  for (const [k, n] of Object.entries(p.log || {})) if (toDate(k) >= monday) done += n;
  const plan = p.plan;
  const target = plan ? plan.daysPerWeek * plan.lessonsPerDay : 0;
  // 「到今天應該做到幾課」：目標平均攤到 7 天，四捨五入；週一不會一開始就算落後
  const expected = plan ? Math.round(target * (dow + 1) / 7) : 0;
  const todayDone = (p.log || {})[todayStr()] || 0;
  return { done, target, expected, gap: Math.max(0, target - done), behind: !!plan && done < expected && !todayDone, ahead: !!plan && done > expected, daysLeft: 7 - dow, todayDone };
}

/** 依計畫速度預估：目前島嶼剩幾課、幾週後完成；全部 240 課幾週後完成 */
export function planForecast(p: Progress) {
  const plan = p.plan;
  if (!plan) return null;
  const perWeek = Math.max(1, plan.daysPerWeek * plan.lessonsPerDay);
  const doneAll = completedCount(p);
  const island = currentIsland(p);
  const c = COURSES.find(x => x.island === island);
  const doneLevel = c ? Object.keys(p.completed).filter(k => k.startsWith(c.slug + '/')).length : 0;
  const leftLevel = Math.max(0, LESSONS_PER_LEVEL - doneLevel);
  const leftAll = Math.max(0, TOTAL_LESSONS - doneAll);
  const addWeeks = (w: number) => { const d = new Date(); d.setDate(d.getDate() + Math.ceil(w * 7)); return d; };
  const fmt = (d: Date) => (d.getFullYear() !== new Date().getFullYear() ? `${d.getFullYear()}/` : '') + `${d.getMonth() + 1}/${d.getDate()}`;
  return { island, leftLevel, leftAll, perWeek, levelDate: fmt(addWeeks(leftLevel / perWeek)), allDate: fmt(addWeeks(leftAll / perWeek)), allMonths: Math.ceil(leftAll / perWeek / 4.3) };
}

/** 幾天沒來了（0＝今天有來） */
export function daysSinceActive(p: Progress): number {
  const last = parseDay(p.lastActive);
  if (!last) return 999;
  const diff = (new Date().setHours(0, 0, 0, 0) - last.getTime()) / 86400000;
  return Math.max(0, Math.round(diff));
}

'use client';
import { MISSIONS, type Word } from '@/data/missions';

/**
 * 起點測驗（前測）／複測（後測）。
 *
 * 為什麼一定要有：沒有前測就只能說「孩子做了很多題」，沒辦法說「孩子進步了」。
 * 這是整批資料研究價值的一半，補不回來——所以做在孩子開始上課之前。
 *
 * 設計上的三個堅持：
 *   1. **題目固定**：前測後測用完全一樣的 10 題，才做得了配對比較（paired t-test）。
 *      題目是從課程單字裡「用固定算式」挑出來的，不是隨機——同一台裝置、
 *      不同時間、甚至不同人，看到的都是同一份考卷。
 *   2. **跨級距抽樣**：10 題平均分佈在 L1~L12，才量得出程度落在哪裡，
 *      不會全部太簡單（天花板效應）或全部太難（地板效應）。
 *   3. **短**：10 題，五分鐘內做完。太長孩子會亂按，資料反而髒。
 */

export interface PlacementItem {
  id: string;        // 題目 ID，前後測對得起來
  level: number;     // 這題取自第幾級
  en: string;
  answer: string;    // 正確的中文
  options: string[]; // 四選一
}

export interface PlacementResult {
  kind: 'pre' | 'post';
  score: number;
  total: number;
  ms: number;              // 整份測驗花的時間
  at: string;              // ISO 時間
  perItem: { id: string; correct: boolean; ms: number }[];
}

const STORE_KEY = 'ae_placement';

/** FNV-1a，跟 experiment.ts 同一套，確保結果穩定 */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** 從某一級的所有單字裡，用固定算式挑一個 */
function pickWord(level: number, salt: string): Word | null {
  const pool: Word[] = [];
  for (const m of MISSIONS) {
    if (m.level !== level) continue;
    for (const w of m.words) if (w.en && w.zh) pool.push(w);
  }
  if (!pool.length) return null;
  return pool[hash(`${salt}:L${level}`) % pool.length];
}

/** 干擾選項：從其他級距抓中文意思，不跟正解重複 */
function distractors(answer: string, seed: string, n: number): string[] {
  const all: string[] = [];
  for (const m of MISSIONS) for (const w of m.words) if (w.zh && w.zh !== answer) all.push(w.zh);
  const uniq = Array.from(new Set(all));
  const out: string[] = [];
  let k = hash(seed);
  while (out.length < n && uniq.length) {
    k = hash(String(k));
    const c = uniq[k % uniq.length];
    if (!out.includes(c)) out.push(c);
  }
  return out;
}

/**
 * 這份考卷。模組載入時算一次，之後都是同一份。
 * 10 題涵蓋 L1、L2、L3、L4、L5、L6、L8、L9、L10、L12
 *（跳過 7 和 11 是為了拉開難度間距，10 題要蓋 12 級一定得跳）
 */
const LEVELS = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12];

export const PLACEMENT_ITEMS: PlacementItem[] = LEVELS.map((lv, i) => {
  const w = pickWord(lv, 'placement-v1');
  if (!w) return null;
  const opts = [w.zh, ...distractors(w.zh, `opt:${lv}:${w.en}`, 3)];
  // 正解位置也用固定算式決定，不然答案永遠在第一個
  const at = hash(`pos:${lv}:${w.en}`) % 4;
  const shuffled = [...opts];
  [shuffled[0], shuffled[at]] = [shuffled[at], shuffled[0]];
  return {
    id: `p${i + 1}-L${lv}-${w.en}`,
    level: lv,
    en: w.en,
    answer: w.zh,
    options: shuffled,
  };
}).filter(Boolean) as PlacementItem[];

// ── 儲存 ──────────────────────────────────────────────
export function loadResults(): PlacementResult[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch { return []; }
}

export function saveResult(r: PlacementResult) {
  if (typeof window === 'undefined') return;
  const all = [...loadResults(), r];
  try { localStorage.setItem(STORE_KEY, JSON.stringify(all)); } catch {}
}

/** 還沒做過前測 */
export function needsPretest(): boolean {
  return !loadResults().some(r => r.kind === 'pre');
}

/**
 * 可以做後測了嗎。門檻設 20 課：
 * 太早複測學習量不夠、看不出差異；太晚孩子早就流失了。
 */
export const POSTTEST_AFTER = 20;

export function canPosttest(completedLessons: number): boolean {
  const rs = loadResults();
  if (!rs.some(r => r.kind === 'pre')) return false;      // 沒前測就沒有比較基準
  if (completedLessons < POSTTEST_AFTER) return false;
  const lastPost = rs.filter(r => r.kind === 'post').pop();
  if (!lastPost) return true;
  // 每再上 20 課可以再測一次，做成縱貫的多時間點
  const posts = rs.filter(r => r.kind === 'post').length;
  return completedLessons >= POSTTEST_AFTER * (posts + 1);
}

/** 前測 vs 最近一次後測，給家長看的進步幅度 */
export function improvement(): { pre: number; post: number; total: number } | null {
  const rs = loadResults();
  const pre = rs.find(r => r.kind === 'pre');
  const post = rs.filter(r => r.kind === 'post').pop();
  if (!pre || !post) return null;
  return { pre: pre.score, post: post.score, total: pre.total };
}

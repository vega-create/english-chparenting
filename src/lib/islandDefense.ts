'use client';
import { MISSIONS, type Mission } from '@/data/missions';
import { COURSES } from '@/data/courses';
import { loadProgress, saveProgress } from '@/lib/missionProgress';

/**
 * 守島戰（怪獸入侵）——單機版，無帳號無後端。
 *
 * 溫和規則（Vega 定案，跟 PaGamO 的差異）：
 * - 怪獸不搶星星不搶地，答錯不懲罰，只是「還賴著」，明天可再挑戰
 * - 每天全站最多一場；只有「破過的課」會被入侵（本質是複習）
 * - 題目走聽力＋口說（怪獸怕吵，唸英文嚇跑牠）——這是我們的強項
 *
 * 資料分兩層：
 * - 今天的戰場（哪隻怪獸佔哪課）＝只存本機 ae_guard_state，明天過期
 * - 守島累計次數＝存進 Progress.guard，登入後跟星星一起同步雲端
 */

const STATE_KEY = 'ae_guard_state';

export interface GuardState {
  date: string;          // YYYY-M-D，換日重生
  missionKey: string;    // "<courseSlug>/<missionId>"
  monster: number;       // 0=史萊姆 1=小烏雲 2=小蝙蝠
  defended: boolean;
}

export const MONSTERS = [
  { key: 'slime', name: '搗蛋史萊姆', img: '/images/guard/monster-slime.webp' },
  { key: 'cloud', name: '瞌睡小烏雲', img: '/images/guard/monster-cloud.webp' },
  { key: 'bat',   name: '調皮小蝙蝠', img: '/images/guard/monster-bat.webp' },
  { key: 'imp',   name: '毛毛小惡魔', img: '/images/guard/monster-imp.webp' },
];

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** FNV-1a（跟 placement.ts 同款），讓「今天入侵哪課」全站一致且不用存亂數 */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

/** 今天的入侵（沒有破任何課→null）。第一次呼叫時決定並存起來。 */
export function getTodayInvasion(): GuardState | null {
  if (typeof window === 'undefined') return null;
  const today = todayStr();
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      const st = JSON.parse(raw) as GuardState;
      if (st.date === today) return st;
    }
  } catch {}
  const done = Object.keys(loadProgress().completed);
  if (!done.length) return null;
  const h = hash(today);
  const st: GuardState = {
    date: today,
    missionKey: done[h % done.length],
    monster: h % MONSTERS.length,
    defended: false,
  };
  try { localStorage.setItem(STATE_KEY, JSON.stringify(st)); } catch {}
  return st;
}

/** 守島成功：標記今日已守＋累計次數進 Progress（會觸發雲端同步） */
export function recordDefense() {
  const st = getTodayInvasion();
  if (!st || st.defended) return;
  st.defended = true;
  try { localStorage.setItem(STATE_KEY, JSON.stringify(st)); } catch {}
  const p = loadProgress();
  p.guard = (p.guard || 0) + 1;
  saveProgress(p);
}

export function guardCount(): number {
  return loadProgress().guard || 0;
}

/** 被入侵那課的 Mission 與 course（做題目用） */
export function invasionMission(st: GuardState): { mission: Mission; level: number; slug: string } | null {
  const [slug, idStr] = st.missionKey.split('/');
  const course = COURSES.find(c => c.slug === slug);
  if (!course) return null;
  const mission = MISSIONS.find(m => m.level === course.level && m.id === parseInt(idStr, 10));
  return mission ? { mission, level: course.level, slug } : null;
}

/** 出題：從該課單字抽 2 題聽力（播音選中文）＋1 題口說（大聲唸單字） */
export interface GuardQuiz {
  listening: { en: string; answer: string; options: string[] }[];
  speaking: { en: string; zh: string };
}
export function buildQuiz(st: GuardState): GuardQuiz | null {
  const inv = invasionMission(st);
  if (!inv) return null;
  const words = inv.mission.words.filter(w => w.en && w.zh);
  if (words.length < 2) return null;
  const h = hash(st.date + st.missionKey);
  const pick = (n: number) => words[(h + n * 7) % words.length];
  const distinct: typeof words = [];
  for (let i = 0; distinct.length < Math.min(4, words.length) && i < words.length * 2; i++) {
    const w = pick(i);
    if (!distinct.includes(w)) distinct.push(w);
  }
  const zhPool = Array.from(new Set(words.map(w => w.zh)));
  const optionsFor = (ans: string, salt: number) => {
    const opts = [ans];
    for (let i = 0; opts.length < Math.min(4, zhPool.length) && i < zhPool.length * 2; i++) {
      const c = zhPool[(h + salt + i * 13) % zhPool.length];
      if (!opts.includes(c)) opts.push(c);
    }
    // 洗牌（決定性）
    return opts.sort((a, b) => hash(st.date + a) - hash(st.date + b));
  };
  return {
    listening: distinct.slice(0, 2).map((w, i) => ({ en: w.en, answer: w.zh, options: optionsFor(w.zh, i * 31) })),
    speaking: { en: distinct[2 % distinct.length].en, zh: distinct[2 % distinct.length].zh },
  };
}

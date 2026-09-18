// Adventure English 世界／關卡解鎖規則
//
// 全站只有一套進度：ae_mission_progress_v1（missionProgress.ts）。
// 世界完成度、島嶼解鎖、關卡解鎖，全部從「哪些課完成了」推導出來，不另外存任何鍵。
// （舊的 aeLessonProgress / rainbowValleyProgress 已不再使用；留在瀏覽器裡也不會被讀。）
//
// 解鎖規則（全部地圖共用）：
//   1. 完成前一關才解鎖下一關；一座島的第 1 關要前一座島 20 關全破才開
//   2. 家長／起點測驗設定的起始島（ae_start_level）及其之前的島全開
//   3. 世界：第 1 個永遠開；起點通行證涵蓋的一律開；之後「前一個世界兩座島全破」才開下一個
import { COURSES } from "@/data/courses";
import { loadProgress, type Progress } from "./missionProgress";

export const MISSIONS_PER_ISLAND = 20;

export interface WorldIsland {
  id: string;
  name: string;
  nameEn: string;
  courseSlug?: string;     // 對應課程；沒有 = 尚未推出，不計入完成條件
  comingSoon?: boolean;
}

export interface WorldDef {
  id: number;
  name: string;
  nameEn: string;
  level: string;          // "Pre-A1" / "A1" / "A2+" 等
  color: string;          // tailwind gradient
  emoji: string;
  npcLine: string;        // 鎖住時 NPC 對白
  lessons: WorldIsland[]; // 兩座島（＋一個即將推出的關卡）
}

export const WORLDS: WorldDef[] = [
  {
    id: 1,
    name: "彩虹谷",
    nameEn: "Rainbow Valley",
    level: "Pre-A1",
    color: "from-pink-400 to-rose-400",
    emoji: "🌈",
    npcLine: "嗨～這裡是彩虹谷，新手冒險家的起點！從這裡開始你的旅程吧 ✨",
    lessons: [
      { id: "w1-l1", name: "字母島",   nameEn: "Letter Island", courseSlug: "l1-letter-island" },
      { id: "w1-l2", name: "聲音島",   nameEn: "Sound Island",  courseSlug: "l2-sound-island" },
      { id: "w1-l3", name: "彩虹挑戰", nameEn: "Rainbow Challenge", comingSoon: true },
    ],
  },
  {
    id: 2,
    name: "友善小鎮",
    nameEn: "Friendly Town",
    level: "Pre-A1 ~ A1",
    color: "from-green-400 to-emerald-400",
    emoji: "🏡",
    npcLine: "等等！你需要先完成彩虹谷的所有任務，才能來友善小鎮喔～",
    lessons: [
      { id: "w2-l1", name: "市場街",     nameEn: "Market Street", courseSlug: "l3-market-street" },
      { id: "w2-l2", name: "學校路",     nameEn: "School Road",   courseSlug: "l4-school-road" },
      { id: "w2-l3", name: "小鎮派對",   nameEn: "Town Party", comingSoon: true },
    ],
  },
  {
    id: 3,
    name: "海洋灣",
    nameEn: "Ocean Bay",
    level: "A1",
    color: "from-cyan-400 to-blue-400",
    emoji: "🌊",
    npcLine: "海洋灣的浪很大！先在友善小鎮練好基礎，才能來這裡喔 🌊",
    lessons: [
      { id: "w3-l1", name: "珊瑚灘",   nameEn: "Coral Beach",      courseSlug: "l5-coral-beach" },
      { id: "w3-l2", name: "燈塔角",   nameEn: "Lighthouse Cape",  courseSlug: "l6-lighthouse-point" },
      { id: "w3-l3", name: "深海探險", nameEn: "Deep Sea Quest", comingSoon: true },
    ],
  },
  {
    id: 4,
    name: "故事城堡",
    nameEn: "Story Castle",
    level: "A1+",
    color: "from-purple-400 to-violet-400",
    emoji: "🏰",
    npcLine: "城堡的大門上著魔法鎖！先征服海洋灣，鎖才會打開喔 🔮",
    lessons: [
      { id: "w4-l1", name: "魔法門",   nameEn: "Magic Gate",     courseSlug: "l7-grammar-gate" },
      { id: "w4-l2", name: "問題塔",   nameEn: "Question Tower", courseSlug: "l8-question-tower" },
      { id: "w4-l3", name: "故事大廳", nameEn: "Story Hall", comingSoon: true },
    ],
  },
  {
    id: 5,
    name: "探索大陸",
    nameEn: "Discovery Land",
    level: "A2",
    color: "from-orange-400 to-amber-400",
    emoji: "🌍",
    npcLine: "探索大陸藏著古老的祕密！通過故事城堡的考驗才能進入 📜",
    lessons: [
      { id: "w5-l1", name: "時光道",   nameEn: "Time Path",     courseSlug: "l9-time-travel-path" },
      { id: "w5-l2", name: "未來橋",   nameEn: "Future Bridge", courseSlug: "l10-future-bridge" },
      { id: "w5-l3", name: "古文明谷", nameEn: "Ancient Valley", comingSoon: true },
    ],
  },
  {
    id: 6,
    name: "冠軍峰",
    nameEn: "Champion Peak",
    level: "A2+",
    color: "from-rose-400 to-pink-500",
    emoji: "🏆",
    npcLine: "冠軍峰是最後的試煉地！完成探索大陸全部關卡才能挑戰 🏔️",
    lessons: [
      { id: "w6-l1", name: "挑戰場", nameEn: "Challenge Arena", courseSlug: "l11-challenge-arena" },
      { id: "w6-l2", name: "勝利峰", nameEn: "Victory Peak",    courseSlug: "l12-victory-summit" },
      { id: "w6-l3", name: "冠軍試煉", nameEn: "Champion Trial", comingSoon: true },
    ],
  },
];

// ── 島嶼（課程）層級的推導 ──────────────────────────────
const slugToLevel: Record<string, number> = Object.fromEntries(COURSES.map(c => [c.slug, c.level]));
const levelToSlug: Record<number, string> = Object.fromEntries(COURSES.map(c => [c.level, c.slug]));

/** 某座島完成了幾課 */
export function islandDoneCount(p: Progress, courseSlug: string): number {
  let n = 0;
  for (const key of Object.keys(p.completed)) if (key.startsWith(courseSlug + "/")) n++;
  return Math.min(n, MISSIONS_PER_ISLAND);
}

/** 某座島 20 課全破 */
export function isIslandCleared(p: Progress, courseSlug: string): boolean {
  return islandDoneCount(p, courseSlug) >= MISSIONS_PER_ISLAND;
}

/** 某座島能不能玩：第 1 級永遠可以；起點通行證涵蓋的可以；否則要前一座島全破 */
export function isIslandUnlocked(p: Progress, courseSlug: string): boolean {
  const level = slugToLevel[courseSlug];
  if (!level || level <= 1) return true;
  if (level <= getStartLevel()) return true;
  const prev = levelToSlug[level - 1];
  return !!prev && isIslandCleared(p, prev);
}

export type MissionStatus = "completed" | "current" | "locked";

/** 單一關卡的狀態（地圖節點用）。current = 可以玩但還沒完成。 */
export function missionStatus(p: Progress, courseSlug: string, missionId: number): MissionStatus {
  if (`${courseSlug}/${missionId}` in p.completed) return "completed";
  return isMissionUnlocked(p, courseSlug, missionId) ? "current" : "locked";
}

export function isMissionUnlocked(p: Progress, courseSlug: string, missionId: number): boolean {
  const level = slugToLevel[courseSlug];
  if (level && level <= getStartLevel()) return true;        // 起點以前的島全開
  if (missionId <= 1) return isIslandUnlocked(p, courseSlug);
  return `${courseSlug}/${missionId - 1}` in p.completed;
}

/** 這座島「該玩的下一關」：已完成的最大關 + 1（全破就回 20） */
export function nextMissionId(p: Progress, courseSlug: string): number {
  let max = 0;
  for (const key of Object.keys(p.completed)) {
    if (!key.startsWith(courseSlug + "/")) continue;
    const n = parseInt(key.slice(courseSlug.length + 1), 10);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return Math.min(max + 1, MISSIONS_PER_ISLAND);
}

// ── World 狀態 ─────────────────────────────────────────
function prog(p?: Progress): Progress { return p ?? loadProgress(); }

/**
 * 世界完成度：done/total 算「課」（兩座島各 20 課 = 40），
 * isComplete = 兩座島都全破。標「即將推出」的第 3 關不計。
 */
export function getWorldCompletion(worldId: number, p?: Progress): { done: number; total: number; isComplete: boolean } {
  const w = WORLDS.find(x => x.id === worldId);
  if (!w) return { done: 0, total: 0, isComplete: false };
  const pr = prog(p);
  const islands = w.lessons.filter(l => l.courseSlug);
  const done = islands.reduce((n, l) => n + islandDoneCount(pr, l.courseSlug!), 0);
  const total = islands.length * MISSIONS_PER_ISLAND;
  return { done, total, isComplete: islands.length > 0 && islands.every(l => isIslandCleared(pr, l.courseSlug!)) };
}

// === 起點通行證 ===
// 家長選起點（家長中心三張卡）或起點測驗設定後，起點以前的世界「視同解鎖」——
// 只開門、不給星星徽章，孩子隨時可以回頭玩補收集。
const START_KEY = "ae_start_level";

export function getStartLevel(): number {
  if (typeof window === "undefined") return 1;
  const n = parseInt(localStorage.getItem(START_KEY) || "1", 10);
  return Number.isFinite(n) && n >= 1 && n <= 12 ? n : 1;
}

export function setStartLevel(level: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(START_KEY, String(level));
  window.dispatchEvent(new Event("ae-progress-change"));
}

// 每個世界涵蓋 2 個等級（w1=L1-2 … w6=L11-12）
export function startWorldId(): number {
  return Math.ceil(getStartLevel() / 2);
}

// 「已跳過」＝在起點之前、又還沒真的全破的世界（地圖上標示用）
export function isWorldSkipped(worldId: number, p?: Progress): boolean {
  return worldId < startWorldId() && !getWorldCompletion(worldId, p).isComplete;
}

// World 解鎖：第 1 個世界永遠解鎖；起點通行證涵蓋的世界一律解鎖；
// 之後照舊「前一個世界全破才開下一個」。
export function isWorldUnlocked(worldId: number, p?: Progress): boolean {
  if (worldId <= 1) return true;
  if (worldId <= startWorldId()) return true;
  return getWorldCompletion(worldId - 1, p).isComplete;
}

// 目前最新解鎖（最大 id）的世界
export function getCurrentWorldId(p?: Progress): number {
  const pr = prog(p);
  for (let i = WORLDS.length; i >= 1; i--) {
    if (isWorldUnlocked(i, pr)) return i;
  }
  return 1;
}

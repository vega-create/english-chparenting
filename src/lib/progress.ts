// Adventure English 關卡解鎖系統
// localStorage 儲存：
//   aeLessonProgress: { [lessonId: string]: true }  完成的 lesson
// 解鎖邏輯依 lesson 完成狀況推導，不另外存 unlocked。

export interface WorldDef {
  id: number;
  name: string;
  nameEn: string;
  level: string;          // "Pre-A1" / "A1" / "A2+" 等
  color: string;          // tailwind gradient
  emoji: string;
  npcLine: string;        // 鎖住時 NPC 對白
  lessons: { id: string; name: string; nameEn: string }[];
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
      { id: "w1-l1", name: "字母島",   nameEn: "Letter Island" },
      { id: "w1-l2", name: "聲音島",   nameEn: "Sound Island" },
      { id: "w1-l3", name: "彩虹挑戰", nameEn: "Rainbow Challenge" },
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
      { id: "w2-l1", name: "市場街",     nameEn: "Market Street" },
      { id: "w2-l2", name: "學校路",     nameEn: "School Road" },
      { id: "w2-l3", name: "小鎮派對",   nameEn: "Town Party" },
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
      { id: "w3-l1", name: "珊瑚灘",   nameEn: "Coral Beach" },
      { id: "w3-l2", name: "燈塔角",   nameEn: "Lighthouse Cape" },
      { id: "w3-l3", name: "深海探險", nameEn: "Deep Sea Quest" },
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
      { id: "w4-l1", name: "文法門",   nameEn: "Grammar Gate" },
      { id: "w4-l2", name: "問題塔",   nameEn: "Question Tower" },
      { id: "w4-l3", name: "故事大廳", nameEn: "Story Hall" },
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
      { id: "w5-l1", name: "時光道",   nameEn: "Time Path" },
      { id: "w5-l2", name: "未來橋",   nameEn: "Future Bridge" },
      { id: "w5-l3", name: "古文明谷", nameEn: "Ancient Valley" },
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
      { id: "w6-l1", name: "挑戰場", nameEn: "Challenge Arena" },
      { id: "w6-l2", name: "勝利峰", nameEn: "Victory Peak" },
      { id: "w6-l3", name: "冠軍試煉", nameEn: "Champion Trial" },
    ],
  },
];

const LS_KEY = "aeLessonProgress";

// === Lesson 進度 ===
export function getCompletedLessons(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function isLessonComplete(lessonId: string): boolean {
  return !!getCompletedLessons()[lessonId];
}

export function setLessonComplete(lessonId: string, value = true) {
  if (typeof window === "undefined") return;
  const cur = getCompletedLessons();
  if (value) cur[lessonId] = true;
  else delete cur[lessonId];
  localStorage.setItem(LS_KEY, JSON.stringify(cur));
  // 通知聽眾
  window.dispatchEvent(new Event("ae-progress-change"));
}

// === World 狀態 ===
export function getWorldCompletion(worldId: number): { done: number; total: number; isComplete: boolean } {
  const w = WORLDS.find(x => x.id === worldId);
  if (!w) return { done: 0, total: 0, isComplete: false };
  const completed = getCompletedLessons();
  const done = w.lessons.filter(l => completed[l.id]).length;
  return { done, total: w.lessons.length, isComplete: done === w.lessons.length && w.lessons.length > 0 };
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
export function isWorldSkipped(worldId: number): boolean {
  return worldId < startWorldId() && !getWorldCompletion(worldId).isComplete;
}

// World 解鎖：第 1 個世界永遠解鎖；起點通行證涵蓋的世界一律解鎖；
// 之後照舊「前一個世界全破才開下一個」。
export function isWorldUnlocked(worldId: number): boolean {
  if (worldId <= 1) return true;
  if (worldId <= startWorldId()) return true;
  return getWorldCompletion(worldId - 1).isComplete;
}

// 目前最新解鎖（最大 id）的世界
export function getCurrentWorldId(): number {
  for (let i = WORLDS.length; i >= 1; i--) {
    if (isWorldUnlocked(i)) return i;
  }
  return 1;
}

// 全部重置（除錯用）
export function resetProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
  window.dispatchEvent(new Event("ae-progress-change"));
}

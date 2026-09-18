// 兩份進度合併（本機 × 雲端、孩子 × 孩子）。純函式、不碰 supabase，方便單獨測試。
import { normalizeProgress, parseDay, type Progress } from './missionProgress';

/** a 比 b 晚（或一樣）就回 a；解析不了的日期視為最早 */
function laterDay(a?: string, b?: string): string | undefined {
  if (!a) return b;
  if (!b) return a;
  const ta = parseDay(a)?.getTime() ?? -Infinity;
  const tb = parseDay(b)?.getTime() ?? -Infinity;
  return ta >= tb ? a : b;
}

function mergeLog(a?: Record<string, number>, b?: Record<string, number>) {
  if (!a && !b) return undefined;
  const out: Record<string, number> = { ...(a || {}) };
  for (const [k, v] of Object.entries(b || {})) out[k] = Math.max(out[k] ?? 0, v);
  return out;
}

/** 今日任務合併：同一天取各項較大值（同一天在兩台裝置各做了一些）；
 *  不同天只留比較新的那天，舊的直接丟掉（過了就是過了，不該累加）。 */
function mergeDaily(a?: Progress['daily'], b?: Progress['daily']): Progress['daily'] {
  if (!a) return b;
  if (!b) return a;
  if (a.date !== b.date) return laterDay(a.date, b.date) === a.date ? a : b;
  return {
    date: a.date,
    speak: Math.max(a.speak, b.speak),
    story: Math.max(a.story, b.story),
    spell: Math.max(a.spell, b.spell),
  };
}

/**
 * 合併規則：同一課取星數高的；連續天數取大的；lastActive 取「日期」較晚的
 * （用日期解析比，不用字串比——舊資料 "2026-9-30" 字串上會大於 "2026-10-02"）。
 * 兩邊先各自轉成補零格式，合併結果也一律是補零格式。
 */
export function mergeProgress(rawA: Progress, rawB: Progress): Progress {
  const a = normalizeProgress(rawA);
  const b = normalizeProgress(rawB);
  const completed = { ...a.completed };
  for (const [k, v] of Object.entries(b.completed ?? {})) {
    completed[k] = Math.max(completed[k] ?? 0, v);
  }
  const guard = Math.max(a.guard ?? 0, b.guard ?? 0);
  return {
    guard,
    completed,
    lastActive: laterDay(a.lastActive, b.lastActive),
    streak: Math.max(a.streak ?? 0, b.streak ?? 0),
    daily: mergeDaily(a.daily, b.daily),
    // 學習計畫：取最後改的那份；每日完成數：同一天取大的
    plan: !a.plan ? b.plan : !b.plan ? a.plan : (a.plan.updatedAt > b.plan.updatedAt ? a.plan : b.plan),
    log: mergeLog(a.log, b.log),
  };
}

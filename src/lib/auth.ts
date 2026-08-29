'use client';
import type { User } from '@supabase/supabase-js';
import { supa } from './supabase';
import { type Progress } from './missionProgress';
import { ensureKids, kidProgress, replaceKids, activeKid, setKidProgress, type Kid } from './kids';

/**
 * 登入＝進度同步（不涉及付費）。
 *
 * 設計原則：
 * - 沒登入也能完整玩，進度存 localStorage
 * - 登入後把本機每個孩子的進度合併上雲端（ae_kids 表，一個孩子一列），之後換裝置都拿得到
 * - 合併規則：同一課取「星數比較高」的那筆，不會因為換裝置就倒退
 * - 舊版單一進度表 ae_progress：第一次同步時搬進第一個孩子，之後不再寫
 */

export type AuthUser = { id: string; email: string; name: string; avatarUrl: string };

export function toAuthUser(u: User | null): AuthUser | null {
  if (!u) return null;
  const m = (u.user_metadata ?? {}) as Record<string, string>;
  return {
    id: u.id,
    email: u.email ?? '',
    name: m.full_name || m.name || (u.email ?? '').split('@')[0] || '家長',
    avatarUrl: m.avatar_url || m.picture || '',
  };
}

export async function getUser(): Promise<AuthUser | null> {
  const { data } = await supa().auth.getUser();
  return toAuthUser(data.user ?? null);
}

/** Google 登入（家長帳號）。登入後導回原本那一頁。 */
export async function signInWithGoogle(redirectPath?: string) {
  const to = redirectPath || (typeof window !== 'undefined' ? window.location.pathname : '/home');
  await supa().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${to}`,
      queryParams: { prompt: 'select_account' },
    },
  });
}

export async function signOut() {
  await supa().auth.signOut();
}

// ── 進度合併 ──────────────────────────────────────────────

/** 兩份進度合併：同一課取星數高的；連續天數取大的 */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const completed = { ...a.completed };
  for (const [k, v] of Object.entries(b.completed ?? {})) {
    completed[k] = Math.max(completed[k] ?? 0, v);
  }
  const guard = Math.max(a.guard ?? 0, b.guard ?? 0);
  const pick = (x?: string, y?: string) => (!x ? y : !y ? x : x > y ? x : y);
  return {
    guard,
    completed,
    lastActive: pick(a.lastActive, b.lastActive),
    streak: Math.max(a.streak ?? 0, b.streak ?? 0),
    daily: mergeDaily(a.daily, b.daily),
  };
}

/** 今日任務合併：同一天取各項較大值（同一天在兩台裝置各做了一些）；
 *  不同天只留比較新的那天，舊的直接丟掉（過了就是過了，不該累加）。 */
function mergeDaily(a?: Progress['daily'], b?: Progress['daily']): Progress['daily'] {
  if (!a) return b;
  if (!b) return a;
  if (a.date !== b.date) return a.date > b.date ? a : b;
  return {
    date: a.date,
    speak: Math.max(a.speak, b.speak),
    story: Math.max(a.story, b.story),
    spell: Math.max(a.spell, b.spell),
  };
}

type KidRow = { id: string; name: string; avatar: string | null; data: Progress; created_at: string };
type LegacyRow = { kid_name: string | null; avatar: string | null; data: Progress };

/**
 * 登入後呼叫：本機孩子 × 雲端孩子 合併，兩邊都更新成合併結果。
 * - 同 id：進度合併、名字/頭像以雲端為準（除非雲端是預設名）
 * - 只在雲端：加進本機（換裝置第一次登入就是這情況）
 * - 只在本機：上傳
 * - 雲端完全沒有 ae_kids、但有舊 ae_progress：併進「目前正在玩的孩子」
 */
export async function syncKids(userId: string): Promise<void> {
  const local = ensureKids();
  const { data: rows, error } = await supa()
    .from('ae_kids')
    .select('id, name, avatar, data, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .returns<KidRow[]>();
  if (error) return;                              // 讀不到就先用本機的，不要擋住使用

  const cloud = rows ?? [];
  const merged = new Map<string, { kid: Kid; data: Progress }>();

  for (const k of local.kids) merged.set(k.id, { kid: { ...k }, data: kidProgress(k.id) });
  for (const r of cloud) {
    const cur = merged.get(r.id);
    if (cur) {
      cur.data = mergeProgress(cur.data, r.data ?? { completed: {} });
      if (r.name && r.name !== '小冒險家') cur.kid.name = r.name;
      if (r.avatar) cur.kid.avatar = r.avatar;
    } else {
      merged.set(r.id, {
        kid: { id: r.id, name: r.name || '小冒險家', avatar: r.avatar ?? null, createdAt: r.created_at },
        data: r.data ?? { completed: {} },
      });
    }
  }

  // 舊版單一進度（第一次升級才會用到）
  if (!cloud.length) {
    const { data: legacy } = await supa()
      .from('ae_progress').select('kid_name, avatar, data').eq('user_id', userId).maybeSingle<LegacyRow>();
    if (legacy?.data) {
      const act = merged.get(local.active)!;
      act.data = mergeProgress(act.data, legacy.data);
      if (legacy.kid_name && act.kid.name === '小冒險家') act.kid.name = legacy.kid_name;
      if (legacy.avatar && !act.kid.avatar) act.kid.avatar = legacy.avatar;
    }
  }

  // 寫回本機（先換清單，再逐一寫進度）
  const kids = [...merged.values()].map(x => x.kid);
  replaceKids(kids, local.active);
  for (const [id, x] of merged) setKidProgress(id, x.data);

  // 上雲
  await supa().from('ae_kids').upsert(
    [...merged.values()].map(x => ({ id: x.kid.id, user_id: userId, name: x.kid.name, avatar: x.kid.avatar, data: x.data })),
    { onConflict: 'id' },
  );
}

/** 進度變動時上傳「正在玩的孩子」（失敗不影響遊戲，下次登入還會再合併一次） */
export async function pushProgress(userId: string, p: Progress) {
  try {
    const k = activeKid();
    await supa().from('ae_kids').upsert({ id: k.id, user_id: userId, name: k.name, avatar: k.avatar, data: p }, { onConflict: 'id' });
  } catch {
    /* 靜默失敗：孩子不該因為網路問題被打斷 */
  }
}

/** 刪除孩子時同步刪雲端那一列 */
export async function deleteKidCloud(userId: string, kidId: string) {
  try { await supa().from('ae_kids').delete().eq('user_id', userId).eq('id', kidId); } catch { /* */ }
}

// 舊名稱相容（其他檔案若還引用）
export const syncProgress = syncKids;

'use client';
import type { User } from '@supabase/supabase-js';
import { supa } from './supabase';
import { loadProgress, type Progress } from './missionProgress';
import { mergeProgress } from './progressMerge';
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
// 純函式放在 progressMerge.ts（不碰 supabase，可單獨測）；這裡 re-export 給既有引用
export { mergeProgress } from './progressMerge';

// ── 同步狀態（家長中心顯示「上次同步」；失敗時標記待重試）──────────
// 雲端寫入失敗不會打斷孩子，但也不能靜默：記一個旗標，恢復連線或下次載入時再送一次。
const PENDING_KEY = 'ae_sync_pending';      // '1' = 有一次上傳沒成功
const LAST_KEY = 'ae_sync_last';            // ISO：最後一次成功同步時間
const ERROR_KEY = 'ae_sync_error';          // 最後一次失敗的訊息（顯示用）
const DELETE_PENDING_KEY = 'ae_kid_delete_pending';  // JSON string[]：雲端刪除沒成功、待重試的孩子 id

export interface SyncStatus { pending: boolean; lastAt: string | null; error: string | null }

export function getSyncStatus(): SyncStatus {
  if (typeof window === 'undefined') return { pending: false, lastAt: null, error: null };
  try {
    return {
      pending: localStorage.getItem(PENDING_KEY) === '1' || pendingDeletes().length > 0,
      lastAt: localStorage.getItem(LAST_KEY),
      error: localStorage.getItem(ERROR_KEY),
    };
  } catch { return { pending: false, lastAt: null, error: null }; }
}

function markSynced() {
  try {
    localStorage.setItem(LAST_KEY, new Date().toISOString());
    localStorage.removeItem(PENDING_KEY);
    localStorage.removeItem(ERROR_KEY);
  } catch { /* ignore */ }
  window.dispatchEvent(new Event('ae-sync-change'));
}

function pendingDeletes(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(DELETE_PENDING_KEY) ?? '[]');
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
  } catch { return []; }
}
function setPendingDeletes(ids: string[]) {
  try {
    if (ids.length) localStorage.setItem(DELETE_PENDING_KEY, JSON.stringify(ids));
    else localStorage.removeItem(DELETE_PENDING_KEY);
  } catch { /* ignore */ }
}

function markSyncFailed(msg: string) {
  try {
    localStorage.setItem(PENDING_KEY, '1');
    localStorage.setItem(ERROR_KEY, msg.slice(0, 200));
  } catch { /* ignore */ }
  window.dispatchEvent(new Event('ae-sync-change'));
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
  if (error) { markSyncFailed(error.message); return; }   // 讀不到就先用本機的，不要擋住使用；標記待重試

  // 雲端刪除沒成功的孩子：先再刪一次，還是刪不掉就略過那列，別把已刪的孩子又合併回本機
  await retryPendingDeletes(userId);
  const stillPending = new Set(pendingDeletes());
  const cloud = (rows ?? []).filter(r => !stillPending.has(r.id));
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
  try {
    const { error: upErr } = await supa().from('ae_kids').upsert(
      [...merged.values()].map(x => ({ id: x.kid.id, user_id: userId, name: x.kid.name, avatar: x.kid.avatar, data: x.data })),
      { onConflict: 'id' },
    );
    if (upErr) markSyncFailed(upErr.message); else markSynced();
  } catch (e) {
    markSyncFailed(e instanceof Error ? e.message : 'network');
  }
}

/**
 * 進度變動時上傳「正在玩的孩子」。
 * 失敗不影響遊戲（孩子不該因為網路問題被打斷），但會標記「未同步」，
 * 恢復連線（online）或下次載入時由 retryPendingSync 再送一次。
 * 注意 supabase-js 不會 throw，錯誤在回傳的 error 裡——之前的 try/catch 什麼都接不到。
 */
export async function pushProgress(userId: string, p: Progress): Promise<boolean> {
  try {
    const k = activeKid();
    const { error } = await supa().from('ae_kids').upsert({ id: k.id, user_id: userId, name: k.name, avatar: k.avatar, data: p }, { onConflict: 'id' });
    if (error) { markSyncFailed(error.message); return false; }
    markSynced();
    return true;
  } catch (e) {
    markSyncFailed(e instanceof Error ? e.message : 'network');
    return false;
  }
}

/** 有沒同步成功的存檔就補送一次（AuthProvider 在載入與 online 事件時呼叫） */
export async function retryPendingSync(userId: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
  await retryPendingDeletes(userId);
  if (!getSyncStatus().pending) return;
  await pushProgress(userId, loadProgress());
}

/** 雲端刪除沒成功的孩子再刪一次（syncKids 合併前、retryPendingSync 都會呼叫） */
export async function retryPendingDeletes(userId: string): Promise<void> {
  for (const id of pendingDeletes()) await deleteKidCloud(userId, id);
}

/**
 * 刪除孩子時同步刪雲端那一列。
 * 失敗不能靜默：記進待刪清單並標記同步失敗，否則下次 syncKids 會把雲端那列又合併回本機、孩子「復活」。
 * 回傳 true = 雲端已刪。
 */
export async function deleteKidCloud(userId: string, kidId: string): Promise<boolean> {
  const fail = (msg: string) => {
    const ids = pendingDeletes();
    if (!ids.includes(kidId)) setPendingDeletes([...ids, kidId]);
    markSyncFailed(msg);
    return false;
  };
  try {
    const { error } = await supa().from('ae_kids').delete().eq('user_id', userId).eq('id', kidId);
    if (error) return fail(error.message);
    setPendingDeletes(pendingDeletes().filter(id => id !== kidId));
    return true;
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'network');
  }
}

// 舊名稱相容（其他檔案若還引用）
export const syncProgress = syncKids;

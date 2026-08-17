'use client';
import type { User } from '@supabase/supabase-js';
import { supa } from './supabase';
import { loadProgress, saveProgress, type Progress } from './missionProgress';

/**
 * 登入＝進度同步（不涉及付費）。
 *
 * 設計原則：
 * - 沒登入也能完整玩，進度存 localStorage
 * - 登入後把本機進度合併上雲端，之後換裝置都拿得到
 * - 合併規則：同一課取「星數比較高」的那筆，不會因為換裝置就倒退
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

// ── 進度同步 ──────────────────────────────────────────────

type Row = { kid_name: string | null; avatar: string | null; data: Progress };

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
  };
}

/** 登入後呼叫：把雲端與本機合併，兩邊都更新成合併結果 */
export async function syncProgress(userId: string): Promise<Progress> {
  const local = loadProgress();
  const { data, error } = await supa()
    .from('ae_progress')
    .select('kid_name, avatar, data')
    .eq('user_id', userId)
    .maybeSingle<Row>();

  if (error) return local;                       // 讀不到就先用本機的，不要擋住使用

  const merged = data?.data ? mergeProgress(local, data.data) : local;
  const avatar = (typeof window !== 'undefined' && localStorage.getItem('ae_avatar')) || data?.avatar || null;

  await supa().from('ae_progress').upsert({
    user_id: userId,
    avatar,
    kid_name: data?.kid_name ?? null,
    data: merged,
  });

  saveProgress(merged);
  if (avatar && typeof window !== 'undefined') localStorage.setItem('ae_avatar', avatar);
  return merged;
}

/** 進度變動時上傳（失敗不影響遊戲，下次登入還會再合併一次） */
export async function pushProgress(userId: string, p: Progress) {
  try {
    const avatar = typeof window !== 'undefined' ? localStorage.getItem('ae_avatar') : null;
    await supa().from('ae_progress').upsert({ user_id: userId, data: p, avatar });
  } catch {
    /* 靜默失敗：孩子不該因為網路問題被打斷 */
  }
}

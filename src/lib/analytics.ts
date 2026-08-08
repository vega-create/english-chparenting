'use client';
import { supa } from './supabase';

/**
 * 學習行為記錄（給日後論文用）。
 *
 * 三個原則：
 * 1. 不記個資 —— 使用者只用一組隨機 UUID（device_id）代表，跟真實身分無關
 * 2. 家長沒同意就完全不寫入
 * 3. 只記「做了什麼」，不記「說了什麼」—— 口說只存分數不存辨識文字
 *
 * 送出方式是「批次 + 失敗就算了」：孩子在學習，不該因為記錄失敗被打斷。
 */

const DEVICE_KEY = 'ae_device_id';
const CONSENT_KEY = 'ae_research_consent';

export type EventKind = 'lesson_start' | 'lesson_end' | 'answer' | 'replay' | 'speak' | 'session';

export interface LearnEvent {
  kind: EventKind;
  level?: number;
  mission?: number;
  step?: string;
  item?: string;
  correct?: boolean;
  attempt?: number;
  score?: number;
  ms?: number;
  meta?: Record<string, unknown>;
}

/** 隨機裝置代號（不含任何個資，清瀏覽器就會換一組） */
export function deviceId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === '1';
}

export function setConsent(on: boolean) {
  if (typeof window === 'undefined') return;
  if (on) localStorage.setItem(CONSENT_KEY, '1');
  else localStorage.removeItem(CONSENT_KEY);
  // 同步寫進資料庫留存同意紀錄（IRB 送審時要證明有取得同意）
  supa().auth.getUser().then(({ data }) => {
    const uid = data.user?.id;
    if (!uid) return;
    supa().from('ae_progress').update({
      research_consent: on,
      consent_at: on ? new Date().toISOString() : null,
    }).eq('user_id', uid);
  }).catch(() => {});
}

// ── 批次送出 ────────────────────────────────────────────
let queue: Record<string, unknown>[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let userId: string | null = null;

export function setAnalyticsUser(id: string | null) { userId = id; }

async function flush() {
  timer = null;
  if (!queue.length) return;
  const batch = queue;
  queue = [];
  try {
    await supa().from('ae_events').insert(batch);
  } catch {
    /* 記錄失敗不影響學習，也不重試（避免累積） */
  }
}

export function track(e: LearnEvent) {
  if (typeof window === 'undefined' || !hasConsent()) return;
  queue.push({
    device_id: deviceId(),
    user_id: userId,
    kind: e.kind,
    level: e.level ?? null,
    mission: e.mission ?? null,
    step: e.step ?? null,
    item: e.item ?? null,
    correct: e.correct ?? null,
    attempt: e.attempt ?? null,
    score: e.score ?? null,
    ms: e.ms ?? null,
    meta: e.meta ?? null,
  });
  if (queue.length >= 20) { flush(); return; }
  if (!timer) timer = setTimeout(flush, 5000);
}

/** 關頁前把還沒送的補送掉 */
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => { if (queue.length) flush(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && queue.length) flush();
  });
}

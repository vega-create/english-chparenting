'use client';
import { supa } from './supabase';
import { APP_VERSION } from './version';
import { defaultBucket } from './experiment';

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

const CONSENT_KEY = 'ae_research_consent';

export type EventKind =
  | 'lesson_start' | 'lesson_end' | 'answer' | 'replay' | 'speak' | 'session'
  | 'abandon'      // 中途離開（沒走到破關就退出）
  | 'pretest' | 'posttest';   // 前測／後測，用來證明「有沒有進步」

export interface LearnEvent {
  kind: EventKind;
  level?: number;
  mission?: number;
  step?: string;
  item?: string;      // 題目 ID
  correct?: boolean;
  attempt?: number;   // 第幾次嘗試
  score?: number;
  ms?: number;        // 作答耗時 —— 能分辨「會但慢」和「猜對」，分數看不出這個差別
  /**
   * 這次播的音檔是什麼來源。之後想比較「AI 合成語音 vs 真人配音對學習的影響」
   * 就靠這個欄位切；現在不記，之後要補就得重錄。
   *   el    = ElevenLabs 合成（目前絕大多數）
   *   human = 真人錄音
   *   tts   = 瀏覽器內建語音（沒有檔案時的 fallback，音質最差）
   */
  audioSrc?: 'el' | 'human' | 'tts';
  meta?: Record<string, unknown>;
}

/** 隨機裝置代號（不含任何個資，清瀏覽器就會換一組） */
export { deviceId } from './deviceId';
import { deviceId } from './deviceId';

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
    app_version: APP_VERSION,   // 改版後的資料才切得開
    bucket: defaultBucket(),    // A/B 分組，之後要做因果推論用
    kind: e.kind,
    level: e.level ?? null,
    mission: e.mission ?? null,
    step: e.step ?? null,
    item: e.item ?? null,
    correct: e.correct ?? null,
    attempt: e.attempt ?? null,
    score: e.score ?? null,
    ms: e.ms ?? null,
    audio_src: e.audioSrc ?? null,
    meta: e.meta ?? null,
  });
  if (queue.length >= 20) { flush(); return; }
  if (!timer) timer = setTimeout(flush, 5000);
}

/**
 * 退出時的匿名狀態快照，給退出問卷一起寫入。
 * 完全不含身分欄位——只回答「退出時大概是什麼狀態」，不回答「是誰」。
 * 沒登入的話多半拿不到事件數（RLS 讀不到），回傳 null 就好，不要硬猜。
 */
export async function exitContext(): Promise<{
  events_count: number | null; lessons_done: number | null;
  had_pretest: boolean; bucket: string; app_version: string;
}> {
  const base = { events_count: null, lessons_done: null, had_pretest: false,
                 bucket: defaultBucket(), app_version: APP_VERSION };
  try {
    const { data } = await supa().auth.getUser();
    const uid = data.user?.id;
    if (!uid) return base;
    const { data: rows } = await supa().from('ae_events').select('kind').eq('user_id', uid);
    if (!rows) return base;
    return {
      ...base,
      events_count: rows.length,
      lessons_done: rows.filter(r => r.kind === 'lesson_end').length,
      had_pretest: rows.some(r => r.kind === 'pretest'),
    };
  } catch {
    return base;
  }
}

/**
 * 撤回：刪掉這個帳號在研究資料裡的所有紀錄。
 *
 * ⚠️ 這裡**不寫**退出紀錄（墓碑）。墓碑由退出問卷那一步寫，
 *    不管家長有沒有填原因都會寫、而且只寫一筆——
 *    分兩個地方寫會變成同一次退出算成兩人，流失率直接失真。
 *
 * 只有登入時做得到。未登入的資料只有隨機 device_id，
 * 資料庫無從驗證那組代號真的屬於誰，開放用 device_id 刪等於任何人都能刪光整張表。
 * 所以未登入的資料在設計上就是不可回溯的匿名資料——同意書要據實說明。
 *
 * 回傳 'ok' | 'not-logged-in' | 'error'
 */
export async function deleteMyResearchData(): Promise<'ok' | 'not-logged-in' | 'error'> {
  queue = [];                       // 還沒送出的先丟掉，不然刪完又被補寫進去
  if (timer) { clearTimeout(timer); timer = null; }
  try {
    const { data } = await supa().auth.getUser();
    const uid = data.user?.id;
    if (!uid) return 'not-logged-in';

    const { error } = await supa().from('ae_events').delete().eq('user_id', uid);
    if (error) return 'error';
    await supa().from('ae_progress')
      .update({ research_consent: false, consent_at: null })
      .eq('user_id', uid);
    return 'ok';
  } catch {
    return 'error';
  }
}

/** 關頁前把還沒送的補送掉 */
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => { if (queue.length) flush(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && queue.length) flush();
  });
}

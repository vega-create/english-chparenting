'use client';
import { deviceId } from './deviceId';

/**
 * A/B 分組（給日後做因果推論用）。
 *
 * 分組規則刻意做成「用 device_id 算出來」而不是隨機擲一次存起來：
 *   1. 同一台裝置永遠落在同一組，不會因為清了某個 key 就換組
 *   2. 不需要額外儲存，也就不會有「存到一半失敗」的髒資料
 *   3. 研究者事後可以用同一條算式重算，驗證分組沒被動過手腳
 *
 * ⚠️ 目前只做「分組 + 記錄」，還沒有任何一個功能真的依分組改變行為。
 *    等真的要跑實驗時，用 variantOf() 去切介面即可，歷史資料的分組欄位是連續的。
 */

export type Bucket = 'A' | 'B';

/** FNV-1a：短、穩定、跨瀏覽器結果一致 */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * 這台裝置在某個實驗裡屬於哪一組。
 * 加上 experiment 名稱一起雜湊，不同實驗的分組才會互相獨立
 * （不然同一批人永遠都在 A 組，會累積偏誤）。
 */
export function bucketOf(experiment: string): Bucket {
  const id = deviceId();
  if (!id) return 'A';
  return hash(`${experiment}:${id}`) % 2 === 0 ? 'A' : 'B';
}

/** 預設實驗：整站的分組欄位，每筆事件都會帶著走 */
export const DEFAULT_EXPERIMENT = 'ae-v1';

export function defaultBucket(): Bucket {
  return bucketOf(DEFAULT_EXPERIMENT);
}

/** 要真的切介面時用這個：variantOf('fanfare', { A: false, B: true }) */
export function variantOf<T>(experiment: string, variants: Record<Bucket, T>): T {
  return variants[bucketOf(experiment)];
}

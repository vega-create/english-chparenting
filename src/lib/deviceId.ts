'use client';

/**
 * 隨機裝置代號。獨立成一個檔案是為了避免 analytics 與 experiment 互相 import 形成循環。
 * 不含任何個資，清掉瀏覽器資料就會換一組新的。
 */
const DEVICE_KEY = 'ae_device_id';

export function deviceId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

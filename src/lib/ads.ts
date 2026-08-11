/**
 * 廣告設定
 *
 * 分區原則（2026-08-08 Vega 定）：
 * - 孩子會用的頁面「要有廣告，但不能擋到內容」→ 固定版位，一律只放在整頁最下方
 * - 家長／文章頁 → 自動廣告（收益主要來源，那裡是搜尋流量進來的地方）
 * - 課程進行中的互動畫面（電子書內頁、答題、對話）→ 完全不放
 *
 * 全部設非個人化廣告（兒童導向網站不該做個人化追蹤）。
 *
 * ⚠️ AdSense 後台的「自動廣告」要關掉，否則它會繞過這裡的設定，
 *    在任何載入腳本的頁面自己找位置塞。
 */

export const AD_CLIENT = 'ca-pub-3493526929407874';

export type AdPlace = 'lessonBottom' | 'mapBottom' | 'homeBottom' | 'cabinBottom' | 'tasksBottom' | 'badgesBottom';

/**
 * AdSense 後台 →「廣告」→「依廣告單元」→ 建立「多媒體廣告」（回應式），
 * 複製 data-ad-slot 的數字貼進來。留空就不顯示。
 *
 * 同一個廣告單元可以用在多個位置，所以先全部共用一個；
 * 之後若想分開看各頁成效，再各建一個單元換掉即可。
 */
const DEFAULT_SLOT = '2835009870';

export const AD_SLOTS: Record<AdPlace, string> = {
  lessonBottom: DEFAULT_SLOT,   // 課程頁最下方（完成按鈕之後）
  mapBottom: DEFAULT_SLOT,      // 冒險地圖最下方
  homeBottom: DEFAULT_SLOT,     // 首頁最下方
  cabinBottom: DEFAULT_SLOT,    // 我的小屋最下方
  tasksBottom: DEFAULT_SLOT,    // 今日任務最下方
  badgesBottom: DEFAULT_SLOT,   // 成就徽章最下方
};

/**
 * 載入 AdSense 腳本（只載一次）。
 * 固定版位與自動廣告都要用它，所以抽出來共用。
 */
export function loadAdSense() {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.adsbygoogle = w.adsbygoogle || [];
  w.adsbygoogle.requestNonPersonalizedAds = 1;   // 兒童導向：非個人化廣告

  if (document.getElementById('adsense-script')) return;
  const s = document.createElement('script');
  s.id = 'adsense-script';
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

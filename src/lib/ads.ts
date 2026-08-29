/**
 * 廣告設定
 *
 * 分區原則（2026-08-29 Vega 重新定：流量與體驗優先於廣告收益）：
 * - 只留兩處固定版位：首頁最下方、課程完成後最下方
 * - 只留兩頁自動廣告：部落格列表與內頁（搜尋流量進來的地方，讀者是大人）
 * - 孩子在玩的頁面（冒險地圖、小屋、徽章、今日任務）→ 完全不放
 * - 家長頁、隱私權、電子書、動詞表 → 完全不放
 *
 * 全部設非個人化廣告（兒童導向網站不該做個人化追蹤）。
 *
 * ⚠️ 蓋板／插頁廣告在程式碼裡沒有，那是 AdSense 後台的「自動廣告」自己塞的。
 *    只要後台自動廣告開著，它就會在任何載入腳本的頁面（含固定版位的頁面）
 *    自己找位置塞插頁、錨定、側欄。要關必須到後台：
 *    廣告 → 依網站 → english.chparenting.com → 編輯 → 關掉「插頁廣告」等格式，
 *    並用「網頁排除設定」排掉 /adventure-map、/cabin、/courses/* 等課程路徑。
 */

export const AD_CLIENT = 'ca-pub-3493526929407874';

export type AdPlace = 'lessonBottom' | 'homeBottom';

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
  homeBottom: DEFAULT_SLOT,     // 首頁最下方
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

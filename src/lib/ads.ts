/**
 * 廣告設定
 *
 * 分區原則（2026-08-08 Vega 定）：
 * - 課程區「要有廣告，但不能影響學習」→ 用固定版位，只放在整頁最下方
 * - 家長／文章頁 → 自動廣告（收益主要來源，那裡是搜尋流量進來的地方）
 * - 課程進行中的互動畫面（電子書內頁、答題、對話）→ 完全不放
 *
 * 所有版位都設非個人化廣告（兒童導向網站不該做個人化追蹤）。
 */

export const AD_CLIENT = 'ca-pub-3493526929407874';

export type AdPlace = 'lessonBottom' | 'mapBottom' | 'homeBottom';

/**
 * AdSense 後台 →「廣告」→「依廣告單元」→ 建立「顯示廣告」，
 * 建好後複製 data-ad-slot 那串數字貼進來。留空就不會顯示。
 */
export const AD_SLOTS: Record<AdPlace, string> = {
  lessonBottom: '2835009870',   // 課程頁最下方（完成按鈕之後）
  mapBottom: '',      // 冒險地圖最下方
  homeBottom: '',     // 首頁最下方
};

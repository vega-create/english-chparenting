'use client';
import { useEffect } from 'react';

const CLIENT = 'ca-pub-3493526929407874';

/**
 * 只在「家長／內容頁」載入 AdSense。
 *
 * 為什麼不放在全站 layout：AdSense 自動廣告會在任何有腳本的頁面自己找位置塞，
 * 孩子上課上到一半跳出廣告體驗很差。把腳本限制在文章／書單／家長中心，
 * 課程區連廣告程式碼都沒有，自動廣告就不可能出現。
 *
 * 另外設 requestNonPersonalizedAds：兒童導向網站不該用個人化廣告追蹤。
 */
export default function AutoAds() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('adsense-script')) return;

    // 非個人化廣告（兒童導向網站的必要設定）
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.adsbygoogle = w.adsbygoogle || [];
    w.adsbygoogle.requestNonPersonalizedAds = 1;

    const s = document.createElement('script');
    s.id = 'adsense-script';
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }, []);

  return null;
}

'use client';
import { useEffect, useRef } from 'react';
import { AD_CLIENT, IN_ARTICLE_SLOT, loadAdSense } from '@/lib/ads';

/**
 * 文章內廣告（AdSense 原生 in-article 格式）。
 *
 * 為什麼用這個、而不是讓自動廣告去塞：
 * - 位置由我們決定，放在文章約 70% 處——讀者滑到那裡代表真的在讀，
 *   沒讀完就離開的人根本不會遇到廣告，跳出率不受影響
 * - 不覆蓋內容、不是彈出視窗，不會踩到 Better Ads 與 Google 的
 *   「干擾性插頁」排名懲罰
 *
 * ⚠️ 不要把這個包進自製的彈出視窗或 exit-intent 遮罩裡——
 *    AdSense 政策禁止廣告出現在 pop-up／overlay，會被停權。
 */
export default function InArticleAd() {
  const pushed = useRef(false);

  useEffect(() => {
    if (!IN_ARTICLE_SLOT || pushed.current) return;
    pushed.current = true;
    try {
      loadAdSense();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).adsbygoogle.push({});
    } catch {
      /* 廣告載入失敗不影響文章閱讀 */
    }
  }, []);

  if (!IN_ARTICLE_SLOT) return null;

  return (
    <div className="my-8">
      <p className="text-center text-[10px] text-gray-400 mb-1">廣告</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={AD_CLIENT}
        data-ad-slot={IN_ARTICLE_SLOT}
      />
    </div>
  );
}

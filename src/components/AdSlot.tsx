'use client';
import { useEffect, useRef, useState } from 'react';
import { AD_CLIENT, AD_SLOTS, loadAdSense, type AdPlace } from '@/lib/ads';

/**
 * 固定版位廣告（手動指定位置，不是自動廣告）。
 *
 * 課程區用這個而不是自動廣告：自動廣告會自己找位置塞，可能蓋在題目上、
 * 或在孩子答題到一半跳出來。固定版位只會出現在我們指定的地方。
 *
 * 規則：
 * - 只放在內容「下方」，不做浮動、不做插頁、不蓋住任何互動元件
 * - 容器高度先佔好，載入時不會把畫面推動（避免孩子點到一半被推走）
 * - 沒設定 slot ID 就什麼都不顯示
 */
export default function AdSlot({ place, className = '' }: { place: AdPlace; className?: string }) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const slot = AD_SLOTS[place];
  // 兒童導向頁常常沒廣告可填（AdSense 只給少量合規廣告）——沒填到就把「廣告」字樣跟空框一起收掉，
  // 不然孩子看到一個寫著「廣告」的空白格子（2026-09-02 手機版檢查發現）
  const [unfilled, setUnfilled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => { if (el.dataset.adStatus === 'unfilled') setUnfilled(true); };
    check();
    const mo = new MutationObserver(check);
    mo.observe(el, { attributes: true, attributeFilter: ['data-ad-status'] });
    return () => mo.disconnect();
  }, [slot]);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      loadAdSense();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).adsbygoogle.push({});
    } catch {
      /* 廣告載入失敗不影響課程 */
    }
  }, [slot]);

  if (!slot) return null;   // 還沒設定版位 ID 就不顯示

  return (
    <div className={`mx-auto w-full max-w-3xl px-3 ${className}`} hidden={unfilled}>
      <p className="text-center text-[10px] text-gray-400 mb-1">廣告</p>
      {/* 先佔好高度，載入時畫面不會跳動 */}
      <div className="min-h-[100px] flex items-center justify-center overflow-hidden rounded-xl bg-white/40">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

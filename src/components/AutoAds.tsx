'use client';
import { useEffect } from 'react';
import { loadAdSense } from '@/lib/ads';

/**
 * 家長／內容頁的自動廣告。
 * 孩子會用的頁面不放這個，只放固定版位（AdSlot），避免廣告蓋到內容。
 */
export default function AutoAds() {
  useEffect(() => { loadAdSense(); }, []);
  return null;
}

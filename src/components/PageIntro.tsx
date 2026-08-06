'use client';
import { useEffect } from 'react';
import { playPageIntro } from '@/lib/vega-audio';

/**
 * 進頁面時播 Vega 導覽語音（page-<page>.mp3）。
 * 給 server component 用：`<PageIntro page="books" />`
 * client component 直接呼叫 playPageIntro() 就好。
 */
export default function PageIntro({ page }: { page: string }) {
  useEffect(() => { playPageIntro(page); }, [page]);
  return null;
}

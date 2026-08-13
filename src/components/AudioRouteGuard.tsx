'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { stopAllAudio } from '@/lib/audioBus';

/**
 * 換頁就把所有聲音停掉。
 *
 * `new Audio()` 不掛在 DOM 上，SPA 換頁不會自動停；
 * Vega 旁白講到一半跳去別頁會一路講完——這就是「換頁聲音沒斷」的主因。
 * 三個發聲系統（vega / clip / tts）都在 audioBus 註冊過，這裡一次全停。
 */
export default function AudioRouteGuard() {
  const pathname = usePathname();
  useEffect(() => {
    stopAllAudio();
  }, [pathname]);
  return null;
}

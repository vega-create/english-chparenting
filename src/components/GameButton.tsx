'use client';
import Link from 'next/link';
import { playClick, playStar } from '@/lib/sfx';

export type BtnColor = 'gold' | 'purple' | 'green' | 'orange';

/**
 * 遊戲風按鈕：底圖用畫的，不用 CSS 漸層。
 *
 * 底圖是一顆膠囊，直接拉伸的話兩端圓角會被壓扁，
 * 所以用 `border-image` 九宮格切：兩端保持原樣、只有中間那段跟著文字長度伸縮。
 * 切法寫在 globals.css 的 `.ae-btn`。
 */
export default function GameButton({
  href, onClick, color = 'gold', size = 'md', sound = 'star', className = '', children,
}: {
  href?: string;
  onClick?: () => void;
  color?: BtnColor;
  size?: 'sm' | 'md' | 'lg';
  sound?: 'click' | 'star' | 'none';
  className?: string;
  children: React.ReactNode;
}) {
  const cls = `ae-btn ae-btn-${color} ae-btn-${size} ${className}`;
  const ring = () => { if (sound === 'star') playStar(); else if (sound === 'click') playClick(); };
  const handle = () => { ring(); onClick?.(); };

  if (href) {
    return <Link href={href} onClick={handle} className={cls}>{children}</Link>;
  }
  return <button type="button" onClick={handle} className={cls}>{children}</button>;
}

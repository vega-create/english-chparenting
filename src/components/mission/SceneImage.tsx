'use client';
import { useState } from 'react';

/**
 * 電子書內頁的場景圖。
 *
 * 有對應的插圖就用圖，沒有就退回原本的 emoji —— 兩邊都不會破版。
 * 這樣場景圖可以慢慢補：做幾張換幾張，不用一次做完 268 種。
 *
 * 檔名用 emoji 的 codepoint（🎉 → `public/scenes/1f389.png`），
 * 因為 emoji 本身不能當檔名，而 codepoint 是唯一且穩定的。
 * 對照表與優先清單見 scripts/電子書場景圖-規劃.md。
 */

/** 🎉 → "1f389"。變體選擇碼 FE0F 要濾掉，不然 ✏️ 會變成 "270f-fe0f" 對不到檔案 */
export function emojiSlug(emoji: string): string {
  return [...emoji]
    .map(c => c.codePointAt(0)!)
    .filter(cp => cp !== 0xfe0f && cp !== 0x200d)
    .map(cp => cp.toString(16))
    .join('-');
}

export default function SceneImage({ emoji, className = '' }: { emoji: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!emoji) return null;

  if (ok) {
    return (
      <img
        src={`/scenes/${emojiSlug(emoji)}.png`}
        alt=""
        aria-hidden
        onError={() => setOk(false)}
        className={`inline-block object-contain ${className}`}
      />
    );
  }
  return <span className={className}>{emoji}</span>;
}

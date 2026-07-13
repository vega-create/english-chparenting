// 播放單一 mp3；播完 resolve(true)，檔案不存在/失敗 resolve(false)
// 用途：課程音檔優先播 Vega 的錄音，沒檔才由呼叫端 fallback 到 TTS
export function playClip(url: string): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  return new Promise((resolve) => {
    const a = new Audio(url);
    let done = false;
    const finish = (ok: boolean) => { if (!done) { done = true; resolve(ok); } };
    a.onended = () => finish(true);
    a.onerror = () => finish(false);
    a.play().then(() => {/* playing */}).catch(() => finish(false));
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// 課程單字音檔命名：<slug>.mp3（完整單字）、<slug>-blend.mp3（自然發音拆音）
export function wordSlug(en: string): string {
  return en.toLowerCase().replace(/[^a-z]/g, '');
}

import { registerAudioChannel, stopOtherChannels } from './audioBus';

// 目前正在播的課程音檔。開新的一定先停舊的 —— 兩個同時響聽起來就像回音。
let currentClip: HTMLAudioElement | null = null;

export function stopClip(): void {
  if (currentClip) {
    currentClip.pause();
    currentClip.currentTime = 0;
    currentClip = null;
  }
}

// 播放單一 mp3；播完 resolve(true)，檔案不存在/失敗/被新的打斷 resolve(false)
// 用途：課程音檔優先播錄音，沒檔才由呼叫端 fallback 到 TTS
export function playClip(url: string): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  stopClip();
  stopOtherChannels('clip');   // Vega 旁白／TTS 先停，避免三個聲音疊在一起
  return new Promise((resolve) => {
    const a = new Audio(url);
    currentClip = a;
    let done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      if (currentClip === a) currentClip = null;
      resolve(ok);
    };
    a.onended = () => finish(true);
    a.onerror = () => finish(false);
    // 被 stopClip() 打斷時算「有播到」，呼叫端才不會又補一次 TTS
    a.onpause = () => { if (!a.ended && a.currentTime === 0) finish(true); };
    a.play().catch(() => finish(false));
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// 課程單字音檔命名：<slug>.mp3（完整單字）、<slug>-blend.mp3（自然發音拆音）
export function wordSlug(en: string): string {
  return en.toLowerCase().replace(/[^a-z]/g, '');
}

// ── 課文音檔（R2 bucket adventure-audio/lessons/）────────────────
//   L{n}/m{id}/d{i}.mp3   對話（角色各自的聲音）
//   L{n}/m{id}/s{i}.mp3   句型（Benny 帶讀）
//   L{n}/words/{slug}.mp3 單字（同一級去重共用，Polly 念）
//   L{n}/words/{slug}-ex.mp3   單字例句
const LESSON_BASE = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/lessons';

/** 播課文音檔；沒有檔案回 false，呼叫端自行 fallback 到 TTS */
export function playLesson(path: string): Promise<boolean> {
  return playClip(`${LESSON_BASE}/${path}`);
}

export const lessonPath = {
  dialogue: (level: number, missionId: number, i: number) => `L${level}/m${missionId}/d${i + 1}.mp3`,
  sentence: (level: number, missionId: number, i: number) => `L${level}/m${missionId}/s${i + 1}.mp3`,
  word:     (level: number, en: string) => `L${level}/words/${wordSlug(en)}.mp3`,
  example:  (level: number, en: string) => `L${level}/words/${wordSlug(en)}-ex.mp3`,
  blend:    (level: number, en: string) => `L${level}/words/${wordSlug(en)}-blend.mp3`,
  // 字母卡：全站共用（不分級）
  letter:   (c: string, kind: 'capital' | 'lower' | 'word') => `letters/${c.toUpperCase()}-${kind}.mp3`,
};

/** phonicsLetters 這個欄位 L2 以上放的是文法主題（"sight words"、"Can you…?"），
 *  只有像 "Aa" "Bb" 這種才是真的字母卡，要念「大寫/小寫/舉例」。 */
export function isLetterCard(label: string): boolean {
  return /^([A-Za-z])\1$/i.test(label.trim());
}

// 翻書「沙沙」音效：用 Web Audio 合成（不需外部音檔）
let _ac: AudioContext | null = null;
export function playPageFlip() {
  if (typeof window === 'undefined') return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!_ac) _ac = new AC();
    const ctx = _ac;
    if (ctx.state === 'suspended') ctx.resume();
    const dur = 0.22;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length); // 衰減白噪音
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 0.8;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    bp.frequency.setValueAtTime(1800, now);
    bp.frequency.exponentialRampToValueAtTime(4200, now + dur); // 頻率上掃＝翻頁的「沙——」
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
    src.stop(now + dur);
  } catch {
    /* 音效失敗不影響翻頁 */
  }
}

registerAudioChannel('clip', stopClip);

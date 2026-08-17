// 簡單的音效系統（用 Web Audio API，不用下載 mp3）
let ctx: AudioContext | null = null;
let muted = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

export function setSfxMuted(v: boolean) {
  muted = v;
  if (typeof window !== "undefined") {
    localStorage.setItem("sfx-muted", v ? "1" : "0");
  }
}

export function isSfxMuted() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("sfx-muted") === "1";
}

function beep(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.15) {
  if (muted || isSfxMuted()) return;
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  osc.start();
  osc.stop(c.currentTime + dur);
}

// 點擊（短亮的 pop）
export function playClick() {
  beep(800, 0.08, "sine", 0.1);
}

// 成功（兩音上升）
export function playSuccess() {
  const c = getCtx();
  if (!c) return;
  beep(600, 0.1);
  setTimeout(() => beep(900, 0.15), 80);
}

// 翻頁/切換
export function playSwoosh() {
  beep(400, 0.12, "triangle", 0.08);
}

// 拿到星星
export function playStar() {
  const notes = [700, 900, 1200];
  notes.forEach((n, i) => setTimeout(() => beep(n, 0.1, "triangle", 0.12), i * 60));
}

// 開啟（嘟噜聲）
export function playOpen() {
  const c = getCtx();
  if (!c) return;
  beep(400, 0.15, "sine", 0.1);
  setTimeout(() => beep(600, 0.15, "sine", 0.1), 100);
}

/**
 * 破關配樂：真人歡呼 + 旋律的混音檔（放 R2）。
 * 三個星數各一版，星數越多越長越熱鬧。
 * 檔案載不到時退回合成音，不會沒聲音。
 */
const SFX_BASE = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/sfx';
let fanfareEl: HTMLAudioElement | null = null;

export function playFanfare(stars = 3) {
  if (typeof window === 'undefined' || isSfxMuted()) return;
  const n = Math.min(3, Math.max(1, stars));

  if (fanfareEl) { fanfareEl.pause(); fanfareEl = null; }
  const a = new Audio(`${SFX_BASE}/fanfare-${n}.mp3`);
  fanfareEl = a;
  a.volume = 0.85;
  a.onerror = () => { fanfareEl = null; synthFanfare(n); };   // 沒網路時還是有聲音
  a.play().catch(() => { fanfareEl = null; synthFanfare(n); });
}

export function stopFanfare() {
  if (fanfareEl) { fanfareEl.pause(); fanfareEl.currentTime = 0; fanfareEl = null; }
}

/** 備用：純合成的破關音（音檔載不到時用）*/
function synthFanfare(stars: number) {
  const c = getCtx();
  if (!c) return;
  const run = stars >= 3 ? [523, 587, 659, 784, 880, 1047, 1319]
            : stars === 2 ? [523, 659, 784, 1047, 1319]
            : [523, 659, 784, 1047];
  run.forEach((f, i) => setTimeout(() => beep(f, 0.14, 'triangle', 0.11), i * 75));
  const hit = run.length * 75;
  [523, 659, 784, 1047].forEach(f => setTimeout(() => beep(f, 0.9, 'triangle', 0.085), hit));
}

// ── 電子書情境音效（Vega 2026-08-17：故事講到冒險/歡呼時別那麼乾）──

// 歡呼：快速上行琶音（答對/太棒了氣氛）
export function playCheer() {
  [[523, 0], [659, 70], [784, 140], [1047, 210]].forEach(([f, d]) =>
    setTimeout(() => beep(f, 0.16, "sine", 0.1), d));
}

// 完結灑花：高音亮片三連
export function playTada() {
  [[1047, 0], [1319, 90], [1568, 180], [2093, 300]].forEach(([f, d]) =>
    setTimeout(() => beep(f, 0.22, "sine", 0.07), d));
}

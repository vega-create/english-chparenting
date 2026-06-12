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

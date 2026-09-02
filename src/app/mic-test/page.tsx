'use client';
import { useState } from 'react';

/**
 * 麥克風診斷頁（/mic-test）：一鍵測「網站權限 → 裝置 → 錄音 → 語音辨識」四層，
 * 給家長回報用（Vega 2026-09-02，Mac mini + Chrome 明明開了麥克風卻說沒權限）。
 * 不進 sitemap、不放連結，知道網址的人才會來。
 */
export default function MicTest() {
  const [lines, setLines] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const log = (s: string) => setLines(l => [...l, s]);

  async function run() {
    setLines([]); setBusy(true);
    log(`瀏覽器：${navigator.userAgent}`);
    log(`網址：${location.origin}`);
    // 1. 網站權限
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = await (navigator.permissions as any).query({ name: 'microphone' });
      log(`① 網站麥克風權限：${p.state}（granted＝允許 / prompt＝會詢問 / denied＝封鎖）`);
    } catch { log('① 網站麥克風權限：這個瀏覽器查不到'); }
    // 2. 裝置
    try {
      const devs = await navigator.mediaDevices.enumerateDevices();
      const ins = devs.filter(d => d.kind === 'audioinput');
      log(`② 音訊輸入裝置：${ins.length} 個${ins.length ? '：' + ins.map(d => d.label || '(名稱要允許後才看得到)').join('、') : ''}`);
    } catch (e) { log('② 列裝置失敗：' + (e as Error).message); }
    // 3. 實際錄音（會跳詢問視窗）
    try {
      const st = await navigator.mediaDevices.getUserMedia({ audio: true });
      log(`③ 取得麥克風：OK（${st.getAudioTracks().map(t => t.label).join('、')}）`);
      st.getTracks().forEach(t => t.stop());
    } catch (e) {
      const err = e as Error;
      log(`③ 取得麥克風：失敗 ${err.name} — ${err.message}`);
    }
    // 4. 語音辨識
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const API = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!API) { log('④ 語音辨識：這個瀏覽器不支援（iPhone 的 Chrome、LINE 內建瀏覽器都不支援）'); setBusy(false); return; }
    log('④ 語音辨識：開始聽 5 秒，請說一句英文…');
    const r = new API(); r.lang = 'en-US'; r.interimResults = false;
    const res: string = await new Promise(resolve => {
      let done = false; const fin = (v: string) => { if (!done) { done = true; resolve(v); } };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r.onerror = (e: any) => fin(`錯誤 ${e.error}`);
      r.onend = () => fin('結束（沒聽到內容）');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r.onresult = (e: any) => fin(`聽到：「${e.results[0][0].transcript}」`);
      try { r.start(); } catch (e) { fin('無法啟動：' + (e as Error).message); }
      setTimeout(() => { try { r.stop(); } catch {} }, 5000);
    });
    log('④ 語音辨識結果：' + res);
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-amber-50 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-black text-gray-800 mb-2">🎤 麥克風診斷</h1>
      <p className="text-sm text-gray-500 mb-4">按下按鈕，若瀏覽器跳出「要允許使用麥克風嗎？」請按允許。結果請整段截圖給 Vega。</p>
      <button onClick={run} disabled={busy}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold disabled:opacity-50">
        {busy ? '測試中…' : '開始測試'}
      </button>
      <pre className="mt-5 whitespace-pre-wrap break-all text-sm bg-white rounded-2xl p-4 border border-amber-200 min-h-[120px]">
        {lines.join('\n')}
      </pre>
      <p className="mt-4 text-xs text-gray-400">
        常見解法：① 是 denied → 網址列鎖頭 → 麥克風 → 允許，重新整理。③ 失敗 NotAllowedError 但 ① 是 granted → macOS「系統設定 → 隱私權與安全性 → 麥克風」把 Chrome 打開後整個重開 Chrome。
      </p>
    </main>
  );
}

/**
 * 全站聲音總線。
 *
 * 網站有三套獨立的發聲系統（Vega 旁白 / 課文錄音 / 瀏覽器 TTS），
 * 以前彼此不知道對方在播，同時響就變成「疊音、聽起來像回音」。
 * 每個系統在這裡註冊自己的 stop，開始播之前先把「別人」停掉。
 */
export type AudioChannel = 'vega' | 'clip' | 'tts';

const stoppers = new Map<AudioChannel, () => void>();

export function registerAudioChannel(ch: AudioChannel, stop: () => void) {
  stoppers.set(ch, stop);
}

/** 停掉其他頻道（自己那條不動，讓呼叫端自行處理接續播放） */
export function stopOtherChannels(except: AudioChannel) {
  stoppers.forEach((stop, ch) => { if (ch !== except) stop(); });
}

/** 全部停掉（換頁、離開課程時用） */
export function stopAllAudio() {
  stoppers.forEach(stop => stop());
}

/**
 * 麥克風正在聽孩子念的時候，網站自己的聲音一律不能播。
 *
 * Vega 2026-09-28：孩子發現錄音時去按 🔊 示範，麥克風聽到的是網站念的，就過關了。
 * 所以開始錄音時先把正在播的全停掉，錄音期間所有示範音（錄音檔／旁白／TTS）都播不出來。
 * 保險：最多鎖 20 秒，避免辨識器沒回報結束時整個網站變啞巴。
 */
let micListening = false;
let micTimer: ReturnType<typeof setTimeout> | undefined;

export function setMicListening(on: boolean) {
  micListening = on;
  if (micTimer) { clearTimeout(micTimer); micTimer = undefined; }
  if (on) {
    stopAllAudio();
    micTimer = setTimeout(() => { micListening = false; }, 20000);
  }
}

export function isMicListening() {
  return micListening;
}

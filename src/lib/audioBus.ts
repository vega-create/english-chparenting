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

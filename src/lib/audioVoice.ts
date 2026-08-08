'use client';

/**
 * 音檔來源對照：哪個路徑用哪個聲音生的。
 *
 * 為什麼要記：之後想做「不同合成聲音對孩子學習的影響」這種研究，
 * 就得知道每一段音檔的 voice ID、語速、生成日期。現在記是零成本，
 * 事後補要重新對檔案，甚至重錄。
 *
 * 這份表同時是 scripts/音檔來源紀錄.md 的資料來源，兩邊不會各寫各的。
 */

export interface VoiceSpec {
  voiceId: string;
  name: string;          // ElevenLabs 上的聲音名稱
  character: string;     // 在課程裡扮演誰
  accent: 'us' | 'uk' | 'zh' | 'other';
  model: string;
  stability: number;
  similarityBoost: number;
  speed: number;
  createdAt: string;     // 這批音檔的生成日期
}

/** 定版聲音（scripts/vega-voice.md 是正本，改這裡要同步改那邊）*/
export const VOICES: Record<string, VoiceSpec> = {
  vega: {
    voiceId: '9lHjugDhwqoxA5MhX0az', name: 'Anna Su', character: 'Vega（旁白／中文引導）',
    accent: 'zh', model: 'eleven_multilingual_v2',
    stability: 1.0, similarityBoost: 0.85, speed: 0.95, createdAt: '2026-08',
  },
  finn: {
    voiceId: 'nNXPmxHfg9PtGzFxr9Zd', name: 'Valf', character: 'Finn（暖身）',
    accent: 'us', model: 'eleven_multilingual_v2',
    stability: 0.6, similarityBoost: 0.85, speed: 0.95, createdAt: '2026-08',
  },
  coco: {
    voiceId: 'aFueGIISJUmscc05ZNfD', name: 'Terra', character: 'Coco（聽力）',
    accent: 'us', model: 'eleven_multilingual_v2',
    stability: 0.6, similarityBoost: 0.85, speed: 0.95, createdAt: '2026-08',
  },
  polly: {
    voiceId: 'BlgEcC0TfWpBak7FmvHW', name: 'Fena', character: 'Polly（口說）',
    accent: 'us', model: 'eleven_multilingual_v2',
    stability: 0.6, similarityBoost: 0.85, speed: 0.95, createdAt: '2026-08',
  },
  benny: {
    voiceId: '9lJhQTNhE6XNSstSyMzH', name: 'Ahmed', character: 'Benny（帶讀／單字拼字）',
    accent: 'us', model: 'eleven_multilingual_v2',
    stability: 0.6, similarityBoost: 0.85, speed: 0.95, createdAt: '2026-08',
  },
  ruby: {
    // ⚠️ 待確認：定版表寫 Abby，但後來換過一次。以實際生成用的為準，確認後改這裡＋vega-voice.md
    voiceId: 'IKuPqyuiEnnZFcU4OVzH', name: 'Abby', character: 'Ruby（寫作）',
    accent: 'us', model: 'eleven_multilingual_v2',
    stability: 0.6, similarityBoost: 0.85, speed: 0.95, createdAt: '2026-08',
  },
};

/**
 * 從音檔路徑推出是哪個聲音。
 * 推不出來就回 null——寧可留白，也不要猜一個假的進資料庫。
 */
export function voiceKeyOf(path: string): string | null {
  if (path.startsWith('vega/') || path.includes('/vega/')) return 'vega';
  if (path.startsWith('letters/')) return 'polly';          // 26 字母是 Polly 錄的
  if (/\/words\//.test(path)) return 'benny';               // 單字與拼字是 Benny
  if (/\/d\d+\.mp3$/.test(path)) return null;               // 對話是多角色輪流，單看路徑分不出
  if (/\/s\d+\.mp3$/.test(path)) return 'benny';            // 句型固定由 Benny 念（要穩）
  if (/\/t\d+\.mp3$/.test(path)) return 'polly';            // 開口說由 Polly 帶
  return null;
}

export function voiceIdOf(path: string): string | null {
  const k = voiceKeyOf(path);
  return k ? VOICES[k].voiceId : null;
}

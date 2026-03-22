// 全站共用 TTS 函式 - 使用溫柔女性聲音

let femaleVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return;

  // 優先選擇的女性聲音（依優先順序）
  const preferredVoices = [
    'Samantha',           // macOS 預設女聲（溫柔）
    'Karen',              // macOS 澳洲英文女聲
    'Moira',              // macOS 愛爾蘭英文女聲
    'Tessa',              // macOS 南非英文女聲
    'Google US English',  // Chrome 女聲
    'Microsoft Zira',     // Windows 女聲
    'Microsoft Aria',     // Windows 女聲
  ];

  // 嘗試找偏好的聲音
  for (const name of preferredVoices) {
    const found = voices.find(v => v.name.includes(name) && v.lang.startsWith('en'));
    if (found) {
      femaleVoice = found;
      voicesLoaded = true;
      return;
    }
  }

  // fallback: 找任何英文女性聲音
  const anyFemale = voices.find(v =>
    v.lang.startsWith('en') &&
    (v.name.toLowerCase().includes('female') ||
     v.name.toLowerCase().includes('woman') ||
     v.name.includes('Samantha') ||
     v.name.includes('Victoria') ||
     v.name.includes('Allison'))
  );

  if (anyFemale) {
    femaleVoice = anyFemale;
    voicesLoaded = true;
    return;
  }

  // 最後 fallback: 第一個英文聲音
  const anyEnglish = voices.find(v => v.lang.startsWith('en'));
  if (anyEnglish) {
    femaleVoice = anyEnglish;
    voicesLoaded = true;
  }
}

// 初始化聲音（瀏覽器異步載入）
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function speak(text: string, rate = 0.8) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  if (!voicesLoaded) loadVoices();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  u.pitch = 1.2;  // 活潑明亮的語調

  if (femaleVoice) {
    u.voice = femaleVoice;
  }

  window.speechSynthesis.speak(u);
}

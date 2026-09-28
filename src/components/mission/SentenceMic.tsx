'use client';
import { useEffect, useRef, useState } from 'react';
import { playClick, playStar } from '@/lib/sfx';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'listening' | 'ok' | 'close' | 'again' | 'denied';

/** 只留字母數字，比對時忽略標點與大小寫 */
// 比對前先正規化：小寫、去標點、把縮寫展開（I'm→i am、what's→what is…），
// 不然辨識器回「I am Finn」對上目標「I'm Finn」就會算錯（Vega 2026-09-02 親測念對卻判錯）
const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
  "that's": 'that is', "what's": 'what is', "where's": 'where is', "who's": 'who is', "how's": 'how is', "there's": 'there is', "here's": 'here is',
  "let's": 'let us', "i've": 'i have', "you've": 'you have', "we've": 'we have', "i'll": 'i will', "you'll": 'you will', "we'll": 'we will',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'can not', "cannot": 'can not', "isn't": 'is not', "aren't": 'are not',
  "wasn't": 'was not', "won't": 'will not', "i'd": 'i would', "you'd": 'you would',
};
function norm(s: string) {
  let t = s.toLowerCase().replace(/[\u2019\u2018]/g, "'");
  t = t.split(/\s+/).map(w => CONTRACTIONS[w.replace(/[^a-z']/g, '')] || w).join(' ');
  return t.replace(/[^a-z0-9' ]+/g, ' ').replace(/'/g, '').replace(/\s+/g, ' ').trim();
}
// 一個字差一個字母也算（Finn→fin、hello→hallo），專有名詞辨識常這樣
function close(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1 || Math.min(a.length, b.length) < 3) return false;
  let i = 0, j = 0, d = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    d++; if (d > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return d + (a.length - i) + (b.length - j) <= 1;
}

// 字母名稱是語音辨識最容易聽錯的東西（D 常被聽成 the／dee，B 聽成 be／bee…）。
// 目標字是單一字母時，這些同音字都算念對。
const LETTER_SOUNDS: Record<string, string[]> = {
  a: ['a', 'ay', 'eh', 'hey', 'ei'], b: ['b', 'be', 'bee'], c: ['c', 'see', 'sea', 'si'], d: ['d', 'dee', 'the', 'de', 'di'],
  e: ['e', 'ee', 'he', 'eat'], f: ['f', 'ef', 'eff', 'if'], g: ['g', 'gee', 'ji', 'jee'], h: ['h', 'age', 'aitch', 'each'],
  i: ['i', 'eye', 'aye', 'hi'], j: ['j', 'jay', 'je'], k: ['k', 'kay', 'okay', 'ok', 'que'], l: ['l', 'el', 'elle', 'al'],
  m: ['m', 'em', 'am', 'im'], n: ['n', 'en', 'and', 'an', 'in'], o: ['o', 'oh', 'owe'], p: ['p', 'pee', 'pea', 'pe'],
  q: ['q', 'cue', 'queue', 'kew'], r: ['r', 'are', 'our', 'ar'], s: ['s', 'es', 'as', 'yes'], t: ['t', 'tea', 'tee', 'ti'],
  u: ['u', 'you', 'yu', 'ew'], v: ['v', 'vee', 'we', 'vi'], w: ['w', 'double', 'doubleyou'], x: ['x', 'ex', 'eggs', 'axe'],
  y: ['y', 'why', 'wai'], z: ['z', 'zee', 'zed', 'the', 'ze'],
};
// 聽起來像不像：只留子音骨架、不分清濁音（g/k、d/t、b/p、v/f、z/s 視為同一個音）。
// 辨識器對孩子的發音常差一個母音或清濁音：goat → got／coat／good／goal 都是這種。
function soundKey(w: string) {
  let t = w.toLowerCase().replace(/[^a-z]/g, '');
  t = t.replace(/^gh/, 'g').replace(/gh/g, '').replace(/ph/g, 'f').replace(/ck/g, 'k').replace(/qu?/g, 'k')
       .replace(/c(?=[eiy])/g, 's').replace(/c/g, 'k').replace(/x/g, 'ks').replace(/^wr/, 'r').replace(/^kn/, 'n');
  t = t.replace(/g/g, 'k').replace(/d/g, 't').replace(/b/g, 'p').replace(/v/g, 'f').replace(/z/g, 's');
  const first = t[0] || '';
  const rest = t.slice(1).replace(/[aeiouyhw]/g, '');
  return (/[aeiou]/.test(first) ? 'a' : first) + rest.replace(/(.)\1+/g, '$1');
}
function soundsLike(heard: string, target: string) {
  if (heard.length < 2 || target.length < 3) return false;
  // 尾音沒收到：go → goat、app → apple
  if (target.startsWith(heard) && target.length - heard.length <= 2) return true;
  const a = soundKey(heard), b = soundKey(target);
  if (a.length < 2 || b.length < 2) return false;
  if (a === b) return true;
  // 尾巴的 l／n／s 辨識器常多聽或少聽一個：goal ↔ goat 不算，但 goats ↔ goat 算
  return (a.length > b.length ? a : b).startsWith(a.length > b.length ? b : a) && Math.abs(a.length - b.length) === 1 && /[sn]$/.test(a.length > b.length ? a : b);
}
function wordHit(heard: string, target: string) {
  if (target.length === 1 && LETTER_SOUNDS[target]) return LETTER_SOUNDS[target].includes(heard);
  return close(heard, target) || soundsLike(heard, target);
}

/** 逐字比對，回傳念對的比例 0~1 */
export function score(said: string, target: string) {
  const a = norm(said).split(' ').filter(Boolean);
  const b = norm(target).split(' ').filter(Boolean);
  if (!b.length) return 0;
  const pool = [...a];
  let hit = 0;
  for (const w of b) {
    const i = pool.findIndex(x => wordHit(x, w));
    if (i >= 0) { hit++; pool.splice(i, 1); }
  }
  let s = hit / b.length;
  // 「D is for dog.」這種字母句：辨識器常把前半「D is for」整段聽成別的字（例：beautiful dog）。
  // 這一課要學的是那個單字，所以只要單字念對、而且不是只念一個字，就算過關。
  // （Vega 2026-09-28：孩子念 D is for dog，一直顯示 beautiful dog 過不了）
  if (b.length === 4 && b[0].length === 1 && b[1] === 'is' && b[2] === 'for') {
    const key = b[3];
    if (a.length >= 2 && a.some(x => wordHit(x, key))) s = Math.max(s, 0.8);
  }
  return s;
}

/**
 * 句型錄音鈕。
 *
 * ⚠️ 重點：只有「真的聽到孩子說話」才算完成。
 * 之前的版本在辨識失敗／瀏覽器不支援時也呼叫 onDone，
 * 結果小朋友一按就跳「Great!」，根本沒開口。
 *
 * iOS Safari 多半不支援語音辨識，那種情況改成手動確認的「我念完了」。
 */
export default function SentenceMic({ target, onDone, compact = false }: { target: string; onDone: () => void; compact?: boolean }) {
  // compact：電子書內頁用的紫色藥丸（麥克風圈＋要念的句子），字級跟著書寬（cqw）縮放
  const [status, setStatus] = useState<Status>('idle');
  const [heard, setHeard] = useState('');
  const [tries, setTries] = useState(0);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [denyReason, setDenyReason] = useState<string>('');
  const denyHint: Record<string, string> = {
    'not-allowed': '瀏覽器沒開放麥克風給這個網站：點網址列左邊的鎖頭 → 麥克風 → 允許，再按「再試一次」',
    'service-not-allowed': '這個瀏覽器的語音辨識用不了（Safari 請到設定開啟「Siri 與聽寫」；或改用 Chrome）',
    'network': '語音辨識需要網路，請確認連線後再試一次',
    'audio-capture': '找不到麥克風，請確認裝置有麥克風且沒被其他 App 占用',
  };
  const retry = () => { setDenyReason(''); setStatus('idle'); setTries(0); };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => { try { recRef.current?.abort?.(); } catch {} };
  }, []);

  function start() {
    if (status === 'listening') { try { recRef.current?.stop(); } catch {} return; }
    playClick();
    setHeard('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const API = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!API) return;

    let got = false;
    const rec = new API();
    recRef.current = rec;
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 5;   // 多拿幾個候選，取跟目標最像的那個（第一候選常是聽錯的）

    rec.onstart = () => setStatus('listening');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      got = true;
      // 在所有候選裡挑分數最高的；畫面上顯示的也是那一個
      let text = String(e.results[0][0].transcript);
      let s = score(text, target);
      for (let k = 1; k < e.results[0].length; k++) {
        const alt = String(e.results[0][k].transcript);
        const sk = score(alt, target);
        if (sk > s) { s = sk; text = alt; }
      }
      setHeard(text);
      // 只記分數，不記孩子說了什麼
      track({ kind: 'speak', item: target, score: Number(s.toFixed(2)), attempt: tries + 1, correct: s >= 0.75 });
      if (s >= 0.75) { setStatus('ok'); playStar(); onDone(); }   // 只有念得夠像才過關
      else if (s >= 0.4) { setStatus('close'); setTries(t => t + 1); }
      else { setStatus('again'); setTries(t => t + 1); }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      // 分清楚是哪一種（Vega 2026-09-02：她明明開了麥克風卻看到「沒有權限」）：
      //  not-allowed         → 瀏覽器沒把麥克風給這個網站（網址列鎖頭→麥克風→允許）
      //  service-not-allowed → 瀏覽器的語音辨識服務不能用（Safari 要開「Siri 與聽寫」、Brave／內嵌瀏覽器不支援）
      //  network             → 語音辨識要連網
      // 三種都改用手動確認，但提示不同，而且可以按「再試一次」，不用重新整理
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed' || e?.error === 'network' || e?.error === 'audio-capture') {
        setDenyReason(e.error);
        setStatus('denied');
        return;
      }
      setStatus('again');
      setTries(t => t + 1);   // 沒聽到聲音也算一次嘗試，但不算過關
    };
    rec.onend = () => setStatus(st => (st === 'listening' ? (got ? st : 'again') : st));

    try { rec.start(); } catch { setStatus('again'); }
  }

  // 不支援 or 沒權限：改成孩子自己按「我念完了」
  if (supported === false || status === 'denied') {
    if (compact) {
      return (
        <div className="flex flex-col items-start gap-[0.8cqw]">
          <button onClick={() => { playStar(); onDone(); }}
            className="flex items-center gap-[2cqw] rounded-full border-[0.4cqw] border-dashed border-green-300 bg-green-100 text-green-700 px-[1cqw] py-[0.8cqw] pr-[3cqw] font-black transition active:scale-95">
            <span className="shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-[3cqw] shadow" style={{ width: '7.2cqw', height: '7.2cqw' }}>🎤</span>
            <span className="text-[3.2cqw] leading-tight text-left">“{target}” 我念完了！</span>
          </button>
          <p className="m-0 text-[2cqw] leading-snug text-gray-500">
            {status === 'denied' ? (denyHint[denyReason] || '麥克風暫時用不了，念完按上面就好') : '這個瀏覽器不能自動聽，念完按上面就好'}
            {status === 'denied' && <button onClick={retry} className="ml-[1cqw] underline text-purple-500 font-bold">再試一次</button>}
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-1.5">
        <button onClick={() => { playStar(); onDone(); }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold transition active:scale-95 whitespace-nowrap">
          🎤 我念完了！
        </button>
        <p className="text-[11px] text-gray-500 text-center max-w-xs">
          {status === 'denied' ? (denyHint[denyReason] || '麥克風暫時用不了，先用手動確認') : '這個瀏覽器不能自動聽，先用手動確認'}
          {status === 'denied' && <button onClick={retry} className="ml-1 underline text-purple-500 font-bold">再試一次</button>}
        </p>
      </div>
    );
  }

  const label: Record<Status, string> = {
    idle: '🎤 換我念',
    listening: '🔴 聽你念…（念完會自動停）',
    ok: '⭐ 念得很好！',
    close: '👍 差一點點，再念一次',
    again: '💪 沒聽清楚，再念一次',
    denied: '',
  };
  const color: Record<Status, string> = {
    idle: 'bg-green-500 hover:bg-green-600',
    listening: 'bg-red-500 animate-pulse',
    ok: 'bg-green-600',
    close: 'bg-amber-500 hover:bg-amber-600',
    again: 'bg-orange-500 hover:bg-orange-600',
    denied: '',
  };

  if (compact) {
    const pillTone: Record<Status, string> = {
      idle: 'bg-purple-100 border-purple-300 text-purple-700',
      listening: 'bg-red-100 border-red-300 text-red-600 animate-pulse',
      ok: 'bg-green-100 border-green-300 text-green-700',
      close: 'bg-amber-100 border-amber-300 text-amber-700',
      again: 'bg-orange-100 border-orange-300 text-orange-700',
      denied: '',
    };
    return (
      <div className="flex flex-col items-start gap-[0.8cqw]">
        <button onClick={start} disabled={status === 'ok'}
          className={`flex items-center gap-[2cqw] rounded-full border-[0.4cqw] border-dashed px-[1cqw] py-[0.8cqw] pr-[3cqw] font-black transition active:scale-95 disabled:opacity-80 ${pillTone[status]}`}>
          <span className={`shrink-0 rounded-full flex items-center justify-center text-white text-[3cqw] shadow ${status === 'listening' ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: '7.2cqw', height: '7.2cqw' }}>🎤</span>
          <span className="text-[3.2cqw] leading-tight text-left">
            {/* 句子一直留著，狀態（聽你念…／念得很好）放下面一行，過關後才看得到剛剛念的是哪句 */}
            <span className="block">“{target}”</span>
            {status !== 'idle' && <span className="block text-[2.4cqw] font-bold opacity-80 mt-[0.3cqw]">{label[status]}</span>}
          </span>
        </button>
        {heard && status !== 'ok' && (
          <p className="m-0 text-[2.1cqw] text-gray-500">聽到你念：<span className="font-bold text-gray-700">{heard}</span></p>
        )}
        {tries >= 3 && status !== 'ok' && (
          <button onClick={() => { playStar(); onDone(); }} className="text-[2.1cqw] text-gray-400 underline">先跳過這一句</button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button onClick={start} disabled={status === 'ok'}
        className={`${color[status]} text-white px-6 py-4 rounded-2xl font-bold transition active:scale-95 whitespace-nowrap disabled:opacity-80`}>
        {label[status]}
      </button>

      {heard && status !== 'ok' && (
        <p className="text-xs text-gray-500">
          聽到你念：<span className="font-bold text-gray-700">{heard}</span>
        </p>
      )}

      {/* 試很多次還是不行就讓他過，不要卡住 */}
      {tries >= 3 && status !== 'ok' && (
        <button onClick={() => { playStar(); onDone(); }}
          className="text-xs text-gray-400 underline">
          先跳過這一句
        </button>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { playTada } from '@/lib/sfx';
import { startAmbience, stopAmbience } from '@/lib/ambience';
import type { Word, Sentence, StoryScene, VideoLine } from '@/data/missions';
import { speak, stopSpeaking } from '@/lib/speech';
import { playClip, playLesson, lessonPath, isLetterCard, stopClip, sleep, wordSlug, playPageFlip } from '@/lib/audio';
import { stopAllAudio } from '@/lib/audioBus';
import VowelMommyFace from '@/components/mission/VowelMommyFace';
import { track } from '@/lib/analytics';
import SentenceMic from '@/components/mission/SentenceMic';
import GameButton from '@/components/GameButton';
import VideoKaraoke from '@/components/mission/VideoKaraoke';
import StoryCritters from '@/components/mission/StoryCritters';
import GrammarGuideCard from '@/components/mission/GrammarGuideCard';
import { GRAMMAR_GUIDES } from '@/data/grammarGuides';

interface Props {
  level: number;
  story: StoryScene[];
  words: Word[];
  sentences: Sentence[];
  phonicsLetters: string[];
  videoScript?: VideoLine[];
  videoUrl?: string;
  tip?: { zh: string; char?: string; face?: boolean };
  title?: string;
  titleEn?: string;
  missionId?: number;
  onComplete: () => void;
  onRegisterBack?: (fn: () => boolean) => void; // 供外層「上一步」逐層退：回傳 true=內部已處理
}

type Phase = 'video' | 'grammar' | 'story' | 'words' | 'phonics' | 'sentences';

// 各級內頁底圖的米色面板範圍（世界框共用：L1-2 彩虹谷／L3-4 友善小鎮／L5-6 海洋灣／L7-8 故事城堡）
const PANEL: Record<number, { left: string; right: string; top: string; bottom: string }> = {
  1: { left: '23%', right: '22%', top: '18%', bottom: '27%' },
  2: { left: '23%', right: '22%', top: '18%', bottom: '27%' },
  3: { left: '22%', right: '26%', top: '17%', bottom: '26%' },
  4: { left: '22%', right: '26%', top: '17%', bottom: '26%' },
  5: { left: '21%', right: '27%', top: '17%', bottom: '25%' },
  6: { left: '21%', right: '27%', top: '17%', bottom: '25%' },
  7: { left: '30%', right: '24%', top: '16%', bottom: '30%' },
  8: { left: '30%', right: '24%', top: '16%', bottom: '30%' },
  9:  { left: '27%', right: '26%', top: '18%', bottom: '29%' },
  10: { left: '27%', right: '26%', top: '18%', bottom: '29%' },
  11: { left: '28%', right: '24%', top: '16%', bottom: '30%' },
  12: { left: '28%', right: '24%', top: '16%', bottom: '30%' },
};

// YouTube 網址 → embed 網址
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

// 單字卡正面圖：有去背 PNG（public/words/<slug>.png）就用圖，沒有就用 emoji
function WordFace({ en, emoji }: { en: string; emoji: string }) {
  const [imgOk, setImgOk] = useState(true);
  if (imgOk) {
    return (
      <img
        src={`/words/${wordSlug(en)}.png`}
        alt={en}
        onError={() => setImgOk(false)}
        className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-1"
      />
    );
  }
  return <div className="text-6xl mb-1">{emoji}</div>;
}

export default function Discover({ level, story, words, sentences, phonicsLetters, videoScript, videoUrl, tip, title, titleEn, missionId, onComplete, onRegisterBack }: Props) {
  const hasVideo = !!videoUrl || (videoScript?.length ?? 0) > 0;
  // 每課影片後都要過「小挑戰」才能翻書（Vega 定案）：
  // 文法重點課走文法引導卡；其他課自動用本課單字生聽力挑戰（每次隨機）。
  const grammarGuide = useMemo(() => {
    const g = GRAMMAR_GUIDES[`${level}-${missionId ?? 0}`];
    if (g) return g;
    const pool = words.filter(w => w.en && w.zh && /^[A-Za-z' -]{1,20}$/.test(w.en));
    if (pool.length < 3) return null;
    // 混合小挑戰（Vega 定案）：聽力選字＋句型配對＋簡單口說
    const listenItems = pool.map(w => {
      const distract = pool.filter(x => x.en !== w.en).sort(() => Math.random() - 0.5).slice(0, 2).map(x => x.en);
      return { type: 'listen' as const, prompt: w.en, hint: '聽聽看，點出你聽到的字！', options: [w.en, ...distract], answer: w.en };
    });
    const senPool = sentences.map((sen, i) => ({ sen, i })).filter(x => x.sen.en && x.sen.zh);
    const matchItems = senPool.length >= 3 ? senPool.map(({ sen, i }) => {
      const distract = senPool.filter(x => x.i !== i).sort(() => Math.random() - 0.5).slice(0, 2).map(x => x.sen.zh);
      return { type: 'match' as const, prompt: sen.en, si: i, hint: '這句是什麼意思？', options: [sen.zh, ...distract], answer: sen.zh };
    }) : [];
    const speakItems = senPool.map(({ sen, i }) => (
      { type: 'speak' as const, prompt: sen.en, si: i, zh: sen.zh, hint: '', options: [], answer: sen.en }
    ));
    return { title: '小挑戰！', concept: '🎧', demos: [], practice: [...listenItems, ...matchItems, ...speakItems] };
  }, [level, missionId, words]);
  // 本機開發捷徑：網址加 ?ebook=1 直接跳到翻開的電子書（驗收內頁排版用，正式站不生效）
  const devEbook = process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('ebook') === '1';
  const [phase, setPhase] = useState<Phase>(devEbook ? 'story' : hasVideo ? 'video' : 'story');
  const [bookOpen, setBookOpen] = useState(devEbook);
  const [coverOk, setCoverOk] = useState(true); // 每課封面圖：/images/ebook/l{級}-m{課}-cover.webp，缺圖用預設設計
  const [contentOk, setContentOk] = useState(true); // 每級內頁底圖：/images/ebook/l{級}-content.webp，缺圖用預設白頁
  const [charZoom, setCharZoom] = useState(false); // 點動物放大/縮回
  const [letterPlay, setLetterPlay] = useState<{ letter: string; part: 'capital' | 'lower' | 'word' } | null>(null); // 字母卡唸到哪
  const letterPlayToken = useRef(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [seenCards, setSeenCards] = useState<number[]>([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentenceRepeated, setSentenceRepeated] = useState(false);
  const [pageDir, setPageDir] = useState<'next' | 'prev'>('next');

  const scene = story[storyIndex];
  const sentence = sentences[currentSentence];

  // 重整後留在同一頁（sessionStorage：phase / 書開合 / 頁碼）
  const ebookKey = `ae_ebook_${level}_${missionId ?? 0}`;
  useEffect(() => {
    try {
      const s = sessionStorage.getItem(ebookKey);
      if (s) {
        const o = JSON.parse(s);
        if (o.phase) setPhase(o.phase);
        if (typeof o.bookOpen === 'boolean') setBookOpen(o.bookOpen);
        if (typeof o.storyIndex === 'number' && o.storyIndex < story.length) setStoryIndex(o.storyIndex);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 換階段（電子書→單字卡→句型…）就把還在講的聲音停掉，別讓上一段跨階段繼續講
  useEffect(() => { stopAllAudio(); }, [phase]);

  useEffect(() => {
    try { sessionStorage.setItem(ebookKey, JSON.stringify({ phase, bookOpen, storyIndex })); } catch {}
  }, [ebookKey, phase, bookOpen, storyIndex]);

  // 外層「上一步」：逐層退（句型→拼讀→單字→電子書逐頁→封面→影片）；已在最前面回傳 false
  useEffect(() => {
    if (!onRegisterBack) return;
    onRegisterBack(() => {
      stopSpeaking();
      if (phase === 'story') {
        if (bookOpen && storyIndex > 0) { setPageDir('prev'); setStoryIndex(storyIndex - 1); return true; }
        if (bookOpen) { setBookOpen(false); return true; }
        if (grammarGuide) { setPhase('grammar'); return true; }
        if (hasVideo) { setPhase('video'); return true; }
        return false;
      }
      if (phase === 'grammar') {
        if (hasVideo) { setPhase('video'); return true; }
        return false;
      }
      const order: Phase[] = [...(hasVideo ? ['video' as Phase] : []), 'story', 'words', ...(phonicsLetters.length ? ['phonics' as Phase] : []), 'sentences'];
      const idx = order.indexOf(phase);
      if (idx <= 0) return false;
      const target = order[idx - 1];
      if (target === 'story') { setPhase('story'); setBookOpen(true); setStoryIndex(story.length - 1); }
      else setPhase(target);
      return true;
    });
  }, [onRegisterBack, phase, bookOpen, storyIndex, hasVideo, grammarGuide, phonicsLetters.length, story.length]);

  // 電子書自然環境音：打開書就低音量循環（海洋灣聽海浪、其他森林/溪流），闔上或離開就停
  useEffect(() => {
    if (phase === 'story' && bookOpen) startAmbience(level);
    else stopAmbience();
    return () => stopAmbience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, bookOpen]);

  // 故事自動播放語音：翻到哪一頁就播哪一句
  // 只在這裡播，翻頁按鈕不要再自己播一次（會變兩聲疊在一起像回音）
  useEffect(() => {
    if (phase !== 'story' || !bookOpen || !scene) return;
    if (storyIndex === story.length - 1) setTimeout(() => playTada(), 900);
    setSpoken(null);
    const t = setTimeout(() => sayDialogue(storyIndex, scene.dialogue, 0.75), 450);
    return () => { clearTimeout(t); stopClip(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, bookOpen, storyIndex]);

  // 點卡翻面：翻到背面時唸單字並記錄已看過
  function toggleCard(i: number) {
    if (openCards.includes(i)) {
      setOpenCards(o => o.filter(x => x !== i));
    } else {
      setOpenCards(o => [...o, i]);
      if (!seenCards.includes(i)) setSeenCards(s => [...s, i]);
      sayWord(words[i], 0.6);
    }
  }

  // ── 播音：一律先試 R2 上的真人錄音，沒有檔案才 fallback 到瀏覽器 TTS ──
  const mid = missionId ?? 1;

  // 「唸到哪亮到哪」：目前正在唸的那個字（key：'d'＝對話泡泡、's3'＝第 3 句 Listen & Say）
  const [spoken, setSpoken] = useState<{ key: string; idx: number } | null>(null);
  // 真人錄音沒有逐字時間 → 用字長比例推算（標點多停一下）；TTS 有 onboundary 就精準對字
  function wordTimer(text: string, key: string, lead = 0.12) {
    const ws = text.split(' ');
    const weights = ws.map(w => w.replace(/[^A-Za-z0-9']/g, '').length + 1.2 + (/[.,!?]$/.test(w) ? 1.5 : 0));
    const total = weights.reduce((a, b) => a + b, 0);
    const cum: number[] = []; weights.reduce((a, b, i) => (cum[i] = a + b), 0);
    let last = -2;
    const set = (idx: number) => { if (idx !== last) { last = idx; setSpoken({ key, idx }); } };
    set(-1);
    return {
      onTime: (t: number, dur: number) => {
        // lead：開頭靜音／慢速處理的延遲，扣掉再算比例；再往後偏 4%，讓黃色比聲音慢半拍而不是搶先
        const frac = Math.min(1, Math.max(0, (t - lead) / Math.max(0.3, dur - lead - 0.15)));
        const idx = cum.findIndex(c => c / total > frac + 0.04);
        set(idx < 0 ? ws.length - 1 : idx);
      },
      onWord: (charIndex: number) => set((text.slice(0, charIndex).match(/ /g) || []).length),
      done: () => { last = -2; setSpoken(cur => (cur?.key === key ? null : cur)); },
    };
  }

  async function sayDialogue(i: number, text: string, rate = 0.75) {
    // 🐢 慢速：真人錄音也要真的變慢（之前 rate 只有 TTS 吃到，錄音檔按了烏龜沒差別）
    // 0.8 而不是 0.7：保留音高的變速在 0.7 會有機械感；慢速時聲音處理有延遲，螢光要多等一點
    const clipRate = rate <= 0.5 ? 0.8 : 1;
    const tm = wordTimer(text, 'd', clipRate < 1 ? 0.35 : 0.12);
    if (await playLesson(lessonPath.dialogue(level, mid, i), tm.onTime, clipRate)) {
      tm.done();
      track({ kind: 'replay', level, mission: mid, step: 'story', item: `d${i + 1}`, audioSrc: 'el' });
      return;
    }
    track({ kind: 'replay', level, mission: mid, step: 'story', item: `d${i + 1}`, audioSrc: 'tts' });
    speak(text, rate, { onWord: tm.onWord, onEnd: tm.done });
  }
  // 單字卡：先拼字母再念單字（H-E-L-L-O, hello），沒有拼字檔就退回只念單字
  async function sayWord(w: Word, rate = 0.6) {
    if (await playLesson(lessonPath.spell(level, w.en))) {
      track({ kind: 'replay', level, mission: mid, step: 'words', item: w.en, audioSrc: 'el', meta: { kind: 'spell' } });
      return;
    }
    if (await playLesson(lessonPath.word(level, w.en))) {
      track({ kind: 'replay', level, mission: mid, step: 'words', item: w.en, audioSrc: 'el' });
      return;
    }
    track({ kind: 'replay', level, mission: mid, step: 'words', item: w.en, audioSrc: 'tts' });
    speak(w.en, rate);
  }
  async function saySentence(i: number, text: string, rate = 0.7) {
    const tm = wordTimer(text, `s${i}`);
    if (await playLesson(lessonPath.sentence(level, mid, i), tm.onTime)) {
      tm.done();
      track({ kind: 'replay', level, mission: mid, step: 'sentences', item: `s${i + 1}`, audioSrc: 'el' });
      return;
    }
    track({ kind: 'replay', level, mission: mid, step: 'sentences', item: `s${i + 1}`, audioSrc: 'tts' });
    speak(text, rate, { onWord: tm.onWord, onEnd: tm.done });
  }

  /**
   * 電子書內文點單字 → 只念單字（不拼字母，閱讀中被打斷拼字很怪）。
   * 一律先找 R2 上的真人錄音，沒有檔案才退回瀏覽器 TTS。
   * 之前這裡是直接 speak()，所以內文的字全都是電子音。
   */
  async function sayInlineWord(raw: string) {
    const clean = raw.replace(/[.,!?"'“”‘’]/g, '').trim();
    if (!clean) return;
    track({ kind: 'replay', level, mission: mid, step: 'story', item: clean, meta: { inline: true } });
    // 課文單字表裡有的，用該級的單字檔
    // 單一字母（L1/L2 課文裡的 A B C…）：用 Polly 錄好的字母檔，不要走 TTS
    if (/^[A-Za-z]$/.test(clean)) {
      if (await playLesson(lessonPath.letter(clean, 'capital'))) return;
    }
    const hit = words.find(w => w.en.toLowerCase() === clean.toLowerCase());
    if (hit && await playLesson(lessonPath.word(level, hit.en))) return;
    // 不在單字表也試一次：同一級的 words 資料夾是用 slug 命名的，可能有檔
    if (await playLesson(lessonPath.word(level, clean))) return;
    speak(clean, 0.5);
  }

  // 字母卡：大寫 → 小寫 → 舉例（Polly 錄音，沒檔才 fallback TTS）
  // phonicsLetters 在 L2 以上放的是文法主題，那種只念標題就好
  async function sayLetter(label: string, upper: string, lower: string) {
    if (!isLetterCard(label)) { speak(label, 0.8); return; }
    const seq: ('capital' | 'lower' | 'word')[] = ['capital', 'lower', 'word'];
    const token = ++letterPlayToken.current;
    for (const kind of seq) {
      if (letterPlayToken.current !== token) return; // 點了別張卡就讓位
      setLetterPlay({ letter: label, part: kind });  // 唸到哪個字形、哪個字形跳（Vega 定案）
      const ok = await playLesson(lessonPath.letter(upper, kind));
      if (!ok) {
        speak(kind === 'capital' ? `Capital ${upper}.`
            : kind === 'lower' ? `Lowercase ${lower}.`
            : `${upper} says ${lower}.`, 0.7);
        await sleep(1500);
      }
    }
    if (letterPlayToken.current === token) setLetterPlay(null);
  }

  // 拆音唸法：先唸完整單字，再用自然發音法拆音念（blue → bl [bl] ue [u] [blu]）
  // 音檔優先播錄音；沒檔時用慢速 TTS 佔位
  async function soundOut(w: Word) {
    const okWord = await playLesson(lessonPath.word(level, w.en));
    if (!okWord) { speak(w.en, 0.6); await sleep(1000); }
    const okBlend = await playLesson(lessonPath.blend(level, w.en));
    if (!okBlend) { await sleep(200); speak(w.en, 0.3); }
  }

  // ===== Phase 0: 對話影片（先一次看完，再進電子書） =====
  if (phase === 'video') {
    return (
      <div className="animate-slide-up min-h-[72vh] flex flex-col justify-center">
        <div className="text-center mb-4">
          <p className="ae-name-plaque inline-block text-white font-black text-xl sm:text-2xl px-2 py-1 drop-shadow">
            🎬 先看影片
          </p>
        </div>

        <div className="ae-frame max-w-xl mx-auto mb-6">
          {videoUrl ? (
            youtubeEmbed(videoUrl) ? (
              <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={youtubeEmbed(videoUrl)!}
                  title="對話影片"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <VideoKaraoke videoUrl={videoUrl} videoScript={videoScript} onEnded={() => setPhase(grammarGuide ? 'grammar' : 'story')} />
            )
          ) : (
            <div className="p-5">
              <div className="bg-purple-500 text-white px-4 py-2 text-sm font-bold rounded-xl mb-3 inline-block">
                🎬 對話影片（製作中）
              </div>
              <p className="text-xs text-gray-400 mb-2">影片還沒上，先看對話腳本（分鏡）：</p>
              <div className="space-y-1.5">
                {videoScript!.map((v, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="font-bold text-purple-600 shrink-0">{v.speaker}:</span>
                    <span className="text-gray-700">{v.line} <span className="text-gray-400">（{v.lineZh}）</span></span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 看完影片 → 進電子書 */}
        <div className="flex justify-center">
          <GameButton onClick={() => setPhase(grammarGuide ? 'grammar' : 'story')} color="purple" size="lg">
            {grammarGuide ? '先來個小挑戰 ⚔️ →' : '看完了，開始翻書 📖 →'}
          </GameButton>
        </div>
      </div>
    );
  }

  // ===== Phase 1: 電子書課文（一頁一課文，翻頁學習） =====
  if (phase === 'grammar' && grammarGuide) {
    return <GrammarGuideCard guide={grammarGuide} level={level} missionId={missionId ?? 0} onDone={() => setPhase('story')} />;
  }

  if (phase === 'story') {

    // ── 內頁排版用資料（Vega 2026-09-02 新版 UI）──
    // 每頁：角色對話泡泡 → Listen & Say（本課句子分配到各頁，最多 2 句）→
    // Magic Words（本頁重點字，最多 2 個）→ Your Turn（跟著唸）→ 小提示。
    const ck = scene?.characterKey || 'finn';
    const NAME_COLOR: Record<string, string> = {
      ruby: 'text-pink-500', finn: 'text-blue-500', coco: 'text-emerald-500',
      benny: 'text-amber-600', polly: 'text-orange-500', vega: 'text-purple-600',
    };
    const nameColor = NAME_COLOR[ck] || 'text-purple-600';
    const perPage = Math.max(1, Math.ceil(sentences.length / Math.max(1, story.length)));
    let pageSentences = sentences
      .map((sen, i) => ({ s: sen, i }))
      .filter(x => x.s.en && x.s.zh)
      .slice(storyIndex * perPage, storyIndex * perPage + perPage)
      .slice(0, 2);
    // 每頁至少 2 句（本課句子不夠分時，往後補下一句；只有 1 句就 1 句）
    if (pageSentences.length < 2 && sentences.length) {
      const all = sentences.map((sen, i) => ({ s: sen, i })).filter(x => x.s.en && x.s.zh);
      const startAt = Math.min(storyIndex * perPage, Math.max(0, all.length - 2));
      pageSentences = all.slice(startAt, startAt + 2);
    }
    const norm = (t: string) => t.replace(/[.,!?'"]/g, '').toLowerCase();
    const dialogueWords = new Set(norm(scene?.dialogue || '').split(/\s+/));
    const hiWords = (scene?.highlightWords || []).map(norm);
    const scored = words
      .filter(w => w.en && w.zh)
      .map(w => ({ w, score: hiWords.includes(norm(w.en)) ? 2 : dialogueWords.has(norm(w.en)) ? 1 : 0 }));
    let pageWords = scored.filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 2).map(x => x.w);
    if (pageWords.length < 2 && words.length) {
      const rest = words.filter(w => w.en && w.zh && !pageWords.includes(w));
      const wp = Math.max(1, Math.ceil(rest.length / Math.max(1, story.length)));
      const startAt = Math.min(storyIndex * wp, Math.max(0, rest.length - (2 - pageWords.length)));
      pageWords = [...pageWords, ...rest.slice(startAt, startAt + (2 - pageWords.length))];
    }
    const speakTarget = pageSentences[0]?.s.en || scene?.dialogue || '';
    const tipText = tip?.zh || '';

    const openBook = () => {
      setPageDir('next');
      setBookOpen(true);
      setStoryIndex(0);
      playPageFlip();
    };

    return (
      <div className="animate-slide-up">
        <div className="text-center mb-3">
          {hasVideo && (
            <div className="mb-2">
              <GameButton onClick={() => { setBookOpen(false); setPhase('video'); }} color="purple" size="sm" sound="click">
                ← 回看影片
              </GameButton>
            </div>
          )}
          <p className="ae-name-plaque inline-block text-white font-black text-base sm:text-lg px-1.5 py-0.5 drop-shadow">
            📖 翻書學習 · 像一本書
          </p>
        </div>

        {/* 一本書：封面 + 內頁（書本比例） */}
        <div className="book-perspective mx-auto mb-4 relative" style={{ maxWidth: 'min(92vw, calc((100dvh - 250px) * 0.72), 620px)' }}>
          {bookOpen && <StoryCritters pageKey={storyIndex} />}
          {!bookOpen ? (
            /* ── 封面 ── */
            coverOk && missionId ? (
              /* ── 封面（AI 生成整張封面圖） ── */
              <button
                key="cover"
                onClick={openBook}
                className="animate-page-next block w-full text-center active:scale-[0.99] transition"
              >
                {/* 封面比例＝內頁比例（1080/1456）。書封和翻開後的內頁必須同一個形狀，
                    不然一打開書就變形。2026-08-10 統一：L3 M11 之後那 70 張原本是 9:16，
                    塞進來會上下各裁 12.5%（切掉招牌與「ADVENTURE LEVEL n」紫帶），已全部重生成 3:4。 */}
                <span className="block relative rounded-r-3xl rounded-l-md overflow-hidden shadow-2xl"
                  style={{ aspectRatio: '1080 / 1456' }}>
                  <img
                    src={`/images/ebook/l${level}-m${missionId}-cover.webp`}
                    alt={titleEn || 'Story'}
                    onError={() => setCoverOk(false)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />
                </span>
                <span className="ae-btn ae-btn-gold ae-btn-md inline-block mt-3 whitespace-nowrap">翻開書本 📖 →</span>
              </button>
            ) : (
            <button
              key="cover"
              onClick={openBook}
              className="animate-page-next block w-full text-center relative rounded-r-3xl rounded-l-md overflow-hidden shadow-2xl min-h-[440px] sm:min-h-[500px] bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 active:scale-[0.99] transition"
            >
              {/* 書背 */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/15" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-8 py-8 sm:py-10">
                <p className="text-white/80 text-xs sm:text-sm font-bold mb-1 tracking-wide">冒險英語 · 第 {level} 級</p>
                <div className="text-7xl sm:text-8xl my-4 sm:my-5 drop-shadow-lg">{story[0]?.image || '📖'}</div>
                <h3 className="text-white text-2xl sm:text-3xl font-black drop-shadow mb-1">{titleEn || 'Story'}</h3>
                <p className="text-white/90 text-base sm:text-lg font-bold mb-6 sm:mb-7">{title || '故事'}</p>
                <div className="flex gap-1 mb-7 sm:mb-8">
                  {['finn', 'coco', 'polly', 'benny', 'ruby'].map(c => (
                    <img key={c} src={`/characters/${c}/${c}-normal.png`} alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                  ))}
                </div>
                <span className="inline-block bg-white/90 text-orange-500 px-5 sm:px-6 py-2.5 rounded-full font-bold shadow">翻開書本 📖 →</span>
              </div>
            </button>
            )
          ) : contentOk ? (
            /* ── 內頁（Vega 2026-09-02 新版：場景底圖 + 一張大卡片，內容分區） ── */
            <div
              key={storyIndex}
              className={`relative rounded-r-3xl rounded-l-md shadow-2xl overflow-hidden ${
                pageDir === 'next' ? 'animate-page-next' : 'animate-page-prev'
              }`}
              style={{ aspectRatio: '1080 / 1456', containerType: 'inline-size' }}
            >
              <img
                src={`/images/ebook/l${level}-content.webp`}
                alt=""
                onError={() => setContentOk(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* 大卡片：字級全部用 cqw（跟著書的寬度縮放），手機／桌機比例一致 */}
              <div
                className="absolute flex flex-col rounded-[4cqw] border-[0.6cqw] border-white/80 bg-[#fff9ec]/95 shadow-[0_1cqw_3cqw_rgba(60,40,20,0.25)]"
                style={{ left: '7%', right: '7%', top: '7%', bottom: tipText ? '17%' : '5%' }}
              >
                <div className="flex-1 min-h-0 flex flex-col gap-[1.6cqw] px-[3.6cqw] pt-[2.6cqw] pb-[2.4cqw] overflow-y-auto overflow-x-hidden">
                  {/* 頂列：課名木牌 + 頁碼星星 */}
                  <div className="flex items-start justify-between gap-2">
                    <p className="ae-name-plaque m-0 inline-block text-white font-black px-[2cqw] py-[0.8cqw] drop-shadow leading-tight" style={{ fontSize: '3.4cqw' }}>
                      {titleEn || title}
                    </p>
                    <div className="text-right shrink-0">
                      <p className="m-0 font-black text-amber-600 text-[3cqw] leading-none">{storyIndex + 1} / {story.length}</p>
                      <p className="m-0 mt-[0.6cqw] leading-none text-[2.4cqw] tracking-tight whitespace-nowrap">
                        {story.map((_, i) => (
                          <span key={i} style={{ opacity: i <= storyIndex ? 1 : 0.3, filter: i <= storyIndex ? 'none' : 'grayscale(70%)' }}>⭐</span>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* 角色對話：頭像 + 名字 + 泡泡（點泡泡會唸） */}
                  <div className="flex items-start gap-[2.4cqw]">
                    <div className="shrink-0 rounded-full bg-white/90 border-[0.5cqw] border-pink-100 overflow-hidden shadow-sm" style={{ width: '18cqw', height: '18cqw' }}>
                      <img src={`/characters/${ck}/${ck}-normal.png`} alt="" className="w-full h-full object-contain object-bottom" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`m-0 font-black text-[3.5cqw] leading-none ${nameColor}`}>{scene.characterName}</p>
                      <button
                        onClick={() => sayDialogue(storyIndex, scene.dialogue, 0.75)}
                        className="mt-[1cqw] w-full text-left rounded-[3cqw] rounded-tl-none bg-white/95 border-[0.4cqw] border-pink-100 px-[2.8cqw] py-[1.8cqw] shadow-sm active:scale-[0.99] transition"
                      >
                        <span className="ebook-text block text-gray-800 text-[3.5cqw] leading-snug">
                          {scene.dialogue.split(' ').map((w, wi) => {
                            const isHighlight = scene.highlightWords?.some(hw =>
                              w.replace(/[.,!?]/g, '').toLowerCase() === hw.toLowerCase() ||
                              hw.toLowerCase().includes(w.replace(/[.,!?]/g, '').toLowerCase())
                            );
                            const isNow = spoken?.key === 'd' && spoken.idx === wi;
                            return (
                              <span key={wi}>
                                <span
                                  className={`relative inline-block rounded-[0.8cqw] px-[0.3cqw] transition-colors duration-150 ${
                                    isNow ? 'bg-yellow-300 shadow-[0_0_0_0.35cqw_rgba(253,224,71,0.55)]' : ''
                                  } ${isHighlight ? 'text-pink-500 font-black cursor-pointer underline decoration-dotted decoration-pink-300 underline-offset-4 active:bg-pink-100' : ''}`}
                                  onClick={e => { if (isHighlight) { e.stopPropagation(); sayInlineWord(w); } }}
                                >
                                  {w}
                                  {isNow && <span className="absolute left-1/2 -translate-x-1/2 top-[88%] text-[2.6cqw] leading-none animate-bounce pointer-events-none select-none">👆</span>}
                                </span>{' '}
                              </span>
                            );
                          })}
                        </span>
                        {showTranslation && (
                          <span className="ebook-text-zh block text-gray-500 text-[2.6cqw] mt-[0.8cqw] animate-slide-up">{scene.dialogueZh}</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Listen & Say */}
                  {pageSentences.length > 0 && (
                    <div>
                      <p className="m-0 font-black text-purple-500 text-[2.9cqw] leading-none">
                        Listen &amp; Say 🔊 <span className="ml-[0.6cqw] text-gray-500 font-bold text-[2.2cqw]">點擊句子，聽我說！</span>
                      </p>
                      <div className="mt-[1.1cqw] flex flex-col gap-[1.1cqw]">
                        {pageSentences.map(({ s: sen, i }) => (
                          <button
                            key={i}
                            onClick={() => saySentence(i, sen.en)}
                            className="flex items-center gap-[2.2cqw] w-full text-left rounded-[2.6cqw] bg-purple-100/90 border-[0.4cqw] border-purple-200 px-[2.2cqw] py-[1.4cqw] active:scale-[0.99] transition"
                          >
                            <span className="shrink-0 rounded-full bg-purple-500 text-white flex items-center justify-center text-[3.2cqw] shadow" style={{ width: '7.6cqw', height: '7.6cqw' }}>🔊</span>
                            <span className="min-w-0">
                              <span className="ebook-text block text-purple-700 font-black text-[3.4cqw] leading-tight">
                                {sen.en.split(' ').map((w, wi) => {
                                  const isNow = spoken?.key === `s${i}` && spoken.idx === wi;
                                  return (
                                    <span key={wi}>
                                      <span className={`relative inline-block rounded-[0.8cqw] px-[0.3cqw] transition-colors duration-150 ${isNow ? 'bg-yellow-300 text-purple-900 shadow-[0_0_0_0.35cqw_rgba(253,224,71,0.55)]' : ''}`}>
                                        {w}
                                        {isNow && <span className="absolute left-1/2 -translate-x-1/2 top-[88%] text-[2.4cqw] leading-none animate-bounce pointer-events-none select-none">👆</span>}
                                      </span>{' '}
                                    </span>
                                  );
                                })}
                              </span>
                              <span className="block text-gray-500 text-[2.3cqw] mt-[0.3cqw]">{sen.zh}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Magic Words */}
                  {pageWords.length > 0 && (
                    <div>
                      <p className="m-0 font-black text-purple-500 text-[2.9cqw] leading-none">✨ Magic Words</p>
                      <div className="mt-[1.1cqw] grid grid-cols-2 gap-[1.4cqw] pr-[22%]">
                        {pageWords.map(w => (
                          <button
                            key={w.en}
                            onClick={() => sayInlineWord(w.en)}
                            className="text-left rounded-[2.2cqw] bg-white/95 border-[0.4cqw] border-purple-100 px-[2cqw] py-[1.1cqw] active:scale-[0.98] transition"
                          >
                            <span className="flex items-center justify-between gap-1">
                              <span className="font-black text-purple-600 text-[2.9cqw] truncate">{w.en}</span>
                              <span className="text-[2.4cqw] shrink-0">⭐</span>
                            </span>
                            <span className="block text-gray-500 text-[2.2cqw] truncate">{w.zh}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Your Turn：跟著唸 */}
                  <div className="rounded-[2.6cqw] bg-amber-50/95 border-[0.4cqw] border-amber-200 px-[2.8cqw] py-[1.8cqw] mt-auto mr-[22%]">
                    <div className="flex items-start justify-between gap-[1cqw]">
                      <div>
                        <p className="m-0 font-black text-rose-500 text-[2.9cqw] leading-none">🎯 Your Turn!</p>
                        <p className="m-0 mt-[0.8cqw] text-gray-700 font-bold text-[2.4cqw] leading-snug">{scene.characterName} 說完了，換你說說看：</p>
                      </div>
                      {/* Try it! 加油泡泡（純裝飾） */}
                      <div className="shrink-0 rounded-full bg-amber-100 border-[0.4cqw] border-amber-300 px-[1.8cqw] py-[0.8cqw] text-center rotate-[-6deg]">
                        <p className="m-0 font-black text-orange-500 text-[2.4cqw] leading-none">Try it!</p>
                        <p className="m-0 mt-[0.3cqw] font-bold text-orange-400 text-[1.8cqw] leading-none">你可以的！</p>
                      </div>
                    </div>
                    <div className="mt-[1cqw]">
                      <SentenceMic key={`${storyIndex}-${speakTarget}`} target={speakTarget} onDone={() => playTada()} compact />
                    </div>
                  </div>
                </div>
              </div>

              {/* 大角色：站在卡片右下角外側（點一下放大、再點縮回） */}
              <div className="absolute animate-float" style={{ right: '1%', bottom: tipText ? '15%' : '4%', width: '30%', height: '34%', zIndex: 5 }}>
                <div className="w-full h-full flex items-end justify-center">
                  <img
                    src={`/characters/${ck}/${ck}-${scene.characterAction || 'talk'}.png`}
                    alt={scene.characterName}
                    onClick={e => { e.stopPropagation(); setCharZoom(z => !z); }}
                    className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_6px_10px_rgba(60,40,90,0.35)] cursor-pointer transition-transform duration-300"
                    style={{ transform: charZoom ? 'scale(1.35)' : 'scale(1)', transformOrigin: 'bottom center' }}
                  />
                </div>
              </div>

              {/* 小提示 Tip：卡片下方、場景之上 */}
              {tipText && (
                <div className="absolute rounded-[3cqw] bg-white/85 border-[0.4cqw] border-amber-200 px-[2.8cqw] py-[1.4cqw] backdrop-blur-sm" style={{ left: '7%', right: '7%', bottom: '3%' }}>
                  <p className="m-0 font-black text-purple-500 text-[2.5cqw] leading-none">💡 小提示 Tip</p>
                  <p className="m-0 mt-[0.6cqw] text-gray-600 font-bold text-[2.2cqw] leading-snug">{tipText}</p>
                </div>
              )}
            </div>
          ) : (
            /* ── 內頁（預設白頁） ── */
            <div
              key={storyIndex}
              className={`relative bg-[#fffdf7] rounded-r-3xl rounded-l-md border border-amber-200 shadow-2xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col ${
                pageDir === 'next' ? 'animate-page-next' : 'animate-page-prev'
              }`}
            >
              {/* 書背裝訂線 */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-200/80 to-transparent z-10" />

              {/* 課文占滿整頁 —— 原本上半頁放 emoji 插畫，Vega 說那些手勢 emoji 不好看，
                  拿掉之後把字放大填滿，孩子看課文比較專心 */}
              <div className="flex-1 px-5 sm:px-7 py-6 sm:py-8 flex items-start gap-3 sm:gap-4">
                <img
                  src={`/characters/${scene.characterKey || 'finn'}/${scene.characterKey || 'finn'}-${scene.characterAction || 'talk'}.png`}
                  alt={scene.characterName}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain flex-shrink-0"
                />
                <div className="flex-1 min-w-0 pl-1 sm:pl-2">
                  <p className="text-sm text-gray-400 font-bold mb-2">{scene.characterName}</p>
                  <p className="ebook-text text-gray-800 text-lg sm:text-3xl leading-relaxed">
                    {scene.dialogue.split(' ').map((w, wi) => {
                      const isHighlight = scene.highlightWords?.some(hw =>
                        w.replace(/[.,!?]/g, '').toLowerCase() === hw.toLowerCase() ||
                        hw.toLowerCase().includes(w.replace(/[.,!?]/g, '').toLowerCase())
                      );
                      return (
                        <span key={wi}>
                          <span
                            className={isHighlight ? 'text-purple-600 bg-purple-100 px-1 rounded cursor-pointer underline decoration-dotted decoration-purple-400 underline-offset-4 active:bg-purple-200' : ''}
                            onClick={() => { if (isHighlight) sayInlineWord(w); }}
                          >
                            {w}
                          </span>{' '}
                        </span>
                      );
                    })}
                  </p>
                  {showTranslation && (
                    <p className="ebook-text-zh text-gray-500 text-sm sm:text-base mt-2 animate-slide-up">{scene.dialogueZh}</p>
                  )}
                  {/* 讓孩子知道紫色的字可以點 —— 沒說的話多數人不會發現 */}
                  {!!scene.highlightWords?.length && (
                    <p className="mt-1.5 text-[10px] sm:text-xs font-bold text-purple-400">
                      👆 點<span className="mx-0.5 rounded bg-purple-100 px-1 text-purple-600 underline decoration-dotted decoration-purple-400 underline-offset-2">紫色的字</span>，念給你聽 🔊
                    </p>
                  )}
                </div>
              </div>

              {/* 頁碼 */}
              <div className="text-center pb-3 text-xs text-amber-400 font-bold">
                第 {storyIndex + 1} / {story.length} 頁
              </div>
            </div>
          )}
        </div>

        {/* 內頁才顯示圓點與翻頁列 */}
        {bookOpen && (
          <>
            <div className="flex justify-center gap-1.5 mb-4">
              {story.map((_, i) => (
                <button
                  key={i}
                  aria-label={`第 ${i + 1} 頁`}
                  onClick={() => {
                    if (i === storyIndex) return;
                    stopSpeaking();
                    setPageDir(i >= storyIndex ? 'next' : 'prev');
                    setShowTranslation(false);
                    playPageFlip();
                    setStoryIndex(i);   // 播音交給 storyIndex 的 useEffect，這裡再播會變兩聲
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === storyIndex ? 'w-6 bg-purple-500' : i < storyIndex ? 'w-2.5 bg-green-300' : 'w-2.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  stopSpeaking();
                  setShowTranslation(false);
                  setPageDir('prev');
                  playPageFlip();
                  if (storyIndex > 0) {
                    const prev = storyIndex - 1;
                    setStoryIndex(prev);
                  } else {
                    setBookOpen(false); // 第一頁再往前 → 回封面
                  }
                }}
                className="bg-amber-100 text-amber-600 px-4 sm:px-5 py-3 rounded-2xl font-bold hover:bg-amber-200 transition active:scale-95">
                {storyIndex === 0 ? '📕' : '◀'}
              </button>
              <button onClick={() => sayDialogue(storyIndex, scene.dialogue, 0.5)}
                className="bg-blue-100 text-blue-600 px-4 sm:px-5 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95">
                🐢
              </button>
              <button onClick={() => setShowTranslation(!showTranslation)}
                className={`px-4 sm:px-5 py-3 rounded-2xl font-bold transition active:scale-95 ${
                  showTranslation
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                {showTranslation ? '中 ✓' : '中'}
              </button>
              <GameButton color="green" size="md" onClick={() => {
                stopSpeaking();
                setShowTranslation(false);
                if (storyIndex < story.length - 1) {
                  setPageDir('next');
                  playPageFlip();
                  const next = storyIndex + 1;
                  setStoryIndex(next);
                } else {
                  setPhase('words');
                }
              }}
                >
                {storyIndex < story.length - 1 ? '▶' : '📝'}
              </GameButton>
            </div>
          </>
        )}
      </div>
    );
  }

  // ===== Phase 2: 單字翻卡牌組（10 張，點卡各自翻面 + 發音） =====
  if (phase === 'words') {
    const allSeen = seenCards.length === words.length;
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-blue-500 bg-blue-50 inline-block px-4 py-1 rounded-full">
            📝 Word Time · 翻開全部 {seenCards.length}/{words.length}
          </p>
        </div>

        {/* 💡 小老師提醒（角色泡泡）：母音媽媽 / a-an 規則 / 例外字 */}
        {tip && (
          <div className="max-w-xl mx-auto mb-4 flex items-start gap-2 animate-slide-up">
            <img src={`/characters/${tip.char || 'coco'}/${tip.char || 'coco'}-talk.png`} alt="小老師" className="w-16 h-16 object-contain flex-shrink-0" />
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl rounded-tl-none px-4 py-2 flex-1">
              <p className="text-xs font-bold text-amber-500 mb-0.5">💡 小提醒</p>
              <p className="text-sm text-gray-700 leading-relaxed">{tip.zh}</p>
              {tip.face && (
                <div className="mt-2 flex justify-center">
                  <VowelMommyFace size={150} showLabels />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 進度條 */}
        <div className="flex gap-1 mb-5 max-w-xl mx-auto">
          {words.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${
              seenCards.includes(i) ? 'bg-green-400' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        {/* 翻卡牌組 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
          {words.map((w, i) => {
            const isOpen = openCards.includes(i);
            return (
              <div key={i} style={{ perspective: '800px' }}>
                <div
                  onClick={() => toggleCard(i)}
                  className="relative cursor-pointer transition-transform duration-500 active:scale-95"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0)',
                    minHeight: '150px',
                  }}
                >
                  {/* 正面：圖 */}
                  <div
                    className={`absolute inset-0 bg-white rounded-2xl shadow-md border-2 flex flex-col items-center justify-center p-3 ${
                      seenCards.includes(i) ? 'border-green-200' : 'border-blue-200'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <WordFace en={w.en} emoji={w.image} />
                    <p className="text-gray-300 text-xs">👆 tap</p>
                  </div>
                  {/* 背面：單字 + 發音 */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border-2 border-blue-300 flex flex-col items-center justify-center p-3 text-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-xl font-black text-gray-800 leading-tight">{w.en}</p>
                    <p className="text-xs text-gray-400 mb-1">{w.zh}</p>
                    {w.kk && <p className="text-[11px] text-purple-600">KK {w.kk}</p>}
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); sayWord(w, 0.5); }}
                        className="bg-blue-500 text-white w-9 h-9 rounded-full font-bold hover:bg-blue-600 transition active:scale-95 flex items-center justify-center"
                        title="唸單字"
                      >
                        🔊
                      </button>
                      {level === 2 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); soundOut(w); }}
                          className="bg-green-500 text-white px-3 h-9 rounded-full font-bold text-sm hover:bg-green-600 transition active:scale-95 flex items-center gap-1"
                          title="拆音（自然發音）"
                        >
                          🔤 拆音
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 繼續（翻完全部才解鎖） */}
        <div className="text-center">
          {!allSeen && (
            <p className="text-sm text-gray-400 mb-2">翻開全部單字就能繼續 🔓</p>
          )}
          {allSeen ? (
            <GameButton onClick={() => setPhase('phonics')} color="green" size="md">
            {allSeen ? '🔤 ▶' : `還有 ${words.length - seenCards.length} 張`}
          </GameButton>
          ) : (
            <button disabled className="px-8 py-3 rounded-2xl font-bold bg-gray-200 text-gray-400 cursor-not-allowed">
            {allSeen ? '🔤 ▶' : `還有 ${words.length - seenCards.length} 張`}
          </button>
          )}
        </div>
      </div>
    );
  }

  // ===== Phase 3: Phonics 字母 =====
  if (phase === 'phonics') {
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-green-500 bg-green-50 inline-block px-4 py-1 rounded-full">
            🔤 Phonics Time
          </p>
        </div>

        <div className="text-center mb-6">
          <img src="/characters/polly/polly-sing.png" alt="Polly" className="inline-block w-40 h-40 object-contain mb-2" />
          <p className="text-lg font-bold text-gray-700">
            Polly: &ldquo;Repeat after me!&rdquo;
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200 max-w-xl mx-auto">
          <div className="flex justify-center gap-6 mb-6">
            {phonicsLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  const upper = letter.charAt(0).toUpperCase();
                  const lower = letter.charAt(0).toLowerCase();
                  sayLetter(letter, upper, lower);
                }}
                className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl font-black text-green-700 border-2 border-green-300 hover:scale-110 transition-all active:scale-95 shadow-md"
              >
                {/^[A-Za-z]{2}$/.test(letter.trim()) ? (
                  <span className="flex items-end gap-0.5">
                    <span className={`inline-block transition-transform duration-200 ${letterPlay?.letter === letter && letterPlay.part === 'capital' ? 'scale-150 -translate-y-1 text-emerald-500' : ''}`}>{letter.trim().charAt(0)}</span>
                    <span className={`inline-block transition-transform duration-200 ${letterPlay?.letter === letter && letterPlay.part === 'lower' ? 'scale-150 -translate-y-1 text-emerald-500' : ''}`}>{letter.trim().charAt(1)}</span>
                  </span>
                ) : letter}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mb-6">
            👆 Tap to hear!
          </p>

          <div className="text-center">
            <GameButton onClick={() => setPhase('sentences')} color="green" size="md">
              💬 ▶
            </GameButton>
          </div>
        </div>
      </div>
    );
  }

  // ===== Phase 4: 句型練習 =====
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-orange-500 bg-orange-50 inline-block px-4 py-1 rounded-full">
          💬 Sentence Time ({currentSentence + 1}/{sentences.length})
        </p>
      </div>

      <div className="text-center mb-4">
        <img src="/characters/benny/benny-read.png" alt="Benny" className="inline-block w-40 h-40 object-contain mb-2" />
        <p className="text-lg font-bold text-gray-700">
          Benny: &ldquo;Let&apos;s read!&rdquo;
        </p>
      </div>

      <div className="flex gap-1 mb-6">
        {sentences.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < currentSentence ? 'bg-green-400' : i === currentSentence ? 'bg-orange-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-200 max-w-xl mx-auto">
        <p className="text-2xl font-bold text-center text-gray-800 mb-6 leading-relaxed">
          {sentence.en}
        </p>

        {!sentenceRepeated ? (
          <div className="flex justify-center gap-3">
            <button onClick={() => saySentence(currentSentence, sentence.en, 0.7)}
              className="bg-orange-100 text-orange-600 px-6 py-4 rounded-2xl font-bold hover:bg-orange-200 transition active:scale-95">
              🔊
            </button>
            <button onClick={() => speak(sentence.en, 0.5)}
              className="bg-blue-50 text-blue-500 px-5 py-4 rounded-2xl font-medium hover:bg-blue-100 transition active:scale-95">
              🐢
            </button>
            <SentenceMic target={sentence.en} onDone={() => setSentenceRepeated(true)} />
          </div>
        ) : (
          <div className="text-center animate-slide-up">
            <p className="text-green-600 font-bold text-lg mb-4">⭐ Great!</p>
            <GameButton onClick={() => {
              setSentenceRepeated(false);
              if (currentSentence < sentences.length - 1) setCurrentSentence(c => c + 1);
              else onComplete();
            }} color="green" size="md">
              {currentSentence < sentences.length - 1 ? '▶' : '🎮'}
            </GameButton>
          </div>
        )}
      </div>
    </div>
  );
}

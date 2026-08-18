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
  const [phase, setPhase] = useState<Phase>(hasVideo ? 'video' : 'story');
  const [bookOpen, setBookOpen] = useState(false);
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

  async function sayDialogue(i: number, text: string, rate = 0.75) {
    if (await playLesson(lessonPath.dialogue(level, mid, i))) {
      track({ kind: 'replay', level, mission: mid, step: 'story', item: `d${i + 1}`, audioSrc: 'el' });
      return;
    }
    track({ kind: 'replay', level, mission: mid, step: 'story', item: `d${i + 1}`, audioSrc: 'tts' });
    speak(text, rate);
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
    if (await playLesson(lessonPath.sentence(level, mid, i))) {
      track({ kind: 'replay', level, mission: mid, step: 'sentences', item: `s${i + 1}`, audioSrc: 'el' });
      return;
    }
    track({ kind: 'replay', level, mission: mid, step: 'sentences', item: `s${i + 1}`, audioSrc: 'tts' });
    speak(text, rate);
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
            /* ── 內頁（固定底圖 + 內容疊在米色面板） ── */
            <div
              key={storyIndex}
              className={`relative rounded-r-3xl rounded-l-md shadow-2xl overflow-hidden ${
                pageDir === 'next' ? 'animate-page-next' : 'animate-page-prev'
              }`}
              style={{ aspectRatio: '1080 / 1456' }}
            >
              <img
                src={`/images/ebook/l${level}-content.webp`}
                alt=""
                onError={() => setContentOk(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* 內容區（米色面板範圍，各級底圖框位置不同）：只放場景 + 課文 */}
              <div className="absolute flex flex-col" style={PANEL[level] || PANEL[1]}>
                {/* 面板頂：課名木牌＋頁碼——補掉原本空蕩蕩的上方（Vega 2026-08-15）；
                    不放 emoji（她之前退過手勢 emoji）。 */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <p className="ae-name-plaque m-0 inline-block text-white font-black text-sm sm:text-lg px-1.5 py-0.5 drop-shadow">
                    {titleEn || title}
                  </p>
                  <p className="m-0 text-[10px] sm:text-xs font-black text-amber-600/80 whitespace-nowrap">
                    {storyIndex + 1} / {story.length}
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-center min-h-0 pr-[14%]">
                  <p className="text-sm sm:text-xl font-black mb-2 text-amber-600">{scene.characterName}</p>
                  {/* 手機面板窄，字太大會一行一個字還壓到星星；手機 lg、平板 3xl、桌機才 4xl */}
                  <p className="ebook-text text-gray-800 text-lg sm:text-3xl lg:text-4xl leading-relaxed">
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
                    <p className="ebook-text-zh text-gray-500 text-sm sm:text-lg mt-3 animate-slide-up">{scene.dialogueZh}</p>
                  )}
                  {/* 讓孩子知道紫色的字可以點 —— 沒說的話多數人不會發現 */}
                  {!!scene.highlightWords?.length && (
                    <p className="mt-1.5 text-[10px] sm:text-xs font-bold text-purple-400">
                      👆 點<span className="mx-0.5 rounded bg-purple-100 px-1 text-purple-600 underline decoration-dotted decoration-purple-400 underline-offset-2">紫色的字</span>，念給你聽 🔊
                    </p>
                  )}
                </div>
                {/* 頁數：星星表示（目前頁亮） */}
                <div className="flex justify-center gap-0.5 sm:gap-1">
                  {story.map((_, i) => (
                    <span key={i} className="transition-all" style={{ fontSize: i === storyIndex ? 'clamp(14px,1.8vw,22px)' : 'clamp(10px,1.3vw,16px)', opacity: i === storyIndex ? 1 : 0.35, filter: i === storyIndex ? 'none' : 'grayscale(60%)' }}>⭐</span>
                  ))}
                </div>
              </div>
              {/* 動物：頁面右下角、眼神朝向課文（會浮動；點一下放大、再點縮回） */}
              <div className="absolute animate-float" style={{ right: '9%', bottom: '13%', width: '24%', height: '38%', zIndex: 5 }}>
                <div className="w-full h-full flex items-end justify-center">
                  <img
                    src={`/characters/${scene.characterKey || 'finn'}/${scene.characterKey || 'finn'}-${scene.characterAction || 'talk'}.png`}
                    alt={scene.characterName}
                    onClick={e => { e.stopPropagation(); setCharZoom(z => !z); }}
                    className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_6px_10px_rgba(60,40,90,0.35)] cursor-pointer transition-transform duration-300"
                    style={{ transform: charZoom ? 'scale(1.45)' : 'scale(1)', transformOrigin: 'bottom center' }}
                  />
                </div>
              </div>
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

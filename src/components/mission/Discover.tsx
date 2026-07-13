'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Word, Sentence, StoryScene, VideoLine } from '@/data/missions';
import { speak } from '@/lib/speech';
import { playClip, sleep, wordSlug } from '@/lib/audio';

interface Props {
  level: number;
  story: StoryScene[];
  words: Word[];
  sentences: Sentence[];
  phonicsLetters: string[];
  videoScript?: VideoLine[];
  videoUrl?: string;
  onComplete: () => void;
}

type Phase = 'story' | 'words' | 'phonics' | 'sentences';

// YouTube 網址 → embed 網址
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export default function Discover({ level, story, words, sentences, phonicsLetters, videoScript, videoUrl, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('story');
  const [storyIndex, setStoryIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [seenCards, setSeenCards] = useState<number[]>([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentenceRepeated, setSentenceRepeated] = useState(false);

  const scene = story[storyIndex];
  const sentence = sentences[currentSentence];

  // 故事自動播放語音
  const playStory = useCallback(() => {
    if (phase === 'story' && scene) {
      setTimeout(() => speak(scene.dialogue, 0.75), 300);
    }
  }, [phase, scene]);

  useEffect(() => {
    playStory();
  }, [storyIndex, playStory]);

  // 點卡翻面：翻到背面時唸單字並記錄已看過
  function toggleCard(i: number) {
    if (openCards.includes(i)) {
      setOpenCards(o => o.filter(x => x !== i));
    } else {
      setOpenCards(o => [...o, i]);
      if (!seenCards.includes(i)) setSeenCards(s => [...s, i]);
      speak(words[i].en, 0.6);
    }
  }

  // 拆音唸法：先唸完整單字，再用自然發音法拆音念（blue → bl [bl] ue [u] [blu]）
  // 音檔優先播 Vega 的錄音；沒檔時暫時用慢速 TTS 佔位
  async function soundOut(w: Word) {
    const slug = wordSlug(w.en);
    const okWord = await playClip(`/lessons/L2/${slug}.mp3`);
    if (!okWord) { speak(w.en, 0.6); await sleep(1000); }
    const okBlend = await playClip(`/lessons/L2/${slug}-blend.mp3`);
    if (!okBlend) { await sleep(200); speak(w.en, 0.3); }
  }

  // ===== Phase 1: 對話故事（全篇 + 點擊播放 + 動畫） =====
  if (phase === 'story') {
    const animationClass: Record<string, string> = {
      wave: 'animate-wave',
      bounce: 'animate-bounce',
      shake: 'animate-shake',
      spin: 'animate-spin',
      float: 'animate-float',
      tada: 'animate-tada',
    };

    return (
      <div className="animate-slide-up">
        {/* 🎬 對話影片位：有連結就播，沒連結顯示腳本分鏡（等 Vega 的影片） */}
        {(videoUrl || (videoScript && videoScript.length > 0)) && (
          <div className="mb-6 bg-white rounded-3xl border-2 border-purple-200 shadow-sm overflow-hidden max-w-xl mx-auto">
            <div className="bg-purple-500 text-white px-4 py-2 text-sm font-bold">
              🎬 對話影片{videoUrl ? '' : ' · 製作中'}
            </div>
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
                <video className="w-full" controls src={videoUrl} />
              )
            ) : (
              <div className="p-4">
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
        )}

        <div className="text-center mb-4">
          <p className="text-sm font-medium text-purple-500 bg-purple-50 inline-block px-4 py-1 rounded-full">
            📖 Story Time
          </p>
        </div>

        {/* 動畫場景區 */}
        <div className="bg-gradient-to-b from-blue-100 to-purple-50 rounded-3xl p-6 mb-6 min-h-[180px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* 場景背景 */}
          <div className="text-7xl mb-2">{scene.image}</div>

          {/* 場景 emoji 動畫 */}
          <div className="flex gap-4 text-4xl">
            {scene.sceneEmojis.map((emoji, i) => (
              <span
                key={`${storyIndex}-${i}`}
                className={`inline-block ${animationClass[scene.animation] || 'animate-bounce'}`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s',
                  animationIterationCount: storyIndex === story.length - 1 && scene.animation === 'bounce' ? 'infinite' : '3',
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* 完整對話列表 */}
        <div className="max-w-xl mx-auto space-y-3 mb-6">
          {story.map((s, i) => {
            const isActive = i === storyIndex;
            const isPast = i < storyIndex;

            return (
              <button
                key={i}
                onClick={() => {
                  setStoryIndex(i);
                  setShowTranslation(false);
                  speak(s.dialogue, 0.75);
                }}
                className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-white border-2 border-purple-400 shadow-lg scale-[1.02]'
                    : isPast
                    ? 'bg-green-50 border-2 border-green-200 opacity-80'
                    : 'bg-gray-50 border-2 border-gray-100 opacity-50'
                }`}
              >
                <span className="flex-shrink-0">
                  {isPast ? <span className="text-3xl">✅</span> : <img src={`/characters/${s.characterKey || 'finn'}/${s.characterKey || 'finn'}-${s.characterAction || 'talk'}.png`} alt={s.characterName} className="w-28 h-28 object-contain" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-bold">{s.characterName}</p>
                  <p className={`font-bold leading-relaxed ${
                    isActive ? 'text-gray-800 text-lg' : 'text-gray-600 text-sm'
                  }`}>
                    {isActive ? (
                      // 活躍句子：重點單字標色
                      s.dialogue.split(' ').map((w, wi) => {
                        const isHighlight = s.highlightWords?.some(hw =>
                          w.replace(/[.,!?]/g, '').toLowerCase() === hw.toLowerCase() ||
                          hw.toLowerCase().includes(w.replace(/[.,!?]/g, '').toLowerCase())
                        );
                        return (
                          <span key={wi}>
                            <span
                              className={isHighlight ? 'text-purple-600 bg-purple-100 px-1 rounded' : ''}
                              onClick={(e) => {
                                if (isHighlight) {
                                  e.stopPropagation();
                                  speak(w.replace(/[.,!?]/g, ''), 0.5);
                                }
                              }}
                            >
                              {w}
                            </span>{' '}
                          </span>
                        );
                      })
                    ) : (
                      s.dialogue
                    )}
                  </p>
                  {showTranslation && (
                    <p className="text-gray-400 text-xs mt-1 animate-slide-up">{s.dialogueZh}</p>
                  )}
                </div>
                {isActive && (
                  <span className="text-purple-400 text-xl flex-shrink-0">🔊</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 操作列 */}
        <div className="flex justify-center gap-3">
          <button onClick={() => speak(scene.dialogue, 0.5)}
            className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95">
            🐢
          </button>
          <button onClick={() => setShowTranslation(!showTranslation)}
            className={`px-5 py-3 rounded-2xl font-bold transition active:scale-95 ${
              showTranslation
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}>
            {showTranslation ? '中 ✓' : '中'}
          </button>
          <button onClick={() => {
            setShowTranslation(false);
            if (storyIndex < story.length - 1) {
              const next = storyIndex + 1;
              setStoryIndex(next);
              speak(story[next].dialogue, 0.75);
            } else {
              setPhase('words');
            }
          }}
            className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95">
            {storyIndex < story.length - 1 ? '▶' : '📝'}
          </button>
        </div>
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
                    <div className="text-6xl mb-1">{w.image}</div>
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
                        onClick={(e) => { e.stopPropagation(); speak(w.en, 0.5); }}
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
          <button
            onClick={() => setPhase('phonics')}
            disabled={!allSeen}
            className={`px-8 py-3 rounded-2xl font-bold transition active:scale-95 ${
              allSeen
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allSeen ? '🔤 ▶' : `還有 ${words.length - seenCards.length} 張`}
          </button>
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
                  speak(`Capital ${upper}.`, 0.7);
                  setTimeout(() => speak(`Lowercase ${lower}.`, 0.7), 1500);
                  setTimeout(() => speak(`${upper} says ${lower}.`, 0.7), 3000);
                }}
                className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl font-black text-green-700 border-2 border-green-300 hover:scale-110 transition-all active:scale-95 shadow-md"
              >
                {letter}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mb-6">
            👆 Tap to hear!
          </p>

          <div className="text-center">
            <button onClick={() => setPhase('sentences')}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition active:scale-95">
              💬 ▶
            </button>
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
            <button onClick={() => speak(sentence.en, 0.7)}
              className="bg-orange-100 text-orange-600 px-6 py-4 rounded-2xl font-bold hover:bg-orange-200 transition active:scale-95">
              🔊
            </button>
            <button onClick={() => speak(sentence.en, 0.5)}
              className="bg-blue-50 text-blue-500 px-5 py-4 rounded-2xl font-medium hover:bg-blue-100 transition active:scale-95">
              🐢
            </button>
            <button onClick={() => { speak(sentence.en, 0.7); setSentenceRepeated(true); }}
              className="bg-green-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95">
              🎤
            </button>
          </div>
        ) : (
          <div className="text-center animate-slide-up">
            <p className="text-green-600 font-bold text-lg mb-4">⭐ Great!</p>
            <button onClick={() => {
              setSentenceRepeated(false);
              if (currentSentence < sentences.length - 1) setCurrentSentence(c => c + 1);
              else onComplete();
            }}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95">
              {currentSentence < sentences.length - 1 ? '▶' : '🎮'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

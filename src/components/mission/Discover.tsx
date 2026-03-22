'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import type { Word, Sentence, StoryScene } from '@/data/missions';
import { speak } from '@/lib/speech';

interface Props {
  story: StoryScene[];
  words: Word[];
  sentences: Sentence[];
  phonicsLetters: string[];
  onComplete: () => void;
}

type Phase = 'story' | 'words' | 'phonics' | 'sentences';

export default function Discover({ story, words, sentences, phonicsLetters, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('story');
  const [storyIndex, setStoryIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentenceRepeated, setSentenceRepeated] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const scene = story[storyIndex];
  const word = words[currentWord];
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

  // 錄音功能
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        setIsRecording(false);
        setShowCompare(true);
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordedUrl(null);
      setShowCompare(false);

      // 自動 3 秒後停止
      setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 3000);
    } catch {
      // 沒有麥克風權限，跳過錄音
      setShowCompare(true);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }

  function playRecording() {
    if (recordedUrl) {
      const audio = new Audio(recordedUrl);
      audio.play();
    }
  }

  function nextWord() {
    setCardFlipped(false);
    setShowExample(false);
    setRecordedUrl(null);
    setShowCompare(false);
    if (currentWord < words.length - 1) {
      setCurrentWord(c => c + 1);
    } else {
      setPhase('phonics');
    }
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
                <span className="text-3xl flex-shrink-0">
                  {isPast ? '✅' : s.character}
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

  // ===== Phase 2: 閃卡單字學習 =====
  if (phase === 'words') {
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-blue-500 bg-blue-50 inline-block px-4 py-1 rounded-full">
            📝 Word Time ({currentWord + 1}/{words.length})
          </p>
        </div>

        <div className="flex gap-1 mb-6">
          {words.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${
              i < currentWord ? 'bg-green-400' : i === currentWord ? 'bg-blue-400' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        {/* 閃卡 */}
        <div className="max-w-sm mx-auto mb-6" style={{ perspective: '1000px' }}>
          <div
            onClick={() => {
              if (!cardFlipped) {
                setCardFlipped(true);
                speak(word.en, 0.6);
              }
            }}
            className="relative cursor-pointer transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              minHeight: '280px',
            }}
          >
            {/* 正面：圖片 */}
            <div
              className="absolute inset-0 bg-white rounded-3xl shadow-xl border-2 border-blue-200 flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-9xl mb-4">{word.image}</div>
              <p className="text-gray-400 text-sm">👆 tap!</p>
            </div>

            {/* 背面：英文 + 發音 */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl border-2 border-blue-300 flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="text-6xl mb-3">{word.image}</div>
              <p className="text-4xl font-black text-gray-800 mb-2">{word.en}</p>
              {word.phonics && (
                <p className="text-sm text-blue-500 bg-blue-100 px-3 py-1 rounded-full mb-2">
                  🔤 {word.phonics}
                </p>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); speak(word.en, 0.5); }}
                className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition active:scale-95"
              >
                🔊
              </button>
            </div>
          </div>
        </div>

        {/* 翻卡後的操作 */}
        {cardFlipped && !showExample && !showCompare && (
          <div className="flex justify-center gap-3 animate-slide-up">
            <button
              onClick={() => speak(word.en, 0.5)}
              className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95">
              🔊
            </button>
            <button
              onClick={() => { setShowExample(true); speak(word.exampleSentence || word.en, 0.7); }}
              className="bg-orange-100 text-orange-600 px-5 py-3 rounded-2xl font-bold hover:bg-orange-200 transition active:scale-95">
              📖
            </button>
            <button
              onClick={() => { speak(word.en, 0.6); setTimeout(() => startRecording(), 1500); }}
              className="bg-green-500 text-white px-5 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95">
              🎤
            </button>
          </div>
        )}

        {/* 錄音中 */}
        {isRecording && (
          <div className="text-center animate-slide-up">
            <div className="flex justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-red-500 font-bold text-lg mb-3">🎤 Recording...</p>
            <button onClick={stopRecording}
              className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition active:scale-95">
              ⏹ Stop
            </button>
          </div>
        )}

        {/* 例句 */}
        {showExample && !showCompare && (
          <div className="max-w-md mx-auto animate-slide-up">
            <div className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-200 mb-4">
              <p className="text-lg font-bold text-gray-800 mb-1">
                {word.exampleSentence || `I say ${word.en}.`}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => speak(word.exampleSentence || word.en, 0.7)}
                className="bg-orange-100 text-orange-600 px-5 py-3 rounded-2xl font-bold hover:bg-orange-200 transition active:scale-95">
                🔊
              </button>
              <button onClick={() => { speak(word.en, 0.6); setTimeout(() => startRecording(), 1500); }}
                className="bg-green-500 text-white px-5 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95">
                🎤
              </button>
            </div>
          </div>
        )}

        {/* 錄音比對結果 */}
        {showCompare && (
          <div className="max-w-md mx-auto animate-slide-up">
            <div className="bg-white rounded-2xl p-5 border-2 border-green-200 shadow-md mb-4">
              <p className="text-center font-bold text-gray-700 mb-4">🎧 Compare!</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => speak(word.en, 0.6)}
                  className="flex-1 bg-blue-100 text-blue-600 px-4 py-4 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95 text-center">
                  <span className="text-2xl block mb-1">🦊</span>
                  Model
                </button>
                {recordedUrl ? (
                  <button onClick={playRecording}
                    className="flex-1 bg-green-100 text-green-600 px-4 py-4 rounded-2xl font-bold hover:bg-green-200 transition active:scale-95 text-center">
                    <span className="text-2xl block mb-1">🧒</span>
                    My Voice
                  </button>
                ) : (
                  <div className="flex-1 bg-gray-100 text-gray-400 px-4 py-4 rounded-2xl font-bold text-center">
                    <span className="text-2xl block mb-1">🧒</span>
                    Skipped
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button onClick={() => { setShowCompare(false); setRecordedUrl(null); speak(word.en, 0.6); setTimeout(() => startRecording(), 1500); }}
                className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-bold hover:bg-yellow-200 transition active:scale-95">
                🔄
              </button>
              <button onClick={nextWord}
                className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95">
                {currentWord < words.length - 1 ? '▶' : '🔤'}
              </button>
            </div>
          </div>
        )}
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
          <div className="inline-block text-5xl mb-2">🦜</div>
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
        <div className="inline-block text-5xl mb-2">🐻</div>
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

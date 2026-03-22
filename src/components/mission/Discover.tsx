'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Word, Sentence, StoryScene } from '@/data/missions';

interface Props {
  story: StoryScene[];
  words: Word[];
  sentences: Sentence[];
  phonicsLetters: string[];
  onComplete: () => void;
}

function speak(text: string, rate = 0.8) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }
}

type Phase = 'story' | 'words' | 'phonics' | 'sentences';

export default function Discover({ story, words, sentences, phonicsLetters, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('story');
  const [storyIndex, setStoryIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [wordStep, setWordStep] = useState<'card' | 'example' | 'repeat'>('card');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentenceRepeated, setSentenceRepeated] = useState(false);

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

  // ===== Phase 1: 故事課文 =====
  if (phase === 'story') {
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-purple-500 bg-purple-50 inline-block px-4 py-1 rounded-full">
            📖 Story Time 故事時間
          </p>
        </div>

        {/* 進度 */}
        <div className="flex gap-1 mb-6">
          {story.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all ${
              i < storyIndex ? 'bg-green-400' : i === storyIndex ? 'bg-purple-400' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        {/* 場景圖 */}
        <div className="text-center text-8xl mb-4">{scene.image}</div>

        {/* 對話泡泡 */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="flex items-start gap-3">
            <div className="text-5xl flex-shrink-0">{scene.character}</div>
            <div className="bg-white rounded-3xl rounded-tl-none px-6 py-5 border-2 border-purple-200 flex-1 shadow-md">
              <p className="text-xs text-purple-400 font-bold mb-2">{scene.characterName}</p>
              <p className="text-xl font-bold text-gray-800 leading-relaxed mb-2">
                {scene.dialogue.split(' ').map((w, i) => {
                  const isHighlight = scene.highlightWords?.some(hw =>
                    w.replace(/[.,!?]/g, '').toLowerCase() === hw.toLowerCase() ||
                    hw.toLowerCase().includes(w.replace(/[.,!?]/g, '').toLowerCase())
                  );
                  return (
                    <span key={i}>
                      <span
                        className={isHighlight ? 'text-purple-600 bg-purple-50 px-1 rounded cursor-pointer hover:bg-purple-100' : ''}
                        onClick={() => isHighlight && speak(w.replace(/[.,!?]/g, ''), 0.6)}
                      >
                        {w}
                      </span>{' '}
                    </span>
                  );
                })}
              </p>

              {/* 翻譯切換 */}
              {showTranslation ? (
                <p className="text-gray-500 text-sm animate-slide-up">{scene.dialogueZh}</p>
              ) : (
                <button
                  onClick={() => setShowTranslation(true)}
                  className="text-xs text-gray-400 hover:text-purple-500 transition"
                >
                  👀 看中文翻譯
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 操作 */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => speak(scene.dialogue, 0.75)}
            className="bg-purple-100 text-purple-600 px-6 py-3 rounded-2xl font-bold hover:bg-purple-200 transition active:scale-95"
          >
            🔊 再聽一次
          </button>
          <button
            onClick={() => speak(scene.dialogue, 0.5)}
            className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95"
          >
            🐢 慢速
          </button>
          <button
            onClick={() => {
              setShowTranslation(false);
              if (storyIndex < story.length - 1) {
                setStoryIndex(i => i + 1);
              } else {
                setPhase('words');
              }
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
          >
            {storyIndex < story.length - 1 ? '下一幕 ▶' : '學單字！📝'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          {storyIndex + 1} / {story.length}
        </p>
      </div>
    );
  }

  // ===== Phase 2: 單字深度學習 =====
  if (phase === 'words') {
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-blue-500 bg-blue-50 inline-block px-4 py-1 rounded-full">
            📝 Word Time 學單字 ({currentWord + 1}/{words.length})
          </p>
        </div>

        <div className="flex gap-1 mb-6">
          {words.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${
              i < currentWord ? 'bg-green-400' : i === currentWord ? 'bg-blue-400' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-200 max-w-md mx-auto">
          {/* Step 1: 單字卡 */}
          {wordStep === 'card' && (
            <div className="text-center animate-slide-up">
              <div className="text-7xl mb-4">{word.image}</div>
              <p className="text-5xl font-black text-gray-800 mb-3">{word.en}</p>
              <p className="text-xl text-gray-500 mb-2">{word.zh}</p>
              {word.phonics && (
                <p className="text-sm text-blue-500 bg-blue-50 inline-block px-3 py-1 rounded-full mb-4">
                  Phonics: {word.phonics}
                </p>
              )}
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => speak(word.en, 0.6)}
                  className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95"
                >
                  🔊 聽發音
                </button>
                <button
                  onClick={() => { speak(word.en, 0.6); setWordStep('example'); }}
                  className="bg-green-500 text-white px-5 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
                >
                  看例句 ▶
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 例句 */}
          {wordStep === 'example' && (
            <div className="text-center animate-slide-up">
              <div className="text-5xl mb-3">{word.image}</div>
              <p className="text-2xl font-black text-gray-800 mb-2">{word.en}</p>
              <div className="bg-blue-50 rounded-2xl p-4 mb-4">
                <p className="text-lg font-bold text-blue-800 mb-1">
                  {word.exampleSentence || `I say ${word.en}.`}
                </p>
                <p className="text-sm text-blue-500">
                  {word.exampleZh || word.zh}
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => speak(word.exampleSentence || `I say ${word.en}.`, 0.7)}
                  className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95"
                >
                  🔊 聽例句
                </button>
                <button
                  onClick={() => setWordStep('repeat')}
                  className="bg-green-500 text-white px-5 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
                >
                  跟著念 🗣
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 跟讀 */}
          {wordStep === 'repeat' && (
            <div className="text-center animate-slide-up">
              <div className="text-5xl mb-2">🦜</div>
              <p className="text-sm text-green-500 font-bold mb-3">Polly: Repeat after me!</p>
              <p className="text-4xl font-black text-gray-800 mb-2">{word.en}</p>
              <p className="text-lg text-gray-500 mb-4">{word.zh}</p>

              <button
                onClick={() => speak(word.en, 0.6)}
                className="bg-green-100 text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-200 transition active:scale-95 mb-3 block mx-auto"
              >
                🔊 聽 → 跟著念
              </button>

              <p className="text-xs text-gray-400 mb-4">聽完之後大聲念一次吧！</p>

              <button
                onClick={() => {
                  setWordStep('card');
                  if (currentWord < words.length - 1) {
                    setCurrentWord(c => c + 1);
                  } else {
                    setPhase('phonics');
                  }
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
              >
                {currentWord < words.length - 1 ? '下一個單字 ▶' : 'Phonics 時間！🔤'}
              </button>
            </div>
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
            🔤 Phonics Time 字母發音
          </p>
        </div>

        <div className="text-center mb-6">
          <div className="inline-block text-5xl mb-2">🦜</div>
          <p className="text-lg font-bold text-gray-700">
            Polly: &ldquo;Repeat after me! 跟我念！&rdquo;
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-center text-gray-700 mb-6">
            Today&apos;s Letters 今天的字母
          </h3>
          <div className="flex justify-center gap-6 mb-4">
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
            點擊字母聽：大寫 → 小寫 → 字母音
          </p>

          <div className="text-center">
            <button
              onClick={() => setPhase('sentences')}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition active:scale-95"
            >
              學句子！💬
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
          💬 Sentence Time 學句子 ({currentSentence + 1}/{sentences.length})
        </p>
      </div>

      <div className="text-center mb-4">
        <div className="inline-block text-5xl mb-2">🐻</div>
        <p className="text-lg font-bold text-gray-700">
          Benny: &ldquo;Let&apos;s read! 來讀句子！&rdquo;
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
        <p className="text-2xl font-bold text-center text-gray-800 mb-2 leading-relaxed">
          {sentence.en}
        </p>
        <p className="text-lg text-center text-gray-500 mb-6">{sentence.zh}</p>

        {!sentenceRepeated ? (
          <div className="space-y-3">
            {/* 先聽 */}
            <button
              onClick={() => speak(sentence.en, 0.7)}
              className="w-full bg-orange-100 text-orange-600 px-6 py-4 rounded-2xl font-bold hover:bg-orange-200 transition active:scale-95"
            >
              🔊 Step 1：先聽句子
            </button>
            <button
              onClick={() => speak(sentence.en, 0.5)}
              className="w-full bg-blue-50 text-blue-500 px-6 py-3 rounded-2xl font-medium hover:bg-blue-100 transition active:scale-95"
            >
              🐢 聽慢速版
            </button>
            {/* 跟讀 */}
            <button
              onClick={() => { speak(sentence.en, 0.7); setSentenceRepeated(true); }}
              className="w-full bg-green-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
            >
              🗣 Step 2：跟著念！
            </button>
          </div>
        ) : (
          <div className="text-center animate-slide-up">
            <p className="text-green-600 font-bold text-lg mb-4">
              ⭐ Great job! 念得太棒了！
            </p>
            <button
              onClick={() => {
                setSentenceRepeated(false);
                if (currentSentence < sentences.length - 1) {
                  setCurrentSentence(c => c + 1);
                } else {
                  onComplete();
                }
              }}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
            >
              {currentSentence < sentences.length - 1 ? '下一句 ▶' : '開始挑戰！🎮'}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        {currentSentence + 1} / {sentences.length}
      </p>
    </div>
  );
}

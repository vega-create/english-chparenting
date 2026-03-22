'use client';
import { useState } from 'react';
import type { Word, Sentence } from '@/data/missions';

interface Props {
  words: Word[];
  sentences: Sentence[];
  phonicsLetters: string[];
  onComplete: () => void;
}

export default function Discover({ words, sentences, phonicsLetters, onComplete }: Props) {
  const [phase, setPhase] = useState<'words' | 'phonics' | 'sentences'>('words');
  const [currentWord, setCurrentWord] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function speak(text: string, rate = 0.8) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = rate;
      window.speechSynthesis.speak(u);
    }
  }

  // 單字卡片
  if (phase === 'words') {
    const word = words[currentWord];
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-4">
          <div className="inline-block text-5xl mb-2">🦊</div>
          <p className="text-lg font-bold text-gray-700">
            Finn: &ldquo;Learn new words! 學新單字！&rdquo;
          </p>
        </div>

        {/* 進度 */}
        <div className="flex gap-1 mb-6">
          {words.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${
              i < currentWord ? 'bg-green-400' : i === currentWord ? 'bg-blue-400' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        {/* 單字卡 */}
        <div
          onClick={() => { setFlipped(!flipped); speak(word.en); }}
          className="bg-white rounded-3xl p-10 shadow-xl border-2 border-blue-200 max-w-md mx-auto cursor-pointer hover:shadow-2xl transition-all active:scale-95"
        >
          <div className="text-center">
            <div className="text-7xl mb-4">{word.image}</div>
            <p className="text-4xl font-black text-gray-800 mb-2">{word.en}</p>
            {flipped && (
              <div className="animate-slide-up">
                <p className="text-xl text-gray-500 mb-2">{word.zh}</p>
                {word.phonics && (
                  <p className="text-sm text-blue-500 bg-blue-50 inline-block px-3 py-1 rounded-full">
                    Phonics: {word.phonics}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-3">
          點擊卡片聽發音 {flipped ? '' : '再點看中文'}
        </p>

        {/* 操作按鈕 */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => speak(word.en)}
            className="bg-blue-100 text-blue-600 px-6 py-3 rounded-2xl font-bold text-lg hover:bg-blue-200 transition active:scale-95"
          >
            🔊 再聽一次
          </button>
          <button
            onClick={() => {
              setFlipped(false);
              if (currentWord < words.length - 1) {
                setCurrentWord(c => c + 1);
              } else {
                setPhase('phonics');
              }
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition active:scale-95"
          >
            {currentWord < words.length - 1 ? '下一個 ▶' : 'Phonics 時間！'}
          </button>
        </div>
      </div>
    );
  }

  // Phonics 字母
  if (phase === 'phonics') {
    return (
      <div className="animate-slide-up">
        <div className="text-center mb-6">
          <div className="inline-block text-5xl mb-2">🦜</div>
          <p className="text-lg font-bold text-gray-700">
            Polly: &ldquo;Repeat after me! 跟我念！&rdquo;
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-center text-gray-700 mb-6">
            今天的字母 Today&apos;s Letters
          </h3>
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
          <p className="text-center text-gray-500 mb-6">點擊字母聽發音，跟著念！</p>

          <div className="text-center">
            <button
              onClick={() => setPhase('sentences')}
              className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition active:scale-95"
            >
              學句子！▶
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 句型練習
  const sentence = sentences[currentSentence];
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-4">
        <div className="inline-block text-5xl mb-2">🐻</div>
        <p className="text-lg font-bold text-gray-700">
          Benny: &ldquo;Let&apos;s read! 來讀句子！&rdquo;
        </p>
      </div>

      <div className="flex gap-1 mb-6">
        {sentences.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < currentSentence ? 'bg-green-400' : i === currentSentence ? 'bg-purple-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-200 max-w-xl mx-auto">
        <p className="text-2xl font-bold text-center text-gray-800 mb-3 leading-relaxed">
          {sentence.en}
        </p>
        <p className="text-lg text-center text-gray-500 mb-6">{sentence.zh}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => speak(sentence.en)}
            className="bg-purple-100 text-purple-600 px-6 py-3 rounded-2xl font-bold hover:bg-purple-200 transition active:scale-95"
          >
            🔊 聽句子
          </button>
          <button
            onClick={() => {
              if (currentSentence < sentences.length - 1) {
                setCurrentSentence(c => c + 1);
              } else {
                onComplete();
              }
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition active:scale-95"
          >
            {currentSentence < sentences.length - 1 ? '下一句 ▶' : '開始挑戰！🎮'}
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        {currentSentence + 1} / {sentences.length}
      </p>
    </div>
  );
}

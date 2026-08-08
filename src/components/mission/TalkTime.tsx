'use client';
import { useState, useEffect } from 'react';
import { speak } from '@/lib/speech';
import { playLesson, lessonPath, findLessonAudio, type LessonAudioIndex } from '@/lib/audio';

interface Props {
  prompts: string[];
  onComplete: () => void;
  level?: number;
  missionId?: number;
  audioIndex?: LessonAudioIndex;
}

export default function TalkTime({ prompts, onComplete, level = 1, missionId = 1, audioIndex = {} }: Props) {
  // 提示句先播 Finn 的錄音（L{級}/m{課}/t{序}.mp3），沒有才查課文表，再沒有才 TTS
  async function sayPrompt(i: number, text: string) {
    if (await playLesson(lessonPath.talk(level, missionId, i))) return;
    const path = findLessonAudio(audioIndex, level, text);
    if (path && await playLesson(path)) return;
    speak(text);
  }
  const [current, setCurrent] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responses, setResponses] = useState<string[]>([]);

  const prompt = prompts[current];

  // 換題時自動播 Finn 的問題
  useEffect(() => {
    const t = setTimeout(() => sayPrompt(current, prompts[current]), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // speak imported from @/lib/speech

  function startListening() {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      handleSkip();
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setResponses(prev => [...prev, text]);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  }

  function handleNext() {
    setTranscript('');
    if (current < prompts.length - 1) {
      setCurrent(c => c + 1);
    } else {
      onComplete();
    }
  }

  function handleSkip() {
    setResponses(prev => [...prev, '(skipped)']);
    setTranscript('');
    if (current < prompts.length - 1) {
      setCurrent(c => c + 1);
    } else {
      onComplete();
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="flex gap-1 mb-6">
        {prompts.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < current ? 'bg-green-400' : i === current ? 'bg-indigo-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* 角色對話泡泡 */}
      <div className="max-w-xl mx-auto">
        {/* Finn 問問題 */}
        <div className="flex items-start gap-3 mb-6">
          <img src="/characters/finn/finn-talk.png" alt="Finn" className="w-40 h-40 object-contain flex-shrink-0" />
          <div className="bg-blue-50 rounded-3xl rounded-tl-none px-6 py-4 border-2 border-blue-200 flex-1">
            <p className="text-lg font-bold text-gray-800">{prompt}</p>
            <button
              onClick={() => sayPrompt(current, prompt)}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700 transition"
            >
              🔊 聽 Finn 說
            </button>
          </div>
        </div>

        {/* 孩子回答區 */}
        <div className="flex items-start gap-3 justify-end mb-6">
          <div className={`bg-green-50 rounded-3xl rounded-tr-none px-6 py-4 border-2 ${
            transcript ? 'border-green-400' : 'border-green-200'
          } flex-1 text-right`}>
            {transcript ? (
              <div>
                <p className="text-lg font-bold text-green-700">{transcript}</p>
                <p className="text-sm text-green-500 mt-1">Great job! 太棒了！</p>
              </div>
            ) : isListening ? (
              <div className="flex items-center justify-end gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <p className="text-red-500 font-medium">正在聽...</p>
              </div>
            ) : (
              <p className="text-gray-400">按下面的麥克風回答吧！</p>
            )}
          </div>
          <div className="text-5xl flex-shrink-0">🧒</div>
        </div>

        {/* 操作按鈕 */}
        <div className="flex justify-center gap-3">
          {!transcript ? (
            <>
              <button
                onClick={startListening}
                disabled={isListening}
                className={`${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600'
                } text-white px-8 py-4 rounded-full font-bold text-lg transition active:scale-95 shadow-lg`}
              >
                {isListening ? '🎤 聽取中...' : '🎤 按住說話'}
              </button>
              <button
                onClick={handleSkip}
                className="bg-gray-200 text-gray-500 px-6 py-4 rounded-full font-medium hover:bg-gray-300 transition"
              >
                跳過 ▶
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition active:scale-95 shadow-lg"
            >
              {current < prompts.length - 1 ? '下一題 ▶' : '完成對話！🎉'}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        {current + 1} / {prompts.length}
      </p>
    </div>
  );
}

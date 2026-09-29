'use client';
import { useEffect, useState } from 'react';
import GameButton from '@/components/GameButton';
import type { QuizQuestion, Sentence } from '@/data/missions';
import { speak } from '@/lib/speech';
import { playLesson, lessonPath, SLOW_CLIP_RATE, SLOW_TTS_RATE, type LessonAudioIndex } from '@/lib/audio';
import { stopAllAudio } from '@/lib/audioBus';
import { track } from '@/lib/analytics';
import SentenceMic from '@/components/mission/SentenceMic';
import Challenge from '@/components/mission/Challenge';
import TalkTime from '@/components/mission/TalkTime';

/**
 * 訂正回合（Vega 2026-09-29）：沒過關時不用整課重來，只把「錯的／跳過的」再做一次。
 * 順序：句子練習 → 闖關題 → 聊天關。每訂正一題就往上回報一題（onFixed），
 * 所以中途重整也不會掉，回來只剩還沒訂正的。
 */
export type FixKind = 's' | 'c' | 't';

interface Props {
  level: number;
  missionId: number;
  sentences: Sentence[];
  challenges: QuizQuestion[];
  prompts: string[];
  /** 還沒答對的題號（整課原本的題號） */
  missedS: number[];
  missedC: number[];
  missedT: number[];
  praiseLevel?: 'low' | 'mid' | 'high';
  audioIndex?: LessonAudioIndex;
  /** 訂正成功一題 */
  onFixed: (kind: FixKind, index: number) => void;
  /** 整個訂正回合走完（不管訂正了幾題） */
  onComplete: () => void;
}

const PART_LABEL: Record<FixKind, string> = { s: '💬 句子', c: '🎮 闖關題', t: '🗣 聊天' };

export default function FixRound({ level, missionId, sentences, challenges, prompts, missedS, missedC, missedT, praiseLevel = 'low', audioIndex = {}, onFixed, onComplete }: Props) {
  // 進來時先把這一回合要做的題目定下來：上層的清單會隨著訂正一題一題變短，
  // 這裡如果跟著變，正在做的題目順序會亂掉
  const [plan] = useState(() => {
    const tidy = (list: number[], max: number) => [...new Set(list)].filter(i => i >= 0 && i < max).sort((a, b) => a - b);
    return { s: tidy(missedS, sentences.length), c: tidy(missedC, challenges.length), t: tidy(missedT, prompts.length) };
  });
  const parts = (['s', 'c', 't'] as FixKind[]).filter(k => plan[k].length > 0);
  const total = plan.s.length + plan.c.length + plan.t.length;

  const [partIdx, setPartIdx] = useState(0);
  const part: FixKind | undefined = parts[partIdx];
  useEffect(() => { stopAllAudio(); }, [partIdx]);

  // 沒有東西可以訂正（理論上不會進來）：直接回結算畫面，不要卡在空白頁
  useEffect(() => {
    if (total === 0) onComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nextPart() {
    if (partIdx < parts.length - 1) setPartIdx(partIdx + 1);
    else onComplete();
  }

  // ── 句子訂正 ──
  const [cur, setCur] = useState(0);
  const [said, setSaid] = useState(false);
  const [skipped, setSkipped] = useState(false);

  // 跟句子練習一樣：先播真人錄音（照原本的句號），沒有檔案才用瀏覽器語音
  async function saySentence(i: number, text: string, slow = false) {
    if (await playLesson(lessonPath.sentence(level, missionId, i), undefined, slow ? SLOW_CLIP_RATE : 1)) {
      track({ kind: 'replay', level, mission: missionId, step: 'fix', item: `s${i + 1}`, audioSrc: 'el', meta: { fix: true } });
      return;
    }
    track({ kind: 'replay', level, mission: missionId, step: 'fix', item: `s${i + 1}`, audioSrc: 'tts', meta: { fix: true } });
    speak(text, slow ? SLOW_TTS_RATE : 0.7);
  }

  if (!part) return null;

  const header = (
    <div className="text-center mb-5">
      <p className="text-sm font-black text-orange-600 bg-orange-50 border border-orange-200 inline-block px-4 py-1 rounded-full">
        ✏️ 訂正時間 · 共 {total} 題
      </p>
      <p className="text-xs text-gray-500 mt-2">只要把剛剛錯的題目再做一次就好</p>
      {parts.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {parts.map((k, i) => (
            <span key={k} className={`text-xs font-bold px-3 py-1 rounded-full ${
              i < partIdx ? 'bg-green-100 text-green-600' : i === partIdx ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < partIdx ? '✓ ' : ''}{PART_LABEL[k]} {plan[k].length}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (part === 'c') {
    return (
      <div>
        {header}
        <Challenge
          key="fix-c"
          challenges={plan.c.map(i => challenges[i])}
          indices={plan.c}
          fix
          praiseLevel={praiseLevel}
          level={level}
          audioIndex={audioIndex}
          onResult={(i, correct) => { if (correct) onFixed('c', i); }}
          onComplete={() => nextPart()}
        />
      </div>
    );
  }

  if (part === 't') {
    return (
      <div>
        {header}
        <TalkTime
          key="fix-t"
          prompts={plan.t.map(i => prompts[i])}
          promptIndices={plan.t}
          level={level}
          missionId={missionId}
          audioIndex={audioIndex}
          onResult={(i, ok) => { if (ok) onFixed('t', i); }}
          onComplete={() => nextPart()}
        />
      </div>
    );
  }

  // part === 's'
  const sIdx = plan.s[cur];
  const sentence = sentences[sIdx];
  return (
    <div className="animate-slide-up">
      {header}

      <div className="text-center mb-4">
        <img src="/characters/benny/benny-read.png" alt="Benny" className="inline-block w-32 h-32 object-contain mb-2" />
        <p className="text-lg font-bold text-gray-700">
          Benny: &ldquo;One more time!&rdquo;
        </p>
      </div>

      <div className="flex gap-1 mb-6">
        {plan.s.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < cur ? 'bg-green-400' : i === cur ? 'bg-orange-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-200 max-w-xl mx-auto">
        <p className="text-2xl font-bold text-center text-gray-800 mb-2 leading-relaxed">
          {sentence.en}
        </p>
        {sentence.zh && <p className="text-sm text-center text-gray-400 mb-6">{sentence.zh}</p>}

        {!said ? (
          <div className="flex justify-center gap-3">
            <button onClick={() => saySentence(sIdx, sentence.en)}
              aria-label="聽示範"
              className="bg-orange-100 text-orange-600 px-6 py-4 rounded-2xl font-bold hover:bg-orange-200 transition active:scale-95">
              🔊
            </button>
            <button onClick={() => saySentence(sIdx, sentence.en, true)}
              aria-label="慢速再聽一次"
              className="bg-blue-50 text-blue-500 px-5 py-4 rounded-2xl font-medium hover:bg-blue-100 transition active:scale-95 cursor-pointer">
              🐢
            </button>
            <SentenceMic key={sIdx} target={sentence.en} fix
              onDone={() => { onFixed('s', sIdx); setSkipped(false); setSaid(true); }}
              onSkip={() => { setSkipped(true); setSaid(true); }} />
          </div>
        ) : (
          <div className="text-center animate-slide-up">
            {skipped
              ? <p className="text-gray-500 font-bold text-lg mb-4">先跳過，這句還沒訂正</p>
              : <p className="text-green-600 font-bold text-lg mb-4">⭐ 訂正成功！</p>}
            <GameButton onClick={() => {
              setSaid(false);
              if (cur < plan.s.length - 1) setCur(c => c + 1);
              else nextPart();
            }} color="green" size="md">
              ▶
            </GameButton>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        {cur + 1} / {plan.s.length}
      </p>
    </div>
  );
}

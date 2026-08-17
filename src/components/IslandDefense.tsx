'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameButton from '@/components/GameButton';
import SentenceMic from '@/components/mission/SentenceMic';
import { playLesson, lessonPath } from '@/lib/audio';
import { speak, stopSpeaking } from '@/lib/speech';
import { stopAllAudio } from '@/lib/audioBus';
import { playStar, playSuccess, playClick } from '@/lib/sfx';
import {
  getTodayInvasion, recordDefense, buildQuiz, invasionMission, guardCount,
  MONSTERS, type GuardState, type GuardQuiz,
} from '@/lib/islandDefense';

/**
 * 守島戰彈窗：怪獸怕吵——用「聽」和「說」把牠趕走。
 * 聽力 2 題（播真人錄音選中文）＋口說 1 題（大聲唸，SentenceMic 有不支援裝置的防呆）。
 * 答錯不懲罰：搖一下、可以再聽再選。
 */

type Stage = 'intro' | 'listen' | 'speak' | 'win';

async function sayWord(level: number, en: string) {
  if (await playLesson(lessonPath.word(level, en))) return;
  speak(en, 0.7);
}

export default function IslandDefense({ onClose }: { onClose: () => void }) {
  const [st] = useState<GuardState | null>(() => getTodayInvasion());
  const [quiz] = useState<GuardQuiz | null>(() => (st ? buildQuiz(st) : null));
  const [stage, setStage] = useState<Stage>('intro');
  const [qi, setQi] = useState(0);          // 第幾題聽力
  const [wrong, setWrong] = useState<string | null>(null);

  const inv = st ? invasionMission(st) : null;
  const monster = st ? MONSTERS[st.monster % MONSTERS.length] : null;

  useEffect(() => () => { stopSpeaking(); stopAllAudio(); }, []);

  if (!st || !quiz || !inv || !monster || st.defended) return null;
  const level = inv.level;
  const q = quiz.listening[qi];

  function pickOption(opt: string) {
    if (!q) return;
    if (opt === q.answer) {
      playStar();
      setWrong(null);
      if (qi + 1 < quiz!.listening.length) { setQi(qi + 1); }
      else setStage('speak');
    } else {
      playClick();
      setWrong(opt); // 搖一下，不懲罰
      setTimeout(() => setWrong(null), 600);
    }
  }

  function winIt() {
    recordDefense();
    playSuccess();
    setStage('win');
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="ae-frame-parchment w-full max-w-md max-h-[90vh] overflow-y-auto text-center"
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.img
                src={monster.img} alt={monster.name}
                className="w-36 h-36 mx-auto object-contain"
                animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <h2 className="m-0 font-black text-amber-900 text-xl">{monster.name}來搗蛋！</h2>
              <p className="m-0 mt-1.5 text-sm text-gray-600 font-bold leading-relaxed">
                牠賴在「{inv.mission.title}」的島上不走。<br />
                怪獸最怕英文的聲音——<strong>用聽力和口說把牠趕跑吧！</strong>
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <GameButton onClick={() => setStage('listen')} color="gold" size="md">⚔️ 出戰！</GameButton>
                <GameButton onClick={onClose} color="purple" size="sm" sound="click">明天再說</GameButton>
              </div>
            </motion.div>
          )}

          {stage === 'listen' && q && (
            <motion.div key={`q${qi}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="flex items-center justify-center gap-3">
                <img src={monster.img} alt="" className="w-14 h-14 object-contain opacity-90" />
                <p className="m-0 font-black text-amber-900">聽力關 {qi + 1}/{quiz.listening.length}</p>
              </div>
              <p className="m-0 mt-1 text-xs text-gray-500 font-bold">聽聲音，選出正確的意思</p>
              <button
                onClick={() => sayWord(level, q.en)}
                className="mt-3 mx-auto w-16 h-16 rounded-full bg-sky-500 text-white text-3xl shadow-lg active:scale-95 flex items-center justify-center"
                aria-label="播放"
              >🔊</button>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {q.options.map(opt => (
                  <motion.button
                    key={opt}
                    onClick={() => pickOption(opt)}
                    animate={wrong === opt ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                    className={`ae-frame !border-none py-2.5 px-2 font-black text-gray-800 text-base active:scale-95 transition ${wrong === opt ? 'opacity-60' : ''}`}
                  >{opt}</motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {stage === 'speak' && (
            <motion.div key="speak" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-center gap-3">
                <motion.img src={monster.img} alt="" className="w-14 h-14 object-contain"
                  animate={{ x: [0, -4, 4, 0] }} transition={{ duration: 0.7, repeat: Infinity }} />
                <p className="m-0 font-black text-amber-900">最後一擊：大聲唸！</p>
              </div>
              <p className="m-0 mt-2 text-3xl font-black text-purple-700">{quiz.speaking.en}</p>
              <p className="m-0 text-sm text-gray-500 font-bold">{quiz.speaking.zh}</p>
              <button onClick={() => sayWord(level, quiz.speaking.en)}
                className="mt-2 text-xs font-bold text-sky-600 underline">🔊 先聽一次</button>
              <div className="mt-3">
                <SentenceMic target={quiz.speaking.en} onDone={winIt} />
              </div>
            </motion.div>
          )}

          {stage === 'win' && (
            <motion.div key="win" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <img src="/images/guard/celebrate.webp" alt="守島成功" className="w-44 mx-auto object-contain" />
              <h2 className="m-0 font-black text-amber-900 text-xl">🎉 守島成功！</h2>
              <p className="m-0 mt-1 text-sm text-gray-600 font-bold">
                {monster.name}被你的英文嚇跑啦！<br />
                💎 寶石 +5　🛡️ 累計守成 {guardCount()} 次
              </p>
              <div className="mt-4">
                <GameButton onClick={onClose} color="gold" size="md">收工回地圖</GameButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

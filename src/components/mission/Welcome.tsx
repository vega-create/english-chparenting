'use client';
import { useState, useEffect } from 'react';
import { speak, speakChinese } from '@/lib/speech';

interface Props {
  onComplete: () => void;
}

interface Scene {
  bg: string;
  character: string;
  characterName: string;
  dialogue: string;
  dialogueEn?: string;
  animation?: string;
  action?: 'click-door' | 'click-characters' | 'click-steps' | 'click-star' | 'none';
  actionHint?: string;
}

const WELCOME_SCENES: Scene[] = [
  {
    bg: '🏝️',
    character: '🦊',
    characterName: 'Finn',
    dialogue: '嗨！歡迎來到 Adventure English！\n我是 Finn，你的冒險夥伴！\n我會用中文幫你介紹這裡怎麼玩 😊',
    dialogueEn: 'Welcome to Adventure English!',
    action: 'none',
  },
  {
    bg: '🌈',
    character: '🦊',
    characterName: 'Finn',
    dialogue: '在這裡，學英文就像玩遊戲一樣好玩！\n聽故事、看圖片、跟著念，\n不知不覺就學會英文了！',
    dialogueEn: "Learning English is fun here!",
    action: 'none',
  },
  {
    bg: '🚪',
    character: '🦊',
    characterName: 'Finn',
    dialogue: '先來認識你的五個好朋友吧！\n他們每個人都有不同的超能力喔！\n👆 點點看他們，聽他們自我介紹！',
    action: 'click-characters',
    actionHint: '👆 點擊每個角色認識他們！',
  },
  {
    bg: '📋',
    character: '🦊',
    characterName: 'Finn',
    dialogue: '每一課都有 5 個關卡，\n就像闖關遊戲一樣！\n👆 點點看每個關卡是什麼！',
    action: 'click-steps',
    actionHint: '👆 點擊每個步驟了解內容！',
  },
  {
    bg: '⭐',
    character: '🦊',
    characterName: 'Finn',
    dialogue: '答對題目就能得到星星 ⭐\n集滿星星還有寶石 💎 可以收集！\n👆 試試看點星星！',
    action: 'click-star',
    actionHint: '👆 點擊星星試試看！',
  },
  {
    bg: '🚀',
    character: '🦊',
    characterName: 'Finn',
    dialogue: '太棒了！準備好了嗎？\n接下來 Finn 會開始用英文跟你說話喔！\n別擔心，聽不懂可以按「中」看翻譯 😉',
    dialogueEn: "Let's go! I'll speak English now. Ready?",
    action: 'none',
  },
];

const CHARACTERS_INFO = [
  { emoji: '🦊', name: 'Finn', role: '探險隊長', intro: "Hi! I'm Finn! Let's go on an adventure!", introZh: '嗨！我是 Finn！一起去冒險吧！', skill: '帶你上課、講故事' },
  { emoji: '🐱', name: 'Coco', role: '聽力高手', intro: "Hello! I'm Coco. Listen carefully!", introZh: '你好！我是 Coco。仔細聽喔！', skill: '教你「聽」英文' },
  { emoji: '🦜', name: 'Polly', role: '口說達人', intro: "Hi there! I'm Polly! Repeat after me!", introZh: '嗨！我是 Polly！跟著我念！', skill: '教你「說」英文' },
  { emoji: '🐻', name: 'Benny', role: '閱讀博士', intro: "Hello, friend! I'm Benny. Let's read!", introZh: '你好朋友！我是 Benny。一起讀吧！', skill: '教你「讀」英文' },
  { emoji: '🐰', name: 'Ruby', role: '寫作天才', intro: "Hi! I'm Ruby! Let's write together!", introZh: '嗨！我是 Ruby！一起寫吧！', skill: '教你「寫」英文' },
];

const STEPS_INFO = [
  { icon: '📖', name: 'Story Time', nameZh: '故事時間', desc: '聽角色們說故事，學新的英文！' },
  { icon: '📝', name: 'Word Time', nameZh: '學單字', desc: '看圖片、聽發音、跟著念！' },
  { icon: '🎮', name: 'Challenge', nameZh: '挑戰遊戲', desc: '用遊戲測試你學到的東西！' },
  { icon: '💬', name: 'Talk Time', nameZh: '對話時間', desc: '跟 Finn 用英文聊天！' },
  { icon: '⭐', name: 'Mission Complete', nameZh: '任務完成', desc: '看看你得了幾顆星星！' },
];

export default function Welcome({ onComplete }: Props) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [charactersClicked, setCharactersClicked] = useState<Set<number>>(new Set());
  const [stepsClicked, setStepsClicked] = useState<Set<number>>(new Set());
  const [starsCollected, setStarsCollected] = useState(0);
  const [showCharacterDetail, setShowCharacterDetail] = useState<number | null>(null);
  const [showStepDetail, setShowStepDetail] = useState<number | null>(null);
  const [starBurst, setStarBurst] = useState(false);

  const scene = WELCOME_SCENES[sceneIndex];

  // 自動播放中文語音引導
  useEffect(() => {
    // 先念中文對話
    setTimeout(() => {
      speakChinese(scene.dialogue.replace(/[😊😉👆🎉✅🚀]/g, ''), 0.9);
    }, 500);
  }, [sceneIndex, scene.dialogue]);

  function handleCharacterClick(index: number) {
    const char = CHARACTERS_INFO[index];
    // 先念中文介紹，再念英文
    speakChinese(char.introZh, 0.9);
    setTimeout(() => speak(char.intro, 0.75), 2000);
    setShowCharacterDetail(index);
    setCharactersClicked(prev => new Set(prev).add(index));
  }

  function handleStepClick(index: number) {
    setShowStepDetail(index);
    setStepsClicked(prev => new Set(prev).add(index));
  }

  function handleStarClick() {
    setStarsCollected(s => s + 1);
    setStarBurst(true);
    setTimeout(() => setStarBurst(false), 600);
  }

  const canProceed = () => {
    if (scene.action === 'click-characters') return charactersClicked.size >= 5;
    if (scene.action === 'click-steps') return stepsClicked.size >= 5;
    if (scene.action === 'click-star') return starsCollected >= 3;
    return true;
  };

  function handleNext() {
    setShowCharacterDetail(null);
    setShowStepDetail(null);
    if (sceneIndex < WELCOME_SCENES.length - 1) {
      setSceneIndex(i => i + 1);
    } else {
      onComplete();
    }
  }

  return (
    <div className="animate-slide-up">
      {/* 進度 */}
      <div className="flex gap-1 mb-6">
        {WELCOME_SCENES.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all ${
            i < sceneIndex ? 'bg-green-400' : i === sceneIndex ? 'bg-purple-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* 場景背景 */}
      <div className="text-center text-7xl mb-4 animate-bounce">{scene.bg}</div>

      {/* 角色對話 */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="flex items-start gap-3">
          <div className="text-5xl flex-shrink-0">{scene.character}</div>
          <div className="bg-white rounded-3xl rounded-tl-none px-6 py-5 border-2 border-purple-200 flex-1 shadow-md">
            <p className="text-xs text-purple-400 font-bold mb-2">{scene.characterName}</p>
            <p className="text-lg font-bold text-gray-800 leading-relaxed whitespace-pre-line">
              {scene.dialogue}
            </p>
            {scene.dialogueEn && (
              <p className="text-sm text-purple-400 mt-2 italic">{scene.dialogueEn}</p>
            )}
          </div>
        </div>
      </div>

      {/* 互動區域 */}

      {/* 認識角色 */}
      {scene.action === 'click-characters' && (
        <div className="max-w-xl mx-auto mb-6 animate-slide-up">
          <div className="flex justify-center gap-4 mb-4">
            {CHARACTERS_INFO.map((char, i) => (
              <button
                key={char.name}
                onClick={() => handleCharacterClick(i)}
                className={`text-5xl transition-all hover:scale-125 active:scale-95 ${
                  charactersClicked.has(i) ? 'opacity-100 scale-110' : 'opacity-60 grayscale'
                }`}
              >
                {char.emoji}
              </button>
            ))}
          </div>

          {showCharacterDetail !== null && (
            <div className="bg-white rounded-2xl p-5 border-2 border-purple-100 shadow-md animate-slide-up">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{CHARACTERS_INFO[showCharacterDetail].emoji}</span>
                <div>
                  <p className="font-black text-lg text-gray-800">{CHARACTERS_INFO[showCharacterDetail].name}</p>
                  <p className="text-sm text-purple-500 font-medium">{CHARACTERS_INFO[showCharacterDetail].role}</p>
                </div>
              </div>
              <p className="text-blue-600 font-medium mb-1">{CHARACTERS_INFO[showCharacterDetail].intro}</p>
              <p className="text-gray-500 text-sm mb-1">{CHARACTERS_INFO[showCharacterDetail].introZh}</p>
              <p className="text-xs text-gray-400">✨ {CHARACTERS_INFO[showCharacterDetail].skill}</p>
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-3">
            {charactersClicked.size < 5
              ? `${scene.actionHint} (${charactersClicked.size}/5)`
              : '✅ 全部認識了！'}
          </p>
        </div>
      )}

      {/* 認識步驟 */}
      {scene.action === 'click-steps' && (
        <div className="max-w-xl mx-auto mb-6 animate-slide-up">
          <div className="flex justify-center gap-3 mb-4">
            {STEPS_INFO.map((step, i) => (
              <button
                key={step.name}
                onClick={() => handleStepClick(i)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border-2 transition-all hover:scale-110 active:scale-95 ${
                  stepsClicked.has(i)
                    ? 'bg-green-100 border-green-400 scale-105'
                    : 'bg-gray-100 border-gray-200'
                }`}
              >
                {step.icon}
              </button>
            ))}
          </div>

          {showStepDetail !== null && (
            <div className="bg-white rounded-2xl p-5 border-2 border-green-100 shadow-md animate-slide-up">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{STEPS_INFO[showStepDetail].icon}</span>
                <div>
                  <p className="font-black text-gray-800">{STEPS_INFO[showStepDetail].name}</p>
                  <p className="text-sm text-gray-500">{STEPS_INFO[showStepDetail].nameZh}</p>
                </div>
              </div>
              <p className="text-gray-600">{STEPS_INFO[showStepDetail].desc}</p>
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-3">
            {stepsClicked.size < 5
              ? `${scene.actionHint} (${stepsClicked.size}/5)`
              : '✅ 全部了解了！'}
          </p>
        </div>
      )}

      {/* 收集星星 */}
      {scene.action === 'click-star' && (
        <div className="max-w-xl mx-auto mb-6 text-center animate-slide-up">
          <div className="flex justify-center gap-4 mb-4">
            {[1, 2, 3].map(i => (
              <button
                key={i}
                onClick={handleStarClick}
                disabled={starsCollected >= 3}
                className={`text-6xl transition-all ${
                  i <= starsCollected
                    ? 'opacity-100 scale-110'
                    : 'opacity-30 hover:opacity-60 hover:scale-110 active:scale-125'
                } ${starBurst && i === starsCollected ? 'animate-ping' : ''}`}
              >
                ⭐
              </button>
            ))}
          </div>

          {starsCollected > 0 && (
            <div className="animate-slide-up">
              <p className="text-yellow-600 font-bold text-lg">
                {starsCollected >= 3 ? '🎉 太棒了！你收集到 3 顆星星！' : `⭐ x${starsCollected}！再點更多！`}
              </p>
              {starsCollected >= 3 && (
                <p className="text-sm text-gray-500 mt-1">上課答對題目就能得到星星喔！</p>
              )}
            </div>
          )}

          {starsCollected < 3 && (
            <p className="text-sm text-gray-400 mt-2">{scene.actionHint} ({starsCollected}/3)</p>
          )}
        </div>
      )}

      {/* 下一步按鈕 */}
      <div className="text-center">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-lg ${
            canProceed()
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {sceneIndex < WELCOME_SCENES.length - 1 ? '下一步 ▶' : "Let's Go! 開始上課！🚀"}
        </button>
      </div>
    </div>
  );
}

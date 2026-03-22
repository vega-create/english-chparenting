export interface Word {
  en: string;
  zh: string;
  image: string;
  phonics?: string;
  exampleSentence?: string;
  exampleZh?: string;
}

export interface Sentence {
  en: string;
  zh: string;
}

export interface StoryScene {
  image: string;
  character: string;
  characterName: string;
  dialogue: string;
  dialogueZh: string;
  highlightWords?: string[];
  // 動畫場景：多個 emoji 組成動畫
  sceneEmojis: string[];
  // 動畫類型
  animation: 'wave' | 'bounce' | 'shake' | 'spin' | 'float' | 'tada';
}

export interface QuizQuestion {
  type: 'listen-pick' | 'match' | 'spell' | 'speak' | 'fill-blank';
  question: string;
  options?: string[];
  answer: string;
  image?: string;
}

export interface Mission {
  id: number;
  slug: string;
  level: number;
  title: string;
  titleEn: string;
  theme: string;
  themeEmoji: string;
  story: StoryScene[];
  words: Word[];
  sentences: Sentence[];
  phonicsLetters: string[];
  warmUpQuestions: QuizQuestion[];
  challenges: QuizQuestion[];
  talkTimePrompts: string[];
  reviewQuiz: QuizQuestion[];
}

// L1 Mission 1: Nice to Meet You!
const L1_M1: Mission = {
  id: 1,
  slug: 'm1-nice-to-meet-you',
  level: 1,
  title: '你好！認識新朋友',
  titleEn: 'Nice to Meet You!',
  theme: '問候與自我介紹',
  themeEmoji: '🙋',

  // 故事課文：角色們第一次見面
  story: [
    {
      image: '🌈',
      character: '🦊',
      characterName: 'Finn',
      dialogue: "Hi! I'm Finn. Welcome to Rainbow Valley!",
      dialogueZh: '嗨！我是 Finn。歡迎來到彩虹谷！',
      highlightWords: ['Hi', 'Finn', 'Welcome'],
      sceneEmojis: ['🦊', '👋', '🌈', '🏝️', '✨'],
      animation: 'wave',
    },
    {
      image: '🏝️',
      character: '🐱',
      characterName: 'Coco',
      dialogue: "Hello! My name is Coco. Nice to meet you!",
      dialogueZh: '你好！我的名字是 Coco。很高興認識你！',
      highlightWords: ['Hello', 'name', 'Nice to meet you'],
      sceneEmojis: ['🐱', '📛', '🤝', '😊'],
      animation: 'bounce',
    },
    {
      image: '🌺',
      character: '🦜',
      characterName: 'Polly',
      dialogue: "Hi there! I'm Polly! What's your name?",
      dialogueZh: '嗨！我是 Polly！你叫什麼名字？',
      highlightWords: ['Hi', 'name'],
      sceneEmojis: ['🦜', '❓', '📛', '🎤'],
      animation: 'shake',
    },
    {
      image: '📚',
      character: '🐻',
      characterName: 'Benny',
      dialogue: "Hello, friend! I'm Benny. Are you ready to learn?",
      dialogueZh: '你好，朋友！我是 Benny。準備好學習了嗎？',
      highlightWords: ['Hello', 'friend', 'ready'],
      sceneEmojis: ['🐻', '🤝', '📚', '✏️', '🎒'],
      animation: 'float',
    },
    {
      image: '✨',
      character: '🐰',
      characterName: 'Ruby',
      dialogue: "Yes! Let's go! Please follow me!",
      dialogueZh: '好！我們出發吧！請跟著我！',
      highlightWords: ['Yes', 'Please'],
      sceneEmojis: ['🐰', '✅', '👉', '🚶', '✨'],
      animation: 'tada',
    },
    {
      image: '👋',
      character: '🦊',
      characterName: 'Finn',
      dialogue: "Great! We are all friends now. Let's start our adventure!",
      dialogueZh: '太好了！我們都是朋友了。開始我們的冒險吧！',
      highlightWords: ['friends', 'adventure'],
      sceneEmojis: ['🦊', '🐱', '🦜', '🐻', '🐰'],
      animation: 'bounce',
    },
  ],

  words: [
    { en: 'hi', zh: '嗨', image: '👋', phonics: 'Hh', exampleSentence: 'Hi! How are you?', exampleZh: '嗨！你好嗎？' },
    { en: 'hello', zh: '你好', image: '😊', phonics: 'Hh', exampleSentence: 'Hello, Coco!', exampleZh: '你好，Coco！' },
    { en: 'bye', zh: '再見', image: '👋', phonics: 'Bb', exampleSentence: 'Bye bye, see you!', exampleZh: '再見，下次見！' },
    { en: 'name', zh: '名字', image: '📛', phonics: 'Nn', exampleSentence: "What's your name?", exampleZh: '你叫什麼名字？' },
    { en: 'friend', zh: '朋友', image: '🤝', phonics: 'Ff', exampleSentence: 'You are my friend!', exampleZh: '你是我的朋友！' },
    { en: 'yes', zh: '是', image: '✅', phonics: 'Yy', exampleSentence: 'Yes, I like it!', exampleZh: '是的，我喜歡！' },
    { en: 'no', zh: '不是', image: '❌', phonics: 'Nn', exampleSentence: 'No, thank you.', exampleZh: '不了，謝謝。' },
    { en: 'please', zh: '請', image: '🙏', phonics: 'Pp', exampleSentence: 'Yes, please!', exampleZh: '好的，請！' },
  ],
  sentences: [
    { en: "Hi! I'm Finn.", zh: '嗨！我是 Finn。' },
    { en: "What's your name?", zh: '你叫什麼名字？' },
    { en: "My name is ___.", zh: '我的名字是 ___。' },
    { en: "Nice to meet you!", zh: '很高興認識你！' },
    { en: "Yes, please.", zh: '好的，請。' },
    { en: "Bye bye!", zh: '掰掰！' },
  ],
  phonicsLetters: ['Aa', 'Bb', 'Cc'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，Finn 說了什麼？', options: ['Hi!', 'Bye!', 'No!', 'Yes!'], answer: 'Hi!', image: '🦊' },
    { type: 'match', question: '哪個是「你好」？', options: ['hello', 'bye', 'name', 'no'], answer: 'hello' },
    { type: 'listen-pick', question: '哪個圖片是 "friend"？', options: ['🤝', '👋', '❌', '✅'], answer: '🤝' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點選你聽到的單字', options: ['hi', 'bye', 'no', 'yes'], answer: 'hi', image: '🎧' },
    { type: 'speak', question: '跟著念：Hello!', answer: 'Hello', image: '🗣' },
    { type: 'match', question: '配對：把英文和中文連起來', options: ['friend-朋友', 'name-名字', 'please-請', 'bye-再見'], answer: 'friend-朋友' },
    { type: 'spell', question: '拼拼看：h _ l l o', answer: 'hello', image: '✍️' },
    { type: 'listen-pick', question: '聽 Coco 說的句子，選出正確的圖', options: ["Hi, I'm Coco!", "Bye bye!", "My name is Finn.", "No, thank you."], answer: "Hi, I'm Coco!", image: '🐱' },
    { type: 'fill-blank', question: "Nice to ___ you!", options: ['meet', 'name', 'friend', 'bye'], answer: 'meet' },
  ],
  talkTimePrompts: [
    "Hi! What's your name?",
    "Nice to meet you! Are you happy today?",
    "Do you like school?",
    "Bye bye! See you!",
  ],
  reviewQuiz: [
    { type: 'listen-pick', question: '"再見" 的英文是？', options: ['bye', 'hi', 'yes', 'no'], answer: 'bye' },
    { type: 'fill-blank', question: "What's your ___?", options: ['name', 'friend', 'hello', 'please'], answer: 'name' },
    { type: 'match', question: '選出正確的回答：Nice to meet you!', options: ['Nice to meet you too!', 'Bye bye!', 'No, thank you.', 'My name is hi.'], answer: 'Nice to meet you too!' },
  ],
};

export const MISSIONS: Mission[] = [L1_M1];

export function getMissionsByLevel(level: number): Mission[] {
  return MISSIONS.filter(m => m.level === level);
}

export function getMission(level: number, missionId: number): Mission | undefined {
  return MISSIONS.find(m => m.level === level && m.id === missionId);
}

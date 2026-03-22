export interface Word {
  en: string;
  zh: string;
  image: string; // emoji as placeholder
  phonics?: string;
}

export interface Sentence {
  en: string;
  zh: string;
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
  words: [
    { en: 'hi', zh: '嗨', image: '👋', phonics: 'Hh' },
    { en: 'hello', zh: '你好', image: '😊', phonics: 'Hh' },
    { en: 'bye', zh: '再見', image: '👋', phonics: 'Bb' },
    { en: 'name', zh: '名字', image: '📛', phonics: 'Nn' },
    { en: 'friend', zh: '朋友', image: '🤝', phonics: 'Ff' },
    { en: 'yes', zh: '是', image: '✅', phonics: 'Yy' },
    { en: 'no', zh: '不是', image: '❌', phonics: 'Nn' },
    { en: 'please', zh: '請', image: '🙏', phonics: 'Pp' },
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
    {
      type: 'listen-pick',
      question: '聽聽看，Finn 說了什麼？',
      options: ['Hi!', 'Bye!', 'No!', 'Yes!'],
      answer: 'Hi!',
      image: '🦊',
    },
    {
      type: 'match',
      question: '哪個是「你好」？',
      options: ['hello', 'bye', 'name', 'no'],
      answer: 'hello',
    },
    {
      type: 'listen-pick',
      question: '哪個圖片是 "friend"？',
      options: ['🤝', '👋', '❌', '✅'],
      answer: '🤝',
    },
  ],
  challenges: [
    {
      type: 'listen-pick',
      question: '聽音選圖：點選你聽到的單字',
      options: ['hi', 'bye', 'no', 'yes'],
      answer: 'hi',
      image: '🎧',
    },
    {
      type: 'speak',
      question: '跟著念：Hello!',
      answer: 'Hello',
      image: '🗣',
    },
    {
      type: 'match',
      question: '配對：把英文和中文連起來',
      options: ['friend-朋友', 'name-名字', 'please-請', 'bye-再見'],
      answer: 'friend-朋友',
    },
    {
      type: 'spell',
      question: '拼拼看：h _ l l o',
      answer: 'hello',
      image: '✍️',
    },
    {
      type: 'listen-pick',
      question: '聽 Coco 說的句子，選出正確的圖',
      options: ["Hi, I'm Coco!", "Bye bye!", "My name is Finn.", "No, thank you."],
      answer: "Hi, I'm Coco!",
      image: '🐱',
    },
    {
      type: 'fill-blank',
      question: "Nice to ___ you!",
      options: ['meet', 'name', 'friend', 'bye'],
      answer: 'meet',
    },
  ],
  talkTimePrompts: [
    "Hi! What's your name?",
    "Nice to meet you! Are you happy today?",
    "Do you like school?",
    "Bye bye! See you!",
  ],
  reviewQuiz: [
    {
      type: 'listen-pick',
      question: '"再見" 的英文是？',
      options: ['bye', 'hi', 'yes', 'no'],
      answer: 'bye',
    },
    {
      type: 'fill-blank',
      question: "What's your ___?",
      options: ['name', 'friend', 'hello', 'please'],
      answer: 'name',
    },
    {
      type: 'match',
      question: '選出正確的回答：Nice to meet you!',
      options: ['Nice to meet you too!', 'Bye bye!', 'No, thank you.', 'My name is hi.'],
      answer: 'Nice to meet you too!',
    },
  ],
};

export const MISSIONS: Mission[] = [L1_M1];

export function getMissionsByLevel(level: number): Mission[] {
  return MISSIONS.filter(m => m.level === level);
}

export function getMission(level: number, missionId: number): Mission | undefined {
  return MISSIONS.find(m => m.level === level && m.id === missionId);
}

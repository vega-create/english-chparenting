export interface Word {
  en: string;
  zh: string;
  image: string;
  phonics?: string;        // 代表字母（如 'Aa'）
  kk?: string;             // KK 音標
  phonicsSound?: string;   // 自然發音重點音（如 '/æ/'）
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
  characterKey?: string;
  characterAction?: string;
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
  type: 'listen-pick' | 'match' | 'spell' | 'speak' | 'fill-blank' | 'read';
  question: string;
  options?: string[];
  answer: string;
  image?: string;
  passage?: string;   // 閱讀理解題的短文/對話（read 題型顯示，不自動播音）
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
  // ── v2 新格式（L2 起）選填 ──
  focus?: string;              // 該課重點（phonics 樣式 / 文法點）
  videoScript?: VideoLine[];   // 對話影片腳本（角色輪流；留給 Vega 拍/生）
  videoUrl?: string;           // 對話影片連結（YouTube 網址 或 mp4/R2 連結）；沒填就顯示腳本分鏡
}

// 對話影片腳本一行
export interface VideoLine {
  speaker: string;   // 角色名（Finn/Coco… 或新角色）
  line: string;      // 英文台詞
  lineZh: string;    // 中文
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
      characterKey: 'finn',
      characterAction: 'wave',
      characterName: 'Finn',
      dialogue: "Hi! I'm Finn. Welcome to Rainbow Valley!",
      dialogueZh: '嗨！我是 Finn。歡迎來到彩虹谷！',
      highlightWords: ['Hi', 'Finn', 'Welcome'],
      sceneEmojis: ['👋', '🌈', '🏝️', '✨'],
      animation: 'wave',
    },
    {
      image: '🏝️',
      character: '🐱',
      characterKey: 'coco',
      characterAction: 'wave',
      characterName: 'Coco',
      dialogue: "Hello! My name is Coco. Nice to meet you!",
      dialogueZh: '你好！我的名字是 Coco。很高興認識你！',
      highlightWords: ['Hello', 'name', 'Nice to meet you'],
      sceneEmojis: ['📛', '🤝', '😊'],
      animation: 'bounce',
    },
    {
      image: '🌺',
      character: '🦜',
      characterKey: 'polly',
      characterAction: 'talk',
      characterName: 'Polly',
      dialogue: "Hi there! I'm Polly! What's your name?",
      dialogueZh: '嗨！我是 Polly！你叫什麼名字？',
      highlightWords: ['Hi', 'name'],
      sceneEmojis: ['❓', '📛', '🎤'],
      animation: 'shake',
    },
    {
      image: '📚',
      character: '🐻',
      characterKey: 'benny',
      characterAction: 'read',
      characterName: 'Benny',
      dialogue: "Hello, friend! I'm Benny. Are you ready to learn?",
      dialogueZh: '你好，朋友！我是 Benny。準備好學習了嗎？',
      highlightWords: ['Hello', 'friend', 'ready'],
      sceneEmojis: ['🤝', '📚', '✏️', '🎒'],
      animation: 'float',
    },
    {
      image: '✨',
      character: '🐰',
      characterKey: 'ruby',
      characterAction: 'star',
      characterName: 'Ruby',
      dialogue: "Yes! Let's go! Please follow me!",
      dialogueZh: '好！我們出發吧！請跟著我！',
      highlightWords: ['Yes', 'Please'],
      sceneEmojis: ['✅', '👉', '🚶', '✨'],
      animation: 'tada',
    },
    {
      image: '👋',
      character: '🦊',
      characterKey: 'finn',
      characterAction: 'happy',
      characterName: 'Finn',
      dialogue: "Great! We are all friends now. Let's start our adventure!",
      dialogueZh: '太好了！我們都是朋友了。開始我們的冒險吧！',
      highlightWords: ['friends', 'adventure'],
      sceneEmojis: ['🤝', '🎉', '🚀'],
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

// L1 Mission 2: A to D（字母的開始）— 官方字 apple/ball/cat/dog + KK/自然發音
const L1_M2: Mission = {
  id: 2,
  slug: 'm2-a-to-d',
  level: 1,
  title: '字母的開始 A–D',
  titleEn: 'A to D',
  theme: '字母島・沙灘洞窟',
  themeEmoji: '🏖️',

  story: [
    {
      image: '🏖️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn',
      dialogue: "Welcome to the Beach Cave! Let's find letters A, B, C, D!",
      dialogueZh: '歡迎來到沙灘洞窟！我們來找字母 A、B、C、D！',
      highlightWords: ['A', 'B', 'C', 'D'], sceneEmojis: ['🏖️', '🕳️', '🔤', '✨'], animation: 'wave',
    },
    {
      image: '🍎', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco',
      dialogue: "Look! An apple! A is for Apple!",
      dialogueZh: '看！一顆蘋果！A 是 Apple（蘋果）！',
      highlightWords: ['apple', 'A'], sceneEmojis: ['🍎', '🅰️', '😋'], animation: 'bounce',
    },
    {
      image: '⚽', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly',
      dialogue: "A ball! B is for Ball! Let's play!",
      dialogueZh: '一顆球！B 是 Ball（球）！一起玩！',
      highlightWords: ['ball', 'B'], sceneEmojis: ['⚽', '🅱️', '🎉'], animation: 'tada',
    },
    {
      image: '🐱', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny',
      dialogue: "Meow! A cat! C is for Cat!",
      dialogueZh: '喵！一隻貓！C 是 Cat（貓）！',
      highlightWords: ['cat', 'C'], sceneEmojis: ['🐱', '🔤', '🐾'], animation: 'float',
    },
    {
      image: '🐶', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby',
      dialogue: "Woof! A dog! D is for Dog!",
      dialogueZh: '汪！一隻狗！D 是 Dog（狗）！',
      highlightWords: ['dog', 'D'], sceneEmojis: ['🐶', '🦴', '✨'], animation: 'shake',
    },
    {
      image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn',
      dialogue: "Great job! A, B, C, D! You found all the letters!",
      dialogueZh: '太棒了！A、B、C、D！你把字母都找到了！',
      highlightWords: ['A', 'B', 'C', 'D'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce',
    },
  ],

  // 單字（對齊 wordbank，帶 KK 音標 + 自然發音重點音）
  words: [
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: 'Aa', kk: '[ˈæpl̩]', phonicsSound: '/æ/', exampleSentence: 'A is for apple.', exampleZh: 'A 是 apple。' },
    { en: 'ball', zh: '球', image: '⚽', phonics: 'Bb', kk: '[bɔl]', phonicsSound: '/b/', exampleSentence: 'B is for ball.', exampleZh: 'B 是 ball。' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: 'Cc', kk: '[kæt]', phonicsSound: '/k/', exampleSentence: 'C is for cat.', exampleZh: 'C 是 cat。' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: 'Dd', kk: '[dɔɡ]', phonicsSound: '/d/', exampleSentence: 'D is for dog.', exampleZh: 'D 是 dog。' },
  ],
  sentences: [
    { en: 'A is for Apple.', zh: 'A 是 Apple（蘋果）。' },
    { en: 'B is for Ball.', zh: 'B 是 Ball（球）。' },
    { en: 'C is for Cat.', zh: 'C 是 Cat（貓）。' },
    { en: 'D is for Dog.', zh: 'D 是 Dog（狗）。' },
    { en: 'What is this?', zh: '這是什麼？' },
    { en: 'It is a cat.', zh: '這是一隻貓。' },
  ],
  phonicsLetters: ['Aa', 'Bb', 'Cc', 'Dd'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['A', 'B', 'C', 'D'], answer: 'A', image: '🔤' },
    { type: 'match', question: '🍎 蘋果是哪個字？', options: ['apple', 'ball', 'cat', 'dog'], answer: 'apple' },
    { type: 'listen-pick', question: '哪個是 "ball" 球？', options: ['🍎', '⚽', '🐱', '🐶'], answer: '⚽' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🍎', '⚽', '🐱', '🐶'], answer: '🐱', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['A-🍎', 'B-⚽', 'C-🐱', 'D-🐶'], answer: 'A-🍎' },
    { type: 'spell', question: '拼拼看：c _ t（貓）', answer: 'cat', image: '✍️' },
    { type: 'speak', question: '跟著念：Dog!', answer: 'Dog', image: '🗣' },
    { type: 'fill-blank', question: '___ is for apple.', options: ['A', 'B', 'C', 'D'], answer: 'A' },
    { type: 'listen-pick', question: 'Ball 球 的開頭是哪個字母？', options: ['A', 'B', 'C', 'D'], answer: 'B', image: '⚽' },
  ],
  talkTimePrompts: [
    "A is for apple! Can you say 'apple'?",
    "B is for ball! Do you like to play ball?",
    "C is for cat! Can you meow like a cat? Meow!",
    "D is for dog! Can you say 'dog'? Woof!",
  ],
  reviewQuiz: [
    { type: 'listen-pick', question: '"A" 開頭的字是？', options: ['apple', 'ball', 'cat', 'dog'], answer: 'apple' },
    { type: 'fill-blank', question: 'C is for ___.', options: ['cat', 'dog', 'ball', 'apple'], answer: 'cat' },
    { type: 'match', question: '🐶 狗是哪個字母開頭？', options: ['A', 'B', 'C', 'D'], answer: 'D' },
  ],
};

// L1 M3: E to H（森林字母）
const L1_M3: Mission = {
  id: 3, slug: 'm3-e-to-h', level: 1, title: '森林字母 E–H', titleEn: 'E to H', theme: '字母島・字母森林', themeEmoji: '🌲',
  story: [
    { image: '🌲', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's go into the Letter Forest! Find E, F, G, H!", dialogueZh: '我們進字母森林！找 E、F、G、H！', highlightWords: ['E', 'F', 'G', 'H'], sceneEmojis: ['🌲', '🌳', '🔤', '✨'], animation: 'wave' },
    { image: '🥚', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "An egg! E is for Egg!", dialogueZh: '一顆蛋！E 是 Egg（蛋）！', highlightWords: ['egg', 'E'], sceneEmojis: ['🥚', '🔤', '😊'], animation: 'bounce' },
    { image: '🐟', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A fish! F is for Fish!", dialogueZh: '一條魚！F 是 Fish（魚）！', highlightWords: ['fish', 'F'], sceneEmojis: ['🐟', '🔤', '💧'], animation: 'tada' },
    { image: '🐐', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "A goat! G is for Goat!", dialogueZh: '一隻山羊！G 是 Goat（山羊）！', highlightWords: ['goat', 'G'], sceneEmojis: ['🐐', '🔤', '🌿'], animation: 'float' },
    { image: '🎩', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A hat! H is for Hat!", dialogueZh: '一頂帽子！H 是 Hat（帽子）！', highlightWords: ['hat', 'H'], sceneEmojis: ['🎩', '🔤', '✨'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Yay! E, F, G, H! Great job!", dialogueZh: '耶！E、F、G、H！做得好！', highlightWords: ['E', 'F', 'G', 'H'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'egg', zh: '蛋', image: '🥚', phonics: 'Ee', kk: '[ɛɡ]', phonicsSound: '/ɛ/', exampleSentence: 'E is for egg.', exampleZh: 'E 是 egg。' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: 'Ff', kk: '[fɪʃ]', phonicsSound: '/f/', exampleSentence: 'F is for fish.', exampleZh: 'F 是 fish。' },
    { en: 'goat', zh: '山羊', image: '🐐', phonics: 'Gg', kk: '[ɡot]', phonicsSound: '/ɡ/', exampleSentence: 'G is for goat.', exampleZh: 'G 是 goat。' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: 'Hh', kk: '[hæt]', phonicsSound: '/h/', exampleSentence: 'H is for hat.', exampleZh: 'H 是 hat。' },
  ],
  sentences: [
    { en: 'E is for Egg.', zh: 'E 是 Egg（蛋）。' }, { en: 'F is for Fish.', zh: 'F 是 Fish（魚）。' }, { en: 'G is for Goat.', zh: 'G 是 Goat（山羊）。' }, { en: 'H is for Hat.', zh: 'H 是 Hat（帽子）。' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'It is a fish.', zh: '這是一條魚。' },
  ],
  phonicsLetters: ['Ee', 'Ff', 'Gg', 'Hh'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['E', 'F', 'G', 'H'], answer: 'E', image: '🔤' },
    { type: 'match', question: '🐟 魚是哪個字？', options: ['egg', 'fish', 'goat', 'hat'], answer: 'fish' },
    { type: 'listen-pick', question: '哪個是 "hat" 帽子？', options: ['🥚', '🐟', '🐐', '🎩'], answer: '🎩' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🥚', '🐟', '🐐', '🎩'], answer: '🐐', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['E-🥚', 'F-🐟', 'G-🐐', 'H-🎩'], answer: 'E-🥚' },
    { type: 'spell', question: '拼拼看：e _ g（蛋）', answer: 'egg', image: '✍️' },
    { type: 'speak', question: '跟著念：Fish!', answer: 'Fish', image: '🗣' },
    { type: 'fill-blank', question: '___ is for hat.', options: ['E', 'F', 'G', 'H'], answer: 'H' },
    { type: 'listen-pick', question: 'Goat 山羊 的開頭是哪個字母？', options: ['E', 'F', 'G', 'H'], answer: 'G', image: '🐐' },
  ],
  talkTimePrompts: ["E is for egg! Can you say 'egg'?", "F is for fish! Do you like fish?", "G is for goat! Can you say 'goat'?", "H is for hat! Do you have a hat?"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"F" 開頭的字是？', options: ['egg', 'fish', 'goat', 'hat'], answer: 'fish' },
    { type: 'fill-blank', question: 'E is for ___.', options: ['egg', 'fish', 'goat', 'hat'], answer: 'egg' },
    { type: 'match', question: '🎩 帽子是哪個字母開頭？', options: ['E', 'F', 'G', 'H'], answer: 'H' },
  ],
};

// L1 M4: I to L（山丘字母）
const L1_M4: Mission = {
  id: 4, slug: 'm4-i-to-l', level: 1, title: '山丘字母 I–L', titleEn: 'I to L', theme: '字母島・字母山丘', themeEmoji: '⛰️',
  story: [
    { image: '⛰️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's climb the Letter Hills! Find I, J, K, L!", dialogueZh: '我們爬字母山丘！找 I、J、K、L！', highlightWords: ['I', 'J', 'K', 'L'], sceneEmojis: ['⛰️', '🥾', '🔤', '✨'], animation: 'wave' },
    { image: '🛖', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "An igloo! I is for Igloo!", dialogueZh: '一間冰屋！I 是 Igloo（冰屋）！', highlightWords: ['igloo', 'I'], sceneEmojis: ['🛖', '🔤', '❄️'], animation: 'bounce' },
    { image: '🍓', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Jam! J is for Jam!", dialogueZh: '果醬！J 是 Jam（果醬）！', highlightWords: ['jam', 'J'], sceneEmojis: ['🍓', '🔤', '😋'], animation: 'tada' },
    { image: '🪁', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "A kite! K is for Kite!", dialogueZh: '一個風箏！K 是 Kite（風箏）！', highlightWords: ['kite', 'K'], sceneEmojis: ['🪁', '🔤', '🌬️'], animation: 'float' },
    { image: '🦁', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A lion! L is for Lion! Roar!", dialogueZh: '一隻獅子！L 是 Lion（獅子）！吼！', highlightWords: ['lion', 'L'], sceneEmojis: ['🦁', '🔤', '✨'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Wonderful! I, J, K, L! You did it!", dialogueZh: '太棒了！I、J、K、L！你做到了！', highlightWords: ['I', 'J', 'K', 'L'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'igloo', zh: '冰屋', image: '🛖', phonics: 'Ii', kk: '[ˈɪɡlu]', phonicsSound: '/ɪ/', exampleSentence: 'I is for igloo.', exampleZh: 'I 是 igloo。' },
    { en: 'jam', zh: '果醬', image: '🍓', phonics: 'Jj', kk: '[dʒæm]', phonicsSound: '/dʒ/', exampleSentence: 'J is for jam.', exampleZh: 'J 是 jam。' },
    { en: 'kite', zh: '風箏', image: '🪁', phonics: 'Kk', kk: '[kaɪt]', phonicsSound: '/k/', exampleSentence: 'K is for kite.', exampleZh: 'K 是 kite。' },
    { en: 'lion', zh: '獅子', image: '🦁', phonics: 'Ll', kk: '[ˈlaɪən]', phonicsSound: '/l/', exampleSentence: 'L is for lion.', exampleZh: 'L 是 lion。' },
  ],
  sentences: [
    { en: 'I is for Igloo.', zh: 'I 是 Igloo（冰屋）。' }, { en: 'J is for Jam.', zh: 'J 是 Jam（果醬）。' }, { en: 'K is for Kite.', zh: 'K 是 Kite（風箏）。' }, { en: 'L is for Lion.', zh: 'L 是 Lion（獅子）。' }, { en: 'I like jam.', zh: '我喜歡果醬。' }, { en: 'The kite can fly.', zh: '風箏會飛。' },
  ],
  phonicsLetters: ['Ii', 'Jj', 'Kk', 'Ll'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['I', 'J', 'K', 'L'], answer: 'I', image: '🔤' },
    { type: 'match', question: '🦁 獅子是哪個字？', options: ['igloo', 'jam', 'kite', 'lion'], answer: 'lion' },
    { type: 'listen-pick', question: '哪個是 "kite" 風箏？', options: ['🛖', '🍓', '🪁', '🦁'], answer: '🪁' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🛖', '🍓', '🪁', '🦁'], answer: '🍓', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['I-🛖', 'J-🍓', 'K-🪁', 'L-🦁'], answer: 'I-🛖' },
    { type: 'spell', question: '拼拼看：l _ o n（獅子）', answer: 'lion', image: '✍️' },
    { type: 'speak', question: '跟著念：Kite!', answer: 'Kite', image: '🗣' },
    { type: 'fill-blank', question: '___ is for jam.', options: ['I', 'J', 'K', 'L'], answer: 'J' },
    { type: 'listen-pick', question: 'Lion 獅子 的開頭是哪個字母？', options: ['I', 'J', 'K', 'L'], answer: 'L', image: '🦁' },
  ],
  talkTimePrompts: ["I is for igloo! Can you say 'igloo'?", "J is for jam! Do you like jam?", "K is for kite! Can you fly a kite?", "L is for lion! Can you roar like a lion?"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"L" 開頭的字是？', options: ['igloo', 'jam', 'kite', 'lion'], answer: 'lion' },
    { type: 'fill-blank', question: 'K is for ___.', options: ['igloo', 'jam', 'kite', 'lion'], answer: 'kite' },
    { type: 'match', question: '🍓 果醬是哪個字母開頭？', options: ['I', 'J', 'K', 'L'], answer: 'J' },
  ],
};

// L1 M5: 字母歌大複習① A–L
const L1_M5: Mission = {
  id: 5, slug: 'm5-review-a-l', level: 1, title: '字母歌大複習① A–L', titleEn: 'Sing A–L', theme: '字母島・篝火晚會', themeEmoji: '🔥',
  story: [
    { image: '🔥', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Sit by the campfire! Let's sing A to L!", dialogueZh: '坐到營火旁！我們一起唱 A 到 L！', highlightWords: ['A', 'L'], sceneEmojis: ['🔥', '🌟', '🎵'], animation: 'wave' },
    { image: '🎵', character: '🦜', characterKey: 'polly', characterAction: 'sing', characterName: 'Polly', dialogue: "A, B, C, D, E, F, G!", dialogueZh: '(唱) A、B、C、D、E、F、G！', highlightWords: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], sceneEmojis: ['🎵', '🎶', '⭐'], animation: 'tada' },
    { image: '🎶', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "H, I, J, K, L! Yay!", dialogueZh: '(唱) H、I、J、K、L！耶！', highlightWords: ['H', 'I', 'J', 'K', 'L'], sceneEmojis: ['🎶', '👏', '✨'], animation: 'bounce' },
    { image: '🌟', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know A to L! Let's play games!", dialogueZh: '你會 A 到 L 了！我們來玩遊戲！', highlightWords: ['A', 'L'], sceneEmojis: ['🌟', '🎮', '🎉'], animation: 'bounce' },
  ],
  words: [
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: 'Aa', kk: '[ˈæpl̩]', phonicsSound: '/æ/', exampleSentence: 'A is for apple.', exampleZh: 'A 是 apple。' },
    { en: 'egg', zh: '蛋', image: '🥚', phonics: 'Ee', kk: '[ɛɡ]', phonicsSound: '/ɛ/', exampleSentence: 'E is for egg.', exampleZh: 'E 是 egg。' },
    { en: 'igloo', zh: '冰屋', image: '🛖', phonics: 'Ii', kk: '[ˈɪɡlu]', phonicsSound: '/ɪ/', exampleSentence: 'I is for igloo.', exampleZh: 'I 是 igloo。' },
    { en: 'lion', zh: '獅子', image: '🦁', phonics: 'Ll', kk: '[ˈlaɪən]', phonicsSound: '/l/', exampleSentence: 'L is for lion.', exampleZh: 'L 是 lion。' },
  ],
  sentences: [
    { en: 'A, B, C, D...', zh: 'A、B、C、D……' }, { en: 'E, F, G, H...', zh: 'E、F、G、H……' }, { en: 'I, J, K, L!', zh: 'I、J、K、L！' }, { en: 'Now I know my letters!', zh: '現在我會字母了！' }, { en: 'Sing with me!', zh: '跟我一起唱！' }, { en: 'Great singing!', zh: '唱得真棒！' },
  ],
  phonicsLetters: ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll'],
  warmUpQuestions: [
    { type: 'listen-pick', question: 'A 的下一個字母是？', options: ['B', 'C', 'D', 'E'], answer: 'B', image: '🔤' },
    { type: 'match', question: '🍎 蘋果是哪個字？', options: ['apple', 'egg', 'igloo', 'lion'], answer: 'apple' },
    { type: 'listen-pick', question: '哪個是 "egg" 蛋？', options: ['🍎', '🥚', '🛖', '🦁'], answer: '🥚' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🍎', '🥚', '🛖', '🦁'], answer: '🦁', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['A-🍎', 'E-🥚', 'I-🛖', 'L-🦁'], answer: 'A-🍎' },
    { type: 'fill-blank', question: 'A, B, ___, D', options: ['C', 'E', 'F', 'G'], answer: 'C' },
    { type: 'spell', question: '拼拼看：e _ g（蛋）', answer: 'egg', image: '✍️' },
    { type: 'fill-blank', question: 'H, I, ___, K', options: ['J', 'L', 'G', 'M'], answer: 'J' },
    { type: 'listen-pick', question: 'Lion 獅子 的開頭是哪個字母？', options: ['I', 'J', 'K', 'L'], answer: 'L', image: '🦁' },
  ],
  talkTimePrompts: ["Can you sing A to L?", "What comes after C?", "A is for apple! What is E for?", "You are a great singer!"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'D, E, ___, G', options: ['F', 'H', 'C', 'B'], answer: 'F' },
    { type: 'match', question: '🛖 冰屋是哪個字母開頭？', options: ['I', 'J', 'K', 'L'], answer: 'I' },
    { type: 'listen-pick', question: '"A" 開頭的字是？', options: ['apple', 'egg', 'igloo', 'lion'], answer: 'apple' },
  ],
};

// L1 M6: M to P（海邊字母）
const L1_M6: Mission = {
  id: 6, slug: 'm6-m-to-p', level: 1, title: '海邊字母 M–P', titleEn: 'M to P', theme: '字母島・燈塔海邊', themeEmoji: '🌊',
  story: [
    { image: '🌊', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's walk to the sea! Find M, N, O, P!", dialogueZh: '我們走到海邊！找 M、N、O、P！', highlightWords: ['M', 'N', 'O', 'P'], sceneEmojis: ['🌊', '🗼', '🔤', '✨'], animation: 'wave' },
    { image: '🌙', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "The moon! M is for Moon!", dialogueZh: '月亮！M 是 Moon（月亮）！', highlightWords: ['moon', 'M'], sceneEmojis: ['🌙', '🔤', '⭐'], animation: 'bounce' },
    { image: '🪺', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A nest! N is for Nest!", dialogueZh: '一個鳥巢！N 是 Nest（鳥巢）！', highlightWords: ['nest', 'N'], sceneEmojis: ['🪺', '🔤', '🐣'], animation: 'tada' },
    { image: '🍊', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "An orange! O is for Orange!", dialogueZh: '一顆柳橙！O 是 Orange（柳橙）！', highlightWords: ['orange', 'O'], sceneEmojis: ['🍊', '🔤', '😋'], animation: 'float' },
    { image: '🐷', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A pig! P is for Pig! Oink!", dialogueZh: '一隻豬！P 是 Pig（豬）！哼哼！', highlightWords: ['pig', 'P'], sceneEmojis: ['🐷', '🔤', '✨'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Awesome! M, N, O, P! Well done!", dialogueZh: '太厲害了！M、N、O、P！做得好！', highlightWords: ['M', 'N', 'O', 'P'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'moon', zh: '月亮', image: '🌙', phonics: 'Mm', kk: '[mun]', phonicsSound: '/m/', exampleSentence: 'M is for moon.', exampleZh: 'M 是 moon。' },
    { en: 'nest', zh: '鳥巢', image: '🪺', phonics: 'Nn', kk: '[nɛst]', phonicsSound: '/n/', exampleSentence: 'N is for nest.', exampleZh: 'N 是 nest。' },
    { en: 'orange', zh: '柳橙', image: '🍊', phonics: 'Oo', kk: '[ˈɔrɪndʒ]', phonicsSound: '/ɔ/', exampleSentence: 'O is for orange.', exampleZh: 'O 是 orange。' },
    { en: 'pig', zh: '豬', image: '🐷', phonics: 'Pp', kk: '[pɪɡ]', phonicsSound: '/p/', exampleSentence: 'P is for pig.', exampleZh: 'P 是 pig。' },
  ],
  sentences: [
    { en: 'M is for Moon.', zh: 'M 是 Moon（月亮）。' }, { en: 'N is for Nest.', zh: 'N 是 Nest（鳥巢）。' }, { en: 'O is for Orange.', zh: 'O 是 Orange（柳橙）。' }, { en: 'P is for Pig.', zh: 'P 是 Pig（豬）。' }, { en: 'The moon is bright.', zh: '月亮很亮。' }, { en: 'The pig is pink.', zh: '豬是粉紅色的。' },
  ],
  phonicsLetters: ['Mm', 'Nn', 'Oo', 'Pp'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['M', 'N', 'O', 'P'], answer: 'M', image: '🔤' },
    { type: 'match', question: '🐷 豬是哪個字？', options: ['moon', 'nest', 'orange', 'pig'], answer: 'pig' },
    { type: 'listen-pick', question: '哪個是 "moon" 月亮？', options: ['🌙', '🪺', '🍊', '🐷'], answer: '🌙' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🌙', '🪺', '🍊', '🐷'], answer: '🍊', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['M-🌙', 'N-🪺', 'O-🍊', 'P-🐷'], answer: 'M-🌙' },
    { type: 'spell', question: '拼拼看：p _ g（豬）', answer: 'pig', image: '✍️' },
    { type: 'speak', question: '跟著念：Moon!', answer: 'Moon', image: '🗣' },
    { type: 'fill-blank', question: '___ is for orange.', options: ['M', 'N', 'O', 'P'], answer: 'O' },
    { type: 'listen-pick', question: 'Nest 鳥巢 的開頭是哪個字母？', options: ['M', 'N', 'O', 'P'], answer: 'N', image: '🪺' },
  ],
  talkTimePrompts: ["M is for moon! Can you say 'moon'?", "N is for nest! What lives in a nest?", "O is for orange! Do you like oranges?", "P is for pig! Can you say 'oink'?"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"P" 開頭的字是？', options: ['moon', 'nest', 'orange', 'pig'], answer: 'pig' },
    { type: 'fill-blank', question: 'M is for ___.', options: ['moon', 'nest', 'orange', 'pig'], answer: 'moon' },
    { type: 'match', question: '🍊 柳橙是哪個字母開頭？', options: ['M', 'N', 'O', 'P'], answer: 'O' },
  ],
};

// L1 M7: Q to T（城堡字母）
const L1_M7: Mission = {
  id: 7, slug: 'm7-q-to-t', level: 1, title: '城堡字母 Q–T', titleEn: 'Q to T', theme: '字母島・字母城堡', themeEmoji: '🏰',
  story: [
    { image: '🏰', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Into the Letter Castle! Find Q, R, S, T!", dialogueZh: '進字母城堡！找 Q、R、S、T！', highlightWords: ['Q', 'R', 'S', 'T'], sceneEmojis: ['🏰', '🚪', '🔤', '✨'], animation: 'wave' },
    { image: '👑', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "A queen! Q is for Queen!", dialogueZh: '一位皇后！Q 是 Queen（皇后）！', highlightWords: ['queen', 'Q'], sceneEmojis: ['👑', '🔤', '✨'], animation: 'bounce' },
    { image: '🐰', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A rabbit! R is for Rabbit!", dialogueZh: '一隻兔子！R 是 Rabbit（兔子）！', highlightWords: ['rabbit', 'R'], sceneEmojis: ['🐰', '🔤', '🥕'], animation: 'tada' },
    { image: '☀️', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "The sun! S is for Sun!", dialogueZh: '太陽！S 是 Sun（太陽）！', highlightWords: ['sun', 'S'], sceneEmojis: ['☀️', '🔤', '🌤️'], animation: 'float' },
    { image: '🐯', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A tiger! T is for Tiger! Roar!", dialogueZh: '一隻老虎！T 是 Tiger（老虎）！吼！', highlightWords: ['tiger', 'T'], sceneEmojis: ['🐯', '🔤', '✨'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Amazing! Q, R, S, T! Super!", dialogueZh: '太棒了！Q、R、S、T！超厲害！', highlightWords: ['Q', 'R', 'S', 'T'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'queen', zh: '皇后', image: '👑', phonics: 'Qq', kk: '[kwin]', phonicsSound: '/kw/', exampleSentence: 'Q is for queen.', exampleZh: 'Q 是 queen。' },
    { en: 'rabbit', zh: '兔子', image: '🐰', phonics: 'Rr', kk: '[ˈræbɪt]', phonicsSound: '/r/', exampleSentence: 'R is for rabbit.', exampleZh: 'R 是 rabbit。' },
    { en: 'sun', zh: '太陽', image: '☀️', phonics: 'Ss', kk: '[sʌn]', phonicsSound: '/s/', exampleSentence: 'S is for sun.', exampleZh: 'S 是 sun。' },
    { en: 'tiger', zh: '老虎', image: '🐯', phonics: 'Tt', kk: '[ˈtaɪɡɚ]', phonicsSound: '/t/', exampleSentence: 'T is for tiger.', exampleZh: 'T 是 tiger。' },
  ],
  sentences: [
    { en: 'Q is for Queen.', zh: 'Q 是 Queen（皇后）。' }, { en: 'R is for Rabbit.', zh: 'R 是 Rabbit（兔子）。' }, { en: 'S is for Sun.', zh: 'S 是 Sun（太陽）。' }, { en: 'T is for Tiger.', zh: 'T 是 Tiger（老虎）。' }, { en: 'The sun is hot.', zh: '太陽很熱。' }, { en: 'The tiger is strong.', zh: '老虎很強壯。' },
  ],
  phonicsLetters: ['Qq', 'Rr', 'Ss', 'Tt'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['Q', 'R', 'S', 'T'], answer: 'Q', image: '🔤' },
    { type: 'match', question: '☀️ 太陽是哪個字？', options: ['queen', 'rabbit', 'sun', 'tiger'], answer: 'sun' },
    { type: 'listen-pick', question: '哪個是 "tiger" 老虎？', options: ['👑', '🐰', '☀️', '🐯'], answer: '🐯' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['👑', '🐰', '☀️', '🐯'], answer: '🐰', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['Q-👑', 'R-🐰', 'S-☀️', 'T-🐯'], answer: 'Q-👑' },
    { type: 'spell', question: '拼拼看：s _ n（太陽）', answer: 'sun', image: '✍️' },
    { type: 'speak', question: '跟著念：Tiger!', answer: 'Tiger', image: '🗣' },
    { type: 'fill-blank', question: '___ is for queen.', options: ['Q', 'R', 'S', 'T'], answer: 'Q' },
    { type: 'listen-pick', question: 'Rabbit 兔子 的開頭是哪個字母？', options: ['Q', 'R', 'S', 'T'], answer: 'R', image: '🐰' },
  ],
  talkTimePrompts: ["Q is for queen! Can you say 'queen'?", "R is for rabbit! Can you hop like a rabbit?", "S is for sun! Is the sun hot?", "T is for tiger! Can you roar?"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"S" 開頭的字是？', options: ['queen', 'rabbit', 'sun', 'tiger'], answer: 'sun' },
    { type: 'fill-blank', question: 'T is for ___.', options: ['queen', 'rabbit', 'sun', 'tiger'], answer: 'tiger' },
    { type: 'match', question: '🐰 兔子是哪個字母開頭？', options: ['Q', 'R', 'S', 'T'], answer: 'R' },
  ],
};

// L1 M8: U to X（天空字母）
const L1_M8: Mission = {
  id: 8, slug: 'm8-u-to-x', level: 1, title: '天空字母 U–X', titleEn: 'U to X', theme: '字母島・字母雲端', themeEmoji: '☁️',
  story: [
    { image: '☁️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Fly up to the clouds! Find U, V, W, X!", dialogueZh: '飛上雲端！找 U、V、W、X！', highlightWords: ['U', 'V', 'W', 'X'], sceneEmojis: ['☁️', '🎈', '🔤', '✨'], animation: 'wave' },
    { image: '☂️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "An umbrella! U is for Umbrella!", dialogueZh: '一把雨傘！U 是 Umbrella（雨傘）！', highlightWords: ['umbrella', 'U'], sceneEmojis: ['☂️', '🔤', '🌧️'], animation: 'bounce' },
    { image: '🚐', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A van! V is for Van!", dialogueZh: '一台廂型車！V 是 Van（廂型車）！', highlightWords: ['van', 'V'], sceneEmojis: ['🚐', '🔤', '💨'], animation: 'tada' },
    { image: '⌚', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "A watch! W is for Watch!", dialogueZh: '一支手錶！W 是 Watch（手錶）！', highlightWords: ['watch', 'W'], sceneEmojis: ['⌚', '🔤', '⏰'], animation: 'float' },
    { image: '🦊', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A fox! X is in fox! foX!", dialogueZh: '一隻狐狸！X 在 fox 裡面！fo-X！', highlightWords: ['fox', 'X'], sceneEmojis: ['🦊', '🔤', '✨'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Fantastic! U, V, W, X! Almost done!", dialogueZh: '太棒了！U、V、W、X！快完成了！', highlightWords: ['U', 'V', 'W', 'X'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'umbrella', zh: '雨傘', image: '☂️', phonics: 'Uu', kk: '[ʌmˈbrɛlə]', phonicsSound: '/ʌ/', exampleSentence: 'U is for umbrella.', exampleZh: 'U 是 umbrella。' },
    { en: 'van', zh: '廂型車', image: '🚐', phonics: 'Vv', kk: '[væn]', phonicsSound: '/v/', exampleSentence: 'V is for van.', exampleZh: 'V 是 van。' },
    { en: 'watch', zh: '手錶', image: '⌚', phonics: 'Ww', kk: '[wɑtʃ]', phonicsSound: '/w/', exampleSentence: 'W is for watch.', exampleZh: 'W 是 watch。' },
    { en: 'fox', zh: '狐狸', image: '🦊', phonics: 'Xx', kk: '[fɑks]', phonicsSound: '/ks/', exampleSentence: 'X is in fox.', exampleZh: 'X 在 fox 裡。' },
  ],
  sentences: [
    { en: 'U is for Umbrella.', zh: 'U 是 Umbrella（雨傘）。' }, { en: 'V is for Van.', zh: 'V 是 Van（廂型車）。' }, { en: 'W is for Watch.', zh: 'W 是 Watch（手錶）。' }, { en: 'X is in Fox.', zh: 'X 在 Fox（狐狸）裡。' }, { en: 'The van is blue.', zh: '廂型車是藍色的。' }, { en: 'The fox is fast.', zh: '狐狸很快。' },
  ],
  phonicsLetters: ['Uu', 'Vv', 'Ww', 'Xx'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['U', 'V', 'W', 'X'], answer: 'U', image: '🔤' },
    { type: 'match', question: '🦊 狐狸是哪個字？', options: ['umbrella', 'van', 'watch', 'fox'], answer: 'fox' },
    { type: 'listen-pick', question: '哪個是 "watch" 手錶？', options: ['☂️', '🚐', '⌚', '🦊'], answer: '⌚' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['☂️', '🚐', '⌚', '🦊'], answer: '🚐', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['U-☂️', 'V-🚐', 'W-⌚', 'X-🦊'], answer: 'U-☂️' },
    { type: 'spell', question: '拼拼看：v _ n（廂型車）', answer: 'van', image: '✍️' },
    { type: 'speak', question: '跟著念：Umbrella!', answer: 'Umbrella', image: '🗣' },
    { type: 'fill-blank', question: '___ is for watch.', options: ['U', 'V', 'W', 'X'], answer: 'W' },
    { type: 'listen-pick', question: 'Van 廂型車 的開頭是哪個字母？', options: ['U', 'V', 'W', 'X'], answer: 'V', image: '🚐' },
  ],
  talkTimePrompts: ["U is for umbrella! Do you use an umbrella?", "V is for van! Can you say 'van'?", "W is for watch! What time is it?", "X is in fox! Can you say 'fox'?"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"U" 開頭的字是？', options: ['umbrella', 'van', 'watch', 'fox'], answer: 'umbrella' },
    { type: 'fill-blank', question: 'W is for ___.', options: ['umbrella', 'van', 'watch', 'fox'], answer: 'watch' },
    { type: 'match', question: '🚐 廂型車是哪個字母開頭？', options: ['U', 'V', 'W', 'X'], answer: 'V' },
  ],
};

// L1 M9: Y and Z（字母之巔）
const L1_M9: Mission = {
  id: 9, slug: 'm9-y-and-z', level: 1, title: '最後兩兄弟 Y–Z', titleEn: 'Y and Z', theme: '字母島・字母之巔', themeEmoji: '🏔️',
  story: [
    { image: '🏔️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "The last two letters are here! Y and Z!", dialogueZh: '最後兩個字母在這！Y 和 Z！', highlightWords: ['Y', 'Z'], sceneEmojis: ['🏔️', '🚩', '🔤'], animation: 'wave' },
    { image: '🪀', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "A yoyo! Y is for Yoyo!", dialogueZh: '一個溜溜球！Y 是 Yoyo（溜溜球）！', highlightWords: ['yoyo', 'Y'], sceneEmojis: ['🪀', '🔤', '🎯'], animation: 'bounce' },
    { image: '🦓', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A zebra! Z is for Zebra!", dialogueZh: '一隻斑馬！Z 是 Zebra（斑馬）！', highlightWords: ['zebra', 'Z'], sceneEmojis: ['🦓', '🔤', '✨'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "A to Z! You know all 26 letters now!", dialogueZh: 'A 到 Z！你會全部 26 個字母了！', highlightWords: ['A', 'Z'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'yoyo', zh: '溜溜球', image: '🪀', phonics: 'Yy', kk: '[ˈjojo]', phonicsSound: '/j/', exampleSentence: 'Y is for yoyo.', exampleZh: 'Y 是 yoyo。' },
    { en: 'zebra', zh: '斑馬', image: '🦓', phonics: 'Zz', kk: '[ˈzibrə]', phonicsSound: '/z/', exampleSentence: 'Z is for zebra.', exampleZh: 'Z 是 zebra。' },
  ],
  sentences: [
    { en: 'Y is for Yoyo.', zh: 'Y 是 Yoyo（溜溜球）。' }, { en: 'Z is for Zebra.', zh: 'Z 是 Zebra（斑馬）。' }, { en: 'Now I know A to Z!', zh: '現在我會 A 到 Z 了！' }, { en: 'The zebra is black and white.', zh: '斑馬是黑白的。' }, { en: 'I can play with a yoyo.', zh: '我會玩溜溜球。' }, { en: 'X, Y, Z!', zh: 'X、Y、Z！' },
  ],
  phonicsLetters: ['Yy', 'Zz'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '聽聽看，這是哪個字母？', options: ['Y', 'Z', 'X', 'W'], answer: 'Y', image: '🔤' },
    { type: 'match', question: '🦓 斑馬是哪個字？', options: ['yoyo', 'zebra', 'van', 'fox'], answer: 'zebra' },
    { type: 'fill-blank', question: 'X, Y, ___', options: ['Z', 'A', 'W', 'B'], answer: 'Z' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🪀', '🦓', '🦊', '🚐'], answer: '🦓', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['Y-🪀', 'Z-🦓', 'X-🦊', 'V-🚐'], answer: 'Y-🪀' },
    { type: 'spell', question: '拼拼看：z _ b r a（斑馬）', answer: 'zebra', image: '✍️' },
    { type: 'speak', question: '跟著念：Zebra!', answer: 'Zebra', image: '🗣' },
    { type: 'fill-blank', question: '___ is for yoyo.', options: ['Y', 'Z', 'X', 'W'], answer: 'Y' },
    { type: 'fill-blank', question: 'The last letter is ___.', options: ['Z', 'Y', 'A', 'X'], answer: 'Z' },
  ],
  talkTimePrompts: ["Y is for yoyo! Can you play with a yoyo?", "Z is for zebra! Can you say 'zebra'?", "Can you say A to Z?", "You know all the letters! Amazing!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"Z" 開頭的字是？', options: ['yoyo', 'zebra', 'van', 'fox'], answer: 'zebra' },
    { type: 'fill-blank', question: 'Y is for ___.', options: ['yoyo', 'zebra', 'van', 'fox'], answer: 'yoyo' },
    { type: 'fill-blank', question: 'W, X, Y, ___', options: ['Z', 'A', 'B', 'V'], answer: 'Z' },
  ],
};

// L1 M10: 字母歌大複習② M–Z
const L1_M10: Mission = {
  id: 10, slug: 'm10-review-m-z', level: 1, title: '字母歌大複習② M–Z', titleEn: 'Sing M–Z', theme: '字母島・星空音樂會', themeEmoji: '🌟',
  story: [
    { image: '🌟', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Under the stars, let's sing M to Z!", dialogueZh: '在星空下，一起唱 M 到 Z！', highlightWords: ['M', 'Z'], sceneEmojis: ['🌟', '🌙', '🎵'], animation: 'wave' },
    { image: '🎵', character: '🦜', characterKey: 'polly', characterAction: 'sing', characterName: 'Polly', dialogue: "M, N, O, P, Q, R, S!", dialogueZh: '(唱) M、N、O、P、Q、R、S！', highlightWords: ['M', 'N', 'O', 'P', 'Q', 'R', 'S'], sceneEmojis: ['🎵', '🎶', '⭐'], animation: 'tada' },
    { image: '🎶', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "T, U, V, W, X, Y, Z!", dialogueZh: '(唱) T、U、V、W、X、Y、Z！', highlightWords: ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'], sceneEmojis: ['🎶', '👏', '✨'], animation: 'bounce' },
    { image: '🌈', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Now you sing the whole ABC song! Wow!", dialogueZh: '現在你會唱完整的 ABC 歌了！哇！', highlightWords: ['ABC'], sceneEmojis: ['🌈', '🎉', '🏆'], animation: 'bounce' },
  ],
  words: [
    { en: 'moon', zh: '月亮', image: '🌙', phonics: 'Mm', kk: '[mun]', phonicsSound: '/m/', exampleSentence: 'M is for moon.', exampleZh: 'M 是 moon。' },
    { en: 'queen', zh: '皇后', image: '👑', phonics: 'Qq', kk: '[kwin]', phonicsSound: '/kw/', exampleSentence: 'Q is for queen.', exampleZh: 'Q 是 queen。' },
    { en: 'umbrella', zh: '雨傘', image: '☂️', phonics: 'Uu', kk: '[ʌmˈbrɛlə]', phonicsSound: '/ʌ/', exampleSentence: 'U is for umbrella.', exampleZh: 'U 是 umbrella。' },
    { en: 'zebra', zh: '斑馬', image: '🦓', phonics: 'Zz', kk: '[ˈzibrə]', phonicsSound: '/z/', exampleSentence: 'Z is for zebra.', exampleZh: 'Z 是 zebra。' },
  ],
  sentences: [
    { en: 'M, N, O, P...', zh: 'M、N、O、P……' }, { en: 'Q, R, S, T...', zh: 'Q、R、S、T……' }, { en: 'U, V, W...', zh: 'U、V、W……' }, { en: 'X, Y, Z!', zh: 'X、Y、Z！' }, { en: 'Now I know my ABCs!', zh: '現在我會 ABC 了！' }, { en: 'Sing it again!', zh: '再唱一次！' },
  ],
  phonicsLetters: ['Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'M, N, ___, P', options: ['O', 'Q', 'R', 'A'], answer: 'O' },
    { type: 'match', question: '👑 皇后是哪個字？', options: ['moon', 'queen', 'umbrella', 'zebra'], answer: 'queen' },
    { type: 'listen-pick', question: '哪個是 "moon" 月亮？', options: ['🌙', '👑', '☂️', '🦓'], answer: '🌙' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🌙', '👑', '☂️', '🦓'], answer: '🦓', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['M-🌙', 'Q-👑', 'U-☂️', 'Z-🦓'], answer: 'M-🌙' },
    { type: 'fill-blank', question: 'Q, R, ___, T', options: ['S', 'U', 'P', 'V'], answer: 'S' },
    { type: 'spell', question: '拼拼看：m _ o n（月亮）', answer: 'moon', image: '✍️' },
    { type: 'fill-blank', question: 'X, Y, ___', options: ['Z', 'A', 'W', 'V'], answer: 'Z' },
    { type: 'listen-pick', question: 'Queen 皇后 的開頭是哪個字母？', options: ['M', 'Q', 'U', 'Z'], answer: 'Q', image: '👑' },
  ],
  talkTimePrompts: ["Can you sing M to Z?", "What comes after Q?", "Can you sing the whole ABC song?", "You are an ABC star!"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'V, W, ___, Y', options: ['X', 'Z', 'U', 'T'], answer: 'X' },
    { type: 'match', question: '☂️ 雨傘是哪個字母開頭？', options: ['M', 'Q', 'U', 'Z'], answer: 'U' },
    { type: 'listen-pick', question: '"Z" 開頭的字是？', options: ['moon', 'queen', 'umbrella', 'zebra'], answer: 'zebra' },
  ],
};

// L1 M11: 字母書寫大挑戰（大小寫配對）
const L1_M11: Mission = {
  id: 11, slug: 'm11-trace-match', level: 1, title: '字母書寫大挑戰', titleEn: 'Trace & Match', theme: '字母島・字母工坊', themeEmoji: '✏️',
  story: [
    { image: '✏️', character: '🐰', characterKey: 'ruby', characterAction: 'write', characterName: 'Ruby', dialogue: "Welcome to the Letter Workshop! Let's write letters!", dialogueZh: '歡迎來到字母工坊！我們來寫字母！', highlightWords: ['write'], sceneEmojis: ['✏️', '📝', '🔤'], animation: 'wave' },
    { image: '🔠', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Big A and small a are friends! A and a!", dialogueZh: '大寫 A 和小寫 a 是好朋友！A 和 a！', highlightWords: ['A', 'a'], sceneEmojis: ['🔠', '🔡', '🤝'], animation: 'bounce' },
    { image: '🔡', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Match big and small letters! B goes with b!", dialogueZh: '把大小寫配對！B 配 b！', highlightWords: ['B', 'b'], sceneEmojis: ['🔡', '🧩', '✨'], animation: 'tada' },
    { image: '🎉', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You can write and match letters! Great!", dialogueZh: '你會寫、也會配對字母了！太棒了！', highlightWords: ['write', 'match'], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: 'Aa', kk: '[ˈæpl̩]', phonicsSound: '/æ/', exampleSentence: 'Big A, small a.', exampleZh: '大寫 A，小寫 a。' },
    { en: 'egg', zh: '蛋', image: '🥚', phonics: 'Ee', kk: '[ɛɡ]', phonicsSound: '/ɛ/', exampleSentence: 'Big E, small e.', exampleZh: '大寫 E，小寫 e。' },
    { en: 'moon', zh: '月亮', image: '🌙', phonics: 'Mm', kk: '[mun]', phonicsSound: '/m/', exampleSentence: 'Big M, small m.', exampleZh: '大寫 M，小寫 m。' },
    { en: 'zebra', zh: '斑馬', image: '🦓', phonics: 'Zz', kk: '[ˈzibrə]', phonicsSound: '/z/', exampleSentence: 'Big Z, small z.', exampleZh: '大寫 Z，小寫 z。' },
  ],
  sentences: [
    { en: 'Big A, small a.', zh: '大寫 A，小寫 a。' }, { en: 'Big B, small b.', zh: '大寫 B，小寫 b。' }, { en: 'Match the letters!', zh: '把字母配對！' }, { en: 'Write the letter A.', zh: '寫字母 A。' }, { en: 'Trace the letter.', zh: '描這個字母。' }, { en: 'Well done!', zh: '做得好！' },
  ],
  phonicsLetters: ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff'],
  warmUpQuestions: [
    { type: 'match', question: '大寫 A 配哪個小寫？', options: ['a', 'b', 'e', 'm'], answer: 'a' },
    { type: 'match', question: '大寫 B 配哪個小寫？', options: ['d', 'b', 'p', 'q'], answer: 'b' },
    { type: 'match', question: '大寫 M 配哪個小寫？', options: ['n', 'w', 'm', 'u'], answer: 'm' },
  ],
  challenges: [
    { type: 'match', question: '大小寫配對：A 配？', options: ['a', 'e', 'o', 'u'], answer: 'a' },
    { type: 'match', question: '大小寫配對：E 配？', options: ['f', 'e', 'c', 'o'], answer: 'e' },
    { type: 'spell', question: '拼拼看：a p p l _（蘋果）', answer: 'apple', image: '✍️' },
    { type: 'match', question: '大小寫配對：Z 配？', options: ['s', 'z', 'x', 'n'], answer: 'z' },
    { type: 'spell', question: '拼拼看：m o o _（月亮）', answer: 'moon', image: '✍️' },
    { type: 'match', question: '大小寫配對：M 配？', options: ['n', 'm', 'w', 'h'], answer: 'm' },
  ],
  talkTimePrompts: ["Can you write the letter A?", "Big B and small b — can you match them?", "What letter does apple start with?", "You are great at writing letters!"],
  reviewQuiz: [
    { type: 'match', question: '大寫 E 配哪個小寫？', options: ['e', 'a', 'f', 'c'], answer: 'e' },
    { type: 'match', question: '大寫 Z 配哪個小寫？', options: ['z', 's', 'x', 'v'], answer: 'z' },
    { type: 'spell', question: '拼拼看：e g _（蛋）', answer: 'egg', image: '✍️' },
  ],
};

// L1 M12: 字母島大魔王（總驗收 + 畢業）
const L1_M12: Mission = {
  id: 12, slug: 'm12-letter-boss', level: 1, title: '字母島大魔王', titleEn: 'Letter Boss', theme: '字母島・大魔王挑戰', themeEmoji: '🏆',
  story: [
    { image: '🐲', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The Letter Boss is here! Use all your letters A to Z!", dialogueZh: '字母大魔王來了！用上你所有的字母 A 到 Z！', highlightWords: ['A', 'Z', 'Boss'], sceneEmojis: ['🐲', '⚔️', '🔤'], animation: 'shake' },
    { image: '💪', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Answer the questions to beat the Boss! You can do it!", dialogueZh: '答對問題就能打敗大魔王！你做得到！', highlightWords: ['beat'], sceneEmojis: ['💪', '❓', '✨'], animation: 'bounce' },
    { image: '🎖️', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You beat the Boss! You get the Letter Badge!", dialogueZh: '你打敗大魔王了！獲得字母徽章！', highlightWords: ['Badge'], sceneEmojis: ['🎖️', '🏆', '🎉'], animation: 'tada' },
    { image: '🎓', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Congratulations! You finished Letter Island! On to Sound Island!", dialogueZh: '恭喜！你完成了字母島！前進聲音島！', highlightWords: ['Congratulations'], sceneEmojis: ['🎓', '🌈', '🚀'], animation: 'bounce' },
  ],
  words: [
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: 'Aa', kk: '[ˈæpl̩]', phonicsSound: '/æ/', exampleSentence: 'A is for apple.', exampleZh: 'A 是 apple。' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: 'Ff', kk: '[fɪʃ]', phonicsSound: '/f/', exampleSentence: 'F is for fish.', exampleZh: 'F 是 fish。' },
    { en: 'queen', zh: '皇后', image: '👑', phonics: 'Qq', kk: '[kwin]', phonicsSound: '/kw/', exampleSentence: 'Q is for queen.', exampleZh: 'Q 是 queen。' },
    { en: 'zebra', zh: '斑馬', image: '🦓', phonics: 'Zz', kk: '[ˈzibrə]', phonicsSound: '/z/', exampleSentence: 'Z is for zebra.', exampleZh: 'Z 是 zebra。' },
  ],
  sentences: [
    { en: 'I know A to Z!', zh: '我會 A 到 Z！' }, { en: 'A is for apple.', zh: 'A 是 apple。' }, { en: 'Z is for zebra.', zh: 'Z 是 zebra。' }, { en: 'I beat the Boss!', zh: '我打敗大魔王了！' }, { en: 'I got the badge!', zh: '我拿到徽章了！' }, { en: 'I am an ABC champion!', zh: '我是 ABC 冠軍！' },
  ],
  phonicsLetters: ['Aa', 'Ff', 'Kk', 'Pp', 'Qq', 'Uu', 'Zz'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'A, B, C, ___', options: ['D', 'E', 'F', 'Z'], answer: 'D' },
    { type: 'listen-pick', question: '哪個是 "apple" 蘋果？', options: ['🍎', '🐟', '👑', '🦓'], answer: '🍎' },
    { type: 'match', question: '🦓 斑馬是哪個字母開頭？', options: ['A', 'F', 'Q', 'Z'], answer: 'Z' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🍎', '🐟', '👑', '🦓'], answer: '👑', image: '🎧' },
    { type: 'match', question: '配對：字母配圖片', options: ['A-🍎', 'F-🐟', 'Q-👑', 'Z-🦓'], answer: 'A-🍎' },
    { type: 'spell', question: '拼拼看：f i s _（魚）', answer: 'fish', image: '✍️' },
    { type: 'fill-blank', question: 'X, Y, ___', options: ['Z', 'A', 'W', 'B'], answer: 'Z' },
    { type: 'speak', question: '跟著念：Queen!', answer: 'Queen', image: '🗣' },
    { type: 'fill-blank', question: '___ is for apple.', options: ['A', 'B', 'C', 'Z'], answer: 'A' },
  ],
  talkTimePrompts: ["Can you say A to Z?", "What is A for?", "You beat the Letter Boss! How do you feel?", "You are an ABC champion! Say 'I did it!'"],
  reviewQuiz: [
    { type: 'listen-pick', question: '"Q" 開頭的字是？', options: ['apple', 'fish', 'queen', 'zebra'], answer: 'queen' },
    { type: 'fill-blank', question: 'F is for ___.', options: ['apple', 'fish', 'queen', 'zebra'], answer: 'fish' },
    { type: 'fill-blank', question: 'The last letter of A-Z is ___.', options: ['Z', 'A', 'Y', 'X'], answer: 'Z' },
  ],
};

/* ============================================================
   L2 聲音島 Sound Island — 完整自然發音（新格式 v2：focus + 影片腳本）
============================================================ */

const L2_M1: Mission = {
  id: 1, slug: 'l2-m1-blending', level: 2, title: '拼讀入門', titleEn: 'Blending', theme: '聲音島・拼讀港口', themeEmoji: '🔊',
  focus: '拼讀 blending：把 3 個音一個一個拼成一個字（c-a-t → cat）',
  story: [
    { image: '🔊', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Welcome to Sound Island! Today we learn to blend sounds!", dialogueZh: '歡迎來到聲音島！今天我們學把音拼起來！', highlightWords: ['blend', 'sounds'], sceneEmojis: ['🔊', '🏝️', '✨'], animation: 'wave' },
    { image: '🐱', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Listen: c... a... t... cat! Three sounds make one word!", dialogueZh: '聽：c… a… t… cat！三個音拼成一個字！', highlightWords: ['cat'], sceneEmojis: ['🔤', '🐱', '👂'], animation: 'bounce' },
    { image: '☀️', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "s... u... n... sun! You try it!", dialogueZh: 's… u… n… sun！換你試試！', highlightWords: ['sun'], sceneEmojis: ['☀️', '🔤', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Great! Now you can blend sounds into words!", dialogueZh: '太棒了！現在你會把音拼成字了！', highlightWords: ['blend'], sceneEmojis: ['🎉', '🏆', '🔊'], animation: 'bounce' },
  ],
  words: [
    { en: 'cat', zh: '貓', image: '🐱', phonics: 'c-a-t', kk: '[kæt]', phonicsSound: '/k/ /æ/ /t/', exampleSentence: 'The cat is here.', exampleZh: '貓在這裡。' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: 'h-a-t', kk: '[hæt]', phonicsSound: '/h/ /æ/ /t/', exampleSentence: 'I see a hat.', exampleZh: '我看到一頂帽子。' },
    { en: 'sun', zh: '太陽', image: '☀️', phonics: 's-u-n', kk: '[sʌn]', phonicsSound: '/s/ /ʌ/ /n/', exampleSentence: 'The sun is hot.', exampleZh: '太陽很熱。' },
    { en: 'bus', zh: '公車', image: '🚌', phonics: 'b-u-s', kk: '[bʌs]', phonicsSound: '/b/ /ʌ/ /s/', exampleSentence: 'The bus is big.', exampleZh: '公車很大。' },
    { en: 'pig', zh: '豬', image: '🐷', phonics: 'p-i-g', kk: '[pɪɡ]', phonicsSound: '/p/ /ɪ/ /ɡ/', exampleSentence: 'The pig is pink.', exampleZh: '豬是粉紅色的。' },
    { en: 'big', zh: '大的', image: '🔵', phonics: 'b-i-g', kk: '[bɪɡ]', phonicsSound: '/b/ /ɪ/ /ɡ/', exampleSentence: 'It is big.', exampleZh: '它很大。' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: 'd-o-g', kk: '[dɔɡ]', phonicsSound: '/d/ /ɔ/ /ɡ/', exampleSentence: 'The dog can run.', exampleZh: '狗會跑。' },
    { en: 'box', zh: '箱子', image: '📦', phonics: 'b-o-x', kk: '[bɑks]', phonicsSound: '/b/ /ɑ/ /ks/', exampleSentence: 'Open the box.', exampleZh: '打開箱子。' },
    { en: 'bed', zh: '床', image: '🛏️', phonics: 'b-e-d', kk: '[bɛd]', phonicsSound: '/b/ /ɛ/ /d/', exampleSentence: 'I sleep in my bed.', exampleZh: '我睡在床上。' },
    { en: 'red', zh: '紅色', image: '🔴', phonics: 'r-e-d', kk: '[rɛd]', phonicsSound: '/r/ /ɛ/ /d/', exampleSentence: 'The apple is red.', exampleZh: '蘋果是紅色的。' },
  ],
  sentences: [
    { en: 'c-a-t → cat', zh: 'c-a-t 拼成 cat' }, { en: 's-u-n → sun', zh: 's-u-n 拼成 sun' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'It is a cat.', zh: '這是一隻貓。' }, { en: 'Is it a dog?', zh: '這是一隻狗嗎？' }, { en: 'Yes, it is. / No, it isn\'t.', zh: '是的。／不是。' },
  ],
  phonicsLetters: ['blending'],
  warmUpQuestions: [
    { type: 'listen-pick', question: 'c-a-t 拼起來是？', options: ['cat', 'dog', 'sun', 'pig'], answer: 'cat', image: '🐱' },
    { type: 'listen-pick', question: 's-u-n 拼起來是？', options: ['bus', 'sun', 'six', 'sit'], answer: 'sun', image: '☀️' },
    { type: 'match', question: '🐷 豬是哪個字？', options: ['pig', 'dog', 'cat', 'bus'], answer: 'pig' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐱', '🐶', '☀️', '🐷'], answer: '🐶', image: '🎧' },
    { type: 'spell', question: '拼拼看：c _ t（貓）', answer: 'cat', image: '✍️' },
    { type: 'spell', question: '拼拼看：s _ n（太陽）', answer: 'sun', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['cat-🐱', 'dog-🐶', 'sun-☀️', 'pig-🐷'], answer: 'cat-🐱' },
    { type: 'speak', question: '跟著拼：b-u-s → Bus!', answer: 'Bus', image: '🗣' },
    { type: 'fill-blank', question: 'The ___ is hot.（太陽）', options: ['sun', 'bed', 'box', 'dog'], answer: 'sun' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['It is a cat.', 'It is a dog.', 'Is it a cat?', 'It is a bus.'], answer: 'It is a cat.', image: '🎧' },
  ],
  talkTimePrompts: ["Can you blend c-a-t?", "What is s-u-n?", "Say a word that starts with /b/.", "You can blend sounds! Great!"],
  reviewQuiz: [
    { type: 'spell', question: '拼拼看：d _ g（狗）', answer: 'dog', image: '✍️' },
    { type: 'listen-pick', question: 'b-i-g 拼起來是？', options: ['big', 'bag', 'bug', 'bed'], answer: 'big' },
    { type: 'match', question: '📦 箱子是哪個字？', options: ['box', 'bus', 'bed', 'big'], answer: 'box' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Look! c... a... t. What word is it?", lineZh: '看！c… a… t。是什麼字？' },
    { speaker: 'Coco', line: "It's a cat! Meow!", lineZh: '是 cat（貓）！喵！' },
    { speaker: 'Finn', line: "Now try: s... u... n.", lineZh: '現在試試：s… u… n。' },
    { speaker: 'Coco', line: "Sun! I did it!", lineZh: 'Sun（太陽）！我做到了！' },
  ],
};

const L2_M2: Mission = {
  id: 2, slug: 'l2-m2-short-a', level: 2, title: '短母音 a', titleEn: 'Short a', theme: '聲音島・短音 a 沙灘', themeEmoji: '🅰️',
  focus: '短母音 a /æ/：-at / -an / -ap 家族',
  story: [
    { image: '🅰️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "The letter a says /æ/! Like in cat!", dialogueZh: '字母 a 發 /æ/ 的音！像 cat 一樣！', highlightWords: ['a', 'cat'], sceneEmojis: ['🅰️', '🐱', '✨'], animation: 'wave' },
    { image: '🦇', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "cat, hat, bat — they all have /æ/!", dialogueZh: 'cat、hat、bat —— 都有 /æ/！', highlightWords: ['cat', 'hat', 'bat'], sceneEmojis: ['🐱', '🎩', '🦇'], animation: 'bounce' },
    { image: '🪭', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "man, can, fan — /æ/ again!", dialogueZh: 'man、can、fan —— 又是 /æ/！', highlightWords: ['man', 'can', 'fan'], sceneEmojis: ['🪭', '🥫', '🔤'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You found the /æ/ sound! Well done!", dialogueZh: '你找到 /æ/ 的音了！做得好！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🅰️'], animation: 'bounce' },
  ],
  words: [
    { en: 'cat', zh: '貓', image: '🐱', phonics: 'a /æ/', kk: '[kæt]', phonicsSound: '/æ/', exampleSentence: 'A cat sat.', exampleZh: '一隻貓坐著。' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: 'a /æ/', kk: '[hæt]', phonicsSound: '/æ/', exampleSentence: 'A red hat.', exampleZh: '一頂紅帽子。' },
    { en: 'bat', zh: '蝙蝠', image: '🦇', phonics: 'a /æ/', kk: '[bæt]', phonicsSound: '/æ/', exampleSentence: 'The bat is black.', exampleZh: '蝙蝠是黑色的。' },
    { en: 'map', zh: '地圖', image: '🗺️', phonics: 'a /æ/', kk: '[mæp]', phonicsSound: '/æ/', exampleSentence: 'Look at the map.', exampleZh: '看地圖。' },
    { en: 'bag', zh: '袋子', image: '👜', phonics: 'a /æ/', kk: '[bæɡ]', phonicsSound: '/æ/', exampleSentence: 'My bag is big.', exampleZh: '我的袋子很大。' },
    { en: 'fan', zh: '扇子', image: '🪭', phonics: 'a /æ/', kk: '[fæn]', phonicsSound: '/æ/', exampleSentence: 'The fan is on.', exampleZh: '電扇開著。' },
    { en: 'can', zh: '罐子', image: '🥫', phonics: 'a /æ/', kk: '[kæn]', phonicsSound: '/æ/', exampleSentence: 'It is a can.', exampleZh: '這是一個罐子。' },
    { en: 'man', zh: '男人', image: '👨', phonics: 'a /æ/', kk: '[mæn]', phonicsSound: '/æ/', exampleSentence: 'The man is tall.', exampleZh: '這個男人很高。' },
    { en: 'cap', zh: '鴨舌帽', image: '🧢', phonics: 'a /æ/', kk: '[kæp]', phonicsSound: '/æ/', exampleSentence: 'A blue cap.', exampleZh: '一頂藍帽子。' },
    { en: 'rat', zh: '老鼠', image: '🐀', phonics: 'a /æ/', kk: '[ræt]', phonicsSound: '/æ/', exampleSentence: 'The rat is fast.', exampleZh: '老鼠很快。' },
  ],
  sentences: [
    { en: 'A cat has a hat.', zh: '貓有一頂帽子。' }, { en: 'The bat is in the bag.', zh: '蝙蝠在袋子裡。' }, { en: 'Is it a cat?', zh: '這是貓嗎？' }, { en: 'Yes, it is a cat.', zh: '是的，這是貓。' }, { en: 'Can you see the map?', zh: '你看得到地圖嗎？' }, { en: 'The man has a cap.', zh: '男人有一頂帽子。' },
  ],
  phonicsLetters: ['a /æ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 /æ/ 的音？', options: ['cat', 'dog', 'sun', 'pig'], answer: 'cat', image: '🅰️' },
    { type: 'match', question: '🎩 帽子是哪個字？', options: ['hat', 'bat', 'map', 'bag'], answer: 'hat' },
    { type: 'spell', question: '拼拼看：b _ t（蝙蝠）', answer: 'bat', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐱', '🎩', '🦇', '🗺️'], answer: '🦇', image: '🎧' },
    { type: 'spell', question: '拼拼看：c _ t（貓）', answer: 'cat', image: '✍️' },
    { type: 'spell', question: '拼拼看：m _ p（地圖）', answer: 'map', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['fan-🪭', 'can-🥫', 'cap-🧢', 'rat-🐀'], answer: 'fan-🪭' },
    { type: 'fill-blank', question: 'The ___ is black.（蝙蝠）', options: ['bat', 'cat', 'hat', 'map'], answer: 'bat' },
    { type: 'speak', question: '跟著念：Cat, hat, bat!', answer: 'Cat', image: '🗣' },
  ],
  talkTimePrompts: ["Say three words with /æ/.", "What has /æ/: cat or dog?", "Can you find a hat?", "Great job with short a!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "bag" 袋子？', options: ['👜', '🎩', '🧢', '🗺️'], answer: '👜' },
    { type: 'spell', question: '拼拼看：f _ n（扇子）', answer: 'fan', image: '✍️' },
    { type: 'match', question: '🐀 老鼠是哪個字？', options: ['rat', 'cat', 'bat', 'can'], answer: 'rat' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Look, a cat with a hat!", lineZh: '看，一隻戴帽子的貓！' },
    { speaker: 'Polly', line: "cat, hat — they rhyme! /æ/!", lineZh: 'cat、hat —— 押韻！/æ/！' },
    { speaker: 'Coco', line: "And a bat in a bag!", lineZh: '還有袋子裡的蝙蝠！' },
    { speaker: 'Polly', line: "bat, bag — /æ/ again! So fun!", lineZh: 'bat、bag —— 又是 /æ/！好好玩！' },
  ],
};

const L2_M3: Mission = {
  id: 3, slug: 'l2-m3-short-e', level: 2, title: '短母音 e', titleEn: 'Short e', theme: '聲音島・短音 e 森林', themeEmoji: '🇪',
  focus: '短母音 e /ɛ/：-ed / -en / -et 家族',
  story: [
    { image: '🛏️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "The letter e says /ɛ/! Like in bed!", dialogueZh: '字母 e 發 /ɛ/ 的音！像 bed 一樣！', highlightWords: ['e', 'bed'], sceneEmojis: ['🛏️', '🔤', '✨'], animation: 'wave' },
    { image: '🖊️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "bed, pen, red — all /ɛ/!", dialogueZh: 'bed、pen、red —— 都是 /ɛ/！', highlightWords: ['bed', 'pen', 'red'], sceneEmojis: ['🛏️', '🖊️', '🔴'], animation: 'bounce' },
    { image: '🐔', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "hen, ten, net — /ɛ/ too!", dialogueZh: 'hen、ten、net —— 也是 /ɛ/！', highlightWords: ['hen', 'ten', 'net'], sceneEmojis: ['🐔', '🔟', '🥅'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know short e now! Amazing!", dialogueZh: '你會短母音 e 了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'bed', zh: '床', image: '🛏️', phonics: 'e /ɛ/', kk: '[bɛd]', phonicsSound: '/ɛ/', exampleSentence: 'I go to bed.', exampleZh: '我去睡覺。' },
    { en: 'pen', zh: '筆', image: '🖊️', phonics: 'e /ɛ/', kk: '[pɛn]', phonicsSound: '/ɛ/', exampleSentence: 'A red pen.', exampleZh: '一支紅筆。' },
    { en: 'red', zh: '紅色', image: '🔴', phonics: 'e /ɛ/', kk: '[rɛd]', phonicsSound: '/ɛ/', exampleSentence: 'It is red.', exampleZh: '它是紅色的。' },
    { en: 'hen', zh: '母雞', image: '🐔', phonics: 'e /ɛ/', kk: '[hɛn]', phonicsSound: '/ɛ/', exampleSentence: 'The hen is fat.', exampleZh: '母雞很胖。' },
    { en: 'ten', zh: '十', image: '🔟', phonics: 'e /ɛ/', kk: '[tɛn]', phonicsSound: '/ɛ/', exampleSentence: 'I am ten.', exampleZh: '我十歲。' },
    { en: 'net', zh: '網子', image: '🥅', phonics: 'e /ɛ/', kk: '[nɛt]', phonicsSound: '/ɛ/', exampleSentence: 'A big net.', exampleZh: '一個大網子。' },
    { en: 'leg', zh: '腿', image: '🦵', phonics: 'e /ɛ/', kk: '[lɛɡ]', phonicsSound: '/ɛ/', exampleSentence: 'My leg hurts.', exampleZh: '我的腿痛。' },
    { en: 'wet', zh: '濕的', image: '💧', phonics: 'e /ɛ/', kk: '[wɛt]', phonicsSound: '/ɛ/', exampleSentence: 'The dog is wet.', exampleZh: '狗濕濕的。' },
    { en: 'jet', zh: '噴射機', image: '✈️', phonics: 'e /ɛ/', kk: '[dʒɛt]', phonicsSound: '/ɛ/', exampleSentence: 'The jet is fast.', exampleZh: '噴射機很快。' },
    { en: 'get', zh: '得到', image: '🫴', phonics: 'e /ɛ/', kk: '[ɡɛt]', phonicsSound: '/ɛ/', exampleSentence: 'Get the pen.', exampleZh: '拿那支筆。' },
  ],
  sentences: [
    { en: 'The hen is on the bed.', zh: '母雞在床上。' }, { en: 'I have ten pens.', zh: '我有十支筆。' }, { en: 'Is the pen red?', zh: '這支筆是紅色的嗎？' }, { en: 'Yes, it is red.', zh: '是的，它是紅色的。' }, { en: 'The net is wet.', zh: '網子濕了。' }, { en: 'Can you get the pen?', zh: '你可以拿那支筆嗎？' },
  ],
  phonicsLetters: ['e /ɛ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 /ɛ/ 的音？', options: ['bed', 'cat', 'pig', 'sun'], answer: 'bed', image: '🔤' },
    { type: 'match', question: '🐔 母雞是哪個字？', options: ['hen', 'pen', 'net', 'ten'], answer: 'hen' },
    { type: 'spell', question: '拼拼看：r _ d（紅色）', answer: 'red', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🛏️', '🖊️', '🐔', '🥅'], answer: '🐔', image: '🎧' },
    { type: 'spell', question: '拼拼看：b _ d（床）', answer: 'bed', image: '✍️' },
    { type: 'spell', question: '拼拼看：n _ t（網子）', answer: 'net', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['pen-🖊️', 'ten-🔟', 'leg-🦵', 'jet-✈️'], answer: 'pen-🖊️' },
    { type: 'fill-blank', question: 'I am ___ years old.（十）', options: ['ten', 'red', 'bed', 'wet'], answer: 'ten' },
    { type: 'speak', question: '跟著念：Bed, pen, red!', answer: 'Bed', image: '🗣' },
  ],
  talkTimePrompts: ["Say three words with /ɛ/.", "What is red in your bag?", "How old are you? I am ___.", "Great job with short e!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "net" 網子？', options: ['🥅', '🐔', '🛏️', '✈️'], answer: '🥅' },
    { type: 'spell', question: '拼拼看：h _ n（母雞）', answer: 'hen', image: '✍️' },
    { type: 'match', question: '🦵 腿是哪個字？', options: ['leg', 'net', 'jet', 'wet'], answer: 'leg' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A hen is on my bed!", lineZh: '一隻母雞在我床上！' },
    { speaker: 'Ruby', line: "hen, bed — /ɛ/! Get the hen!", lineZh: 'hen、bed —— /ɛ/！去抓母雞！' },
    { speaker: 'Benny', line: "I have a net!", lineZh: '我有一個網子！' },
    { speaker: 'Ruby', line: "net — /ɛ/ too! Catch it!", lineZh: 'net —— 也是 /ɛ/！抓住牠！' },
  ],
};

const L2_M4: Mission = {
  id: 4, slug: 'l2-m4-short-i', level: 2, title: '短母音 i', titleEn: 'Short i', theme: '聲音島・短音 i 山洞', themeEmoji: '🇮',
  focus: '短母音 i /ɪ/：-ig / -it / -in 家族',
  story: [
    { image: '🐷', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "The letter i says /ɪ/! Like in pig!", dialogueZh: '字母 i 發 /ɪ/ 的音！像 pig 一樣！', highlightWords: ['i', 'pig'], sceneEmojis: ['🐷', '🔤', '✨'], animation: 'wave' },
    { image: '🔢', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "pig, big, dig — all /ɪ/!", dialogueZh: 'pig、big、dig —— 都是 /ɪ/！', highlightWords: ['pig', 'big', 'dig'], sceneEmojis: ['🐷', '🔵', '⛏️'], animation: 'bounce' },
    { image: '📌', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "sit, hit, six — /ɪ/ too!", dialogueZh: 'sit、hit、six —— 也是 /ɪ/！', highlightWords: ['sit', 'hit', 'six'], sceneEmojis: ['🪑', '👊', '6️⃣'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Short i — you got it! Super!", dialogueZh: '短母音 i —— 你會了！超厲害！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'pig', zh: '豬', image: '🐷', phonics: 'i /ɪ/', kk: '[pɪɡ]', phonicsSound: '/ɪ/', exampleSentence: 'The pig is big.', exampleZh: '豬很大。' },
    { en: 'big', zh: '大的', image: '🔵', phonics: 'i /ɪ/', kk: '[bɪɡ]', phonicsSound: '/ɪ/', exampleSentence: 'A big pig.', exampleZh: '一隻大豬。' },
    { en: 'dig', zh: '挖', image: '⛏️', phonics: 'i /ɪ/', kk: '[dɪɡ]', phonicsSound: '/ɪ/', exampleSentence: 'Dogs dig.', exampleZh: '狗會挖洞。' },
    { en: 'sit', zh: '坐', image: '🪑', phonics: 'i /ɪ/', kk: '[sɪt]', phonicsSound: '/ɪ/', exampleSentence: 'Sit down.', exampleZh: '坐下。' },
    { en: 'hit', zh: '打', image: '👊', phonics: 'i /ɪ/', kk: '[hɪt]', phonicsSound: '/ɪ/', exampleSentence: 'Hit the ball.', exampleZh: '打球。' },
    { en: 'six', zh: '六', image: '6️⃣', phonics: 'i /ɪ/', kk: '[sɪks]', phonicsSound: '/ɪ/', exampleSentence: 'I have six.', exampleZh: '我有六個。' },
    { en: 'pin', zh: '別針', image: '📌', phonics: 'i /ɪ/', kk: '[pɪn]', phonicsSound: '/ɪ/', exampleSentence: 'A small pin.', exampleZh: '一根小別針。' },
    { en: 'lip', zh: '嘴唇', image: '👄', phonics: 'i /ɪ/', kk: '[lɪp]', phonicsSound: '/ɪ/', exampleSentence: 'Red lips.', exampleZh: '紅嘴唇。' },
    { en: 'win', zh: '贏', image: '🏆', phonics: 'i /ɪ/', kk: '[wɪn]', phonicsSound: '/ɪ/', exampleSentence: 'We can win!', exampleZh: '我們可以贏！' },
    { en: 'kid', zh: '小孩', image: '🧒', phonics: 'i /ɪ/', kk: '[kɪd]', phonicsSound: '/ɪ/', exampleSentence: 'The kid is happy.', exampleZh: '小孩很開心。' },
  ],
  sentences: [
    { en: 'The big pig can dig.', zh: '大豬會挖洞。' }, { en: 'Sit on the mat.', zh: '坐在墊子上。' }, { en: 'Is it big?', zh: '它很大嗎？' }, { en: 'Yes, it is big.', zh: '是的，它很大。' }, { en: 'I have six pins.', zh: '我有六根別針。' }, { en: 'Can the kid win?', zh: '這小孩會贏嗎？' },
  ],
  phonicsLetters: ['i /ɪ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 /ɪ/ 的音？', options: ['pig', 'cat', 'bed', 'sun'], answer: 'pig', image: '🔤' },
    { type: 'match', question: '🪑 坐是哪個字？', options: ['sit', 'hit', 'pin', 'six'], answer: 'sit' },
    { type: 'spell', question: '拼拼看：b _ g（大的）', answer: 'big', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐷', '🪑', '📌', '6️⃣'], answer: '📌', image: '🎧' },
    { type: 'spell', question: '拼拼看：p _ g（豬）', answer: 'pig', image: '✍️' },
    { type: 'spell', question: '拼拼看：s _ x（六）', answer: 'six', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['win-🏆', 'lip-👄', 'kid-🧒', 'dig-⛏️'], answer: 'win-🏆' },
    { type: 'fill-blank', question: 'The pig is ___.（大的）', options: ['big', 'six', 'sit', 'pin'], answer: 'big' },
    { type: 'speak', question: '跟著念：Pig, big, dig!', answer: 'Pig', image: '🗣' },
  ],
  talkTimePrompts: ["Say three words with /ɪ/.", "How old are you? Can you say six?", "What is big?", "Great job with short i!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "six" 六？', options: ['6️⃣', '🐷', '📌', '🪑'], answer: '6️⃣' },
    { type: 'spell', question: '拼拼看：s _ t（坐）', answer: 'sit', image: '✍️' },
    { type: 'match', question: '🧒 小孩是哪個字？', options: ['kid', 'pig', 'lip', 'win'], answer: 'kid' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "A big pig can dig!", lineZh: '大豬會挖洞！' },
    { speaker: 'Coco', line: "big, pig, dig — /ɪ/! Look!", lineZh: 'big、pig、dig —— /ɪ/！看！' },
    { speaker: 'Finn', line: "Sit and count to six!", lineZh: '坐下數到六！' },
    { speaker: 'Coco', line: "sit, six — /ɪ/ again! Fun!", lineZh: 'sit、six —— 又是 /ɪ/！好玩！' },
  ],
};

const L2_M5: Mission = {
  id: 5, slug: 'l2-m5-review-aei', level: 2, title: '拼讀複習① a e i', titleEn: 'Review a e i', theme: '聲音島・拼讀擂台', themeEmoji: '🎯',
  focus: '複習短母音 a /æ/、e /ɛ/、i /ɪ/ 的分辨與拼讀',
  story: [
    { image: '🎯', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's review a, e, i! Listen carefully!", dialogueZh: '我們複習 a、e、i！仔細聽！', highlightWords: ['a', 'e', 'i'], sceneEmojis: ['🎯', '🔤', '👂'], animation: 'wave' },
    { image: '🐱', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "cat /æ/, bed /ɛ/, pig /ɪ/ — different sounds!", dialogueZh: 'cat /æ/、bed /ɛ/、pig /ɪ/ —— 不同的音！', highlightWords: ['cat', 'bed', 'pig'], sceneEmojis: ['🐱', '🛏️', '🐷'], animation: 'bounce' },
    { image: '🏆', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can hear the difference! Champion!", dialogueZh: '你聽得出差別了！冠軍！', highlightWords: [], sceneEmojis: ['🏆', '🎉', '🎯'], animation: 'bounce' },
  ],
  words: [
    { en: 'cat', zh: '貓', image: '🐱', phonics: 'a /æ/', kk: '[kæt]', phonicsSound: '/æ/', exampleSentence: 'a cat', exampleZh: '一隻貓' },
    { en: 'bat', zh: '蝙蝠', image: '🦇', phonics: 'a /æ/', kk: '[bæt]', phonicsSound: '/æ/', exampleSentence: 'a bat', exampleZh: '一隻蝙蝠' },
    { en: 'bed', zh: '床', image: '🛏️', phonics: 'e /ɛ/', kk: '[bɛd]', phonicsSound: '/ɛ/', exampleSentence: 'a bed', exampleZh: '一張床' },
    { en: 'pen', zh: '筆', image: '🖊️', phonics: 'e /ɛ/', kk: '[pɛn]', phonicsSound: '/ɛ/', exampleSentence: 'a pen', exampleZh: '一支筆' },
    { en: 'pig', zh: '豬', image: '🐷', phonics: 'i /ɪ/', kk: '[pɪɡ]', phonicsSound: '/ɪ/', exampleSentence: 'a pig', exampleZh: '一隻豬' },
    { en: 'six', zh: '六', image: '6️⃣', phonics: 'i /ɪ/', kk: '[sɪks]', phonicsSound: '/ɪ/', exampleSentence: 'six', exampleZh: '六' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: 'a /æ/', kk: '[hæt]', phonicsSound: '/æ/', exampleSentence: 'a hat', exampleZh: '一頂帽子' },
    { en: 'net', zh: '網子', image: '🥅', phonics: 'e /ɛ/', kk: '[nɛt]', phonicsSound: '/ɛ/', exampleSentence: 'a net', exampleZh: '一個網子' },
    { en: 'sit', zh: '坐', image: '🪑', phonics: 'i /ɪ/', kk: '[sɪt]', phonicsSound: '/ɪ/', exampleSentence: 'sit', exampleZh: '坐' },
    { en: 'red', zh: '紅色', image: '🔴', phonics: 'e /ɛ/', kk: '[rɛd]', phonicsSound: '/ɛ/', exampleSentence: 'red', exampleZh: '紅色' },
  ],
  sentences: [
    { en: 'A cat on a bed.', zh: '床上的貓。' }, { en: 'A pig with a hat.', zh: '戴帽子的豬。' }, { en: 'Is it a cat or a pig?', zh: '這是貓還是豬？' }, { en: 'It is a cat.', zh: '這是一隻貓。' }, { en: 'The pen is red.', zh: '這支筆是紅色的。' }, { en: 'Sit on the bed.', zh: '坐在床上。' },
  ],
  phonicsLetters: ['a /æ/', 'e /ɛ/', 'i /ɪ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '"cat" 是哪個母音？', options: ['a', 'e', 'i', 'o'], answer: 'a', image: '🐱' },
    { type: 'listen-pick', question: '"bed" 是哪個母音？', options: ['a', 'e', 'i', 'u'], answer: 'e', image: '🛏️' },
    { type: 'listen-pick', question: '"pig" 是哪個母音？', options: ['a', 'e', 'i', 'o'], answer: 'i', image: '🐷' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐱', '🛏️', '🐷', '🥅'], answer: '🐷', image: '🎧' },
    { type: 'spell', question: '拼拼看：c _ t（貓）', answer: 'cat', image: '✍️' },
    { type: 'spell', question: '拼拼看：b _ d（床）', answer: 'bed', image: '✍️' },
    { type: 'spell', question: '拼拼看：p _ g（豬）', answer: 'pig', image: '✍️' },
    { type: 'match', question: '配對：字配母音', options: ['cat-a', 'bed-e', 'pig-i', 'hat-a'], answer: 'cat-a' },
    { type: 'fill-blank', question: 'Which has /ɛ/? ___', options: ['bed', 'cat', 'pig', 'six'], answer: 'bed' },
  ],
  talkTimePrompts: ["Say a word with /æ/.", "Say a word with /ɛ/.", "Say a word with /ɪ/.", "You are a phonics champion!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個字有 /æ/？', options: ['hat', 'bed', 'pig', 'net'], answer: 'hat' },
    { type: 'listen-pick', question: '哪個字有 /ɪ/？', options: ['sit', 'bed', 'cat', 'red'], answer: 'sit' },
    { type: 'match', question: '🥅 網子是哪個母音？', options: ['e', 'a', 'i', 'o'], answer: 'e' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "cat, bed, pig — listen to the middle sound!", lineZh: 'cat、bed、pig —— 聽中間的音！' },
    { speaker: 'Coco', line: "/æ/, /ɛ/, /ɪ/ — all different!", lineZh: '/æ/、/ɛ/、/ɪ/ —— 都不一樣！' },
    { speaker: 'Polly', line: "Can you sort them?", lineZh: '你能分類嗎？' },
    { speaker: 'Coco', line: "Yes! I'm a phonics champion!", lineZh: '可以！我是拼讀冠軍！' },
  ],
};

const L2_M6: Mission = {
  id: 6, slug: 'l2-m6-short-o', level: 2, title: '短母音 o', titleEn: 'Short o', theme: '聲音島・短音 o 岩洞', themeEmoji: '🅾️',
  focus: '短母音 o /ɑ/：-ox / -ot / -op 家族',
  story: [
    { image: '📦', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "The letter o says /ɑ/! Like in box!", dialogueZh: '字母 o 發 /ɑ/ 的音！像 box 一樣！', highlightWords: ['o', 'box'], sceneEmojis: ['📦', '🔤', '✨'], animation: 'wave' },
    { image: '🦊', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "box, fox, hot — all /ɑ/!", dialogueZh: 'box、fox、hot —— 都是 /ɑ/！', highlightWords: ['box', 'fox', 'hot'], sceneEmojis: ['📦', '🦊', '🔥'], animation: 'bounce' },
    { image: '🧹', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "top, pot, mop — /ɑ/ too!", dialogueZh: 'top、pot、mop —— 也是 /ɑ/！', highlightWords: ['top', 'pot', 'mop'], sceneEmojis: ['🔝', '🍲', '🧹'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Short o — done! Great!", dialogueZh: '短母音 o —— 完成！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'box', zh: '箱子', image: '📦', phonics: 'o /ɑ/', kk: '[bɑks]', phonicsSound: '/ɑ/', exampleSentence: 'a big box', exampleZh: '一個大箱子' },
    { en: 'fox', zh: '狐狸', image: '🦊', phonics: 'o /ɑ/', kk: '[fɑks]', phonicsSound: '/ɑ/', exampleSentence: 'a fast fox', exampleZh: '一隻快狐狸' },
    { en: 'hot', zh: '熱的', image: '🔥', phonics: 'o /ɑ/', kk: '[hɑt]', phonicsSound: '/ɑ/', exampleSentence: 'It is hot.', exampleZh: '很熱。' },
    { en: 'top', zh: '頂端', image: '🔝', phonics: 'o /ɑ/', kk: '[tɑp]', phonicsSound: '/ɑ/', exampleSentence: 'on the top', exampleZh: '在頂端' },
    { en: 'pot', zh: '鍋子', image: '🍲', phonics: 'o /ɑ/', kk: '[pɑt]', phonicsSound: '/ɑ/', exampleSentence: 'a hot pot', exampleZh: '一個熱鍋' },
    { en: 'mop', zh: '拖把', image: '🧹', phonics: 'o /ɑ/', kk: '[mɑp]', phonicsSound: '/ɑ/', exampleSentence: 'a wet mop', exampleZh: '一支濕拖把' },
    { en: 'hop', zh: '跳', image: '🐰', phonics: 'o /ɑ/', kk: '[hɑp]', phonicsSound: '/ɑ/', exampleSentence: 'Rabbits hop.', exampleZh: '兔子會跳。' },
    { en: 'dot', zh: '點', image: '🔴', phonics: 'o /ɑ/', kk: '[dɑt]', phonicsSound: '/ɑ/', exampleSentence: 'a red dot', exampleZh: '一個紅點' },
    { en: 'log', zh: '木頭', image: '🪵', phonics: 'o /ɑ/', kk: '[lɔɡ]', phonicsSound: '/ɑ/', exampleSentence: 'a big log', exampleZh: '一根大木頭' },
    { en: 'pop', zh: '爆開', image: '🎈', phonics: 'o /ɑ/', kk: '[pɑp]', phonicsSound: '/ɑ/', exampleSentence: 'Pop the balloon!', exampleZh: '把氣球弄破！' },
  ],
  sentences: [
    { en: 'The fox is in the box.', zh: '狐狸在箱子裡。' }, { en: 'The pot is hot.', zh: '鍋子很燙。' }, { en: 'Is the pot hot?', zh: '鍋子燙嗎？' }, { en: 'Yes, it is hot.', zh: '是的，很燙。' }, { en: 'Can you hop?', zh: '你會跳嗎？' }, { en: 'The mop is on top.', zh: '拖把在上面。' },
  ],
  phonicsLetters: ['o /ɑ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 /ɑ/ 的音？', options: ['box', 'cat', 'bed', 'pig'], answer: 'box', image: '🔤' },
    { type: 'match', question: '🦊 狐狸是哪個字？', options: ['fox', 'box', 'pot', 'top'], answer: 'fox' },
    { type: 'spell', question: '拼拼看：h _ t（熱的）', answer: 'hot', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['📦', '🦊', '🔥', '🍲'], answer: '🍲', image: '🎧' },
    { type: 'spell', question: '拼拼看：b _ x（箱子）', answer: 'box', image: '✍️' },
    { type: 'spell', question: '拼拼看：m _ p（拖把）', answer: 'mop', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['top-🔝', 'pot-🍲', 'log-🪵', 'dot-🔴'], answer: 'top-🔝' },
    { type: 'fill-blank', question: 'The pot is ___.（熱的）', options: ['hot', 'box', 'top', 'mop'], answer: 'hot' },
    { type: 'speak', question: '跟著念：Box, fox, hot!', answer: 'Box', image: '🗣' },
  ],
  talkTimePrompts: ["Say three words with /ɑ/.", "What is hot?", "Can you hop like a rabbit?", "Great job with short o!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "fox" 狐狸？', options: ['🦊', '📦', '🍲', '🧹'], answer: '🦊' },
    { type: 'spell', question: '拼拼看：t _ p（頂端）', answer: 'top', image: '✍️' },
    { type: 'match', question: '🧹 拖把是哪個字？', options: ['mop', 'hop', 'pop', 'top'], answer: 'mop' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "A fox is in the box!", lineZh: '狐狸在箱子裡！' },
    { speaker: 'Coco', line: "fox, box — /ɑ/! Look out!", lineZh: 'fox、box —— /ɑ/！小心！' },
    { speaker: 'Finn', line: "The pot is hot. Don't touch!", lineZh: '鍋子很燙。別碰！' },
    { speaker: 'Coco', line: "hot, pot — /ɑ/ again!", lineZh: 'hot、pot —— 又是 /ɑ/！' },
  ],
};

const L2_M7: Mission = {
  id: 7, slug: 'l2-m7-short-u', level: 2, title: '短母音 u', titleEn: 'Short u', theme: '聲音島・短音 u 泥地', themeEmoji: '🆄',
  focus: '短母音 u /ʌ/：-un / -ug / -ut 家族',
  story: [
    { image: '🥤', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "The letter u says /ʌ/! Like in cup!", dialogueZh: '字母 u 發 /ʌ/ 的音！像 cup 一樣！', highlightWords: ['u', 'cup'], sceneEmojis: ['🥤', '🔤', '✨'], animation: 'wave' },
    { image: '☀️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "sun, run, fun — all /ʌ/!", dialogueZh: 'sun、run、fun —— 都是 /ʌ/！', highlightWords: ['sun', 'run'], sceneEmojis: ['☀️', '🏃', '🎉'], animation: 'bounce' },
    { image: '🐛', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "bug, hug, jug — /ʌ/ too!", dialogueZh: 'bug、hug、jug —— 也是 /ʌ/！', highlightWords: ['bug', 'hug', 'jug'], sceneEmojis: ['🐛', '🤗', '🫗'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "All five short vowels — done! Wow!", dialogueZh: '五個短母音 —— 全部完成！哇！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'cup', zh: '杯子', image: '🥤', phonics: 'u /ʌ/', kk: '[kʌp]', phonicsSound: '/ʌ/', exampleSentence: 'a red cup', exampleZh: '一個紅杯子' },
    { en: 'bus', zh: '公車', image: '🚌', phonics: 'u /ʌ/', kk: '[bʌs]', phonicsSound: '/ʌ/', exampleSentence: 'a big bus', exampleZh: '一台大公車' },
    { en: 'sun', zh: '太陽', image: '☀️', phonics: 'u /ʌ/', kk: '[sʌn]', phonicsSound: '/ʌ/', exampleSentence: 'The sun is up.', exampleZh: '太陽升起。' },
    { en: 'bug', zh: '蟲', image: '🐛', phonics: 'u /ʌ/', kk: '[bʌɡ]', phonicsSound: '/ʌ/', exampleSentence: 'a small bug', exampleZh: '一隻小蟲' },
    { en: 'run', zh: '跑', image: '🏃', phonics: 'u /ʌ/', kk: '[rʌn]', phonicsSound: '/ʌ/', exampleSentence: 'I can run.', exampleZh: '我會跑。' },
    { en: 'nut', zh: '堅果', image: '🥜', phonics: 'u /ʌ/', kk: '[nʌt]', phonicsSound: '/ʌ/', exampleSentence: 'a small nut', exampleZh: '一顆小堅果' },
    { en: 'cut', zh: '切', image: '✂️', phonics: 'u /ʌ/', kk: '[kʌt]', phonicsSound: '/ʌ/', exampleSentence: 'Cut the cake.', exampleZh: '切蛋糕。' },
    { en: 'mud', zh: '泥巴', image: '🟤', phonics: 'u /ʌ/', kk: '[mʌd]', phonicsSound: '/ʌ/', exampleSentence: 'in the mud', exampleZh: '在泥巴裡' },
    { en: 'hug', zh: '擁抱', image: '🤗', phonics: 'u /ʌ/', kk: '[hʌɡ]', phonicsSound: '/ʌ/', exampleSentence: 'a big hug', exampleZh: '一個大擁抱' },
    { en: 'jug', zh: '水壺', image: '🫗', phonics: 'u /ʌ/', kk: '[dʒʌɡ]', phonicsSound: '/ʌ/', exampleSentence: 'a big jug', exampleZh: '一個大水壺' },
  ],
  sentences: [
    { en: 'The bug is in the cup.', zh: '蟲在杯子裡。' }, { en: 'I run in the sun.', zh: '我在太陽下跑。' }, { en: 'Can you run?', zh: '你會跑嗎？' }, { en: 'Yes, I can run.', zh: '是的，我會跑。' }, { en: 'Give me a hug!', zh: '給我一個擁抱！' }, { en: 'Is it a bug?', zh: '這是一隻蟲嗎？' },
  ],
  phonicsLetters: ['u /ʌ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 /ʌ/ 的音？', options: ['cup', 'cat', 'bed', 'pig'], answer: 'cup', image: '🔤' },
    { type: 'match', question: '☀️ 太陽是哪個字？', options: ['sun', 'run', 'bug', 'cup'], answer: 'sun' },
    { type: 'spell', question: '拼拼看：b _ g（蟲）', answer: 'bug', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🥤', '🚌', '🐛', '🥜'], answer: '🐛', image: '🎧' },
    { type: 'spell', question: '拼拼看：s _ n（太陽）', answer: 'sun', image: '✍️' },
    { type: 'spell', question: '拼拼看：r _ n（跑）', answer: 'run', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['cut-✂️', 'hug-🤗', 'jug-🫗', 'nut-🥜'], answer: 'cut-✂️' },
    { type: 'fill-blank', question: 'I can ___ fast.（跑）', options: ['run', 'cup', 'bug', 'nut'], answer: 'run' },
    { type: 'speak', question: '跟著念：Cup, sun, bug!', answer: 'Cup', image: '🗣' },
  ],
  talkTimePrompts: ["Say three words with /ʌ/.", "Can you run fast?", "Give me a hug!", "You know all five short vowels!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "cup" 杯子？', options: ['🥤', '🚌', '🥜', '🐛'], answer: '🥤' },
    { type: 'spell', question: '拼拼看：n _ t（堅果）', answer: 'nut', image: '✍️' },
    { type: 'match', question: '🤗 擁抱是哪個字？', options: ['hug', 'jug', 'bug', 'mud'], answer: 'hug' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A bug is in my cup!", lineZh: '一隻蟲在我杯子裡！' },
    { speaker: 'Ruby', line: "bug, cup — /ʌ/! Run!", lineZh: 'bug、cup —— /ʌ/！快跑！' },
    { speaker: 'Benny', line: "The sun is fun. Let's run!", lineZh: '太陽很棒。我們去跑步！' },
    { speaker: 'Ruby', line: "sun, fun, run — /ʌ/! Yay!", lineZh: 'sun、fun、run —— /ʌ/！耶！' },
  ],
};

const L2_M8: Mission = {
  id: 8, slug: 'l2-m8-sh-ch', level: 2, title: '子音組合 sh · ch', titleEn: 'sh & ch', theme: '聲音島・海螺灣', themeEmoji: '🐚',
  focus: '兩個子音一個音：sh /ʃ/、ch /tʃ/',
  story: [
    { image: '🚢', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "s and h together make /ʃ/! Sh! Be quiet!", dialogueZh: 's 和 h 一起發 /ʃ/！噓！安靜！', highlightWords: ['sh'], sceneEmojis: ['🚢', '🤫', '✨'], animation: 'wave' },
    { image: '🐟', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "ship, fish, shop — /ʃ/!", dialogueZh: 'ship、fish、shop —— /ʃ/！', highlightWords: ['ship', 'fish', 'shop'], sceneEmojis: ['🚢', '🐟', '🏪'], animation: 'bounce' },
    { image: '🪑', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "c and h make /tʃ/! chip, chair, lunch!", dialogueZh: 'c 和 h 發 /tʃ/！chip、chair、lunch！', highlightWords: ['chip', 'chair', 'lunch'], sceneEmojis: ['🍟', '🪑', '🍱'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "sh and ch — two letters, one sound! Cool!", dialogueZh: 'sh 和 ch —— 兩個字母一個音！很酷！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'ship', zh: '船', image: '🚢', phonics: 'sh /ʃ/', kk: '[ʃɪp]', phonicsSound: '/ʃ/', exampleSentence: 'a big ship', exampleZh: '一艘大船' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: 'sh /ʃ/', kk: '[fɪʃ]', phonicsSound: '/ʃ/', exampleSentence: 'a small fish', exampleZh: '一條小魚' },
    { en: 'shop', zh: '商店', image: '🏪', phonics: 'sh /ʃ/', kk: '[ʃɑp]', phonicsSound: '/ʃ/', exampleSentence: 'a toy shop', exampleZh: '一間玩具店' },
    { en: 'shell', zh: '貝殼', image: '🐚', phonics: 'sh /ʃ/', kk: '[ʃɛl]', phonicsSound: '/ʃ/', exampleSentence: 'a sea shell', exampleZh: '一個海貝殼' },
    { en: 'brush', zh: '刷子', image: '🪥', phonics: 'sh /ʃ/', kk: '[brʌʃ]', phonicsSound: '/ʃ/', exampleSentence: 'a tooth brush', exampleZh: '一支牙刷' },
    { en: 'chip', zh: '薯片', image: '🍟', phonics: 'ch /tʃ/', kk: '[tʃɪp]', phonicsSound: '/tʃ/', exampleSentence: 'a hot chip', exampleZh: '一片熱薯片' },
    { en: 'chin', zh: '下巴', image: '👦', phonics: 'ch /tʃ/', kk: '[tʃɪn]', phonicsSound: '/tʃ/', exampleSentence: 'my chin', exampleZh: '我的下巴' },
    { en: 'chair', zh: '椅子', image: '🪑', phonics: 'ch /tʃ/', kk: '[tʃɛr]', phonicsSound: '/tʃ/', exampleSentence: 'sit on the chair', exampleZh: '坐在椅子上' },
    { en: 'lunch', zh: '午餐', image: '🍱', phonics: 'ch /tʃ/', kk: '[lʌntʃ]', phonicsSound: '/tʃ/', exampleSentence: 'eat lunch', exampleZh: '吃午餐' },
    { en: 'cheese', zh: '起司', image: '🧀', phonics: 'ch /tʃ/', kk: '[tʃiz]', phonicsSound: '/tʃ/', exampleSentence: 'I like cheese.', exampleZh: '我喜歡起司。' },
  ],
  sentences: [
    { en: 'The fish is on the ship.', zh: '魚在船上。' }, { en: 'I eat chips for lunch.', zh: '我午餐吃薯片。' }, { en: 'Is it a ship?', zh: '這是一艘船嗎？' }, { en: 'Yes, it is a ship.', zh: '是的，這是一艘船。' }, { en: 'Do you like cheese?', zh: '你喜歡起司嗎？' }, { en: 'Sit on the chair.', zh: '坐在椅子上。' },
  ],
  phonicsLetters: ['sh /ʃ/', 'ch /tʃ/'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 /ʃ/（sh）的音？', options: ['ship', 'chip', 'cat', 'sun'], answer: 'ship', image: '🚢' },
    { type: 'listen-pick', question: '哪個字有 /tʃ/（ch）的音？', options: ['chip', 'ship', 'fish', 'shop'], answer: 'chip', image: '🍟' },
    { type: 'match', question: '🐚 貝殼是哪個字？', options: ['shell', 'ship', 'shop', 'fish'], answer: 'shell' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🚢', '🐟', '🍟', '🪑'], answer: '🐟', image: '🎧' },
    { type: 'spell', question: '拼拼看：sh _ p（船）', answer: 'ship', image: '✍️' },
    { type: 'spell', question: '拼拼看：ch _ p（薯片）', answer: 'chip', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['fish-🐟', 'chair-🪑', 'cheese-🧀', 'shop-🏪'], answer: 'fish-🐟' },
    { type: 'fill-blank', question: 'I eat ___ for lunch.（薯片）', options: ['chips', 'ship', 'shell', 'chin'], answer: 'chips' },
    { type: 'speak', question: '跟著念：Ship, fish, chip!', answer: 'Ship', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with sh.", "Say a word with ch.", "What do you eat for lunch?", "Great job with sh and ch!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "cheese" 起司？', options: ['🧀', '🐟', '🍟', '🐚'], answer: '🧀' },
    { type: 'spell', question: '拼拼看：fi _ h（魚）', answer: 'fish', image: '✍️' },
    { type: 'match', question: '🪑 椅子是哪個字？', options: ['chair', 'chip', 'chin', 'ship'], answer: 'chair' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "Sh! Look, a fish on the ship!", lineZh: '噓！看，船上有一條魚！' },
    { speaker: 'Coco', line: "ship, fish — sh sound! /ʃ/", lineZh: 'ship、fish —— sh 的音！/ʃ/' },
    { speaker: 'Polly', line: "Let's eat chips for lunch!", lineZh: '我們午餐吃薯片！' },
    { speaker: 'Coco', line: "chip, lunch — ch sound! /tʃ/", lineZh: 'chip、lunch —— ch 的音！/tʃ/' },
  ],
};

const L2_M9: Mission = {
  id: 9, slug: 'l2-m9-th-ck-ng', level: 2, title: '子音組合 th · ck · ng', titleEn: 'th ck ng', theme: '聲音島・回音谷', themeEmoji: '👅',
  focus: 'th /ð·θ/、ck /k/、ng /ŋ/',
  story: [
    { image: '👅', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "t and h make /ð/! Put your tongue out: this!", dialogueZh: 't 和 h 發 /ð/！把舌頭伸出來：this！', highlightWords: ['th', 'this'], sceneEmojis: ['👅', '🔤', '✨'], animation: 'wave' },
    { image: '🦆', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "ck says /k/! duck, sock, kick!", dialogueZh: 'ck 發 /k/！duck、sock、kick！', highlightWords: ['duck', 'sock', 'kick'], sceneEmojis: ['🦆', '🧦', '⚽'], animation: 'bounce' },
    { image: '💍', character: '🦜', characterKey: 'polly', characterAction: 'sing', characterName: 'Polly', dialogue: "ng says /ŋ/! ring, king, sing!", dialogueZh: 'ng 發 /ŋ/！ring、king、sing！', highlightWords: ['ring', 'king', 'sing'], sceneEmojis: ['💍', '👑', '🎵'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "th, ck, ng — you did it! Super!", dialogueZh: 'th、ck、ng —— 你做到了！超厲害！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'this', zh: '這個', image: '👉', phonics: 'th /ð/', kk: '[ðɪs]', phonicsSound: '/ð/', exampleSentence: 'this cat', exampleZh: '這隻貓' },
    { en: 'that', zh: '那個', image: '👈', phonics: 'th /ð/', kk: '[ðæt]', phonicsSound: '/ð/', exampleSentence: 'that dog', exampleZh: '那隻狗' },
    { en: 'thin', zh: '薄的', image: '📏', phonics: 'th /θ/', kk: '[θɪn]', phonicsSound: '/θ/', exampleSentence: 'a thin book', exampleZh: '一本薄書' },
    { en: 'duck', zh: '鴨子', image: '🦆', phonics: 'ck /k/', kk: '[dʌk]', phonicsSound: '/k/', exampleSentence: 'a yellow duck', exampleZh: '一隻黃鴨' },
    { en: 'sock', zh: '襪子', image: '🧦', phonics: 'ck /k/', kk: '[sɑk]', phonicsSound: '/k/', exampleSentence: 'a red sock', exampleZh: '一隻紅襪子' },
    { en: 'kick', zh: '踢', image: '⚽', phonics: 'ck /k/', kk: '[kɪk]', phonicsSound: '/k/', exampleSentence: 'kick the ball', exampleZh: '踢球' },
    { en: 'ring', zh: '戒指', image: '💍', phonics: 'ng /ŋ/', kk: '[rɪŋ]', phonicsSound: '/ŋ/', exampleSentence: 'a gold ring', exampleZh: '一枚金戒指' },
    { en: 'king', zh: '國王', image: '👑', phonics: 'ng /ŋ/', kk: '[kɪŋ]', phonicsSound: '/ŋ/', exampleSentence: 'the king', exampleZh: '國王' },
    { en: 'sing', zh: '唱歌', image: '🎵', phonics: 'ng /ŋ/', kk: '[sɪŋ]', phonicsSound: '/ŋ/', exampleSentence: 'I can sing.', exampleZh: '我會唱歌。' },
    { en: 'long', zh: '長的', image: '📏', phonics: 'ng /ŋ/', kk: '[lɔŋ]', phonicsSound: '/ŋ/', exampleSentence: 'a long snake', exampleZh: '一條長蛇' },
  ],
  sentences: [
    { en: 'The king has a ring.', zh: '國王有一枚戒指。' }, { en: 'The duck can sing.', zh: '鴨子會唱歌。' }, { en: 'Is this a duck?', zh: '這是一隻鴨子嗎？' }, { en: 'Yes, this is a duck.', zh: '是的，這是一隻鴨子。' }, { en: 'Can you sing?', zh: '你會唱歌嗎？' }, { en: 'Kick the ball!', zh: '踢球！' },
  ],
  phonicsLetters: ['th', 'ck', 'ng'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 ck /k/ 的音？', options: ['duck', 'this', 'ring', 'sing'], answer: 'duck', image: '🦆' },
    { type: 'listen-pick', question: '哪個字有 ng /ŋ/ 的音？', options: ['ring', 'duck', 'this', 'sock'], answer: 'ring', image: '💍' },
    { type: 'match', question: '👑 國王是哪個字？', options: ['king', 'ring', 'sing', 'long'], answer: 'king' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🦆', '🧦', '💍', '👑'], answer: '🧦', image: '🎧' },
    { type: 'spell', question: '拼拼看：du _ _（鴨子）', answer: 'duck', image: '✍️' },
    { type: 'spell', question: '拼拼看：ri _ _（戒指）', answer: 'ring', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['kick-⚽', 'sing-🎵', 'sock-🧦', 'king-👑'], answer: 'kick-⚽' },
    { type: 'fill-blank', question: 'The ___ has a ring.（國王）', options: ['king', 'duck', 'sock', 'sing'], answer: 'king' },
    { type: 'speak', question: '跟著念：Duck, ring, sing!', answer: 'Duck', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with ck.", "Say a word with ng.", "Can you sing a song?", "Great job with th, ck, ng!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "duck" 鴨子？', options: ['🦆', '💍', '🧦', '👑'], answer: '🦆' },
    { type: 'spell', question: '拼拼看：si _ _（唱歌）', answer: 'sing', image: '✍️' },
    { type: 'match', question: '💍 戒指是哪個字？', options: ['ring', 'king', 'sing', 'long'], answer: 'ring' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "The king has a gold ring!", lineZh: '國王有一枚金戒指！' },
    { speaker: 'Polly', line: "king, ring, sing — ng sound! /ŋ/", lineZh: 'king、ring、sing —— ng 的音！/ŋ/' },
    { speaker: 'Finn', line: "Look at that duck in a sock!", lineZh: '看那隻穿襪子的鴨子！' },
    { speaker: 'Polly', line: "duck, sock — ck sound! /k/", lineZh: 'duck、sock —— ck 的音！/k/' },
  ],
};

const L2_M10: Mission = {
  id: 10, slug: 'l2-m10-review-short', level: 2, title: '拼讀複習② 短母音＋子音組合', titleEn: 'Review Short Vowels', theme: '聲音島・回音音樂會', themeEmoji: '🎪',
  focus: '複習 5 個短母音 + sh/ch/th/ck/ng',
  story: [
    { image: '🎪', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Big review! Short vowels and digraphs!", dialogueZh: '大複習！短母音和子音組合！', highlightWords: [], sceneEmojis: ['🎪', '🔤', '🎉'], animation: 'wave' },
    { image: '🎵', character: '🦜', characterKey: 'polly', characterAction: 'sing', characterName: 'Polly', dialogue: "a-e-i-o-u, sh-ch-th! Sing along!", dialogueZh: 'a-e-i-o-u，sh-ch-th！一起唱！', highlightWords: [], sceneEmojis: ['🎵', '🎶', '⭐'], animation: 'tada' },
    { image: '🏆', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can read so many words now! Amazing!", dialogueZh: '你現在會讀好多字了！太棒了！', highlightWords: [], sceneEmojis: ['🏆', '🎉', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'cat', zh: '貓', image: '🐱', phonics: 'a /æ/', kk: '[kæt]', phonicsSound: '/æ/', exampleSentence: 'a cat', exampleZh: '一隻貓' },
    { en: 'bed', zh: '床', image: '🛏️', phonics: 'e /ɛ/', kk: '[bɛd]', phonicsSound: '/ɛ/', exampleSentence: 'a bed', exampleZh: '一張床' },
    { en: 'pig', zh: '豬', image: '🐷', phonics: 'i /ɪ/', kk: '[pɪɡ]', phonicsSound: '/ɪ/', exampleSentence: 'a pig', exampleZh: '一隻豬' },
    { en: 'box', zh: '箱子', image: '📦', phonics: 'o /ɑ/', kk: '[bɑks]', phonicsSound: '/ɑ/', exampleSentence: 'a box', exampleZh: '一個箱子' },
    { en: 'cup', zh: '杯子', image: '🥤', phonics: 'u /ʌ/', kk: '[kʌp]', phonicsSound: '/ʌ/', exampleSentence: 'a cup', exampleZh: '一個杯子' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: 'sh /ʃ/', kk: '[fɪʃ]', phonicsSound: '/ʃ/', exampleSentence: 'a fish', exampleZh: '一條魚' },
    { en: 'chip', zh: '薯片', image: '🍟', phonics: 'ch /tʃ/', kk: '[tʃɪp]', phonicsSound: '/tʃ/', exampleSentence: 'a chip', exampleZh: '一片薯片' },
    { en: 'duck', zh: '鴨子', image: '🦆', phonics: 'ck /k/', kk: '[dʌk]', phonicsSound: '/k/', exampleSentence: 'a duck', exampleZh: '一隻鴨子' },
    { en: 'ring', zh: '戒指', image: '💍', phonics: 'ng /ŋ/', kk: '[rɪŋ]', phonicsSound: '/ŋ/', exampleSentence: 'a ring', exampleZh: '一枚戒指' },
    { en: 'sun', zh: '太陽', image: '☀️', phonics: 'u /ʌ/', kk: '[sʌn]', phonicsSound: '/ʌ/', exampleSentence: 'the sun', exampleZh: '太陽' },
  ],
  sentences: [
    { en: 'A cat, a pig, a duck.', zh: '一隻貓、一隻豬、一隻鴨。' }, { en: 'The fish is in the box.', zh: '魚在箱子裡。' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'It is a duck.', zh: '這是一隻鴨子。' }, { en: 'Is the cup on the bed?', zh: '杯子在床上嗎？' }, { en: 'Yes, it is.', zh: '是的。' },
  ],
  phonicsLetters: ['a', 'e', 'i', 'o', 'u', 'sh', 'ch', 'th', 'ck', 'ng'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '"cup" 是哪個母音？', options: ['u', 'a', 'e', 'i'], answer: 'u', image: '🥤' },
    { type: 'listen-pick', question: '"box" 是哪個母音？', options: ['o', 'a', 'u', 'e'], answer: 'o', image: '📦' },
    { type: 'listen-pick', question: '"fish" 有哪個子音組合？', options: ['sh', 'ch', 'th', 'ck'], answer: 'sh', image: '🐟' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐱', '🐷', '📦', '🥤'], answer: '📦', image: '🎧' },
    { type: 'spell', question: '拼拼看：c _ p（杯子）', answer: 'cup', image: '✍️' },
    { type: 'spell', question: '拼拼看：du _ _（鴨子）', answer: 'duck', image: '✍️' },
    { type: 'match', question: '配對：字配母音/組合', options: ['cat-a', 'bed-e', 'pig-i', 'box-o'], answer: 'cat-a' },
    { type: 'fill-blank', question: 'Which has sh? ___', options: ['fish', 'chip', 'duck', 'ring'], answer: 'fish' },
    { type: 'speak', question: '跟著念：Cat, bed, pig, box, cup!', answer: 'Cat', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with each short vowel!", "Say a word with sh.", "Can you read cat, pig, cup?", "You are a reading star!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個字有 /ɑ/？', options: ['box', 'cat', 'bed', 'pig'], answer: 'box' },
    { type: 'match', question: '💍 戒指有哪個子音組合？', options: ['ng', 'sh', 'ch', 'ck'], answer: 'ng' },
    { type: 'spell', question: '拼拼看：fi _ h（魚）', answer: 'fish', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's read together: cat, bed, pig, box, cup!", lineZh: '一起讀：cat、bed、pig、box、cup！' },
    { speaker: 'Coco', line: "Five short vowels! /æ/ /ɛ/ /ɪ/ /ɑ/ /ʌ/", lineZh: '五個短母音！/æ/ /ɛ/ /ɪ/ /ɑ/ /ʌ/' },
    { speaker: 'Polly', line: "And fish, chip, duck, ring!", lineZh: '還有 fish、chip、duck、ring！' },
    { speaker: 'Finn', line: "You can read now! Amazing!", lineZh: '你會讀了！太棒了！' },
  ],
};

const L2_M11: Mission = {
  id: 11, slug: 'l2-m11-long-a', level: 2, title: '長母音 a', titleEn: 'Long a', theme: '聲音島・魔法 e 城堡', themeEmoji: '✨',
  focus: '長母音 a /e/：a_e（magic e）、ai、ay',
  story: [
    { image: '🎂', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Magic e makes a say its name! cap → cape!", dialogueZh: '魔法 e 讓 a 唸自己的名字！cap → cape！', highlightWords: ['a_e'], sceneEmojis: ['✨', '🔤', '🎂'], animation: 'wave' },
    { image: '🌧️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "cake, name, rain — long a /e/!", dialogueZh: 'cake、name、rain —— 長母音 a /e/！', highlightWords: ['cake', 'name', 'rain'], sceneEmojis: ['🎂', '🏷️', '🌧️'], animation: 'bounce' },
    { image: '🌈', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "day, play, say — ay is /e/ too!", dialogueZh: 'day、play、say —— ay 也是 /e/！', highlightWords: ['day', 'play', 'say'], sceneEmojis: ['☀️', '🎮', '💬'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Long a — three ways! You got it!", dialogueZh: '長母音 a —— 三種拼法！你會了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '✨'], animation: 'bounce' },
  ],
  words: [
    { en: 'cake', zh: '蛋糕', image: '🎂', phonics: 'a_e /e/', kk: '[kek]', phonicsSound: '/e/', exampleSentence: 'a big cake', exampleZh: '一個大蛋糕' },
    { en: 'name', zh: '名字', image: '🏷️', phonics: 'a_e /e/', kk: '[nem]', phonicsSound: '/e/', exampleSentence: 'my name', exampleZh: '我的名字' },
    { en: 'game', zh: '遊戲', image: '🎮', phonics: 'a_e /e/', kk: '[ɡem]', phonicsSound: '/e/', exampleSentence: 'play a game', exampleZh: '玩遊戲' },
    { en: 'gate', zh: '大門', image: '🚪', phonics: 'a_e /e/', kk: '[ɡet]', phonicsSound: '/e/', exampleSentence: 'open the gate', exampleZh: '打開大門' },
    { en: 'rain', zh: '雨', image: '🌧️', phonics: 'ai /e/', kk: '[ren]', phonicsSound: '/e/', exampleSentence: 'in the rain', exampleZh: '在雨中' },
    { en: 'train', zh: '火車', image: '🚂', phonics: 'ai /e/', kk: '[tren]', phonicsSound: '/e/', exampleSentence: 'a fast train', exampleZh: '一輛快火車' },
    { en: 'day', zh: '天', image: '☀️', phonics: 'ay /e/', kk: '[de]', phonicsSound: '/e/', exampleSentence: 'a sunny day', exampleZh: '晴天' },
    { en: 'play', zh: '玩', image: '⚽', phonics: 'ay /e/', kk: '[ple]', phonicsSound: '/e/', exampleSentence: 'Let\'s play!', exampleZh: '我們來玩！' },
    { en: 'say', zh: '說', image: '💬', phonics: 'ay /e/', kk: '[se]', phonicsSound: '/e/', exampleSentence: 'Say hello.', exampleZh: '說哈囉。' },
    { en: 'lake', zh: '湖', image: '🏞️', phonics: 'a_e /e/', kk: '[lek]', phonicsSound: '/e/', exampleSentence: 'a big lake', exampleZh: '一個大湖' },
  ],
  sentences: [
    { en: 'We play a game in the rain.', zh: '我們在雨中玩遊戲。' }, { en: 'The train is by the lake.', zh: '火車在湖邊。' }, { en: 'What is your name?', zh: '你叫什麼名字？' }, { en: 'My name is Sam.', zh: '我的名字是 Sam。' }, { en: 'Can you say your name?', zh: '你能說你的名字嗎？' }, { en: 'Let\'s eat cake!', zh: '我們來吃蛋糕！' },
  ],
  phonicsLetters: ['a_e', 'ai', 'ay'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有長母音 a /e/？', options: ['cake', 'cat', 'cup', 'box'], answer: 'cake', image: '🎂' },
    { type: 'match', question: '🚂 火車是哪個字？', options: ['train', 'rain', 'play', 'game'], answer: 'train' },
    { type: 'spell', question: '拼拼看：c _ ke（蛋糕）', answer: 'cake', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🎂', '🌧️', '🚂', '🎮'], answer: '🌧️', image: '🎧' },
    { type: 'spell', question: '拼拼看：r _ in（雨）', answer: 'rain', image: '✍️' },
    { type: 'spell', question: '拼拼看：pl _ y（玩）', answer: 'play', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['gate-🚪', 'day-☀️', 'lake-🏞️', 'name-🏷️'], answer: 'gate-🚪' },
    { type: 'fill-blank', question: 'Let\'s ___ a game.（玩）', options: ['play', 'rain', 'say', 'cake'], answer: 'play' },
    { type: 'speak', question: '跟著念：Cake, rain, day!', answer: 'Cake', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with long a.", "What is your name?", "Do you like to play games?", "Great job with long a!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "cake" 蛋糕？', options: ['🎂', '🚂', '🌧️', '🚪'], answer: '🎂' },
    { type: 'spell', question: '拼拼看：d _ y（天）', answer: 'day', image: '✍️' },
    { type: 'match', question: '⚽ 玩是哪個字？', options: ['play', 'say', 'day', 'rain'], answer: 'play' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "It's a rainy day. Let's play a game!", lineZh: '今天下雨。我們來玩遊戲！' },
    { speaker: 'Polly', line: "rain, day, play — long a /e/!", lineZh: 'rain、day、play —— 長母音 a /e/！' },
    { speaker: 'Coco', line: "And eat cake by the lake!", lineZh: '還有在湖邊吃蛋糕！' },
    { speaker: 'Polly', line: "cake, lake — magic e! Yum!", lineZh: 'cake、lake —— 魔法 e！好吃！' },
  ],
};

const L2_M12: Mission = {
  id: 12, slug: 'l2-m12-long-e', level: 2, title: '長母音 e', titleEn: 'Long e', theme: '聲音島・綠樹林', themeEmoji: '🌳',
  focus: '長母音 e /i/：ee、ea、e_e',
  story: [
    { image: '🌳', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Two e's say /i/! see, tree!", dialogueZh: '兩個 e 發 /i/！see、tree！', highlightWords: ['ee'], sceneEmojis: ['🌳', '🔤', '✨'], animation: 'wave' },
    { image: '🐝', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "bee, see, green — ee is /i/!", dialogueZh: 'bee、see、green —— ee 是 /i/！', highlightWords: ['bee', 'see', 'green'], sceneEmojis: ['🐝', '👀', '🟢'], animation: 'bounce' },
    { image: '🍵', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "sea, tea, eat — ea is /i/ too!", dialogueZh: 'sea、tea、eat —— ea 也是 /i/！', highlightWords: ['sea', 'tea', 'eat'], sceneEmojis: ['🌊', '🍵', '🍽️'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Long e — done! You read like a pro!", dialogueZh: '長母音 e —— 完成！你讀得像高手！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'tree', zh: '樹', image: '🌳', phonics: 'ee /i/', kk: '[tri]', phonicsSound: '/i/', exampleSentence: 'a tall tree', exampleZh: '一棵高樹' },
    { en: 'bee', zh: '蜜蜂', image: '🐝', phonics: 'ee /i/', kk: '[bi]', phonicsSound: '/i/', exampleSentence: 'a busy bee', exampleZh: '一隻忙碌的蜜蜂' },
    { en: 'see', zh: '看見', image: '👀', phonics: 'ee /i/', kk: '[si]', phonicsSound: '/i/', exampleSentence: 'I can see.', exampleZh: '我看得見。' },
    { en: 'green', zh: '綠色', image: '🟢', phonics: 'ee /i/', kk: '[ɡrin]', phonicsSound: '/i/', exampleSentence: 'a green tree', exampleZh: '一棵綠樹' },
    { en: 'three', zh: '三', image: '3️⃣', phonics: 'ee /i/', kk: '[θri]', phonicsSound: '/i/', exampleSentence: 'I have three.', exampleZh: '我有三個。' },
    { en: 'sea', zh: '海', image: '🌊', phonics: 'ea /i/', kk: '[si]', phonicsSound: '/i/', exampleSentence: 'in the sea', exampleZh: '在海裡' },
    { en: 'tea', zh: '茶', image: '🍵', phonics: 'ea /i/', kk: '[ti]', phonicsSound: '/i/', exampleSentence: 'hot tea', exampleZh: '熱茶' },
    { en: 'eat', zh: '吃', image: '🍽️', phonics: 'ea /i/', kk: '[it]', phonicsSound: '/i/', exampleSentence: 'Let\'s eat.', exampleZh: '我們來吃。' },
    { en: 'meat', zh: '肉', image: '🍖', phonics: 'ea /i/', kk: '[mit]', phonicsSound: '/i/', exampleSentence: 'I eat meat.', exampleZh: '我吃肉。' },
    { en: 'read', zh: '閱讀', image: '📖', phonics: 'ea /i/', kk: '[rid]', phonicsSound: '/i/', exampleSentence: 'read a book', exampleZh: '讀一本書' },
  ],
  sentences: [
    { en: 'I see a bee in the tree.', zh: '我看到樹上有一隻蜜蜂。' }, { en: 'Let\'s eat meat and drink tea.', zh: '我們來吃肉、喝茶。' }, { en: 'Can you see the sea?', zh: '你看得到海嗎？' }, { en: 'Yes, I can see it.', zh: '是的，我看得到。' }, { en: 'How many trees?', zh: '有幾棵樹？' }, { en: 'I see three trees.', zh: '我看到三棵樹。' },
  ],
  phonicsLetters: ['ee', 'ea'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有長母音 e /i/？', options: ['tree', 'cat', 'box', 'cup'], answer: 'tree', image: '🌳' },
    { type: 'match', question: '🐝 蜜蜂是哪個字？', options: ['bee', 'see', 'tea', 'sea'], answer: 'bee' },
    { type: 'spell', question: '拼拼看：s _ _（看見）', answer: 'see', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🌳', '🐝', '🌊', '🍵'], answer: '🐝', image: '🎧' },
    { type: 'spell', question: '拼拼看：tr _ _（樹）', answer: 'tree', image: '✍️' },
    { type: 'spell', question: '拼拼看：e _ t（吃）', answer: 'eat', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['sea-🌊', 'tea-🍵', 'meat-🍖', 'read-📖'], answer: 'sea-🌊' },
    { type: 'fill-blank', question: 'I ___ a book.（閱讀）', options: ['read', 'eat', 'see', 'tea'], answer: 'read' },
    { type: 'speak', question: '跟著念：Tree, bee, sea!', answer: 'Tree', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with long e.", "Can you see a tree?", "Do you like tea?", "Great job with long e!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "tree" 樹？', options: ['🌳', '🐝', '🌊', '🍖'], answer: '🌳' },
    { type: 'spell', question: '拼拼看：s _ _（海）', answer: 'sea', image: '✍️' },
    { type: 'match', question: '🍖 肉是哪個字？', options: ['meat', 'eat', 'tea', 'read'], answer: 'meat' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "I see a bee in the green tree!", lineZh: '我看到綠樹上有一隻蜜蜂！' },
    { speaker: 'Coco', line: "bee, see, tree, green — long e /i/!", lineZh: 'bee、see、tree、green —— 長母音 e /i/！' },
    { speaker: 'Benny', line: "Let's eat meat by the sea.", lineZh: '我們去海邊吃肉。' },
    { speaker: 'Coco', line: "eat, meat, sea — ea is /i/!", lineZh: 'eat、meat、sea —— ea 是 /i/！' },
  ],
};

const L2_M13: Mission = {
  id: 13, slug: 'l2-m13-long-i', level: 2, title: '長母音 i', titleEn: 'Long i', theme: '聲音島・星空高塔', themeEmoji: '🌙',
  focus: '長母音 i /aɪ/：i_e、igh、y',
  story: [
    { image: '🚲', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Magic e again! bike, kite — long i /aɪ/!", dialogueZh: '又是魔法 e！bike、kite —— 長母音 i /aɪ/！', highlightWords: ['i_e'], sceneEmojis: ['🚲', '🪁', '✨'], animation: 'wave' },
    { image: '🌙', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "night, light, high — igh is /aɪ/!", dialogueZh: 'night、light、high —— igh 是 /aɪ/！', highlightWords: ['night', 'light', 'high'], sceneEmojis: ['🌙', '💡', '⬆️'], animation: 'bounce' },
    { image: '☁️', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "sky, fly, my — y is /aɪ/ too!", dialogueZh: 'sky、fly、my —— y 也是 /aɪ/！', highlightWords: ['sky', 'fly', 'my'], sceneEmojis: ['☁️', '🦋', '🙋'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Long i — you fly high! Amazing!", dialogueZh: '長母音 i —— 你飛得高！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '✨'], animation: 'bounce' },
  ],
  words: [
    { en: 'bike', zh: '腳踏車', image: '🚲', phonics: 'i_e /aɪ/', kk: '[baɪk]', phonicsSound: '/aɪ/', exampleSentence: 'ride a bike', exampleZh: '騎腳踏車' },
    { en: 'kite', zh: '風箏', image: '🪁', phonics: 'i_e /aɪ/', kk: '[kaɪt]', phonicsSound: '/aɪ/', exampleSentence: 'fly a kite', exampleZh: '放風箏' },
    { en: 'nine', zh: '九', image: '9️⃣', phonics: 'i_e /aɪ/', kk: '[naɪn]', phonicsSound: '/aɪ/', exampleSentence: 'I am nine.', exampleZh: '我九歲。' },
    { en: 'five', zh: '五', image: '5️⃣', phonics: 'i_e /aɪ/', kk: '[faɪv]', phonicsSound: '/aɪ/', exampleSentence: 'give me five', exampleZh: '擊掌' },
    { en: 'night', zh: '夜晚', image: '🌙', phonics: 'igh /aɪ/', kk: '[naɪt]', phonicsSound: '/aɪ/', exampleSentence: 'good night', exampleZh: '晚安' },
    { en: 'light', zh: '燈光', image: '💡', phonics: 'igh /aɪ/', kk: '[laɪt]', phonicsSound: '/aɪ/', exampleSentence: 'turn on the light', exampleZh: '開燈' },
    { en: 'high', zh: '高的', image: '⬆️', phonics: 'igh /aɪ/', kk: '[haɪ]', phonicsSound: '/aɪ/', exampleSentence: 'so high', exampleZh: '好高' },
    { en: 'sky', zh: '天空', image: '☁️', phonics: 'y /aɪ/', kk: '[skaɪ]', phonicsSound: '/aɪ/', exampleSentence: 'in the sky', exampleZh: '在天空' },
    { en: 'fly', zh: '飛', image: '🦋', phonics: 'y /aɪ/', kk: '[flaɪ]', phonicsSound: '/aɪ/', exampleSentence: 'Birds fly.', exampleZh: '鳥會飛。' },
    { en: 'my', zh: '我的', image: '🙋', phonics: 'y /aɪ/', kk: '[maɪ]', phonicsSound: '/aɪ/', exampleSentence: 'my bike', exampleZh: '我的腳踏車' },
  ],
  sentences: [
    { en: 'My kite can fly high.', zh: '我的風箏能飛得高。' }, { en: 'I ride my bike at night.', zh: '我晚上騎腳踏車。' }, { en: 'Can you fly a kite?', zh: '你會放風箏嗎？' }, { en: 'Yes, I can.', zh: '是的，我會。' }, { en: 'How old are you?', zh: '你幾歲？' }, { en: 'I am nine.', zh: '我九歲。' },
  ],
  phonicsLetters: ['i_e', 'igh', 'y'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有長母音 i /aɪ/？', options: ['bike', 'big', 'box', 'bed'], answer: 'bike', image: '🚲' },
    { type: 'match', question: '🪁 風箏是哪個字？', options: ['kite', 'bike', 'night', 'sky'], answer: 'kite' },
    { type: 'spell', question: '拼拼看：sk _（天空）', answer: 'sky', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🚲', '🪁', '🌙', '☁️'], answer: '🪁', image: '🎧' },
    { type: 'spell', question: '拼拼看：b _ ke（腳踏車）', answer: 'bike', image: '✍️' },
    { type: 'spell', question: '拼拼看：n _ ght（夜晚）', answer: 'night', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['light-💡', 'fly-🦋', 'nine-9️⃣', 'high-⬆️'], answer: 'light-💡' },
    { type: 'fill-blank', question: 'Birds can ___.（飛）', options: ['fly', 'bike', 'night', 'my'], answer: 'fly' },
    { type: 'speak', question: '跟著念：Bike, night, sky!', answer: 'Bike', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with long i.", "Can you ride a bike?", "What do you see in the sky?", "Great job with long i!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "kite" 風箏？', options: ['🪁', '🚲', '🌙', '💡'], answer: '🪁' },
    { type: 'spell', question: '拼拼看：fl _（飛）', answer: 'fly', image: '✍️' },
    { type: 'match', question: '🌙 夜晚是哪個字？', options: ['night', 'light', 'high', 'sky'], answer: 'night' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "My kite can fly high in the sky!", lineZh: '我的風箏能在天空飛得高！' },
    { speaker: 'Polly', line: "kite, fly, high, sky — long i /aɪ/!", lineZh: 'kite、fly、high、sky —— 長母音 i /aɪ/！' },
    { speaker: 'Finn', line: "At night, I ride my bike.", lineZh: '晚上，我騎我的腳踏車。' },
    { speaker: 'Polly', line: "night, bike — long i again!", lineZh: 'night、bike —— 又是長母音 i！' },
  ],
};

const L2_M14: Mission = {
  id: 14, slug: 'l2-m14-long-o', level: 2, title: '長母音 o', titleEn: 'Long o', theme: '聲音島・雪船港', themeEmoji: '⛵',
  focus: '長母音 o /o/：o_e、oa、ow',
  story: [
    { image: '👃', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Magic e! nose, home — long o /o/!", dialogueZh: '魔法 e！nose、home —— 長母音 o /o/！', highlightWords: ['o_e'], sceneEmojis: ['👃', '🏠', '✨'], animation: 'wave' },
    { image: '⛵', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "boat, coat, road — oa is /o/!", dialogueZh: 'boat、coat、road —— oa 是 /o/！', highlightWords: ['boat', 'coat', 'road'], sceneEmojis: ['⛵', '🧥', '🛣️'], animation: 'bounce' },
    { image: '❄️', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "snow, slow, grow — ow is /o/ too!", dialogueZh: 'snow、slow、grow —— ow 也是 /o/！', highlightWords: ['snow', 'slow', 'grow'], sceneEmojis: ['❄️', '🐌', '🌱'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Long o — you grow smarter! Great!", dialogueZh: '長母音 o —— 你越來越聰明！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '✨'], animation: 'bounce' },
  ],
  words: [
    { en: 'nose', zh: '鼻子', image: '👃', phonics: 'o_e /o/', kk: '[noz]', phonicsSound: '/o/', exampleSentence: 'my nose', exampleZh: '我的鼻子' },
    { en: 'home', zh: '家', image: '🏠', phonics: 'o_e /o/', kk: '[hom]', phonicsSound: '/o/', exampleSentence: 'go home', exampleZh: '回家' },
    { en: 'rose', zh: '玫瑰', image: '🌹', phonics: 'o_e /o/', kk: '[roz]', phonicsSound: '/o/', exampleSentence: 'a red rose', exampleZh: '一朵紅玫瑰' },
    { en: 'bone', zh: '骨頭', image: '🦴', phonics: 'o_e /o/', kk: '[bon]', phonicsSound: '/o/', exampleSentence: 'a dog bone', exampleZh: '一根狗骨頭' },
    { en: 'boat', zh: '小船', image: '⛵', phonics: 'oa /o/', kk: '[bot]', phonicsSound: '/o/', exampleSentence: 'a small boat', exampleZh: '一艘小船' },
    { en: 'coat', zh: '外套', image: '🧥', phonics: 'oa /o/', kk: '[kot]', phonicsSound: '/o/', exampleSentence: 'a warm coat', exampleZh: '一件暖外套' },
    { en: 'road', zh: '馬路', image: '🛣️', phonics: 'oa /o/', kk: '[rod]', phonicsSound: '/o/', exampleSentence: 'a long road', exampleZh: '一條長路' },
    { en: 'snow', zh: '雪', image: '❄️', phonics: 'ow /o/', kk: '[sno]', phonicsSound: '/o/', exampleSentence: 'white snow', exampleZh: '白雪' },
    { en: 'slow', zh: '慢的', image: '🐌', phonics: 'ow /o/', kk: '[slo]', phonicsSound: '/o/', exampleSentence: 'a slow snail', exampleZh: '一隻慢蝸牛' },
    { en: 'grow', zh: '生長', image: '🌱', phonics: 'ow /o/', kk: '[ɡro]', phonicsSound: '/o/', exampleSentence: 'Plants grow.', exampleZh: '植物會長大。' },
  ],
  sentences: [
    { en: 'The boat is slow on the road.', zh: '船在路上慢慢走。' }, { en: 'I go home in the snow.', zh: '我在雪中回家。' }, { en: 'Is it a boat?', zh: '這是一艘船嗎？' }, { en: 'Yes, it is a boat.', zh: '是的，這是一艘船。' }, { en: 'Do you have a coat?', zh: '你有外套嗎？' }, { en: 'Roses grow slow.', zh: '玫瑰長得慢。' },
  ],
  phonicsLetters: ['o_e', 'oa', 'ow'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有長母音 o /o/？', options: ['nose', 'box', 'dog', 'hot'], answer: 'nose', image: '👃' },
    { type: 'match', question: '⛵ 小船是哪個字？', options: ['boat', 'coat', 'road', 'home'], answer: 'boat' },
    { type: 'spell', question: '拼拼看：sn _ _（雪）', answer: 'snow', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['👃', '⛵', '🧥', '❄️'], answer: '🧥', image: '🎧' },
    { type: 'spell', question: '拼拼看：h _ me（家）', answer: 'home', image: '✍️' },
    { type: 'spell', question: '拼拼看：b _ at（小船）', answer: 'boat', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['rose-🌹', 'bone-🦴', 'road-🛣️', 'grow-🌱'], answer: 'rose-🌹' },
    { type: 'fill-blank', question: 'It is cold. I need a ___.（外套）', options: ['coat', 'boat', 'road', 'nose'], answer: 'coat' },
    { type: 'speak', question: '跟著念：Nose, boat, snow!', answer: 'Nose', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with long o.", "Do you have a coat?", "Can you touch your nose?", "Great job with long o!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "boat" 小船？', options: ['⛵', '🧥', '🛣️', '🌹'], answer: '⛵' },
    { type: 'spell', question: '拼拼看：r _ ad（馬路）', answer: 'road', image: '✍️' },
    { type: 'match', question: '❄️ 雪是哪個字？', options: ['snow', 'slow', 'grow', 'home'], answer: 'snow' },
  ],
  videoScript: [
    { speaker: 'Ruby', line: "The boat is slow on the road home.", lineZh: '船在回家的路上慢慢走。' },
    { speaker: 'Coco', line: "boat, road, home, slow — long o /o/!", lineZh: 'boat、road、home、slow —— 長母音 o /o/！' },
    { speaker: 'Ruby', line: "It's cold! Wear your coat in the snow!", lineZh: '好冷！在雪中穿上外套！' },
    { speaker: 'Coco', line: "coat, snow — long o again!", lineZh: 'coat、snow —— 又是長母音 o！' },
  ],
};

const L2_M15: Mission = {
  id: 15, slug: 'l2-m15-review-long', level: 2, title: '拼讀複習③ 長母音', titleEn: 'Review Long Vowels', theme: '聲音島・長音音樂廳', themeEmoji: '🎼',
  focus: '複習長母音 a/e/i/o（magic e + 母音組合）',
  story: [
    { image: '🎼', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Review time! Long vowels say their names!", dialogueZh: '複習時間！長母音唸自己的名字！', highlightWords: [], sceneEmojis: ['🎼', '🔤', '🎉'], animation: 'wave' },
    { image: '🎵', character: '🦜', characterKey: 'polly', characterAction: 'sing', characterName: 'Polly', dialogue: "cake /e/, tree /i/, bike /aɪ/, boat /o/!", dialogueZh: 'cake /e/、tree /i/、bike /aɪ/、boat /o/！', highlightWords: [], sceneEmojis: ['🎵', '🎶', '⭐'], animation: 'tada' },
    { image: '🏆', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Short and long — you know both! Champion!", dialogueZh: '短音長音 —— 你都會了！冠軍！', highlightWords: [], sceneEmojis: ['🏆', '🎉', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'cake', zh: '蛋糕', image: '🎂', phonics: 'a_e /e/', kk: '[kek]', phonicsSound: '/e/', exampleSentence: 'cake', exampleZh: '蛋糕' },
    { en: 'rain', zh: '雨', image: '🌧️', phonics: 'ai /e/', kk: '[ren]', phonicsSound: '/e/', exampleSentence: 'rain', exampleZh: '雨' },
    { en: 'tree', zh: '樹', image: '🌳', phonics: 'ee /i/', kk: '[tri]', phonicsSound: '/i/', exampleSentence: 'tree', exampleZh: '樹' },
    { en: 'eat', zh: '吃', image: '🍽️', phonics: 'ea /i/', kk: '[it]', phonicsSound: '/i/', exampleSentence: 'eat', exampleZh: '吃' },
    { en: 'bike', zh: '腳踏車', image: '🚲', phonics: 'i_e /aɪ/', kk: '[baɪk]', phonicsSound: '/aɪ/', exampleSentence: 'bike', exampleZh: '腳踏車' },
    { en: 'sky', zh: '天空', image: '☁️', phonics: 'y /aɪ/', kk: '[skaɪ]', phonicsSound: '/aɪ/', exampleSentence: 'sky', exampleZh: '天空' },
    { en: 'boat', zh: '小船', image: '⛵', phonics: 'oa /o/', kk: '[bot]', phonicsSound: '/o/', exampleSentence: 'boat', exampleZh: '小船' },
    { en: 'snow', zh: '雪', image: '❄️', phonics: 'ow /o/', kk: '[sno]', phonicsSound: '/o/', exampleSentence: 'snow', exampleZh: '雪' },
    { en: 'night', zh: '夜晚', image: '🌙', phonics: 'igh /aɪ/', kk: '[naɪt]', phonicsSound: '/aɪ/', exampleSentence: 'night', exampleZh: '夜晚' },
    { en: 'home', zh: '家', image: '🏠', phonics: 'o_e /o/', kk: '[hom]', phonicsSound: '/o/', exampleSentence: 'home', exampleZh: '家' },
  ],
  sentences: [
    { en: 'I ride my bike home.', zh: '我騎腳踏車回家。' }, { en: 'I see a tree in the rain.', zh: '我在雨中看到一棵樹。' }, { en: 'Is it a boat?', zh: '這是一艘船嗎？' }, { en: 'No, it is a bike.', zh: '不，這是一輛腳踏車。' }, { en: 'What do you see in the sky?', zh: '你在天空看到什麼？' }, { en: 'I eat cake at home.', zh: '我在家吃蛋糕。' },
  ],
  phonicsLetters: ['a_e', 'ai', 'ay', 'ee', 'ea', 'i_e', 'igh', 'y', 'o_e', 'oa', 'ow'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '"cake" 是長母音還是短母音？', options: ['長母音', '短母音'], answer: '長母音', image: '🎂' },
    { type: 'listen-pick', question: '哪個是長母音 i /aɪ/？', options: ['bike', 'big', 'pig', 'sit'], answer: 'bike', image: '🚲' },
    { type: 'match', question: '🌳 樹是哪個母音？', options: ['long e', 'long a', 'long i', 'long o'], answer: 'long e' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🎂', '🌳', '🚲', '⛵'], answer: '🚲', image: '🎧' },
    { type: 'spell', question: '拼拼看：c _ ke（蛋糕）', answer: 'cake', image: '✍️' },
    { type: 'spell', question: '拼拼看：tr _ _（樹）', answer: 'tree', image: '✍️' },
    { type: 'match', question: '配對：字配長母音', options: ['cake-a', 'tree-e', 'bike-i', 'boat-o'], answer: 'cake-a' },
    { type: 'fill-blank', question: 'Which is long o? ___', options: ['boat', 'bike', 'tree', 'cake'], answer: 'boat' },
    { type: 'speak', question: '跟著念：Cake, tree, bike, boat!', answer: 'Cake', image: '🗣' },
  ],
  talkTimePrompts: ["Say a long a word.", "Say a long e word.", "Say a long i and long o word.", "You can read long vowels!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是長母音 e /i/？', options: ['tree', 'bed', 'ten', 'net'], answer: 'tree' },
    { type: 'match', question: '⛵ 小船是哪個長母音？', options: ['long o', 'long a', 'long e', 'long i'], answer: 'long o' },
    { type: 'spell', question: '拼拼看：b _ ke（腳踏車）', answer: 'bike', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "cake, tree, bike, boat — say their names!", lineZh: 'cake、tree、bike、boat —— 唸出名字！' },
    { speaker: 'Coco', line: "/e/ /i/ /aɪ/ /o/ — long vowels!", lineZh: '/e/ /i/ /aɪ/ /o/ —— 長母音！' },
    { speaker: 'Polly', line: "Short is /æ/, long is /e/. Can you hear?", lineZh: '短音 /æ/，長音 /e/。聽得出來嗎？' },
    { speaker: 'Coco', line: "Yes! I can read both now!", lineZh: '可以！我兩種都會讀了！' },
  ],
};

const L2_M16: Mission = {
  id: 16, slug: 'l2-m16-long-u-oo', level: 2, title: '長母音 u · oo', titleEn: 'Long u & oo', theme: '聲音島・月亮動物園', themeEmoji: '🌝',
  focus: '長母音 u /ju/·/u/：u_e、oo',
  story: [
    { image: '🧊', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Magic e! cute, cube — long u!", dialogueZh: '魔法 e！cute、cube —— 長母音 u！', highlightWords: ['u_e'], sceneEmojis: ['🧊', '🔤', '✨'], animation: 'wave' },
    { image: '🌝', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "moon, food, zoo — oo says /u/!", dialogueZh: 'moon、food、zoo —— oo 發 /u/！', highlightWords: ['moon', 'food', 'zoo'], sceneEmojis: ['🌝', '🍜', '🦁'], animation: 'bounce' },
    { image: '🦷', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "room, pool, tooth — /u/ too!", dialogueZh: 'room、pool、tooth —— 也是 /u/！', highlightWords: ['room', 'pool', 'tooth'], sceneEmojis: ['🚪', '🏊', '🦷'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "All the vowels — done! You're a reader!", dialogueZh: '所有母音 —— 完成！你是小讀者了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'cute', zh: '可愛的', image: '🥰', phonics: 'u_e /ju/', kk: '[kjut]', phonicsSound: '/ju/', exampleSentence: 'a cute cat', exampleZh: '一隻可愛的貓' },
    { en: 'cube', zh: '立方體', image: '🧊', phonics: 'u_e /ju/', kk: '[kjub]', phonicsSound: '/ju/', exampleSentence: 'an ice cube', exampleZh: '一塊冰塊' },
    { en: 'June', zh: '六月', image: '📅', phonics: 'u_e /u/', kk: '[dʒun]', phonicsSound: '/u/', exampleSentence: 'in June', exampleZh: '在六月' },
    { en: 'moon', zh: '月亮', image: '🌝', phonics: 'oo /u/', kk: '[mun]', phonicsSound: '/u/', exampleSentence: 'the full moon', exampleZh: '滿月' },
    { en: 'food', zh: '食物', image: '🍜', phonics: 'oo /u/', kk: '[fud]', phonicsSound: '/u/', exampleSentence: 'yummy food', exampleZh: '好吃的食物' },
    { en: 'zoo', zh: '動物園', image: '🦁', phonics: 'oo /u/', kk: '[zu]', phonicsSound: '/u/', exampleSentence: 'go to the zoo', exampleZh: '去動物園' },
    { en: 'room', zh: '房間', image: '🚪', phonics: 'oo /u/', kk: '[rum]', phonicsSound: '/u/', exampleSentence: 'my room', exampleZh: '我的房間' },
    { en: 'pool', zh: '游泳池', image: '🏊', phonics: 'oo /u/', kk: '[pul]', phonicsSound: '/u/', exampleSentence: 'a big pool', exampleZh: '一個大泳池' },
    { en: 'tooth', zh: '牙齒', image: '🦷', phonics: 'oo /u/', kk: '[tuθ]', phonicsSound: '/u/', exampleSentence: 'a white tooth', exampleZh: '一顆白牙' },
    { en: 'blue', zh: '藍色', image: '🔵', phonics: 'ue /u/', kk: '[blu]', phonicsSound: '/u/', exampleSentence: 'a blue sky', exampleZh: '藍天' },
  ],
  sentences: [
    { en: 'The moon is over the zoo.', zh: '月亮在動物園上方。' }, { en: 'I eat food in my room.', zh: '我在房間吃東西。' }, { en: 'Is the cat cute?', zh: '這隻貓可愛嗎？' }, { en: 'Yes, it is cute.', zh: '是的，很可愛。' }, { en: 'Do you like the pool?', zh: '你喜歡游泳池嗎？' }, { en: 'The sky is blue.', zh: '天空是藍色的。' },
  ],
  phonicsLetters: ['u_e', 'oo'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 oo /u/ 的音？', options: ['moon', 'box', 'cat', 'bed'], answer: 'moon', image: '🌝' },
    { type: 'match', question: '🦁 動物園是哪個字？', options: ['zoo', 'moon', 'room', 'pool'], answer: 'zoo' },
    { type: 'spell', question: '拼拼看：m _ _ n（月亮）', answer: 'moon', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🌝', '🍜', '🏊', '🦷'], answer: '🍜', image: '🎧' },
    { type: 'spell', question: '拼拼看：z _ _（動物園）', answer: 'zoo', image: '✍️' },
    { type: 'spell', question: '拼拼看：p _ _ l（游泳池）', answer: 'pool', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['cube-🧊', 'tooth-🦷', 'room-🚪', 'food-🍜'], answer: 'cube-🧊' },
    { type: 'fill-blank', question: 'The ___ is white tonight.（月亮）', options: ['moon', 'zoo', 'pool', 'food'], answer: 'moon' },
    { type: 'speak', question: '跟著念：Moon, zoo, food!', answer: 'Moon', image: '🗣' },
  ],
  talkTimePrompts: ["Say a word with oo.", "Do you like the zoo?", "What food do you like?", "Great job with long u!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "moon" 月亮？', options: ['🌝', '🍜', '🏊', '🦷'], answer: '🌝' },
    { type: 'spell', question: '拼拼看：f _ _ d（食物）', answer: 'food', image: '✍️' },
    { type: 'match', question: '🦷 牙齒是哪個字？', options: ['tooth', 'room', 'pool', 'zoo'], answer: 'tooth' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Look at the moon over the zoo!", lineZh: '看動物園上的月亮！' },
    { speaker: 'Coco', line: "moon, zoo — oo says /u/!", lineZh: 'moon、zoo —— oo 發 /u/！' },
    { speaker: 'Finn', line: "Let's eat food in my room.", lineZh: '我們在我房間吃東西。' },
    { speaker: 'Coco', line: "food, room — /u/ again! Yum!", lineZh: 'food、room —— 又是 /u/！好吃！' },
  ],
};

const L2_M17: Mission = {
  id: 17, slug: 'l2-m17-soft-cg', level: 2, title: '軟音 c · g', titleEn: 'Soft c & g', theme: '聲音島・魔法冰宮', themeEmoji: '🧊',
  focus: '例外：c/g 在 e·i·y 前變軟音（c→/s/、g→/dʒ/）',
  story: [
    { image: '🏙️', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Careful! c before e, i, y says /s/! city!", dialogueZh: '小心！c 在 e、i、y 前發 /s/！city！', highlightWords: ['soft c'], sceneEmojis: ['🏙️', '🔤', '⚠️'], animation: 'wave' },
    { image: '🧊', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "ice, face, rice — soft c /s/!", dialogueZh: 'ice、face、rice —— 軟音 c /s/！', highlightWords: ['ice', 'face', 'rice'], sceneEmojis: ['🧊', '😀', '🍚'], animation: 'bounce' },
    { image: '🦒', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "g before e, i, y says /dʒ/! gem, giraffe!", dialogueZh: 'g 在 e、i、y 前發 /dʒ/！gem、giraffe！', highlightWords: ['gem', 'giraffe'], sceneEmojis: ['💎', '🦒', '🔤'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Tricky sounds — you mastered them! Super!", dialogueZh: '狡猾的音 —— 你掌握了！超厲害！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔤'], animation: 'bounce' },
  ],
  words: [
    { en: 'city', zh: '城市', image: '🏙️', phonics: 'soft c /s/', kk: '[ˈsɪti]', phonicsSound: '/s/', exampleSentence: 'a big city', exampleZh: '一個大城市' },
    { en: 'ice', zh: '冰', image: '🧊', phonics: 'soft c /s/', kk: '[aɪs]', phonicsSound: '/s/', exampleSentence: 'cold ice', exampleZh: '冷冰塊' },
    { en: 'face', zh: '臉', image: '😀', phonics: 'soft c /s/', kk: '[fes]', phonicsSound: '/s/', exampleSentence: 'a happy face', exampleZh: '一張笑臉' },
    { en: 'rice', zh: '米飯', image: '🍚', phonics: 'soft c /s/', kk: '[raɪs]', phonicsSound: '/s/', exampleSentence: 'eat rice', exampleZh: '吃飯' },
    { en: 'nice', zh: '好的', image: '👍', phonics: 'soft c /s/', kk: '[naɪs]', phonicsSound: '/s/', exampleSentence: 'You are nice.', exampleZh: '你人很好。' },
    { en: 'gem', zh: '寶石', image: '💎', phonics: 'soft g /dʒ/', kk: '[dʒɛm]', phonicsSound: '/dʒ/', exampleSentence: 'a red gem', exampleZh: '一顆紅寶石' },
    { en: 'giraffe', zh: '長頸鹿', image: '🦒', phonics: 'soft g /dʒ/', kk: '[dʒəˈræf]', phonicsSound: '/dʒ/', exampleSentence: 'a tall giraffe', exampleZh: '一隻高長頸鹿' },
    { en: 'cage', zh: '籠子', image: '🔒', phonics: 'soft g /dʒ/', kk: '[kedʒ]', phonicsSound: '/dʒ/', exampleSentence: 'a bird cage', exampleZh: '一個鳥籠' },
    { en: 'page', zh: '頁', image: '📄', phonics: 'soft g /dʒ/', kk: '[pedʒ]', phonicsSound: '/dʒ/', exampleSentence: 'page one', exampleZh: '第一頁' },
    { en: 'age', zh: '年齡', image: '🎂', phonics: 'soft g /dʒ/', kk: '[edʒ]', phonicsSound: '/dʒ/', exampleSentence: 'What is your age?', exampleZh: '你幾歲？' },
  ],
  sentences: [
    { en: 'The giraffe is in the city.', zh: '長頸鹿在城市裡。' }, { en: 'I eat rice with a nice face.', zh: '我開心地吃飯。' }, { en: 'Is it a gem?', zh: '這是寶石嗎？' }, { en: 'Yes, it is a gem.', zh: '是的，這是寶石。' }, { en: 'What page is it?', zh: '這是第幾頁？' }, { en: 'The ice is cold.', zh: '冰塊很冷。' },
  ],
  phonicsLetters: ['soft c', 'soft g'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '"city" 的 c 發什麼音？', options: ['/s/', '/k/'], answer: '/s/', image: '🏙️' },
    { type: 'listen-pick', question: '"gem" 的 g 發什麼音？', options: ['/dʒ/', '/ɡ/'], answer: '/dʒ/', image: '💎' },
    { type: 'match', question: '🦒 長頸鹿是哪個字？', options: ['giraffe', 'gem', 'cage', 'city'], answer: 'giraffe' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🧊', '😀', '🍚', '💎'], answer: '🍚', image: '🎧' },
    { type: 'spell', question: '拼拼看：i _ e（冰）', answer: 'ice', image: '✍️' },
    { type: 'spell', question: '拼拼看：fa _ e（臉）', answer: 'face', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['gem-💎', 'cage-🔒', 'page-📄', 'city-🏙️'], answer: 'gem-💎' },
    { type: 'fill-blank', question: 'You are so ___!（好的）', options: ['nice', 'ice', 'rice', 'face'], answer: 'nice' },
    { type: 'speak', question: '跟著念：City, ice, gem!', answer: 'City', image: '🗣' },
  ],
  talkTimePrompts: ["Say a soft c word.", "Say a soft g word.", "Do you like rice?", "Great job with tricky sounds!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "giraffe" 長頸鹿？', options: ['🦒', '💎', '🧊', '🍚'], answer: '🦒' },
    { type: 'spell', question: '拼拼看：ri _ e（米飯）', answer: 'rice', image: '✍️' },
    { type: 'match', question: '💎 寶石是哪個字？', options: ['gem', 'cage', 'page', 'age'], answer: 'gem' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "A giraffe eats rice in the city!", lineZh: '長頸鹿在城市吃飯！' },
    { speaker: 'Polly', line: "giraffe /dʒ/, city /s/, rice /s/ — soft sounds!", lineZh: 'giraffe /dʒ/、city /s/、rice /s/ —— 軟音！' },
    { speaker: 'Coco', line: "The ice gem is nice!", lineZh: '這顆冰寶石很棒！' },
    { speaker: 'Polly', line: "ice, gem, nice — c and g go soft!", lineZh: 'ice、gem、nice —— c 和 g 變軟！' },
  ],
};

const L2_M18: Mission = {
  id: 18, slug: 'l2-m18-r-controlled', level: 2, title: 'r 控制母音', titleEn: 'r-Controlled', theme: '聲音島・海盜星港', themeEmoji: '⭐',
  focus: 'r 控制母音：ar /ɑr/、or /ɔr/、er·ir·ur /ɝ/',
  story: [
    { image: '🚗', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "r changes the vowel! ar says /ɑr/! car!", dialogueZh: 'r 會改變母音！ar 發 /ɑr/！car！', highlightWords: ['ar'], sceneEmojis: ['🚗', '⭐', '✨'], animation: 'wave' },
    { image: '🌽', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "car, star, corn, fork!", dialogueZh: 'car、star、corn、fork！', highlightWords: ['car', 'star', 'corn'], sceneEmojis: ['🚗', '⭐', '🌽'], animation: 'bounce' },
    { image: '🐦', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "er, ir, ur all say /ɝ/! bird, girl, turn!", dialogueZh: 'er、ir、ur 都發 /ɝ/！bird、girl、turn！', highlightWords: ['bird', 'girl', 'turn'], sceneEmojis: ['🐦', '👧', '🔄'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Bossy r — you tamed it! Awesome!", dialogueZh: '霸道的 r —— 你馴服它了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '⭐'], animation: 'bounce' },
  ],
  words: [
    { en: 'car', zh: '汽車', image: '🚗', phonics: 'ar /ɑr/', kk: '[kɑr]', phonicsSound: '/ɑr/', exampleSentence: 'a red car', exampleZh: '一輛紅車' },
    { en: 'star', zh: '星星', image: '⭐', phonics: 'ar /ɑr/', kk: '[stɑr]', phonicsSound: '/ɑr/', exampleSentence: 'a bright star', exampleZh: '一顆亮星' },
    { en: 'arm', zh: '手臂', image: '💪', phonics: 'ar /ɑr/', kk: '[ɑrm]', phonicsSound: '/ɑr/', exampleSentence: 'my arm', exampleZh: '我的手臂' },
    { en: 'corn', zh: '玉米', image: '🌽', phonics: 'or /ɔr/', kk: '[kɔrn]', phonicsSound: '/ɔr/', exampleSentence: 'yellow corn', exampleZh: '黃玉米' },
    { en: 'fork', zh: '叉子', image: '🍴', phonics: 'or /ɔr/', kk: '[fɔrk]', phonicsSound: '/ɔr/', exampleSentence: 'a fork', exampleZh: '一支叉子' },
    { en: 'her', zh: '她的', image: '👩', phonics: 'er /ɝ/', kk: '[hɝ]', phonicsSound: '/ɝ/', exampleSentence: 'her bag', exampleZh: '她的包包' },
    { en: 'bird', zh: '鳥', image: '🐦', phonics: 'ir /ɝ/', kk: '[bɝd]', phonicsSound: '/ɝ/', exampleSentence: 'a little bird', exampleZh: '一隻小鳥' },
    { en: 'girl', zh: '女孩', image: '👧', phonics: 'ir /ɝ/', kk: '[ɡɝl]', phonicsSound: '/ɝ/', exampleSentence: 'a nice girl', exampleZh: '一個好女孩' },
    { en: 'turn', zh: '轉', image: '🔄', phonics: 'ur /ɝ/', kk: '[tɝn]', phonicsSound: '/ɝ/', exampleSentence: 'turn left', exampleZh: '左轉' },
    { en: 'nurse', zh: '護士', image: '👩‍⚕️', phonics: 'ur /ɝ/', kk: '[nɝs]', phonicsSound: '/ɝ/', exampleSentence: 'a kind nurse', exampleZh: '一位親切的護士' },
  ],
  sentences: [
    { en: 'The bird is on the car.', zh: '鳥在車上。' }, { en: 'The girl has corn and a fork.', zh: '女孩有玉米和叉子。' }, { en: 'Is it a star?', zh: '這是星星嗎？' }, { en: 'Yes, it is a star.', zh: '是的，這是星星。' }, { en: 'Turn left, please.', zh: '請左轉。' }, { en: 'Her arm hurts.', zh: '她的手臂痛。' },
  ],
  phonicsLetters: ['ar', 'or', 'er', 'ir', 'ur'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '哪個字有 ar /ɑr/ 的音？', options: ['car', 'cat', 'cup', 'bed'], answer: 'car', image: '🚗' },
    { type: 'match', question: '🐦 鳥是哪個字？', options: ['bird', 'girl', 'her', 'turn'], answer: 'bird' },
    { type: 'spell', question: '拼拼看：st _ r（星星）', answer: 'star', image: '✍️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🚗', '⭐', '🌽', '🐦'], answer: '🌽', image: '🎧' },
    { type: 'spell', question: '拼拼看：c _ r（汽車）', answer: 'car', image: '✍️' },
    { type: 'spell', question: '拼拼看：g _ rl（女孩）', answer: 'girl', image: '✍️' },
    { type: 'match', question: '配對：字配圖', options: ['fork-🍴', 'arm-💪', 'turn-🔄', 'corn-🌽'], answer: 'fork-🍴' },
    { type: 'fill-blank', question: 'A ___ sits on the car.（鳥）', options: ['bird', 'star', 'corn', 'fork'], answer: 'bird' },
    { type: 'speak', question: '跟著念：Car, star, bird!', answer: 'Car', image: '🗣' },
  ],
  talkTimePrompts: ["Say an ar word.", "Say an or word.", "Say an er/ir/ur word.", "Great job with bossy r!"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是 "star" 星星？', options: ['⭐', '🚗', '🌽', '🐦'], answer: '⭐' },
    { type: 'spell', question: '拼拼看：b _ rd（鳥）', answer: 'bird', image: '✍️' },
    { type: 'match', question: '🌽 玉米是哪個字？', options: ['corn', 'fork', 'car', 'star'], answer: 'corn' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "A star and a car! ar says /ɑr/!", lineZh: '星星和汽車！ar 發 /ɑr/！' },
    { speaker: 'Coco', line: "star, car — bossy r! /ɑr/", lineZh: 'star、car —— 霸道的 r！/ɑr/' },
    { speaker: 'Finn', line: "The girl saw a bird. Turn and look!", lineZh: '女孩看到一隻鳥。轉頭看！' },
    { speaker: 'Coco', line: "girl, bird, turn — all /ɝ/!", lineZh: 'girl、bird、turn —— 都是 /ɝ/！' },
  ],
};

const L2_M19: Mission = {
  id: 19, slug: 'l2-m19-sight-words', level: 2, title: '常見字 Sight Words', titleEn: 'Sight Words', theme: '聲音島・記憶寶庫', themeEmoji: '⭐',
  focus: '高頻字（不能拼讀、要直接記）：the, is, you, are, have…',
  story: [
    { image: '⭐', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Some words can't be sounded out. Just remember them!", dialogueZh: '有些字沒辦法拼讀，直接記起來就好！', highlightWords: ['remember'], sceneEmojis: ['⭐', '🧠', '✨'], animation: 'wave' },
    { image: '💬', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "the, is, you, are — see them everywhere!", dialogueZh: 'the、is、you、are —— 到處都看得到！', highlightWords: ['the', 'is', 'you', 'are'], sceneEmojis: ['💬', '👀', '⭐'], animation: 'bounce' },
    { image: '🧠', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "have, they, said, was — memory power!", dialogueZh: 'have、they、said、was —— 記憶力！', highlightWords: ['have', 'they', 'said', 'was'], sceneEmojis: ['🧠', '💪', '⭐'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Now you can read real sentences! Amazing!", dialogueZh: '現在你能讀真正的句子了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'the', zh: '這/那（定冠詞）', image: '🔤', phonics: 'sight word', kk: '[ðə]', phonicsSound: '直接記', exampleSentence: 'the cat', exampleZh: '那隻貓' },
    { en: 'is', zh: '是', image: '✅', phonics: 'sight word', kk: '[ɪz]', phonicsSound: '直接記', exampleSentence: 'It is red.', exampleZh: '它是紅色的。' },
    { en: 'are', zh: '是（複數）', image: '👥', phonics: 'sight word', kk: '[ɑr]', phonicsSound: '直接記', exampleSentence: 'They are big.', exampleZh: '它們很大。' },
    { en: 'you', zh: '你', image: '👉', phonics: 'sight word', kk: '[ju]', phonicsSound: '直接記', exampleSentence: 'You are nice.', exampleZh: '你人很好。' },
    { en: 'have', zh: '有', image: '🤲', phonics: 'sight word', kk: '[hæv]', phonicsSound: '直接記', exampleSentence: 'I have a pen.', exampleZh: '我有一支筆。' },
    { en: 'they', zh: '他們', image: '👫', phonics: 'sight word', kk: '[ðe]', phonicsSound: '直接記', exampleSentence: 'They run.', exampleZh: '他們在跑。' },
    { en: 'said', zh: '說（過去）', image: '💬', phonics: 'sight word', kk: '[sɛd]', phonicsSound: '直接記', exampleSentence: 'She said hi.', exampleZh: '她說嗨。' },
    { en: 'was', zh: '是（過去）', image: '⏮️', phonics: 'sight word', kk: '[wʌz]', phonicsSound: '直接記', exampleSentence: 'It was fun.', exampleZh: '很好玩。' },
    { en: 'of', zh: '的', image: '🔗', phonics: 'sight word', kk: '[ʌv]', phonicsSound: '直接記', exampleSentence: 'a cup of tea', exampleZh: '一杯茶' },
    { en: 'to', zh: '到', image: '➡️', phonics: 'sight word', kk: '[tu]', phonicsSound: '直接記', exampleSentence: 'go to school', exampleZh: '去學校' },
  ],
  sentences: [
    { en: 'The cat is on the mat.', zh: '貓在墊子上。' }, { en: 'You have a nice bag.', zh: '你有一個好包包。' }, { en: 'Are they big?', zh: '它們很大嗎？' }, { en: 'Yes, they are.', zh: '是的。' }, { en: 'She said it was fun.', zh: '她說很好玩。' }, { en: 'I go to school.', zh: '我去上學。' },
  ],
  phonicsLetters: ['sight words'],
  warmUpQuestions: [
    { type: 'match', question: '「你」的英文是？', options: ['you', 'the', 'is', 'to'], answer: 'you' },
    { type: 'match', question: '「有」的英文是？', options: ['have', 'was', 'said', 'of'], answer: 'have' },
    { type: 'fill-blank', question: 'The cat ___ black.', options: ['is', 'are', 'you', 'to'], answer: 'is' },
  ],
  challenges: [
    { type: 'fill-blank', question: '___ cat is big.（定冠詞）', options: ['The', 'You', 'Is', 'To'], answer: 'The' },
    { type: 'fill-blank', question: 'They ___ my friends.', options: ['are', 'is', 'was', 'of'], answer: 'are' },
    { type: 'fill-blank', question: 'I ___ a pen.（有）', options: ['have', 'the', 'was', 'to'], answer: 'have' },
    { type: 'match', question: '「他們」的英文是？', options: ['they', 'you', 'the', 'is'], answer: 'they' },
    { type: 'fill-blank', question: 'I go ___ school.', options: ['to', 'of', 'is', 'are'], answer: 'to' },
    { type: 'speak', question: '跟著念：The, is, you, are!', answer: 'The', image: '🗣' },
  ],
  talkTimePrompts: ["Read: The cat is big.", "Read: You have a bag.", "Read: They are my friends.", "You can read sentences now!"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'It ___ fun.（過去：是）', options: ['was', 'is', 'are', 'the'], answer: 'was' },
    { type: 'match', question: '「說（過去）」的英文是？', options: ['said', 'was', 'have', 'you'], answer: 'said' },
    { type: 'fill-blank', question: 'a cup ___ tea', options: ['of', 'to', 'is', 'the'], answer: 'of' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "The cat is on the bed. Read it!", lineZh: '貓在床上。讀讀看！' },
    { speaker: 'Benny', line: "the, is, on — I know these words!", lineZh: 'the、is、on —— 我認得這些字！' },
    { speaker: 'Coco', line: "You have a book. They are friends.", lineZh: '你有一本書。他們是朋友。' },
    { speaker: 'Benny', line: "you, have, they, are — sight words! Easy!", lineZh: 'you、have、they、are —— 常見字！簡單！' },
  ],
};

const L2_M20: Mission = {
  id: 20, slug: 'l2-m20-boss', level: 2, title: '聲音島大魔王', titleEn: 'Sound Boss', theme: '聲音島・拼讀魔王', themeEmoji: '🏆',
  focus: '拼讀總驗收：短母音＋長母音＋子音組合＋sight words',
  story: [
    { image: '🐉', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The Sound Boss is here! Use all your phonics!", dialogueZh: '拼讀大魔王來了！用上你所有的拼讀！', highlightWords: ['phonics'], sceneEmojis: ['🐉', '⚔️', '🔊'], animation: 'shake' },
    { image: '💪', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Blend, read, and win! You can do it!", dialogueZh: '拼讀、閱讀、獲勝！你做得到！', highlightWords: [], sceneEmojis: ['💪', '📖', '✨'], animation: 'bounce' },
    { image: '🎖️', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You beat the Boss! You get the Sound Badge!", dialogueZh: '你打敗大魔王了！獲得拼讀徽章！', highlightWords: ['Badge'], sceneEmojis: ['🎖️', '🏆', '🎉'], animation: 'tada' },
    { image: '🎓', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You finished Sound Island! On to Market Street!", dialogueZh: '你完成了聲音島！前進市場街！', highlightWords: [], sceneEmojis: ['🎓', '🏡', '🚀'], animation: 'bounce' },
  ],
  words: [
    { en: 'cat', zh: '貓', image: '🐱', phonics: 'short a', kk: '[kæt]', phonicsSound: '/æ/', exampleSentence: 'a cat', exampleZh: '一隻貓' },
    { en: 'tree', zh: '樹', image: '🌳', phonics: 'long e', kk: '[tri]', phonicsSound: '/i/', exampleSentence: 'a tree', exampleZh: '一棵樹' },
    { en: 'bike', zh: '腳踏車', image: '🚲', phonics: 'long i', kk: '[baɪk]', phonicsSound: '/aɪ/', exampleSentence: 'a bike', exampleZh: '一輛腳踏車' },
    { en: 'boat', zh: '小船', image: '⛵', phonics: 'long o', kk: '[bot]', phonicsSound: '/o/', exampleSentence: 'a boat', exampleZh: '一艘船' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: 'sh', kk: '[fɪʃ]', phonicsSound: '/ʃ/', exampleSentence: 'a fish', exampleZh: '一條魚' },
    { en: 'moon', zh: '月亮', image: '🌝', phonics: 'oo', kk: '[mun]', phonicsSound: '/u/', exampleSentence: 'the moon', exampleZh: '月亮' },
    { en: 'star', zh: '星星', image: '⭐', phonics: 'ar', kk: '[stɑr]', phonicsSound: '/ɑr/', exampleSentence: 'a star', exampleZh: '一顆星星' },
    { en: 'rice', zh: '米飯', image: '🍚', phonics: 'soft c', kk: '[raɪs]', phonicsSound: '/s/', exampleSentence: 'rice', exampleZh: '米飯' },
    { en: 'the', zh: '定冠詞', image: '🔤', phonics: 'sight word', kk: '[ðə]', phonicsSound: '直接記', exampleSentence: 'the cat', exampleZh: '那隻貓' },
    { en: 'you', zh: '你', image: '👉', phonics: 'sight word', kk: '[ju]', phonicsSound: '直接記', exampleSentence: 'you', exampleZh: '你' },
  ],
  sentences: [
    { en: 'The cat is by the tree.', zh: '貓在樹旁邊。' }, { en: 'You have a bike and a boat.', zh: '你有一輛腳踏車和一艘船。' }, { en: 'Is the fish in the sea?', zh: '魚在海裡嗎？' }, { en: 'Yes, it is.', zh: '是的。' }, { en: 'I can read now!', zh: '我現在會讀了！' }, { en: 'I am a reading star!', zh: '我是閱讀之星！' },
  ],
  phonicsLetters: ['short vowels', 'long vowels', 'digraphs', 'sight words'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '"cat" 是短母音還是長母音？', options: ['短母音', '長母音'], answer: '短母音', image: '🐱' },
    { type: 'listen-pick', question: '"tree" 是短母音還是長母音？', options: ['長母音', '短母音'], answer: '長母音', image: '🌳' },
    { type: 'match', question: '🐟 魚有哪個子音組合？', options: ['sh', 'ch', 'th', 'ck'], answer: 'sh' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐱', '🌳', '🚲', '⛵'], answer: '🚲', image: '🎧' },
    { type: 'spell', question: '拼拼看：tr _ _（樹）', answer: 'tree', image: '✍️' },
    { type: 'spell', question: '拼拼看：m _ _ n（月亮）', answer: 'moon', image: '✍️' },
    { type: 'match', question: '配對：字配拼讀', options: ['cat-short a', 'tree-long e', 'star-ar', 'fish-sh'], answer: 'cat-short a' },
    { type: 'fill-blank', question: '___ cat is by the tree.', options: ['The', 'You', 'Is', 'Boat'], answer: 'The' },
    { type: 'speak', question: '跟著念：Cat, tree, bike, boat!', answer: 'Cat', image: '🗣' },
  ],
  talkTimePrompts: ["Read: The cat is by the tree.", "Say a short vowel word and a long vowel word.", "You beat the Sound Boss! How do you feel?", "You are a reading star! Say 'I can read!'"],
  reviewQuiz: [
    { type: 'listen-pick', question: '哪個是長母音 i /aɪ/？', options: ['bike', 'big', 'fish', 'cat'], answer: 'bike' },
    { type: 'match', question: '⭐ 星星有哪個 r 母音？', options: ['ar', 'or', 'er', 'ir'], answer: 'ar' },
    { type: 'fill-blank', question: 'I can ___ now!（讀）', options: ['read', 'the', 'you', 'moon'], answer: 'read' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "The Sound Boss says: read this word!", lineZh: '拼讀大魔王說：讀這個字！' },
    { speaker: 'Benny', line: "b-oa-t... boat! I blended it!", lineZh: 'b-oa-t… boat！我拼出來了！' },
    { speaker: 'Ruby', line: "You beat the Boss! Reading star!", lineZh: '你打敗大魔王了！閱讀之星！' },
    { speaker: 'Finn', line: "On to Market Street! Let's learn words!", lineZh: '前進市場街！我們來學單字！' },
  ],
};

/* ============================================================
   L3 市場街 Market Street — 生活單字＋冠詞＋複數＋疑問句（標準課型範本）
============================================================ */

const L3_M1: Mission = {
  id: 1, slug: 'l3-m1-colors-1', level: 3, title: '顏色①', titleEn: 'Colors 1', theme: '市場街・彩虹攤位', themeEmoji: '🌈',
  focus: '10 個顏色單字；句型 It is + 顏色；冠詞 a + 顏色 + 名詞',
  story: [
    { image: '🌈', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Welcome to Market Street! Look at the colors!", dialogueZh: '歡迎來到市場街！看看這些顏色！', highlightWords: ['colors'], sceneEmojis: ['🌈', '🏡', '✨'], animation: 'wave' },
    { image: '🍎', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "It is a red apple! Red, red, red!", dialogueZh: '這是一顆紅蘋果！紅、紅、紅！', highlightWords: ['red', 'apple'], sceneEmojis: ['🍎', '🔴', '😊'], animation: 'bounce' },
    { image: '🫐', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "It is blue! I like blue and green!", dialogueZh: '這是藍色！我喜歡藍色和綠色！', highlightWords: ['blue', 'green'], sceneEmojis: ['🔵', '🟢', '🎉'], animation: 'tada' },
    { image: '🎨', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "So many colors! Now you know them all!", dialogueZh: '好多顏色！現在你都認識了！', highlightWords: [], sceneEmojis: ['🎨', '🏆', '🌈'], animation: 'bounce' },
  ],
  words: [
    { en: 'red', zh: '紅色', image: '🔴', phonics: '', kk: '[rɛd]', phonicsSound: '', exampleSentence: 'a red apple', exampleZh: '一顆紅蘋果' },
    { en: 'blue', zh: '藍色', image: '🔵', phonics: '', kk: '[blu]', phonicsSound: '', exampleSentence: 'a blue car', exampleZh: '一輛藍車' },
    { en: 'yellow', zh: '黃色', image: '🟡', phonics: '', kk: '[ˈjɛlo]', phonicsSound: '', exampleSentence: 'a yellow sun', exampleZh: '一個黃太陽' },
    { en: 'green', zh: '綠色', image: '🟢', phonics: '', kk: '[ɡrin]', phonicsSound: '', exampleSentence: 'a green tree', exampleZh: '一棵綠樹' },
    { en: 'black', zh: '黑色', image: '⚫', phonics: '', kk: '[blæk]', phonicsSound: '', exampleSentence: 'a black cat', exampleZh: '一隻黑貓' },
    { en: 'white', zh: '白色', image: '⚪', phonics: '', kk: '[waɪt]', phonicsSound: '', exampleSentence: 'a white dog', exampleZh: '一隻白狗' },
    { en: 'pink', zh: '粉紅色', image: '🩷', phonics: '', kk: '[pɪŋk]', phonicsSound: '', exampleSentence: 'a pink pig', exampleZh: '一隻粉紅豬' },
    { en: 'purple', zh: '紫色', image: '🟣', phonics: '', kk: '[ˈpɝpl]', phonicsSound: '', exampleSentence: 'a purple grape', exampleZh: '一顆紫葡萄' },
    { en: 'orange', zh: '橘色', image: '🟠', phonics: '', kk: '[ˈɔrɪndʒ]', phonicsSound: '', exampleSentence: 'an orange ball', exampleZh: '一顆橘球' },
    { en: 'brown', zh: '棕色', image: '🟤', phonics: '', kk: '[braʊn]', phonicsSound: '', exampleSentence: 'a brown bear', exampleZh: '一隻棕熊' },
  ],
  sentences: [
    { en: 'It is red.', zh: '它是紅色的。' }, { en: 'It is a blue car.', zh: '這是一輛藍車。' }, { en: 'What color is it?', zh: '它是什麼顏色？' }, { en: 'It is green.', zh: '它是綠色的。' }, { en: 'I like red and blue.', zh: '我喜歡紅色和藍色。' }, { en: 'Do you like yellow?', zh: '你喜歡黃色嗎？' },
  ],
  phonicsLetters: ['colors'],
  warmUpQuestions: [
    { type: 'match', question: '🔴 是什麼顏色？', options: ['red', 'blue', 'green', 'black'], answer: 'red' },
    { type: 'match', question: '🟢 是什麼顏色？', options: ['green', 'red', 'yellow', 'pink'], answer: 'green' },
    { type: 'listen-pick', question: '哪個是 "blue" 藍色？', options: ['🔵', '🔴', '🟡', '🟢'], answer: '🔵' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選色：點你聽到的顏色', options: ['🔴', '🔵', '🟡', '🟢'], answer: '🟡', image: '🎧' },
    { type: 'match', question: '配對：顏色配圖', options: ['red-🔴', 'blue-🔵', 'green-🟢', 'black-⚫'], answer: 'red-🔴' },
    { type: 'spell', question: '拼拼看：r _ d（紅色）', answer: 'red', image: '✍️' },
    { type: 'fill-blank', question: 'It is a ___ apple.（紅色）', options: ['red', 'blue', 'green', 'black'], answer: 'red' },
    { type: 'fill-blank', question: 'The tree is ___.（綠色）', options: ['green', 'red', 'pink', 'white'], answer: 'green' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['It is a blue car.', 'It is a red car.', 'It is a blue ball.', 'It is a green car.'], answer: 'It is a blue car.', image: '🎧' },
    { type: 'read', question: 'What color is the apple?（蘋果是什麼顏色？）', passage: 'Coco has a red apple.\nShe likes the red apple.\nThe tree is green.', options: ['red', 'green', 'blue', 'yellow'], answer: 'red' },
    { type: 'speak', question: '跟著念：Red, blue, green!', answer: 'Red', image: '🗣' },
  ],
  talkTimePrompts: ["What is your favorite color?", "What color is an apple?", "Point to something blue!", "Say three colors you like!"],
  reviewQuiz: [
    { type: 'match', question: '⚫ 是什麼顏色？', options: ['black', 'white', 'brown', 'blue'], answer: 'black' },
    { type: 'fill-blank', question: 'It is a ___ bear.（棕色）', options: ['brown', 'pink', 'purple', 'red'], answer: 'brown' },
    { type: 'listen-pick', question: '哪個是 "pink" 粉紅色？', options: ['🩷', '🟣', '🟠', '🟡'], answer: '🩷' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Look! A red apple and a green tree!", lineZh: '看！一顆紅蘋果和一棵綠樹！' },
    { speaker: 'Polly', line: "I like blue! What color do you like?", lineZh: '我喜歡藍色！你喜歡什麼顏色？' },
    { speaker: 'Coco', line: "I like pink and purple!", lineZh: '我喜歡粉紅色和紫色！' },
    { speaker: 'Polly', line: "So many colors on Market Street!", lineZh: '市場街好多顏色！' },
  ],
};

const L3_M2: Mission = {
  id: 2, slug: 'l3-m2-colors-2', level: 3, title: '顏色② 問答', titleEn: 'Colors Q&A', theme: '市場街・顏色遊戲', themeEmoji: '🎨',
  focus: '句型：Is it red? Yes, it is. / No, it isn\'t. What color is it?',
  story: [
    { image: '🎨', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's play a color game! Ask and answer!", dialogueZh: '我們玩顏色遊戲！問和答！', highlightWords: ['ask', 'answer'], sceneEmojis: ['🎨', '❓', '✨'], animation: 'wave' },
    { image: '🍎', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Is it red? Yes, it is!", dialogueZh: '它是紅色的嗎？是的！', highlightWords: ['Is', 'red'], sceneEmojis: ['🍎', '✅', '😊'], animation: 'bounce' },
    { image: '🍌', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "Is it red? No, it isn't. It is yellow!", dialogueZh: '它是紅色的嗎？不，不是。它是黃色的！', highlightWords: ['No', 'yellow'], sceneEmojis: ['🍌', '❌', '🟡'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Great questions and answers! Well done!", dialogueZh: '很棒的問答！做得好！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🎨'], animation: 'bounce' },
  ],
  words: [
    { en: 'red', zh: '紅色', image: '🔴', phonics: '', kk: '[rɛd]', phonicsSound: '', exampleSentence: 'Is it red?', exampleZh: '它是紅色的嗎？' },
    { en: 'yellow', zh: '黃色', image: '🟡', phonics: '', kk: '[ˈjɛlo]', phonicsSound: '', exampleSentence: 'It is yellow.', exampleZh: '它是黃色的。' },
    { en: 'blue', zh: '藍色', image: '🔵', phonics: '', kk: '[blu]', phonicsSound: '', exampleSentence: 'Is it blue?', exampleZh: '它是藍色的嗎？' },
    { en: 'green', zh: '綠色', image: '🟢', phonics: '', kk: '[ɡrin]', phonicsSound: '', exampleSentence: 'It is green.', exampleZh: '它是綠色的。' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'a red apple', exampleZh: '一顆紅蘋果' },
    { en: 'banana', zh: '香蕉', image: '🍌', phonics: '', kk: '[bəˈnænə]', phonicsSound: '', exampleSentence: 'a yellow banana', exampleZh: '一根黃香蕉' },
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'a blue ball', exampleZh: '一顆藍球' },
    { en: 'leaf', zh: '葉子', image: '🍃', phonics: '', kk: '[lif]', phonicsSound: '', exampleSentence: 'a green leaf', exampleZh: '一片綠葉' },
    { en: 'yes', zh: '是的', image: '✅', phonics: '', kk: '[jɛs]', phonicsSound: '', exampleSentence: 'Yes, it is.', exampleZh: '是的。' },
    { en: 'no', zh: '不是', image: '❌', phonics: '', kk: '[no]', phonicsSound: '', exampleSentence: 'No, it isn\'t.', exampleZh: '不，不是。' },
  ],
  sentences: [
    { en: 'Is it red?', zh: '它是紅色的嗎？' }, { en: 'Yes, it is.', zh: '是的，它是。' }, { en: 'No, it isn\'t.', zh: '不，它不是。' }, { en: 'What color is it?', zh: '它是什麼顏色？' }, { en: 'It is yellow.', zh: '它是黃色的。' }, { en: 'The banana is yellow.', zh: '香蕉是黃色的。' },
  ],
  phonicsLetters: ['colors'],
  warmUpQuestions: [
    { type: 'listen-pick', question: 'Is the apple red? （蘋果是紅的嗎）', options: ['Yes, it is.', 'No, it isn\'t.'], answer: 'Yes, it is.', image: '🍎' },
    { type: 'listen-pick', question: 'Is the banana blue?（香蕉是藍的嗎）', options: ['No, it isn\'t.', 'Yes, it is.'], answer: 'No, it isn\'t.', image: '🍌' },
    { type: 'match', question: '🍌 香蕉是什麼顏色？', options: ['yellow', 'red', 'blue', 'green'], answer: 'yellow' },
  ],
  challenges: [
    { type: 'fill-blank', question: 'Is it red? ___, it is.', options: ['Yes', 'No', 'What', 'It'], answer: 'Yes' },
    { type: 'fill-blank', question: 'Is it blue? No, it ___.', options: ["isn't", 'is', 'are', 'am'], answer: "isn't" },
    { type: 'fill-blank', question: '___ color is it?（什麼）', options: ['What', 'Is', 'Yes', 'No'], answer: 'What' },
    { type: 'match', question: '配對：問句配答句', options: ['Is it red?-Yes, it is.', 'What color?-It is blue.'], answer: 'Is it red?-Yes, it is.' },
    { type: 'listen-pick', question: '哪個是綠葉？', options: ['🍃', '🍎', '🍌', '⚽'], answer: '🍃' },
    { type: 'speak', question: '跟著問：Is it red?', answer: 'Is it red', image: '🗣' },
  ],
  talkTimePrompts: ["Is your bag red?", "What color is the sky?", "Ask me: What color is it?", "Answer: Is an apple red?"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Is it yellow? Yes, ___ is.', options: ['it', 'is', 'no', 'what'], answer: 'it' },
    { type: 'match', question: '⚽ 藍球 — Is it blue?', options: ['Yes, it is.', 'No, it isn\'t.'], answer: 'Yes, it is.' },
    { type: 'fill-blank', question: 'The leaf is ___.（綠色）', options: ['green', 'red', 'yellow', 'blue'], answer: 'green' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Is it red?", lineZh: '它是紅色的嗎？' },
    { speaker: 'Benny', line: "Yes, it is! It's a red apple.", lineZh: '是的！這是一顆紅蘋果。' },
    { speaker: 'Coco', line: "Is the banana red?", lineZh: '香蕉是紅色的嗎？' },
    { speaker: 'Benny', line: "No, it isn't. It's yellow!", lineZh: '不，不是。它是黃色的！' },
  ],
};

const L3_M3: Mission = {
  id: 3, slug: 'l3-m3-numbers-1', level: 3, title: '數字 1–10', titleEn: 'Numbers 1–10', theme: '市場街・數數攤', themeEmoji: '🔢',
  focus: '數字 one–ten；句型 How many? / I have + 數字 + 名詞',
  story: [
    { image: '🔢', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's count! One, two, three!", dialogueZh: '我們來數數！一、二、三！', highlightWords: ['count'], sceneEmojis: ['🔢', '☝️', '✨'], animation: 'wave' },
    { image: '🍎', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "One apple, two apples, three apples!", dialogueZh: '一顆蘋果、兩顆蘋果、三顆蘋果！', highlightWords: ['One', 'two', 'three'], sceneEmojis: ['🍎', '🍎', '🍎'], animation: 'bounce' },
    { image: '🖐️', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Count to ten! ...eight, nine, ten!", dialogueZh: '數到十！…八、九、十！', highlightWords: ['ten'], sceneEmojis: ['🖐️', '🔟', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can count to ten! Great job!", dialogueZh: '你會數到十了！做得好！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔢'], animation: 'bounce' },
  ],
  words: [
    { en: 'one', zh: '一', image: '1️⃣', phonics: '', kk: '[wʌn]', phonicsSound: '', exampleSentence: 'one cat', exampleZh: '一隻貓' },
    { en: 'two', zh: '二', image: '2️⃣', phonics: '', kk: '[tu]', phonicsSound: '', exampleSentence: 'two dogs', exampleZh: '兩隻狗' },
    { en: 'three', zh: '三', image: '3️⃣', phonics: '', kk: '[θri]', phonicsSound: '', exampleSentence: 'three pens', exampleZh: '三支筆' },
    { en: 'four', zh: '四', image: '4️⃣', phonics: '', kk: '[fɔr]', phonicsSound: '', exampleSentence: 'four apples', exampleZh: '四顆蘋果' },
    { en: 'five', zh: '五', image: '5️⃣', phonics: '', kk: '[faɪv]', phonicsSound: '', exampleSentence: 'five fingers', exampleZh: '五根手指' },
    { en: 'six', zh: '六', image: '6️⃣', phonics: '', kk: '[sɪks]', phonicsSound: '', exampleSentence: 'six eggs', exampleZh: '六顆蛋' },
    { en: 'seven', zh: '七', image: '7️⃣', phonics: '', kk: '[ˈsɛvən]', phonicsSound: '', exampleSentence: 'seven stars', exampleZh: '七顆星星' },
    { en: 'eight', zh: '八', image: '8️⃣', phonics: '', kk: '[et]', phonicsSound: '', exampleSentence: 'eight fish', exampleZh: '八條魚' },
    { en: 'nine', zh: '九', image: '9️⃣', phonics: '', kk: '[naɪn]', phonicsSound: '', exampleSentence: 'nine cars', exampleZh: '九輛車' },
    { en: 'ten', zh: '十', image: '🔟', phonics: '', kk: '[tɛn]', phonicsSound: '', exampleSentence: 'ten toes', exampleZh: '十根腳趾' },
  ],
  sentences: [
    { en: 'How many apples?', zh: '有幾顆蘋果？' }, { en: 'I have three apples.', zh: '我有三顆蘋果。' }, { en: 'Count to ten!', zh: '數到十！' }, { en: 'There are five cats.', zh: '有五隻貓。' }, { en: 'How many dogs?', zh: '有幾隻狗？' }, { en: 'Two dogs.', zh: '兩隻狗。' },
  ],
  phonicsLetters: ['numbers'],
  warmUpQuestions: [
    { type: 'match', question: '3️⃣ 是哪個數字？', options: ['three', 'two', 'four', 'five'], answer: 'three' },
    { type: 'match', question: '🔟 是哪個數字？', options: ['ten', 'nine', 'eight', 'seven'], answer: 'ten' },
    { type: 'listen-pick', question: '哪個是 "five" 五？', options: ['5️⃣', '4️⃣', '6️⃣', '3️⃣'], answer: '5️⃣' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選數字', options: ['1️⃣', '2️⃣', '3️⃣', '4️⃣'], answer: '3️⃣', image: '🎧' },
    { type: 'fill-blank', question: 'one, two, ___, four', options: ['three', 'five', 'six', 'ten'], answer: 'three' },
    { type: 'fill-blank', question: 'eight, nine, ___', options: ['ten', 'seven', 'one', 'six'], answer: 'ten' },
    { type: 'match', question: '配對：數字配圖', options: ['one-1️⃣', 'five-5️⃣', 'ten-🔟', 'two-2️⃣'], answer: 'one-1️⃣' },
    { type: 'fill-blank', question: 'I have ___ eggs.（六）', options: ['six', 'two', 'ten', 'one'], answer: 'six' },
    { type: 'speak', question: '數數看：One, two, three!', answer: 'One', image: '🗣' },
  ],
  talkTimePrompts: ["Count from one to ten!", "How old are you?", "How many fingers do you have?", "How many pens are in your bag?"],
  reviewQuiz: [
    { type: 'match', question: '7️⃣ 是哪個數字？', options: ['seven', 'six', 'eight', 'nine'], answer: 'seven' },
    { type: 'fill-blank', question: 'four, five, ___, seven', options: ['six', 'three', 'eight', 'ten'], answer: 'six' },
    { type: 'listen-pick', question: 'How many? 🍎🍎', options: ['two', 'one', 'three', 'four'], answer: 'two' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "How many apples? Let's count!", lineZh: '有幾顆蘋果？我們來數！' },
    { speaker: 'Polly', line: "One, two, three! Three apples!", lineZh: '一、二、三！三顆蘋果！' },
    { speaker: 'Coco', line: "How old are you?", lineZh: '你幾歲？' },
    { speaker: 'Polly', line: "I am seven! Count with me!", lineZh: '我七歲！跟我一起數！' },
  ],
};

const L3_M4: Mission = {
  id: 4, slug: 'l3-m4-numbers-2', level: 3, title: '數字 11–20', titleEn: 'Numbers 11–20', theme: '市場街・大數字塔', themeEmoji: '🔢',
  focus: '數字 eleven–twenty；句型 How many are there? There are + 數字',
  story: [
    { image: '🔢', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Bigger numbers! Eleven, twelve, thirteen!", dialogueZh: '更大的數字！十一、十二、十三！', highlightWords: ['eleven', 'twelve'], sceneEmojis: ['🔢', '🗼', '✨'], animation: 'wave' },
    { image: '⭐', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "There are twelve stars! Count them!", dialogueZh: '有十二顆星星！數數看！', highlightWords: ['twelve', 'stars'], sceneEmojis: ['⭐', '🔢', '😊'], animation: 'bounce' },
    { image: '🎈', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "...eighteen, nineteen, twenty! Twenty balloons!", dialogueZh: '…十八、十九、二十！二十顆氣球！', highlightWords: ['twenty'], sceneEmojis: ['🎈', '🔢', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can count to twenty! Amazing!", dialogueZh: '你會數到二十了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔢'], animation: 'bounce' },
  ],
  words: [
    { en: 'eleven', zh: '十一', image: '1️⃣1️⃣', phonics: '', kk: '[ɪˈlɛvən]', phonicsSound: '', exampleSentence: 'eleven cats', exampleZh: '十一隻貓' },
    { en: 'twelve', zh: '十二', image: '1️⃣2️⃣', phonics: '', kk: '[twɛlv]', phonicsSound: '', exampleSentence: 'twelve stars', exampleZh: '十二顆星星' },
    { en: 'thirteen', zh: '十三', image: '1️⃣3️⃣', phonics: '', kk: '[θɝˈtin]', phonicsSound: '', exampleSentence: 'thirteen books', exampleZh: '十三本書' },
    { en: 'fourteen', zh: '十四', image: '1️⃣4️⃣', phonics: '', kk: '[fɔrˈtin]', phonicsSound: '', exampleSentence: 'fourteen eggs', exampleZh: '十四顆蛋' },
    { en: 'fifteen', zh: '十五', image: '1️⃣5️⃣', phonics: '', kk: '[fɪfˈtin]', phonicsSound: '', exampleSentence: 'fifteen apples', exampleZh: '十五顆蘋果' },
    { en: 'sixteen', zh: '十六', image: '1️⃣6️⃣', phonics: '', kk: '[sɪksˈtin]', phonicsSound: '', exampleSentence: 'sixteen fish', exampleZh: '十六條魚' },
    { en: 'seventeen', zh: '十七', image: '1️⃣7️⃣', phonics: '', kk: '[ˌsɛvənˈtin]', phonicsSound: '', exampleSentence: 'seventeen dots', exampleZh: '十七個點' },
    { en: 'eighteen', zh: '十八', image: '1️⃣8️⃣', phonics: '', kk: '[eˈtin]', phonicsSound: '', exampleSentence: 'eighteen cars', exampleZh: '十八輛車' },
    { en: 'nineteen', zh: '十九', image: '1️⃣9️⃣', phonics: '', kk: '[naɪnˈtin]', phonicsSound: '', exampleSentence: 'nineteen pens', exampleZh: '十九支筆' },
    { en: 'twenty', zh: '二十', image: '2️⃣0️⃣', phonics: '', kk: '[ˈtwɛnti]', phonicsSound: '', exampleSentence: 'twenty balloons', exampleZh: '二十顆氣球' },
  ],
  sentences: [
    { en: 'How many are there?', zh: '有幾個？' }, { en: 'There are twelve.', zh: '有十二個。' }, { en: 'Count to twenty!', zh: '數到二十！' }, { en: 'There are fifteen apples.', zh: '有十五顆蘋果。' }, { en: 'How many stars are there?', zh: '有幾顆星星？' }, { en: 'Twenty stars.', zh: '二十顆星星。' },
  ],
  phonicsLetters: ['numbers'],
  warmUpQuestions: [
    { type: 'match', question: '「十二」的英文是？', options: ['twelve', 'twenty', 'thirteen', 'eleven'], answer: 'twelve' },
    { type: 'match', question: '「二十」的英文是？', options: ['twenty', 'twelve', 'thirteen', 'eleven'], answer: 'twenty' },
    { type: 'fill-blank', question: 'ten, eleven, ___', options: ['twelve', 'twenty', 'two', 'thirteen'], answer: 'twelve' },
  ],
  challenges: [
    { type: 'fill-blank', question: 'twelve, thirteen, ___', options: ['fourteen', 'twenty', 'ten', 'fifteen'], answer: 'fourteen' },
    { type: 'fill-blank', question: 'eighteen, nineteen, ___', options: ['twenty', 'ten', 'twelve', 'eleven'], answer: 'twenty' },
    { type: 'match', question: '配對：數字配字', options: ['11-eleven', '15-fifteen', '20-twenty', '13-thirteen'], answer: '11-eleven' },
    { type: 'fill-blank', question: 'There are ___ stars.（十二）', options: ['twelve', 'twenty', 'two', 'ten'], answer: 'twelve' },
    { type: 'listen-pick', question: '聽音選數字', options: ['1️⃣5️⃣', '1️⃣2️⃣', '2️⃣0️⃣', '1️⃣1️⃣'], answer: '1️⃣5️⃣', image: '🎧' },
    { type: 'speak', question: '數數看：Eleven, twelve, thirteen!', answer: 'Eleven', image: '🗣' },
  ],
  talkTimePrompts: ["Count from eleven to twenty!", "How many students in your class?", "How many are there? (show fingers)", "Count the stars with me!"],
  reviewQuiz: [
    { type: 'match', question: '「十五」的英文是？', options: ['fifteen', 'fifty', 'fourteen', 'sixteen'], answer: 'fifteen' },
    { type: 'fill-blank', question: 'thirteen, fourteen, ___', options: ['fifteen', 'twenty', 'ten', 'twelve'], answer: 'fifteen' },
    { type: 'fill-blank', question: 'There ___ twenty balloons.', options: ['are', 'is', 'am', 'be'], answer: 'are' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "How many stars are there?", lineZh: '有幾顆星星？' },
    { speaker: 'Polly', line: "Let's count! ...eleven, twelve! Twelve stars!", lineZh: '我們來數！…十一、十二！十二顆星星！' },
    { speaker: 'Coco', line: "And twenty balloons!", lineZh: '還有二十顆氣球！' },
    { speaker: 'Polly', line: "Wow, that's a lot! Twenty!", lineZh: '哇，好多！二十！' },
  ],
};

const L3_M5: Mission = {
  id: 5, slug: 'l3-m5-review-color-num', level: 3, title: '複習① 顏色數字', titleEn: 'Review Colors & Numbers', theme: '市場街・彩色市集', themeEmoji: '🎪',
  focus: '複習顏色＋數字；整合句型 How many ___? / What color?',
  story: [
    { image: '🎪', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Big review! Colors and numbers together!", dialogueZh: '大複習！顏色和數字一起！', highlightWords: [], sceneEmojis: ['🎪', '🌈', '🔢'], animation: 'wave' },
    { image: '🎈', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Three red balloons and two blue balloons!", dialogueZh: '三顆紅氣球和兩顆藍氣球！', highlightWords: ['Three', 'red', 'two', 'blue'], sceneEmojis: ['🎈', '🔴', '🔵'], animation: 'tada' },
    { image: '🏆', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know colors and numbers! Champion!", dialogueZh: '你會顏色和數字了！冠軍！', highlightWords: [], sceneEmojis: ['🏆', '🎉', '🎪'], animation: 'bounce' },
  ],
  words: [
    { en: 'red', zh: '紅色', image: '🔴', phonics: '', kk: '[rɛd]', phonicsSound: '', exampleSentence: 'three red apples', exampleZh: '三顆紅蘋果' },
    { en: 'blue', zh: '藍色', image: '🔵', phonics: '', kk: '[blu]', phonicsSound: '', exampleSentence: 'two blue balls', exampleZh: '兩顆藍球' },
    { en: 'green', zh: '綠色', image: '🟢', phonics: '', kk: '[ɡrin]', phonicsSound: '', exampleSentence: 'green', exampleZh: '綠色' },
    { en: 'yellow', zh: '黃色', image: '🟡', phonics: '', kk: '[ˈjɛlo]', phonicsSound: '', exampleSentence: 'yellow', exampleZh: '黃色' },
    { en: 'three', zh: '三', image: '3️⃣', phonics: '', kk: '[θri]', phonicsSound: '', exampleSentence: 'three', exampleZh: '三' },
    { en: 'five', zh: '五', image: '5️⃣', phonics: '', kk: '[faɪv]', phonicsSound: '', exampleSentence: 'five', exampleZh: '五' },
    { en: 'ten', zh: '十', image: '🔟', phonics: '', kk: '[tɛn]', phonicsSound: '', exampleSentence: 'ten', exampleZh: '十' },
    { en: 'twelve', zh: '十二', image: '1️⃣2️⃣', phonics: '', kk: '[twɛlv]', phonicsSound: '', exampleSentence: 'twelve', exampleZh: '十二' },
    { en: 'balloon', zh: '氣球', image: '🎈', phonics: '', kk: '[bəˈlun]', phonicsSound: '', exampleSentence: 'a red balloon', exampleZh: '一顆紅氣球' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'three apples', exampleZh: '三顆蘋果' },
  ],
  sentences: [
    { en: 'Three red balloons.', zh: '三顆紅氣球。' }, { en: 'How many blue balls?', zh: '有幾顆藍球？' }, { en: 'There are five.', zh: '有五顆。' }, { en: 'What color is it?', zh: '它是什麼顏色？' }, { en: 'Is it red? Yes, it is.', zh: '它是紅色的嗎？是的。' }, { en: 'I have ten yellow pens.', zh: '我有十支黃筆。' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'match', question: '🔴 是什麼顏色？', options: ['red', 'blue', 'green', 'yellow'], answer: 'red' },
    { type: 'match', question: '5️⃣ 是哪個數字？', options: ['five', 'four', 'six', 'ten'], answer: 'five' },
    { type: 'listen-pick', question: 'How many? 🎈🎈🎈', options: ['three', 'two', 'four', 'five'], answer: 'three' },
  ],
  challenges: [
    { type: 'fill-blank', question: 'There are ___ red apples. 🍎🍎🍎', options: ['three', 'two', 'five', 'ten'], answer: 'three' },
    { type: 'match', question: '配對：顏色配圖', options: ['blue-🔵', 'green-🟢', 'yellow-🟡', 'red-🔴'], answer: 'blue-🔵' },
    { type: 'fill-blank', question: 'What ___ is it? It is blue.', options: ['color', 'many', 'is', 'are'], answer: 'color' },
    { type: 'fill-blank', question: 'How ___ balls?（幾個）', options: ['many', 'color', 'much', 'old'], answer: 'many' },
    { type: 'listen-pick', question: '聽音選：two blue balloons', options: ['🎈🎈', '🎈', '🎈🎈🎈', '🍎🍎'], answer: '🎈🎈' },
    { type: 'speak', question: '跟著念：Three red apples!', answer: 'Three red apples', image: '🗣' },
  ],
  talkTimePrompts: ["How many red things can you see?", "What color is your bag?", "Count your fingers by color!", "Say: two green apples!"],
  reviewQuiz: [
    { type: 'match', question: '1️⃣2️⃣ 是哪個數字？', options: ['twelve', 'twenty', 'two', 'ten'], answer: 'twelve' },
    { type: 'fill-blank', question: 'I have ___ yellow pens.（十）', options: ['ten', 'red', 'blue', 'color'], answer: 'ten' },
    { type: 'listen-pick', question: 'How many? 🍎🍎🍎🍎🍎', options: ['five', 'four', 'three', 'six'], answer: 'five' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "Look, three red balloons and two blue!", lineZh: '看，三顆紅氣球和兩顆藍的！' },
    { speaker: 'Coco', line: "How many balloons? Five!", lineZh: '有幾顆氣球？五顆！' },
    { speaker: 'Polly', line: "What color do you like?", lineZh: '你喜歡什麼顏色？' },
    { speaker: 'Coco', line: "I like the red ones! Three, please!", lineZh: '我喜歡紅色的！三顆，謝謝！' },
  ],
};

const L3_M6: Mission = {
  id: 6, slug: 'l3-m6-food-1', level: 3, title: '食物①', titleEn: 'Food 1', theme: '市場街・美食攤', themeEmoji: '🍎',
  focus: '10 個食物單字；冠詞 a / an（a banana, an egg）',
  story: [
    { image: '🍎', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Yummy food on Market Street! Let's see!", dialogueZh: '市場街有好吃的食物！來看看！', highlightWords: ['food'], sceneEmojis: ['🍎', '🍌', '✨'], animation: 'wave' },
    { image: '🍌', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "A banana! But an egg — use 'an' before a, e, i, o, u!", dialogueZh: '一根香蕉！但 an egg —— 母音前面用 an！', highlightWords: ['a', 'an', 'egg'], sceneEmojis: ['🍌', '🥚', '😊'], animation: 'bounce' },
    { image: '🍞', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Bread, milk, rice — I'm hungry!", dialogueZh: '麵包、牛奶、米飯 —— 我餓了！', highlightWords: ['bread', 'milk', 'rice'], sceneEmojis: ['🍞', '🥛', '🍚'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Now you know food words and a/an! Great!", dialogueZh: '現在你會食物單字和 a/an 了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🍎'], animation: 'bounce' },
  ],
  words: [
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'an apple', exampleZh: '一顆蘋果' },
    { en: 'banana', zh: '香蕉', image: '🍌', phonics: '', kk: '[bəˈnænə]', phonicsSound: '', exampleSentence: 'a banana', exampleZh: '一根香蕉' },
    { en: 'rice', zh: '米飯', image: '🍚', phonics: '', kk: '[raɪs]', phonicsSound: '', exampleSentence: 'rice', exampleZh: '米飯' },
    { en: 'bread', zh: '麵包', image: '🍞', phonics: '', kk: '[brɛd]', phonicsSound: '', exampleSentence: 'bread', exampleZh: '麵包' },
    { en: 'milk', zh: '牛奶', image: '🥛', phonics: '', kk: '[mɪlk]', phonicsSound: '', exampleSentence: 'a glass of milk', exampleZh: '一杯牛奶' },
    { en: 'egg', zh: '蛋', image: '🥚', phonics: '', kk: '[ɛɡ]', phonicsSound: '', exampleSentence: 'an egg', exampleZh: '一顆蛋' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: '', kk: '[fɪʃ]', phonicsSound: '', exampleSentence: 'fish', exampleZh: '魚' },
    { en: 'meat', zh: '肉', image: '🍖', phonics: '', kk: '[mit]', phonicsSound: '', exampleSentence: 'meat', exampleZh: '肉' },
    { en: 'soup', zh: '湯', image: '🍲', phonics: '', kk: '[sup]', phonicsSound: '', exampleSentence: 'hot soup', exampleZh: '熱湯' },
    { en: 'cake', zh: '蛋糕', image: '🎂', phonics: '', kk: '[kek]', phonicsSound: '', exampleSentence: 'a cake', exampleZh: '一個蛋糕' },
  ],
  sentences: [
    { en: 'It is an apple.', zh: '這是一顆蘋果。' }, { en: 'It is a banana.', zh: '這是一根香蕉。' }, { en: 'I want bread and milk.', zh: '我要麵包和牛奶。' }, { en: 'Is it an egg?', zh: '這是一顆蛋嗎？' }, { en: 'Yes, it is.', zh: '是的。' }, { en: 'I like cake!', zh: '我喜歡蛋糕！' },
  ],
  phonicsLetters: ['food', 'a / an'],
  warmUpQuestions: [
    { type: 'match', question: '🍎 是哪個食物？', options: ['apple', 'banana', 'bread', 'egg'], answer: 'apple' },
    { type: 'fill-blank', question: '___ egg（冠詞）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'fill-blank', question: '___ banana（冠詞）', options: ['a', 'an', 'the', 'is'], answer: 'a' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的食物', options: ['🍎', '🍌', '🍞', '🥛'], answer: '🍞', image: '🎧' },
    { type: 'match', question: '配對：食物配圖', options: ['fish-🐟', 'meat-🍖', 'soup-🍲', 'cake-🎂'], answer: 'fish-🐟' },
    { type: 'fill-blank', question: 'It is ___ apple.（冠詞）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'spell', question: '拼拼看：mi _ k（牛奶）', answer: 'milk', image: '✍️' },
    { type: 'fill-blank', question: 'I want ___ egg.（冠詞）', options: ['an', 'a', 'the', 'two'], answer: 'an' },
    { type: 'speak', question: '跟著念：Apple, banana, bread!', answer: 'Apple', image: '🗣' },
  ],
  talkTimePrompts: ["What food do you like?", "Do you like rice?", "Say: a banana, an egg.", "What do you eat for breakfast?"],
  reviewQuiz: [
    { type: 'match', question: '🥚 是哪個食物？', options: ['egg', 'meat', 'soup', 'rice'], answer: 'egg' },
    { type: 'fill-blank', question: 'It is ___ orange.（冠詞）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'listen-pick', question: '哪個是 "cake" 蛋糕？', options: ['🎂', '🍞', '🍲', '🍖'], answer: '🎂' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "It's an apple and a banana!", lineZh: '這是一顆蘋果和一根香蕉！' },
    { speaker: 'Benny', line: "an apple, a banana — a or an?", lineZh: 'an apple、a banana —— a 還是 an？' },
    { speaker: 'Coco', line: "'an' before a, e, i, o, u! an egg!", lineZh: '母音前用 an！an egg！' },
    { speaker: 'Benny', line: "I want soup and bread. Yum!", lineZh: '我要湯和麵包。好吃！' },
  ],
};

const L3_M7: Mission = {
  id: 7, slug: 'l3-m7-food-2', level: 3, title: '食物② 喜好', titleEn: 'Food & Like', theme: '市場街・點餐區', themeEmoji: '🍽️',
  focus: '句型 I like / I don\'t like / Do you like…?；冠詞 the',
  story: [
    { image: '🍽️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Do you like pizza? Tell me what you like!", dialogueZh: '你喜歡披薩嗎？告訴我你喜歡什麼！', highlightWords: ['like'], sceneEmojis: ['🍽️', '🍕', '✨'], animation: 'wave' },
    { image: '🍕', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "I like pizza! I like the noodles too!", dialogueZh: '我喜歡披薩！我也喜歡那個麵！', highlightWords: ['like', 'the'], sceneEmojis: ['🍕', '🍜', '😋'], animation: 'bounce' },
    { image: '🥦', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "I don't like broccoli. Do you like it?", dialogueZh: '我不喜歡花椰菜。你喜歡嗎？', highlightWords: ["don't like"], sceneEmojis: ['🥦', '❌', '🤔'], animation: 'shake' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Now you can talk about food you like!", dialogueZh: '現在你會說你喜歡的食物了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🍽️'], animation: 'bounce' },
  ],
  words: [
    { en: 'pizza', zh: '披薩', image: '🍕', phonics: '', kk: '[ˈpitsə]', phonicsSound: '', exampleSentence: 'I like pizza.', exampleZh: '我喜歡披薩。' },
    { en: 'noodles', zh: '麵', image: '🍜', phonics: '', kk: '[ˈnudlz]', phonicsSound: '', exampleSentence: 'hot noodles', exampleZh: '熱麵' },
    { en: 'water', zh: '水', image: '💧', phonics: '', kk: '[ˈwɔtɚ]', phonicsSound: '', exampleSentence: 'cold water', exampleZh: '冷水' },
    { en: 'juice', zh: '果汁', image: '🧃', phonics: '', kk: '[dʒus]', phonicsSound: '', exampleSentence: 'apple juice', exampleZh: '蘋果汁' },
    { en: 'broccoli', zh: '花椰菜', image: '🥦', phonics: '', kk: '[ˈbrɑkəli]', phonicsSound: '', exampleSentence: 'green broccoli', exampleZh: '綠花椰菜' },
    { en: 'carrot', zh: '紅蘿蔔', image: '🥕', phonics: '', kk: '[ˈkærət]', phonicsSound: '', exampleSentence: 'an orange carrot', exampleZh: '一根橘蘿蔔' },
    { en: 'ice cream', zh: '冰淇淋', image: '🍦', phonics: '', kk: '[aɪs krim]', phonicsSound: '', exampleSentence: 'I like ice cream.', exampleZh: '我喜歡冰淇淋。' },
    { en: 'candy', zh: '糖果', image: '🍬', phonics: '', kk: '[ˈkændi]', phonicsSound: '', exampleSentence: 'sweet candy', exampleZh: '甜糖果' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'I like it.', exampleZh: '我喜歡。' },
    { en: 'eat', zh: '吃', image: '🍽️', phonics: '', kk: '[it]', phonicsSound: '', exampleSentence: 'Let\'s eat!', exampleZh: '我們來吃！' },
  ],
  sentences: [
    { en: 'I like pizza.', zh: '我喜歡披薩。' }, { en: "I don't like broccoli.", zh: '我不喜歡花椰菜。' }, { en: 'Do you like juice?', zh: '你喜歡果汁嗎？' }, { en: 'Yes, I do. / No, I don\'t.', zh: '是的。／不。' }, { en: 'Pass me the water, please.', zh: '請把水遞給我。' }, { en: 'I like the ice cream!', zh: '我喜歡那個冰淇淋！' },
  ],
  phonicsLetters: ['food', 'the'],
  warmUpQuestions: [
    { type: 'match', question: '🍕 是哪個食物？', options: ['pizza', 'noodles', 'juice', 'candy'], answer: 'pizza' },
    { type: 'listen-pick', question: 'Do you like ice cream? （你喜歡冰淇淋嗎）', options: ['Yes, I do.', 'No, I don\'t.'], answer: 'Yes, I do.', image: '🍦' },
    { type: 'fill-blank', question: 'I ___ pizza.（喜歡）', options: ['like', 'is', 'are', 'the'], answer: 'like' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的食物', options: ['🍕', '🍜', '🧃', '🥦'], answer: '🍜', image: '🎧' },
    { type: 'fill-blank', question: 'I ___ like broccoli.（不）', options: ["don't", 'not', 'no', 'am'], answer: "don't" },
    { type: 'fill-blank', question: '___ you like juice?（助動詞）', options: ['Do', 'Is', 'Are', 'The'], answer: 'Do' },
    { type: 'match', question: '配對：食物配圖', options: ['carrot-🥕', 'candy-🍬', 'water-💧', 'juice-🧃'], answer: 'carrot-🥕' },
    { type: 'fill-blank', question: 'Pass me ___ water.（冠詞）', options: ['the', 'a', 'an', 'is'], answer: 'the' },
    { type: 'speak', question: '跟著說：I like pizza!', answer: 'I like pizza', image: '🗣' },
  ],
  talkTimePrompts: ["What food do you like?", "Do you like broccoli?", "I like ___. What about you?", "Do you like ice cream or candy?"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Do you like juice? Yes, I ___.', options: ['do', 'am', 'is', 'like'], answer: 'do' },
    { type: 'match', question: '🍦 是哪個食物？', options: ['ice cream', 'candy', 'pizza', 'noodles'], answer: 'ice cream' },
    { type: 'fill-blank', question: 'I ___ like carrots.（不喜歡）', options: ["don't", 'not', 'no', 'am'], answer: "don't" },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Do you like pizza?", lineZh: '你喜歡披薩嗎？' },
    { speaker: 'Polly', line: "Yes, I do! But I don't like broccoli.", lineZh: '喜歡！但我不喜歡花椰菜。' },
    { speaker: 'Coco', line: "Do you like ice cream?", lineZh: '你喜歡冰淇淋嗎？' },
    { speaker: 'Polly', line: "Yes! I love the ice cream here!", lineZh: '喜歡！我愛這裡的冰淇淋！' },
  ],
};

const L3_M8: Mission = {
  id: 8, slug: 'l3-m8-animals-1', level: 3, title: '動物①', titleEn: 'Animals 1', theme: '市場街・寵物角', themeEmoji: '🐾',
  focus: '10 個動物單字；句型 It is a + 動物 / I have a + 動物',
  story: [
    { image: '🐾', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "So many animals! A dog, a cat, a bird!", dialogueZh: '好多動物！一隻狗、一隻貓、一隻鳥！', highlightWords: ['dog', 'cat', 'bird'], sceneEmojis: ['🐶', '🐱', '🐦'], animation: 'wave' },
    { image: '🐰', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I have a rabbit! It is white!", dialogueZh: '我有一隻兔子！牠是白色的！', highlightWords: ['rabbit'], sceneEmojis: ['🐰', '⚪', '😊'], animation: 'bounce' },
    { image: '🦁', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A lion and a tiger! Roar! They are big!", dialogueZh: '一隻獅子和一隻老虎！吼！牠們很大！', highlightWords: ['lion', 'tiger'], sceneEmojis: ['🦁', '🐯', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Now you know ten animals! Amazing!", dialogueZh: '現在你會十種動物了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🐾'], animation: 'bounce' },
  ],
  words: [
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'a big dog', exampleZh: '一隻大狗' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: '', kk: '[kæt]', phonicsSound: '', exampleSentence: 'a black cat', exampleZh: '一隻黑貓' },
    { en: 'bird', zh: '鳥', image: '🐦', phonics: '', kk: '[bɝd]', phonicsSound: '', exampleSentence: 'a little bird', exampleZh: '一隻小鳥' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: '', kk: '[fɪʃ]', phonicsSound: '', exampleSentence: 'a gold fish', exampleZh: '一條金魚' },
    { en: 'rabbit', zh: '兔子', image: '🐰', phonics: '', kk: '[ˈræbɪt]', phonicsSound: '', exampleSentence: 'a white rabbit', exampleZh: '一隻白兔' },
    { en: 'bear', zh: '熊', image: '🐻', phonics: '', kk: '[bɛr]', phonicsSound: '', exampleSentence: 'a brown bear', exampleZh: '一隻棕熊' },
    { en: 'pig', zh: '豬', image: '🐷', phonics: '', kk: '[pɪɡ]', phonicsSound: '', exampleSentence: 'a pink pig', exampleZh: '一隻粉紅豬' },
    { en: 'duck', zh: '鴨子', image: '🦆', phonics: '', kk: '[dʌk]', phonicsSound: '', exampleSentence: 'a yellow duck', exampleZh: '一隻黃鴨' },
    { en: 'lion', zh: '獅子', image: '🦁', phonics: '', kk: '[ˈlaɪən]', phonicsSound: '', exampleSentence: 'a big lion', exampleZh: '一隻大獅子' },
    { en: 'tiger', zh: '老虎', image: '🐯', phonics: '', kk: '[ˈtaɪɡɚ]', phonicsSound: '', exampleSentence: 'a strong tiger', exampleZh: '一隻強壯的老虎' },
  ],
  sentences: [
    { en: 'It is a dog.', zh: '這是一隻狗。' }, { en: 'I have a cat.', zh: '我有一隻貓。' }, { en: 'The rabbit is white.', zh: '兔子是白色的。' }, { en: 'Is it a bird?', zh: '這是一隻鳥嗎？' }, { en: 'Yes, it is a bird.', zh: '是的，這是一隻鳥。' }, { en: 'The lion is big.', zh: '獅子很大。' },
  ],
  phonicsLetters: ['animals'],
  warmUpQuestions: [
    { type: 'match', question: '🐶 是哪個動物？', options: ['dog', 'cat', 'pig', 'bird'], answer: 'dog' },
    { type: 'match', question: '🦁 是哪個動物？', options: ['lion', 'tiger', 'bear', 'cat'], answer: 'lion' },
    { type: 'listen-pick', question: '哪個是 "rabbit" 兔子？', options: ['🐰', '🐷', '🦆', '🐻'], answer: '🐰' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動物', options: ['🐶', '🐱', '🐦', '🐟'], answer: '🐦', image: '🎧' },
    { type: 'match', question: '配對：動物配圖', options: ['pig-🐷', 'duck-🦆', 'bear-🐻', 'tiger-🐯'], answer: 'pig-🐷' },
    { type: 'spell', question: '拼拼看：d _ g（狗）', answer: 'dog', image: '✍️' },
    { type: 'fill-blank', question: 'It is ___ cat.（冠詞）', options: ['a', 'an', 'the', 'is'], answer: 'a' },
    { type: 'fill-blank', question: 'The ___ is big.（獅子）', options: ['lion', 'bird', 'fish', 'duck'], answer: 'lion' },
    { type: 'speak', question: '跟著念：Dog, cat, bird!', answer: 'Dog', image: '🗣' },
  ],
  talkTimePrompts: ["What is your favorite animal?", "Do you have a pet?", "Can you make a lion sound?", "Point to a bird!"],
  reviewQuiz: [
    { type: 'match', question: '🐻 是哪個動物？', options: ['bear', 'pig', 'dog', 'lion'], answer: 'bear' },
    { type: 'fill-blank', question: 'I have ___ dog.（冠詞）', options: ['a', 'an', 'the', 'is'], answer: 'a' },
    { type: 'listen-pick', question: '哪個是 "tiger" 老虎？', options: ['🐯', '🦁', '🐻', '🐷'], answer: '🐯' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I have a white rabbit! Do you have a pet?", lineZh: '我有一隻白兔！你有寵物嗎？' },
    { speaker: 'Benny', line: "Yes! I have a big dog and a cat.", lineZh: '有！我有一隻大狗和一隻貓。' },
    { speaker: 'Coco', line: "Look, a lion and a tiger!", lineZh: '看，一隻獅子和一隻老虎！' },
    { speaker: 'Benny', line: "Roar! They are so big!", lineZh: '吼！牠們好大！' },
  ],
};

const L3_M9: Mission = {
  id: 9, slug: 'l3-m9-animals-2', level: 3, title: '動物② 複數', titleEn: 'Animals & Plurals', theme: '市場街・動物農場', themeEmoji: '🐔',
  focus: '名詞複數 -s（two dogs）；句型 How many? / They are…',
  story: [
    { image: '🐔', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "One dog, two dogs! Add -s for more!", dialogueZh: '一隻狗，兩隻狗！多的加 -s！', highlightWords: ['dogs', '-s'], sceneEmojis: ['🐶', '🐶', '✨'], animation: 'wave' },
    { image: '🐱', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Three cats! They are black.", dialogueZh: '三隻貓！牠們是黑色的。', highlightWords: ['cats', 'They'], sceneEmojis: ['🐱', '🐱', '🐱'], animation: 'bounce' },
    { image: '🦆', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "How many ducks? Five ducks!", dialogueZh: '有幾隻鴨子？五隻鴨子！', highlightWords: ['ducks'], sceneEmojis: ['🦆', '🔢', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "One or many — you can say both! Great!", dialogueZh: '一個或很多 —— 你都會說了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🐔'], animation: 'bounce' },
  ],
  words: [
    { en: 'dogs', zh: '狗（複數）', image: '🐶', phonics: '', kk: '[dɔɡz]', phonicsSound: '', exampleSentence: 'two dogs', exampleZh: '兩隻狗' },
    { en: 'cats', zh: '貓（複數）', image: '🐱', phonics: '', kk: '[kæts]', phonicsSound: '', exampleSentence: 'three cats', exampleZh: '三隻貓' },
    { en: 'birds', zh: '鳥（複數）', image: '🐦', phonics: '', kk: '[bɝdz]', phonicsSound: '', exampleSentence: 'four birds', exampleZh: '四隻鳥' },
    { en: 'ducks', zh: '鴨（複數）', image: '🦆', phonics: '', kk: '[dʌks]', phonicsSound: '', exampleSentence: 'five ducks', exampleZh: '五隻鴨' },
    { en: 'pigs', zh: '豬（複數）', image: '🐷', phonics: '', kk: '[pɪɡz]', phonicsSound: '', exampleSentence: 'two pigs', exampleZh: '兩隻豬' },
    { en: 'rabbits', zh: '兔（複數）', image: '🐰', phonics: '', kk: '[ˈræbɪts]', phonicsSound: '', exampleSentence: 'six rabbits', exampleZh: '六隻兔' },
    { en: 'cows', zh: '牛（複數）', image: '🐮', phonics: '', kk: '[kaʊz]', phonicsSound: '', exampleSentence: 'two cows', exampleZh: '兩隻牛' },
    { en: 'hens', zh: '母雞（複數）', image: '🐔', phonics: '', kk: '[hɛnz]', phonicsSound: '', exampleSentence: 'ten hens', exampleZh: '十隻母雞' },
    { en: 'sheep', zh: '綿羊（單複同）', image: '🐑', phonics: '', kk: '[ʃip]', phonicsSound: '', exampleSentence: 'three sheep', exampleZh: '三隻綿羊' },
    { en: 'horses', zh: '馬（複數）', image: '🐴', phonics: '', kk: '[ˈhɔrsɪz]', phonicsSound: '', exampleSentence: 'two horses', exampleZh: '兩匹馬' },
  ],
  sentences: [
    { en: 'One dog, two dogs.', zh: '一隻狗，兩隻狗。' }, { en: 'They are cats.', zh: '牠們是貓。' }, { en: 'How many ducks?', zh: '有幾隻鴨子？' }, { en: 'There are five ducks.', zh: '有五隻鴨子。' }, { en: 'Are they pigs?', zh: '牠們是豬嗎？' }, { en: 'Yes, they are.', zh: '是的，牠們是。' },
  ],
  phonicsLetters: ['plurals -s'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'one cat, two ___', options: ['cats', 'cat', 'cates', 'cat s'], answer: 'cats' },
    { type: 'listen-pick', question: 'How many? 🐶🐶', options: ['two dogs', 'one dog', 'three dogs', 'a dog'], answer: 'two dogs' },
    { type: 'match', question: '🐮 是哪個動物（複數）？', options: ['cows', 'pigs', 'hens', 'ducks'], answer: 'cows' },
  ],
  challenges: [
    { type: 'fill-blank', question: 'three ___（貓複數）', options: ['cats', 'cat', 'cates', 'catz'], answer: 'cats' },
    { type: 'fill-blank', question: 'They ___ ducks.（be動詞）', options: ['are', 'is', 'am', 'a'], answer: 'are' },
    { type: 'fill-blank', question: 'How ___ birds?（幾隻）', options: ['many', 'much', 'color', 'old'], answer: 'many' },
    { type: 'match', question: '配對：複數配圖', options: ['pigs-🐷', 'hens-🐔', 'horses-🐴', 'sheep-🐑'], answer: 'pigs-🐷' },
    { type: 'listen-pick', question: 'How many? 🦆🦆🦆🦆🦆', options: ['five ducks', 'four ducks', 'three ducks', 'six ducks'], answer: 'five ducks' },
    { type: 'speak', question: '跟著念：Two dogs, three cats!', answer: 'Two dogs', image: '🗣' },
  ],
  talkTimePrompts: ["How many pets do you have?", "Count the animals: two ___, three ___.", "Are they cats or dogs?", "How many students are girls?"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'one duck, two ___', options: ['ducks', 'duck', 'duckes', ' duck'], answer: 'ducks' },
    { type: 'fill-blank', question: 'How many cats? ___ are three.', options: ['There', 'They', 'It', 'Is'], answer: 'There' },
    { type: 'match', question: '🐑 綿羊複數是？', options: ['sheep', 'sheeps', 'sheepes', 'ship'], answer: 'sheep' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "One dog, two dogs, three dogs!", lineZh: '一隻狗、兩隻狗、三隻狗！' },
    { speaker: 'Polly', line: "Add -s for more! dogs, cats, ducks!", lineZh: '多的加 -s！dogs、cats、ducks！' },
    { speaker: 'Coco', line: "How many ducks are there?", lineZh: '有幾隻鴨子？' },
    { speaker: 'Polly', line: "Five ducks! They are yellow!", lineZh: '五隻鴨子！牠們是黃色的！' },
  ],
};

const L3_M10: Mission = {
  id: 10, slug: 'l3-m10-review-food-animal', level: 3, title: '複習② 食物動物', titleEn: 'Review Food & Animals', theme: '市場街・熱鬧市集', themeEmoji: '🎪',
  focus: '複習食物＋動物＋冠詞＋複數＋Do you like…?',
  story: [
    { image: '🎪', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Review time! Food and animals!", dialogueZh: '複習時間！食物和動物！', highlightWords: [], sceneEmojis: ['🎪', '🍎', '🐾'], animation: 'wave' },
    { image: '🐶', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Two dogs like meat. Do you like meat?", dialogueZh: '兩隻狗喜歡肉。你喜歡肉嗎？', highlightWords: ['dogs', 'meat', 'like'], sceneEmojis: ['🐶', '🍖', '❓'], animation: 'tada' },
    { image: '🏆', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know so many words now! Champion!", dialogueZh: '你會好多單字了！冠軍！', highlightWords: [], sceneEmojis: ['🏆', '🎉', '🎪'], animation: 'bounce' },
  ],
  words: [
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'an apple', exampleZh: '一顆蘋果' },
    { en: 'egg', zh: '蛋', image: '🥚', phonics: '', kk: '[ɛɡ]', phonicsSound: '', exampleSentence: 'an egg', exampleZh: '一顆蛋' },
    { en: 'cake', zh: '蛋糕', image: '🎂', phonics: '', kk: '[kek]', phonicsSound: '', exampleSentence: 'a cake', exampleZh: '一個蛋糕' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'two dogs', exampleZh: '兩隻狗' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: '', kk: '[kæt]', phonicsSound: '', exampleSentence: 'a cat', exampleZh: '一隻貓' },
    { en: 'lion', zh: '獅子', image: '🦁', phonics: '', kk: '[ˈlaɪən]', phonicsSound: '', exampleSentence: 'a lion', exampleZh: '一隻獅子' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: '', kk: '[fɪʃ]', phonicsSound: '', exampleSentence: 'fish', exampleZh: '魚' },
    { en: 'milk', zh: '牛奶', image: '🥛', phonics: '', kk: '[mɪlk]', phonicsSound: '', exampleSentence: 'milk', exampleZh: '牛奶' },
    { en: 'rabbit', zh: '兔子', image: '🐰', phonics: '', kk: '[ˈræbɪt]', phonicsSound: '', exampleSentence: 'a rabbit', exampleZh: '一隻兔子' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'I like it.', exampleZh: '我喜歡。' },
  ],
  sentences: [
    { en: 'I like apples and cake.', zh: '我喜歡蘋果和蛋糕。' }, { en: 'The two dogs like meat.', zh: '這兩隻狗喜歡肉。' }, { en: 'Do you like fish?', zh: '你喜歡魚嗎？' }, { en: 'Yes, I do.', zh: '是的。' }, { en: 'Is it an egg?', zh: '這是一顆蛋嗎？' }, { en: 'How many cats?', zh: '有幾隻貓？' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'match', question: '🦁 是哪個？', options: ['lion', 'dog', 'cat', 'fish'], answer: 'lion' },
    { type: 'fill-blank', question: '___ egg（冠詞）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'fill-blank', question: 'two ___（狗複數）', options: ['dogs', 'dog', 'doges', 'dogz'], answer: 'dogs' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🍎', '🐶', '🦁', '🐟'], answer: '🦁', image: '🎧' },
    { type: 'fill-blank', question: 'Do you ___ fish?（喜歡）', options: ['like', 'is', 'are', 'a'], answer: 'like' },
    { type: 'fill-blank', question: 'It is ___ apple.（冠詞）', options: ['an', 'a', 'the', 'two'], answer: 'an' },
    { type: 'match', question: '配對：字配圖', options: ['cake-🎂', 'milk-🥛', 'rabbit-🐰', 'cat-🐱'], answer: 'cake-🎂' },
    { type: 'fill-blank', question: 'The two dogs ___ meat.（喜歡）', options: ['like', 'likes', 'liking', 'is'], answer: 'like' },
    { type: 'speak', question: '跟著說：I like cake and apples!', answer: 'I like cake', image: '🗣' },
  ],
  talkTimePrompts: ["What food and animals do you like?", "Do you like fish? (food or pet!)", "How many pets do you want?", "Say: I like ___ and ___."],
  reviewQuiz: [
    { type: 'match', question: '🥛 是哪個？', options: ['milk', 'juice', 'water', 'soup'], answer: 'milk' },
    { type: 'fill-blank', question: 'I have two ___.（貓複數）', options: ['cats', 'cat', 'a cat', 'cates'], answer: 'cats' },
    { type: 'fill-blank', question: 'Do you like cake? Yes, I ___.', options: ['do', 'am', 'is', 'like'], answer: 'do' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "My two dogs like meat. Do you like meat?", lineZh: '我的兩隻狗喜歡肉。你喜歡肉嗎？' },
    { speaker: 'Coco', line: "No, I don't. I like apples and cake!", lineZh: '不喜歡。我喜歡蘋果和蛋糕！' },
    { speaker: 'Polly', line: "Is it an egg or an apple?", lineZh: '這是蛋還是蘋果？' },
    { speaker: 'Coco', line: "It's an apple! Yum!", lineZh: '是蘋果！好吃！' },
  ],
};

const L3_M11: Mission = {
  id: 11, slug: 'l3-m11-body', level: 3, title: '身體部位', titleEn: 'Body', theme: '市場街・健康站', themeEmoji: '🧍',
  focus: '10 個身體部位；句型 This is my… / I have two…',
  story: [
    { image: '🧍', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Touch your head! This is my head!", dialogueZh: '摸摸你的頭！這是我的頭！', highlightWords: ['head'], sceneEmojis: ['🧍', '👆', '✨'], animation: 'wave' },
    { image: '👀', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I have two eyes and one nose!", dialogueZh: '我有兩隻眼睛和一個鼻子！', highlightWords: ['eyes', 'nose'], sceneEmojis: ['👀', '👃', '😊'], animation: 'bounce' },
    { image: '✋', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Two hands, two feet, two arms, two legs!", dialogueZh: '兩隻手、兩隻腳、兩隻手臂、兩條腿！', highlightWords: ['hands', 'feet', 'arms', 'legs'], sceneEmojis: ['✋', '🦶', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know your body parts! Great!", dialogueZh: '你會身體部位了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🧍'], animation: 'bounce' },
  ],
  words: [
    { en: 'head', zh: '頭', image: '🧠', phonics: '', kk: '[hɛd]', phonicsSound: '', exampleSentence: 'my head', exampleZh: '我的頭' },
    { en: 'hand', zh: '手', image: '✋', phonics: '', kk: '[hænd]', phonicsSound: '', exampleSentence: 'two hands', exampleZh: '兩隻手' },
    { en: 'foot', zh: '腳', image: '🦶', phonics: '', kk: '[fʊt]', phonicsSound: '', exampleSentence: 'my foot', exampleZh: '我的腳' },
    { en: 'eye', zh: '眼睛', image: '👁️', phonics: '', kk: '[aɪ]', phonicsSound: '', exampleSentence: 'two eyes', exampleZh: '兩隻眼睛' },
    { en: 'ear', zh: '耳朵', image: '👂', phonics: '', kk: '[ɪr]', phonicsSound: '', exampleSentence: 'two ears', exampleZh: '兩隻耳朵' },
    { en: 'nose', zh: '鼻子', image: '👃', phonics: '', kk: '[noz]', phonicsSound: '', exampleSentence: 'my nose', exampleZh: '我的鼻子' },
    { en: 'mouth', zh: '嘴巴', image: '👄', phonics: '', kk: '[maʊθ]', phonicsSound: '', exampleSentence: 'my mouth', exampleZh: '我的嘴巴' },
    { en: 'hair', zh: '頭髮', image: '💇', phonics: '', kk: '[hɛr]', phonicsSound: '', exampleSentence: 'black hair', exampleZh: '黑頭髮' },
    { en: 'arm', zh: '手臂', image: '💪', phonics: '', kk: '[ɑrm]', phonicsSound: '', exampleSentence: 'two arms', exampleZh: '兩隻手臂' },
    { en: 'leg', zh: '腿', image: '🦵', phonics: '', kk: '[lɛɡ]', phonicsSound: '', exampleSentence: 'two legs', exampleZh: '兩條腿' },
  ],
  sentences: [
    { en: 'This is my head.', zh: '這是我的頭。' }, { en: 'I have two eyes.', zh: '我有兩隻眼睛。' }, { en: 'Touch your nose!', zh: '摸摸你的鼻子！' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'It is my ear.', zh: '這是我的耳朵。' }, { en: 'How many hands do you have?', zh: '你有幾隻手？' },
  ],
  phonicsLetters: ['body'],
  warmUpQuestions: [
    { type: 'match', question: '👃 是哪個部位？', options: ['nose', 'eye', 'ear', 'mouth'], answer: 'nose' },
    { type: 'match', question: '✋ 是哪個部位？', options: ['hand', 'foot', 'arm', 'leg'], answer: 'hand' },
    { type: 'listen-pick', question: '哪個是 "eye" 眼睛？', options: ['👁️', '👂', '👃', '👄'], answer: '👁️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的部位', options: ['🧠', '✋', '🦶', '👂'], answer: '👂', image: '🎧' },
    { type: 'match', question: '配對：部位配圖', options: ['nose-👃', 'mouth-👄', 'arm-💪', 'leg-🦵'], answer: 'nose-👃' },
    { type: 'fill-blank', question: 'I have two ___.（眼睛）', options: ['eyes', 'eye', 'nose', 'head'], answer: 'eyes' },
    { type: 'spell', question: '拼拼看：h _ nd（手）', answer: 'hand', image: '✍️' },
    { type: 'fill-blank', question: 'This is my ___.（頭）', options: ['head', 'hand', 'foot', 'ear'], answer: 'head' },
    { type: 'speak', question: '跟著念：Head, hand, eye!', answer: 'Head', image: '🗣' },
  ],
  talkTimePrompts: ["Touch your nose!", "How many eyes do you have?", "Point to your ears!", "This is my ___. (point to body parts)"],
  reviewQuiz: [
    { type: 'match', question: '👂 是哪個部位？', options: ['ear', 'eye', 'nose', 'mouth'], answer: 'ear' },
    { type: 'fill-blank', question: 'I have two ___.（腿）', options: ['legs', 'leg', 'arm', 'head'], answer: 'legs' },
    { type: 'listen-pick', question: '哪個是 "mouth" 嘴巴？', options: ['👄', '👃', '👁️', '👂'], answer: '👄' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Touch your head! Now your nose!", lineZh: '摸摸你的頭！現在鼻子！' },
    { speaker: 'Benny', line: "head, nose — I know them!", lineZh: 'head、nose —— 我都認得！' },
    { speaker: 'Coco', line: "How many eyes do you have?", lineZh: '你有幾隻眼睛？' },
    { speaker: 'Benny', line: "I have two eyes and two ears!", lineZh: '我有兩隻眼睛和兩隻耳朵！' },
  ],
};

const L3_M12: Mission = {
  id: 12, slug: 'l3-m12-family', level: 3, title: '家人', titleEn: 'Family', theme: '市場街・全家福', themeEmoji: '👨‍👩‍👧',
  focus: '10 個家人稱謂；句型 This is my… / Who is he/she?',
  story: [
    { image: '👨‍👩‍👧', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "This is my family! Mom, Dad, and me!", dialogueZh: '這是我的家人！媽媽、爸爸和我！', highlightWords: ['family', 'Mom', 'Dad'], sceneEmojis: ['👨‍👩‍👧', '❤️', '✨'], animation: 'wave' },
    { image: '👦', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Who is he? He is my brother!", dialogueZh: '他是誰？他是我哥哥！', highlightWords: ['Who', 'brother'], sceneEmojis: ['👦', '❓', '😊'], animation: 'bounce' },
    { image: '👵', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "This is my grandma and grandpa!", dialogueZh: '這是我的奶奶和爺爺！', highlightWords: ['grandma', 'grandpa'], sceneEmojis: ['👵', '👴', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can talk about your family! Great!", dialogueZh: '你會介紹你的家人了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '❤️'], animation: 'bounce' },
  ],
  words: [
    { en: 'mom', zh: '媽媽', image: '👩', phonics: '', kk: '[mɑm]', phonicsSound: '', exampleSentence: 'my mom', exampleZh: '我的媽媽' },
    { en: 'dad', zh: '爸爸', image: '👨', phonics: '', kk: '[dæd]', phonicsSound: '', exampleSentence: 'my dad', exampleZh: '我的爸爸' },
    { en: 'brother', zh: '哥哥/弟弟', image: '👦', phonics: '', kk: '[ˈbrʌðɚ]', phonicsSound: '', exampleSentence: 'my brother', exampleZh: '我的兄弟' },
    { en: 'sister', zh: '姊姊/妹妹', image: '👧', phonics: '', kk: '[ˈsɪstɚ]', phonicsSound: '', exampleSentence: 'my sister', exampleZh: '我的姊妹' },
    { en: 'baby', zh: '寶寶', image: '👶', phonics: '', kk: '[ˈbebi]', phonicsSound: '', exampleSentence: 'a cute baby', exampleZh: '一個可愛寶寶' },
    { en: 'grandma', zh: '奶奶', image: '👵', phonics: '', kk: '[ˈɡrænmɑ]', phonicsSound: '', exampleSentence: 'my grandma', exampleZh: '我的奶奶' },
    { en: 'grandpa', zh: '爺爺', image: '👴', phonics: '', kk: '[ˈɡrænpɑ]', phonicsSound: '', exampleSentence: 'my grandpa', exampleZh: '我的爺爺' },
    { en: 'family', zh: '家庭', image: '👨‍👩‍👧', phonics: '', kk: '[ˈfæməli]', phonicsSound: '', exampleSentence: 'my family', exampleZh: '我的家庭' },
    { en: 'aunt', zh: '阿姨/姑姑', image: '👩‍🦰', phonics: '', kk: '[ænt]', phonicsSound: '', exampleSentence: 'my aunt', exampleZh: '我的阿姨' },
    { en: 'uncle', zh: '叔叔/舅舅', image: '🧔', phonics: '', kk: '[ˈʌŋkl]', phonicsSound: '', exampleSentence: 'my uncle', exampleZh: '我的叔叔' },
  ],
  sentences: [
    { en: 'This is my mom.', zh: '這是我的媽媽。' }, { en: 'He is my brother.', zh: '他是我的兄弟。' }, { en: 'Who is she?', zh: '她是誰？' }, { en: 'She is my sister.', zh: '她是我的姊妹。' }, { en: 'I love my family.', zh: '我愛我的家人。' }, { en: 'Is he your dad?', zh: '他是你爸爸嗎？' },
  ],
  phonicsLetters: ['family'],
  warmUpQuestions: [
    { type: 'match', question: '👩 是誰？', options: ['mom', 'dad', 'sister', 'baby'], answer: 'mom' },
    { type: 'match', question: '👴 是誰？', options: ['grandpa', 'grandma', 'uncle', 'dad'], answer: 'grandpa' },
    { type: 'fill-blank', question: 'This is ___ mom.（我的）', options: ['my', 'a', 'the', 'is'], answer: 'my' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的家人', options: ['👩', '👨', '👦', '👧'], answer: '👦', image: '🎧' },
    { type: 'match', question: '配對：家人配圖', options: ['baby-👶', 'grandma-👵', 'sister-👧', 'dad-👨'], answer: 'baby-👶' },
    { type: 'fill-blank', question: 'He is my ___.（哥哥）', options: ['brother', 'sister', 'mom', 'aunt'], answer: 'brother' },
    { type: 'fill-blank', question: '___ is she? She is my sister.（誰）', options: ['Who', 'What', 'Is', 'The'], answer: 'Who' },
    { type: 'spell', question: '拼拼看：m _ m（媽媽）', answer: 'mom', image: '✍️' },
    { type: 'speak', question: '跟著說：This is my mom!', answer: 'This is my mom', image: '🗣' },
  ],
  talkTimePrompts: ["Who is in your family?", "Do you have a brother or sister?", "This is my ___. (introduce family)", "How many people in your family?"],
  reviewQuiz: [
    { type: 'match', question: '👧 是誰？', options: ['sister', 'brother', 'mom', 'baby'], answer: 'sister' },
    { type: 'fill-blank', question: 'She is my ___.（奶奶）', options: ['grandma', 'grandpa', 'uncle', 'dad'], answer: 'grandma' },
    { type: 'fill-blank', question: 'Is he your dad? Yes, he ___.', options: ['is', 'are', 'am', 'do'], answer: 'is' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "This is my family. This is my mom and dad.", lineZh: '這是我的家人。這是我媽媽和爸爸。' },
    { speaker: 'Benny', line: "Who is he?", lineZh: '他是誰？' },
    { speaker: 'Coco', line: "He is my brother! And she is my sister.", lineZh: '他是我哥哥！她是我姊姊。' },
    { speaker: 'Benny', line: "I love my family too!", lineZh: '我也愛我的家人！' },
  ],
};

const L3_M13: Mission = {
  id: 13, slug: 'l3-m13-clothes', level: 3, title: '衣服', titleEn: 'Clothes', theme: '市場街・服飾店', themeEmoji: '👕',
  focus: '10 個衣物；句型 I wear… / Put on your… / 顏色+衣物',
  story: [
    { image: '👕', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "New clothes! I wear a red shirt!", dialogueZh: '新衣服！我穿一件紅襯衫！', highlightWords: ['wear', 'shirt'], sceneEmojis: ['👕', '🔴', '✨'], animation: 'wave' },
    { image: '👟', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Put on your shoes and socks!", dialogueZh: '穿上你的鞋子和襪子！', highlightWords: ['shoes', 'socks'], sceneEmojis: ['👟', '🧦', '😊'], animation: 'bounce' },
    { image: '🧥', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "It's cold! Wear a coat and a hat!", dialogueZh: '好冷！穿外套戴帽子！', highlightWords: ['coat', 'hat'], sceneEmojis: ['🧥', '🧢', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know clothes words! Looking good!", dialogueZh: '你會衣服單字了！很好看！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '👕'], animation: 'bounce' },
  ],
  words: [
    { en: 'shirt', zh: '襯衫', image: '👕', phonics: '', kk: '[ʃɝt]', phonicsSound: '', exampleSentence: 'a red shirt', exampleZh: '一件紅襯衫' },
    { en: 'pants', zh: '褲子', image: '👖', phonics: '', kk: '[pænts]', phonicsSound: '', exampleSentence: 'blue pants', exampleZh: '藍褲子' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: '', kk: '[hæt]', phonicsSound: '', exampleSentence: 'a hat', exampleZh: '一頂帽子' },
    { en: 'shoes', zh: '鞋子', image: '👟', phonics: '', kk: '[ʃuz]', phonicsSound: '', exampleSentence: 'new shoes', exampleZh: '新鞋子' },
    { en: 'coat', zh: '外套', image: '🧥', phonics: '', kk: '[kot]', phonicsSound: '', exampleSentence: 'a warm coat', exampleZh: '一件暖外套' },
    { en: 'dress', zh: '洋裝', image: '👗', phonics: '', kk: '[drɛs]', phonicsSound: '', exampleSentence: 'a pink dress', exampleZh: '一件粉紅洋裝' },
    { en: 'socks', zh: '襪子', image: '🧦', phonics: '', kk: '[sɑks]', phonicsSound: '', exampleSentence: 'red socks', exampleZh: '紅襪子' },
    { en: 'skirt', zh: '裙子', image: '👚', phonics: '', kk: '[skɝt]', phonicsSound: '', exampleSentence: 'a blue skirt', exampleZh: '一件藍裙' },
    { en: 'cap', zh: '鴨舌帽', image: '🧢', phonics: '', kk: '[kæp]', phonicsSound: '', exampleSentence: 'a green cap', exampleZh: '一頂綠帽' },
    { en: 'gloves', zh: '手套', image: '🧤', phonics: '', kk: '[ɡlʌvz]', phonicsSound: '', exampleSentence: 'warm gloves', exampleZh: '暖手套' },
  ],
  sentences: [
    { en: 'I wear a red shirt.', zh: '我穿一件紅襯衫。' }, { en: 'Put on your shoes.', zh: '穿上你的鞋子。' }, { en: 'It is a pink dress.', zh: '這是一件粉紅洋裝。' }, { en: 'Is it a hat?', zh: '這是一頂帽子嗎？' }, { en: 'Yes, it is.', zh: '是的。' }, { en: 'What color is your coat?', zh: '你的外套是什麼顏色？' },
  ],
  phonicsLetters: ['clothes'],
  warmUpQuestions: [
    { type: 'match', question: '👕 是哪個衣物？', options: ['shirt', 'pants', 'hat', 'shoes'], answer: 'shirt' },
    { type: 'match', question: '👟 是哪個衣物？', options: ['shoes', 'socks', 'coat', 'dress'], answer: 'shoes' },
    { type: 'listen-pick', question: '哪個是 "dress" 洋裝？', options: ['👗', '👖', '🧥', '🧦'], answer: '👗' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的衣物', options: ['👕', '👖', '🎩', '👟'], answer: '👖', image: '🎧' },
    { type: 'match', question: '配對：衣物配圖', options: ['coat-🧥', 'socks-🧦', 'cap-🧢', 'gloves-🧤'], answer: 'coat-🧥' },
    { type: 'fill-blank', question: 'I ___ a red shirt.（穿）', options: ['wear', 'is', 'have', 'like'], answer: 'wear' },
    { type: 'spell', question: '拼拼看：h _ t（帽子）', answer: 'hat', image: '✍️' },
    { type: 'fill-blank', question: 'Put on your ___.（鞋子）', options: ['shoes', 'shoe', 'hat', 'coat'], answer: 'shoes' },
    { type: 'speak', question: '跟著念：Shirt, pants, shoes!', answer: 'Shirt', image: '🗣' },
  ],
  talkTimePrompts: ["What are you wearing today?", "What color is your shirt?", "Do you like hats?", "Put on your shoes! (act it out)"],
  reviewQuiz: [
    { type: 'match', question: '🧥 是哪個衣物？', options: ['coat', 'dress', 'skirt', 'cap'], answer: 'coat' },
    { type: 'fill-blank', question: 'It is a ___ dress.（粉紅）', options: ['pink', 'shoe', 'hat', 'wear'], answer: 'pink' },
    { type: 'listen-pick', question: '哪個是 "socks" 襪子？', options: ['🧦', '👟', '🧤', '🧢'], answer: '🧦' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I wear a red shirt and blue pants!", lineZh: '我穿紅襯衫和藍褲子！' },
    { speaker: 'Benny', line: "It's cold! Put on your coat!", lineZh: '好冷！穿上你的外套！' },
    { speaker: 'Coco', line: "And a hat and gloves!", lineZh: '還有帽子和手套！' },
    { speaker: 'Benny', line: "Now I'm warm! Let's go!", lineZh: '現在我暖了！走吧！' },
  ],
};

const L3_M14: Mission = {
  id: 14, slug: 'l3-m14-toys', level: 3, title: '玩具與文具', titleEn: 'Toys & School Things', theme: '市場街・玩具文具攤', themeEmoji: '🧸',
  focus: '10 個玩具/文具；句型 Whose…? It is my… / 冠詞複習',
  story: [
    { image: '🧸', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Toys and school things! A ball, a doll!", dialogueZh: '玩具和文具！一顆球、一個娃娃！', highlightWords: ['ball', 'doll'], sceneEmojis: ['⚽', '🧸', '✨'], animation: 'wave' },
    { image: '📖', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Whose book is this? It is my book!", dialogueZh: '這是誰的書？這是我的書！', highlightWords: ['Whose', 'book'], sceneEmojis: ['📖', '❓', '😊'], animation: 'bounce' },
    { image: '🖊️', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A pen, a pencil, a ruler — for school!", dialogueZh: '一支筆、一支鉛筆、一把尺 —— 上學用！', highlightWords: ['pen', 'pencil', 'ruler'], sceneEmojis: ['🖊️', '✏️', '📏'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know toys and school things! Great!", dialogueZh: '你會玩具和文具了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🧸'], animation: 'bounce' },
  ],
  words: [
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'a red ball', exampleZh: '一顆紅球' },
    { en: 'doll', zh: '娃娃', image: '🧸', phonics: '', kk: '[dɑl]', phonicsSound: '', exampleSentence: 'a cute doll', exampleZh: '一個可愛娃娃' },
    { en: 'car', zh: '玩具車', image: '🚗', phonics: '', kk: '[kɑr]', phonicsSound: '', exampleSentence: 'a toy car', exampleZh: '一輛玩具車' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'a book', exampleZh: '一本書' },
    { en: 'pen', zh: '筆', image: '🖊️', phonics: '', kk: '[pɛn]', phonicsSound: '', exampleSentence: 'a blue pen', exampleZh: '一支藍筆' },
    { en: 'pencil', zh: '鉛筆', image: '✏️', phonics: '', kk: '[ˈpɛnsl]', phonicsSound: '', exampleSentence: 'a pencil', exampleZh: '一支鉛筆' },
    { en: 'ruler', zh: '尺', image: '📏', phonics: '', kk: '[ˈrulɚ]', phonicsSound: '', exampleSentence: 'a ruler', exampleZh: '一把尺' },
    { en: 'bag', zh: '書包', image: '🎒', phonics: '', kk: '[bæɡ]', phonicsSound: '', exampleSentence: 'my bag', exampleZh: '我的書包' },
    { en: 'robot', zh: '機器人', image: '🤖', phonics: '', kk: '[ˈrobɑt]', phonicsSound: '', exampleSentence: 'a cool robot', exampleZh: '一個酷機器人' },
    { en: 'kite', zh: '風箏', image: '🪁', phonics: '', kk: '[kaɪt]', phonicsSound: '', exampleSentence: 'a big kite', exampleZh: '一個大風箏' },
  ],
  sentences: [
    { en: 'It is my ball.', zh: '這是我的球。' }, { en: 'Whose book is this?', zh: '這是誰的書？' }, { en: 'It is my book.', zh: '這是我的書。' }, { en: 'I have a robot.', zh: '我有一個機器人。' }, { en: 'Is it your bag?', zh: '這是你的書包嗎？' }, { en: 'Yes, it is my bag.', zh: '是的，這是我的書包。' },
  ],
  phonicsLetters: ['toys'],
  warmUpQuestions: [
    { type: 'match', question: '⚽ 是哪個？', options: ['ball', 'doll', 'car', 'book'], answer: 'ball' },
    { type: 'match', question: '✏️ 是哪個？', options: ['pencil', 'pen', 'ruler', 'book'], answer: 'pencil' },
    { type: 'listen-pick', question: '哪個是 "robot" 機器人？', options: ['🤖', '🧸', '🚗', '🪁'], answer: '🤖' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的東西', options: ['⚽', '🧸', '🚗', '📖'], answer: '🧸', image: '🎧' },
    { type: 'match', question: '配對：東西配圖', options: ['pen-🖊️', 'ruler-📏', 'bag-🎒', 'kite-🪁'], answer: 'pen-🖊️' },
    { type: 'fill-blank', question: '___ book is this?（誰的）', options: ['Whose', 'Who', 'What', 'Is'], answer: 'Whose' },
    { type: 'spell', question: '拼拼看：b _ ll（球）', answer: 'ball', image: '✍️' },
    { type: 'fill-blank', question: 'It is ___ book.（我的）', options: ['my', 'a', 'an', 'is'], answer: 'my' },
    { type: 'speak', question: '跟著念：Ball, doll, book!', answer: 'Ball', image: '🗣' },
  ],
  talkTimePrompts: ["What toys do you have?", "What is in your school bag?", "Whose pencil is this?", "What is your favorite toy?"],
  reviewQuiz: [
    { type: 'match', question: '📏 是哪個？', options: ['ruler', 'pen', 'pencil', 'book'], answer: 'ruler' },
    { type: 'fill-blank', question: 'Is it your bag? Yes, it ___ my bag.', options: ['is', 'are', 'am', 'do'], answer: 'is' },
    { type: 'listen-pick', question: '哪個是 "kite" 風箏？', options: ['🪁', '🤖', '🎒', '🚗'], answer: '🪁' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Whose book is this?", lineZh: '這是誰的書？' },
    { speaker: 'Benny', line: "It is my book! And this is my pen.", lineZh: '這是我的書！這是我的筆。' },
    { speaker: 'Coco', line: "Wow, a robot! Is it yours?", lineZh: '哇，機器人！是你的嗎？' },
    { speaker: 'Benny', line: "Yes! It is my robot. Cool, right?", lineZh: '是！這是我的機器人。很酷吧？' },
  ],
};

const L3_M15: Mission = {
  id: 15, slug: 'l3-m15-review-body-etc', level: 3, title: '複習③ 身體家人衣物', titleEn: 'Review Body/Family/Clothes', theme: '市場街・大集合', themeEmoji: '🎪',
  focus: '複習身體/家人/衣物/玩具＋This is my… / Whose…?',
  story: [
    { image: '🎪', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Big review! Body, family, clothes, toys!", dialogueZh: '大複習！身體、家人、衣服、玩具！', highlightWords: [], sceneEmojis: ['🎪', '🧍', '👨‍👩‍👧'], animation: 'wave' },
    { image: '👗', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "My sister wears a pink dress!", dialogueZh: '我姊姊穿一件粉紅洋裝！', highlightWords: ['sister', 'dress'], sceneEmojis: ['👧', '👗', '🩷'], animation: 'tada' },
    { image: '🏆', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know so much now! Champion!", dialogueZh: '你會好多東西了！冠軍！', highlightWords: [], sceneEmojis: ['🏆', '🎉', '🎪'], animation: 'bounce' },
  ],
  words: [
    { en: 'eye', zh: '眼睛', image: '👁️', phonics: '', kk: '[aɪ]', phonicsSound: '', exampleSentence: 'two eyes', exampleZh: '兩隻眼睛' },
    { en: 'hand', zh: '手', image: '✋', phonics: '', kk: '[hænd]', phonicsSound: '', exampleSentence: 'my hand', exampleZh: '我的手' },
    { en: 'mom', zh: '媽媽', image: '👩', phonics: '', kk: '[mɑm]', phonicsSound: '', exampleSentence: 'my mom', exampleZh: '我的媽媽' },
    { en: 'brother', zh: '兄弟', image: '👦', phonics: '', kk: '[ˈbrʌðɚ]', phonicsSound: '', exampleSentence: 'my brother', exampleZh: '我的兄弟' },
    { en: 'shirt', zh: '襯衫', image: '👕', phonics: '', kk: '[ʃɝt]', phonicsSound: '', exampleSentence: 'a shirt', exampleZh: '一件襯衫' },
    { en: 'shoes', zh: '鞋子', image: '👟', phonics: '', kk: '[ʃuz]', phonicsSound: '', exampleSentence: 'shoes', exampleZh: '鞋子' },
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'a ball', exampleZh: '一顆球' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'my book', exampleZh: '我的書' },
    { en: 'dress', zh: '洋裝', image: '👗', phonics: '', kk: '[drɛs]', phonicsSound: '', exampleSentence: 'a dress', exampleZh: '一件洋裝' },
    { en: 'family', zh: '家庭', image: '👨‍👩‍👧', phonics: '', kk: '[ˈfæməli]', phonicsSound: '', exampleSentence: 'my family', exampleZh: '我的家庭' },
  ],
  sentences: [
    { en: 'This is my hand.', zh: '這是我的手。' }, { en: 'My sister wears a dress.', zh: '我姊姊穿一件洋裝。' }, { en: 'Whose ball is this?', zh: '這是誰的球？' }, { en: 'It is my ball.', zh: '這是我的球。' }, { en: 'I love my family.', zh: '我愛我的家人。' }, { en: 'I have two eyes and one nose.', zh: '我有兩隻眼睛和一個鼻子。' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'match', question: '👩 是誰？', options: ['mom', 'dad', 'sister', 'brother'], answer: 'mom' },
    { type: 'match', question: '👕 是哪個衣物？', options: ['shirt', 'shoes', 'dress', 'hat'], answer: 'shirt' },
    { type: 'listen-pick', question: '哪個是 "eye" 眼睛？', options: ['👁️', '✋', '👂', '👃'], answer: '👁️' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['👁️', '✋', '👕', '⚽'], answer: '👕', image: '🎧' },
    { type: 'fill-blank', question: 'This is ___ hand.（我的）', options: ['my', 'a', 'an', 'is'], answer: 'my' },
    { type: 'fill-blank', question: '___ book is this?（誰的）', options: ['Whose', 'Who', 'What', 'Is'], answer: 'Whose' },
    { type: 'match', question: '配對：字配圖', options: ['shoes-👟', 'book-📖', 'dress-👗', 'ball-⚽'], answer: 'shoes-👟' },
    { type: 'fill-blank', question: 'My sister wears a ___.（洋裝）', options: ['dress', 'ball', 'book', 'eye'], answer: 'dress' },
    { type: 'speak', question: '跟著說：This is my family!', answer: 'This is my family', image: '🗣' },
  ],
  talkTimePrompts: ["Introduce your family!", "What are you wearing?", "Point to your eyes and hands!", "Whose bag is this?"],
  reviewQuiz: [
    { type: 'match', question: '👦 是誰？', options: ['brother', 'sister', 'mom', 'dad'], answer: 'brother' },
    { type: 'fill-blank', question: 'I have two ___.（眼睛）', options: ['eyes', 'eye', 'hand', 'mom'], answer: 'eyes' },
    { type: 'fill-blank', question: 'It is my ___.（球）', options: ['ball', 'eye', 'mom', 'shirt'], answer: 'ball' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "This is my family. My sister wears a pink dress.", lineZh: '這是我的家人。我姊姊穿粉紅洋裝。' },
    { speaker: 'Coco', line: "Whose ball is this?", lineZh: '這是誰的球？' },
    { speaker: 'Polly', line: "It's my brother's ball!", lineZh: '這是我哥哥的球！' },
    { speaker: 'Coco', line: "You know so many words now!", lineZh: '你現在會好多單字了！' },
  ],
};

const L3_M16: Mission = {
  id: 16, slug: 'l3-m16-articles', level: 3, title: '冠詞 a / an / the', titleEn: 'a / an / the', theme: '市場街・冠詞魔法', themeEmoji: '🎩',
  focus: 'a（子音前）、an（母音前）、the（特定的那個）',
  story: [
    { image: '🎩', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Magic words! a, an, the — before nouns!", dialogueZh: '魔法字！a、an、the —— 放名詞前面！', highlightWords: ['a', 'an', 'the'], sceneEmojis: ['🎩', '🔤', '✨'], animation: 'wave' },
    { image: '🍎', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "a dog, an apple — 'an' before a,e,i,o,u!", dialogueZh: 'a dog、an apple —— 母音前用 an！', highlightWords: ['a', 'an'], sceneEmojis: ['🐶', '🍎', '😊'], animation: 'bounce' },
    { image: '👉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "the dog — that special one we know!", dialogueZh: 'the dog —— 我們知道的那隻特定的！', highlightWords: ['the'], sceneEmojis: ['👉', '🐶', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "a, an, the — you're a grammar star!", dialogueZh: 'a、an、the —— 你是文法之星！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🎩'], animation: 'bounce' },
  ],
  words: [
    { en: 'a dog', zh: '一隻狗', image: '🐶', phonics: '', kk: '[ə dɔɡ]', phonicsSound: 'a+子音', exampleSentence: 'I see a dog.', exampleZh: '我看到一隻狗。' },
    { en: 'a cat', zh: '一隻貓', image: '🐱', phonics: '', kk: '[ə kæt]', phonicsSound: 'a+子音', exampleSentence: 'It is a cat.', exampleZh: '這是一隻貓。' },
    { en: 'a ball', zh: '一顆球', image: '⚽', phonics: '', kk: '[ə bɔl]', phonicsSound: 'a+子音', exampleSentence: 'a red ball', exampleZh: '一顆紅球' },
    { en: 'an apple', zh: '一顆蘋果', image: '🍎', phonics: '', kk: '[ən ˈæpl̩]', phonicsSound: 'an+母音', exampleSentence: 'an apple', exampleZh: '一顆蘋果' },
    { en: 'an egg', zh: '一顆蛋', image: '🥚', phonics: '', kk: '[ən ɛɡ]', phonicsSound: 'an+母音', exampleSentence: 'an egg', exampleZh: '一顆蛋' },
    { en: 'an orange', zh: '一顆柳橙', image: '🍊', phonics: '', kk: '[ən ˈɔrɪndʒ]', phonicsSound: 'an+母音', exampleSentence: 'an orange', exampleZh: '一顆柳橙' },
    { en: 'an umbrella', zh: '一把傘', image: '☂️', phonics: '', kk: '[ən ʌmˈbrɛlə]', phonicsSound: 'an+母音', exampleSentence: 'an umbrella', exampleZh: '一把傘' },
    { en: 'the sun', zh: '太陽', image: '☀️', phonics: '', kk: '[ðə sʌn]', phonicsSound: 'the+特定', exampleSentence: 'the sun', exampleZh: '（那個）太陽' },
    { en: 'the moon', zh: '月亮', image: '🌙', phonics: '', kk: '[ðə mun]', phonicsSound: 'the+特定', exampleSentence: 'the moon', exampleZh: '（那個）月亮' },
    { en: 'the dog', zh: '那隻狗', image: '🐕', phonics: '', kk: '[ðə dɔɡ]', phonicsSound: 'the+特定', exampleSentence: 'the dog is big', exampleZh: '那隻狗很大' },
  ],
  sentences: [
    { en: 'I have a cat.', zh: '我有一隻貓。' }, { en: 'I have an apple.', zh: '我有一顆蘋果。' }, { en: 'The sun is hot.', zh: '（那個）太陽很熱。' }, { en: 'Is it a dog or an egg?', zh: '這是狗還是蛋？' }, { en: 'It is an egg.', zh: '這是一顆蛋。' }, { en: 'Look at the moon!', zh: '看那個月亮！' },
  ],
  phonicsLetters: ['a', 'an', 'the'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ dog（狗）', options: ['a', 'an', 'the', 'is'], answer: 'a' },
    { type: 'fill-blank', question: '___ apple（蘋果）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'fill-blank', question: '___ egg（蛋）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
  ],
  challenges: [
    { type: 'fill-blank', question: 'It is ___ orange.（柳橙）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'fill-blank', question: 'I have ___ ball.（球）', options: ['a', 'an', 'the', 'is'], answer: 'a' },
    { type: 'fill-blank', question: 'Look at ___ sun!（特定）', options: ['the', 'a', 'an', 'is'], answer: 'the' },
    { type: 'fill-blank', question: '___ umbrella（傘）', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'match', question: '配對：冠詞用法', options: ['a-dog', 'an-egg', 'the-sun', 'an-apple'], answer: 'a-dog' },
    { type: 'speak', question: '跟著念：A cat, an apple!', answer: 'A cat', image: '🗣' },
  ],
  talkTimePrompts: ["Say 'a' or 'an': ___ apple, ___ cat.", "Point and say: an egg, a ball.", "Look at the sun! Say it.", "Make a sentence with 'the'."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'I see ___ umbrella.', options: ['an', 'a', 'the', 'is'], answer: 'an' },
    { type: 'fill-blank', question: '___ moon is bright tonight.', options: ['The', 'A', 'An', 'Is'], answer: 'The' },
    { type: 'fill-blank', question: 'It is ___ cat.', options: ['a', 'an', 'the', 'two'], answer: 'a' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I have a dog and an apple.", lineZh: '我有一隻狗和一顆蘋果。' },
    { speaker: 'Benny', line: "a dog, an apple — a or an?", lineZh: 'a dog、an apple —— a 還是 an？' },
    { speaker: 'Coco', line: "'an' before a, e, i, o, u! Look at the moon!", lineZh: '母音前用 an！看那個月亮！' },
    { speaker: 'Benny', line: "the moon — the special one! Got it!", lineZh: 'the moon —— 特定的那個！懂了！' },
  ],
};

const L3_M17: Mission = {
  id: 17, slug: 'l3-m17-plurals', level: 3, title: '名詞複數', titleEn: 'Plurals', theme: '市場街・數量魔法', themeEmoji: '➕',
  focus: '複數規則：+s、+es（box→boxes）、不規則（foot→feet）',
  story: [
    { image: '➕', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "More than one? Add -s! cat → cats!", dialogueZh: '不只一個？加 -s！cat → cats！', highlightWords: ['-s', 'cats'], sceneEmojis: ['➕', '🐱', '✨'], animation: 'wave' },
    { image: '📦', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "box → boxes! Add -es after x, s, sh, ch!", dialogueZh: 'box → boxes！x、s、sh、ch 後加 -es！', highlightWords: ['boxes', '-es'], sceneEmojis: ['📦', '📦', '😊'], animation: 'bounce' },
    { image: '🦶', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "But foot → feet! Some are special!", dialogueZh: '但 foot → feet！有些是特別的！', highlightWords: ['foot', 'feet'], sceneEmojis: ['🦶', '🦶', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "One or many — you can say both! Great!", dialogueZh: '一個或很多 —— 你都會了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '➕'], animation: 'bounce' },
  ],
  words: [
    { en: 'cats', zh: '貓（複）', image: '🐱', phonics: '', kk: '+s', phonicsSound: '規則 +s', exampleSentence: 'two cats', exampleZh: '兩隻貓' },
    { en: 'dogs', zh: '狗（複）', image: '🐶', phonics: '', kk: '+s', phonicsSound: '規則 +s', exampleSentence: 'three dogs', exampleZh: '三隻狗' },
    { en: 'apples', zh: '蘋果（複）', image: '🍎', phonics: '', kk: '+s', phonicsSound: '規則 +s', exampleSentence: 'five apples', exampleZh: '五顆蘋果' },
    { en: 'boxes', zh: '箱子（複）', image: '📦', phonics: '', kk: '+es', phonicsSound: 'x 後 +es', exampleSentence: 'two boxes', exampleZh: '兩個箱子' },
    { en: 'buses', zh: '公車（複）', image: '🚌', phonics: '', kk: '+es', phonicsSound: 's 後 +es', exampleSentence: 'two buses', exampleZh: '兩台公車' },
    { en: 'dishes', zh: '盤子（複）', image: '🍽️', phonics: '', kk: '+es', phonicsSound: 'sh 後 +es', exampleSentence: 'three dishes', exampleZh: '三個盤子' },
    { en: 'foxes', zh: '狐狸（複）', image: '🦊', phonics: '', kk: '+es', phonicsSound: 'x 後 +es', exampleSentence: 'two foxes', exampleZh: '兩隻狐狸' },
    { en: 'feet', zh: '腳（複，不規則）', image: '🦶', phonics: '', kk: 'foot→feet', phonicsSound: '不規則', exampleSentence: 'two feet', exampleZh: '兩隻腳' },
    { en: 'children', zh: '小孩（複，不規則）', image: '🧒', phonics: '', kk: 'child→children', phonicsSound: '不規則', exampleSentence: 'many children', exampleZh: '很多小孩' },
    { en: 'mice', zh: '老鼠（複，不規則）', image: '🐭', phonics: '', kk: 'mouse→mice', phonicsSound: '不規則', exampleSentence: 'three mice', exampleZh: '三隻老鼠' },
  ],
  sentences: [
    { en: 'One cat, two cats.', zh: '一隻貓，兩隻貓。' }, { en: 'One box, two boxes.', zh: '一個箱子，兩個箱子。' }, { en: 'One foot, two feet.', zh: '一隻腳，兩隻腳。' }, { en: 'How many apples?', zh: '有幾顆蘋果？' }, { en: 'There are five apples.', zh: '有五顆蘋果。' }, { en: 'I see three mice!', zh: '我看到三隻老鼠！' },
  ],
  phonicsLetters: ['plurals'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'one dog, two ___', options: ['dogs', 'dog', 'doges', 'dogz'], answer: 'dogs' },
    { type: 'fill-blank', question: 'one box, two ___', options: ['boxes', 'boxs', 'box', 'boxies'], answer: 'boxes' },
    { type: 'fill-blank', question: 'one foot, two ___（不規則）', options: ['feet', 'foots', 'feets', 'foot'], answer: 'feet' },
  ],
  challenges: [
    { type: 'fill-blank', question: 'one bus, two ___', options: ['buses', 'buss', 'bus', 'buss'], answer: 'buses' },
    { type: 'fill-blank', question: 'one dish, two ___', options: ['dishes', 'dishs', 'dish', 'dishies'], answer: 'dishes' },
    { type: 'fill-blank', question: 'one child, two ___（不規則）', options: ['children', 'childs', 'childrens', 'childes'], answer: 'children' },
    { type: 'match', question: '配對：單數→複數', options: ['cat-cats', 'box-boxes', 'foot-feet', 'mouse-mice'], answer: 'cat-cats' },
    { type: 'fill-blank', question: 'There are five ___.（蘋果）', options: ['apples', 'apple', 'applees', 'applz'], answer: 'apples' },
    { type: 'speak', question: '跟著念：Cats, boxes, feet!', answer: 'Cats', image: '🗣' },
  ],
  talkTimePrompts: ["Say the plural: cat → ?", "Say the plural: box → ?", "How many feet do you have?", "Count: one apple, two apples..."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'one fox, two ___', options: ['foxes', 'foxs', 'fox', 'foxies'], answer: 'foxes' },
    { type: 'fill-blank', question: 'one mouse, two ___（不規則）', options: ['mice', 'mouses', 'mouse', 'mices'], answer: 'mice' },
    { type: 'match', question: 'dish 的複數是？', options: ['dishes', 'dishs', 'dish', 'dishies'], answer: 'dishes' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "One cat, two cats. Add -s!", lineZh: '一隻貓，兩隻貓。加 -s！' },
    { speaker: 'Benny', line: "But box becomes boxes! -es!", lineZh: '但 box 變 boxes！加 -es！' },
    { speaker: 'Coco', line: "And foot becomes feet! Tricky!", lineZh: '還有 foot 變 feet！很狡猾！' },
    { speaker: 'Benny', line: "One foot, two feet! I remember!", lineZh: '一隻腳，兩隻腳！我記得了！' },
  ],
};

const L3_M18: Mission = {
  id: 18, slug: 'l3-m18-this-these', level: 3, title: 'This / These', titleEn: 'This & These', theme: '市場街・指指看', themeEmoji: '👉',
  focus: 'This is（近·單）/ These are（近·複）；That / Those（遠）',
  story: [
    { image: '👉', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "This is near! That is far! Point and say!", dialogueZh: 'This 是近的！That 是遠的！指指看說說看！', highlightWords: ['This', 'That'], sceneEmojis: ['👉', '👆', '✨'], animation: 'wave' },
    { image: '🍎', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "This is an apple. These are apples!", dialogueZh: '這是一顆蘋果。這些是蘋果！', highlightWords: ['This', 'These'], sceneEmojis: ['🍎', '🍎', '😊'], animation: 'bounce' },
    { image: '🐶', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "That is a dog. Those are dogs over there!", dialogueZh: '那是一隻狗。那些是那邊的狗！', highlightWords: ['That', 'Those'], sceneEmojis: ['🐶', '🐶', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "This, these, that, those — you did it!", dialogueZh: 'This、these、that、those —— 你做到了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '👉'], animation: 'bounce' },
  ],
  words: [
    { en: 'this', zh: '這個（近·單）', image: '👉', phonics: '', kk: '[ðɪs]', phonicsSound: '近·單', exampleSentence: 'This is a cat.', exampleZh: '這是一隻貓。' },
    { en: 'these', zh: '這些（近·複）', image: '👉', phonics: '', kk: '[ðiz]', phonicsSound: '近·複', exampleSentence: 'These are cats.', exampleZh: '這些是貓。' },
    { en: 'that', zh: '那個（遠·單）', image: '👆', phonics: '', kk: '[ðæt]', phonicsSound: '遠·單', exampleSentence: 'That is a dog.', exampleZh: '那是一隻狗。' },
    { en: 'those', zh: '那些（遠·複）', image: '👆', phonics: '', kk: '[ðoz]', phonicsSound: '遠·複', exampleSentence: 'Those are dogs.', exampleZh: '那些是狗。' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'This is an apple.', exampleZh: '這是一顆蘋果。' },
    { en: 'apples', zh: '蘋果（複）', image: '🍎', phonics: '', kk: '', phonicsSound: '', exampleSentence: 'These are apples.', exampleZh: '這些是蘋果。' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'That is a dog.', exampleZh: '那是一隻狗。' },
    { en: 'dogs', zh: '狗（複）', image: '🐶', phonics: '', kk: '', phonicsSound: '', exampleSentence: 'Those are dogs.', exampleZh: '那些是狗。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'This is my book.', exampleZh: '這是我的書。' },
    { en: 'books', zh: '書（複）', image: '📚', phonics: '', kk: '', phonicsSound: '', exampleSentence: 'These are my books.', exampleZh: '這些是我的書。' },
  ],
  sentences: [
    { en: 'This is a cat.', zh: '這是一隻貓。' }, { en: 'These are cats.', zh: '這些是貓。' }, { en: 'That is a dog.', zh: '那是一隻狗。' }, { en: 'Those are dogs.', zh: '那些是狗。' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'What are these?', zh: '這些是什麼？' },
  ],
  phonicsLetters: ['this', 'these', 'that', 'those'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ is a cat.（這·單）', options: ['This', 'These', 'Those', 'Are'], answer: 'This' },
    { type: 'fill-blank', question: '___ are cats.（這些·複）', options: ['These', 'This', 'That', 'Is'], answer: 'These' },
    { type: 'fill-blank', question: '___ is a dog (far).（那·單）', options: ['That', 'This', 'These', 'Are'], answer: 'That' },
  ],
  challenges: [
    { type: 'fill-blank', question: '___ are apples.（這些）', options: ['These', 'This', 'That', 'Is'], answer: 'These' },
    { type: 'fill-blank', question: '___ are dogs (far).（那些）', options: ['Those', 'That', 'This', 'Is'], answer: 'Those' },
    { type: 'fill-blank', question: 'This ___ my book.（be動詞·單）', options: ['is', 'are', 'am', 'be'], answer: 'is' },
    { type: 'fill-blank', question: 'These ___ my books.（be動詞·複）', options: ['are', 'is', 'am', 'be'], answer: 'are' },
    { type: 'match', question: '配對：近遠單複', options: ['this-近單', 'these-近複', 'that-遠單', 'those-遠複'], answer: 'this-近單' },
    { type: 'speak', question: '跟著說：This is a cat!', answer: 'This is a cat', image: '🗣' },
  ],
  talkTimePrompts: ["Point near: This is ___.", "Point to many: These are ___.", "Point far: That is ___.", "What is this? / What are these?"],
  reviewQuiz: [
    { type: 'fill-blank', question: '___ are books.（這些）', options: ['These', 'This', 'That', 'Is'], answer: 'These' },
    { type: 'fill-blank', question: 'That ___ a dog.（be動詞）', options: ['is', 'are', 'am', 'be'], answer: 'is' },
    { type: 'match', question: 'these 是？', options: ['近·複數', '近·單數', '遠·複數', '遠·單數'], answer: '近·複數' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "This is an apple. These are apples!", lineZh: '這是一顆蘋果。這些是蘋果！' },
    { speaker: 'Benny', line: "this — one, these — many! Got it!", lineZh: 'this —— 一個，these —— 很多！懂了！' },
    { speaker: 'Coco', line: "That is a dog, over there!", lineZh: '那是一隻狗，在那邊！' },
    { speaker: 'Benny', line: "And those are dogs! Far away!", lineZh: '那些是狗！在遠方！' },
  ],
};

const L3_M19: Mission = {
  id: 19, slug: 'l3-m19-reading', level: 3, title: '市場街閱讀', titleEn: 'Market Reading', theme: '市場街・故事時間', themeEmoji: '📖',
  focus: '綜合閱讀：把顏色/數字/食物/動物/句型讀成一個小故事',
  story: [
    { image: '📖', character: '🦊', characterKey: 'finn', characterAction: 'read', characterName: 'Finn', dialogue: "Let's read a story about Market Street!", dialogueZh: '我們來讀一個市場街的故事！', highlightWords: ['story'], sceneEmojis: ['📖', '🏡', '✨'], animation: 'wave' },
    { image: '🐱', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "This is Coco. Coco has two red apples and a cat.", dialogueZh: '這是 Coco。Coco 有兩顆紅蘋果和一隻貓。', highlightWords: ['two', 'red', 'apples', 'cat'], sceneEmojis: ['🐱', '🍎', '🍎'], animation: 'bounce' },
    { image: '🦜', character: '🦜', characterKey: 'polly', characterAction: 'read', characterName: 'Polly', dialogue: "Coco likes the apples. She does not like fish.", dialogueZh: 'Coco 喜歡蘋果。她不喜歡魚。', highlightWords: ['likes', 'not'], sceneEmojis: ['🍎', '❤️', '🐟'], animation: 'float' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You read a whole story! Amazing reader!", dialogueZh: '你讀完整個故事了！了不起的讀者！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'story', zh: '故事', image: '📖', phonics: '', kk: '[ˈstɔri]', phonicsSound: '', exampleSentence: 'a fun story', exampleZh: '一個有趣的故事' },
    { en: 'market', zh: '市場', image: '🏪', phonics: '', kk: '[ˈmɑrkɪt]', phonicsSound: '', exampleSentence: 'the market', exampleZh: '市場' },
    { en: 'has', zh: '有（第三人稱）', image: '🤲', phonics: '', kk: '[hæz]', phonicsSound: '', exampleSentence: 'She has a cat.', exampleZh: '她有一隻貓。' },
    { en: 'likes', zh: '喜歡（第三人稱）', image: '❤️', phonics: '', kk: '[laɪks]', phonicsSound: '', exampleSentence: 'He likes apples.', exampleZh: '他喜歡蘋果。' },
    { en: 'red', zh: '紅色', image: '🔴', phonics: '', kk: '[rɛd]', phonicsSound: '', exampleSentence: 'red apples', exampleZh: '紅蘋果' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'two apples', exampleZh: '兩顆蘋果' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: '', kk: '[kæt]', phonicsSound: '', exampleSentence: 'a cat', exampleZh: '一隻貓' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: '', kk: '[fɪʃ]', phonicsSound: '', exampleSentence: 'fish', exampleZh: '魚' },
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'She is happy.', exampleZh: '她很開心。' },
    { en: 'good', zh: '好的', image: '👍', phonics: '', kk: '[ɡʊd]', phonicsSound: '', exampleSentence: 'a good day', exampleZh: '美好的一天' },
  ],
  sentences: [
    { en: 'This is Coco.', zh: '這是 Coco。' }, { en: 'Coco has two red apples.', zh: 'Coco 有兩顆紅蘋果。' }, { en: 'She has a cat.', zh: '她有一隻貓。' }, { en: 'Coco likes the apples.', zh: 'Coco 喜歡蘋果。' }, { en: 'She does not like fish.', zh: '她不喜歡魚。' }, { en: 'Coco is happy!', zh: 'Coco 很開心！' },
  ],
  phonicsLetters: ['reading'],
  warmUpQuestions: [
    { type: 'listen-pick', question: '故事裡 Coco 有幾顆蘋果？', options: ['two', 'one', 'three', 'five'], answer: 'two' },
    { type: 'listen-pick', question: '蘋果是什麼顏色？', options: ['red', 'blue', 'green', 'yellow'], answer: 'red' },
    { type: 'listen-pick', question: 'Coco 有什麼寵物？', options: ['a cat', 'a dog', 'a fish', 'a bird'], answer: 'a cat' },
  ],
  challenges: [
    { type: 'listen-pick', question: 'Coco 喜歡什麼？', options: ['apples', 'fish', 'meat', 'soup'], answer: 'apples' },
    { type: 'listen-pick', question: 'Coco 不喜歡什麼？', options: ['fish', 'apples', 'cat', 'red'], answer: 'fish' },
    { type: 'fill-blank', question: 'Coco ___ two red apples.（有·第三人稱）', options: ['has', 'have', 'is', 'like'], answer: 'has' },
    { type: 'fill-blank', question: 'She ___ the apples.（喜歡·第三人稱）', options: ['likes', 'like', 'is', 'has'], answer: 'likes' },
    { type: 'listen-pick', question: '故事最後 Coco 覺得怎樣？', options: ['happy', 'sad', 'hungry', 'tired'], answer: 'happy' },
    { type: 'speak', question: '跟著讀：Coco has two apples!', answer: 'Coco has two apples', image: '🗣' },
  ],
  talkTimePrompts: ["Retell the story about Coco.", "What does Coco have?", "What does Coco like?", "Make your own story: I have ___."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Coco ___ happy.（be動詞）', options: ['is', 'are', 'am', 'has'], answer: 'is' },
    { type: 'listen-pick', question: 'How many apples does Coco have?', options: ['two', 'three', 'one', 'four'], answer: 'two' },
    { type: 'fill-blank', question: 'She does not ___ fish.（喜歡）', options: ['like', 'likes', 'is', 'has'], answer: 'like' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "This is Coco. She has two red apples.", lineZh: '這是 Coco。她有兩顆紅蘋果。' },
    { speaker: 'Coco', line: "I like apples! I have a cat too.", lineZh: '我喜歡蘋果！我也有一隻貓。' },
    { speaker: 'Finn', line: "Does Coco like fish?", lineZh: 'Coco 喜歡魚嗎？' },
    { speaker: 'Coco', line: "No, I don't like fish. I'm happy!", lineZh: '不，我不喜歡魚。我很開心！' },
  ],
};

const L3_M20: Mission = {
  id: 20, slug: 'l3-m20-boss', level: 3, title: '市場街大魔王', titleEn: 'Market Boss', theme: '市場街・大魔王挑戰', themeEmoji: '🏆',
  focus: '總驗收：顏色/數字/食物/動物/身體/家人/衣服＋冠詞/複數/疑問句',
  story: [
    { image: '🐲', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The Market Boss is here! Use all your words!", dialogueZh: '市場大魔王來了！用上你所有的單字！', highlightWords: [], sceneEmojis: ['🐲', '⚔️', '🏪'], animation: 'shake' },
    { image: '💪', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Colors, numbers, food, animals — you know them all!", dialogueZh: '顏色、數字、食物、動物 —— 你全會了！', highlightWords: [], sceneEmojis: ['💪', '🌈', '✨'], animation: 'bounce' },
    { image: '🎖️', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You beat the Boss! You get the Market Badge!", dialogueZh: '你打敗大魔王了！獲得市場徽章！', highlightWords: ['Badge'], sceneEmojis: ['🎖️', '🏆', '🎉'], animation: 'tada' },
    { image: '🎓', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You finished Market Street! On to School Road!", dialogueZh: '你完成了市場街！前進學校路！', highlightWords: [], sceneEmojis: ['🎓', '🏫', '🚀'], animation: 'bounce' },
  ],
  words: [
    { en: 'red', zh: '紅色', image: '🔴', phonics: '', kk: '[rɛd]', phonicsSound: '', exampleSentence: 'red', exampleZh: '紅色' },
    { en: 'three', zh: '三', image: '3️⃣', phonics: '', kk: '[θri]', phonicsSound: '', exampleSentence: 'three', exampleZh: '三' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'an apple', exampleZh: '一顆蘋果' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'a dog', exampleZh: '一隻狗' },
    { en: 'eye', zh: '眼睛', image: '👁️', phonics: '', kk: '[aɪ]', phonicsSound: '', exampleSentence: 'two eyes', exampleZh: '兩隻眼睛' },
    { en: 'mom', zh: '媽媽', image: '👩', phonics: '', kk: '[mɑm]', phonicsSound: '', exampleSentence: 'my mom', exampleZh: '我的媽媽' },
    { en: 'shirt', zh: '襯衫', image: '👕', phonics: '', kk: '[ʃɝt]', phonicsSound: '', exampleSentence: 'a shirt', exampleZh: '一件襯衫' },
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'a ball', exampleZh: '一顆球' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'I like it.', exampleZh: '我喜歡。' },
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy!', exampleZh: '我很開心！' },
  ],
  sentences: [
    { en: 'I have three red apples.', zh: '我有三顆紅蘋果。' }, { en: 'This is my mom.', zh: '這是我的媽媽。' }, { en: 'Do you like the dog?', zh: '你喜歡那隻狗嗎？' }, { en: 'Yes, I do!', zh: '是的！' }, { en: 'I can talk about food and animals!', zh: '我會講食物和動物了！' }, { en: 'I am so happy!', zh: '我好開心！' },
  ],
  phonicsLetters: ['review all'],
  warmUpQuestions: [
    { type: 'match', question: '🔴 是什麼顏色？', options: ['red', 'blue', 'green', 'yellow'], answer: 'red' },
    { type: 'fill-blank', question: 'I have ___ apple.（冠詞）', options: ['an', 'a', 'the', 'two'], answer: 'an' },
    { type: 'fill-blank', question: 'two ___（狗複數）', options: ['dogs', 'dog', 'doges', 'dogz'], answer: 'dogs' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🔴', '🍎', '🐶', '👕'], answer: '🐶', image: '🎧' },
    { type: 'fill-blank', question: 'This is ___ mom.（我的）', options: ['my', 'a', 'an', 'is'], answer: 'my' },
    { type: 'fill-blank', question: 'Do you ___ the dog?（喜歡）', options: ['like', 'is', 'are', 'a'], answer: 'like' },
    { type: 'match', question: '配對：字配圖', options: ['eye-👁️', 'ball-⚽', 'shirt-👕', 'apple-🍎'], answer: 'eye-👁️' },
    { type: 'fill-blank', question: 'I have three red ___.（蘋果複數）', options: ['apples', 'apple', 'an apple', 'applz'], answer: 'apples' },
    { type: 'speak', question: '跟著說：I have three red apples!', answer: 'I have three red apples', image: '🗣' },
  ],
  talkTimePrompts: ["Tell me: your favorite color, food, and animal!", "Introduce your family in English!", "What are you wearing?", "You beat the Market Boss! Say 'I did it!'"],
  reviewQuiz: [
    { type: 'match', question: '3️⃣ 是哪個數字？', options: ['three', 'two', 'five', 'ten'], answer: 'three' },
    { type: 'fill-blank', question: 'It is ___ egg.（冠詞）', options: ['an', 'a', 'the', 'two'], answer: 'an' },
    { type: 'fill-blank', question: 'I ___ happy!（be動詞）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "The Market Boss says: describe this!", lineZh: '市場大魔王說：描述這個！' },
    { speaker: 'Benny', line: "I have three red apples and a dog!", lineZh: '我有三顆紅蘋果和一隻狗！' },
    { speaker: 'Ruby', line: "You beat the Boss! Market champion!", lineZh: '你打敗大魔王了！市場冠軍！' },
    { speaker: 'Finn', line: "On to School Road! Let's learn sentences!", lineZh: '前進學校路！我們來學句型！' },
  ],
};

// ===================== L4 學校路 School Road（A1・基本句型 be/like/have/can） =====================
const L4_M1: Mission = {
  id: 1, slug: 'l4-m1-i-am', level: 4, title: 'I am + 感覺', titleEn: 'I am…', theme: '學校路・心情站', themeEmoji: '😊',
  focus: '句型 I am + 形容詞；句型代換 I am ___.（happy/hungry…）',
  story: [
    { image: '🏫', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Good morning! Welcome to School Road!", dialogueZh: '早安！歡迎來到學校路！', highlightWords: ['morning'], sceneEmojis: ['🏫', '🌅', '✨'], animation: 'wave' },
    { image: '😊', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I am happy! Are you happy too?", dialogueZh: '我很開心！你也開心嗎？', highlightWords: ['happy'], sceneEmojis: ['😊', '💛', '🎉'], animation: 'bounce' },
    { image: '🍎', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "I am hungry! It is lunch time!", dialogueZh: '我好餓！午餐時間到了！', highlightWords: ['hungry'], sceneEmojis: ['🍎', '🍱', '😋'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Now you can say how you feel! I am great!", dialogueZh: '現在你會說自己的感覺了！我超棒！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '😊'], animation: 'bounce' },
  ],
  words: [
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy.', exampleZh: '我很開心。' },
    { en: 'sad', zh: '難過的', image: '😢', phonics: '', kk: '[sæd]', phonicsSound: '', exampleSentence: 'I am sad.', exampleZh: '我很難過。' },
    { en: 'hungry', zh: '餓的', image: '🍽️', phonics: '', kk: '[ˈhʌŋɡri]', phonicsSound: '', exampleSentence: 'I am hungry.', exampleZh: '我餓了。' },
    { en: 'thirsty', zh: '渴的', image: '🥤', phonics: '', kk: '[ˈθɝsti]', phonicsSound: '', exampleSentence: 'I am thirsty.', exampleZh: '我渴了。' },
    { en: 'tired', zh: '累的', image: '😩', phonics: '', kk: '[taɪrd]', phonicsSound: '', exampleSentence: 'I am tired.', exampleZh: '我很累。' },
    { en: 'sleepy', zh: '想睡的', image: '😴', phonics: '', kk: '[ˈslipi]', phonicsSound: '', exampleSentence: 'I am sleepy.', exampleZh: '我想睡。' },
    { en: 'hot', zh: '熱的', image: '🥵', phonics: '', kk: '[hɑt]', phonicsSound: '', exampleSentence: 'I am hot.', exampleZh: '我好熱。' },
    { en: 'cold', zh: '冷的', image: '🥶', phonics: '', kk: '[kold]', phonicsSound: '', exampleSentence: 'I am cold.', exampleZh: '我好冷。' },
    { en: 'angry', zh: '生氣的', image: '😠', phonics: '', kk: '[ˈæŋɡri]', phonicsSound: '', exampleSentence: 'I am angry.', exampleZh: '我很生氣。' },
    { en: 'fine', zh: '很好的', image: '👍', phonics: '', kk: '[faɪn]', phonicsSound: '', exampleSentence: 'I am fine.', exampleZh: '我很好。' },
  ],
  sentences: [
    { en: 'I am happy.', zh: '我很開心。' }, { en: 'I am hungry.', zh: '我餓了。' }, { en: 'Are you tired?', zh: '你累嗎？' }, { en: 'Yes, I am.', zh: '是的，我累了。' }, { en: 'I am not sad.', zh: '我不難過。' }, { en: 'How are you?', zh: '你好嗎？' },
  ],
  phonicsLetters: ['I am ___'],
  warmUpQuestions: [
    { type: 'match', question: '😊 是什麼感覺？', options: ['happy', 'sad', 'cold', 'tired'], answer: 'happy' },
    { type: 'match', question: '🍽️ 餓了怎麼說？', options: ['hungry', 'thirsty', 'sleepy', 'hot'], answer: 'hungry' },
    { type: 'fill-blank', question: 'I ___ happy.（be動詞）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的感覺', options: ['😊', '😢', '😴', '😠'], answer: '😢', image: '🎧' },
    { type: 'match', question: '配對：感覺配圖', options: ['happy-😊', 'sad-😢', 'cold-🥶', 'angry-😠'], answer: 'happy-😊' },
    { type: 'fill-blank', question: '句型代換：I am ___.（渴了）', options: ['thirsty', 'happy', 'tired', 'fine'], answer: 'thirsty' },
    { type: 'spell', question: '拼拼看：h _ ppy（開心）', answer: 'happy', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I am hungry.', 'I am happy.', 'I am angry.', 'Are you hungry?'], answer: 'I am hungry.', image: '🎧' },
    { type: 'read', question: 'How does Coco feel?（Coco 的感覺？）', passage: 'It is morning.\nCoco is at school.\nCoco is happy!', options: ['happy', 'sad', 'tired', 'hungry'], answer: 'happy' },
  ],
  talkTimePrompts: ["How are you today? I am ___.", "Say: I am happy!", "Are you hungry? Yes, I am. / No, I'm not.", "Change the word: I am ___ (tired/hot/fine)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'I ___ fine, thank you.', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'match', question: '😴 想睡怎麼說？', options: ['sleepy', 'hungry', 'angry', 'cold'], answer: 'sleepy' },
    { type: 'spell', question: '拼拼看：s _ d（難過）', answer: 'sad', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Good morning, Coco! How are you?", lineZh: '早安 Coco！你好嗎？' },
    { speaker: 'Coco', line: "I am happy! And I am hungry!", lineZh: '我很開心！而且我餓了！' },
    { speaker: 'Benny', line: "Me too! I am hungry and tired.", lineZh: '我也是！我又餓又累。' },
    { speaker: 'Finn', line: "It is lunch time! Let's eat!", lineZh: '午餐時間到了！我們去吃吧！' },
  ],
};

const L4_M2: Mission = {
  id: 2, slug: 'l4-m2-pronouns-be', level: 4, title: '代名詞 + be', titleEn: 'He is / She is', theme: '學校路・介紹夥伴', themeEmoji: '👥',
  focus: '主格代名詞 I/you/he/she/it/we/they ＋ be 變化（am/is/are）',
  story: [
    { image: '👦', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "I am Finn. He is Benny. She is Coco.", dialogueZh: '我是 Finn。他是 Benny。她是 Coco。', highlightWords: ['I', 'He', 'She'], sceneEmojis: ['🦊', '🐻', '🐱'], animation: 'wave' },
    { image: '🦜', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "You are my friend! We are a team!", dialogueZh: '你是我的朋友！我們是一隊！', highlightWords: ['You', 'We'], sceneEmojis: ['🦜', '🤝', '🎉'], animation: 'tada' },
    { image: '🐰', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "They are my friends. It is a fun class!", dialogueZh: '他們是我的朋友。這是個好玩的班！', highlightWords: ['They', 'It'], sceneEmojis: ['👫', '🏫', '⭐'], animation: 'bounce' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "I, you, he, she — now you know them all!", dialogueZh: 'I、you、he、she —— 現在你都會了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '👥'], animation: 'bounce' },
  ],
  words: [
    { en: 'I', zh: '我', image: '🙋', phonics: '', kk: '[aɪ]', phonicsSound: '', exampleSentence: 'I am Finn.', exampleZh: '我是 Finn。' },
    { en: 'you', zh: '你', image: '👉', phonics: '', kk: '[ju]', phonicsSound: '', exampleSentence: 'You are nice.', exampleZh: '你很好。' },
    { en: 'he', zh: '他', image: '👦', phonics: '', kk: '[hi]', phonicsSound: '', exampleSentence: 'He is Benny.', exampleZh: '他是 Benny。' },
    { en: 'she', zh: '她', image: '👧', phonics: '', kk: '[ʃi]', phonicsSound: '', exampleSentence: 'She is Coco.', exampleZh: '她是 Coco。' },
    { en: 'it', zh: '它', image: '📦', phonics: '', kk: '[ɪt]', phonicsSound: '', exampleSentence: 'It is a book.', exampleZh: '這是一本書。' },
    { en: 'we', zh: '我們', image: '👫', phonics: '', kk: '[wi]', phonicsSound: '', exampleSentence: 'We are friends.', exampleZh: '我們是朋友。' },
    { en: 'they', zh: '他們', image: '👨‍👩‍👧', phonics: '', kk: '[ðe]', phonicsSound: '', exampleSentence: 'They are happy.', exampleZh: '他們很開心。' },
    { en: 'am', zh: '是（我）', image: '1️⃣', phonics: '', kk: '[æm]', phonicsSound: '', exampleSentence: 'I am here.', exampleZh: '我在這裡。' },
    { en: 'is', zh: '是（他/她/它）', image: '3️⃣', phonics: '', kk: '[ɪz]', phonicsSound: '', exampleSentence: 'He is tall.', exampleZh: '他很高。' },
    { en: 'are', zh: '是（你/我們/他們）', image: '🔢', phonics: '', kk: '[ɑr]', phonicsSound: '', exampleSentence: 'You are kind.', exampleZh: '你很善良。' },
  ],
  sentences: [
    { en: 'I am a student.', zh: '我是學生。' }, { en: 'He is my friend.', zh: '他是我的朋友。' }, { en: 'She is happy.', zh: '她很開心。' }, { en: 'We are a team.', zh: '我們是一隊。' }, { en: 'Are they here?', zh: '他們在這裡嗎？' }, { en: 'Yes, they are.', zh: '是的，他們在。' },
  ],
  phonicsLetters: ['I/you/he/she'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'He ___ my friend.', options: ['is', 'am', 'are', 'be'], answer: 'is' },
    { type: 'fill-blank', question: 'I ___ a student.', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'fill-blank', question: 'You ___ nice.', options: ['are', 'am', 'is', 'be'], answer: 'are' },
  ],
  challenges: [
    { type: 'match', question: '「她」的英文是？', options: ['she', 'he', 'it', 'they'], answer: 'she' },
    { type: 'fill-blank', question: 'She ___ Coco.（be動詞）', options: ['is', 'am', 'are', 'be'], answer: 'is' },
    { type: 'fill-blank', question: 'We ___ friends.（be動詞）', options: ['are', 'am', 'is', 'be'], answer: 'are' },
    { type: 'spell', question: '拼拼看：th _ y（他們）', answer: 'they', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['He is my friend.', 'She is my friend.', 'They are my friends.', 'We are friends.'], answer: 'He is my friend.', image: '🎧' },
    { type: 'read', question: 'Who is Coco?（Coco 是誰？）', passage: 'This is Finn. He is a fox.\nThat is Coco. She is a cat.\nThey are friends.', options: ['a cat', 'a fox', 'a bear', 'a bird'], answer: 'a cat' },
  ],
  talkTimePrompts: ["Point and say: He is ___. / She is ___.", "Say: We are friends!", "Introduce a friend: This is ___. He/She is ___.", "Change the word: ___ is happy (He/She/It)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'They ___ happy.（be動詞）', options: ['are', 'am', 'is', 'be'], answer: 'are' },
    { type: 'match', question: '「他」的英文是？', options: ['he', 'she', 'we', 'it'], answer: 'he' },
    { type: 'fill-blank', question: 'It ___ a book.（be動詞）', options: ['is', 'am', 'are', 'be'], answer: 'is' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Hi! I am Finn. This is Benny.", lineZh: '嗨！我是 Finn。這是 Benny。' },
    { speaker: 'Coco', line: "He is Benny. She is me, Coco!", lineZh: '他是 Benny。她是我，Coco！' },
    { speaker: 'Polly', line: "We are all friends. They are nice!", lineZh: '我們都是朋友。他們人很好！' },
    { speaker: 'Finn', line: "I, you, he, she, we, they! Great team!", lineZh: 'I、you、he、she、we、they！好棒的一隊！' },
  ],
};

const L4_M3: Mission = {
  id: 3, slug: 'l4-m3-be-questions', level: 4, title: 'be 疑問句', titleEn: 'Are you…?', theme: '學校路・問問看', themeEmoji: '❓',
  focus: 'Yes/No 疑問：Are you…? Is he…? 短答 Yes, I am. / No, he isn\'t.',
  story: [
    { image: '❓', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "Are you a student? Yes, I am!", dialogueZh: '你是學生嗎？是的，我是！', highlightWords: ['Are', 'am'], sceneEmojis: ['❓', '🎒', '✨'], animation: 'wave' },
    { image: '🐻', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Is he your teacher? No, he isn't. He is my friend.", dialogueZh: '他是你的老師嗎？不，他不是。他是我朋友。', highlightWords: ['Is', "isn't"], sceneEmojis: ['🐻', '🙅', '😊'], animation: 'shake' },
    { image: '😊', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Is she happy? Yes, she is!", dialogueZh: '她開心嗎？是的，她開心！', highlightWords: ['Is', 'is'], sceneEmojis: ['😊', '👧', '💛'], animation: 'bounce' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Now you can ask and answer! Great job!", dialogueZh: '現在你會問也會答了！做得好！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '❓'], animation: 'tada' },
  ],
  words: [
    { en: 'teacher', zh: '老師', image: '👩‍🏫', phonics: '', kk: '[ˈtitʃɚ]', phonicsSound: '', exampleSentence: 'She is a teacher.', exampleZh: '她是老師。' },
    { en: 'student', zh: '學生', image: '🧑‍🎓', phonics: '', kk: '[ˈstudn̩t]', phonicsSound: '', exampleSentence: 'I am a student.', exampleZh: '我是學生。' },
    { en: 'friend', zh: '朋友', image: '🧑‍🤝‍🧑', phonics: '', kk: '[frɛnd]', phonicsSound: '', exampleSentence: 'He is my friend.', exampleZh: '他是我朋友。' },
    { en: 'boy', zh: '男孩', image: '👦', phonics: '', kk: '[bɔɪ]', phonicsSound: '', exampleSentence: 'Is he a boy?', exampleZh: '他是男孩嗎？' },
    { en: 'girl', zh: '女孩', image: '👧', phonics: '', kk: '[ɡɝl]', phonicsSound: '', exampleSentence: 'She is a girl.', exampleZh: '她是女孩。' },
    { en: 'yes', zh: '是的', image: '✅', phonics: '', kk: '[jɛs]', phonicsSound: '', exampleSentence: 'Yes, I am.', exampleZh: '是的，我是。' },
    { en: 'no', zh: '不是', image: '❌', phonics: '', kk: '[no]', phonicsSound: '', exampleSentence: "No, he isn't.", exampleZh: '不，他不是。' },
    { en: 'isn\'t', zh: '不是（他/她）', image: '🚫', phonics: '', kk: '[ˈɪznt]', phonicsSound: '', exampleSentence: "She isn't sad.", exampleZh: '她不難過。' },
    { en: 'am not', zh: '不是（我）', image: '🙅', phonics: '', kk: '[æm nɑt]', phonicsSound: '', exampleSentence: "I am not tired.", exampleZh: '我不累。' },
    { en: 'nice', zh: '好的·友善的', image: '🥰', phonics: '', kk: '[naɪs]', phonicsSound: '', exampleSentence: 'You are nice.', exampleZh: '你人很好。' },
  ],
  sentences: [
    { en: 'Are you a student?', zh: '你是學生嗎？' }, { en: 'Yes, I am.', zh: '是的，我是。' }, { en: 'Is he a teacher?', zh: '他是老師嗎？' }, { en: "No, he isn't.", zh: '不，他不是。' }, { en: 'Is she happy?', zh: '她開心嗎？' }, { en: 'Yes, she is.', zh: '是的，她開心。' },
  ],
  phonicsLetters: ['Are you…?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ you a student?（疑問·你）', options: ['Are', 'Is', 'Am', 'Be'], answer: 'Are' },
    { type: 'fill-blank', question: '___ he a teacher?（疑問·他）', options: ['Is', 'Are', 'Am', 'Be'], answer: 'Is' },
    { type: 'match', question: '👩‍🏫 是誰？', options: ['teacher', 'student', 'friend', 'boy'], answer: 'teacher' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的人', options: ['👩‍🏫', '🧑‍🎓', '👦', '👧'], answer: '🧑‍🎓', image: '🎧' },
    { type: 'fill-blank', question: 'Are you tired? ___, I am.（肯定短答）', options: ['Yes', 'No', 'Not', 'Is'], answer: 'Yes' },
    { type: 'fill-blank', question: 'Is he sad? No, he ___.（否定短答）', options: ["isn't", 'is', 'am', 'are'], answer: "isn't" },
    { type: 'spell', question: '拼拼看：fri _ nd（朋友）', answer: 'friend', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Is he a teacher?', 'Are you a teacher?', 'Is she a teacher?', 'He is a teacher.'], answer: 'Is he a teacher?', image: '🎧' },
    { type: 'read', question: 'Is the teacher a boy?（老師是男生嗎？）', passage: 'This is my teacher.\nShe is a girl.\nShe is very nice.', options: ['No', 'Yes', 'Maybe', 'Sad'], answer: 'No' },
  ],
  talkTimePrompts: ["Ask a friend: Are you happy?", "Answer: Yes, I am. / No, I'm not.", "Ask about someone: Is he/she a student?", "Change it: Is she ___? (a teacher / happy / tired)"],
  reviewQuiz: [
    { type: 'fill-blank', question: '___ she your friend?（疑問·她）', options: ['Is', 'Are', 'Am', 'Be'], answer: 'Is' },
    { type: 'fill-blank', question: 'Are you hungry? Yes, I ___.', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'match', question: '❌ 不是 的英文？', options: ['no', 'yes', 'nice', 'boy'], answer: 'no' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "Are you a student?", lineZh: '你是學生嗎？' },
    { speaker: 'Coco', line: "Yes, I am! Is he a teacher?", lineZh: '是的，我是！他是老師嗎？' },
    { speaker: 'Polly', line: "No, he isn't. He is my friend Benny.", lineZh: '不，他不是。他是我朋友 Benny。' },
    { speaker: 'Benny', line: "Yes! I am a student too!", lineZh: '對！我也是學生！' },
  ],
};

const L4_M4: Mission = {
  id: 4, slug: 'l4-m4-this-that', level: 4, title: 'This / That + 物品', titleEn: 'This is / That is', theme: '學校路・我的書包', themeEmoji: '🎒',
  focus: 'This is / That is / These are / Those are ＋ 教室物品',
  story: [
    { image: '🎒', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "This is my book. That is your pen.", dialogueZh: '這是我的書。那是你的筆。', highlightWords: ['This', 'That'], sceneEmojis: ['📖', '🖊️', '✨'], animation: 'wave' },
    { image: '📚', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "These are books. Those are bags!", dialogueZh: '這些是書。那些是書包！', highlightWords: ['These', 'Those'], sceneEmojis: ['📚', '🎒', '😊'], animation: 'bounce' },
    { image: '✏️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "What is this? It is a pencil!", dialogueZh: '這是什麼？這是一枝鉛筆！', highlightWords: ['this'], sceneEmojis: ['✏️', '❓', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "This, that, these, those — you did it!", dialogueZh: 'This、that、these、those —— 你做到了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🎒'], animation: 'bounce' },
  ],
  words: [
    { en: 'this', zh: '這個', image: '👉', phonics: '', kk: '[ðɪs]', phonicsSound: '', exampleSentence: 'This is a book.', exampleZh: '這是一本書。' },
    { en: 'that', zh: '那個', image: '👆', phonics: '', kk: '[ðæt]', phonicsSound: '', exampleSentence: 'That is a pen.', exampleZh: '那是一枝筆。' },
    { en: 'these', zh: '這些', image: '👐', phonics: '', kk: '[ðiz]', phonicsSound: '', exampleSentence: 'These are books.', exampleZh: '這些是書。' },
    { en: 'those', zh: '那些', image: '🙌', phonics: '', kk: '[ðoz]', phonicsSound: '', exampleSentence: 'Those are bags.', exampleZh: '那些是書包。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'This is my book.', exampleZh: '這是我的書。' },
    { en: 'pen', zh: '筆', image: '🖊️', phonics: '', kk: '[pɛn]', phonicsSound: '', exampleSentence: 'That is a pen.', exampleZh: '那是一枝筆。' },
    { en: 'pencil', zh: '鉛筆', image: '✏️', phonics: '', kk: '[ˈpɛnsl̩]', phonicsSound: '', exampleSentence: 'It is a pencil.', exampleZh: '這是一枝鉛筆。' },
    { en: 'bag', zh: '書包', image: '🎒', phonics: '', kk: '[bæɡ]', phonicsSound: '', exampleSentence: 'This is my bag.', exampleZh: '這是我的書包。' },
    { en: 'desk', zh: '書桌', image: '🪑', phonics: '', kk: '[dɛsk]', phonicsSound: '', exampleSentence: 'That is a desk.', exampleZh: '那是一張書桌。' },
    { en: 'ruler', zh: '尺', image: '📏', phonics: '', kk: '[ˈrulɚ]', phonicsSound: '', exampleSentence: 'This is a ruler.', exampleZh: '這是一把尺。' },
  ],
  sentences: [
    { en: 'This is a book.', zh: '這是一本書。' }, { en: 'That is a pen.', zh: '那是一枝筆。' }, { en: 'These are bags.', zh: '這些是書包。' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'Is that your desk?', zh: '那是你的書桌嗎？' }, { en: 'Yes, it is.', zh: '是的，它是。' },
  ],
  phonicsLetters: ['This is…'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ is a book.（這·單）', options: ['This', 'These', 'Those', 'Are'], answer: 'This' },
    { type: 'fill-blank', question: '___ are bags.（這些·複）', options: ['These', 'This', 'That', 'Is'], answer: 'These' },
    { type: 'match', question: '✏️ 是什麼？', options: ['pencil', 'pen', 'book', 'ruler'], answer: 'pencil' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的文具', options: ['📖', '🖊️', '✏️', '📏'], answer: '📏', image: '🎧' },
    { type: 'match', question: '配對：文具配圖', options: ['book-📖', 'pen-🖊️', 'bag-🎒', 'desk-🪑'], answer: 'book-📖' },
    { type: 'fill-blank', question: '句型代換：___ is a pen.（那·單）', options: ['That', 'These', 'Those', 'Are'], answer: 'That' },
    { type: 'spell', question: '拼拼看：p _ ncil（鉛筆）', answer: 'pencil', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['These are books.', 'This is a book.', 'Those are books.', 'That is a book.'], answer: 'These are books.', image: '🎧' },
    { type: 'read', question: 'What is on the desk?（書桌上是什麼？）', passage: 'This is my desk.\nThat is my bag.\nA book and a pen are on the desk.', options: ['a book and a pen', 'a bag', 'a ruler', 'a pencil'], answer: 'a book and a pen' },
  ],
  talkTimePrompts: ["Point near: This is a ___.", "Point far: That is a ___.", "Ask: What is this?", "Change it: These are ___. (books/pens/bags)"],
  reviewQuiz: [
    { type: 'fill-blank', question: '___ are bags (far).（那些）', options: ['Those', 'These', 'This', 'Is'], answer: 'Those' },
    { type: 'match', question: '🎒 是什麼？', options: ['bag', 'desk', 'book', 'ruler'], answer: 'bag' },
    { type: 'spell', question: '拼拼看：r _ ler（尺）', answer: 'ruler', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Ruby', line: "This is my book. What is that?", lineZh: '這是我的書。那是什麼？' },
    { speaker: 'Benny', line: "That is my bag. These are my pens.", lineZh: '那是我的書包。這些是我的筆。' },
    { speaker: 'Coco', line: "Wow! Those are nice pencils!", lineZh: '哇！那些是很棒的鉛筆！' },
    { speaker: 'Ruby', line: "Thank you! This is fun!", lineZh: '謝謝！這好好玩！' },
  ],
};

const L4_M5: Mission = {
  id: 5, slug: 'l4-m5-review-be', level: 4, title: 'Review① be 動詞', titleEn: 'Review: be', theme: '學校路・複習關', themeEmoji: '🔄',
  focus: '螺旋複習①：I am / He is / They are ＋ 疑問短答 ＋ this/that',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review! I am, you are, he is!", dialogueZh: '來複習！I am、you are、he is！', highlightWords: ['am', 'are', 'is'], sceneEmojis: ['🔄', '📚', '✨'], animation: 'wave' },
    { image: '❓', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Are you ready? Yes, I am!", dialogueZh: '你準備好了嗎？是的，我準備好了！', highlightWords: ['Are', 'am'], sceneEmojis: ['❓', '💪', '😊'], animation: 'bounce' },
    { image: '🎒', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "This is a book. These are bags. Well done!", dialogueZh: '這是書。這些是書包。做得好！', highlightWords: ['This', 'These'], sceneEmojis: ['📖', '🎒', '⭐'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know your be verbs! Amazing!", dialogueZh: '你會 be 動詞了！太厲害了！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy.', exampleZh: '我很開心。' },
    { en: 'tired', zh: '累的', image: '😩', phonics: '', kk: '[taɪrd]', phonicsSound: '', exampleSentence: 'He is tired.', exampleZh: '他很累。' },
    { en: 'he', zh: '他', image: '👦', phonics: '', kk: '[hi]', phonicsSound: '', exampleSentence: 'He is my friend.', exampleZh: '他是我朋友。' },
    { en: 'she', zh: '她', image: '👧', phonics: '', kk: '[ʃi]', phonicsSound: '', exampleSentence: 'She is nice.', exampleZh: '她人很好。' },
    { en: 'they', zh: '他們', image: '👨‍👩‍👧', phonics: '', kk: '[ðe]', phonicsSound: '', exampleSentence: 'They are here.', exampleZh: '他們在這裡。' },
    { en: 'teacher', zh: '老師', image: '👩‍🏫', phonics: '', kk: '[ˈtitʃɚ]', phonicsSound: '', exampleSentence: 'She is a teacher.', exampleZh: '她是老師。' },
    { en: 'student', zh: '學生', image: '🧑‍🎓', phonics: '', kk: '[ˈstudn̩t]', phonicsSound: '', exampleSentence: 'I am a student.', exampleZh: '我是學生。' },
    { en: 'this', zh: '這個', image: '👉', phonics: '', kk: '[ðɪs]', phonicsSound: '', exampleSentence: 'This is a book.', exampleZh: '這是一本書。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'This is my book.', exampleZh: '這是我的書。' },
    { en: 'friend', zh: '朋友', image: '🧑‍🤝‍🧑', phonics: '', kk: '[frɛnd]', phonicsSound: '', exampleSentence: 'We are friends.', exampleZh: '我們是朋友。' },
  ],
  sentences: [
    { en: 'I am a student.', zh: '我是學生。' }, { en: 'She is my teacher.', zh: '她是我的老師。' }, { en: 'Are they happy?', zh: '他們開心嗎？' }, { en: 'Yes, they are.', zh: '是的，他們開心。' }, { en: 'This is my book.', zh: '這是我的書。' }, { en: 'He is not tired.', zh: '他不累。' },
  ],
  phonicsLetters: ['review be'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'She ___ a teacher.', options: ['is', 'am', 'are', 'be'], answer: 'is' },
    { type: 'fill-blank', question: 'They ___ my friends.', options: ['are', 'am', 'is', 'be'], answer: 'are' },
    { type: 'fill-blank', question: 'I ___ happy.', options: ['am', 'is', 'are', 'be'], answer: 'am' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的人', options: ['👩‍🏫', '🧑‍🎓', '👦', '👧'], answer: '👩‍🏫', image: '🎧' },
    { type: 'fill-blank', question: 'He ___ tired.（be動詞）', options: ['is', 'am', 'are', 'be'], answer: 'is' },
    { type: 'fill-blank', question: 'Are you a student? Yes, I ___.', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'spell', question: '拼拼看：st _ dent（學生）', answer: 'student', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['She is my teacher.', 'He is my teacher.', 'They are teachers.', 'She is a student.'], answer: 'She is my teacher.', image: '🎧' },
    { type: 'read', question: 'Are they sad?（他們難過嗎？）', passage: 'Finn and Coco are at school.\nThey are with friends.\nThey are very happy!', options: ['No, they are happy', 'Yes, they are sad', 'They are tired', 'They are hungry'], answer: 'No, they are happy' },
  ],
  talkTimePrompts: ["Say: I am a student.", "Introduce: He is / She is my friend.", "Ask and answer: Are you happy? Yes, I am.", "Point: This is my ___."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'We ___ friends.（be動詞）', options: ['are', 'am', 'is', 'be'], answer: 'are' },
    { type: 'fill-blank', question: '___ she happy?（疑問·她）', options: ['Is', 'Are', 'Am', 'Be'], answer: 'Is' },
    { type: 'read', question: 'Who is a teacher?（誰是老師？）', passage: 'Coco is a student.\nMiss Vega is a teacher.\nBenny is a student.', options: ['Miss Vega', 'Coco', 'Benny', 'Finn'], answer: 'Miss Vega' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Are you ready to review?", lineZh: '準備好複習了嗎？' },
    { speaker: 'Coco', line: "Yes, I am! I am a student.", lineZh: '是的！我是學生。' },
    { speaker: 'Ruby', line: "She is my friend. They are nice.", lineZh: '她是我朋友。他們人很好。' },
    { speaker: 'Finn', line: "Great! You know your be verbs!", lineZh: '太棒了！你會 be 動詞了！' },
  ],
};

const L4_M6: Mission = {
  id: 6, slug: 'l4-m6-i-like', level: 4, title: 'I like…', titleEn: 'I like / I don\'t like', theme: '學校路・我喜歡', themeEmoji: '❤️',
  focus: '句型 I like + N / I don\'t like + N；句型代換替換名詞',
  story: [
    { image: '❤️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I like pizza! I like music too!", dialogueZh: '我喜歡披薩！我也喜歡音樂！', highlightWords: ['like'], sceneEmojis: ['🍕', '🎵', '❤️'], animation: 'bounce' },
    { image: '🚫', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "I don't like candy. I like books!", dialogueZh: '我不喜歡糖果。我喜歡書！', highlightWords: ["don't", 'like'], sceneEmojis: ['🍬', '📚', '😊'], animation: 'shake' },
    { image: '🎨', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "I like art and games! What do you like?", dialogueZh: '我喜歡畫畫和遊戲！你喜歡什麼？', highlightWords: ['like'], sceneEmojis: ['🎨', '🎮', '⭐'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'wave', characterName: 'Coco', dialogue: "Now you can say what you like! Yay!", dialogueZh: '現在你會說你喜歡什麼了！耶！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '❤️'], animation: 'bounce' },
  ],
  words: [
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'I like pizza.', exampleZh: '我喜歡披薩。' },
    { en: 'pizza', zh: '披薩', image: '🍕', phonics: '', kk: '[ˈpitsə]', phonicsSound: '', exampleSentence: 'I like pizza.', exampleZh: '我喜歡披薩。' },
    { en: 'ice cream', zh: '冰淇淋', image: '🍦', phonics: '', kk: '[aɪs krim]', phonicsSound: '', exampleSentence: 'I like ice cream.', exampleZh: '我喜歡冰淇淋。' },
    { en: 'candy', zh: '糖果', image: '🍬', phonics: '', kk: '[ˈkændi]', phonicsSound: '', exampleSentence: "I don't like candy.", exampleZh: '我不喜歡糖果。' },
    { en: 'music', zh: '音樂', image: '🎵', phonics: '', kk: '[ˈmjuzɪk]', phonicsSound: '', exampleSentence: 'I like music.', exampleZh: '我喜歡音樂。' },
    { en: 'art', zh: '美術', image: '🎨', phonics: '', kk: '[ɑrt]', phonicsSound: '', exampleSentence: 'I like art.', exampleZh: '我喜歡美術。' },
    { en: 'game', zh: '遊戲', image: '🎮', phonics: '', kk: '[ɡem]', phonicsSound: '', exampleSentence: 'I like games.', exampleZh: '我喜歡遊戲。' },
    { en: 'sport', zh: '運動', image: '⚽', phonics: '', kk: '[spɔrt]', phonicsSound: '', exampleSentence: 'I like sports.', exampleZh: '我喜歡運動。' },
    { en: 'book', zh: '書', image: '📚', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'I like books.', exampleZh: '我喜歡書。' },
    { en: "don't like", zh: '不喜歡', image: '🚫', phonics: '', kk: '[dont laɪk]', phonicsSound: '', exampleSentence: "I don't like candy.", exampleZh: '我不喜歡糖果。' },
  ],
  sentences: [
    { en: 'I like pizza.', zh: '我喜歡披薩。' }, { en: 'I like music and art.', zh: '我喜歡音樂和美術。' }, { en: "I don't like candy.", zh: '我不喜歡糖果。' }, { en: 'What do you like?', zh: '你喜歡什麼？' }, { en: 'I like games!', zh: '我喜歡遊戲！' }, { en: "I don't like sports.", zh: '我不喜歡運動。' },
  ],
  phonicsLetters: ['I like ___'],
  warmUpQuestions: [
    { type: 'match', question: '🍕 是什麼？', options: ['pizza', 'candy', 'book', 'art'], answer: 'pizza' },
    { type: 'fill-blank', question: 'I ___ music.（喜歡）', options: ['like', 'am', 'is', 'do'], answer: 'like' },
    { type: 'match', question: '🎨 是什麼？', options: ['art', 'music', 'game', 'sport'], answer: 'art' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的東西', options: ['🍕', '🍦', '🍬', '🎵'], answer: '🍦', image: '🎧' },
    { type: 'match', question: '配對：字配圖', options: ['pizza-🍕', 'music-🎵', 'art-🎨', 'game-🎮'], answer: 'pizza-🍕' },
    { type: 'fill-blank', question: '句型代換：I like ___.（運動）', options: ['sports', 'candy', 'sad', 'is'], answer: 'sports' },
    { type: 'fill-blank', question: 'I ___ like candy.（不喜歡）', options: ["don't", 'am', 'not', 'no'], answer: "don't" },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I like music.', 'I like pizza.', "I don't like music.", 'Do you like music?'], answer: 'I like music.', image: '🎧' },
    { type: 'read', question: 'What does Benny like?（Benny 喜歡什麼？）', passage: "Benny doesn't like candy.\nHe likes books.\nHe likes reading!", options: ['books', 'candy', 'pizza', 'games'], answer: 'books' },
  ],
  talkTimePrompts: ["What do you like? I like ___.", "Say something you don't like: I don't like ___.", "Name three things you like!", "Change it: I like ___ (pizza/music/games)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'I ___ ice cream!（喜歡）', options: ['like', 'am', 'is', 'do'], answer: 'like' },
    { type: 'match', question: '🍬 是什麼？', options: ['candy', 'pizza', 'book', 'sport'], answer: 'candy' },
    { type: 'fill-blank', question: "I don't ___ sports.（喜歡）", options: ['like', 'likes', 'am', 'is'], answer: 'like' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I like pizza and music! What do you like?", lineZh: '我喜歡披薩和音樂！你喜歡什麼？' },
    { speaker: 'Benny', line: "I like books. I don't like candy.", lineZh: '我喜歡書。我不喜歡糖果。' },
    { speaker: 'Ruby', line: "I like art and games!", lineZh: '我喜歡美術和遊戲！' },
    { speaker: 'Coco', line: "We all like different things! Cool!", lineZh: '我們喜歡不同的東西！好酷！' },
  ],
};

const L4_M7: Mission = {
  id: 7, slug: 'l4-m7-do-you-like', level: 4, title: 'Do you like…?', titleEn: 'Do you like…?', theme: '學校路・你喜歡嗎', themeEmoji: '🤔',
  focus: '疑問 Do you like…? 短答 Yes, I do. / No, I don\'t.',
  story: [
    { image: '🤔', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "Do you like pizza? Yes, I do!", dialogueZh: '你喜歡披薩嗎？是的，我喜歡！', highlightWords: ['Do', 'do'], sceneEmojis: ['🍕', '❓', '✨'], animation: 'wave' },
    { image: '🐶', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Do you like dogs? No, I don't. I like cats!", dialogueZh: '你喜歡狗嗎？不，我不喜歡。我喜歡貓！', highlightWords: ["don't"], sceneEmojis: ['🐶', '🙅', '🐱'], animation: 'shake' },
    { image: '🎵', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Do you like music? Yes, I do! I love it!", dialogueZh: '你喜歡音樂嗎？是的！我很愛！', highlightWords: ['Do', 'do'], sceneEmojis: ['🎵', '✅', '😊'], animation: 'bounce' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Ask your friends: Do you like…? So fun!", dialogueZh: '問問你的朋友：你喜歡…嗎？好好玩！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🤔'], animation: 'tada' },
  ],
  words: [
    { en: 'do', zh: '（助動詞·問句用）', image: '❓', phonics: '', kk: '[du]', phonicsSound: '', exampleSentence: 'Do you like it?', exampleZh: '你喜歡它嗎？' },
    { en: "don't", zh: '不（否定）', image: '🚫', phonics: '', kk: '[dont]', phonicsSound: '', exampleSentence: "No, I don't.", exampleZh: '不，我不喜歡。' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'Do you like pizza?', exampleZh: '你喜歡披薩嗎？' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'Do you like dogs?', exampleZh: '你喜歡狗嗎？' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: '', kk: '[kæt]', phonicsSound: '', exampleSentence: 'I like cats.', exampleZh: '我喜歡貓。' },
    { en: 'pizza', zh: '披薩', image: '🍕', phonics: '', kk: '[ˈpitsə]', phonicsSound: '', exampleSentence: 'Do you like pizza?', exampleZh: '你喜歡披薩嗎？' },
    { en: 'music', zh: '音樂', image: '🎵', phonics: '', kk: '[ˈmjuzɪk]', phonicsSound: '', exampleSentence: 'Do you like music?', exampleZh: '你喜歡音樂嗎？' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'Do you like apples?', exampleZh: '你喜歡蘋果嗎？' },
    { en: 'milk', zh: '牛奶', image: '🥛', phonics: '', kk: '[mɪlk]', phonicsSound: '', exampleSentence: 'Do you like milk?', exampleZh: '你喜歡牛奶嗎？' },
    { en: 'love', zh: '很愛', image: '💕', phonics: '', kk: '[lʌv]', phonicsSound: '', exampleSentence: 'I love it!', exampleZh: '我很愛！' },
  ],
  sentences: [
    { en: 'Do you like pizza?', zh: '你喜歡披薩嗎？' }, { en: 'Yes, I do.', zh: '是的，我喜歡。' }, { en: 'Do you like dogs?', zh: '你喜歡狗嗎？' }, { en: "No, I don't.", zh: '不，我不喜歡。' }, { en: 'Do you like music?', zh: '你喜歡音樂嗎？' }, { en: 'I love music!', zh: '我很愛音樂！' },
  ],
  phonicsLetters: ['Do you like…?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ you like pizza?（問句）', options: ['Do', 'Are', 'Is', 'Am'], answer: 'Do' },
    { type: 'fill-blank', question: 'Do you like it? Yes, I ___.', options: ['do', 'am', 'is', 'like'], answer: 'do' },
    { type: 'match', question: '🥛 是什麼？', options: ['milk', 'apple', 'pizza', 'music'], answer: 'milk' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的東西', options: ['🐶', '🐱', '🍕', '🥛'], answer: '🐱', image: '🎧' },
    { type: 'fill-blank', question: 'Do you like dogs? No, I ___.（否定短答）', options: ["don't", 'do', 'am', 'not'], answer: "don't" },
    { type: 'fill-blank', question: '___ you like music?（問句）', options: ['Do', 'Are', 'Is', 'Be'], answer: 'Do' },
    { type: 'spell', question: '拼拼看：mil _ （牛奶）', answer: 'milk', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Do you like dogs?', 'Do you like cats?', 'I like dogs.', 'Do you like pizza?'], answer: 'Do you like dogs?', image: '🎧' },
    { type: 'read', question: 'Does Coco like dogs?（Coco 喜歡狗嗎？）', passage: "Coco doesn't like dogs.\nShe likes cats.\nCats are her favorite!", options: ['No', 'Yes', 'Maybe', 'A lot'], answer: 'No' },
  ],
  talkTimePrompts: ["Ask a friend: Do you like ___?", "Answer: Yes, I do. / No, I don't.", "Ask about pizza, dogs, music!", "Change it: Do you like ___? (apples/milk/games)"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Do you like apples? Yes, I ___.', options: ['do', 'am', 'is', 'like'], answer: 'do' },
    { type: 'match', question: '💕 很愛 的英文？', options: ['love', 'like', 'do', 'milk'], answer: 'love' },
    { type: 'fill-blank', question: "Do you like candy? No, I ___.", options: ["don't", 'do', 'am', 'not'], answer: "don't" },
  ],
  videoScript: [
    { speaker: 'Polly', line: "Do you like pizza?", lineZh: '你喜歡披薩嗎？' },
    { speaker: 'Coco', line: "Yes, I do! Do you like dogs?", lineZh: '是的！你喜歡狗嗎？' },
    { speaker: 'Polly', line: "No, I don't. I like cats!", lineZh: '不，我不喜歡。我喜歡貓！' },
    { speaker: 'Benny', line: "Me too! I love cats!", lineZh: '我也是！我很愛貓！' },
  ],
};

const L4_M8: Mission = {
  id: 8, slug: 'l4-m8-i-have', level: 4, title: 'I have…', titleEn: 'I have / Do you have…?', theme: '學校路・我有什麼', themeEmoji: '🎒',
  focus: '句型 I have + N / Do you have…? Yes, I do. / No, I don\'t.',
  story: [
    { image: '🎒', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "I have a bag. I have a book too!", dialogueZh: '我有一個書包。我也有一本書！', highlightWords: ['have'], sceneEmojis: ['🎒', '📖', '✨'], animation: 'wave' },
    { image: '🖊️', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "Do you have a pen? Yes, I do!", dialogueZh: '你有筆嗎？是的，我有！', highlightWords: ['have', 'do'], sceneEmojis: ['🖊️', '❓', '✅'], animation: 'bounce' },
    { image: '⚽', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Do you have a ball? No, I don't.", dialogueZh: '你有球嗎？不，我沒有。', highlightWords: ["don't"], sceneEmojis: ['⚽', '🙅', '😊'], animation: 'shake' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Now you can say what you have! Great!", dialogueZh: '現在你會說你有什麼了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🎒'], animation: 'tada' },
  ],
  words: [
    { en: 'have', zh: '有', image: '🤲', phonics: '', kk: '[hæv]', phonicsSound: '', exampleSentence: 'I have a bag.', exampleZh: '我有一個書包。' },
    { en: 'bag', zh: '書包', image: '🎒', phonics: '', kk: '[bæɡ]', phonicsSound: '', exampleSentence: 'I have a bag.', exampleZh: '我有書包。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'I have a book.', exampleZh: '我有書。' },
    { en: 'pen', zh: '筆', image: '🖊️', phonics: '', kk: '[pɛn]', phonicsSound: '', exampleSentence: 'Do you have a pen?', exampleZh: '你有筆嗎？' },
    { en: 'toy', zh: '玩具', image: '🧸', phonics: '', kk: '[tɔɪ]', phonicsSound: '', exampleSentence: 'I have a toy.', exampleZh: '我有玩具。' },
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'Do you have a ball?', exampleZh: '你有球嗎？' },
    { en: 'bike', zh: '腳踏車', image: '🚲', phonics: '', kk: '[baɪk]', phonicsSound: '', exampleSentence: 'I have a bike.', exampleZh: '我有腳踏車。' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: '', kk: '[hæt]', phonicsSound: '', exampleSentence: 'I have a hat.', exampleZh: '我有帽子。' },
    { en: 'has', zh: '有（他/她）', image: '👉', phonics: '', kk: '[hæz]', phonicsSound: '', exampleSentence: 'She has a dog.', exampleZh: '她有一隻狗。' },
    { en: "don't have", zh: '沒有', image: '🚫', phonics: '', kk: '[dont hæv]', phonicsSound: '', exampleSentence: "I don't have a ball.", exampleZh: '我沒有球。' },
  ],
  sentences: [
    { en: 'I have a bag.', zh: '我有一個書包。' }, { en: 'I have a book and a pen.', zh: '我有一本書和一枝筆。' }, { en: 'Do you have a toy?', zh: '你有玩具嗎？' }, { en: 'Yes, I do.', zh: '是的，我有。' }, { en: "I don't have a bike.", zh: '我沒有腳踏車。' }, { en: 'She has a hat.', zh: '她有一頂帽子。' },
  ],
  phonicsLetters: ['I have…'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ a bag.（有）', options: ['have', 'am', 'is', 'do'], answer: 'have' },
    { type: 'match', question: '🧸 是什麼？', options: ['toy', 'ball', 'bike', 'hat'], answer: 'toy' },
    { type: 'fill-blank', question: '___ you have a pen?（問句）', options: ['Do', 'Are', 'Is', 'Am'], answer: 'Do' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的東西', options: ['🎒', '📖', '⚽', '🚲'], answer: '🚲', image: '🎧' },
    { type: 'match', question: '配對：字配圖', options: ['bag-🎒', 'ball-⚽', 'bike-🚲', 'hat-🎩'], answer: 'bag-🎒' },
    { type: 'fill-blank', question: '句型代換：I have a ___.（玩具）', options: ['toy', 'happy', 'like', 'is'], answer: 'toy' },
    { type: 'fill-blank', question: 'Do you have a ball? No, I ___.', options: ["don't", 'do', 'am', 'not'], answer: "don't" },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I have a book.', 'I have a bag.', 'Do you have a book?', "I don't have a book."], answer: 'I have a book.', image: '🎧' },
    { type: 'read', question: 'What does Ruby have?（Ruby 有什麼？）', passage: 'Ruby has a bag.\nIn the bag, she has a book and a pen.\nShe does not have a ball.', options: ['a book and a pen', 'a ball', 'a bike', 'a toy'], answer: 'a book and a pen' },
  ],
  talkTimePrompts: ["What do you have? I have a ___.", "Ask: Do you have a ___?", "Answer: Yes, I do. / No, I don't.", "Change it: I have a ___ (toy/bike/hat)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Do you have a toy? Yes, I ___.', options: ['do', 'am', 'is', 'have'], answer: 'do' },
    { type: 'match', question: '🚲 是什麼？', options: ['bike', 'ball', 'bag', 'hat'], answer: 'bike' },
    { type: 'fill-blank', question: 'She ___ a dog.（有·第三人稱）', options: ['has', 'have', 'is', 'do'], answer: 'has' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "I have a bag and a book. Do you have a pen?", lineZh: '我有書包和書。你有筆嗎？' },
    { speaker: 'Ruby', line: "Yes, I do! Do you have a ball?", lineZh: '是的！你有球嗎？' },
    { speaker: 'Finn', line: "No, I don't. But I have a bike!", lineZh: '不，我沒有。但我有腳踏車！' },
    { speaker: 'Benny', line: "Cool! We all have something fun!", lineZh: '酷！我們都有好玩的東西！' },
  ],
};

const L4_M9: Mission = {
  id: 9, slug: 'l4-m9-i-can', level: 4, title: 'I can…', titleEn: 'I can / I can\'t', theme: '學校路・我會做', themeEmoji: '💪',
  focus: '句型 I can + V（能力）/ I can\'t + V；句型代換替換動詞',
  story: [
    { image: '💪', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "I can run! I can jump! Can you?", dialogueZh: '我會跑！我會跳！你會嗎？', highlightWords: ['can'], sceneEmojis: ['🏃', '🤸', '💪'], animation: 'bounce' },
    { image: '🏊', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I can swim! But I can't fly.", dialogueZh: '我會游泳！但我不會飛。', highlightWords: ['can', "can't"], sceneEmojis: ['🏊', '🚫', '😊'], animation: 'wave' },
    { image: '🎨', character: '🐰', characterKey: 'ruby', characterAction: 'write', characterName: 'Ruby', dialogue: "I can draw and write! What can you do?", dialogueZh: '我會畫畫和寫字！你會做什麼？', highlightWords: ['can'], sceneEmojis: ['🎨', '✏️', '⭐'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'thumbsup', characterName: 'Finn', dialogue: "You can do so many things! Amazing!", dialogueZh: '你會好多事情！太厲害了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '💪'], animation: 'bounce' },
  ],
  words: [
    { en: 'can', zh: '會·能', image: '💪', phonics: '', kk: '[kæn]', phonicsSound: '', exampleSentence: 'I can swim.', exampleZh: '我會游泳。' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'I can swim.', exampleZh: '我會游泳。' },
    { en: 'run', zh: '跑', image: '🏃', phonics: '', kk: '[rʌn]', phonicsSound: '', exampleSentence: 'I can run fast.', exampleZh: '我跑得快。' },
    { en: 'jump', zh: '跳', image: '🤸', phonics: '', kk: '[dʒʌmp]', phonicsSound: '', exampleSentence: 'I can jump high.', exampleZh: '我跳得高。' },
    { en: 'sing', zh: '唱歌', image: '🎤', phonics: '', kk: '[sɪŋ]', phonicsSound: '', exampleSentence: 'I can sing.', exampleZh: '我會唱歌。' },
    { en: 'dance', zh: '跳舞', image: '💃', phonics: '', kk: '[dæns]', phonicsSound: '', exampleSentence: 'I can dance.', exampleZh: '我會跳舞。' },
    { en: 'draw', zh: '畫畫', image: '🎨', phonics: '', kk: '[drɔ]', phonicsSound: '', exampleSentence: 'I can draw.', exampleZh: '我會畫畫。' },
    { en: 'write', zh: '寫字', image: '✏️', phonics: '', kk: '[raɪt]', phonicsSound: '', exampleSentence: 'I can write.', exampleZh: '我會寫字。' },
    { en: 'fly', zh: '飛', image: '🕊️', phonics: '', kk: '[flaɪ]', phonicsSound: '', exampleSentence: "I can't fly.", exampleZh: '我不會飛。' },
    { en: "can't", zh: '不會·不能', image: '🚫', phonics: '', kk: '[kænt]', phonicsSound: '', exampleSentence: "I can't fly.", exampleZh: '我不會飛。' },
  ],
  sentences: [
    { en: 'I can swim.', zh: '我會游泳。' }, { en: 'I can run and jump.', zh: '我會跑也會跳。' }, { en: "I can't fly.", zh: '我不會飛。' }, { en: 'Can you sing?', zh: '你會唱歌嗎？' }, { en: 'Yes, I can!', zh: '是的，我會！' }, { en: 'What can you do?', zh: '你會做什麼？' },
  ],
  phonicsLetters: ['I can ___'],
  warmUpQuestions: [
    { type: 'match', question: '🏊 是什麼動作？', options: ['swim', 'run', 'jump', 'sing'], answer: 'swim' },
    { type: 'fill-blank', question: 'I ___ run fast.（會）', options: ['can', 'am', 'is', 'do'], answer: 'can' },
    { type: 'match', question: '🎨 是什麼動作？', options: ['draw', 'write', 'sing', 'dance'], answer: 'draw' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🏊', '🏃', '🤸', '🎤'], answer: '🤸', image: '🎧' },
    { type: 'match', question: '配對：動作配圖', options: ['swim-🏊', 'run-🏃', 'sing-🎤', 'dance-💃'], answer: 'swim-🏊' },
    { type: 'fill-blank', question: '句型代換：I can ___.（跳舞）', options: ['dance', 'happy', 'book', 'is'], answer: 'dance' },
    { type: 'fill-blank', question: "I ___ fly.（不會）", options: ["can't", 'can', 'am', 'not'], answer: "can't" },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I can swim.', 'I can sing.', "I can't swim.", 'Can you swim?'], answer: 'I can swim.', image: '🎧' },
    { type: 'read', question: 'What can Coco NOT do?（Coco 不會什麼？）', passage: 'Coco can swim.\nShe can run and jump.\nBut she can not fly.', options: ['fly', 'swim', 'run', 'jump'], answer: 'fly' },
  ],
  talkTimePrompts: ["What can you do? I can ___.", "Say something you can't do: I can't ___.", "Ask: Can you swim?", "Change it: I can ___ (run/sing/draw)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'I ___ sing a song.（會）', options: ['can', 'am', 'is', 'do'], answer: 'can' },
    { type: 'match', question: '✏️ 是什麼動作？', options: ['write', 'draw', 'run', 'fly'], answer: 'write' },
    { type: 'fill-blank', question: 'Can you dance? Yes, I ___.', options: ['can', 'am', 'do', 'is'], answer: 'can' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "I can run and jump! Can you swim?", lineZh: '我會跑也會跳！你會游泳嗎？' },
    { speaker: 'Coco', line: "Yes, I can! But I can't fly.", lineZh: '是的，我會！但我不會飛。' },
    { speaker: 'Ruby', line: "I can draw and write! What can you do?", lineZh: '我會畫畫和寫字！你會做什麼？' },
    { speaker: 'Finn', line: "We can do so many things! Awesome!", lineZh: '我們會好多事！太棒了！' },
  ],
};

const L4_M10: Mission = {
  id: 10, slug: 'l4-m10-review-like-have-can', level: 4, title: 'Review② like/have/can', titleEn: 'Review: like/have/can', theme: '學校路・複習關', themeEmoji: '🔄',
  focus: '螺旋複習②：I like / I have / I can ＋ 疑問短答',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review! I like, I have, I can!", dialogueZh: '來複習！I like、I have、I can！', highlightWords: ['like', 'have', 'can'], sceneEmojis: ['❤️', '🎒', '💪'], animation: 'wave' },
    { image: '🍕', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I like pizza. I have a book. I can swim!", dialogueZh: '我喜歡披薩。我有書。我會游泳！', highlightWords: ['like', 'have', 'can'], sceneEmojis: ['🍕', '📖', '🏊'], animation: 'bounce' },
    { image: '❓', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "Do you like it? Do you have it? Can you do it?", dialogueZh: '你喜歡嗎？你有嗎？你會嗎？', highlightWords: ['Do', 'Can'], sceneEmojis: ['❓', '🤔', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You know like, have, and can! Super!", dialogueZh: '你會 like、have、can 了！超棒！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'I like music.', exampleZh: '我喜歡音樂。' },
    { en: 'have', zh: '有', image: '🤲', phonics: '', kk: '[hæv]', phonicsSound: '', exampleSentence: 'I have a bag.', exampleZh: '我有書包。' },
    { en: 'can', zh: '會·能', image: '💪', phonics: '', kk: '[kæn]', phonicsSound: '', exampleSentence: 'I can run.', exampleZh: '我會跑。' },
    { en: 'pizza', zh: '披薩', image: '🍕', phonics: '', kk: '[ˈpitsə]', phonicsSound: '', exampleSentence: 'I like pizza.', exampleZh: '我喜歡披薩。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'I have a book.', exampleZh: '我有書。' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'I can swim.', exampleZh: '我會游泳。' },
    { en: 'run', zh: '跑', image: '🏃', phonics: '', kk: '[rʌn]', phonicsSound: '', exampleSentence: 'I can run.', exampleZh: '我會跑。' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'Do you like dogs?', exampleZh: '你喜歡狗嗎？' },
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'I have a ball.', exampleZh: '我有球。' },
    { en: 'sing', zh: '唱歌', image: '🎤', phonics: '', kk: '[sɪŋ]', phonicsSound: '', exampleSentence: 'I can sing.', exampleZh: '我會唱歌。' },
  ],
  sentences: [
    { en: 'I like pizza.', zh: '我喜歡披薩。' }, { en: 'I have a ball.', zh: '我有一顆球。' }, { en: 'I can swim.', zh: '我會游泳。' }, { en: 'Do you like dogs?', zh: '你喜歡狗嗎？' }, { en: 'Can you sing?', zh: '你會唱歌嗎？' }, { en: 'Yes, I can!', zh: '是的，我會！' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ pizza.（喜歡）', options: ['like', 'have', 'can', 'am'], answer: 'like' },
    { type: 'fill-blank', question: 'I ___ a book.（有）', options: ['have', 'like', 'can', 'is'], answer: 'have' },
    { type: 'fill-blank', question: 'I ___ swim.（會）', options: ['can', 'like', 'have', 'am'], answer: 'can' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🏊', '🏃', '🎤', '⚽'], answer: '🎤', image: '🎧' },
    { type: 'fill-blank', question: 'Do you ___ dogs?（喜歡·問句）', options: ['like', 'have', 'can', 'are'], answer: 'like' },
    { type: 'fill-blank', question: 'Can you sing? Yes, I ___.', options: ['can', 'do', 'am', 'like'], answer: 'can' },
    { type: 'spell', question: '拼拼看：sw _ m（游泳）', answer: 'swim', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I can swim.', 'I like swim.', 'I have a swim.', 'Can you swim?'], answer: 'I can swim.', image: '🎧' },
    { type: 'read', question: 'What can Coco do?（Coco 會什麼？）', passage: 'Coco likes pizza.\nShe has a book.\nShe can swim very well!', options: ['swim', 'fly', 'cook', 'drive'], answer: 'swim' },
  ],
  talkTimePrompts: ["Say: I like ___, I have ___, I can ___.", "Ask a friend one question with 'Do you…?'", "Ask a friend one question with 'Can you…?'", "Tell me three things about you!"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'I ___ a ball.（有）', options: ['have', 'like', 'can', 'am'], answer: 'have' },
    { type: 'fill-blank', question: 'Do you ___ music?（喜歡）', options: ['like', 'have', 'can', 'is'], answer: 'like' },
    { type: 'read', question: 'Does Coco have a book?（Coco 有書嗎？）', passage: 'Coco has a book and a bag.\nShe can read the book.\nShe likes it!', options: ['Yes', 'No', 'Maybe', 'Never'], answer: 'Yes' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "I like pizza, I have a ball, and I can run!", lineZh: '我喜歡披薩，我有球，我會跑！' },
    { speaker: 'Coco', line: "I can swim! Do you like dogs?", lineZh: '我會游泳！你喜歡狗嗎？' },
    { speaker: 'Polly', line: "Yes, I do! Can you sing?", lineZh: '是的！你會唱歌嗎？' },
    { speaker: 'Finn', line: "Yes, I can! Great review, everyone!", lineZh: '是的，我會！複習得很好，大家！' },
  ],
};

const L4_M11: Mission = {
  id: 11, slug: 'l4-m11-can-you', level: 4, title: 'Can you…?', titleEn: 'Can you…?', theme: '學校路・你會嗎', themeEmoji: '🙋',
  focus: '疑問 Can you…? 短答 Yes, I can. / No, I can\'t.',
  story: [
    { image: '🙋', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "Can you swim? Yes, I can!", dialogueZh: '你會游泳嗎？是的，我會！', highlightWords: ['Can', 'can'], sceneEmojis: ['🏊', '❓', '✅'], animation: 'wave' },
    { image: '🕊️', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Can you fly? No, I can't. I can read!", dialogueZh: '你會飛嗎？不，我不會。我會閱讀！', highlightWords: ["can't", 'can'], sceneEmojis: ['🕊️', '🙅', '📖'], animation: 'shake' },
    { image: '🍳', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Can you cook? Yes, I can! I can climb too!", dialogueZh: '你會煮飯嗎？是的，我會！我也會爬！', highlightWords: ['Can', 'can'], sceneEmojis: ['🍳', '🧗', '🎉'], animation: 'bounce' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Ask your friends: Can you…? Have fun!", dialogueZh: '問問朋友：你會…嗎？玩得開心！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🙋'], animation: 'tada' },
  ],
  words: [
    { en: 'can', zh: '會·能', image: '💪', phonics: '', kk: '[kæn]', phonicsSound: '', exampleSentence: 'Can you swim?', exampleZh: '你會游泳嗎？' },
    { en: "can't", zh: '不會·不能', image: '🚫', phonics: '', kk: '[kænt]', phonicsSound: '', exampleSentence: "No, I can't.", exampleZh: '不，我不會。' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'Can you swim?', exampleZh: '你會游泳嗎？' },
    { en: 'read', zh: '閱讀', image: '📖', phonics: '', kk: '[rid]', phonicsSound: '', exampleSentence: 'I can read.', exampleZh: '我會閱讀。' },
    { en: 'cook', zh: '煮飯', image: '🍳', phonics: '', kk: '[kʊk]', phonicsSound: '', exampleSentence: 'Can you cook?', exampleZh: '你會煮飯嗎？' },
    { en: 'climb', zh: '攀爬', image: '🧗', phonics: '', kk: '[klaɪm]', phonicsSound: '', exampleSentence: 'I can climb.', exampleZh: '我會爬。' },
    { en: 'kick', zh: '踢', image: '🦵', phonics: '', kk: '[kɪk]', phonicsSound: '', exampleSentence: 'I can kick a ball.', exampleZh: '我會踢球。' },
    { en: 'jump', zh: '跳', image: '🤸', phonics: '', kk: '[dʒʌmp]', phonicsSound: '', exampleSentence: 'Can you jump?', exampleZh: '你會跳嗎？' },
    { en: 'fly', zh: '飛', image: '🕊️', phonics: '', kk: '[flaɪ]', phonicsSound: '', exampleSentence: "I can't fly.", exampleZh: '我不會飛。' },
    { en: 'ride', zh: '騎', image: '🚲', phonics: '', kk: '[raɪd]', phonicsSound: '', exampleSentence: 'I can ride a bike.', exampleZh: '我會騎腳踏車。' },
  ],
  sentences: [
    { en: 'Can you swim?', zh: '你會游泳嗎？' }, { en: 'Yes, I can.', zh: '是的，我會。' }, { en: 'Can you fly?', zh: '你會飛嗎？' }, { en: "No, I can't.", zh: '不，我不會。' }, { en: 'Can you ride a bike?', zh: '你會騎腳踏車嗎？' }, { en: 'Yes, I can!', zh: '是的，我會！' },
  ],
  phonicsLetters: ['Can you…?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ you swim?（問句·會）', options: ['Can', 'Do', 'Are', 'Is'], answer: 'Can' },
    { type: 'fill-blank', question: 'Can you fly? No, I ___.', options: ["can't", 'can', 'do', 'am'], answer: "can't" },
    { type: 'match', question: '🍳 是什麼動作？', options: ['cook', 'swim', 'climb', 'read'], answer: 'cook' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🏊', '🍳', '🧗', '🚲'], answer: '🧗', image: '🎧' },
    { type: 'match', question: '配對：動作配圖', options: ['cook-🍳', 'read-📖', 'climb-🧗', 'ride-🚲'], answer: 'cook-🍳' },
    { type: 'fill-blank', question: 'Can you jump? Yes, I ___.', options: ['can', "can't", 'do', 'am'], answer: 'can' },
    { type: 'spell', question: '拼拼看：c _ ok（煮飯）', answer: 'cook', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Can you swim?', 'Can you cook?', 'I can swim.', 'Can you fly?'], answer: 'Can you swim?', image: '🎧' },
    { type: 'read', question: 'Can Benny fly?（Benny 會飛嗎？）', passage: "Benny can read and cook.\nBut he can not fly.\nHe is not a bird!", options: ['No', 'Yes', 'Maybe', 'Sometimes'], answer: 'No' },
  ],
  talkTimePrompts: ["Ask: Can you swim?", "Answer: Yes, I can. / No, I can't.", "Ask about cook, climb, ride!", "Change it: Can you ___? (jump/read/kick)"],
  reviewQuiz: [
    { type: 'fill-blank', question: '___ you ride a bike?（問句·會）', options: ['Can', 'Do', 'Are', 'Is'], answer: 'Can' },
    { type: 'match', question: '🧗 是什麼動作？', options: ['climb', 'kick', 'fly', 'cook'], answer: 'climb' },
    { type: 'fill-blank', question: 'Can you cook? Yes, I ___.', options: ['can', "can't", 'do', 'is'], answer: 'can' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "Can you swim?", lineZh: '你會游泳嗎？' },
    { speaker: 'Coco', line: "Yes, I can! Can you fly?", lineZh: '是的，我會！你會飛嗎？' },
    { speaker: 'Polly', line: "No, I can't! But I can read.", lineZh: '不，我不會！但我會閱讀。' },
    { speaker: 'Benny', line: "I can cook and climb! Can you?", lineZh: '我會煮飯和攀爬！你會嗎？' },
  ],
};

const L4_M12: Mission = {
  id: 12, slug: 'l4-m12-what-is-this', level: 4, title: 'What is this?', titleEn: 'What is this?', theme: '學校路・教室裡', themeEmoji: '🏫',
  focus: '疑問 What is this? — It is a…（教室物品）',
  story: [
    { image: '🏫', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "What is this? It is a clock!", dialogueZh: '這是什麼？這是一個時鐘！', highlightWords: ['What', 'clock'], sceneEmojis: ['🕐', '❓', '✨'], animation: 'wave' },
    { image: '🚪', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "What is that? It is a door.", dialogueZh: '那是什麼？那是一扇門。', highlightWords: ['What', 'door'], sceneEmojis: ['🚪', '❓', '😊'], animation: 'bounce' },
    { image: '🪟', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "What is this? It is a window!", dialogueZh: '這是什麼？這是一扇窗！', highlightWords: ['What', 'window'], sceneEmojis: ['🪟', '❓', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "You can ask about everything now! Great!", dialogueZh: '現在你什麼都能問了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🏫'], animation: 'bounce' },
  ],
  words: [
    { en: 'clock', zh: '時鐘', image: '🕐', phonics: '', kk: '[klɑk]', phonicsSound: '', exampleSentence: 'It is a clock.', exampleZh: '這是時鐘。' },
    { en: 'door', zh: '門', image: '🚪', phonics: '', kk: '[dɔr]', phonicsSound: '', exampleSentence: 'It is a door.', exampleZh: '這是門。' },
    { en: 'window', zh: '窗戶', image: '🪟', phonics: '', kk: '[ˈwɪndo]', phonicsSound: '', exampleSentence: 'It is a window.', exampleZh: '這是窗戶。' },
    { en: 'board', zh: '黑板', image: '📋', phonics: '', kk: '[bɔrd]', phonicsSound: '', exampleSentence: 'It is a board.', exampleZh: '這是黑板。' },
    { en: 'chair', zh: '椅子', image: '🪑', phonics: '', kk: '[tʃɛr]', phonicsSound: '', exampleSentence: 'It is a chair.', exampleZh: '這是椅子。' },
    { en: 'desk', zh: '書桌', image: '🖥️', phonics: '', kk: '[dɛsk]', phonicsSound: '', exampleSentence: 'It is a desk.', exampleZh: '這是書桌。' },
    { en: 'map', zh: '地圖', image: '🗺️', phonics: '', kk: '[mæp]', phonicsSound: '', exampleSentence: 'It is a map.', exampleZh: '這是地圖。' },
    { en: 'light', zh: '燈', image: '💡', phonics: '', kk: '[laɪt]', phonicsSound: '', exampleSentence: 'It is a light.', exampleZh: '這是燈。' },
    { en: 'wall', zh: '牆', image: '🧱', phonics: '', kk: '[wɔl]', phonicsSound: '', exampleSentence: 'It is a wall.', exampleZh: '這是牆。' },
    { en: 'what', zh: '什麼', image: '❓', phonics: '', kk: '[wɑt]', phonicsSound: '', exampleSentence: 'What is this?', exampleZh: '這是什麼？' },
  ],
  sentences: [
    { en: 'What is this?', zh: '這是什麼？' }, { en: 'It is a clock.', zh: '這是一個時鐘。' }, { en: 'What is that?', zh: '那是什麼？' }, { en: 'It is a door.', zh: '那是一扇門。' }, { en: 'Is this a window?', zh: '這是窗戶嗎？' }, { en: 'Yes, it is.', zh: '是的，它是。' },
  ],
  phonicsLetters: ['What is this?'],
  warmUpQuestions: [
    { type: 'match', question: '🕐 是什麼？', options: ['clock', 'door', 'window', 'wall'], answer: 'clock' },
    { type: 'fill-blank', question: '___ is this?（什麼）', options: ['What', 'Where', 'Who', 'Is'], answer: 'What' },
    { type: 'match', question: '🚪 是什麼？', options: ['door', 'window', 'board', 'chair'], answer: 'door' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的東西', options: ['🕐', '🚪', '🪟', '🗺️'], answer: '🪟', image: '🎧' },
    { type: 'match', question: '配對：字配圖', options: ['clock-🕐', 'door-🚪', 'map-🗺️', 'chair-🪑'], answer: 'clock-🕐' },
    { type: 'fill-blank', question: 'What is this? It ___ a clock.（be動詞）', options: ['is', 'am', 'are', 'be'], answer: 'is' },
    { type: 'spell', question: '拼拼看：do _ r（門）', answer: 'door', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['What is this?', 'What is that?', 'It is a door.', 'Is this a door?'], answer: 'What is this?', image: '🎧' },
    { type: 'read', question: 'What is on the wall?（牆上是什麼？）', passage: 'This is our classroom.\nA clock and a map are on the wall.\nThe door is next to the window.', options: ['a clock and a map', 'a chair', 'a desk', 'a book'], answer: 'a clock and a map' },
  ],
  talkTimePrompts: ["Point and ask: What is this?", "Answer: It is a ___.", "Ask about 3 things in your room!", "Change it: What is that? It is a ___."],
  reviewQuiz: [
    { type: 'match', question: '🗺️ 是什麼？', options: ['map', 'board', 'light', 'wall'], answer: 'map' },
    { type: 'fill-blank', question: '___ is that? It is a door.', options: ['What', 'Where', 'Who', 'Can'], answer: 'What' },
    { type: 'spell', question: '拼拼看：cl _ ck（時鐘）', answer: 'clock', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "What is this?", lineZh: '這是什麼？' },
    { speaker: 'Coco', line: "It is a clock! What is that?", lineZh: '這是時鐘！那是什麼？' },
    { speaker: 'Benny', line: "It is a map. What is this?", lineZh: '那是地圖。這是什麼？' },
    { speaker: 'Ruby', line: "It is a window! Our classroom is nice!", lineZh: '這是窗戶！我們的教室好棒！' },
  ],
};

const L4_M13: Mission = {
  id: 13, slug: 'l4-m13-where-is', level: 4, title: 'Where is…?', titleEn: 'Where is…?', theme: '學校路・找找看', themeEmoji: '🔍',
  focus: '疑問 Where is…? — It is in / on / under…',
  story: [
    { image: '🔍', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Where is my cat? It is on the desk!", dialogueZh: '我的貓在哪？牠在書桌上！', highlightWords: ['Where', 'on'], sceneEmojis: ['🐱', '🖥️', '✨'], animation: 'wave' },
    { image: '📦', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Where is the ball? It is in the box.", dialogueZh: '球在哪？它在箱子裡。', highlightWords: ['Where', 'in'], sceneEmojis: ['⚽', '📦', '😊'], animation: 'bounce' },
    { image: '🪑', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "Where is the bag? It is under the chair!", dialogueZh: '書包在哪？它在椅子下面！', highlightWords: ['Where', 'under'], sceneEmojis: ['🎒', '🪑', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "In, on, under — you found them all!", dialogueZh: 'In、on、under —— 你全找到了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔍'], animation: 'bounce' },
  ],
  words: [
    { en: 'where', zh: '哪裡', image: '🔍', phonics: '', kk: '[wɛr]', phonicsSound: '', exampleSentence: 'Where is it?', exampleZh: '它在哪？' },
    { en: 'in', zh: '在…裡面', image: '📥', phonics: '', kk: '[ɪn]', phonicsSound: '', exampleSentence: 'It is in the box.', exampleZh: '它在箱子裡。' },
    { en: 'on', zh: '在…上面', image: '⬆️', phonics: '', kk: '[ɑn]', phonicsSound: '', exampleSentence: 'It is on the desk.', exampleZh: '它在書桌上。' },
    { en: 'under', zh: '在…下面', image: '⬇️', phonics: '', kk: '[ˈʌndɚ]', phonicsSound: '', exampleSentence: 'It is under the chair.', exampleZh: '它在椅子下。' },
    { en: 'box', zh: '箱子', image: '📦', phonics: '', kk: '[bɑks]', phonicsSound: '', exampleSentence: 'in the box', exampleZh: '在箱子裡' },
    { en: 'desk', zh: '書桌', image: '🖥️', phonics: '', kk: '[dɛsk]', phonicsSound: '', exampleSentence: 'on the desk', exampleZh: '在書桌上' },
    { en: 'chair', zh: '椅子', image: '🪑', phonics: '', kk: '[tʃɛr]', phonicsSound: '', exampleSentence: 'under the chair', exampleZh: '在椅子下' },
    { en: 'bag', zh: '書包', image: '🎒', phonics: '', kk: '[bæɡ]', phonicsSound: '', exampleSentence: 'Where is the bag?', exampleZh: '書包在哪？' },
    { en: 'ball', zh: '球', image: '⚽', phonics: '', kk: '[bɔl]', phonicsSound: '', exampleSentence: 'Where is the ball?', exampleZh: '球在哪？' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: '', kk: '[kæt]', phonicsSound: '', exampleSentence: 'The cat is on the desk.', exampleZh: '貓在書桌上。' },
  ],
  sentences: [
    { en: 'Where is my cat?', zh: '我的貓在哪？' }, { en: 'It is on the desk.', zh: '牠在書桌上。' }, { en: 'Where is the ball?', zh: '球在哪？' }, { en: 'It is in the box.', zh: '它在箱子裡。' }, { en: 'Where is the bag?', zh: '書包在哪？' }, { en: 'It is under the chair.', zh: '它在椅子下。' },
  ],
  phonicsLetters: ['Where is…?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ is my cat?（哪裡）', options: ['Where', 'What', 'Who', 'Is'], answer: 'Where' },
    { type: 'fill-blank', question: 'It is ___ the box.（裡面）', options: ['in', 'on', 'under', 'is'], answer: 'in' },
    { type: 'fill-blank', question: 'It is ___ the desk.（上面）', options: ['on', 'in', 'under', 'is'], answer: 'on' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的位置字', options: ['📥', '⬆️', '⬇️', '📦'], answer: '⬇️', image: '🎧' },
    { type: 'fill-blank', question: 'The bag is ___ the chair.（下面）', options: ['under', 'in', 'on', 'is'], answer: 'under' },
    { type: 'fill-blank', question: 'The cat is ___ the desk.（上面）', options: ['on', 'in', 'under', 'is'], answer: 'on' },
    { type: 'spell', question: '拼拼看：und _ r（下面）', answer: 'under', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['It is on the desk.', 'It is in the box.', 'It is under the chair.', 'Where is the cat?'], answer: 'It is on the desk.', image: '🎧' },
    { type: 'read', question: 'Where is the ball?（球在哪？）', passage: 'The cat is on the desk.\nThe bag is under the chair.\nThe ball is in the box.', options: ['in the box', 'on the desk', 'under the chair', 'on the wall'], answer: 'in the box' },
  ],
  talkTimePrompts: ["Ask: Where is my bag?", "Answer: It is in / on / under the ___.", "Hide something and ask: Where is it?", "Change it: The cat is ___ the box (in/on/under)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'It is ___ the chair.（下面）', options: ['under', 'in', 'on', 'is'], answer: 'under' },
    { type: 'fill-blank', question: '___ is the ball?（哪裡）', options: ['Where', 'What', 'Who', 'Can'], answer: 'Where' },
    { type: 'match', question: '📦 是什麼？', options: ['box', 'bag', 'ball', 'desk'], answer: 'box' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Where is my cat?", lineZh: '我的貓在哪？' },
    { speaker: 'Benny', line: "It is on the desk! Where is the ball?", lineZh: '牠在書桌上！球在哪？' },
    { speaker: 'Coco', line: "It is in the box. Where is my bag?", lineZh: '它在箱子裡。我的書包在哪？' },
    { speaker: 'Ruby', line: "It is under the chair! Found it!", lineZh: '它在椅子下！找到了！' },
  ],
};

const L4_M14: Mission = {
  id: 14, slug: 'l4-m14-prepositions', level: 4, title: '介系詞', titleEn: 'Prepositions', theme: '學校路・位置大集合', themeEmoji: '📍',
  focus: '介系詞 in / on / under / next to / behind',
  story: [
    { image: '📍', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "The cat is next to the box.", dialogueZh: '貓在箱子旁邊。', highlightWords: ['next to'], sceneEmojis: ['🐱', '📦', '✨'], animation: 'wave' },
    { image: '🙈', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "The dog is behind the chair!", dialogueZh: '狗在椅子後面！', highlightWords: ['behind'], sceneEmojis: ['🐶', '🪑', '😊'], animation: 'bounce' },
    { image: '📦', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "In, on, under, next to, behind — five words!", dialogueZh: 'In、on、under、next to、behind —— 五個字！', highlightWords: [], sceneEmojis: ['📥', '⬆️', '⬇️'], animation: 'tada' },
    { image: '🎉', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You can say where everything is! Great!", dialogueZh: '你會說每樣東西在哪了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📍'], animation: 'bounce' },
  ],
  words: [
    { en: 'in', zh: '在…裡面', image: '📥', phonics: '', kk: '[ɪn]', phonicsSound: '', exampleSentence: 'in the box', exampleZh: '在箱子裡' },
    { en: 'on', zh: '在…上面', image: '⬆️', phonics: '', kk: '[ɑn]', phonicsSound: '', exampleSentence: 'on the desk', exampleZh: '在書桌上' },
    { en: 'under', zh: '在…下面', image: '⬇️', phonics: '', kk: '[ˈʌndɚ]', phonicsSound: '', exampleSentence: 'under the chair', exampleZh: '在椅子下' },
    { en: 'next to', zh: '在…旁邊', image: '↔️', phonics: '', kk: '[nɛkst tu]', phonicsSound: '', exampleSentence: 'next to the box', exampleZh: '在箱子旁' },
    { en: 'behind', zh: '在…後面', image: '🔙', phonics: '', kk: '[bɪˈhaɪnd]', phonicsSound: '', exampleSentence: 'behind the chair', exampleZh: '在椅子後' },
    { en: 'box', zh: '箱子', image: '📦', phonics: '', kk: '[bɑks]', phonicsSound: '', exampleSentence: 'in the box', exampleZh: '在箱子裡' },
    { en: 'table', zh: '桌子', image: '🪵', phonics: '', kk: '[ˈtebl̩]', phonicsSound: '', exampleSentence: 'on the table', exampleZh: '在桌上' },
    { en: 'chair', zh: '椅子', image: '🪑', phonics: '', kk: '[tʃɛr]', phonicsSound: '', exampleSentence: 'under the chair', exampleZh: '在椅子下' },
    { en: 'cat', zh: '貓', image: '🐱', phonics: '', kk: '[kæt]', phonicsSound: '', exampleSentence: 'The cat is on it.', exampleZh: '貓在上面。' },
    { en: 'dog', zh: '狗', image: '🐶', phonics: '', kk: '[dɔɡ]', phonicsSound: '', exampleSentence: 'The dog is behind it.', exampleZh: '狗在後面。' },
  ],
  sentences: [
    { en: 'The cat is in the box.', zh: '貓在箱子裡。' }, { en: 'The book is on the table.', zh: '書在桌上。' }, { en: 'The ball is under the chair.', zh: '球在椅子下。' }, { en: 'The cat is next to the box.', zh: '貓在箱子旁。' }, { en: 'The dog is behind the chair.', zh: '狗在椅子後。' }, { en: 'Where is the cat?', zh: '貓在哪？' },
  ],
  phonicsLetters: ['in/on/under…'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'The cat is ___ the box.（旁邊）', options: ['next to', 'in', 'on', 'is'], answer: 'next to' },
    { type: 'fill-blank', question: 'The dog is ___ the chair.（後面）', options: ['behind', 'on', 'in', 'is'], answer: 'behind' },
    { type: 'fill-blank', question: 'The ball is ___ the table.（上面）', options: ['on', 'in', 'behind', 'is'], answer: 'on' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的位置字', options: ['📥', '⬆️', '↔️', '🔙'], answer: '🔙', image: '🎧' },
    { type: 'match', question: '配對：位置字配意思', options: ['in-裡面', 'on-上面', 'under-下面', 'behind-後面'], answer: 'in-裡面' },
    { type: 'fill-blank', question: '句型代換：The cat is ___ the chair.（後面）', options: ['behind', 'happy', 'like', 'is'], answer: 'behind' },
    { type: 'spell', question: '拼拼看：beh _ nd（後面）', answer: 'behind', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The cat is next to the box.', 'The cat is in the box.', 'The cat is behind the box.', 'The cat is on the box.'], answer: 'The cat is next to the box.', image: '🎧' },
    { type: 'read', question: 'Where is the dog?（狗在哪？）', passage: 'The cat is on the table.\nThe ball is under the chair.\nThe dog is behind the door.', options: ['behind the door', 'on the table', 'under the chair', 'in the box'], answer: 'behind the door' },
  ],
  talkTimePrompts: ["Say where your bag is: It is ___ the ___.", "Use 'next to' in a sentence.", "Use 'behind' in a sentence.", "Change it: The cat is ___ the box (in/on/next to)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'The cat is ___ the box.（旁邊）', options: ['next to', 'in', 'on', 'is'], answer: 'next to' },
    { type: 'match', question: '🔙 behind 是什麼意思？', options: ['後面', '前面', '上面', '裡面'], answer: '後面' },
    { type: 'fill-blank', question: 'The book is ___ the table.（上面）', options: ['on', 'under', 'behind', 'is'], answer: 'on' },
  ],
  videoScript: [
    { speaker: 'Ruby', line: "The cat is next to the box.", lineZh: '貓在箱子旁邊。' },
    { speaker: 'Coco', line: "The dog is behind the chair!", lineZh: '狗在椅子後面！' },
    { speaker: 'Benny', line: "The ball is under the table.", lineZh: '球在桌子下面。' },
    { speaker: 'Ruby', line: "In, on, under, next to, behind! Perfect!", lineZh: 'In、on、under、next to、behind！完美！' },
  ],
};

const L4_M15: Mission = {
  id: 15, slug: 'l4-m15-review-questions', level: 4, title: 'Review③ 問句', titleEn: 'Review: Questions', theme: '學校路・複習關', themeEmoji: '🔄',
  focus: '螺旋複習③：Are you…? / Do you…? / Can you…? / What…? / Where…?',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review our questions! Are you ready?", dialogueZh: '來複習問句！你準備好了嗎？', highlightWords: ['Are'], sceneEmojis: ['🔄', '❓', '✨'], animation: 'wave' },
    { image: '🤔', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "Do you like it? Can you do it?", dialogueZh: '你喜歡嗎？你會嗎？', highlightWords: ['Do', 'Can'], sceneEmojis: ['❤️', '💪', '😊'], animation: 'bounce' },
    { image: '🔍', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "What is this? Where is it? Great questions!", dialogueZh: '這是什麼？它在哪？好問題！', highlightWords: ['What', 'Where'], sceneEmojis: ['❓', '🔍', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can ask anything now! Amazing!", dialogueZh: '你現在什麼都會問了！太厲害了！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'are', zh: '是（你）', image: '❓', phonics: '', kk: '[ɑr]', phonicsSound: '', exampleSentence: 'Are you happy?', exampleZh: '你開心嗎？' },
    { en: 'do', zh: '（問句助動詞）', image: '❓', phonics: '', kk: '[du]', phonicsSound: '', exampleSentence: 'Do you like it?', exampleZh: '你喜歡嗎？' },
    { en: 'can', zh: '會·能', image: '💪', phonics: '', kk: '[kæn]', phonicsSound: '', exampleSentence: 'Can you swim?', exampleZh: '你會游泳嗎？' },
    { en: 'what', zh: '什麼', image: '❔', phonics: '', kk: '[wɑt]', phonicsSound: '', exampleSentence: 'What is this?', exampleZh: '這是什麼？' },
    { en: 'where', zh: '哪裡', image: '🔍', phonics: '', kk: '[wɛr]', phonicsSound: '', exampleSentence: 'Where is it?', exampleZh: '它在哪？' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'Do you like it?', exampleZh: '你喜歡嗎？' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'Can you swim?', exampleZh: '你會游泳嗎？' },
    { en: 'clock', zh: '時鐘', image: '🕐', phonics: '', kk: '[klɑk]', phonicsSound: '', exampleSentence: 'It is a clock.', exampleZh: '這是時鐘。' },
    { en: 'on', zh: '在…上面', image: '⬆️', phonics: '', kk: '[ɑn]', phonicsSound: '', exampleSentence: 'on the desk', exampleZh: '在書桌上' },
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'Are you happy?', exampleZh: '你開心嗎？' },
  ],
  sentences: [
    { en: 'Are you happy?', zh: '你開心嗎？' }, { en: 'Do you like pizza?', zh: '你喜歡披薩嗎？' }, { en: 'Can you swim?', zh: '你會游泳嗎？' }, { en: 'What is this?', zh: '這是什麼？' }, { en: 'Where is the cat?', zh: '貓在哪？' }, { en: 'Yes, I can!', zh: '是的，我會！' },
  ],
  phonicsLetters: ['review questions'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ you happy?（be動詞問句）', options: ['Are', 'Do', 'Can', 'What'], answer: 'Are' },
    { type: 'fill-blank', question: '___ you like pizza?（一般動詞問句）', options: ['Do', 'Are', 'Can', 'Where'], answer: 'Do' },
    { type: 'fill-blank', question: '___ you swim?（能力問句）', options: ['Can', 'Are', 'Do', 'What'], answer: 'Can' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的東西', options: ['🕐', '🏊', '❤️', '😊'], answer: '🕐', image: '🎧' },
    { type: 'fill-blank', question: '___ is this? It is a clock.（什麼）', options: ['What', 'Where', 'Who', 'Do'], answer: 'What' },
    { type: 'fill-blank', question: '___ is the cat? It is on the desk.（哪裡）', options: ['Where', 'What', 'Who', 'Can'], answer: 'Where' },
    { type: 'spell', question: '拼拼看：wh _ re（哪裡）', answer: 'where', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Can you swim?', 'Do you swim?', 'Are you swimming?', 'What is swim?'], answer: 'Can you swim?', image: '🎧' },
    { type: 'read', question: 'Can Finn swim?（Finn 會游泳嗎？）', passage: 'Finn is happy.\nHe likes the pool.\nHe can swim very well!', options: ['Yes', 'No', 'Maybe', 'Never'], answer: 'Yes' },
  ],
  talkTimePrompts: ["Ask a friend: Are you…?", "Ask: Do you like…?", "Ask: Can you…?", "Ask: What is this? / Where is it?"],
  reviewQuiz: [
    { type: 'fill-blank', question: '___ you like dogs?（問句）', options: ['Do', 'Are', 'Can', 'What'], answer: 'Do' },
    { type: 'fill-blank', question: '___ is the ball? It is in the box.', options: ['Where', 'What', 'Who', 'Can'], answer: 'Where' },
    { type: 'read', question: 'Is the cat on the desk?（貓在書桌上嗎？）', passage: 'Where is the cat?\nThe cat is on the desk.\nThe clock is on the wall.', options: ['Yes', 'No', 'Maybe', 'Under'], answer: 'Yes' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Are you ready? Do you like questions?", lineZh: '你準備好了嗎？你喜歡問句嗎？' },
    { speaker: 'Polly', line: "Yes, I do! Can you ask one?", lineZh: '是的！你能問一個嗎？' },
    { speaker: 'Benny', line: "What is this? Where is the cat?", lineZh: '這是什麼？貓在哪？' },
    { speaker: 'Finn', line: "Great! You know all the questions!", lineZh: '太棒了！你會所有問句了！' },
  ],
};

const L4_M16: Mission = {
  id: 16, slug: 'l4-m16-past-intro', level: 4, title: '過去式入門', titleEn: 'Past Tense Intro', theme: '學校路・昨天做了什麼', themeEmoji: '⏪',
  focus: '動詞過去式入門：原形 → 過去式（play→played, go→went）先接觸',
  story: [
    { image: '⏪', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Today I play. Yesterday I played!", dialogueZh: '今天我玩。昨天我玩了！', highlightWords: ['play', 'played'], sceneEmojis: ['🎮', '⏪', '✨'], animation: 'wave' },
    { image: '🏫', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Today I go to school. Yesterday I went too!", dialogueZh: '今天我去學校。昨天我也去了！', highlightWords: ['go', 'went'], sceneEmojis: ['🏫', '⏪', '😊'], animation: 'bounce' },
    { image: '🍎', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "I eat an apple. I ate it yesterday!", dialogueZh: '我吃蘋果。我昨天吃了！', highlightWords: ['eat', 'ate'], sceneEmojis: ['🍎', '⏪', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Past tense! We add -ed or change the word!", dialogueZh: '過去式！加 -ed 或把字變一下！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '⏪'], animation: 'bounce' },
  ],
  words: [
    { en: 'play', zh: '玩（原形）', image: '🎮', phonics: '', kk: '[ple]', phonicsSound: '', exampleSentence: 'I play now.', exampleZh: '我現在玩。' },
    { en: 'played', zh: '玩了（過去）', image: '⏪', phonics: '', kk: '[pled]', phonicsSound: '', exampleSentence: 'I played yesterday.', exampleZh: '我昨天玩了。' },
    { en: 'go', zh: '去（原形）', image: '🚶', phonics: '', kk: '[ɡo]', phonicsSound: '', exampleSentence: 'I go to school.', exampleZh: '我去學校。' },
    { en: 'went', zh: '去了（過去）', image: '⏪', phonics: '', kk: '[wɛnt]', phonicsSound: '', exampleSentence: 'I went to school.', exampleZh: '我去了學校。' },
    { en: 'eat', zh: '吃（原形）', image: '🍽️', phonics: '', kk: '[it]', phonicsSound: '', exampleSentence: 'I eat lunch.', exampleZh: '我吃午餐。' },
    { en: 'ate', zh: '吃了（過去）', image: '⏪', phonics: '', kk: '[et]', phonicsSound: '', exampleSentence: 'I ate lunch.', exampleZh: '我吃了午餐。' },
    { en: 'look', zh: '看（原形）', image: '👀', phonics: '', kk: '[lʊk]', phonicsSound: '', exampleSentence: 'I look at it.', exampleZh: '我看它。' },
    { en: 'looked', zh: '看了（過去）', image: '⏪', phonics: '', kk: '[lʊkt]', phonicsSound: '', exampleSentence: 'I looked at it.', exampleZh: '我看了它。' },
    { en: 'yesterday', zh: '昨天', image: '📅', phonics: '', kk: '[ˈjɛstɚˌde]', phonicsSound: '', exampleSentence: 'I played yesterday.', exampleZh: '我昨天玩了。' },
    { en: 'today', zh: '今天', image: '📆', phonics: '', kk: '[təˈde]', phonicsSound: '', exampleSentence: 'I play today.', exampleZh: '我今天玩。' },
  ],
  sentences: [
    { en: 'Today I play.', zh: '今天我玩。' }, { en: 'Yesterday I played.', zh: '昨天我玩了。' }, { en: 'I go to school.', zh: '我去學校。' }, { en: 'I went to school yesterday.', zh: '我昨天去了學校。' }, { en: 'Did you play?', zh: '你玩了嗎？' }, { en: 'Yes, I played!', zh: '是的，我玩了！' },
  ],
  phonicsLetters: ['play → played'],
  warmUpQuestions: [
    { type: 'match', question: 'play 的過去式是？', options: ['played', 'plays', 'playing', 'play'], answer: 'played' },
    { type: 'match', question: 'go 的過去式是？（不規則）', options: ['went', 'goed', 'goes', 'going'], answer: 'went' },
    { type: 'match', question: 'eat 的過去式是？（不規則）', options: ['ate', 'eated', 'eats', 'eating'], answer: 'ate' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選字：點你聽到的字', options: ['played', 'went', 'ate', 'looked'], answer: 'went', image: '🎧' },
    { type: 'match', question: '配對：原形→過去式', options: ['play-played', 'go-went', 'eat-ate', 'look-looked'], answer: 'play-played' },
    { type: 'fill-blank', question: 'Yesterday I ___ to school.（去·過去）', options: ['went', 'go', 'goes', 'going'], answer: 'went' },
    { type: 'fill-blank', question: 'Yesterday I ___ an apple.（吃·過去）', options: ['ate', 'eat', 'eats', 'eating'], answer: 'ate' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Yesterday I played.', 'Today I play.', 'I went to school.', 'I ate lunch.'], answer: 'Yesterday I played.', image: '🎧' },
    { type: 'read', question: 'What did Coco do yesterday?（Coco 昨天做了什麼？）', passage: 'Yesterday Coco went to school.\nShe played with friends.\nShe ate a big lunch!', options: ['went to school', 'stayed home', 'watched TV', 'slept all day'], answer: 'went to school' },
  ],
  talkTimePrompts: ["Say: Today I play. Yesterday I played.", "What did you eat yesterday? I ate ___.", "Where did you go? I went to ___.", "Change it: Yesterday I ___ (played/went/ate)."],
  reviewQuiz: [
    { type: 'match', question: 'look 的過去式是？', options: ['looked', 'looks', 'looking', 'look'], answer: 'looked' },
    { type: 'fill-blank', question: 'Yesterday I ___ with my friends.（玩·過去）', options: ['played', 'play', 'plays', 'playing'], answer: 'played' },
    { type: 'match', question: 'eat 的過去式是？', options: ['ate', 'eated', 'eats', 'eaten'], answer: 'ate' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "Today I play games. Yesterday I played too!", lineZh: '今天我玩遊戲。昨天我也玩了！' },
    { speaker: 'Coco', line: "I went to school yesterday. Did you?", lineZh: '我昨天去了學校。你呢？' },
    { speaker: 'Polly', line: "Yes! And I ate a big lunch!", lineZh: '有！而且我吃了一頓大餐！' },
    { speaker: 'Benny', line: "Past tense is fun! play, played!", lineZh: '過去式好好玩！play、played！' },
  ],
};

const L4_M17: Mission = {
  id: 17, slug: 'l4-m17-school-mix', level: 4, title: '學校情境綜合', titleEn: 'School Mix', theme: '學校路・我的一天', themeEmoji: '🏫',
  focus: '綜合運用 be / like / have / can 在學校情境',
  story: [
    { image: '🏫', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "I am a student. I like school!", dialogueZh: '我是學生。我喜歡學校！', highlightWords: ['am', 'like'], sceneEmojis: ['🏫', '📚', '✨'], animation: 'wave' },
    { image: '🎒', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I have a bag. I can read a book!", dialogueZh: '我有書包。我會讀書！', highlightWords: ['have', 'can'], sceneEmojis: ['🎒', '📖', '😊'], animation: 'bounce' },
    { image: '🍱', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "It is lunch time. I am hungry!", dialogueZh: '午餐時間到了。我餓了！', highlightWords: ['am'], sceneEmojis: ['🍱', '😋', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "School is fun! We learn together!", dialogueZh: '學校好好玩！我們一起學習！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🏫'], animation: 'bounce' },
  ],
  words: [
    { en: 'school', zh: '學校', image: '🏫', phonics: '', kk: '[skul]', phonicsSound: '', exampleSentence: 'I like school.', exampleZh: '我喜歡學校。' },
    { en: 'class', zh: '班級·課', image: '👨‍🏫', phonics: '', kk: '[klæs]', phonicsSound: '', exampleSentence: 'My class is fun.', exampleZh: '我的班很好玩。' },
    { en: 'lunch', zh: '午餐', image: '🍱', phonics: '', kk: '[lʌntʃ]', phonicsSound: '', exampleSentence: 'It is lunch time.', exampleZh: '午餐時間到了。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'I have a book.', exampleZh: '我有書。' },
    { en: 'friend', zh: '朋友', image: '🧑‍🤝‍🧑', phonics: '', kk: '[frɛnd]', phonicsSound: '', exampleSentence: 'He is my friend.', exampleZh: '他是我朋友。' },
    { en: 'teacher', zh: '老師', image: '👩‍🏫', phonics: '', kk: '[ˈtitʃɚ]', phonicsSound: '', exampleSentence: 'She is my teacher.', exampleZh: '她是我老師。' },
    { en: 'learn', zh: '學習', image: '🧠', phonics: '', kk: '[lɝn]', phonicsSound: '', exampleSentence: 'We learn English.', exampleZh: '我們學英文。' },
    { en: 'read', zh: '閱讀', image: '📚', phonics: '', kk: '[rid]', phonicsSound: '', exampleSentence: 'I can read.', exampleZh: '我會閱讀。' },
    { en: 'fun', zh: '好玩的', image: '🎉', phonics: '', kk: '[fʌn]', phonicsSound: '', exampleSentence: 'School is fun.', exampleZh: '學校很好玩。' },
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy.', exampleZh: '我很開心。' },
  ],
  sentences: [
    { en: 'I am a student.', zh: '我是學生。' }, { en: 'I like my school.', zh: '我喜歡我的學校。' }, { en: 'I have a book and a bag.', zh: '我有書和書包。' }, { en: 'I can read and write.', zh: '我會讀也會寫。' }, { en: 'Do you like your class?', zh: '你喜歡你的班嗎？' }, { en: 'School is fun!', zh: '學校很好玩！' },
  ],
  phonicsLetters: ['school mix'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ a student.（be動詞）', options: ['am', 'like', 'have', 'can'], answer: 'am' },
    { type: 'fill-blank', question: 'I ___ a book.（有）', options: ['have', 'am', 'like', 'is'], answer: 'have' },
    { type: 'match', question: '🍱 是什麼？', options: ['lunch', 'class', 'book', 'school'], answer: 'lunch' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🏫', '🍱', '📖', '👩‍🏫'], answer: '👩‍🏫', image: '🎧' },
    { type: 'match', question: '配對：字配圖', options: ['school-🏫', 'lunch-🍱', 'book-📖', 'teacher-👩‍🏫'], answer: 'school-🏫' },
    { type: 'fill-blank', question: 'I ___ read a book.（會）', options: ['can', 'am', 'have', 'is'], answer: 'can' },
    { type: 'spell', question: '拼拼看：sch _ ol（學校）', answer: 'school', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I like my school.', 'I have a school.', 'I am a school.', 'Do you like school?'], answer: 'I like my school.', image: '🎧' },
    { type: 'read', question: 'What can Finn do?（Finn 會什麼？）', passage: 'Finn is a student.\nHe likes school.\nHe can read and write.', options: ['read and write', 'cook', 'fly', 'drive'], answer: 'read and write' },
  ],
  talkTimePrompts: ["Tell me about school: I am ___. I like ___.", "Say what you have: I have ___.", "Say what you can do at school.", "Is school fun? Yes/No, why?"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'She ___ my teacher.（be動詞）', options: ['is', 'am', 'have', 'can'], answer: 'is' },
    { type: 'match', question: '🧠 學習 的英文？', options: ['learn', 'read', 'fun', 'class'], answer: 'learn' },
    { type: 'fill-blank', question: 'Do you ___ your class?（喜歡）', options: ['like', 'am', 'is', 'can'], answer: 'like' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "I am a student. I like school!", lineZh: '我是學生。我喜歡學校！' },
    { speaker: 'Coco', line: "Me too! I have many books.", lineZh: '我也是！我有很多書。' },
    { speaker: 'Benny', line: "I can read fast. It is lunch time now!", lineZh: '我讀得快。現在午餐時間！' },
    { speaker: 'Finn', line: "School is fun. Let's learn together!", lineZh: '學校好好玩。我們一起學習！' },
  ],
};

const L4_M18: Mission = {
  id: 18, slug: 'l4-m18-classroom-talk', level: 4, title: '教室對話', titleEn: 'Classroom Talk', theme: '學校路・上課囉', themeEmoji: '🔔',
  focus: '教室用語與對話：Sit down. Stand up. Open your book. Listen.',
  story: [
    { image: '🔔', character: '👩‍🏫', characterKey: 'ruby', characterAction: 'talk', characterName: 'Miss Ruby', dialogue: "Good morning, class! Please sit down.", dialogueZh: '早安，同學們！請坐下。', highlightWords: ['sit down'], sceneEmojis: ['🔔', '🪑', '✨'], animation: 'wave' },
    { image: '📖', character: '👩‍🏫', characterKey: 'ruby', characterAction: 'write', characterName: 'Miss Ruby', dialogue: "Open your book. Look at page one.", dialogueZh: '打開書。看第一頁。', highlightWords: ['Open', 'Look'], sceneEmojis: ['📖', '👀', '😊'], animation: 'bounce' },
    { image: '👂', character: '🐱', characterKey: 'coco', characterAction: 'listen', characterName: 'Coco', dialogue: "Listen, please! I can hear the teacher.", dialogueZh: '請聽！我聽得到老師。', highlightWords: ['Listen'], sceneEmojis: ['👂', '🔊', '🎉'], animation: 'tada' },
    { image: '🎉', character: '👩‍🏫', characterKey: 'ruby', characterAction: 'star', characterName: 'Miss Ruby', dialogue: "Great class! Thank you, everyone!", dialogueZh: '很棒的一課！謝謝大家！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🔔'], animation: 'bounce' },
  ],
  words: [
    { en: 'sit down', zh: '坐下', image: '🪑', phonics: '', kk: '[sɪt daʊn]', phonicsSound: '', exampleSentence: 'Please sit down.', exampleZh: '請坐下。' },
    { en: 'stand up', zh: '站起來', image: '🧍', phonics: '', kk: '[stænd ʌp]', phonicsSound: '', exampleSentence: 'Please stand up.', exampleZh: '請站起來。' },
    { en: 'open', zh: '打開', image: '📖', phonics: '', kk: '[ˈopən]', phonicsSound: '', exampleSentence: 'Open your book.', exampleZh: '打開你的書。' },
    { en: 'close', zh: '關上', image: '📕', phonics: '', kk: '[kloz]', phonicsSound: '', exampleSentence: 'Close the door.', exampleZh: '關門。' },
    { en: 'listen', zh: '聽', image: '👂', phonics: '', kk: '[ˈlɪsn̩]', phonicsSound: '', exampleSentence: 'Listen, please.', exampleZh: '請聽。' },
    { en: 'look', zh: '看', image: '👀', phonics: '', kk: '[lʊk]', phonicsSound: '', exampleSentence: 'Look at the board.', exampleZh: '看黑板。' },
    { en: 'quiet', zh: '安靜', image: '🤫', phonics: '', kk: '[ˈkwaɪət]', phonicsSound: '', exampleSentence: 'Be quiet, please.', exampleZh: '請安靜。' },
    { en: 'please', zh: '請', image: '🙏', phonics: '', kk: '[pliz]', phonicsSound: '', exampleSentence: 'Sit down, please.', exampleZh: '請坐下。' },
    { en: 'thank you', zh: '謝謝', image: '🙇', phonics: '', kk: '[θæŋk ju]', phonicsSound: '', exampleSentence: 'Thank you!', exampleZh: '謝謝你！' },
    { en: 'page', zh: '頁', image: '📄', phonics: '', kk: '[pedʒ]', phonicsSound: '', exampleSentence: 'Look at page one.', exampleZh: '看第一頁。' },
  ],
  sentences: [
    { en: 'Please sit down.', zh: '請坐下。' }, { en: 'Stand up, please.', zh: '請站起來。' }, { en: 'Open your book.', zh: '打開你的書。' }, { en: 'Listen, please.', zh: '請聽。' }, { en: 'Look at page one.', zh: '看第一頁。' }, { en: 'Thank you, teacher!', zh: '謝謝老師！' },
  ],
  phonicsLetters: ['classroom talk'],
  warmUpQuestions: [
    { type: 'match', question: '🪑 動作是？', options: ['sit down', 'stand up', 'open', 'close'], answer: 'sit down' },
    { type: 'match', question: '👂 動作是？', options: ['listen', 'look', 'open', 'quiet'], answer: 'listen' },
    { type: 'match', question: '🙏 是什麼？', options: ['please', 'thank you', 'open', 'page'], answer: 'please' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🪑', '🧍', '👂', '👀'], answer: '🧍', image: '🎧' },
    { type: 'match', question: '配對：指令配圖', options: ['sit down-🪑', 'stand up-🧍', 'open-📖', 'listen-👂'], answer: 'sit down-🪑' },
    { type: 'fill-blank', question: '___ your book.（打開）', options: ['Open', 'Close', 'Listen', 'Sit'], answer: 'Open' },
    { type: 'spell', question: '拼拼看：list _ n（聽）', answer: 'listen', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Please sit down.', 'Please stand up.', 'Open your book.', 'Listen, please.'], answer: 'Please sit down.', image: '🎧' },
    { type: 'read', question: 'What does the teacher say first?（老師先說什麼？）', passage: 'The teacher comes in.\nShe says, "Good morning! Please sit down."\nThen she says, "Open your book."', options: ['Please sit down.', 'Open your book.', 'Stand up.', 'Go home.'], answer: 'Please sit down.' },
  ],
  talkTimePrompts: ["Give a command: Please ___.", "Say: Open your book. / Close the door.", "Say 'thank you' to your teacher.", "Play teacher: tell the class to sit down!"],
  reviewQuiz: [
    { type: 'match', question: '🤫 是什麼？', options: ['quiet', 'listen', 'look', 'open'], answer: 'quiet' },
    { type: 'fill-blank', question: '___ at the board.（看）', options: ['Look', 'Listen', 'Open', 'Sit'], answer: 'Look' },
    { type: 'spell', question: '拼拼看：pl _ ase（請）', answer: 'please', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Miss Ruby', line: "Good morning! Please sit down.", lineZh: '早安！請坐下。' },
    { speaker: 'Coco', line: "Good morning, teacher!", lineZh: '早安，老師！' },
    { speaker: 'Miss Ruby', line: "Open your book. Look at page one.", lineZh: '打開書。看第一頁。' },
    { speaker: 'Benny', line: "Yes! Thank you, teacher!", lineZh: '好！謝謝老師！' },
  ],
};

const L4_M19: Mission = {
  id: 19, slug: 'l4-m19-reading', level: 4, title: '學校閱讀', titleEn: 'School Reading', theme: '學校路・故事時間', themeEmoji: '📖',
  focus: '綜合閱讀：把 be/like/have/can 讀成一個上學小故事',
  story: [
    { image: '📖', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Let's read a story about a school day!", dialogueZh: '我們來讀一個上學日的故事！', highlightWords: ['story'], sceneEmojis: ['📖', '🏫', '✨'], animation: 'wave' },
    { image: '🦊', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "This is Finn. He is a student. He likes school.", dialogueZh: '這是 Finn。他是學生。他喜歡學校。', highlightWords: ['is', 'likes'], sceneEmojis: ['🦊', '🎒', '😊'], animation: 'bounce' },
    { image: '📚', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "He has a book. He can read very well!", dialogueZh: '他有一本書。他讀得很好！', highlightWords: ['has', 'can'], sceneEmojis: ['📚', '👀', '🎉'], animation: 'float' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "You read a whole story! Amazing reader!", dialogueZh: '你讀完整個故事了！了不起的讀者！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'story', zh: '故事', image: '📖', phonics: '', kk: '[ˈstɔri]', phonicsSound: '', exampleSentence: 'a fun story', exampleZh: '一個有趣的故事' },
    { en: 'day', zh: '一天', image: '📅', phonics: '', kk: '[de]', phonicsSound: '', exampleSentence: 'a school day', exampleZh: '上學日' },
    { en: 'student', zh: '學生', image: '🧑‍🎓', phonics: '', kk: '[ˈstudn̩t]', phonicsSound: '', exampleSentence: 'He is a student.', exampleZh: '他是學生。' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'He likes school.', exampleZh: '他喜歡學校。' },
    { en: 'have', zh: '有', image: '🤲', phonics: '', kk: '[hæv]', phonicsSound: '', exampleSentence: 'He has a book.', exampleZh: '他有一本書。' },
    { en: 'read', zh: '閱讀', image: '📚', phonics: '', kk: '[rid]', phonicsSound: '', exampleSentence: 'He can read.', exampleZh: '他會閱讀。' },
    { en: 'friend', zh: '朋友', image: '🧑‍🤝‍🧑', phonics: '', kk: '[frɛnd]', phonicsSound: '', exampleSentence: 'He has friends.', exampleZh: '他有朋友。' },
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'He is happy.', exampleZh: '他很開心。' },
    { en: 'play', zh: '玩', image: '🎮', phonics: '', kk: '[ple]', phonicsSound: '', exampleSentence: 'They play together.', exampleZh: '他們一起玩。' },
    { en: 'good', zh: '好的', image: '👍', phonics: '', kk: '[ɡʊd]', phonicsSound: '', exampleSentence: 'a good day', exampleZh: '美好的一天' },
  ],
  sentences: [
    { en: 'Finn is a student.', zh: 'Finn 是學生。' }, { en: 'He likes school.', zh: '他喜歡學校。' }, { en: 'He has a book and a bag.', zh: '他有書和書包。' }, { en: 'He can read and write.', zh: '他會讀也會寫。' }, { en: 'He plays with friends.', zh: '他和朋友玩。' }, { en: 'Finn is happy!', zh: 'Finn 很開心！' },
  ],
  phonicsLetters: ['reading'],
  warmUpQuestions: [
    { type: 'listen-pick', question: 'Finn 是什麼？', options: ['a student', 'a teacher', 'a dog', 'a book'], answer: 'a student' },
    { type: 'listen-pick', question: 'Finn 喜歡什麼？', options: ['school', 'candy', 'sleep', 'TV'], answer: 'school' },
    { type: 'match', question: '📚 read 是什麼意思？', options: ['閱讀', '寫字', '玩', '跑'], answer: '閱讀' },
  ],
  challenges: [
    { type: 'read', question: 'What can Finn do?（Finn 會什麼？）', passage: 'Finn is a student.\nHe likes school.\nHe has a book.\nHe can read and write.', options: ['read and write', 'swim and fly', 'cook and drive', 'sing and dance'], answer: 'read and write' },
    { type: 'read', question: 'How does Finn feel?（Finn 的感覺？）', passage: 'Finn plays with his friends.\nThey have fun at school.\nFinn is very happy!', options: ['happy', 'sad', 'angry', 'tired'], answer: 'happy' },
    { type: 'fill-blank', question: 'Finn ___ a book.（有·第三人稱）', options: ['has', 'have', 'is', 'like'], answer: 'has' },
    { type: 'fill-blank', question: 'He ___ school.（喜歡·第三人稱）', options: ['likes', 'like', 'is', 'has'], answer: 'likes' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['He can read and write.', 'He can swim and fly.', 'He likes school.', 'He has a book.'], answer: 'He can read and write.', image: '🎧' },
    { type: 'spell', question: '拼拼看：st _ ry（故事）', answer: 'story', image: '✍️' },
  ],
  talkTimePrompts: ["Retell the story about Finn.", "What does Finn have?", "What can Finn do?", "Make your own: I am ___. I like ___. I can ___."],
  reviewQuiz: [
    { type: 'read', question: 'Does Finn like school?（Finn 喜歡學校嗎？）', passage: 'Finn is a happy student.\nHe likes school a lot.\nHe reads every day.', options: ['Yes', 'No', 'Maybe', 'Never'], answer: 'Yes' },
    { type: 'fill-blank', question: 'He ___ happy.（be動詞）', options: ['is', 'am', 'are', 'has'], answer: 'is' },
    { type: 'match', question: 'play 是什麼意思？', options: ['玩', '讀', '寫', '跑'], answer: '玩' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "This is Finn. He is a student.", lineZh: '這是 Finn。他是學生。' },
    { speaker: 'Finn', line: "I like school! I have a book.", lineZh: '我喜歡學校！我有一本書。' },
    { speaker: 'Benny', line: "Can Finn read?", lineZh: 'Finn 會閱讀嗎？' },
    { speaker: 'Finn', line: "Yes, I can! I play with friends. I'm happy!", lineZh: '是的，我會！我和朋友玩。我很開心！' },
  ],
};

const L4_M20: Mission = {
  id: 20, slug: 'l4-m20-boss', level: 4, title: '學校路大魔王', titleEn: 'School Boss', theme: '學校路・大魔王挑戰', themeEmoji: '🏆',
  focus: '總驗收：be / like / have / can ＋ 疑問句 ＋ 介系詞 ＋ 過去式入門',
  story: [
    { image: '🐲', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The School Boss is here! Use all your English!", dialogueZh: '學校大魔王來了！用上你所有的英文！', highlightWords: [], sceneEmojis: ['🐲', '⚔️', '🏫'], animation: 'shake' },
    { image: '💪', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I am, I like, I have, I can — I know them all!", dialogueZh: 'I am、I like、I have、I can —— 我全會了！', highlightWords: [], sceneEmojis: ['💪', '📚', '✨'], animation: 'bounce' },
    { image: '🎖️', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You beat the Boss! You get the School Badge!", dialogueZh: '你打敗大魔王了！獲得學校徽章！', highlightWords: ['Badge'], sceneEmojis: ['🎖️', '🏆', '🎉'], animation: 'tada' },
    { image: '🌊', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You finished School Road! On to Coral Beach!", dialogueZh: '你完成了學校路！前進珊瑚灘！', highlightWords: [], sceneEmojis: ['🌊', '🏖️', '🚀'], animation: 'bounce' },
  ],
  words: [
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy.', exampleZh: '我很開心。' },
    { en: 'like', zh: '喜歡', image: '❤️', phonics: '', kk: '[laɪk]', phonicsSound: '', exampleSentence: 'I like it.', exampleZh: '我喜歡。' },
    { en: 'have', zh: '有', image: '🤲', phonics: '', kk: '[hæv]', phonicsSound: '', exampleSentence: 'I have a book.', exampleZh: '我有書。' },
    { en: 'can', zh: '會·能', image: '💪', phonics: '', kk: '[kæn]', phonicsSound: '', exampleSentence: 'I can swim.', exampleZh: '我會游泳。' },
    { en: 'teacher', zh: '老師', image: '👩‍🏫', phonics: '', kk: '[ˈtitʃɚ]', phonicsSound: '', exampleSentence: 'She is a teacher.', exampleZh: '她是老師。' },
    { en: 'book', zh: '書', image: '📖', phonics: '', kk: '[bʊk]', phonicsSound: '', exampleSentence: 'This is a book.', exampleZh: '這是書。' },
    { en: 'on', zh: '在…上面', image: '⬆️', phonics: '', kk: '[ɑn]', phonicsSound: '', exampleSentence: 'on the desk', exampleZh: '在書桌上' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'I can swim.', exampleZh: '我會游泳。' },
    { en: 'went', zh: '去了（過去）', image: '⏪', phonics: '', kk: '[wɛnt]', phonicsSound: '', exampleSentence: 'I went to school.', exampleZh: '我去了學校。' },
    { en: 'fine', zh: '很好的', image: '👍', phonics: '', kk: '[faɪn]', phonicsSound: '', exampleSentence: 'I am fine.', exampleZh: '我很好。' },
  ],
  sentences: [
    { en: 'I am happy and I like school.', zh: '我很開心，我喜歡學校。' }, { en: 'I have a book. I can read it.', zh: '我有一本書。我會讀它。' }, { en: 'Where is the cat? It is on the desk.', zh: '貓在哪？在書桌上。' }, { en: 'Can you swim? Yes, I can!', zh: '你會游泳嗎？是的，我會！' }, { en: 'I went to school yesterday.', zh: '我昨天去了學校。' }, { en: 'I did it!', zh: '我做到了！' },
  ],
  phonicsLetters: ['review all'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ happy.（be動詞）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'fill-blank', question: 'Can you swim? Yes, I ___.', options: ['can', 'do', 'am', 'is'], answer: 'can' },
    { type: 'fill-blank', question: 'The book is ___ the desk.（上面）', options: ['on', 'in', 'under', 'is'], answer: 'on' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['❤️', '📖', '🏊', '👩‍🏫'], answer: '🏊', image: '🎧' },
    { type: 'fill-blank', question: 'Do you ___ pizza?（喜歡·問句）', options: ['like', 'am', 'is', 'can'], answer: 'like' },
    { type: 'fill-blank', question: 'She ___ a teacher.（be動詞）', options: ['is', 'am', 'are', 'do'], answer: 'is' },
    { type: 'match', question: 'go 的過去式是？', options: ['went', 'goed', 'goes', 'going'], answer: 'went' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Can you swim?', 'Do you swim?', 'I can swim.', 'Are you swimming?'], answer: 'Can you swim?', image: '🎧' },
    { type: 'read', question: 'What can the student do?（學生會什麼？）', passage: 'I am a student.\nI have a book and a pen.\nI can read and write.\nI went to school yesterday.', options: ['read and write', 'fly and swim', 'cook and drive', 'sing and paint'], answer: 'read and write' },
  ],
  talkTimePrompts: ["Tell me about you: I am ___, I like ___, I have ___, I can ___.", "Ask 3 questions: Are you…? Do you…? Can you…?", "Say where your bag is.", "You beat the School Boss! Say 'I did it!'"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'I ___ a book. I can read it.（有）', options: ['have', 'am', 'like', 'is'], answer: 'have' },
    { type: 'fill-blank', question: '___ is the cat? It is on the desk.', options: ['Where', 'What', 'Who', 'Do'], answer: 'Where' },
    { type: 'read', question: 'Where did the student go?（學生去了哪？）', passage: 'Yesterday I went to school.\nI played with my friends.\nWe were very happy.', options: ['to school', 'to the zoo', 'home', 'to the sea'], answer: 'to school' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "The School Boss says: tell me about you!", lineZh: '學校大魔王說：介紹你自己！' },
    { speaker: 'Coco', line: "I am happy! I like school! I can swim!", lineZh: '我很開心！我喜歡學校！我會游泳！' },
    { speaker: 'Ruby', line: "You beat the Boss! School champion!", lineZh: '你打敗大魔王了！學校冠軍！' },
    { speaker: 'Finn', line: "On to Coral Beach! Let's learn adjectives!", lineZh: '前進珊瑚灘！我們來學形容詞！' },
  ],
};

// ===================== L5 珊瑚灘 Coral Beach（A1・形容詞＋比較級＋閱讀起步） =====================
const L5_M1: Mission = {
  id: 1, slug: 'l5-m1-adjectives-size', level: 5, title: '形容詞① 大小', titleEn: 'Adjectives: Size', theme: '珊瑚灘・大海生物', themeEmoji: '📏',
  focus: '形容詞（大小）：big/small/tall/short/long…；It is + 形容詞',
  story: [
    { image: '🌊', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Welcome to Coral Beach! Look at the big whale!", dialogueZh: '歡迎來到珊瑚灘！看那隻大鯨魚！', highlightWords: ['big'], sceneEmojis: ['🌊', '🐋', '✨'], animation: 'wave' },
    { image: '🐟', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "The fish is small. The whale is big!", dialogueZh: '魚很小。鯨魚很大！', highlightWords: ['small', 'big'], sceneEmojis: ['🐟', '🐋', '😊'], animation: 'bounce' },
    { image: '🦀', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "The crab is short. The eel is long!", dialogueZh: '螃蟹很短。鰻魚很長！', highlightWords: ['short', 'long'], sceneEmojis: ['🦀', '🐍', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Big, small, long, short — you can describe things!", dialogueZh: '大、小、長、短 —— 你會形容東西了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📏'], animation: 'bounce' },
  ],
  words: [
    { en: 'big', zh: '大的', image: '🐋', phonics: '', kk: '[bɪɡ]', phonicsSound: '', exampleSentence: 'It is big.', exampleZh: '它很大。' },
    { en: 'small', zh: '小的', image: '🐟', phonics: '', kk: '[smɔl]', phonicsSound: '', exampleSentence: 'It is small.', exampleZh: '它很小。' },
    { en: 'tall', zh: '高的', image: '🦒', phonics: '', kk: '[tɔl]', phonicsSound: '', exampleSentence: 'It is tall.', exampleZh: '它很高。' },
    { en: 'short', zh: '矮的·短的', image: '🦀', phonics: '', kk: '[ʃɔrt]', phonicsSound: '', exampleSentence: 'It is short.', exampleZh: '它很矮。' },
    { en: 'long', zh: '長的', image: '🐍', phonics: '', kk: '[lɔŋ]', phonicsSound: '', exampleSentence: 'It is long.', exampleZh: '它很長。' },
    { en: 'little', zh: '小小的', image: '🐚', phonics: '', kk: '[ˈlɪtl̩]', phonicsSound: '', exampleSentence: 'a little shell', exampleZh: '一個小貝殼' },
    { en: 'huge', zh: '巨大的', image: '🐳', phonics: '', kk: '[hjudʒ]', phonicsSound: '', exampleSentence: 'a huge whale', exampleZh: '一隻巨大的鯨魚' },
    { en: 'wide', zh: '寬的', image: '🌊', phonics: '', kk: '[waɪd]', phonicsSound: '', exampleSentence: 'The sea is wide.', exampleZh: '海很寬。' },
    { en: 'round', zh: '圓的', image: '⚪', phonics: '', kk: '[raʊnd]', phonicsSound: '', exampleSentence: 'a round ball', exampleZh: '一顆圓球' },
    { en: 'fat', zh: '胖的', image: '🐡', phonics: '', kk: '[fæt]', phonicsSound: '', exampleSentence: 'a fat fish', exampleZh: '一隻胖魚' },
  ],
  sentences: [
    { en: 'The whale is big.', zh: '鯨魚很大。' }, { en: 'The fish is small.', zh: '魚很小。' }, { en: 'Is it long?', zh: '它長嗎？' }, { en: 'Yes, it is long.', zh: '是的，它很長。' }, { en: 'It is a huge whale.', zh: '這是一隻巨大的鯨魚。' }, { en: 'The crab is short.', zh: '螃蟹很短。' },
  ],
  phonicsLetters: ['big / small'],
  warmUpQuestions: [
    { type: 'match', question: '🐋 鯨魚是？', options: ['big', 'small', 'short', 'little'], answer: 'big' },
    { type: 'match', question: '🐟 小魚是？', options: ['small', 'big', 'tall', 'long'], answer: 'small' },
    { type: 'fill-blank', question: 'The eel is ___.（長）', options: ['long', 'short', 'small', 'round'], answer: 'long' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的形容詞', options: ['🐋', '🐟', '🐍', '🦀'], answer: '🐍', image: '🎧' },
    { type: 'match', question: '配對：形容詞配意思', options: ['big-大', 'small-小', 'long-長', 'short-短'], answer: 'big-大' },
    { type: 'fill-blank', question: '句型代換：It is ___.（巨大的）', options: ['huge', 'small', 'short', 'is'], answer: 'huge' },
    { type: 'spell', question: '拼拼看：sm _ ll（小的）', answer: 'small', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The whale is big.', 'The fish is small.', 'The crab is short.', 'The eel is long.'], answer: 'The whale is big.', image: '🎧' },
    { type: 'read', question: 'How is the whale?（鯨魚怎麼樣？）', passage: 'Look at the sea.\nThe whale is very big.\nThe little fish is small.', options: ['big', 'small', 'short', 'round'], answer: 'big' },
  ],
  talkTimePrompts: ["Describe it: It is big / small.", "Point to something long and short.", "Ask: Is it big?", "Change it: It is ___ (tall/little/huge)."],
  reviewQuiz: [
    { type: 'match', question: '🐍 長的 是？', options: ['long', 'short', 'small', 'round'], answer: 'long' },
    { type: 'fill-blank', question: 'The whale is ___.（大）', options: ['big', 'small', 'short', 'thin'], answer: 'big' },
    { type: 'spell', question: '拼拼看：l _ ng（長的）', answer: 'long', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Look! The whale is so big!", lineZh: '看！鯨魚好大！' },
    { speaker: 'Coco', line: "And the fish is small. So little!", lineZh: '魚很小。好小喔！' },
    { speaker: 'Polly', line: "The eel is long. The crab is short!", lineZh: '鰻魚很長。螃蟹很短！' },
    { speaker: 'Finn', line: "Big, small, long, short — great words!", lineZh: '大、小、長、短 —— 好棒的字！' },
  ],
};

const L5_M2: Mission = {
  id: 2, slug: 'l5-m2-adjectives-2', level: 5, title: '形容詞② 相反', titleEn: 'Adjectives: Opposites', theme: '珊瑚灘・相反詞', themeEmoji: '↔️',
  focus: '形容詞（相反詞）：hot/cold, new/old, fast/slow, clean/dirty',
  story: [
    { image: '↔️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "The sun is hot. The water is cold!", dialogueZh: '太陽很熱。水很冷！', highlightWords: ['hot', 'cold'], sceneEmojis: ['☀️', '❄️', '✨'], animation: 'wave' },
    { image: '🐢', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "The fish is fast. The turtle is slow!", dialogueZh: '魚很快。烏龜很慢！', highlightWords: ['fast', 'slow'], sceneEmojis: ['🐟', '🐢', '😊'], animation: 'bounce' },
    { image: '🐚', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "This shell is new. That shell is old!", dialogueZh: '這個貝殼是新的。那個貝殼是舊的！', highlightWords: ['new', 'old'], sceneEmojis: ['🐚', '🦪', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Opposites are fun! Hot and cold!", dialogueZh: '相反詞好好玩！熱和冷！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '↔️'], animation: 'bounce' },
  ],
  words: [
    { en: 'hot', zh: '熱的', image: '☀️', phonics: '', kk: '[hɑt]', phonicsSound: '', exampleSentence: 'It is hot.', exampleZh: '它很熱。' },
    { en: 'cold', zh: '冷的', image: '❄️', phonics: '', kk: '[kold]', phonicsSound: '', exampleSentence: 'It is cold.', exampleZh: '它很冷。' },
    { en: 'new', zh: '新的', image: '✨', phonics: '', kk: '[nu]', phonicsSound: '', exampleSentence: 'a new shell', exampleZh: '一個新貝殼' },
    { en: 'old', zh: '舊的', image: '🦪', phonics: '', kk: '[old]', phonicsSound: '', exampleSentence: 'an old shell', exampleZh: '一個舊貝殼' },
    { en: 'fast', zh: '快的', image: '💨', phonics: '', kk: '[fæst]', phonicsSound: '', exampleSentence: 'a fast fish', exampleZh: '一隻快魚' },
    { en: 'slow', zh: '慢的', image: '🐢', phonics: '', kk: '[slo]', phonicsSound: '', exampleSentence: 'a slow turtle', exampleZh: '一隻慢烏龜' },
    { en: 'clean', zh: '乾淨的', image: '🫧', phonics: '', kk: '[klin]', phonicsSound: '', exampleSentence: 'clean water', exampleZh: '乾淨的水' },
    { en: 'dirty', zh: '髒的', image: '🟤', phonics: '', kk: '[ˈdɝti]', phonicsSound: '', exampleSentence: 'dirty sand', exampleZh: '髒的沙' },
    { en: 'happy', zh: '開心的', image: '😊', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'a happy crab', exampleZh: '一隻開心的螃蟹' },
    { en: 'sad', zh: '難過的', image: '😢', phonics: '', kk: '[sæd]', phonicsSound: '', exampleSentence: 'a sad fish', exampleZh: '一隻難過的魚' },
  ],
  sentences: [
    { en: 'The sun is hot.', zh: '太陽很熱。' }, { en: 'The water is cold.', zh: '水很冷。' }, { en: 'Is it fast or slow?', zh: '它快還是慢？' }, { en: 'It is fast.', zh: '它很快。' }, { en: 'This shell is new.', zh: '這個貝殼是新的。' }, { en: 'The water is clean.', zh: '水很乾淨。' },
  ],
  phonicsLetters: ['hot / cold'],
  warmUpQuestions: [
    { type: 'match', question: 'hot 的相反是？', options: ['cold', 'fast', 'new', 'clean'], answer: 'cold' },
    { type: 'match', question: 'fast 的相反是？', options: ['slow', 'hot', 'old', 'dirty'], answer: 'slow' },
    { type: 'match', question: 'new 的相反是？', options: ['old', 'cold', 'slow', 'clean'], answer: 'old' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的形容詞', options: ['☀️', '❄️', '💨', '🐢'], answer: '🐢', image: '🎧' },
    { type: 'match', question: '配對：相反詞', options: ['hot-cold', 'fast-slow', 'new-old', 'clean-dirty'], answer: 'hot-cold' },
    { type: 'fill-blank', question: '句型代換：The water is ___.（冷）', options: ['cold', 'hot', 'fast', 'is'], answer: 'cold' },
    { type: 'spell', question: '拼拼看：sl _ w（慢的）', answer: 'slow', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The sun is hot.', 'The water is cold.', 'The fish is fast.', 'The turtle is slow.'], answer: 'The sun is hot.', image: '🎧' },
    { type: 'read', question: 'Is the turtle fast?（烏龜快嗎？）', passage: 'The fish swims fast.\nThe turtle is very slow.\nThey are good friends.', options: ['No, it is slow', 'Yes, it is fast', 'It is hot', 'It is new'], answer: 'No, it is slow' },
  ],
  talkTimePrompts: ["Say opposites: hot / cold.", "Describe the water: It is ___.", "Ask: Is it fast or slow?", "Change it: It is ___ (new/old/clean)."],
  reviewQuiz: [
    { type: 'match', question: 'clean 的相反是？', options: ['dirty', 'cold', 'slow', 'old'], answer: 'dirty' },
    { type: 'fill-blank', question: 'The turtle is ___.（慢）', options: ['slow', 'fast', 'hot', 'new'], answer: 'slow' },
    { type: 'spell', question: '拼拼看：c _ ld（冷的）', answer: 'cold', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "The sun is hot, but the water is cold!", lineZh: '太陽很熱，但水很冷！' },
    { speaker: 'Benny', line: "The fish is fast. The turtle is slow.", lineZh: '魚很快。烏龜很慢。' },
    { speaker: 'Ruby', line: "My shell is new. Yours is old!", lineZh: '我的貝殼是新的。你的是舊的！' },
    { speaker: 'Coco', line: "Opposites everywhere! So cool!", lineZh: '到處都是相反詞！好酷！' },
  ],
};

const L5_M3: Mission = {
  id: 3, slug: 'l5-m3-comparative', level: 5, title: '比較級 -er', titleEn: 'Comparative -er', theme: '珊瑚灘・比一比', themeEmoji: '➕',
  focus: '比較級 -er：big→bigger, tall→taller, fast→faster',
  story: [
    { image: '➕', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Big becomes bigger! Add -er!", dialogueZh: 'Big 變 bigger！加 -er！', highlightWords: ['bigger', '-er'], sceneEmojis: ['🐋', '➕', '✨'], animation: 'wave' },
    { image: '🐋', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "The whale is bigger. The eel is longer!", dialogueZh: '鯨魚比較大。鰻魚比較長！', highlightWords: ['bigger', 'longer'], sceneEmojis: ['🐋', '🐍', '😊'], animation: 'bounce' },
    { image: '💨', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "This fish is faster! And that one is smaller!", dialogueZh: '這隻魚比較快！那隻比較小！', highlightWords: ['faster', 'smaller'], sceneEmojis: ['🐟', '💨', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Add -er to compare! Bigger, faster, taller!", dialogueZh: '加 -er 來比較！bigger、faster、taller！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '➕'], animation: 'bounce' },
  ],
  words: [
    { en: 'bigger', zh: '比較大', image: '🐋', phonics: '', kk: '[ˈbɪɡɚ]', phonicsSound: '', exampleSentence: 'It is bigger.', exampleZh: '它比較大。' },
    { en: 'smaller', zh: '比較小', image: '🐟', phonics: '', kk: '[ˈsmɔlɚ]', phonicsSound: '', exampleSentence: 'It is smaller.', exampleZh: '它比較小。' },
    { en: 'taller', zh: '比較高', image: '🦒', phonics: '', kk: '[ˈtɔlɚ]', phonicsSound: '', exampleSentence: 'It is taller.', exampleZh: '它比較高。' },
    { en: 'longer', zh: '比較長', image: '🐍', phonics: '', kk: '[ˈlɔŋɡɚ]', phonicsSound: '', exampleSentence: 'It is longer.', exampleZh: '它比較長。' },
    { en: 'faster', zh: '比較快', image: '💨', phonics: '', kk: '[ˈfæstɚ]', phonicsSound: '', exampleSentence: 'It is faster.', exampleZh: '它比較快。' },
    { en: 'slower', zh: '比較慢', image: '🐢', phonics: '', kk: '[ˈsloɚ]', phonicsSound: '', exampleSentence: 'It is slower.', exampleZh: '它比較慢。' },
    { en: 'older', zh: '比較舊·老', image: '🦪', phonics: '', kk: '[ˈoldɚ]', phonicsSound: '', exampleSentence: 'It is older.', exampleZh: '它比較舊。' },
    { en: 'newer', zh: '比較新', image: '✨', phonics: '', kk: '[ˈnuɚ]', phonicsSound: '', exampleSentence: 'It is newer.', exampleZh: '它比較新。' },
    { en: 'hotter', zh: '比較熱', image: '🔥', phonics: '', kk: '[ˈhɑtɚ]', phonicsSound: '', exampleSentence: 'It is hotter.', exampleZh: '它比較熱。' },
    { en: 'colder', zh: '比較冷', image: '🧊', phonics: '', kk: '[ˈkoldɚ]', phonicsSound: '', exampleSentence: 'It is colder.', exampleZh: '它比較冷。' },
  ],
  sentences: [
    { en: 'The whale is bigger.', zh: '鯨魚比較大。' }, { en: 'The eel is longer.', zh: '鰻魚比較長。' }, { en: 'This fish is faster.', zh: '這隻魚比較快。' }, { en: 'Which one is bigger?', zh: '哪一個比較大？' }, { en: 'The sun is hotter today.', zh: '今天太陽比較熱。' }, { en: 'A shell is smaller.', zh: '貝殼比較小。' },
  ],
  phonicsLetters: ['big → bigger'],
  warmUpQuestions: [
    { type: 'match', question: 'big 的比較級是？', options: ['bigger', 'biger', 'big', 'biggest'], answer: 'bigger' },
    { type: 'match', question: 'fast 的比較級是？', options: ['faster', 'fastest', 'fast', 'more fast'], answer: 'faster' },
    { type: 'match', question: 'tall 的比較級是？', options: ['taller', 'tallest', 'tall', 'more tall'], answer: 'taller' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選字：點你聽到的比較級', options: ['bigger', 'smaller', 'faster', 'longer'], answer: 'faster', image: '🎧' },
    { type: 'match', question: '配對：原級→比較級', options: ['big-bigger', 'small-smaller', 'fast-faster', 'long-longer'], answer: 'big-bigger' },
    { type: 'fill-blank', question: 'The whale is ___ than the fish.（大）', options: ['bigger', 'big', 'biggest', 'more big'], answer: 'bigger' },
    { type: 'spell', question: '拼拼看：fast _ r（比較快）', answer: 'faster', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The whale is bigger.', 'The eel is longer.', 'The fish is faster.', 'The shell is smaller.'], answer: 'The whale is bigger.', image: '🎧' },
    { type: 'read', question: 'Which is faster?（哪個比較快？）', passage: 'The fish swims fast.\nThe turtle swims slowly.\nThe fish is faster than the turtle.', options: ['the fish', 'the turtle', 'the whale', 'the crab'], answer: 'the fish' },
  ],
  talkTimePrompts: ["Make it -er: big → ?", "Compare two things: A is ___er.", "Which is bigger? A or B?", "Change it: It is ___er (taller/faster/older)."],
  reviewQuiz: [
    { type: 'match', question: 'long 的比較級是？', options: ['longer', 'longest', 'long', 'more long'], answer: 'longer' },
    { type: 'fill-blank', question: 'The turtle is ___ than the fish.（慢）', options: ['slower', 'slow', 'slowest', 'more slow'], answer: 'slower' },
    { type: 'spell', question: '拼拼看：bigg _ r（比較大）', answer: 'bigger', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "Big becomes bigger. Just add -er!", lineZh: 'Big 變 bigger。加 -er 就好！' },
    { speaker: 'Coco', line: "The whale is bigger than the fish!", lineZh: '鯨魚比魚大！' },
    { speaker: 'Polly', line: "And this fish is faster than that one!", lineZh: '這隻魚比那隻快！' },
    { speaker: 'Benny', line: "Bigger, faster, taller! Add -er!", lineZh: 'Bigger、faster、taller！加 -er！' },
  ],
};

const L5_M4: Mission = {
  id: 4, slug: 'l5-m4-bigger-than', level: 5, title: 'A is …er than B', titleEn: 'Bigger than', theme: '珊瑚灘・誰比較大', themeEmoji: '⚖️',
  focus: '句型 A is + 比較級 + than + B',
  story: [
    { image: '⚖️', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "A whale is bigger than a fish!", dialogueZh: '鯨魚比魚大！', highlightWords: ['bigger', 'than'], sceneEmojis: ['🐋', '🐟', '✨'], animation: 'wave' },
    { image: '🦈', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "A shark is faster than a crab!", dialogueZh: '鯊魚比螃蟹快！', highlightWords: ['faster', 'than'], sceneEmojis: ['🦈', '🦀', '😊'], animation: 'bounce' },
    { image: '🐙', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "An octopus is bigger than a shrimp!", dialogueZh: '章魚比蝦子大！', highlightWords: ['bigger', 'than'], sceneEmojis: ['🐙', '🦐', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "A is bigger than B! You can compare!", dialogueZh: 'A 比 B 大！你會比較了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '⚖️'], animation: 'bounce' },
  ],
  words: [
    { en: 'than', zh: '比', image: '⚖️', phonics: '', kk: '[ðæn]', phonicsSound: '', exampleSentence: 'bigger than', exampleZh: '比…大' },
    { en: 'whale', zh: '鯨魚', image: '🐋', phonics: '', kk: '[wel]', phonicsSound: '', exampleSentence: 'a big whale', exampleZh: '一隻大鯨魚' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: '', kk: '[fɪʃ]', phonicsSound: '', exampleSentence: 'a small fish', exampleZh: '一隻小魚' },
    { en: 'shark', zh: '鯊魚', image: '🦈', phonics: '', kk: '[ʃɑrk]', phonicsSound: '', exampleSentence: 'a fast shark', exampleZh: '一隻快鯊魚' },
    { en: 'crab', zh: '螃蟹', image: '🦀', phonics: '', kk: '[kræb]', phonicsSound: '', exampleSentence: 'a small crab', exampleZh: '一隻小螃蟹' },
    { en: 'octopus', zh: '章魚', image: '🐙', phonics: '', kk: '[ˈɑktəpəs]', phonicsSound: '', exampleSentence: 'a big octopus', exampleZh: '一隻大章魚' },
    { en: 'shrimp', zh: '蝦子', image: '🦐', phonics: '', kk: '[ʃrɪmp]', phonicsSound: '', exampleSentence: 'a little shrimp', exampleZh: '一隻小蝦' },
    { en: 'turtle', zh: '烏龜', image: '🐢', phonics: '', kk: '[ˈtɝtl̩]', phonicsSound: '', exampleSentence: 'a slow turtle', exampleZh: '一隻慢烏龜' },
    { en: 'dolphin', zh: '海豚', image: '🐬', phonics: '', kk: '[ˈdɑlfɪn]', phonicsSound: '', exampleSentence: 'a fast dolphin', exampleZh: '一隻快海豚' },
    { en: 'seal', zh: '海豹', image: '🦭', phonics: '', kk: '[sil]', phonicsSound: '', exampleSentence: 'a cute seal', exampleZh: '一隻可愛海豹' },
  ],
  sentences: [
    { en: 'A whale is bigger than a fish.', zh: '鯨魚比魚大。' }, { en: 'A shark is faster than a crab.', zh: '鯊魚比螃蟹快。' }, { en: 'Which is bigger?', zh: '哪個比較大？' }, { en: 'The whale is bigger.', zh: '鯨魚比較大。' }, { en: 'A dolphin is faster than a turtle.', zh: '海豚比烏龜快。' }, { en: 'An octopus is bigger than a shrimp.', zh: '章魚比蝦子大。' },
  ],
  phonicsLetters: ['A is …er than B'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'A whale is bigger ___ a fish.（比）', options: ['than', 'then', 'that', 'the'], answer: 'than' },
    { type: 'match', question: '🦈 是什麼？', options: ['shark', 'whale', 'crab', 'seal'], answer: 'shark' },
    { type: 'match', question: '🐙 是什麼？', options: ['octopus', 'shrimp', 'turtle', 'fish'], answer: 'octopus' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的海洋生物', options: ['🐋', '🦈', '🐙', '🦀'], answer: '🐙', image: '🎧' },
    { type: 'match', question: '配對：海洋生物配圖', options: ['whale-🐋', 'shark-🦈', 'crab-🦀', 'shrimp-🦐'], answer: 'whale-🐋' },
    { type: 'fill-blank', question: 'A shark is ___ than a crab.（快）', options: ['faster', 'fast', 'fastest', 'more fast'], answer: 'faster' },
    { type: 'fill-blank', question: 'A whale is bigger ___ a fish.（比）', options: ['than', 'then', 'that', 'to'], answer: 'than' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['A whale is bigger than a fish.', 'A shark is faster than a crab.', 'A dolphin is faster than a turtle.', 'An octopus is bigger than a shrimp.'], answer: 'A whale is bigger than a fish.', image: '🎧' },
    { type: 'read', question: 'Which is bigger?（哪個比較大？）', passage: 'A whale is very big.\nA fish is small.\nA whale is bigger than a fish.', options: ['a whale', 'a fish', 'a crab', 'a shrimp'], answer: 'a whale' },
  ],
  talkTimePrompts: ["Compare: A ___ is bigger than a ___.", "Which is faster, a shark or a crab?", "Make a sentence with 'than'.", "Change it: A ___ is bigger than a ___."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'A dolphin is ___ than a turtle.（快）', options: ['faster', 'fast', 'fastest', 'more fast'], answer: 'faster' },
    { type: 'match', question: '🦐 是什麼？', options: ['shrimp', 'crab', 'seal', 'fish'], answer: 'shrimp' },
    { type: 'fill-blank', question: 'A shark is bigger ___ a shrimp.（比）', options: ['than', 'then', 'that', 'the'], answer: 'than' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "A whale is bigger than a fish!", lineZh: '鯨魚比魚大！' },
    { speaker: 'Coco', line: "A shark is faster than a crab!", lineZh: '鯊魚比螃蟹快！' },
    { speaker: 'Benny', line: "An octopus is bigger than a shrimp!", lineZh: '章魚比蝦子大！' },
    { speaker: 'Polly', line: "A is bigger than B! Now you compare!", lineZh: 'A 比 B 大！現在你會比較了！' },
  ],
};

const L5_M5: Mission = {
  id: 5, slug: 'l5-m5-review-adjectives', level: 5, title: 'Review① 形容詞', titleEn: 'Review: Adjectives', theme: '珊瑚灘・複習關', themeEmoji: '🔄',
  focus: '螺旋複習①：形容詞 ＋ 相反詞 ＋ 比較級 A is …er than B',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review! Big, small, fast, slow!", dialogueZh: '來複習！大、小、快、慢！', highlightWords: [], sceneEmojis: ['🔄', '📏', '✨'], animation: 'wave' },
    { image: '🐋', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "The whale is bigger than the fish!", dialogueZh: '鯨魚比魚大！', highlightWords: ['bigger', 'than'], sceneEmojis: ['🐋', '🐟', '😊'], animation: 'bounce' },
    { image: '↔️', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Hot and cold, new and old — opposites!", dialogueZh: '熱和冷，新和舊 —— 相反詞！', highlightWords: [], sceneEmojis: ['☀️', '❄️', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can describe and compare! Amazing!", dialogueZh: '你會形容也會比較了！太厲害了！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'big', zh: '大的', image: '🐋', phonics: '', kk: '[bɪɡ]', phonicsSound: '', exampleSentence: 'It is big.', exampleZh: '它很大。' },
    { en: 'small', zh: '小的', image: '🐟', phonics: '', kk: '[smɔl]', phonicsSound: '', exampleSentence: 'It is small.', exampleZh: '它很小。' },
    { en: 'fast', zh: '快的', image: '💨', phonics: '', kk: '[fæst]', phonicsSound: '', exampleSentence: 'It is fast.', exampleZh: '它很快。' },
    { en: 'slow', zh: '慢的', image: '🐢', phonics: '', kk: '[slo]', phonicsSound: '', exampleSentence: 'It is slow.', exampleZh: '它很慢。' },
    { en: 'hot', zh: '熱的', image: '☀️', phonics: '', kk: '[hɑt]', phonicsSound: '', exampleSentence: 'It is hot.', exampleZh: '它很熱。' },
    { en: 'cold', zh: '冷的', image: '❄️', phonics: '', kk: '[kold]', phonicsSound: '', exampleSentence: 'It is cold.', exampleZh: '它很冷。' },
    { en: 'bigger', zh: '比較大', image: '🐳', phonics: '', kk: '[ˈbɪɡɚ]', phonicsSound: '', exampleSentence: 'It is bigger.', exampleZh: '它比較大。' },
    { en: 'faster', zh: '比較快', image: '🦈', phonics: '', kk: '[ˈfæstɚ]', phonicsSound: '', exampleSentence: 'It is faster.', exampleZh: '它比較快。' },
    { en: 'than', zh: '比', image: '⚖️', phonics: '', kk: '[ðæn]', phonicsSound: '', exampleSentence: 'bigger than', exampleZh: '比…大' },
    { en: 'whale', zh: '鯨魚', image: '🐋', phonics: '', kk: '[wel]', phonicsSound: '', exampleSentence: 'a big whale', exampleZh: '一隻大鯨魚' },
  ],
  sentences: [
    { en: 'The whale is big.', zh: '鯨魚很大。' }, { en: 'The fish is small.', zh: '魚很小。' }, { en: 'The whale is bigger than the fish.', zh: '鯨魚比魚大。' }, { en: 'Is it hot or cold?', zh: '它熱還是冷？' }, { en: 'A shark is faster than a crab.', zh: '鯊魚比螃蟹快。' }, { en: 'Which is bigger?', zh: '哪個比較大？' },
  ],
  phonicsLetters: ['review adjectives'],
  warmUpQuestions: [
    { type: 'match', question: 'big 的相反是？', options: ['small', 'fast', 'hot', 'new'], answer: 'small' },
    { type: 'match', question: 'fast 的比較級是？', options: ['faster', 'fastest', 'fast', 'more fast'], answer: 'faster' },
    { type: 'fill-blank', question: 'The whale is ___ than the fish.（大）', options: ['bigger', 'big', 'biggest', 'small'], answer: 'bigger' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的形容詞', options: ['🐋', '🐟', '💨', '🐢'], answer: '🐢', image: '🎧' },
    { type: 'match', question: '配對：相反詞', options: ['big-small', 'fast-slow', 'hot-cold', 'new-old'], answer: 'big-small' },
    { type: 'fill-blank', question: 'A shark is ___ than a crab.（快）', options: ['faster', 'fast', 'fastest', 'slow'], answer: 'faster' },
    { type: 'spell', question: '拼拼看：sm _ ll（小）', answer: 'small', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The whale is bigger than the fish.', 'The fish is smaller than the whale.', 'The shark is faster than the crab.', 'It is hot today.'], answer: 'The whale is bigger than the fish.', image: '🎧' },
    { type: 'read', question: 'Which is smaller?（哪個比較小？）', passage: 'A whale is big.\nA fish is small.\nThe fish is smaller than the whale.', options: ['the fish', 'the whale', 'the shark', 'the sea'], answer: 'the fish' },
  ],
  talkTimePrompts: ["Describe the sea: It is ___.", "Compare two sea animals.", "Say two opposites.", "Which is bigger, a whale or a fish?"],
  reviewQuiz: [
    { type: 'match', question: 'hot 的相反是？', options: ['cold', 'fast', 'big', 'new'], answer: 'cold' },
    { type: 'fill-blank', question: 'A whale is ___ than a fish.（大）', options: ['bigger', 'big', 'small', 'biggest'], answer: 'bigger' },
    { type: 'read', question: 'Is the whale small?（鯨魚小嗎？）', passage: 'The whale is very big.\nIt is bigger than a shark.\nIt is the biggest in the sea!', options: ['No, it is big', 'Yes, it is small', 'It is fast', 'It is cold'], answer: 'No, it is big' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's review! Big, small, hot, cold!", lineZh: '來複習！大、小、熱、冷！' },
    { speaker: 'Coco', line: "The whale is bigger than the fish!", lineZh: '鯨魚比魚大！' },
    { speaker: 'Benny', line: "A shark is faster than a crab!", lineZh: '鯊魚比螃蟹快！' },
    { speaker: 'Finn', line: "You can describe and compare! Great!", lineZh: '你會形容也會比較了！太棒了！' },
  ],
};

const L5_M6: Mission = {
  id: 6, slug: 'l5-m6-weather', level: 5, title: '天氣', titleEn: 'Weather', theme: '珊瑚灘・今天天氣', themeEmoji: '🌤️',
  focus: '天氣單字：sunny/rainy/cloudy/windy/snowy…',
  story: [
    { image: '☀️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "It is sunny today! Let's go to the beach!", dialogueZh: '今天是晴天！我們去海邊吧！', highlightWords: ['sunny'], sceneEmojis: ['☀️', '🏖️', '✨'], animation: 'wave' },
    { image: '🌧️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Oh no, now it is rainy and cloudy!", dialogueZh: '喔不，現在下雨又多雲！', highlightWords: ['rainy', 'cloudy'], sceneEmojis: ['🌧️', '☁️', '😊'], animation: 'bounce' },
    { image: '💨', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "It is windy! My kite can fly!", dialogueZh: '風好大！我的風箏能飛了！', highlightWords: ['windy'], sceneEmojis: ['💨', '🪁', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Sunny, rainy, windy — you know the weather!", dialogueZh: '晴、雨、風 —— 你會說天氣了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🌤️'], animation: 'bounce' },
  ],
  words: [
    { en: 'sunny', zh: '晴朗的', image: '☀️', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: 'It is sunny.', exampleZh: '天氣晴朗。' },
    { en: 'rainy', zh: '下雨的', image: '🌧️', phonics: '', kk: '[ˈreni]', phonicsSound: '', exampleSentence: 'It is rainy.', exampleZh: '在下雨。' },
    { en: 'cloudy', zh: '多雲的', image: '☁️', phonics: '', kk: '[ˈklaʊdi]', phonicsSound: '', exampleSentence: 'It is cloudy.', exampleZh: '多雲。' },
    { en: 'windy', zh: '風大的', image: '💨', phonics: '', kk: '[ˈwɪndi]', phonicsSound: '', exampleSentence: 'It is windy.', exampleZh: '風很大。' },
    { en: 'snowy', zh: '下雪的', image: '❄️', phonics: '', kk: '[ˈsnoi]', phonicsSound: '', exampleSentence: 'It is snowy.', exampleZh: '在下雪。' },
    { en: 'hot', zh: '熱的', image: '🥵', phonics: '', kk: '[hɑt]', phonicsSound: '', exampleSentence: 'It is hot.', exampleZh: '天氣很熱。' },
    { en: 'cold', zh: '冷的', image: '🥶', phonics: '', kk: '[kold]', phonicsSound: '', exampleSentence: 'It is cold.', exampleZh: '天氣很冷。' },
    { en: 'warm', zh: '溫暖的', image: '🌤️', phonics: '', kk: '[wɔrm]', phonicsSound: '', exampleSentence: 'It is warm.', exampleZh: '天氣溫暖。' },
    { en: 'cool', zh: '涼爽的', image: '🍃', phonics: '', kk: '[kul]', phonicsSound: '', exampleSentence: 'It is cool.', exampleZh: '天氣涼爽。' },
    { en: 'rainbow', zh: '彩虹', image: '🌈', phonics: '', kk: '[ˈrenˌbo]', phonicsSound: '', exampleSentence: 'a rainbow', exampleZh: '一道彩虹' },
  ],
  sentences: [
    { en: 'It is sunny today.', zh: '今天是晴天。' }, { en: 'It is rainy and cloudy.', zh: '又下雨又多雲。' }, { en: 'Is it windy?', zh: '風大嗎？' }, { en: 'Yes, it is windy.', zh: '是的，風很大。' }, { en: 'It is hot in summer.', zh: '夏天很熱。' }, { en: 'Look, a rainbow!', zh: '看，彩虹！' },
  ],
  phonicsLetters: ['weather'],
  warmUpQuestions: [
    { type: 'match', question: '☀️ 是什麼天氣？', options: ['sunny', 'rainy', 'windy', 'snowy'], answer: 'sunny' },
    { type: 'match', question: '🌧️ 是什麼天氣？', options: ['rainy', 'sunny', 'cloudy', 'cool'], answer: 'rainy' },
    { type: 'match', question: '💨 是什麼天氣？', options: ['windy', 'snowy', 'hot', 'warm'], answer: 'windy' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的天氣', options: ['☀️', '🌧️', '☁️', '❄️'], answer: '❄️', image: '🎧' },
    { type: 'match', question: '配對：天氣配圖', options: ['sunny-☀️', 'rainy-🌧️', 'cloudy-☁️', 'windy-💨'], answer: 'sunny-☀️' },
    { type: 'fill-blank', question: '句型代換：It is ___.（下雪）', options: ['snowy', 'sunny', 'warm', 'is'], answer: 'snowy' },
    { type: 'spell', question: '拼拼看：s _ nny（晴朗）', answer: 'sunny', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['It is sunny today.', 'It is rainy today.', 'It is windy today.', 'It is snowy today.'], answer: 'It is sunny today.', image: '🎧' },
    { type: 'read', question: 'What is the weather like?（天氣如何？）', passage: 'Today it is not sunny.\nIt is rainy and cloudy.\nTake your umbrella!', options: ['rainy', 'sunny', 'snowy', 'hot'], answer: 'rainy' },
  ],
  talkTimePrompts: ["What is the weather today? It is ___.", "Say two kinds of weather.", "Ask: Is it sunny?", "Change it: It is ___ (windy/cloudy/cold)."],
  reviewQuiz: [
    { type: 'match', question: '❄️ 是什麼天氣？', options: ['snowy', 'sunny', 'rainy', 'warm'], answer: 'snowy' },
    { type: 'fill-blank', question: 'It is ___ today. Take an umbrella.（下雨）', options: ['rainy', 'sunny', 'warm', 'cool'], answer: 'rainy' },
    { type: 'spell', question: '拼拼看：w _ ndy（風大）', answer: 'windy', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "It is sunny today! Let's go out!", lineZh: '今天晴天！我們出去吧！' },
    { speaker: 'Coco', line: "Wait, now it is rainy and cloudy!", lineZh: '等等，現在下雨又多雲！' },
    { speaker: 'Polly', line: "And windy! My kite can fly!", lineZh: '風也大！我的風箏能飛！' },
    { speaker: 'Finn', line: "Look! After the rain — a rainbow!", lineZh: '看！雨後 —— 彩虹！' },
  ],
};

const L5_M7: Mission = {
  id: 7, slug: 'l5-m7-how-weather', level: 5, title: 'How\'s the weather?', titleEn: "How's the weather?", theme: '珊瑚灘・問天氣', themeEmoji: '🌦️',
  focus: '句型 How\'s the weather? — It\'s sunny. 四季天氣',
  story: [
    { image: '🌦️', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "How's the weather? It's sunny and warm!", dialogueZh: '天氣如何？晴朗又溫暖！', highlightWords: ["How's", "It's"], sceneEmojis: ['🌦️', '☀️', '✨'], animation: 'wave' },
    { image: '🍂', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "In fall, it's cool and windy.", dialogueZh: '秋天涼爽又有風。', highlightWords: ["It's", 'cool'], sceneEmojis: ['🍂', '💨', '😊'], animation: 'bounce' },
    { image: '⛄', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "In winter, it's cold and snowy!", dialogueZh: '冬天又冷又下雪！', highlightWords: ["It's", 'snowy'], sceneEmojis: ['⛄', '❄️', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "Now you can ask about the weather!", dialogueZh: '現在你會問天氣了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🌦️'], animation: 'bounce' },
  ],
  words: [
    { en: "how's", zh: '如何（how is）', image: '❓', phonics: '', kk: '[haʊz]', phonicsSound: '', exampleSentence: "How's the weather?", exampleZh: '天氣如何？' },
    { en: 'weather', zh: '天氣', image: '🌦️', phonics: '', kk: '[ˈwɛðɚ]', phonicsSound: '', exampleSentence: "How's the weather?", exampleZh: '天氣如何？' },
    { en: "it's", zh: '它是（it is）', image: '☀️', phonics: '', kk: '[ɪts]', phonicsSound: '', exampleSentence: "It's sunny.", exampleZh: '天氣晴朗。' },
    { en: 'spring', zh: '春天', image: '🌸', phonics: '', kk: '[sprɪŋ]', phonicsSound: '', exampleSentence: 'In spring, it is warm.', exampleZh: '春天很溫暖。' },
    { en: 'summer', zh: '夏天', image: '🌻', phonics: '', kk: '[ˈsʌmɚ]', phonicsSound: '', exampleSentence: 'In summer, it is hot.', exampleZh: '夏天很熱。' },
    { en: 'fall', zh: '秋天', image: '🍂', phonics: '', kk: '[fɔl]', phonicsSound: '', exampleSentence: 'In fall, it is cool.', exampleZh: '秋天涼爽。' },
    { en: 'winter', zh: '冬天', image: '⛄', phonics: '', kk: '[ˈwɪntɚ]', phonicsSound: '', exampleSentence: 'In winter, it is cold.', exampleZh: '冬天很冷。' },
    { en: 'warm', zh: '溫暖的', image: '🌤️', phonics: '', kk: '[wɔrm]', phonicsSound: '', exampleSentence: "It's warm.", exampleZh: '很溫暖。' },
    { en: 'umbrella', zh: '雨傘', image: '☂️', phonics: '', kk: '[ʌmˈbrɛlə]', phonicsSound: '', exampleSentence: 'Take an umbrella.', exampleZh: '帶把傘。' },
    { en: 'coat', zh: '外套', image: '🧥', phonics: '', kk: '[kot]', phonicsSound: '', exampleSentence: 'Wear a coat.', exampleZh: '穿外套。' },
  ],
  sentences: [
    { en: "How's the weather?", zh: '天氣如何？' }, { en: "It's sunny and warm.", zh: '晴朗又溫暖。' }, { en: 'In summer, it is hot.', zh: '夏天很熱。' }, { en: 'In winter, it is cold.', zh: '冬天很冷。' }, { en: "It's rainy. Take an umbrella.", zh: '在下雨。帶把傘。' }, { en: "Is it cold? Wear a coat.", zh: '冷嗎？穿外套。' },
  ],
  phonicsLetters: ["How's the weather?"],
  warmUpQuestions: [
    { type: 'fill-blank', question: "___ the weather?（如何）", options: ["How's", "What's", "Where's", "It's"], answer: "How's" },
    { type: 'match', question: '🌻 是哪個季節？', options: ['summer', 'spring', 'fall', 'winter'], answer: 'summer' },
    { type: 'match', question: '⛄ 是哪個季節？', options: ['winter', 'summer', 'spring', 'fall'], answer: 'winter' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的季節', options: ['🌸', '🌻', '🍂', '⛄'], answer: '🍂', image: '🎧' },
    { type: 'match', question: '配對：季節配圖', options: ['spring-🌸', 'summer-🌻', 'fall-🍂', 'winter-⛄'], answer: 'spring-🌸' },
    { type: 'fill-blank', question: "How's the weather? ___ sunny.（它是）", options: ["It's", "How's", "That's", "Is"], answer: "It's" },
    { type: 'fill-blank', question: 'In summer, it is ___.（熱）', options: ['hot', 'cold', 'snowy', 'cool'], answer: 'hot' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ["How's the weather?", "It's sunny and warm.", 'In winter, it is cold.', 'Take an umbrella.'], answer: "How's the weather?", image: '🎧' },
    { type: 'read', question: 'What should you take?（該帶什麼？）', passage: "How's the weather?\nIt's rainy today.\nTake an umbrella!", options: ['an umbrella', 'a coat', 'a kite', 'a hat'], answer: 'an umbrella' },
  ],
  talkTimePrompts: ["Ask: How's the weather?", "Answer: It's ___.", "What is the weather in summer?", "Change it: In ___, it is ___."],
  reviewQuiz: [
    { type: 'match', question: '🌸 是哪個季節？', options: ['spring', 'summer', 'fall', 'winter'], answer: 'spring' },
    { type: 'fill-blank', question: 'In winter, it is ___.（冷）', options: ['cold', 'hot', 'warm', 'sunny'], answer: 'cold' },
    { type: 'fill-blank', question: "___ the weather? It's cloudy.", options: ["How's", "What's", "It's", "Where's"], answer: "How's" },
  ],
  videoScript: [
    { speaker: 'Ruby', line: "How's the weather today?", lineZh: '今天天氣如何？' },
    { speaker: 'Benny', line: "It's sunny and warm. It's spring!", lineZh: '晴朗又溫暖。是春天！' },
    { speaker: 'Coco', line: "In winter, it's cold and snowy!", lineZh: '冬天又冷又下雪！' },
    { speaker: 'Ruby', line: "Now you can ask about the weather!", lineZh: '現在你會問天氣了！' },
  ],
};

const L5_M8: Mission = {
  id: 8, slug: 'l5-m8-time', level: 5, title: '時間 o\'clock', titleEn: 'What time is it?', theme: '珊瑚灘・幾點鐘', themeEmoji: '🕐',
  focus: '句型 What time is it? — It is ___ o\'clock.（整點）',
  story: [
    { image: '🕐', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "What time is it? It is one o'clock!", dialogueZh: '幾點了？一點鐘！', highlightWords: ['time', "o'clock"], sceneEmojis: ['🕐', '❓', '✨'], animation: 'wave' },
    { image: '🕖', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "It is seven o'clock. Time for breakfast!", dialogueZh: '七點鐘。吃早餐時間！', highlightWords: ["o'clock"], sceneEmojis: ['🕖', '🥞', '😊'], animation: 'bounce' },
    { image: '🕘', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "It is nine o'clock. Time for school!", dialogueZh: '九點鐘。上學時間！', highlightWords: ["o'clock"], sceneEmojis: ['🕘', '🏫', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Now you can tell the time! Great!", dialogueZh: '現在你會看時間了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🕐'], animation: 'bounce' },
  ],
  words: [
    { en: 'time', zh: '時間', image: '⏰', phonics: '', kk: '[taɪm]', phonicsSound: '', exampleSentence: 'What time is it?', exampleZh: '幾點了？' },
    { en: "o'clock", zh: '…點鐘', image: '🕐', phonics: '', kk: '[əˈklɑk]', phonicsSound: '', exampleSentence: "It is one o'clock.", exampleZh: '一點鐘。' },
    { en: 'clock', zh: '時鐘', image: '🕰️', phonics: '', kk: '[klɑk]', phonicsSound: '', exampleSentence: 'Look at the clock.', exampleZh: '看時鐘。' },
    { en: 'morning', zh: '早上', image: '🌅', phonics: '', kk: '[ˈmɔrnɪŋ]', phonicsSound: '', exampleSentence: 'in the morning', exampleZh: '在早上' },
    { en: 'afternoon', zh: '下午', image: '🌇', phonics: '', kk: '[ˌæftɚˈnun]', phonicsSound: '', exampleSentence: 'in the afternoon', exampleZh: '在下午' },
    { en: 'evening', zh: '晚上', image: '🌆', phonics: '', kk: '[ˈivnɪŋ]', phonicsSound: '', exampleSentence: 'in the evening', exampleZh: '在傍晚' },
    { en: 'night', zh: '夜晚', image: '🌙', phonics: '', kk: '[naɪt]', phonicsSound: '', exampleSentence: 'at night', exampleZh: '在晚上' },
    { en: 'now', zh: '現在', image: '👉', phonics: '', kk: '[naʊ]', phonicsSound: '', exampleSentence: 'What time is it now?', exampleZh: '現在幾點？' },
    { en: 'early', zh: '早的', image: '🐦', phonics: '', kk: '[ˈɝli]', phonicsSound: '', exampleSentence: 'I am early.', exampleZh: '我很早。' },
    { en: 'late', zh: '晚的·遲的', image: '🏃', phonics: '', kk: '[let]', phonicsSound: '', exampleSentence: 'I am late!', exampleZh: '我遲到了！' },
  ],
  sentences: [
    { en: 'What time is it?', zh: '幾點了？' }, { en: "It is one o'clock.", zh: '一點鐘。' }, { en: "It is seven o'clock.", zh: '七點鐘。' }, { en: 'It is time for school.', zh: '該上學了。' }, { en: 'Is it late?', zh: '很晚了嗎？' }, { en: 'Good morning!', zh: '早安！' },
  ],
  phonicsLetters: ["o'clock"],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'What ___ is it?（時間）', options: ['time', 'clock', 'now', 'day'], answer: 'time' },
    { type: 'match', question: '🌅 是什麼時候？', options: ['morning', 'night', 'evening', 'afternoon'], answer: 'morning' },
    { type: 'match', question: '🌙 是什麼時候？', options: ['night', 'morning', 'noon', 'early'], answer: 'night' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的時段', options: ['🌅', '🌇', '🌆', '🌙'], answer: '🌙', image: '🎧' },
    { type: 'match', question: '配對：時段配意思', options: ['morning-早上', 'afternoon-下午', 'evening-傍晚', 'night-晚上'], answer: 'morning-早上' },
    { type: 'fill-blank', question: "It is seven ___.（點鐘）", options: ["o'clock", 'time', 'clock', 'now'], answer: "o'clock" },
    { type: 'spell', question: '拼拼看：cl _ ck（時鐘）', answer: 'clock', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['What time is it?', "It is one o'clock.", 'It is time for school.', 'Good morning!'], answer: 'What time is it?', image: '🎧' },
    { type: 'read', question: 'What time is it for school?（幾點上學？）', passage: "It is seven o'clock. Time for breakfast.\nIt is nine o'clock now.\nIt is time for school!", options: ["nine o'clock", "seven o'clock", "one o'clock", "ten o'clock"], answer: "nine o'clock" },
  ],
  talkTimePrompts: ["Ask: What time is it?", "Answer: It is ___ o'clock.", "Say good morning / good night!", "What time do you go to school?"],
  reviewQuiz: [
    { type: 'match', question: '🌇 是什麼時候？', options: ['afternoon', 'morning', 'night', 'early'], answer: 'afternoon' },
    { type: 'fill-blank', question: 'What ___ is it now?（時間）', options: ['time', 'clock', 'day', 'late'], answer: 'time' },
    { type: 'spell', question: '拼拼看：ni _ ht（夜晚）', answer: 'night', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "What time is it?", lineZh: '幾點了？' },
    { speaker: 'Coco', line: "It is seven o'clock. Time for breakfast!", lineZh: '七點鐘。吃早餐時間！' },
    { speaker: 'Polly', line: "Now it is nine o'clock. Time for school!", lineZh: '現在九點。上學時間！' },
    { speaker: 'Benny', line: "Don't be late! Let's go!", lineZh: '別遲到！走吧！' },
  ],
};

const L5_M9: Mission = {
  id: 9, slug: 'l5-m9-daily-routine', level: 5, title: '日常作息', titleEn: 'Daily Routine', theme: '珊瑚灘・我的一天', themeEmoji: '🌅',
  focus: '日常作息動詞：get up / eat / go to school / sleep',
  story: [
    { image: '🌅', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "I get up at seven. I wash my face.", dialogueZh: '我七點起床。我洗臉。', highlightWords: ['get up', 'wash'], sceneEmojis: ['🌅', '🧼', '✨'], animation: 'wave' },
    { image: '🥞', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "I eat breakfast. Then I go to school.", dialogueZh: '我吃早餐。然後我去學校。', highlightWords: ['eat', 'go to school'], sceneEmojis: ['🥞', '🏫', '😊'], animation: 'bounce' },
    { image: '🌙', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "At night, I brush my teeth and sleep.", dialogueZh: '晚上，我刷牙然後睡覺。', highlightWords: ['brush', 'sleep'], sceneEmojis: ['🪥', '🌙', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "That is my day! What about you?", dialogueZh: '這就是我的一天！你呢？', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🌅'], animation: 'bounce' },
  ],
  words: [
    { en: 'get up', zh: '起床', image: '🛌', phonics: '', kk: '[ɡɛt ʌp]', phonicsSound: '', exampleSentence: 'I get up early.', exampleZh: '我很早起床。' },
    { en: 'wash', zh: '洗', image: '🧼', phonics: '', kk: '[wɑʃ]', phonicsSound: '', exampleSentence: 'I wash my face.', exampleZh: '我洗臉。' },
    { en: 'eat', zh: '吃', image: '🍽️', phonics: '', kk: '[it]', phonicsSound: '', exampleSentence: 'I eat breakfast.', exampleZh: '我吃早餐。' },
    { en: 'brush', zh: '刷（牙）', image: '🪥', phonics: '', kk: '[brʌʃ]', phonicsSound: '', exampleSentence: 'I brush my teeth.', exampleZh: '我刷牙。' },
    { en: 'go to school', zh: '上學', image: '🏫', phonics: '', kk: '[ɡo tu skul]', phonicsSound: '', exampleSentence: 'I go to school.', exampleZh: '我去學校。' },
    { en: 'play', zh: '玩', image: '🎮', phonics: '', kk: '[ple]', phonicsSound: '', exampleSentence: 'I play after school.', exampleZh: '我放學後玩。' },
    { en: 'study', zh: '讀書', image: '📚', phonics: '', kk: '[ˈstʌdi]', phonicsSound: '', exampleSentence: 'I study English.', exampleZh: '我讀英文。' },
    { en: 'sleep', zh: '睡覺', image: '😴', phonics: '', kk: '[slip]', phonicsSound: '', exampleSentence: 'I sleep at night.', exampleZh: '我晚上睡覺。' },
    { en: 'breakfast', zh: '早餐', image: '🥞', phonics: '', kk: '[ˈbrɛkfəst]', phonicsSound: '', exampleSentence: 'I eat breakfast.', exampleZh: '我吃早餐。' },
    { en: 'dinner', zh: '晚餐', image: '🍜', phonics: '', kk: '[ˈdɪnɚ]', phonicsSound: '', exampleSentence: 'I eat dinner.', exampleZh: '我吃晚餐。' },
  ],
  sentences: [
    { en: 'I get up at seven.', zh: '我七點起床。' }, { en: 'I eat breakfast.', zh: '我吃早餐。' }, { en: 'I go to school.', zh: '我去學校。' }, { en: 'What time do you get up?', zh: '你幾點起床？' }, { en: 'I brush my teeth.', zh: '我刷牙。' }, { en: 'I sleep at night.', zh: '我晚上睡覺。' },
  ],
  phonicsLetters: ['daily routine'],
  warmUpQuestions: [
    { type: 'match', question: '🛌 動作是？', options: ['get up', 'eat', 'sleep', 'play'], answer: 'get up' },
    { type: 'match', question: '🪥 動作是？', options: ['brush', 'wash', 'eat', 'study'], answer: 'brush' },
    { type: 'match', question: '😴 動作是？', options: ['sleep', 'get up', 'play', 'wash'], answer: 'sleep' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🛌', '🧼', '🥞', '😴'], answer: '🥞', image: '🎧' },
    { type: 'match', question: '配對：作息配圖', options: ['get up-🛌', 'wash-🧼', 'eat-🍽️', 'sleep-😴'], answer: 'get up-🛌' },
    { type: 'fill-blank', question: '句型代換：I ___ breakfast.（吃）', options: ['eat', 'sleep', 'wash', 'is'], answer: 'eat' },
    { type: 'spell', question: '拼拼看：sl _ ep（睡覺）', answer: 'sleep', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I get up at seven.', 'I eat breakfast.', 'I go to school.', 'I sleep at night.'], answer: 'I get up at seven.', image: '🎧' },
    { type: 'read', question: 'What does Coco do at night?（Coco 晚上做什麼？）', passage: 'Coco gets up at seven.\nShe goes to school.\nAt night, she brushes her teeth and sleeps.', options: ['brushes teeth and sleeps', 'goes to school', 'eats breakfast', 'plays games'], answer: 'brushes teeth and sleeps' },
  ],
  talkTimePrompts: ["What do you do in the morning? I ___.", "Say three things you do every day.", "What time do you get up?", "Change it: I ___ (eat/play/study)."],
  reviewQuiz: [
    { type: 'match', question: '🥞 是什麼？', options: ['breakfast', 'dinner', 'sleep', 'study'], answer: 'breakfast' },
    { type: 'fill-blank', question: 'I ___ to school.（去）', options: ['go', 'eat', 'sleep', 'is'], answer: 'go' },
    { type: 'spell', question: '拼拼看：st _ dy（讀書）', answer: 'study', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I get up at seven. I wash my face.", lineZh: '我七點起床。我洗臉。' },
    { speaker: 'Benny', line: "I eat breakfast. Then I go to school.", lineZh: '我吃早餐。然後去學校。' },
    { speaker: 'Ruby', line: "At night, I brush my teeth and sleep.", lineZh: '晚上，我刷牙然後睡覺。' },
    { speaker: 'Coco', line: "That is my day! What about you?", lineZh: '這是我的一天！你呢？' },
  ],
};

const L5_M10: Mission = {
  id: 10, slug: 'l5-m10-review-weather-time', level: 5, title: 'Review② 天氣時間', titleEn: 'Review: Weather & Time', theme: '珊瑚灘・複習關', themeEmoji: '🔄',
  focus: '螺旋複習②：天氣 ＋ How\'s the weather ＋ 時間 o\'clock ＋ 作息',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review! How's the weather today?", dialogueZh: '來複習！今天天氣如何？', highlightWords: ["How's"], sceneEmojis: ['🔄', '🌦️', '✨'], animation: 'wave' },
    { image: '☀️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "It's sunny! It is nine o'clock. Time for school!", dialogueZh: '晴天！九點鐘。上學時間！', highlightWords: ["It's", "o'clock"], sceneEmojis: ['☀️', '🕘', '😊'], animation: 'bounce' },
    { image: '🌙', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "At night, I sleep. Good night!", dialogueZh: '晚上我睡覺。晚安！', highlightWords: ['sleep'], sceneEmojis: ['🌙', '😴', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "Weather, time, routine — you know them all!", dialogueZh: '天氣、時間、作息 —— 你全會了！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'sunny', zh: '晴朗的', image: '☀️', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: "It's sunny.", exampleZh: '天氣晴朗。' },
    { en: 'rainy', zh: '下雨的', image: '🌧️', phonics: '', kk: '[ˈreni]', phonicsSound: '', exampleSentence: "It's rainy.", exampleZh: '在下雨。' },
    { en: 'weather', zh: '天氣', image: '🌦️', phonics: '', kk: '[ˈwɛðɚ]', phonicsSound: '', exampleSentence: "How's the weather?", exampleZh: '天氣如何？' },
    { en: 'time', zh: '時間', image: '⏰', phonics: '', kk: '[taɪm]', phonicsSound: '', exampleSentence: 'What time is it?', exampleZh: '幾點了？' },
    { en: "o'clock", zh: '…點鐘', image: '🕐', phonics: '', kk: '[əˈklɑk]', phonicsSound: '', exampleSentence: "one o'clock", exampleZh: '一點鐘' },
    { en: 'morning', zh: '早上', image: '🌅', phonics: '', kk: '[ˈmɔrnɪŋ]', phonicsSound: '', exampleSentence: 'in the morning', exampleZh: '在早上' },
    { en: 'night', zh: '夜晚', image: '🌙', phonics: '', kk: '[naɪt]', phonicsSound: '', exampleSentence: 'at night', exampleZh: '在晚上' },
    { en: 'get up', zh: '起床', image: '🛌', phonics: '', kk: '[ɡɛt ʌp]', phonicsSound: '', exampleSentence: 'I get up early.', exampleZh: '我早起。' },
    { en: 'eat', zh: '吃', image: '🍽️', phonics: '', kk: '[it]', phonicsSound: '', exampleSentence: 'I eat breakfast.', exampleZh: '我吃早餐。' },
    { en: 'sleep', zh: '睡覺', image: '😴', phonics: '', kk: '[slip]', phonicsSound: '', exampleSentence: 'I sleep at night.', exampleZh: '我晚上睡覺。' },
  ],
  sentences: [
    { en: "How's the weather? It's sunny.", zh: '天氣如何？晴朗。' }, { en: "What time is it? It is nine o'clock.", zh: '幾點了？九點鐘。' }, { en: 'I get up in the morning.', zh: '我早上起床。' }, { en: 'I sleep at night.', zh: '我晚上睡覺。' }, { en: 'Is it rainy today?', zh: '今天下雨嗎？' }, { en: 'Good morning! Good night!', zh: '早安！晚安！' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'match', question: '☀️ 是什麼天氣？', options: ['sunny', 'rainy', 'windy', 'snowy'], answer: 'sunny' },
    { type: 'fill-blank', question: "___ the weather?（如何）", options: ["How's", "What's", "It's", "Where's"], answer: "How's" },
    { type: 'match', question: '🌅 是什麼時候？', options: ['morning', 'night', 'evening', 'noon'], answer: 'morning' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['☀️', '🌧️', '🕐', '😴'], answer: '🕐', image: '🎧' },
    { type: 'fill-blank', question: "What time is it? It is nine ___.（點鐘）", options: ["o'clock", 'time', 'morning', 'clock'], answer: "o'clock" },
    { type: 'fill-blank', question: 'I ___ up in the morning.（起床）', options: ['get', 'eat', 'sleep', 'go'], answer: 'get' },
    { type: 'spell', question: '拼拼看：s _ nny（晴朗）', answer: 'sunny', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ["How's the weather? It's sunny.", "What time is it?", 'I sleep at night.', 'I get up in the morning.'], answer: "How's the weather? It's sunny.", image: '🎧' },
    { type: 'read', question: 'What time does Coco go to school?（Coco 幾點上學？）', passage: "It's sunny this morning.\nCoco gets up at seven.\nIt is nine o'clock. She goes to school.", options: ["nine o'clock", "seven o'clock", "eight o'clock", "ten o'clock"], answer: "nine o'clock" },
  ],
  talkTimePrompts: ["Ask: How's the weather? / What time is it?", "Tell me your morning routine.", "Say the weather and time now.", "Say good morning and good night."],
  reviewQuiz: [
    { type: 'match', question: '🌧️ 是什麼天氣？', options: ['rainy', 'sunny', 'windy', 'warm'], answer: 'rainy' },
    { type: 'fill-blank', question: 'I ___ at night.（睡覺）', options: ['sleep', 'get up', 'eat', 'go'], answer: 'sleep' },
    { type: 'read', question: 'Is it rainy?（下雨嗎？）', passage: "How's the weather?\nIt's sunny and warm today.\nLet's go to the beach!", options: ['No, it is sunny', 'Yes, it is rainy', 'It is snowy', 'It is night'], answer: 'No, it is sunny' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "How's the weather today?", lineZh: '今天天氣如何？' },
    { speaker: 'Coco', line: "It's sunny! It is nine o'clock. Time for school!", lineZh: '晴天！九點鐘。上學時間！' },
    { speaker: 'Benny', line: "At night, I sleep. Good night!", lineZh: '晚上我睡覺。晚安！' },
    { speaker: 'Finn', line: "Weather, time, routine — great review!", lineZh: '天氣、時間、作息 —— 複習得好！' },
  ],
};

const L5_M11: Mission = {
  id: 11, slug: 'l5-m11-days', level: 5, title: '星期', titleEn: 'Days of the Week', theme: '珊瑚灘・一週七天', themeEmoji: '📅',
  focus: '星期 Monday–Sunday ＋ on Monday',
  story: [
    { image: '📅', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "Monday, Tuesday, Wednesday — school days!", dialogueZh: '星期一、二、三 —— 上學日！', highlightWords: ['Monday', 'Tuesday'], sceneEmojis: ['📅', '🏫', '✨'], animation: 'wave' },
    { image: '🎨', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "On Friday, we have art class!", dialogueZh: '星期五我們有美術課！', highlightWords: ['Friday'], sceneEmojis: ['🎨', '🖌️', '😊'], animation: 'bounce' },
    { image: '🏖️', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "On Saturday and Sunday — weekend fun!", dialogueZh: '星期六和星期日 —— 週末好好玩！', highlightWords: ['Saturday', 'Sunday'], sceneEmojis: ['🏖️', '🎉', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "Seven days in a week! You know them all!", dialogueZh: '一週七天！你全會了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📅'], animation: 'bounce' },
  ],
  words: [
    { en: 'Monday', zh: '星期一', image: '1️⃣', phonics: '', kk: '[ˈmʌnde]', phonicsSound: '', exampleSentence: 'on Monday', exampleZh: '在星期一' },
    { en: 'Tuesday', zh: '星期二', image: '2️⃣', phonics: '', kk: '[ˈtuzde]', phonicsSound: '', exampleSentence: 'on Tuesday', exampleZh: '在星期二' },
    { en: 'Wednesday', zh: '星期三', image: '3️⃣', phonics: '', kk: '[ˈwɛnzde]', phonicsSound: '', exampleSentence: 'on Wednesday', exampleZh: '在星期三' },
    { en: 'Thursday', zh: '星期四', image: '4️⃣', phonics: '', kk: '[ˈθɝzde]', phonicsSound: '', exampleSentence: 'on Thursday', exampleZh: '在星期四' },
    { en: 'Friday', zh: '星期五', image: '5️⃣', phonics: '', kk: '[ˈfraɪde]', phonicsSound: '', exampleSentence: 'on Friday', exampleZh: '在星期五' },
    { en: 'Saturday', zh: '星期六', image: '6️⃣', phonics: '', kk: '[ˈsætɚde]', phonicsSound: '', exampleSentence: 'on Saturday', exampleZh: '在星期六' },
    { en: 'Sunday', zh: '星期日', image: '7️⃣', phonics: '', kk: '[ˈsʌnde]', phonicsSound: '', exampleSentence: 'on Sunday', exampleZh: '在星期日' },
    { en: 'week', zh: '星期·週', image: '📅', phonics: '', kk: '[wik]', phonicsSound: '', exampleSentence: 'a week', exampleZh: '一週' },
    { en: 'weekend', zh: '週末', image: '🏖️', phonics: '', kk: '[ˈwikˌɛnd]', phonicsSound: '', exampleSentence: 'on the weekend', exampleZh: '在週末' },
    { en: 'today', zh: '今天', image: '📆', phonics: '', kk: '[təˈde]', phonicsSound: '', exampleSentence: 'What day is today?', exampleZh: '今天星期幾？' },
  ],
  sentences: [
    { en: 'Today is Monday.', zh: '今天是星期一。' }, { en: 'On Friday, we have art.', zh: '星期五我們有美術。' }, { en: 'What day is today?', zh: '今天星期幾？' }, { en: 'It is Sunday.', zh: '今天是星期日。' }, { en: 'I play on the weekend.', zh: '我週末玩。' }, { en: 'There are seven days in a week.', zh: '一週有七天。' },
  ],
  phonicsLetters: ['days of week'],
  warmUpQuestions: [
    { type: 'match', question: '一週的第一個上學日通常是？', options: ['Monday', 'Sunday', 'Friday', 'Saturday'], answer: 'Monday' },
    { type: 'match', question: '週末的兩天是？', options: ['Saturday & Sunday', 'Monday & Tuesday', 'Friday & Monday', 'Wednesday & Thursday'], answer: 'Saturday & Sunday' },
    { type: 'fill-blank', question: 'What ___ is today?（星期幾）', options: ['day', 'time', 'week', 'month'], answer: 'day' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選字：點你聽到的星期', options: ['Monday', 'Friday', 'Sunday', 'Wednesday'], answer: 'Friday', image: '🎧' },
    { type: 'match', question: 'Monday 是？', options: ['星期一', '星期二', '星期日', '星期五'], answer: '星期一' },
    { type: 'fill-blank', question: 'We have art ___ Friday.（在）', options: ['on', 'in', 'at', 'to'], answer: 'on' },
    { type: 'spell', question: '拼拼看：Sund _ y（星期日）', answer: 'Sunday', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Today is Monday.', 'Today is Sunday.', 'On Friday, we have art.', 'What day is today?'], answer: 'Today is Monday.', image: '🎧' },
    { type: 'read', question: 'When is art class?（美術課是哪天？）', passage: 'Coco goes to school on Monday.\nOn Friday, she has art class.\nOn Saturday, she plays at the beach.', options: ['Friday', 'Monday', 'Saturday', 'Sunday'], answer: 'Friday' },
  ],
  talkTimePrompts: ["What day is today?", "Say the seven days!", "What do you do on the weekend?", "Change it: On ___, I ___."],
  reviewQuiz: [
    { type: 'match', question: 'Saturday 是？', options: ['星期六', '星期日', '星期一', '星期五'], answer: '星期六' },
    { type: 'fill-blank', question: 'I play ___ Sunday.（在）', options: ['on', 'in', 'at', 'to'], answer: 'on' },
    { type: 'spell', question: '拼拼看：Mond _ y（星期一）', answer: 'Monday', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Ruby', line: "Monday, Tuesday, Wednesday — school days!", lineZh: '一、二、三 —— 上學日！' },
    { speaker: 'Coco', line: "On Friday, we have art class!", lineZh: '星期五有美術課！' },
    { speaker: 'Benny', line: "Saturday and Sunday — weekend fun!", lineZh: '週六週日 —— 週末好玩！' },
    { speaker: 'Ruby', line: "Seven days in a week! Great!", lineZh: '一週七天！太棒了！' },
  ],
};

const L5_M12: Mission = {
  id: 12, slug: 'l5-m12-months', level: 5, title: '月份 / 季節', titleEn: 'Months & Seasons', theme: '珊瑚灘・一年四季', themeEmoji: '🗓️',
  focus: '月份 ＋ 季節 ＋ When is your birthday? — In May.',
  story: [
    { image: '🗓️', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "A year has twelve months! January to December.", dialogueZh: '一年有十二個月！一月到十二月。', highlightWords: ['months'], sceneEmojis: ['🗓️', '📆', '✨'], animation: 'wave' },
    { image: '🌸', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "In spring, flowers bloom in April!", dialogueZh: '春天，四月花開！', highlightWords: ['spring', 'April'], sceneEmojis: ['🌸', '🌷', '😊'], animation: 'bounce' },
    { image: '🎂', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "When is your birthday? Mine is in May!", dialogueZh: '你的生日在哪個月？我的在五月！', highlightWords: ['birthday', 'May'], sceneEmojis: ['🎂', '🎉', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Twelve months, four seasons! Amazing!", dialogueZh: '十二個月，四季！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🗓️'], animation: 'bounce' },
  ],
  words: [
    { en: 'month', zh: '月份', image: '🗓️', phonics: '', kk: '[mʌnθ]', phonicsSound: '', exampleSentence: 'a new month', exampleZh: '新的一個月' },
    { en: 'year', zh: '年', image: '📆', phonics: '', kk: '[jɪr]', phonicsSound: '', exampleSentence: 'a new year', exampleZh: '新的一年' },
    { en: 'January', zh: '一月', image: '❄️', phonics: '', kk: '[ˈdʒænjuˌɛri]', phonicsSound: '', exampleSentence: 'in January', exampleZh: '在一月' },
    { en: 'April', zh: '四月', image: '🌸', phonics: '', kk: '[ˈeprəl]', phonicsSound: '', exampleSentence: 'in April', exampleZh: '在四月' },
    { en: 'May', zh: '五月', image: '🌺', phonics: '', kk: '[me]', phonicsSound: '', exampleSentence: 'in May', exampleZh: '在五月' },
    { en: 'July', zh: '七月', image: '🌞', phonics: '', kk: '[dʒuˈlaɪ]', phonicsSound: '', exampleSentence: 'in July', exampleZh: '在七月' },
    { en: 'October', zh: '十月', image: '🎃', phonics: '', kk: '[ɑkˈtobɚ]', phonicsSound: '', exampleSentence: 'in October', exampleZh: '在十月' },
    { en: 'December', zh: '十二月', image: '🎄', phonics: '', kk: '[dɪˈsɛmbɚ]', phonicsSound: '', exampleSentence: 'in December', exampleZh: '在十二月' },
    { en: 'birthday', zh: '生日', image: '🎂', phonics: '', kk: '[ˈbɝθˌde]', phonicsSound: '', exampleSentence: 'When is your birthday?', exampleZh: '你生日哪天？' },
    { en: 'season', zh: '季節', image: '🍁', phonics: '', kk: '[ˈsizn̩]', phonicsSound: '', exampleSentence: 'four seasons', exampleZh: '四個季節' },
  ],
  sentences: [
    { en: 'A year has twelve months.', zh: '一年有十二個月。' }, { en: 'My birthday is in May.', zh: '我的生日在五月。' }, { en: 'When is your birthday?', zh: '你的生日在哪個月？' }, { en: 'It is in July.', zh: '在七月。' }, { en: 'Spring is my favorite season.', zh: '春天是我最愛的季節。' }, { en: 'It is cold in January.', zh: '一月很冷。' },
  ],
  phonicsLetters: ['months'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'A year has twelve ___.（月份）', options: ['months', 'days', 'weeks', 'years'], answer: 'months' },
    { type: 'match', question: '🎂 是什麼？', options: ['birthday', 'season', 'month', 'year'], answer: 'birthday' },
    { type: 'match', question: '🎄 December 是幾月？', options: ['十二月', '一月', '十月', '五月'], answer: '十二月' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的月份', options: ['❄️', '🌸', '🌞', '🎄'], answer: '🎄', image: '🎧' },
    { type: 'match', question: 'May 是幾月？', options: ['五月', '三月', '七月', '四月'], answer: '五月' },
    { type: 'fill-blank', question: 'My birthday is ___ May.（在·月份用 in）', options: ['in', 'on', 'at', 'to'], answer: 'in' },
    { type: 'spell', question: '拼拼看：mon _ h（月份）', answer: 'month', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['My birthday is in May.', 'When is your birthday?', 'A year has twelve months.', 'It is in July.'], answer: 'My birthday is in May.', image: '🎧' },
    { type: 'read', question: "When is Ruby's birthday?（Ruby 生日哪個月？）", passage: "A year has twelve months.\nRuby's birthday is in May.\nIt is in spring!", options: ['May', 'July', 'January', 'December'], answer: 'May' },
  ],
  talkTimePrompts: ["When is your birthday? It is in ___.", "Say four months you know.", "What is your favorite season?", "Change it: My birthday is in ___."],
  reviewQuiz: [
    { type: 'match', question: 'January 是幾月？', options: ['一月', '四月', '七月', '十月'], answer: '一月' },
    { type: 'fill-blank', question: 'My birthday is ___ July.（在）', options: ['in', 'on', 'at', 'to'], answer: 'in' },
    { type: 'match', question: '🍁 season 是什麼意思？', options: ['季節', '月份', '星期', '年'], answer: '季節' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A year has twelve months!", lineZh: '一年有十二個月！' },
    { speaker: 'Coco', line: "In spring, flowers bloom in April!", lineZh: '春天，四月花開！' },
    { speaker: 'Ruby', line: "When is your birthday? Mine is in May!", lineZh: '你生日哪個月？我的在五月！' },
    { speaker: 'Benny', line: "Twelve months, four seasons! Cool!", lineZh: '十二個月，四季！酷！' },
  ],
};

const L5_M13: Mission = {
  id: 13, slug: 'l5-m13-story-1', level: 5, title: '短篇故事① 海邊', titleEn: 'Story: The Beach', theme: '珊瑚灘・故事時間', themeEmoji: '📖',
  focus: '短篇閱讀①：讀一個海邊的小故事並回答問題',
  story: [
    { image: '📖', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Let's read a story: A Day at the Beach!", dialogueZh: '我們來讀故事：海邊的一天！', highlightWords: ['story'], sceneEmojis: ['📖', '🏖️', '✨'], animation: 'wave' },
    { image: '🌞', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "It is a sunny day. Finn goes to the beach.", dialogueZh: '晴朗的一天。Finn 去海邊。', highlightWords: ['sunny', 'beach'], sceneEmojis: ['🌞', '🏖️', '😊'], animation: 'bounce' },
    { image: '🐚', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "He finds a big shell. He is very happy!", dialogueZh: '他找到一個大貝殼。他好開心！', highlightWords: ['shell', 'happy'], sceneEmojis: ['🐚', '😄', '🎉'], animation: 'float' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "You read the whole story! Great reader!", dialogueZh: '你讀完整個故事了！了不起！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'beach', zh: '海邊', image: '🏖️', phonics: '', kk: '[bitʃ]', phonicsSound: '', exampleSentence: 'go to the beach', exampleZh: '去海邊' },
    { en: 'sunny', zh: '晴朗的', image: '🌞', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: 'a sunny day', exampleZh: '晴朗的一天' },
    { en: 'sand', zh: '沙子', image: '🏖️', phonics: '', kk: '[sænd]', phonicsSound: '', exampleSentence: 'warm sand', exampleZh: '溫暖的沙' },
    { en: 'shell', zh: '貝殼', image: '🐚', phonics: '', kk: '[ʃɛl]', phonicsSound: '', exampleSentence: 'a big shell', exampleZh: '一個大貝殼' },
    { en: 'wave', zh: '海浪', image: '🌊', phonics: '', kk: '[wev]', phonicsSound: '', exampleSentence: 'big waves', exampleZh: '大浪' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'He can swim.', exampleZh: '他會游泳。' },
    { en: 'find', zh: '找到', image: '🔍', phonics: '', kk: '[faɪnd]', phonicsSound: '', exampleSentence: 'He finds a shell.', exampleZh: '他找到貝殼。' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'He is happy.', exampleZh: '他很開心。' },
    { en: 'day', zh: '一天', image: '📆', phonics: '', kk: '[de]', phonicsSound: '', exampleSentence: 'a fun day', exampleZh: '好玩的一天' },
    { en: 'friend', zh: '朋友', image: '🧑‍🤝‍🧑', phonics: '', kk: '[frɛnd]', phonicsSound: '', exampleSentence: 'with his friends', exampleZh: '和他的朋友' },
  ],
  sentences: [
    { en: 'It is a sunny day.', zh: '晴朗的一天。' }, { en: 'Finn goes to the beach.', zh: 'Finn 去海邊。' }, { en: 'He finds a big shell.', zh: '他找到一個大貝殼。' }, { en: 'He can swim in the sea.', zh: '他會在海裡游泳。' }, { en: 'The waves are big.', zh: '浪很大。' }, { en: 'Finn is very happy.', zh: 'Finn 很開心。' },
  ],
  phonicsLetters: ['story reading'],
  warmUpQuestions: [
    { type: 'match', question: '🏖️ 是什麼？', options: ['beach', 'shell', 'wave', 'sand'], answer: 'beach' },
    { type: 'match', question: '🐚 是什麼？', options: ['shell', 'sand', 'wave', 'fish'], answer: 'shell' },
    { type: 'fill-blank', question: 'It is a ___ day.（晴朗）', options: ['sunny', 'rainy', 'cold', 'snowy'], answer: 'sunny' },
  ],
  challenges: [
    { type: 'read', question: 'Where does Finn go?（Finn 去哪？）', passage: 'It is a sunny day.\nFinn goes to the beach.\nThe sand is warm.', options: ['the beach', 'the school', 'the zoo', 'the shop'], answer: 'the beach' },
    { type: 'read', question: 'What does Finn find?（Finn 找到什麼？）', passage: 'Finn walks on the sand.\nHe finds a big shell.\nHe is very happy!', options: ['a big shell', 'a fish', 'a crab', 'a ball'], answer: 'a big shell' },
    { type: 'read', question: 'How does Finn feel?（Finn 覺得如何？）', passage: 'Finn can swim in the sea.\nThe waves are big and fun.\nFinn is very happy!', options: ['happy', 'sad', 'tired', 'cold'], answer: 'happy' },
    { type: 'fill-blank', question: 'He ___ a big shell.（找到·第三人稱）', options: ['finds', 'find', 'found', 'finding'], answer: 'finds' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['He finds a big shell.', 'He swims in the sea.', 'It is a sunny day.', 'The waves are big.'], answer: 'He finds a big shell.', image: '🎧' },
    { type: 'spell', question: '拼拼看：sh _ ll（貝殼）', answer: 'shell', image: '✍️' },
  ],
  talkTimePrompts: ["Retell the story about Finn.", "What does Finn find at the beach?", "What can you do at the beach?", "Make your own: I go to the ___."],
  reviewQuiz: [
    { type: 'read', question: 'Is it rainy in the story?（故事裡下雨嗎？）', passage: 'It is a sunny day.\nFinn plays at the beach.\nThe sun is warm.', options: ['No, it is sunny', 'Yes, it is rainy', 'It is snowy', 'It is night'], answer: 'No, it is sunny' },
    { type: 'match', question: '🌊 是什麼？', options: ['wave', 'sand', 'shell', 'beach'], answer: 'wave' },
    { type: 'fill-blank', question: 'Finn is very ___.（開心）', options: ['happy', 'sad', 'cold', 'tired'], answer: 'happy' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A story: A Day at the Beach!", lineZh: '故事：海邊的一天！' },
    { speaker: 'Finn', line: "It is sunny! I go to the beach.", lineZh: '晴天！我去海邊。' },
    { speaker: 'Coco', line: "Look! Finn finds a big shell!", lineZh: '看！Finn 找到一個大貝殼！' },
    { speaker: 'Finn', line: "I can swim! I am so happy!", lineZh: '我會游泳！我好開心！' },
  ],
};

const L5_M14: Mission = {
  id: 14, slug: 'l5-m14-story-2', level: 5, title: '短篇故事② 小烏龜', titleEn: 'Story: Little Turtle', theme: '珊瑚灘・故事時間', themeEmoji: '🐢',
  focus: '短篇閱讀②：讀一個小烏龜的故事並回答問題',
  story: [
    { image: '🐢', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "A new story: The Little Turtle!", dialogueZh: '新故事：小烏龜！', highlightWords: ['story'], sceneEmojis: ['🐢', '📖', '✨'], animation: 'wave' },
    { image: '🐢', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "A little turtle is slow. But he never gives up!", dialogueZh: '小烏龜很慢。但他從不放棄！', highlightWords: ['slow'], sceneEmojis: ['🐢', '💪', '😊'], animation: 'bounce' },
    { image: '🏁', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "He walks and walks. He wins the race!", dialogueZh: '他一直走一直走。他贏了比賽！', highlightWords: ['wins'], sceneEmojis: ['🏁', '🏆', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Slow and steady wins! Great story!", dialogueZh: '慢而穩者勝！好故事！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🐢'], animation: 'bounce' },
  ],
  words: [
    { en: 'turtle', zh: '烏龜', image: '🐢', phonics: '', kk: '[ˈtɝtl̩]', phonicsSound: '', exampleSentence: 'a little turtle', exampleZh: '一隻小烏龜' },
    { en: 'slow', zh: '慢的', image: '🐌', phonics: '', kk: '[slo]', phonicsSound: '', exampleSentence: 'He is slow.', exampleZh: '他很慢。' },
    { en: 'walk', zh: '走', image: '🚶', phonics: '', kk: '[wɔk]', phonicsSound: '', exampleSentence: 'He walks slowly.', exampleZh: '他慢慢走。' },
    { en: 'race', zh: '比賽', image: '🏁', phonics: '', kk: '[res]', phonicsSound: '', exampleSentence: 'a big race', exampleZh: '一場大比賽' },
    { en: 'win', zh: '贏', image: '🏆', phonics: '', kk: '[wɪn]', phonicsSound: '', exampleSentence: 'He wins!', exampleZh: '他贏了！' },
    { en: 'fast', zh: '快的', image: '💨', phonics: '', kk: '[fæst]', phonicsSound: '', exampleSentence: 'The rabbit is fast.', exampleZh: '兔子很快。' },
    { en: 'rabbit', zh: '兔子', image: '🐰', phonics: '', kk: '[ˈræbɪt]', phonicsSound: '', exampleSentence: 'a fast rabbit', exampleZh: '一隻快兔子' },
    { en: 'sleep', zh: '睡覺', image: '😴', phonics: '', kk: '[slip]', phonicsSound: '', exampleSentence: 'The rabbit sleeps.', exampleZh: '兔子睡著了。' },
    { en: 'try', zh: '嘗試', image: '💪', phonics: '', kk: '[traɪ]', phonicsSound: '', exampleSentence: 'He tries hard.', exampleZh: '他努力嘗試。' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'He is happy.', exampleZh: '他很開心。' },
  ],
  sentences: [
    { en: 'The turtle is slow.', zh: '烏龜很慢。' }, { en: 'The rabbit is fast.', zh: '兔子很快。' }, { en: 'The turtle never gives up.', zh: '烏龜從不放棄。' }, { en: 'The rabbit sleeps.', zh: '兔子睡著了。' }, { en: 'The turtle wins the race!', zh: '烏龜贏了比賽！' }, { en: 'Slow and steady wins.', zh: '慢而穩者勝。' },
  ],
  phonicsLetters: ['story reading'],
  warmUpQuestions: [
    { type: 'match', question: '🐢 turtle 是什麼？', options: ['烏龜', '兔子', '魚', '螃蟹'], answer: '烏龜' },
    { type: 'fill-blank', question: 'The turtle is ___.（慢）', options: ['slow', 'fast', 'big', 'hot'], answer: 'slow' },
    { type: 'fill-blank', question: 'The rabbit is ___.（快）', options: ['fast', 'slow', 'small', 'cold'], answer: 'fast' },
  ],
  challenges: [
    { type: 'read', question: 'Who is slow?（誰很慢？）', passage: 'The little turtle is slow.\nThe rabbit is fast.\nThey have a race.', options: ['the turtle', 'the rabbit', 'the fish', 'the crab'], answer: 'the turtle' },
    { type: 'read', question: 'What does the rabbit do?（兔子做什麼？）', passage: 'The rabbit runs very fast.\nThen the rabbit sleeps.\nThe turtle walks and walks.', options: ['sleeps', 'wins', 'swims', 'reads'], answer: 'sleeps' },
    { type: 'read', question: 'Who wins the race?（誰贏了比賽？）', passage: 'The rabbit sleeps.\nThe turtle never gives up.\nThe turtle wins the race!', options: ['the turtle', 'the rabbit', 'no one', 'both'], answer: 'the turtle' },
    { type: 'fill-blank', question: 'The turtle ___ the race.（贏·第三人稱）', options: ['wins', 'win', 'won', 'winning'], answer: 'wins' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The turtle wins the race!', 'The rabbit is fast.', 'The rabbit sleeps.', 'The turtle is slow.'], answer: 'The turtle wins the race!', image: '🎧' },
    { type: 'spell', question: '拼拼看：t _ rtle（烏龜）', answer: 'turtle', image: '✍️' },
  ],
  talkTimePrompts: ["Retell the turtle story.", "Who is fast? Who is slow?", "Who wins the race?", "What can we learn? Never give up!"],
  reviewQuiz: [
    { type: 'read', question: 'Is the rabbit slow?（兔子慢嗎？）', passage: 'The rabbit is very fast.\nThe turtle is slow.\nBut the turtle wins!', options: ['No, it is fast', 'Yes, it is slow', 'It is big', 'It is cold'], answer: 'No, it is fast' },
    { type: 'match', question: 'win 是什麼意思？', options: ['贏', '輸', '跑', '睡'], answer: '贏' },
    { type: 'fill-blank', question: 'The turtle never ___ up.（放棄）', options: ['gives', 'give', 'gave', 'giving'], answer: 'gives' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A story: The Little Turtle!", lineZh: '故事：小烏龜！' },
    { speaker: 'Polly', line: "The turtle is slow, but he never gives up!", lineZh: '烏龜很慢，但他從不放棄！' },
    { speaker: 'Coco', line: "The rabbit sleeps. The turtle walks and walks!", lineZh: '兔子睡著了。烏龜一直走！' },
    { speaker: 'Benny', line: "The turtle wins! Slow and steady wins!", lineZh: '烏龜贏了！慢而穩者勝！' },
  ],
};

const L5_M15: Mission = {
  id: 15, slug: 'l5-m15-review-reading', level: 5, title: 'Review③ 閱讀理解', titleEn: 'Review: Reading', theme: '珊瑚灘・複習關', themeEmoji: '🔄',
  focus: '螺旋複習③：閱讀理解 ＋ 形容詞 ＋ 天氣時間 ＋ 星期月份',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'read', characterName: 'Finn', dialogue: "Let's review reading! Read and answer!", dialogueZh: '來複習閱讀！讀完回答！', highlightWords: [], sceneEmojis: ['🔄', '📖', '✨'], animation: 'wave' },
    { image: '🏖️', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "On Sunday, it is sunny. We go to the beach!", dialogueZh: '星期日，晴天。我們去海邊！', highlightWords: ['Sunday', 'sunny'], sceneEmojis: ['🏖️', '☀️', '😊'], animation: 'bounce' },
    { image: '🐢', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "We see a slow turtle and a fast fish!", dialogueZh: '我們看到慢烏龜和快魚！', highlightWords: ['slow', 'fast'], sceneEmojis: ['🐢', '🐟', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You are a great reader now! Amazing!", dialogueZh: '你現在是很棒的讀者了！太厲害！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'beach', zh: '海邊', image: '🏖️', phonics: '', kk: '[bitʃ]', phonicsSound: '', exampleSentence: 'go to the beach', exampleZh: '去海邊' },
    { en: 'sunny', zh: '晴朗的', image: '☀️', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: "It's sunny.", exampleZh: '天氣晴朗。' },
    { en: 'Sunday', zh: '星期日', image: '7️⃣', phonics: '', kk: '[ˈsʌnde]', phonicsSound: '', exampleSentence: 'on Sunday', exampleZh: '在星期日' },
    { en: 'turtle', zh: '烏龜', image: '🐢', phonics: '', kk: '[ˈtɝtl̩]', phonicsSound: '', exampleSentence: 'a slow turtle', exampleZh: '一隻慢烏龜' },
    { en: 'fish', zh: '魚', image: '🐟', phonics: '', kk: '[fɪʃ]', phonicsSound: '', exampleSentence: 'a fast fish', exampleZh: '一隻快魚' },
    { en: 'slow', zh: '慢的', image: '🐌', phonics: '', kk: '[slo]', phonicsSound: '', exampleSentence: 'It is slow.', exampleZh: '它很慢。' },
    { en: 'fast', zh: '快的', image: '💨', phonics: '', kk: '[fæst]', phonicsSound: '', exampleSentence: 'It is fast.', exampleZh: '它很快。' },
    { en: 'shell', zh: '貝殼', image: '🐚', phonics: '', kk: '[ʃɛl]', phonicsSound: '', exampleSentence: 'a big shell', exampleZh: '一個大貝殼' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'We are happy.', exampleZh: '我們很開心。' },
    { en: 'weekend', zh: '週末', image: '🎉', phonics: '', kk: '[ˈwikˌɛnd]', phonicsSound: '', exampleSentence: 'on the weekend', exampleZh: '在週末' },
  ],
  sentences: [
    { en: 'On Sunday, it is sunny.', zh: '星期日，天氣晴朗。' }, { en: 'We go to the beach.', zh: '我們去海邊。' }, { en: 'The turtle is slow.', zh: '烏龜很慢。' }, { en: 'The fish is fast.', zh: '魚很快。' }, { en: 'We find a big shell.', zh: '我們找到一個大貝殼。' }, { en: 'We are happy.', zh: '我們很開心。' },
  ],
  phonicsLetters: ['review reading'],
  warmUpQuestions: [
    { type: 'match', question: '🐢 turtle 是快還是慢？', options: ['慢', '快', '大', '小'], answer: '慢' },
    { type: 'fill-blank', question: 'On Sunday, it is ___.（晴朗）', options: ['sunny', 'rainy', 'cold', 'windy'], answer: 'sunny' },
    { type: 'match', question: '🐚 是什麼？', options: ['shell', 'fish', 'sand', 'wave'], answer: 'shell' },
  ],
  challenges: [
    { type: 'read', question: 'Where do they go on Sunday?（星期日他們去哪？）', passage: 'On Sunday, it is sunny and warm.\nWe go to the beach.\nWe play in the sand.', options: ['the beach', 'the school', 'the zoo', 'home'], answer: 'the beach' },
    { type: 'read', question: 'Which one is fast?（哪個快？）', passage: 'At the beach, we see a turtle and a fish.\nThe turtle is slow.\nThe fish is fast.', options: ['the fish', 'the turtle', 'the shell', 'the crab'], answer: 'the fish' },
    { type: 'read', question: 'How do they feel?（他們覺得如何？）', passage: 'We find a big shell.\nWe swim in the sea.\nWe are very happy!', options: ['happy', 'sad', 'tired', 'cold'], answer: 'happy' },
    { type: 'fill-blank', question: 'The fish is ___ than the turtle.（快）', options: ['faster', 'fast', 'slow', 'slower'], answer: 'faster' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['On Sunday, it is sunny.', 'We go to the beach.', 'The turtle is slow.', 'We are happy.'], answer: 'On Sunday, it is sunny.', image: '🎧' },
    { type: 'spell', question: '拼拼看：be _ ch（海邊）', answer: 'beach', image: '✍️' },
  ],
  talkTimePrompts: ["Tell a short story about the beach.", "Describe the weather and the day.", "Compare the turtle and the fish.", "What did you find? I found a ___."],
  reviewQuiz: [
    { type: 'read', question: 'Is the turtle fast?（烏龜快嗎？）', passage: 'The turtle is slow.\nThe fish is fast.\nThe fish is faster than the turtle.', options: ['No, it is slow', 'Yes, it is fast', 'It is big', 'It is hot'], answer: 'No, it is slow' },
    { type: 'fill-blank', question: 'We go to the beach ___ Sunday.（在）', options: ['on', 'in', 'at', 'to'], answer: 'on' },
    { type: 'match', question: '💨 fast 是什麼意思？', options: ['快', '慢', '大', '冷'], answer: '快' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's review reading! Read and answer!", lineZh: '來複習閱讀！讀完回答！' },
    { speaker: 'Coco', line: "On Sunday, it is sunny. We go to the beach!", lineZh: '星期日晴天。我們去海邊！' },
    { speaker: 'Benny', line: "We see a slow turtle and a fast fish!", lineZh: '我們看到慢烏龜和快魚！' },
    { speaker: 'Finn', line: "You are a great reader! Amazing!", lineZh: '你是很棒的讀者！太厲害！' },
  ],
};

const L5_M16: Mission = {
  id: 16, slug: 'l5-m16-present-continuous', level: 5, title: '現在進行式', titleEn: 'be + V-ing', theme: '珊瑚灘・正在做', themeEmoji: '🏃',
  focus: '現在進行式入門 be ＋ V-ing：I am reading.',
  story: [
    { image: '🏃', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "I am swimming! Look at me!", dialogueZh: '我正在游泳！看我！', highlightWords: ['am', 'swimming'], sceneEmojis: ['🏊', '🌊', '✨'], animation: 'wave' },
    { image: '📖', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "I am reading a book. It is fun!", dialogueZh: '我正在讀書。很好玩！', highlightWords: ['am', 'reading'], sceneEmojis: ['📖', '🐻', '😊'], animation: 'bounce' },
    { image: '🎨', character: '🐰', characterKey: 'ruby', characterAction: 'write', characterName: 'Ruby', dialogue: "Ruby is drawing. Finn is running!", dialogueZh: 'Ruby 正在畫畫。Finn 正在跑！', highlightWords: ['is', 'drawing', 'running'], sceneEmojis: ['🎨', '🏃', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Add -ing for now! I am playing!", dialogueZh: '正在做加 -ing！我正在玩！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🏃'], animation: 'bounce' },
  ],
  words: [
    { en: 'swimming', zh: '正在游泳', image: '🏊', phonics: '', kk: '[ˈswɪmɪŋ]', phonicsSound: '', exampleSentence: 'I am swimming.', exampleZh: '我正在游泳。' },
    { en: 'reading', zh: '正在讀', image: '📖', phonics: '', kk: '[ˈridɪŋ]', phonicsSound: '', exampleSentence: 'I am reading.', exampleZh: '我正在讀書。' },
    { en: 'running', zh: '正在跑', image: '🏃', phonics: '', kk: '[ˈrʌnɪŋ]', phonicsSound: '', exampleSentence: 'He is running.', exampleZh: '他正在跑。' },
    { en: 'eating', zh: '正在吃', image: '🍽️', phonics: '', kk: '[ˈitɪŋ]', phonicsSound: '', exampleSentence: 'She is eating.', exampleZh: '她正在吃。' },
    { en: 'playing', zh: '正在玩', image: '🎮', phonics: '', kk: '[ˈpleɪŋ]', phonicsSound: '', exampleSentence: 'I am playing.', exampleZh: '我正在玩。' },
    { en: 'drawing', zh: '正在畫', image: '🎨', phonics: '', kk: '[ˈdrɔɪŋ]', phonicsSound: '', exampleSentence: 'She is drawing.', exampleZh: '她正在畫畫。' },
    { en: 'singing', zh: '正在唱', image: '🎤', phonics: '', kk: '[ˈsɪŋɪŋ]', phonicsSound: '', exampleSentence: 'He is singing.', exampleZh: '他正在唱歌。' },
    { en: 'sleeping', zh: '正在睡', image: '😴', phonics: '', kk: '[ˈslipɪŋ]', phonicsSound: '', exampleSentence: 'The cat is sleeping.', exampleZh: '貓正在睡。' },
    { en: 'writing', zh: '正在寫', image: '✏️', phonics: '', kk: '[ˈraɪtɪŋ]', phonicsSound: '', exampleSentence: 'I am writing.', exampleZh: '我正在寫。' },
    { en: 'jumping', zh: '正在跳', image: '🤸', phonics: '', kk: '[ˈdʒʌmpɪŋ]', phonicsSound: '', exampleSentence: 'They are jumping.', exampleZh: '他們正在跳。' },
  ],
  sentences: [
    { en: 'I am swimming.', zh: '我正在游泳。' }, { en: 'He is reading a book.', zh: '他正在讀書。' }, { en: 'She is drawing.', zh: '她正在畫畫。' }, { en: 'They are playing.', zh: '他們正在玩。' }, { en: 'Is he running?', zh: '他正在跑嗎？' }, { en: 'Yes, he is running.', zh: '是的，他正在跑。' },
  ],
  phonicsLetters: ['be + V-ing'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ swimming.（be動詞）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'fill-blank', question: 'He is ___.（讀·進行式）', options: ['reading', 'read', 'reads', 'to read'], answer: 'reading' },
    { type: 'match', question: '🏊 正在做什麼？', options: ['swimming', 'running', 'eating', 'reading'], answer: 'swimming' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🏊', '🏃', '🍽️', '🎨'], answer: '🎨', image: '🎧' },
    { type: 'match', question: '配對：進行式配圖', options: ['swimming-🏊', 'running-🏃', 'reading-📖', 'drawing-🎨'], answer: 'swimming-🏊' },
    { type: 'fill-blank', question: '句型代換：She is ___.（唱歌·進行式）', options: ['singing', 'sing', 'sings', 'to sing'], answer: 'singing' },
    { type: 'fill-blank', question: 'They ___ playing.（be動詞·複數）', options: ['are', 'am', 'is', 'be'], answer: 'are' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I am swimming.', 'He is reading a book.', 'She is drawing.', 'They are playing.'], answer: 'I am swimming.', image: '🎧' },
    { type: 'read', question: 'What is Benny doing?（Benny 正在做什麼？）', passage: 'Coco is swimming in the sea.\nBenny is reading a book.\nRuby is drawing a picture.', options: ['reading a book', 'swimming', 'drawing', 'running'], answer: 'reading a book' },
  ],
  talkTimePrompts: ["Say what you are doing: I am ___ing.", "Act it out and say: I am jumping!", "Ask a friend: what are they doing?", "Change it: I am ___ing (reading/playing/singing)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'The cat is ___.（睡·進行式）', options: ['sleeping', 'sleep', 'sleeps', 'to sleep'], answer: 'sleeping' },
    { type: 'fill-blank', question: 'I ___ playing.（be動詞）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'match', question: '🎤 正在做什麼？', options: ['singing', 'drawing', 'eating', 'running'], answer: 'singing' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I am swimming! Look at me!", lineZh: '我正在游泳！看我！' },
    { speaker: 'Benny', line: "I am reading a book. It is fun!", lineZh: '我正在讀書。很好玩！' },
    { speaker: 'Ruby', line: "Ruby is drawing. Finn is running!", lineZh: 'Ruby 正在畫畫。Finn 正在跑！' },
    { speaker: 'Coco', line: "Add -ing for now! I am playing!", lineZh: '正在做加 -ing！我正在玩！' },
  ],
};

const L5_M17: Mission = {
  id: 17, slug: 'l5-m17-what-doing', level: 5, title: 'What are you doing?', titleEn: 'What are you doing?', theme: '珊瑚灘・你在做什麼', themeEmoji: '❓',
  focus: '疑問 What are you doing? — I am + V-ing.',
  story: [
    { image: '❓', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "What are you doing? I am singing!", dialogueZh: '你在做什麼？我正在唱歌！', highlightWords: ['doing', 'singing'], sceneEmojis: ['❓', '🎤', '✨'], animation: 'wave' },
    { image: '🏊', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "What is he doing? He is swimming!", dialogueZh: '他在做什麼？他正在游泳！', highlightWords: ['doing', 'swimming'], sceneEmojis: ['🏊', '🌊', '😊'], animation: 'bounce' },
    { image: '🍽️', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "What are they doing? They are eating!", dialogueZh: '他們在做什麼？他們正在吃！', highlightWords: ['doing', 'eating'], sceneEmojis: ['🍽️', '😋', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Now you can ask what someone is doing!", dialogueZh: '現在你會問別人在做什麼了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '❓'], animation: 'bounce' },
  ],
  words: [
    { en: 'doing', zh: '正在做', image: '❓', phonics: '', kk: '[ˈduɪŋ]', phonicsSound: '', exampleSentence: 'What are you doing?', exampleZh: '你在做什麼？' },
    { en: 'singing', zh: '正在唱', image: '🎤', phonics: '', kk: '[ˈsɪŋɪŋ]', phonicsSound: '', exampleSentence: 'I am singing.', exampleZh: '我正在唱。' },
    { en: 'swimming', zh: '正在游泳', image: '🏊', phonics: '', kk: '[ˈswɪmɪŋ]', phonicsSound: '', exampleSentence: 'He is swimming.', exampleZh: '他正在游泳。' },
    { en: 'eating', zh: '正在吃', image: '🍽️', phonics: '', kk: '[ˈitɪŋ]', phonicsSound: '', exampleSentence: 'They are eating.', exampleZh: '他們正在吃。' },
    { en: 'dancing', zh: '正在跳舞', image: '💃', phonics: '', kk: '[ˈdænsɪŋ]', phonicsSound: '', exampleSentence: 'She is dancing.', exampleZh: '她正在跳舞。' },
    { en: 'cooking', zh: '正在煮', image: '🍳', phonics: '', kk: '[ˈkʊkɪŋ]', phonicsSound: '', exampleSentence: 'Mom is cooking.', exampleZh: '媽媽正在煮。' },
    { en: 'looking', zh: '正在看', image: '👀', phonics: '', kk: '[ˈlʊkɪŋ]', phonicsSound: '', exampleSentence: 'I am looking.', exampleZh: '我正在看。' },
    { en: 'making', zh: '正在做（製作）', image: '🛠️', phonics: '', kk: '[ˈmekɪŋ]', phonicsSound: '', exampleSentence: 'He is making a boat.', exampleZh: '他正在做一艘船。' },
    { en: 'playing', zh: '正在玩', image: '🎮', phonics: '', kk: '[ˈpleɪŋ]', phonicsSound: '', exampleSentence: 'We are playing.', exampleZh: '我們正在玩。' },
    { en: 'now', zh: '現在', image: '⏰', phonics: '', kk: '[naʊ]', phonicsSound: '', exampleSentence: 'What are you doing now?', exampleZh: '你現在在做什麼？' },
  ],
  sentences: [
    { en: 'What are you doing?', zh: '你在做什麼？' }, { en: 'I am singing.', zh: '我正在唱歌。' }, { en: 'What is he doing?', zh: '他在做什麼？' }, { en: 'He is swimming.', zh: '他正在游泳。' }, { en: 'What are they doing?', zh: '他們在做什麼？' }, { en: 'They are eating.', zh: '他們正在吃。' },
  ],
  phonicsLetters: ['What are you doing?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'What ___ you doing?（be動詞·你）', options: ['are', 'is', 'am', 'do'], answer: 'are' },
    { type: 'fill-blank', question: 'What is he ___?（做·進行式）', options: ['doing', 'do', 'does', 'to do'], answer: 'doing' },
    { type: 'match', question: '🎤 正在做什麼？', options: ['singing', 'eating', 'swimming', 'cooking'], answer: 'singing' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🎤', '🏊', '🍽️', '💃'], answer: '💃', image: '🎧' },
    { type: 'match', question: '配對：進行式配圖', options: ['singing-🎤', 'swimming-🏊', 'eating-🍽️', 'dancing-💃'], answer: 'singing-🎤' },
    { type: 'fill-blank', question: 'What are you doing? I ___ singing.（be動詞）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
    { type: 'fill-blank', question: 'What is she ___?（做·進行式）', options: ['doing', 'do', 'does', 'to do'], answer: 'doing' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['What are you doing?', 'What is he doing?', 'I am singing.', 'They are eating.'], answer: 'What are you doing?', image: '🎧' },
    { type: 'read', question: 'What is Coco doing?（Coco 在做什麼？）', passage: 'Polly is singing.\nCoco is swimming in the sea.\nBenny is eating lunch.', options: ['swimming', 'singing', 'eating', 'dancing'], answer: 'swimming' },
  ],
  talkTimePrompts: ["Ask: What are you doing?", "Answer: I am ___ing.", "Ask about a friend: What is he/she doing?", "Change it: I am ___ing (cooking/dancing/playing)."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'What are they ___?（做·進行式）', options: ['doing', 'do', 'does', 'to do'], answer: 'doing' },
    { type: 'fill-blank', question: 'They ___ eating.（be動詞·複數）', options: ['are', 'am', 'is', 'be'], answer: 'are' },
    { type: 'match', question: '🍳 正在做什麼？', options: ['cooking', 'looking', 'making', 'playing'], answer: 'cooking' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "What are you doing?", lineZh: '你在做什麼？' },
    { speaker: 'Coco', line: "I am swimming! What is Benny doing?", lineZh: '我正在游泳！Benny 在做什麼？' },
    { speaker: 'Benny', line: "I am eating lunch. Yum!", lineZh: '我正在吃午餐。好吃！' },
    { speaker: 'Polly', line: "Now you can ask what someone is doing!", lineZh: '現在你會問別人在做什麼了！' },
  ],
};

const L5_M18: Mission = {
  id: 18, slug: 'l5-m18-beach-talk', level: 5, title: '海邊對話', titleEn: 'Beach Talk', theme: '珊瑚灘・海邊的一天', themeEmoji: '🏖️',
  focus: '情境對話：在海邊綜合運用形容詞/天氣/進行式',
  story: [
    { image: '🏖️', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "It's a sunny day! What are you doing, Coco?", dialogueZh: '晴朗的一天！Coco，你在做什麼？', highlightWords: ['sunny', 'doing'], sceneEmojis: ['🏖️', '☀️', '✨'], animation: 'wave' },
    { image: '🏊', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I am swimming! The water is cool!", dialogueZh: '我正在游泳！水好涼！', highlightWords: ['swimming', 'cool'], sceneEmojis: ['🏊', '🌊', '😊'], animation: 'bounce' },
    { image: '🐚', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Look! I have a big shell. It is bigger than yours!", dialogueZh: '看！我有一個大貝殼。比你的大！', highlightWords: ['bigger'], sceneEmojis: ['🐚', '👀', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "What a fun day at the beach!", dialogueZh: '海邊真是好玩的一天！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🏖️'], animation: 'bounce' },
  ],
  words: [
    { en: 'beach', zh: '海邊', image: '🏖️', phonics: '', kk: '[bitʃ]', phonicsSound: '', exampleSentence: 'at the beach', exampleZh: '在海邊' },
    { en: 'sunny', zh: '晴朗的', image: '☀️', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: "It's sunny.", exampleZh: '天氣晴朗。' },
    { en: 'swimming', zh: '正在游泳', image: '🏊', phonics: '', kk: '[ˈswɪmɪŋ]', phonicsSound: '', exampleSentence: 'I am swimming.', exampleZh: '我正在游泳。' },
    { en: 'cool', zh: '涼爽的', image: '🍃', phonics: '', kk: '[kul]', phonicsSound: '', exampleSentence: 'The water is cool.', exampleZh: '水很涼。' },
    { en: 'shell', zh: '貝殼', image: '🐚', phonics: '', kk: '[ʃɛl]', phonicsSound: '', exampleSentence: 'a big shell', exampleZh: '一個大貝殼' },
    { en: 'bigger', zh: '比較大', image: '🔎', phonics: '', kk: '[ˈbɪɡɚ]', phonicsSound: '', exampleSentence: 'It is bigger.', exampleZh: '它比較大。' },
    { en: 'sand', zh: '沙子', image: '🏝️', phonics: '', kk: '[sænd]', phonicsSound: '', exampleSentence: 'warm sand', exampleZh: '溫暖的沙' },
    { en: 'sea', zh: '海', image: '🌊', phonics: '', kk: '[si]', phonicsSound: '', exampleSentence: 'in the sea', exampleZh: '在海裡' },
    { en: 'fun', zh: '好玩的', image: '🎉', phonics: '', kk: '[fʌn]', phonicsSound: '', exampleSentence: 'a fun day', exampleZh: '好玩的一天' },
    { en: 'play', zh: '玩', image: '🏐', phonics: '', kk: '[ple]', phonicsSound: '', exampleSentence: 'We play on the sand.', exampleZh: '我們在沙上玩。' },
  ],
  sentences: [
    { en: "It's a sunny day.", zh: '晴朗的一天。' }, { en: 'What are you doing?', zh: '你在做什麼？' }, { en: 'I am swimming in the sea.', zh: '我正在海裡游泳。' }, { en: 'My shell is bigger than yours.', zh: '我的貝殼比你的大。' }, { en: 'The water is cool.', zh: '水很涼。' }, { en: 'What a fun day!', zh: '真是好玩的一天！' },
  ],
  phonicsLetters: ['beach dialogue'],
  warmUpQuestions: [
    { type: 'fill-blank', question: "It's a ___ day.（晴朗）", options: ['sunny', 'rainy', 'cold', 'snowy'], answer: 'sunny' },
    { type: 'fill-blank', question: 'I am ___ in the sea.（游泳·進行式）', options: ['swimming', 'swim', 'swims', 'to swim'], answer: 'swimming' },
    { type: 'match', question: '🐚 是什麼？', options: ['shell', 'sand', 'sea', 'fun'], answer: 'shell' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🏖️', '🏊', '🐚', '🌊'], answer: '🐚', image: '🎧' },
    { type: 'fill-blank', question: 'My shell is ___ than yours.（大）', options: ['bigger', 'big', 'small', 'biggest'], answer: 'bigger' },
    { type: 'fill-blank', question: 'What are you ___?（做·進行式）', options: ['doing', 'do', 'does', 'to do'], answer: 'doing' },
    { type: 'spell', question: '拼拼看：be _ ch（海邊）', answer: 'beach', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I am swimming in the sea.', "It's a sunny day.", 'My shell is bigger than yours.', 'The water is cool.'], answer: 'I am swimming in the sea.', image: '🎧' },
    { type: 'read', question: 'How is the weather at the beach?（海邊天氣如何？）', passage: "It's a sunny day at the beach.\nCoco is swimming.\nThe water is cool and nice.", options: ['sunny', 'rainy', 'snowy', 'cloudy'], answer: 'sunny' },
  ],
  talkTimePrompts: ["Talk about the beach: It's sunny. I am ___.", "Compare two shells: Mine is bigger.", "Ask a friend: What are you doing?", "Describe the sea and the sand."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Coco is ___ in the sea.（游泳·進行式）', options: ['swimming', 'swim', 'swims', 'to swim'], answer: 'swimming' },
    { type: 'fill-blank', question: 'The water is ___.（涼）', options: ['cool', 'hot', 'big', 'fast'], answer: 'cool' },
    { type: 'read', question: 'Whose shell is bigger?（誰的貝殼大？）', passage: "Coco has a small shell.\nBenny has a big shell.\nBenny's shell is bigger than Coco's.", options: ["Benny's", "Coco's", 'the same', 'no shell'], answer: "Benny's" },
  ],
  videoScript: [
    { speaker: 'Finn', line: "It's a sunny day! What are you doing, Coco?", lineZh: '晴天！Coco，你在做什麼？' },
    { speaker: 'Coco', line: "I am swimming! The water is cool!", lineZh: '我正在游泳！水好涼！' },
    { speaker: 'Benny', line: "Look! My shell is bigger than yours!", lineZh: '看！我的貝殼比你的大！' },
    { speaker: 'Finn', line: "What a fun day at the beach!", lineZh: '海邊真是好玩的一天！' },
  ],
};

const L5_M19: Mission = {
  id: 19, slug: 'l5-m19-reading-mix', level: 5, title: '閱讀綜合', titleEn: 'Reading Mix', theme: '珊瑚灘・大閱讀', themeEmoji: '📚',
  focus: '綜合閱讀：形容詞/比較級/天氣/進行式讀成一篇短文',
  story: [
    { image: '📚', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Let's read a longer story today!", dialogueZh: '今天我們讀一篇長一點的故事！', highlightWords: ['story'], sceneEmojis: ['📚', '📖', '✨'], animation: 'wave' },
    { image: '🌞', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "On Saturday, it is sunny. The friends go to the beach.", dialogueZh: '星期六，晴天。朋友們去海邊。', highlightWords: ['sunny', 'beach'], sceneEmojis: ['🌞', '🏖️', '😊'], animation: 'bounce' },
    { image: '🐬', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "They see a dolphin swimming. It is faster than a fish!", dialogueZh: '他們看到海豚在游。牠比魚快！', highlightWords: ['swimming', 'faster'], sceneEmojis: ['🐬', '💨', '🎉'], animation: 'float' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "You read a big story! Wonderful reader!", dialogueZh: '你讀了一篇大故事！了不起的讀者！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📚'], animation: 'bounce' },
  ],
  words: [
    { en: 'Saturday', zh: '星期六', image: '6️⃣', phonics: '', kk: '[ˈsætɚde]', phonicsSound: '', exampleSentence: 'on Saturday', exampleZh: '在星期六' },
    { en: 'sunny', zh: '晴朗的', image: '🌞', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: 'a sunny day', exampleZh: '晴朗的一天' },
    { en: 'beach', zh: '海邊', image: '🏖️', phonics: '', kk: '[bitʃ]', phonicsSound: '', exampleSentence: 'go to the beach', exampleZh: '去海邊' },
    { en: 'dolphin', zh: '海豚', image: '🐬', phonics: '', kk: '[ˈdɑlfɪn]', phonicsSound: '', exampleSentence: 'a fast dolphin', exampleZh: '一隻快海豚' },
    { en: 'swimming', zh: '正在游泳', image: '🏊', phonics: '', kk: '[ˈswɪmɪŋ]', phonicsSound: '', exampleSentence: 'It is swimming.', exampleZh: '牠正在游。' },
    { en: 'faster', zh: '比較快', image: '💨', phonics: '', kk: '[ˈfæstɚ]', phonicsSound: '', exampleSentence: 'It is faster.', exampleZh: '牠比較快。' },
    { en: 'shell', zh: '貝殼', image: '🐚', phonics: '', kk: '[ʃɛl]', phonicsSound: '', exampleSentence: 'a pretty shell', exampleZh: '一個漂亮貝殼' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'They are happy.', exampleZh: '他們很開心。' },
    { en: 'friend', zh: '朋友', image: '🧑‍🤝‍🧑', phonics: '', kk: '[frɛnd]', phonicsSound: '', exampleSentence: 'good friends', exampleZh: '好朋友' },
    { en: 'home', zh: '家', image: '🏠', phonics: '', kk: '[hom]', phonicsSound: '', exampleSentence: 'go home', exampleZh: '回家' },
  ],
  sentences: [
    { en: 'On Saturday, it is sunny.', zh: '星期六，天氣晴朗。' }, { en: 'The friends go to the beach.', zh: '朋友們去海邊。' }, { en: 'A dolphin is swimming.', zh: '一隻海豚正在游。' }, { en: 'It is faster than a fish.', zh: '牠比魚快。' }, { en: 'They find pretty shells.', zh: '他們找到漂亮的貝殼。' }, { en: 'They are very happy.', zh: '他們很開心。' },
  ],
  phonicsLetters: ['reading mix'],
  warmUpQuestions: [
    { type: 'match', question: '🐬 是什麼？', options: ['dolphin', 'fish', 'crab', 'turtle'], answer: 'dolphin' },
    { type: 'fill-blank', question: 'On Saturday, it is ___.（晴朗）', options: ['sunny', 'rainy', 'cold', 'snowy'], answer: 'sunny' },
    { type: 'fill-blank', question: 'A dolphin is ___ than a fish.（快）', options: ['faster', 'fast', 'slow', 'slower'], answer: 'faster' },
  ],
  challenges: [
    { type: 'read', question: 'When do the friends go to the beach?（朋友們何時去海邊？）', passage: 'On Saturday, it is sunny and warm.\nThe friends go to the beach.\nThey play in the sand.', options: ['Saturday', 'Monday', 'Sunday', 'Friday'], answer: 'Saturday' },
    { type: 'read', question: 'What do they see swimming?（他們看到什麼在游？）', passage: 'At the beach, they look at the sea.\nA dolphin is swimming.\nIt is faster than a fish!', options: ['a dolphin', 'a shark', 'a turtle', 'a crab'], answer: 'a dolphin' },
    { type: 'read', question: 'How do the friends feel?（朋友們覺得如何？）', passage: 'They find pretty shells on the sand.\nThey swim in the cool sea.\nThey are very happy!', options: ['happy', 'sad', 'tired', 'angry'], answer: 'happy' },
    { type: 'fill-blank', question: 'A dolphin is ___ than a fish.（快·比較級）', options: ['faster', 'fast', 'fastest', 'more fast'], answer: 'faster' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['A dolphin is swimming.', 'On Saturday, it is sunny.', 'They find pretty shells.', 'They are very happy.'], answer: 'A dolphin is swimming.', image: '🎧' },
    { type: 'spell', question: '拼拼看：dolph _ n（海豚）', answer: 'dolphin', image: '✍️' },
  ],
  talkTimePrompts: ["Retell the beach story.", "What is the dolphin doing?", "Compare the dolphin and the fish.", "What day and weather is it in the story?"],
  reviewQuiz: [
    { type: 'read', question: 'Is the dolphin slower than the fish?（海豚比魚慢嗎？）', passage: 'A dolphin is swimming fast.\nA fish is slower.\nThe dolphin is faster than the fish.', options: ['No, it is faster', 'Yes, it is slower', 'They are the same', 'It is sleeping'], answer: 'No, it is faster' },
    { type: 'fill-blank', question: 'They go to the beach ___ Saturday.（在）', options: ['on', 'in', 'at', 'to'], answer: 'on' },
    { type: 'match', question: '🐚 是什麼？', options: ['shell', 'sand', 'sea', 'home'], answer: 'shell' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "Let's read a longer story today!", lineZh: '今天讀一篇長一點的故事！' },
    { speaker: 'Coco', line: "On Saturday, it is sunny. We go to the beach!", lineZh: '星期六晴天。我們去海邊！' },
    { speaker: 'Polly', line: "A dolphin is swimming. It is faster than a fish!", lineZh: '海豚在游。牠比魚快！' },
    { speaker: 'Benny', line: "You read a big story! Wonderful!", lineZh: '你讀了大故事！了不起！' },
  ],
};

const L5_M20: Mission = {
  id: 20, slug: 'l5-m20-boss', level: 5, title: '珊瑚灘大魔王', titleEn: 'Coral Boss', theme: '珊瑚灘・大魔王挑戰', themeEmoji: '🏆',
  focus: '總驗收：形容詞/比較級/天氣時間/星期月份/現在進行式',
  story: [
    { image: '🐲', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The Coral Boss is here! Use all your English!", dialogueZh: '珊瑚大魔王來了！用上你所有的英文！', highlightWords: [], sceneEmojis: ['🐲', '⚔️', '🌊'], animation: 'shake' },
    { image: '💪', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Big, small, faster, sunny — I know them all!", dialogueZh: '大、小、比較快、晴朗 —— 我全會了！', highlightWords: [], sceneEmojis: ['💪', '🌦️', '✨'], animation: 'bounce' },
    { image: '🎖️', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You beat the Boss! You get the Coral Badge!", dialogueZh: '你打敗大魔王了！獲得珊瑚徽章！', highlightWords: ['Badge'], sceneEmojis: ['🎖️', '🏆', '🎉'], animation: 'tada' },
    { image: '🏰', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You finished Coral Beach! On to Lighthouse Point!", dialogueZh: '你完成了珊瑚灘！前進燈塔角！', highlightWords: [], sceneEmojis: ['🏰', '💡', '🚀'], animation: 'bounce' },
  ],
  words: [
    { en: 'big', zh: '大的', image: '🐋', phonics: '', kk: '[bɪɡ]', phonicsSound: '', exampleSentence: 'It is big.', exampleZh: '它很大。' },
    { en: 'faster', zh: '比較快', image: '🦈', phonics: '', kk: '[ˈfæstɚ]', phonicsSound: '', exampleSentence: 'It is faster.', exampleZh: '它比較快。' },
    { en: 'sunny', zh: '晴朗的', image: '☀️', phonics: '', kk: '[ˈsʌni]', phonicsSound: '', exampleSentence: "It's sunny.", exampleZh: '天氣晴朗。' },
    { en: "o'clock", zh: '…點鐘', image: '🕐', phonics: '', kk: '[əˈklɑk]', phonicsSound: '', exampleSentence: "nine o'clock", exampleZh: '九點鐘' },
    { en: 'Monday', zh: '星期一', image: '📅', phonics: '', kk: '[ˈmʌnde]', phonicsSound: '', exampleSentence: 'on Monday', exampleZh: '在星期一' },
    { en: 'May', zh: '五月', image: '🌺', phonics: '', kk: '[me]', phonicsSound: '', exampleSentence: 'in May', exampleZh: '在五月' },
    { en: 'swimming', zh: '正在游泳', image: '🏊', phonics: '', kk: '[ˈswɪmɪŋ]', phonicsSound: '', exampleSentence: 'I am swimming.', exampleZh: '我正在游泳。' },
    { en: 'turtle', zh: '烏龜', image: '🐢', phonics: '', kk: '[ˈtɝtl̩]', phonicsSound: '', exampleSentence: 'a slow turtle', exampleZh: '一隻慢烏龜' },
    { en: 'cold', zh: '冷的', image: '❄️', phonics: '', kk: '[kold]', phonicsSound: '', exampleSentence: 'It is cold.', exampleZh: '它很冷。' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy!', exampleZh: '我很開心！' },
  ],
  sentences: [
    { en: 'The whale is bigger than the fish.', zh: '鯨魚比魚大。' }, { en: "It is sunny. It is nine o'clock.", zh: '晴天。九點鐘。' }, { en: 'My birthday is in May.', zh: '我的生日在五月。' }, { en: 'I am swimming in the sea.', zh: '我正在海裡游泳。' }, { en: 'What are you doing?', zh: '你在做什麼？' }, { en: 'I did it!', zh: '我做到了！' },
  ],
  phonicsLetters: ['review all'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'The whale is ___ than the fish.（大）', options: ['bigger', 'big', 'small', 'biggest'], answer: 'bigger' },
    { type: 'match', question: '☀️ 是什麼天氣？', options: ['sunny', 'rainy', 'cold', 'windy'], answer: 'sunny' },
    { type: 'fill-blank', question: 'I ___ swimming.（be動詞·進行式）', options: ['am', 'is', 'are', 'be'], answer: 'am' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🐋', '🦈', '🏊', '🐢'], answer: '🏊', image: '🎧' },
    { type: 'fill-blank', question: 'A shark is ___ than a crab.（快）', options: ['faster', 'fast', 'slow', 'fastest'], answer: 'faster' },
    { type: 'fill-blank', question: "What time is it? It is nine ___.（點鐘）", options: ["o'clock", 'time', 'morning', 'clock'], answer: "o'clock" },
    { type: 'match', question: 'What is she doing? 🏊', options: ['swimming', 'reading', 'eating', 'singing'], answer: 'swimming' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I am swimming in the sea.', 'What are you doing?', 'The whale is bigger than the fish.', 'My birthday is in May.'], answer: 'I am swimming in the sea.', image: '🎧' },
    { type: 'read', question: 'What is the weather like?（天氣如何？）', passage: "It is Saturday. It is sunny and warm.\nWe go to the beach at nine o'clock.\nWe are swimming and playing. We are happy!", options: ['sunny and warm', 'cold and snowy', 'rainy', 'windy'], answer: 'sunny and warm' },
  ],
  talkTimePrompts: ["Describe today: weather, day, time.", "Compare two things with -er.", "Say what you are doing now.", "You beat the Coral Boss! Say 'I did it!'"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'The turtle is ___ than the fish.（慢）', options: ['slower', 'slow', 'fast', 'slowest'], answer: 'slower' },
    { type: 'match', question: 'May 是幾月？', options: ['五月', '三月', '七月', '一月'], answer: '五月' },
    { type: 'read', question: 'Are they sad?（他們難過嗎？）', passage: 'It is a sunny Saturday.\nThe friends are swimming at the beach.\nThey are very happy!', options: ['No, they are happy', 'Yes, they are sad', 'They are cold', 'They are tired'], answer: 'No, they are happy' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "The Coral Boss says: describe the sea!", lineZh: '珊瑚大魔王說：描述大海！' },
    { speaker: 'Coco', line: "The whale is bigger than the fish. It is sunny!", lineZh: '鯨魚比魚大。天氣晴朗！' },
    { speaker: 'Ruby', line: "You beat the Boss! Coral champion!", lineZh: '你打敗大魔王了！珊瑚冠軍！' },
    { speaker: 'Finn', line: "On to Lighthouse Point! Let's keep going!", lineZh: '前進燈塔角！繼續加油！' },
  ],
};

// ===================== L6 燈塔角 Lighthouse Point（A1+・進階對話＋過去式入門＋引導式寫作） =====================
const L6_M1: Mission = {
  id: 1, slug: 'l6-m1-describe', level: 6, title: '描述外觀', titleEn: 'Describing', theme: '燈塔角・美麗海景', themeEmoji: '🌅',
  focus: '描述外觀形容詞：beautiful/pretty/clean/dirty/new/old…',
  story: [
    { image: '🌅', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Welcome to Lighthouse Point! The view is beautiful!", dialogueZh: '歡迎來到燈塔角！景色好美！', highlightWords: ['beautiful'], sceneEmojis: ['🌅', '🏰', '✨'], animation: 'wave' },
    { image: '🏖️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "The beach is clean. The old boat is pretty!", dialogueZh: '海灘很乾淨。那艘舊船好漂亮！', highlightWords: ['clean', 'old', 'pretty'], sceneEmojis: ['🏖️', '⛵', '😊'], animation: 'bounce' },
    { image: '💡', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "The lighthouse is tall and bright!", dialogueZh: '燈塔又高又亮！', highlightWords: ['tall', 'bright'], sceneEmojis: ['💡', '🏰', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can describe things now! Wonderful!", dialogueZh: '你會形容東西了！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🌅'], animation: 'bounce' },
  ],
  words: [
    { en: 'beautiful', zh: '美麗的', image: '🌅', phonics: '', kk: '[ˈbjutɪfl̩]', phonicsSound: '', exampleSentence: 'It is beautiful.', exampleZh: '它很美。' },
    { en: 'pretty', zh: '漂亮的', image: '🌸', phonics: '', kk: '[ˈprɪti]', phonicsSound: '', exampleSentence: 'a pretty shell', exampleZh: '一個漂亮貝殼' },
    { en: 'clean', zh: '乾淨的', image: '🫧', phonics: '', kk: '[klin]', phonicsSound: '', exampleSentence: 'a clean beach', exampleZh: '乾淨的海灘' },
    { en: 'dirty', zh: '髒的', image: '🟤', phonics: '', kk: '[ˈdɝti]', phonicsSound: '', exampleSentence: 'dirty water', exampleZh: '髒水' },
    { en: 'new', zh: '新的', image: '✨', phonics: '', kk: '[nu]', phonicsSound: '', exampleSentence: 'a new boat', exampleZh: '一艘新船' },
    { en: 'old', zh: '舊的·老的', image: '⛵', phonics: '', kk: '[old]', phonicsSound: '', exampleSentence: 'an old boat', exampleZh: '一艘舊船' },
    { en: 'bright', zh: '明亮的', image: '💡', phonics: '', kk: '[braɪt]', phonicsSound: '', exampleSentence: 'a bright light', exampleZh: '明亮的燈' },
    { en: 'dark', zh: '暗的', image: '🌑', phonics: '', kk: '[dɑrk]', phonicsSound: '', exampleSentence: 'a dark night', exampleZh: '黑暗的夜' },
    { en: 'tall', zh: '高的', image: '🏰', phonics: '', kk: '[tɔl]', phonicsSound: '', exampleSentence: 'a tall lighthouse', exampleZh: '高高的燈塔' },
    { en: 'nice', zh: '好的·美好的', image: '🥰', phonics: '', kk: '[naɪs]', phonicsSound: '', exampleSentence: 'a nice day', exampleZh: '美好的一天' },
  ],
  sentences: [
    { en: 'The view is beautiful.', zh: '景色很美。' }, { en: 'The beach is clean.', zh: '海灘很乾淨。' }, { en: 'Is the boat old?', zh: '這艘船舊嗎？' }, { en: 'Yes, it is old but pretty.', zh: '是的，它舊但漂亮。' }, { en: 'The lighthouse is tall and bright.', zh: '燈塔又高又亮。' }, { en: 'What a beautiful day!', zh: '多美的一天！' },
  ],
  phonicsLetters: ['describing'],
  warmUpQuestions: [
    { type: 'match', question: '🌅 beautiful 是什麼意思？', options: ['美麗的', '髒的', '舊的', '暗的'], answer: '美麗的' },
    { type: 'match', question: 'clean 的相反是？', options: ['dirty', 'new', 'bright', 'tall'], answer: 'dirty' },
    { type: 'fill-blank', question: 'The lighthouse is ___.（明亮）', options: ['bright', 'dark', 'dirty', 'old'], answer: 'bright' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的形容詞', options: ['🌅', '🫧', '💡', '🌑'], answer: '🌑', image: '🎧' },
    { type: 'match', question: '配對：相反詞', options: ['clean-dirty', 'new-old', 'bright-dark', 'beautiful-ugly'], answer: 'clean-dirty' },
    { type: 'fill-blank', question: '句型代換：The view is ___.（美麗）', options: ['beautiful', 'dirty', 'dark', 'is'], answer: 'beautiful' },
    { type: 'spell', question: '拼拼看：br _ ght（明亮）', answer: 'bright', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The view is beautiful.', 'The beach is clean.', 'The boat is old.', 'The lighthouse is tall.'], answer: 'The view is beautiful.', image: '🎧' },
    { type: 'read', question: 'How is the lighthouse?（燈塔怎麼樣？）', passage: 'The lighthouse is very tall.\nAt night, it is bright.\nThe view is beautiful!', options: ['tall and bright', 'small and dark', 'dirty and old', 'short and new'], answer: 'tall and bright' },
  ],
  talkTimePrompts: ["Describe the view: It is ___.", "Say two opposite adjectives.", "Describe something in your room.", "✍️ 引導寫作：The ___ is ___. (寫一句描述)"],
  reviewQuiz: [
    { type: 'match', question: 'bright 的相反是？', options: ['dark', 'clean', 'new', 'tall'], answer: 'dark' },
    { type: 'fill-blank', question: 'The beach is ___.（乾淨）', options: ['clean', 'dirty', 'dark', 'old'], answer: 'clean' },
    { type: 'spell', question: '拼拼看：pre _ ty（漂亮）', answer: 'pretty', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Welcome to Lighthouse Point! It's beautiful!", lineZh: '歡迎來到燈塔角！好美！' },
    { speaker: 'Coco', line: "The beach is clean. The old boat is pretty!", lineZh: '海灘乾淨。舊船漂亮！' },
    { speaker: 'Benny', line: "The lighthouse is tall and bright!", lineZh: '燈塔又高又亮！' },
    { speaker: 'Finn', line: "You can describe things now! Wonderful!", lineZh: '你會形容東西了！太棒了！' },
  ],
};

const L6_M2: Mission = {
  id: 2, slug: 'l6-m2-opinions', level: 6, title: '表達意見', titleEn: 'I think…', theme: '燈塔角・我覺得', themeEmoji: '💭',
  focus: '句型 I think it\'s… 表達意見；引導寫作 I think ___ because ___',
  story: [
    { image: '💭', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "I think the lighthouse is cool!", dialogueZh: '我覺得燈塔很酷！', highlightWords: ['think', 'cool'], sceneEmojis: ['💭', '💡', '✨'], animation: 'wave' },
    { image: '🎨', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I think this picture is beautiful!", dialogueZh: '我覺得這幅畫很美！', highlightWords: ['think', 'beautiful'], sceneEmojis: ['🎨', '🖼️', '😊'], animation: 'bounce' },
    { image: '🤔', character: '🐻', characterKey: 'benny', characterAction: 'think', characterName: 'Benny', dialogue: "I think it's fun because we are together!", dialogueZh: '我覺得很好玩，因為我們在一起！', highlightWords: ['think', 'because'], sceneEmojis: ['🤔', '🎉', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "Now you can share your ideas!", dialogueZh: '現在你會分享你的想法了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '💭'], animation: 'bounce' },
  ],
  words: [
    { en: 'think', zh: '認為·覺得', image: '💭', phonics: '', kk: '[θɪŋk]', phonicsSound: '', exampleSentence: "I think it's nice.", exampleZh: '我覺得很好。' },
    { en: 'cool', zh: '酷的', image: '😎', phonics: '', kk: '[kul]', phonicsSound: '', exampleSentence: "It's cool!", exampleZh: '很酷！' },
    { en: 'great', zh: '很棒的', image: '👍', phonics: '', kk: '[ɡret]', phonicsSound: '', exampleSentence: "It's great!", exampleZh: '很棒！' },
    { en: 'boring', zh: '無聊的', image: '😐', phonics: '', kk: '[ˈbɔrɪŋ]', phonicsSound: '', exampleSentence: "It's boring.", exampleZh: '很無聊。' },
    { en: 'fun', zh: '好玩的', image: '🎉', phonics: '', kk: '[fʌn]', phonicsSound: '', exampleSentence: "It's fun!", exampleZh: '很好玩！' },
    { en: 'good', zh: '好的', image: '🙂', phonics: '', kk: '[ɡʊd]', phonicsSound: '', exampleSentence: "It's good.", exampleZh: '很好。' },
    { en: 'bad', zh: '不好的', image: '🙁', phonics: '', kk: '[bæd]', phonicsSound: '', exampleSentence: "It's bad.", exampleZh: '不好。' },
    { en: 'amazing', zh: '驚人的', image: '🤩', phonics: '', kk: '[əˈmezɪŋ]', phonicsSound: '', exampleSentence: "It's amazing!", exampleZh: '太驚人了！' },
    { en: 'because', zh: '因為', image: '➡️', phonics: '', kk: '[bɪˈkɔz]', phonicsSound: '', exampleSentence: 'I like it because it is fun.', exampleZh: '我喜歡它因為好玩。' },
    { en: 'idea', zh: '想法', image: '💡', phonics: '', kk: '[aɪˈdiə]', phonicsSound: '', exampleSentence: 'a good idea', exampleZh: '一個好主意' },
  ],
  sentences: [
    { en: "I think it's cool.", zh: '我覺得很酷。' }, { en: 'I think the picture is beautiful.', zh: '我覺得這幅畫很美。' }, { en: "What do you think?", zh: '你覺得呢？' }, { en: "I think it's fun because we play together.", zh: '我覺得好玩因為我們一起玩。' }, { en: "I don't think it's boring.", zh: '我不覺得無聊。' }, { en: "That's a good idea!", zh: '好主意！' },
  ],
  phonicsLetters: ["I think it's…"],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ it is cool.（覺得）', options: ['think', 'am', 'like', 'is'], answer: 'think' },
    { type: 'match', question: '😎 cool 是什麼意思？', options: ['酷的', '無聊的', '不好的', '髒的'], answer: '酷的' },
    { type: 'match', question: 'fun 的相反感覺是？', options: ['boring', 'great', 'cool', 'good'], answer: 'boring' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的感覺', options: ['😎', '😐', '🤩', '🙁'], answer: '🤩', image: '🎧' },
    { type: 'match', question: '配對：意見詞配意思', options: ['cool-酷', 'boring-無聊', 'great-很棒', 'amazing-驚人'], answer: 'cool-酷' },
    { type: 'fill-blank', question: '句型代換：I think it\'s ___.（好玩）', options: ['fun', 'think', 'because', 'is'], answer: 'fun' },
    { type: 'fill-blank', question: 'I like it ___ it is fun.（因為）', options: ['because', 'think', 'and', 'but'], answer: 'because' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ["I think it's cool.", 'What do you think?', "I think it's fun.", "That's a good idea!"], answer: "I think it's cool.", image: '🎧' },
    { type: 'read', question: 'Why does Benny think it is fun?（Benny 為何覺得好玩？）', passage: "Benny is at the beach with friends.\nHe thinks it is fun.\nIt is fun because they are together.", options: ['because they are together', 'because it is cold', 'because it is boring', 'because it is late'], answer: 'because they are together' },
  ],
  talkTimePrompts: ["What do you think? I think it's ___.", "Give an opinion about school.", "Use 'because': I like it because ___.", "✍️ 引導寫作：I think ___ because ___."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'What do you ___?（覺得）', options: ['think', 'am', 'like', 'is'], answer: 'think' },
    { type: 'match', question: '😐 boring 是什麼意思？', options: ['無聊的', '好玩的', '很棒的', '酷的'], answer: '無聊的' },
    { type: 'fill-blank', question: "It's fun ___ we play together.（因為）", options: ['because', 'think', 'but', 'and'], answer: 'because' },
  ],
  videoScript: [
    { speaker: 'Ruby', line: "I think the lighthouse is cool!", lineZh: '我覺得燈塔很酷！' },
    { speaker: 'Coco', line: "I think this picture is beautiful!", lineZh: '我覺得這幅畫很美！' },
    { speaker: 'Benny', line: "I think it's fun because we are together!", lineZh: '我覺得好玩因為我們在一起！' },
    { speaker: 'Ruby', line: "Now you can share your ideas!", lineZh: '現在你會分享想法了！' },
  ],
};

const L6_M3: Mission = {
  id: 3, slug: 'l6-m3-shopping', level: 6, title: '購物 How much?', titleEn: 'How much?', theme: '燈塔角・海邊小店', themeEmoji: '🛍️',
  focus: '句型 How much is it? — It\'s ___ dollars.',
  story: [
    { image: '🛍️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "How much is this shell? It's five dollars.", dialogueZh: '這個貝殼多少錢？五塊錢。', highlightWords: ['How much', 'dollars'], sceneEmojis: ['🐚', '💵', '✨'], animation: 'wave' },
    { image: '🍦', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "How much is the ice cream? It's two dollars.", dialogueZh: '冰淇淋多少錢？兩塊錢。', highlightWords: ['How much', 'dollars'], sceneEmojis: ['🍦', '💵', '😊'], animation: 'bounce' },
    { image: '💰', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Here is the money. Thank you!", dialogueZh: '錢在這裡。謝謝！', highlightWords: ['money'], sceneEmojis: ['💰', '🤝', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Now you can go shopping in English!", dialogueZh: '現在你會用英文購物了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🛍️'], animation: 'bounce' },
  ],
  words: [
    { en: 'how much', zh: '多少錢', image: '💲', phonics: '', kk: '[haʊ mʌtʃ]', phonicsSound: '', exampleSentence: 'How much is it?', exampleZh: '多少錢？' },
    { en: 'dollar', zh: '元·美金', image: '💵', phonics: '', kk: '[ˈdɑlɚ]', phonicsSound: '', exampleSentence: 'five dollars', exampleZh: '五塊錢' },
    { en: 'money', zh: '錢', image: '💰', phonics: '', kk: '[ˈmʌni]', phonicsSound: '', exampleSentence: 'I have money.', exampleZh: '我有錢。' },
    { en: 'price', zh: '價錢', image: '🏷️', phonics: '', kk: '[praɪs]', phonicsSound: '', exampleSentence: 'a good price', exampleZh: '好價錢' },
    { en: 'buy', zh: '買', image: '🛒', phonics: '', kk: '[baɪ]', phonicsSound: '', exampleSentence: 'I buy a shell.', exampleZh: '我買一個貝殼。' },
    { en: 'pay', zh: '付錢', image: '💳', phonics: '', kk: '[pe]', phonicsSound: '', exampleSentence: 'I pay five dollars.', exampleZh: '我付五塊錢。' },
    { en: 'coin', zh: '硬幣', image: '🪙', phonics: '', kk: '[kɔɪn]', phonicsSound: '', exampleSentence: 'a gold coin', exampleZh: '一個金幣' },
    { en: 'shop', zh: '商店·購物', image: '🏪', phonics: '', kk: '[ʃɑp]', phonicsSound: '', exampleSentence: 'a small shop', exampleZh: '一間小店' },
    { en: 'want', zh: '想要', image: '🙋', phonics: '', kk: '[wɑnt]', phonicsSound: '', exampleSentence: 'I want this.', exampleZh: '我想要這個。' },
    { en: 'thank you', zh: '謝謝', image: '🙇', phonics: '', kk: '[θæŋk ju]', phonicsSound: '', exampleSentence: 'Thank you!', exampleZh: '謝謝你！' },
  ],
  sentences: [
    { en: 'How much is it?', zh: '多少錢？' }, { en: "It's five dollars.", zh: '五塊錢。' }, { en: 'I want to buy this.', zh: '我想買這個。' }, { en: 'Here is the money.', zh: '錢在這裡。' }, { en: 'How much are they?', zh: '它們多少錢？' }, { en: 'Thank you very much!', zh: '非常謝謝！' },
  ],
  phonicsLetters: ['How much?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ much is it?（多少）', options: ['How', 'What', 'Where', 'Who'], answer: 'How' },
    { type: 'match', question: '💵 是什麼？', options: ['dollar', 'coin', 'shop', 'price'], answer: 'dollar' },
    { type: 'match', question: 'buy 是什麼意思？', options: ['買', '賣', '付', '想'], answer: '買' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['💵', '💰', '🪙', '🛒'], answer: '🪙', image: '🎧' },
    { type: 'match', question: '配對：字配圖', options: ['money-💰', 'coin-🪙', 'buy-🛒', 'price-🏷️'], answer: 'money-💰' },
    { type: 'fill-blank', question: "How much is it? It's five ___.（元）", options: ['dollars', 'money', 'coins', 'price'], answer: 'dollars' },
    { type: 'spell', question: '拼拼看：mon _ y（錢）', answer: 'money', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['How much is it?', "It's five dollars.", 'I want to buy this.', 'Here is the money.'], answer: 'How much is it?', image: '🎧' },
    { type: 'read', question: 'How much is the ice cream?（冰淇淋多少錢？）', passage: 'Coco is at the shop.\n"How much is the ice cream?"\n"It is two dollars."', options: ['two dollars', 'five dollars', 'ten dollars', 'one dollar'], answer: 'two dollars' },
  ],
  talkTimePrompts: ["Ask: How much is it?", "Answer: It's ___ dollars.", "Buy something: I want to buy ___.", "✍️ 引導寫作：I want to buy a ___. It is ___ dollars."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'How ___ is it?（多少）', options: ['much', 'many', 'old', 'big'], answer: 'much' },
    { type: 'match', question: '🪙 是什麼？', options: ['coin', 'dollar', 'price', 'shop'], answer: 'coin' },
    { type: 'spell', question: '拼拼看：doll _ r（元）', answer: 'dollar', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "How much is this shell?", lineZh: '這個貝殼多少錢？' },
    { speaker: 'Polly', line: "It's five dollars. How much is the ice cream?", lineZh: '五塊錢。冰淇淋多少錢？' },
    { speaker: 'Benny', line: "It's two dollars. Here is the money!", lineZh: '兩塊錢。錢在這裡！' },
    { speaker: 'Coco', line: "Thank you! Now you can go shopping!", lineZh: '謝謝！現在你會購物了！' },
  ],
};

const L6_M4: Mission = {
  id: 4, slug: 'l6-m4-cheap-expensive', level: 6, title: '便宜與貴', titleEn: 'Cheap / Expensive', theme: '燈塔角・買東西', themeEmoji: '💰',
  focus: '購物單字：cheap/expensive/buy/sell/money ＋ It is too expensive.',
  story: [
    { image: '💰', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "This hat is cheap. It's only one dollar!", dialogueZh: '這頂帽子很便宜。只要一塊錢！', highlightWords: ['cheap'], sceneEmojis: ['🎩', '💵', '✨'], animation: 'wave' },
    { image: '💎', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "This ring is expensive. It's too expensive!", dialogueZh: '這個戒指很貴。太貴了！', highlightWords: ['expensive'], sceneEmojis: ['💎', '💸', '😮'], animation: 'shake' },
    { image: '🏪', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "The shop sells shells. People buy them!", dialogueZh: '這家店賣貝殼。人們買它們！', highlightWords: ['sells', 'buy'], sceneEmojis: ['🏪', '🐚', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Cheap or expensive — you can decide!", dialogueZh: '便宜或貴 —— 你可以決定！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '💰'], animation: 'bounce' },
  ],
  words: [
    { en: 'cheap', zh: '便宜的', image: '💵', phonics: '', kk: '[tʃip]', phonicsSound: '', exampleSentence: 'It is cheap.', exampleZh: '它很便宜。' },
    { en: 'expensive', zh: '貴的', image: '💎', phonics: '', kk: '[ɪkˈspɛnsɪv]', phonicsSound: '', exampleSentence: 'It is expensive.', exampleZh: '它很貴。' },
    { en: 'buy', zh: '買', image: '🛒', phonics: '', kk: '[baɪ]', phonicsSound: '', exampleSentence: 'I buy a hat.', exampleZh: '我買一頂帽子。' },
    { en: 'sell', zh: '賣', image: '🏪', phonics: '', kk: '[sɛl]', phonicsSound: '', exampleSentence: 'They sell shells.', exampleZh: '他們賣貝殼。' },
    { en: 'money', zh: '錢', image: '💰', phonics: '', kk: '[ˈmʌni]', phonicsSound: '', exampleSentence: 'I have money.', exampleZh: '我有錢。' },
    { en: 'too', zh: '太…', image: '⚠️', phonics: '', kk: '[tu]', phonicsSound: '', exampleSentence: 'too expensive', exampleZh: '太貴了' },
    { en: 'store', zh: '商店', image: '🏬', phonics: '', kk: '[stɔr]', phonicsSound: '', exampleSentence: 'a big store', exampleZh: '一家大商店' },
    { en: 'sale', zh: '特價', image: '🔖', phonics: '', kk: '[sel]', phonicsSound: '', exampleSentence: 'on sale', exampleZh: '特價中' },
    { en: 'wallet', zh: '錢包', image: '👛', phonics: '', kk: '[ˈwɑlɪt]', phonicsSound: '', exampleSentence: 'my wallet', exampleZh: '我的錢包' },
    { en: 'hat', zh: '帽子', image: '🎩', phonics: '', kk: '[hæt]', phonicsSound: '', exampleSentence: 'a cheap hat', exampleZh: '一頂便宜帽子' },
  ],
  sentences: [
    { en: 'This hat is cheap.', zh: '這頂帽子很便宜。' }, { en: 'This ring is expensive.', zh: '這個戒指很貴。' }, { en: 'It is too expensive!', zh: '太貴了！' }, { en: 'The shop sells shells.', zh: '這家店賣貝殼。' }, { en: 'Do you want to buy it?', zh: '你想買嗎？' }, { en: 'It is on sale!', zh: '特價中！' },
  ],
  phonicsLetters: ['cheap / expensive'],
  warmUpQuestions: [
    { type: 'match', question: 'cheap 的相反是？', options: ['expensive', 'buy', 'sell', 'money'], answer: 'expensive' },
    { type: 'match', question: 'buy 的相反是？', options: ['sell', 'cheap', 'store', 'sale'], answer: 'sell' },
    { type: 'match', question: '💎 這個戒指通常是？', options: ['expensive', 'cheap', 'free', 'sell'], answer: 'expensive' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['💵', '💎', '🏪', '👛'], answer: '👛', image: '🎧' },
    { type: 'match', question: '配對：字配意思', options: ['cheap-便宜', 'expensive-貴', 'buy-買', 'sell-賣'], answer: 'cheap-便宜' },
    { type: 'fill-blank', question: '句型代換：This ring is ___.（貴）', options: ['expensive', 'cheap', 'buy', 'is'], answer: 'expensive' },
    { type: 'fill-blank', question: 'The shop ___ shells.（賣·第三人稱）', options: ['sells', 'sell', 'buy', 'buys'], answer: 'sells' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['This hat is cheap.', 'This ring is expensive.', 'It is too expensive!', 'It is on sale!'], answer: 'This hat is cheap.', image: '🎧' },
    { type: 'read', question: 'Why does Coco not buy the ring?（Coco 為何不買戒指？）', passage: 'Coco looks at a ring.\nIt is very expensive.\nIt is too expensive, so she does not buy it.', options: ['too expensive', 'too cheap', 'too small', 'too old'], answer: 'too expensive' },
  ],
  talkTimePrompts: ["Say: This is cheap / expensive.", "Ask: Do you want to buy it?", "Use 'too': It is too expensive.", "✍️ 引導寫作：The ___ is cheap/expensive. I ___ it."],
  reviewQuiz: [
    { type: 'match', question: 'expensive 是什麼意思？', options: ['貴的', '便宜的', '買', '賣'], answer: '貴的' },
    { type: 'fill-blank', question: 'It is ___ expensive!（太）', options: ['too', 'to', 'two', 'so'], answer: 'too' },
    { type: 'spell', question: '拼拼看：ch _ ap（便宜）', answer: 'cheap', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "This hat is cheap. Only one dollar!", lineZh: '這帽子便宜。只要一塊！' },
    { speaker: 'Coco', line: "This ring is too expensive!", lineZh: '這戒指太貴了！' },
    { speaker: 'Polly', line: "The shop sells shells. People buy them!", lineZh: '店賣貝殼。人們買！' },
    { speaker: 'Benny', line: "Cheap or expensive — you decide!", lineZh: '便宜或貴 —— 你決定！' },
  ],
};

const L6_M5: Mission = {
  id: 5, slug: 'l6-m5-review-shopping', level: 6, title: 'Review① 描述購物', titleEn: 'Review: Describe & Shop', theme: '燈塔角・複習關', themeEmoji: '🔄',
  focus: '螺旋複習①：描述形容詞 ＋ 意見 I think ＋ 購物 How much/cheap/expensive',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review! Describe, think, and shop!", dialogueZh: '來複習！形容、想法、購物！', highlightWords: [], sceneEmojis: ['🔄', '🛍️', '✨'], animation: 'wave' },
    { image: '🌅', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "The view is beautiful. I think it's amazing!", dialogueZh: '景色很美。我覺得太驚人了！', highlightWords: ['beautiful', 'think'], sceneEmojis: ['🌅', '💭', '😊'], animation: 'bounce' },
    { image: '💵', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "How much is it? It's cheap — only two dollars!", dialogueZh: '多少錢？很便宜 —— 只要兩塊！', highlightWords: ['How much', 'cheap'], sceneEmojis: ['💵', '🛒', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can describe, share, and shop! Amazing!", dialogueZh: '你會形容、分享、購物了！太厲害！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'beautiful', zh: '美麗的', image: '🌅', phonics: '', kk: '[ˈbjutɪfl̩]', phonicsSound: '', exampleSentence: 'It is beautiful.', exampleZh: '它很美。' },
    { en: 'clean', zh: '乾淨的', image: '🫧', phonics: '', kk: '[klin]', phonicsSound: '', exampleSentence: 'a clean beach', exampleZh: '乾淨的海灘' },
    { en: 'think', zh: '覺得', image: '💭', phonics: '', kk: '[θɪŋk]', phonicsSound: '', exampleSentence: "I think it's nice.", exampleZh: '我覺得很好。' },
    { en: 'cool', zh: '酷的', image: '😎', phonics: '', kk: '[kul]', phonicsSound: '', exampleSentence: "It's cool!", exampleZh: '很酷！' },
    { en: 'how much', zh: '多少錢', image: '💲', phonics: '', kk: '[haʊ mʌtʃ]', phonicsSound: '', exampleSentence: 'How much is it?', exampleZh: '多少錢？' },
    { en: 'dollar', zh: '元', image: '💵', phonics: '', kk: '[ˈdɑlɚ]', phonicsSound: '', exampleSentence: 'two dollars', exampleZh: '兩塊錢' },
    { en: 'cheap', zh: '便宜的', image: '🪙', phonics: '', kk: '[tʃip]', phonicsSound: '', exampleSentence: 'It is cheap.', exampleZh: '它很便宜。' },
    { en: 'expensive', zh: '貴的', image: '💎', phonics: '', kk: '[ɪkˈspɛnsɪv]', phonicsSound: '', exampleSentence: 'It is expensive.', exampleZh: '它很貴。' },
    { en: 'buy', zh: '買', image: '🛒', phonics: '', kk: '[baɪ]', phonicsSound: '', exampleSentence: 'I buy it.', exampleZh: '我買它。' },
    { en: 'because', zh: '因為', image: '➡️', phonics: '', kk: '[bɪˈkɔz]', phonicsSound: '', exampleSentence: 'I like it because it is nice.', exampleZh: '我喜歡因為它很好。' },
  ],
  sentences: [
    { en: 'The view is beautiful.', zh: '景色很美。' }, { en: "I think it's amazing.", zh: '我覺得很驚人。' }, { en: 'How much is it?', zh: '多少錢？' }, { en: "It's cheap, only two dollars.", zh: '很便宜，只要兩塊。' }, { en: 'It is too expensive.', zh: '太貴了。' }, { en: 'I like it because it is pretty.', zh: '我喜歡它因為它漂亮。' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'match', question: 'beautiful 是什麼意思？', options: ['美麗的', '便宜的', '貴的', '無聊的'], answer: '美麗的' },
    { type: 'fill-blank', question: 'I ___ it is cool.（覺得）', options: ['think', 'am', 'buy', 'is'], answer: 'think' },
    { type: 'match', question: 'cheap 的相反是？', options: ['expensive', 'clean', 'cool', 'buy'], answer: 'expensive' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🌅', '💭', '💵', '💎'], answer: '💎', image: '🎧' },
    { type: 'fill-blank', question: "How ___ is it? It's cheap.（多少）", options: ['much', 'many', 'old', 'big'], answer: 'much' },
    { type: 'fill-blank', question: 'I like it ___ it is pretty.（因為）', options: ['because', 'think', 'but', 'and'], answer: 'because' },
    { type: 'spell', question: '拼拼看：exp _ nsive（貴）', answer: 'expensive', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The view is beautiful.', "I think it's amazing.", 'How much is it?', 'It is too expensive.'], answer: 'The view is beautiful.', image: '🎧' },
    { type: 'read', question: 'What does Coco think of the view?（Coco 覺得景色如何？）', passage: 'Coco looks at the sea.\nThe view is beautiful.\nShe thinks it is amazing!', options: ['amazing', 'boring', 'bad', 'dark'], answer: 'amazing' },
  ],
  talkTimePrompts: ["Describe and give an opinion: It is ___. I think it's ___.", "Go shopping: How much? Buy it.", "Say cheap or expensive.", "✍️ 引導寫作：I think the ___ is ___ because ___."],
  reviewQuiz: [
    { type: 'match', question: 'expensive 是什麼意思？', options: ['貴的', '便宜的', '美麗的', '乾淨的'], answer: '貴的' },
    { type: 'fill-blank', question: "I think it's ___.（酷）", options: ['cool', 'think', 'buy', 'much'], answer: 'cool' },
    { type: 'read', question: 'Is it expensive?（貴嗎？）', passage: 'The hat is only two dollars.\nIt is very cheap.\nCoco buys the hat.', options: ['No, it is cheap', 'Yes, it is expensive', 'It is dirty', 'It is old'], answer: 'No, it is cheap' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's review! Describe, think, and shop!", lineZh: '來複習！形容、想法、購物！' },
    { speaker: 'Coco', line: "The view is beautiful. I think it's amazing!", lineZh: '景色很美。我覺得驚人！' },
    { speaker: 'Benny', line: "How much? It's cheap — only two dollars!", lineZh: '多少錢？便宜 —— 只要兩塊！' },
    { speaker: 'Finn', line: "You can describe, share, and shop! Amazing!", lineZh: '你會形容、分享、購物了！太厲害！' },
  ],
};

const L6_M6: Mission = {
  id: 6, slug: 'l6-m6-restaurant', level: 6, title: '餐廳點餐', titleEn: 'At the Restaurant', theme: '燈塔角・海鮮餐廳', themeEmoji: '🍽️',
  focus: '句型 Can I have…? / I\'d like…（點餐）',
  story: [
    { image: '🍽️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Can I have a menu, please?", dialogueZh: '可以給我菜單嗎？', highlightWords: ['Can I have'], sceneEmojis: ['🍽️', '📋', '✨'], animation: 'wave' },
    { image: '🍲', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "I'd like some soup and salad.", dialogueZh: '我想要湯和沙拉。', highlightWords: ["I'd like"], sceneEmojis: ['🍲', '🥗', '😊'], animation: 'bounce' },
    { image: '🥤', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Can I have some juice? Thank you!", dialogueZh: '可以給我果汁嗎？謝謝！', highlightWords: ['Can I have'], sceneEmojis: ['🥤', '🙏', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Now you can order food in English!", dialogueZh: '現在你會用英文點餐了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🍽️'], animation: 'bounce' },
  ],
  words: [
    { en: "I'd like", zh: '我想要', image: '🙋', phonics: '', kk: '[aɪd laɪk]', phonicsSound: '', exampleSentence: "I'd like some soup.", exampleZh: '我想要一些湯。' },
    { en: 'menu', zh: '菜單', image: '📋', phonics: '', kk: '[ˈmɛnju]', phonicsSound: '', exampleSentence: 'Can I have a menu?', exampleZh: '可以給我菜單嗎？' },
    { en: 'order', zh: '點餐', image: '📝', phonics: '', kk: '[ˈɔrdɚ]', phonicsSound: '', exampleSentence: 'I want to order.', exampleZh: '我想點餐。' },
    { en: 'soup', zh: '湯', image: '🍲', phonics: '', kk: '[sup]', phonicsSound: '', exampleSentence: "I'd like soup.", exampleZh: '我想要湯。' },
    { en: 'salad', zh: '沙拉', image: '🥗', phonics: '', kk: '[ˈsæləd]', phonicsSound: '', exampleSentence: 'a green salad', exampleZh: '一份綠沙拉' },
    { en: 'chicken', zh: '雞肉', image: '🍗', phonics: '', kk: '[ˈtʃɪkɪn]', phonicsSound: '', exampleSentence: "I'd like chicken.", exampleZh: '我想要雞肉。' },
    { en: 'water', zh: '水', image: '💧', phonics: '', kk: '[ˈwɔtɚ]', phonicsSound: '', exampleSentence: 'Can I have water?', exampleZh: '可以給我水嗎？' },
    { en: 'juice', zh: '果汁', image: '🧃', phonics: '', kk: '[dʒus]', phonicsSound: '', exampleSentence: 'apple juice', exampleZh: '蘋果汁' },
    { en: 'waiter', zh: '服務生', image: '🧑‍🍳', phonics: '', kk: '[ˈwetɚ]', phonicsSound: '', exampleSentence: 'Ask the waiter.', exampleZh: '問服務生。' },
    { en: 'please', zh: '請', image: '🙏', phonics: '', kk: '[pliz]', phonicsSound: '', exampleSentence: 'Water, please.', exampleZh: '請給我水。' },
  ],
  sentences: [
    { en: 'Can I have a menu, please?', zh: '可以給我菜單嗎？' }, { en: "I'd like some soup.", zh: '我想要一些湯。' }, { en: 'Can I have some water?', zh: '可以給我水嗎？' }, { en: 'What would you like?', zh: '你想要什麼？' }, { en: "I'd like chicken and salad.", zh: '我想要雞肉和沙拉。' }, { en: 'Thank you very much!', zh: '非常謝謝！' },
  ],
  phonicsLetters: ["Can I have…?"],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ I have a menu?（可以）', options: ['Can', 'Do', 'Are', 'Is'], answer: 'Can' },
    { type: 'match', question: '🍲 是什麼？', options: ['soup', 'salad', 'juice', 'chicken'], answer: 'soup' },
    { type: 'match', question: '🥗 是什麼？', options: ['salad', 'soup', 'water', 'menu'], answer: 'salad' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的食物', options: ['🍲', '🥗', '🍗', '🧃'], answer: '🍗', image: '🎧' },
    { type: 'match', question: '配對：食物配圖', options: ['soup-🍲', 'salad-🥗', 'chicken-🍗', 'juice-🧃'], answer: 'soup-🍲' },
    { type: 'fill-blank', question: "句型代換：I'd like some ___.（湯）", options: ['soup', 'menu', 'please', 'is'], answer: 'soup' },
    { type: 'fill-blank', question: '___ I have some water?（可以）', options: ['Can', 'Do', 'Are', 'Is'], answer: 'Can' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Can I have a menu, please?', "I'd like some soup.", 'Can I have some water?', 'What would you like?'], answer: 'Can I have a menu, please?', image: '🎧' },
    { type: 'read', question: 'What does Benny order?（Benny 點什麼？）', passage: 'Benny is at the restaurant.\n"What would you like?"\n"I\'d like soup and salad, please."', options: ['soup and salad', 'chicken and juice', 'water only', 'a menu'], answer: 'soup and salad' },
  ],
  talkTimePrompts: ["Order food: Can I have ___?", "Say: I'd like ___.", "Be polite: ___, please. / Thank you!", "✍️ 引導寫作：I'd like ___ and ___, please."],
  reviewQuiz: [
    { type: 'fill-blank', question: "___ like some juice.（我想要）", options: ["I'd", 'I', 'Can', 'Do'], answer: "I'd" },
    { type: 'match', question: '🧃 是什麼？', options: ['juice', 'water', 'soup', 'salad'], answer: 'juice' },
    { type: 'spell', question: '拼拼看：men _ （菜單）', answer: 'menu', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Can I have a menu, please?", lineZh: '可以給我菜單嗎？' },
    { speaker: 'Benny', line: "I'd like some soup and salad.", lineZh: '我想要湯和沙拉。' },
    { speaker: 'Polly', line: "Can I have some juice? Thank you!", lineZh: '可以給我果汁嗎？謝謝！' },
    { speaker: 'Coco', line: "Now you can order food in English!", lineZh: '現在你會用英文點餐了！' },
  ],
};

const L6_M7: Mission = {
  id: 7, slug: 'l6-m7-food-drinks', level: 6, title: '食物飲料', titleEn: 'Food & Drinks', theme: '燈塔角・美味餐點', themeEmoji: '🍔',
  focus: '更多食物飲料 ＋ 點餐對話綜合',
  story: [
    { image: '🍔', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "I'd like a hamburger and fries!", dialogueZh: '我想要漢堡和薯條！', highlightWords: ['hamburger', 'fries'], sceneEmojis: ['🍔', '🍟', '✨'], animation: 'wave' },
    { image: '🍕', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Can I have pizza and a cola?", dialogueZh: '可以給我披薩和可樂嗎？', highlightWords: ['pizza'], sceneEmojis: ['🍕', '🥤', '😊'], animation: 'bounce' },
    { image: '🍰', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "For dessert, I'd like cake and tea!", dialogueZh: '甜點我想要蛋糕和茶！', highlightWords: ['cake', 'tea'], sceneEmojis: ['🍰', '🍵', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Yummy! We ordered a big meal!", dialogueZh: '好吃！我們點了一大餐！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🍔'], animation: 'bounce' },
  ],
  words: [
    { en: 'hamburger', zh: '漢堡', image: '🍔', phonics: '', kk: '[ˈhæmbɝɡɚ]', phonicsSound: '', exampleSentence: "I'd like a hamburger.", exampleZh: '我想要漢堡。' },
    { en: 'fries', zh: '薯條', image: '🍟', phonics: '', kk: '[fraɪz]', phonicsSound: '', exampleSentence: 'some fries', exampleZh: '一些薯條' },
    { en: 'pizza', zh: '披薩', image: '🍕', phonics: '', kk: '[ˈpitsə]', phonicsSound: '', exampleSentence: 'a pizza', exampleZh: '一個披薩' },
    { en: 'cola', zh: '可樂', image: '🥤', phonics: '', kk: '[ˈkolə]', phonicsSound: '', exampleSentence: 'a cola', exampleZh: '一杯可樂' },
    { en: 'cake', zh: '蛋糕', image: '🍰', phonics: '', kk: '[kek]', phonicsSound: '', exampleSentence: 'a piece of cake', exampleZh: '一塊蛋糕' },
    { en: 'tea', zh: '茶', image: '🍵', phonics: '', kk: '[ti]', phonicsSound: '', exampleSentence: 'a cup of tea', exampleZh: '一杯茶' },
    { en: 'coffee', zh: '咖啡', image: '☕', phonics: '', kk: '[ˈkɔfi]', phonicsSound: '', exampleSentence: 'a cup of coffee', exampleZh: '一杯咖啡' },
    { en: 'noodles', zh: '麵', image: '🍜', phonics: '', kk: '[ˈnudl̩z]', phonicsSound: '', exampleSentence: 'hot noodles', exampleZh: '熱麵' },
    { en: 'rice', zh: '飯', image: '🍚', phonics: '', kk: '[raɪs]', phonicsSound: '', exampleSentence: 'a bowl of rice', exampleZh: '一碗飯' },
    { en: 'dessert', zh: '甜點', image: '🍨', phonics: '', kk: '[dɪˈzɝt]', phonicsSound: '', exampleSentence: 'for dessert', exampleZh: '當甜點' },
  ],
  sentences: [
    { en: "I'd like a hamburger and fries.", zh: '我想要漢堡和薯條。' }, { en: 'Can I have pizza and a cola?', zh: '可以給我披薩和可樂嗎？' }, { en: 'What would you like to drink?', zh: '你想喝什麼？' }, { en: "I'd like some tea, please.", zh: '我想要一些茶。' }, { en: 'For dessert, I want cake.', zh: '甜點我想要蛋糕。' }, { en: 'The food is delicious!', zh: '食物好好吃！' },
  ],
  phonicsLetters: ['food & drinks'],
  warmUpQuestions: [
    { type: 'match', question: '🍔 是什麼？', options: ['hamburger', 'pizza', 'cake', 'tea'], answer: 'hamburger' },
    { type: 'match', question: '🍟 是什麼？', options: ['fries', 'rice', 'noodles', 'cola'], answer: 'fries' },
    { type: 'match', question: '🍵 是什麼？', options: ['tea', 'coffee', 'cola', 'juice'], answer: 'tea' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的食物', options: ['🍔', '🍕', '🍰', '🍜'], answer: '🍜', image: '🎧' },
    { type: 'match', question: '配對：食物配圖', options: ['pizza-🍕', 'cake-🍰', 'tea-🍵', 'rice-🍚'], answer: 'pizza-🍕' },
    { type: 'fill-blank', question: "句型代換：I'd like a ___.（漢堡）", options: ['hamburger', 'please', 'menu', 'is'], answer: 'hamburger' },
    { type: 'spell', question: '拼拼看：pi _ za（披薩）', answer: 'pizza', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ["I'd like a hamburger and fries.", 'Can I have pizza and a cola?', 'For dessert, I want cake.', 'The food is delicious!'], answer: "I'd like a hamburger and fries.", image: '🎧' },
    { type: 'read', question: 'What does Ruby want for dessert?（Ruby 甜點想要什麼？）', passage: 'Benny orders a hamburger.\nCoco orders pizza.\nFor dessert, Ruby wants cake and tea.', options: ['cake and tea', 'pizza', 'fries', 'noodles'], answer: 'cake and tea' },
  ],
  talkTimePrompts: ["Order a meal: I'd like ___ and ___.", "What do you want to drink?", "Order dessert!", "✍️ 引導寫作：For lunch, I'd like ___. For dessert, I'd like ___."],
  reviewQuiz: [
    { type: 'match', question: '☕ 是什麼？', options: ['coffee', 'tea', 'cola', 'juice'], answer: 'coffee' },
    { type: 'fill-blank', question: 'Can I ___ a pizza?（有·點餐）', options: ['have', 'am', 'is', 'do'], answer: 'have' },
    { type: 'spell', question: '拼拼看：c _ ke（蛋糕）', answer: 'cake', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "I'd like a hamburger and fries!", lineZh: '我想要漢堡和薯條！' },
    { speaker: 'Coco', line: "Can I have pizza and a cola?", lineZh: '可以給我披薩和可樂嗎？' },
    { speaker: 'Ruby', line: "For dessert, I'd like cake and tea!", lineZh: '甜點我想要蛋糕和茶！' },
    { speaker: 'Benny', line: "Yummy! We ordered a big meal!", lineZh: '好吃！我們點了一大餐！' },
  ],
};

const L6_M8: Mission = {
  id: 8, slug: 'l6-m8-directions', level: 6, title: '問路', titleEn: 'Asking Directions', theme: '燈塔角・找路', themeEmoji: '🗺️',
  focus: '句型 Where is the…? / How do I get to…?（問路）',
  story: [
    { image: '🗺️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Excuse me, where is the park?", dialogueZh: '不好意思，公園在哪裡？', highlightWords: ['Where is'], sceneEmojis: ['🗺️', '🏞️', '✨'], animation: 'wave' },
    { image: '🏦', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "How do I get to the bank?", dialogueZh: '我要怎麼去銀行？', highlightWords: ['How do I get to'], sceneEmojis: ['🏦', '❓', '😊'], animation: 'bounce' },
    { image: '🏥', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "The hospital is near the school!", dialogueZh: '醫院在學校附近！', highlightWords: ['near'], sceneEmojis: ['🏥', '🏫', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Now you can ask for directions!", dialogueZh: '現在你會問路了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🗺️'], animation: 'bounce' },
  ],
  words: [
    { en: 'where', zh: '哪裡', image: '🗺️', phonics: '', kk: '[wɛr]', phonicsSound: '', exampleSentence: 'Where is the park?', exampleZh: '公園在哪？' },
    { en: 'park', zh: '公園', image: '🏞️', phonics: '', kk: '[pɑrk]', phonicsSound: '', exampleSentence: 'the park', exampleZh: '公園' },
    { en: 'bank', zh: '銀行', image: '🏦', phonics: '', kk: '[bæŋk]', phonicsSound: '', exampleSentence: 'the bank', exampleZh: '銀行' },
    { en: 'hospital', zh: '醫院', image: '🏥', phonics: '', kk: '[ˈhɑspɪtl̩]', phonicsSound: '', exampleSentence: 'the hospital', exampleZh: '醫院' },
    { en: 'store', zh: '商店', image: '🏬', phonics: '', kk: '[stɔr]', phonicsSound: '', exampleSentence: 'the store', exampleZh: '商店' },
    { en: 'library', zh: '圖書館', image: '📚', phonics: '', kk: '[ˈlaɪˌbrɛri]', phonicsSound: '', exampleSentence: 'the library', exampleZh: '圖書館' },
    { en: 'street', zh: '街道', image: '🛣️', phonics: '', kk: '[strit]', phonicsSound: '', exampleSentence: 'on Main Street', exampleZh: '在大街上' },
    { en: 'near', zh: '附近', image: '📍', phonics: '', kk: '[nɪr]', phonicsSound: '', exampleSentence: 'near the school', exampleZh: '在學校附近' },
    { en: 'far', zh: '遠', image: '🔭', phonics: '', kk: '[fɑr]', phonicsSound: '', exampleSentence: 'It is far.', exampleZh: '很遠。' },
    { en: 'map', zh: '地圖', image: '🗺️', phonics: '', kk: '[mæp]', phonicsSound: '', exampleSentence: 'Look at the map.', exampleZh: '看地圖。' },
  ],
  sentences: [
    { en: 'Where is the park?', zh: '公園在哪裡？' }, { en: 'How do I get to the bank?', zh: '我怎麼去銀行？' }, { en: 'It is near the school.', zh: '它在學校附近。' }, { en: 'Is it far?', zh: '很遠嗎？' }, { en: 'No, it is near.', zh: '不，很近。' }, { en: 'Excuse me, where is the library?', zh: '不好意思，圖書館在哪？' },
  ],
  phonicsLetters: ['Where is…?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ is the park?（哪裡）', options: ['Where', 'What', 'Who', 'How'], answer: 'Where' },
    { type: 'match', question: '🏦 是什麼？', options: ['bank', 'park', 'store', 'hospital'], answer: 'bank' },
    { type: 'match', question: 'near 的相反是？', options: ['far', 'store', 'street', 'map'], answer: 'far' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的地方', options: ['🏞️', '🏦', '🏥', '📚'], answer: '🏥', image: '🎧' },
    { type: 'match', question: '配對：地方配圖', options: ['park-🏞️', 'bank-🏦', 'hospital-🏥', 'library-📚'], answer: 'park-🏞️' },
    { type: 'fill-blank', question: 'The park is ___ the school.（附近）', options: ['near', 'far', 'where', 'map'], answer: 'near' },
    { type: 'spell', question: '拼拼看：ba _ k（銀行）', answer: 'bank', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Where is the park?', 'How do I get to the bank?', 'It is near the school.', 'Is it far?'], answer: 'Where is the park?', image: '🎧' },
    { type: 'read', question: 'Where is the hospital?（醫院在哪？）', passage: 'Coco wants to find the hospital.\n"Where is the hospital?"\n"It is near the school."', options: ['near the school', 'near the park', 'far away', 'on the beach'], answer: 'near the school' },
  ],
  talkTimePrompts: ["Ask: Where is the ___?", "Ask: How do I get to the ___?", "Say: It is near / far.", "✍️ 引導寫作：The ___ is near the ___."],
  reviewQuiz: [
    { type: 'match', question: '📚 是什麼？', options: ['library', 'bank', 'store', 'park'], answer: 'library' },
    { type: 'fill-blank', question: '___ do I get to the bank?（怎麼）', options: ['How', 'Where', 'What', 'Who'], answer: 'How' },
    { type: 'spell', question: '拼拼看：n _ ar（附近）', answer: 'near', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "Excuse me, where is the park?", lineZh: '不好意思，公園在哪？' },
    { speaker: 'Benny', line: "How do I get to the bank?", lineZh: '我要怎麼去銀行？' },
    { speaker: 'Polly', line: "The hospital is near the school!", lineZh: '醫院在學校附近！' },
    { speaker: 'Coco', line: "Now you can ask for directions!", lineZh: '現在你會問路了！' },
  ],
};

const L6_M9: Mission = {
  id: 9, slug: 'l6-m9-turn-left', level: 6, title: '方位指路', titleEn: 'Turn left / right', theme: '燈塔角・怎麼走', themeEmoji: '🧭',
  focus: '指路方位：turn left/right, go straight, in front of',
  story: [
    { image: '🧭', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Go straight and turn left!", dialogueZh: '直走然後左轉！', highlightWords: ['straight', 'left'], sceneEmojis: ['⬆️', '⬅️', '✨'], animation: 'wave' },
    { image: '➡️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Turn right at the corner.", dialogueZh: '在轉角右轉。', highlightWords: ['right', 'corner'], sceneEmojis: ['➡️', '📐', '😊'], animation: 'bounce' },
    { image: '🏪', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "The shop is in front of the park!", dialogueZh: '商店在公園前面！', highlightWords: ['in front of'], sceneEmojis: ['🏪', '🏞️', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Left, right, straight — you found it!", dialogueZh: '左、右、直走 —— 你找到了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🧭'], animation: 'bounce' },
  ],
  words: [
    { en: 'left', zh: '左', image: '⬅️', phonics: '', kk: '[lɛft]', phonicsSound: '', exampleSentence: 'Turn left.', exampleZh: '左轉。' },
    { en: 'right', zh: '右', image: '➡️', phonics: '', kk: '[raɪt]', phonicsSound: '', exampleSentence: 'Turn right.', exampleZh: '右轉。' },
    { en: 'straight', zh: '直直地', image: '⬆️', phonics: '', kk: '[stret]', phonicsSound: '', exampleSentence: 'Go straight.', exampleZh: '直走。' },
    { en: 'turn', zh: '轉', image: '🔄', phonics: '', kk: '[tɝn]', phonicsSound: '', exampleSentence: 'Turn left.', exampleZh: '左轉。' },
    { en: 'go', zh: '走·去', image: '🚶', phonics: '', kk: '[ɡo]', phonicsSound: '', exampleSentence: 'Go straight.', exampleZh: '直走。' },
    { en: 'stop', zh: '停', image: '🛑', phonics: '', kk: '[stɑp]', phonicsSound: '', exampleSentence: 'Stop here.', exampleZh: '在這裡停。' },
    { en: 'corner', zh: '轉角', image: '📐', phonics: '', kk: '[ˈkɔrnɚ]', phonicsSound: '', exampleSentence: 'at the corner', exampleZh: '在轉角' },
    { en: 'in front of', zh: '在…前面', image: '⏭️', phonics: '', kk: '[ɪn frʌnt ʌv]', phonicsSound: '', exampleSentence: 'in front of the park', exampleZh: '在公園前面' },
    { en: 'behind', zh: '在…後面', image: '🔙', phonics: '', kk: '[bɪˈhaɪnd]', phonicsSound: '', exampleSentence: 'behind the shop', exampleZh: '在店後面' },
    { en: 'between', zh: '在…之間', image: '↔️', phonics: '', kk: '[bɪˈtwin]', phonicsSound: '', exampleSentence: 'between the two shops', exampleZh: '在兩店之間' },
  ],
  sentences: [
    { en: 'Go straight.', zh: '直走。' }, { en: 'Turn left at the corner.', zh: '在轉角左轉。' }, { en: 'Turn right.', zh: '右轉。' }, { en: 'The shop is in front of the park.', zh: '商店在公園前面。' }, { en: 'How do I get there?', zh: '我要怎麼到那裡？' }, { en: 'It is between the bank and the store.', zh: '它在銀行和商店之間。' },
  ],
  phonicsLetters: ['turn left/right'],
  warmUpQuestions: [
    { type: 'match', question: '⬅️ 是哪個方向？', options: ['left', 'right', 'straight', 'stop'], answer: 'left' },
    { type: 'match', question: '➡️ 是哪個方向？', options: ['right', 'left', 'straight', 'turn'], answer: 'right' },
    { type: 'fill-blank', question: 'Go ___ and turn left.（直走）', options: ['straight', 'stop', 'corner', 'behind'], answer: 'straight' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的方向', options: ['⬅️', '➡️', '⬆️', '🛑'], answer: '🛑', image: '🎧' },
    { type: 'match', question: '配對：方位配意思', options: ['left-左', 'right-右', 'straight-直', 'corner-轉角'], answer: 'left-左' },
    { type: 'fill-blank', question: '句型代換：Turn ___ at the corner.（右）', options: ['right', 'left', 'stop', 'go'], answer: 'right' },
    { type: 'fill-blank', question: 'The shop is ___ the park.（前面）', options: ['in front of', 'behind', 'between', 'turn'], answer: 'in front of' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Go straight.', 'Turn left at the corner.', 'Turn right.', 'How do I get there?'], answer: 'Go straight.', image: '🎧' },
    { type: 'read', question: 'How do you get to the shop?（怎麼到商店？）', passage: 'Go straight for two streets.\nTurn left at the corner.\nThe shop is in front of the park.', options: ['go straight, then turn left', 'turn right, then stop', 'go behind the park', 'turn right at the bank'], answer: 'go straight, then turn left' },
  ],
  talkTimePrompts: ["Give directions: Go straight. Turn ___.", "Say where something is: in front of / behind.", "Ask: How do I get there?", "✍️ 引導寫作：Go straight, then turn ___. It is ___ the ___."],
  reviewQuiz: [
    { type: 'match', question: '🛑 是什麼？', options: ['stop', 'go', 'turn', 'left'], answer: 'stop' },
    { type: 'fill-blank', question: 'Turn ___ at the corner.（左）', options: ['left', 'right', 'straight', 'stop'], answer: 'left' },
    { type: 'match', question: 'between 是什麼意思？', options: ['在…之間', '在…前面', '在…後面', '轉角'], answer: '在…之間' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "Go straight and turn left!", lineZh: '直走然後左轉！' },
    { speaker: 'Coco', line: "Turn right at the corner.", lineZh: '在轉角右轉。' },
    { speaker: 'Polly', line: "The shop is in front of the park!", lineZh: '商店在公園前面！' },
    { speaker: 'Benny', line: "Left, right, straight — you found it!", lineZh: '左、右、直走 —— 你找到了！' },
  ],
};

const L6_M10: Mission = {
  id: 10, slug: 'l6-m10-review-order-directions', level: 6, title: 'Review② 點餐問路', titleEn: 'Review: Order & Directions', theme: '燈塔角・複習關', themeEmoji: '🔄',
  focus: '螺旋複習②：點餐 Can I have ＋ 問路 Where is ＋ 方位 turn left/right',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "Let's review! Order food and find the way!", dialogueZh: '來複習！點餐和找路！', highlightWords: [], sceneEmojis: ['🔄', '🍽️', '✨'], animation: 'wave' },
    { image: '🍽️', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Can I have a hamburger, please?", dialogueZh: '可以給我漢堡嗎？', highlightWords: ['Can I have'], sceneEmojis: ['🍔', '🙏', '😊'], animation: 'bounce' },
    { image: '🗺️', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Where is the park? Go straight and turn left!", dialogueZh: '公園在哪？直走然後左轉！', highlightWords: ['Where is', 'straight', 'left'], sceneEmojis: ['🗺️', '⬅️', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You can order and find your way! Great!", dialogueZh: '你會點餐也會找路了！太棒了！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: "I'd like", zh: '我想要', image: '🙋', phonics: '', kk: '[aɪd laɪk]', phonicsSound: '', exampleSentence: "I'd like soup.", exampleZh: '我想要湯。' },
    { en: 'menu', zh: '菜單', image: '📋', phonics: '', kk: '[ˈmɛnju]', phonicsSound: '', exampleSentence: 'Can I have a menu?', exampleZh: '可以給我菜單嗎？' },
    { en: 'hamburger', zh: '漢堡', image: '🍔', phonics: '', kk: '[ˈhæmbɝɡɚ]', phonicsSound: '', exampleSentence: 'a hamburger', exampleZh: '一個漢堡' },
    { en: 'where', zh: '哪裡', image: '🗺️', phonics: '', kk: '[wɛr]', phonicsSound: '', exampleSentence: 'Where is it?', exampleZh: '它在哪？' },
    { en: 'park', zh: '公園', image: '🏞️', phonics: '', kk: '[pɑrk]', phonicsSound: '', exampleSentence: 'the park', exampleZh: '公園' },
    { en: 'left', zh: '左', image: '⬅️', phonics: '', kk: '[lɛft]', phonicsSound: '', exampleSentence: 'Turn left.', exampleZh: '左轉。' },
    { en: 'right', zh: '右', image: '➡️', phonics: '', kk: '[raɪt]', phonicsSound: '', exampleSentence: 'Turn right.', exampleZh: '右轉。' },
    { en: 'straight', zh: '直直地', image: '⬆️', phonics: '', kk: '[stret]', phonicsSound: '', exampleSentence: 'Go straight.', exampleZh: '直走。' },
    { en: 'near', zh: '附近', image: '📍', phonics: '', kk: '[nɪr]', phonicsSound: '', exampleSentence: 'near the school', exampleZh: '在學校附近' },
    { en: 'please', zh: '請', image: '🙏', phonics: '', kk: '[pliz]', phonicsSound: '', exampleSentence: 'Water, please.', exampleZh: '請給我水。' },
  ],
  sentences: [
    { en: 'Can I have a hamburger, please?', zh: '可以給我漢堡嗎？' }, { en: "I'd like some juice.", zh: '我想要一些果汁。' }, { en: 'Where is the park?', zh: '公園在哪？' }, { en: 'Go straight and turn left.', zh: '直走然後左轉。' }, { en: 'It is near the bank.', zh: '它在銀行附近。' }, { en: 'Thank you very much!', zh: '非常謝謝！' },
  ],
  phonicsLetters: ['review'],
  warmUpQuestions: [
    { type: 'fill-blank', question: '___ I have a menu?（可以）', options: ['Can', 'Do', 'Are', 'Is'], answer: 'Can' },
    { type: 'fill-blank', question: '___ is the park?（哪裡）', options: ['Where', 'What', 'Who', 'How'], answer: 'Where' },
    { type: 'match', question: '⬅️ 是哪個方向？', options: ['left', 'right', 'straight', 'stop'], answer: 'left' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🍔', '📋', '🗺️', '⬅️'], answer: '🗺️', image: '🎧' },
    { type: 'fill-blank', question: "句型代換：I'd like a ___.（漢堡）", options: ['hamburger', 'where', 'left', 'is'], answer: 'hamburger' },
    { type: 'fill-blank', question: 'Go straight and turn ___.（右）', options: ['right', 'menu', 'near', 'please'], answer: 'right' },
    { type: 'spell', question: '拼拼看：str _ ight（直）', answer: 'straight', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Can I have a hamburger, please?', 'Where is the park?', 'Go straight and turn left.', 'It is near the bank.'], answer: 'Can I have a hamburger, please?', image: '🎧' },
    { type: 'read', question: 'How do you get to the park?（怎麼到公園？）', passage: 'Coco asks, "Where is the park?"\nBenny says, "Go straight and turn left.\nIt is near the bank."', options: ['go straight and turn left', 'turn right and stop', 'go behind the school', 'it is far away'], answer: 'go straight and turn left' },
  ],
  talkTimePrompts: ["Order food and drinks.", "Ask and give directions.", "Role-play: customer and waiter.", "✍️ 引導寫作：I'd like ___. The park is ___ and turn ___."],
  reviewQuiz: [
    { type: 'fill-blank', question: "___ like a pizza.（我想要）", options: ["I'd", 'I', 'Can', 'Do'], answer: "I'd" },
    { type: 'fill-blank', question: 'Turn ___ at the corner.（左）', options: ['left', 'right', 'straight', 'near'], answer: 'left' },
    { type: 'read', question: 'Is the park far?（公園遠嗎？）', passage: 'Where is the park?\nGo straight and turn left.\nIt is near — not far!', options: ['No, it is near', 'Yes, it is far', 'It is closed', 'It is behind'], answer: 'No, it is near' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's review! Order food and find the way!", lineZh: '來複習！點餐和找路！' },
    { speaker: 'Coco', line: "Can I have a hamburger, please?", lineZh: '可以給我漢堡嗎？' },
    { speaker: 'Benny', line: "Where is the park? Go straight and turn left!", lineZh: '公園在哪？直走左轉！' },
    { speaker: 'Finn', line: "You can order and find your way! Great!", lineZh: '你會點餐也會找路了！太棒了！' },
  ],
};

const L6_M11: Mission = {
  id: 11, slug: 'l6-m11-invitations', level: 6, title: '邀約', titleEn: "Let's… / Do you want to…?", theme: '燈塔角・一起玩', themeEmoji: '🙌',
  focus: '句型 Let\'s… / Do you want to…?（邀約）',
  story: [
    { image: '🙌', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Let's go to the beach!", dialogueZh: '我們去海邊吧！', highlightWords: ["Let's"], sceneEmojis: ['🏖️', '🙌', '✨'], animation: 'wave' },
    { image: '🏊', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "Do you want to swim with me?", dialogueZh: '你想跟我游泳嗎？', highlightWords: ['Do you want to'], sceneEmojis: ['🏊', '❓', '😊'], animation: 'bounce' },
    { image: '👍', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Sure! Let's play together!", dialogueZh: '好啊！我們一起玩！', highlightWords: ["Let's"], sceneEmojis: ['👍', '🤝', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'star', characterName: 'Polly', dialogue: "Now you can invite your friends!", dialogueZh: '現在你會邀請朋友了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '🙌'], animation: 'bounce' },
  ],
  words: [
    { en: "let's", zh: '我們來…吧', image: '🙌', phonics: '', kk: '[lɛts]', phonicsSound: '', exampleSentence: "Let's go!", exampleZh: '我們走吧！' },
    { en: 'want', zh: '想要', image: '🙋', phonics: '', kk: '[wɑnt]', phonicsSound: '', exampleSentence: 'Do you want to play?', exampleZh: '你想玩嗎？' },
    { en: 'go', zh: '去', image: '🚶', phonics: '', kk: '[ɡo]', phonicsSound: '', exampleSentence: "Let's go.", exampleZh: '我們走吧。' },
    { en: 'play', zh: '玩', image: '🎮', phonics: '', kk: '[ple]', phonicsSound: '', exampleSentence: "Let's play.", exampleZh: '我們來玩。' },
    { en: 'swim', zh: '游泳', image: '🏊', phonics: '', kk: '[swɪm]', phonicsSound: '', exampleSentence: 'Do you want to swim?', exampleZh: '你想游泳嗎？' },
    { en: 'come', zh: '來', image: '👋', phonics: '', kk: '[kʌm]', phonicsSound: '', exampleSentence: 'Come with me!', exampleZh: '跟我來！' },
    { en: 'join', zh: '加入', image: '🤝', phonics: '', kk: '[dʒɔɪn]', phonicsSound: '', exampleSentence: 'Join us!', exampleZh: '加入我們！' },
    { en: 'together', zh: '一起', image: '👫', phonics: '', kk: '[təˈɡɛðɚ]', phonicsSound: '', exampleSentence: 'play together', exampleZh: '一起玩' },
    { en: 'sure', zh: '好啊·當然', image: '👍', phonics: '', kk: '[ʃʊr]', phonicsSound: '', exampleSentence: 'Sure!', exampleZh: '好啊！' },
    { en: 'sorry', zh: '抱歉', image: '🙇', phonics: '', kk: '[ˈsɑri]', phonicsSound: '', exampleSentence: "Sorry, I can't.", exampleZh: '抱歉，我不行。' },
  ],
  sentences: [
    { en: "Let's go to the beach!", zh: '我們去海邊吧！' }, { en: 'Do you want to swim?', zh: '你想游泳嗎？' }, { en: "Sure! Let's play!", zh: '好啊！我們玩吧！' }, { en: 'Do you want to come?', zh: '你想來嗎？' }, { en: "Let's play together.", zh: '我們一起玩。' }, { en: "Sorry, I can't today.", zh: '抱歉，我今天不行。' },
  ],
  phonicsLetters: ["Let's…"],
  warmUpQuestions: [
    { type: 'fill-blank', question: "___ go to the beach!（我們來…吧）", options: ["Let's", 'Do', 'Can', 'Are'], answer: "Let's" },
    { type: 'fill-blank', question: 'Do you ___ to swim?（想要）', options: ['want', 'like', 'go', 'is'], answer: 'want' },
    { type: 'match', question: '👍 sure 是什麼意思？', options: ['好啊', '抱歉', '不要', '再見'], answer: '好啊' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🏊', '🎮', '🚶', '🤝'], answer: '🤝', image: '🎧' },
    { type: 'match', question: '配對：字配意思', options: ["let's-我們來吧", 'want-想要', 'join-加入', 'together-一起'], answer: "let's-我們來吧" },
    { type: 'fill-blank', question: '句型代換：Do you want to ___?（游泳）', options: ['swim', "let's", 'sure', 'is'], answer: 'swim' },
    { type: 'fill-blank', question: "___ play together!（我們來…吧）", options: ["Let's", 'Do', 'Can', 'Want'], answer: "Let's" },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ["Let's go to the beach!", 'Do you want to swim?', "Sure! Let's play!", "Let's play together."], answer: "Let's go to the beach!", image: '🎧' },
    { type: 'read', question: 'What does Coco want to do?（Coco 想做什麼？）', passage: 'Polly says, "Let\'s go to the beach!"\nCoco says, "Do you want to swim?"\nBenny says, "Sure! Let\'s swim together!"', options: ['swim', 'sleep', 'read', 'eat'], answer: 'swim' },
  ],
  talkTimePrompts: ["Invite a friend: Let's ___!", "Ask: Do you want to ___?", "Answer: Sure! / Sorry, I can't.", "✍️ 引導寫作：Let's ___ together! Do you want to ___?"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'Do you want ___ play?（不定詞 to）', options: ['to', 'and', 'the', 'a'], answer: 'to' },
    { type: 'match', question: 'together 是什麼意思？', options: ['一起', '好啊', '抱歉', '想要'], answer: '一起' },
    { type: 'fill-blank', question: "___ swim!（我們來…吧）", options: ["Let's", 'Do', 'Are', 'Is'], answer: "Let's" },
  ],
  videoScript: [
    { speaker: 'Polly', line: "Let's go to the beach!", lineZh: '我們去海邊吧！' },
    { speaker: 'Coco', line: "Do you want to swim with me?", lineZh: '你想跟我游泳嗎？' },
    { speaker: 'Benny', line: "Sure! Let's play together!", lineZh: '好啊！我們一起玩！' },
    { speaker: 'Polly', line: "Now you can invite your friends!", lineZh: '現在你會邀請朋友了！' },
  ],
};

const L6_M12: Mission = {
  id: 12, slug: 'l6-m12-feelings', level: 6, title: '感受', titleEn: 'Feelings', theme: '燈塔角・心情', themeEmoji: '😲',
  focus: '進階感受形容詞：excited/scared/bored/surprised…',
  story: [
    { image: '🤩', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "I am so excited! We are going to the beach!", dialogueZh: '我好興奮！我們要去海邊了！', highlightWords: ['excited'], sceneEmojis: ['🤩', '🏖️', '✨'], animation: 'bounce' },
    { image: '😱', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "The big wave is scary! I am scared!", dialogueZh: '大浪好可怕！我好害怕！', highlightWords: ['scared'], sceneEmojis: ['🌊', '😱', '😊'], animation: 'shake' },
    { image: '😲', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "A dolphin! I am surprised!", dialogueZh: '一隻海豚！我好驚訝！', highlightWords: ['surprised'], sceneEmojis: ['🐬', '😲', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐱', characterKey: 'coco', characterAction: 'wave', characterName: 'Coco', dialogue: "You can talk about your feelings now!", dialogueZh: '現在你會說你的感受了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '😲'], animation: 'bounce' },
  ],
  words: [
    { en: 'excited', zh: '興奮的', image: '🤩', phonics: '', kk: '[ɪkˈsaɪtɪd]', phonicsSound: '', exampleSentence: 'I am excited!', exampleZh: '我好興奮！' },
    { en: 'scared', zh: '害怕的', image: '😱', phonics: '', kk: '[skɛrd]', phonicsSound: '', exampleSentence: 'I am scared.', exampleZh: '我好害怕。' },
    { en: 'bored', zh: '無聊的', image: '😑', phonics: '', kk: '[bɔrd]', phonicsSound: '', exampleSentence: 'I am bored.', exampleZh: '我好無聊。' },
    { en: 'surprised', zh: '驚訝的', image: '😲', phonics: '', kk: '[sɚˈpraɪzd]', phonicsSound: '', exampleSentence: 'I am surprised!', exampleZh: '我好驚訝！' },
    { en: 'proud', zh: '驕傲的', image: '😌', phonics: '', kk: '[praʊd]', phonicsSound: '', exampleSentence: 'I am proud.', exampleZh: '我很驕傲。' },
    { en: 'nervous', zh: '緊張的', image: '😰', phonics: '', kk: '[ˈnɝvəs]', phonicsSound: '', exampleSentence: 'I am nervous.', exampleZh: '我好緊張。' },
    { en: 'shy', zh: '害羞的', image: '😳', phonics: '', kk: '[ʃaɪ]', phonicsSound: '', exampleSentence: 'I am shy.', exampleZh: '我很害羞。' },
    { en: 'worried', zh: '擔心的', image: '😟', phonics: '', kk: '[ˈwɝid]', phonicsSound: '', exampleSentence: 'I am worried.', exampleZh: '我很擔心。' },
    { en: 'excited', zh: '興奮的', image: '🎊', phonics: '', kk: '[ɪkˈsaɪtɪd]', phonicsSound: '', exampleSentence: 'so excited', exampleZh: '好興奮' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy.', exampleZh: '我很開心。' },
  ],
  sentences: [
    { en: 'I am so excited!', zh: '我好興奮！' }, { en: 'I am scared of the big wave.', zh: '我怕那個大浪。' }, { en: 'Why are you bored?', zh: '你為什麼無聊？' }, { en: 'I am surprised!', zh: '我好驚訝！' }, { en: 'Are you nervous?', zh: '你緊張嗎？' }, { en: 'I am proud of you!', zh: '我以你為傲！' },
  ],
  phonicsLetters: ['feelings'],
  warmUpQuestions: [
    { type: 'match', question: '🤩 是什麼感覺？', options: ['excited', 'scared', 'bored', 'shy'], answer: 'excited' },
    { type: 'match', question: '😱 是什麼感覺？', options: ['scared', 'proud', 'happy', 'bored'], answer: 'scared' },
    { type: 'match', question: '😲 是什麼感覺？', options: ['surprised', 'shy', 'nervous', 'bored'], answer: 'surprised' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的感覺', options: ['🤩', '😱', '😑', '😲'], answer: '😑', image: '🎧' },
    { type: 'match', question: '配對：感覺配圖', options: ['excited-🤩', 'scared-😱', 'bored-😑', 'surprised-😲'], answer: 'excited-🤩' },
    { type: 'fill-blank', question: '句型代換：I am ___.（驚訝）', options: ['surprised', 'excited', 'is', 'the'], answer: 'surprised' },
    { type: 'spell', question: '拼拼看：sc _ red（害怕）', answer: 'scared', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['I am so excited!', 'I am scared of the big wave.', 'I am surprised!', 'Are you nervous?'], answer: 'I am so excited!', image: '🎧' },
    { type: 'read', question: 'Why is Coco excited?（Coco 為何興奮？）', passage: 'Coco is going to the beach.\nShe loves the sea.\nShe is so excited!', options: ['going to the beach', 'going to school', 'she is scared', 'she is bored'], answer: 'going to the beach' },
  ],
  talkTimePrompts: ["How do you feel? I am ___.", "Say when you feel scared or excited.", "Ask: Are you nervous?", "✍️ 引導寫作：I am ___ because ___."],
  reviewQuiz: [
    { type: 'match', question: '😰 是什麼感覺？', options: ['nervous', 'excited', 'proud', 'shy'], answer: 'nervous' },
    { type: 'fill-blank', question: 'I am ___ of you!（驕傲）', options: ['proud', 'scared', 'bored', 'shy'], answer: 'proud' },
    { type: 'spell', question: '拼拼看：exc _ ted（興奮）', answer: 'excited', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Coco', line: "I am so excited! We are going to the beach!", lineZh: '我好興奮！我們要去海邊！' },
    { speaker: 'Benny', line: "The big wave is scary! I am scared!", lineZh: '大浪好可怕！我好害怕！' },
    { speaker: 'Ruby', line: "A dolphin! I am surprised!", lineZh: '一隻海豚！我好驚訝！' },
    { speaker: 'Coco', line: "You can talk about your feelings now!", lineZh: '現在你會說感受了！' },
  ],
};

const L6_M13: Mission = {
  id: 13, slug: 'l6-m13-long-reading-1', level: 6, title: '長文閱讀① 燈塔', titleEn: 'Reading: The Lighthouse', theme: '燈塔角・故事時間', themeEmoji: '📖',
  focus: '長文閱讀①：讀一篇關於燈塔的短文並回答問題',
  story: [
    { image: '📖', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Let's read a longer story: The Old Lighthouse.", dialogueZh: '我們讀一篇長故事：老燈塔。', highlightWords: ['story'], sceneEmojis: ['📖', '🏰', '✨'], animation: 'wave' },
    { image: '💡', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The old lighthouse is tall. Its light is very bright.", dialogueZh: '老燈塔很高。它的光很亮。', highlightWords: ['tall', 'bright'], sceneEmojis: ['💡', '🏰', '😊'], animation: 'bounce' },
    { image: '⛵', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "At night, it helps the boats find the way home.", dialogueZh: '晚上，它幫船找到回家的路。', highlightWords: ['helps'], sceneEmojis: ['⛵', '🌙', '🎉'], animation: 'float' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "You read a long story! Great reader!", dialogueZh: '你讀了長故事！了不起！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📖'], animation: 'bounce' },
  ],
  words: [
    { en: 'lighthouse', zh: '燈塔', image: '🏰', phonics: '', kk: '[ˈlaɪtˌhaʊs]', phonicsSound: '', exampleSentence: 'an old lighthouse', exampleZh: '一座老燈塔' },
    { en: 'light', zh: '光·燈', image: '💡', phonics: '', kk: '[laɪt]', phonicsSound: '', exampleSentence: 'a bright light', exampleZh: '明亮的光' },
    { en: 'bright', zh: '明亮的', image: '✨', phonics: '', kk: '[braɪt]', phonicsSound: '', exampleSentence: 'very bright', exampleZh: '很亮' },
    { en: 'boat', zh: '船', image: '⛵', phonics: '', kk: '[bot]', phonicsSound: '', exampleSentence: 'a small boat', exampleZh: '一艘小船' },
    { en: 'help', zh: '幫助', image: '🤝', phonics: '', kk: '[hɛlp]', phonicsSound: '', exampleSentence: 'It helps the boats.', exampleZh: '它幫助船。' },
    { en: 'night', zh: '夜晚', image: '🌙', phonics: '', kk: '[naɪt]', phonicsSound: '', exampleSentence: 'at night', exampleZh: '在晚上' },
    { en: 'sea', zh: '海', image: '🌊', phonics: '', kk: '[si]', phonicsSound: '', exampleSentence: 'across the sea', exampleZh: '越過海洋' },
    { en: 'home', zh: '家', image: '🏠', phonics: '', kk: '[hom]', phonicsSound: '', exampleSentence: 'find the way home', exampleZh: '找到回家的路' },
    { en: 'old', zh: '老的·舊的', image: '🕰️', phonics: '', kk: '[old]', phonicsSound: '', exampleSentence: 'the old lighthouse', exampleZh: '老燈塔' },
    { en: 'safe', zh: '安全的', image: '🛟', phonics: '', kk: '[sef]', phonicsSound: '', exampleSentence: 'They are safe.', exampleZh: '他們安全了。' },
  ],
  sentences: [
    { en: 'The old lighthouse is tall.', zh: '老燈塔很高。' }, { en: 'Its light is very bright.', zh: '它的光很亮。' }, { en: 'At night, it helps the boats.', zh: '晚上它幫助船。' }, { en: 'The boats find their way home.', zh: '船找到回家的路。' }, { en: 'The sailors are safe.', zh: '水手們安全了。' }, { en: 'The lighthouse is a good friend.', zh: '燈塔是個好朋友。' },
  ],
  phonicsLetters: ['long reading'],
  warmUpQuestions: [
    { type: 'match', question: '🏰 lighthouse 是什麼？', options: ['燈塔', '船', '海', '家'], answer: '燈塔' },
    { type: 'fill-blank', question: 'The light is very ___.（明亮）', options: ['bright', 'dark', 'old', 'small'], answer: 'bright' },
    { type: 'match', question: '⛵ 是什麼？', options: ['boat', 'light', 'home', 'sea'], answer: 'boat' },
  ],
  challenges: [
    { type: 'read', question: 'How is the lighthouse?（燈塔怎麼樣？）', passage: 'The old lighthouse stands by the sea.\nIt is very tall.\nIts light is bright.', options: ['tall and bright', 'small and dark', 'new and short', 'dirty and old'], answer: 'tall and bright' },
    { type: 'read', question: 'What does the lighthouse do at night?（燈塔晚上做什麼？）', passage: 'At night, the sea is dark.\nThe lighthouse shines its bright light.\nIt helps the boats find the way.', options: ['helps the boats', 'sleeps', 'goes home', 'plays'], answer: 'helps the boats' },
    { type: 'read', question: 'How do the sailors feel?（水手覺得如何？）', passage: 'The boats see the bright light.\nThey find their way home.\nThe sailors are safe and happy.', options: ['safe and happy', 'scared', 'lost', 'sad'], answer: 'safe and happy' },
    { type: 'fill-blank', question: 'The lighthouse ___ the boats.（幫助·第三人稱）', options: ['helps', 'help', 'helped', 'helping'], answer: 'helps' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Its light is very bright.', 'The old lighthouse is tall.', 'At night, it helps the boats.', 'The sailors are safe.'], answer: 'Its light is very bright.', image: '🎧' },
    { type: 'spell', question: '拼拼看：li _ ht（光）', answer: 'light', image: '✍️' },
  ],
  talkTimePrompts: ["Retell the lighthouse story.", "What does the lighthouse do?", "Why is it important?", "✍️ 引導寫作：The lighthouse is ___. It helps ___."],
  reviewQuiz: [
    { type: 'read', question: 'Is the sea dark at night?（晚上海是暗的嗎？）', passage: 'At night, the sea is dark.\nBut the lighthouse light is bright.\nThe boats are safe.', options: ['Yes, but the light is bright', 'No, it is sunny', 'The sea is red', 'It is morning'], answer: 'Yes, but the light is bright' },
    { type: 'match', question: 'safe 是什麼意思？', options: ['安全的', '害怕的', '明亮的', '老的'], answer: '安全的' },
    { type: 'fill-blank', question: 'The boats find their way ___.（家）', options: ['home', 'sea', 'light', 'night'], answer: 'home' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A story: The Old Lighthouse!", lineZh: '故事：老燈塔！' },
    { speaker: 'Finn', line: "The old lighthouse is tall. Its light is bright.", lineZh: '老燈塔很高。它的光很亮。' },
    { speaker: 'Coco', line: "At night, it helps the boats find the way home.", lineZh: '晚上它幫船找到回家的路。' },
    { speaker: 'Benny', line: "You read a long story! Great reader!", lineZh: '你讀了長故事！了不起！' },
  ],
};

const L6_M14: Mission = {
  id: 14, slug: 'l6-m14-long-reading-2', level: 6, title: '長文閱讀② 市場日', titleEn: 'Reading: Market Day', theme: '燈塔角・故事時間', themeEmoji: '📚',
  focus: '長文閱讀②：讀一篇市場日的短文並回答問題',
  story: [
    { image: '📚', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "A new story: Market Day!", dialogueZh: '新故事：市場日！', highlightWords: ['story'], sceneEmojis: ['📚', '🛍️', '✨'], animation: 'wave' },
    { image: '🍎', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "On Saturday, Ruby goes to the market.", dialogueZh: '星期六，Ruby 去市場。', highlightWords: ['market'], sceneEmojis: ['🍎', '🛒', '😊'], animation: 'bounce' },
    { image: '💰', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "She buys cheap apples. They are only two dollars!", dialogueZh: '她買便宜的蘋果。只要兩塊錢！', highlightWords: ['cheap', 'dollars'], sceneEmojis: ['💰', '🍎', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "You read another story! Wonderful!", dialogueZh: '你又讀了一篇故事！太棒了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '📚'], animation: 'bounce' },
  ],
  words: [
    { en: 'market', zh: '市場', image: '🛍️', phonics: '', kk: '[ˈmɑrkɪt]', phonicsSound: '', exampleSentence: 'go to the market', exampleZh: '去市場' },
    { en: 'buy', zh: '買', image: '🛒', phonics: '', kk: '[baɪ]', phonicsSound: '', exampleSentence: 'She buys apples.', exampleZh: '她買蘋果。' },
    { en: 'cheap', zh: '便宜的', image: '💵', phonics: '', kk: '[tʃip]', phonicsSound: '', exampleSentence: 'cheap apples', exampleZh: '便宜的蘋果' },
    { en: 'apple', zh: '蘋果', image: '🍎', phonics: '', kk: '[ˈæpl̩]', phonicsSound: '', exampleSentence: 'red apples', exampleZh: '紅蘋果' },
    { en: 'basket', zh: '籃子', image: '🧺', phonics: '', kk: '[ˈbæskɪt]', phonicsSound: '', exampleSentence: 'a full basket', exampleZh: '一個滿籃子' },
    { en: 'dollar', zh: '元', image: '💵', phonics: '', kk: '[ˈdɑlɚ]', phonicsSound: '', exampleSentence: 'two dollars', exampleZh: '兩塊錢' },
    { en: 'fresh', zh: '新鮮的', image: '🥬', phonics: '', kk: '[frɛʃ]', phonicsSound: '', exampleSentence: 'fresh fruit', exampleZh: '新鮮水果' },
    { en: 'fruit', zh: '水果', image: '🍇', phonics: '', kk: '[frut]', phonicsSound: '', exampleSentence: 'sweet fruit', exampleZh: '甜水果' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'She is happy.', exampleZh: '她很開心。' },
    { en: 'Saturday', zh: '星期六', image: '📅', phonics: '', kk: '[ˈsætɚde]', phonicsSound: '', exampleSentence: 'on Saturday', exampleZh: '在星期六' },
  ],
  sentences: [
    { en: 'On Saturday, Ruby goes to the market.', zh: '星期六，Ruby 去市場。' }, { en: 'The fruit is fresh.', zh: '水果很新鮮。' }, { en: 'She buys cheap apples.', zh: '她買便宜的蘋果。' }, { en: 'They are only two dollars.', zh: '只要兩塊錢。' }, { en: 'Her basket is full.', zh: '她的籃子滿了。' }, { en: 'Ruby is very happy.', zh: 'Ruby 很開心。' },
  ],
  phonicsLetters: ['long reading'],
  warmUpQuestions: [
    { type: 'match', question: '🛍️ market 是什麼？', options: ['市場', '商店', '公園', '銀行'], answer: '市場' },
    { type: 'fill-blank', question: 'The apples are ___.（便宜）', options: ['cheap', 'expensive', 'old', 'dark'], answer: 'cheap' },
    { type: 'match', question: '🧺 是什麼？', options: ['basket', 'apple', 'fruit', 'market'], answer: 'basket' },
  ],
  challenges: [
    { type: 'read', question: 'When does Ruby go to the market?（Ruby 何時去市場？）', passage: 'On Saturday, Ruby goes to the market.\nThe market is big and busy.\nThe fruit is fresh.', options: ['Saturday', 'Monday', 'Sunday', 'Friday'], answer: 'Saturday' },
    { type: 'read', question: 'What does Ruby buy?（Ruby 買什麼？）', passage: 'Ruby looks at the fresh fruit.\nShe buys some cheap apples.\nThey are red and sweet.', options: ['apples', 'fish', 'a hat', 'a boat'], answer: 'apples' },
    { type: 'read', question: 'How much are the apples?（蘋果多少錢？）', passage: 'The apples are cheap.\nThey are only two dollars.\nRuby is very happy!', options: ['two dollars', 'five dollars', 'ten dollars', 'one dollar'], answer: 'two dollars' },
    { type: 'fill-blank', question: 'Ruby ___ some apples.（買·第三人稱）', options: ['buys', 'buy', 'bought', 'buying'], answer: 'buys' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['She buys cheap apples.', 'On Saturday, Ruby goes to the market.', 'The fruit is fresh.', 'Ruby is very happy.'], answer: 'She buys cheap apples.', image: '🎧' },
    { type: 'spell', question: '拼拼看：mar _ et（市場）', answer: 'market', image: '✍️' },
  ],
  talkTimePrompts: ["Retell the market story.", "What does Ruby buy?", "How much are the apples?", "✍️ 引導寫作：I go to the market. I buy ___. It is ___ dollars."],
  reviewQuiz: [
    { type: 'read', question: 'Are the apples expensive?（蘋果貴嗎？）', passage: 'The apples are only two dollars.\nThey are very cheap.\nRuby buys a lot!', options: ['No, they are cheap', 'Yes, they are expensive', 'They are free', 'They are old'], answer: 'No, they are cheap' },
    { type: 'match', question: 'fresh 是什麼意思？', options: ['新鮮的', '便宜的', '貴的', '開心的'], answer: '新鮮的' },
    { type: 'fill-blank', question: 'Her basket is ___.（滿的）', options: ['full', 'empty', 'small', 'old'], answer: 'full' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "A new story: Market Day!", lineZh: '新故事：市場日！' },
    { speaker: 'Ruby', line: "On Saturday, I go to the market.", lineZh: '星期六，我去市場。' },
    { speaker: 'Coco', line: "She buys cheap apples. Only two dollars!", lineZh: '她買便宜蘋果。只要兩塊！' },
    { speaker: 'Benny', line: "You read another story! Wonderful!", lineZh: '你又讀了一篇故事！太棒了！' },
  ],
};

const L6_M15: Mission = {
  id: 15, slug: 'l6-m15-review-reading', level: 6, title: 'Review③ 長文閱讀', titleEn: 'Review: Reading', theme: '燈塔角・複習關', themeEmoji: '🔄',
  focus: '螺旋複習③：長文閱讀 ＋ 描述 ＋ 意見 ＋ 感受',
  story: [
    { image: '🔄', character: '🦊', characterKey: 'finn', characterAction: 'read', characterName: 'Finn', dialogue: "Let's review our reading! Read and answer!", dialogueZh: '來複習閱讀！讀完回答！', highlightWords: [], sceneEmojis: ['🔄', '📖', '✨'], animation: 'wave' },
    { image: '🏰', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "The lighthouse is tall and bright. I think it is beautiful!", dialogueZh: '燈塔又高又亮。我覺得它很美！', highlightWords: ['bright', 'think'], sceneEmojis: ['🏰', '💡', '😊'], animation: 'bounce' },
    { image: '🛍️', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "At the market, the fruit is cheap and fresh!", dialogueZh: '在市場，水果又便宜又新鮮！', highlightWords: ['cheap', 'fresh'], sceneEmojis: ['🛍️', '🍎', '🎉'], animation: 'tada' },
    { image: '🏅', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You are a great reader now! Wonderful!", dialogueZh: '你現在是很棒的讀者了！太棒了！', highlightWords: [], sceneEmojis: ['🏅', '🎉', '🔄'], animation: 'bounce' },
  ],
  words: [
    { en: 'lighthouse', zh: '燈塔', image: '🏰', phonics: '', kk: '[ˈlaɪtˌhaʊs]', phonicsSound: '', exampleSentence: 'a tall lighthouse', exampleZh: '高燈塔' },
    { en: 'bright', zh: '明亮的', image: '💡', phonics: '', kk: '[braɪt]', phonicsSound: '', exampleSentence: 'bright light', exampleZh: '明亮的光' },
    { en: 'beautiful', zh: '美麗的', image: '🌅', phonics: '', kk: '[ˈbjutɪfl̩]', phonicsSound: '', exampleSentence: 'It is beautiful.', exampleZh: '它很美。' },
    { en: 'market', zh: '市場', image: '🛍️', phonics: '', kk: '[ˈmɑrkɪt]', phonicsSound: '', exampleSentence: 'the market', exampleZh: '市場' },
    { en: 'cheap', zh: '便宜的', image: '💵', phonics: '', kk: '[tʃip]', phonicsSound: '', exampleSentence: 'cheap fruit', exampleZh: '便宜水果' },
    { en: 'fresh', zh: '新鮮的', image: '🥬', phonics: '', kk: '[frɛʃ]', phonicsSound: '', exampleSentence: 'fresh fruit', exampleZh: '新鮮水果' },
    { en: 'think', zh: '覺得', image: '💭', phonics: '', kk: '[θɪŋk]', phonicsSound: '', exampleSentence: "I think it's nice.", exampleZh: '我覺得很好。' },
    { en: 'excited', zh: '興奮的', image: '🤩', phonics: '', kk: '[ɪkˈsaɪtɪd]', phonicsSound: '', exampleSentence: 'I am excited.', exampleZh: '我好興奮。' },
    { en: 'boat', zh: '船', image: '⛵', phonics: '', kk: '[bot]', phonicsSound: '', exampleSentence: 'a small boat', exampleZh: '一艘小船' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'They are happy.', exampleZh: '他們很開心。' },
  ],
  sentences: [
    { en: 'The lighthouse is tall and bright.', zh: '燈塔又高又亮。' }, { en: 'I think it is beautiful.', zh: '我覺得它很美。' }, { en: 'The fruit is cheap and fresh.', zh: '水果又便宜又新鮮。' }, { en: 'I am excited to go shopping.', zh: '我很興奮去購物。' }, { en: 'The boats are safe at night.', zh: '船晚上很安全。' }, { en: 'What a wonderful day!', zh: '多美好的一天！' },
  ],
  phonicsLetters: ['review reading'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'The lighthouse is tall and ___.（明亮）', options: ['bright', 'dark', 'cheap', 'old'], answer: 'bright' },
    { type: 'fill-blank', question: 'I ___ it is beautiful.（覺得）', options: ['think', 'am', 'buy', 'is'], answer: 'think' },
    { type: 'match', question: 'fresh 是什麼意思？', options: ['新鮮的', '便宜的', '明亮的', '興奮的'], answer: '新鮮的' },
  ],
  challenges: [
    { type: 'read', question: 'What does Coco think of the lighthouse?（Coco 覺得燈塔如何？）', passage: 'Coco looks at the lighthouse.\nIt is tall and bright.\nShe thinks it is beautiful.', options: ['beautiful', 'boring', 'ugly', 'small'], answer: 'beautiful' },
    { type: 'read', question: 'How is the fruit at the market?（市場水果如何？）', passage: 'Benny goes to the market.\nThe fruit is cheap and fresh.\nHe buys some sweet apples.', options: ['cheap and fresh', 'old and expensive', 'dirty', 'bad'], answer: 'cheap and fresh' },
    { type: 'fill-blank', question: 'I am ___ to go shopping.（興奮）', options: ['excited', 'bored', 'scared', 'shy'], answer: 'excited' },
    { type: 'fill-blank', question: 'The light ___ the boats.（幫助·第三人稱）', options: ['helps', 'help', 'helped', 'helping'], answer: 'helps' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['The lighthouse is tall and bright.', 'I think it is beautiful.', 'The fruit is cheap and fresh.', 'What a wonderful day!'], answer: 'The lighthouse is tall and bright.', image: '🎧' },
    { type: 'spell', question: '拼拼看：fr _ sh（新鮮）', answer: 'fresh', image: '✍️' },
  ],
  talkTimePrompts: ["Retell one story you read.", "Give your opinion: I think ___.", "Describe the lighthouse or market.", "✍️ 引導寫作：I think the ___ is ___ because ___."],
  reviewQuiz: [
    { type: 'read', question: 'Is the fruit expensive?（水果貴嗎？）', passage: 'The market has fresh fruit.\nThe apples are cheap.\nThey are only two dollars.', options: ['No, it is cheap', 'Yes, it is expensive', 'It is free', 'It is old'], answer: 'No, it is cheap' },
    { type: 'fill-blank', question: 'I ___ it is beautiful.（覺得）', options: ['think', 'am', 'buy', 'is'], answer: 'think' },
    { type: 'match', question: 'beautiful 是什麼意思？', options: ['美麗的', '便宜的', '無聊的', '害怕的'], answer: '美麗的' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's review our reading! Read and answer!", lineZh: '來複習閱讀！讀完回答！' },
    { speaker: 'Coco', line: "The lighthouse is tall and bright. I think it is beautiful!", lineZh: '燈塔又高又亮。我覺得很美！' },
    { speaker: 'Benny', line: "At the market, the fruit is cheap and fresh!", lineZh: '在市場，水果便宜又新鮮！' },
    { speaker: 'Finn', line: "You are a great reader now! Wonderful!", lineZh: '你現在是很棒的讀者了！太棒了！' },
  ],
};

const L6_M16: Mission = {
  id: 16, slug: 'l6-m16-past-ed', level: 6, title: '過去式 -ed', titleEn: 'Past Tense -ed', theme: '燈塔角・昨天做了', themeEmoji: '⏪',
  focus: '過去式規則 -ed：played/walked/looked/cleaned',
  story: [
    { image: '⏪', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Yesterday I played at the beach.", dialogueZh: '昨天我在海邊玩。', highlightWords: ['played'], sceneEmojis: ['🏖️', '⏪', '✨'], animation: 'wave' },
    { image: '🚶', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "I walked to the lighthouse. I looked at the sea.", dialogueZh: '我走去燈塔。我看著海。', highlightWords: ['walked', 'looked'], sceneEmojis: ['🚶', '🏰', '😊'], animation: 'bounce' },
    { image: '🧹', character: '🐰', characterKey: 'ruby', characterAction: 'talk', characterName: 'Ruby', dialogue: "I cleaned my room and helped my mom.", dialogueZh: '我打掃房間也幫了媽媽。', highlightWords: ['cleaned', 'helped'], sceneEmojis: ['🧹', '👩', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Add -ed for the past! played, walked!", dialogueZh: '過去式加 -ed！played、walked！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '⏪'], animation: 'bounce' },
  ],
  words: [
    { en: 'played', zh: '玩了', image: '🎮', phonics: '', kk: '[pled]', phonicsSound: '', exampleSentence: 'I played.', exampleZh: '我玩了。' },
    { en: 'walked', zh: '走了', image: '🚶', phonics: '', kk: '[wɔkt]', phonicsSound: '', exampleSentence: 'I walked home.', exampleZh: '我走路回家。' },
    { en: 'looked', zh: '看了', image: '👀', phonics: '', kk: '[lʊkt]', phonicsSound: '', exampleSentence: 'I looked at it.', exampleZh: '我看了它。' },
    { en: 'cooked', zh: '煮了', image: '🍳', phonics: '', kk: '[kʊkt]', phonicsSound: '', exampleSentence: 'I cooked dinner.', exampleZh: '我煮了晚餐。' },
    { en: 'jumped', zh: '跳了', image: '🤸', phonics: '', kk: '[dʒʌmpt]', phonicsSound: '', exampleSentence: 'I jumped high.', exampleZh: '我跳得高。' },
    { en: 'cleaned', zh: '打掃了', image: '🧹', phonics: '', kk: '[klind]', phonicsSound: '', exampleSentence: 'I cleaned my room.', exampleZh: '我打掃房間。' },
    { en: 'watched', zh: '看了（電視）', image: '📺', phonics: '', kk: '[wɑtʃt]', phonicsSound: '', exampleSentence: 'I watched TV.', exampleZh: '我看了電視。' },
    { en: 'helped', zh: '幫了', image: '🤝', phonics: '', kk: '[hɛlpt]', phonicsSound: '', exampleSentence: 'I helped my mom.', exampleZh: '我幫了媽媽。' },
    { en: 'wanted', zh: '想要了', image: '🙋', phonics: '', kk: '[ˈwɑntɪd]', phonicsSound: '', exampleSentence: 'I wanted ice cream.', exampleZh: '我想要冰淇淋。' },
    { en: 'yesterday', zh: '昨天', image: '📅', phonics: '', kk: '[ˈjɛstɚˌde]', phonicsSound: '', exampleSentence: 'yesterday', exampleZh: '昨天' },
  ],
  sentences: [
    { en: 'Yesterday I played.', zh: '昨天我玩了。' }, { en: 'I walked to school.', zh: '我走路去學校。' }, { en: 'I looked at the sea.', zh: '我看著海。' }, { en: 'I cleaned my room.', zh: '我打掃房間。' }, { en: 'Did you help your mom?', zh: '你幫了媽媽嗎？' }, { en: 'Yes, I helped her.', zh: '是的，我幫了她。' },
  ],
  phonicsLetters: ['play → played'],
  warmUpQuestions: [
    { type: 'match', question: 'play 的過去式是？', options: ['played', 'plays', 'playing', 'play'], answer: 'played' },
    { type: 'match', question: 'walk 的過去式是？', options: ['walked', 'walks', 'walking', 'walk'], answer: 'walked' },
    { type: 'match', question: 'clean 的過去式是？', options: ['cleaned', 'cleans', 'cleaning', 'clean'], answer: 'cleaned' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選字：點你聽到的過去式', options: ['played', 'walked', 'looked', 'cleaned'], answer: 'walked', image: '🎧' },
    { type: 'match', question: '配對：原形→過去式', options: ['play-played', 'walk-walked', 'cook-cooked', 'help-helped'], answer: 'play-played' },
    { type: 'fill-blank', question: 'Yesterday I ___ my room.（打掃·過去）', options: ['cleaned', 'clean', 'cleans', 'cleaning'], answer: 'cleaned' },
    { type: 'fill-blank', question: 'I ___ TV last night.（看·過去）', options: ['watched', 'watch', 'watches', 'watching'], answer: 'watched' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Yesterday I played.', 'I walked to school.', 'I cleaned my room.', 'I looked at the sea.'], answer: 'Yesterday I played.', image: '🎧' },
    { type: 'read', question: 'What did Ruby do yesterday?（Ruby 昨天做了什麼？）', passage: 'Yesterday Ruby cleaned her room.\nShe helped her mom cook.\nThen she watched TV.', options: ['cleaned and helped', 'went swimming', 'played all day', 'slept', ], answer: 'cleaned and helped' },
  ],
  talkTimePrompts: ["Say what you did: Yesterday I ___ed.", "Use walked, played, cleaned.", "Ask: Did you help your mom?", "✍️ 引導寫作：Yesterday I ___ed and ___ed."],
  reviewQuiz: [
    { type: 'match', question: 'help 的過去式是？', options: ['helped', 'helps', 'helping', 'help'], answer: 'helped' },
    { type: 'fill-blank', question: 'I ___ to the beach yesterday.（走·過去）', options: ['walked', 'walk', 'walks', 'walking'], answer: 'walked' },
    { type: 'spell', question: '拼拼看：play _ d（玩了）', answer: 'played', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "Yesterday I played at the beach.", lineZh: '昨天我在海邊玩。' },
    { speaker: 'Coco', line: "I walked to the lighthouse. I looked at the sea.", lineZh: '我走去燈塔。我看著海。' },
    { speaker: 'Ruby', line: "I cleaned my room and helped my mom.", lineZh: '我打掃房間也幫了媽媽。' },
    { speaker: 'Benny', line: "Add -ed for the past! played, walked!", lineZh: '過去式加 -ed！played、walked！' },
  ],
};

const L6_M17: Mission = {
  id: 17, slug: 'l6-m17-what-did-you-do', level: 6, title: 'What did you do?', titleEn: 'What did you do?', theme: '燈塔角・你昨天做了什麼', themeEmoji: '❓',
  focus: '疑問 What did you do? / Did you…? — I ___ed.',
  story: [
    { image: '❓', character: '🦜', characterKey: 'polly', characterAction: 'talk', characterName: 'Polly', dialogue: "What did you do yesterday?", dialogueZh: '你昨天做了什麼？', highlightWords: ['did'], sceneEmojis: ['❓', '📅', '✨'], animation: 'wave' },
    { image: '🏖️', character: '🐱', characterKey: 'coco', characterAction: 'talk', characterName: 'Coco', dialogue: "I played at the beach. I swam in the sea!", dialogueZh: '我在海邊玩。我在海裡游泳！', highlightWords: ['played'], sceneEmojis: ['🏖️', '🏊', '😊'], animation: 'bounce' },
    { image: '📺', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Did you watch TV? Yes, I did!", dialogueZh: '你看電視了嗎？是的，我看了！', highlightWords: ['Did', 'did'], sceneEmojis: ['📺', '✅', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦜', characterKey: 'polly', characterAction: 'cheer', characterName: 'Polly', dialogue: "Now you can talk about the past!", dialogueZh: '現在你會講過去的事了！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '❓'], animation: 'bounce' },
  ],
  words: [
    { en: 'did', zh: '做了（助動詞）', image: '❓', phonics: '', kk: '[dɪd]', phonicsSound: '', exampleSentence: 'What did you do?', exampleZh: '你做了什麼？' },
    { en: "didn't", zh: '沒有做', image: '🚫', phonics: '', kk: '[ˈdɪdnt]', phonicsSound: '', exampleSentence: "I didn't go.", exampleZh: '我沒去。' },
    { en: 'played', zh: '玩了', image: '🎮', phonics: '', kk: '[pled]', phonicsSound: '', exampleSentence: 'I played.', exampleZh: '我玩了。' },
    { en: 'watched', zh: '看了', image: '📺', phonics: '', kk: '[wɑtʃt]', phonicsSound: '', exampleSentence: 'I watched TV.', exampleZh: '我看了電視。' },
    { en: 'visited', zh: '拜訪了', image: '🚪', phonics: '', kk: '[ˈvɪzɪtɪd]', phonicsSound: '', exampleSentence: 'I visited grandma.', exampleZh: '我拜訪了奶奶。' },
    { en: 'stayed', zh: '待在', image: '🏠', phonics: '', kk: '[sted]', phonicsSound: '', exampleSentence: 'I stayed home.', exampleZh: '我待在家。' },
    { en: 'studied', zh: '讀書了', image: '📚', phonics: '', kk: '[ˈstʌdid]', phonicsSound: '', exampleSentence: 'I studied English.', exampleZh: '我讀了英文。' },
    { en: 'cooked', zh: '煮了', image: '🍳', phonics: '', kk: '[kʊkt]', phonicsSound: '', exampleSentence: 'I cooked lunch.', exampleZh: '我煮了午餐。' },
    { en: 'last night', zh: '昨晚', image: '🌙', phonics: '', kk: '[læst naɪt]', phonicsSound: '', exampleSentence: 'last night', exampleZh: '昨晚' },
    { en: 'weekend', zh: '週末', image: '🎉', phonics: '', kk: '[ˈwikˌɛnd]', phonicsSound: '', exampleSentence: 'last weekend', exampleZh: '上週末' },
  ],
  sentences: [
    { en: 'What did you do yesterday?', zh: '你昨天做了什麼？' }, { en: 'I played at the beach.', zh: '我在海邊玩。' }, { en: 'Did you watch TV?', zh: '你看電視了嗎？' }, { en: 'Yes, I did.', zh: '是的，我看了。' }, { en: "No, I didn't.", zh: '不，我沒有。' }, { en: 'I visited my grandma.', zh: '我拜訪了奶奶。' },
  ],
  phonicsLetters: ['What did you do?'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'What ___ you do?（過去問句）', options: ['did', 'do', 'are', 'is'], answer: 'did' },
    { type: 'fill-blank', question: 'Did you watch TV? Yes, I ___.', options: ['did', 'do', 'am', 'was'], answer: 'did' },
    { type: 'match', question: '📺 watched 是什麼意思？', options: ['看了', '玩了', '走了', '煮了'], answer: '看了' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的動作', options: ['🎮', '📺', '🚪', '📚'], answer: '🚪', image: '🎧' },
    { type: 'fill-blank', question: 'Did you play? No, I ___.（否定短答）', options: ["didn't", 'did', 'do', 'was'], answer: "didn't" },
    { type: 'fill-blank', question: 'What did you ___?（做·原形）', options: ['do', 'did', 'done', 'doing'], answer: 'do' },
    { type: 'spell', question: '拼拼看：visit _ d（拜訪了）', answer: 'visited', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['What did you do yesterday?', 'I played at the beach.', 'Did you watch TV?', 'I visited my grandma.'], answer: 'What did you do yesterday?', image: '🎧' },
    { type: 'read', question: 'What did Coco do yesterday?（Coco 昨天做了什麼？）', passage: '"What did you do yesterday?"\nCoco says, "I played at the beach.\nI swam in the sea."', options: ['played at the beach', 'watched TV', 'studied', 'stayed home'], answer: 'played at the beach' },
  ],
  talkTimePrompts: ["Ask: What did you do yesterday?", "Answer: I ___ed.", "Ask: Did you ___? Yes, I did. / No, I didn't.", "✍️ 引導寫作：Yesterday I ___ed. Then I ___ed."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'What ___ you do last weekend?（過去問句）', options: ['did', 'do', 'are', 'was'], answer: 'did' },
    { type: 'fill-blank', question: "Did you cook? No, I ___.", options: ["didn't", 'did', 'do', 'was'], answer: "didn't" },
    { type: 'read', question: 'Did Benny watch TV?（Benny 看電視了嗎？）', passage: '"Did you watch TV last night?"\nBenny says, "Yes, I did.\nI watched a fun show."', options: ['Yes, he did', 'No, he did not', 'He played', 'He slept'], answer: 'Yes, he did' },
  ],
  videoScript: [
    { speaker: 'Polly', line: "What did you do yesterday?", lineZh: '你昨天做了什麼？' },
    { speaker: 'Coco', line: "I played at the beach. I swam in the sea!", lineZh: '我在海邊玩。我在海裡游泳！' },
    { speaker: 'Benny', line: "Did you watch TV? Yes, I did!", lineZh: '你看電視了嗎？是的，我看了！' },
    { speaker: 'Polly', line: "Now you can talk about the past!", lineZh: '現在你會講過去的事了！' },
  ],
};

const L6_M18: Mission = {
  id: 18, slug: 'l6-m18-dialogue-mix', level: 6, title: '情境對話綜合', titleEn: 'Dialogue Mix', theme: '燈塔角・出遊日', themeEmoji: '💬',
  focus: '綜合情境對話：邀約 ＋ 購物 ＋ 問路 ＋ 感受',
  story: [
    { image: '🙌', character: '🦊', characterKey: 'finn', characterAction: 'wave', characterName: 'Finn', dialogue: "Let's go to the market! Do you want to come?", dialogueZh: '我們去市場！你想來嗎？', highlightWords: ["Let's", 'want'], sceneEmojis: ['🙌', '🛍️', '✨'], animation: 'wave' },
    { image: '🤩', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Sure! I am so excited! Where is the market?", dialogueZh: '好啊！我好興奮！市場在哪？', highlightWords: ['excited', 'Where'], sceneEmojis: ['🤩', '❓', '😊'], animation: 'bounce' },
    { image: '💵', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Go straight and turn left. The apples are cheap!", dialogueZh: '直走然後左轉。蘋果很便宜！', highlightWords: ['straight', 'cheap'], sceneEmojis: ['⬅️', '🍎', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "What a great day out! Let's go!", dialogueZh: '出遊真棒！走吧！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '💬'], animation: 'bounce' },
  ],
  words: [
    { en: "let's", zh: '我們來…吧', image: '🙌', phonics: '', kk: '[lɛts]', phonicsSound: '', exampleSentence: "Let's go!", exampleZh: '我們走吧！' },
    { en: 'want', zh: '想要', image: '🙋', phonics: '', kk: '[wɑnt]', phonicsSound: '', exampleSentence: 'Do you want to come?', exampleZh: '你想來嗎？' },
    { en: 'excited', zh: '興奮的', image: '🤩', phonics: '', kk: '[ɪkˈsaɪtɪd]', phonicsSound: '', exampleSentence: 'I am excited!', exampleZh: '我好興奮！' },
    { en: 'where', zh: '哪裡', image: '🗺️', phonics: '', kk: '[wɛr]', phonicsSound: '', exampleSentence: 'Where is it?', exampleZh: '它在哪？' },
    { en: 'straight', zh: '直直地', image: '⬆️', phonics: '', kk: '[stret]', phonicsSound: '', exampleSentence: 'Go straight.', exampleZh: '直走。' },
    { en: 'left', zh: '左', image: '⬅️', phonics: '', kk: '[lɛft]', phonicsSound: '', exampleSentence: 'Turn left.', exampleZh: '左轉。' },
    { en: 'cheap', zh: '便宜的', image: '💵', phonics: '', kk: '[tʃip]', phonicsSound: '', exampleSentence: 'cheap apples', exampleZh: '便宜蘋果' },
    { en: 'buy', zh: '買', image: '🛒', phonics: '', kk: '[baɪ]', phonicsSound: '', exampleSentence: 'I buy fruit.', exampleZh: '我買水果。' },
    { en: 'market', zh: '市場', image: '🛍️', phonics: '', kk: '[ˈmɑrkɪt]', phonicsSound: '', exampleSentence: 'the market', exampleZh: '市場' },
    { en: 'sure', zh: '好啊', image: '👍', phonics: '', kk: '[ʃʊr]', phonicsSound: '', exampleSentence: 'Sure!', exampleZh: '好啊！' },
  ],
  sentences: [
    { en: "Let's go to the market!", zh: '我們去市場！' }, { en: 'Do you want to come?', zh: '你想來嗎？' }, { en: 'I am so excited!', zh: '我好興奮！' }, { en: 'Where is the market?', zh: '市場在哪？' }, { en: 'Go straight and turn left.', zh: '直走然後左轉。' }, { en: 'The apples are cheap!', zh: '蘋果很便宜！' },
  ],
  phonicsLetters: ['dialogue mix'],
  warmUpQuestions: [
    { type: 'fill-blank', question: "___ go to the market!（我們來…吧）", options: ["Let's", 'Do', 'Can', 'Are'], answer: "Let's" },
    { type: 'fill-blank', question: '___ is the market?（哪裡）', options: ['Where', 'What', 'Who', 'How'], answer: 'Where' },
    { type: 'match', question: '🤩 excited 是什麼意思？', options: ['興奮的', '害怕的', '無聊的', '便宜的'], answer: '興奮的' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🙌', '🗺️', '⬅️', '🍎'], answer: '🗺️', image: '🎧' },
    { type: 'fill-blank', question: 'Do you ___ to come?（想要）', options: ['want', 'like', "let's", 'is'], answer: 'want' },
    { type: 'fill-blank', question: 'Go straight and turn ___.（左）', options: ['left', 'right', 'stop', 'near'], answer: 'left' },
    { type: 'spell', question: '拼拼看：mar _ et（市場）', answer: 'market', image: '✍️' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ["Let's go to the market!", 'Do you want to come?', 'Where is the market?', 'The apples are cheap!'], answer: "Let's go to the market!", image: '🎧' },
    { type: 'read', question: 'How does Coco feel?（Coco 覺得如何？）', passage: 'Finn says, "Let\'s go to the market!"\nCoco says, "Sure! I am so excited!"\nThey walk together.', options: ['excited', 'scared', 'bored', 'tired'], answer: 'excited' },
  ],
  talkTimePrompts: ["Invite a friend and ask directions.", "Role-play: go to the market together.", "Say how you feel about the trip.", "✍️ 引導寫作：Let's go to the ___! I am ___ because ___."],
  reviewQuiz: [
    { type: 'fill-blank', question: 'The apples are ___.（便宜）', options: ['cheap', 'expensive', 'old', 'far'], answer: 'cheap' },
    { type: 'fill-blank', question: 'Do you want ___ come?（不定詞 to）', options: ['to', 'and', 'the', 'a'], answer: 'to' },
    { type: 'read', question: 'Where do they want to go?（他們想去哪？）', passage: 'Finn wants to go to the market.\nCoco is excited to come.\nThey buy cheap apples.', options: ['the market', 'the school', 'the sea', 'home'], answer: 'the market' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "Let's go to the market! Do you want to come?", lineZh: '我們去市場！你想來嗎？' },
    { speaker: 'Coco', line: "Sure! I am so excited! Where is the market?", lineZh: '好啊！我好興奮！市場在哪？' },
    { speaker: 'Benny', line: "Go straight and turn left. The apples are cheap!", lineZh: '直走左轉。蘋果便宜！' },
    { speaker: 'Finn', line: "What a great day out! Let's go!", lineZh: '出遊真棒！走吧！' },
  ],
};

const L6_M19: Mission = {
  id: 19, slug: 'l6-m19-read-write', level: 6, title: '閱讀＋寫短句', titleEn: 'Read & Write', theme: '燈塔角・讀與寫', themeEmoji: '✍️',
  focus: '閱讀短文 ＋ 引導式寫作：照樣造句寫出自己的短句',
  story: [
    { image: '📖', character: '🐻', characterKey: 'benny', characterAction: 'read', characterName: 'Benny', dialogue: "Read the story, then write your own!", dialogueZh: '讀故事，然後寫你自己的！', highlightWords: ['write'], sceneEmojis: ['📖', '✍️', '✨'], animation: 'wave' },
    { image: '🏖️', character: '🐱', characterKey: 'coco', characterAction: 'read', characterName: 'Coco', dialogue: "Yesterday I went to the beach. I played and swam.", dialogueZh: '昨天我去了海邊。我玩也游泳。', highlightWords: ['went', 'played'], sceneEmojis: ['🏖️', '🏊', '😊'], animation: 'bounce' },
    { image: '✏️', character: '🐰', characterKey: 'ruby', characterAction: 'write', characterName: 'Ruby', dialogue: "Now write: Yesterday I ___. I ___ and ___.", dialogueZh: '現在寫：昨天我___。我___和___。', highlightWords: [], sceneEmojis: ['✏️', '📝', '🎉'], animation: 'tada' },
    { image: '🎉', character: '🐻', characterKey: 'benny', characterAction: 'talk', characterName: 'Benny', dialogue: "Great! You are a reader and a writer!", dialogueZh: '太棒了！你是讀者也是作者！', highlightWords: [], sceneEmojis: ['🎉', '🏆', '✍️'], animation: 'bounce' },
  ],
  words: [
    { en: 'write', zh: '寫', image: '✍️', phonics: '', kk: '[raɪt]', phonicsSound: '', exampleSentence: 'I write a sentence.', exampleZh: '我寫一句話。' },
    { en: 'read', zh: '讀', image: '📖', phonics: '', kk: '[rid]', phonicsSound: '', exampleSentence: 'I read a story.', exampleZh: '我讀一個故事。' },
    { en: 'sentence', zh: '句子', image: '📝', phonics: '', kk: '[ˈsɛntəns]', phonicsSound: '', exampleSentence: 'a short sentence', exampleZh: '一個短句' },
    { en: 'went', zh: '去了', image: '⏪', phonics: '', kk: '[wɛnt]', phonicsSound: '', exampleSentence: 'I went home.', exampleZh: '我回家了。' },
    { en: 'played', zh: '玩了', image: '🎮', phonics: '', kk: '[pled]', phonicsSound: '', exampleSentence: 'I played.', exampleZh: '我玩了。' },
    { en: 'beach', zh: '海邊', image: '🏖️', phonics: '', kk: '[bitʃ]', phonicsSound: '', exampleSentence: 'at the beach', exampleZh: '在海邊' },
    { en: 'story', zh: '故事', image: '📚', phonics: '', kk: '[ˈstɔri]', phonicsSound: '', exampleSentence: 'a fun story', exampleZh: '有趣的故事' },
    { en: 'idea', zh: '想法', image: '💡', phonics: '', kk: '[aɪˈdiə]', phonicsSound: '', exampleSentence: 'a good idea', exampleZh: '好主意' },
    { en: 'first', zh: '首先', image: '1️⃣', phonics: '', kk: '[fɝst]', phonicsSound: '', exampleSentence: 'First, I got up.', exampleZh: '首先，我起床。' },
    { en: 'then', zh: '然後', image: '2️⃣', phonics: '', kk: '[ðɛn]', phonicsSound: '', exampleSentence: 'Then, I ate.', exampleZh: '然後，我吃飯。' },
  ],
  sentences: [
    { en: 'Yesterday I went to the beach.', zh: '昨天我去了海邊。' }, { en: 'First, I played in the sand.', zh: '首先，我在沙上玩。' }, { en: 'Then, I swam in the sea.', zh: '然後，我在海裡游泳。' }, { en: 'I found a big shell.', zh: '我找到一個大貝殼。' }, { en: 'It was a fun day.', zh: '那是好玩的一天。' }, { en: 'Now write your own story!', zh: '現在寫你自己的故事！' },
  ],
  phonicsLetters: ['read & write'],
  warmUpQuestions: [
    { type: 'match', question: '✍️ write 是什麼意思？', options: ['寫', '讀', '玩', '看'], answer: '寫' },
    { type: 'fill-blank', question: '___, I got up.（首先）', options: ['First', 'Then', 'And', 'But'], answer: 'First' },
    { type: 'fill-blank', question: 'Yesterday I ___ to the beach.（去·過去）', options: ['went', 'go', 'goes', 'going'], answer: 'went' },
  ],
  challenges: [
    { type: 'read', question: 'Where did the writer go?（作者去哪？）', passage: 'Yesterday I went to the beach.\nFirst, I played in the sand.\nThen, I swam in the sea.', options: ['the beach', 'the market', 'school', 'home'], answer: 'the beach' },
    { type: 'read', question: 'What did the writer do first?（作者先做什麼？）', passage: 'First, I played in the sand.\nThen, I swam in the sea.\nI found a big shell.', options: ['played in the sand', 'swam in the sea', 'found a shell', 'went home'], answer: 'played in the sand' },
    { type: 'fill-blank', question: 'First I played. ___ I swam.（然後）', options: ['Then', 'First', 'But', 'Or'], answer: 'Then' },
    { type: 'fill-blank', question: 'Yesterday I ___ in the sand.（玩·過去）', options: ['played', 'play', 'plays', 'playing'], answer: 'played' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Yesterday I went to the beach.', 'First, I played in the sand.', 'Then, I swam in the sea.', 'It was a fun day.'], answer: 'Yesterday I went to the beach.', image: '🎧' },
    { type: 'spell', question: '拼拼看：sent _ nce（句子）', answer: 'sentence', image: '✍️' },
  ],
  talkTimePrompts: ["Read the story out loud.", "Say what you did yesterday with First / Then.", "✍️ 引導寫作：Yesterday I went to ___.", "✍️ 引導寫作：First I ___ed. Then I ___ed."],
  reviewQuiz: [
    { type: 'fill-blank', question: '___ I got up. Then I ate.（首先）', options: ['First', 'Then', 'And', 'So'], answer: 'First' },
    { type: 'read', question: 'Was it a fun day?（那天好玩嗎？）', passage: 'I played and swam at the beach.\nI found a big shell.\nIt was a fun day!', options: ['Yes, it was fun', 'No, it was boring', 'It was sad', 'It rained'], answer: 'Yes, it was fun' },
    { type: 'spell', question: '拼拼看：wr _ te（寫）', answer: 'write', image: '✍️' },
  ],
  videoScript: [
    { speaker: 'Benny', line: "Read the story, then write your own!", lineZh: '讀故事，然後寫你自己的！' },
    { speaker: 'Coco', line: "Yesterday I went to the beach. I played and swam.", lineZh: '昨天我去海邊。我玩也游泳。' },
    { speaker: 'Ruby', line: "Now write: Yesterday I ___. I ___ and ___.", lineZh: '現在寫：昨天我___。我___和___。' },
    { speaker: 'Benny', line: "Great! You are a reader and a writer!", lineZh: '太棒了！你是讀者也是作者！' },
  ],
};

const L6_M20: Mission = {
  id: 20, slug: 'l6-m20-boss', level: 6, title: '燈塔角大魔王', titleEn: 'Lighthouse Boss', theme: '燈塔角・大魔王挑戰', themeEmoji: '🏆',
  focus: '總驗收：描述/意見/購物/點餐/問路/感受/過去式 -ed',
  story: [
    { image: '🐲', character: '🦊', characterKey: 'finn', characterAction: 'talk', characterName: 'Finn', dialogue: "The Lighthouse Boss is here! Use all your English!", dialogueZh: '燈塔大魔王來了！用上你所有的英文！', highlightWords: [], sceneEmojis: ['🐲', '⚔️', '🏰'], animation: 'shake' },
    { image: '💪', character: '🐱', characterKey: 'coco', characterAction: 'clap', characterName: 'Coco', dialogue: "Describe, shop, ask the way — I can do it all!", dialogueZh: '形容、購物、問路 —— 我全都會！', highlightWords: [], sceneEmojis: ['💪', '🛍️', '✨'], animation: 'bounce' },
    { image: '🎖️', character: '🐰', characterKey: 'ruby', characterAction: 'star', characterName: 'Ruby', dialogue: "You beat the Boss! You get the Lighthouse Badge!", dialogueZh: '你打敗大魔王了！獲得燈塔徽章！', highlightWords: ['Badge'], sceneEmojis: ['🎖️', '🏆', '🎉'], animation: 'tada' },
    { image: '🏰', character: '🦊', characterKey: 'finn', characterAction: 'happy', characterName: 'Finn', dialogue: "You finished Lighthouse Point! On to Grammar Gate!", dialogueZh: '你完成了燈塔角！前進文法門！', highlightWords: [], sceneEmojis: ['🏰', '🚪', '🚀'], animation: 'bounce' },
  ],
  words: [
    { en: 'beautiful', zh: '美麗的', image: '🌅', phonics: '', kk: '[ˈbjutɪfl̩]', phonicsSound: '', exampleSentence: 'It is beautiful.', exampleZh: '它很美。' },
    { en: 'think', zh: '覺得', image: '💭', phonics: '', kk: '[θɪŋk]', phonicsSound: '', exampleSentence: "I think it's cool.", exampleZh: '我覺得很酷。' },
    { en: 'how much', zh: '多少錢', image: '💲', phonics: '', kk: '[haʊ mʌtʃ]', phonicsSound: '', exampleSentence: 'How much is it?', exampleZh: '多少錢？' },
    { en: 'cheap', zh: '便宜的', image: '💵', phonics: '', kk: '[tʃip]', phonicsSound: '', exampleSentence: 'It is cheap.', exampleZh: '它很便宜。' },
    { en: "I'd like", zh: '我想要', image: '🙋', phonics: '', kk: '[aɪd laɪk]', phonicsSound: '', exampleSentence: "I'd like soup.", exampleZh: '我想要湯。' },
    { en: 'where', zh: '哪裡', image: '🗺️', phonics: '', kk: '[wɛr]', phonicsSound: '', exampleSentence: 'Where is it?', exampleZh: '它在哪？' },
    { en: 'left', zh: '左', image: '⬅️', phonics: '', kk: '[lɛft]', phonicsSound: '', exampleSentence: 'Turn left.', exampleZh: '左轉。' },
    { en: 'excited', zh: '興奮的', image: '🤩', phonics: '', kk: '[ɪkˈsaɪtɪd]', phonicsSound: '', exampleSentence: 'I am excited!', exampleZh: '我好興奮！' },
    { en: 'played', zh: '玩了', image: '⏪', phonics: '', kk: '[pled]', phonicsSound: '', exampleSentence: 'I played yesterday.', exampleZh: '我昨天玩了。' },
    { en: 'happy', zh: '開心的', image: '😄', phonics: '', kk: '[ˈhæpi]', phonicsSound: '', exampleSentence: 'I am happy!', exampleZh: '我很開心！' },
  ],
  sentences: [
    { en: 'The view is beautiful. I think it is amazing.', zh: '景色很美。我覺得驚人。' }, { en: 'How much is it? It is cheap.', zh: '多少錢？很便宜。' }, { en: "I'd like a hamburger, please.", zh: '我想要漢堡。' }, { en: 'Where is the park? Turn left.', zh: '公園在哪？左轉。' }, { en: 'Yesterday I played at the beach.', zh: '昨天我在海邊玩。' }, { en: 'I did it!', zh: '我做到了！' },
  ],
  phonicsLetters: ['review all'],
  warmUpQuestions: [
    { type: 'fill-blank', question: 'I ___ it is cool.（覺得）', options: ['think', 'am', 'buy', 'is'], answer: 'think' },
    { type: 'fill-blank', question: '___ much is it?（多少）', options: ['How', 'What', 'Where', 'Who'], answer: 'How' },
    { type: 'match', question: 'play 的過去式是？', options: ['played', 'plays', 'playing', 'play'], answer: 'played' },
  ],
  challenges: [
    { type: 'listen-pick', question: '聽音選圖：點你聽到的字', options: ['🌅', '💵', '🗺️', '🤩'], answer: '🤩', image: '🎧' },
    { type: 'fill-blank', question: "句型代換：I'd like a ___.（漢堡）", options: ['hamburger', 'where', 'left', 'is'], answer: 'hamburger' },
    { type: 'fill-blank', question: 'Where is the park? Turn ___.（左）', options: ['left', 'much', 'cheap', 'think'], answer: 'left' },
    { type: 'match', question: 'clean 的過去式是？', options: ['cleaned', 'cleans', 'cleaning', 'clean'], answer: 'cleaned' },
    { type: 'listen-pick', question: '🎧 聽句子，勾選你聽到的那一句', options: ['Yesterday I played at the beach.', 'How much is it?', 'The view is beautiful.', 'Where is the park?'], answer: 'Yesterday I played at the beach.', image: '🎧' },
    { type: 'read', question: 'What did the friends do yesterday?（朋友們昨天做了什麼？）', passage: 'Yesterday the friends went to the beach.\nThey played in the sand.\nThey were very happy.', options: ['went to the beach', 'went to school', 'stayed home', 'cooked dinner'], answer: 'went to the beach' },
  ],
  talkTimePrompts: ["Describe something and give your opinion.", "Order food and ask directions.", "Say what you did yesterday.", "You beat the Lighthouse Boss! Say 'I did it!'"],
  reviewQuiz: [
    { type: 'fill-blank', question: 'It is ___. Only two dollars!（便宜）', options: ['cheap', 'expensive', 'far', 'old'], answer: 'cheap' },
    { type: 'fill-blank', question: 'Yesterday I ___ my room.（打掃·過去）', options: ['cleaned', 'clean', 'cleans', 'cleaning'], answer: 'cleaned' },
    { type: 'read', question: 'Were the friends happy?（朋友們開心嗎？）', passage: 'The friends played at the beach.\nThey found shells.\nThey were very happy!', options: ['Yes, they were happy', 'No, they were sad', 'They were tired', 'They were bored'], answer: 'Yes, they were happy' },
  ],
  videoScript: [
    { speaker: 'Finn', line: "The Lighthouse Boss says: describe your day!", lineZh: '燈塔大魔王說：描述你的一天！' },
    { speaker: 'Coco', line: "Yesterday I played at the beach. It was beautiful!", lineZh: '昨天我在海邊玩。好美！' },
    { speaker: 'Ruby', line: "You beat the Boss! Lighthouse champion!", lineZh: '你打敗大魔王了！燈塔冠軍！' },
    { speaker: 'Finn', line: "On to Grammar Gate! Let's learn grammar!", lineZh: '前進文法門！我們來學文法！' },
  ],
};

export const MISSIONS: Mission[] = [L1_M1, L1_M2, L1_M3, L1_M4, L1_M5, L1_M6, L1_M7, L1_M8, L1_M9, L1_M10, L1_M11, L1_M12, L2_M1, L2_M2, L2_M3, L2_M4, L2_M5, L2_M6, L2_M7, L2_M8, L2_M9, L2_M10, L2_M11, L2_M12, L2_M13, L2_M14, L2_M15, L2_M16, L2_M17, L2_M18, L2_M19, L2_M20, L3_M1, L3_M2, L3_M3, L3_M4, L3_M5, L3_M6, L3_M7, L3_M8, L3_M9, L3_M10, L3_M11, L3_M12, L3_M13, L3_M14, L3_M15, L3_M16, L3_M17, L3_M18, L3_M19, L3_M20, L4_M1, L4_M2, L4_M3, L4_M4, L4_M5, L4_M6, L4_M7, L4_M8, L4_M9, L4_M10, L4_M11, L4_M12, L4_M13, L4_M14, L4_M15, L4_M16, L4_M17, L4_M18, L4_M19, L4_M20, L5_M1, L5_M2, L5_M3, L5_M4, L5_M5, L5_M6, L5_M7, L5_M8, L5_M9, L5_M10, L5_M11, L5_M12, L5_M13, L5_M14, L5_M15, L5_M16, L5_M17, L5_M18, L5_M19, L5_M20, L6_M1, L6_M2, L6_M3, L6_M4, L6_M5, L6_M6, L6_M7, L6_M8, L6_M9, L6_M10, L6_M11, L6_M12, L6_M13, L6_M14, L6_M15, L6_M16, L6_M17, L6_M18, L6_M19, L6_M20];

export function getMissionsByLevel(level: number): Mission[] {
  return MISSIONS.filter(m => m.level === level);
}

export function getMission(level: number, missionId: number): Mission | undefined {
  return MISSIONS.find(m => m.level === level && m.id === missionId);
}

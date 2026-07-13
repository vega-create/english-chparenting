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
  // ── v2 新格式（L2 起）選填 ──
  focus?: string;              // 該課重點（phonics 樣式 / 文法點）
  videoScript?: VideoLine[];   // 對話影片腳本（角色輪流；留給 Vega 拍/生）
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

export const MISSIONS: Mission[] = [L1_M1, L1_M2, L1_M3, L1_M4, L1_M5, L1_M6, L1_M7, L1_M8, L1_M9, L1_M10, L1_M11, L1_M12, L2_M1, L2_M2, L2_M3, L2_M4, L2_M5, L2_M6, L2_M7, L2_M8, L2_M9, L2_M10];

export function getMissionsByLevel(level: number): Mission[] {
  return MISSIONS.filter(m => m.level === level);
}

export function getMission(level: number, missionId: number): Mission | undefined {
  return MISSIONS.find(m => m.level === level && m.id === missionId);
}

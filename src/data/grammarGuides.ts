// 文法引導卡資料（Vega 2026-08-17 設計）：
// 影片看完 → 圖卡示範本課文法（點了會唸、關鍵部位動畫）→ 孩子自己練 2-3 題 → 進電子書。
// 純視覺引導＋英文發音，不用中文旁白（中文只出現在畫面小字）。
// 只有文法重點課才有；沒設定的課直接跳過這一關。

export interface GrammarDemo {
  emoji: string;      // 示範圖（emoji 或之後換圖卡）
  base: string;       // 原形（點了唸）
  target: string;     // 變化形（點了唸）
  highlight: string;  // 變化形裡要發光的部分（尾碼），如 'er'、'ing'、's'
}

export interface GrammarPractice {
  prompt: string;     // 播音／顯示的題目字
  hint: string;       // 畫面小提示（中文，不發音）
  options: string[];
  answer: string;
}

export interface GrammarGuide {
  title: string;      // 卡片標題（中文小字）
  concept: string;    // 大大顯示的規則，如 '+ er'
  demos: GrammarDemo[];
  practice: GrammarPractice[];
}

export const GRAMMAR_GUIDES: Record<string, GrammarGuide> = {
  // L3 M9 複數 -s
  '3-9': {
    title: '一隻變很多隻，怎麼說？',
    concept: '+ s',
    demos: [
      { emoji: '🐶', base: 'dog', target: 'dogs', highlight: 's' },
      { emoji: '🐱', base: 'cat', target: 'cats', highlight: 's' },
      { emoji: '🦆', base: 'duck', target: 'ducks', highlight: 's' },
    ],
    practice: [
      { prompt: 'apple', hint: '很多顆蘋果怎麼說？', options: ['apples', 'apple', 'appler'], answer: 'apples' },
      { prompt: 'egg', hint: '很多顆蛋怎麼說？', options: ['egger', 'eggs', 'egg'], answer: 'eggs' },
    ],
  },
  // L4 M16 過去式
  '4-16': {
    title: '昨天做過的事，怎麼說？',
    concept: '+ ed',
    demos: [
      { emoji: '⚽', base: 'play', target: 'played', highlight: 'ed' },
      { emoji: '👀', base: 'look', target: 'looked', highlight: 'ed' },
    ],
    practice: [
      { prompt: 'wash', hint: '昨天洗過了，怎麼說？', options: ['washs', 'washed', 'washing'], answer: 'washed' },
      { prompt: 'go', hint: '小心！go 是特別的字', options: ['goed', 'went', 'goes'], answer: 'went' },
    ],
  },
  // L5 M3 比較級 -er
  '5-3': {
    title: '「更～」怎麼說？',
    concept: '+ er',
    demos: [
      { emoji: '🍎', base: 'big', target: 'bigger', highlight: 'ger' },
      { emoji: '🌴', base: 'tall', target: 'taller', highlight: 'er' },
      { emoji: '🚤', base: 'fast', target: 'faster', highlight: 'er' },
    ],
    practice: [
      { prompt: 'small', hint: '「更小」怎麼說？', options: ['smaller', 'smalls', 'smallest'], answer: 'smaller' },
      { prompt: 'long', hint: '「更長」怎麼說？', options: ['longing', 'longer', 'longs'], answer: 'longer' },
    ],
  },
  // L5 M16 現在進行式 -ing
  '5-16': {
    title: '「正在做」怎麼說？',
    concept: '+ ing',
    demos: [
      { emoji: '🏊', base: 'swim', target: 'swimming', highlight: 'ming' },
      { emoji: '📖', base: 'read', target: 'reading', highlight: 'ing' },
      { emoji: '🏃', base: 'run', target: 'running', highlight: 'ning' },
    ],
    practice: [
      { prompt: 'eat', hint: '「正在吃」怎麼說？', options: ['eated', 'eating', 'eats'], answer: 'eating' },
      { prompt: 'play', hint: '「正在玩」怎麼說？', options: ['playing', 'played', 'plays'], answer: 'playing' },
    ],
  },
};

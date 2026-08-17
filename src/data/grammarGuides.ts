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
  listen?: boolean;   // 聽力題：題目只播音不顯示單字（不然答案直接寫在題目上）
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
      { prompt: 'banana', hint: '很多根香蕉怎麼說？', options: ['bananas', 'banana', 'bananing'], answer: 'bananas' },
      { prompt: 'lion', hint: '很多隻獅子怎麼說？', options: ['lion', 'lioner', 'lions'], answer: 'lions' },
      { prompt: 'tiger', hint: '很多隻老虎怎麼說？', options: ['tigers', 'tiger', 'tigering'], answer: 'tigers' },
      { prompt: 'book', hint: '很多本書怎麼說？', options: ['booker', 'books', 'book'], answer: 'books' },
      { prompt: 'pen', hint: '很多支筆怎麼說？', options: ['pens', 'pen', 'pened'], answer: 'pens' },
      { prompt: 'star', hint: '很多顆星星怎麼說？', options: ['star', 'stars', 'starer'], answer: 'stars' },
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
      { prompt: 'play', hint: '昨天玩過了，怎麼說？', options: ['played', 'plays', 'playing'], answer: 'played' },
      { prompt: 'look', hint: '昨天看過了，怎麼說？', options: ['looking', 'looked', 'looks'], answer: 'looked' },
      { prompt: 'watch', hint: '昨天看過電視了，怎麼說？', options: ['watched', 'watchs', 'watching'], answer: 'watched' },
      { prompt: 'eat', hint: '小心！eat 也是特別的字', options: ['eated', 'eating', 'ate'], answer: 'ate' },
      { prompt: 'cook', hint: '昨天煮過飯了，怎麼說？', options: ['cooked', 'cooks', 'cooking'], answer: 'cooked' },
      { prompt: 'jump', hint: '昨天跳過了，怎麼說？', options: ['jumping', 'jumps', 'jumped'], answer: 'jumped' },
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
      { prompt: 'tall', hint: '「更高」怎麼說？', options: ['taller', 'talls', 'talling'], answer: 'taller' },
      { prompt: 'fast', hint: '「更快」怎麼說？', options: ['fasting', 'faster', 'fasts'], answer: 'faster' },
      { prompt: 'slow', hint: '「更慢」怎麼說？', options: ['slower', 'slows', 'slowing'], answer: 'slower' },
      { prompt: 'old', hint: '「更舊」怎麼說？', options: ['olding', 'olds', 'older'], answer: 'older' },
      { prompt: 'cold', hint: '「更冷」怎麼說？', options: ['colder', 'colds', 'colding'], answer: 'colder' },
      { prompt: 'big', hint: '小心！big 要多一個 g', options: ['biger', 'bigger', 'bigs'], answer: 'bigger' },
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
      { prompt: 'read', hint: '「正在讀」怎麼說？', options: ['reads', 'reading', 'readed'], answer: 'reading' },
      { prompt: 'sing', hint: '「正在唱」怎麼說？', options: ['singing', 'sings', 'singed'], answer: 'singing' },
      { prompt: 'cook', hint: '「正在煮」怎麼說？', options: ['cooking', 'cooked', 'cooks'], answer: 'cooking' },
      { prompt: 'dance', hint: '「正在跳舞」怎麼說？', options: ['danceing', 'dancing', 'dances'], answer: 'dancing' },
      { prompt: 'swim', hint: '小心！swim 要多一個 m', options: ['swiming', 'swimming', 'swims'], answer: 'swimming' },
      { prompt: 'run', hint: '小心！run 要多一個 n', options: ['runing', 'running', 'runs'], answer: 'running' },
    ],
  },
};

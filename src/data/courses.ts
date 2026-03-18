export interface Course {
  level: number;
  slug: string;
  island: string;
  islandEn: string;
  world: string;
  worldEmoji: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  tag: string;
  description: string;
  longDescription: string;
  skills: string[];
  vocabulary: number;
  lessons: number;
  topics: string[];
  sampleWords: string[];
  sampleSentences: string[];
  phonics?: string;
  grammar?: string;
}

export const WORLDS = [
  { name: "彩虹谷", emoji: "🌈", nameEn: "Rainbow Valley", levels: [1, 2], color: "from-red-100 to-orange-100" },
  { name: "友善小鎮", emoji: "🏡", nameEn: "Friendly Town", levels: [3, 4], color: "from-yellow-100 to-amber-100" },
  { name: "海洋灣", emoji: "🌊", nameEn: "Ocean Bay", levels: [5, 6], color: "from-cyan-100 to-blue-100" },
  { name: "故事城堡", emoji: "🏰", nameEn: "Story Castle", levels: [7, 8], color: "from-purple-100 to-violet-100" },
  { name: "探索大陸", emoji: "🌍", nameEn: "Discovery Land", levels: [9, 10], color: "from-green-100 to-emerald-100" },
  { name: "冠軍峰", emoji: "🎓", nameEn: "Champion Peak", levels: [11, 12], color: "from-pink-100 to-rose-100" },
];

export const COURSES: Course[] = [
  {
    level: 1, slug: "l1-letter-island", island: "字母島", islandEn: "Letter Island",
    world: "彩虹谷", worldEmoji: "🌈",
    color: "bg-red-50", borderColor: "border-red-200", bgGradient: "from-red-50 to-orange-50", tag: "零基礎",
    description: "認識 26 個英文字母，大小寫配對，字母發音",
    longDescription: "從零開始認識 26 個英文字母！透過動畫、歌曲、互動遊戲，讓孩子輕鬆記住每個字母的形狀、名稱和基本發音。大小寫配對遊戲、字母排序挑戰，讓學習充滿樂趣。",
    skills: ["字母辨識", "大小寫配對", "字母發音", "字母排序"],
    vocabulary: 52, lessons: 24,
    topics: ["26 字母大寫", "26 字母小寫", "字母歌", "字母書寫", "字母音"],
    sampleWords: ["Apple", "Ball", "Cat", "Dog", "Egg", "Fish"],
    sampleSentences: ["A is for Apple.", "B is for Ball.", "What letter is this?"],
    phonics: "Letter names & letter sounds (A-Z)",
  },
  {
    level: 2, slug: "l2-sound-island", island: "聲音島", islandEn: "Sound Island",
    world: "彩虹谷", worldEmoji: "🌈",
    color: "bg-orange-50", borderColor: "border-orange-200", bgGradient: "from-orange-50 to-yellow-50", tag: "自然發音",
    description: "Phonics 自然發音規則，短母音、子音、CVC 拼讀",
    longDescription: "進入自然發音的魔法世界！學會 Phonics 規則，從單一字母音到 CVC（子音-母音-子音）拼讀。孩子會發現自己能「聽音拼字」和「看字讀音」，建立英文閱讀的基礎能力。",
    skills: ["自然發音", "短母音辨識", "CVC 拼讀", "聽音拼字"],
    vocabulary: 80, lessons: 24,
    topics: ["短母音 a/e/i/o/u", "子音發音", "CVC 拼讀", "押韻字", "音節拍手"],
    sampleWords: ["cat", "bed", "pig", "hot", "cup", "bat", "pen", "sit"],
    sampleSentences: ["The cat sat on the mat.", "Can you hop?", "I see a big pig."],
    phonics: "Short vowels (a, e, i, o, u) + consonants + CVC blending",
  },
  {
    level: 3, slug: "l3-market-street", island: "市場街", islandEn: "Market Street",
    world: "友善小鎮", worldEmoji: "🏡",
    color: "bg-yellow-50", borderColor: "border-yellow-200", bgGradient: "from-yellow-50 to-amber-50", tag: "生活單字",
    description: "日常生活單字：顏色、數字、食物、動物、身體部位",
    longDescription: "歡迎來到熱鬧的市場街！在這裡學習日常生活最常用的單字：顏色、數字 1-100、食物、動物、身體部位。每個主題都有豐富的圖片、動畫和互動遊戲，讓單字自然記住。",
    skills: ["主題單字", "顏色數字", "簡單問答", "分類能力"],
    vocabulary: 150, lessons: 24,
    topics: ["顏色 Colors", "數字 1-100", "食物 Food", "動物 Animals", "身體 Body Parts", "家人 Family"],
    sampleWords: ["red", "blue", "twenty", "pizza", "elephant", "hand"],
    sampleSentences: ["I like red.", "How many apples?", "This is my hand."],
    phonics: "Long vowels + magic E + vowel teams (ee, ea, oa, ai)",
  },
  {
    level: 4, slug: "l4-school-road", island: "學校路", islandEn: "School Road",
    world: "友善小鎮", worldEmoji: "🏡",
    color: "bg-amber-50", borderColor: "border-amber-200", bgGradient: "from-amber-50 to-yellow-50", tag: "基礎句型",
    description: "基本句型：I am / You are / This is / I like / I can",
    longDescription: "在學校路上學習英文的基本句型！I am... / You are... / This is... / I like... / I can... 透過角色扮演、對話練習，讓孩子自然說出完整的英文句子。",
    skills: ["基本句型", "自我介紹", "喜好表達", "能力描述"],
    vocabulary: 180, lessons: 24,
    topics: ["I am + adj", "This is / That is", "I like + noun", "I can + verb", "Yes/No 問答"],
    sampleWords: ["happy", "school", "teacher", "playground", "library"],
    sampleSentences: ["I am happy.", "This is my school.", "I can swim.", "Do you like pizza?"],
    grammar: "Be 動詞 (am/is/are) + can + 簡單 Yes/No 問答",
  },
  {
    level: 5, slug: "l5-coral-beach", island: "珊瑚灘", islandEn: "Coral Beach",
    world: "海洋灣", worldEmoji: "🌊",
    color: "bg-cyan-50", borderColor: "border-cyan-200", bgGradient: "from-cyan-50 to-blue-50", tag: "閱讀起步",
    description: "短篇故事閱讀、對話練習、形容詞比較",
    longDescription: "來到美麗的珊瑚灘，開始閱讀英文短篇故事！學習更豐富的形容詞、比較級，透過故事理解文意。對話練習也升級，能進行更完整的日常對話。",
    skills: ["短篇閱讀", "故事理解", "形容詞比較", "日常對話"],
    vocabulary: 250, lessons: 24,
    topics: ["短篇故事", "形容詞 big/small/tall", "比較級 bigger/smaller", "天氣 Weather", "時間 Time"],
    sampleWords: ["bigger", "weather", "sunny", "o'clock", "story"],
    sampleSentences: ["It is sunny today.", "The elephant is bigger than the cat.", "What time is it?"],
    grammar: "形容詞比較級 (-er) + 天氣句型 + 時間表達",
  },
  {
    level: 6, slug: "l6-lighthouse-point", island: "燈塔角", islandEn: "Lighthouse Point",
    world: "海洋灣", worldEmoji: "🌊",
    color: "bg-blue-50", borderColor: "border-blue-200", bgGradient: "from-blue-50 to-indigo-50", tag: "進階對話",
    description: "生活對話、描述事物、表達意見",
    longDescription: "在燈塔角學習更進階的對話技巧！描述事物的外觀和特性、表達自己的意見和喜好、進行多回合對話。閱讀難度也提升，開始接觸更長的文章。",
    skills: ["進階對話", "描述能力", "意見表達", "長文閱讀"],
    vocabulary: 320, lessons: 24,
    topics: ["描述外觀", "表達意見", "購物對話", "餐廳點餐", "問路指路"],
    sampleWords: ["beautiful", "expensive", "delicious", "straight", "corner"],
    sampleSentences: ["I think it's beautiful.", "How much is this?", "Turn left at the corner."],
    grammar: "How much/many + 祈使句 + 描述句型",
  },
  {
    level: 7, slug: "l7-grammar-gate", island: "文法門", islandEn: "Grammar Gate",
    world: "故事城堡", worldEmoji: "🏰",
    color: "bg-purple-50", borderColor: "border-purple-200", bgGradient: "from-purple-50 to-violet-50", tag: "文法養成",
    description: "現在簡單式、頻率副詞、介系詞",
    longDescription: "推開文法門，正式進入英文文法的世界！系統性學習現在簡單式、頻率副詞（always, sometimes, never）、介系詞（in, on, at），讓孩子的英文從「會說」進化到「說對」。",
    skills: ["現在簡單式", "頻率副詞", "介系詞", "規則動詞"],
    vocabulary: 400, lessons: 24,
    topics: ["現在簡單式", "頻率副詞", "介系詞 in/on/at/under", "規則動詞三態", "There is/are"],
    sampleWords: ["always", "sometimes", "under", "between", "behind"],
    sampleSentences: ["I always eat breakfast.", "The book is on the table.", "There are three cats."],
    grammar: "Present Simple + frequency adverbs + prepositions of place",
  },
  {
    level: 8, slug: "l8-question-tower", island: "問題塔", islandEn: "Question Tower",
    world: "故事城堡", worldEmoji: "🏰",
    color: "bg-violet-50", borderColor: "border-violet-200", bgGradient: "from-violet-50 to-purple-50", tag: "疑問句",
    description: "Wh- 問句、助動詞、否定句",
    longDescription: "爬上問題塔，成為提問達人！學會所有 Wh- 問句（What/Where/When/Who/Why/How）、助動詞 do/does 的用法、否定句的表達。能夠用英文問問題和完整回答。",
    skills: ["Wh-問句", "助動詞", "否定句", "完整回答"],
    vocabulary: 480, lessons: 24,
    topics: ["What/Where/When 問句", "Who/Why/How 問句", "Do/Does 助動詞", "否定句 don't/doesn't", "How many/much"],
    sampleWords: ["where", "because", "doesn't", "often", "favorite"],
    sampleSentences: ["Where do you live?", "Why do you like it?", "She doesn't like spiders."],
    grammar: "Wh-questions + do/does + negative sentences",
  },
  {
    level: 9, slug: "l9-time-travel-path", island: "時光道", islandEn: "Time Travel Path",
    world: "探索大陸", worldEmoji: "🌍",
    color: "bg-green-50", borderColor: "border-green-200", bgGradient: "from-green-50 to-emerald-50", tag: "時態學習",
    description: "過去式、未來式、進行式",
    longDescription: "踏上時光道，學習英文的時態！過去式（-ed 和不規則動詞）、未來式（will / be going to）、現在進行式（be + V-ing）。能夠描述過去的事件、現在進行的動作、未來的計畫。",
    skills: ["過去式", "未來式", "進行式", "時態切換"],
    vocabulary: 560, lessons: 24,
    topics: ["過去式 -ed", "不規則動詞", "現在進行式", "未來式 will", "be going to"],
    sampleWords: ["went", "saw", "ate", "will", "going to"],
    sampleSentences: ["I went to the park yesterday.", "She is reading a book.", "We will go tomorrow."],
    grammar: "Past Simple + Present Continuous + Future (will / be going to)",
  },
  {
    level: 10, slug: "l10-future-bridge", island: "未來橋", islandEn: "Future Bridge",
    world: "探索大陸", worldEmoji: "🌍",
    color: "bg-emerald-50", borderColor: "border-emerald-200", bgGradient: "from-emerald-50 to-green-50", tag: "長篇讀寫",
    description: "長篇閱讀、短文寫作、連接詞",
    longDescription: "跨越未來橋，挑戰長篇閱讀和短文寫作！學習連接詞（and, but, because, so）串聯句子，閱讀 150-200 字的文章並回答問題，開始寫出 5-8 句的完整短文。",
    skills: ["長篇閱讀", "短文寫作", "連接詞", "段落結構"],
    vocabulary: 650, lessons: 24,
    topics: ["連接詞 and/but/because/so", "段落閱讀", "短文寫作", "信件格式", "日記寫作"],
    sampleWords: ["because", "however", "finally", "paragraph", "topic"],
    sampleSentences: ["I like summer because it's hot.", "First, I woke up. Then, I ate breakfast.", "Dear Mom, ..."],
    grammar: "Conjunctions + paragraph writing + letter format",
  },
  {
    level: 11, slug: "l11-challenge-arena", island: "挑戰場", islandEn: "Challenge Arena",
    world: "冠軍峰", worldEmoji: "🎓",
    color: "bg-pink-50", borderColor: "border-pink-200", bgGradient: "from-pink-50 to-rose-50", tag: "綜合挑戰",
    description: "綜合練習、模擬測驗、弱點加強",
    longDescription: "進入挑戰場，把之前學的全部融合！綜合性的練習涵蓋聽說讀寫四技能，模擬英檢初級的題型和難度。系統會自動分析弱點，針對性加強訓練。",
    skills: ["綜合練習", "模擬測驗", "弱點分析", "策略運用"],
    vocabulary: 750, lessons: 24,
    topics: ["英檢初級聽力模擬", "英檢初級閱讀模擬", "綜合文法練習", "主題式寫作", "看圖說故事"],
    sampleWords: ["practice", "review", "improve", "challenge", "achievement"],
    sampleSentences: ["Listen and choose the correct answer.", "Read the passage and answer the questions."],
    grammar: "全部文法總複習 + 英檢題型練習",
  },
  {
    level: 12, slug: "l12-victory-summit", island: "勝利峰", islandEn: "Victory Summit",
    world: "冠軍峰", worldEmoji: "🎓",
    color: "bg-rose-50", borderColor: "border-rose-200", bgGradient: "from-rose-50 to-pink-50", tag: "英檢衝刺",
    description: "英檢初級模擬、總複習、畢業挑戰",
    longDescription: "登上勝利峰的最後衝刺！完整的英檢初級模擬測驗、總複習、畢業挑戰。完成所有關卡後獲得畢業證書，證明你已具備英檢初級的英語能力！",
    skills: ["英檢模擬", "總複習", "實力檢測", "畢業認證"],
    vocabulary: 850, lessons: 24,
    topics: ["英檢初級完整模擬", "口說測驗模擬", "寫作測驗模擬", "畢業挑戰賽", "成果展示"],
    sampleWords: ["certificate", "graduation", "champion", "journey", "complete"],
    sampleSentences: ["Congratulations! You've completed the journey!", "You are now an English champion!"],
    grammar: "GEPT Elementary 全範圍",
  },
];

export const CHARACTERS = [
  { emoji: "🦊", name: "Finn", role: "探險隊長", skill: "課程引導", color: "orange" },
  { emoji: "🐱", name: "Coco", role: "聽力高手", skill: "聽力訓練", color: "blue" },
  { emoji: "🦜", name: "Polly", role: "口說達人", skill: "口說練習", color: "green" },
  { emoji: "🐻", name: "Benny", role: "閱讀博士", skill: "閱讀理解", color: "purple" },
  { emoji: "🐰", name: "Ruby", role: "寫作天才", skill: "拼寫寫作", color: "pink" },
];

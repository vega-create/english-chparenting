/* ============================================================
   單字資料庫 Word Bank — 課文與遊戲共用的單一資料源
   每個字帶：KK 音標 + 國際音標(IPA) + 自然發音 pattern + 例句 + 發音音檔位
   對齊教育部/GEPT 基礎字彙（official 旗標待抓官方 1200 字表後複核）

   發音音檔：先用 ElevenLabs 生成 `w-<en>.mp3` 放 public/lessons/wordbank/
   （或 R2），播放優先真人聲、無檔 fallback 瀏覽器 TTS
============================================================ */

export interface WordEntry {
  en: string;
  zh: string;
  kk: string;            // KK 音標（美式）
  ipa: string;           // 國際音標
  phonics: string;       // 自然發音規則（中文說明）
  phonicsSound: string;  // 該字重點音
  image: string;         // emoji（之後可換 GPT 生圖）
  example: string;
  exampleZh: string;
  audio: string;         // 發音音檔檔名
  level: number;
  letter?: string;       // L1：代表字母
  vowel?: string;        // L2：短母音分類
  official?: boolean;    // 是否教育部/GEPT 官方字（provisional，待複核）
}

/* ============================================================
   L1 字母島 Letter Island — 26 字母代表字（字母名 + 字母音）
============================================================ */
export const WORDBANK_L1: WordEntry[] = [
  { letter: "A", en: "apple", zh: "蘋果", kk: "[ˈæpl̩]", ipa: "/ˈæpəl/", phonics: "字首短母音 a", phonicsSound: "/æ/", image: "🍎", example: "I see a red apple.", exampleZh: "我看到一顆紅蘋果。", audio: "w-apple.mp3", level: 1, official: true },
  { letter: "B", en: "ball", zh: "球", kk: "[bɔl]", ipa: "/bɔːl/", phonics: "字首子音 b", phonicsSound: "/b/", image: "⚽", example: "The ball is big.", exampleZh: "這顆球很大。", audio: "w-ball.mp3", level: 1, official: true },
  { letter: "C", en: "cat", zh: "貓", kk: "[kæt]", ipa: "/kæt/", phonics: "字首子音 c", phonicsSound: "/k/", image: "🐱", example: "The cat is cute.", exampleZh: "這隻貓很可愛。", audio: "w-cat.mp3", level: 1, official: true },
  { letter: "D", en: "dog", zh: "狗", kk: "[dɔɡ]", ipa: "/dɔːɡ/", phonics: "字首子音 d", phonicsSound: "/d/", image: "🐶", example: "My dog can run.", exampleZh: "我的狗會跑。", audio: "w-dog.mp3", level: 1, official: true },
  { letter: "E", en: "egg", zh: "蛋", kk: "[ɛɡ]", ipa: "/ɛɡ/", phonics: "字首短母音 e", phonicsSound: "/ɛ/", image: "🥚", example: "I like eggs.", exampleZh: "我喜歡蛋。", audio: "w-egg.mp3", level: 1, official: true },
  { letter: "F", en: "fish", zh: "魚", kk: "[fɪʃ]", ipa: "/fɪʃ/", phonics: "字首子音 f", phonicsSound: "/f/", image: "🐟", example: "The fish can swim.", exampleZh: "魚會游泳。", audio: "w-fish.mp3", level: 1, official: true },
  { letter: "G", en: "goat", zh: "山羊", kk: "[ɡot]", ipa: "/ɡoʊt/", phonics: "字首子音 g", phonicsSound: "/ɡ/", image: "🐐", example: "The goat is white.", exampleZh: "這隻山羊是白色的。", audio: "w-goat.mp3", level: 1, official: true },
  { letter: "H", en: "hat", zh: "帽子", kk: "[hæt]", ipa: "/hæt/", phonics: "字首子音 h", phonicsSound: "/h/", image: "🎩", example: "This is my hat.", exampleZh: "這是我的帽子。", audio: "w-hat.mp3", level: 1, official: true },
  { letter: "I", en: "igloo", zh: "冰屋", kk: "[ˈɪɡlu]", ipa: "/ˈɪɡluː/", phonics: "字首短母音 i", phonicsSound: "/ɪ/", image: "🛖", example: "An igloo is cold.", exampleZh: "冰屋很冷。", audio: "w-igloo.mp3", level: 1, official: false },
  { letter: "J", en: "jam", zh: "果醬", kk: "[dʒæm]", ipa: "/dʒæm/", phonics: "字首子音 j", phonicsSound: "/dʒ/", image: "🍓", example: "I like jam.", exampleZh: "我喜歡果醬。", audio: "w-jam.mp3", level: 1, official: true },
  { letter: "K", en: "kite", zh: "風箏", kk: "[kaɪt]", ipa: "/kaɪt/", phonics: "字首子音 k", phonicsSound: "/k/", image: "🪁", example: "The kite can fly.", exampleZh: "風箏會飛。", audio: "w-kite.mp3", level: 1, official: true },
  { letter: "L", en: "lion", zh: "獅子", kk: "[ˈlaɪən]", ipa: "/ˈlaɪən/", phonics: "字首子音 l", phonicsSound: "/l/", image: "🦁", example: "The lion is big.", exampleZh: "獅子很大。", audio: "w-lion.mp3", level: 1, official: true },
  { letter: "M", en: "moon", zh: "月亮", kk: "[mun]", ipa: "/muːn/", phonics: "字首子音 m", phonicsSound: "/m/", image: "🌙", example: "The moon is bright.", exampleZh: "月亮很亮。", audio: "w-moon.mp3", level: 1, official: true },
  { letter: "N", en: "nest", zh: "鳥巢", kk: "[nɛst]", ipa: "/nɛst/", phonics: "字首子音 n", phonicsSound: "/n/", image: "🪺", example: "A bird is in the nest.", exampleZh: "有隻鳥在鳥巢裡。", audio: "w-nest.mp3", level: 1, official: false },
  { letter: "O", en: "orange", zh: "柳橙", kk: "[ˈɔrɪndʒ]", ipa: "/ˈɔːrɪndʒ/", phonics: "字首短母音 o", phonicsSound: "/ɔ/", image: "🍊", example: "The orange is sweet.", exampleZh: "柳橙很甜。", audio: "w-orange.mp3", level: 1, official: true },
  { letter: "P", en: "pig", zh: "豬", kk: "[pɪɡ]", ipa: "/pɪɡ/", phonics: "字首子音 p", phonicsSound: "/p/", image: "🐷", example: "The pig is pink.", exampleZh: "豬是粉紅色的。", audio: "w-pig.mp3", level: 1, official: true },
  { letter: "Q", en: "queen", zh: "皇后", kk: "[kwin]", ipa: "/kwiːn/", phonics: "字首 qu 拼音 /kw/", phonicsSound: "/kw/", image: "👑", example: "The queen is kind.", exampleZh: "皇后很善良。", audio: "w-queen.mp3", level: 1, official: true },
  { letter: "R", en: "rabbit", zh: "兔子", kk: "[ˈræbɪt]", ipa: "/ˈræbɪt/", phonics: "字首子音 r", phonicsSound: "/r/", image: "🐰", example: "The rabbit can hop.", exampleZh: "兔子會跳。", audio: "w-rabbit.mp3", level: 1, official: true },
  { letter: "S", en: "sun", zh: "太陽", kk: "[sʌn]", ipa: "/sʌn/", phonics: "字首子音 s", phonicsSound: "/s/", image: "☀️", example: "The sun is hot.", exampleZh: "太陽很熱。", audio: "w-sun.mp3", level: 1, official: true },
  { letter: "T", en: "tiger", zh: "老虎", kk: "[ˈtaɪɡɚ]", ipa: "/ˈtaɪɡər/", phonics: "字首子音 t", phonicsSound: "/t/", image: "🐯", example: "The tiger is strong.", exampleZh: "老虎很強壯。", audio: "w-tiger.mp3", level: 1, official: true },
  { letter: "U", en: "umbrella", zh: "雨傘", kk: "[ʌmˈbrɛlə]", ipa: "/ʌmˈbrɛlə/", phonics: "字首短母音 u", phonicsSound: "/ʌ/", image: "☂️", example: "I have an umbrella.", exampleZh: "我有一把雨傘。", audio: "w-umbrella.mp3", level: 1, official: true },
  { letter: "V", en: "van", zh: "廂型車", kk: "[væn]", ipa: "/væn/", phonics: "字首子音 v", phonicsSound: "/v/", image: "🚐", example: "The van is blue.", exampleZh: "這台廂型車是藍色的。", audio: "w-van.mp3", level: 1, official: true },
  { letter: "W", en: "watch", zh: "手錶", kk: "[wɑtʃ]", ipa: "/wɑːtʃ/", phonics: "字首子音 w", phonicsSound: "/w/", image: "⌚", example: "Look at my watch.", exampleZh: "看我的手錶。", audio: "w-watch.mp3", level: 1, official: true },
  { letter: "X", en: "fox", zh: "狐狸", kk: "[fɑks]", ipa: "/fɑːks/", phonics: "字尾 x 拼音 /ks/", phonicsSound: "/ks/", image: "🦊", example: "The fox is fast.", exampleZh: "狐狸很快。", audio: "w-fox.mp3", level: 1, official: true },
  { letter: "Y", en: "yoyo", zh: "溜溜球", kk: "[ˈjojo]", ipa: "/ˈjoʊjoʊ/", phonics: "字首子音 y /j/", phonicsSound: "/j/", image: "🪀", example: "I play with a yoyo.", exampleZh: "我玩溜溜球。", audio: "w-yoyo.mp3", level: 1, official: false },
  { letter: "Z", en: "zebra", zh: "斑馬", kk: "[ˈzibrə]", ipa: "/ˈziːbrə/", phonics: "字首子音 z", phonicsSound: "/z/", image: "🦓", example: "The zebra is black and white.", exampleZh: "斑馬是黑白的。", audio: "w-zebra.mp3", level: 1, official: true },
];

/* ============================================================
   L2 聲音島 Sound Island — CVC 短母音字（自然發音拼讀）
   短母音 a / e / i / o / u 各 6 字，含押韻家族
============================================================ */
export const WORDBANK_L2: WordEntry[] = [
  // 短母音 a /æ/
  { vowel: "a", en: "cat", zh: "貓", kk: "[kæt]", ipa: "/kæt/", phonics: "CVC 短母音 a", phonicsSound: "/æ/", image: "🐱", example: "The cat sat on the mat.", exampleZh: "貓坐在墊子上。", audio: "w-cat.mp3", level: 2, official: true },
  { vowel: "a", en: "bat", zh: "蝙蝠", kk: "[bæt]", ipa: "/bæt/", phonics: "CVC 短母音 a", phonicsSound: "/æ/", image: "🦇", example: "The bat is black.", exampleZh: "蝙蝠是黑色的。", audio: "w-bat.mp3", level: 2, official: true },
  { vowel: "a", en: "hat", zh: "帽子", kk: "[hæt]", ipa: "/hæt/", phonics: "CVC 短母音 a", phonicsSound: "/æ/", image: "🎩", example: "I have a red hat.", exampleZh: "我有一頂紅帽子。", audio: "w-hat.mp3", level: 2, official: true },
  { vowel: "a", en: "map", zh: "地圖", kk: "[mæp]", ipa: "/mæp/", phonics: "CVC 短母音 a", phonicsSound: "/æ/", image: "🗺️", example: "Look at the map.", exampleZh: "看這張地圖。", audio: "w-map.mp3", level: 2, official: true },
  { vowel: "a", en: "bag", zh: "袋子", kk: "[bæɡ]", ipa: "/bæɡ/", phonics: "CVC 短母音 a", phonicsSound: "/æ/", image: "👜", example: "My bag is big.", exampleZh: "我的袋子很大。", audio: "w-bag.mp3", level: 2, official: true },
  { vowel: "a", en: "fan", zh: "扇子", kk: "[fæn]", ipa: "/fæn/", phonics: "CVC 短母音 a", phonicsSound: "/æ/", image: "🪭", example: "The fan is on.", exampleZh: "電扇開著。", audio: "w-fan.mp3", level: 2, official: true },
  // 短母音 e /ɛ/
  { vowel: "e", en: "bed", zh: "床", kk: "[bɛd]", ipa: "/bɛd/", phonics: "CVC 短母音 e", phonicsSound: "/ɛ/", image: "🛏️", example: "I sleep in my bed.", exampleZh: "我睡在我的床上。", audio: "w-bed.mp3", level: 2, official: true },
  { vowel: "e", en: "pen", zh: "筆", kk: "[pɛn]", ipa: "/pɛn/", phonics: "CVC 短母音 e", phonicsSound: "/ɛ/", image: "🖊️", example: "This is a red pen.", exampleZh: "這是一支紅筆。", audio: "w-pen.mp3", level: 2, official: true },
  { vowel: "e", en: "hen", zh: "母雞", kk: "[hɛn]", ipa: "/hɛn/", phonics: "CVC 短母音 e", phonicsSound: "/ɛ/", image: "🐔", example: "The hen is fat.", exampleZh: "母雞很胖。", audio: "w-hen.mp3", level: 2, official: true },
  { vowel: "e", en: "net", zh: "網子", kk: "[nɛt]", ipa: "/nɛt/", phonics: "CVC 短母音 e", phonicsSound: "/ɛ/", image: "🥅", example: "The net is big.", exampleZh: "網子很大。", audio: "w-net.mp3", level: 2, official: true },
  { vowel: "e", en: "red", zh: "紅色", kk: "[rɛd]", ipa: "/rɛd/", phonics: "CVC 短母音 e", phonicsSound: "/ɛ/", image: "🔴", example: "The apple is red.", exampleZh: "蘋果是紅色的。", audio: "w-red.mp3", level: 2, official: true },
  { vowel: "e", en: "leg", zh: "腿", kk: "[lɛɡ]", ipa: "/lɛɡ/", phonics: "CVC 短母音 e", phonicsSound: "/ɛ/", image: "🦵", example: "I have two legs.", exampleZh: "我有兩條腿。", audio: "w-leg.mp3", level: 2, official: true },
  // 短母音 i /ɪ/
  { vowel: "i", en: "pig", zh: "豬", kk: "[pɪɡ]", ipa: "/pɪɡ/", phonics: "CVC 短母音 i", phonicsSound: "/ɪ/", image: "🐷", example: "The pig is big.", exampleZh: "豬很大。", audio: "w-pig.mp3", level: 2, official: true },
  { vowel: "i", en: "six", zh: "六", kk: "[sɪks]", ipa: "/sɪks/", phonics: "CVC 短母音 i", phonicsSound: "/ɪ/", image: "6️⃣", example: "I am six.", exampleZh: "我六歲。", audio: "w-six.mp3", level: 2, official: true },
  { vowel: "i", en: "sit", zh: "坐", kk: "[sɪt]", ipa: "/sɪt/", phonics: "CVC 短母音 i", phonicsSound: "/ɪ/", image: "🪑", example: "Sit down, please.", exampleZh: "請坐下。", audio: "w-sit.mp3", level: 2, official: true },
  { vowel: "i", en: "lip", zh: "嘴唇", kk: "[lɪp]", ipa: "/lɪp/", phonics: "CVC 短母音 i", phonicsSound: "/ɪ/", image: "👄", example: "My lips are red.", exampleZh: "我的嘴唇是紅的。", audio: "w-lip.mp3", level: 2, official: true },
  { vowel: "i", en: "pin", zh: "別針", kk: "[pɪn]", ipa: "/pɪn/", phonics: "CVC 短母音 i", phonicsSound: "/ɪ/", image: "📌", example: "The pin is small.", exampleZh: "別針很小。", audio: "w-pin.mp3", level: 2, official: true },
  { vowel: "i", en: "big", zh: "大的", kk: "[bɪɡ]", ipa: "/bɪɡ/", phonics: "CVC 短母音 i", phonicsSound: "/ɪ/", image: "🔵", example: "The dog is big.", exampleZh: "狗很大。", audio: "w-big.mp3", level: 2, official: true },
  // 短母音 o /ɑ/
  { vowel: "o", en: "box", zh: "箱子", kk: "[bɑks]", ipa: "/bɑːks/", phonics: "CVC 短母音 o", phonicsSound: "/ɑ/", image: "📦", example: "The box is big.", exampleZh: "箱子很大。", audio: "w-box.mp3", level: 2, official: true },
  { vowel: "o", en: "fox", zh: "狐狸", kk: "[fɑks]", ipa: "/fɑːks/", phonics: "CVC 短母音 o", phonicsSound: "/ɑ/", image: "🦊", example: "The fox can run.", exampleZh: "狐狸會跑。", audio: "w-fox.mp3", level: 2, official: true },
  { vowel: "o", en: "hot", zh: "熱的", kk: "[hɑt]", ipa: "/hɑːt/", phonics: "CVC 短母音 o", phonicsSound: "/ɑ/", image: "🔥", example: "The sun is hot.", exampleZh: "太陽很熱。", audio: "w-hot.mp3", level: 2, official: true },
  { vowel: "o", en: "top", zh: "頂端", kk: "[tɑp]", ipa: "/tɑːp/", phonics: "CVC 短母音 o", phonicsSound: "/ɑ/", image: "🔝", example: "Go to the top.", exampleZh: "到頂端去。", audio: "w-top.mp3", level: 2, official: true },
  { vowel: "o", en: "pot", zh: "鍋子", kk: "[pɑt]", ipa: "/pɑːt/", phonics: "CVC 短母音 o", phonicsSound: "/ɑ/", image: "🍲", example: "The pot is hot.", exampleZh: "鍋子很燙。", audio: "w-pot.mp3", level: 2, official: true },
  { vowel: "o", en: "mop", zh: "拖把", kk: "[mɑp]", ipa: "/mɑːp/", phonics: "CVC 短母音 o", phonicsSound: "/ɑ/", image: "🧹", example: "I use a mop.", exampleZh: "我用拖把。", audio: "w-mop.mp3", level: 2, official: false },
  // 短母音 u /ʌ/
  { vowel: "u", en: "cup", zh: "杯子", kk: "[kʌp]", ipa: "/kʌp/", phonics: "CVC 短母音 u", phonicsSound: "/ʌ/", image: "🥤", example: "The cup is red.", exampleZh: "杯子是紅色的。", audio: "w-cup.mp3", level: 2, official: true },
  { vowel: "u", en: "bus", zh: "公車", kk: "[bʌs]", ipa: "/bʌs/", phonics: "CVC 短母音 u", phonicsSound: "/ʌ/", image: "🚌", example: "The bus is big.", exampleZh: "公車很大。", audio: "w-bus.mp3", level: 2, official: true },
  { vowel: "u", en: "sun", zh: "太陽", kk: "[sʌn]", ipa: "/sʌn/", phonics: "CVC 短母音 u", phonicsSound: "/ʌ/", image: "☀️", example: "The sun is hot.", exampleZh: "太陽很熱。", audio: "w-sun.mp3", level: 2, official: true },
  { vowel: "u", en: "bug", zh: "蟲", kk: "[bʌɡ]", ipa: "/bʌɡ/", phonics: "CVC 短母音 u", phonicsSound: "/ʌ/", image: "🐛", example: "The bug is small.", exampleZh: "蟲很小。", audio: "w-bug.mp3", level: 2, official: true },
  { vowel: "u", en: "run", zh: "跑", kk: "[rʌn]", ipa: "/rʌn/", phonics: "CVC 短母音 u", phonicsSound: "/ʌ/", image: "🏃", example: "I can run fast.", exampleZh: "我可以跑很快。", audio: "w-run.mp3", level: 2, official: true },
  { vowel: "u", en: "nut", zh: "堅果", kk: "[nʌt]", ipa: "/nʌt/", phonics: "CVC 短母音 u", phonicsSound: "/ʌ/", image: "🥜", example: "I like nuts.", exampleZh: "我喜歡堅果。", audio: "w-nut.mp3", level: 2, official: true },
];

export const WORDBANK: WordEntry[] = [...WORDBANK_L1, ...WORDBANK_L2];

// 依級別取字
export function getWordsByLevel(level: number): WordEntry[] {
  return WORDBANK.filter(w => w.level === level);
}
// 依英文字查
export function getWord(en: string): WordEntry | undefined {
  return WORDBANK.find(w => w.en.toLowerCase() === en.toLowerCase());
}
// L2：依短母音取一組（給拼讀課/遊戲用）
export function getWordsByVowel(vowel: string): WordEntry[] {
  return WORDBANK_L2.filter(w => w.vowel === vowel);
}

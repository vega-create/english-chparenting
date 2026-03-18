export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  cover: { emoji: string; gradient: string; subtitle: string };
  content: string; // markdown
}

export const BLOG_CATEGORIES = [
  { slug: "phonics", name: "自然發音", emoji: "🔤", description: "Phonics 教學方法與技巧" },
  { slug: "vocabulary", name: "單字學習", emoji: "📚", description: "有效記單字的方法" },
  { slug: "speaking", name: "口說練習", emoji: "🗣️", description: "讓孩子勇敢開口說英文" },
  { slug: "reading", name: "閱讀養成", emoji: "📖", description: "培養英文閱讀習慣" },
  { slug: "parenting", name: "家長指南", emoji: "👨‍👩‍👧", description: "家長如何協助孩子學英文" },
  { slug: "exam", name: "英檢準備", emoji: "📝", description: "全民英檢初級準備攻略" },
  { slug: "resources", name: "學習資源", emoji: "🎯", description: "推薦書籍、App、教材" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "phonics-vs-kk-which-is-better",
    title: "Phonics 自然發音 vs KK 音標：哪個適合你的孩子？完整比較指南",
    description: "Phonics 和 KK 音標是台灣最常見的兩種發音教學法。本文完整比較兩者的優缺點，幫助家長選擇最適合孩子的學習方式。",
    date: "2026-03-15",
    category: "phonics",
    tags: ["Phonics", "KK音標", "自然發音", "兒童英文", "發音教學"],
    readTime: 8,
    cover: { emoji: "🔤", gradient: "from-blue-500 via-purple-500 to-pink-500", subtitle: "Phonics vs KK 音標完整比較" },
    content: `## 什麼是 Phonics 自然發音？

Phonics（自然發音法）是英語系國家最普遍的發音教學法。它教導孩子**字母與發音的對應規則**，讓孩子看到字就能讀出來，聽到音就能拼出來。

### Phonics 的核心概念

- **字母音（Letter Sounds）**：每個字母有固定的發音
- **混合拼讀（Blending）**：把個別字母音組合成單字
- **分割（Segmenting）**：把單字拆解成個別音

例如：c-a-t → 把三個音混合 → "cat"

## 什麼是 KK 音標？

KK 音標是台灣傳統英語教育使用的發音標記系統，由美國語言學家 John S. Kenyon 和 Thomas A. Knott 編制。

### KK 音標的特色

- 使用**特殊符號**標記每個發音
- 需要額外學習一套符號系統
- 台灣國中英語課程必學

## 完整比較

| 比較項目 | Phonics 自然發音 | KK 音標 |
|---------|----------------|---------|
| 適合年齡 | 3-8 歲最佳 | 10 歲以上 |
| 學習門檻 | 低，直覺式 | 高，需記符號 |
| 閱讀幫助 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 發音精準度 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 國際通用 | ✅ 全球英語系國家 | ❌ 僅台灣使用 |
| 自學效果 | ✅ 高 | ⚠️ 需老師教 |

## 我們的建議：先 Phonics，後 KK

**5-8 歲**：先學 Phonics，建立「看字讀音」的能力。
**9-12 歲**：加入 KK 音標，銜接國中課程。

這也是 Adventure English 冒險英語的教學策略：L1-L4 以 Phonics 為主，L5 開始逐步引入 KK 音標，讓兩套系統互補。

## 延伸閱讀

想讓孩子從零開始學 Phonics？試試我們的 **L1 字母島** 和 **L2 聲音島**，完全免費，AI 互動教學讓孩子自己就能學會！`,
  },
  {
    slug: "how-to-help-kids-speak-english-at-home",
    title: "在家就能做！5 個讓孩子自然開口說英文的方法",
    description: "不需要花大錢上全美語班，在家就能創造英文環境。5 個經過驗證的方法，讓孩子從害怕說英文變成主動開口。",
    date: "2026-03-10",
    category: "speaking",
    tags: ["口說練習", "居家英文", "親子英文", "開口說英文"],
    readTime: 6,
    cover: { emoji: "🗣️", gradient: "from-green-400 via-teal-500 to-blue-500", subtitle: "5 個方法讓孩子自然開口說英文" },
    content: `## 為什麼孩子不敢說英文？

很多台灣孩子英文考試考得不錯，但一到要開口的時候就退縮。這不是因為他們不會，而是因為：

1. **怕說錯被笑**
2. **沒有說英文的環境和機會**
3. **從來沒有「成功說英文」的經驗**

解決方法不是補更多課，而是**創造安全、有趣的說英文機會**。

## 方法一：每天 5 分鐘英文時間

不需要一整天都說英文。選擇每天固定的 5 分鐘，例如吃早餐時：

- "Good morning! How are you today?"
- "What do you want for breakfast?"
- "It's sunny/rainy today!"

**重點：不管孩子怎麼回答，都給正面回饋。**

## 方法二：英文歌曲和韻文

音樂是語言學習最強的工具。推薦：

- Super Simple Songs（適合 3-6 歲）
- Mother Goose Club（經典童謠）
- Pinkfong（Baby Shark 那個）

**技巧：** 不只聽，要一起唱、一起做動作。

## 方法三：AI 語音互動

現在有很多 AI 工具可以陪孩子練口說，不會因為孩子說錯而嘲笑，會耐心地一直陪練習。

**Adventure English 冒險英語** 的每堂課都有 Talk Time 環節，AI 角色 Polly 會跟孩子對話，而且會根據孩子的程度調整難度。

## 方法四：角色扮演遊戲

把英文融入遊戲中：

- 假裝開餐廳："May I help you?" "I want pizza, please."
- 假裝當老師：讓孩子教玩偶說英文
- 假裝在旅行："Where are we going?" "Let's go to the beach!"

## 方法五：錄影分享

讓孩子錄一段英文自我介紹，傳給阿公阿嬤看。當孩子得到「哇好厲害！」的回饋，自信心就會大增。

## 最重要的一件事

**永遠不要在孩子說英文時糾正發音或文法。** 先讓他敢說，說的量夠了，自然會越說越好。就像學中文一樣，沒有小孩是先學完注音符號才開口說話的。`,
  },
  {
    slug: "best-english-books-for-kids-2026",
    title: "2026 年最推薦的 10 本兒童英文繪本｜按年齡分類",
    description: "精選 10 本適合 3-12 歲孩子的英文繪本，從簡單到進階，培養孩子的英文閱讀興趣和能力。附 Amazon 和博客來購買連結。",
    date: "2026-03-08",
    category: "resources",
    tags: ["英文繪本", "兒童書籍", "閱讀推薦", "英文書單"],
    readTime: 10,
    cover: { emoji: "📚", gradient: "from-orange-400 via-red-400 to-pink-500", subtitle: "10 本最推薦的兒童英文繪本" },
    content: `## 為什麼要讀英文繪本？

英文繪本是培養閱讀習慣最自然的方式：

- **圖片幫助理解**：不需要每個字都認識
- **重複句型**：自然記住常用句型
- **有趣故事**：孩子主動想看下一頁

## 3-5 歲入門推薦

### 1. Brown Bear, Brown Bear, What Do You See?
**作者：** Eric Carle
**特色：** 重複句型 + 鮮豔顏色 + 動物主題，適合最初接觸英文的小小孩。
**學到：** 顏色、動物名稱、"What do you see?" 句型

### 2. The Very Hungry Caterpillar
**作者：** Eric Carle
**特色：** 經典中的經典！數字、食物、星期幾全部學到。
**學到：** 數字 1-5、食物單字、星期一到日

### 3. Dear Zoo
**作者：** Rod Campbell
**特色：** 翻翻書互動設計，每一頁翻開都是驚喜。
**學到：** 動物、形容詞 (too big, too tall, too scary)

## 5-8 歲進階推薦

### 4. Pete the Cat: I Love My White Shoes
**作者：** Eric Litwin
**特色：** 有歌可以唱！節奏感超強，孩子會一直重複。
**學到：** 顏色、情緒、重複句型

### 5. Fly Guy 系列
**作者：** Tedd Arnold
**特色：** 橋樑書，從繪本過渡到章節書的最佳選擇。
**學到：** 簡單句型、幽默表達、閱讀理解

### 6. Elephant & Piggie 系列
**作者：** Mo Willems
**特色：** 對話式繪本，超適合親子共讀和角色扮演。
**學到：** 日常對話、情緒表達、標點符號

## 8-12 歲挑戰推薦

### 7. Magic Tree House 系列
**作者：** Mary Pope Osborne
**特色：** 冒險 + 知識，每本一個歷史主題。
**學到：** 過去式、描述句、故事結構

### 8. Diary of a Wimpy Kid 系列
**作者：** Jeff Kinney
**特色：** 漫畫 + 日記形式，超受歡迎。
**學到：** 日常用語、俚語、幽默表達

### 9. Dog Man 系列
**作者：** Dav Pilkey
**特色：** Captain Underpants 作者的新系列，圖多字少好入門。
**學到：** 漫畫英文、動作動詞、對話

### 10. Who Was/Is 系列
**作者：** 多位作者
**特色：** 人物傳記，學英文同時學知識。
**學到：** 傳記寫作、歷史詞彙、閱讀理解

## 購買建議

- **博客來** 通常有中英雙語版本，適合家長陪讀
- **Amazon** 原版比較便宜，Kindle 版更省
- **圖書館** 很多都借得到，先借再決定要不要買

> 💡 **搭配 Adventure English 使用：** 讓孩子在平台上學完基礎後，用繪本延伸閱讀。例如學完 L3 動物主題後，讀 Brown Bear 會特別有成就感！`,
  },
  {
    slug: "gept-elementary-preparation-guide",
    title: "全民英檢初級（GEPT）完整準備攻略｜國小就能考過！",
    description: "全民英檢初級的考試內容、準備方法、推薦教材完整指南。告訴你國小幾年級可以開始準備，以及如何用免費資源高效備考。",
    date: "2026-03-05",
    category: "exam",
    tags: ["全民英檢", "GEPT", "英檢初級", "考試準備"],
    readTime: 12,
    cover: { emoji: "📝", gradient: "from-purple-500 via-indigo-500 to-blue-600", subtitle: "全民英檢初級完整準備攻略" },
    content: `## 全民英檢初級是什麼？

全民英檢（GEPT）初級相當於國中畢業程度，涵蓋聽力和閱讀兩大部分。通過初試後可報考複試（口說和寫作）。

### 考試架構

| 項目 | 題數 | 時間 | 內容 |
|------|------|------|------|
| 聽力 | 30 題 | 約 20 分鐘 | 看圖辨義、問答、簡短對話 |
| 閱讀 | 35 題 | 35 分鐘 | 詞彙、段落填空、閱讀理解 |
| 口說 | 5 大題 | 約 10 分鐘 | 朗讀、回答問題、看圖敘述 |
| 寫作 | 2 大題 | 40 分鐘 | 句子改寫、段落寫作 |

## 國小幾年級可以準備？

**建議時程：**

- **小三開始**：打基礎（字母、Phonics、基本單字）
- **小四-小五**：系統學習（文法、閱讀、口說）
- **小五-小六**：模擬練習 + 正式報考

如果使用 Adventure English 冒險英語：
- L1-L6（約 1-1.5 年）= 打好基礎
- L7-L12（約 1-1.5 年）= 直接銜接英檢程度

## 準備方法

### 聽力準備
1. 每天聽 15 分鐘英文（有聲書、英文歌、平台課程）
2. 練習「聽音選圖」和「聽對話回答問題」題型
3. 注意連音和弱讀

### 閱讀準備
1. 大量閱讀英文繪本和短文
2. 練習從上下文猜單字意思
3. 練習快速找到文章重點

### 口說準備
1. 每天大聲朗讀英文 5 分鐘
2. 練習用英文描述圖片
3. AI 對話練習（Adventure English Talk Time）

### 寫作準備
1. 從抄寫句子開始
2. 練習改寫句子（換主詞、改時態）
3. 練習寫 5-8 句的短文

## 免費資源推薦

- **Adventure English 冒險英語**：系統性課程，從零到英檢初級
- **LTTC 官方網站**：歷屆試題下載
- **YouTube**：搜尋「GEPT Elementary」有很多免費教學

## 考試當天注意事項

1. ✅ 帶准考證和身分證件
2. ✅ 提早 30 分鐘到考場
3. ✅ 帶 2B 鉛筆和橡皮擦
4. ✅ 聽力測驗不要猶豫，跟著節奏走
5. ✅ 閱讀先看題目再看文章`,
  },
  {
    slug: "screen-time-english-learning-balance",
    title: "螢幕時間 vs 英文學習：如何讓平板成為學習工具而不是娛樂？",
    description: "擔心孩子用平板學英文會變成沉迷3C？本文分享如何設定使用規則，讓螢幕時間真正成為有效的學習時間。",
    date: "2026-03-01",
    category: "parenting",
    tags: ["螢幕時間", "3C教養", "家長指南", "學習習慣"],
    readTime: 7,
    cover: { emoji: "📱", gradient: "from-yellow-400 via-orange-500 to-red-500", subtitle: "螢幕時間 vs 英文學習的平衡" },
    content: `## 家長的兩難

「我知道用平板學英文很方便，但又怕他越看越沉迷...」

這是我們最常聽到的家長擔心。好消息是：**有互動的學習型螢幕時間**和**被動看影片**是完全不同的東西。

## 研究怎麼說？

美國兒科學會（AAP）的最新建議：

- **2 歲以下**：避免螢幕（視訊通話除外）
- **2-5 歲**：每天 1 小時以內的高品質內容
- **6 歲以上**：確保不影響睡眠、運動和學校

**關鍵字是「高品質」和「互動」。**

Adventure English 每課只有 18 分鐘，而且是互動式學習（要回答、要說話、要拼字），不是被動看影片。

## 建立健康的使用規則

### 規則一：固定時間、固定長度

例如：「每天吃完晚餐後，學一課英文（18分鐘）」

### 規則二：學習歸學習，娛樂歸娛樂

學英文用平板 ✅
看 YouTube 用電視 ✅
學完英文接著看 YouTube ❌（會混在一起）

### 規則三：學完要「離開」

學完一課就把平板收起來，去做其他事。

### 規則四：家長看週報，不用全程監督

Adventure English 每週寄學習報告，你只需要看一下數據就好。

## 螢幕學習 vs 傳統學習

| | 平板學英文 | 紙本教材 |
|--|-----------|---------|
| 聽力練習 | ⭐⭐⭐⭐⭐ 隨時播放 | ⭐⭐ 需要播放設備 |
| 口說練習 | ⭐⭐⭐⭐⭐ AI 即時互動 | ⭐ 幾乎無法練 |
| 閱讀練習 | ⭐⭐⭐⭐ 互動式 | ⭐⭐⭐⭐ 很適合 |
| 寫作練習 | ⭐⭐⭐ 打字為主 | ⭐⭐⭐⭐⭐ 手寫最佳 |
| 遊戲化動力 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| 護眼 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**最佳組合：** 平台學英文 + 繪本閱讀 + 學習單手寫

## 我們的設計理念

Adventure English 刻意把每課控制在 18 分鐘：

- 足夠完成一個完整的學習循環
- 不會太長讓眼睛疲勞
- 結束時給予滿滿的成就感，孩子不會「捨不得離開」
- 不設計「無限滾動」或「自動播下一課」機制

**我們希望孩子學完後去玩、去看書、去跟家人聊天，而不是一直黏在螢幕前。**`,
  },
];

export const BOOKS = [
  {
    category: "3-5 歲入門",
    items: [
      { title: "Brown Bear, Brown Bear, What Do You See?", author: "Eric Carle", age: "3-5", amazon: "https://www.amazon.com/dp/0805047905", books: "https://www.books.com.tw/products/F012431820", image: "🐻", description: "最經典的英文繪本入門，重複句型+鮮豔圖畫" },
      { title: "The Very Hungry Caterpillar", author: "Eric Carle", age: "3-6", amazon: "https://www.amazon.com/dp/0399226907", books: "https://www.books.com.tw/products/F011383168", image: "🐛", description: "學數字、食物、星期，孩子百看不膩" },
      { title: "Dear Zoo", author: "Rod Campbell", age: "2-5", amazon: "https://www.amazon.com/dp/1416947370", books: "https://www.books.com.tw/products/F013349826", image: "🦁", description: "翻翻書互動設計，學動物和形容詞" },
      { title: "Goodnight Moon", author: "Margaret Wise Brown", age: "2-5", amazon: "https://www.amazon.com/dp/0064430170", books: "https://www.books.com.tw/products/F012148637", image: "🌙", description: "睡前讀物經典，韻律優美好記憶" },
    ],
  },
  {
    category: "5-8 歲進階",
    items: [
      { title: "Pete the Cat: I Love My White Shoes", author: "Eric Litwin", age: "4-7", amazon: "https://www.amazon.com/dp/0061906220", books: "https://www.books.com.tw/products/F013859411", image: "🐱", description: "有歌可唱！學顏色和正面態度" },
      { title: "Elephant & Piggie 系列", author: "Mo Willems", age: "5-8", amazon: "https://www.amazon.com/dp/1368056784", books: "https://www.books.com.tw/products/F017188925", image: "🐘", description: "對話式繪本，最適合練口說" },
      { title: "Fly Guy 系列", author: "Tedd Arnold", age: "5-8", amazon: "https://www.amazon.com/dp/0439639034", books: "https://www.books.com.tw/products/F012760696", image: "🪰", description: "橋樑書，從繪本跨到章節書" },
      { title: "Oxford Reading Tree 系列", author: "Oxford", age: "4-8", amazon: "https://www.amazon.com/dp/0198482434", books: "https://www.books.com.tw/products/F019622457", image: "🌳", description: "英國小學指定教材，分級閱讀最完整" },
    ],
  },
  {
    category: "8-12 歲挑戰",
    items: [
      { title: "Magic Tree House 系列", author: "Mary Pope Osborne", age: "7-12", amazon: "https://www.amazon.com/dp/0375813659", books: "https://www.books.com.tw/products/F014112780", image: "🏠", description: "冒險+知識，學過去式最自然的方式" },
      { title: "Diary of a Wimpy Kid 系列", author: "Jeff Kinney", age: "8-12", amazon: "https://www.amazon.com/dp/0141324902", books: "https://www.books.com.tw/products/F013163064", image: "📔", description: "超受歡迎！漫畫風格輕鬆讀" },
      { title: "Dog Man 系列", author: "Dav Pilkey", age: "7-12", amazon: "https://www.amazon.com/dp/0545581605", books: "https://www.books.com.tw/products/F014530266", image: "🐕", description: "圖多字少，讓不愛讀書的孩子也愛上" },
      { title: "Who Was 系列", author: "Various", age: "8-12", amazon: "https://www.amazon.com/dp/0448488411", books: "https://www.books.com.tw/products/F014004069", image: "🧑‍🔬", description: "人物傳記，學英文也學歷史" },
    ],
  },
  {
    category: "家長工具書",
    items: [
      { title: "用有聲書輕鬆聽出英語力", author: "廖彩杏", age: "家長", amazon: "", books: "https://www.books.com.tw/products/0010910535", image: "🎧", description: "台灣最經典的英文啟蒙書單" },
      { title: "英文繪本創意教學", author: "張湘君", age: "家長", amazon: "", books: "https://www.books.com.tw/products/0010424279", image: "📚", description: "如何用繪本教孩子英文" },
    ],
  },
];

import { SCHEDULED_POSTS } from './blog-posts-scheduled';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  cover: { emoji: string; gradient: string; subtitle: string; image?: string };
  content: string; // markdown
  /** 這篇是哪幾個 Level 的「陪玩配套文」：課程完成頁會推給爸媽、文章尾 CTA 會直接帶去那一站 */
  levels?: number[];
}


/** 給某個 Level 推薦的爸媽文章（最新的優先；沒有配套文就給家長指南類） */
export function postsForLevel(level: number, limit = 1): BlogPost[] {
  const hit = BLOG_POSTS.filter(p => p.levels?.includes(level));
  const fallback = BLOG_POSTS.filter(p => p.category === 'parenting' && !p.levels?.includes(level));
  return [...hit, ...fallback].slice(0, limit);
}

/** 最新文章（首頁「給爸媽的文章」區塊用） */
export function latestPosts(limit = 3): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);
}

export const BLOG_CATEGORIES: { slug: string; name: string; emoji: string; description: string; book: string }[] = [
  { book: "/images/blog/book-phonics.webp", slug: "phonics", name: "自然發音", emoji: "🔤", description: "Phonics 教學方法與技巧" },
  { book: "/images/blog/book-vocabulary.webp", slug: "vocabulary", name: "單字學習", emoji: "📚", description: "有效記單字的方法" },
  { book: "/images/blog/book-speaking.webp", slug: "speaking", name: "口說練習", emoji: "🗣️", description: "讓孩子勇敢開口說英文" },
  { book: "/images/blog/book-reading.webp", slug: "reading", name: "閱讀養成", emoji: "📖", description: "培養英文閱讀習慣" },
  { book: "/images/blog/book-parenting.webp", slug: "parenting", name: "家長指南", emoji: "👨‍👩‍👧", description: "家長如何協助孩子學英文" },
  { book: "/images/blog/book-exam.webp", slug: "exam", name: "英檢準備", emoji: "📝", description: "全民英檢初級準備攻略" },
  { book: "/images/blog/book-resources.webp", slug: "resources", name: "學習資源", emoji: "🎯", description: "推薦書籍、App、教材" },
];

const POSTS_2026_03_09: BlogPost[] = [
  {
    slug: "how-to-accompany-young-kids-learning-english",
    levels: [1, 2, 3, 4],
    title: "低年級小孩學英文，家長怎麼陪？每天 10 分鐘、三個動作就夠",
    description: "幼兒園到小二的孩子還不認字、不習慣開口，需要爸媽坐在旁邊。但陪讀不是教英文：固定 10 分鐘、跟著唸、不糾正發音、誇具體的事，一個月後孩子會自己打開來玩。",
    date: "2026-09-02",
    category: "parenting",
    tags: ["低年級英文", "親子共學", "陪讀", "英文啟蒙", "冒險英語"],
    readTime: 6,
    cover: { emoji: "👨‍👩‍👧", gradient: "from-amber-400 via-orange-400 to-rose-400", subtitle: "每天 10 分鐘、三個動作", image: "/images/blog/cover-how-to-accompany-young-kids-learning-english.webp" },
    content: "孩子幼兒園大班到小二這個階段，是最容易「喜歡上英文」也最容易「討厭英文」的時候。差別不在教材，在**旁邊那個大人怎麼陪**。\n\n我自己陪女兒的經驗是：一開始把它當功課，每次都在糾正發音、催她開口，結果她看到英文就跑。後來改成只做三件事，每天 10 分鐘，一個月後她會自己打開來玩。這篇把那三件事寫清楚。\n\n## 為什麼低年級一定要有人陪\n\n- **還不認字。** 題目、選項、按鈕對他來說都是圖案，沒人讀給他聽，他只能亂按。\n- **還不習慣開口。** 對著螢幕說英文對大人都尷尬，孩子需要看到你先做一次。\n- **注意力只有 10 分鐘。** 超過就開始亂點，越陪越氣，不如準時收。\n\n所以前兩、三週的目標很簡單：讓他覺得「英文時間是跟爸媽一起玩的時間」。\n\n## 每天 10 分鐘的固定儀式\n\n1. **固定時段**：晚餐後或睡前，同一個時間，比「有空再做」有效十倍。\n2. **一次一課或半課**：寧可短、要每天。孩子想重看影片就讓他看，重複是這個年紀最有效的學法。\n3. **你的手機收起來**：你不分心，孩子才不分心。\n\n## 三個動作（真的只有這三個）\n\n### 1. 他點什麼，你就跟著唸一次\n不用教、不用解釋文法。孩子點單字，網站會唸單字；點句子，會唸整句、唸到哪個字亮到哪。你在旁邊小小聲跟著唸，他會不自覺模仿你的嘴型——這比任何「來，跟我唸」都有效。\n\n### 2. 答錯不糾正發音，只說「再聽一次」\n低年級的目標是**聽得懂**，不是唸得標準。發音會在大量聽之後自己修正。他選錯了，你就按題目旁邊的 🔊 讓他再聽一次，然後閉嘴等他選。忍住不說「不是這個啦」。\n\n### 3. 過關就誇「具體的那一件事」\n「好棒」聽三次就沒感覺了。改成：「你剛剛 hi 唸得好清楚」「你自己找到 bye 了耶」。星星、徽章網站會自己給；你負責說出**他到底做對了什麼**。\n\n## 低年級的分工表\n\n| 誰 | 做什麼 |\n|---|---|\n| 爸媽 | 讀中文題目、Your Turn 先示範一次、按「允許麥克風」 |\n| 孩子 | 聽英文、按喇叭、選答案、跟著唸 |\n| 網站 | 唸中文題目、唸英文選項、亮字、給星星 |\n\n在冒險英語裡，字母島到學校路（L1–L4）每一題會自動唸出中文，英文選項旁邊有小喇叭可以先聽再選，每一關上方也有一張「給爸媽的說明」卡，寫這一關怎麼玩。\n\n## 什麼時候可以放手\n\n- 他開始**自己按喇叭、自己翻頁**，你就退到旁邊做自己的事。\n- 到市場街（L3）題目變成整句，大多數孩子這時已經會自己玩。\n- 之後用家長中心的學習報告看進度就好，不用盯著螢幕。\n\n## 常見狀況怎麼辦\n\n- **不肯開口** → 先只聽、只點，麥克風那關按「我念完了」也可以。開口通常在第二、三週自己發生。\n- **只想看影片** → 可以，看完影片要過 5 題小挑戰才能翻書，他會為了翻書願意答。\n- **一直按錯** → 多半是沒聽懂題目，你把中文再讀一次。\n- **唸了說不對** → 語音辨識偶爾聽不清，再念一次；三次不過會讓他跳過。\n- **越陪越火** → 今天收，明天再來。10 分鐘的意思就是 10 分鐘。\n\n## 最後\n\n陪讀不是教英文，是讓他覺得這件事跟你一起做很好玩。三個動作做一個月，你會發現他開始自己打開網站——那時候你的任務就完成了。\n\n👉 免費開始：[冒險英語 Adventure English](https://english.chparenting.com)（240 課動畫，字母島從 ABC 開始）\n👉 一頁版陪玩指南：https://english.chparenting.com/parents/companion\n",
  },
  {
    slug: "phonics-vs-kk-which-is-better",
    levels: [1, 2],
    title: "Phonics 自然發音 vs KK 音標：哪個適合你的孩子？完整比較指南",
    description: "Phonics 和 KK 音標是台灣最常見的兩種發音教學法。本文完整比較兩者的優缺點，幫助家長選擇最適合孩子的學習方式。",
    date: "2026-03-15",
    category: "phonics",
    tags: ["Phonics", "KK音標", "自然發音", "兒童英文", "發音教學"],
    readTime: 8,
    cover: { emoji: "🔤", gradient: "from-blue-500 via-purple-500 to-pink-500", subtitle: "Phonics vs KK 音標完整比較" , image: "/images/blog/cover-phonics-kk.webp" },
    content: `你家孩子在學自然發音（Phonics）、KK 音標，還是兩個都碰到、結果搞得一團亂？這兩套東西常被放在一起比，但它們其實是在解決不同的問題。先講結論：**低年級先學自然發音，KK 音標等中高年級、快要銜接國中時再補，兩個不衝突。**

## 自然發音（Phonics）是什麼

自然發音教的是**字母和聲音之間的規則**：c 通常唸 /k/、a 在短音時唸 /æ/、t 唸 /t/，合起來就是 cat。孩子學會規則之後，看到沒學過的字也能試著唸出來，不用等別人告訴他。

它不是哪一家補習班發明的教法。美國國家閱讀委員會（National Reading Panel）在 2000 年整理大量研究後的結論是：有系統地教字母與聲音的對應，對剛開始學閱讀的孩子幫助最明顯。英國從 2012 年起，全國小一生都要做一次自然發音檢測（Phonics Screening Check），也是同一個思路。

### 通常的學習順序

1. 26 個字母的「名字」和「聲音」（A 叫 /eɪ/，但它的聲音是 /æ/）
2. 短母音 a、e、i、o、u 加上子音，拼三個字母的字：cat、bed、pig
3. 子音組合：sh、ch、th、ck、ng
4. 長母音和字尾的魔法 e：cake、bike、home
5. 其他規則：oo、軟音 c / g、r 控制母音（car、bird）

冒險英語的[字母島（L1）](/courses/l1-letter-island)對應第 1 步，[聲音島（L2）](/courses/l2-sound-island)對應第 2 到第 5 步。聲音島怎麼陪、孩子會卡在哪，寫在[聲音島陪玩筆記](/blog/sound-island-parent-notes)。

## KK 音標是什麼

KK 音標是美國語言學家 John S. Kenyon 和 Thomas A. Knott 在 1944 年出版的發音字典裡使用的標音系統，用一套符號精確記錄美式發音。它本來是給字典和語言研究用的工具，後來被台灣的英語教育大量採用，所以你在台灣的字典、單字書、國中講義上都會看到它。其他國家的字典比較常用的是 IPA（國際音標），兩者很像，符號略有不同。

KK 的優點是**精確**：任何一個字，不管守不守規則，都能標出唯一的唸法。缺點是它是另一套要背的符號，有四十個左右，對還在學注音和字母的低年級孩子來說負擔很大。

## 兩者比較

| 面向 | 自然發音 Phonics | KK 音標 |
|---|---|---|
| 解決的問題 | 看到字，怎麼唸 | 查字典時，這個字到底怎麼唸 |
| 學什麼 | 字母本身的發音規則 | 另一套標音符號 |
| 適合年齡 | 幼兒園大班到小三開始 | 小五小六到國中 |
| 能處理的字 | 大部分規則的字 | 所有的字 |
| 不能處理的 | 不守規則的字（the、said、one） | 沒有字典或標注時幫不上忙 |
| 學習方式 | 可以用遊戲、歌、拼讀來學 | 偏向記憶和對照 |

## 建議的順序：先自然發音，後 KK

- **幼兒園大班到小二**：字母的聲音、短母音拼讀。用聽的、用玩的，不用寫。
- **小三小四**：長母音、子音組合，開始用規則讀繪本和簡單讀本。不守規則的常見字另外用認的，做法在 [Sight Words 先認這 25 個](/blog/sight-words-for-kids-first-25)。
- **小五小六**：認識 KK 音標符號，學會查字典時看得懂。
- **國中**：兩套並用。遇到生字先用自然發音猜，不確定再看 KK 確認。

不建議讓五六歲的孩子直接學 KK。那個年紀要同時處理注音、英文字母、再加一套音標符號，很容易混在一起，也容易從此覺得英文很難。

### 學校教 KK、外面教自然發音，會打架嗎

不會。大部分的子音，自然發音的聲音和 KK 的符號幾乎一樣（b、d、f、k、m、p、s、t…）。真正要另外記的是母音符號，像 /æ/、/ɛ/、/ɪ/。有自然發音基礎的孩子，耳朵已經分得出這些聲音，只是再學一個符號去對應它，通常比從零開始快得多。

冒險英語的單字卡上同時附有 KK 音標，低年級不用管它；等孩子高年級開始好奇「那串符號是什麼」的時候，就是開始認識 KK 的好時機。

## 家長在家可以做什麼

### 剛開始接觸的孩子
- 唱字母聲音的歌（YouTube 搜尋 phonics song 就有很多）。
- 玩字母磁鐵：你發一個聲音，他找字母。
- **只玩聲音，不教規則、不寫字。** 起步的順序可以看[自然發音第一課：先教 s、a、t、p](/blog/phonics-first-lesson-satp)。

### 已經會拼三個字母的字
- 玩「慢動作」：你把一個字拉長唸 /k/…/æ/…/t/，他猜是什麼字。
- 讀繪本時，遇到他拼得出來的字，停下來讓他唸。
- 拼不出來的字直接告訴他，不要讓他卡住。

### 高年級、要銜接國中
- 查字典時，請他先用自然發音猜，再看 KK 對答案。
- 母音符號一次認兩三個，配他已經很熟的字：/æ/ 配 cat、/ɛ/ 配 bed。

## 常見問題

### 只學自然發音、不學 KK 可以嗎？
如果孩子不在台灣的體制內升學，可以。英語系國家的孩子就是只學自然發音。但台灣的國中教材和字典仍然會用到 KK，建議高年級花一點時間認識符號，不用精通。

### 孩子五歲，可以開始學自然發音嗎？
可以，但方式要是玩：唱歌、聽聲音、找字母。不要坐在桌前寫練習本。

### 自然發音遇到例外字怎麼辦？
英文最常用的一些字（the、was、said、you、are）不照規則走，這些叫 sight words，直接用認的。常見的就幾十個，不用怕。

### 孩子已經十歲，沒學過自然發音，來得及嗎？
來得及，而且大孩子理解規則比較快。用兩三個月把短母音、長母音、子音組合走一遍，再接 KK，順序一樣。

## 重點整理

- 自然發音是「看字讀音」的規則，KK 是「查字典」的標音工具，功能不同。
- 低年級先自然發音，高年級再認識 KK。
- 兩套系統的子音幾乎一樣，要另外學的主要是母音符號。
- 不守規則的常見字用認的，不要硬拼。

## 參考資料

- National Reading Panel (2000). [Teaching Children to Read](https://www.nichd.nih.gov/publications/pubs/nrp/smallbook).
- UK Department for Education. [Phonics screening check](https://www.gov.uk/education/phonics).`,
  },
  {
    slug: "how-to-help-kids-speak-english-at-home",
    levels: [3, 4, 5, 6],
    title: "在家就能做！5 個讓孩子自然開口說英文的方法",
    description: "不需要花大錢上全美語班，在家就能創造開口的機會。5 個家長英文不好也做得到的方法，讓孩子從害怕說英文變成願意開口。",
    date: "2026-03-10",
    category: "speaking",
    tags: ["口說練習", "居家英文", "親子英文", "開口說英文"],
    readTime: 6,
    cover: { emoji: "🗣️", gradient: "from-green-400 via-teal-500 to-blue-500", subtitle: "5 個方法讓孩子自然開口說英文" , image: "/images/blog/cover-speaking.webp" },
    content: `「他英文考試都還可以，但叫他說一句，整個人就僵住。」這大概是我最常聽到的家長煩惱。

孩子不敢開口，多半不是不會，而是**沒有一個可以安心說錯的地方**。學校和補習班的口說機會本來就少，一班十幾個人，輪到自己時又有同學在看。家裡反而是最適合練口說的地方：沒有分數、沒有同學，只有你。

下面五個方法都不需要家長英文很好，也不用花錢。

## 為什麼孩子不敢開口

1. **怕說錯被糾正。** 大人一句好意的「不是這樣唸啦」，孩子聽到的是「我說錯了，好丟臉」。語言學家 Stephen Krashen 提出的「情感過濾假說」講的就是這件事：越緊張，語言越出不來。
2. **聽得還不夠多。** 開口是聽夠了之後自然發生的事。耳朵裡沒有足夠的句子，嘴巴當然說不出來。
3. **沒有需要用英文的時候。** 生活裡每件事用中文都能解決，英文對他來說只是一個科目。

所以解法不是報更多課，而是三件事：降低壓力、增加頻率、製造一點點「用得到」的場合。

## 方法一：每天固定一個「英文五分鐘」

不用全英文環境，那個做不到也撐不久。挑一個每天都會發生的時段，固定講幾句英文就好。早餐最適合，因為每天都有、時間短、東西就在眼前。

可以從這三句開始：

- What do you want? / Milk or juice?
- Here you are.
- Is it yummy?

孩子用中文回答也沒關係，先確認他聽懂了。他回「牛奶」，你接一句「Milk! OK.」就好，不要求他跟著說。幾個禮拜後他會自己冒出 Milk。

固定時段比時間長短重要。每天五分鐘，比一週一次一小時有用，因為語言靠的是天天聽到。

## 方法二：唱歌

歌有旋律、有重複、可以配動作，孩子唱的時候不覺得自己在「說英文」，所以不會緊張。James Asher 提出的 TPR（全身反應教學法）也是同一個道理：語言配上動作，比較容易記住。

三步驟：

1. **先放著聽幾天**，不要求唱。
2. **跟著唱加動作**：Head, Shoulders, Knees and Toes、If You're Happy 這類有動作的最好。
3. **把歌詞搬到生活裡**：洗澡時指著他的膝蓋說 knees，他會笑出來，然後接著唱。

YouTube 上的 Super Simple Songs 很適合低年級，速度慢、咬字清楚。

## 方法三：讓孩子對著機器練，不是對著人練

很多孩子對著大人說不出口，對著機器卻願意。機器不會笑他、不會不耐煩、說錯可以再來一次。

冒險英語每一課最後的 Your Turn 就是這個設計：孩子對著麥克風唸一個字或一句話，過了就拿星星；唸不過可以按「我念完了」跳過，沒有任何懲罰。市場街之後還有 Talk Time，由角色 Finn 問問題、孩子回答。

語音辨識有時候會判錯，尤其是小孩的聲音。遇到的時候怎麼接，寫在[麥克風練口說到底有沒有用](/blog/speech-recognition-practice-for-kids)。如果孩子連對著機器都不肯開口，先看[讓他按喇叭一百次](/blog/kid-wont-speak-english-press-speaker)那篇。

## 方法四：角色扮演

角色扮演的好處是「說話的不是我，是店員」。有了角色當擋箭牌，孩子比較敢講。

在家就能玩的五種：

- **開店**：你當客人，他當老闆。「How much?」「Ten dollars.」
- **餐廳**：他當服務生，「What do you want?」
- **醫生**：「What's wrong?」「My head hurts.」
- **小記者**：他拿筆當麥克風訪問你（高年級可以看[問題塔陪玩筆記](/blog/question-tower-parent-notes)裡的玩法）。
- **玩偶對話**：兩隻玩偶用英文打招呼，比他自己講容易得多。

句子越短越好，三四個字就夠。說錯不糾正，你用正確的說法「回音」一次就好，做法在[發音要不要糾正](/blog/should-parents-correct-kids-english-pronunciation)那篇有寫。

## 方法五：錄下來給家人看

錄一段十秒的影片，孩子用英文說一句話，傳給阿公阿嬤或爸爸。家人回一句「好厲害」，孩子會想再錄一段，而且這次想說更多。

心理學家 Albert Bandura 談「自我效能」時提到，成功經驗是自信最主要的來源。對孩子來說，被家人稱讚就是成功經驗。

注意兩件事：只傳給家人，不要公開放上社群；他不想錄的時候就不錄。

## 最重要的一件事

不管用哪個方法，請記得：**稱讚他願意說，不是稱讚他說對。** 「你剛剛自己說了 milk 耶」比「你發音好標準」有用，因為前者他每次都做得到。

## 常見問題

### 我自己英文不好，可以嗎？
可以。上面的句子背三句就夠用，發音交給歌和喇叭。你的工作是陪，不是示範。

### 孩子堅持用中文回答怎麼辦？
讓他用中文。他聽得懂你的英文問題，就已經在進步。開口會晚一點到，不會不到。

### 每天五分鐘真的夠嗎？
對起步來說夠。重點是每天都有。等他自己想多說的時候，時間自然會變長。

### 多久會看到變化？
每個孩子差很多。常見的順序是：先願意聽，再冒出單字，然後才是短句。不要跟別人家的孩子比，也不要當天驗收。

## 參考資料

- Krashen, S. (1982). Principles and Practice in Second Language Acquisition.（情感過濾假說）
- Asher, J. (1969). The Total Physical Response Approach to Second Language Learning.
- Bandura, A. (1997). Self-Efficacy: The Exercise of Control.`,
  },
  {
    slug: "best-english-books-for-kids-2026",
    levels: [1, 2, 3],
    title: "2026 年最推薦的 10 本兒童英文繪本｜按年齡分類",
    description: "精選 10 本適合 5-12 歲孩子的英文繪本，從簡單到進階，培養孩子的英文閱讀興趣和能力。附各通路購買比較。",
    date: "2026-03-08",
    category: "resources",
    tags: ["英文繪本", "兒童書籍", "閱讀推薦", "英文書單"],
    readTime: 10,
    cover: { emoji: "📚", gradient: "from-orange-400 via-red-400 to-pink-500", subtitle: "10 本最推薦的兒童英文繪本" , image: "/images/blog/cover-books.webp" },
    content: `你是不是也在想：該買哪些英文繪本給孩子？市面上千千萬萬本，到底哪些值得買？

這篇挑了 10 本，按 5-6 歲（剛開始接觸）、5-8 歲、8-12 歲三個階段分類。每一本都是出版多年、全世界的家庭和老師反覆驗證過的經典，圖書館也幾乎都借得到。除了書單，後面也會講怎麼用這些書，帶孩子從「聽故事」走到「自己讀」。

> 📌 **重點摘要：** 英文繪本用圖片搭配重複句型，讓孩子在故事裡自然累積語感。5-6 歲（剛開始接觸）從 Eric Carle 系列入門培養好感度，5-8 歲用橋樑書練習獨立閱讀，8-12 歲用章節書和漫畫養成長期閱讀習慣。

## 為什麼英文繪本比課本更有效？

很多家長直覺反應是買英文課本或單字卡。這些不是不好，但對剛起步的孩子來說，故事書有幾個課本給不了的東西。

課本把語言拆成碎片——一課學 10 個單字、背一組句型。但真實的語言不是這樣運作的。繪本提供的是完整的語境：孩子看到圖片裡的毛毛蟲在吃東西，聽到你唸 "He ate through one apple"，大腦自動把畫面、聲音、意思連在一起。

這種學習方式有三個好處：

- ✅ **圖片降低理解門檻** — 孩子不需要查字典，看圖就能猜出大部分意思
- ✅ **重複句型強化記憶** — 同一個句型出現五六次（像 "Brown Bear, Brown Bear, what do you see?"），孩子聽到第三遍就能跟著念了。這不是死記硬背，而是自然內化
- ✅ **故事驅動內在動機** — 孩子想知道毛毛蟲最後變成什麼、翻翻書下面藏什麼動物。這份好奇心讓他主動要求「再讀一遍！」

你有沒有發現？孩子不喜歡「課本」，但超愛「故事書」。他不是不想學英文，而是不想用無聊的方式學。繪本解決的就是這個問題。

## 選書的三大原則

在進入書單之前，先掌握三個選書原則。不管孩子幾歲，這三點都適用：

### 原則一：難度剛好在「舒適區邊緣」

太簡單無聊，太難會挫折。語言學家 Stephen Krashen 的 **i+1 理論**告訴我們：最好的學習材料是比孩子目前能力高一點點的內容。實際的判斷方式：一頁裡大部分內容他靠圖和已經會的字看得懂，只有少數地方要猜，就是剛好的難度。

### 原則二：孩子自己選的最好

你覺得 Brown Bear 很幼稚？但孩子超愛。Scholastic 的 Kids & Family Reading Report 多年來都有同一個發現：絕大多數孩子說，他們最喜歡的書是自己挑的。帶孩子去書店或圖書館，讓他翻翻看，選他有感覺的。

### 原則三：買可以「玩」的書

特別是 5-6 歲剛開始接觸的階段，翻翻書、觸摸書、有聲書比純文字書有效得多。互動性越高，孩子願意待在書上的時間越長。

## 5-6 歲入門推薦（剛開始接觸）：建立英文好感度

這個階段的目標不是讓孩子「學會」英文，而是讓他覺得「英文好好玩」。選書原則是：圖大、字少、有韻律、能互動。

### Brown Bear, Brown Bear, What Do You See?

作者 Bill Martin Jr.，插畫 Eric Carle。這本書只用了一個句型反覆出現："Brown Bear, Brown Bear, what do you see? I see a red bird looking at me." 就這樣從棕熊、紅鳥、黃鴨一路問到最後。

為什麼這本是第一選擇？因為句型極度重複、節奏像唸歌一樣、Eric Carle 的拼貼風格色彩鮮豔到連嬰兒都目不轉睛。剛接觸英文的孩子聽過幾遍，就會自己接 "I see a __ looking at me!"

怎麼用這本書？第一遍你唸、孩子聽。第二遍問 "What color is this?" 第三遍讓孩子說動物名字。第五遍他已經可以自己「讀」了——雖然是背的，但這就是早期閱讀的起點。

### The Very Hungry Caterpillar

Eric Carle 的另一本經典，1969 年出版至今，全球銷量超過五千萬冊，被翻譯成六十多種語言。故事很簡單：一隻毛毛蟲星期一吃一個蘋果、星期二吃兩個梨子……最後變成蝴蝶。

這本書的教學價值非常高。孩子不知不覺學會了：數字 1-5、星期一到星期天、十幾種食物名稱、以及「蛻變」的概念。每一頁都有真的打洞的設計，小手指可以穿過去，觸覺加上視覺讓記憶更深。

> 💡 **小提示：** 搭配冒險英語市場街（L3）的食物主題，孩子在站上學完 apple、banana 這些字之後，打開這本書會驚喜地發現「我認識這些字！」那個成就感會讓他更想繼續學。

### Dear Zoo

Rod Campbell 的翻翻書，每頁送來一隻動物，但都不合適——大象太大 (too big)、長頸鹿太高 (too tall)、獅子太兇 (too fierce)。翻開蓋子才看到動物本人，最後終於收到一隻完美的小狗。

這本書特別適合好奇心強的孩子。翻翻書的設計製造了「猜猜看」的遊戲感，每一頁都是驚喜。孩子學到的不只是動物名稱，還有形容詞——big、tall、fierce、grumpy、scary——這些都是日常生活中超實用的詞。

> ⚠️ **注意：** 5-6 歲剛開始接觸時千萬不要逼孩子自己讀。這個階段是「聽力先行期」，你唸他聽就好。偶爾停下來問 "What do you think is inside?" 讓他猜一猜，這種邊讀邊問的方式叫「對話式共讀」（dialogic reading），是 1980 年代由心理學家 Grover Whitehurst 等人提出的，比大人從頭唸到尾更能帶動孩子開口。

## 5-8 歲進階推薦：從繪本到獨立閱讀

5-8 歲是閱讀發展的黃金轉折期。孩子從「學習怎麼讀」(learning to read) 過渡到「透過閱讀來學習」(reading to learn)。這個階段需要的是「橋樑書」——比繪本多一些文字，但比章節書短且輕鬆。

### Pete the Cat: I Love My White Shoes

作者 Eric Litwin，插畫 James Dean。Pete 穿著白鞋走路，踩到草莓鞋子變紅、踩到藍莓變藍——但他從來不哭。"Did Pete cry? Goodness, no!"

這本書的節奏感像一首歌——事實上它真的有一首歌！YouTube 上有官方動畫 MV，孩子可以邊看邊唱。正面樂觀的訊息（"It's all good!"）加上可預測的故事結構，讓孩子讀完很有安全感。

Pete the Cat 系列有超過 30 本，從簡單繪本到 I Can Read 分級讀物都有，孩子可以一路讀上去。是很多孩子進入分級閱讀的第一站。

### Fly Guy 系列

作者 Tedd Arnold。一個男孩養了一隻蒼蠅當寵物，每集都有新的搞笑冒險。文字量比繪本多，但每頁都有大幅插圖。

Fly Guy 是 Scholastic 很受歡迎的橋樑書系列，難度剛好介於繪本和章節書之間。孩子讀完一本大概只需要 15-20 分鐘，很有成就感。更重要的是——它很搞笑。幽默是讓不愛看書的孩子開始閱讀的最強武器。

### Elephant & Piggie 系列

Mo Willems 的代表作，系列中有兩本拿過美國圖書館協會頒給初階讀物的 Geisel 獎。每本書只有兩個角色——大象 Gerald 和小豬 Piggie——透過對話推動故事。

為什麼這個系列特別值得推薦？因為它是用「真正的日常對話」寫的。孩子讀完之後，可以跟爸媽玩角色扮演——一個人當 Gerald，一個人當 Piggie。這種互動讓「讀書」變成「說英文」的練習。每本的字都很少、句子很短，但情緒表達超豐富，孩子學會的是怎麼用英文表達開心、難過、驚訝、生氣。

## 8-12 歲挑戰推薦：養成長期閱讀習慣

8 歲以上的孩子已經可以獨立閱讀了。這個階段的關鍵不再是「會不會讀」，而是「想不想讀」。要讓孩子主動拿起英文書，就要找到他真正感興趣的主題。

### Magic Tree House 系列

作者 Mary Pope Osborne，全球銷量超過一億冊。Jack 和 Annie 兄妹透過魔法樹屋穿越時空，每一集去到不同的歷史時期——恐龍時代、古埃及、中世紀城堡……

這個系列的聰明之處在於把歷史和科學知識包裝成冒險故事。孩子以為自己在看小說，其實在學歷史。每本大約五六千字，Lexile 多落在 200–600L 之間，剛好是小學中高年級的閱讀水平。而且它有一個非虛構的姊妹系列 Magic Tree House Fact Tracker，讀完故事可以再看科普延伸，學習深度倍增。

### Diary of a Wimpy Kid 系列

作者 Jeff Kinney。用漫畫加日記的形式講一個國中生的校園生活。這本書的殺手鐧是——它看起來不像「正經書」。插畫很醜（故意的）、筆跡很潦草（也是故意的）、內容超好笑。

連最不愛看書的孩子拿起這本都會放不下來。Lexile 等級約 **950-1060L**，表面看難度不低，但因為圖文穿插，實際閱讀體驗比數字顯示的輕鬆很多。全球銷量超過 2.5 億冊，是這個年齡層最暢銷的系列之一。

> 💡 **小提示：** 如果孩子英文程度還在 Lexile 600L 以下，建議先從 Dog Man 或 Magic Tree House 入門，讀完再挑戰 Diary of a Wimpy Kid。一步一步來，不要跳級。

### Dog Man 系列

作者 Dav Pilkey，就是 Captain Underpants 的創作者。一半是警察、一半是狗的超級英雄，每集都在搞笑中拯救世界。全系列銷量數千萬冊，長年在紐約時報兒童暢銷榜上。

Dog Man 的特色是幾乎全部用漫畫形式呈現，每頁的文字量很少，但用詞意外地豐富。它是讓「我不喜歡看書」的孩子開始閱讀的最佳跳板。

### Who Was/Is 系列

多位作者撰寫的人物傳記系列，涵蓋科學家、藝術家、運動員、歷史人物。每本約 **100 頁**，配有黑白插圖，用簡潔的英文講述一個人的一生。

這個系列適合對特定主題有興趣的孩子——喜歡太空的可以讀 Who Was Neil Armstrong?，喜歡動物的讀 Who Is Jane Goodall?，喜歡科技的讀 Who Is Elon Musk? 讀傳記不只學英文，還在建立世界觀。系列已經出了兩百多本，足夠讓孩子探索很久。

## 怎麼用繪本引導孩子？五步共讀法

光買書不夠，怎麼「用」書才是關鍵。以下是根據 Dialogic Reading 理論整理的五步共讀法，適用於所有年齡：

- ✅ **Step 1：先看封面猜故事** — 翻開之前問孩子 "What do you think this book is about?" 啟動好奇心
- ✅ **Step 2：你唸他聽，不要翻譯** — 用誇張的語調和手勢，讓孩子從聲音和圖片理解意思。不要每句都翻成中文
- ✅ **Step 3：停下來問問題** — 讀到一半暫停，問 "What happened?" 或 "What do you think will happen next?" 讓孩子參與
- ✅ **Step 4：讓孩子接句** — 讀過兩三遍之後，唸到重複句型時故意停下來，讓孩子自己說出下一個字
- ✅ **Step 5：延伸活動** — 讀完 The Very Hungry Caterpillar，可以一起畫毛毛蟲；讀完 Brown Bear，可以去動物園找書裡的動物

## 要在哪裡買？各通路比較

| 通路 | 優點 | 缺點 | 最適合 |
|------|------|------|--------|
| 博客來 | 中英雙語版多、運費門檻低、到貨快 | 原文書選擇較少 | 想要中文翻譯輔助的家長 |
| Amazon | 原版最便宜、Kindle 電子版更省、選擇最齊全 | 運費高、到貨慢（約 2 週） | 想要原汁原味的家庭 |
| 圖書館 | 完全免費、可以大量試讀 | 熱門書常被借走 | 先試讀再決定要不要買 |
| Costco | 偶爾有套書特價 | 選擇有限、不是每次都有 | 想要一次購入整套系列 |
| 蝦皮/露天 | 二手書便宜、可以找到絕版書 | 品質不一 | 預算有限的家庭 |

> 💡 **省錢小撇步：** 先去圖書館借 3-5 本回家試讀，觀察孩子最喜歡哪一本。確定之後再去 Amazon 買整個系列。這樣既不浪費錢，又能確保孩子真的會讀。

## 常見問題 FAQ

### 孩子完全看不懂英文繪本怎麼辦？

完全正常！剛開始接觸英文的 5-6 歲孩子本來就不是「讀」繪本，而是「聽」和「看」。Jim Trelease 在 The Read-Aloud Handbook 裡強調過一件事：孩子聽得懂的，遠比他自己讀得懂的多，而且這個差距會持續好幾年。你唸給他聽、用手指圖片，他的大腦正在建立英文的聲音資料庫。持續一段時間之後，你會發現他開始冒出書裡的英文單字。

### 一本繪本到底要讀幾遍？

答案是：孩子想讀幾遍就幾遍。不要覺得重複很無聊——對孩子來說，每一遍都有新發現。他第一遍注意故事，第二遍看圖片細節，第三遍開始記句型。到第十遍，他就能「假裝自己在讀」了——而這正是獨立閱讀的起點。

### 中英雙語版好還是純英文版好？

看孩子年齡。5-6 歲剛開始接觸時建議純英文版，讓孩子學會用圖片猜意思，這是最重要的閱讀策略。再大一點之後如果家長英文沒把握，雙語版可以幫助你更有自信地跟孩子共讀。但有一個原則：**先讀英文那面，再看中文**。不要邊讀英文邊翻譯，這會打斷孩子的沉浸式學習。

### 電子書和紙本書哪個好？

兩種都好，但用途不同。紙本書適合親子共讀——翻頁、指圖、互動的觸覺體驗很重要。電子書（Kindle 或有聲書）適合 6 歲以上孩子自主閱讀，尤其是通勤或旅行時。年紀小的孩子建議以紙本為主；大一點可以混合使用，螢幕時間的規則可以參考[螢幕時間那篇](/blog/screen-time-english-learning-balance)。

### 孩子只想看中文書不想看英文書怎麼辦？

不要強迫。先從有「雙語版」的書入手，或者找孩子已經看過中文版的故事（像 Peppa Pig 英文繪本）。孩子因為已經知道故事內容，讀英文版時會更有信心。另一個方法是搭配 Adventure English 平台——孩子在遊戲中學了相關主題後，再拿出對應的繪本，他會有「我學過這個！」的成就感。

## 結語：最好的時間就是現在

不需要一次買 10 本。先從一本開始：如果孩子 5-6 歲剛開始接觸，買 Brown Bear；5-8 歲，買 Elephant & Piggie；8 歲以上，買 Magic Tree House。今天開始每天讀 15 分鐘就好。

- ✅ 每天 15 分鐘親子共讀，重點是天天有
- ✅ 先從圖書館借書試讀，找到孩子喜歡的再購買
- ✅ 搭配 Adventure English 平台，讓學習和閱讀互相強化
- ✅ 不要翻譯、不要考試、不要有壓力——讓英文繪本就是「好玩的故事書」
- ✅ 孩子的閱讀品味會改變，每半年重新評估一次書單

> 📌 **記住：** 閱讀習慣比閱讀程度重要。一個愛讀書的孩子，程度遲早會跟上。但一個被逼到討厭閱讀的孩子，再多的書都沒用。

## 參考資料

- Krashen, S. (1985). The Input Hypothesis.（i+1 理論）
- Whitehurst, G. J., et al. (1988). Accelerating language development through picture book reading. Developmental Psychology, 24(4).
- Trelease, J. The Read-Aloud Handbook. Penguin Books.
- Scholastic. [Kids & Family Reading Report](https://www.scholastic.com/readingreport).`,
  },
  {
    slug: "gept-elementary-preparation-guide",
    levels: [7, 8, 9, 10, 11, 12],
    title: "全民英檢初級（GEPT）完整準備攻略｜國小就能考過！",
    description: "全民英檢初級的考試內容、準備方法、推薦教材完整指南。告訴你國小幾年級可以開始準備，以及如何用免費資源高效備考。",
    date: "2026-03-05",
    category: "exam",
    tags: ["全民英檢", "GEPT", "英檢初級", "考試準備"],
    readTime: 12,
    cover: { emoji: "📝", gradient: "from-purple-500 via-indigo-500 to-blue-600", subtitle: "全民英檢初級完整準備攻略" , image: "/images/blog/cover-gept.webp" },
    content: `全民英檢初級（GEPT Elementary）越來越常出現在國小高年級家長的對話裡。它到底考什麼、國小生適不適合考、要怎麼準備？這篇把架構和準備方向一次講清楚。

先說我的立場：**國小考不考英檢都可以，它不是必要的。** 但如果孩子有興趣、程度也到了，它是一個不錯的里程碑。重點是用平常累積的方式準備，不要為了考試把英文變成苦差事。

（考試的題數、時間、通過標準可能調整，報名前請以主辦單位 LTTC 的[全民英檢官網](https://www.gept.org.tw/)最新公告為準。）

## 全民英檢初級考什麼

初級的程度定位是**國中畢業**，對應 CEFR 的 A2。考試分兩階段，初試通過才能考複試。

### 考試架構

| 階段 | 項目 | 內容 | 時間 |
|---|---|---|---|
| 初試 | 聽力 | 看圖辨義、問答、簡短對話、短文聽解 | 約 20 分鐘 |
| 初試 | 閱讀 | 詞彙、段落填空、閱讀理解 | 35 分鐘 |
| 複試 | 寫作 | 單句寫作、段落寫作 | 40 分鐘 |
| 複試 | 口說 | 複誦、朗讀句子與短文、回答問題 | 約 10 分鐘 |

### 這些題型在考什麼能力

- **聽力**考的是「聽一次就懂」。題目只播一次，沒有時間在腦中翻成中文。
- **閱讀**的詞彙題考單字量，段落填空和閱讀理解考的是讀懂整段的能力。
- **寫作**的單句寫作是改寫、合併、重組句子，需要文法基礎；段落寫作是看圖或依提示寫一小段。
- **口說**是對著錄音設備說，不是跟真人對話。複誦和朗讀考發音與流暢度，回答問題考能不能當場組出句子。

## 國小幾年級可以開始

程度比年級重要。如果用年級抓個大概：

- **小一到小四**：不用想考試。把聽和說的底打好，這是之後聽力和口說兩科的本錢。
- **小五**：如果已經能聽懂日常短對話、讀得懂一小段短文，可以開始看看題型。
- **小六到國中**：比較適合正式報考的時間。

國小考初級最大的缺口通常是**單字量和文法**。課綱、國中、英檢三個單字量數字的差別，我整理在[國小畢業要會多少英文單字](/blog/how-many-english-words-elementary-students-need)。

### 用冒險英語的話，對應到哪裡

冒險英語 12 站走完大約是 850 個單字和國小到國一的句型，它的定位是**把聽說讀寫的底打穩**，不是英檢衝刺班。對應關係大致是：

- L1–L6：聽力的基礎（大量聽短句和對話）
- L7 魔法門、L8 問題塔：初級最常考的文法和問句
- L9 時光道：時態，閱讀和寫作都會用到
- L10 未來橋：段落閱讀和短文寫作
- L11–L12：綜合應用

站上累積的聽力量對初級聽力夠不夠，另外寫在[用 240 課動畫累積的聽力量夠不夠](/blog/gept-elementary-listening-with-cartoons)。

## 四個項目怎麼準備

### 聽力：最值得先投資
聽力靠的是時間累積，短期衝不上來，所以最該早開始。

- 每天聽一點，十分鐘就好，內容要是他大致聽得懂的。
- 聽的時候不看字。看著字聽，練到的是閱讀。
- 考前再熟悉題型：看圖題先看圖、問答題注意問句開頭是 What、Where 還是 When。

### 閱讀：靠平常讀，不是靠背
- 單字量不夠時，優先補教育部國中基本 1,200 字，這批字國中也用得到。
- 養成讀短文的習慣。分級讀本、課外的短篇故事都可以。
- 考試技巧：閱讀理解先看題目，再回文章找答案。

### 口說：敢說就贏一半
- 複誦題練的是「聽完馬上說」，平常可以玩跟讀：聽一句、暫停、說一次。
- 朗讀題看的是流暢，不用追求完美發音。
- 回答問題時，說短的完整句就好，不要因為想說長句而卡住。

### 寫作：從模仿開始
- 單句寫作需要基本文法：be 動詞、助動詞 do / does、時態、問句和否定句。
- 段落寫作從三到五句開始，先求寫完，再求寫對。陪寫的做法可以參考[未來橋陪玩筆記](/blog/future-bridge-parent-notes)裡的四步驟。

## 免費資源

- **[全民英檢官網](https://www.gept.org.tw/)**：有各級的題型說明和官方練習題，準備前一定要先做一次，了解實際難度。
- **[LTTC 語言訓練測驗中心](https://www.lttc.ntu.edu.tw/)**：公布各級參考字表。
- **教育部國中基本 1,200 字**：網路上搜尋就有完整字表。
- **圖書館的分級讀本**：補閱讀量最省錢的方式。

## 考試當天

### 前一晚
- 不要再讀新東西，早睡。
- 准考證、身分證件、2B 鉛筆、橡皮擦先放進袋子。

### 當天
- 提早到，讓孩子先看看教室和座位，陌生感會少很多。
- 聽力沒聽到的題目就猜一個往下，不要停在那一題。
- 閱讀注意時間，不會的先跳過，最後再回來。

## 常見問題

### 初級需要多少單字？
LTTC 公布的初級參考字表大約兩千多字。不用被數字嚇到，先把國中基本 1,200 字弄熟，就涵蓋了大部分常考的字。

### 國小生考英檢，壓力會不會太大？
看大人怎麼定位。如果講的是「一定要過」，壓力當然大；如果講的是「去看看考試長什麼樣子」，孩子通常可以很輕鬆。第一次沒過非常常見，把它當成一次體驗就好。

### 初級通過對升學有幫助嗎？
各縣市、各校的採計方式不同，而且每年可能調整，請直接查你所在縣市當年度的升學簡章。我的建議是不要為了加分去考，英文能力本身比那張證書有用。

### 初試和複試可以分開準備嗎？
可以，初試通過之後才需要考複試。但口說和寫作需要的時間比想像中長，平常就要有一點開口和寫句子的習慣。

### 沒過怎麼辦？
成績單上有各項分數，先看是哪一項弱。聽力不夠就回去多聽，單字不夠就補字，三到六個月後再考就好。

## 重點整理

- 初級是國中畢業程度，分初試（聽力、閱讀）和複試（寫作、口說）。
- 國小不一定要考；要考的話，小五小六之後比較合適。
- 聽力最早開始準備，閱讀靠平常讀，寫作和口說從短句開始。
- 考試細節以 LTTC 官網最新公告為準。`,
  },
  {
    slug: "screen-time-english-learning-balance",
    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    title: "螢幕時間 vs 英文學習：如何讓平板成為學習工具而不是娛樂？",
    description: "擔心孩子用平板學英文會變成沉迷3C？本文分享如何設定使用規則，讓螢幕時間真正成為有效的學習時間。",
    date: "2026-03-01",
    category: "parenting",
    tags: ["螢幕時間", "3C教養", "家長指南", "學習習慣"],
    readTime: 7,
    cover: { emoji: "📱", gradient: "from-yellow-400 via-orange-500 to-red-500", subtitle: "螢幕時間 vs 英文學習的平衡" , image: "/images/blog/cover-screen-time.webp" },
    content: `「用平板學英文是很方便，但我又怕他越看越離不開。」我自己也有過這個矛盾：一邊覺得線上資源真的好用，一邊每次把平板交給孩子都有點罪惡感。

後來我想通一件事：**螢幕時間不是一種東西。** 躺在沙發上一支接一支滑影片，和坐在桌前點單字、做題目、對著麥克風唸句子，雖然都是看螢幕，對孩子來說是完全不同的活動。要管的不是「用了多久」，而是「用來做什麼、怎麼結束」。

## 兒科醫學會怎麼說

美國兒科學會（AAP）2016 年發布的兒童媒體使用建議，重點大致是：

| 年齡 | 建議 |
|---|---|
| 18 個月以下 | 除了視訊通話，避免使用螢幕 |
| 18–24 個月 | 如果要用，選高品質內容，而且大人陪著看 |
| 2–5 歲 | 每天約 1 小時以內的高品質內容，大人陪同 |
| 6 歲以上 | 訂出一致的規則，確保螢幕不會排擠睡眠、運動和面對面的相處 |

注意 6 歲以上沒有給固定的分鐘數，強調的是「有規則」和「不排擠其他重要的事」。台灣國健署對學齡前的建議也類似：未滿 2 歲不看螢幕，2 歲以上每天不超過 1 小時。

## 怎麼分辨好的學習 App：四個條件

心理學者 Kathy Hirsh-Pasek 等人在 2015 年發表過一篇很常被引用的文章，整理學習科學的研究後提出，真正有教育效果的 App 要符合四個條件：

### 1. 主動參與
孩子要動腦、要做決定，不是只按「下一頁」。點單字聽發音、選答案、開口唸，都算主動。

### 2. 專注不被打斷
沒有跳出來的廣告、沒有跟學習無關的小遊戲、沒有一直叫你升級的彈窗。這些東西會把孩子的注意力從內容上拉走。

### 3. 跟他的生活有關
學到的東西能連到他已經知道的事。學 apple 的時候畫面上是蘋果、句子是 I like apples，而不是孤零零一個字。

### 4. 有人可以一起
學完可以跟爸媽說今天學了什麼、可以一起玩。完全孤立的學習效果最差。

拿這四點去檢查孩子現在用的 App，大概五分鐘就能判斷。挑免費網站的檢查重點，我另外寫在[免費兒童英文網站怎麼挑](/blog/how-to-choose-free-kids-english-website)。

## 四個實際可行的規則

### 規則一：固定時間、固定長度
例如「晚餐後玩一課」。時間固定，孩子就不會整天問「可以玩平板了嗎」。

倫敦大學學院的 Phillippa Lally 等人 2009 年的研究發現，一個新行為變成習慣平均大約要 66 天，而且每個人差很多（從十幾天到兩百多天都有）。所以前兩個月要靠規則撐，之後才會變自然。分齡的安排可以參考[每天 10 分鐘的英文時間表](/blog/daily-10-minute-english-schedule-by-age)。

### 規則二：學習和娛樂分開
最好是不同裝置；做不到的話，至少是不同時段、不同地點。學習在餐桌、娛樂在客廳，孩子會很快分清楚「這個時間是做什麼的」。

### 規則三：學完就收
以「一課」為單位，不以「時間到」為單位。一課結束是自然的停點，孩子比較不會覺得被打斷。冒險英語一課大約十到十五分鐘，過關拿到星星就結束，沒有自動播放下一課。

收的時候由孩子自己關、自己放回固定的位置。這個小動作會讓「結束」變成他做的決定。

### 規則四：看報告，不用全程盯
大人一直在旁邊看，孩子會覺得是被監督。中年級以上可以讓他自己玩，你事後從家長中心看哪一課過得順、哪一課跳過很多次，再聊一聊就好。孩子開始自己玩之後家長要做什麼，寫在[這一篇](/blog/when-kids-play-alone-what-parents-do)。

## 平板和紙本，不是二選一

| | 平板 / 線上 | 紙本 |
|---|---|---|
| 強項 | 聽力、發音、即時回饋、開口練習 | 深度閱讀、手寫、不傷眼 |
| 弱項 | 容易分心、用眼負擔 | 沒有聲音、沒有回饋 |

我的做法是：**聽和說用線上，讀和寫用紙本。** 低年級以聽說為主，線上的比例可以高一點；中高年級開始讀繪本、橋樑書，紙本的比例就慢慢拉上來。書怎麼選，可以看[兒童英文繪本推薦](/blog/best-english-books-for-kids-2026)。

## 家長最擔心的三件事

### 眼睛
比起藍光，更該注意的是**近距離用眼的時間和戶外活動量**。國健署的護眼建議是：用眼 30 分鐘休息 10 分鐘、每天戶外活動 2 小時以上、螢幕和眼睛保持距離。一天一課十幾分鐘的學習，本身不是問題，問題通常出在其他沒有規則的螢幕時間。

### 沉迷
會讓孩子停不下來的，是自動播放、無限捲動、隨機獎勵這些設計。選沒有這些設計的學習工具，再加上「學完就收」的規則，風險就很低。

### 效果
線上學習取代不了真人互動，也不該拿來取代。它最適合做的是「每天穩定的聽和說輸入」，這剛好是家長最難自己提供的部分。

## 常見問題

### 幾歲可以開始用平板學英文？
2 歲以下不建議。2 到 5 歲要大人陪著，時間短。大班到小一之後，可以開始每天固定一課。

### 孩子學完不肯放下平板怎麼辦？
第一天就把規則講清楚：一課結束就收，沒有例外。前一兩週可能會抗議，你只要平靜地堅持，不用生氣也不用解釋太多。如果哭鬧就多給五分鐘，他學到的會是「哭有用」。

### 免費的學習 App 品質夠嗎？
免費或付費不是重點，用前面四個條件去檢查。要特別留意的是免費 App 裡的廣告，那是最常破壞專注的東西。

### 紙本教材還需要嗎？
需要。寫字和長一點的閱讀，紙本還是比較好。

## 結語

螢幕不是敵人，沒有規則才是。固定時間、學完就收、學習和娛樂分開，這三件事做到了，平板就只是一個工具，跟繪本、字卡沒有兩樣。

## 參考資料

- American Academy of Pediatrics (2016). [Media and Young Minds](https://publications.aap.org/pediatrics/article/138/5/e20162591/60503). Pediatrics, 138(5).
- Hirsh-Pasek, K., et al. (2015). [Putting Education in "Educational" Apps](https://journals.sagepub.com/doi/10.1177/1529100615569721). Psychological Science in the Public Interest.
- Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world. European Journal of Social Psychology, 40(6).
- 衛生福利部國民健康署。[兒童視力保健](https://www.hpa.gov.tw/)。`,
  },
];

export const BOOKS = [
  {
    category: "5-6 歲入門",
    items: [
      { title: "Brown Bear, Brown Bear, What Do You See?", author: "Eric Carle", age: "5-6", amazon: "https://amzn.to/4bw6xfB", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/F012778662?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "🐻", description: "最經典的英文繪本入門，重複句型+鮮豔圖畫" , match: "L3 市場街 Animals & Colors" , cover: "/images/books/covers/brown-bear.webp" },
      { title: "The Very Hungry Caterpillar", author: "Eric Carle", age: "5-6", amazon: "https://amzn.to/4bDewaN", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/F017496739?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "🐛", description: "學數字、食物、星期，孩子百看不膩" , match: "L3 市場街 Food & Numbers" , cover: "/images/books/covers/hungry-caterpillar.webp" },
    ],
  },
  {
    category: "5-8 歲進階",
    items: [
      { title: "Elephant & Piggie 系列", author: "Mo Willems", age: "5-8", amazon: "https://amzn.to/40ZENvf", books: "", image: "🐘", description: "對話式繪本，最適合練口說" , match: "L4 學校路 Feelings" , cover: "/images/books/covers/elephant-piggie.webp" },
      { title: "Fly Guy 系列", author: "Tedd Arnold", age: "5-8", amazon: "https://amzn.to/47brgEh", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/F010718271?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "🪰", description: "橋樑書，從繪本跨到章節書" , match: "L2 聲音島 Phonics" , cover: "/images/books/covers/fly-guy.webp" },
      { title: "Oxford Reading Tree 系列", author: "Oxford", age: "5-8", amazon: "https://amzn.to/4lEkltg", books: "", image: "🌳", description: "英國小學指定教材，分級閱讀最完整" , match: "L4 學校路 Daily Life" , cover: "/images/books/covers/oxford-reading-tree.webp" },
    ],
  },
  {
    category: "8-12 歲挑戰",
    items: [
      { title: "Magic Tree House 系列", author: "Mary Pope Osborne", age: "7-12", amazon: "https://amzn.to/4rJBZ06", books: "", image: "🏠", description: "冒險+知識，學過去式最自然的方式" , match: "L9 時光道 Time Road" , cover: "/images/books/covers/magic-tree-house.webp" },
      { title: "Diary of a Wimpy Kid 系列", author: "Jeff Kinney", age: "8-12", amazon: "https://amzn.to/4lFVSDQ", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/F01b140253?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "📔", description: "超受歡迎！漫畫風格輕鬆讀" , match: "L8 問題塔 Q&A" , cover: "/images/books/covers/wimpy-kid.webp" },
      { title: "Dog Man 系列", author: "Dav Pilkey", age: "7-12", amazon: "https://amzn.to/47tXv1J", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/F015311445?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "🐕", description: "圖多字少，讓不愛讀書的孩子也愛上" , match: "L11 挑戰場 Quiz" , cover: "/images/books/covers/dog-man.webp" },
      { title: "Who Was 系列", author: "Various", age: "8-12", amazon: "https://amzn.to/40ZFFA1", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/F010874629?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "🧑‍🔬", description: "人物傳記，學英文也學歷史" , match: "L10 未來橋 Future Bridge" , cover: "/images/books/covers/who-was.webp" },
    ],
  },
  {
    category: "家長工具書",
    items: [
      { title: "用有聲書輕鬆聽出英語力", author: "廖彩杏", age: "家長", amazon: "", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/0010796072?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "🎧", description: "台灣最經典的英文啟蒙書單" , match: "有聲書引導＋語感建立" },
      { title: "英文繪本創意教學", author: "張湘君", age: "家長", amazon: "", books: "https://www.books.com.tw/exep/assp.php/vegalin1029/products/0010312470?sloc=main&utm_source=vegalin1029&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202603", image: "📚", description: "如何用繪本教孩子英文" , match: "繪本教學技巧與策略" },
    ],
  },
];

/**
 * 排程上架：文章的 date 超過「建置日期」就不出現（列表、內頁、sitemap、首頁都不會有）。
 * 每天 00:10 台北時間有 GitHub Actions 檢查當天有沒有到期的文章，有就重新建置部署（.github/workflows/scheduled-publish.yml）。
 * 想立刻看到未來的文章：本機 dev 時 NEXT_PUBLIC_BUILD_DATE 設成 2099-12-31。
 */
const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' });

/** 全部文章（含未到期），最新在前 */
export const ALL_BLOG_POSTS: BlogPost[] = [...SCHEDULED_POSTS, ...POSTS_2026_03_09].sort((a, b) => (a.date < b.date ? 1 : -1));
/** 已上架的文章（date <= 建置日期），最新在前。全站只用這個。 */
export const BLOG_POSTS: BlogPost[] = ALL_BLOG_POSTS.filter(p => p.date <= BUILD_DATE);

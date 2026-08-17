# Vega 語音腳本（Adventure English）— ✅ 確認版

**儲存位置：**
- 本地：`~/Desktop/vega-voice/`（134 個 mp3，`*.old.mp3` 是重生前的備份）
- R2 bucket：**`adventure-audio`**（冒險英語專用，2026-08-06 從 `learn-audio` 搬出來，避免跟 learn 站混在一起）
  - 公開網址：`https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/vega/{檔名}.mp3`
  - 課文音檔之後放 `lessons/` 前綴
- 上傳指令（**一定要加 `--remote`**，不然只會寫進本機模擬環境）：
  ```bash
  npx wrangler r2 object put "adventure-audio/vega/檔名.mp3" \
    --file ~/Desktop/vega-voice/檔名.mp3 --content-type audio/mpeg --remote
  ```

**聲音設定：**
- Vega（敘述）：Anna Su, Voice ID `9lHjugDhwqoxA5MhX0az`
- Finn：Valf, Voice ID `nNXPmxHfg9PtGzFxr9Zd`
- Coco：Terra, Voice ID `aFueGIISJUmscc05ZNfD`
- Polly：Fena, Voice ID `BlgEcC0TfWpBak7FmvHW`
- Benny：Ahmed, Voice ID `9lJhQTNhE6XNSstSyMzH`
- Ruby：**Jessica**, Voice ID `cgSgspJ2msm6clMCkdW9`（2026-08-09 換掉舊的 Abby `IKuPqyuiEnnZFcU4OVzH`）

**生成參數：**
- model: `eleven_multilingual_v2`
- stability: `1.0`（Vega）/ `0.6`（角色）
- similarity_boost: `0.85`
- speed: `0.95`

---

## ⚠️ 中文發音陷阱清單

Anna Su 對某些字念錯，已調整文字避開：

| 原字 | 念成 | 改用 |
|------|------|------|
| 谷 | 故 | 山谷 / 美麗的彩虹谷 |
| 單字 | 但字 | 單詞 |
| 島 | 到/刀 | 島嶼 |
| 拼 | 平 | 組合 |
| 暖 | 沒有三聲 | 熱身 |
| 動動腦 | 東東腦 | 想一想 / 動腦袋瓜 |
| 棒 | 幫 | 厲害 |
| 星（單字） | 行 | 拿到一顆星 |
| 極 | 績 | 太厲害 |
| 兔 | 圖 | 兔子 |
| 寫 | 些 | 寫作（避免「寫字」）|
| 唱 | 場 | 喜歡唱歌 |
| 小 | 校/效 | 拿掉「小」 |
| 母（字母） | 幕 | 每個字母 |
| 唸唸看 | 年年看 | 一起來讀 |
| 五（數字） | 物 | 用阿拉伯數字 5 |
| 石（寶石） | 是 | 寶石獎勵 |
| 箱（寶箱） | 項 | 大寶箱 |
| 得到 | 德島 | 拿到 |
| 恭喜 | 宮西 | 太棒了 |
| 徽章 | 毀章 | 勳章 |
| 答對 | 大隊 | 題目做對 / 猜對了 |
| 島嶼 | 迂回 / 到魚 | 一座島／一個關卡（「島」單用也會念成到/刀，整組都要避開）<br>⚠️ 但**不是每次都壞**：`page-courses` 的「十二座島嶼」Vega 聽過是對的（2026-08-11）。同一個詞這次對下次錯，**聽過的檔案就別重生**|
| 證書 | 整數 | 畢業證書（三字組合念得對）|
| 獎狀 | 獎章 | 畢業證書 |
| 結業 | 結野 | 畢業 |
| 讀（單用） | 兜 | 看故事 / 一起讀（前後有字才對）|
| 小屋 | 小物 | **小木屋**（樹屋也不行→庶務）|
| 樹屋 | 庶務 | 小木屋 |
| 小任務 / 個任務 | 小人物 / 個人物 | 3 件事 / 挑戰（「任務」單獨用是對的，一加量詞就壞）|

| 闖關 | 創館 | 開始玩 / 出發 |
| 寶物 | 寶屋 | 寶貝 / 獎勵 / 好東西（「物」跟「屋」會互換）|
| 冒險英語 | 貓顯 / 貓閒英語 | 「歡迎來到冒險英語**，**」用逗號接，別用驚嘆號 |
| 每一課 | 每一科 | 每一堂課 |
| 收集 | 手機 | 拿到 |
| 寶石 | 包飾 | 獎勵 |
| 換寶物 | 環保喔 | 獎勵也越多 |
| 按「中」 | 按種 | 按翻譯鍵 |
| 第四關 | 第四管 | 再來是… |

> ⚠️ **STT 過不代表人耳聽得對。** 「闖關」用 Scribe 轉出來是對的，
> 但 Vega 實際聽到的是「創館」。中文旁白一律要 **Vega 聽過才算數**，
> 流程：寫稿 → 生成 → STT 擋明顯錯誤 → **傳檔案給 Vega 聽** → 才上傳 R2。
>
> ⚠️ 這些是 Vega 實際聽出來回報的，不是我猜的。
> **寫完稿一定要用 Scribe 轉一次驗證**，不要相信「應該不會錯」：
> ```bash
> curl -s -X POST https://api.elevenlabs.io/v1/speech-to-text \
>   -H "xi-api-key: $KEY" -F "file=@檔案.mp3" -F "model_id=scribe_v1"
> ```
> 同一句話重生也可能這次對、下次錯（如「個任務」），驗過的檔案就別再重生。

---

## 📜 最終確認版腳本（115 段）

### Part 1：開場（1 段，Vega 中文）
- `01-welcome.mp3`：嗨！歡迎來到冒險英語！我們一起冒險吧！

### Part 2：6 世界（Vega）
- `world-1-rainbow-valley.mp3`：歡迎來到美麗的彩虹谷！這裡是冒險的起點，我們要一起學 26 個英文字母。
- `world-2-friendly-town.mp3`：歡迎來到友善小鎮！我們要學生活中常用的英文單詞。
- `world-3-ocean-bay.mp3`：Welcome to Ocean Bay! Let's learn how to talk with friends and explore the sea.
- `world-4-story-castle.mp3`：Welcome to Story Castle! Discover wonderful stories and adventures inside.
- `world-5-explorer-land.mp3`：Welcome to Explorer Land! Let's explore far and wide to find new worlds.
- `world-6-champion-peak.mp3`：Welcome to Champion Peak! This is your final challenge. You can reach the top!

### Part 3：12 島嶼（Vega）
- `island-1-letter.mp3`：歡迎來到字母島嶼！我們要學 26 個英文字母。
- `island-2-sound.mp3`：歡迎來到聲音島嶼！我們要學每個字母怎麼念，怎麼組合成單詞。
- `island-3-market.mp3`：歡迎來到市場街！我們要學日常生活的單詞。
- `island-4-school.mp3`：歡迎來到學校路！我們要學跟學校有關的單字。
- `island-5-coral.mp3`：Welcome to Coral Beach! Let's learn long vowels and animals.
- `island-6-lighthouse.mp3`：Welcome to Lighthouse Point! Let's learn about weather and seasons.
- `island-7-grammar.mp3`：Welcome to Grammar Gate! Let's learn verbs and present tense.
- `island-8-question.mp3`：Welcome to Question Tower! Let's learn how to ask questions.
- `island-9-time.mp3`：Welcome to Time Travel Path! Let's travel back and learn past tense.
- `island-10-future.mp3`：Welcome to Future Bridge! Let's go to the future with future tense.
- `island-11-challenge.mp3`：Welcome to Challenge Arena! This is where champions train.
- `island-12-victory.mp3`：Welcome to Victory Summit! Reach the top — you can do it!

### Part 4：5 步驟引導（Vega）

**L1-L4 初級（純中文）**
- `step-wakeup-low.mp3`：先來熱身一下！想一想吧！
- `step-discover-low.mp3`：來學新單詞！一起來讀。
- `step-challenge-low.mp3`：挑戰時間！加油！
- `step-talktime-low.mp3`：來練習說英文！別怕。
- `step-complete-low.mp3`：太厲害了！你完成了！

**L5-L12 中高級（純英文）**
- `step-wakeup-high.mp3`：Time to warm up! Let's review what we learned.
- `step-discover-high.mp3`：Let's discover new words and phrases!
- `step-challenge-high.mp3`：Challenge yourself! Show me what you know.
- `step-talktime-high.mp3`：Conversation time! Let's chat in English.
- `step-complete-high.mp3`：Excellent work! You completed this mission!

### Part 5：30 鼓勵句（Vega，全英文）

**L1-L4 簡單英文**
- `praise-low-1.mp3` ~ `praise-low-10.mp3`：Good! / Yes! / Great! / Wow! / Cool! / Perfect! / Awesome! / Yay! / Try again! / You did it!

**L5-L8 中段**
- `praise-mid-1.mp3` ~ `praise-mid-10.mp3`：Great job! / Well done! / Amazing work! / Perfect! / Keep going! / You're doing great! / Almost there! / Try again, you can do it! / Don't give up! / Excellent!

**L9-L12 進階**
- `praise-high-1.mp3` ~ `praise-high-10.mp3`：Excellent work, my friend! / You're doing amazing! / Perfect score, keep it up! / Outstanding performance! / What a brilliant answer! / You're a true champion! / Keep pushing forward! / Fantastic effort! / I'm so proud of you! / Don't give up, you've got this!

### Part 6：24 獎勵音效（Vega）

**L1-L4 純中文**
- `reward-star-1.mp3`：你拿到一顆星！
- `reward-star-2.mp3`：你拿到兩顆星！
- `reward-star-3.mp3`：完美三顆星！太棒了！
- `reward-gem.mp3`：你獲得寶石獎勵！
- `reward-streak-3.mp3`：連對三題！好厲害！
- `reward-streak-5.mp3`：連對 5 題！太厲害了！
- `reward-streak-10.mp3`：連對十題！你是超級星星！
- `reward-badge.mp3`：你完成島嶼，獲得勳章！
- `reward-chest.mp3`：你打開了大寶箱！
- `reward-pet-grow.mp3`：你的學習寵物長大了！
- `reward-world-complete.mp3`：你完成一個世界！太厲害了！
- `reward-certificate.mp3`：你拿到畢業證書！太棒了！

**L5-L12 純英文**
- `reward-star-1-en.mp3`：You got a star!
- `reward-star-2-en.mp3`：Two stars, well done!
- `reward-star-3-en.mp3`：Three stars, perfect!
- `reward-gem-en.mp3`：You earned a gem!
- `reward-streak-3-en.mp3`：Three in a row, great!
- `reward-streak-5-en.mp3`：Five in a row, you're on fire!
- `reward-streak-10-en.mp3`：Ten in a row, amazing!
- `reward-badge-en.mp3`：You got an island badge!
- `reward-chest-en.mp3`：You opened the chest!
- `reward-pet-grow-en.mp3`：Your pet leveled up!
- `reward-world-complete-en.mp3`：World complete, well done!
- `reward-certificate-en.mp3`：Congratulations, you earned a certificate!

### Part 7-A：Vega 介紹 5 角色（中文）
- `vega-intro-finn.mp3`：這是 Finn，活潑勇敢的狐狸。他會陪你熱身，也會陪你開口說英文。
- `vega-intro-coco.mp3`：這是 Coco，安靜的好朋友。她會陪你聽英文。
- `vega-intro-polly.mp3`：這是 Polly，喜歡唱歌的鸚鵡。她會陪你開口說英文。
- `vega-intro-benny.mp3`：這是 Benny，喜歡看故事的好朋友。他會陪你看每一課的故事。
- `vega-intro-ruby.mp3`：這是 Ruby，認真細心的兔子。她會在每一課的最後等你，陪你拿到獎勵。

### Part 7-B：5 角色自我介紹（英文，各自聲音）
- `char-finn.mp3`（Valf）：Hi! I'm Finn! Let's go on an adventure!
- `char-coco.mp3`（Terra）：Hi, I'm Coco. Listen carefully.
- `char-polly.mp3`（Fena）：Hi! I'm Polly! Repeat after me!
- `char-benny.mp3`（Ahmed）：Hello, friend. I'm Benny. Let's read.
- `char-ruby.mp3`（Jessica）：Hi, I'm Ruby! Let's find the treasure!

### Part 7-C：5 角色關卡口號（英文，各自聲音）
- `coco-listen.mp3`：Listen carefully!（聽力關時播）
- `polly-speak.mp3`：Repeat after me!（口說關時播）
- `benny-read.mp3`：Let's read together!（閱讀關時播）
- `ruby-treasure.mp3`（Jessica）：Treasure time! Let's go!（破關後按「寶藏挑戰」時播）
- `finn-go.mp3`：Let's go!（任何「開始」按鈕）

### Part 8：7 學習提醒（Vega）

**L1-L4 純中文**
- `reminder-today-low.mp3`：今天還沒開始學習喔！
- `reminder-2days-low.mp3`：兩天沒見了！你的學習寵物想你了！
- `reminder-week-low.mp3`：好久不見了！回來繼續冒險吧！
- `welcome-back-low.mp3`：歡迎回來！我們繼續學英文吧！

**L5-L12 純英文**
- `reminder-today-high.mp3`：Time to learn today!
- `reminder-back-high.mp3`：Your pet misses you, come back!
- `welcome-back-high.mp3`：Welcome back, let's continue!

---

## 📊 數量統計

| Part | 數量 |
|------|------|
| 1. 開場 | 1 |
| 2. 6 世界 | 6 |
| 3. 12 島嶼 | 12 |
| 4. 10 步驟（5×2 級別） | 10 |
| 5. 30 鼓勵句（10×3 級別） | 30 |
| 6. 24 獎勵（12×2 級別） | 24 |
| 7-A. Vega 介紹角色 | 5 |
| 7-B. 角色自我介紹 | 5 |
| 7-C. 角色關卡口號 | 5 |
| 8. 學習提醒 | 7 |
| 之前生成 | 10 |
| **總計** | **115** |

---

## 🎯 下一步：整合到網站

需要在 `english.chparenting.com` 對應位置播放音檔：

| 觸發時機 | 播放檔案 |
|---------|---------|
| 首頁載入 | `01-welcome.mp3` |
| 點世界卡片 | `world-{1-6}-{name}.mp3` |
| 點島嶼卡片 | `island-{1-12}-{name}.mp3` |
| 進入步驟 | `step-{name}-low/high.mp3`（依級別）|
| 答對題目 | 隨機 `praise-low/mid/high-{1-10}.mp3` |
| 得獎勵 | 對應 `reward-{type}-(en).mp3` |
| 點角色卡片 | `vega-intro-{name}.mp3` + `char-{name}.mp3` |
| 進入聽力關 | `coco-listen.mp3` |
| 進入口說關 | `polly-speak.mp3` |
| 進入閱讀關 | `benny-read.mp3` |
| 按下寶藏挑戰 | `ruby-treasure.mp3` |
| 點「開始」按鈕 | `finn-go.mp3` |
| 推播通知 | `reminder-*.mp3` |

---

## 📌 待修清單（2026-08-08 Vega 標記）

### guide 五張投影片

**內容對不上現況**（詳見下方對照）：

| Slide | 問題 |
|---|---|
| 2 How You'll Learn | 圖上 4 格、音檔講「5 步驟」，互相矛盾。實際流程是 暖身→讀故事→闖關→開口說→破關。「聽力」不是獨立步驟、「玩遊戲」指的是課程外的 /games |
| 3 認識夥伴 | Ruby「Writing star」——流程裡沒有寫作步驟，五隻裡只有她沒登場機會 |
| 4 Collect Rewards | 「開寶箱」是小屋的**每日**獎勵，不是闖關獎勵，放這頁會誤導 |
| 全部 | 沒提到起點測驗、小屋、家長登入保存進度 |

⚠️ **改成 5 步驟的話 guide2.webp 底圖要重生**（現在是 4 個框）。
建議保留 4 格，改成「暖身 / 讀故事 / 闖關 / 開口說」，破關獎勵由 slide 4 負責。

**發音不夠標準**：guide 的旁白有幾處念得不準，Vega 要重聽後標出是哪幾句、哪幾個字。
標出來之後照下面的發音陷阱表改寫文字再重生（改字比調參數有效）。
已知這幾張會踩到的：**闖關→創館**、**寶物→寶屋**、**小屋→小物**、**答對→大隊**。

**重生時要注意**：`guide-lesson-flow`、`guide-rewards`、`guide-quickstart`、`guide-intro`
都是 Anna Su `9lHjugDhwqoxA5MhX0az`，stability 1.0 / similarity 0.85 / speed 0.95。
生完**一定要 Vega 本人聽過**——STT 過不代表人耳聽得對。

---

## 🔴 中文旁白的真相（2026-08-09 大量實測後）

### 1. STT 抓不到聲調錯誤，別想用它省時間

試過用 Scribe（`language_code=zho`，**不是** `cmn`）先篩一輪再給 Vega 聽。**行不通**：
STT 會把聽到的音自動修正成最合理的詞。實測 stability 1.0 那版
STT 判「獎牌」正確，Vega 一聽是「蔣派」。

STT 只抓得到「念成完全不同的詞」（手機/环保师那種），抓不到聲調偏差。
**中文旁白唯一可靠的驗收是 Vega 的耳朵。**

### 2. stability 不是解方

同一句話測 1.0 / 0.7 / 0.5 / 0.3，每個都錯不同的字，沒有哪個明顯較好。
維持 1.0（跟既有檔一致）就好，不要為了發音去調它。

### 3. ⚠️ 同一個詞換位置就會走音 —— 這是最重要的一條

- 「拿到」在 **`就能拿到一顆星`** ✅ 對
- 「拿到」放到句首 **`拿到越多`** ❌ 變成「那到」
- 「顆」在 **`一顆星`** ✅ 對，在 **`越多顆星`** ❌ 變成「可星」
- 「換到」在 A 版 ✅ 對，在 C 版同樣的詞 ❌ 變成「環島」

**所以陷阱表不能只記「哪些字不能用」，要連用在什麼位置一起記。**
每次換字＝換了新位置＝又一次賭博，這就是為什麼改寫會一直繞不完。

### 4. 正確做法：整句沿用，不要拆開重組

累積「Vega 耳朵確認過的完整句子」，寫新旁白時**整句複製**，
拼不出來再冒險用新詞，而且要有心理準備要重來幾輪。

## ✅ 安全句庫（Vega 本人確認發音正確）

| 句子 | 用在 |
|---|---|
| 題目做對就能拿到一顆星。 | 獎勵說明 |
| 做對越多，就能換到更好的獎勵。 | 獎勵說明 |
| 這些通通會放進你的木屋裡！ | 獎勵說明 |
| 每一課有 5 個步驟。 | 流程說明 |
| 先熱身，再聽一段故事，然後挑戰題目，接著開口說英文，最後就能拿到一顆星！ | 流程說明 |
| 這是 Ruby，認真細心的兔子。 | 角色介紹 |
| 她會在每一課的最後等你，陪你拿到獎勵。 | 角色介紹 |

## ⚠️ 新增陷阱（2026-08-09）

| 原字 | 念成 | 條件 / 改用 |
|------|------|------|
| 大（大獎勵）| 打 | 拿掉「大」|
| 關（關卡／一關／過關／闖關）| 館 | **`關` 整個不能用** → 步驟、最後、就能拿到一顆星 |
| 星星 | 信心 | 一顆星 |
| 收集 | 手機 | 拿到越多 / 做對越多 |
| 寶石 | 环保師 / 寶是 | 不講寶石，改「更好的獎勵」|
| 章（徽章／勳章）| 張 | **`章` 不能用** → 獎牌…但獎牌也會變「蔣派」，**乾脆不要提徽章** |
| 顆（前面沒有「一」）| 可 | 只用「一顆星」，不要用「越多顆星」|
| 拿到（放句首）| 那到 | 只用在句中（「就能拿到…」），句首改「做對越多」|
| 木屋（0.7 stability 時）| 墓物 | 用 stability 1.0 |

## ⚠️ 新增陷阱（2026-08-09 第二輪）

| 原字 | 念成 | 說明 |
|------|------|------|
| 單字 | **但子** | 2026-08-17 welcome 總重錄整批陣亡（以下同） |
| 句型 | **舉行** | |
| 閃卡 | **山卡** | |
| 比比 | **逼逼** | |
| 練習 | **臉習** | |
| 答對 | **打對** | |
| 麥克風 | **買克風** | |
| 收集 | **手機** | |
| 星（單用） | **信** | 一律用「星星」疊字（2026-08-17 Vega 抓的：welcome 第五幕） |
| 獎勵 | **將吏** | 改用「禮物」（同上） |
| 冒險 | **卯**險 | 單獨的「冒險」也不行，不只「冒險英語」。**語音一律不提冒險**，畫面文字照寫 |
| 熊（小熊）| **兇** | 二聲被念成一聲 |
| 貓 | **毛** | 同上。「貓咪」也不行，會變「毛咪」|
| 細心（在「安靜細心」裡）| **悉**心 | 同一個詞在「認真細心」裡卻是對的 ⇒ 又一個位置問題 |

### 🐾 動物名幾乎都念不對

熊→兇、貓→毛，二聲的動物名特別不穩。**角色介紹一律不講動物名**，
改成「好朋友」。例外：狐狸、兔子、鸚鵡經 Vega 確認可用。

還有第三條路沒試過：**動物名用英文**（「安靜的 cat」）——
這個聲音念英文沒問題，對學英文的孩子反而合理。之後可以試。

## ✅ 五隻角色介紹（2026-08-09 定稿，Vega 耳朵確認）

| 檔案 | 內容 |
|---|---|
| `vega-intro-finn` | 這是 Finn，活潑勇敢的狐狸。他會陪你熱身，也會陪你開口說英文。 |
| `vega-intro-coco` | 這是 Coco，安靜的好朋友。她會陪你聽英文。 |
| `vega-intro-polly` | 這是 Polly，喜歡唱歌的鸚鵡。她會陪你開口說英文。 |
| `vega-intro-benny` | 這是 Benny，喜歡看故事的好朋友。他會陪你看每一課的故事。 |
| `vega-intro-ruby` | 這是 Ruby，認真細心的兔子。她會在每一課的最後等你，陪你拿到獎勵。 |

句型統一是 **「這是 X，OO的YY。他/她會…」**，這個結構已驗證可用，
之後新增角色直接套，只換中間的詞。

## ✅ guide 五張投影片旁白（2026-08-09 定稿）

| 檔案 | 內容 |
|---|---|
| `guide-intro` | 嗨！我是 Vega。我會陪你一起學英文，我們出發吧！ |
| `guide-lesson-flow` | 每一課有 5 個步驟。先熱身，再聽一段故事，然後挑戰題目，接著開口說英文，最後就能拿到一顆星！ |
| `guide-rewards` | 題目做對就能拿到一顆星。做對越多，就能換到更好的獎勵。這些通通會放進你的木屋裡！ |
| `guide-quickstart` | 準備好了嗎？先選一個你喜歡的角色，我們就出發囉！ |
| slide 3 | 沒有專屬旁白，由五隻角色各自的 🔊 播 |

⚠️ 舊稿的問題（已修）：`guide-quickstart` 寫「選一隻你喜歡的**寵物**」，
但早就改成選角色了；`guide-intro` 提了兩次「冒險」。

## ✅ page-badges 定版（2026-08-11，Vega 耳朵確認）

`page-badges` = **哇，你已經拿到這麼多了！繼續加油，就會越來越多。**

繞開兩個詞才過關：**收集**（→手機）、**勳章 的「勳」**（Vega 聽出不對，跟舊表寫的「章→張」同一類）。
定版稿刻意不指名東西——那頁畫面上滿滿都是徽章，旁白不用再講一次名字。

`拿到` 放句中、`繼續加油`、`越來越多` 這三段確認可用，之後其他頁可以直接沿用。

## 追加陷阱

| 原字 | 念成 | 改用 |
|------|------|------|
| 歡**迎** | 歡**英** | 開頭改講「嗨！」|
| 挑（挑一本）| 調 | 改用「選一本」（「選一個／選一本」已驗證可用）|

### 結論：不是特定聲調的問題

累積案例：大→打、關→館、星→醒、拿→那、顆→可、細→悉、
熊→兇、貓→毛、迎→英、收集→手機。**四個聲調都會掉，沒有規律。**
唯一穩的辦法就是 Vega 耳朵聽過的整句，直接沿用。

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
- Ruby：Abby, Voice ID `IKuPqyuiEnnZFcU4OVzH`

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
| 島嶼 | 迂回 / 到魚 | 一座島／一個關卡（「島」單用也會念成到/刀，整組都要避開）|
| 證書 | 整數 | 畢業證書（三字組合念得對）|
| 獎狀 | 獎章 | 畢業證書 |
| 結業 | 結野 | 畢業 |
| 讀（單用） | 兜 | 看故事 / 一起讀（前後有字才對）|
| 小屋 | 小物 | **小木屋**（樹屋也不行→庶務）|
| 樹屋 | 庶務 | 小木屋 |
| 小任務 / 個任務 | 小人物 / 個人物 | 3 件事 / 挑戰（「任務」單獨用是對的，一加量詞就壞）|

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
- `vega-intro-finn.mp3`：這是 Finn，活潑愛冒險的小狐狸，會帶你去每個關卡冒險！
- `vega-intro-coco.mp3`：這是 Coco，安靜的小貓，會陪你練習聽力。
- `vega-intro-polly.mp3`：這是 Polly，喜歡唱歌的鸚鵡，會陪你練習口說。
- `vega-intro-benny.mp3`：這是 Benny，喜歡看書的小熊，會陪你練習閱讀。
- `vega-intro-ruby.mp3`：這是 Ruby，認真細心的小兔子，會陪你練習寫作。

### Part 7-B：5 角色自我介紹（英文，各自聲音）
- `char-finn.mp3`（Valf）：Hi! I'm Finn! Let's go on an adventure!
- `char-coco.mp3`（Terra）：Hi, I'm Coco. Listen carefully.
- `char-polly.mp3`（Fena）：Hi! I'm Polly! Repeat after me!
- `char-benny.mp3`（Ahmed）：Hello, friend. I'm Benny. Let's read.
- `char-ruby.mp3`（Abby）：Hi, I'm Ruby. Let's write together!

### Part 7-C：5 角色關卡口號（英文，各自聲音）
- `coco-listen.mp3`：Listen carefully!（聽力關時播）
- `polly-speak.mp3`：Repeat after me!（口說關時播）
- `benny-read.mp3`：Let's read together!（閱讀關時播）
- `ruby-write.mp3`：Let's write it!（寫作關時播）
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
| 進入寫作關 | `ruby-write.mp3` |
| 點「開始」按鈕 | `finn-go.mp3` |
| 推播通知 | `reminder-*.mp3` |

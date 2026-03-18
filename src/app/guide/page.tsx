import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用說明 - 如何使用 Adventure English 冒險英語",
  description: "Adventure English 冒險英語完整使用說明。了解如何開始學習、每課的學習流程、獎勵系統、家長週報等功能。",
};

export default function GuidePage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            <span className="gradient-text">使用說明</span> 📖
          </h1>
          <p className="text-lg text-gray-500">3 分鐘了解怎麼使用冒險英語</p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">🚀 快速開始</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "1", icon: "📱", title: "打開平台", desc: "用瀏覽器打開 english.chparenting.com，不需要安裝 App" },
              { step: "2", icon: "🐾", title: "選隻寵物", desc: "選一隻你喜歡的學習寵物蛋，它會陪你一起冒險成長" },
              { step: "3", icon: "🏝️", title: "開始第一課", desc: "從 L1 字母島第一課開始，跟著 Finn 一起冒險！" },
            ].map(s => (
              <div key={s.step} className="glass rounded-2xl p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-black text-lg flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lesson Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">🎮 每課學習流程</h2>
          <p className="text-gray-600 mb-4">每堂課約 15-20 分鐘，包含 5 個步驟：</p>
          <div className="space-y-4">
            {[
              { icon: "🔔", name: "Wake Up! 暖身", time: "2-3 分鐘", color: "bg-yellow-50 border-yellow-200",
                desc: "快速互動遊戲喚醒耳朵和大腦。可能是聽音選圖、快問快答、或上一課的複習小測驗。" },
              { icon: "📚", name: "Discover 探索", time: "5-8 分鐘", color: "bg-blue-50 border-blue-200",
                desc: "學習新內容！有動畫、圖片、聲音，Finn 會帶你認識新單字和句型。不需要死記，跟著互動自然就記住了。" },
              { icon: "🎮", name: "Challenge 挑戰", time: "5-8 分鐘", color: "bg-green-50 border-green-200",
                desc: "最刺激的部分！各種遊戲化練習：\n• 🎧 聽力闖關 — 聽音選圖、聽寫挑戰\n• 📝 Spelling Bee — 拖拉字母拼單字\n• 🔗 連連看 — 配對圖片和單字\n• 📖 閱讀理解 — 讀短文回答問題" },
              { icon: "💬", name: "Talk Time 對話", time: "3-5 分鐘", color: "bg-purple-50 border-purple-200",
                desc: "跟 AI 角色 Polly 對話！Polly 會問你問題，你對著麥克風回答。不用怕說錯，Polly 超有耐心。還能錄音回放，聽聽自己的聲音。" },
              { icon: "⭐", name: "Mission Done! 任務完成", time: "1-2 分鐘", color: "bg-pink-50 border-pink-200",
                desc: "拿到星星和寶石！看看你這課的成績，寵物也會長大一點點。如果拿到 3 顆星（正確率 90%+），還有額外獎勵！" },
            ].map(s => (
              <div key={s.name} className={`${s.color} border rounded-2xl p-5`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-black text-lg">{s.name}</h3>
                  <span className="ml-auto text-xs bg-white/70 rounded-full px-3 py-1 text-gray-500">⏱ {s.time}</span>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Characters */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">🤝 學習夥伴</h2>
          <div className="grid sm:grid-cols-5 gap-3">
            {[
              { emoji: "🦊", name: "Finn", role: "探險隊長", job: "負責開場、串場、總結。是你的冒險領隊！" },
              { emoji: "🐱", name: "Coco", role: "聽力高手", job: "負責聽力訓練。「Listen carefully!」是她的口頭禪。" },
              { emoji: "🦜", name: "Polly", role: "口說達人", job: "負責口說練習和對話。最有耐心的老師。" },
              { emoji: "🐻", name: "Benny", role: "閱讀博士", job: "負責閱讀理解。喜歡說故事給你聽。" },
              { emoji: "🐰", name: "Ruby", role: "寫作天才", job: "負責拼寫和寫作。Spelling Bee 冠軍！" },
            ].map(c => (
              <div key={c.name} className="glass rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">{c.emoji}</div>
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-gray-500 mb-1">{c.role}</div>
                <p className="text-xs text-gray-500">{c.job}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Review System */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">🧩 複習系統 Review Quest</h2>
          <div className="glass rounded-2xl p-6">
            <p className="text-gray-600 mb-4">每學完 5 課，會進入 <strong>Review Quest 複習關卡</strong>，確保你真的學會了：</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-bold mb-1">🎧 Coco 的聽力關</h4>
                <p className="text-sm text-gray-600">聽 5 課的單字和句子，選出正確答案</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-bold mb-1">🗣️ Polly 的口說關</h4>
                <p className="text-sm text-gray-600">唸出學過的單字和句子，AI 判定發音</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-bold mb-1">📖 Benny 的閱讀關</h4>
                <p className="text-sm text-gray-600">閱讀短文並回答理解問題</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4">
                <h4 className="font-bold mb-1">✍️ Ruby 的寫作關</h4>
                <p className="text-sm text-gray-600">Spelling Bee + 造句練習</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">💡 4 關全過 → 獲得「技能獎牌」🏅 → 收集 4 個獎牌 → 獲得「島嶼徽章」🎖️</p>
          </div>
        </section>

        {/* Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">🏆 獎勵系統</h2>
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold mb-2">⭐ 星星 & 💎 寶石</h3>
              <p className="text-sm text-gray-600">每題答對得星星，完成課程得寶石。寶石可以買角色裝備、佈置學習小屋、解鎖新音樂。</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold mb-2">🐾 學習寵物</h3>
              <p className="text-sm text-gray-600">你的專屬寵物蛋會隨著學習進度成長：🥚 蛋 → 🐣 幼體 → 🐥 成長體 → 🦅 進化體 → 👑 究極體。小孩會捨不得讓它餓肚子（笑）</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold mb-2">🎖️ 徽章 & 📜 證書</h3>
              <p className="text-sm text-gray-600">完成每座島嶼獲得專屬徽章，重要里程碑產出精美電子證書，可以下載分享到社群。</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold mb-2">🔥 連續學習 & 稱號</h3>
              <p className="text-sm text-gray-600">連續學習天數越多，稱號越厲害。從「🌱 英語小種子」到「👑 英語冠軍」。</p>
            </div>
          </div>
        </section>

        {/* For Parents */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">👨‍👩‍👧‍👦 給家長</h2>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3">📊 每週學習報告</h3>
            <p className="text-sm text-gray-600 mb-4">每週自動寄送學習報告到家長信箱，內容包括：</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ 本週完成課數和累計進度</li>
              <li>✅ 聽說讀寫四技能正確率</li>
              <li>✅ 新學單字數量</li>
              <li>✅ 連續學習天數</li>
              <li>✅ 弱點分析和建議</li>
              <li>✅ 寵物成長狀態</li>
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
              <p className="text-sm text-yellow-800"><strong>💡 小提醒：</strong>孩子完全可以自主學習，家長只需每週看一次報告就好。不需要坐在旁邊教，也不需要檢查作業，系統都會自動處理。</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">❓ 常見問題</h2>
          <div className="space-y-3">
            {[
              { q: "需要付費嗎？", a: "完全免費！我們的目標是讓每個台灣小朋友都能享受高品質的英語學習資源。" },
              { q: "適合幾歲的孩子？", a: "5-12 歲最適合。L1-L4 適合初學者（幼稚園大班到小二），L5-L8 適合有基礎的孩子（小三到小四），L9-L12 適合進階學習者（小五到小六）。" },
              { q: "每天要學多久？", a: "建議每天一課（約 18 分鐘），這是最佳的學習節奏。當然也可以一天多學幾課，但不建議超過 3 課。" },
              { q: "需要家長在旁邊嗎？", a: "不需要！整個平台設計成孩子自己就能操作。5 個動物角色會引導每個步驟，不需要閱讀文字說明。" },
              { q: "可以用手機學嗎？", a: "可以！支援手機、平板、電腦。但我們建議用平板，螢幕大小剛好，口說練習也比較方便。" },
              { q: "跟補習班有什麼不同？", a: "補習班一週 2 小時，我們一週 7 天每天 18 分鐘 = 2 小時。時間差不多但更分散，學習效果更好。加上 AI 互動口說、自適應難度，是補習班做不到的。" },
            ].map(faq => (
              <details key={faq.q} className="glass rounded-2xl overflow-hidden group">
                <summary className="p-5 cursor-pointer font-bold text-gray-800 list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

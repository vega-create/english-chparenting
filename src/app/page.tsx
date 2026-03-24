export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-float opacity-60">🌈</div>
          <div className="absolute top-20 right-16 text-5xl animate-float-delay opacity-50">⭐</div>
          <div className="absolute bottom-32 left-20 text-4xl animate-float-delay2 opacity-40">🎈</div>
          {/* 桌面版：右下角 Finn */}
          <img src="/characters/finn/finn-wave.png" alt="Finn" className="hidden md:block absolute bottom-20 right-10 w-40 h-40 animate-float-slow opacity-70 object-contain" />
          {/* 手機版：5 個角色散落在背景，半透明 */}
          <img src="/characters/finn/finn-wave.png" alt="Finn" className="md:hidden absolute top-[15%] left-[5%] w-28 h-28 animate-float opacity-25 object-contain" />
          <img src="/characters/coco/coco-listen.png" alt="Coco" className="md:hidden absolute top-[10%] right-[8%] w-24 h-24 animate-float-delay opacity-20 object-contain" />
          <img src="/characters/polly/polly-cheer.png" alt="Polly" className="md:hidden absolute top-[35%] right-[3%] w-28 h-28 animate-float-delay2 opacity-25 object-contain" />
          <img src="/characters/benny/benny-read.png" alt="Benny" className="md:hidden absolute bottom-[30%] left-[3%] w-24 h-24 animate-float opacity-20 object-contain" />
          <img src="/characters/ruby/ruby-star.png" alt="Ruby" className="md:hidden absolute bottom-[15%] right-[10%] w-28 h-28 animate-float-delay opacity-25 object-contain" />
          <div className="absolute top-1/3 left-1/4 text-3xl animate-float-delay opacity-30">✨</div>
          <div className="absolute top-1/2 right-1/4 text-4xl animate-float opacity-30">🎵</div>
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-pink-200 opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-100 opacity-15 blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto animate-slide-up">
          {/* 桌面版：排成一列 */}
          <div className="hidden md:flex justify-center gap-3 mb-6">
            <img src="/characters/finn/finn-wave.png" alt="Finn" title="Finn 探險狐狸" className="w-40 h-40 lg:w-52 lg:h-52 object-contain animate-float" />
            <img src="/characters/coco/coco-wave.png" alt="Coco" title="Coco 聽力貓咪" className="w-40 h-40 lg:w-52 lg:h-52 object-contain animate-float-delay" />
            <img src="/characters/polly/polly-wave.png" alt="Polly" title="Polly 口說鸚鵡" className="w-40 h-40 lg:w-52 lg:h-52 object-contain animate-float-delay2" />
            <img src="/characters/benny/benny-wave.png" alt="Benny" title="Benny 閱讀小熊" className="w-40 h-40 lg:w-52 lg:h-52 object-contain animate-float" />
            <img src="/characters/ruby/ruby-wave.png" alt="Ruby" title="Ruby 寫作兔兔" className="w-40 h-40 lg:w-52 lg:h-52 object-contain animate-float-delay" />
          </div>
          {/* 手機版：隱藏排列，角色散落在背景（見下方 absolute 區塊） */}
          <div className="md:hidden mb-6" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight">
            <span className="gradient-text">Adventure English</span>
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-purple-800 mb-5">
            ✨ 冒險英語 🗺️
          </h2>
          <div className="text-base md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-loose space-y-2">
            <p>專為台灣 <strong className="text-purple-700">5-12 歲</strong>小朋友設計的</p>
            <p><strong className="text-purple-700 text-lg md:text-2xl">免費英語自學平台</strong></p>
            <p className="text-sm md:text-lg text-gray-500">5 個動物好朋友陪你闖關<br className="md:hidden" />從 ABC 一路冒險到英檢初級！</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 relative">
            <img src="/images/guide/vega-point.png" alt="Vega" className="hidden md:block absolute -left-40 bottom-0 w-32 h-32 object-contain animate-float" />
            <button className="cta-btn px-10 py-4 text-lg md:text-xl animate-pulse-glow">
              🚀 開始冒險（即將上線）
            </button>
            <a href="#features" className="cta-btn-secondary px-8 py-4 text-lg no-underline">
              👀 看看怎麼學
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="glass px-4 py-2 rounded-full">✅ 完全免費</span>
            <span className="glass px-4 py-2 rounded-full">✅ 不需家長陪讀</span>
            <span className="glass px-4 py-2 rounded-full">✅ AI 互動口說</span>
            <span className="glass px-4 py-2 rounded-full">✅ 288 堂系統課程</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float-slow text-gray-400 text-center">
          <div className="text-2xl">↓</div>
          <div className="text-xs mt-1">往下看更多</div>
        </div>
      </section>

      {/* ─── Characters Section ─── */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            認識你的 <span className="gradient-text">5 個學習夥伴</span> 🤝
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">每隻動物負責一個技能，陪你一起變強！</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { key: "finn", name: "Finn", role: "探險隊長", skill: "課程引導＆串場", color: "from-orange-100 to-orange-50", border: "border-orange-200" },
              { key: "coco", name: "Coco", role: "聽力高手", skill: "🎧 聽力訓練", color: "from-blue-100 to-blue-50", border: "border-blue-200" },
              { key: "polly", name: "Polly", role: "口說達人", skill: "🗣️ 口說練習", color: "from-green-100 to-green-50", border: "border-green-200" },
              { key: "benny", name: "Benny", role: "閱讀博士", skill: "📖 閱讀理解", color: "from-purple-100 to-purple-50", border: "border-purple-200" },
              { key: "ruby", name: "Ruby", role: "寫作天才", skill: "✍️ 拼寫寫作", color: "from-pink-100 to-pink-50", border: "border-pink-200" },
            ].map((c) => (
              <div key={c.name} className={`island-card bg-gradient-to-b ${c.color} ${c.border} border-2 rounded-3xl p-5 text-center`}>
                <img src={`/characters/${c.key}/${c.key}-normal.png`} alt={c.name} className="w-44 h-44 md:w-52 md:h-52 mx-auto mb-3 object-contain" />
                <div className="font-black text-lg">{c.name}</div>
                <div className="text-sm text-gray-500 mb-2">{c.role}</div>
                <div className="text-xs bg-white/80 rounded-full px-3 py-1 inline-block font-medium">{c.skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            怎麼學？<span className="gradient-text"> 每課 18 分鐘冒險</span> 🎮
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">5 個步驟，玩著玩著就學會了</p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", img: "/images/steps/step-wakeup.png", title: "Wake Up!", desc: "暖身遊戲，喚醒耳朵", time: "2-3 min", color: "bg-yellow-50 border-yellow-300" },
              { step: "2", img: "/images/steps/step-discover.png", title: "Discover", desc: "動畫學新單字和句型", time: "5-8 min", color: "bg-blue-50 border-blue-300" },
              { step: "3", img: "/images/steps/step-challenge.png", title: "Challenge", desc: "闖關遊戲瘋狂練習", time: "5-8 min", color: "bg-green-50 border-green-300" },
              { step: "4", img: "/images/steps/step-talktime.png", title: "Talk Time", desc: "AI 對話，真的開口說", time: "3-5 min", color: "bg-purple-50 border-purple-300" },
              { step: "5", img: "/images/steps/step-complete.png", title: "Mission Done!", desc: "拿星星寶石，寵物成長", time: "1-2 min", color: "bg-pink-50 border-pink-300" },
            ].map((s) => (
              <div key={s.step} className={`island-card ${s.color} border-2 rounded-3xl p-5 text-center`}>
                <img src={s.img} alt={s.title} className="w-24 h-24 mx-auto mb-2 object-contain" />
                <div className="text-xs font-bold text-gray-400 mb-1">STEP {s.step}</div>
                <div className="font-black text-lg mb-1">{s.title}</div>
                <div className="text-sm text-gray-600 mb-2">{s.desc}</div>
                <div className="text-xs bg-white/80 rounded-full px-3 py-1 inline-block text-gray-500">⏱ {s.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interactive Games Section ─── */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            超好玩的 <span className="gradient-text">互動練習</span> 🎯
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">聽・說・讀・寫，每個都有遊戲化練習</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: "/images/skills/skill-listening.png", title: "聽力闖關", items: ["聽音選圖", "聽寫挑戰", "聲音配對"], color: "from-blue-500 to-blue-400" },
              { img: "/images/skills/skill-speaking.png", title: "口說冒險", items: ["AI 對話練習", "錄音回放比對", "跟讀挑戰"], color: "from-green-500 to-green-400" },
              { img: "/images/skills/skill-reading.png", title: "閱讀任務", items: ["故事閱讀", "連連看配對", "克漏字填空"], color: "from-purple-500 to-purple-400" },
              { img: "/images/skills/skill-writing.png", title: "拼寫大師", items: ["Spelling Bee", "拖拉拼單字", "造句練習"], color: "from-pink-500 to-pink-400" },
            ].map((g) => (
              <div key={g.title} className="island-card bg-white rounded-3xl overflow-hidden shadow-lg">
                <div className={`bg-gradient-to-r ${g.color} p-6 text-center text-white`}>
                  <img src={g.img} alt={g.title} className="w-24 h-24 mx-auto mb-2 object-contain" />
                  <div className="font-black text-xl">{g.title}</div>
                </div>
                <div className="p-5">
                  {g.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 py-2 text-sm">
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Adventure Map Section ─── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            <span className="gradient-text">12 座島嶼</span> 冒險地圖 🗺️
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">6 大世界・12 級・288 堂課，從零開始到英檢初級</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { world: "彩虹谷", img: "/images/worlds/world-rainbow-valley.png", islands: [{name: "L1 Letter Island 字母島", img: "/images/islands/island-letter.png"}, {name: "L2 Sound Island 聲音島", img: "/images/islands/island-sound.png"}], desc: "認識 26 字母 + Phonics 自然發音", color: "from-red-50 to-orange-50", border: "border-red-200", tag: "初學者" },
              { world: "友善小鎮", img: "/images/worlds/world-friendly-town.png", islands: [{name: "L3 Market Street 市場街", img: "/images/islands/island-market.png"}, {name: "L4 School Road 學校路", img: "/images/islands/island-school.png"}], desc: "日常單字 + 簡單句型", color: "from-yellow-50 to-amber-50", border: "border-yellow-200", tag: "生活會話" },
              { world: "海洋灣", img: "/images/worlds/world-ocean-bay.png", islands: [{name: "L5 Coral Beach 珊瑚灘", img: "/images/islands/island-coral.png"}, {name: "L6 Lighthouse Point 燈塔角", img: "/images/islands/island-lighthouse.png"}], desc: "閱讀短文 + 進階對話", color: "from-cyan-50 to-blue-50", border: "border-cyan-200", tag: "閱讀起步" },
              { world: "故事城堡", img: "/images/worlds/world-story-castle.png", islands: [{name: "L7 Grammar Gate 文法門", img: "/images/islands/island-grammar.png"}, {name: "L8 Question Tower 問題塔", img: "/images/islands/island-question.png"}], desc: "文法結構 + 疑問句精通", color: "from-purple-50 to-violet-50", border: "border-purple-200", tag: "文法養成" },
              { world: "探索大陸", img: "/images/worlds/world-explorer-land.png", islands: [{name: "L9 Time Travel Path 時光道", img: "/images/islands/island-time.png"}, {name: "L10 Future Bridge 未來橋", img: "/images/islands/island-future.png"}], desc: "時態 + 長篇閱讀寫作", color: "from-green-50 to-emerald-50", border: "border-green-200", tag: "進階挑戰" },
              { world: "冠軍峰", img: "/images/worlds/world-champion-peak.png", islands: [{name: "L11 Challenge Arena 挑戰場", img: "/images/islands/island-challenge.png"}, {name: "L12 Victory Summit 勝利峰", img: "/images/islands/island-victory.png"}], desc: "英檢模擬 + 總複習", color: "from-pink-50 to-rose-50", border: "border-pink-200", tag: "英檢衝刺" },
            ].map((w) => (
              <div key={w.world} className={`island-card bg-gradient-to-br ${w.color} ${w.border} border-2 rounded-3xl p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img src={w.img} alt={w.world} className="w-10 h-10 object-contain rounded-lg" />
                    <h3 className="font-black text-lg">{w.world}</h3>
                  </div>
                  <span className="text-xs bg-white/80 rounded-full px-3 py-1 font-medium text-gray-600">{w.tag}</span>
                </div>
                {w.islands.map((island) => (
                  <div key={island.name} className="text-sm py-1.5 flex items-center gap-2">
                    <img src={island.img} alt="" className="w-6 h-6 object-contain rounded" />
                    <span className="text-gray-700">{island.name}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reward System Section ─── */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            超有動力的 <span className="gradient-text">獎勵系統</span> 🏆
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">不只是學英文，更是一場冒險遊戲！</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: "/images/rewards/star.png", title: "星星 & 寶石", desc: "每答對就拿星星，累積寶石可以買裝備佈置小屋", color: "bg-yellow-100 border-yellow-200" },
              { img: "/images/pets/dragon/dragon-egg.png", title: "學習寵物", desc: "選一隻寵物蛋，學越多它就長越大，從蛋到究極進化！", color: "bg-green-100 border-green-200" },
              { img: "/images/badges/badge-l1.png", title: "島嶼徽章", desc: "完成每座島嶼收集專屬徽章，12 個全收集成為冠軍", color: "bg-purple-100 border-purple-200" },
              { img: "/images/certs/cert-graduate.png", title: "電子證書", desc: "每個里程碑產出精美證書，家長可下載分享到社群", color: "bg-pink-100 border-pink-200" },
            ].map((r) => (
              <div key={r.title} className={`island-card ${r.color} rounded-3xl p-6 text-center border`}>
                <img src={r.img} alt={r.title} className="w-32 h-32 mx-auto mb-3 object-contain" />
                <div className="font-black text-lg mb-2">{r.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Parent Section ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="/images/guide/vega-book.png" alt="Vega" className="w-20 h-20 md:w-28 md:h-28 object-contain animate-float" />
            <div>
              <h2 className="text-3xl md:text-4xl font-black">
                給爸爸媽媽 <span className="gradient-text">最安心</span>
              </h2>
              <p className="text-gray-500 text-lg mt-1">你不需要會英文，也不用坐在旁邊</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-8">
              <h3 className="font-black text-xl mb-4">✅ 你只需要</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3"><span>📱</span><span>幫小孩第一次登入</span></li>
                <li className="flex gap-3"><span>⏰</span><span>設定每天學習時間提醒</span></li>
                <li className="flex gap-3"><span>📊</span><span>每週看一次學習報告</span></li>
                <li className="flex gap-3"><span>👏</span><span>偶爾誇獎「你的寵物好大了！」</span></li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-black text-xl mb-4">❌ 你不需要</h3>
              <ul className="space-y-3 text-gray-500">
                <li className="flex gap-3"><span>🚫</span><span>坐在旁邊教（系統會教）</span></li>
                <li className="flex gap-3"><span>🚫</span><span>檢查作業（系統自動改）</span></li>
                <li className="flex gap-3"><span>🚫</span><span>解釋文法或發音（AI 處理）</span></li>
                <li className="flex gap-3"><span>🚫</span><span>選課或安排進度（自適應系統）</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 glass rounded-3xl p-8 text-center">
            <h3 className="font-black text-lg mb-4">📊 每週學習報告預覽</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-4">
                <div className="text-3xl font-black text-purple-600">5</div>
                <div className="text-xs text-gray-500">本週完成課數</div>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="text-3xl font-black text-green-600">87%</div>
                <div className="text-xs text-gray-500">正確率</div>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="text-3xl font-black text-blue-600">42</div>
                <div className="text-xs text-gray-500">新學單字</div>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="text-3xl font-black text-pink-600">🔥7</div>
                <div className="text-xs text-gray-500">連續天數</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto glass rounded-[2rem] p-12">
          <div className="flex justify-center gap-1 sm:gap-3 mb-6">
            <img src="/characters/finn/finn-happy.png" alt="Finn" className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain animate-float" />
            <img src="/characters/coco/coco-clap.png" alt="Coco" className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain animate-float-delay" />
            <img src="/characters/polly/polly-cheer.png" alt="Polly" className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain animate-float-delay2" />
            <img src="/characters/benny/benny-wave.png" alt="Benny" className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain animate-float" />
            <img src="/characters/ruby/ruby-star.png" alt="Ruby" className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain animate-float-delay" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            準備好開始冒險了嗎？ 🚀
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            完全免費・不用信用卡・隨時開始
          </p>
          <div className="relative inline-block">
            <button className="cta-btn px-12 py-5 text-xl animate-pulse-glow">
              🗺️ 開始英語冒險（即將上線）
            </button>
            <img src="/images/guide/vega-point.png" alt="Vega" className="absolute -right-20 -bottom-4 w-16 h-16 md:w-20 md:h-20 object-contain animate-float hidden sm:block" />
          </div>
          <p className="text-sm text-gray-400 mt-6">
            ❤️ 由智慧媽咪國際有限公司開發
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-200">
        <p>© 2026 Adventure English 冒險英語 | english.chparenting.com</p>
        <p className="mt-1">專為台灣兒童設計的免費英語學習平台</p>
      </footer>
    </main>
  );
}

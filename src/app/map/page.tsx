import type { Metadata } from "next";
import Link from "next/link";
import { COURSES, WORLDS, ISLAND_IMAGES, BADGE_IMAGES } from "@/data/courses";
import { WorldPlayButton, IslandPlayButton } from "@/components/VegaAudio";

export const metadata: Metadata = {
  title: "學習地圖 - 12 座島嶼冒險旅程",
  description: "Adventure English 冒險英語完整學習地圖。6 大世界、12 座島嶼、288 堂課，從 ABC 字母到英檢初級的完整學習路線。",
};

const WORLD_DETAILS = [
  {
    goal: "從零開始認識英文！學會 26 個字母和基礎發音規則。",
    vegaSays: "這是冒險的起點！不用擔心，Finn 會帶著你從 ABC 開始，一步一步學會每個字母的聲音。",
    skills: ["字母辨識", "字母發音", "CVC 拼讀", "短母音"],
    cefr: "Pre-A1",
  },
  {
    goal: "學會日常生活最常用的單字和簡單句型，能做基本問答。",
    vegaSays: "學完字母就來逛逛友善小鎮吧！在市場學顏色和食物，在學校學基本句型，開始說出完整的句子！",
    skills: ["生活單字 150+", "基本句型", "長母音", "KK 音標導入"],
    cefr: "Pre-A1 → A1",
  },
  {
    goal: "開始閱讀短篇故事，進行更流暢的英文對話。",
    vegaSays: "海洋灣有好多故事等你來讀！這個階段你會發現自己可以看懂英文短文，還能跟朋友用英文聊天了。",
    skills: ["短篇閱讀", "形容詞比較", "日常對話", "描述能力"],
    cefr: "A1",
  },
  {
    goal: "建立紮實的文法基礎，能用正確的句子結構表達。",
    vegaSays: "推開城堡大門，開始挑戰文法！學會現在式、疑問句、否定句，讓你的英文從「會說」變成「說對」。",
    skills: ["現在簡單式", "Wh- 問句", "助動詞", "介系詞"],
    cefr: "A1+",
  },
  {
    goal: "掌握時態變化，能讀長文、寫短文、進行多回合對話。",
    vegaSays: "探索大陸是進階挑戰！學會過去式和未來式，能夠寫日記、讀長篇文章，英文實力大躍進！",
    skills: ["過去式", "未來式", "長篇閱讀", "短文寫作"],
    cefr: "A2",
  },
  {
    goal: "總複習 + 英檢初級模擬，準備挑戰 GEPT 初級！",
    vegaSays: "最後衝刺！把之前學的全部整合起來，完成模擬測驗就能拿到畢業證書，證明你的英文實力！",
    skills: ["英檢模擬", "綜合練習", "弱點加強", "口說測驗"],
    cefr: "A2+",
  },
];

export default function MapPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Vega */}
        <div className="text-center mb-12 animate-slide-up">
          <img src="/images/guide/vega-book.webp" alt="Vega" className="w-24 h-24 mx-auto mb-4 object-contain animate-float" />
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            <span className="gradient-text">冒險地圖</span> 🗺️
          </h1>
          <p className="text-lg text-gray-500">6 大世界・12 座島嶼・288 堂課｜從零開始到英檢初級</p>
        </div>

        {/* Progress overview */}
        <div className="glass rounded-3xl p-6 mb-10 grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div><div className="text-2xl font-black text-purple-600">12</div><div className="text-xs text-gray-500">島嶼等級</div></div>
          <div><div className="text-2xl font-black text-green-600">288</div><div className="text-xs text-gray-500">堂課</div></div>
          <div><div className="text-2xl font-black text-blue-600">850+</div><div className="text-xs text-gray-500">單字量</div></div>
          <div><div className="text-2xl font-black text-pink-600">48</div><div className="text-xs text-gray-500">Review Quest</div></div>
          <div><div className="text-2xl font-black text-orange-600">5</div><div className="text-xs text-gray-500">學習夥伴</div></div>
          <div><div className="text-2xl font-black text-red-600">🎓</div><div className="text-xs text-gray-500">英檢初級</div></div>
        </div>

        {/* How it works */}
        <div className="glass rounded-3xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <img src="/images/guide/vega-point.webp" alt="Vega" className="w-16 h-16 object-contain flex-shrink-0 hidden md:block" />
            <div>
              <h3 className="font-black text-lg mb-2">怎麼看這張地圖？</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-lg">1️⃣</span>
                  <span>從<strong>彩虹谷</strong>開始，由上往下依序挑戰每個世界</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">2️⃣</span>
                  <span>每個世界有 <strong>2 座島嶼</strong>，完成兩座解鎖下一個世界</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">3️⃣</span>
                  <span>點擊島嶼卡片查看<strong>詳細課程</strong>，準備好就開始冒險！</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Worlds */}
        {WORLDS.map((world, wi) => {
          const worldCourses = COURSES.filter(c => world.levels.includes(c.level));
          const detail = WORLD_DETAILS[wi];
          return (
            <div key={world.name} className="mb-12">
              {/* World header */}
              <div className={`bg-gradient-to-r ${world.color} rounded-2xl p-5 mb-2`}>
                <div className="flex items-center gap-4">
                  <img
                    src={world.image}
                    alt={world.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-white/60 rounded-full px-2 py-0.5 font-medium text-gray-600">World {wi + 1}</span>
                      <span className="text-xs bg-purple-100 rounded-full px-2 py-0.5 font-medium text-purple-700">{detail.cefr}</span>
                      {wi === 0 && <span className="bg-green-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">START HERE</span>}
                    </div>
                    <h2 className="text-xl font-black">{world.name} <span className="text-gray-400 font-medium text-base">{world.nameEn}</span></h2>
                    <p className="text-sm text-gray-600 mt-1">{detail.goal}</p>
                  </div>
                  <WorldPlayButton worldIndex={wi} className="w-10 h-10 flex-shrink-0" />
                </div>
              </div>

              {/* Vega says + skills */}
              <div className="bg-white/60 rounded-xl p-4 mb-4 ml-4 md:ml-8 border border-gray-100">
                <div className="flex items-start gap-3">
                  <img src="/images/guide/vega-point.webp" alt="Vega" className="w-28 h-28 object-contain flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 italic mb-2">&ldquo;{detail.vegaSays}&rdquo;</p>
                    <div className="flex flex-wrap gap-2">
                      {detail.skills.map(s => (
                        <span key={s} className="text-xs bg-purple-50 text-purple-700 rounded-full px-3 py-1 font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Islands in this world */}
              <div className="grid md:grid-cols-2 gap-4 ml-4 md:ml-8">
                {worldCourses.map(course => (
                  <Link key={course.slug} href={`/courses/${course.slug}`} className="no-underline">
                    <div className={`island-card bg-gradient-to-br ${course.bgGradient} ${course.borderColor} border-2 rounded-2xl p-5 relative overflow-hidden`}>
                      <IslandPlayButton level={course.level} className="absolute top-3 right-3 w-8 h-8 z-10" />
                      <div className="flex items-start gap-4">
                        <img
                          src={ISLAND_IMAGES[course.level]}
                          alt={course.island}
                          className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-lg">L{course.level} {course.island}</span>
                            <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-gray-600">{course.tag}</span>
                          </div>
                          <div className="text-sm text-gray-500 mb-1">{course.islandEn}</div>
                          <p className="text-sm text-gray-600 mb-2">{course.description}</p>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {course.topics.slice(0, 4).map(t => (
                              <span key={t} className="text-xs bg-white/70 rounded px-2 py-0.5 text-gray-500">{t}</span>
                            ))}
                          </div>

                          {/* Sample words */}
                          <div className="text-xs text-gray-400 mb-2">
                            例：{course.sampleWords.slice(0, 4).join(', ')}...
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                            <span>📚 {course.lessons} 課</span>
                            <span>💬 {course.vocabulary} 單字</span>
                            {course.phonics && <span>🔤 {course.phonics.split('(')[0].trim()}</span>}
                            {course.grammar && <span>📖 {course.grammar.split('+')[0].trim()}</span>}
                          </div>
                        </div>
                      </div>
                      {/* Badge preview */}
                      <img
                        src={BADGE_IMAGES[course.level]}
                        alt={`L${course.level} 徽章`}
                        className="absolute -bottom-2 -right-2 w-14 h-14 md:w-16 md:h-16 opacity-20 object-contain"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Path between worlds */}
              {wi < WORLDS.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-0.5 h-4 bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-0.5 h-4 bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                    <div className="w-0.5 h-4 bg-gray-300"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Final CTA */}
        <div className="text-center glass rounded-3xl p-10 mt-8 relative overflow-hidden">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="/images/guide/vega-book.webp" alt="Vega" className="w-24 h-24 object-contain animate-float" />
            <img src="/images/badges/badge-l12.webp" alt="冠軍徽章" className="w-20 h-20 object-contain" />
          </div>
          <h3 className="text-2xl font-black mb-2">完成 12 座島嶼 = 英檢初級程度！</h3>
          <p className="text-gray-500 mb-4">從 ABC 到英檢初級，約 850+ 單字、288 堂課</p>
          <p className="text-sm text-gray-400 mb-6">每天 15-20 分鐘，預估 6-12 個月完成全部課程</p>
          <a href="/courses/l1-letter-island/mission/1" className="cta-btn px-10 py-4 text-lg no-underline inline-block">🎮 免費試玩第一課</a>
        </div>
      </div>
    </main>
  );
}

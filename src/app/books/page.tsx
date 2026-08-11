import type { Metadata } from "next";
import Link from "next/link";
import { BOOKS } from "@/data/blog-posts";
import PageIntro from "@/components/PageIntro";
import AutoAds from "@/components/AutoAds";

export const metadata: Metadata = {
  title: "推薦書單 - 兒童英文繪本與學習書籍推薦",
  description: "精選兒童英文繪本、橋樑書、章節書推薦，按年齡分類。附 Amazon 和博客來購買連結，搭配 Adventure English 學習效果加倍。",
};

// 四個階段：icon 對應 BOOKS 的 category 順序，副標講的是「這個階段在練什麼」
const STAGES = [
  { icon: '/images/books/stage-sprout.webp', en: 'Reading Sprouts', zh: '閱讀小芽', note: '從畫面、聲音與重複句型開始，培養閱讀的興趣與語感', tint: 'from-lime-50 to-green-50 border-green-300' },
  { icon: '/images/books/stage-plant.webp', en: 'Reading Explorers', zh: '閱讀探險家', note: '短句到橋樑書，開始建立故事理解與閱讀習慣', tint: 'from-amber-50 to-orange-50 border-amber-300' },
  { icon: '/images/books/stage-tree.webp', en: 'Reading Adventurers', zh: '閱讀冒險者', note: '長篇章節書，培養閱讀理解與思考能力', tint: 'from-sky-50 to-blue-50 border-sky-300' },
  { icon: '/images/books/stage-star.webp', en: 'Parent Reading Corner', zh: '家長工具書', note: '陪伴孩子閱讀，也幫助家長更有方法與方向', tint: 'from-violet-50 to-fuchsia-50 border-violet-300' },
];

const FLOW = [
  { icon: '📖', t: '選擇適合的\n英文繪本' },
  { icon: '🗺️', t: '對應 Adventure\n學習等級' },
  { icon: '🎯', t: '練習單字、句型\n理解故事內容' },
  { icon: '🏆', t: '完成閱讀任務\n累積成就徽章' },
];

export default function BooksPage() {
  return (
    <main className="min-h-screen">
      <AutoAds />
      <PageIntro page="books" />

      {/* ===== 主視覺：閱讀花園 ===== */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 2', maxHeight: '440px' }}>
        <img src="/images/books/hero-garden.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute left-1/2 -translate-x-1/2 top-[5%] w-[88%] max-w-[600px] text-center">
          <div className="rounded-2xl border-4 border-amber-900/70 shadow-xl px-4 py-3"
            style={{ background: 'linear-gradient(#e6c08a,#c99a5c)' }}>
            <p className="m-0 text-amber-900/80 font-black tracking-[0.18em] text-[10px] sm:text-xs">ADVENTURE BOOK GARDEN</p>
            <h1 className="m-0 font-black text-amber-950 text-xl sm:text-3xl leading-tight">英文冒險閱讀花園</h1>
          </div>
          <p className="inline-block mt-2 rounded-full px-4 py-1.5 font-black text-white text-[11px] sm:text-sm shadow-lg"
            style={{ background: 'linear-gradient(#8b5cf6,#6d28d9)', textShadow: '0 1px 2px rgba(50,20,90,.6)' }}>
            找到孩子現在讀得懂，又願意一直讀下去的英文書
          </p>
        </div>

        <img src="/characters/finn/finn-read.png" alt="" className="absolute left-[2%] bottom-0 w-[20%] max-w-[150px]" />
        <img src="/characters/coco/coco-read.png" alt="" className="absolute right-[6%] bottom-0 w-[16%] max-w-[120px]" />
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">

        {/* ===== 四階段導覽 ===== */}
        <section className="-mt-6 relative bg-amber-50/95 backdrop-blur rounded-3xl border-4 border-amber-200 shadow-xl p-3 sm:p-4 flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center justify-between gap-1">
            {STAGES.map((s, i) => (
              <div key={s.en} className="flex items-center gap-1 min-w-0">
                <div className="text-center min-w-0">
                  <img src={s.icon} alt="" className="w-9 sm:w-12 mx-auto object-contain" />
                  <p className="m-0 font-black text-amber-900 text-[10px] sm:text-xs leading-tight whitespace-nowrap">
                    {BOOKS[i].category.replace(/歲.*/, '歲')}
                  </p>
                  <p className="m-0 font-bold text-amber-700/80 text-[9px] sm:text-[11px] leading-tight">{s.zh}</p>
                </div>
                {i < STAGES.length - 1 && <span className="text-amber-400 font-black text-sm sm:text-lg px-0.5">→</span>}
              </div>
            ))}
          </div>
          {/* 選書小提醒：書單頁最容易被誤用的地方就是家長挑太難的書 */}
          <div className="lg:w-56 shrink-0 bg-rose-50 rounded-2xl border-2 border-rose-200 px-3 py-2">
            <p className="m-0 font-black text-rose-700 text-xs">❤️ 選書小提醒</p>
            <p className="m-0 text-rose-800/80 font-bold text-[10px] sm:text-[11px] leading-snug mt-0.5">
              依年齡與程度挑選，讓孩子在閱讀中建立自信與成就感！
            </p>
          </div>
        </section>

        {/* ===== 四個書單區 ===== */}
        {BOOKS.map((group, gi) => {
          const st = STAGES[gi] ?? STAGES[STAGES.length - 1];
          return (
            <section key={group.category} className={`mt-8 rounded-3xl border-4 bg-gradient-to-br ${st.tint} p-3 sm:p-5 shadow-lg`}>
              <div className="flex items-center gap-2 mb-1">
                <img src={st.icon} alt="" className="w-8 sm:w-10 object-contain shrink-0" />
                <div className="min-w-0">
                  <h2 className="m-0 font-black text-gray-800 text-base sm:text-xl leading-tight">
                    {group.category}<span className="text-gray-400 font-bold text-xs sm:text-base"> ｜ {st.en} {st.zh}</span>
                  </h2>
                  <p className="m-0 text-gray-500 font-bold text-[10px] sm:text-xs">{st.note}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
                {group.items.map(book => (
                  <article key={book.title} className="bg-white rounded-2xl border-2 border-white shadow-md p-3 flex flex-col">
                    <div className="flex items-start gap-2">
                      <span className="text-3xl sm:text-4xl leading-none shrink-0">{book.image}</span>
                      <span className="ml-auto shrink-0 bg-green-100 text-green-700 font-black text-[9px] rounded-md px-1.5 py-0.5 leading-tight text-center">
                        適齡<br />{book.age}
                      </span>
                    </div>
                    <h3 className="font-black text-gray-900 text-[13px] sm:text-sm leading-snug mt-2 mb-1">{book.title}</h3>
                    <p className="m-0 text-gray-500 text-[10px] sm:text-[11px] leading-snug">{book.description}</p>
                    {'match' in book && (book as { match?: string }).match && (
                      <p className="m-0 mt-2 text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 self-start">
                        🎯 搭配 {(book as { match?: string }).match}
                      </p>
                    )}
                    <div className="flex gap-1.5 mt-auto pt-2.5">
                      {book.amazon && (
                        <a href={book.amazon} target="_blank" rel="noopener noreferrer"
                          className="no-underline bg-orange-500 text-white font-black text-[10px] rounded-md px-2 py-1 hover:bg-orange-600 transition">🛒 Amazon</a>
                      )}
                      {book.books && (
                        <a href={book.books} target="_blank" rel="noopener noreferrer"
                          className="no-underline bg-emerald-600 text-white font-black text-[10px] rounded-md px-2 py-1 hover:bg-emerald-700 transition">📚 博客來</a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {/* ===== 怎麼跟課程搭 ===== */}
        <section className="mt-8 rounded-3xl border-4 border-amber-300 bg-amber-50 shadow-lg p-4 sm:p-6">
          <h2 className="text-center font-black text-purple-800 text-base sm:text-xl m-0">Adventure English × 延伸閱讀</h2>
          <p className="text-center text-gray-500 font-bold text-[11px] sm:text-xs mt-1 mb-4">一本好書，讓孩子的英文冒險更精彩！</p>
          <div className="grid grid-cols-4 gap-1 sm:gap-3">
            {FLOW.map((f, i) => (
              <div key={f.t} className="relative text-center">
                <div className="text-2xl sm:text-4xl">{f.icon}</div>
                <p className="m-0 font-black text-gray-700 text-[9px] sm:text-xs leading-tight whitespace-pre-line mt-1">{f.t}</p>
                {i < FLOW.length - 1 && (
                  <span className="hidden sm:block absolute -right-1.5 top-3 text-amber-400 font-black">→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===== 導回冒險地圖 ===== */}
        <section className="mt-8 relative rounded-3xl overflow-hidden border-4 border-sky-200 shadow-lg">
          <img src="/images/maps/bg-sky-castles.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sky-900/30" />
          <div className="relative px-4 py-7 text-center">
            <h2 className="font-black text-white text-lg sm:text-2xl m-0" style={{ textShadow: '0 2px 6px rgba(0,0,0,.5)' }}>
              讀完故事，繼續你的英文冒險！
            </h2>
            <p className="text-white/95 font-bold text-xs sm:text-sm mt-2 mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,.55)' }}>
              在 Adventure English 練習單字、句型與閱讀理解，<br className="sm:hidden" />讓孩子的英文能力一步一步升級！
            </p>
            <Link href="/adventure-map"
              className="inline-block no-underline bg-gradient-to-b from-purple-500 to-purple-700 text-white font-black rounded-full px-7 py-2.5 shadow-lg border-2 border-white/80 text-sm">
              📖 查看我的冒險地圖 →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

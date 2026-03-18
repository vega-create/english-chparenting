import type { Metadata } from "next";
import { BOOKS } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "推薦書單 - 兒童英文繪本與學習書籍推薦",
  description: "精選兒童英文繪本、橋樑書、章節書推薦，按年齡分類。附 Amazon 和博客來購買連結，搭配 Adventure English 學習效果加倍。",
};

export default function BooksPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            <span className="gradient-text">推薦書單</span> 📕
          </h1>
          <p className="text-lg text-gray-500">精選兒童英文繪本、橋樑書、章節書｜按年齡分類</p>
        </div>

        <div className="glass rounded-2xl p-5 mb-10 text-sm text-gray-600 text-center">
          💡 <strong>搭配 Adventure English 使用效果最佳：</strong>在平台上學完基礎後，用繪本延伸閱讀。例如學完 L3 動物主題後，讀 Brown Bear 特別有成就感！
        </div>

        {BOOKS.map(group => (
          <section key={group.category} className="mb-12">
            <h2 className="text-2xl font-black mb-6">{group.category}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {group.items.map(book => (
                <div key={book.title} className="island-card glass rounded-2xl p-5">
                  <div className="flex gap-4">
                    <div className="text-5xl flex-shrink-0">{book.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1 leading-snug">{book.title}</h3>
                      <div className="text-xs text-gray-500 mb-2">
                        ✍️ {book.author} | 👶 適合 {book.age} 歲
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{book.description}</p>
                      <div className="flex gap-2">
                        {book.amazon && (
                          <a href={book.amazon} target="_blank" rel="noopener noreferrer" className="text-xs bg-orange-100 text-orange-700 rounded-full px-3 py-1 no-underline hover:bg-orange-200 transition-colors font-medium">
                            🛒 Amazon
                          </a>
                        )}
                        {book.books && (
                          <a href={book.books} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 no-underline hover:bg-blue-200 transition-colors font-medium">
                            📚 博客來
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Affiliate disclosure */}
        <div className="glass rounded-2xl p-6 text-center text-sm text-gray-500 mb-8">
          <p>📌 <strong>聯盟行銷聲明：</strong>本頁部分連結為聯盟行銷連結（Amazon Associates / 博客來策略合作），透過連結購買不會增加您的費用，但能幫助我們持續提供免費學習資源。感謝您的支持！❤️</p>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
          <h3 className="text-xl font-black mb-2">📖 看完書想練英文？</h3>
          <p className="text-gray-500 text-sm mb-4">Adventure English 冒險英語有完整的閱讀理解練習，搭配繪本效果加倍！</p>
          <a href="/courses" className="cta-btn px-8 py-3 text-base inline-block no-underline">看看課程介紹 →</a>
        </div>
      </div>
    </main>
  );
}

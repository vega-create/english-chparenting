import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "英文學習文章 - 兒童英語學習技巧、書單、考試攻略",
  description: "精選兒童英語學習文章：Phonics 自然發音教學、口說練習方法、英文繪本推薦、全民英檢初級攻略、親子英文教養指南。",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            <span className="gradient-text">學習文章</span> ✏️
          </h1>
          <p className="text-lg text-gray-500">兒童英語學習技巧、推薦書單、考試攻略</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {BLOG_CATEGORIES.map(cat => (
            <span key={cat.slug} className="glass rounded-full px-4 py-2 text-sm">
              {cat.emoji} {cat.name}
            </span>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {BLOG_POSTS.map(post => {
            const cat = BLOG_CATEGORIES.find(c => c.slug === post.category);
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline block">
                <article className="island-card glass rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span className="bg-purple-50 text-purple-700 rounded-full px-3 py-0.5 text-xs font-medium">{cat?.emoji} {cat?.name}</span>
                    <span>{post.date}</span>
                    <span>⏱ {post.readTime} 分鐘</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-snug">{post.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Related sites */}
        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <h3 className="font-black text-xl mb-3">📚 更多學習資源</h3>
          <p className="text-gray-500 text-sm mb-4">我們還有其他網站提供不同面向的育兒和學習資源</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://chparenting.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">
              🏠 親子成長日記
            </a>
            <a href="https://learn.chparenting.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">
              📖 線上學習平台
            </a>
            <a href="https://mommywisdom.tw" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">
              👩‍👧 媽咪智慧王
            </a>
            <a href="https://mommystartup.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">
              💼 媽咪創業日記
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

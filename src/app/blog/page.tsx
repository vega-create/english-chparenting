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

        {/* Featured first article */}
        {BLOG_POSTS.length > 0 && (() => {
          const post = BLOG_POSTS[0];
          const cat = BLOG_CATEGORIES.find(c => c.slug === post.category);
          return (
            <Link href={`/blog/${post.slug}`} className="no-underline block mb-10">
              <article className="island-card rounded-3xl overflow-hidden shadow-lg">
                {/* Cover */}
                <div className={`bg-gradient-to-br ${post.cover.gradient} p-10 md:p-14 text-center text-white relative`}>
                  <div className="text-6xl md:text-8xl mb-4 opacity-90">{post.cover.emoji}</div>
                  <div className="text-sm md:text-base font-medium opacity-80">{post.cover.subtitle}</div>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">✨ 精選文章</div>
                </div>
                <div className="bg-white p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span className="bg-purple-50 text-purple-700 rounded-full px-3 py-0.5 text-xs font-medium">{cat?.emoji} {cat?.name}</span>
                    <span>{post.date}</span>
                    <span>⏱ {post.readTime} 分鐘</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-snug">{post.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
                </div>
              </article>
            </Link>
          );
        })()}

        {/* Rest of articles with cover */}
        <div className="grid md:grid-cols-2 gap-6">
          {BLOG_POSTS.slice(1).map(post => {
            const cat = BLOG_CATEGORIES.find(c => c.slug === post.category);
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline block">
                <article className="island-card rounded-2xl overflow-hidden shadow-md h-full bg-white">
                  {/* Cover */}
                  <div className={`bg-gradient-to-br ${post.cover.gradient} p-8 text-center text-white`}>
                    <div className="text-5xl mb-2 opacity-90">{post.cover.emoji}</div>
                    <div className="text-xs font-medium opacity-80">{post.cover.subtitle}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                      <span className="bg-purple-50 text-purple-700 rounded-full px-2 py-0.5 font-medium">{cat?.emoji} {cat?.name}</span>
                      <span>{post.date}</span>
                      <span>⏱ {post.readTime} 分</span>
                    </div>
                    <h2 className="font-black text-base text-gray-900 mb-2 leading-snug">{post.title}</h2>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{post.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Article TOC / Index */}
        <div className="mt-16 glass rounded-2xl p-8">
          <h3 className="font-black text-xl mb-4">📋 文章目錄</h3>
          <div className="space-y-3">
            {BLOG_CATEGORIES.map(cat => {
              const posts = BLOG_POSTS.filter(p => p.category === cat.slug);
              if (posts.length === 0) return null;
              return (
                <div key={cat.slug}>
                  <h4 className="font-bold text-sm text-gray-700 mb-1">{cat.emoji} {cat.name}</h4>
                  <ul className="space-y-1 ml-6">
                    {posts.map(p => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="text-sm text-purple-600 hover:text-purple-800 no-underline">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related sites */}
        <div className="mt-8 glass rounded-2xl p-8 text-center">
          <h3 className="font-black text-xl mb-3">📚 更多學習資源</h3>
          <p className="text-gray-500 text-sm mb-4">我們還有其他網站提供不同面向的育兒和學習資源</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://chparenting.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">🏠 媽媽生活復原力 Lab</a>
            <a href="https://learn.chparenting.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">📖 親子多元學習</a>
            <a href="https://mommywisdom.tw" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">👩‍👧 跟著媽咪團好康</a>
            <a href="https://mommystartup.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">💼 亞洲媽媽創業</a>
            <a href="https://aimommywisdom.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">🌐 官網</a>
            <a href="https://vega-note.com" target="_blank" rel="noopener" className="glass rounded-full px-5 py-2 text-sm font-medium hover:bg-purple-50 no-underline text-gray-700">📝 學習筆記</a>
          </div>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) return { title: "文章未找到" };
  const ogUrl = `https://english.chparenting.com/og/${post.slug}.svg`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://english.chparenting.com/blog/${post.slug}`,
      siteName: "Adventure English 冒險英語",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl],
    },
  };
}

/* Extract headings for TOC */
function extractTOC(md: string) {
  const headings: { level: number; text: string; id: string }[] = [];
  md.split("\n").forEach(line => {
    const m2 = line.match(/^## (.+)$/);
    const m3 = line.match(/^### (.+)$/);
    if (m3) {
      const text = m3[1];
      const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
      headings.push({ level: 3, text, id });
    } else if (m2) {
      const text = m2[1];
      const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
      headings.push({ level: 2, text, id });
    }
  });
  return headings;
}

/* Simple markdown renderer */
function renderMarkdown(md: string) {
  return md
    .split("\n\n")
    .map((block, i) => {
      if (block.startsWith("### ")) {
        const text = block.slice(4);
        const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
        return <h3 key={i} id={id} className="text-lg font-black mt-8 mb-3 scroll-mt-20">{text}</h3>;
      }
      if (block.startsWith("## ")) {
        const text = block.slice(3);
        const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
        return <h2 key={i} id={id} className="text-xl font-black mt-10 mb-4 scroll-mt-20">{text}</h2>;
      }

      // Table
      if (block.includes("|") && block.includes("---")) {
        const lines = block.split("\n").filter(l => l.trim() && !l.match(/^\|[\s-|]+\|$/));
        const headers = lines[0]?.split("|").filter(Boolean).map(h => h.trim());
        const rows = lines.slice(1).map(r => r.split("|").filter(Boolean).map(c => c.trim()));
        return (
          <div key={i} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>{headers?.map((h, j) => <th key={j} className="text-left py-2 px-3 bg-purple-50 border border-gray-200 font-bold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="py-2 px-3 border border-gray-200">{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      // Lists
      if (block.match(/^- /m)) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc pl-6 space-y-1 text-gray-700 text-sm my-3">
            {items.map((item, j) => <li key={j}>{formatInline(item.slice(2))}</li>)}
          </ul>
        );
      }
      if (block.match(/^\d+\. /m)) {
        const items = block.split("\n").filter(l => l.match(/^\d+\. /));
        return (
          <ol key={i} className="list-decimal pl-6 space-y-1 text-gray-700 text-sm my-3">
            {items.map((item, j) => <li key={j}>{formatInline(item.replace(/^\d+\. /, ""))}</li>)}
          </ol>
        );
      }

      // Blockquote
      if (block.startsWith("> ")) {
        return <blockquote key={i} className="border-l-4 border-purple-300 pl-4 py-2 my-4 bg-purple-50 rounded-r-xl text-sm text-purple-800 italic">{formatInline(block.slice(2))}</blockquote>;
      }

      // Paragraph
      return <p key={i} className="text-gray-700 text-sm leading-relaxed my-3">{formatInline(block)}</p>;
    });
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) return <div className="min-h-screen flex items-center justify-center">文章未找到</div>;

  const cat = BLOG_CATEGORIES.find(c => c.slug === post.category);
  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const toc = extractTOC(post.content);

  return (
    <main className="min-h-screen py-12 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/blog" className="hover:text-purple-600 no-underline">學習文章</Link>
          <span>›</span>
          <span className="text-gray-600">{cat?.name}</span>
        </div>

        {/* Cover Image */}
        <div className={`bg-gradient-to-br ${post.cover.gradient} rounded-3xl p-10 md:p-16 text-center text-white mb-8 animate-slide-up relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-8xl rotate-12">🔤</div>
            <div className="absolute bottom-4 right-8 text-8xl -rotate-12">📚</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">✨</div>
          </div>
          <div className="relative z-10">
            <div className="text-7xl md:text-9xl mb-4">{post.cover.emoji}</div>
            <div className="text-lg md:text-xl font-bold opacity-90">{post.cover.subtitle}</div>
            <div className="text-sm opacity-70 mt-2">english.chparenting.com</div>
          </div>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
            <span className="bg-purple-50 text-purple-700 rounded-full px-3 py-0.5 text-xs font-medium">{cat?.emoji} {cat?.name}</span>
            <span>{post.date}</span>
            <span>⏱ 閱讀 {post.readTime} 分鐘</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-snug mb-4">{post.title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed">{post.description}</p>
          <div className="flex flex-wrap gap-1 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        {toc.length > 2 && (
          <nav className="glass rounded-2xl p-5 mb-8">
            <h3 className="font-black text-base mb-3">📋 文章目錄</h3>
            <ul className="space-y-1.5">
              {toc.map((h, i) => (
                <li key={i} className={h.level === 3 ? "ml-5" : ""}>
                  <a href={`#${h.id}`} className="text-sm text-purple-600 hover:text-purple-800 no-underline hover:underline">
                    {h.level === 2 ? "📌 " : "· "}{h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body */}
        <div className="glass rounded-3xl p-6 md:p-10 mb-8">
          {renderMarkdown(post.content)}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border border-purple-100">
          <div className="text-3xl mb-3">🦊🐱🦜🐻🐰</div>
          <h3 className="text-xl font-black mb-2">想讓孩子免費學英文？</h3>
          <p className="text-gray-500 text-sm mb-4">Adventure English 冒險英語：288 堂課、AI 互動口說、遊戲化學習，完全免費！</p>
          <Link href="/" className="cta-btn px-8 py-3 text-base inline-block no-underline">🚀 了解更多</Link>
        </div>

        {/* Author */}
        <div className="glass rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="text-4xl">👩‍💻</div>
          <div>
            <div className="font-bold">薇佳媽媽</div>
            <div className="text-xs text-gray-500">智慧媽咪國際有限公司 | 兩寶媽、英語教育推廣者</div>
            <div className="text-xs text-gray-400 mt-1">
              也在 <a href="https://chparenting.com" className="text-purple-600 underline">親子成長日記</a> 和 <a href="https://mommystartup.com" className="text-purple-600 underline">媽咪創業日記</a> 分享育兒日常
            </div>
          </div>
        </div>

        {/* Related posts with covers */}
        <section>
          <h3 className="text-xl font-black mb-4">📚 延伸閱讀</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedPosts.map(rp => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="no-underline">
                <div className="island-card rounded-2xl overflow-hidden shadow-md h-full bg-white">
                  <div className={`bg-gradient-to-br ${rp.cover.gradient} p-5 text-center text-white`}>
                    <div className="text-3xl">{rp.cover.emoji}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-500 mb-1">{rp.date}</div>
                    <h4 className="font-bold text-xs text-gray-900 leading-snug">{rp.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

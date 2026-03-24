import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return { title: "文章未找到" };
  const ogUrl = `https://english.chparenting.com/og/${post.slug}.svg`;
  const canonicalUrl = `https://english.chparenting.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      siteName: "Adventure English 冒險英語",
      locale: "zh_TW",
      publishedTime: post.date,
      authors: ["薇佳媽媽"],
      tags: post.tags,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl],
    },
    robots: {
      index: true,
      follow: true,
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

/* Markdown renderer — outputs clean HTML, styled by .article-content CSS */
function renderMarkdown(md: string) {
  return md
    .split("\n\n")
    .map((block, i) => {
      // H4
      if (block.startsWith("#### ")) {
        const text = block.slice(5);
        const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
        return <h4 key={i} id={id} className="scroll-mt-20">{text}</h4>;
      }
      // H3
      if (block.startsWith("### ")) {
        const text = block.slice(4);
        const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
        return <h3 key={i} id={id} className="scroll-mt-20">{text}</h3>;
      }
      // H2
      if (block.startsWith("## ")) {
        const text = block.slice(3);
        const id = text.replace(/[^\w\u4e00-\u9fff]+/g, "-").toLowerCase();
        return <h2 key={i} id={id} className="scroll-mt-20">{text}</h2>;
      }

      // Table
      if (block.includes("|") && block.includes("---")) {
        const lines = block.split("\n").filter(l => l.trim() && !l.match(/^\|[\s-|]+\|$/));
        const headers = lines[0]?.split("|").filter(Boolean).map(h => h.trim());
        const rows = lines.slice(1).map(r => r.split("|").filter(Boolean).map(c => c.trim()));
        return (
          <table key={i}>
            <thead>
              <tr>{headers?.map((h, j) => <th key={j}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{formatInline(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      }

      // Unordered list
      if (block.match(/^- /m)) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i}>
            {items.map((item, j) => <li key={j}>{formatInline(item.slice(2))}</li>)}
          </ul>
        );
      }
      // Ordered list
      if (block.match(/^\d+\. /m)) {
        const items = block.split("\n").filter(l => l.match(/^\d+\. /));
        return (
          <ol key={i}>
            {items.map((item, j) => <li key={j}>{formatInline(item.replace(/^\d+\. /, ""))}</li>)}
          </ol>
        );
      }

      // Blockquote (supports multi-line)
      if (block.startsWith("> ")) {
        const content = block.split("\n").map(l => l.replace(/^>\s?/, "")).join("\n");
        return <blockquote key={i}><p>{formatInline(content)}</p></blockquote>;
      }

      // Horizontal rule
      if (block.trim() === "---" || block.trim() === "***") {
        return <hr key={i} />;
      }

      // Paragraph
      return <p key={i}>{formatInline(block)}</p>;
    });
}

/* Extract FAQ pairs for schema */
function extractFAQ(md: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = md.split("\n");
  let inFaq = false;
  let currentQ = "";
  let currentA: string[] = [];

  for (const line of lines) {
    if (line.match(/^## .*FAQ/i) || line.match(/^## 常見問題/)) {
      inFaq = true;
      continue;
    }
    if (inFaq && line.startsWith("## ")) break; // next H2 = end of FAQ

    if (inFaq && line.startsWith("### ")) {
      if (currentQ && currentA.length > 0) {
        faqs.push({ question: currentQ, answer: currentA.join(" ").replace(/\*\*/g, "").trim() });
      }
      currentQ = line.slice(4).trim();
      currentA = [];
    } else if (inFaq && currentQ && line.trim()) {
      currentA.push(line.trim());
    }
  }
  if (currentQ && currentA.length > 0) {
    faqs.push({ question: currentQ, answer: currentA.join(" ").replace(/\*\*/g, "").trim() });
  }
  return faqs;
}

function formatInline(text: string): React.ReactNode[] {
  // Split on bold, italic, links, and inline code
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return tokens.map((part, i) => {
    // Bold
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Italic
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    // Link [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, href] = linkMatch;
      const isExternal = href.startsWith("http");
      return isExternal
        ? <a key={i} href={href} target="_blank" rel="noopener noreferrer">{linkText}</a>
        : <Link key={i} href={href}>{linkText}</Link>;
    }
    // Inline code
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return <div className="min-h-screen flex items-center justify-center">文章未找到</div>;

  const cat = BLOG_CATEGORIES.find(c => c.slug === post.category);
  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const toc = extractTOC(post.content);

  const wordCount = post.content.length;
  const dateStr = new Date(post.date).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
  const faqs = extractFAQ(post.content);
  const canonicalUrl = `https://english.chparenting.com/blog/${post.slug}`;

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://english.chparenting.com/og/${post.slug}.svg`,
    datePublished: `${post.date}T00:00:00+08:00`,
    dateModified: `${post.date}T00:00:00+08:00`,
    author: { "@type": "Person", name: "薇佳媽媽", url: "https://aimommywisdom.com" },
    publisher: { "@type": "Organization", name: "智慧媽咪國際有限公司", url: "https://aimommywisdom.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    wordCount,
    articleSection: cat?.name,
    keywords: post.tags.join(", "),
  };

  // FAQ schema
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: "https://english.chparenting.com" },
      { "@type": "ListItem", position: 2, name: "學習文章", item: "https://english.chparenting.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen py-12 px-4">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

        {/* Article Header — blog_content style */}
        <div className="article-content rounded-t-2xl rounded-b-none mb-0 pb-6" style={{ borderBottom: "2px solid #E8E5FA" }}>
          {/* Category badge */}
          {cat && (
            <span className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #6C5CE7, #5A4BD1)" }}>
              {cat.emoji} {cat.name}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mt-2" style={{ color: "#2a2a2a", margin: "8px 0 0" }}>
            {post.title}
          </h1>

          {/* Description */}
          <p className="mt-3 text-base" style={{ color: "#6a6a6a" }}>
            {post.description}
          </p>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm" style={{ color: "#999" }}>
            <span>{dateStr}</span>
            <span>·</span>
            <span>約 {wordCount} 字</span>
            <span>·</span>
            <span>⏱ 閱讀 {post.readTime} 分鐘</span>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: "#E8E5FA", color: "#5A4BD1" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        {toc.length > 2 && (
          <nav className="article-content rounded-none border-b-0 mb-0 pt-4 pb-6" style={{ borderBottom: "1px solid #f0ece8" }}>
            <h3 className="font-bold text-base mb-3" style={{ color: "#2a2a2a", margin: 0, border: "none", padding: 0 }}>📋 文章目錄</h3>
            <ul className="space-y-1.5 mt-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {toc.map((h, i) => (
                <li key={i} style={{ marginLeft: h.level === 3 ? "20px" : 0, marginBottom: "4px" }}>
                  <a href={`#${h.id}`} style={{ color: "#5A4BD1", borderBottom: "1px solid #E8E5FA", textDecoration: "none", fontSize: "14px" }}>
                    {h.level === 2 ? "📌 " : "· "}{h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body — blog_content / Vibe SEO Writer style */}
        <div className="article-content rounded-t-none rounded-b-2xl mb-8">
          {renderMarkdown(post.content)}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border border-purple-100">
          <div className="flex justify-center gap-2 mb-3">
            <img src="/characters/finn/finn-happy.png" alt="Finn" className="w-10 h-10 object-contain" />
            <img src="/characters/coco/coco-clap.png" alt="Coco" className="w-10 h-10 object-contain" />
            <img src="/characters/polly/polly-cheer.png" alt="Polly" className="w-10 h-10 object-contain" />
            <img src="/characters/benny/benny-wave.png" alt="Benny" className="w-10 h-10 object-contain" />
            <img src="/characters/ruby/ruby-star.png" alt="Ruby" className="w-10 h-10 object-contain" />
          </div>
          <h3 className="text-xl font-black mb-2">想讓孩子免費學英文？</h3>
          <p className="text-gray-500 text-sm mb-4">Adventure English 冒險英語：288 堂課、AI 互動口說、遊戲化學習，完全免費！</p>
          <Link href="/" className="cta-btn px-8 py-3 text-base inline-block no-underline">🚀 了解更多</Link>
        </div>

        {/* Author — blog_content style author card */}
        <div className="article-content rounded-2xl mb-8 flex items-center gap-4" style={{ padding: "24px 30px" }}>
          <div className="text-4xl">👩‍💻</div>
          <div>
            <div className="font-bold" style={{ color: "#2a2a2a" }}>薇佳媽媽</div>
            <div className="text-xs" style={{ color: "#999" }}>智慧媽咪國際有限公司 | 兩寶媽、英語教育推廣者</div>
            <div className="text-xs mt-1" style={{ color: "#bbb" }}>
              也在 <a href="https://chparenting.com" style={{ color: "#5A4BD1", borderBottom: "1px solid #E8E5FA" }}>媽媽生活復原力 Lab</a> 和 <a href="https://mommystartup.com" style={{ color: "#5A4BD1", borderBottom: "1px solid #E8E5FA" }}>亞洲媽媽創業</a> 分享育兒日常
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

'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPost } from '@/data/blog-posts';

const SITES = [
  { href: 'https://chparenting.com', emoji: '🌱', name: '媽媽生活\n復原力 Lab', sub: '陪你找回生活的力量' },
  { href: 'https://learn.chparenting.com', emoji: '📖', name: '親子\n多元學習', sub: '探索更多學習可能' },
  { href: 'https://mommywisdom.tw', emoji: '🎁', name: '跟著媽咪\n團好康', sub: '精選好物優惠分享' },
  { href: 'https://mommystartup.com', emoji: '👑', name: '亞洲媽媽\n創業家', sub: '一起成長、一起發光' },
];

/** 封面：有插圖就用插圖，沒有的退回原本的 emoji ＋ 漸層，新文章不補圖也不會破版。 */
function Cover({ post, className = '' }: { post: BlogPost; className?: string }) {
  if (post.cover.image) {
    return <img src={post.cover.image} alt="" className={`w-full h-full object-cover ${className}`} />;
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${post.cover.gradient} flex flex-col items-center justify-center text-white ${className}`}>
      <div className="text-5xl mb-1 opacity-90">{post.cover.emoji}</div>
      <div className="text-xs font-medium opacity-80 px-3 text-center">{post.cover.subtitle}</div>
    </div>
  );
}

export default function BlogClient() {
  const [cat, setCat] = useState<string>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'new' | 'short'>('new');

  const featured = BLOG_POSTS[0];
  const featuredCat = BLOG_CATEGORIES.find(c => c.slug === featured?.category);

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase();
    let out = BLOG_POSTS.filter(p => cat === 'all' || p.category === cat);
    if (kw) {
      out = out.filter(p =>
        (p.title + p.description + p.tags.join(' ')).toLowerCase().includes(kw));
    }
    return [...out].sort((a, b) =>
      sort === 'new' ? b.date.localeCompare(a.date) : a.readTime - b.readTime);
  }, [cat, q, sort]);

  return (
    <div className="pb-16">

      {/* ===== 主視覺：森林圖書館 ===== */}
      <section className="relative">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 2', maxHeight: '460px' }}>
          <img src="/images/blog/hero-library.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />

          {/* 木牌招牌 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[86%] max-w-[560px] text-center">
            <div className="rounded-2xl border-4 border-amber-900/70 shadow-xl px-4 py-3"
              style={{ background: 'linear-gradient(#c98a4b,#a9713a)' }}>
              <p className="m-0 text-amber-50/90 font-black tracking-[0.2em] text-[10px] sm:text-xs">ADVENTURE LIBRARY</p>
              <h1 className="m-0 font-black text-white text-lg sm:text-3xl leading-tight whitespace-nowrap"
                style={{ textShadow: '0 2px 4px rgba(80,40,10,.6)' }}>英語冒險圖書館</h1>
              <p className="m-0 text-amber-50/90 font-bold text-[10px] sm:text-sm mt-0.5">陪孩子找到適合自己的英語學習方式</p>
            </div>

            {/* 搜尋 */}
            <div className="mt-3 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full border-2 border-amber-300 shadow-lg px-4 py-2">
              <input value={q} onChange={e => setQ(e.target.value)}
                placeholder="搜尋想了解的英語學習問題…"
                className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400" />
              <span className="text-gray-400 text-lg leading-none">🔍</span>
            </div>
          </div>

          {/* Finn 在左下角看書 */}
          <img src="/characters/finn/finn-read.png" alt=""
            className="absolute left-[2%] bottom-0 w-[22%] max-w-[170px] drop-shadow-[0_6px_10px_rgba(0,0,0,.3)]" />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">

        {/* ===== 七本分類書 ===== */}
        <section className="-mt-6 relative bg-amber-50/95 backdrop-blur rounded-3xl border-4 border-amber-200 shadow-xl px-3 py-5">
          <h2 className="text-center font-black text-amber-900 text-lg sm:text-xl m-0 mb-4">選擇你的學習攻略</h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
            {BLOG_CATEGORIES.map(c => (
              <button key={c.slug} onClick={() => setCat(cat === c.slug ? 'all' : c.slug)}
                className={`group flex flex-col items-center gap-1 rounded-2xl p-1.5 transition active:scale-95 ${
                  cat === c.slug ? 'bg-amber-200/70 ring-2 ring-amber-400' : 'hover:bg-amber-100/70'
                }`}>
                <img src={c.book} alt="" className="w-full max-w-[72px] object-contain group-hover:-translate-y-1 transition-transform" />
                <span className="font-black text-amber-900 text-[11px] sm:text-xs leading-tight text-center">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ===== 本週精選 ===== */}
        {featured && (
          <section className="mt-8">
            <h2 className="text-center font-black text-amber-900 text-lg sm:text-xl mb-3">⭐ 本週精選冒險攻略 ⭐</h2>
            <Link href={`/blog/${featured.slug}`} className="no-underline block">
              <article className="rounded-3xl border-4 border-amber-700/60 shadow-xl overflow-hidden bg-amber-50 grid md:grid-cols-2">
                <div className="relative min-h-[190px] md:min-h-[260px] border-b-4 md:border-b-0 md:border-r-4 border-amber-700/40">
                  <Cover post={featured} />
                </div>
                <div className="p-5 sm:p-7 flex flex-col justify-center">
                  <span className="self-start bg-red-500 text-white font-black text-[10px] rounded-full px-3 py-1 mb-2">★ EDITOR&apos;S PICK</span>
                  <h3 className="font-black text-gray-900 text-lg sm:text-2xl leading-snug m-0">{featured.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2 mb-3">{featured.description}</p>
                  <div className="flex items-center gap-3 text-[11px] sm:text-xs text-gray-500 mb-4">
                    <span className="bg-amber-100 text-amber-800 rounded-full px-2.5 py-0.5 font-bold">{featuredCat?.emoji} {featuredCat?.name}</span>
                    <span>🕐 {featured.readTime} 分鐘</span>
                  </div>
                  <span className="self-start no-underline bg-gradient-to-b from-red-500 to-red-600 text-white font-black rounded-full px-6 py-2.5 shadow-lg border-2 border-white/70 text-sm">
                    開始閱讀 →
                  </span>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* ===== 全部文章 ===== */}
        <section className="mt-10">
          <h2 className="text-center font-black text-amber-900 text-lg sm:text-xl mb-3">學習攻略</h2>

          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <button onClick={() => setCat('all')}
              className={`rounded-full border-2 px-3 py-1 text-xs font-black transition ${
                cat === 'all' ? 'bg-green-500 text-white border-white/70' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
              }`}>全部</button>
            {BLOG_CATEGORIES.map(c => (
              <button key={c.slug} onClick={() => setCat(c.slug)}
                className={`rounded-full border-2 px-3 py-1 text-xs font-black transition ${
                  cat === c.slug ? 'bg-green-500 text-white border-white/70' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                }`}>{c.name}</button>
            ))}
            <select value={sort} onChange={e => setSort(e.target.value as 'new' | 'short')}
              className="ml-auto rounded-full border-2 border-gray-200 bg-white px-3 py-1 text-xs font-bold text-gray-600 outline-none">
              <option value="new">最新發布</option>
              <option value="short">閱讀時間最短</option>
            </select>
          </div>

          {list.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-10">找不到符合的文章，換個關鍵字試試看。</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {list.map(post => {
                const c = BLOG_CATEGORIES.find(x => x.slug === post.category);
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline block">
                    <article className="h-full bg-white rounded-2xl border-2 border-amber-100 shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition">
                      <div className="relative h-24 sm:h-28">
                        <Cover post={post} />
                        <span className="absolute left-1.5 bottom-1.5 bg-white/90 text-amber-800 font-black text-[10px] rounded-full px-2 py-0.5">
                          {c?.name}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <h3 className="font-black text-gray-900 text-xs sm:text-sm leading-snug m-0 line-clamp-3">{post.title}</h3>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                          <span>🕐 {post.readTime} min</span>
                          <span className="text-orange-500 font-black">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ===== 導去學習地圖 ===== */}
        <section className="mt-10 relative rounded-3xl overflow-hidden border-4 border-sky-200 shadow-lg">
          <img src="/images/maps/bg-sky-castles.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sky-900/25" />
          <div className="relative px-4 py-7 text-center">
            <h2 className="font-black text-white text-lg sm:text-2xl m-0" style={{ textShadow: '0 2px 6px rgba(0,0,0,.45)' }}>
              不知道孩子現在適合學什麼？
            </h2>
            <p className="text-white/95 font-bold text-xs sm:text-sm mt-2 mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>
              從字母、自然發音到 GEPT 檢定，<br className="sm:hidden" />跟著冒險英語一步一步前進！
            </p>
            <Link href="/adventure-map"
              className="inline-block no-underline bg-gradient-to-b from-green-400 to-green-600 text-white font-black rounded-full px-7 py-2.5 shadow-lg border-2 border-white/80 text-sm">
              查看學習地圖 →
            </Link>
          </div>
        </section>

        {/* ===== 姊妹站書架 ===== */}
        <section className="mt-10 relative">
          <img src="/images/blog/shelf.webp" alt="" className="w-full object-cover rounded-2xl" style={{ aspectRatio: '3 / 1' }} />
          <div className="absolute inset-0 flex items-center justify-center px-[13%]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 w-full">
              {SITES.map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener"
                  className="no-underline bg-amber-50/95 rounded-lg border-2 border-amber-300 shadow px-2 py-1.5 text-center hover:bg-white transition">
                  <p className="m-0 font-black text-amber-900 text-[10px] sm:text-xs leading-tight whitespace-pre-line">{s.emoji} {s.name}</p>
                  <p className="m-0 text-amber-700/70 font-bold text-[8px] sm:text-[10px] leading-tight mt-0.5">{s.sub}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

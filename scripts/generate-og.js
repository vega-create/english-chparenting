/**
 * Generate SVG-based OG images for blog posts.
 * Run: node scripts/generate-og.js
 * Output: public/og/{slug}.svg (use as /og/{slug}.svg in HTML)
 */
const fs = require("fs");
const path = require("path");

const posts = [
  { slug: "phonics-vs-kk-which-is-better", emoji: "🔤", title: "Phonics 自然發音 vs KK 音標", subtitle: "哪個適合你的孩子？完整比較指南", gradient: ["#3B82F6", "#8B5CF6", "#EC4899"] },
  { slug: "how-to-help-kids-speak-english-at-home", emoji: "🗣️", title: "5 個讓孩子開口說英文的方法", subtitle: "在家就能做！不需要全美語班", gradient: ["#34D399", "#14B8A6", "#3B82F6"] },
  { slug: "best-english-books-for-kids-2026", emoji: "📚", title: "2026 最推薦兒童英文繪本", subtitle: "10 本按年齡分類的精選書單", gradient: ["#FB923C", "#EF4444", "#EC4899"] },
  { slug: "gept-elementary-preparation-guide", emoji: "📝", title: "全民英檢初級完整攻略", subtitle: "國小就能考過！準備方法大公開", gradient: ["#8B5CF6", "#6366F1", "#2563EB"] },
  { slug: "screen-time-english-learning-balance", emoji: "📱", title: "螢幕時間 vs 英文學習", subtitle: "讓平板成為學習工具的秘訣", gradient: ["#FBBF24", "#F97316", "#EF4444"] },
];

const outDir = path.join(__dirname, "../public/og");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

posts.forEach((post) => {
  const [c1, c2, c3] = post.gradient;
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="50%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="30" fill="rgba(255,255,255,0.15)"/>
  <text x="600" y="220" text-anchor="middle" font-size="120" fill="white" opacity="0.9">${post.emoji}</text>
  <text x="600" y="340" text-anchor="middle" font-family="Arial,sans-serif" font-size="48" font-weight="bold" fill="white">${escapeXml(post.title)}</text>
  <text x="600" y="400" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="rgba(255,255,255,0.8)">${escapeXml(post.subtitle)}</text>
  <text x="600" y="530" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="rgba(255,255,255,0.6)">🦊 Adventure English 冒險英語 | english.chparenting.com</text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${post.slug}.svg`), svg);
  console.log(`✅ ${post.slug}.svg`);
});

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

console.log(`\nDone! ${posts.length} OG images generated in public/og/`);

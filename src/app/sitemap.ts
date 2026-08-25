import type { MetadataRoute } from 'next';
import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import { BLOG_POSTS } from '@/data/blog-posts';

const BASE = 'https://english.chparenting.com';

// 本站是 output: export 靜態匯出，sitemap 必須宣告為靜態產生
export const dynamic = 'force-static';

/** robots.txt 已宣告 Sitemap: /sitemap.xml，這支負責產出它。 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 靜態頁：首頁與主要入口權重最高
  const staticPaths: [string, number][] = [
    ['', 1.0],
    ['/home', 0.9],
    ['/courses', 0.9],
    ['/adventure-map', 0.8],
    ['/blog', 0.8],
    ['/placement', 0.7],
    ['/guide', 0.7],
    ['/parents', 0.7],
    ['/books', 0.6],
    ['/verbs', 0.6],
    ['/badges', 0.5],
    ['/tasks', 0.5],
    ['/cabin', 0.5],
    ['/games/word-catcher', 0.5],
    ['/games/word-whack', 0.5],
    ['/privacy', 0.3],
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map(([path, priority]) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority,
  }));

  // 12 個關卡頁
  for (const course of COURSES) {
    entries.push({
      url: `${BASE}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    entries.push({
      url: `${BASE}/adventure-map/island/${course.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // 240 堂課：每課都有影片與逐字稿，是主要的搜尋落地頁
  for (const mission of MISSIONS) {
    const course = COURSES.find(c => c.level === mission.level);
    if (!course) continue;
    entries.push({
      url: `${BASE}/courses/${course.slug}/mission/${mission.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // 部落格
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  }

  return entries;
}

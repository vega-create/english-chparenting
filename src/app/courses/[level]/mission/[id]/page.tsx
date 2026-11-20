import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import MissionFlow from '@/components/mission/MissionFlow';
import type { Metadata } from 'next';

const BASE = 'https://english.chparenting.com';
const R2_THUMBS = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/thumbs';
/** L1–L8 有逐課封面圖（YouTube 用的同一批），其餘關卡先用站台圖示。 */
// R2 上 L1–L12 每課都有 thumbs/L{level}-m{id}.jpg（命名一致）
function thumbnailFor(level: number, id: number) {
  return `${R2_THUMBS}/L${level}-m${id}.jpg`;
}

/** 影片上架日（台北時間）。Google 要求 uploadDate 是含時區的完整 ISO 8601 datetime。 */
const VIDEO_UPLOAD_DATE = '2026-08-25';

/**
 * 把日期轉成含時區的 ISO 8601 datetime（例：2026-08-25T00:00:00+08:00）。
 * - 只有日期（YYYY-MM-DD）→ 補台北時間 00:00:00+08:00
 * - 已有時間但沒時區 → 補 +08:00
 * - 已含時區（Z 或 ±hh:mm）→ 原樣保留
 * - 空值或無效日期 → 回傳 null（呼叫端就不輸出 VideoObject，避免送出無效值）
 */
function toIsoDateTime(value: string | undefined | null): string | null {
  const v = (value ?? '').trim();
  if (!v) return null;
  let iso: string;
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    iso = `${v}T00:00:00+08:00`;
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(v)) {
    iso = `${v.length === 16 ? `${v}:00` : v}+08:00`;
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(v)) {
    iso = v;
  } else {
    return null;
  }
  // 擋掉 2026-02-30 這類格式對但不存在的日期
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const [y, m, day] = iso.slice(0, 10).split('-').map(Number);
  const check = new Date(Date.UTC(y, m - 1, day));
  if (check.getUTCMonth() !== m - 1 || check.getUTCDate() !== day) return null;
  return iso;
}

interface Props {
  params: Promise<{ level: string; id: string }>;
}

export async function generateStaticParams() {
  const params: { level: string; id: string }[] = [];
  for (const mission of MISSIONS) {
    const course = COURSES.find(c => c.level === mission.level);
    if (course) {
      params.push({ level: course.slug, id: String(mission.id) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level, id } = await params;
  const course = COURSES.find(c => c.slug === level);
  const mission = MISSIONS.find(m => m.level === course?.level && m.id === parseInt(id, 10));

  if (!course || !mission) {
    return { title: '找不到任務' };
  }

  return {
    title: `Mission ${mission.id}: ${mission.titleEn} - ${course.islandEn}`,
    description: `${mission.title}。學習單字：${mission.words.map(w => w.en).join(', ')}。互動式五步驟教學。`,
    alternates: { canonical: `/courses/${course.slug}/mission/${mission.id}` },
  };
}

export default async function MissionPage({ params }: Props) {
  const { level, id } = await params;
  const course = COURSES.find(c => c.slug === level);
  const mission = MISSIONS.find(m => m.level === course?.level && m.id === parseInt(id, 10));

  // 結構化資料：讓 Google 影片搜尋收錄這 240 支對話動畫，
  // 逐字稿放進 transcript 供 AI 搜尋引擎引用。
  const uploadDate = toIsoDateTime(VIDEO_UPLOAD_DATE);
  const jsonLd = course && mission ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        '@id': `${BASE}/courses/${course.slug}/mission/${mission.id}#lesson`,
        name: `${mission.title} ${mission.titleEn}`,
        description: `${course.island} Level ${course.level} 第 ${mission.id} 課。學習單字：${mission.words.map(w => w.en).join(', ')}。`,
        url: `${BASE}/courses/${course.slug}/mission/${mission.id}`,
        inLanguage: 'en',
        learningResourceType: ['情境對話影片', '單字', '句型', '口說練習', '測驗'],
        educationalLevel: `Level ${course.level} — ${course.tag}`,
        teaches: mission.words.map(w => w.en),
        isPartOf: {
          '@type': 'Course',
          name: `${course.island} ${course.islandEn}`,
          url: `${BASE}/courses/${course.slug}`,
        },
        isAccessibleForFree: true,
        provider: { '@id': `${BASE}#organization` },
      },
      ...(mission.videoUrl && uploadDate ? [{
        '@type': 'VideoObject',
        '@id': `${BASE}/courses/${course.slug}/mission/${mission.id}#video`,
        name: `${mission.title} ${mission.titleEn}｜冒險英語動畫`,
        description: `${course.island} Level ${course.level} 第 ${mission.id} 課動畫對話。跟著 Finn、Coco、Benny、Ruby、Polly 一起在自然情境裡聽英語、說英語。`,
        contentUrl: mission.videoUrl,
        embedUrl: `${BASE}/courses/${course.slug}/mission/${mission.id}`,
        thumbnailUrl: [thumbnailFor(course.level, mission.id)],
        uploadDate,
        inLanguage: 'en',
        isFamilyFriendly: true,
        isAccessibleForFree: true,
        // 逐字稿：英文台詞逐句，AI 搜尋引擎可直接引用
        transcript: (mission.videoScript ?? [])
          .map(v => `${v.speaker}: ${v.line}`)
          .join('\n'),
        publisher: { '@id': `${BASE}#organization` },
      }] : []),
    ],
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <MissionFlow levelSlug={level} missionId={parseInt(id, 10)} />
    </>
  );
}

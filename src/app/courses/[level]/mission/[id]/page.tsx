import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import MissionFlow from '@/components/mission/MissionFlow';
import type { Metadata } from 'next';

const BASE = 'https://english.chparenting.com';
const R2_THUMBS = 'https://pub-64aaa410cb47427ea27ebe800e54daba.r2.dev/thumbs';
/** L1–L8 有逐課封面圖（YouTube 用的同一批），其餘關卡先用站台圖示。 */
function thumbnailFor(level: number, id: number) {
  return level <= 8 ? `${R2_THUMBS}/L${level}-m${id}.jpg` : `${BASE}/icon.png`;
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
  };
}

export default async function MissionPage({ params }: Props) {
  const { level, id } = await params;
  const course = COURSES.find(c => c.slug === level);
  const mission = MISSIONS.find(m => m.level === course?.level && m.id === parseInt(id, 10));

  // 結構化資料：讓 Google 影片搜尋收錄這 240 支對話動畫，
  // 逐字稿放進 transcript 供 AI 搜尋引擎引用。
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
      ...(mission.videoUrl ? [{
        '@type': 'VideoObject',
        '@id': `${BASE}/courses/${course.slug}/mission/${mission.id}#video`,
        name: `${mission.title} ${mission.titleEn}｜冒險英語動畫`,
        description: `${course.island} Level ${course.level} 第 ${mission.id} 課動畫對話。跟著 Finn、Coco、Benny、Ruby、Polly 一起在自然情境裡聽英語、說英語。`,
        contentUrl: mission.videoUrl,
        embedUrl: `${BASE}/courses/${course.slug}/mission/${mission.id}`,
        thumbnailUrl: [thumbnailFor(course.level, mission.id)],
        uploadDate: '2026-08-25',
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

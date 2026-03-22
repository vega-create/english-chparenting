import { COURSES } from '@/data/courses';
import { MISSIONS } from '@/data/missions';
import MissionFlow from '@/components/mission/MissionFlow';
import type { Metadata } from 'next';

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
  return <MissionFlow levelSlug={level} missionId={parseInt(id, 10)} />;
}

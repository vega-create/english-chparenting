import type { Metadata } from "next";
import LessonClient from "./LessonClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `彩虹谷第 ${id} 關 · 字母島小冒險`,
    description: `彩虹谷字母島第 ${id} 關：跟 Coco 一起走進場景、聽英文、開口說，完成任務拿星星。`,
    alternates: { canonical: `/adventure-map/rainbow-valley/lesson/${id}` },
  };
}

export function generateStaticParams() {
  // L1-L12 都產生（之後其他關慢慢補內容）
  return Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonClient lessonId={parseInt(id, 10)} />;
}

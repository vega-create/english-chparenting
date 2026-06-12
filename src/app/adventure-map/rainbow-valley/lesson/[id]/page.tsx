import LessonClient from "./LessonClient";

export function generateStaticParams() {
  // L1-L12 都產生（之後其他關慢慢補內容）
  return Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonClient lessonId={parseInt(id, 10)} />;
}

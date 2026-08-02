import type { Metadata } from "next";
import { COURSES } from "@/data/courses";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return COURSES.map(c => ({ level: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const course = COURSES.find(c => c.slug === level);
  if (!course) return { title: "課程未找到" };
  return {
    title: `L${course.level} ${course.island} ${course.islandEn} - ${course.description}`,
    description: course.longDescription,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const course = COURSES.find(c => c.slug === level);
  if (!course) return <div className="min-h-screen flex items-center justify-center">課程未找到</div>;
  return <CourseDetailClient course={course} />;
}

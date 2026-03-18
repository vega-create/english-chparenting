import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/data/courses";

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

  const idx = COURSES.findIndex(c => c.slug === level);
  const prev = idx > 0 ? COURSES[idx - 1] : null;
  const next = idx < COURSES.length - 1 ? COURSES[idx + 1] : null;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/courses" className="hover:text-purple-600 no-underline">課程介紹</Link>
          <span>›</span>
          <span className="text-gray-700">L{course.level} {course.island}</span>
        </div>

        {/* Hero */}
        <div className={`bg-gradient-to-br ${course.bgGradient} ${course.borderColor} border-2 rounded-3xl p-8 mb-8 animate-slide-up`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-white/80 rounded-full px-3 py-1 font-bold">Level {course.level}</span>
            <span className="text-xs bg-white/60 rounded-full px-2 py-0.5">{course.tag}</span>
            <span className="text-xs bg-white/60 rounded-full px-2 py-0.5">{course.world} {course.worldEmoji}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">🏝️ {course.island} <span className="text-gray-500 font-bold text-xl">{course.islandEn}</span></h1>
          <p className="text-lg text-gray-600 leading-relaxed">{course.longDescription}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-purple-600">{course.lessons}</div>
              <div className="text-xs text-gray-500">堂課</div>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-green-600">{course.vocabulary}</div>
              <div className="text-xs text-gray-500">單字</div>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-600">4</div>
              <div className="text-xs text-gray-500">Review Quest</div>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-pink-600">~8hr</div>
              <div className="text-xs text-gray-500">學習時數</div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-black mb-4">🎯 學習技能</h2>
          <div className="flex flex-wrap gap-2">
            {course.skills.map(s => (
              <span key={s} className="bg-purple-50 text-purple-700 rounded-full px-4 py-2 text-sm font-medium">{s}</span>
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className="mb-8">
          <h2 className="text-xl font-black mb-4">📋 課程主題</h2>
          <div className="glass rounded-2xl p-5">
            <div className="grid sm:grid-cols-2 gap-2">
              {course.topics.map((t, i) => (
                <div key={t} className="flex items-center gap-2 py-2">
                  <span className="text-green-500 text-sm">✓</span>
                  <span className="text-sm text-gray-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phonics or Grammar */}
        {(course.phonics || course.grammar) && (
          <section className="mb-8">
            <h2 className="text-xl font-black mb-4">{course.phonics ? "🔤 發音重點" : "📖 文法重點"}</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <p className="text-sm text-blue-800">{course.phonics || course.grammar}</p>
            </div>
          </section>
        )}

        {/* Sample Words */}
        <section className="mb-8">
          <h2 className="text-xl font-black mb-4">💬 範例單字</h2>
          <div className="flex flex-wrap gap-2">
            {course.sampleWords.map(w => (
              <span key={w} className="bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-2 text-sm font-medium">{w}</span>
            ))}
          </div>
        </section>

        {/* Sample Sentences */}
        <section className="mb-8">
          <h2 className="text-xl font-black mb-4">📝 範例句型</h2>
          <div className="space-y-2">
            {course.sampleSentences.map(s => (
              <div key={s} className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800 italic">
                &quot;{s}&quot;
              </div>
            ))}
          </div>
        </section>

        {/* How a lesson looks */}
        <section className="mb-8">
          <h2 className="text-xl font-black mb-4">🎮 每課學習流程（約 18 分鐘）</h2>
          <div className="grid sm:grid-cols-5 gap-2">
            {[
              { icon: "🔔", name: "Wake Up!", time: "2-3 min" },
              { icon: "📚", name: "Discover", time: "5-8 min" },
              { icon: "🎮", name: "Challenge", time: "5-8 min" },
              { icon: "💬", name: "Talk Time", time: "3-5 min" },
              { icon: "⭐", name: "Done!", time: "1-2 min" },
            ].map(s => (
              <div key={s.name} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
                <div className="text-2xl">{s.icon}</div>
                <div className="text-xs font-bold mt-1">{s.name}</div>
                <div className="text-xs text-gray-400">{s.time}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          {prev ? (
            <Link href={`/courses/${prev.slug}`} className="no-underline text-sm text-gray-500 hover:text-purple-600">
              ← L{prev.level} {prev.island}
            </Link>
          ) : <div />}
          <Link href="/courses" className="no-underline text-sm text-purple-600 font-medium">全部課程</Link>
          {next ? (
            <Link href={`/courses/${next.slug}`} className="no-underline text-sm text-gray-500 hover:text-purple-600">
              L{next.level} {next.island} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}

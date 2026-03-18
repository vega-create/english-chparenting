import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/data/courses";

export const metadata: Metadata = {
  title: "課程介紹 - 12 級完整英語學習課程",
  description: "Adventure English 冒險英語 12 級課程完整介紹。從字母認識到英檢初級，每級 24 堂課，聽說讀寫四技能全面培養。",
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            <span className="gradient-text">課程介紹</span> 📚
          </h1>
          <p className="text-lg text-gray-500">12 級・288 堂課・850+ 單字｜每級都有完整的聽說讀寫訓練</p>
        </div>

        {/* Skill legend */}
        <div className="glass rounded-2xl p-5 mb-10 flex flex-wrap justify-center gap-4 text-sm">
          <span className="flex items-center gap-1">🎧 <strong>聽力</strong>（Coco 貓咪）</span>
          <span className="flex items-center gap-1">🗣️ <strong>口說</strong>（Polly 鸚鵡）</span>
          <span className="flex items-center gap-1">📖 <strong>閱讀</strong>（Benny 小熊）</span>
          <span className="flex items-center gap-1">✍️ <strong>寫作</strong>（Ruby 兔兔）</span>
          <span className="flex items-center gap-1">🦊 <strong>引導</strong>（Finn 狐狸）</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map(course => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className="no-underline">
              <div className={`island-card bg-gradient-to-br ${course.bgGradient} ${course.borderColor} border-2 rounded-3xl overflow-hidden h-full`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-white/80 rounded-full px-3 py-1 text-gray-600">Level {course.level}</span>
                    <span className="text-xs bg-white/60 rounded-full px-2 py-0.5">{course.tag}</span>
                  </div>
                  <h2 className="font-black text-xl mb-1">{course.worldEmoji} {course.island}</h2>
                  <div className="text-sm text-gray-500 mb-3">{course.islandEn} — {course.world}</div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{course.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/60 rounded-lg p-2 text-center">
                      <div className="font-bold text-purple-600">{course.lessons}</div>
                      <div className="text-gray-500">堂課</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2 text-center">
                      <div className="font-bold text-green-600">{course.vocabulary}</div>
                      <div className="text-gray-500">單字</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {course.skills.map(s => (
                      <span key={s} className="text-xs bg-white/50 rounded-full px-2 py-0.5 text-gray-600">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/40 px-6 py-3 text-center text-sm font-medium text-purple-700">
                  查看詳細課程內容 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

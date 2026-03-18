import type { Metadata } from "next";
import Link from "next/link";
import { COURSES, WORLDS } from "@/data/courses";

export const metadata: Metadata = {
  title: "學習地圖 - 12 座島嶼冒險旅程",
  description: "Adventure English 冒險英語完整學習地圖。6 大世界、12 座島嶼、288 堂課，從 ABC 字母到英檢初級的完整學習路線。",
};

export default function MapPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            <span className="gradient-text">冒險地圖</span> 🗺️
          </h1>
          <p className="text-lg text-gray-500">6 大世界・12 座島嶼・288 堂課｜從零開始到英檢初級</p>
        </div>

        {/* Progress overview */}
        <div className="glass rounded-3xl p-6 mb-10 grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div><div className="text-2xl font-black text-purple-600">12</div><div className="text-xs text-gray-500">島嶼等級</div></div>
          <div><div className="text-2xl font-black text-green-600">288</div><div className="text-xs text-gray-500">堂課</div></div>
          <div><div className="text-2xl font-black text-blue-600">850+</div><div className="text-xs text-gray-500">單字量</div></div>
          <div><div className="text-2xl font-black text-pink-600">48</div><div className="text-xs text-gray-500">Review Quest</div></div>
          <div><div className="text-2xl font-black text-orange-600">5</div><div className="text-xs text-gray-500">學習夥伴</div></div>
          <div><div className="text-2xl font-black text-red-600">🎓</div><div className="text-xs text-gray-500">英檢初級</div></div>
        </div>

        {/* Worlds */}
        {WORLDS.map((world, wi) => {
          const worldCourses = COURSES.filter(c => world.levels.includes(c.level));
          return (
            <div key={world.name} className="mb-10">
              {/* World header */}
              <div className={`bg-gradient-to-r ${world.color} rounded-2xl p-5 mb-4 flex items-center gap-4`}>
                <span className="text-4xl">{world.emoji}</span>
                <div>
                  <div className="text-xs text-gray-500 font-medium">World {wi + 1}</div>
                  <h2 className="text-xl font-black">{world.emoji} {world.name} <span className="text-gray-400 font-medium text-base">{world.nameEn}</span></h2>
                </div>
                {wi === 0 && <span className="ml-auto bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">START HERE</span>}
              </div>

              {/* Islands in this world */}
              <div className="grid md:grid-cols-2 gap-4 ml-4 md:ml-8">
                {worldCourses.map(course => (
                  <Link key={course.slug} href={`/courses/${course.slug}`} className="no-underline">
                    <div className={`island-card bg-gradient-to-br ${course.bgGradient} ${course.borderColor} border-2 rounded-2xl p-5`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">🏝️</span>
                          <span className="font-black">L{course.level} {course.island}</span>
                        </div>
                        <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-gray-600">{course.tag}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-1">{course.islandEn}</div>
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex gap-3 mt-3 text-xs text-gray-400">
                        <span>📚 {course.lessons} 課</span>
                        <span>💬 {course.vocabulary} 單字</span>
                        {course.phonics && <span>🔤 Phonics</span>}
                        {course.grammar && <span>📖 文法</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Dashed path between worlds */}
              {wi < WORLDS.length - 1 && (
                <div className="flex justify-center py-3">
                  <div className="text-gray-300 text-2xl">⬇️</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Final CTA */}
        <div className="text-center glass rounded-3xl p-10 mt-8">
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-2xl font-black mb-2">完成 12 座島嶼 = 英檢初級程度！</h3>
          <p className="text-gray-500 mb-6">完全免費、AI 互動教學、小孩自己就能學</p>
          <button className="cta-btn px-10 py-4 text-lg">🚀 開始冒險（即將上線）</button>
        </div>
      </div>
    </main>
  );
}

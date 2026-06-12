// V1 - Duolingo 風：明亮卡片、大字、清楚進度
import Link from "next/link";

const WORLDS = [
  { name: "彩虹谷", emoji: "🌈", color: "from-pink-300 to-red-300", levels: ["L1 字母", "L2 聲音"], progress: 35 },
  { name: "友善小鎮", emoji: "🏡", color: "from-yellow-300 to-amber-300", levels: ["L3 市場", "L4 學校"], progress: 0 },
  { name: "海洋灣", emoji: "🌊", color: "from-cyan-300 to-blue-300", levels: ["L5 珊瑚", "L6 燈塔"], progress: 0 },
  { name: "故事城堡", emoji: "🏰", color: "from-purple-300 to-violet-300", levels: ["L7 文法", "L8 問題"], progress: 0 },
  { name: "探索大陸", emoji: "🌍", color: "from-green-300 to-emerald-300", levels: ["L9 時光", "L10 未來"], progress: 0 },
  { name: "冠軍峰", emoji: "🎓", color: "from-pink-300 to-rose-300", levels: ["L11 挑戰", "L12 勝利"], progress: 0 },
];

export default function V1Preview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-cyan-50 to-blue-50">
      {/* Top HUD */}
      <header className="sticky top-0 bg-white/95 backdrop-blur border-b-4 border-green-400 shadow-md">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <img src="/characters/finn/finn-wave.png" className="w-10 h-10" alt="" />
          <div className="flex-1">
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="text-orange-500">🔥 12 天</span>
              <span className="text-amber-500">💎 320</span>
              <span className="text-purple-500">⭐ 89</span>
            </div>
          </div>
          <Link href="/preview" className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full no-underline">返回</Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Hero greeting */}
        <div className="bg-white rounded-3xl p-5 mb-5 shadow-md border-2 border-green-100">
          <div className="flex items-center gap-3">
            <img src="/images/guide/vega-book.webp" className="w-16 h-16" alt="Vega" />
            <div>
              <p className="font-black text-gray-800 text-lg">嗨！繼續冒險吧 🚀</p>
              <p className="text-sm text-gray-500">今天已學 0 / 10 分鐘</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-green-400 rounded-full" />
          </div>
        </div>

        {/* Worlds list */}
        <h2 className="font-black text-xl text-gray-800 mb-3 px-1">🗺 我的冒險地圖</h2>
        <div className="space-y-3">
          {WORLDS.map((w, i) => (
            <div key={w.name} className={`relative rounded-2xl bg-gradient-to-br ${w.color} p-5 shadow-md border-2 border-white/60`}>
              <div className="flex items-center gap-3">
                <div className="text-5xl drop-shadow">{w.emoji}</div>
                <div className="flex-1 text-white drop-shadow">
                  <p className="text-xs font-bold opacity-90">World {i + 1}</p>
                  <p className="text-xl font-black">{w.name}</p>
                  <p className="text-xs">{w.levels.join(" · ")}</p>
                </div>
                {i === 0 ? (
                  <button className="bg-white text-green-700 font-black px-5 py-3 rounded-2xl shadow-lg active:scale-95 transition">
                    開始 →
                  </button>
                ) : (
                  <div className="bg-white/30 rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl">🔒</div>
                )}
              </div>
              {w.progress > 0 && (
                <div className="mt-3 h-1.5 bg-white/30 rounded-full">
                  <div className="h-full bg-white rounded-full" style={{ width: `${w.progress}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-green-400 shadow-2xl">
          <div className="max-w-md mx-auto flex justify-around py-3">
            <button className="text-center">
              <div className="text-2xl">🗺</div>
              <div className="text-xs text-green-700 font-bold">學習</div>
            </button>
            <button className="text-center">
              <div className="text-2xl">🎮</div>
              <div className="text-xs text-gray-500">遊戲</div>
            </button>
            <button className="text-center">
              <div className="text-2xl">🐾</div>
              <div className="text-xs text-gray-500">寵物</div>
            </button>
            <button className="text-center">
              <div className="text-2xl">🏆</div>
              <div className="text-xs text-gray-500">成就</div>
            </button>
          </div>
        </div>
        <div className="h-20" />
      </main>
    </div>
  );
}

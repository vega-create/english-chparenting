// V3 - 遊戲樂園：3D 風主題樂園、寵物背包、HUD 介面
import Link from "next/link";

export default function V3Preview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {/* Top HUD - Game Style */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 shadow-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/preview" className="bg-white/20 px-2 py-1 rounded-full text-xs no-underline text-white">← 返回</Link>
            <img src="/characters/finn/finn-normal.png" className="w-9 h-9" alt="" />
            <div>
              <div className="text-xs opacity-80">小冒險家</div>
              <div className="text-sm font-black">Vega 小朋友</div>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <div className="bg-white/20 px-3 py-1.5 rounded-full"><span className="font-black">Lv.5</span> 🦁</div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full"><span className="font-black">320</span> 💎</div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full"><span className="font-black">89</span> ⭐</div>
          </div>
        </div>
        {/* XP bar */}
        <div className="mt-2 max-w-5xl mx-auto">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* My Pet Card */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-5 mb-5 shadow-xl border-4 border-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="text-7xl">🦁</div>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-black px-2 py-0.5 rounded-full">Lv 5</span>
            </div>
            <div className="flex-1">
              <p className="font-black text-purple-800 text-lg">小獅獅</p>
              <p className="text-xs text-gray-500">你的學習夥伴</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" />
              </div>
              <p className="text-xs text-gray-500 mt-1">經驗值 240 / 360</p>
            </div>
            <button className="bg-purple-500 text-white p-3 rounded-2xl shadow">
              🍎
            </button>
          </div>
        </div>

        {/* Today's Mission */}
        <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-5 mb-5 shadow-xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-20">✨</div>
          <p className="text-white/90 text-xs font-bold">⭐ 今日任務</p>
          <h2 className="text-2xl font-black text-white drop-shadow mb-1">完成 1 課就能升級！</h2>
          <p className="text-white/90 text-sm mb-3">剩 1 / 1 課</p>
          <button className="bg-white text-orange-600 font-black px-6 py-3 rounded-2xl shadow-lg active:scale-95">
            ▶️ 立刻挑戰
          </button>
        </div>

        {/* Worlds Grid */}
        <h2 className="font-black text-xl text-purple-800 mb-3 px-1">🌍 探索世界</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
          {[
            { emoji: "🌈", name: "彩虹谷", active: true, progress: 35 },
            { emoji: "🏡", name: "友善小鎮", locked: true },
            { emoji: "🌊", name: "海洋灣", locked: true },
            { emoji: "🏰", name: "故事城堡", locked: true },
            { emoji: "🌍", name: "探索大陸", locked: true },
            { emoji: "🎓", name: "冠軍峰", locked: true },
          ].map(w => (
            <div key={w.name} className={`rounded-2xl p-4 shadow-lg border-2 transition active:scale-95 ${
              w.locked ? "bg-gray-200 border-gray-300 opacity-60" : "bg-white border-white hover:shadow-2xl cursor-pointer"
            }`}>
              <div className="text-5xl text-center mb-1">{w.emoji}</div>
              <p className="font-black text-center text-sm text-gray-800">{w.name}</p>
              {w.locked && <p className="text-xs text-center text-gray-500 mt-1">🔒 待解鎖</p>}
              {w.progress !== undefined && (
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full bg-pink-400 rounded-full" style={{width: `${w.progress}%`}} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { icon: "🎁", label: "寶箱" },
            { icon: "🏆", label: "成就" },
            { icon: "🎒", label: "背包" },
            { icon: "👕", label: "造型" },
          ].map(a => (
            <button key={a.label} className="bg-white/80 backdrop-blur rounded-2xl py-3 shadow border border-white active:scale-95">
              <div className="text-3xl mb-1">{a.icon}</div>
              <div className="text-xs font-bold text-purple-700">{a.label}</div>
            </button>
          ))}
        </div>
      </main>

      {/* Floating BGM toggle */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl active:scale-90 transition z-30">
        🎵
      </button>
    </div>
  );
}

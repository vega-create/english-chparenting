// V2 - RPG 冒險：大地圖、角色在世界移動、寶箱、解鎖路徑
import Link from "next/link";

export default function V2Preview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-50 overflow-hidden">
      {/* HUD top */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur text-white px-4 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/preview" className="bg-white/20 px-3 py-1 rounded-full text-xs no-underline text-white">← 返回</Link>
          </div>
          <div className="flex gap-3 items-center text-sm font-bold">
            <span>❤️ × 3</span>
            <span>🔥 12</span>
            <span>💎 320</span>
            <span>⭐ 89</span>
          </div>
        </div>
      </header>

      {/* World Map - 大地圖 */}
      <main className="relative pt-16 min-h-screen">
        <div className="absolute inset-0 opacity-30">
          {/* Decorative scenery */}
          <div className="absolute top-20 left-10 text-8xl">🌲</div>
          <div className="absolute top-40 right-16 text-7xl">⛰️</div>
          <div className="absolute bottom-32 left-20 text-9xl">🌊</div>
          <div className="absolute bottom-10 right-10 text-7xl">🏔️</div>
          <div className="absolute top-1/2 left-1/3 text-6xl">🌳</div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-black text-amber-900 text-center mb-2 drop-shadow">
            🗺️ Adventure Map
          </h1>
          <p className="text-center text-amber-700 mb-8">冒險者地圖 · 你目前在這裡 ↓</p>

          {/* 地圖路徑 */}
          <div className="relative">
            {/* 路徑線 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 800" preserveAspectRatio="none">
              <path d="M 80 80 Q 200 150 320 200 T 100 320 T 300 450 T 100 580 T 320 720" stroke="#f59e0b" strokeWidth="4" strokeDasharray="10 6" fill="none" />
            </svg>

            {/* 地點節點 */}
            <div className="relative grid grid-cols-2 gap-y-12">
              {[
                { name: "字母島", emoji: "🌈", status: "current", desc: "你在這" },
                { name: "聲音島", emoji: "🔊", status: "next", desc: "下一站" },
                { name: "市場街", emoji: "🛒", status: "locked", desc: "🔒" },
                { name: "學校路", emoji: "🎒", status: "locked", desc: "🔒" },
                { name: "珊瑚灘", emoji: "🐚", status: "locked", desc: "🔒" },
                { name: "燈塔角", emoji: "💡", status: "locked", desc: "🔒" },
              ].map((p, i) => (
                <div key={p.name} className={`relative ${i % 2 === 1 ? "translate-x-12" : ""}`}>
                  <div className={`mx-auto w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl border-4 ${
                    p.status === "current" ? "bg-yellow-300 border-amber-500 animate-pulse" :
                    p.status === "next" ? "bg-white border-green-400" :
                    "bg-gray-200 border-gray-400 opacity-60"
                  }`}>
                    <div className="text-5xl">{p.emoji}</div>
                    <div className="text-xs font-black text-gray-800 mt-1">{p.name}</div>
                  </div>
                  <div className="text-center mt-1 text-xs font-bold text-amber-800">{p.desc}</div>
                  {p.status === "current" && (
                    <img src="/characters/finn/finn-wave.png" alt="" className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 animate-bounce drop-shadow-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 寶箱 */}
          <div className="mt-12 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-2xl p-5 border-4 border-amber-400 shadow-lg flex items-center gap-4">
            <div className="text-6xl animate-pulse">🎁</div>
            <div className="flex-1">
              <p className="font-black text-amber-900">每日寶箱可領取！</p>
              <p className="text-sm text-amber-700">完成 1 課自動解鎖</p>
            </div>
            <button className="bg-amber-500 text-white font-black px-5 py-3 rounded-xl shadow active:scale-95">
              查看 →
            </button>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-amber-900/90 to-amber-700/90 backdrop-blur p-4">
          <div className="max-w-md mx-auto flex gap-2">
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-amber-900 font-black py-4 rounded-2xl shadow-lg active:scale-95 text-lg">
              ⚔️ 開始挑戰
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-2xl">
              🎒
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-2xl">
              🐾
            </button>
          </div>
        </div>
        <div className="h-32" />
      </main>
    </div>
  );
}

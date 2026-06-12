import Link from "next/link";

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-center text-purple-800 mb-2">🎨 視覺方向預覽</h1>
        <p className="text-center text-gray-600 mb-10">三個方向選一個</p>

        <div className="grid gap-5">
          <Link href="/preview/v1" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-purple-100 hover:border-purple-300 no-underline">
            <div className="flex items-center gap-4">
              <div className="text-5xl">💚</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-purple-800 mb-1">V1 - Duolingo 風</h2>
                <p className="text-sm text-gray-600">明亮卡片、大字、清楚進度。穩定上手，適合手機。</p>
              </div>
              <div className="text-purple-400">→</div>
            </div>
          </Link>

          <Link href="/preview/v2" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-amber-100 hover:border-amber-300 no-underline">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🗺️</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-amber-800 mb-1">V2 - RPG 冒險</h2>
                <p className="text-sm text-gray-600">大地圖、角色在世界移動、寶箱、解鎖路徑，沈浸感最強。</p>
              </div>
              <div className="text-amber-400">→</div>
            </div>
          </Link>

          <Link href="/preview/v3" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-pink-100 hover:border-pink-300 no-underline">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏰</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-pink-800 mb-1">V3 - 遊戲樂園</h2>
                <p className="text-sm text-gray-600">3D 風主題樂園、寵物背包、HUD 介面、隨時可收集。</p>
              </div>
              <div className="text-pink-400">→</div>
            </div>
          </Link>

          <Link href="/preview/v4" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-purple-100 hover:border-purple-300 no-underline">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🎮</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-purple-800 mb-1">V4 - 選角色 + 大地圖 (emoji)</h2>
                <p className="text-sm text-gray-600">先選造型/寵物 → 進入互動地圖（用 emoji 做架構）。</p>
              </div>
              <div className="text-purple-400">→</div>
            </div>
          </Link>

          <Link href="/preview/v5" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-yellow-200 hover:border-yellow-400 no-underline">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🗺️</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-amber-800 mb-1">V5 - AI 地圖（第一張）</h2>
                <p className="text-sm text-gray-600">6 個世界圓島 + 左側角色徽章 + 右上熱氣球小孩。</p>
              </div>
              <div className="text-yellow-500">→</div>
            </div>
          </Link>

          <Link href="/preview/v6" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-emerald-200 hover:border-emerald-400 no-underline">
            <div className="flex items-center gap-4">
              <div className="text-5xl">✨</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-emerald-800 mb-1">V6 - AI 地圖（第二張）</h2>
                <p className="text-sm text-gray-600">金色路徑 + 底部 5 角色橫排 + 右下功能列。</p>
              </div>
              <div className="text-emerald-500">→</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

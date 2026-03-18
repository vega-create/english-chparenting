import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/80 border-t border-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🦊</span>
            <span className="font-black text-lg text-purple-800">Adventure English</span>
          </div>
          <p className="text-gray-500 leading-relaxed">
            專為台灣 5-12 歲兒童設計的免費英語自學平台。由<strong>智慧媽咪國際有限公司</strong>開發，薇佳媽媽帶領團隊打造。
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-gray-800">學習資源</h4>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/map" className="hover:text-purple-600 no-underline">學習地圖</Link></li>
            <li><Link href="/courses" className="hover:text-purple-600 no-underline">課程介紹</Link></li>
            <li><Link href="/guide" className="hover:text-purple-600 no-underline">使用說明</Link></li>
            <li><Link href="/books" className="hover:text-purple-600 no-underline">推薦書單</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-gray-800">學習文章</h4>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/blog" className="hover:text-purple-600 no-underline">全部文章</Link></li>
            <li><Link href="/blog/phonics-vs-kk-which-is-better" className="hover:text-purple-600 no-underline">Phonics vs KK 音標</Link></li>
            <li><Link href="/blog/best-english-books-for-kids-2026" className="hover:text-purple-600 no-underline">兒童英文繪本推薦</Link></li>
            <li><Link href="/blog/gept-elementary-preparation-guide" className="hover:text-purple-600 no-underline">英檢初級攻略</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-gray-800">關聯網站</h4>
          <ul className="space-y-2 text-gray-500">
            <li><a href="https://chparenting.com" target="_blank" rel="noopener" className="hover:text-purple-600 no-underline">媽媽生活復原力 Lab chparenting.com</a></li>
            <li><a href="https://learn.chparenting.com" target="_blank" rel="noopener" className="hover:text-purple-600 no-underline">親子多元學習 learn.chparenting.com</a></li>
            <li><a href="https://mommywisdom.tw" target="_blank" rel="noopener" className="hover:text-purple-600 no-underline">跟著媽咪團好康 mommywisdom.tw</a></li>
            <li><a href="https://mommystartup.com" target="_blank" rel="noopener" className="hover:text-purple-600 no-underline">亞洲媽媽創業 mommystartup.com</a></li>
            <li><a href="https://aimommywisdom.com" target="_blank" rel="noopener" className="hover:text-purple-600 no-underline">官網 aimommywisdom.com</a></li>
            <li><a href="https://vega-note.com" target="_blank" rel="noopener" className="hover:text-purple-600 no-underline">學習筆記 vega-note.com</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
        <p>© 2026 Adventure English 冒險英語 | 智慧媽咪國際有限公司 | english.chparenting.com</p>
        <p className="mt-1">本站部分連結為聯盟行銷連結，透過連結購買不會增加您的費用，但能支持我們持續提供免費學習資源 ❤️</p>
      </div>
    </footer>
  );
}

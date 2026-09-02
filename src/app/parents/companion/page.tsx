import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '爸媽陪玩指南｜低年級怎麼陪孩子用冒險英語',
  description: '幼兒園到小二的孩子還不認字，需要爸媽坐在旁邊陪。每天 10 分鐘、三個動作、什麼時候可以放手，一頁看完。',
  alternates: { canonical: '/parents/companion' },
};

/**
 * 爸媽陪玩指南（Vega 2026-09-02）：給低年級家長的一頁式陪讀說明。
 * 放家長中心「補給站」與每關「給爸媽的說明」卡尾巴都連過來。內容要短、能立刻照做。
 */
export default function CompanionGuide() {
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <Link href="/parents" className="text-sm font-bold text-amber-700 no-underline">← 回家長冒險中心</Link>
        <h1 className="text-2xl sm:text-3xl font-black text-amber-900 mt-3 mb-2">爸媽陪玩指南</h1>
        <p className="text-gray-600 font-bold mb-6">幼兒園到小二的孩子還不認字、也還不習慣開口，前幾週需要你坐在旁邊。不用教英文，只要做對三件事。</p>

        <section className="ae-frame-parchment p-4 sm:p-5 mb-5">
          <h2 className="m-0 mb-2 font-black text-amber-900 text-lg">⏱ 每天 10 分鐘就好</h2>
          <ul className="m-0 pl-5 space-y-1 text-gray-700 leading-relaxed">
            <li>固定時段（睡前、晚餐後），一天一課或半課，寧可短、要每天。</li>
            <li>用平板或電腦，開喇叭，把手機收起來——你不分心，孩子才不分心。</li>
            <li>孩子想再看一次影片就讓他看，重複是低年級最有效的學法。</li>
          </ul>
        </section>

        <section className="ae-frame-parchment p-4 sm:p-5 mb-5">
          <h2 className="m-0 mb-2 font-black text-amber-900 text-lg">👐 三個動作</h2>
          <ol className="m-0 pl-5 space-y-2 text-gray-700 leading-relaxed">
            <li><b>他點什麼，你就跟著唸一次。</b>電子書裡點單字會唸單字、點句子會唸整句，唸到哪個字會亮黃色。你在旁邊小聲跟著唸，孩子自然會模仿你。</li>
            <li><b>答錯不糾正發音，只說「再聽一次」。</b>題目旁邊的 🔊 可以一直按。低年級的目標是「聽得懂」，不是唸得標準。</li>
            <li><b>過關就誇「具體的那一件事」。</b>不是「好棒」，而是「你剛剛 hi 唸得好清楚」「你自己找到 bye 了」。星星和徽章會自己出現，你負責說出他做對了什麼。</li>
          </ol>
        </section>

        <section className="ae-frame-parchment p-4 sm:p-5 mb-5">
          <h2 className="m-0 mb-2 font-black text-amber-900 text-lg">🧭 低年級的分工</h2>
          <ul className="m-0 pl-5 space-y-1 text-gray-700 leading-relaxed">
            <li><b>中文題目你讀，英文孩子聽。</b>字母島～學校路（L1–L4）題目會自動唸中文，聽不清楚你再讀一次。</li>
            <li><b>英文選項先按小喇叭聽，再讓他選。</b>不認字沒關係，這一關練的是耳朵。</li>
            <li><b>Your Turn 你先示範一次。</b>你唸一遍、他跟一遍再按麥克風；瀏覽器問「要允許麥克風嗎？」請按允許。念三次還不行會出現「先跳過」，不用卡在那裡。</li>
            <li><b>每一關上方有紫色「給爸媽的說明」卡</b>，寫這一關怎麼玩；看熟了可以按「以後不用顯示」。</li>
          </ul>
        </section>

        <section className="ae-frame-parchment p-4 sm:p-5 mb-5">
          <h2 className="m-0 mb-2 font-black text-amber-900 text-lg">🕊 什麼時候可以放手</h2>
          <ul className="m-0 pl-5 space-y-1 text-gray-700 leading-relaxed">
            <li>孩子開始自己點喇叭、自己翻頁，你就退到旁邊做自己的事，只在他叫你的時候過去。</li>
            <li>市場街（L3）起，題目和 Your Turn 變成整句，大多數孩子這時已經會自己玩了。</li>
            <li>家長中心的「學習報告」看得到他每天做了幾課、拿了幾顆星，不用盯著螢幕也知道進度。</li>
          </ul>
        </section>

        <section className="ae-frame-parchment p-4 sm:p-5 mb-8">
          <h2 className="m-0 mb-2 font-black text-amber-900 text-lg">❓ 常見狀況</h2>
          <ul className="m-0 pl-5 space-y-2 text-gray-700 leading-relaxed">
            <li><b>不肯開口：</b>先讓他只按喇叭聽、只點選項，麥克風那關按「我念完了」也可以。開口通常在第二、三週自己發生，不要逼。</li>
            <li><b>只想看影片：</b>可以。看完影片會有 5 題小挑戰才能翻書，他為了翻書會願意答。</li>
            <li><b>一直按錯：</b>大多是題目沒聽懂，你把中文題目再讀一次，或按 🔊 重播英文。</li>
            <li><b>唸了說不對：</b>語音辨識偶爾聽不清，再念一次即可；三次不過會讓他跳過，不會卡關。</li>
            <li><b>背景聲音吵：</b>電子書下方 🌿 按一下變 🔇 就關掉環境音。</li>
          </ul>
        </section>

        <div className="text-center">
          <Link href="/adventure-map" className="inline-block ae-btn ae-btn-gold ae-btn-md no-underline">開始今天的 10 分鐘 →</Link>
        </div>
      </div>
    </main>
  );
}

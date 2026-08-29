import Link from 'next/link';
import type { Metadata } from 'next';
import { RESEARCH_CONTACT, RESEARCH_PI, RETENTION_YEARS, SITE_NAME } from '@/lib/research';

export const metadata: Metadata = {
  title: '隱私權與資料使用說明 | 冒險英語',
  description: '冒險英語會收集什麼、不收集什麼、廣告與 Cookie 怎麼處理，以及學習資料用於學術研究的說明。',
};

// 隱私權政策。三個用途：AdSense 規定要有、家長會看、日後 IRB 送審附件。
// 寫法刻意白話，家長看得懂比法律用語漂亮重要。
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/parents" className="text-sm text-gray-500 hover:text-gray-700">← 回家長中心</Link>

        <h1 className="mt-4 text-2xl font-black text-gray-800">隱私權與資料使用說明</h1>
        <p className="mt-1 text-xs text-gray-400">最後更新：2026 年 8 月</p>

        <p className="mt-5 text-sm text-gray-600 leading-relaxed">
          {SITE_NAME} 是給孩子用的免費英語學習網站。
          孩子的資料很敏感，所以這頁把「我們拿了什麼、沒拿什麼」講清楚，
          不用法律術語堆字數。
        </p>

        <Section title="一、不需要註冊就能用">
          <p>
            全部課程不登入就可以玩。學習進度預設只存在你自己的裝置裡（瀏覽器的 localStorage），
            沒有送到任何地方。
          </p>
          <p>
            只有當你想讓孩子換手機、換平板也接得上進度，才需要用 Google 登入。
            登入時我們拿到的只有 email 和顯示名稱，用來認出是同一個帳號，不做別的事，
            也不會拿去寄行銷信。
          </p>
        </Section>

        <Section title="二、絕對不會收集的東西">
          <ul className="list-disc pl-5 space-y-1">
            <li>孩子的姓名、生日、學校、住址、電話</li>
            <li>孩子念英文時錄到的<strong>聲音內容</strong>——語音辨識在你的瀏覽器裡跑完就丟掉，只留下一個 0 到 1 的分數</li>
            <li>照片、影片、通訊錄</li>
          </ul>
          <p>
            麥克風只有在孩子自己按下「換我念」時才會啟動，
            而且只在那一句話的時間內開著。
          </p>
        </Section>

        <Section title="三、學習資料與學術研究（要你同意才會啟動）">
          <p>
            {SITE_NAME} 同時是一個<strong>研究場域</strong>，
            長期觀察「遊戲化設計如何幫助孩子持續學英文」。
            累積的資料一方面用來改善平台，一方面可能整理成研究成果對外發表。
          </p>
          <p>
            這件事<strong>預設是關閉的</strong>。你要在
            <Link href="/parents" className="underline"> 家長中心 </Link>
            自己打開，打開之前一筆紀錄都不會寫入。
          </p>
          <p className="font-bold text-gray-700">會記錄</p>
          <p>完成哪一課、花多少時間、答對答錯、重聽幾次音檔、口說分數。</p>
          <p className="font-bold text-gray-700">怎麼辨識是誰</p>
          <p>
            沒登入時只用一組隨機產生的代號認裝置，回頭對不出是哪一個人。
            有登入的話，紀錄會連到你的帳號代號（一串亂碼，不是 email），
            這樣孩子換裝置學習紀錄才接得起來。
            用研究倫理的講法：前者是<strong>匿名</strong>，後者是<strong>去識別化</strong>。
          </p>
          <p className="font-bold text-gray-700">發表時長什麼樣</p>
          <p>
            只會出現整體統計，不會出現任何一個孩子的個別紀錄。
          </p>
          <p className="font-bold text-gray-700">保存多久</p>
          <p>
            最多 {RETENTION_YEARS} 年，到期刪除。期間只有研究者本人存取得到，
            不提供給第三方，也不會用來投放廣告。
          </p>
          <p className="font-bold text-gray-700">怎麼撤回</p>
          <p>
            隨時在家長中心關掉，關掉立刻停止記錄。
            有登入的話還可以按「刪除已收集的學習紀錄」整批刪掉。
            沒登入的紀錄因為對不出是誰，技術上沒辦法指定刪除——這是匿名的代價，也是匿名的意義。
          </p>
          <p>
            刪除後只會留下一筆<strong>不含任何身分的退出紀錄</strong>：
            某天有一位參與者退出、當時完成幾課、做過前測沒有。
            研究報告必須寫出有多少人中途退出，不然剩下的樣本會系統性偏向撐得久的人，
            統計結果就失真了。這筆紀錄沒有代號、沒有帳號，回推不到任何人。
          </p>
          <p>
            另外要說清楚：若資料已經納入分析或已經對外發表，那部分<strong>無法回收</strong>。
            這是所有研究共通的限制。
          </p>
        </Section>

        <Section title="四、廣告與 Cookie">
          <p>
            這個網站是免費的，靠 Google AdSense 的廣告維持營運成本。
          </p>
          <p>
            我們把廣告設定成<strong>非個人化廣告</strong>，
            也就是廣告內容不會根據孩子的瀏覽行為調整。
            另外，<strong>孩子上課的頁面完全不放廣告</strong>——
            課程流程裡沒有載入任何廣告程式，
            廣告只出現在首頁、地圖、小屋這類頁面的最下方，不會擋住內容。
          </p>
          <p>
            Google 可能仍會為了計算廣告次數等目的使用 Cookie。
            你可以在
            {' '}
            <a className="underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google 廣告設定
            </a>
            {' '}
            調整。
          </p>
        </Section>

        <Section title="五、資料放在哪">
          <p>
            登入與進度資料存在 Supabase（資料庫服務），連線全程加密。
            音檔存在 Cloudflare R2。網站本身由 Cloudflare Pages 提供。
            這些服務可能位於台灣境外。
          </p>
        </Section>

        <Section title="六、家長的權利">
          <ul className="list-disc pl-5 space-y-1">
            <li>查詢我們有你孩子的哪些資料</li>
            <li>要求更正或刪除</li>
            <li>隨時撤回研究同意</li>
            <li>直接不登入使用，什麼都不留下</li>
          </ul>
        </Section>

        {(RESEARCH_PI || RESEARCH_CONTACT) && (
          <Section title="七、聯絡我們">
            {RESEARCH_PI && <p>負責人：{RESEARCH_PI}</p>}
            {RESEARCH_CONTACT && (
              <p>
                信箱：
                <a className="underline" href={`mailto:${RESEARCH_CONTACT}`}>{RESEARCH_CONTACT}</a>
              </p>
            )}
          </Section>
        )}

        <div className="mt-10">
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="text-base font-black text-gray-800 mb-2">{title}</h2>
      <div className="space-y-2 text-sm text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

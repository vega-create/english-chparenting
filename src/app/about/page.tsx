import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '關於作者｜薇佳媽媽（Vega）',
  alternates: { canonical: '/about' },
  description: '薇佳媽媽（Vega），兩個國小孩子的媽媽，曾任英語補教與國小代課教師，東海大學數位創新碩士學程畢業。冒險英語的內容都是她寫的。',
};

// 作者頁。主站／learn／品格站用同一份作者資料與同一份 Person 結構化資料，
// 讓搜尋引擎把四個網站的作者認成同一個人（只有 url 換成各站自己的作者頁）。
const AUTHOR_PHOTO = 'https://character.chparenting.com/src/img/author.jpg';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '薇佳媽媽',
  alternateName: 'Vega',
  url: 'https://english.chparenting.com/about',
  image: AUTHOR_PHOTO,
  email: 'mailto:hello@chparenting.com',
  description: '兩個國小孩子的媽媽，數位創新碩士，用故事陪孩子練習好品格',
  alumniOf: { '@type': 'CollegeOrUniversity', name: '東海大學數位創新碩士學程' },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: '經濟部 iPAS AI 應用規劃師（初級）', recognizedBy: { '@type': 'Organization', name: '經濟部產業人才能力鑑定' } },
    { '@type': 'EducationalOccupationalCredential', name: '資策會 生成式 AI 能力認證', recognizedBy: { '@type': 'Organization', name: '資訊工業策進會' } },
  ],
  knowsAbout: ['品格教育', '親子教育', '兒童英語教學', '數位創新', '生成式 AI'],
  worksFor: { '@type': 'Organization', name: '智慧媽咪國際有限公司', url: 'https://chparenting.com/' },
  sameAs: [
    'https://chparenting.com/',
    'https://english.chparenting.com/',
    'https://learn.chparenting.com/',
    'https://character.chparenting.com/about/',
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700">← 回學習文章</Link>

        <div className="mt-5 flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AUTHOR_PHOTO} alt="薇佳媽媽（Vega）" width={112} height={112} className="w-28 h-28 rounded-full object-cover shadow" />
          <div>
            <h1 className="text-2xl font-black text-gray-800">薇佳媽媽（Vega）</h1>
            <p className="mt-1 text-sm text-gray-500">兩個國小孩子的媽媽，數位創新碩士，用故事陪孩子練習好品格</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-700 leading-relaxed">
          薇佳媽媽（Vega），兩個國小孩子的媽媽（五年級、一年級）。曾任英語補教與國小代課教師，7 年數位行銷經驗，
          東海大學數位創新碩士學程畢業。經營 chparenting 親子網站、冒險英語兒童美語自學平台，以及「原來會這樣！」品格互動繪本。
        </p>

        <Section title="經歷">
          <li>曾任英語補習班教師</li>
          <li>曾任國小代課教師</li>
          <li>7 年數位行銷經驗</li>
          <li>經營 chparenting 親子網站、冒險英語兒童美語自學平台、「原來會這樣！」品格互動繪本</li>
        </Section>

        <Section title="學歷與證照">
          <li>東海大學數位創新碩士學程（碩士）畢業</li>
          <li>經濟部 iPAS AI 應用規劃師（初級）</li>
          <li>資策會 生成式 AI 能力認證</li>
        </Section>

        <p className="mt-6 text-sm text-gray-700">
          聯絡：<a href="mailto:hello@chparenting.com" className="text-purple-700 underline">hello@chparenting.com</a>
        </p>

        <p className="mt-6 text-sm text-gray-700 leading-relaxed">
          我也經營「原來會這樣！」品格互動繪本，用羊毛氈 3D 故事陪孩子練習好品格：
          <a href="https://character.chparenting.com/" className="text-purple-700 underline font-bold">看更多</a>
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="text-base font-black text-gray-800">{title}</h2>
      <ul className="mt-2 space-y-1.5 text-sm text-gray-700 leading-relaxed list-disc pl-5">{children}</ul>
    </section>
  );
}

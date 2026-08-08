import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Zen_Maru_Gothic, Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWA from "@/components/PWA";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

// 英文童趣圓體：電子書內文用（Zen Maru 的拉丁字偏一般，小朋友看不出差別）
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // 讓 env(safe-area-inset-*) 生效（手機瀏海/上下列）
  themeColor: "#FFF8EB", // 加到主畫面後的狀態列顏色
};

export const metadata: Metadata = {
  title: {
    default: "Adventure English 冒險英語 | 兒童美語互動自學平台",
    template: "%s | Adventure English 冒險英語",
  },
  description: "專為台灣 5-12 歲兒童設計的免費美語自學平台。AI 互動口說、Spelling Bee、錄音回放、遊戲化學習，從 ABC 到英檢初級 288 堂課完整旅程。",
  keywords: ["兒童英文", "兒童美語", "免費英文學習", "小學英文", "phonics", "KK音標", "英檢初級", "自然發音", "英語學習", "Adventure English"],
  icons: {
    icon: "/icon.png",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "冒險英語",
    statusBarStyle: "default",
  },
  metadataBase: new URL("https://english.chparenting.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Adventure English 冒險英語",
    locale: "zh_TW",
    type: "website",
    url: "https://english.chparenting.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const familySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://english.chparenting.com#website",
        name: "Adventure English 冒險英語",
        url: "https://english.chparenting.com",
        description: "專為台灣 5-12 歲兒童設計的免費美語自學平台。",
        inLanguage: "zh-TW",
        publisher: { "@id": "https://english.chparenting.com#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://english.chparenting.com#organization",
        name: "Adventure English 冒險英語",
        legalName: "Mommy Wisdom International LTD. 智慧媽咪國際有限公司",
        url: "https://english.chparenting.com",
        logo: {
          "@type": "ImageObject",
          url: "https://english.chparenting.com/icon.png",
        },
        founder: {
          "@type": "Person",
          name: "Vega Lin (薇佳)",
          jobTitle: "Founder",
          url: "https://chparenting.com/about/",
          description: "東海大學數位創新碩士在讀，8+ 年數位行銷經驗，前英文老師。",
          alumniOf: { "@type": "EducationalOrganization", name: "Tunghai University" },
        },
        parentOrganization: {
          "@type": "Organization",
          name: "媽媽生活復原力Lab",
          url: "https://chparenting.com",
        },
        sameAs: [
          "https://chparenting.com",
          "https://baby.chparenting.com",
          "https://pregnancy.chparenting.com",
          "https://learn.chparenting.com",
          "https://kids.chparenting.com",
          "https://mommystartup.com",
          "https://mommywisdom.tw",
          "https://aimommywisdom.com",
          "https://vega-note.com",
        ],
        knowsAbout: [
          "兒童英文",
          "兒童美語",
          "自然發音 Phonics",
          "KK音標",
          "英檢初級 GEPT",
          "Spelling Bee",
          "AI 互動口說",
        ],
      },
    ],
  };

  return (
    <html lang="zh-TW">
      <head>
        {/* AdSense 移到 <AutoAds /> — 只在家長／內容頁載入，課程區完全沒有廣告程式碼 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(familySchema) }}
        />
      </head>
      <body className={`${noto.variable} ${zenMaru.variable} ${baloo.variable} font-sans antialiased`}>
        <PWA />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

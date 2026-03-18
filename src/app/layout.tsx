import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Adventure English 冒險英語 | 兒童美語互動自學平台",
    template: "%s | Adventure English 冒險英語",
  },
  description: "專為台灣 5-12 歲兒童設計的免費美語自學平台。AI 互動口說、Spelling Bee、錄音回放、遊戲化學習，從 ABC 到英檢初級 288 堂課完整旅程。",
  keywords: ["兒童英文", "兒童美語", "免費英文學習", "小學英文", "phonics", "KK音標", "英檢初級", "自然發音", "英語學習", "Adventure English"],
  openGraph: {
    siteName: "Adventure English 冒險英語",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${noto.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Adventure English | \u5192\u96AA\u82F1\u8A9E - \u5152\u7AE5\u7F8E\u8A9E\u4E92\u52D5\u5B78\u7FD2\u5E73\u53F0",
  description: "\u5C08\u70BA\u53F0\u7063 5-12 \u6B72\u5152\u7AE5\u8A2D\u8A08\u7684\u514D\u8CBB\u7F8E\u8A9E\u81EA\u5B78\u5E73\u53F0\u3002AI \u4E92\u52D5\u53E3\u8AAA\u3001Spelling Bee\u3001\u9304\u97F3\u56DE\u653E\u3001\u904A\u6232\u5316\u5B78\u7FD2\uFF0C\u5F9E ABC \u5230\u82F1\u6AA2\u521D\u7D1A 288 \u5802\u8AB2\u5B8C\u6574\u65C5\u7A0B\u3002",
  keywords: ["\u5152\u7AE5\u82F1\u6587", "\u5152\u7AE5\u7F8E\u8A9E", "\u514D\u8CBB\u82F1\u6587\u5B78\u7FD2", "\u5C0F\u5B78\u82F1\u6587", "phonics", "KK\u97F3\u6A19", "\u82F1\u6AA2\u521D\u7D1A"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${noto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

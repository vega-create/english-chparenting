import type { Metadata } from "next";

// page.tsx 是 client component，metadata 放這裡
export const metadata: Metadata = {
  title: "成就徽章 - 冒險新手、拼讀達人到畢業勇者",
  description: "13 枚成就徽章：完成第一課、通關聲音島、收集 50 個單字、守島勝利……看看還差幾個就能開寶箱。",
  alternates: { canonical: "/badges" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

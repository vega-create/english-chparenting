import type { Metadata } from "next";

// page.tsx 是 client component，metadata 放這裡；/parents/companion 自己有 metadata 會覆蓋
export const metadata: Metadata = {
  // 子頁（世界／島／彩虹谷）也要接上站名後綴，所以這裡要連 template 一起宣告
  title: { default: "家長中心 - 孩子的學習進度、學習計畫與研究同意", template: "%s | Adventure English 冒險英語" },
  description: "看孩子完成幾課、幾顆星、連續幾天、走到哪座島；設定每週學習計畫、選擇起點、管理多個孩子與雲端同步。",
  alternates: { canonical: "/parents" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

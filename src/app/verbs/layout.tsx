import type { Metadata } from "next";

// page.tsx 是 client component，metadata 放這裡
export const metadata: Metadata = {
  title: "動詞變化表 - 常用英文動詞三態一覽",
  description: "課程裡出現的常用動詞：原形、過去式、過去分詞與中文意思，可點喇叭聽發音，複習時態時查一查。",
  alternates: { canonical: "/verbs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

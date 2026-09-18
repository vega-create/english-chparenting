import type { Metadata } from "next";

// page.tsx 是 client component，metadata 放這裡
export const metadata: Metadata = {
  title: "麥克風檢查 - 口說功能一鍵診斷",
  description: "口說練習沒反應？四層一鍵檢查：瀏覽器權限、麥克風裝置、語音辨識服務、網路，找出是哪一關卡住。",
  alternates: { canonical: "/mic-test" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

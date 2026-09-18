import type { Metadata } from "next";

// /home 與 / 是同一個元件；canonical 指回首頁，避免兩個網址被當成重複內容各自收錄
export const metadata: Metadata = {
  title: "冒險英語首頁 - 5-12 歲兒童免費美語冒險",
  description: "從字母島出發，跟著 Finn 和夥伴們闖 6 大世界、12 座島、240 堂課。AI 口說、遊戲化闖關，完全免費。",
  alternates: { canonical: "/" },
};

// 分層版 preview 自用 layout
export default function LayeredLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: `
        body header, body footer { display: none !important; }
        html, body { margin: 0; padding: 0; }
        main { padding: 0 !important; }
      `}} />
      {children}
    </div>
  );
}

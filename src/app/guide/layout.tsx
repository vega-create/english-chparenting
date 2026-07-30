import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用說明 - 如何使用 Adventure English 冒險英語",
  description: "Adventure English 冒險英語互動引導：認識學習流程、五位夥伴、獎勵系統，5 步驟帶你開始英語冒險。",
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
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

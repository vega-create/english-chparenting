import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的小屋 - 星星、寶石、單字收藏與冒險等級",
  description: "看看自己收集了幾顆星、幾顆寶石、學會幾個單字，還有目前的冒險等級與徽章。",
  alternates: { canonical: "/cabin" },
};

// 我的小屋：滿版底圖，隱藏站台預設 Header/Footer
export default function CabinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: `
        body header, body footer { display: none !important; }
        html, body { margin: 0; padding: 0; background: transparent; }
        main { padding: 0 !important; margin: 0 !important; }
      `}} />
      {children}
    </div>
  );
}

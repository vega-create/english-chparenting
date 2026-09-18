import type { Metadata } from "next";

export const metadata: Metadata = {
  // 子頁（世界／島／彩虹谷）也要接上站名後綴，所以這裡要連 template 一起宣告
  title: { default: "冒險地圖 - 6 大世界、12 座島嶼的英語闖關路線", template: "%s | Adventure English 冒險英語" },
  description: "彩虹谷、友善小鎮、海洋灣、故事城堡、探索大陸、冠軍峰——6 大世界 12 座島，完成前一關解鎖下一關，一路從 ABC 闖到英檢初級。",
  alternates: { canonical: "/adventure-map" },
};

// Adventure Map：隱藏網站預設 Header/Footer
export default function AdventureMapLayout({ children }: { children: React.ReactNode }) {
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

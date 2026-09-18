import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "單字接接樂 Word Catcher - 聽單字、接對圖的英文小遊戲",
  description: "聽到單字就接住對的圖！用學過的單字玩接接樂，邊玩邊複習聽力與字義。",
  alternates: { canonical: "/games/word-catcher" },
};

// 全螢幕小遊戲：隱藏全站 Header/Footer
export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: `
        body header, body footer { display: none !important; }
        html, body { margin: 0; padding: 0; overflow: hidden; }
        main { padding: 0 !important; }
      `}} />
      {children}
    </div>
  );
}

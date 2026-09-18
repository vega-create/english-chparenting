import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "打地鼠拼字 Word Whack - 聽音拼字的英文小遊戲",
  description: "地鼠冒出來就打對的字母！用打地鼠練聽音拼字，越打越快、單字越記越牢。",
  alternates: { canonical: "/games/word-whack" },
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

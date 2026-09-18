import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "選擇角色 - 挑一位小冒險家陪你闖關",
  description: "艾莉、小飛、可可、雷歐、薇拉，挑一位當你的冒險主角，之後在地圖上就是他陪你走每一關。",
  alternates: { canonical: "/choose-character" },
};

export default function ChooseLayout({ children }: { children: React.ReactNode }) {
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

import type { Metadata } from "next";
import { WORLDS } from "@/lib/progress";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const w = WORLDS.find(x => x.id === parseInt(id, 10));
  if (!w) return { title: "找不到這個世界" };
  const islands = w.lessons.filter(l => l.courseSlug).map(l => l.name).join("、");
  return {
    title: `${w.name} ${w.nameEn} - World ${w.id} 關卡地圖（${w.level}）`,
    description: `${w.name}有 ${islands} 兩座島、各 20 關，程度約 ${w.level}。完成前一關解鎖下一關，兩座島全破就能前往下一個世界。`,
    alternates: { canonical: `/adventure-map/world/${w.id}` },
  };
}

export default function WorldDetailLayout({ children }: { children: React.ReactNode }) {
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

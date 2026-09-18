import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "今日任務 - 每天三件事：開口說、讀故事、拼單字",
  description: "每天完成魔法咒語（開口說）、故事解謎（讀故事）、字母拼圖（拼單字）三個小任務，養成每日 10 分鐘的英文習慣。",
  alternates: { canonical: "/tasks" },
};

// 今日任務：滿版底圖，隱藏站台預設 Header/Footer
export default function TasksLayout({ children }: { children: React.ReactNode }) {
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

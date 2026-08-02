// 課程介紹頁：滿版底圖，隱藏站台預設 Header/Footer
export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: `
        body header, body footer { display: none !important; }
        html, body { margin: 0; padding: 0; background: transparent; }
        main { padding: 0 !important; margin: 0 !important; min-height: 100vh; }
      `}} />
      {children}
    </div>
  );
}

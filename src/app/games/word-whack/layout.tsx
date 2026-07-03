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

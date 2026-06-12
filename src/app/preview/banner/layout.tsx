// banner 預覽自用 layout（拿掉預設 Header 的空白 + 同步底色）
export default function BannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: `
        body header, body footer { display: none !important; }
        html, body { margin: 0; padding: 0; }
        body {
          background: linear-gradient(180deg,
            #b8e0ff 0%,
            #ffd8e6 35%,
            #fde1a8 65%,
            #3a2817 100%
          );
          min-height: 100vh;
        }
        main { padding: 0 !important; }
      `}} />
      {children}
    </div>
  );
}

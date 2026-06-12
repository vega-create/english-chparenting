import LayeredHome from "./home/page";

// 正式首頁 / = 飛船分層版（與 /home 同一個元件，單一來源）
// 套用與 home layout 相同的覆寫，隱藏全站預設 Header/Footer，視覺與 /home 一致
export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body header, body footer { display: none !important; }
        main { padding: 0 !important; }
      ` }} />
      <LayeredHome />
    </>
  );
}

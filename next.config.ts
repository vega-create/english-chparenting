import type { NextConfig } from "next";

// 建置當下的台北日期，烘進前後端共用的常數：文章「排程上架」用它判斷哪些文章已到期。
// 用建置日期而不是瀏覽器日期，才不會 server/client 不一致或連到還沒建出來的頁。
// 想預覽未來的文章：NEXT_PUBLIC_BUILD_DATE=2099-12-31 npm run build
const BUILD_DATE_TAIPEI = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Taipei" }); // YYYY-MM-DD

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BUILD_DATE: BUILD_DATE_TAIPEI },
};

export default nextConfig;

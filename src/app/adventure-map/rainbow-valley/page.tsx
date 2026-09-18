import RainbowValleyMap from "@/components/RainbowValleyMap";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "彩虹谷 · 字母島 20 關地圖",
  description: "冒險的起點：字母島 20 關，從 Hello 到 A–Z、大小寫、常見字與 a/an。完成一關解鎖下一關，通關後前往聲音島。",
  alternates: { canonical: "/adventure-map/rainbow-valley" },
};

export default function RainbowValleyPage() {
  return <RainbowValleyMap />;
}

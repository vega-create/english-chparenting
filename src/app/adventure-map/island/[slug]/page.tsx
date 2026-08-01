import IslandClient from "./IslandClient";

export const ISLANDS = [
  { slug: "sound-island",     zh: "聲音島", en: "Sound Island",     emoji: "🎵", world: "彩虹谷",   backHref: "/adventure-map/rainbow-valley" },
  { slug: "school-road",      zh: "學校路", en: "School Road",      emoji: "🏫", world: "友善小鎮", backHref: "/adventure-map/world/2" },
  { slug: "lighthouse-point", zh: "燈塔角", en: "Lighthouse Point", emoji: "🗼", world: "海洋灣",   backHref: "/adventure-map/world/3" },
  { slug: "question-tower",   zh: "問題塔", en: "Question Tower",   emoji: "❓", world: "故事城堡", backHref: "/adventure-map/world/4" },
  { slug: "future-bridge",    zh: "未來橋", en: "Future Bridge",    emoji: "🌉", world: "探索大陸", backHref: "/adventure-map/world/5" },
  { slug: "victory-peak",     zh: "勝利峰", en: "Victory Peak",     emoji: "🏔️", world: "冠軍峰",   backHref: "/adventure-map/world/6" },
];

export function generateStaticParams() {
  return ISLANDS.map(i => ({ slug: i.slug }));
}

export default async function IslandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const island = ISLANDS.find(i => i.slug === slug) ?? ISLANDS[0];
  return <IslandClient island={island} />;
}

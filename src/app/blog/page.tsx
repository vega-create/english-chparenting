import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import AutoAds from "@/components/AutoAds";

export const metadata: Metadata = {
  title: "英文學習文章 - 兒童英語學習技巧、書單、考試攻略",
  description: "精選兒童英語學習文章：Phonics 自然發音教學、口說練習方法、英文繪本推薦、全民英檢初級攻略、親子英文教養指南。適合 5-12 歲台灣家庭的英語教育資源。",
  alternates: {
    canonical: "https://english.chparenting.com/blog",
  },
  openGraph: {
    title: "英文學習文章 - 兒童英語學習技巧、書單、考試攻略",
    description: "精選兒童英語學習文章：Phonics 自然發音教學、口說練習方法、英文繪本推薦、全民英檢初級攻略、親子英文教養指南。",
    url: "https://english.chparenting.com/blog",
    siteName: "Adventure English 冒險英語",
    locale: "zh_TW",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <AutoAds />
      <BlogClient />
    </main>
  );
}

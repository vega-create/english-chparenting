import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "課程介紹 - 12 級完整英語學習課程",
  description: "Adventure English 冒險英語 6 座冒險島、12 級、240 堂課完整介紹。從字母認識到英檢初級，聽說讀寫四技能全面培養。",
};

export default function CoursesPage() {
  return <CoursesClient />;
}

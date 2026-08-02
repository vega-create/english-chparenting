"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { playClick } from "@/lib/sfx";

/**
 * 全站共用「回首頁」按鈕：木牌質感、會呼吸發光、hover 放大。
 * position 預設右上角固定；傳 "inline" 可嵌在版面裡。
 */
export default function HomeButton({ position = "fixed" }: { position?: "fixed" | "inline" }) {
  const base = position === "fixed"
    ? "fixed z-50"
    : "relative inline-block";
  const style = position === "fixed"
    ? { top: "calc(0.75rem + env(safe-area-inset-top))", right: "calc(0.75rem + env(safe-area-inset-right))" }
    : undefined;

  return (
    <Link href="/home" onClick={() => playClick()} className={`${base} no-underline group`} style={style} aria-label="回到首頁">
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        animate={{ boxShadow: [
          "0 4px 14px rgba(180,110,20,0.35)",
          "0 4px 22px rgba(255,190,60,0.6)",
          "0 4px 14px rgba(180,110,20,0.35)",
        ] }}
        transition={{ boxShadow: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } }}
        className="flex items-center gap-1.5 rounded-full border-[3px] border-amber-100/90 bg-gradient-to-b from-amber-400 via-orange-400 to-orange-500 px-4 py-1.5 sm:px-5 sm:py-2"
      >
        <span className="text-base sm:text-lg leading-none drop-shadow">🏠</span>
        <span className="font-black text-white whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(12px,1.15vw,17px)", textShadow: "0 1px 2px rgba(150,70,0,.55)" }}>
          回首頁
        </span>
      </motion.div>
    </Link>
  );
}

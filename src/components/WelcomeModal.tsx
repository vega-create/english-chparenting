"use client";
import { useEffect, useState } from "react";
import { playVega, stopVega, isMuted } from "@/lib/vega-audio";

const SEEN_KEY = "welcome-modal-seen";

const STEPS = [
  {
    audio: "guide-intro",
    icon: "👋",
    title: "歡迎來到冒險英語！",
    desc: "我來告訴你怎麼開始你的英語冒險。",
  },
  {
    audio: "guide-quickstart",
    icon: "🚀",
    title: "三步驟開始",
    desc: "1️⃣ 打開網站\n2️⃣ 選一隻寵物蛋\n3️⃣ 從第一個島嶼開始，跟朋友一起冒險！",
  },
  {
    audio: "guide-lesson-flow",
    icon: "📚",
    title: "每節課 18 分鐘",
    desc: "5 個步驟：熱身 → 學單詞 → 挑戰遊戲 → 對話 → 拿獎勵！",
  },
  {
    audio: "guide-step-3",
    icon: "🎮",
    title: "好玩的遊戲",
    desc: "聽力、拼字、連連看…超多遊戲讓你學會多少！",
  },
  {
    audio: "guide-rewards",
    icon: "🏆",
    title: "拿獎勵長大",
    desc: "答對拿星星、完成島嶼拿勳章、完成世界拿證書！寵物也會跟著長大！",
  },
];

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(SEEN_KEY)) {
      // 延遲 1.5 秒讓首頁先載入
      setTimeout(() => setOpen(true), 1500);
    }
  }, []);

  useEffect(() => {
    if (open && !isMuted()) playVega(STEPS[step].audio);
    return () => stopVega();
  }, [open, step]);

  function close() {
    localStorage.setItem(SEEN_KEY, "1");
    stopVega();
    setOpen(false);
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else close();
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  if (!open) return null;
  const cur = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={close}
          aria-label="關閉"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl text-gray-600 z-10"
        >
          ✕
        </button>

        {/* Vega character */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 pt-8 pb-4 px-6 text-center">
          <img
            src="/characters/vega/vega-read.png"
            alt="Vega"
            className="w-28 h-28 mx-auto object-contain animate-float"
          />
        </div>

        {/* Content */}
        <div className="px-8 py-6 text-center">
          <div className="text-5xl mb-3">{cur.icon}</div>
          <h2 className="text-2xl font-black text-gray-800 mb-3">{cur.title}</h2>
          <p className="text-gray-600 whitespace-pre-line leading-relaxed mb-2">
            {cur.desc}
          </p>

          {/* Replay button */}
          <button
            onClick={() => playVega(cur.audio)}
            className="text-sm text-purple-600 hover:text-purple-800 mt-2"
          >
            🔊 再聽一次
          </button>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 pb-4">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === step ? "bg-purple-500 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex border-t border-gray-100">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex-1 py-4 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition"
          >
            ← 上一步
          </button>
          <button
            onClick={next}
            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition"
          >
            {isLast ? "🚀 開始冒險" : "下一步 →"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { playClick, playStar, playSuccess, playSwoosh, playOpen } from "@/lib/sfx";
import { speak } from "@/lib/speech";
import { playPraise } from "@/lib/vega-audio";

/* ============================================================
   L1 ─ Rainbow Gate · 電子書翻頁式課程
   架構：Opening Story → Warm-up → Present → Practice → Close-up
   整合：Artistly（圖）+ VideoExpress（影片）+ VoiceClone（配音）
============================================================ */

// ===== 媒體資源清單（之後生成好把路徑換上來）=====
const MEDIA = {
  // 影片（之後用 VideoExpress 生成後放 public/lessons/L1/）
  V1_STORY:    "/lessons/L1/v1-story.mp4",       // 開場故事 45-60s
  V2_DIALOG:   "/lessons/L1/v2-dialog.mp4",      // Hello/Goodbye 對話 20-30s
  V3_SONG:     "/lessons/L1/v3-song.mp4",        // Hello song 30-45s
  V4_TEACH:    "/lessons/L1/v4-teach.mp4",       // 教學影片 45-60s
  // 音檔（VoiceClone 批次生成）
  A_HELLO:     "/lessons/L1/a-hello.mp3",
  A_GOODBYE:   "/lessons/L1/a-goodbye.mp3",
  A_RED:       "/lessons/L1/a-red.mp3",
  A_ORANGE:    "/lessons/L1/a-orange.mp3",
  A_YELLOW:    "/lessons/L1/a-yellow.mp3",
  A_GREEN:     "/lessons/L1/a-green.mp3",
  A_BLUE:      "/lessons/L1/a-blue.mp3",
  A_INDIGO:    "/lessons/L1/a-indigo.mp3",
  A_PURPLE:    "/lessons/L1/a-purple.mp3",
  A_SENT1:     "/lessons/L1/a-sent1.mp3",      // "Hello, I'm Vega."
  A_SENT2:     "/lessons/L1/a-sent2.mp3",      // "Goodbye, see you!"
  // 頁面圖（Artistly 生成）
  IMG_COVER:   "/lessons/L1/img-cover.png",
  IMG_VALLEY:  "/lessons/L1/img-valley.png",
  IMG_VEGA:    "/lessons/L1/img-vega.png",
  IMG_HELLO:   "/lessons/L1/img-hello.png",
  IMG_GOODBYE: "/lessons/L1/img-goodbye.png",
  IMG_RAINBOW: "/lessons/L1/img-rainbow.png",
  IMG_CABIN:   "/lessons/L1/img-cabin.png",
};

interface Props {
  lessonId: number;
}

export default function LessonClient({ lessonId }: Props) {
  const [pageIdx, setPageIdx] = useState(0);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");

  if (lessonId !== 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)" }}>
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border-4 border-amber-200">
          <div className="text-6xl mb-3">📖</div>
          <p className="text-2xl font-black text-amber-700 mb-2">L{lessonId} 教材編寫中</p>
          <p className="text-gray-600 mb-5">這本書還沒上架～請先看 L1！</p>
          <Link href="/adventure-map/rainbow-valley" className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-6 py-3 rounded-full no-underline">
            ← 回彩虹谷
          </Link>
        </div>
      </div>
    );
  }

  const pages = useMemo(() => buildL1Pages(), []);
  const totalPages = pages.length;
  const current = pages[pageIdx];

  function goNext() {
    if (pageIdx < totalPages - 1) {
      playSwoosh();
      setFlipDir("next");
      setPageIdx(pageIdx + 1);
    }
  }
  function goPrev() {
    if (pageIdx > 0) {
      playClick();
      setFlipDir("prev");
      setPageIdx(pageIdx - 1);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 select-none relative"
      style={{ background: "linear-gradient(135deg, #7c2d12 0%, #92400e 50%, #78350f 100%)" }}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 4px, rgba(0,0,0,0.05) 4px 5px), repeating-linear-gradient(0deg, transparent 0 50px, rgba(0,0,0,0.08) 50px 51px)`,
      }} />

      <Link
        href="/adventure-map/rainbow-valley"
        onClick={() => playClick()}
        className="fixed top-3 left-3 z-50 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 shadow-xl no-underline"
      >
        ← 離開閱讀
      </Link>

      <div className="fixed top-3 right-3 z-50 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black shadow-xl flex items-center gap-1.5">
        <span className="text-amber-700">{current.section}</span>
        <span className="text-gray-400">·</span>
        📖 <span className="text-amber-700">{pageIdx + 1}</span>/<span className="text-gray-600">{totalPages}</span>
      </div>

      <div className="relative w-full max-w-3xl" style={{ perspective: "2000px" }}>
        <div className="absolute -inset-4 bg-black/40 rounded-3xl blur-2xl" />

        <div
          className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            aspectRatio: "3 / 4",
            maxHeight: "calc(100vh - 80px)",
            backgroundImage: `radial-gradient(ellipse at top left, rgba(252,211,77,0.15) 0%, transparent 50%),
                              radial-gradient(ellipse at bottom right, rgba(180,83,9,0.1) 0%, transparent 50%)`,
          }}
        >
          {/* 裝訂線 */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 shadow-inner z-30">
            <div className="absolute inset-y-2 left-1 right-1 border-l border-amber-900/40" />
          </div>
          <div className="absolute top-0 left-3 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 z-20" />
          <div className="absolute bottom-0 left-3 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 z-20" />

          <div className="absolute inset-0 pl-5 pr-3 pt-6 pb-10 overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait" custom={flipDir}>
              <motion.div
                key={pageIdx}
                custom={flipDir}
                variants={{
                  enter: (d: "next" | "prev") => ({ rotateY: d === "next" ? 90 : -90, opacity: 0 }),
                  center: { rotateY: 0, opacity: 1 },
                  exit:   (d: "next" | "prev") => ({ rotateY: d === "next" ? -90 : 90, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="w-full h-full overflow-y-auto"
                style={{ backfaceVisibility: "hidden", transformOrigin: "center center" }}
              >
                {current.render({ onNext: goNext })}
              </motion.div>
            </AnimatePresence>
          </div>

          {pageIdx > 0 && (
            <motion.button onClick={goPrev} whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }}
              className="absolute bottom-3 left-7 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border-2 border-amber-300 text-amber-700 font-black text-lg flex items-center justify-center">‹</motion.button>
          )}
          {pageIdx < totalPages - 1 && (
            <motion.button onClick={goNext} whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }}
              animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
              className="absolute bottom-3 right-3 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl border-2 border-white text-white font-black text-lg flex items-center justify-center">›</motion.button>
          )}

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 text-[10px] sm:text-xs text-amber-800/70 font-bold italic">~ {pageIdx + 1} ~</div>

          {pageIdx > 0 && (
            <div className="absolute top-0 right-6 w-4 sm:w-6 z-30">
              <div className="bg-gradient-to-b from-red-500 to-red-700 h-10 sm:h-14 shadow-md" />
              <div className="bg-red-700" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)", height: "10px" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   定義 L1 的書頁陣列（按 5 大階段組織）
============================================================ */

interface Page {
  id: string;
  section: string;
  render: (api: { onNext: () => void }) => React.ReactNode;
}

function buildL1Pages(): Page[] {
  return [
    // === Opening (2 頁) ===
    { id: "cover",       section: "📖 OPENING",   render: ({ onNext }) => <PageCover onNext={onNext} /> },
    { id: "story-video", section: "🎬 STORY",     render: ({ onNext }) => <PageVideo onNext={onNext} src={MEDIA.V1_STORY} title="開場故事" desc="Miss Vega 帶你進入彩虹谷" duration="45-60 秒" /> },
    // === Warm-up (3 頁) ===
    { id: "warmup-dialog", section: "🔥 WARM-UP", render: ({ onNext }) => <PageVideo onNext={onNext} src={MEDIA.V2_DIALOG} title="日常對話" desc="兩個小朋友打招呼 Hello / Goodbye" duration="20-30 秒" /> },
    { id: "warmup-song",   section: "🔥 WARM-UP", render: ({ onNext }) => <PageVideo onNext={onNext} src={MEDIA.V3_SONG} title="Hello Song" desc="一起唱英文歌：Hello hello, how are you?" duration="30-45 秒" canSing /> },
    { id: "warmup-tpr",    section: "🔥 WARM-UP", render: ({ onNext }) => <PageWarmupTPR onNext={onNext} /> },
    // === Present (3 頁) ===
    { id: "present-teach", section: "📚 PRESENT", render: ({ onNext }) => <PageVideo onNext={onNext} src={MEDIA.V4_TEACH} title="Miss Vega 教學" desc="HELLO 怎麼唸、什麼時候用" duration="45-60 秒" /> },
    { id: "present-i-do",  section: "📚 PRESENT", render: ({ onNext }) => <PagePresentIdo onNext={onNext} /> },
    { id: "present-we-do", section: "📚 PRESENT", render: ({ onNext }) => <PagePresentWedo onNext={onNext} /> },
    // === Practice (5 頁) ===
    { id: "p1-pronounce",  section: "✏️ PRACTICE", render: ({ onNext }) => <PagePracticePronounce onNext={onNext} /> },
    { id: "p2-vocab",      section: "✏️ PRACTICE", render: ({ onNext }) => <PagePracticeVocab onNext={onNext} /> },
    { id: "p3-spelling",   section: "✏️ PRACTICE", render: ({ onNext }) => <PagePracticeSpelling onNext={onNext} /> },
    { id: "p4-sentence",   section: "✏️ PRACTICE", render: ({ onNext }) => <PagePracticeSentence onNext={onNext} /> },
    { id: "p5-reading",    section: "✏️ PRACTICE", render: ({ onNext }) => <PagePracticeReading onNext={onNext} /> },
    // === Close-up (3 頁) ===
    { id: "closeup-test",  section: "🎁 CLOSE-UP", render: ({ onNext }) => <PageCloseupTest onNext={onNext} /> },
    { id: "rewards",       section: "🎁 CLOSE-UP", render: ({ onNext }) => <PageRewards onNext={onNext} /> },
    { id: "cabin",         section: "🏠 CABIN",    render: () => <PageCabin /> },
  ];
}

/* ============================================================
   通用組件
============================================================ */

function ChapterHeader({ emoji, chapter, title }: any) {
  return (
    <div className="text-center mb-2 border-b-2 border-dashed border-amber-300 pb-2">
      <p className="text-[10px] text-amber-600 font-bold tracking-wider">{chapter}</p>
      <p className="text-base sm:text-lg font-black text-amber-900" style={{ fontFamily: "Georgia, serif" }}>
        <span className="mr-1">{emoji}</span>{title}
      </p>
    </div>
  );
}

function NextButton({ onClick, disabled, label = "繼續 →" }: any) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`w-full py-3 rounded-2xl font-black shadow text-sm sm:text-base ${
        disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white"
      }`}
    >{label}</motion.button>
  );
}

// 通用影片頁：影片檔存在就播真的 mp4，還沒生成就顯示 placeholder（仍可繼續課程）
function PageVideo({ onNext, src, title, desc, duration, canSing }: any) {
  const [played, setPlayed] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🎬" chapter="VIDEO" title={title} />

      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-600 mb-2 text-center">{desc}</p>

        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative mb-3">
          {!videoMissing ? (
            <video
              src={src}
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
              onPlay={() => { setPlayed(true); }}
              onEnded={() => { playSuccess(); setPlayed(true); }}
              onError={() => setVideoMissing(true)}
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 flex flex-col items-center justify-center">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-2">🎬</motion.div>
                <p className="text-white text-sm font-black">影片準備中</p>
                <p className="text-white/80 text-xs mt-1">{duration}</p>
              </div>
              <button
                onClick={() => { playOpen(); setPlayed(true); }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center text-3xl shadow-2xl">
                  {played ? "✓" : "▶"}
                </motion.div>
              </button>
            </>
          )}
        </div>

        {canSing && (
          <div className="bg-pink-50 border-l-4 border-pink-400 px-3 py-2 rounded text-xs text-pink-900 mb-2">
            🎤 <span className="font-bold">小提示：</span>跟著影片一起唱出來吧！
          </div>
        )}
      </div>

      <NextButton onClick={onNext} disabled={!played} label={played ? "看完了 →" : "👆 先按播放鍵"} />
    </div>
  );
}

// 通用 VoiceClone 音檔按鈕：先試播 src 音檔，檔案不存在就用 TTS 唸 tts 文字
function VoiceButton({ src, label, tts, onPlay, large }: any) {
  const [played, setPlayed] = useState(false);

  function playAudio() {
    let fellBack = false;
    const fallback = () => {
      if (fellBack) return;
      fellBack = true;
      if (tts) speak(tts);
    };
    const audio = new Audio(src);
    audio.onerror = fallback;
    audio.play().catch(fallback);
  }

  return (
    <motion.button
      onClick={() => { playOpen(); setPlayed(true); onPlay?.(); playAudio(); }}
      whileTap={{ scale: 0.92 }}
      className={`bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-black rounded-full shadow-lg inline-flex items-center gap-2 ${
        large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
      }`}
    >
      🔊 {played ? "✓ 已聽" : label}
    </motion.button>
  );
}

// 錄音按鈕（之後接 SpeechRecognition）
function RecordButton({ word, onDone, label = "🎤 跟著說一次" }: any) {
  const [recorded, setRecorded] = useState(false);
  return (
    <button
      onClick={() => { playSuccess(); setRecorded(true); onDone?.(); }}
      disabled={recorded}
      className={`px-6 py-3 rounded-full font-black shadow-lg ${
        recorded ? "bg-green-100 text-green-700" : "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
      }`}
    >
      {recorded ? `✓ 已說 "${word}"` : label}
    </button>
  );
}

/* ============================================================
   各頁面組件
============================================================ */

// === 1. 封面 ===
function PageCover({ onNext }: any) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-3 py-4">
      <p className="text-[10px] sm:text-xs text-amber-600 font-bold tracking-widest mb-2">📖 ADVENTURE BOOK</p>
      <div className="text-[10px] sm:text-xs text-amber-800/70 mb-1">第 一 課 · LESSON 1</div>
      <motion.div animate={{ rotate: [0, -5, 5, 0], y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}
        className="text-7xl sm:text-9xl mb-2">🌈</motion.div>
      <h1 className="text-3xl sm:text-5xl font-black text-amber-800 mb-1" style={{ fontFamily: "Georgia, serif" }}>Rainbow Gate</h1>
      <p className="text-base sm:text-lg text-amber-700 font-bold mb-4">彩虹入口</p>

      <div className="bg-white/70 border-2 border-amber-300 rounded-xl px-4 py-3 mb-5 max-w-xs text-left">
        <p className="text-xs text-amber-700 font-bold mb-2">📚 這課你會經歷</p>
        <ul className="text-xs text-amber-900 space-y-1">
          <li>🎬 看一段彩虹谷的故事</li>
          <li>🎵 學一首 Hello 歌</li>
          <li>👋 學會說 Hello / Goodbye</li>
          <li>🌈 認識 7 個彩虹顏色</li>
          <li>✏️ 5 種互動練習</li>
          <li>🎁 拿到第 1 個小屋裝飾</li>
        </ul>
      </div>

      <motion.button onClick={onNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 4px 12px rgba(180,83,9,0.3)", "0 8px 24px rgba(180,83,9,0.5)", "0 4px 12px rgba(180,83,9,0.3)"] }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-full text-base">
        翻開書頁 →
      </motion.button>
    </div>
  );
}

// === 5. Warm-up TPR ===
function PageWarmupTPR({ onNext }: any) {
  const ACTIONS = [
    { word: "Hello", emoji: "👋", action: "揮揮手" },
    { word: "Goodbye", emoji: "✋", action: "舉手再見" },
  ];
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🤸" chapter="WARM-UP · TPR" title="聽動作！" />
      <p className="text-center text-sm text-gray-600 mb-3">聽老師說，跟著做動作 + 唸出來 👇</p>

      <div className="flex-1 space-y-3 py-2">
        {ACTIONS.map((a, i) => (
          <div key={i} className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3">
            <div className="flex items-center gap-3 mb-2">
              <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-5xl">{a.emoji}</motion.div>
              <div className="flex-1">
                <p className="text-2xl font-black text-purple-800" style={{ fontFamily: "Georgia, serif" }}>{a.word}</p>
                <p className="text-xs text-gray-600">動作：{a.action}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <VoiceButton src={i === 0 ? MEDIA.A_HELLO : MEDIA.A_GOODBYE} tts={a.word} label={`聽 ${a.word}`} />
              <RecordButton word={a.word} onDone={() => setDone(new Set([...done, i]))} />
            </div>
          </div>
        ))}
      </div>

      <NextButton onClick={onNext} disabled={done.size < ACTIONS.length} label={done.size < ACTIONS.length ? `還有 ${ACTIONS.length - done.size} 個` : "都做完了 →"} />
    </div>
  );
}

// === 7. Present I do ===
function PagePresentIdo({ onNext }: any) {
  const [heard, setHeard] = useState(0);
  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="👩‍🏫" chapter="PRESENT · I do" title="老師示範" />

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: [0, 20, -20, 20, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className="text-9xl mb-3">👋</motion.div>
        <p className="text-5xl sm:text-7xl font-black text-purple-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>HELLO</p>
        <p className="text-xs text-gray-500 mb-1">/həˈloʊ/</p>
        <p className="text-sm text-gray-600 mb-4">哈囉 · 你好</p>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3 mb-4 max-w-sm text-center">
          <p className="text-xs text-purple-700 font-bold mb-1">👩‍🏫 Miss Vega 說：</p>
          <p className="text-sm text-gray-800">「聽我唸 3 次，仔細聽嘴型和音調～」</p>
        </div>

        <VoiceButton src={MEDIA.A_HELLO} tts="Hello" label={`聽 Hello (${heard}/3)`} onPlay={() => setHeard(h => h + 1)} large />
      </div>

      <NextButton onClick={onNext} disabled={heard < 3} label={heard < 3 ? `再聽 ${3 - heard} 次` : "聽完了 →"} />
    </div>
  );
}

// === 8. Present We do ===
function PagePresentWedo({ onNext }: any) {
  const [done, setDone] = useState(false);
  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🎤" chapter="PRESENT · We do" title="一起唸" />

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-8xl mb-3">👋</motion.div>
        <p className="text-5xl sm:text-6xl font-black text-purple-800 mb-3" style={{ fontFamily: "Georgia, serif" }}>HELLO</p>

        <div className="bg-pink-100 border-2 border-pink-300 rounded-2xl p-3 mb-4 max-w-sm text-center">
          <p className="text-xs text-pink-700 font-bold mb-1">👩‍🏫</p>
          <p className="text-sm text-gray-800">「跟著我說一次：Hello！按下麥克風自己說！」</p>
        </div>

        <RecordButton word="Hello" onDone={() => setDone(true)} label="🎤 按住說 Hello!" />
        <p className="text-[10px] text-gray-400 mt-2">🚧 錄音功能待開發</p>
      </div>

      <NextButton onClick={onNext} disabled={!done} label={done ? "說完了 →" : "先說一次 Hello"} />
    </div>
  );
}

// === 9. Practice 1: 發音練習 ===
function PagePracticePronounce({ onNext }: any) {
  const WORDS = [
    { word: "Hello",   audio: MEDIA.A_HELLO },
    { word: "Goodbye", audio: MEDIA.A_GOODBYE },
  ];
  const [scores, setScores] = useState<Record<string, number>>({});
  const allDone = WORDS.every(w => scores[w.word]);

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🎯" chapter="PRACTICE 1 / 5" title="發音練習" />
      <p className="text-center text-sm text-gray-600 mb-3">每個字練 1 次，AI 會評分（之後接）</p>

      <div className="flex-1 space-y-3 py-2">
        {WORDS.map((w, i) => (
          <div key={i} className="bg-white border-2 border-purple-200 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-black text-purple-800" style={{ fontFamily: "Georgia, serif" }}>{w.word}</p>
              {scores[w.word] && (
                <div className="text-yellow-500">{"⭐".repeat(scores[w.word])}</div>
              )}
            </div>
            <div className="flex gap-2">
              <VoiceButton src={w.audio} tts={w.word} label="聽範例" />
              <RecordButton word={w.word} label="🎤 我來唸" onDone={() => setScores({ ...scores, [w.word]: 2 + Math.floor(Math.random() * 2) })} />
            </div>
          </div>
        ))}
      </div>

      <NextButton onClick={onNext} disabled={!allDone} label={allDone ? "兩個都唸完 →" : "全部唸過才能繼續"} />
    </div>
  );
}

// === 10. Practice 2: 單字配對 ===
function PagePracticeVocab({ onNext }: any) {
  const PAIRS = [
    { emoji: "👋", word: "Hello", id: 1 },
    { emoji: "✋", word: "Goodbye", id: 2 },
    { emoji: "🌈", word: "Rainbow", id: 3 },
    { emoji: "🔴", word: "Red", id: 4 },
  ];
  const [matches, setMatches] = useState<Record<number, string>>({});
  const allMatched = Object.keys(matches).length === PAIRS.length && PAIRS.every(p => matches[p.id] === p.word);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  function tryMatch(word: string) {
    if (selectedEmoji === null) return;
    const p = PAIRS.find(x => x.id === selectedEmoji);
    if (p && p.word === word) {
      playSuccess();
      setMatches({ ...matches, [selectedEmoji]: word });
    } else {
      playClick();
    }
    setSelectedEmoji(null);
  }

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🧩" chapter="PRACTICE 2 / 5" title="單字配對" />
      <p className="text-center text-sm text-gray-600 mb-3">點圖再點對應的英文字</p>

      <div className="flex-1 grid grid-cols-2 gap-3 py-2">
        {/* 左：圖 */}
        <div className="space-y-2">
          {PAIRS.map(p => (
            <button
              key={p.id}
              onClick={() => { if (!matches[p.id]) { playClick(); setSelectedEmoji(p.id); } }}
              disabled={!!matches[p.id]}
              className={`w-full p-3 rounded-2xl border-2 text-4xl transition ${
                matches[p.id] ? "bg-green-100 border-green-400" :
                selectedEmoji === p.id ? "bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300" :
                "bg-white border-purple-200 hover:border-purple-400"
              }`}
            >{p.emoji}</button>
          ))}
        </div>
        {/* 右：字 */}
        <div className="space-y-2">
          {[...PAIRS].sort(() => 0.5 - Math.random()).map(p => {
            const used = Object.values(matches).includes(p.word);
            return (
              <button
                key={p.id}
                onClick={() => tryMatch(p.word)}
                disabled={used}
                className={`w-full p-3 rounded-2xl border-2 font-black transition ${
                  used ? "bg-green-100 border-green-400 text-green-700" : "bg-white border-purple-200 text-purple-700 hover:border-purple-400"
                }`}
                style={{ fontFamily: "Georgia, serif" }}
              >{p.word}</button>
            );
          })}
        </div>
      </div>

      <NextButton onClick={onNext} disabled={!allMatched} label={allMatched ? "全配對！→" : `已配 ${Object.keys(matches).length}/${PAIRS.length}`} />
    </div>
  );
}

// === 11. Practice 3: 拼字 ===
function PagePracticeSpelling({ onNext }: any) {
  const TARGETS = ["H", "E", "L", "L", "O"];
  const [order, setOrder] = useState<string[]>([]);
  // 打散的字母（含 distractor）
  const letters = ["L", "H", "O", "L", "E", "A"];
  const isCorrect = order.length === TARGETS.length && order.every((c, i) => c === TARGETS[i]);

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🔤" chapter="PRACTICE 3 / 5" title="拼字：HELLO" />
      <p className="text-center text-sm text-gray-600 mb-3">點字母按順序拼出 HELLO</p>

      <div className="flex justify-center gap-2 mb-4">
        {TARGETS.map((_, i) => (
          <div key={i} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black ${
            order[i] ? (order[i] === TARGETS[i] ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700") : "bg-white border-dashed border-gray-300 text-gray-300"
          }`}>{order[i] || "_"}</div>
        ))}
      </div>

      <div className="flex-1 flex flex-wrap justify-center gap-2 items-start py-3">
        {letters.map((c, i) => {
          // 計算這個字母在 letters 中第幾次出現，跟 order 中相同字母的使用次數比
          const usedCount = order.filter(o => o === c).length;
          const availableCount = letters.filter(l => l === c).length;
          const indexBefore = letters.slice(0, i).filter(l => l === c).length;
          const isUsed = indexBefore < usedCount;
          return (
            <motion.button
              key={i}
              onClick={() => { if (!isUsed && order.length < TARGETS.length) { playClick(); setOrder([...order, c]); }}}
              disabled={isUsed || order.length >= TARGETS.length}
              whileHover={!isUsed ? { y: -3, scale: 1.05 } : {}}
              whileTap={{ scale: 0.92 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-2xl font-black shadow-lg border-2 ${
                isUsed ? "bg-gray-200 text-gray-400 border-gray-300" : "bg-gradient-to-br from-amber-300 to-orange-400 text-white border-white"
              }`}
            >{c}</motion.button>
          );
        })}
      </div>

      <div className="flex gap-2 mb-2">
        <button onClick={() => { playClick(); setOrder([]); }} className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm">🔄 重來</button>
        <VoiceButton src={MEDIA.A_HELLO} tts="Hello" label="聽答案" />
      </div>

      <NextButton onClick={onNext} disabled={!isCorrect} label={isCorrect ? "拼對了！→" : `已拼 ${order.length}/${TARGETS.length}`} />
    </div>
  );
}

// === 12. Practice 4: 句型 ===
function PagePracticeSentence({ onNext }: any) {
  const QUESTIONS = [
    { q: "____, I'm Anna.", options: ["Hello", "Goodbye"], answer: "Hello" },
    { q: "____, see you tomorrow!", options: ["Hello", "Goodbye"], answer: "Goodbye" },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const allCorrect = answers.length === QUESTIONS.length;

  function pick(opt: string) {
    if (opt === QUESTIONS[step].answer) {
      playStar();
      setAnswers([...answers, step]);
      if (step < QUESTIONS.length - 1) setTimeout(() => setStep(step + 1), 600);
    } else playClick();
  }

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="📝" chapter="PRACTICE 4 / 5" title="句型練習" />
      <p className="text-center text-sm text-gray-600 mb-3">選對的字填入空格</p>

      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-2xl sm:text-3xl text-center text-purple-800 font-black mb-6" style={{ fontFamily: "Georgia, serif" }}>
          {QUESTIONS[step].q.split("____").map((p, i, arr) => (
            <span key={i}>
              {p}
              {i < arr.length - 1 && <span className="inline-block w-20 h-1 bg-purple-300 mx-2" />}
            </span>
          ))}
        </p>

        <div className="flex gap-3 w-full">
          {QUESTIONS[step].options.map(opt => (
            <button key={opt} onClick={() => pick(opt)}
              className="flex-1 py-4 bg-white border-2 border-purple-200 hover:border-purple-400 text-purple-700 font-black rounded-2xl shadow active:scale-95"
              style={{ fontFamily: "Georgia, serif" }}
            >{opt}</button>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1 my-2">
        {QUESTIONS.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < answers.length ? "bg-green-500" : i === step ? "bg-yellow-400" : "bg-gray-200"}`} />)}
      </div>

      <NextButton onClick={onNext} disabled={!allCorrect} label={allCorrect ? "完美！→" : `第 ${step + 1}/${QUESTIONS.length} 題`} />
    </div>
  );
}

// === 13. Practice 5: 朗讀 ===
function PagePracticeReading({ onNext }: any) {
  const SENTENCES = [
    "Hello, I'm Vega.",
    "Goodbye, see you!",
  ];
  const [read, setRead] = useState<Set<number>>(new Set());

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="📖" chapter="PRACTICE 5 / 5" title="朗讀練習" />
      <p className="text-center text-sm text-gray-600 mb-3">看著句子大聲唸出來</p>

      <div className="flex-1 space-y-3 py-2">
        {SENTENCES.map((s, i) => (
          <div key={i} className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
            <p className="text-xl sm:text-2xl text-center text-amber-900 font-black mb-3" style={{ fontFamily: "Georgia, serif" }}>"{s}"</p>
            <div className="flex gap-2 justify-center">
              <VoiceButton src={i === 0 ? MEDIA.A_SENT1 : MEDIA.A_SENT2} tts={s} label="聽範例" />
              <RecordButton word={s} label="🎤 我來唸" onDone={() => setRead(new Set([...read, i]))} />
            </div>
          </div>
        ))}
      </div>

      <NextButton onClick={onNext} disabled={read.size < SENTENCES.length} label={read.size < SENTENCES.length ? `還有 ${SENTENCES.length - read.size} 句` : "都唸完 →"} />
    </div>
  );
}

// === 14. Close-up：綜合測驗 ===
function PageCloseupTest({ onNext }: any) {
  const QUESTIONS = [
    { q: "選對應的字：揮手打招呼", options: ["👋 Hello", "✋ Goodbye"], answer: 0 },
    { q: "What color is fire?", options: ["🔴 Red", "🔵 Blue"], answer: 0 },
    { q: "離開教室會說：", options: ["Hello", "Goodbye"], answer: 1 },
  ];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const done = step >= QUESTIONS.length;

  function pick(i: number) {
    if (i === QUESTIONS[step].answer) { playStar(); setScore(score + 1); }
    else playClick();
    setTimeout(() => setStep(step + 1), 500);
  }

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🏆" chapter="CLOSE-UP · 綜合測驗" title="What did you learn?" />

      {!done ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-xs text-purple-500 mb-2">Question {step + 1} of {QUESTIONS.length}</p>
          <p className="text-lg font-black text-purple-800 text-center mb-5">{QUESTIONS[step].q}</p>
          <div className="space-y-2 w-full">
            {QUESTIONS[step].options.map((opt, i) => (
              <button key={i} onClick={() => pick(i)}
                className="w-full py-3 bg-white border-2 border-purple-200 hover:border-purple-400 text-purple-700 font-black rounded-2xl shadow active:scale-95 text-base"
                style={{ fontFamily: "Georgia, serif" }}
              >{opt}</button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1 flex flex-col items-center justify-center">
          <div className="text-7xl mb-3">{score === QUESTIONS.length ? "🎉" : score >= 2 ? "👏" : "💪"}</div>
          <p className="text-2xl font-black text-purple-700">{score} / {QUESTIONS.length}</p>
          <p className="text-sm text-gray-600 mt-1">{score === QUESTIONS.length ? "完美通關！" : score >= 2 ? "不錯喔！" : "下次更好！"}</p>
        </motion.div>
      )}

      <NextButton onClick={onNext} disabled={!done} label={done ? "領獎勵 🎁" : `第 ${step + 1}/${QUESTIONS.length} 題`} />
    </div>
  );
}

// === 15. 解鎖獎勵 ===
function PageRewards({ onNext }: any) {
  const REWARDS = [
    { emoji: "🌈", name: "彩虹寶石", desc: "窗台上閃閃發光" },
    { emoji: "🪧", name: "Welcome 木牌", desc: "掛在小屋門口" },
    { emoji: "🧸", name: "小精靈玩偶", desc: "坐在沙發上" },
  ];
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed < REWARDS.length) {
      const t = setTimeout(() => { playOpen(); setRevealed(r => r + 1); }, 800);
      return () => clearTimeout(t);
    } else {
      playPraise('low');
      try {
        const cur = parseInt(localStorage.getItem("rainbowValleyProgress") || "1", 10);
        if (1 >= cur) localStorage.setItem("rainbowValleyProgress", "2");
        const cabin = JSON.parse(localStorage.getItem("myCabin") || "[]");
        REWARDS.forEach(r => { if (!cabin.find((x: any) => x.name === r.name)) cabin.push({ ...r, fromLesson: 1 }); });
        localStorage.setItem("myCabin", JSON.stringify(cabin));
      } catch {}
    }
  }, [revealed]);

  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🎁" chapter="REWARD" title="Lesson Complete!" />

      <div className="flex justify-center gap-2 mb-3">
        {[0,1,2].map(i => (
          <motion.div key={i} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 + i * 0.2, type: "spring" }}
            className="text-4xl sm:text-5xl">⭐</motion.div>
        ))}
      </div>

      <div className="flex-1 space-y-2 py-2">
        {REWARDS.map((r, i) => (
          <motion.div key={i} initial={{ x: 50, opacity: 0 }} animate={i < revealed ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-3 flex items-center gap-3 shadow">
            <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-4xl">{r.emoji}</motion.div>
            <div className="flex-1">
              <p className="font-black text-amber-900">{r.name}</p>
              <p className="text-xs text-amber-700">{r.desc}</p>
            </div>
            <div className="text-green-600 font-black text-xl">✓</div>
          </motion.div>
        ))}
      </div>

      {revealed >= REWARDS.length && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <NextButton onClick={onNext} label="🏠 看看我的小屋" />
        </motion.div>
      )}
    </div>
  );
}

// === 16. 我的小屋 ===
function PageCabin() {
  return (
    <div className="h-full flex flex-col px-2">
      <ChapterHeader emoji="🏠" chapter="THE END" title="My Cabin" />

      <div className="relative bg-gradient-to-b from-sky-100 via-amber-50 to-green-100 rounded-2xl flex-1 mb-3 overflow-hidden border-2 border-amber-200">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-7xl sm:text-9xl">🏠</div>
        {[
          { emoji: "🌈", left: "20%", top: "25%" },
          { emoji: "🪧", left: "50%", top: "55%" },
          { emoji: "🧸", left: "75%", top: "30%" },
        ].map((r, i) => (
          <motion.div key={i} initial={{ y: -50, opacity: 0 }} animate={{ y: [0, -5, 0], opacity: 1 }}
            transition={{ y: { duration: 2, repeat: Infinity, delay: i * 0.3 } }}
            className="absolute text-4xl sm:text-5xl" style={{ left: r.left, top: r.top }}>{r.emoji}</motion.div>
        ))}
        <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded">🚧 小屋圖待生成</div>
      </div>

      <p className="text-center text-sm text-gray-700 mb-3">小屋多了 3 個新寶物！🎉</p>

      <div className="space-y-2">
        <Link href="/adventure-map/rainbow-valley" onClick={() => playStar()}
          className="block w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-black rounded-2xl shadow-lg no-underline active:scale-95">
          🌈 回彩虹谷地圖
        </Link>
        <Link href="/adventure-map/rainbow-valley/lesson/2" onClick={() => playSwoosh()}
          className="block w-full py-2.5 bg-white border-2 border-purple-300 text-purple-700 text-center font-black rounded-2xl shadow no-underline active:scale-95 text-sm">
          ▶ 直接挑戰 L2
        </Link>
      </div>
    </div>
  );
}

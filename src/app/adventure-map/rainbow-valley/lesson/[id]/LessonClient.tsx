"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { playClick, playStar, playSuccess, playSwoosh, playOpen } from "@/lib/sfx";
import { speak, speakChinese } from "@/lib/speech";
import { playPraise } from "@/lib/vega-audio";

/* ============================================================
   音檔播放：優先播你的 ElevenLabs 檔；檔案不存在才暫時用瀏覽器語音頂著
   （把 mp3 放進 public/lessons/L1/ 後，電子音就會自動被真人聲取代）
============================================================ */
const AUDIO_BASE = "/lessons/L1";
function playLine(file?: string, fallbackText?: string, lang: "en" | "zh" = "en") {
  const tts = () => { if (fallbackText) (lang === "zh" ? speakChinese : speak)(fallbackText); };
  if (!file) { tts(); return; }
  let fell = false;
  const fb = () => { if (fell) return; fell = true; tts(); };
  const audio = new Audio(`${AUDIO_BASE}/${file}`);
  audio.onerror = fb;
  audio.play().catch(fb);
}

/* ============================================================
   L1 ─ 彩虹谷：認識新朋友（對話闖關遊戲）
   像點擊冒險／視覺小說：角色說話 → 小孩回應 → 角色反應 + 獎勵
   資料驅動（NODES），方便之後量產更多課
============================================================ */

// 場景背景圖（生成好放 public/lessons/L1/ 自動套用，沒有就用漸層）
const SCENE_IMG: Record<string, string> = {
  gate:   "/lessons/L1/img-valley.png",
  meadow: "/lessons/L1/img-rainbow.png",
  sunset: "/lessons/L1/img-cabin.png",
};
const SCENE_SKY: Record<string, string> = {
  gate:   "linear-gradient(180deg,#7dd3fc 0%,#c4b5fd 50%,#fbcfe8 100%)",
  meadow: "linear-gradient(180deg,#a5f3fc 0%,#d9f99d 55%,#fef9c3 100%)",
  sunset: "linear-gradient(180deg,#818cf8 0%,#f0abfc 50%,#fed7aa 100%)",
};

// 角色立繪（用現有 /characters/*）
const sprite = (key: string, action = "talk") => `/characters/${key}/${key}-${action}.png`;

// ---- 對話闖關的節點 ----
type Node =
  | { kind: "say"; scene: string; speaker: string; key: string; action?: string; zh: string; en?: string }
  | { kind: "mission"; scene: string; title: string; goal: string; stars: number }
  | { kind: "greet"; scene: string; npc: string; npcKey: string; bubble: string; bubbleZh: string; teachZh: string; reply: string; replyZh: string }
  | { kind: "choose"; scene: string; speaker: string; key: string; questionZh: string; options: { label: string; correct: boolean }[]; hintZh: string }
  | { kind: "speak"; scene: string; speaker: string; key: string; phrase: string; phraseZh: string; promptZh: string }
  | { kind: "complete"; scene: string };

const NODES: Node[] = [
  { kind: "say", scene: "gate", speaker: "Finn", key: "finn", action: "wave",
    zh: "嗨！歡迎來到彩虹谷！我是 Finn 🦊", en: "Hi! Welcome to Rainbow Valley!" },
  { kind: "say", scene: "gate", speaker: "Finn", key: "finn", action: "talk",
    zh: "今天我們要去認識新朋友，學會用英文打招呼！", en: "Let's make new friends today!" },
  { kind: "mission", scene: "gate", title: "認識新朋友", goal: "跟 3 個朋友打招呼，集滿友誼星 ⭐", stars: 3 },

  { kind: "greet", scene: "meadow", npc: "Coco", npcKey: "coco",
    bubble: "Hello!", bubbleZh: "哈囉！", teachZh: "Coco 跟你說 Hello！換你跟她說 Hello 👋",
    reply: "Hello!", replyZh: "哈囉！" },

  { kind: "greet", scene: "meadow", npc: "Polly", npcKey: "polly",
    bubble: "Hi! I'm Polly!", bubbleZh: "嗨！我是 Polly！", teachZh: "Polly 也來了！跟她說 Hi 吧 🦜",
    reply: "Hi!", replyZh: "嗨！" },

  { kind: "choose", scene: "meadow", speaker: "Finn", key: "finn",
    questionZh: "天黑了，Benny 要回家了 🐻 你要跟他說什麼？",
    options: [{ label: "Hello", correct: false }, { label: "Goodbye", correct: true }],
    hintZh: "離開的時候要說 Goodbye 喔！" },

  { kind: "speak", scene: "sunset", speaker: "Finn", key: "finn",
    phrase: "Goodbye!", phraseZh: "再見！", promptZh: "按麥克風，跟 Benny 說 Goodbye 👋" },

  { kind: "complete", scene: "sunset" },
];

interface Props { lessonId: number }

export default function LessonClient({ lessonId }: Props) {
  const [idx, setIdx] = useState(0);
  const [stars, setStars] = useState(0);

  if (lessonId !== 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: SCENE_SKY.gate }}>
        <div className="bg-white/85 backdrop-blur rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center">
          <div className="text-6xl mb-3">🗺️</div>
          <p className="text-2xl font-black text-purple-700 mb-2">L{lessonId} 冒險還在準備</p>
          <p className="text-gray-600 mb-5">這關還沒開放～先玩 L1！</p>
          <Link href="/adventure-map/rainbow-valley" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-6 py-3 rounded-full no-underline shadow-lg">
            ← 回彩虹谷
          </Link>
        </div>
      </div>
    );
  }

  const node = NODES[idx];
  const totalStars = NODES.find(n => n.kind === "mission") as Extract<Node, { kind: "mission" }> | undefined;
  const goalStars = totalStars?.stars ?? 3;

  const next = useCallback((earned = 0) => {
    if (earned) setStars(s => Math.min(s + earned, goalStars));
    setIdx(i => Math.min(i + 1, NODES.length - 1));
  }, [goalStars]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 場景背景 */}
      <SceneBg sceneKey={node.scene} />

      {/* 頂部 HUD */}
      <div className="absolute top-0 inset-x-0 z-40 flex items-center justify-between p-3">
        <Link href="/adventure-map/rainbow-valley" onClick={() => playClick()}
          className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-purple-700 shadow-lg no-underline">
          ← 離開
        </Link>
        {idx >= 2 && (
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
            <span className="text-xs font-black text-purple-700">友誼星</span>
            {Array.from({ length: goalStars }).map((_, i) => (
              <motion.span key={i} animate={i < stars ? { scale: [1, 1.4, 1] } : {}} className={`text-base ${i < stars ? "" : "grayscale opacity-40"}`}>⭐</motion.span>
            ))}
          </div>
        )}
      </div>

      {/* 內容節點 */}
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0">
          {node.kind === "say" && <SayNode node={node} onNext={() => { playSwoosh(); next(); }} />}
          {node.kind === "mission" && <MissionNode node={node} onNext={() => { playOpen(); next(); }} />}
          {node.kind === "greet" && <GreetNode node={node} onDone={() => next(1)} />}
          {node.kind === "choose" && <ChooseNode node={node} onDone={() => next(1)} />}
          {node.kind === "speak" && <SpeakNode node={node} onDone={() => next(1)} />}
          {node.kind === "complete" && <CompleteNode stars={stars} goalStars={goalStars} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================================ 場景背景
   漸層永遠當底層；場景圖載入成功才淡入蓋上（404 就維持漸層卡通場景） */
function SceneBg({ sceneKey }: { sceneKey: string }) {
  const [loaded, setLoaded] = useState(false);
  const img = SCENE_IMG[sceneKey];

  // 換場景時重置
  useEffect(() => { setLoaded(false); }, [sceneKey]);

  return (
    <div className="absolute inset-0">
      {/* 底層漸層天空 */}
      <div className="absolute inset-0" style={{ background: SCENE_SKY[sceneKey] || SCENE_SKY.gate }} />

      {/* 卡通場景裝飾（圖還沒載入時顯示） */}
      {!loaded && (
        <>
          {[["10%", "14%", 1], ["64%", "9%", 1.3], ["38%", "22%", .8]].map(([l, t, s], i) => (
            <motion.div key={i} className="absolute text-5xl opacity-80" style={{ left: l as string, top: t as string, scale: s as number }}
              animate={{ x: [0, 16, 0] }} transition={{ duration: 8 + i * 2, repeat: Infinity }}>☁️</motion.div>
          ))}
          {["12%", "30%", "55%", "78%", "90%"].map((l, i) => (
            <motion.div key={i} className="absolute text-xl" style={{ left: l, top: `${8 + (i % 3) * 6}%` }}
              animate={{ opacity: [.2, .9, .2] }} transition={{ duration: 2.5 + i * .3, repeat: Infinity }}>✨</motion.div>
          ))}
          <div className="absolute -bottom-12 -left-10 w-3/4 h-44 rounded-[100%] bg-emerald-300/70" />
          <div className="absolute -bottom-16 -right-12 w-3/4 h-48 rounded-[100%] bg-green-400/60" />
        </>
      )}

      {/* 場景圖：載入成功才淡入；404 維持隱形（不顯示破圖） */}
      {img && (
        <img src={img} alt="" onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`} />
      )}

      {/* 圖上柔光暗角，讓文字浮起來 */}
      {loaded && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.15) 0%,transparent 30%,transparent 50%,rgba(0,0,0,.4) 100%)" }} />
      )}
    </div>
  );
}

/* ============================================================ 語音對話泡泡（打字機 + 自動發音） */
function SpeechBubble({ speaker, zh, en, autoSpeakEn, onTyped }: { speaker: string; zh: string; en?: string; autoSpeakEn?: boolean; onTyped?: () => void }) {
  const [shown, setShown] = useState("");
  const spoke = useRef(false);

  useEffect(() => {
    setShown("");
    spoke.current = false;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(zh.slice(0, i));
      if (i >= zh.length) {
        clearInterval(id);
        onTyped?.();
        if (autoSpeakEn && en && !spoke.current) { spoke.current = true; setTimeout(() => speak(en.replace(/[!?.,]/g, "")), 200); }
      }
    }, 45);
    return () => clearInterval(id);
  }, [zh, en, autoSpeakEn, onTyped]);

  return (
    <div className="bg-white/92 backdrop-blur-md rounded-[1.6rem] rounded-bl-md px-5 py-4 shadow-2xl">
      <p className="text-[11px] font-black text-purple-500 mb-1">{speaker}</p>
      <p className="text-lg font-black text-gray-800 leading-snug min-h-[2.5rem]">{shown}<span className="animate-pulse">|</span></p>
      {en && <p className="text-sm font-bold text-sky-500 mt-1.5 italic">{en}</p>}
    </div>
  );
}

/* ============================================================ 角色立繪 */
function Hero({ k, action = "talk", flip, className = "" }: { k: string; action?: string; flip?: boolean; className?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) return <div className={`text-[7rem] ${className}`}>🦊</div>;
  return (
    <motion.img
      src={sprite(k, action)} alt={k} onError={() => setMissing(true)}
      animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
      className={`object-contain drop-shadow-2xl ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    />
  );
}

function BigButton({ onClick, disabled, children, tone = "primary" }: any) {
  const tones: Record<string, string> = {
    primary: "bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white ring-2 ring-white/70",
    ghost: "bg-white/90 text-purple-700 ring-1 ring-purple-100",
  };
  return (
    <motion.button onClick={onClick} disabled={disabled} whileHover={disabled ? {} : { scale: 1.03 }} whileTap={disabled ? {} : { scale: 0.96 }}
      className={`w-full py-4 rounded-full font-black text-base shadow-xl transition ${disabled ? "bg-white/50 text-gray-400" : tones[tone]}`}>
      {children}
    </motion.button>
  );
}

/* ============================================================ 節點：say */
function SayNode({ node, onNext }: { node: Extract<Node, { kind: "say" }>; onNext: () => void }) {
  const [typed, setTyped] = useState(false);
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 max-w-lg mx-auto w-full">
      <div className="flex items-end gap-2 mb-3">
        <Hero k={node.key} action={node.action || "talk"} className="w-36 h-36 flex-shrink-0" />
        <div className="flex-1 pb-2">
          <SpeechBubble speaker={node.speaker} zh={node.zh} en={node.en} autoSpeakEn onTyped={() => setTyped(true)} />
        </div>
      </div>
      <BigButton onClick={onNext} disabled={!typed}>{typed ? "繼續 →" : "…"}</BigButton>
    </div>
  );
}

/* ============================================================ 節點：mission card */
function MissionNode({ node, onNext }: { node: Extract<Node, { kind: "mission" }>; onNext: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <motion.div initial={{ scale: 0.6, rotate: -6, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white/92 backdrop-blur-md rounded-[2rem] p-7 max-w-sm w-full shadow-2xl text-center ring-4 ring-amber-300/60">
        <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-2">🎯</motion.div>
        <p className="text-xs font-black tracking-widest text-amber-500 mb-1">NEW MISSION · 新任務</p>
        <h2 className="text-2xl font-black text-purple-800 mb-3">{node.title}</h2>
        <div className="bg-amber-50 rounded-2xl px-4 py-3 mb-5">
          <p className="font-bold text-gray-700">{node.goal}</p>
        </div>
        <BigButton onClick={onNext}>開始任務 🚀</BigButton>
      </motion.div>
    </div>
  );
}

/* ============================================================ 節點：greet（NPC 打招呼，小孩回應） */
function GreetNode({ node, onDone }: { node: Extract<Node, { kind: "greet" }>; onDone: () => void }) {
  const [stage, setStage] = useState<"npc" | "reply" | "win">("npc");
  const [burst, setBurst] = useState(false);

  // NPC 出場先說它的話（英文發音）
  useEffect(() => {
    if (stage === "npc") { const t = setTimeout(() => speak(node.bubble.replace(/[!?.,]/g, "")), 600); return () => clearTimeout(t); }
  }, [stage, node.bubble]);

  function reply() {
    playStar(); setBurst(true);
    speak(node.reply.replace(/[!?.,]/g, ""));
    setStage("win");
    setTimeout(() => { playPraise("low"); }, 700);
    setTimeout(onDone, 1900);
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 max-w-lg mx-auto w-full">
      {burst && <StarBurst />}

      {/* NPC */}
      <div className="flex items-end gap-2 mb-2">
        <motion.div animate={stage === "win" ? { rotate: [0, -12, 12, 0], y: [0, -18, 0] } : {}} transition={{ duration: .6, repeat: stage === "win" ? 2 : 0 }}>
          <Hero k={node.npcKey} action={stage === "win" ? "wave" : "talk"} className="w-32 h-32 flex-shrink-0" />
        </motion.div>
        <div className="flex-1 pb-2">
          <div className="bg-white/92 backdrop-blur rounded-[1.4rem] rounded-bl-md px-4 py-3 shadow-xl inline-block">
            <p className="text-[11px] font-black text-purple-500 mb-0.5">{node.npc}</p>
            <p className="text-lg font-black text-gray-800">{node.bubble}</p>
            <p className="text-xs font-bold text-gray-400">{node.bubbleZh}</p>
          </div>
        </div>
      </div>

      {/* Finn 引導 + 回應按鈕 */}
      {stage !== "win" ? (
        <div className="bg-white/92 backdrop-blur-md rounded-[1.6rem] p-4 shadow-2xl">
          <p className="text-sm font-bold text-gray-600 text-center mb-3">{node.teachZh}</p>
          <motion.button onClick={reply} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 4px 14px rgba(236,72,153,.35)", "0 8px 26px rgba(236,72,153,.6)", "0 4px 14px rgba(236,72,153,.35)"] }}
            transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-black text-xl ring-2 ring-white/70 shadow-xl">
            👋 {node.reply}
          </motion.button>
          <p className="text-center text-xs text-gray-400 mt-2">點一下，跟 {node.npc} 說 {node.reply}</p>
        </div>
      ) : (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50/95 backdrop-blur rounded-[1.6rem] p-4 shadow-2xl text-center ring-2 ring-green-300">
          <p className="text-xl font-black text-green-600">🎉 友誼星 +1！</p>
          <p className="text-sm font-bold text-gray-600 mt-1">{node.npc} 很開心認識你！</p>
        </motion.div>
      )}
    </div>
  );
}

/* ============================================================ 節點：choose（情境選擇） */
function ChooseNode({ node, onDone }: { node: Extract<Node, { kind: "choose" }>; onDone: () => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [burst, setBurst] = useState(false);
  const correctIdx = node.options.findIndex(o => o.correct);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (node.options[i].correct) {
      playStar(); setBurst(true);
      speak(node.options[i].label.replace(/[!?.,]/g, ""));
      setTimeout(() => { playPraise("low"); }, 600);
      setTimeout(onDone, 1800);
    } else {
      playClick();
      setTimeout(() => setPicked(null), 900);
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 max-w-lg mx-auto w-full">
      {burst && <StarBurst />}
      <div className="flex items-end gap-2 mb-3">
        <Hero k={node.key} action="talk" className="w-32 h-32 flex-shrink-0" />
        <div className="flex-1 pb-2">
          <div className="bg-white/92 backdrop-blur rounded-[1.4rem] rounded-bl-md px-4 py-3 shadow-xl">
            <p className="text-[11px] font-black text-purple-500 mb-0.5">{node.speaker}</p>
            <p className="text-base font-black text-gray-800">{node.questionZh}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {node.options.map((o, i) => {
          const isPicked = picked === i;
          const showCorrect = picked !== null && o.correct;
          const showWrong = isPicked && !o.correct;
          return (
            <motion.button key={o.label} onClick={() => pick(i)} whileTap={{ scale: 0.95 }}
              className={`py-5 rounded-2xl font-black text-xl shadow-xl transition ring-2 ${
                showCorrect ? "bg-green-100 ring-green-400 text-green-700 scale-105" :
                showWrong ? "bg-red-100 ring-red-300 text-red-500" :
                "bg-white/92 ring-white text-purple-700"
              }`}>
              {o.label}
            </motion.button>
          );
        })}
      </div>
      {picked !== null && !node.options[picked].correct && (
        <p className="text-center text-sm font-bold text-rose-500 mt-3 bg-white/80 rounded-full py-1.5">💡 {node.hintZh}</p>
      )}
    </div>
  );
}

/* ============================================================ 節點：speak（跟讀，麥克風） */
function SpeakNode({ node, onDone }: { node: Extract<Node, { kind: "speak" }>; onDone: () => void }) {
  const [said, setSaid] = useState(false);
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 max-w-lg mx-auto w-full">
      {said && <StarBurst />}
      <div className="flex items-end gap-2 mb-3">
        <Hero k={node.key} action="wave" className="w-32 h-32 flex-shrink-0" />
        <div className="flex-1 pb-2">
          <div className="bg-white/92 backdrop-blur rounded-[1.4rem] rounded-bl-md px-4 py-3 shadow-xl">
            <p className="text-[11px] font-black text-purple-500 mb-0.5">{node.speaker}</p>
            <p className="text-base font-black text-gray-800">{node.promptZh}</p>
          </div>
        </div>
      </div>
      <div className="bg-white/92 backdrop-blur-md rounded-[1.6rem] p-5 shadow-2xl text-center">
        <p className="text-4xl font-black text-purple-800">{node.phrase}</p>
        <p className="text-sm font-bold text-gray-400 mb-4">{node.phraseZh}</p>
        <div className="flex gap-2 justify-center mb-4">
          <button onClick={() => speak(node.phrase.replace(/[!?.,]/g, ""))}
            className="px-5 py-2.5 rounded-full bg-sky-400 text-white font-black text-sm shadow-lg ring-2 ring-white/60">🔊 聽範例</button>
        </div>
        {!said ? (
          <motion.button onClick={() => { playSuccess(); setSaid(true); speak(node.phrase.replace(/[!?.,]/g, "")); setTimeout(() => playPraise("low"), 700); setTimeout(onDone, 1900); }}
            whileTap={{ scale: 0.94 }}
            animate={{ scale: [1, 1.05, 1] }} transition={{ scale: { duration: 1.2, repeat: Infinity } }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-lg shadow-xl ring-2 ring-white/70">
            🎤 按住說 {node.phrase}
          </motion.button>
        ) : (
          <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-xl font-black text-green-600">🎉 說得很棒！友誼星 +1</motion.p>
        )}
      </div>
    </div>
  );
}

/* ============================================================ 節點：complete（過關慶祝） */
function CompleteNode({ stars, goalStars }: { stars: number; goalStars: number }) {
  useEffect(() => {
    playSuccess();
    setTimeout(() => playPraise("low"), 500);
    try {
      const cur = parseInt(localStorage.getItem("rainbowValleyProgress") || "1", 10);
      if (cur < 2) localStorage.setItem("rainbowValleyProgress", "2");
    } catch {}
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <StarBurst big />
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white/92 backdrop-blur-md rounded-[2rem] p-7 max-w-sm w-full shadow-2xl text-center ring-4 ring-amber-300/60">
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-1">🏆</motion.div>
        <h2 className="text-2xl font-black text-purple-800 mb-1">任務完成！</h2>
        <p className="text-sm font-bold text-gray-500 mb-4">你在彩虹谷交到了新朋友 🎉</p>

        {/* 五夥伴慶祝列 */}
        <div className="flex justify-center -space-x-2 mb-4">
          {["finn", "coco", "polly", "benny", "ruby"].map((k, i) => (
            <motion.img key={k} src={sprite(k, "wave")} alt={k}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              animate={{ y: [0, -8, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
              className="w-14 h-14 object-contain drop-shadow-lg" />
          ))}
        </div>

        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: goalStars }).map((_, i) => (
            <motion.span key={i} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3 + i * 0.2, type: "spring" }} className="text-4xl">
              {i < stars ? "⭐" : "☆"}
            </motion.span>
          ))}
        </div>

        <div className="space-y-2">
          <Link href="/adventure-map/rainbow-valley/lesson/2" onClick={() => playSwoosh()}
            className="block w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-black text-base shadow-xl ring-2 ring-white/70 no-underline active:scale-95">
            ▶ 下一個冒險 L2
          </Link>
          <Link href="/adventure-map/rainbow-valley" onClick={() => playStar()}
            className="block w-full py-3 rounded-full bg-white/85 text-purple-700 font-black text-sm shadow no-underline active:scale-95">
            🌈 回彩虹谷地圖
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================ 星星爆發特效 */
function StarBurst({ big }: { big?: boolean }) {
  const items = big ? 14 : 8;
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
      {Array.from({ length: items }).map((_, i) => {
        const ang = (i / items) * Math.PI * 2;
        const dist = big ? 180 : 120;
        return (
          <motion.span key={i} className="absolute text-2xl"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
            animate={{ x: Math.cos(ang) * dist, y: Math.sin(ang) * dist, opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeOut" }}>
            {["⭐", "✨", "💫", "🌟"][i % 4]}
          </motion.span>
        );
      })}
    </div>
  );
}

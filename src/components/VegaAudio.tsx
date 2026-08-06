"use client";
import { useEffect, useState } from "react";
import { playWelcomeIfFirstTime, isMuted, setMuted, playVega, WORLD_AUDIO, ISLAND_AUDIO, VEGA_INTRO_AUDIO, CHAR_INTRO_AUDIO } from "@/lib/vega-audio";

/** 任何位置的「🔊 聽 Vega 介紹」按鈕 */
export function VegaPlayButton({
  audio,
  label = "🔊",
  className = "",
  style,
}: { audio: string; label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); playVega(audio); }}
      title="點擊聽介紹"
      style={style}
      className={`bg-white/90 hover:bg-white border border-purple-200 hover:border-purple-400 rounded-full text-sm shadow-sm transition active:scale-95 ${className}`}
    >
      {label}
    </button>
  );
}

/** 世界介紹按鈕（依索引） */
export function WorldPlayButton({ worldIndex, className = "", style }: { worldIndex: number; className?: string; style?: React.CSSProperties }) {
  const keys = Object.keys(WORLD_AUDIO);
  const audio = WORLD_AUDIO[keys[worldIndex]];
  if (!audio) return null;
  return <VegaPlayButton audio={audio} className={className} style={style} />;
}

/** 島嶼介紹按鈕（依關卡編號 1-12） */
export function IslandPlayButton({ level, className = "", style }: { level: number; className?: string; style?: React.CSSProperties }) {
  const keys = Object.keys(ISLAND_AUDIO);
  const audio = ISLAND_AUDIO[keys[level - 1]];
  if (!audio) return null;
  return <VegaPlayButton audio={audio} className={className} style={style} />;
}

/** 角色介紹（先放 Vega 中文介紹再播角色英文自介） */
export function CharacterPlayButton({ characterKey, className = "", style }: { characterKey: string; className?: string; style?: React.CSSProperties }) {
  const vegaIntro = VEGA_INTRO_AUDIO[characterKey];
  const charIntro = CHAR_INTRO_AUDIO[characterKey];
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (vegaIntro) await playVega(vegaIntro);
        if (charIntro) playVega(charIntro);
      }}
      title="聽介紹"
      style={style}
      className={`bg-white/90 hover:bg-white border border-purple-200 hover:border-purple-400 rounded-full text-sm shadow-sm transition active:scale-95 ${className}`}
    >
      🔊
    </button>
  );
}

/** 自動播 welcome（首次訪問） */
export function VegaWelcomeOnMount() {
  useEffect(() => {
    playWelcomeIfFirstTime();
  }, []);
  return null;
}

/** 全域靜音切換按鈕 */
export function VegaMuteButton({ className = "" }: { className?: string }) {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
  }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) playVega("01-welcome");
  };

  return (
    <button
      onClick={toggle}
      title={muted ? "開啟語音" : "關閉語音"}
      className={`text-xl bg-white/80 hover:bg-white border border-slate-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition ${className}`}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}

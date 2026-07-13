"use client";
import { useState, useMemo } from "react";
import { VERBS, type Verb } from "@/data/verbs";
import { speak } from "@/lib/speech";

type Filter = "all" | "irregular" | "regular";

export default function VerbsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return VERBS.filter(v => {
      if (filter === "irregular" && v.reg) return false;
      if (filter === "regular" && !v.reg) return false;
      if (!kw) return true;
      return v.base.includes(kw) || v.past.toLowerCase().includes(kw) || v.pp.toLowerCase().includes(kw) || v.zh.includes(kw);
    });
  }, [q, filter]);

  const irregCount = VERBS.filter(v => !v.reg).length;
  const regCount = VERBS.length - irregCount;

  function sayAll(v: Verb) {
    const forms = `${v.base}, ${v.past.replace(" / ", " ")}, ${v.pp}`;
    speak(forms, 0.75);
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">📖</div>
          <h1 className="text-3xl md:text-4xl font-black mb-1">
            <span className="gradient-text">動詞三態表</span>
          </h1>
          <p className="text-gray-500">原形 → 過去式 → 過去分詞 ｜ 點 🔊 聽發音</p>
        </div>

        {/* 搜尋 + 篩選 */}
        <div className="sticky top-16 z-20 bg-white/85 backdrop-blur rounded-2xl shadow-md p-3 mb-4 border border-gray-100">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="🔍 搜尋動詞（英文或中文，如 go、吃）"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-base"
          />
          <div className="flex gap-2 mt-3 justify-center flex-wrap">
            {([
              ["all", `全部 ${VERBS.length}`],
              ["irregular", `不規則 ${irregCount}`],
              ["regular", `規則 ${regCount}`],
            ] as [Filter, string][]).map(([f, label]) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-black transition ${
                  filter === f ? "bg-purple-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-purple-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 說明 */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><i className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block" />不規則（要背）</span>
          <span className="flex items-center gap-1"><i className="w-3 h-3 rounded bg-green-100 border border-green-300 inline-block" />規則（加 -ed）</span>
        </div>

        {/* 表頭（桌機） */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_1.2fr_44px] gap-2 px-4 py-2 text-xs font-black text-gray-400">
          <span>原形 base</span><span>過去式 past</span><span>過去分詞 p.p.</span><span>中文</span><span></span>
        </div>

        {/* 清單 */}
        <div className="space-y-2">
          {list.map(v => (
            <div
              key={v.base}
              className={`grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1.2fr_44px] gap-x-2 gap-y-1 items-center rounded-xl px-4 py-3 shadow-sm border ${
                v.reg ? "bg-green-50/60 border-green-100" : "bg-amber-50/60 border-amber-100"
              }`}
            >
              <button onClick={() => speak(v.base, 0.6)} className="text-left font-black text-lg text-purple-700 hover:underline">{v.base}</button>
              <button onClick={() => speak(v.past.replace(" / ", " "), 0.6)} className={`text-left font-bold ${v.reg ? "text-gray-700" : "text-amber-700"} hover:underline`}>{v.past}</button>
              <button onClick={() => speak(v.pp, 0.6)} className={`text-left font-bold ${v.reg ? "text-gray-700" : "text-amber-700"} hover:underline`}>{v.pp}</button>
              <span className="text-sm text-gray-500 col-span-2 sm:col-span-1">{v.zh}</span>
              <button onClick={() => sayAll(v)} className="justify-self-end w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition" title="唸三態">🔊</button>
            </div>
          ))}
          {list.length === 0 && (
            <p className="text-center text-gray-400 py-10">找不到「{q}」這個動詞，換個字試試 🔍</p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          共 {VERBS.length} 個常用動詞 ｜ 不規則動詞務必背熟三態！
        </p>
      </div>
    </main>
  );
}

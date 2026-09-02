'use client';
import { useEffect, useState } from 'react';

/**
 * 給爸媽的說明卡（Vega 2026-09-02）：低年級（L1–L4）每個關卡上方先用中文寫「這一關怎麼玩」，
 * 讓爸媽讀給孩子聽。可以關掉（記在 localStorage，之後不再自動出現），關掉後留一顆小按鈕隨時再打開。
 */
const KEY = 'ae_parent_help';
const MAX_LEVEL = 4;

const TEXT: Record<string, { title: string; lines: string[] }> = {
  discover: {
    title: '這一關怎麼玩：看故事',
    lines: [
      '① 先看 40 秒動畫，看完按「先來個小挑戰」。',
      '② 小挑戰 5 題：聽到什麼字就點那個字；不會讀的選項先按旁邊的 🔊 聽一聽。',
      '③ 翻書：點「單字」會唸那個字，點「句子」會唸整句（唸到哪個字會亮黃色）。',
      '④ Listen & Say 點喇叭聽句子；Magic Words 點字聽發音；Your Turn 按麥克風跟著唸。',
      '⑤ 🐢 是慢速再聽一次；「中」會顯示中文翻譯。多玩幾課孩子就知道怎麼點了。',
    ],
  },
  challenge: {
    title: '這一關怎麼玩：闖關題',
    lines: [
      '① 每一題出現時會先唸出中文題目，聽力題再按 🔊 播放音檔。',
      '② 選項右上角的小喇叭可以先聽這個字的發音，再決定要不要選（點喇叭不算作答）。',
      '③ 答對得一顆星；答錯沒關係，會顯示正確答案再進下一題。',
      '④ 孩子還不認字的話，爸媽把題目讀給他聽就好，這一關練的是「聽懂」。',
    ],
  },
  talktime: {
    title: '這一關怎麼玩：開口說',
    lines: [
      '① 先聽角色說一句，然後按麥克風，讓孩子照著說。',
      '② 瀏覽器如果問「要允許使用麥克風嗎？」請按允許。',
      '③ 念得夠像就過關；聽不清楚可以再念一次，念三次還不行會出現「先跳過」。',
      '④ 這台裝置沒有麥克風的話，會改成「我念完了」按鈕，孩子念完按一下就好。',
    ],
  },
};

export default function ParentHelp({ stage, level }: { stage: keyof typeof TEXT; level: number }) {
  const [off, setOff] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { setOff(localStorage.getItem(KEY) === 'off'); } catch { setOff(false); }
  }, []);

  if (level > MAX_LEVEL || off === null) return null;
  const t = TEXT[stage];
  if (!t) return null;

  const show = !off || open;
  if (!show) {
    return (
      <div className="flex justify-end mb-2">
        <button onClick={() => setOpen(true)}
          className="text-xs font-bold text-purple-500 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 hover:bg-purple-100">
          📖 給爸媽的說明
        </button>
      </div>
    );
  }
  return (
    <div className="mb-4 rounded-2xl border-2 border-purple-200 bg-purple-50/90 px-4 py-3 text-sm text-gray-700 max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="m-0 font-black text-purple-600">📖 {t.title}</p>
        <div className="flex gap-2 text-xs font-bold">
          {open && <button onClick={() => setOpen(false)} className="text-gray-500 hover:underline">收起</button>}
          {!off && (
            <button
              onClick={() => { try { localStorage.setItem(KEY, 'off'); } catch {} setOff(true); setOpen(false); }}
              className="text-gray-500 hover:underline"
            >以後不用顯示</button>
          )}
        </div>
      </div>
      <ul className="m-0 pl-0 list-none space-y-1 leading-snug">
        {t.lines.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <p className="m-0 mt-2 text-xs">
        <a href="/parents/companion" target="_blank" rel="noopener" className="font-bold text-purple-600 underline">爸媽怎麼陪？看陪玩指南 →</a>
      </p>
    </div>
  );
}

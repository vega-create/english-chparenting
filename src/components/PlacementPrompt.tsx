'use client';
import { useEffect, useState } from 'react';
import GameButton from '@/components/GameButton';
import { needsPretest, canPosttest, improvement, POSTTEST_AFTER } from '@/lib/placement';
import { loadProgress, completedCount } from '@/lib/missionProgress';

/**
 * 起點測驗的入口卡。
 *
 * 三種狀態：
 *   還沒做前測      → 邀請做起點測驗
 *   上滿 20 課      → 邀請複測（有前測才比得了）
 *   前後測都做完    → 顯示進步幅度
 * 都不符合就整個不顯示，不佔版面。
 *
 * 刻意不強制擋在課程前面：孩子點進來是想玩的，先擋一份考卷會直接流失。
 * 願意做的人資料才乾淨，被逼著亂按的資料反而是雜訊。
 */
export default function PlacementPrompt() {
  const [state, setState] = useState<'none' | 'pre' | 'post' | 'result'>('none');
  const [imp, setImp] = useState<{ pre: number; post: number; total: number } | null>(null);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const n = completedCount(loadProgress());
    setDoneCount(n);
    const r = improvement();
    if (r) { setImp(r); setState('result'); return; }
    if (needsPretest()) { setState('pre'); return; }
    if (canPosttest(n)) { setState('post'); return; }
    setState('none');
  }, []);

  if (state === 'none') return null;

  if (state === 'result' && imp) {
    const diff = imp.post - imp.pre;
    return (
      <Card>
        <p className="font-black text-gray-800">📈 你的進步</p>
        <p className="mt-1 text-sm text-gray-600">
          起點 {imp.pre} 分 → 現在 {imp.post} 分（滿分 {imp.total}）
          {diff > 0 && <strong className="text-green-600">，進步 {diff} 題！</strong>}
        </p>
      </Card>
    );
  }

  if (state === 'post') {
    return (
      <Card sticker="/images/ui/sticker-puppy.webp">
        <p className="font-black text-gray-800">🔁 上滿 {POSTTEST_AFTER} 課了，再測一次？</p>
        <p className="mt-1 text-sm text-gray-600">
          用一模一樣的 10 題，看看跟起點比進步多少。
        </p>
        <div className="mt-3"><GameButton href="/placement" color="purple" size="sm" sound="click">開始複測</GameButton></div>
      </Card>
    );
  }

  return (
    <Card sticker="/images/ui/sticker-puppy.webp">
      <p className="font-black text-gray-800">🧭 先做個起點測驗？</p>
      <p className="mt-1 text-sm text-gray-600">
        10 題、3 分鐘，記下你現在的程度。之後再測一次，就看得出自己進步多少。
        {doneCount > 0 && '（已經上過課也可以做，還是比得出來。）'}
      </p>
      <div className="mt-3"><GameButton href="/placement" color="purple" size="sm" sound="click">開始測驗</GameButton></div>
    </Card>
  );
}

/* 羊皮紙面板（畫的框），右下角可以站一隻貼紙角色 */
function Card({ sticker, children }: { sticker?: string; children: React.ReactNode }) {
  return (
    <section className="ae-frame-parchment my-5 relative">
      <div className={sticker ? 'pr-20 sm:pr-32' : ''}>{children}</div>
      {sticker && (
        <img src={sticker} alt="" className="absolute right-1 bottom-1 w-20 sm:w-28 object-contain drop-shadow" />
      )}
    </section>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import GameButton from '@/components/GameButton';
import { playClick } from '@/lib/sfx';
import { loadProgress, completedCount, totalStars } from '@/lib/missionProgress';

/**
 * 登入引導。
 *
 * 訴求刻意只講**真的成立**的那一件事：不登入的話，清掉瀏覽器資料
 * 星星和關卡就全部歸零。這不是話術，是真的會發生。
 *
 * 研究上為什麼重要：`device_id` 存在 localStorage，被清掉就換一組新的，
 * 同一個孩子會被算成好幾個人，縱貫分析直接失真。登入才接得起來。
 *
 * 三個不打擾的原則：
 *   1. 有東西可以失去才提（至少完成 1 課），一進站就要人登入很討厭
 *   2. 關掉之後隔 7 天才會再出現
 *   3. 永遠可以關掉，不擋任何功能
 */

const SNOOZE_KEY = 'ae_login_nudge_snooze';
const SNOOZE_DAYS = 7;

export default function LoginNudge({ variant = 'card' }: { variant?: 'card' | 'inline' }) {
  const { user, loading, signIn } = useAuth();
  const [show, setShow] = useState(false);
  const [stars, setStars] = useState(0);
  const [lessons, setLessons] = useState(0);

  useEffect(() => {
    if (loading || user) return;
    const p = loadProgress();
    const done = completedCount(p);
    if (done < 1) return;                       // 還沒有東西可以失去，先不吵
    try {
      const until = Number(localStorage.getItem(SNOOZE_KEY) || 0);
      if (Date.now() < until) return;
    } catch { return; }
    setLessons(done);
    setStars(totalStars(p));
    setShow(true);
  }, [user, loading]);

  function snooze() {
    playClick();
    try { localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_DAYS * 864e5)); } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <section className={`ae-frame-parchment relative ${variant === 'card' ? 'my-5' : 'mt-4'}`}>
      <div className="pr-20 sm:pr-32">
        <p className="font-black text-gray-800">
          🌟 已經完成 {lessons} 課、拿到 {stars} 顆大星星了
        </p>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          這些目前只存在這台裝置裡。
          <strong className="text-gray-800">清掉瀏覽器資料或換一台，就會全部歸零。</strong>
          家長登入之後就存得起來，換手機、換平板都接得回來。
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button onClick={snooze}
            className="rounded-full border-2 border-gray-200 bg-white px-4 py-2 text-xs font-black text-gray-400 active:scale-95">
            以後再說
          </button>
          <GameButton onClick={signIn} color="gold" size="sm" sound="click">家長登入，保存進度</GameButton>
        </div>

        <p className="mt-2 text-[11px] text-gray-400">
          用 Google 登入，不用另外註冊。孩子不需要自己的帳號。
        </p>
      </div>
      {/* 寶箱貼紙：提醒「這些進度是寶物，要收好」 */}
      <img src="/images/ui/sticker-chest.webp" alt="" className="absolute right-1 bottom-1 w-20 sm:w-28 object-contain drop-shadow" />
    </section>
  );
}

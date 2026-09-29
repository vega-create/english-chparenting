'use client';
import { useState, useEffect } from 'react';
import GameButton from '@/components/GameButton';
import type { QuizQuestion } from '@/data/missions';
import { playPraise, getLevelFromMissionId, playReward, playVega, CHAR_CUE_AUDIO } from '@/lib/vega-audio';
import { playFanfare, stopFanfare } from '@/lib/sfx';
import { stopAmbience } from '@/lib/ambience';
import { track } from '@/lib/analytics';
import LoginNudge from '@/components/LoginNudge';
import { speak } from '@/lib/speech';
import { recordMissionComplete } from '@/lib/missionProgress';
import Link from 'next/link';
import { postsForLevel } from '@/data/blog-posts';

interface Props {
  missionTitle: string;
  missionTitleEn: string;
  /** 小星星總數（含暖身題的加分） */
  stars: number;
  /** 算進過關成績的答對數與題數（句子練習＋闖關＋聊天關；暖身題不算） */
  scored: number;
  scoredMax: number;
  reviewQuiz: QuizQuestion[];
  courseSlug: string;
  missionId: number;
  /** 沒過關時按「再挑戰一次」（沒有錯題清單可以訂正時的備案：從句子練習整個重來） */
  onRetry?: () => void;
  /** 還沒答對的題數（錯的＋跳過的），沒過關時只訂正這幾題 */
  missedCount?: number;
  /** 沒過關時按「訂正錯的題目」 */
  onFix?: () => void;
  /** 這次是靠訂正過關的：星星固定 1 顆 */
  viaFix?: boolean;
}

/** 過關標準：正確率 7 成（Vega 2026-09-29：60 太低、80 怕打擊孩子，先 70） */
export const PASS_PERCENT = 70;
/** 2 顆星、3 顆星的門檻 */
export const STAR2_PERCENT = 80;
export const STAR3_PERCENT = 90;

const percentOf = (scored: number, max: number) => (max > 0 ? Math.round((scored / max) * 100) : 100);

/** 還要再答對幾題才過關（跟過關判定用同一個算法，最少 1） */
export function moreToPass(scored: number, scoredMax: number) {
  let n = 1;
  while (scored + n < scoredMax && percentOf(scored + n, scoredMax) < PASS_PERCENT) n++;
  return n;
}

export default function MissionComplete({ missionTitle, missionTitleEn, stars, scored, scoredMax, reviewQuiz, courseSlug, missionId, onRetry, missedCount = 0, onFix, viaFix = false }: Props) {
  const maxStars = scoredMax;
  const courseLevel = Number(courseSlug.match(/^l(\d+)-/)?.[1] ?? 0);
  const parentPost = courseLevel ? postsForLevel(courseLevel, 1)[0] : undefined;
  const [quizDone, setQuizDone] = useState(false);
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [spellInput, setSpellInput] = useState('');

  const starPercent = percentOf(scored, scoredMax);
  const passed = starPercent >= PASS_PERCENT;
  // 訂正過關固定 1 顆星；一次就過關的照 7／8／9 成給 1／2／3 顆
  const starCount = viaFix ? 1 : starPercent >= STAR3_PERCENT ? 3 : starPercent >= STAR2_PERCENT ? 2 : 1;
  const needMore = moreToPass(scored, scoredMax);

  // 進到結算畫面時播 Miss Vega 鼓勵語音 + 星數獎勵語音 + 記錄完成進度
  useEffect(() => {
    const lv = parseInt(String(courseSlug).match(/l?(\d+)/)?.[1] ?? '1', 10);
    stopAmbience();                               // 電子書環境音在結算畫面一定要停
    if (!passed) {
      // 沒過關：不放煙火、不記完成（下一關不會解鎖），只記一筆成績
      track({ kind: 'lesson_end', level: lv, mission: missionId, score: 0,
              meta: { percent: starPercent, stars, maxStars, passed: false, missed: missedCount, ...(viaFix ? { fix: true } : {}) } });
      return;
    }
    playFanfare(starCount);                       // 先響破關配樂
    // 配樂約 2.4-3.5 秒；鼓勵語開始前先把配樂尾音切掉，人聲才不會被蓋過（Vega 抓的）
    const praiseAt = starCount >= 3 ? 3900 : starCount === 2 ? 3700 : 2800;
    const tCut = setTimeout(() => stopFanfare(), praiseAt - 150);
    const t2 = setTimeout(() => playPraise(getLevelFromMissionId(courseSlug)), praiseAt);
    // 鼓勵語播完接星數獎勵（reward-star-1/2/3，L5+ 用英文版）
    const t = setTimeout(() => playReward(`reward-star-${starCount}`, lv), praiseAt + 2000);
    track({ kind: 'lesson_end', level: lv, mission: missionId, score: starCount,
            meta: { percent: starPercent, stars, maxStars, passed: true, ...(viaFix ? { fix: true } : {}) } });
    recordMissionComplete(courseSlug, missionId, starCount);
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(tCut); stopFanfare(); };
  }, [courseSlug, missionId, starCount, passed]); // eslint-disable-line react-hooks/exhaustive-deps

  // ===== 沒過關 =====
  if (!passed) {
    return (
      <div className="animate-slide-up text-center">
        <div className="text-7xl mb-3">💪</div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">差一點點！</h2>
        <p className="text-lg text-gray-600 mb-1">{missionTitleEn}</p>
        <p className="text-base text-gray-500 mb-5">{missionTitle}</p>

        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-200 max-w-md mx-auto mb-5">
          <p className="text-2xl font-black text-orange-500 mb-4">再答對 {needMore} 題就過關</p>
          <p className="text-3xl font-black text-yellow-500">{scored}<span className="text-base text-gray-400"> / {scoredMax}</span></p>
          <p className="text-sm text-gray-500">答對題數</p>
          <p className="mt-4 text-sm font-bold text-gray-600">答對 {scored + needMore} 題（正確率 {PASS_PERCENT}%）就過關，下一關才會打開</p>
          <p className="mt-1 text-xs text-gray-400">算句子練習、闖關遊戲、聊天關；口說跳過不給分。暖身題不算。</p>
          {missedCount > 0 && <p className="mt-1 text-xs text-gray-400">不用整課重來，只要訂正錯的題目；訂正過關拿 1 顆星。</p>}
        </div>

        <div className="bg-orange-50 rounded-3xl p-4 max-w-md mx-auto mb-6 border border-orange-200">
          <p className="text-lg">
            <img src="/characters/finn/finn-talk.png" alt="Finn" className="inline w-24 h-24 object-contain mr-2" />
            Finn: &ldquo;{missedCount > 0 ? 'So close! Let\u2019s fix them!' : 'So close! Let\u2019s try again!'}&rdquo;
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-md mx-auto">
          {missedCount > 0 && onFix
            ? <GameButton onClick={() => onFix()} color="gold" size="lg">✏️ 訂正錯的題目（共 {missedCount} 題）</GameButton>
            /* 沒有錯題清單（例如改版前就開著的分頁）：退回整個重來 */
            : <GameButton onClick={() => onRetry?.()} color="gold" size="lg">🎮 再挑戰一次（從句子練習開始）</GameButton>}
          <GameButton href={`/courses/${courseSlug}`} color="green" size="md" className="text-center">先回地圖</GameButton>
        </div>
      </div>
    );
  }

  function handleQuizAnswer(answer: string) {
    if (showResult) return;
    setSelected(answer);
    const correct = answer.toLowerCase().trim() === reviewQuiz[quizCurrent].answer.toLowerCase().trim();
    if (correct) setQuizScore(s => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (quizCurrent < reviewQuiz.length - 1) {
        setQuizCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
        setSpellInput('');
      } else {
        setQuizDone(true);
      }
    }, 1200);
  }

  // 結算畫面
  if (!showQuiz || quizDone) {
    return (
      <div className="animate-slide-up text-center">
        {/* 慶祝動畫 */}
        <div className="relative mb-6">
          <div className="text-8xl mb-4">🎉</div>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <span key={i} className={`text-5xl transition-all duration-500 ${
                i <= starCount ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
              }`} style={{ animationDelay: `${i * 0.3}s` }}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 mb-1">
          {viaFix ? '訂正過關拿 1 顆星（一次就過關：7 成 1 顆、8 成 2 顆、9 成 3 顆）' : '本課成績（正確率 7 成過關、8 成 2 顆、9 成 3 顆）'}
        </p>
        <h2 className="text-3xl font-black text-gray-800 mb-2">{viaFix ? '✏️ 訂正過關！' : 'Mission Complete!'}</h2>
        <p className="text-xl text-gray-600 mb-1">{missionTitleEn}</p>
        <p className="text-lg text-gray-500 mb-6">{missionTitle}</p>

        {/* 成績 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-yellow-200 max-w-md mx-auto mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-black text-yellow-500">{stars}</p>
              <p className="text-sm text-gray-500">小星星</p>
              <p className="text-[10px] text-gray-400 leading-tight">答對 1 題拿 1 顆</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-500">{starPercent}%</p>
              <p className="text-sm text-gray-500">正確率</p>
            </div>
            <div>
              <p className="text-3xl font-black text-blue-500">💎 10</p>
              <p className="text-sm text-gray-500">寶石</p>
            </div>
          </div>

          {quizDone && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">🎁 寶藏挑戰：找到 {quizScore}/{reviewQuiz.length} 個寶藏</p>
            </div>
          )}
        </div>

        {/* 角色祝賀 */}
        <div className="bg-orange-50 rounded-3xl p-4 max-w-md mx-auto mb-6 border border-orange-200">
          <p className="text-lg">
            <img src="/characters/finn/finn-happy.png" alt="Finn" className="inline w-28 h-28 object-contain mr-2" />
            Finn: &ldquo;{starCount === 3 ? 'PERFECT! You are amazing!' : starCount === 2 ? 'Great job! Keep going!' : 'Good try! Practice makes perfect!'}&rdquo;
          </p>
        </div>

        {/* 操作按鈕 */}
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          {!quizDone && !showQuiz && (
            <GameButton onClick={() => { playVega(CHAR_CUE_AUDIO.treasure); setShowQuiz(true); }} color="gold" size="lg">
              🎁 寶藏挑戰（{reviewQuiz.length} 關）
            </GameButton>
          )}
          <GameButton href={`/courses/${courseSlug}`} color="green" size="lg" className="text-center">
            繼續冒險 · 下一站 🗺 →
          </GameButton>

          {/* 剛拿到星星，這是最有說服力的時機講「不登入會不見」 */}
          <LoginNudge variant="inline" />

          {/* 給旁邊的爸媽：這個 Level 的陪玩配套文（小小的，不搶孩子的按鈕） */}
          {parentPost && (
            <Link href={`/blog/${parentPost.slug}`} className="no-underline text-left bg-white/80 border border-purple-100 rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-purple-50 transition">
              {parentPost.cover.image
                ? <img src={parentPost.cover.image} alt="" className="w-16 h-10 rounded-lg object-cover flex-shrink-0" />
                : <span className="text-2xl flex-shrink-0">{parentPost.cover.emoji}</span>}
              <span>
                <span className="block text-[11px] font-bold text-purple-500">📖 給爸媽的文章</span>
                <span className="block text-sm font-bold text-gray-700 leading-snug">{parentPost.title}</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // 寶藏挑戰
  const q = reviewQuiz[quizCurrent];
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-4">
        <div className="inline-block text-5xl mb-2">🎁</div>
        <p className="text-lg font-bold text-gray-700">寶藏挑戰</p>
      </div>

      <div className="flex gap-1 mb-6 max-w-xl mx-auto">
        {reviewQuiz.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${
            i < quizCurrent ? 'bg-green-400' : i === quizCurrent ? 'bg-yellow-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-200 max-w-xl mx-auto">
        {/* 閱讀理解短文 */}
        {q.type === 'read' && q.passage && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-5">
            <p className="text-base leading-relaxed text-gray-800 whitespace-pre-line">{q.passage}</p>
          </div>
        )}

        <p className="text-xl font-bold text-center text-gray-800 mb-6">{q.question}</p>

        {/* 聽力題：播放按鈕 */}
        {q.type === 'listen-pick' && (
          <div className="text-center mb-4">
            <button onClick={() => speak(q.answer)}
              className="bg-blue-100 text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-200 transition active:scale-95">
              🔊 播放音檔
            </button>
          </div>
        )}

        {/* 拼寫題：打字框 */}
        {q.type === 'spell' ? (
          <div className="text-center">
            <input
              type="text"
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && spellInput.trim() && !showResult) handleQuizAnswer(spellInput); }}
              placeholder="在這裡打字..."
              className="text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl px-6 py-3 w-48 focus:outline-none focus:border-yellow-400 transition"
              autoFocus
              disabled={showResult}
            />
            <div className="mt-3">
              <button onClick={() => handleQuizAnswer(spellInput)} disabled={!spellInput.trim() || showResult}
                className="bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-yellow-600 transition active:scale-95 disabled:opacity-50">
                確認 ✓
              </button>
            </div>
            {showResult && spellInput.toLowerCase().trim() !== q.answer.toLowerCase().trim() && (
              <p className="text-orange-500 font-bold mt-3">💪 答案是：{q.answer}</p>
            )}
          </div>
        ) : q.type === 'speak' ? (
          /* 口說題 */
          <div className="text-center">
            <button onClick={() => speak(q.answer)}
              className="bg-green-100 text-green-600 px-6 py-3 rounded-2xl font-bold hover:bg-green-200 transition active:scale-95 mb-3">
              🔊 先聽示範
            </button>
            <p className="text-sm text-gray-400 mb-3">跟著念一次，再按下面按鈕</p>
            {showResult ? (
              <button disabled className="px-8 py-3 rounded-2xl font-bold text-lg bg-gray-200 text-gray-400">🎤 我念完了！</button>
            ) : (
              <GameButton onClick={() => handleQuizAnswer(q.answer)} color="green" size="md">🎤 我念完了！</GameButton>
            )}
          </div>
        ) : (
          /* 選擇題（listen-pick / match / fill-blank / read） */
          <div className="grid grid-cols-2 gap-3">
            {q.options?.map((option) => {
              let btnClass = 'bg-white border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50';
              if (showResult && option === q.answer) {
                btnClass = 'bg-green-100 border-2 border-green-500 scale-105';
              } else if (showResult && option === selected && option !== q.answer) {
                btnClass = 'bg-red-100 border-2 border-red-400';
              }
              return (
                <button key={option} onClick={() => handleQuizAnswer(option)} disabled={showResult}
                  className={`${btnClass} rounded-2xl p-4 text-lg font-medium text-gray-700 transition-all active:scale-95`}>
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

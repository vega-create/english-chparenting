/**
 * 全站內容稽核：把 240 課逐條檢查一次，抓出玩家會遇到的實際錯誤。
 * 用法: npx tsx scripts/audit-content.ts
 */
import { MISSIONS } from '../src/data/missions';
import { COURSES } from '../src/data/courses';
import fs from 'node:fs';
import path from 'node:path';

type Issue = { level: number; id: number; where: string; what: string };
const issues: Issue[] = [];
const add = (m: { level: number; id: number }, where: string, what: string) =>
  issues.push({ level: m.level, id: m.id, where, what });

const PUB = path.join(process.cwd(), 'public');
const fileCache = new Map<string, boolean>();
function publicExists(p: string) {
  if (!p.startsWith('/')) return true;          // 外部網址或 emoji 不查
  if (fileCache.has(p)) return fileCache.get(p)!;
  const ok = fs.existsSync(path.join(PUB, decodeURIComponent(p)));
  fileCache.set(p, ok);
  return ok;
}

// 題目型別各自需要什麼欄位才能正常出題
const NEEDS_OPTIONS = new Set(['listen-pick', 'match', 'fill-blank', 'read']);

function checkQuiz(m: any, arr: any[], where: string) {
  arr.forEach((q, i) => {
    const at = `${where}[${i}]`;
    if (!q.question?.trim()) add(m, at, '題目文字是空的');
    if (!q.answer?.trim()) add(m, at, '沒有答案');
    if (NEEDS_OPTIONS.has(q.type)) {
      if (!q.options?.length) add(m, at, `${q.type} 沒有選項，畫面會空白`);
      else {
        if (!q.options.includes(q.answer))
          add(m, at, `答案「${q.answer}」不在選項裡 → 這題永遠答不對`);
        if (new Set(q.options).size !== q.options.length)
          add(m, at, `選項有重複：${q.options.join(' / ')}`);
        if (q.options.length < 2) add(m, at, '只有一個選項');
      }
    }
    if (q.type === 'read' && !q.passage?.trim()) add(m, at, 'read 題沒有短文');
    if (q.image && !publicExists(q.image)) add(m, at, `圖片不存在：${q.image}`);
  });
}

const slugs = new Map<string, string>();
const courseLevels = new Set(COURSES.map(c => c.level));

for (const m of MISSIONS as any[]) {
  // 課程對應得到島嶼
  if (!courseLevels.has(m.level)) add(m, 'level', `找不到對應課程 Level ${m.level}`);

  // slug 全站唯一（同 level 內重複會撞路由）
  const key = `${m.level}/${m.slug}`;
  if (slugs.has(key)) add(m, 'slug', `slug 重複：${m.slug}`);
  slugs.set(key, m.title);

  // 七大內容區塊
  const blocks: [string, any[]][] = [
    ['story', m.story], ['words', m.words], ['sentences', m.sentences],
    ['warmUpQuestions', m.warmUpQuestions], ['challenges', m.challenges],
    ['talkTimePrompts', m.talkTimePrompts], ['reviewQuiz', m.reviewQuiz],
  ];
  for (const [name, arr] of blocks) {
    if (!Array.isArray(arr) || arr.length === 0) add(m, name, '是空的');
  }

  if (!m.title?.trim()) add(m, 'title', '沒有中文標題');
  if (!m.titleEn?.trim()) add(m, 'titleEn', '沒有英文標題');

  // 故事分鏡
  (m.story || []).forEach((s: any, i: number) => {
    if (!s.dialogue?.trim()) add(m, `story[${i}]`, '沒有英文台詞');
    if (!s.dialogueZh?.trim()) add(m, `story[${i}]`, '沒有中文翻譯');
    if (!s.characterName?.trim()) add(m, `story[${i}]`, '沒有角色名');
    (s.highlightWords || []).forEach((w: string) => {
      if (!s.dialogue?.toLowerCase().includes(w.toLowerCase()))
        add(m, `story[${i}]`, `highlightWord「${w}」不在台詞裡，畫面標不到`);
    });
  });

  // 單字
  (m.words || []).forEach((w: any, i: number) => {
    if (!w.en?.trim()) add(m, `words[${i}]`, '沒有英文');
    if (!w.zh?.trim()) add(m, `words[${i}]`, '沒有中文');
    if (w.image && w.image.startsWith('/') && !publicExists(w.image))
      add(m, `words[${i}]`, `圖片不存在：${w.image}`);
    if (w.exampleSentence && w.en &&
        !w.exampleSentence.toLowerCase().includes(w.en.toLowerCase()))
      add(m, `words[${i}]`, `例句沒有出現單字「${w.en}」`);
  });

  // 句型
  (m.sentences || []).forEach((s: any, i: number) => {
    if (!s.en?.trim()) add(m, `sentences[${i}]`, '沒有英文');
    if (!s.zh?.trim()) add(m, `sentences[${i}]`, '沒有中文');
  });

  checkQuiz(m, m.warmUpQuestions || [], 'warmUpQuestions');
  checkQuiz(m, m.challenges || [], 'challenges');
  checkQuiz(m, m.reviewQuiz || [], 'reviewQuiz');

  // 影片腳本
  (m.videoScript || []).forEach((v: any, i: number) => {
    if (!v.line?.trim()) add(m, `videoScript[${i}]`, '沒有英文台詞');
    if (!v.lineZh?.trim()) add(m, `videoScript[${i}]`, '沒有中文');
    if (!v.speaker?.trim()) add(m, `videoScript[${i}]`, '沒有角色名');
  });
}

// ── 報告 ──
const byLevel = new Map<number, Issue[]>();
for (const i of issues) {
  if (!byLevel.has(i.level)) byLevel.set(i.level, []);
  byLevel.get(i.level)!.push(i);
}
console.log(`檢查 ${MISSIONS.length} 課，發現 ${issues.length} 個問題\n`);
for (const lv of [...byLevel.keys()].sort((a, b) => a - b)) {
  const list = byLevel.get(lv)!;
  console.log(`── Level ${lv}（${list.length} 個）`);
  for (const i of list) console.log(`   L${i.level}-${i.id} ${i.where}：${i.what}`);
  console.log('');
}
if (!issues.length) console.log('全部通過');

// ── 附加檢查：課程／島嶼圖與每關卡數 ──
import { ISLAND_IMAGES, WORLDS } from '../src/data/courses';
const extra: string[] = [];
for (const c of COURSES) {
  const n = (MISSIONS as any[]).filter(m => m.level === c.level).length;
  if (n !== 20) extra.push(`Level ${c.level}（${c.island}）只有 ${n} 課，不是 20`);
  const img = (ISLAND_IMAGES as any)[c.level];
  if (!img) extra.push(`Level ${c.level} 沒有島嶼圖`);
  else if (!publicExists(img)) extra.push(`Level ${c.level} 島嶼圖不存在：${img}`);
  if (c.lessons !== n) extra.push(`Level ${c.level} 課程頁寫 ${c.lessons} 課，實際 ${n} 課`);
}
for (const w of WORLDS as any[]) {
  if (w.image && !publicExists(w.image)) extra.push(`世界「${w.name}」圖不存在：${w.image}`);
}
if (extra.length) { console.log('── 課程／圖片'); extra.forEach(e => console.log('   ' + e)); }
else console.log('── 課程／圖片：12 個 Level 各 20 課，島嶼圖與世界圖都在');

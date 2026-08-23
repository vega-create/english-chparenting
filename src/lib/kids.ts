'use client';
import { loadProgress, saveProgress, type Progress } from './missionProgress';

/**
 * 多孩子檔案（一台裝置／一個家長帳號底下可有多個孩子）。
 *
 * 設計：
 * - 「正在玩的孩子」的進度仍放在原本的 live key（ae_mission_progress_v1），
 *   所以課程、家長中心、守島戰…全部既有程式一行都不用改。
 * - 其他孩子的進度各自快照在 ae_kid_progress:<id>；切換孩子＝先把 live 存回快照，再把目標孩子載入 live。
 * - 沒登入也能多孩子（全在本機）；登入後 AuthProvider 會把每個孩子各自同步到 ae_kids 表。
 * - 第一次用（沒有 ae_kids_v1）就把現有進度包成第一個孩子，舊使用者完全無感。
 */

export const AVATARS = [
  { slug: 'elly', zh: '艾莉' },
  { slug: 'sky',  zh: '小飛' },
  { slug: 'coco', zh: '可可' },
  { slug: 'leo',  zh: '雷歐' },
  { slug: 'vera', zh: '薇拉' },
];

export interface Kid { id: string; name: string; avatar: string | null; createdAt: string }
interface KidsState { active: string; kids: Kid[] }

const KEY = 'ae_kids_v1';
const SNAP = (id: string) => `ae_kid_progress:${id}`;
export const DEFAULT_NAME = '小冒險家';

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
function emit() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('ae-kids-change'));
  window.dispatchEvent(new Event('ae-mission-progress-change'));
}
function read(): KidsState | null {
  if (typeof window === 'undefined') return null;
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function write(s: KidsState) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
}
function readSnap(id: string): Progress {
  try { const raw = localStorage.getItem(SNAP(id)); return raw ? JSON.parse(raw) : { completed: {} }; } catch { return { completed: {} }; }
}
function writeSnap(id: string, p: Progress) {
  try { localStorage.setItem(SNAP(id), JSON.stringify(p)); } catch { /* ignore */ }
}

/** 確保至少有一個孩子；第一次呼叫會把現有本機進度包成第一個孩子 */
export function ensureKids(): KidsState {
  const s = read();
  if (s && s.kids.length && s.kids.some(k => k.id === s.active)) return s;
  const avatar = (typeof window !== 'undefined' && localStorage.getItem('ae_avatar')) || null;
  const first: Kid = { id: uuid(), name: DEFAULT_NAME, avatar, createdAt: new Date().toISOString() };
  const st: KidsState = { active: first.id, kids: s?.kids?.length ? s.kids : [first] };
  if (!st.kids.some(k => k.id === st.active)) st.active = st.kids[0].id;
  write(st);
  return st;
}

export function listKids(): Kid[] { return ensureKids().kids; }
export function activeKid(): Kid {
  const s = ensureKids();
  return s.kids.find(k => k.id === s.active) || s.kids[0];
}

/** 切換正在玩的孩子：live 進度存回原孩子的快照，再載入目標孩子 */
export function switchKid(id: string) {
  const s = ensureKids();
  if (id === s.active || !s.kids.some(k => k.id === id)) return;
  writeSnap(s.active, loadProgress());
  const target = s.kids.find(k => k.id === id)!;
  s.active = id;
  write(s);
  saveProgress(readSnap(id));                  // 會觸發 ae-progress-save → 有登入就上雲
  try {
    if (target.avatar) localStorage.setItem('ae_avatar', target.avatar);
    else localStorage.removeItem('ae_avatar');
  } catch { /* ignore */ }
  emit();
}

export function addKid(name: string, avatar: string | null, makeActive = true): Kid {
  const s = ensureKids();
  const kid: Kid = { id: uuid(), name: name.trim() || DEFAULT_NAME, avatar, createdAt: new Date().toISOString() };
  s.kids.push(kid);
  writeSnap(kid.id, { completed: {} });
  write(s);
  emit();
  if (makeActive) switchKid(kid.id);
  return kid;
}

export function renameKid(id: string, name: string) {
  const s = ensureKids();
  const k = s.kids.find(x => x.id === id); if (!k) return;
  k.name = name.trim() || DEFAULT_NAME;
  write(s); emit();
  bumpActive();
}

export function setKidAvatar(id: string, avatar: string | null) {
  const s = ensureKids();
  const k = s.kids.find(x => x.id === id); if (!k) return;
  k.avatar = avatar;
  write(s);
  if (id === s.active) {
    try { if (avatar) localStorage.setItem('ae_avatar', avatar); else localStorage.removeItem('ae_avatar'); } catch { /* */ }
  }
  emit();
  bumpActive();
}

/** 目前正在玩的孩子換了頭像（choose-character 頁用） */
export function setActiveKidAvatar(avatar: string) { setKidAvatar(ensureKids().active, avatar); }

/** 刪除孩子（至少留一個）。回傳 false 代表不能刪。 */
export function removeKid(id: string): boolean {
  const s = ensureKids();
  if (s.kids.length <= 1) return false;
  if (s.active === id) {
    const other = s.kids.find(k => k.id !== id)!;
    switchKid(other.id);
  }
  const s2 = ensureKids();
  s2.kids = s2.kids.filter(k => k.id !== id);
  write(s2);
  try { localStorage.removeItem(SNAP(id)); } catch { /* */ }
  emit();
  window.dispatchEvent(new CustomEvent('ae-kid-removed', { detail: { id } }));
  return true;
}

/** 每個孩子目前的進度（active 的拿 live，其餘拿快照） */
export function kidProgress(id: string): Progress {
  const s = ensureKids();
  return id === s.active ? loadProgress() : readSnap(id);
}

/** 直接寫入某孩子的進度（雲端合併後用）。active 的寫 live。 */
export function setKidProgress(id: string, p: Progress) {
  const s = ensureKids();
  if (id === s.active) saveProgress(p); else writeSnap(id, p);
  emit();
}

/** 把整組孩子換成指定清單（雲端同步用），active 不在清單裡就改成第一個 */
export function replaceKids(kids: Kid[], activeId?: string) {
  if (!kids.length) return;
  const s = ensureKids();
  const live = loadProgress();
  writeSnap(s.active, live);
  const active = activeId && kids.some(k => k.id === activeId) ? activeId
    : kids.some(k => k.id === s.active) ? s.active : kids[0].id;
  write({ active, kids });
  if (active !== s.active) {
    saveProgress(readSnap(active));
    const t = kids.find(k => k.id === active)!;
    try { if (t.avatar) localStorage.setItem('ae_avatar', t.avatar); else localStorage.removeItem('ae_avatar'); } catch { /* */ }
  }
  emit();
}

/** 讓 AuthProvider 知道「資料變了要上雲」：重送一次 live 進度事件 */
function bumpActive() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('ae-progress-save', { detail: loadProgress() }));
}

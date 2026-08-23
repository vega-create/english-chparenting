'use client';
import { useEffect, useState } from 'react';
import { AVATARS, DEFAULT_NAME, addKid, listKids, activeKid, switchKid, renameKid, removeKid, type Kid } from '@/lib/kids';
import { playClick, playStar } from '@/lib/sfx';

/**
 * 孩子切換器：顯示「正在玩的孩子」，點開可切換／新增／改名／刪除。
 * 不需要登入就能用（本機多孩子）；登入後每個孩子各自同步雲端。
 */
function KidAvatar({ kid, size = 'w-8 h-8' }: { kid: Kid; size?: string }) {
  const [ok, setOk] = useState(true);
  if (kid.avatar && ok) {
    return <img src={`/images/avatars/${kid.avatar}.webp`} alt="" onError={() => setOk(false)}
      className={`${size} rounded-full object-cover object-top bg-amber-100 border-2 border-white shadow`} />;
  }
  return <span className={`${size} rounded-full bg-amber-400 text-white font-black flex items-center justify-center text-sm border-2 border-white shadow`}>
    {kid.name.slice(0, 1)}
  </span>;
}

export default function KidSwitcher({ compact = false }: { compact?: boolean }) {
  const [kids, setKids] = useState<Kid[]>([]);
  const [active, setActive] = useState<Kid | null>(null);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string>('elly');
  const [err, setErr] = useState('');

  useEffect(() => {
    const refresh = () => { setKids(listKids()); setActive(activeKid()); };
    refresh();
    window.addEventListener('ae-kids-change', refresh);
    return () => window.removeEventListener('ae-kids-change', refresh);
  }, []);

  if (!active) return null;

  function create() {
    if (kids.length >= 6) { setErr('最多 6 個孩子喔'); return; }
    playStar();
    addKid(name, avatar, true);
    setName(''); setAdding(false); setOpen(false); setErr('');
  }
  function rename(k: Kid) {
    const n = window.prompt('孩子的名字', k.name);
    if (n !== null) { playClick(); renameKid(k.id, n); }
  }
  function remove(k: Kid) {
    if (kids.length <= 1) { setErr('至少要留一個孩子'); return; }
    if (!window.confirm(`確定刪除「${k.name}」？這個孩子的進度會一起刪掉，不能復原。`)) return;
    playClick();
    removeKid(k.id);
  }

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => { playClick(); setOpen(o => !o); setErr(''); }}
        className={`flex items-center gap-1.5 rounded-full bg-white/95 border-2 border-amber-300 shadow active:scale-95 hover:bg-amber-50 transition ${compact ? 'pl-1 pr-2 py-0.5' : 'pl-1 pr-3 py-1'}`}
        title="切換孩子">
        <KidAvatar kid={active} size={compact ? 'w-6 h-6' : 'w-8 h-8'} />
        <span className={`font-black text-amber-900 truncate ${compact ? 'text-[11px] max-w-[5rem]' : 'text-sm max-w-[8rem]'}`}>{active.name}</span>
        <span className="text-amber-500 text-[10px]">▼</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[80]" onClick={() => { setOpen(false); setAdding(false); }} />
          <div className="absolute right-0 top-full mt-2 z-[81] w-64 rounded-2xl bg-white shadow-2xl border-2 border-amber-200 p-3">
            <p className="m-0 mb-2 text-[11px] font-black text-amber-800">現在是誰在玩？</p>
            <ul className="m-0 p-0 list-none space-y-1">
              {kids.map(k => (
                <li key={k.id} className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${k.id === active.id ? 'bg-amber-100' : 'hover:bg-amber-50'}`}>
                  <button className="flex items-center gap-2 flex-1 min-w-0 text-left" onClick={() => { playClick(); switchKid(k.id); setOpen(false); }}>
                    <KidAvatar kid={k} size="w-7 h-7" />
                    <span className="font-black text-gray-800 text-sm truncate">{k.name}</span>
                    {k.id === active.id && <span className="text-[10px] text-amber-600 font-bold shrink-0">正在玩</span>}
                  </button>
                  <button onClick={() => rename(k)} title="改名" className="text-gray-400 hover:text-gray-700 text-xs px-1">✎</button>
                  {kids.length > 1 && <button onClick={() => remove(k)} title="刪除" className="text-gray-300 hover:text-red-500 text-xs px-1">✕</button>}
                </li>
              ))}
            </ul>

            {!adding ? (
              <button onClick={() => { playClick(); setAdding(true); setErr(''); }}
                className="mt-2 w-full rounded-full border-2 border-dashed border-amber-300 py-1.5 text-xs font-black text-amber-700 hover:bg-amber-50 active:scale-95 transition">
                ＋ 新增孩子
              </button>
            ) : (
              <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-2">
                <input value={name} onChange={e => setName(e.target.value)} maxLength={12}
                  placeholder={`名字（例如 ${DEFAULT_NAME}）`}
                  className="w-full rounded-lg border-2 border-amber-200 px-2 py-1 text-sm font-bold outline-none focus:border-amber-400" />
                <div className="flex justify-between mt-2">
                  {AVATARS.map(a => (
                    <button key={a.slug} onClick={() => { playClick(); setAvatar(a.slug); }} title={a.zh}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 ${avatar === a.slug ? 'border-orange-500 scale-110' : 'border-transparent'} transition`}>
                      <img src={`/images/avatars/${a.slug}.webp`} alt={a.zh} className="w-full h-full object-cover object-top bg-amber-100" />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={create} className="flex-1 rounded-full bg-orange-500 text-white py-1.5 text-xs font-black active:scale-95">建立</button>
                  <button onClick={() => { setAdding(false); setErr(''); }} className="rounded-full border-2 border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-500">取消</button>
                </div>
              </div>
            )}
            {err && <p className="m-0 mt-2 text-[11px] font-bold text-red-500">{err}</p>}
            <p className="m-0 mt-2 text-[10px] text-gray-400 leading-snug">每個孩子各自記錄星星、徽章與連續天數；家長登入後會一起同步到雲端。</p>
          </div>
        </>
      )}
    </div>
  );
}

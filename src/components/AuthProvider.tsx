'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supa } from '@/lib/supabase';
import { toAuthUser, syncKids, pushProgress, deleteKidCloud, signInWithGoogle, signOut, type AuthUser } from '@/lib/auth';
import type { Progress } from '@/lib/missionProgress';
import { setAnalyticsUser } from '@/lib/analytics';

type Ctx = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (redirectPath?: string) => void;
  logout: () => void;
};

const AuthCtx = createContext<Ctx>({ user: null, loading: true, signIn: () => {}, logout: () => {} });

export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    supa().auth.getSession().then(({ data }) => {
      if (!alive) return;
      const u = toAuthUser(data.session?.user ?? null);
      setUser(u);
      setAnalyticsUser(u?.id ?? null);
      setLoading(false);
      if (u) syncKids(u.id);              // 登入狀態還在 → 把雲端與本機（每個孩子）合併
    });

    const { data: sub } = supa().auth.onAuthStateChange((event, session) => {
      const u = toAuthUser(session?.user ?? null);
      setUser(u);
      setAnalyticsUser(u?.id ?? null);
      setLoading(false);
      if (u && event === 'SIGNED_IN') syncKids(u.id);   // 剛登入 → 搬家
    });

    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  // 進度存檔時，有登入就同步「正在玩的孩子」上雲端；刪孩子也同步刪雲端
  useEffect(() => {
    if (!user) return;
    const onSave = (e: Event) => {
      const p = (e as CustomEvent<Progress>).detail;
      if (p) pushProgress(user.id, p);
    };
    const onRemove = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (id) deleteKidCloud(user.id, id);
    };
    window.addEventListener('ae-progress-save', onSave);
    window.addEventListener('ae-kid-removed', onRemove);
    return () => {
      window.removeEventListener('ae-progress-save', onSave);
      window.removeEventListener('ae-kid-removed', onRemove);
    };
  }, [user]);

  const signIn = useCallback((redirectPath?: string) => { signInWithGoogle(redirectPath); }, []);
  const logout = useCallback(() => { signOut().then(() => setUser(null)); }, []);

  return (
    <AuthCtx.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

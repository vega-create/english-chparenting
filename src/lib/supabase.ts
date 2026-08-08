import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase 連線（與 learn / kids-studio / 記帳共用同一個專案）。
 *
 * anon key 本來就是要放在前端的公開金鑰，安全性靠資料庫的 RLS：
 * ae_progress 的政策是「只能讀寫 auth.uid() 等於自己的那一列」，
 * 所以就算有人拿到這把 key 也只能碰自己的資料。
 *
 * ⚠️ 這個專案有 138 個表分屬多個網站，
 *    這裡只碰 ae_ 開頭的表，不要動別人的。
 */
const URL = 'https://lexcvcinmphkmavgswgn.supabase.co';
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleGN2Y2lubXBoa21hdmdzd2duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDEwODksImV4cCI6MjA4MjY3NzA4OX0.Ur2XPKbWU0Bfm87otq4uM_33cyWRi267nBbAEZtjcis';

let client: SupabaseClient | null = null;

export function supa(): SupabaseClient {
  if (!client) {
    client = createClient(URL, ANON, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,   // Google 導回來時自動接住 session
        storageKey: 'ae-auth',      // 跟同專案其他站的 session 分開
      },
    });
  }
  return client;
}

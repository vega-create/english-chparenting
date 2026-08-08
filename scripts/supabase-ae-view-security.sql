-- 冒險英語：修掉 view 繞過 RLS 的漏洞（重要）
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 只動 ae_ 開頭的 view，不碰任何既有的表或別站的 view。
--
-- ── 問題 ──────────────────────────────────────────────
-- Postgres 的 view 預設用「建立者」的權限執行，不是查詢者的。
-- 所以就算底層的 ae_events 已經開了 RLS、anon 讀不到，
-- 只要透過 view 去查，RLS 就被繞過去了。
--
-- 2026-08-08 實測（用網站前端那把公開的 anon key，任何人打開 F12 都拿得到）：
--   ae_events        → []                                      ← RLS 有擋，正確
--   ae_prepost       → [{"subject":"...","pre_score":7,...}]    ← 洩漏！
--   ae_daily_summary → [{"day":"...","active_devices":1,...}]   ← 洩漏
--   ae_exit_reasons  → [{"reason":"too_hard","n":1,...}]        ← 洩漏
--
-- ae_prepost 的 subject 就是 device_id / user_id，加上測驗分數，
-- 等於整份研究資料的骨架對外公開。IRB 一定會問到這個。
--
-- ── 修法 ──────────────────────────────────────────────
-- security_invoker = on 讓 view 改用「查詢者」的權限執行，
-- 底層 RLS 就會生效（anon 讀不到任何東西）。
-- service_role 本來就繞過 RLS，研究者用 service key 讀全部不受影響。
-- 另外再 revoke 一次，雙保險。
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run

alter view public.ae_daily_summary set (security_invoker = on);
alter view public.ae_prepost      set (security_invoker = on);
alter view public.ae_dropoff      set (security_invoker = on);
alter view public.ae_attrition    set (security_invoker = on);
alter view public.ae_exit_reasons set (security_invoker = on);

revoke all on public.ae_daily_summary from anon, authenticated;
revoke all on public.ae_prepost      from anon, authenticated;
revoke all on public.ae_dropoff      from anon, authenticated;
revoke all on public.ae_attrition    from anon, authenticated;
revoke all on public.ae_exit_reasons from anon, authenticated;

-- ── 清掉 2026-08-08 稽核時寫進去的測試資料 ──────────────
delete from public.ae_events      where device_id = 'AUDIT-TEST-DEVICE';
delete from public.ae_withdrawals where comment   = 'AUDIT-TEST';

-- ── 驗證：跑完之後這三個都應該回 0 列 ────────────────────
-- （在 SQL Editor 裡是用你的管理身分跑，會看得到；
--   要驗證 anon 讀不到，請用網站的 anon key 打 REST API 測）
select 'ae_events 剩餘測試資料'      as check, count(*) from public.ae_events      where device_id = 'AUDIT-TEST-DEVICE'
union all
select 'ae_withdrawals 剩餘測試資料', count(*) from public.ae_withdrawals where comment = 'AUDIT-TEST';

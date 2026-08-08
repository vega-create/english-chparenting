-- 冒險英語：讓家長可以刪掉自己孩子的研究資料（撤回權）
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 只動 ae_events / ae_progress 兩張表，不碰任何既有的表。
--
-- 為什麼只有登入者能刪：
--   未登入時只有隨機的 device_id，資料庫無從驗證「這組 device_id 真的是你的」。
--   如果開放用 device_id 刪，等於任何人都能刪光整張表。
--   所以未登入的資料在設計上就是不可回溯的匿名資料——同意書必須據實說明這點。
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run

-- ── 事件表：登入者可刪自己的 ────────────────────────────
drop policy if exists ae_events_delete_own on public.ae_events;

create policy ae_events_delete_own on public.ae_events
  for delete using (auth.uid() is not null and auth.uid() = user_id);

-- ── 進度表：登入者可刪自己的（連同同意紀錄）──────────────
drop policy if exists ae_progress_delete_own on public.ae_progress;

create policy ae_progress_delete_own on public.ae_progress
  for delete using (auth.uid() is not null and auth.uid() = user_id);

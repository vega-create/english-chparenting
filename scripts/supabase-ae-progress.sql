-- 冒險英語：登入後的進度同步
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 這個專案有 138 個表分屬多個網站。
--    以下只新增 ae_ 開頭的表、只對這張表開 RLS，
--    不會動到任何既有的表或全域設定。
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run

-- ── 1. 進度表（一個帳號一列，內容就是現在 localStorage 的結構）──
create table if not exists public.ae_progress (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  kid_name    text,                                    -- 孩子暱稱（家長自己填）
  avatar      text,                                    -- 選的角色 elly/sky/coco/leo/vera
  data        jsonb not null default '{}'::jsonb,      -- { completed, lastActive, streak }
  updated_at  timestamptz not null default now()
);

comment on table public.ae_progress is
  '冒險英語 english.chparenting.com 的學習進度。家長帳號登入，一個帳號一列。';

-- ── 2. RLS：只有自己看得到自己的資料 ──
alter table public.ae_progress enable row level security;

drop policy if exists ae_progress_select_own on public.ae_progress;
drop policy if exists ae_progress_insert_own on public.ae_progress;
drop policy if exists ae_progress_update_own on public.ae_progress;

create policy ae_progress_select_own on public.ae_progress
  for select using (auth.uid() = user_id);

create policy ae_progress_insert_own on public.ae_progress
  for insert with check (auth.uid() = user_id);

create policy ae_progress_update_own on public.ae_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── 3. updated_at 自動更新 ──
create or replace function public.ae_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists ae_progress_touch on public.ae_progress;
create trigger ae_progress_touch
  before update on public.ae_progress
  for each row execute function public.ae_touch_updated_at();

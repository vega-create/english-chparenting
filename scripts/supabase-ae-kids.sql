-- 冒險英語：多孩子帳號（一個家長 Google 帳號底下可有多個孩子，各自一份進度）
-- 2026-08-22。在 Supabase SQL Editor 執行一次即可。ae_progress 保留當舊資料來源（登入時會搬進 ae_kids）。

create table if not exists public.ae_kids (
  id          uuid primary key,                                  -- 前端產生（本機沒登入時就有 id，登入後直接上雲）
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null default '小冒險家',
  avatar      text,                                              -- elly/sky/coco/leo/vera
  data        jsonb not null default '{}'::jsonb,                -- { completed, lastActive, streak, guard }
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists ae_kids_user_idx on public.ae_kids(user_id);

comment on table public.ae_kids is '冒險英語 english.chparenting.com：一個家長帳號多個孩子，每個孩子一列進度。';

alter table public.ae_kids enable row level security;

drop policy if exists "ae_kids_select_own" on public.ae_kids;
drop policy if exists "ae_kids_insert_own" on public.ae_kids;
drop policy if exists "ae_kids_update_own" on public.ae_kids;
drop policy if exists "ae_kids_delete_own" on public.ae_kids;

create policy "ae_kids_select_own" on public.ae_kids for select using (auth.uid() = user_id);
create policy "ae_kids_insert_own" on public.ae_kids for insert with check (auth.uid() = user_id);
create policy "ae_kids_update_own" on public.ae_kids for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ae_kids_delete_own" on public.ae_kids for delete using (auth.uid() = user_id);

-- updated_at 自動更新
create or replace function public.ae_kids_touch() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists ae_kids_touch on public.ae_kids;
create trigger ae_kids_touch before update on public.ae_kids for each row execute function public.ae_kids_touch();

grant select, insert, update, delete on public.ae_kids to authenticated;

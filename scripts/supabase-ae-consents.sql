-- 冒險英語：研究同意紀錄（取代原本寫在 ae_progress.research_consent 的做法）
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 只新增 ae_consents 這一張表，不碰任何既有的表。
--
-- 為什麼要獨立一張表：
--   1. 原本的 research_consent 欄位在舊表 ae_progress；多孩子改版後新用戶只有 ae_kids，
--      而且前端那段 update 少了 await，請求根本沒送出——所以到目前為止資料庫裡沒有任何同意紀錄。
--   2. IRB 要的是「誰、何時、同意了哪一版同意書」的稽核軌跡，每次開／關都應該是新的一列，
--      不是覆蓋一個布林值。撤回也要留一筆（consented = false）。
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run（必須手動執行一次，前端才寫得進去）

create table if not exists public.ae_consents (
  id               bigserial primary key,
  user_id          uuid not null references auth.users(id) on delete cascade,
  consented        boolean not null,             -- true = 同意；false = 關閉／撤回
  consent_version  text not null,                -- 同意書版本，見 src/lib/research.ts CONSENT_VERSION
  device_id        text,                         -- 當下裝置的隨機代號（對得上 ae_events.device_id）
  app_version      text,                         -- 介面版本
  created_at       timestamptz not null default now()
);

comment on table public.ae_consents is
  '冒險英語研究同意稽核紀錄：每次同意／撤回一列，含同意書版本。最新一列即目前狀態。';

create index if not exists ae_consents_user_ts on public.ae_consents (user_id, created_at desc);

-- ── RLS：只能寫自己的、讀自己的；研究者用 service key 讀全部 ──
alter table public.ae_consents enable row level security;

drop policy if exists ae_consents_insert_own on public.ae_consents;
drop policy if exists ae_consents_select_own on public.ae_consents;

create policy ae_consents_insert_own on public.ae_consents
  for insert with check (auth.uid() = user_id);

create policy ae_consents_select_own on public.ae_consents
  for select using (auth.uid() = user_id);

grant select, insert on public.ae_consents to authenticated;
grant usage, select on sequence public.ae_consents_id_seq to authenticated;

-- ── 目前每個帳號的同意狀態（最新一列）──
create or replace view public.ae_consent_current as
select distinct on (user_id)
  user_id, consented, consent_version, created_at as decided_at
from public.ae_consents
order by user_id, created_at desc;

-- 跟其他 ae_ view 一樣：用查詢者的權限執行，anon 讀不到
alter view public.ae_consent_current set (security_invoker = on);
revoke all on public.ae_consent_current from anon, authenticated;

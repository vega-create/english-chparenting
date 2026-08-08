-- 冒險英語：學習行為記錄（給日後論文用的資料）
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 只新增 ae_ 開頭的表、只對這些表開 RLS，不動任何既有的表。
--
-- 設計原則（兒童資料）：
--   1. 不記任何個資：沒有姓名、email、IP。使用者只用一組隨機產生的 device_id 代表
--   2. 家長沒同意就完全不記錄（同意開關預設關閉，存在 ae_progress.research_consent）
--   3. 只記「做了什麼」，不記「說了什麼」——語音辨識結果只存分數不存內容
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run

-- ── 1. 事件表 ──────────────────────────────────────────
create table if not exists public.ae_events (
  id          bigserial primary key,
  device_id   text not null,              -- 隨機 UUID，跟真實身分無關
  user_id     uuid references auth.users(id) on delete set null,  -- 有登入才有，用來做縱貫追蹤
  ts          timestamptz not null default now(),
  kind        text not null,              -- lesson_start / lesson_end / answer / replay / speak / session
  level       int,                        -- 第幾級 1-12
  mission     int,                        -- 第幾課 1-20
  step        text,                       -- wakeup / discover / challenge / talktime / complete
  item        text,                       -- 單字或題目 key（不含孩子輸入的內容）
  correct     boolean,                    -- 答對與否
  attempt     int,                        -- 第幾次嘗試
  score       numeric,                    -- 口說評分 0-1 / 星數
  ms          int,                        -- 花費毫秒
  meta        jsonb                       -- 其他（裝置類型等，不含個資）
);

comment on table public.ae_events is
  '冒險英語學習行為事件。不含個資，device_id 為隨機值。家長同意研究用途才會寫入。';

create index if not exists ae_events_device_ts on public.ae_events (device_id, ts);
create index if not exists ae_events_kind_ts   on public.ae_events (kind, ts);
create index if not exists ae_events_lesson    on public.ae_events (level, mission);

-- ── 2. RLS：只能寫，不能讀別人的 ────────────────────────
alter table public.ae_events enable row level security;

drop policy if exists ae_events_insert_any on public.ae_events;
drop policy if exists ae_events_select_own on public.ae_events;

-- 任何人（含未登入）都可以寫入自己的事件；研究者用 service key 讀取
create policy ae_events_insert_any on public.ae_events
  for insert with check (true);

-- 登入者只能讀自己的（家長想看自己孩子的紀錄時用）
create policy ae_events_select_own on public.ae_events
  for select using (auth.uid() is not null and auth.uid() = user_id);

-- ── 3. 研究同意欄位（加在既有的 ae_progress）────────────
alter table public.ae_progress
  add column if not exists research_consent boolean not null default false,
  add column if not exists consent_at timestamptz;

comment on column public.ae_progress.research_consent is
  '家長是否同意學習資料用於學術研究。預設 false，需在家長中心明確開啟。';

-- ── 4. 給研究用的彙總 view（只有 service key 讀得到）────
create or replace view public.ae_daily_summary as
select
  date_trunc('day', ts)                                        as day,
  count(distinct device_id)                                    as active_devices,
  count(*) filter (where kind = 'lesson_end')                  as lessons_done,
  count(*) filter (where kind = 'answer' and correct)          as correct_answers,
  count(*) filter (where kind = 'answer' and not correct)      as wrong_answers,
  round(avg(ms) filter (where kind = 'lesson_end') / 1000.0)   as avg_lesson_seconds
from public.ae_events
group by 1
order by 1 desc;

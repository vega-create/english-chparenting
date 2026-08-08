-- 冒險英語：退出紀錄（撤回研究同意時留下的匿名「墓碑」）
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 只新增 ae_withdrawals 這一張表，不碰任何既有的表。
--
-- 為什麼要有這張表：
--   家長按下刪除後，他的 ae_events 會整批消失。如果什麼都不留，
--   論文就寫不出「共 N 人參與、其中 M 人中途撤回」——而審稿人一定會問，
--   因為「會撤回的人」和「留下來的人」很可能本來就不同（差別流失 / attrition bias）。
--   留下來的樣本會系統性偏向撐得久的人，留存率與進步幅度都被高估，
--   而且沒有這張表的話，這個偏誤是**看不見的**。
--
--   臨床試驗的 CONSORT 流程圖規定要報告退出人數，這是同一個道理。
--
-- ⚠️ 這張表刻意**不放** device_id、user_id、任何可回推到個人的欄位。
--    它只回答「有幾個人退出、退出時大概是什麼狀態」，不回答「是誰」。
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run

create table if not exists public.ae_withdrawals (
  id            bigserial primary key,
  ts            timestamptz not null default now(),
  events_count  int,        -- 刪掉時累積了幾筆事件（活躍程度的代理指標）
  lessons_done  int,        -- 當時完成幾課
  had_pretest   boolean,    -- 有沒有做過前測
  bucket        text,       -- A/B 分組，用來檢查兩組退出率有沒有差
  app_version   text,       -- 哪一版介面下退出的
  exit_type     text,       -- 'consent_off'（只關掉記錄）/ 'delete'（連同資料刪除）
  reason        text,       -- 退出原因（選填，固定選項）
  comment       text        -- 補充說明（選填，自由填答）
);

comment on table public.ae_withdrawals is
  '撤回研究同意的匿名紀錄。不含任何可識別欄位，僅供論文報告流失率與檢查差別流失。';

-- 只能寫入，讀取一律用 service key
alter table public.ae_withdrawals enable row level security;

drop policy if exists ae_withdrawals_insert_any on public.ae_withdrawals;

create policy ae_withdrawals_insert_any on public.ae_withdrawals
  for insert with check (true);

comment on column public.ae_withdrawals.comment is
  '家長自由填答的退出原因。介面上已提醒不要填個資，但仍應視為可能含敏感內容，公開發表前必須人工檢視。';

-- ── 流失概況（論文報告流失率用）─────────────────────────
create or replace view public.ae_attrition as
select
  bucket,
  app_version,
  exit_type,
  count(*)                    as withdrawals,
  round(avg(events_count))    as avg_events_at_exit,
  round(avg(lessons_done), 1) as avg_lessons_at_exit,
  count(*) filter (where had_pretest) as had_pretest
from public.ae_withdrawals
group by 1, 2, 3
order by withdrawals desc;

-- ── 退出原因排行（拿來改產品用）─────────────────────────
-- 這是整個資料庫裡最直接可以行動的一張表：
-- 「太難」多就調難度曲線、「廣告」多就再收斂廣告、「沒興趣」多就檢討遊戲化設計
create or replace view public.ae_exit_reasons as
select
  reason,
  count(*)                    as n,
  round(avg(lessons_done), 1) as avg_lessons_when_quit
from public.ae_withdrawals
where reason is not null
group by 1
order by n desc;

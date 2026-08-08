-- 冒險英語 ae_events 第二版欄位：版本標記 / A-B 分組 / 音檔來源
-- 專案：lexcvcinmphkmavgswgn（與 learn / kids-studio / 記帳共用）
--
-- ⚠️ 只 alter ae_events 這一張表，不碰任何既有的表。
--
-- 為什麼這三個欄位現在就要加：
--   app_version  改版後的資料若不能切開，改版前後就混在一起，A/B 比較做不了
--   bucket       之後要做因果推論（不只是相關）的分組欄位，事後補等於沒有歷史資料
--   audio_src    要比較「合成語音 vs 真人配音」對學習的影響，事後補要重錄
--
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上 → Run

alter table public.ae_events
  add column if not exists app_version text,   -- 介面版本，見 src/lib/version.ts
  add column if not exists bucket      text,   -- 'A' / 'B'，見 src/lib/experiment.ts
  add column if not exists audio_src   text;   -- 'el' / 'human' / 'tts'

comment on column public.ae_events.app_version is
  '當下的介面版本（src/lib/version.ts 的 APP_VERSION）。改版後才切得開資料。';
comment on column public.ae_events.bucket is
  'A/B 分組，由 device_id 雜湊決定，同一台裝置永遠同一組。目前只記錄不切介面。';
comment on column public.ae_events.audio_src is
  '這次播的音檔來源：el=ElevenLabs 合成、human=真人錄音、tts=瀏覽器內建語音。';

-- 分析常用的查詢維度
create index if not exists ae_events_version on public.ae_events (app_version);
create index if not exists ae_events_bucket  on public.ae_events (bucket);

-- ── 前測／後測的彙總 view（組內前後測用）──────────────
-- 前測 kind='pretest'、後測 kind='posttest'，score 是答對題數、ms 是整份測驗耗時
create or replace view public.ae_prepost as
select
  coalesce(user_id::text, device_id) as subject,   -- 有登入用帳號，沒有就用裝置
  max(score) filter (where kind = 'pretest')  as pre_score,
  max(score) filter (where kind = 'posttest') as post_score,
  min(ts)    filter (where kind = 'pretest')  as pre_at,
  max(ts)    filter (where kind = 'posttest') as post_at
from public.ae_events
where kind in ('pretest', 'posttest')
group by 1;

-- ── 中途離開：在哪一步放棄 ─────────────────────────────
create or replace view public.ae_dropoff as
select level, mission, step, count(*) as abandons
from public.ae_events
where kind = 'abandon'
group by 1, 2, 3
order by abandons desc;

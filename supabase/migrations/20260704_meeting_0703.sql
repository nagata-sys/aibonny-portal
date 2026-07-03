-- Supabase SQL Editor で手動実行してください。
-- このリポジトリはフロントのみでサービスロールキーを持たないため、自動適用されません。

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id int not null,
  title text not null,
  url text not null,
  memo text,
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

drop policy if exists "submissions_select_own" on public.submissions;
create policy "submissions_select_own"
  on public.submissions for select
  using (auth.uid() = user_id);

drop policy if exists "submissions_insert_own" on public.submissions;
create policy "submissions_insert_own"
  on public.submissions for insert
  with check (auth.uid() = user_id);

drop policy if exists "submissions_update_own" on public.submissions;
create policy "submissions_update_own"
  on public.submissions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "submissions_delete_own" on public.submissions;
create policy "submissions_delete_own"
  on public.submissions for delete
  using (auth.uid() = user_id);

create index if not exists submissions_user_created_idx
  on public.submissions (user_id, created_at desc);

alter table public.reports
  add column if not exists hours numeric;

create table if not exists public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  sales_amount numeric,
  deals_text text,
  sales_activity_count int,
  note text,
  created_at timestamptz not null default now()
);

alter table public.weekly_reports enable row level security;

drop policy if exists "weekly_reports_select_own" on public.weekly_reports;
create policy "weekly_reports_select_own"
  on public.weekly_reports for select
  using (auth.uid() = user_id);

drop policy if exists "weekly_reports_insert_own" on public.weekly_reports;
create policy "weekly_reports_insert_own"
  on public.weekly_reports for insert
  with check (auth.uid() = user_id);

drop policy if exists "weekly_reports_update_own" on public.weekly_reports;
create policy "weekly_reports_update_own"
  on public.weekly_reports for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "weekly_reports_delete_own" on public.weekly_reports;
create policy "weekly_reports_delete_own"
  on public.weekly_reports for delete
  using (auth.uid() = user_id);

create index if not exists weekly_reports_user_week_idx
  on public.weekly_reports (user_id, week_start desc);

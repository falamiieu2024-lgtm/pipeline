-- Pipeline — paste this whole block into Supabase:
--   SQL Editor  ->  New query  ->  paste  ->  Run
-- Safe to run more than once.

create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  content     text not null,
  status      text not null default 'waiting'
                check (status in ('waiting', 'replied', 'rejected')),
  created_at  timestamptz not null default now()
);

-- Row Level Security: without this, any logged-in user could read everyone's rows.
alter table public.applications enable row level security;

drop policy if exists "read own applications"   on public.applications;
drop policy if exists "insert own applications" on public.applications;
drop policy if exists "update own applications" on public.applications;
drop policy if exists "delete own applications" on public.applications;

create policy "read own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "insert own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "update own applications"
  on public.applications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own applications"
  on public.applications for delete
  using (auth.uid() = user_id);

create index if not exists applications_user_created_idx
  on public.applications (user_id, created_at desc);

-- Pipeline — adds the status column. Paste into Supabase: SQL Editor -> New query -> Run.
-- Safe to run more than once. The DEFAULT is what keeps the grading bot's path working:
-- an insert that sets only `content` still succeeds.

alter table public.applications
  add column if not exists status text not null default 'waiting';

alter table public.applications
  drop constraint if exists applications_status_check;

alter table public.applications
  add constraint applications_status_check
  check (status in ('waiting', 'replied', 'rejected'));

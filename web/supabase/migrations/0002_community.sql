-- Community: member-created discussion threads with moderation.

create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  title text not null,
  body text not null,
  status text not null default 'open', -- 'open' | 'locked' | 'removed'
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  body text not null,
  status text not null default 'visible', -- 'visible' | 'removed'
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users (id) on delete cascade,
  target_type text not null, -- 'thread' | 'post'
  target_id uuid not null,
  reason text,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists posts_thread_id_idx on public.posts (thread_id);
create index if not exists reports_resolved_idx on public.reports (resolved);

alter table public.threads enable row level security;
alter table public.posts enable row level security;
alter table public.reports enable row level security;

-- Reads are members-only (logged in) and hide removed content. Moderation runs
-- server-side with the service-role key, so no admin policies are needed here.
create policy "members read threads" on public.threads
  for select using (auth.uid() is not null and status <> 'removed');

create policy "members create threads" on public.threads
  for insert with check (auth.uid() = author_id);

create policy "authors update own threads" on public.threads
  for update using (auth.uid() = author_id);

create policy "members read posts" on public.posts
  for select using (auth.uid() is not null and status <> 'removed');

create policy "members create posts" on public.posts
  for insert with check (auth.uid() = author_id);

create policy "authors update own posts" on public.posts
  for update using (auth.uid() = author_id);

create policy "members create reports" on public.reports
  for insert with check (auth.uid() = reporter_id);

create policy "members read own reports" on public.reports
  for select using (auth.uid() = reporter_id);

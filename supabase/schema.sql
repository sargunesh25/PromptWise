-- PromptWise schema for Supabase

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  is_favourite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  type text,
  questions jsonb,
  summary jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists chats_user_id_created_at_idx
  on public.chats (user_id, created_at desc);

create index if not exists messages_chat_id_created_at_idx
  on public.messages (chat_id, created_at asc);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger chats_set_updated_at
before update on public.chats
for each row
execute function public.handle_updated_at();

create trigger messages_set_updated_at
before update on public.messages
for each row
execute function public.handle_updated_at();

alter table public.profiles enable row level security;
alter table public.chats enable row level security;
alter table public.messages enable row level security;

create policy "Profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);

create policy "Profiles are updatable by owner" on public.profiles
  for update using (auth.uid() = id);

create policy "Chats are viewable by owner" on public.chats
  for select using (auth.uid() = user_id);

create policy "Chats are insertable by owner" on public.chats
  for insert with check (auth.uid() = user_id);

create policy "Chats are updatable by owner" on public.chats
  for update using (auth.uid() = user_id);

create policy "Chats are deletable by owner" on public.chats
  for delete using (auth.uid() = user_id);

create policy "Messages are viewable by owner" on public.messages
  for select using (auth.uid() = user_id);

create policy "Messages are insertable by owner" on public.messages
  for insert with check (auth.uid() = user_id);

create policy "Messages are updatable by owner" on public.messages
  for update using (auth.uid() = user_id);

create policy "Messages are deletable by owner" on public.messages
  for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

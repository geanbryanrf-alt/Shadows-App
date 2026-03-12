-- 1. Profiles (Tabela estendida para suportar a Lógica Anti-Pornografia)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  catholic_mode boolean default false,
  current_streak integer default 0,
  longest_streak integer default 0,
  total_xp integer default 0,
  current_level integer default 1,
  total_habits_completed integer default 0,
  perfect_days integer default 0,
  onboarding_complete boolean default false,
  is_pro boolean default false,
  mp_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Ativa RLS para Profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Trigger para criar Profile ao registrar no Supabase Auth
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Habits (Tabela global das armas disponíveis)
create type public.habit_pillar as enum ('BODY', 'SPIRIT', 'MIND', 'RELATIONS');
create type public.habit_block as enum ('MORNING', 'ANYTIME', 'NIGHT');

create table public.habits (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  pillar habit_pillar not null,
  block habit_block not null,
  xp_value integer not null,
  emoji text,
  catholic_only boolean default false,
  is_sos_action boolean default false
);
alter table public.habits enable row level security;
create policy "Habits are viewable by everyone" on public.habits for select using (true);
create policy "Habits are insertable by authenticated users" on public.habits for insert with check (auth.uid() is not null);

-- 3. User Habits (Hábitos que o usuário decidiu ativar para a sua jornada)
create table public.user_habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  habit_id uuid references public.habits(id) on delete cascade not null,
  is_active boolean default true,
  added_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, habit_id)
);
alter table public.user_habits enable row level security;
create policy "Users can view own user_habits" on public.user_habits for select using (auth.uid() = user_id);
create policy "Users can insert own user_habits" on public.user_habits for insert with check (auth.uid() = user_id);
create policy "Users can update own user_habits" on public.user_habits for update using (auth.uid() = user_id);
create policy "Users can delete own user_habits" on public.user_habits for delete using (auth.uid() = user_id);

-- 4. Daily Logs (A checklist diária)
create table public.daily_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  habit_id uuid references public.habits(id) on delete cascade not null,
  completed boolean default false,
  completed_at timestamp with time zone,
  unique(user_id, date, habit_id)
);
alter table public.daily_logs enable row level security;
create policy "Users can view own daily_logs" on public.daily_logs for select using (auth.uid() = user_id);
create policy "Users can modify own daily_logs" on public.daily_logs for all using (auth.uid() = user_id);

-- 5. Daily Entries (Diário da Caverna / Diário de Guerra)
create table public.daily_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, date)
);
alter table public.daily_entries enable row level security;
create policy "Users can view own daily_entries" on public.daily_entries for select using (auth.uid() = user_id);
create policy "Users can modify own daily_entries" on public.daily_entries for all using (auth.uid() = user_id);

-- 6. Trigger Map (O coração da aba Ameaças - Rastreio mental)
create table public.trigger_map (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  trigger_type text not null, -- Ex: Tédio Noturno, Dor de Cabeça, Estresse
  time_of_day integer not null check (time_of_day >= 0 and time_of_day <= 23),
  context text not null,
  resisted boolean default true, -- Se conseguiu vencer a vontade ou se foi Queda
  date date not null
);
alter table public.trigger_map enable row level security;
create policy "Users can view own trigger_map" on public.trigger_map for select using (auth.uid() = user_id);
create policy "Users can insert own trigger_map" on public.trigger_map for insert with check (auth.uid() = user_id);

-- 7. Accountability Partners
create type public.partner_status as enum ('PENDING', 'ACTIVE');
create table public.accountability_partners (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  partner_email text not null,
  partner_id uuid references public.profiles(id),
  status partner_status default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, partner_email)
);
alter table public.accountability_partners enable row level security;
create policy "Users can view own partners" on public.accountability_partners for select using (auth.uid() = user_id);
create policy "Users can insert own partners" on public.accountability_partners for insert with check (auth.uid() = user_id);
create policy "Users can update own partners" on public.accountability_partners for update using (auth.uid() = user_id);
create policy "Users can delete own partners" on public.accountability_partners for delete using (auth.uid() = user_id);

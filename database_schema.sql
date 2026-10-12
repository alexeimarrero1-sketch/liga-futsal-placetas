-- Esquema inicial sugerido para PostgreSQL cuando se conecte un servidor real.
-- IMPORTANTE: este archivo no crea el servidor ni configura seguridad automáticamente.
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  crest_url text,
  created_at timestamptz not null default now()
);
create table if not exists seasons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  season_id uuid references seasons(id),
  home_team_id uuid not null references teams(id),
  away_team_id uuid not null references teams(id),
  home_goals integer check(home_goals >= 0),
  away_goals integer check(away_goals >= 0),
  kickoff_at timestamptz,
  round_name text,
  status text not null default 'scheduled'
    check(status in ('scheduled','live','finished','postponed')),
  notes text,
  created_at timestamptz not null default now(),
  check(home_team_id <> away_team_id)
);
create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id),
  full_name text not null,
  shirt_number integer,
  position text,
  photo_url text,
  active boolean not null default true
);
create table if not exists match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  team_id uuid not null references teams(id),
  player_id uuid references players(id),
  event_type text not null check(event_type in ('goal','yellow_card','red_card','own_goal')),
  minute integer check(minute >= 0),
  created_at timestamptz not null default now()
);
-- Antes de producción: activar control de acceso, políticas por fila y una cuenta
-- de administrador. Nunca poner contraseñas ni claves secretas dentro de app.js.

create table if not exists public.teacher_accounts (
    id bigint generated always as identity primary key,
    full_name text not null,
    email text not null unique,
    password_hash text not null,
    password_salt text not null,
    created_at timestamptz not null default now()
);

create index if not exists teacher_accounts_email_idx
    on public.teacher_accounts (email);

-- Student profile registry and exam attempts for teacher dashboard reporting.

create table if not exists public.student_profiles (
  id bigserial primary key,
  full_name text not null,
  normalized_name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.student_exam_attempts (
  id bigserial primary key,
  student_id bigint not null references public.student_profiles(id) on delete cascade,
  level text not null,
  passage_title text,
  fluency_words_read integer not null default 0,
  fluency_total_words integer not null default 0,
  wpm integer not null default 0,
  accuracy_percent integer not null default 0,
  comprehension_score integer not null default 0,
  comprehension_total integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_student_exam_attempts_student_id
  on public.student_exam_attempts (student_id);

create index if not exists idx_student_exam_attempts_created_at
  on public.student_exam_attempts (created_at desc);

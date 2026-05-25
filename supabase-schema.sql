-- ============================================================
--  El Mouja Agency — Supabase database schema
--  Run this whole script in: Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- ---------- TEAM MEMBERS ----------
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null default '',
  role_fr     text not null default '',
  role_en     text not null default '',
  role_ar     text not null default '',
  initials    text not null default '',
  photo       text not null default '',          -- public URL or data URL
  sort_order  int  not null default 0,           -- controls display order
  created_at  timestamptz not null default now()
);

-- ---------- WORK ITEMS (réalisations) ----------
create table if not exists public.work_items (
  id          uuid primary key default gen_random_uuid(),
  type        text not null default 'image',     -- 'image' or 'video'
  title_fr    text not null default '',
  title_en    text not null default '',
  title_ar    text not null default '',
  cat_fr      text not null default '',
  cat_en      text not null default '',
  cat_ar      text not null default '',
  hue         int  not null default 210,         -- fallback background color
  image       text not null default '',          -- public URL or data URL
  video_url   text not null default '',          -- optional video link
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
--  ROW LEVEL SECURITY
--  Public visitors: read only.
--  Writing (add/edit/delete) is done with the service role key
--  OR by temporarily allowing it — see note at the bottom.
-- ============================================================
alter table public.team_members enable row level security;
alter table public.work_items   enable row level security;

-- Anyone (the website) can READ.
create policy "public read team"
  on public.team_members for select
  using (true);

create policy "public read work"
  on public.work_items for select
  using (true);

-- Allow the anon key to INSERT / UPDATE / DELETE.
-- This makes the built-in /admin page work without a login.
-- The /admin URL is unlisted; if you want it locked down later,
-- drop these 6 policies and manage content from the Supabase dashboard.
create policy "anon write team insert" on public.team_members for insert with check (true);
create policy "anon write team update" on public.team_members for update using (true);
create policy "anon write team delete" on public.team_members for delete using (true);

create policy "anon write work insert" on public.work_items for insert with check (true);
create policy "anon write work update" on public.work_items for update using (true);
create policy "anon write work delete" on public.work_items for delete using (true);

-- ============================================================
--  STORAGE BUCKET for uploaded photos / images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "anon upload media"
  on storage.objects for insert
  with check (bucket_id = 'media');

-- ============================================================
--  SEED DATA — the current team & work (optional, run once)
-- ============================================================
insert into public.team_members (name, role_fr, role_en, role_ar, initials, sort_order) values
  ('Hichem Ghebghoub', 'Fondateur & Directeur Créatif', 'Founder & Creative Director', 'المؤسس ومدير إبداعي', 'HG', 1),
  ('Amina Belkacem',  'Directrice Marketing',          'Marketing Director',          'مديرة التسويق',       'AB', 2),
  ('Yacine Mansouri', 'Réalisateur & Vidéaste',        'Director & Videographer',     'مخرج ومصوّر',         'YM', 3),
  ('Lina Hamdi',      'Graphiste',                     'Graphic Designer',            'مصمّمة جرافيك',       'LH', 4),
  ('Karim Saadi',     'Social Media Manager',          'Social Media Manager',        'مدير الشبكات الاجتماعية', 'KS', 5),
  ('Sara Benali',     'Stratège de Contenu',           'Content Strategist',          'كاتبة محتوى',         'SB', 6);

insert into public.work_items (type, title_fr, title_en, title_ar, cat_fr, cat_en, cat_ar, hue, sort_order) values
  ('video', 'Campagne de Lancement',     'Brand Launch Campaign', 'حملة إطلاق علامة', 'Production Vidéo', 'Video Production', 'إنتاج فيديو', 210, 1),
  ('image', 'Identité Visuelle Complète','Full Visual Identity',  'هوية بصرية كاملة', 'Branding',         'Branding',         'تصميم',       198, 2),
  ('image', 'Campagne Publicitaire',     'Advertising Campaign',  'حملة إعلانية',     'Publicité',        'Advertising',      'إشهار',       222, 3),
  ('video', 'Court-Métrage Cinématique', 'Cinematic Short Film',  'فيلم قصير سينمائي','Réalisation',      'Film Making',      'صناعة الأفلام', 205, 4),
  ('image', 'Série de Contenu UGC',      'UGC Content Series',    'محتوى UGC',        'Contenu',          'Content',          'محتوى',       190, 5),
  ('video', 'Couverture d''Événement',   'Event Coverage',        'تغطية فعالية',     'Événements',       'Events',           'أحداث',       215, 6),
  ('image', 'Design de Site Web',        'Website Design',        'موقع إلكتروني',    'Web',              'Web',              'تطوير ويب',   200, 7),
  ('video', 'Publicité Produit',         'Product Commercial',    'إعلان منتج',       'Production Vidéo', 'Video Production', 'إنتاج فيديو', 218, 8);

-- Done. Your tables are ready.

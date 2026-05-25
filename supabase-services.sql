-- ============================================================
--  El Mouja Agency — SERVICES table
--  Run this in: Supabase Dashboard -> SQL Editor -> New query
--  (Run it once. The main schema is already applied.)
-- ============================================================

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title_fr    text not null default '',
  title_en    text not null default '',
  title_ar    text not null default '',
  desc_fr     text not null default '',
  desc_en     text not null default '',
  desc_ar     text not null default '',
  icon        text not null default 'spark',     -- icon key (see list below)
  media_type  text not null default 'image',     -- 'image' or 'video'
  media       text not null default '',          -- example image URL
  video_url   text not null default '',          -- example video link/file
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "public read services"
  on public.services for select using (true);

create policy "anon write services insert" on public.services for insert with check (true);
create policy "anon write services update" on public.services for update using (true);
create policy "anon write services delete" on public.services for delete using (true);

-- ---- SEED with the current 10 services (optional, run once) ----
insert into public.services
  (title_fr, title_en, title_ar, desc_fr, desc_en, desc_ar, icon, sort_order)
values
  ('Gestion des réseaux sociaux','Social Media Management','إدارة الشبكات الاجتماعية',
   'Stratégie, design et création de contenu engageant.','Strategy, design and engaging content creation.','استراتيجية وتصميم وإنشاء محتوى جذاب.','social',1),
  ('Production vidéo','Video Production','إنتاج الفيديو',
   'Écriture de script, voix off, tournage et montage professionnel.','Scriptwriting, voice-over, filming and professional editing.','كتابة السيناريو والتعليق الصوتي والتصوير والمونتاج الاحترافي.','video',2),
  ('Stratégie marketing','Marketing Strategy','استراتيجية التسويق',
   'Un plan d''action personnalisé pour développer votre marque.','A tailored action plan to grow your brand.','خطة عمل مخصصة لتنمية علامتك التجارية.','strategy',3),
  ('Publicité','Advertising','الإعلان',
   'Campagnes publicitaires ciblées sur toutes les plateformes.','Targeted ad campaigns across all platforms.','حملات إعلانية موجهة على جميع المنصات.','ad',4),
  ('Sponsors & partenariats','Sponsors & Partnerships','الرعاة والشراكات',
   'Vous relier aux sponsors et partenaires qui boostent la croissance.','Connecting you with sponsors and partners that drive growth.','ربطك بالرعاة والشركاء الذين يعززون النمو.','sponsor',5),
  ('Contenu UGC','UGC Content','محتوى UGC',
   'Contenu authentique créé pour votre marque.','Authentic content created for your brand.','محتوى أصلي تم إنشاؤه لعلامتك التجارية.','ugc',6),
  ('Sites web & applications','Websites & Apps','مواقع وتطبيقات',
   'Sites web et applications mobiles modernes et rapides.','Modern, fast websites and mobile apps.','مواقع وتطبيقات جوال حديثة وسريعة.','web',7),
  ('Réalisation de films','Film Making','صناعة الأفلام',
   'Courts-métrages et publicités de qualité cinématographique.','Short films and ads of cinematic quality.','أفلام قصيرة وإعلانات بجودة سينمائية.','film',8),
  ('Organisation d''événements','Event Organization','تنظيم الفعاليات',
   'Planification et organisation d''événements inoubliables.','Planning and organizing unforgettable events.','تخطيط وتنظيم فعاliات لا تُنسى.','event',9),
  ('Mariages & soutenances','Weddings & Defenses','حفلات الزفاف والمناقشات',
   'Couverture et organisation de mariages et de soutenances.','Coverage and organization of weddings and thesis defenses.','تغطية وتنظيم حفلات الزفاف ومناقشات التخرج.','wedding',10);

-- Done.

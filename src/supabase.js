// ============================================================
//  Supabase client + data helpers for El Mouja Agency
//
//  Configure your project in a `.env` file at the project root:
//    VITE_SUPABASE_URL=https://xxxxx.supabase.co
//    VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
//
//  If those are not set, the site falls back to src/data.json
//  so it still works during development.
// ============================================================
import { createClient } from "@supabase/supabase-js";
import fallback from "./data.json";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url, key)
  : null;

/* ---- map DB rows <-> app shape ---- */
const rowToMember = (r) => ({
  id: r.id,
  name: r.name,
  role: { fr: r.role_fr, en: r.role_en, ar: r.role_ar },
  initials: r.initials,
  photo: r.photo || "",
});

const memberToRow = (m, order) => ({
  name: m.name,
  role_fr: m.role.fr,
  role_en: m.role.en,
  role_ar: m.role.ar,
  initials: m.initials,
  photo: m.photo || "",
  sort_order: order,
});

const rowToWork = (r) => ({
  id: r.id,
  type: r.type,
  title: { fr: r.title_fr, en: r.title_en, ar: r.title_ar },
  cat: { fr: r.cat_fr, en: r.cat_en, ar: r.cat_ar },
  hue: r.hue,
  image: r.image || "",
  video_url: r.video_url || "",
});

const workToRow = (w, order) => ({
  type: w.type,
  title_fr: w.title.fr,
  title_en: w.title.en,
  title_ar: w.title.ar,
  cat_fr: w.cat.fr,
  cat_en: w.cat.en,
  cat_ar: w.cat.ar,
  hue: w.hue,
  image: w.image || "",
  video_url: w.video_url || "",
  sort_order: order,
});

/* ---- READ (used by the public website) ---- */
export async function fetchTeam() {
  if (!supabase) return fallback.teamMembers;
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("fetchTeam:", error.message);
    return fallback.teamMembers;
  }
  return data.map(rowToMember);
}

export async function fetchWork() {
  if (!supabase) return fallback.workItems;
  const { data, error } = await supabase
    .from("work_items")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("fetchWork:", error.message);
    return fallback.workItems;
  }
  return data.map(rowToWork);
}

/* ---- WRITE (used by the /admin page) ---- */
export async function saveTeam(members) {
  if (!supabase) throw new Error("Supabase non configuré");
  // simplest reliable sync: delete all, re-insert in order
  const del = await supabase
    .from("team_members")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (del.error) throw del.error;
  if (members.length) {
    const rows = members.map((m, i) => memberToRow(m, i + 1));
    const ins = await supabase.from("team_members").insert(rows);
    if (ins.error) throw ins.error;
  }
}

export async function saveWork(items) {
  if (!supabase) throw new Error("Supabase non configuré");
  const del = await supabase
    .from("work_items")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (del.error) throw del.error;
  if (items.length) {
    const rows = items.map((w, i) => workToRow(w, i + 1));
    const ins = await supabase.from("work_items").insert(rows);
    if (ins.error) throw ins.error;
  }
}

/* ---- IMAGE UPLOAD to Supabase Storage ----
   Returns a public URL. Falls back to returning the data URL
   directly if storage isn't available. */
export async function uploadImage(file, dataUrl) {
  if (!supabase) return dataUrl;
  try {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from("media")
      .upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.warn("uploadImage fell back to data URL:", e.message);
    return dataUrl;
  }
}

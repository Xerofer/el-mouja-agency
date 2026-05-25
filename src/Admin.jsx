import { useState, useRef, useEffect } from "react";
import {
  fetchTeam,
  fetchWork,
  saveTeam,
  saveWork,
  uploadImage,
  isSupabaseConfigured,
} from "./supabase";
import "./admin.css";

/* ============================================================
   El Mouja — Admin / Content Manager
   Edit team members & work items, then download data.json
   ============================================================ */

const LANGS = [
  { key: "fr", label: "Français" },
  { key: "en", label: "English" },
  { key: "ar", label: "العربية" },
];

const uid = (prefix) =>
  `${prefix}-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;

const emptyMember = () => ({
  id: uid("tm"),
  name: "",
  role: { fr: "", en: "", ar: "" },
  initials: "",
  photo: "",
});

const emptyWork = () => ({
  id: uid("wk"),
  type: "image",
  title: { fr: "", en: "", ar: "" },
  cat: { fr: "", en: "", ar: "" },
  hue: 268,
  image: "",
  video_url: "",
});

/* read an image file as a compressed data URL */
/* read an image file as a (possibly resized) data URL.
   PNG / WebP / GIF keep transparency (exported as PNG);
   JPEG stays JPEG since it's smaller and has no transparency anyway. */
function fileToDataURL(file, maxW = 900) {
  return new Promise((resolve, reject) => {
    const keepAlpha = /png|webp|gif/i.test(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        // do NOT fill a background — leave the canvas transparent
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(
          keepAlpha
            ? canvas.toDataURL("image/png")
            : canvas.toDataURL("image/jpeg", 0.85)
        );
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---- small reusable bits ---- */
function Field({ label, children, hint }) {
  return (
    <label className="af-field">
      <span className="af-label">{label}</span>
      {children}
      {hint && <span className="af-hint">{hint}</span>}
    </label>
  );
}

function ImagePicker({ value, onChange, label, round }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      // compress locally, then upload to Supabase Storage (or keep data URL)
      const dataUrl = await fileToDataURL(file, round ? 700 : 1000);
      const url = await uploadImage(file, dataUrl);
      onChange(url);
    } catch {
      alert("Impossible de lire cette image.");
    }
    setBusy(false);
  };

  return (
    <div className="af-field">
      <span className="af-label">{label}</span>
      <div className="af-image-row">
        <div className={`af-thumb ${round ? "round" : ""}`}>
          {value ? (
            <img src={value} alt="" />
          ) : (
            <span className="af-thumb-empty">—</span>
          )}
        </div>
        <div className="af-image-actions">
          <button
            type="button"
            className="ab ab-soft"
            onClick={() => inputRef.current?.click()}
          >
            {busy ? "..." : value ? "Changer l'image" : "Choisir une image"}
          </button>
          {value && (
            <button
              type="button"
              className="ab ab-ghost"
              onClick={() => onChange("")}
            >
              Retirer
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={pick}
            hidden
          />
        </div>
      </div>
    </div>
  );
}

/* ---- Video picker: upload a file OR paste a link ---- */
function VideoPicker({ value, onChange, label }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const isUploaded = value && value.startsWith("http") &&
    /\.(mp4|webm|mov|m4v)(\?|$)/i.test(value);

  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // guard against very large files (Supabase free tier / slow uploads)
    if (file.size > 50 * 1024 * 1024) {
      alert(
        "Vidéo trop lourde (max 50 Mo). Compressez-la, ou collez plutôt un lien YouTube / Vimeo."
      );
      e.target.value = "";
      return;
    }
    setBusy(true);
    try {
      const url = await uploadImage(file, ""); // uploads any file type
      if (!url) throw new Error("upload");
      onChange(url);
    } catch {
      alert("Échec du téléversement de la vidéo.");
    }
    setBusy(false);
    e.target.value = "";
  };

  return (
    <div className="af-field">
      <span className="af-label">{label}</span>
      <div className="af-video">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://youtube.com/...  ou  https://vimeo.com/..."
        />
        <div className="af-video-actions">
          <span className="af-hint">
            Collez un lien YouTube / Vimeo ci-dessus, ou téléversez un
            fichier vidéo :
          </span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="ab ab-soft"
              onClick={() => inputRef.current?.click()}
            >
              {busy ? "Téléversement..." : "Téléverser une vidéo"}
            </button>
            {value && (
              <button
                type="button"
                className="ab ab-ghost"
                onClick={() => onChange("")}
              >
                Retirer
              </button>
            )}
          </div>
          {isUploaded && (
            <video
              src={value}
              className="af-video-preview"
              controls
              preload="metadata"
            />
          )}
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            onChange={pickFile}
            hidden
          />
        </div>
      </div>
    </div>
  );
}

/* ---- Team member editor ---- */
function MemberEditor({ member, onChange, onDelete }) {
  const set = (patch) => onChange({ ...member, ...patch });
  const setRole = (lng, v) =>
    onChange({ ...member, role: { ...member.role, [lng]: v } });

  return (
    <div className="af-card">
      <div className="af-card-head">
        <div className="af-card-title">
          {member.name || "Nouveau membre"}
        </div>
        <button className="ab ab-danger" onClick={onDelete} type="button">
          Supprimer
        </button>
      </div>

      <div className="af-grid">
        <Field label="Nom complet">
          <input
            value={member.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="ex: Hichem Ghebghoub"
          />
        </Field>
        <Field
          label="Initiales"
          hint="2 lettres — affichées si aucune photo"
        >
          <input
            value={member.initials}
            maxLength={3}
            onChange={(e) =>
              set({ initials: e.target.value.toUpperCase() })
            }
            placeholder="HG"
          />
        </Field>
      </div>

      <div className="af-grid af-grid-3">
        {LANGS.map((l) => (
          <Field key={l.key} label={`Poste (${l.label})`}>
            <input
              value={member.role[l.key]}
              dir={l.key === "ar" ? "rtl" : "ltr"}
              onChange={(e) => setRole(l.key, e.target.value)}
              placeholder={l.key === "ar" ? "المنصب" : "Role"}
            />
          </Field>
        ))}
      </div>

      <ImagePicker
        round
        label="Photo (PNG/JPG — portrait recommandé)"
        value={member.photo}
        onChange={(v) => set({ photo: v })}
      />
    </div>
  );
}

/* ---- Work item editor ---- */
function WorkEditor({ item, onChange, onDelete }) {
  const set = (patch) => onChange({ ...item, ...patch });
  const setL = (field, lng, v) =>
    onChange({ ...item, [field]: { ...item[field], [lng]: v } });

  return (
    <div className="af-card">
      <div className="af-card-head">
        <div className="af-card-title">
          {item.title.fr || item.title.en || "Nouvelle réalisation"}
        </div>
        <button className="ab ab-danger" onClick={onDelete} type="button">
          Supprimer
        </button>
      </div>

      <div className="af-grid">
        <Field label="Type">
          <select
            value={item.type}
            onChange={(e) => set({ type: e.target.value })}
          >
            <option value="image">Image / Photo</option>
            <option value="video">Vidéo</option>
          </select>
        </Field>
        <Field
          label="Couleur de fond"
          hint="Utilisée si aucune image n'est ajoutée"
        >
          <div className="af-hue">
            <input
              type="range"
              min="0"
              max="360"
              value={item.hue}
              onChange={(e) => set({ hue: Number(e.target.value) })}
            />
            <span
              className="af-hue-dot"
              style={{
                background: `linear-gradient(150deg, hsl(${item.hue} 45% 32%), hsl(${
                  item.hue + 30
                } 50% 16%))`,
              }}
            />
          </div>
        </Field>
      </div>

      <div className="af-grid af-grid-3">
        {LANGS.map((l) => (
          <Field key={l.key} label={`Titre (${l.label})`}>
            <input
              value={item.title[l.key]}
              dir={l.key === "ar" ? "rtl" : "ltr"}
              onChange={(e) => setL("title", l.key, e.target.value)}
              placeholder={l.key === "ar" ? "العنوان" : "Title"}
            />
          </Field>
        ))}
      </div>

      <div className="af-grid af-grid-3">
        {LANGS.map((l) => (
          <Field key={l.key} label={`Catégorie (${l.label})`}>
            <input
              value={item.cat[l.key]}
              dir={l.key === "ar" ? "rtl" : "ltr"}
              onChange={(e) => setL("cat", l.key, e.target.value)}
              placeholder={l.key === "ar" ? "التصنيف" : "Category"}
            />
          </Field>
        ))}
      </div>

      <ImagePicker
        label={
          item.type === "video"
            ? "Image de couverture (miniature de la vidéo)"
            : "Image de la réalisation (optionnel)"
        }
        value={item.image}
        onChange={(v) => set({ image: v })}
      />

      {item.type === "video" && (
        <VideoPicker
          label="Vidéo de la réalisation"
          value={item.video_url}
          onChange={(v) => set({ video_url: v })}
        />
      )}
    </div>
  );
}

/* ============================================================
   ADMIN ROOT
   ============================================================ */
export default function Admin() {
  const [tab, setTab] = useState("team");
  const [team, setTeam] = useState([]);
  const [work, setWork] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.dir = "ltr";
    document.title = "El Mouja — Gestion du contenu";
    Promise.all([fetchTeam(), fetchWork()])
      .then(([tm, wk]) => {
        setTeam(tm);
        setWork(wk);
      })
      .catch(() => setToast("Erreur de chargement des données"))
      .finally(() => setLoadingData(false));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const markDirty = () => setDirty(true);

  /* team ops */
  const updateMember = (i, m) => {
    setTeam((t) => t.map((x, idx) => (idx === i ? m : x)));
    markDirty();
  };
  const addMember = () => {
    setTeam((t) => [...t, emptyMember()]);
    markDirty();
  };
  const deleteMember = (i) => {
    if (!confirm("Supprimer ce membre ?")) return;
    setTeam((t) => t.filter((_, idx) => idx !== i));
    markDirty();
  };
  const moveMember = (i, dir) => {
    setTeam((t) => {
      const j = i + dir;
      if (j < 0 || j >= t.length) return t;
      const copy = [...t];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
    markDirty();
  };

  /* work ops */
  const updateWork = (i, w) => {
    setWork((arr) => arr.map((x, idx) => (idx === i ? w : x)));
    markDirty();
  };
  const addWork = () => {
    setWork((arr) => [...arr, emptyWork()]);
    markDirty();
  };
  const deleteWork = (i) => {
    if (!confirm("Supprimer cette réalisation ?")) return;
    setWork((arr) => arr.filter((_, idx) => idx !== i));
    markDirty();
  };
  const moveWork = (i, dir) => {
    setWork((arr) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      const copy = [...arr];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
    markDirty();
  };

  /* publish — save everything to Supabase */
  const publish = async () => {
    if (!isSupabaseConfigured) {
      showToast("Supabase non configuré — voir le fichier .env");
      return;
    }
    setSaving(true);
    try {
      await saveTeam(team);
      await saveWork(work);
      setDirty(false);
      showToast("✓ Publié — le site est à jour");
    } catch (e) {
      showToast("Erreur : " + (e.message || "échec de la sauvegarde"));
    }
    setSaving(false);
  };

  return (
    <div className="admin">
      <header className="admin-head">
        <div className="admin-head-in">
          <div className="admin-brand">
            <img src="/logo.png" alt="" />
            <div>
              <div className="admin-brand-name">El Mouja</div>
              <div className="admin-brand-sub">Gestion du contenu</div>
            </div>
          </div>
          <div className="admin-head-actions">
            <a className="ab ab-ghost" href="/" target="_blank" rel="noreferrer">
              Voir le site
            </a>
            <button
              className="ab ab-primary"
              onClick={publish}
              disabled={saving || loadingData}
            >
              {saving
                ? "Publication..."
                : (dirty ? "● " : "") + "Publier les changements"}
            </button>
          </div>
        </div>
      </header>

      <div className="admin-body">
        <div className="admin-note">
          <strong>Comment ça marche :</strong> ajoutez ou modifiez les
          membres et réalisations ci-dessous, puis cliquez sur{" "}
          <em>Publier les changements</em>. Le contenu est enregistré sur
          la base de données et apparaît immédiatement sur le site —
          aucune reconstruction nécessaire.
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === "team" ? "active" : ""}`}
            onClick={() => setTab("team")}
          >
            Équipe <span className="admin-count">{team.length}</span>
          </button>
          <button
            className={`admin-tab ${tab === "work" ? "active" : ""}`}
            onClick={() => setTab("work")}
          >
            Réalisations <span className="admin-count">{work.length}</span>
          </button>
        </div>

        {tab === "team" && (
          <div className="admin-section">
            {team.map((m, i) => (
              <div key={m.id} className="af-row">
                <div className="af-order">
                  <button
                    type="button"
                    onClick={() => moveMember(i, -1)}
                    disabled={i === 0}
                    aria-label="Monter"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMember(i, 1)}
                    disabled={i === team.length - 1}
                    aria-label="Descendre"
                  >
                    ▼
                  </button>
                </div>
                <MemberEditor
                  member={m}
                  onChange={(x) => updateMember(i, x)}
                  onDelete={() => deleteMember(i)}
                />
              </div>
            ))}
            <button className="ab ab-add" onClick={addMember}>
              + Ajouter un membre
            </button>
          </div>
        )}

        {tab === "work" && (
          <div className="admin-section">
            {work.map((w, i) => (
              <div key={w.id} className="af-row">
                <div className="af-order">
                  <button
                    type="button"
                    onClick={() => moveWork(i, -1)}
                    disabled={i === 0}
                    aria-label="Monter"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveWork(i, 1)}
                    disabled={i === work.length - 1}
                    aria-label="Descendre"
                  >
                    ▼
                  </button>
                </div>
                <WorkEditor
                  item={w}
                  onChange={(x) => updateWork(i, x)}
                  onDelete={() => deleteWork(i)}
                />
              </div>
            ))}
            <button className="ab ab-add" onClick={addWork}>
              + Ajouter une réalisation
            </button>
          </div>
        )}

        <footer className="admin-foot">
          <a href="/">← Retour au site</a>
          <span>
            {isSupabaseConfigured
              ? "Les changements sont publiés directement sur Supabase."
              : "⚠ Supabase non configuré — créez un fichier .env (voir .env.example)."}
          </span>
        </footer>
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}

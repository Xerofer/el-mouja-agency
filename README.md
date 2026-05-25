# الموجة — El Mouja Agency

Site web vitrine (portfolio) pour **El Mouja**, agence de communication,
publicite et marketing. Construit avec **React + Vite**, animations
**Framer Motion**, et base de donnees **Supabase**.

## Fonctionnalites

- Page d'accueil avec animation d'entree
- Sections : Accueil / A propos / Services / Realisations / Equipe / Rejoignez-nous / Contact
- Mode clair et mode sombre
- Galerie de realisations en mosaique (masonry) avec visionneuse (lightbox)
- Showroom equipe : defilement horizontal automatique
- Selecteur de langue Arabe (RTL) / Anglais / Francais
- Palette de couleurs oceanique (inspiree du logo)
- **Page d'administration connectee a Supabase** pour gerer equipe & realisations

## 1. Demarrer

```bash
npm install
npm run dev
```

Le site : http://localhost:5173 — l'admin : http://localhost:5173/admin

## 2. Configurer Supabase (important)

Le site charge l'equipe et les realisations depuis Supabase. Sans
configuration, il utilise les donnees d'exemple de `src/data.json`.

### Etape A — creer la base de donnees

1. Creez un projet sur https://supabase.com
2. Dans le projet : **SQL Editor** -> **New query**
3. Copiez tout le contenu du fichier **`supabase-schema.sql`** et executez-le.
   Cela cree les tables, les regles de securite, le bucket d'images et
   les donnees d'exemple.

### Etape B — connecter le site

1. Dans Supabase : **Settings -> API**, copiez **Project URL** et la cle
   **anon public**.
2. A la racine du projet, copiez `.env.example` vers `.env` :
   ```
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre-cle-anon
   ```
3. Relancez `npm run dev`. Le site lit maintenant depuis Supabase.

> Le fichier `.env` n'est PAS envoye sur Git (voir `.gitignore`).
> Sur Vercel/Netlify, ajoutez ces 2 variables dans les reglages du projet
> (Environment Variables).

## 3. Gerer le contenu — page /admin

Ouvrez **`/admin`** (URL non listee sur le site).

- Onglet **Equipe** / **Realisations** : ajouter, modifier, reordonner,
  supprimer. Les images sont televersees vers Supabase Storage.
- Cliquez sur **Publier les changements** : tout est enregistre sur
  Supabase et apparait **immediatement** sur le site, sans reconstruction.

## 4. Build de production

```bash
npm run build      # genere dist/
npm run preview    # previsualise
```

## Personnalisation du code

- **Equipe & realisations** : geres via `/admin` (Supabase)
- **Textes du site** : `src/i18n.js` -> objet `translations`
- **Telephone & reseaux sociaux** : `src/i18n.js` -> `agencyContact`
- **Couleurs** : `src/index.css` (variables `--bg`, `--violet`, etc.)
- **Logo** : `public/logo.png` et `public/logo.svg`

## Deploiement

La route `/admin` necessite un SPA fallback. Les fichiers de config sont
inclus : `public/_redirects` (Netlify), `vercel.json` (Vercel).
N'oubliez pas d'ajouter les variables `VITE_SUPABASE_*` dans l'hebergeur.

## Stack

- React 19 / Vite 8 / Framer Motion 12 / Supabase

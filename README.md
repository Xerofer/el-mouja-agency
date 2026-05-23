# الموجة — El Mouja Agency

Site web vitrine (portfolio) pour **El Mouja**, agence de communication, publicite et marketing.
Construit avec **React + Vite** et animations **Framer Motion**.

## Fonctionnalites

- Page d'accueil avec animation d'entree (prechargeur avec vague animee)
- Sections : Accueil / A propos / Services / Realisations / Equipe / Rejoignez-nous / Contact
- Mode clair et mode sombre (bouton dans la barre de navigation)
- Grille de realisations filtrable (videos / images)
- Showroom equipe : defilement horizontal automatique
- Formulaires "Rejoignez-nous" : Createur de contenu & Entreprise / Marque
- Selecteur de langue Arabe (RTL) / Anglais / Francais
- **Page d'administration pour gerer l'equipe et les realisations**
- Entierement responsive

## Demarrer

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173

## Build de production

```bash
npm run build      # genere le dossier dist/
npm run preview    # previsualise le build
```

## ⚙️ Page d'administration — ajouter equipe & realisations

Une page de gestion du contenu est disponible a l'adresse **`/admin`**
(par exemple http://localhost:5173/admin ou https://votre-site.com/admin).

### Comment ajouter un membre ou une realisation

1. Ouvrez **`/admin`** dans le navigateur.
2. Onglet **Equipe** ou **Realisations** : cliquez sur "+ Ajouter",
   remplissez les champs (nom, poste dans les 3 langues, photo, etc.).
   Vous pouvez aussi reordonner (fleches) ou supprimer des elements.
3. Cliquez sur **"Telecharger data.json"** en haut a droite.
4. Remplacez le fichier **`src/data.json`** du projet par celui telecharge.
5. Reconstruisez / republiez le site (`npm run build`, ou re-deploiement).
   Le nouveau contenu apparait automatiquement sur le site.

> Astuce : avant de modifier, vous pouvez cliquer sur **"Importer data.json"**
> pour recharger le fichier `data.json` actuel et continuer l'edition.

Les photos ajoutees via l'admin sont integrees directement dans le fichier
`data.json` (encodees), donc aucun fichier image separe a gerer.

## Personnalisation du code

- **Contenu equipe & realisations** : gere via `/admin` -> `src/data.json`
- **Textes du site** (sections, menus...) : `src/i18n.js` -> objet `translations`
- **Telephone & reseaux sociaux** : `src/i18n.js` -> objet `agencyContact`
  (valeurs d'exemple a remplacer)
- **Theme par defaut** : `useState("dark")` dans `App` (src/App.jsx)
- Le logo se trouve dans `public/logo.png` et `public/logo.svg`

## Deploiement

Le site utilise une route `/admin`. Pour qu'elle fonctionne en production,
l'hebergeur doit renvoyer `index.html` pour les routes inconnues (SPA fallback).
Les fichiers de configuration sont deja inclus :

- **Netlify** : `public/_redirects`
- **Vercel** : `vercel.json`

Pour un autre hebergeur, configurez la redirection de toutes les routes
vers `index.html`.

> Les formulaires "Rejoignez-nous" sont front-end uniquement (message de
> succes). Pour recevoir les demandes, connectez-les a un service e-mail/backend.

## Stack

- React 19 / Vite 8 / Framer Motion 12

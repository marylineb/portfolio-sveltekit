# Portfolio — Maryline Biloa

Mon portfolio de développeuse web : projets, parcours, CV et contact.
Étudiante en Bachelor Développement Web à MyDigitalSchool Lyon.

**En ligne :** https://marylinebiloa.com

## Stack

SvelteKit · Svelte 5 · GSAP · Vercel

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil et présentation |
| `/work` | Tous les projets, avec une page détaillée par projet |
| `/about` | Parcours, compétences, CV à télécharger |
| `/contact` | Formulaire qui ouvre la messagerie du visiteur (`mailto:`), sans serveur |
| `/mentions-legales`, `/politique-confidentialite` | Pages légales |

Projets présentés : Crimson Crypt (SvelteKit, Supabase), jeu UNO (Symfony), jeu de plateau échecs et dames (PHP), memory card (PHP), refonte du restaurant Paul Bert (SCSS), premiers sites front-end, stage de community management chez Garde ma Licorne.

## Lancer le projet

```bash
git clone https://github.com/marylineb/portfolio-sveltekit.git
cd portfolio-sveltekit
npm install
npm run dev
```

Aucune variable d'environnement n'est nécessaire.

## Structure

```text
src/
├── lib/
│   ├── components/      # en-tête et écran de chargement
│   └── data/
│       └── projects.ts  # liste des projets affichés sur /work
└── routes/
    ├── work/            # une page par projet
    ├── about/
    └── contact/
static/
├── docs/                # CV en PDF
└── img/                 # captures et visuels des projets
```

Pour ajouter un projet : une entrée dans `src/lib/data/projects.ts` et une page dans `src/routes/work/<nom-du-projet>/`.

## Contact

[LinkedIn](https://www.linkedin.com/in/maryline-biloa/) · [GitHub](https://github.com/marylineb)

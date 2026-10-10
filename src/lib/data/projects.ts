export type Project = {
  id: string;
  tag: string;
  title: string;
  link: string;
  image: string;
  description?: string;
  results: string[];
};

export const projects: Project[] = [
  {
    id: "uno",
    tag: "Full-Stack / Symfony / Game",
    title: "Jeu UNO développé avec Symfony, avec logique de jeu structurée côté backend.",
    link: "/work/uno",
    image: "/img/captureuno.png",
    results: [
      "Architecture MVC avec Symfony",
      "Gestion des cartes, joueurs et tours",
      "Déploiement en ligne avec Railway",
    ],
  },
  {
    id: "crimsoncrypt",
    tag: "SvelteKit / Supabase / Vercel / GSAP",
    title: "Crimson Crypt — mini jeu web (4 niveaux) avec progression & leaderboard",
    link: "/work/crimsoncrypt",
    image: "/img/screencapture-crimson-crypt-vercel-app-dashboard-2026-03-09-11_35_28.png",
    results: [
      "Progression sauvegardée (niveaux débloqués)",
      "Scores & leaderboard persistants (Supabase)",
      "API SvelteKit + cookies + déploiement Vercel",
    ],
  },
  {
    id: "plateau",
    tag: "PHP / Game Logic / session",
    title: "jeu de plateau royal mêlant échec et dame avec php.",
    link: "/work/plateau",
    image: "/img/plateau.png",
    results: [
      "Règles + déplacements gérés",
      "Affichage plateau dynamique",
      "Gestion des tours",
    ],
  },
  {
    id: "memorycard",
    tag: "PHP / Game Logic / session",
    title: "la création d'un jeu de memory card avec php.",
    link: "/work/memorycard",
    image: "/img/capturememory.png",
    results: [
      "Logique de matching fonctionnelle",
      "Gestion score/états",
      "Interface responsive",
    ],
  },
  {
    id: "1erportfolio",
    tag: "SvelteKit / Vercel",
    title: "mon tout 1er site sveltekit hébergé gratuitement sur vercel",
    link: "/work/1erportfolio/",
    image: "/img/capture1.png",
    results: [
      "Déploiement Vercel + build SvelteKit OK",
      "Routing multi-pages configuré",
      "Optimisation du responsive",
    ],
  },
  {
    id: "paulbert",
    tag: "SCSS / UI Design / responsive",
    title: "refonte du site web du restaurant de paul bert avec scss",
    link: "/work/paulbert",
    image: "/img/screencapture-marylineb-github-io-refonte-restau-paul-bert-2026-03-09-11_20_21.png",
    results: [
      "Refonte UI + meilleure lisibilité",
      "Structure sections plus claire",
      "CTA + navigation améliorés",
    ],
  },
  {
    id: "frontend",
    tag: "Front-End / css / responsive",
    title: "quelques sites développés avec accent sur le front HTML/CSS.",
    link: "/work/frontend",
    image: "/img/screencapture-marylineb-github-io-essaie-site-1-2026-02-24-09_03_28.png",
    results: ["Composants réutilisables", "Meilleure hiérarchie UI"],
  },
  {
    id: "stage-gardemalicorne",
    tag: "Community Management / Contenu / Réseaux sociaux",
    title: "Garde ma Licorne",
    link: "/work/stage-gardemalicorne",
    image: "/img/stage.png",
    description:
      "Stage de 3 mois en Community Management chez Garde ma Licorne. Développement de contenus visuels et éditoriaux pour Instagram et TikTok, planification stratégique, suivi des performances et renforcement du lien entre la marque et sa communauté.",
    results: [
      "Calendrier éditorial structuré",
      "Formats engageants multi-plateformes",
      "Suivi des KPIs et optimisation",
    ],
  },
];

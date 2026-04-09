export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  technologies: string[];
  description: string;
  features: string[];
  challenges: string[];
  results: string[];
  tags?: string[]; // ✅ AJOUT
  links?: { label: string; href: string }[];
  images?: { src: string; alt: string; caption?: string }[];
  seo?: { title?: string; description?: string };
};

export const projects: Record<string, Project> = {
  memorygame: {
    slug: "memorygame",
    title: "MemoryGame (PHP) — Jeu de mémoire",
    year: "2026",
    role: "Développement Web (PHP)",
    technologies: ["PHP", "HTML", "CSS", "Sessions"],
    tags: ["backend"], 
    description:
      "Un mini-jeu de mémoire développé en PHP...",
    features: [],
    challenges: [],
    results: [],
    images: [{ src: "/img/capturememory.png", alt: "MemoryGame — écran principal" }],
  },

  portfolio: {
    slug: "portfolio",
    title: "Portfolio — Animations & UI",
    year: "2026",
    role: "Frontend",
    technologies: ["SvelteKit", "GSAP", "CSS"],
    tags: ["frontend"], // ✅
    description: "Quelques pages animées avec un accent sur le front.",
    features: [],
    challenges: [],
    results: [],
    images: [{ src: "/img/frontend.png", alt: "Aperçu Portfolio" }],
  },
};

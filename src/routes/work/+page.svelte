<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let introSection: HTMLElement;
  let titleElement: HTMLElement;
  let cardContainers: HTMLElement[] = [];

  const projects = [
    {
      tag: "Full-Stack / Symfony / Game",
      title:
        "Jeu UNO développé avec Symfony, avec logique de jeu structurée côté backend.",
      link: "/work/uno",
      image: "/img/captureuno.png",
      results: [
        "Architecture MVC avec Symfony",
        "Gestion des cartes, joueurs et tours",
        "Déploiement en ligne avec Railway",
      ],
    },
    {
      tag: "SvelteKit / Supabase / Vercel / GSAP",
      title:
        "Crimson Crypt — mini jeu web (4 niveaux) avec progression & leaderboard",
      link: "/work/crimsoncrypt",
      image:
        "/img/screencapture-crimson-crypt-vercel-app-dashboard-2026-03-09-11_35_28.png",
      results: [
        "Progression sauvegardée (niveaux débloqués)",
        "Scores & leaderboard persistants (Supabase)",
        "API SvelteKit + cookies + déploiement Vercel",
      ],
    },
    {
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
      tag: "SCSS / UI Design / responsive",
      title: "refonte du site web du restaurant de paul bert avec scss",
      link: "/work/paulbert",
      image:
        "/img/screencapture-marylineb-github-io-refonte-restau-paul-bert-2026-03-09-11_20_21.png",
      results: [
        "Refonte UI + meilleure lisibilité",
        "Structure sections plus claire",
        "CTA + navigation améliorés",
      ],
    },
    {
      tag: "Front-End / css / responsive",
      title: "quelques sites développés avec accent sur le front HTML/CSS.",
      link: "/work/frontend",
      image:
        "/img/screencapture-marylineb-github-io-essaie-site-1-2026-02-24-09_03_28.png",
      results: ["Composants réutilisables", "Meilleure hiérarchie UI"],
    },
   {
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

  function parseTitle(title: string): string {
    return title.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  const cleaners: Array<() => void> = [];

  onMount(() => {
    // Intro animations
    gsap.from(titleElement, {
      opacity: 0,
      scale: 0.9,
      duration: 1.1,
      ease: "power3.out",
    });

    gsap.from(introSection, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      delay: 1.0,
      ease: "power3.out",
    });

    const introP = introSection?.querySelector("p");
    if (introP) {
      gsap.from(introP, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });
    }

    cardContainers.forEach((card, index) => {
      if (!card) return;

      const anim = gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        delay: index * 0.08,
        ease: "power3.out",
      });

      cleaners.push(() => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    });

    // Refresh triggers (useful with lazy images)
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => cleaners.forEach((c) => c());
  });

  onDestroy(() => {
    cleaners.forEach((c) => c());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<svelte:head>
  <title>Mes travaux | Maryline</title>
  <meta
    name="description"
    content="Découvrez mes projets en développement web, communication digitale et création graphique."
  />
</svelte:head>

<main class="work-page">
  <section id="intro" bind:this={introSection}>
    <h1 bind:this={titleElement}>MES TRAVAUX</h1>

    <div id="presentation">
      <img src="/img/icons8-code-studio-visuel-2019-96.png" alt="code icon" />
      <p>
        Bienvenue dans mon univers créatif et technique ! Ici, je vous présente
        mes projets en développement web, communication digitale et création
        graphique, réalisés au fil de mon parcours à MyDigitalSchool Lyon.
        Chaque projet reflète ma capacité à allier logique informatique, sens du
        design et stratégie digitale pour créer des expériences innovantes et
        impactantes. Parcourez ces réalisations pour découvrir mon approche et
        mon savoir-faire.
      </p>
      <img src="/img/favicon.svg" alt="svelte icon" />
    </div>
  </section>

  <section id="card" aria-label="Liste des projets">
    {#each projects as project, i (project.link)}
      <a
        class="card_container"
        href={project.link}
        bind:this={cardContainers[i]}
        aria-label={`Voir le projet : ${project.title}`}
      >
        <!-- Image -->
        <div class="card_media">
          <img
            src={project.image}
            alt={`Aperçu — ${project.title}`}
            loading="lazy"
          />
          <div class="card_media_overlay"></div>
        </div>

        <!-- Contenu -->
        <div class="card_content">
          {#if project.tag}
            <span class="card_tag">{project.tag}</span>
          {/if}

          <h3>{project.title}</h3>

          <span class="card_cta">
            Voir le projet
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <!-- Numéro décoratif -->
        <span class="card_num" aria-hidden="true">0{i + 1}</span>
      </a>
    {/each}
  </section>
  <section id="logos">

  </section>
</main>

<style>
  .work-page {
    padding: 180px 24px 40px; /* + haut pour laisser respirer sous le header */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--washi);
  }

  #intro {
    max-width: 1200px;
    padding: 0 2rem;
    text-align: center;
  }

  #intro h1 {
    margin: 16px 0 16px 0;
    color: var(--laque);
    font-size: clamp(44px, 6vw, 92px);
    font-family: "Cormorant Garamond", serif;
  }

  #intro p {
    font-size: 16px;
    font-family: "serif";
    line-height: 1.9;
    color: var(--encre);
    max-width: 800px;
    margin: 0;
    text-align: center;
  }

  #presentation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 48px;
    margin: 24px 24px 40px 24px;
  }

  #presentation img {
    width: 72px;
    height: 72px;
    margin: 16px;
  }

  #card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem 6rem;
    position: relative;
    z-index: 1;
  }

  /* ─── Carte ─── */
  .card_container {
    display: flex;
    flex-direction: column;
    background: var(--washi);
    border: 1px solid rgba(196, 96, 122, 0.18);
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    position: relative;
    box-shadow: var(--ombre-sm);
    transition:
      box-shadow 0.35s ease,
      border-color 0.35s ease,
      transform 0.35s ease;
    cursor: pointer;
    will-change: transform;
  }

  .card_container:hover {
    box-shadow: var(--ombre-sakura);
    border-color: rgba(196, 96, 122, 0.45);
    transform: translateY(-6px);
  }

  .card_container:focus-visible {
    outline: 2px solid var(--sakura);
    outline-offset: 4px;
  }

  /* Trait top au hover */
  .card_container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--bambou);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 2;
    border-radius: 16px 16px 0 0;
  }

  .card_container:hover::before {
    opacity: 1;
    animation: shimmer 1.8s linear infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* ─── Image ─── */
  .card_media {
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    position: relative;
  }

  .card_media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  .card_container:hover .card_media img {
    transform: scale(1.07);
  }

  .card_media_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(28, 16, 24, 0.08) 100%
    );
    pointer-events: none;
  }

  /* ─── Contenu ─── */
  .card_content {
    padding: 1.4rem 1.6rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
  }

  .card_tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    font-family: "ojuju", sans-serif;
  }

  .card_content h3 {
    font-size: 1rem;
    line-height: 1.45;
    color: var(--encre);
    font-family: "Cormorant Garamond", serif;
    font-weight: 600;
    margin: 0;
    flex: 1;
  }

  /* CTA discret */
  .card_cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 0.6rem;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--encre-mid);
    font-family: "ojuju", sans-serif;
    opacity: 0.55;
    transition:
      opacity 0.25s ease,
      color 0.25s ease,
      gap 0.25s ease;
  }

  .card_container:hover .card_cta {
    opacity: 1;
    color: var(--laque);
    gap: 10px;
  }

  .card_cta svg {
    transition: transform 0.25s ease;
    flex-shrink: 0;
  }

  .card_container:hover .card_cta svg {
    transform: translateX(3px);
  }

  /* ─── Numéro décoratif ─── */
  .card_num {
    position: absolute;
    bottom: 1rem;
    right: 1.2rem;
    font-size: 3.5rem;
    font-weight: 900;
    font-family: "Cormorant Garamond", serif;
    color: var(--sakura-pale);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    transition: color 0.35s ease;
    z-index: 0;
  }

  .card_container:hover .card_num {
    color: rgba(196, 96, 122, 0.12);
  }

  /* ─── Tablette large (≤ 1200px) ─── */
  @media (max-width: 1200px) {
    #card {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.6rem;
      padding: 0 1.5rem 5rem;
    }

    .card_content h3 {
      font-size: 0.95rem;
    }
  }

  /* ─── Tablette (≤ 1024px) → 2 colonnes ─── */
  @media (max-width: 1024px) {
    #card {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      max-width: 860px;
    }

    #intro h1 {
      font-size: clamp(2.4rem, 5vw, 4rem);
    }

    #intro {
      margin-bottom: 4rem;
    }
  }

  /* ─── Tablette portrait (≤ 768px) ─── */
  @media (max-width: 768px) {
    .work-page {
      padding: 90px 16px 60px;
    }

    #intro {
      padding: 0 1rem;
      margin-bottom: 3rem;
    }

    #intro h1 {
      font-size: clamp(2rem, 8vw, 3rem);
      letter-spacing: 0.12em;
    }

    #intro p {
      font-size: 0.9rem;
    }

    #card {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.2rem;
      padding: 0 1rem 4rem;
    }

    .card_content {
      padding: 1.1rem 1.2rem 1.3rem;
    }

    .card_content h3 {
      font-size: 0.9rem;
    }

    .card_num {
      font-size: 2.8rem;
    }

    /* Hover transform réduit sur tablette */
    .card_container:hover {
      transform: translateY(-4px);
    }
  }

  /* ─── Mobile (≤ 540px) → 1 colonne ─── */
  @media (max-width: 540px) {
    .work-page {
      padding: 80px 12px 50px;
    }

    #intro {
      padding: 0 0.5rem;
      margin-bottom: 2.5rem;
    }

    #intro h1 {
      font-size: clamp(1.9rem, 9vw, 2.5rem);
      letter-spacing: 0.08em;
    }

    #intro p {
      font-size: 0.88rem;
      line-height: 1.75;
    }

    #card {
      grid-template-columns: 1fr;
      gap: 1.2rem;
      padding: 0 0.5rem 4rem;
    }

    .card_media {
      aspect-ratio: 16 / 9;
    }

    .card_content {
      padding: 1rem 1.1rem 1.2rem;
      gap: 0.5rem;
    }

    .card_tag {
      font-size: 0.65rem;
    }

    .card_content h3 {
      font-size: 0.95rem;
    }

    .card_cta {
      font-size: 0.72rem;
    }

    .card_num {
      font-size: 2.4rem;
      bottom: 0.8rem;
      right: 1rem;
    }

    /* Pas d'animation hover sur mobile (touch) */
    .card_container:hover {
      transform: none;
    }

    .card_container:hover .card_media img {
      transform: none;
    }

    .card_container:hover::before {
      animation: none;
      opacity: 0;
    }
  }

  /* ─── Très petit mobile (≤ 375px) ─── */
  @media (max-width: 375px) {
    #intro h1 {
      font-size: 1.7rem;
      letter-spacing: 0.06em;
    }

    #card {
      gap: 1rem;
      padding: 0 0 3.5rem;
    }

    .card_content h3 {
      font-size: 0.88rem;
    }
  }
</style>

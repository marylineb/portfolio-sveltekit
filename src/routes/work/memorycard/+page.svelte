<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let heroSection: HTMLElement;
  let imageElements: HTMLElement[] = [];

  const projectInfo = {
    title: "MemoryGame (PHP) — Jeu de mémoire",
    year: "2026",
    role: "Développement Web (PHP)",
    technologies: ["PHP", "HTML", "CSS", "Sessions"],
    description:
      "Un mini-jeu de mémoire développé en PHP. L'objectif : retrouver des paires en un minimum de coups, avec une logique de partie gérée côté serveur (sessions). J'ai aussi appris à le déployer sur un hébergeur gratuit (InfinityFree) et à corriger une erreur 403 en plaçant correctement les fichiers dans le dossier htdocs.",
    features: [
      "Gestion de la partie via sessions PHP",
      "Nouvelle partie / reset de la progression",
      "Navigation entre plusieurs pages (game, win, etc.)",
      "Interface simple + responsive (CSS)",
    ],
    challenges: [
      "Structurer un projet PHP multi-pages proprement",
      "Gérer l'état de jeu avec les sessions (progression, reset, victoire)",
      "Déploiement sur InfinityFree + résolution d'un 403 (dossier htdocs)",
    ],
    results: [
      "Jeu jouable en ligne (démo publique)",
      "Logique backend fonctionnelle (sessions / transitions)",
      "Projet prêt à être intégré au portfolio + GitHub",
    ],
    links:{
      live: "https://memorygame.42web.io/index.php",
      github:"https://github.com/marylineb/refonte-restau-paul-bert",
    },
  };

  onMount(() => {
    gsap.from(heroSection.querySelector("h1"), {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(heroSection.querySelectorAll(".meta-item"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Pétales flottants
    const petals = document.querySelectorAll(".petal");
    petals.forEach((petal, i) => {
      gsap.to(petal, {
        y: "100vh",
        x: `+=${Math.random() * 80 - 40}`,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 6 + Math.random() * 4,
        delay: i * 0.6,
        repeat: -1,
        ease: "none",
      });
    });

    imageElements.forEach((img) => {
      if (!img) return;
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    });
  });
</script>

<svelte:head>
  <title>MemoryGame (PHP) | Maryline BILOA</title>
  <meta
    name="description"
    content="MemoryGame en PHP : sessions, multi-pages, déploiement InfinityFree."
  />
</svelte:head>

<!-- Pétales décoratifs -->
<div class="petals-container" aria-hidden="true">
  {#each Array(8) as _, i}
    <div class="petal" style="left: {10 + i * 11}%; top: -{20 + i * 5}px; animation-delay: {i * 0.5}s;">🌸</div>
  {/each}
</div>

<main class="project-page">

  <!-- Hero -->
  <section class="hero" bind:this={heroSection}>
    <a href="/work" class="back-link">
      <span class="back-arrow">←</span> Retour
    </a>

    <div class="hero-badge">Projet Web</div>

    <h1>{projectInfo.title}</h1>

    <div class="meta">
      <div class="meta-item">
        <span class="label">Année</span>
        <span class="value">{projectInfo.year}</span>
      </div>
      <div class="meta-divider"></div>
      <div class="meta-item">
        <span class="label">Rôle</span>
        <span class="value">{projectInfo.role}</span>
      </div>
      <div class="meta-divider"></div>
      <div class="meta-item">
        <span class="label">Technologies</span>
        <span class="value">{projectInfo.technologies.join(", ")}</span>
      </div>
    </div>
  </section>

  <!-- Image principale -->
  <section class="featured-image" bind:this={imageElements[0]}>
    <div class="image-frame">
      <img src="/img/capturememory.png" alt="MemoryGame — écran principal" />
      <div class="image-overlay"></div>
    </div>
  </section>

  <!-- À propos -->
  <section class="content-section">
    <div class="section-header">
      <span class="section-kamon">⛩</span>
      <h2>À propos du projet</h2>
      <div class="section-line"></div>
    </div>

    <p class="description">{projectInfo.description}</p>

    <div class="chips">
      {#each projectInfo.features as feature}
        <span class="chip">{feature}</span>
      {/each}
    </div>

     <div class="project-links">
      <a
        href={projectInfo.links.live}
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary"
      >
        <span>Voir le site</span>
        <span class="btn-icon">→</span>
      </a>
      {#if projectInfo.links.github}
        <a
          href={projectInfo.links.github}
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary"
        >
          <span>GitHub</span>
          <span class="btn-icon">↗</span>
        </a>
      {/if}
    </div>
  </section>

  <!-- Défis -->
  <section class="content-section challenges">
    <div class="section-header">
      <span class="section-kamon">⚔️</span>
      <h2>Défis relevés</h2>
      <div class="section-line"></div>
    </div>

    <div class="card-grid">
      {#each projectInfo.challenges as challenge, i}
        <div class="challenge-card" bind:this={imageElements[i + 1]}>
          <div class="card-accent"></div>
          <span class="number">0{i + 1}</span>
          <p>{challenge}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Galerie -->
  <section class="gallery">
    <div class="gallery-item" bind:this={imageElements[5]}>
      <div class="gallery-frame">
        <img src="/img/captureplay.png" alt="MemoryGame — partie en cours" />
      </div>
      <p class="caption">
        <span class="caption-dot"></span>Partie en cours
      </p>
    </div>

    <div class="gallery-item" bind:this={imageElements[6]}>
      <div class="gallery-frame">
        <img src="/img/capturewin.png" alt="MemoryGame — écran de victoire" />
      </div>
      <p class="caption">
        <span class="caption-dot"></span>Écran de victoire
      </p>
    </div>
  </section>

  <!-- Résultats -->
  <section class="content-section results">
    <div class="section-header">
      <span class="section-kamon">🌸</span>
      <h2>Résultats</h2>
      <div class="section-line"></div>
    </div>

    <div class="results-grid">
      {#each projectInfo.results as result, i}
        <div class="result-item">
          <div class="check-icon">✓</div>
          <p>{result}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Footer décoratif -->
  <div class="page-footer-deco" aria-hidden="true">
    <span>— 🌸 —</span>
  </div>

</main>

<style>
  .project-page {
    padding: 180px 24px 40px; /* + haut pour laisser respirer sous le header */
    min-height: 100vh;
    background: var(--washi);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .petals-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .petal {
    position: absolute;
    font-size: 1.2rem;
    opacity: 0.3;
    user-select: none;
  }
/* Hero Section */
  .hero {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 4rem;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--sakura-deep);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    font-family: "bodoni moda", sans-serif;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition:
      gap 0.3s ease,
      color 0.3s ease;
  }

  .back-link:hover {
    gap: 10px;
    color: var(--laque);
  }

  .back-arrow {
    transition: transform 0.3s ease;
  }

  .back-link:hover .back-arrow {
    transform: translateX(-4px);
  }

  .hero-badge {
    display: inline-block;
    padding: 4px 14px;
    background: var(--sakura-pale);
    border: 1px solid var(--sakura);
    color: var(--sakura-deep);
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: "serif";
    margin-bottom: 1.2rem;
  }

  .hero h1 {
    display: block;
    width: 100%;
    margin: 0 0 2rem;
    color: var(--laque);
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 900;
    letter-spacing: 0.02em;
    font-family: "cormorant garamond", sans-serif;
    line-height: 1.1;
  }

  .hero h1::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, var(--sakura), transparent);
    margin-top: 1rem;
    border-radius: 2px;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: var(--washi-mid);
    border: 1px solid rgba(196, 96, 122, 0.2);
    border-radius: var(--radius);
    padding: 1.2rem 2rem;
    box-shadow: var(--ombre-sm);
  }

  .meta-divider {
    width: 1px;
    height: 36px;
    background: rgba(196, 96, 122, 0.25);
    margin: 0 2rem;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
  }

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--sakura-deep);
    font-family: "bodoni moda", serif;
  }

  .value {
    font-size: 0.95rem;
    color: var(--encre-mid);
    font-family: "serif";
    font-weight: 500;
  }
/* Image principale */
  .featured-image {
    max-width: 1000px;
    height: auto;
    width: 100%;
    margin: 0 auto 5rem;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  .image-frame {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
      var(--ombre),
      0 0 0 1px rgba(196, 96, 122, 0.15);
  }

  .image-frame img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.6s ease;
  }

  .image-frame:hover img {
    transform: scale(1.02);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 60%,
      rgba(242, 167, 187, 0.1) 100%
    );
    pointer-events: none;
  }
/* Sections de contenu */
  .content-section {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 5rem;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2rem;
    text-align: left;
  }

  .section-kamon {
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .content-section h2 {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 700;
    color: var(--laque);
    font-family: "Cormorant Garamond", sans-serif;
    margin: 0;
    white-space: nowrap;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(196, 96, 122, 0.4), transparent);
    border-radius: 1px;
  }

  .description {
    font-size: 1rem;
    color: var(--encre-mid);
    font-family: "serif";
    max-width: 860px;
    margin: 0 auto 2rem;
    line-height: 1.9;
  }

  .chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1.5rem;
  }
  
 .chip {
    padding: 7px 14px;
    border-radius: 999px;
    background: var(--sakura-pale);
    border: 1px solid rgba(196, 96, 122, 0.3);
    color: var(--sakura-deep);
    font-size: 14px;
    font-family: "serif";
    font-weight: 500;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .chip:hover {
    background: rgba(196, 96, 122, 0.15);
    transform: translateY(-2px);
  }

  /* ─── CTA ─── */
  .project-links {
    display: flex;
    gap: 12px;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "cormorant garamond", sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    font-style: italic;
    color: var(--washi);
    background: linear-gradient(135deg, var(--laque), var(--sakura-deep));
    border: none;
    padding: 0.75rem 1.8rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
    letter-spacing: 0.04em;
    box-shadow: var(--ombre-sakura);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(196, 96, 122, 0.35);
  }

  .btn-icon {
    transition: transform 0.3s ease;
  }

  .btn-primary:hover .btn-icon {
    transform: translateX(4px);
  }

  /* Défis */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .challenge-card {
    padding: 2rem;
    background: var(--washi-mid);
    border-radius: var(--radius);
    border: 1px solid rgba(196, 96, 122, 0.15);
    position: relative;
    overflow: hidden;
    text-align: left;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: var(--ombre-sm);
  }

  .challenge-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--ombre);
  }

  .card-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--sakura), var(--laque));
    border-radius: 4px 0 0 4px;
  }

  .number {
    display: block;
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--sakura-deep);
    margin-bottom: 0.6rem;
    font-family: "Cormorant Garamond", serif;
    opacity: 0.5;
  }

  .challenge-card p {
    color: var(--encre-mid);
    line-height: 1.7;
    font-family: "serif";
    font-size: 0.95rem;
    margin: 0;
  }

  .gallery {
    max-width: 900px;
    width: 100%;
    height: auto;
    margin: 0 auto 5rem;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    position: relative;
    z-index: 1;
  }

  .gallery-frame {
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--ombre-sm);
    border: 1px solid rgba(196, 96, 122, 0.15);
    transition:
      box-shadow 0.3s ease,
  }

  .gallery-frame:hover {
    box-shadow: var(--ombre);
  }

  .gallery-item img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  .gallery-frame:hover img {
    transform: scale(1.05);
  }

  .caption {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 0.85rem;
    color: var(--encre-mid);
    font-size: 0.85rem;
    font-family: "Cormorant Garamond", serif;
    opacity: 0.75;
  }

  .caption-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sakura);
    flex-shrink: 0;
  }

  .results-grid {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem 1.5rem;
    background: var(--washi-mid);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(196, 96, 122, 0.12);
    box-shadow: var(--ombre-sm);
    text-align: left;
    transition:
      transform 0.25s ease,
      border-color 0.25s ease;
  }

  .result-item:hover {
    transform: translateX(6px);
    border-color: var(--sakura);
  }

   .check-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, var(--sakura), var(--sakura-deep));
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    font-size: 0.85rem;
    box-shadow: 0 4px 12px rgba(196, 96, 122, 0.3);
  }

  .result-item p {
    color: var(--encre);
    line-height: 1.6;
    margin: 0;
    font-size: 0.95rem;
    font-family: "serif";
  }

  /* ─── Footer déco ─── */
  .page-footer-deco {
    margin: 1rem 0 4rem;
    color: var(--sakura);
    font-size: 1rem;
    letter-spacing: 0.3em;
    opacity: 0.5;
    user-select: none;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 1.9rem;
    }

    .meta {
      flex-direction: column;
      gap: 1rem;
      padding: 1.2rem;
    }

    .meta-divider {
      width: 80px;
      height: 1px;
      margin: 0;
    }

    .gallery,
    .card-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
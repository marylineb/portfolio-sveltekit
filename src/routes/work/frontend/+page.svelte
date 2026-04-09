<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let heroSection: HTMLElement;
  let carouselTrack: HTMLElement;

  const projectInfo = {
    title: "Front-End",
    subtitle: "HTML / CSS / Responsive",
    year: "2024–2025",
    role: "Intégration & Design Front-End",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    description:
      "Une sélection de sites développés avec une attention particulière portée sur l'intégration front-end : hiérarchie visuelle, typographie, responsive design et composants réutilisables. Chaque projet explore une direction artistique distincte tout en respectant les bonnes pratiques CSS.",
  };

  const sites = [
    {
      image:
        "/img/screencapture-marylineb-github-io-essaie-site-1-2026-02-24-09_03_28.png",
      title: "Site Vitrine #1",
      tag: "Landing Page",
      description:
        "Page d'atterrissage responsive avec typographie expressive et hiérarchie visuelle claire. Focus sur la lisibilité et la fluidité mobile.",
      techs: ["HTML", "CSS", "Flexbox"],
    },
    {
      image: "/img/site-responsive-preview.png",
      title: "Premier site responsive",
      tag: "Intégration Web",
      description:
        "Développement d’un site web responsive en utilisant HTML et CSS, avec une attention particulière portée aux media queries, à la mise en page flexible et à l’optimisation de l’affichage sur tous les écrans.",
      techs: ["HTML", "CSS", "Media Queries"],
    },
    {
      image: "/img/capecran1.png",
      title: "App Bourse",
      tag: "Application Web / Data",
      description:
        "Développement d’une application web permettant de suivre et gérer des informations financières liées aux bourses. Le projet met l’accent sur la structuration des données, la gestion des entrées utilisateurs et la visualisation claire des informations.",
      techs: ["HTML", "CSS", "JavaScript"],
    },
    {
      image: "/img/Capturecran43.png",
      title: "Site campagne CLEOR",
      tag: "HTML / CSS / Direction Artistique",
      description:
        "Développement d’un site vitrine immersif pour une campagne de communication CLEOR. Travail sur l’identité visuelle, l’intégration front-end, la mise en avant d’un storytelling émotionnel et l’utilisation d’un support vidéo pour renforcer l’impact de la marque.",
      techs: ["HTML", "CSS", "Responsive Design", "Storytelling"],
    },
  ];

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let autoplayInterval: ReturnType<typeof setInterval>;

  const CARD_WIDTH = 380;
  const GAP = 24;

  function scrollToIndex(idx: number) {
    if (!carouselTrack) return;
    const maxIndex = sites.length - 1;
    currentIndex = Math.max(0, Math.min(idx, maxIndex));
    const offset = currentIndex * (CARD_WIDTH + GAP);
    carouselTrack.scrollTo({ left: offset, behavior: "smooth" });
  }

  function next() {
    scrollToIndex(currentIndex < sites.length - 1 ? currentIndex + 1 : 0);
  }

  function prev() {
    scrollToIndex(currentIndex > 0 ? currentIndex - 1 : sites.length - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(next, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  onMount(() => {
    const petals = document.querySelectorAll(".petal");
    petals.forEach((petal, i) => {
      gsap.to(petal, {
        y: "100vh",
        x: `+=${Math.random() * 80 - 40}`,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 7 + Math.random() * 4,
        delay: i * 0.5,
        repeat: -1,
        ease: "none",
      });
    });

    if (heroSection) {
      const h1 = heroSection.querySelector("h1");
      const metaItems = heroSection.querySelectorAll(".meta-item");
      if (h1)
        gsap.from(h1, { opacity: 0, y: 50, duration: 1, ease: "power3.out" });
      if (metaItems.length > 0) {
        gsap.from(metaItems, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        });
      }
    }

    // Animate carousel on scroll
    gsap.from(".carousel-wrapper", {
      scrollTrigger: { trigger: ".carousel-wrapper", start: "top 85%" },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".result-item", {
      scrollTrigger: { trigger: ".results-grid", start: "top 80%" },
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });

    startAutoplay();

    return () => stopAutoplay();
  });
</script>

<svelte:head>
  <title>Front-End | Maryline BILOA</title>
  <meta
    name="description"
    content="Sites développés avec accent sur le front HTML/CSS, responsive design et composants réutilisables."
  />
</svelte:head>

<!-- Pétales décoratifs -->
<div class="petals-container" aria-hidden="true">
  {#each Array(8) as _, i}
    <div class="petal" style="left: {10 + i * 11}%; top: -{20 + i * 5}px;">
      🌸
    </div>
  {/each}
</div>

<main class="project-page">
  <!-- Hero -->
  <section class="hero" bind:this={heroSection}>
    <a href="/work" class="back-link">
      <span class="back-arrow">←</span> Retour
    </a>

    <div class="hero-badge">Front-End / CSS / Responsive</div>

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

  <!-- Description -->
  <section class="content-section">
    <div class="section-header">
      <span class="section-kamon">⛩</span>
      <h2>À propos</h2>
      <div class="section-line"></div>
    </div>
    <p class="description">{projectInfo.description}</p>
    <div class="chips">
      {#each projectInfo.technologies as tech}
        <span class="chip">{tech}</span>
      {/each}
    </div>
  </section>

  <!-- Carrousel -->
  <section class="carousel-section">
    <div class="section-header carousel-title-row">
      <span class="section-kamon">🎋</span>
      <h2>Sites réalisés</h2>
      <div class="section-line"></div>
    </div>

    <div
      class="carousel-wrapper"
      role="region"
      aria-label="Carrousel des sites réalisés"
      on:mouseenter={stopAutoplay}
      on:mouseleave={startAutoplay}
    >
      <button
        type="button"
        class="carousel-btn carousel-btn--prev"
        on:click={prev}
        aria-label="Voir le site précédent"
      >
        ←
      </button>

      <button
        type="button"
        class="carousel-btn carousel-btn--next"
        on:click={next}
        aria-label="Voir le site suivant"
      >
        →
      </button>

      <div class="carousel-track" bind:this={carouselTrack}>
        {#each sites as site, i}
          <div class="flip-card" class:active={i === currentIndex}>
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <div class="card-tag">{site.tag}</div>
                <img src={site.image} alt={site.title} />
                <div class="card-gradient"></div>
                <div class="card-title-front">
                  <h3>{site.title}</h3>
                  <span class="hover-hint">Survoler pour découvrir →</span>
                </div>
              </div>

              <div class="flip-card-back">
                <div class="back-kamon">⛩</div>
                <h3>{site.title}</h3>
                <p>{site.description}</p>
                <div class="back-techs">
                  {#each site.techs as t}
                    <span class="back-chip">{t}</span>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="carousel-dots">
  {#each sites as _, i}
    <button
      type="button"
      class="dot"
      class:dot--active={i === currentIndex}
      on:click={() => scrollToIndex(i)}
      aria-label={`Aller au slide ${i + 1}`}
      aria-current={i === currentIndex ? 'true' : undefined}
    ></button>
  {/each}
</div>
  </section>

  <section class="content-section results">
    <div class="section-header">
      <span class="section-kamon">🌸</span>
      <h2>Ce que j'ai développé</h2>
      <div class="section-line"></div>
    </div>

    <div class="results-grid">
      {#each ["Composants réutilisables", "Meilleure hiérarchie UI", "Responsive multi-breakpoints", "Animations CSS fluides", "Intégration pixel-perfect", "Architecture CSS maintenable"] as result}
        <div class="result-item">
          <div class="check-icon">✓</div>
          <p>{result}</p>
        </div>
      {/each}
    </div>
  </section>

  <div class="page-footer-deco" aria-hidden="true">
    <span>— 🌸 —</span>
  </div>
</main>

<style>
  .project-page {
    padding: 180px 24px 40px;
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

  /* ─── Hero ─── */
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
  .back-link:hover .back-arrow {
    transform: translateX(-4px);
  }
  .back-arrow {
    transition: transform 0.3s ease;
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
    font-family: serif;
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
    font-family: serif;
    font-weight: 500;
  }

  /* ─── Content sections ─── */
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
    font-family: serif;
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
    font-family: serif;
    font-weight: 500;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .chip:hover {
    background: rgba(196, 96, 122, 0.15);
    transform: translateY(-2px);
  }

  /* ─── Carousel Section ─── */
  .carousel-section {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 5rem;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  .carousel-title-row {
    margin-bottom: 2rem;
  }

  .carousel-wrapper {
    position: relative;
    overflow: hidden;
  }

  /* Nav buttons */
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(196, 96, 122, 0.4);
    background: var(--washi-mid);
    color: var(--sakura-deep);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--ombre-sm);
    transition:
      background 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease;
  }

  .carousel-btn:hover {
    background: var(--sakura-pale);
    border-color: var(--sakura);
    transform: translateY(-50%) scale(1.08);
  }

  .carousel-btn--prev {
    left: -22px;
  }
  .carousel-btn--next {
    right: -20px;
  }

  h2 {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 700;
    color: var(--laque);
    font-family: "Cormorant Garamond", sans-serif;
    margin: 0;
    white-space: nowrap;
  }
  /* Track */
  .carousel-track {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    padding: 20px 8px 30px;
  }

  .carousel-track::-webkit-scrollbar {
    display: none;
  }

  /* ─── Flip Card ─── */
  .flip-card {
    flex: 0 0 380px;
    height: 300px;
    perspective: 1000px;
    cursor: pointer;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
  }

  /* Recto */
  .flip-card-front {
    background: var(--washi-mid);
    border: 1px solid rgba(196, 96, 122, 0.15);
    box-shadow: var(--ombre-sm);
  }

  .flip-card-front img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  .flip-card:hover .flip-card-front img {
    transform: scale(1.04);
  }

  .card-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 35%,
      rgba(60, 10, 20, 0.75) 100%
    );
    pointer-events: none;
  }

  .card-tag {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
    padding: 4px 12px;
    background: rgba(196, 96, 122, 0.85);
    color: white;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: "bodoni moda", serif;
    backdrop-filter: blur(4px);
  }

  .card-title-front {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 1.2rem 1.5rem;
  }

  .card-title-front h3 {
    color: white;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .hover-hint {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
    font-family: serif;
    font-style: italic;
    letter-spacing: 0.04em;
  }

  /* Verso */
  .flip-card-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, var(--laque) 0%, #2a0a14 100%);
    border: 1px solid rgba(196, 96, 122, 0.3);
    box-shadow: var(--ombre);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    gap: 0.8rem;
  }

  .back-kamon {
    font-size: 1.6rem;
    opacity: 0.5;
    margin-bottom: 0.2rem;
  }

  .flip-card-back h3 {
    color: var(--sakura);
    font-family: "Cormorant Garamond", serif;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.02em;
  }

  .flip-card-back p {
    color: rgba(255, 255, 255, 0.8);
    font-family: serif;
    font-size: 0.9rem;
    line-height: 1.7;
    margin: 0;
    flex: 1;
  }

  .back-techs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 0.4rem;
  }

  .back-chip {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(196, 96, 122, 0.25);
    border: 1px solid rgba(196, 96, 122, 0.4);
    color: var(--sakura);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: "bodoni moda", serif;
  }

  /* Dots */
  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 0.5rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(196, 96, 122, 0.25);
    cursor: pointer;
    padding: 0;
    transition:
      background 0.3s ease,
      transform 0.3s ease;
  }

  .dot--active {
    background: var(--sakura-deep);
    transform: scale(1.3);
  }

  /* ─── Results ─── */
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
    font-family: serif;
  }

  /* Footer deco */
  .page-footer-deco {
    margin: 1rem 0 4rem;
    color: var(--sakura);
    font-size: 1rem;
    letter-spacing: 0.3em;
    opacity: 0.5;
    user-select: none;
  }

  /* ─── Responsive ─── */
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

    .flip-card {
      flex: 0 0 300px;
      height: 260px;
    }

    .carousel-btn--prev {
      left: -10px;
    }
    .carousel-btn--next {
      right: -10px;
    }
  }
</style>

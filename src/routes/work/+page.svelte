<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { projects } from "$lib/data/projects";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let heroEl: HTMLElement;
  let cards: HTMLElement[] = [];
  const cleaners: Array<() => void> = [];

  onMount(() => {
    gsap.from(heroEl, { opacity: 0, y: 30, duration: 1, ease: "power3.out" });

    cards.forEach((card, i) => {
      if (!card) return;
      const anim = gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: (i % 2) * 0.1,
        ease: "power3.out",
      });
      cleaners.push(() => { anim.scrollTrigger?.kill(); anim.kill(); });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  onDestroy(() => {
    cleaners.forEach((c) => c());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<svelte:head>
  <title>Projets | Maryline Biloa</title>
  <meta name="description" content="Projets de Maryline Biloa — développement web, design et communication digitale." />
</svelte:head>

<div class="work-page">

  <!-- Hero -->
  <section class="work-hero" bind:this={heroEl}>
    <span class="eyebrow">Mes réalisations</span>
    <h1>Projets <em>&</em> Expériences</h1>
    <p class="hero-desc">
      Du développement full-stack aux interfaces animées, voici les projets
      réalisés au cours de mon parcours à MyDigitalSchool Lyon.
    </p>
  </section>

  <!-- Grille -->
  <section class="grid-section" aria-label="Liste des projets">
    {#each projects as project, i (project.id)}
      <a
        class="card"
        href={project.link}
        bind:this={cards[i]}
        aria-label="Voir le projet : {project.title}"
      >
        <div class="card-image">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>

        <div class="card-body">
          {#if project.tag}
            <span class="card-tag">{project.tag}</span>
          {/if}
          <h2 class="card-title">{project.title}</h2>
          <div class="card-footer">
            <span class="card-cta">
              Voir le projet
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="card-index">{String(i + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </a>
    {/each}
  </section>

</div>

<style>
  /* ── Page ── */
  .work-page {
    background: var(--washi);
    min-height: 100vh;
    padding-bottom: 80px;
  }

  /* ── Hero ── */
  .work-hero {
    padding: 110px 48px 60px;
    max-width: 860px;
    margin: 0 auto;
    text-align: center;
  }

  .eyebrow {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    margin-bottom: 20px;
  }

  .work-hero h1 {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: clamp(42px, 7vw, 88px);
    line-height: 1;
    letter-spacing: -0.01em;
    color: var(--laque-dark);
    margin-bottom: 28px;
  }

  .work-hero h1 em {
    font-style: italic;
    color: var(--sakura-deep);
  }

  .hero-desc {
    font-family: var(--font-sans);
    font-size: 15px;
    color: var(--encre-mid);
    line-height: 1.8;
    max-width: 520px;
    margin: 0 auto;
  }

  /* ── Grille de cartes ── */
  .grid-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 2px;
  }

  /* ── Carte ── */
  .card {
    display: flex;
    flex-direction: column;
    background: #fff;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(196, 96, 122, 0.1);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .card:hover {
    border-color: rgba(196, 96, 122, 0.3);
    box-shadow: 0 12px 40px rgba(196, 96, 122, 0.12);
    z-index: 2;
  }

  /* ── Image ── */
  .card-image {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--washi-mid);
    flex-shrink: 0;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  .card:hover .card-image img {
    transform: scale(1.04);
  }

  /* ── Corps ── */
  .card-body {
    padding: 28px 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .card-tag {
    font-family: var(--font-sans);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--sakura-deep);
  }

  .card-title {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(17px, 1.8vw, 22px);
    line-height: 1.45;
    color: var(--encre);
    margin: 0;
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .card-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--encre-mid);
    opacity: 0.5;
    transition: opacity 0.25s ease, color 0.25s ease, gap 0.25s ease;
  }

  .card:hover .card-cta {
    opacity: 1;
    color: var(--laque);
    gap: 12px;
  }

  .card-cta svg {
    transition: transform 0.25s ease;
  }

  .card:hover .card-cta svg {
    transform: translateX(3px);
  }

  .card-index {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: 3.5rem;
    line-height: 1;
    color: rgba(196, 96, 122, 0.08);
    pointer-events: none;
    user-select: none;
    transition: color 0.3s ease;
  }

  .card:hover .card-index {
    color: rgba(196, 96, 122, 0.14);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .work-hero {
      padding: 110px 32px 48px;
    }

    .grid-section {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .work-hero {
      padding: 95px 20px 36px;
    }

    .work-hero h1 {
      font-size: clamp(34px, 10vw, 54px);
    }

    .card-body {
      padding: 20px 20px 18px;
    }

    .card-index {
      font-size: 2.5rem;
    }

    .card:hover .card-image img {
      transform: none;
    }
  }
</style>

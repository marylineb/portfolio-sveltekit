<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let heroSection: HTMLElement;
  let imageElements: HTMLElement[] = [];

  const stageInfo = {
    title: "Garde ma Licorne",
    subtitle: "Community Manager · Stage",
    year: "2025",
    role: "Community Manager",
    periode: "Mai – Juillet 2025",
    technologies: [
      "Canva",
      "Meta Business Suite",
      "Notion",
      "Metricool",
      "Postoplan",
      "TikTok",
    ],
    description:
      "Stage de 3 mois en tant que Community Manager au sein de Garde ma Licorne, première plateforme française de horsesitting collaboratif. Mission : construire et animer une ligne éditoriale cohérente sur Instagram et TikTok, créer des contenus visuels et rédactionnels engageants, et renforcer le lien entre la marque et sa communauté équestre.",
    entreprise: {
      nom: "Garde ma Licorne",
      secteur: "Plateforme digitale collaborative — horsesitting équin",
      fondation: "Avril 2022, par Jennifer Dautremer",
      modele:
        "Entraide bénévole via Horse-Points (monnaie virtuelle, sans argent)",
      communaute:
        "1 700+ membres dès la 1ère année · 1 820 abonnés Instagram en 2025",
    },
    missions: [
      {
        icon: "🎨",
        title: "Création de contenu",
        desc: "Production de visuels sur Canva : reels, carrousels, citations, memes — avec une esthétique douce et cohérente avec l'univers de la marque.",
      },
      {
        icon: "✍️",
        title: "Rédaction éditoriale",
        desc: "Écriture des légendes avec un ton aligné sur les valeurs de la marque : bienveillant, drôle, sincère et proche de la communauté équestre.",
      },
      {
        icon: "📊",
        title: "Audit & Benchmark",
        desc: "Diagnostic visuel et éditorial des réseaux, veille concurrentielle et analyse des tendances Instagram / TikTok pour orienter la stratégie.",
      },
      {
        icon: "📅",
        title: "Planification éditoriale",
        desc: "Construction d'un calendrier éditorial mensuel avec thèmes, formats récurrents et rubriques participatives via Notion et Metricool.",
      },
      {
        icon: "💬",
        title: "Animation communautaire",
        desc: "Formats interactifs (sondages, quiz, appels à témoignages, 'tague ton cheval drama queen') pour stimuler l'engagement et la parole collective.",
      },
      {
        icon: "📈",
        title: "Suivi de performance",
        desc: "Analyse des KPIs (Instagram Insights, TikTok Analytics) et ajustement du contenu en fonction des données d'engagement post-publication.",
      },
    ],
    kpis: [
      {
        label: "Croissance abonnés Instagram",
        valeur: "+65 %",
        detail: "1 100 → 1 820 en un an",
      },
      {
        label: "Rythme de publication",
        valeur: "3–5 / sem.",
        detail: "Calendrier éditorial structuré",
      },
      {
        label: "Formats produits",
        valeur: "Reels · Carrousels · Stories",
        detail: "Multi-format engageant",
      },
      {
        label: "Outils maîtrisés",
        valeur: "6 outils",
        detail: "Canva, Notion, Metricool…",
      },
    ],
    competences: [
      {
        title: "Stratégie de contenu",
        desc: "Construire une ligne éditoriale claire à partir d'une identité de marque forte, planifier sur le long terme et adapter les formats aux algorithmes.",
      },
      {
        title: "Création visuelle",
        desc: "Produire des visuels cohérents et attractifs avec Canva, en respectant une charte graphique douce et inclusive.",
      },
      {
        title: "Autonomie & télétravail",
        desc: "Organisation en télétravail partiel, auto-gestion du temps, communication asynchrone efficace via Notion et WhatsApp.",
      },
      {
        title: "Collaboration en équipe",
        desc: "Travailler en équipe de 3 stagiaires : partage d'idées, retours constructifs, validation croisée des contenus et plannings partagés.",
      },
    ],
    apprentissages: [
      "Comprendre qu'une marque communautaire se construit autant par le ton que par le visuel",
      "Apprendre à analyser les données de performance pour ajuster une stratégie éditoriale en temps réel",
      "Développer une créativité contrainte : pas de budget pub, tout repose sur la qualité organique du contenu",
      "Collaborer avec une fondatrice engagée et adapter ses propositions à une vision forte",
    ],
    links: {
      site: "https://gardemalicorne.fr",
    },
  };

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

    imageElements.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
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
  <title>Stage — Garde ma Licorne | Maryline BILOA</title>
  <meta
    name="description"
    content="Stage de Community Manager chez Garde ma Licorne — création de contenu, stratégie éditoriale et animation de la communauté équestre sur Instagram et TikTok."
  />
</svelte:head>

<!-- Pétales -->
<div class="petals-container" aria-hidden="true">
  {#each Array(10) as _, i}
    <div class="petal" style="left: {8 + i * 9}%; top: -{15 + i * 6}px;">
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

    <div class="hero-badge">Stage · Community Manager</div>

    <h1>
      {stageInfo.title}
      <span class="hero-sub">{stageInfo.subtitle}</span>
    </h1>

    <div class="meta">
      <div class="meta-item">
        <span class="label">Période</span>
        <span class="value">{stageInfo.periode}</span>
      </div>
      <div class="meta-divider"></div>
      <div class="meta-item">
        <span class="label">Rôle</span>
        <span class="value">{stageInfo.role}</span>
      </div>
      <div class="meta-divider"></div>
      <div class="meta-item">
        <span class="label">Outils</span>
        <span class="value">{stageInfo.technologies.join(", ")}</span>
      </div>
    </div>
  </section>

  <!-- Image principale / hero visuel -->
  <section class="featured-image" bind:this={imageElements[0]}>
    <div class="image-frame-licorne-banner">
      <div class="licorne-placeholder">
        <span class="licorne-emoji">🦄</span>
        <p class="licorne-label">gardemalicorne.fr</p>
      </div>
      <div class="image-overlay"></div>
    </div>
  </section>

  <!-- À propos -->
  <section class="content-section">
    <div class="section-header">
      <span class="section-kamon">⛩</span>
      <h2>À propos du stage</h2>
      <div class="section-line"></div>
    </div>

    <p class="description">{stageInfo.description}</p>

    <div class="chips">
      {#each stageInfo.technologies as tech}
        <span class="chip">{tech}</span>
      {/each}
    </div>

    <div class="cta">
      <a
        href={stageInfo.links.site}
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary"
      >
        <span>Voir la plateforme</span>
        <span class="btn-icon">→</span>
      </a>
    </div>
  </section>

  <!-- L'entreprise -->
  <section class="content-section" bind:this={imageElements[1]}>
    <div class="section-header">
      <span class="section-kamon">🐴</span>
      <h2>L'entreprise</h2>
      <div class="section-line"></div>
    </div>

    <div class="entreprise-grid">
      <div class="entreprise-card">
        <span class="entreprise-label">Secteur</span>
        <span class="entreprise-value">{stageInfo.entreprise.secteur}</span>
      </div>
      <div class="entreprise-card">
        <span class="entreprise-label">Fondation</span>
        <span class="entreprise-value">{stageInfo.entreprise.fondation}</span>
      </div>
      <div class="entreprise-card">
        <span class="entreprise-label">Modèle</span>
        <span class="entreprise-value">{stageInfo.entreprise.modele}</span>
      </div>
      <div class="entreprise-card">
        <span class="entreprise-label">Communauté</span>
        <span class="entreprise-value">{stageInfo.entreprise.communaute}</span>
      </div>
    </div>
  </section>

  <!-- Missions -->
  <section
    class="content-section features-section"
    bind:this={imageElements[2]}
  >
    <div class="section-header">
      <span class="section-kamon">🎋</span>
      <h2>Mes missions</h2>
      <div class="section-line"></div>
    </div>

    <div class="features-grid">
      {#each stageInfo.missions as mission}
        <div class="feature-card">
          <span class="feature-icon">{mission.icon}</span>
          <h3>{mission.title}</h3>
          <p>{mission.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- KPIs -->
  <section class="content-section" bind:this={imageElements[3]}>
    <div class="section-header">
      <span class="section-kamon">📊</span>
      <h2>Résultats & KPIs</h2>
      <div class="section-line"></div>
    </div>

    <div class="kpi-grid">
      {#each stageInfo.kpis as kpi}
        <div class="kpi-card">
          <span class="kpi-valeur">{kpi.valeur}</span>
          <span class="kpi-label">{kpi.label}</span>
          <span class="kpi-detail">{kpi.detail}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Compétences acquises -->
  <section class="content-section">
    <div class="section-header">
      <span class="section-kamon">⚔️</span>
      <h2>Compétences acquises</h2>
      <div class="section-line"></div>
    </div>

    <div class="card-grid">
      {#each stageInfo.competences as competence, i}
        <div class="challenge-card" bind:this={imageElements[i + 4]}>
          <div class="card-accent"></div>
          <span class="number">0{i + 1}</span>
          <h3>{competence.title}</h3>
          <p>{competence.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Apprentissages -->
  <section class="content-section challenges">
    <div class="section-header">
      <span class="section-kamon">🎯</span>
      <h2>Ce que j'ai appris</h2>
      <div class="section-line"></div>
    </div>

    <div class="challenges-list">
      {#each stageInfo.apprentissages as item, i}
        <div class="challenge-row">
          <span class="challenge-num">0{i + 1}</span>
          <p>{item}</p>
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

  .hero-sub {
    display: block;
    margin-top: 0.5rem;
    font-size: clamp(1rem, 2vw, 1.35rem);
    color: var(--sakura-deep);
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-weight: 500;
    opacity: 0.85;
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

  .featured-image {
    max-width: 1000px;
    height: auto;
    width: 100%;
    margin: 0 auto 5rem;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  .image-frame-licorne-banner {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
      var(--ombre),
      0 0 0 1px rgba(196, 96, 122, 0.15);
    background: linear-gradient(135deg, var(--washi-mid), var(--sakura-pale));
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .licorne-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 2rem;
    text-align: center;
  }

  .licorne-emoji {
    font-size: clamp(3.8rem, 8vw, 5.5rem);
    filter: drop-shadow(0 8px 20px rgba(196, 96, 122, 0.28));
    animation: float 4s ease-in-out infinite;
  }

  .licorne-label {
    margin: 0;
    color: var(--sakura-deep);
    font-family: "Cormorant Garamond", serif;
    font-size: 1.1rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.8;
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

  .cta, .challenges-list {
    display: flex;
    gap: 12px;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary{
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

  .entreprise-grid,
  .kpi-grid,
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .entreprise-card,
  .feature-card,
  .kpi-card {
    flex: 1 1 200px;
    padding: 2rem;
    background: var(--washi-mid);
    border-radius: var(--radius);
    border: 1px solid rgba(196, 96, 122, 0.15);
    position: relative;
    overflow: hidden;
    text-align: left;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
    box-shadow: var(--ombre-sm);
  }

  .entreprise-card:hover,
  .feature-card:hover,
  .kpi-card:hover{
    transform: translateY(-5px);
    border-color: var(--sakura);
    box-shadow: var(--ombre-sakura);
  }

  .entreprise-label {
    display: block;
    margin-bottom: 0.7rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--sakura-deep);
    font-family: "bodoni moda", serif;
  }

  .entreprise-value {
    font-size: 0.98rem;
    color: var(--encre-mid);
    line-height: 1.7;
    font-family: "serif";
  }

  .feature-icon {
    font-size: 24px;
    margin-bottom: 0.8rem;
    display: inline-block;
  }

  .feature-card h3,
  .challenge-card h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--laque);
    margin: 0 0 0.6rem;
    font-family: "Cormorant Garamond", sans-serif;
  }

  .feature-card p {
    font-size: 16px;
    color: var(--encre-mid);
    line-height: 1.6;
    font-family: "serif";
    margin-bottom: 0;
  }

  .kpi-card {
    text-align: center;
    align-items: center;
  }

  .kpi-valeur {
    display: block;
    font-family: "Cormorant Garamond", serif;
    font-size: 2rem;
    font-weight: 800;
    color: var(--sakura-deep);
    margin-bottom: 0.45rem;
  }

  .kpi-label {
    display: block;
    color: var(--laque);
    font-family: "Bodoni Moda", serif;
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.4rem;
  }

  .kpi-detail {
    color: var(--encre-mid);
    font-family: "serif";
    font-size: 0.92rem;
    line-height: 1.5;
    opacity: 0.85;
  }

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

  .challenges-list {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .challenge-row {
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

  .challenge-row:hover {
    transform: translateX(6px);
    border-color: var(--sakura);
  }

  .challenge-num {
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
    font-size: 0.82rem;
    box-shadow: 0 4px 12px rgba(196, 96, 122, 0.3);
    opacity: 1;
    font-family: "Bodoni Moda", serif;
  }

  .challenge-row p {
    color: var(--encre);
    line-height: 1.6;
    margin: 0;
    font-size: 0.95rem;
    font-family: "serif";
  }

  .page-footer-deco {
    margin: 1rem 0 4rem;
    color: var(--sakura);
    font-size: 1rem;
    letter-spacing: 0.3em;
    opacity: 0.5;
    user-select: none;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
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

    .card-grid,
    .features-grid,
    .kpi-grid,
    .entreprise-grid {
      grid-template-columns: 1fr;
    }

    .featured-image,
    .content-section,
    .hero {
      padding-left: 1rem;
      padding-right: 1rem;
    }
     
    .challenge-row {
      align-items: flex-start;
    }
  }
</style>

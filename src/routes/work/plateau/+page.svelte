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
    title: "Sakura no Ban — 桜の盤",
    subtitle: "Plateau de cerisier",
    year: "2026",
    role: "Développement Web (PHP)",
    technologies: ["PHP 8+", "HTML5", "CSS3", "Sessions PHP"],
    description:
      "Un jeu de plateau jouable dans le navigateur, développé sans framework ni base de données. L'interface s'inspire de l'esthétique japonaise — papier washi, laque rouge, pétales de cerisier — avec une pluie de pétales SVG générés et animés entièrement en PHP + CSS. Le projet couvre deux jeux classiques : les échecs (8×8) et les dames (10×10, règles françaises).",
    games: [
      {
        icon: "♟",
        name: "Échecs",
        board: "8 × 8",
        rules: "Règles de base complètes",
      },
      {
        icon: "⬤",
        name: "Dames",
        board: "10 × 10",
        rules: "Règles françaises, prise obligatoire",
      },
    ],
    features: [
      {
        icon: "🎮",
        title: "2 jeux",
        desc: "Échecs et Dames sélectionnables depuis l'accueil",
      },
      {
        icon: "🤖",
        title: "IA intégrée",
        desc: "Mode solo avec capture prioritaire et coups aléatoires",
      },
      {
        icon: "🌸",
        title: "Pétales SVG",
        desc: "Pluie de pétales animée 100% PHP + CSS, zéro JavaScript",
      },
      {
        icon: "👑",
        title: "Promotion",
        desc: "Promotion automatique des pions aux échecs et aux dames",
      },
      {
        icon: "📜",
        title: "Historique",
        desc: "Coups affichés en notation algébrique en temps réel",
      },
      {
        icon: "📱",
        title: "Responsive",
        desc: "Interface jouable sur mobile et desktop",
      },
    ],
    concepts: [
      {
        title: "Sessions PHP",
        desc: "Tout l'état du jeu (plateau, tour, pièces, historique) est stocké en $_SESSION et persisté entre chaque clic, sans base de données.",
      },
      {
        title: "Pattern PRG",
        desc: "POST → PHP traite le coup → redirect → GET. Empêche le rejeu du coup au F5 et garantit une navigation propre.",
      },
      {
        title: "Pétales sans JS",
        desc: "PHP génère 24 éléments avec des propriétés CSS custom aléatoires (--x, --delay, --duration…). Les @keyframes animent tout.",
      },
      {
        title: "IA heuristique",
        desc: "L'IA liste tous ses coups possibles, priorise les captures, puis choisit aléatoirement parmi les options restantes.",
      },
    ],
    challenges: [
      "Implémenter toutes les règles d'échecs en PHP pur (roque, en passant, promotion, détection d'échec et mat)",
      "Gérer l'état complet de la partie via les sessions sans base de données",
      "Créer une pluie de pétales SVG animée sans une seule ligne de JavaScript",
      "Concevoir une IA fonctionnelle avec priorité de capture pour les deux jeux",
    ],
    results: [
      "2 jeux jouables en ligne avec règles complètes",
      "IA fonctionnelle sur les deux modes",
      "Animations 100% CSS, zéro dépendance externe",
      "Pattern PRG correctement implémenté",
      "Interface thème sakura cohérente et responsive",
    ],
    structure: [
      { file: "index.php", desc: "Accueil : choix du jeu, pluie de pétales" },
      { file: "game.php", desc: "Moteur de jeu (plateau, règles, IA, rendu)" },
      { file: "ai.php", desc: "Fonctions IA (inclus par game.php)" },
      { file: "reset.php", desc: "Réinitialise la session et redirige" },
      { file: "style.css", desc: "Thème Sakura complet" },
    ],
    links: {
      play: "https://echecdame.42web.io/index.php",
      github: "https://github.com/marylineb/jeu-plateau-royale",
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

    imageElements.forEach((img) => {
      if (!img) return;
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
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
  <title>Sakura no Ban | Maryline BILOA</title>
  <meta
    name="description"
    content="Jeu d'échecs et de dames au thème japonais, développé en PHP pur avec sessions, IA et pétales SVG animés."
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

    <div class="hero-badge">Projet Web · PHP pur</div>

    <h1>
      {projectInfo.title}
      <span class="hero-sub">{projectInfo.subtitle}</span>
    </h1>

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
      <img
        src="/img/screencapture-echecdame-42web-io-index-php-2026-03-09-09_40_39.png"
        alt="Sakura no Ban — écran principal"
      />
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
      {#each projectInfo.technologies as tech}
        <span class="chip">{tech}</span>
      {/each}
    </div>

    <div class="cta">
      <a
        href="https://echecdame.42web.io/index.php"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary"
      >
        <span>Jouer en ligne</span>
        <span class="btn-icon">→</span>
      </a>
      <a
        href="https://github.com/marylineb/sakura-no-ban"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-secondary"
      >
        <span>GitHub</span>
        <span class="btn-icon">↗</span>
      </a>
    </div>
  </section>

  <!-- Fonctionnalités -->
  <section class="content-section features-section">
    <div class="section-header">
      <span class="section-kamon">🎋</span>
      <h2>Fonctionnalités</h2>
      <div class="section-line"></div>
    </div>

    <div class="features-grid">
      {#each projectInfo.features as feature}
        <div class="feature-card">
          <span class="feature-icon">{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Galerie -->
  <section class="gallery">
    <div class="gallery-item" bind:this={imageElements[1]}>
      <div class="gallery-frame">
        <img
          src="/img/screencapture-echecdame-42web-io-game-php-2026-03-09-09_41_24.png"
          alt="Partie d'échecs en cours"
        />
      </div>
      <p class="caption">
        <span class="caption-dot"></span>Partie d'échecs en cours
      </p>
    </div>
    <div class="gallery-item" bind:this={imageElements[2]}>
      <div class="gallery-frame">
        <img
          src="/img/screencapture-echecdame-42web-io-game-php-2026-03-09-09_42_02.png"
          alt="Partie de dames en cours"
        />
      </div>
      <p class="caption">
        <span class="caption-dot"></span>Partie de dames en cours
      </p>
    </div>
    <div class="gallery-item" bind:this={imageElements[3]}>
      <div class="gallery-frame">
        <img src="/img/capturewin-echecs.png" alt="Écran de fin de partie" />
      </div>
      <p class="caption">
        <span class="caption-dot"></span>Fin de partie — échec et mat
      </p>
    </div>
  </section>

  <!-- Concepts techniques -->
  <section class="content-section">
    <div class="section-header">
      <span class="section-kamon">⚔️</span>
      <h2>Concepts techniques</h2>
      <div class="section-line"></div>
    </div>

    <div class="card-grid">
      {#each projectInfo.concepts as concept, i}
        <div class="challenge-card" bind:this={imageElements[i + 4]}>
          <div class="card-accent"></div>
          <span class="number">0{i + 1}</span>
          <h3>{concept.title}</h3>
          <p>{concept.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Structure du projet -->
  <section class="content-section structure-section">
    <div class="section-header">
      <span class="section-kamon">📁</span>
      <h2>Structure du projet</h2>
      <div class="section-line"></div>
    </div>

    <div class="file-tree">
      <div class="tree-root">sakura-no-ban/</div>
      {#each projectInfo.structure as item}
        <div class="tree-item">
          <span class="tree-branch">├─</span>
          <span class="tree-file">{item.file}</span>
          <span class="tree-desc">← {item.desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Défis -->
  <section class="content-section challenges">
    <div class="section-header">
      <span class="section-kamon">🎯</span>
      <h2>Défis relevés</h2>
      <div class="section-line"></div>
    </div>

    <div class="challenges-list">
      {#each projectInfo.challenges as challenge, i}
        <div class="challenge-row">
          <span class="challenge-num">0{i + 1}</span>
          <p>{challenge}</p>
        </div>
      {/each}
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
      {#each projectInfo.results as result}
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
  /* ─── Base ─── */
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

  /* ─── Pétales ─── */
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
    font-family: "sérif";
    margin-bottom: 1.2rem;
  }

  .hero h1 {
    display: block;
    width: 100%;
    margin: 0 0 2rem;
    color: var(--laque);
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 900;
    letter-spacing: 0.02em;
    font-family: "Cormorant Garamond", sans-serif;
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

  /* ─── Meta ─── */
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
    font-family: "sérif";
    font-weight: 500;
  }

  /* ─── Featured Image ─── */
  .featured-image {
    max-width: 870px;
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
      0 0 0 1px #c4607a26;
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

  /* ─── Sections ─── */
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
    letter-spacing: 0.02em;
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
    font-family: "sérif";
    max-width: 860px;
    margin: 0 auto 2rem;
    line-height: 1.85;
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
  .cta {
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

  /* ─── Features ─── */
  .features-section {
   margin-top: 2rem;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .feature-card {
   flex: 1 1 200px;
    padding: 2rem;
    background: var(--washi-mid);
    border-radius: var(--radius);
    border: 1px solid rgba(196, 96, 122, 0.15);
    position: relative;
    overflow: hidden;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: var(--ombre-sm);
  }
  .feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--sakura);
    box-shadow: var(--ombre-sakura);
  }
  .feature-icon {
    font-size: 24px;
    margin-bottom: 0.8rem;
  }
  .feature-card h3 {
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
    margin-bottom: 1rem;
  }

  /* ─── Galerie ─── */
  .gallery {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 5rem;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    position: relative;
    z-index: 1;
  }
  .gallery-frame {
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--ombre-sm);
    border: 1px solid rgba(196, 96, 122, 0.15);
    transition: box-shadow 0.3s ease;
  }
  .gallery-frame:hover {
    box-shadow: var(--ombre-sakura);
  }
  .gallery-item img {
    width: 100%;
    height: 240px;
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
    font-family: "cormorant garamond", sans-serif;
    opacity: 0.75;
  }
  .caption-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sakura);
    flex-shrink: 0;
  }

  /* ─── Concepts (cards) ─── */
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
    box-shadow: var(--ombre-sakura);
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
    font-family: "cormorant garamond", serif;
    opacity: 0.5;
  }
  .challenge-card h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--laque);
    font-family: "cormorant garamond", sans-serif;
    margin: 0 0 0.6rem;
  }
  .challenge-card p {
     color: var(--encre-mid);
    line-height: 1.7;
    font-family: "serif";
    font-size: 0.95rem;
    margin: 0;
  }

  /* ─── Structure fichiers ─── */
  .structure-section {
    text-align: left;
  }
  .file-tree {
    margin-top: 1.5rem;
    background: var(--encre);
    border-radius: var(--radius);
    padding: 1.8rem 2rem;
    font-family: "Cormorant Garamond", serif;
    font-size: 16px;
    box-shadow: var(--ombre-sm);
    border: 1px solid rgba(196, 96, 122, 0.2);
    overflow-x: auto;
  }
  .tree-root {
    color: var(--sakura);
    font-weight: 1000;
    margin-bottom: 0.6rem;
    font-size: 24px;
  }
  .tree-item {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.25rem 0;
    flex-wrap: wrap;
  }
  .tree-branch {
    color: rgba(242, 167, 187, 0.4);
    flex-shrink: 0;
  }
  .tree-file {
    color: var(--or-sakura);
    font-weight: 600;
    flex-shrink: 0;
  }
  .tree-desc {
    color: rgba(250, 243, 240, 0.45);
    font-size: 0.82rem;
    font-style: italic;
  }

  /* ─── Défis (liste) ─── */
  .challenges-list {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .challenge-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.2rem 1.5rem;
    background: var(--washi-mid);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(196, 96, 122, 0.15);
    text-align: left;
    box-shadow: var(--ombre-sm);
    transition:
      transform 0.25s ease,
      border-color 0.25s ease;
  }
  .challenge-row:hover {
    transform: translateX(6px);
    border-color: var(--sakura);
  }
  .challenge-num {
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--sakura);
    font-family: "Cormorant Garamond", serif;
    opacity: 0.6;
    flex-shrink: 0;
    min-width: 2rem;
  }
  .challenge-row p {
    color: var(--encre-mid);
    font-family: "serif";
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  /* ─── Résultats ─── */
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
    border: 1px solid rgba(196, 96, 122, 0.15);
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
    .gallery,
    .card-grid,
    .features-grid {
      grid-template-columns: 1fr;
    }

    .file-tree {
      font-size: 0.78rem;
      padding: 1.2rem;
    }
    .tree-desc {
      display: none;
    }
  }
</style>

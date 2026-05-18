<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const skills = [
    { label: "Frontend", items: ["SvelteKit", "HTML / CSS", "JavaScript", "GSAP"] },
    { label: "Backend", items: ["PHP", "Symfony", "Node.js", "SQL"] },
    { label: "Outils", items: ["Figma", "VS Code", "Git", "Vercel"] },
    { label: "Communication", items: ["Community Management", "Réseaux sociaux", "Stratégie éditoriale"] },
  ];

  const formations = [
    {
      year: "2024 – présent",
      degree: "Bachelor 2 Développement Web",
      school: "MyDigitalSchool Lyon",
      desc: "Spécialisation en développement web full-stack, UX/UI et stratégie digitale.",
    },
    {
      year: "2023 – 2024",
      degree: "Bachelor 1 Développement Web",
      school: "MyDigitalSchool Lyon",
      desc: "Initiation au développement web, communication digitale et marketing.",
    },
    {
      year: "2022 – 2023",
      degree: "L1 Maths / Informatique",
      school: "Université de Bertoua — Cameroun",
      desc: "Bases solides en algorithmique, analyse de données et programmation.",
    },
    {
      year: "2023",
      degree: "Baccalauréat Série C",
      school: "Collège Adventiste Bilingue de Bertoua",
      desc: "Formation scientifique — rigueur, logique et méthode.",
    },
  ];

  let heroEl: HTMLElement;
  let timelineItems: HTMLElement[] = [];
  let timelineLine: HTMLElement;

  onMount(() => {
    gsap.from(heroEl, { opacity: 0, y: 30, duration: 1, ease: "power3.out" });

    if (timelineLine) {
      gsap.from(timelineLine, {
        scrollTrigger: {
          trigger: timelineLine,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
      });
    }

    timelineItems.forEach((item, i) => {
      if (!item) return;

      const dot = item.querySelector(".timeline-dot");
      const body = item.querySelector(".timeline-body");
      const year = item.querySelector(".timeline-year");

      gsap.from(dot, {
        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(2)",
      });

      gsap.from(body, {
        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
        opacity: 0,
        x: 24,
        duration: 0.65,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(year, {
        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
        opacity: 0,
        y: -10,
        duration: 0.5,
        delay: 0.25,
        ease: "power2.out",
      });
    });
  });
</script>

<svelte:head>
  <title>À propos | Maryline Biloa</title>
  <meta name="description" content="Maryline Biloa — développeuse web, étudiante à MyDigitalSchool Lyon. Découvrez mon parcours et mes compétences." />
</svelte:head>

<div class="about-page">

  <!-- ── Hero ─────────────────────────── -->
  <section class="about-hero" bind:this={heroEl}>
    <!-- Colonne gauche : photo + identité -->
    <div class="hero-left">
      <div class="photo-wrap">
        <img src="/img/IMG-20241014-WA0030.jpg" alt="Maryline Biloa" />
      </div>
    </div>

    <!-- Colonne droite : bio + skills -->
    <div class="hero-right">
      <span class="eyebrow">Développeuse Web & Créative</span>
      <h1>Maryline <em>Biloa</em></h1>

      <p class="bio">
        Étudiante en Bachelor 2 à MyDigitalSchool Lyon, je combine logique
        informatique, sens du design et stratégie digitale pour créer des
        expériences web qui ont de la personnalité.
        <br /><br />
        Influencée par la culture japonaise et geek, j'aime les interfaces
        soignées, les animations subtiles et les projets qui ont une vraie âme.
      </p>

      <a href="/docs/marylinebiloaCV.pdf" download class="btn-cv">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Télécharger mon CV
      </a>

      <!-- Compétences -->
      <div class="skills-grid">
        {#each skills as skill}
          <div class="skill-block">
            <h3>{skill.label}</h3>
            <ul>
              {#each skill.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ── Outils / Techs ─────────────────── -->
  <section class="tools-strip">
    <span class="strip-label">Technologies utilisées</span>
    <div class="tools-list">
      <img src="/img/PHP-logo.svg.png" alt="PHP" title="PHP" />
      <img src="/img/icons8-figma-96.png" alt="Figma" title="Figma" />
      <img src="/img/icons8-code-studio-visuel-2019-96.png" alt="VS Code" title="VS Code" />
      <img src="/img/gsap (1).png" alt="GSAP" title="GSAP" />
      <img src="/img/favicon.svg" alt="SvelteKit" title="SvelteKit" />
    </div>
  </section>

  <!-- ── Parcours / Timeline ───────────── -->
  <section class="timeline-section">
    <div class="timeline-header">
      <span class="eyebrow">Mon parcours</span>
      <h2>Formation <em>&</em> Expérience</h2>
    </div>

    <div class="timeline" bind:this={timelineLine}>
      {#each formations as f, i}
        <div class="timeline-item" bind:this={timelineItems[i]}>
          <div class="timeline-dot"></div>
          <div class="timeline-body">
            <span class="timeline-year">{f.year}</span>
            <h3 class="timeline-degree">{f.degree}</h3>
            <p class="timeline-school">{f.school}</p>
            <p class="timeline-desc">{f.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- ── Citation ──────────────────────── -->
  <section class="quote-section">
    <blockquote>
      <p>« Avance. Même si tu ne sais pas encore où cela te mènera. »</p>
      <cite>— Shingeki no Kyojin</cite>
    </blockquote>
  </section>

</div>

<style>
  /* ── Page ── */
  .about-page {
    background: var(--washi);
    min-height: 100vh;
    color: var(--encre);
  }

  .eyebrow {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    margin-bottom: 16px;
  }

  /* ── Hero ── */
  .about-hero {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 80px;
    align-items: start;
    max-width: 1260px;
    margin: 0 auto;
    padding: 108px 48px 80px;
  }

  /* Photo */
  .hero-left {
    position: sticky;
    top: 100px;
  }

  .photo-wrap {
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 4px;
    background: var(--washi-mid);
  }

  .photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  .photo-wrap:hover img {
    transform: scale(1.03);
  }

  /* Bio */
  .hero-right h1 {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: clamp(40px, 5vw, 72px);
    line-height: 1;
    letter-spacing: -0.01em;
    color: var(--laque-dark);
    margin-bottom: 28px;
  }

  .hero-right h1 em {
    font-style: italic;
    color: var(--sakura-deep);
  }

  .bio {
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.85;
    color: var(--encre-mid);
    max-width: 540px;
    margin-bottom: 32px;
  }

  .btn-cv {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 28px;
    border: 1px solid var(--laque-dark);
    color: var(--laque-dark);
    background: transparent;
    border-radius: 2px;
    transition: all 0.25s ease;
    margin-bottom: 52px;
  }

  .btn-cv:hover {
    background: var(--laque-dark);
    color: var(--washi);
  }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 40px;
    border-top: 1px solid rgba(196, 96, 122, 0.15);
    padding-top: 36px;
  }

  .skill-block h3 {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    margin-bottom: 12px;
  }

  .skill-block ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skill-block li {
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--encre);
    padding-left: 14px;
    position: relative;
  }

  .skill-block li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: var(--sakura-deep);
    border-radius: 50%;
  }

  /* ── Tools Strip ── */
  .tools-strip {
    border-top: 1px solid rgba(196, 96, 122, 0.12);
    border-bottom: 1px solid rgba(196, 96, 122, 0.12);
    background: rgba(253, 232, 239, 0.3);
    padding: 28px 48px;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .strip-label {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--encre-mid);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tools-list {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .tools-list img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    opacity: 0.65;
    transition: opacity 0.2s ease, transform 0.2s ease;
    filter: grayscale(20%);
  }

  .tools-list img:hover {
    opacity: 1;
    transform: translateY(-2px);
    filter: none;
  }

  /* ── Timeline ── */
  .timeline-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 100px 48px 80px;
  }

  .timeline-header {
    margin-bottom: 60px;
  }

  .timeline-header h2 {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: clamp(32px, 5vw, 56px);
    line-height: 1.1;
    color: var(--laque-dark);
    margin-top: 8px;
  }

  .timeline-header h2 em {
    font-style: italic;
    color: var(--sakura-deep);
  }

  /* Timeline items */
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    padding-left: 2px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      var(--sakura-deep),
      rgba(196, 96, 122, 0.08)
    );
    transform-origin: top center;
  }

  .timeline-item {
    display: flex;
    gap: 32px;
    padding-bottom: 48px;
    position: relative;
  }

  .timeline-dot {
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--sakura-deep);
    border: 2px solid var(--washi);
    outline: 1px solid var(--sakura-deep);
    margin-top: 6px;
    position: relative;
    left: -4px;
  }

  .timeline-body {
    flex: 1;
    padding-bottom: 0;
  }

  .timeline-year {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    display: block;
    margin-bottom: 8px;
  }

  .timeline-degree {
    font-family: var(--font-serif);
    font-weight: 500;
    font-size: 1.25rem;
    color: var(--encre);
    margin-bottom: 4px;
  }

  .timeline-school {
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 500;
    color: var(--encre-mid);
    margin-bottom: 10px;
  }

  .timeline-desc {
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--encre-mid);
    line-height: 1.7;
  }

  /* ── Citation ── */
  .quote-section {
    text-align: center;
    padding: 60px 48px 100px;
    border-top: 1px solid rgba(196, 96, 122, 0.12);
  }

  blockquote {
    max-width: 600px;
    margin: 0 auto;
  }

  blockquote p {
    font-family: var(--font-serif);
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 300;
    font-style: italic;
    color: var(--laque);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  blockquote cite {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    font-style: normal;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .about-hero {
      grid-template-columns: 320px 1fr;
      gap: 48px;
      padding: 110px 32px 60px;
    }
  }

  @media (max-width: 768px) {
    .about-hero {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 100px 24px 48px;
    }

    .hero-left {
      position: static;
    }

    .photo-wrap {
      aspect-ratio: 4 / 3;
      max-height: 300px;
    }

    .hero-right h1 {
      font-size: clamp(32px, 9vw, 52px);
    }

    .skills-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .tools-strip {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 24px;
    }

    .timeline-section {
      padding: 60px 24px 60px;
    }

    .quote-section {
      padding: 40px 24px 60px;
    }
  }

  @media (max-width: 480px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }

    .btn-cv {
      width: 100%;
      justify-content: center;
    }
  }
</style>

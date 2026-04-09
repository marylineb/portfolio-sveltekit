<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let descriptionSection: HTMLElement;
  let formationSection: HTMLElement;
  let scrollLine: HTMLElement;
  let scrollLineFill: HTMLElement;

  const formations = [
    {
      position: "left",
      image: "/img/moi2.jpeg",
      text: "Bachelor 2 Développement Web — MyDigitalSchool Lyon (en cours). Spécialisation en développement web, avec une approche stratégique et créative.",
    },
    {
      position: "right",
      image: "/img/MDS.webp",
      text: "Bachelor 1 Développement Web — MyDigitalSchool Lyon. Initiation au développement web, à la communication digitale et au marketing, avec une approche créative et technique.",
    },
    {
      position: "left",
      image: "/img/ube.png",
      text: "L1 Maths/Statistiques & Informatique — Université de Bertoua (Cameroun). Acquisition de bases solides en algorithmique, analyse de données et programmation.",
    },
    {
      position: "right",
      image: "/img/cabb.jpeg",
      text: "Baccalauréat Série C — Collège Adventiste Bilingue de Bertoua (2023). Formation scientifique développant rigueur, logique et méthode, appliquées aujourd’hui à mes projets web et créatifs.",
    },
  ];

  onMount(() => {
    // Animation de la section description
    if (descriptionSection) {
      gsap.from(descriptionSection.querySelector("h1"), {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(descriptionSection.querySelector("div"), {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
    }

    // Animation de la ligne de scroll - AMÉLIORÉE
    if (scrollLineFill && formationSection) {
      gsap.to(scrollLineFill, {
        scrollTrigger: {
          trigger: formationSection,
          start: "top center",
          end: "bottom center",
          scrub: 0.5, // Réduit pour plus de fluidité (était à 1)
          // markers: true, // Décommentez pour déboguer
        },
        scaleY: 1,
        ease: "power1.inOut", // Plus smooth qu'avant
      });
    }

    // Animation des sections de formation avec images
    const contentElements = document.querySelectorAll(".content");
    contentElements.forEach((section) => {
      // Animation de la carte
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      // Animation de l'image séparée
      const img = section.querySelector(".formation-image");
      if (img) {
        gsap.from(img, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: section.classList.contains("left") ? -50 : 50,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    });
  });
</script>

<svelte:head>
  <title>À propos | Maryline</title>
  <meta
    name="description"
    content="Découvrez mon parcours, ma formation et mes passions."
  />
</svelte:head>

<main class="about-page">
  <section id="description" bind:this={descriptionSection}>
    <h1>MOI & MON PARCOURS</h1>
    <div class="description-content">
      <img src="/img/IMG-20241014-WA0030.jpg" alt="Maryline Biloa" />
      <p>
        Je m'appelle Maryline BILOA, étudiante en bachelor 2 à MyDigitalSchool
        Lyon, une jeune créative passionnée par la technologie et l'art de
        captiver les esprits. De culture asiatique, surtout japonaise, je suis
        aussi une touche-à-tout curieuse, toujours en quête de nouvelles façons
        d'explorer le monde numérique et les interactions humaines.
        <br /><br />
        Que ce soit pour créer des descriptions accrocheuses, concevoir des outils
        interactifs, faire des sites qualitatifs ou écrire des contenus qui se connectent
        vraiment avec leur public, je m'efforce de combiner créativité et praticité
        dans tout ce que je fais.
        <br /><br />
        Mon univers gravite autour de la culture geek, de la communication bienveillante
        et de l'envie de construire des ponts entre les idées et les gens. Si vous
        cherchez un partenaire authentique pour donner vie à vos projets, je serai
        ravie de collaborer avec vous ! 😊
      </p>
    </div>
  </section>

  <section id="separate">
    <img src="/img/PHP-logo.svg.png" alt="" />
    <img src="/img/icons8-figma-96.png" alt="" />
    <img src="/img/icons8-code-studio-visuel-2019-96.png" alt="" />
    <img src="/img/gsap (1).png" alt="" />
    <img src="/img/favicon.svg" alt="" />
  </section>

  <section id="formation" bind:this={formationSection}>
    <div class="scroll_line" bind:this={scrollLine}>
      <div class="scroll_line_fill" bind:this={scrollLineFill}></div>
    </div>

    <div id="scroll_text">
      {#each formations as formation}
        <section class="content {formation.position}">
          <div class="formation-image">
            <img src={formation.image} alt="Formation" />
          </div>
          <div class="formation-text">
            <p>{formation.text}</p>
          </div>
        </section>
      {/each}
    </div>
  </section>
  <section id="citation">
    <p>« Avance. Même si tu ne sais pas encore où cela te mènera. »</p>
    <span>— Shingeki no Kyojin</span>
  </section>
</main>

<style>
  .about-page {
    padding: 180px 24px 40px; /* + haut pour laisser respirer sous le header */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: var(--washi);
    color: var(--washi);
  }

  /* -------------------------
   DESCRIPTION
------------------------- */
  #description {
    max-width: 1200px;
    text-align: center;
    margin: 0 auto 6rem;
    padding: 0 2rem;
  }

  #description h1 {
    margin: 16px 0 40px 0;
    color: var(--laque);
    font-size: clamp(44px, 6vw, 92px);
    font-family: "Cormorant Garamond", serif;
  }

  #description h1::after {
    content: "";
    display: block;
    width: min(400px, 80vw);
    height: 2.6px;
    background: linear-gradient(90deg, transparent, var(--sakura), transparent);
    margin: 8px auto 0;
  }

  /* ✅ UN SEUL bloc description-content (fusion) */
  .description-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    gap: 56px;
    margin: 24px auto 0;
    padding: 36px 24px;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(242, 167, 187, 0.35);
    border-radius: 20px;
    box-shadow: var(--ombre-sm);
    cursor: pointer;
    position: relative;
    overflow: hidden;

    transition:
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 0.3s ease,
      background 0.3s ease;
  }

  /* petite déco sakura */
  .description-content::before {
    content: "✿";
    position: absolute;
    top: 12px;
    right: 16px;
    font-size: 1rem;
    color: var(--sakura);
    opacity: 0.32;
    transition:
      opacity 0.3s ease,
      transform 0.35s ease;
  }

  .description-content:hover {
    border-color: var(--sakura);
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--ombre-sakura);
    background: rgba(255, 255, 255, 0.94);
  }

  .description-content:hover::before {
    opacity: 0.75;
    transform: rotate(22deg) scale(1.4);
  }

  .description-content img {
    width: min(420px, 100%);
    height: 420px;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid rgba(242, 167, 187, 0.25);
    box-shadow: var(--ombre-sakura);
  }

  .description-content p {
    font-size: 16px;
    font-family: "serif";
    text-align: center;
    line-height: 1.9;
    color: var(--encre);
    max-width: 650px;
    margin: 0;
    text-align: center;
  }

  /* -------------------------
   SEPARATE (icônes)
------------------------- */
  #separate {
    display: flex;
    justify-content: space-evenly; 
    align-items: center;
    gap: 36px; 
    width: 100%;
    padding: 18px 12px;
    border: 1px solid rgba(250, 243, 240, 0.14);
    background: var(--case-claire); 
    box-shadow: var(--ombre-sm);
    margin: 24px auto 24px;
  }

  #separate img {
    width: 72px;
    height: 72px;
    display: block; 
    object-fit: contain; /* évite crop */
    opacity: 0.92;

    filter: drop-shadow(0 0 10px rgba(242, 167, 187, 0.12));
    transition:
      transform 0.2s ease,
      opacity 0.2s ease,
      filter 0.2s ease;
  }

  #separate img:hover {
    transform: translateY(-2px) scale(1.04);
    opacity: 1;
    filter: drop-shadow(0 0 14px rgba(143, 179, 128, 0.22));
  }

  /* -------------------------
   FORMATION (timeline)
------------------------- */
  #formation {
    position: relative;
    max-width: 1200px;
    margin: 80px auto 0;
    padding: 0 2rem 2rem;
  }

  /* Ligne verticale */
  .scroll_line {
    position: absolute;
    left: 50%;
    top: 0;
    width: 6px;
    height: calc(100% - 120px);
    background: rgba(143, 179, 128, 0.18); /* bambou léger */
    transform: translateX(-50%);
    border-radius: 999px;
  }

  .scroll_line_fill {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--bambou)
    );
    transform-origin: top;
    transform: scaleY(0);
    border-radius: 999px;
    box-shadow: 0 0 14px rgba(143, 179, 128, 0.28);
  }

  #scroll_text {
    position: relative;
    z-index: 1;
  }

  /* Cartes formation */
  .content {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    margin-bottom: 4.5rem;
    padding: 1.8rem;
    border-color: var(--sakura);
    box-shadow: var(--ombre-sakura);
    background: rgba(255, 255, 255, 0.94);
    border-radius: 25px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(242, 167, 187, 0.35);
  }

  .content.left {
    margin-right: auto;
    width: 56%;
    flex-direction: row;
  }

  .content.right {
    margin-left: auto;
    width: 56%;
    flex-direction: row-reverse;
  }

  /* Image formation */
  .formation-image {
    flex: 0 0 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid rgba(242, 167, 187, 0.22);
    box-shadow: var(--ombre-sakura);
  }

  .formation-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Texte formation */
  .formation-text {
    flex: 1;
  }

  .content p {
    font-family:  "serif";
    font-size: 16px;
    line-height: 1.85;
    color: var(--encre);
    margin: 0;
  }

  /* -------------------------
   CITATION
------------------------- */
  #citation {
    text-align: center;
    margin: 48px auto 0;
    padding: 0 2rem;
    max-width: 760px;

    opacity: 0;
    animation: fadeInUp 1.8s ease forwards;
    animation-delay: 1.2s;
    transform: translateY(30px);
  }

  #citation p {
    font-size: 20px;
    font-family: "Cormorant Garamond", serif;
    color: var(--bambou);
    font-style: italic;
    margin-bottom: 0.8rem;
    text-shadow: 0 0 16px rgba(143, 179, 128, 0.15);
  }

  #citation span {
    font-size: 16px;
    font-family: "cormorant garamond", serif;
    color: var(--sakura-deep);
  }

  /* -------------------------
   RESPONSIVE
------------------------- */

/* Tablet (≤ 1024px) */
@media (max-width: 1024px) {
  .about-page {
    padding: 110px 20px 50px;
  }

  #description {
    margin-bottom: 4rem;
    padding: 0 1.2rem;
  }

  .description-content {
    flex-direction: column;
    gap: 18px;
    padding: 22px 18px;
  }

  .description-content img {
    width: 100%;
    height: 320px;
  }

  .description-content p {
    text-align: center;
  }

  #separate {
    gap: 18px;
    flex-wrap: wrap;
  }

  #separate img {
    width: 62px;
    height: 62px;
  }

  /* Timeline => full width */
  #formation {
    padding: 0 1.2rem 2rem;
  }

  .scroll_line {
    display: none;
  }

  .content {
    width: 100% !important;
    flex-direction: column !important;
    margin: 0 0 3rem 0;
    gap: 1.2rem;
  }

  .formation-image {
    width: 100%;
    height: 220px;
    flex: 0 0 auto;
  }
}

/* Mobile (≤ 768px) */
@media (max-width: 768px) {
  #description h1 {
    font-size: clamp(2.1rem, 8vw, 3rem);
  }

  .description-content {
    padding: 18px 14px;
  }

  .description-content img {
    height: 280px;
  }

  .content {
    padding: 1.2rem;
    border-radius: 18px;
  }

  .content p {
    font-size: 0.95rem;
    line-height: 1.75;
  }

  #citation p {
    font-size: 18px;
  }

  #citation span {
    font-size: 15px;
  }
}

/* Small mobile (≤ 540px) */
@media (max-width: 540px) {
  .about-page {
    padding: 100px 12px 40px;
  }

  #description {
    padding: 0 0.6rem;
  }

  .description-content img {
    height: 240px;
  }

  #separate img {
    width: 54px;
    height: 54px;
  }

  .content {
    padding: 1rem;
  }

  .formation-image {
    height: 200px;
  }
}
</style>

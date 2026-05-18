<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {gsap} from "gsap";

  let aboutMeElement: HTMLElement;
  let meElement: HTMLElement;
  let imageElement: HTMLElement;

  // Layer pétales 
  let petalsLayer: HTMLDivElement;

  const tweens: gsap.core.Tween[] = [];
  let petals: HTMLSpanElement[] = [];
  let resizeHandler: (() => void) | null = null;

  function rnd(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function petalColor(op: number) {
    const roll = Math.random();
    if (roll < 0.60) return `rgba(242,167,187,${op})`; // sakura
    if (roll < 0.80) return `rgba(253,232,239,${op})`; // sakura-pale
    if (roll < 0.92) return `rgba(196,96,122,${op})`; // sakura-deep
    if (roll < 0.99) return `rgba(143,168,136,${op})`; // bambou (touches)
    return `rgba(212,149,106,${op})`;                 // or-sakura (rare)
  }

  function clearPetals() {
    tweens.forEach((t) => t.kill());
    tweens.length = 0;

    petals.forEach((p) => p.remove());
    petals = [];
  }

  function spawnPetals() {
    if (!petalsLayer) return;

    // Accessibilité
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    clearPetals();

    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = Math.min(42, Math.max(18, Math.floor(w / 45)));

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";

      // Taille / opacité / flou léger
      const size = rnd(10, 22);
      const op = rnd(0.30, 0.70);
      p.style.width = `${size}px`;
      p.style.height = `${size * rnd(0.65, 0.9)}px`;
      p.style.opacity = `${op}`;
      p.style.background = petalColor(op);

      const startX = rnd(-0.1 * w, 1.1 * w);
      const startY = rnd(-0.6 * h, -0.05 * h);
      const drift = rnd(-120, 120);
      const endX = startX + drift;
      const endY = h + rnd(80, 180);
      const rotStart = rnd(-120, 120);
      const rotEnd = rotStart + rnd(240, 520);
      const blur = rnd(0, 1.6);
      p.style.filter = `blur(${blur}px) drop-shadow(0 0 10px rgba(242,167,187,0.10))`;
      petalsLayer.appendChild(p);
      petals.push(p);

      gsap.set(p, {
        x: startX,
        y: startY,
        rotate: rotStart,
        scale: rnd(0.85, 1.15)
      });
      const fall = gsap.to(p, {
        x: endX,
        y: endY,
        rotate: rotEnd,
        duration: rnd(7.5, 13),
        ease: "none",
        delay: rnd(0, 3),
        repeat: -1,
        onRepeat: () => {
          const nx = rnd(-0.1 * w, 1.1 * w);
          const ny = rnd(-0.6 * h, -0.05 * h);
          const nd = rnd(-140, 140);

          const nsize = rnd(10, 22);
          const nop = rnd(0.30, 0.70);

          p.style.width = `${nsize}px`;
          p.style.height = `${nsize * rnd(0.65, 0.9)}px`;
          p.style.opacity = `${nop}`;
          p.style.background = petalColor(nop);
          p.style.filter = `blur(${rnd(0, 1.6)}px) drop-shadow(0 0 10px rgba(242,167,187,0.10))`;

          gsap.set(p, {
            x: nx,
            y: ny,
            rotate: rnd(-120, 120),
            scale: rnd(0.85, 1.15)
          });

          (fall as any).vars.x = nx + nd;
          (fall as any).vars.y = window.innerHeight + rnd(80, 180);
          (fall as any).vars.rotate = rnd(240, 520);
          (fall as any).vars.duration = rnd(7.5, 13);
        }
      });
      tweens.push(fall);

      // Wobble doux (oscillation)
      const wobble = gsap.to(p, {
        x: `+=${rnd(-18, 18)}`,
        duration: rnd(1.8, 3.2),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: rnd(0, 1.2)
      });
      tweens.push(wobble);
    }
  }

  onMount(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(imageElement, {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    })
      .from(
        aboutMeElement,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        meElement,
        {
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      );

    // Spawn pétales après l’entrée image 
    gsap.delayedCall(0.9, spawnPetals);
    // Recalc au resize (debounce simple)
    let t: number | null = null;
    resizeHandler = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => spawnPetals(), 250);
    };
    window.addEventListener("resize", resizeHandler);
  });

  onDestroy(() => {
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    clearPetals();
  });
</script>

<main>
  <section id="home">
    <div class="image home-image" bind:this={imageElement}>
      <img src="/img/pexels-eberhardgross-2088170.jpg" alt="rose" />
    </div>
    <div class="petals-layer" aria-hidden="true" bind:this={petalsLayer}></div>

    <div class="writing">
      <span class="me" bind:this={meElement}>MARYLINE BILOA</span>
      <span class="about_me" bind:this={aboutMeElement}>
        Développeuse web spécialisée en SvelteKit, UX/UI et expériences numériques créatives.
      </span>
      <a href="/docs/marylinebiloaCV.pdf" download class="download-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Télécharger mon CV
      </a>
    </div>
    
    <a href="/work" class="scroll-indicator" aria-label="Voir mes projets">
      Mes projets
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </a>
  </section>
</main>

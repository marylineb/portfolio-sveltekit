<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';

    let headerElement!: HTMLElement;

    // Vérifier si on est sur la page d'accueil
    $: isHomePage = $page.url.pathname === '/';

    onMount(() => {
        gsap.from(headerElement, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });
    });

    onMount(() => {
        gsap.to("header", {
            boxShadow: "5px 8px 20px 10px var(--sakura-deep)",
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    $: pathname = String($page.url.pathname);
</script>

<header bind:this={headerElement} class:fixed={isHomePage}>
  <nav class="main-nav">
  <div class="nav-left">
    <a href="/" data-label="Accueil">ACCUEIL
    </a>
    <a href="/about" data-label="À propos">A-PROPOS
    </a>
  </div>

  <div class="logo-imge">
    <a href="/" id="logo">
      <img src="/img/logo.png" alt="Logo" />
    </a>
  </div>

  <div class="nav-right">
    <a href="/work" data-label="Projets">MES TRAVAUX
    </a>
    <a href="/contact" data-label="Contact">CONTACT
    </a>
  </div>
</nav>
</header>

<style>
.main-nav {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 24px;
}

.nav-left a,
.nav-right a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  font-family: serif;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--laque-dark);
}

/* Header */
header {
 position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: min(92%, 1280px);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  z-index: 1000;

  border: 1px solid var(--sakura-deep);
  border-radius: var(--radius);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  background-color: rgba(196, 145, 159, 0.75);
  box-shadow: var(--ombre-sakura);

  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    padding 0.3s ease;
}
</style>
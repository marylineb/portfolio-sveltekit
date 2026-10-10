<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';

  let headerEl: HTMLElement;
  let isMenuOpen = false;
  let scrolled = false;

  $: pathname = $page.url.pathname;
  $: isHome = pathname === '/';

  let scrollHandler: () => void;

  onMount(() => {
    gsap.from(headerEl, { y: -64, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });

    scrollHandler = () => {
      scrolled = window.scrollY > 40;
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
  });

  onDestroy(() => {
    if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  function closeMenu() {
    isMenuOpen = false;
    document.body.style.overflow = '';
  }
</script>

<header bind:this={headerEl} class:scrolled class:home={isHome}>
  <a href="/" class="logo" on:click={closeMenu} aria-label="Maryline Biloa — Accueil">
    <img src="/img/logo.png" alt="Maryline Biloa" />
  </a>

  <nav class="nav">
    <a href="/" on:click={closeMenu} class:active={pathname === '/'}>Accueil</a>
    <a href="/about" on:click={closeMenu} class:active={pathname === '/about'}>À propos</a>
    <a href="/work" on:click={closeMenu} class:active={pathname === '/work'}>Projets</a>
    <a href="/contact" on:click={closeMenu} class:active={pathname === '/contact'}>Contact</a>
  </nav>

  <button class="burger" on:click={toggleMenu} aria-label="Menu" aria-expanded={isMenuOpen}>
    <span class="line" class:open={isMenuOpen}></span>
    <span class="line" class:open={isMenuOpen}></span>
    <span class="line" class:open={isMenuOpen}></span>
  </button>
</header>

{#if isMenuOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="drawer-backdrop" on:click={closeMenu}></div>
{/if}

<div class="drawer" class:open={isMenuOpen} aria-hidden={!isMenuOpen}>
  <div class="drawer-header">
    <img src="/img/logo.png" alt="Maryline Biloa" class="drawer-logo" />
    <button class="drawer-close" on:click={closeMenu} aria-label="Fermer le menu">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="drawer-nav">
    <a href="/" on:click={closeMenu} class:active={pathname === '/'}>
      <span class="link-num">01</span>Accueil
    </a>
    <a href="/about" on:click={closeMenu} class:active={pathname === '/about'}>
      <span class="link-num">02</span>À propos
    </a>
    <a href="/work" on:click={closeMenu} class:active={pathname === '/work'}>
      <span class="link-num">03</span>Projets
    </a>
    <a href="/contact" on:click={closeMenu} class:active={pathname === '/contact'}>
      <span class="link-num">04</span>Contact
    </a>
  </nav>

  <div class="drawer-footer">
    <a href="/docs/marylinebiloaCV.pdf" download class="drawer-cta">Télécharger CV</a>
  </div>
</div>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 68px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    background: rgba(250, 243, 240, 0);
    border-bottom: 1px solid transparent;
    transition:
      background 0.4s ease,
      border-color 0.4s ease,
      backdrop-filter 0.4s ease,
      box-shadow 0.4s ease;
  }

  header.scrolled {
    background: rgba(250, 243, 240, 0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(196, 96, 122, 0.12);
    box-shadow: 0 2px 20px rgba(28, 16, 24, 0.06);
  }

  .logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: 1;
  }

  .logo img {
    height: 38px;
    width: auto;
    display: block;
    transition: opacity 0.25s ease;
  }

  .logo:hover img {
    opacity: 0.75;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 36px;
    margin-left: auto;
  }

  .nav a {
    position: relative;
    font-family: var(--font-sans);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--encre);
    text-decoration: none;
    padding: 4px 0;
    opacity: 0.7;
    transition: opacity 0.2s ease, color 0.2s ease;
  }

  .nav a:hover {
    opacity: 1;
  }

  .nav a.active {
    opacity: 1;
    color: var(--sakura-deep);
  }

  .nav a.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--sakura-deep);
  }

  .burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 16px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1100;
  }

  .line {
    display: block;
    width: 100%;
    height: 1.5px;
    background: var(--encre);
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }

  .line.open:nth-child(1) { transform: translateY(7.25px) rotate(45deg); }
  .line.open:nth-child(2) { opacity: 0; }
  .line.open:nth-child(3) { transform: translateY(-7.25px) rotate(-45deg); }

  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(28, 16, 24, 0.35);
    z-index: 1001;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    animation: fade-in 0.3s ease;
  }

  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: min(300px, 82vw);
    height: 100dvh;
    z-index: 1002;
    background: var(--washi);
    border-left: 1px solid rgba(196, 96, 122, 0.15);
    box-shadow: -12px 0 48px rgba(28, 16, 24, 0.14);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .drawer.open {
    transform: translateX(0);
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    border-bottom: 1px solid rgba(196, 96, 122, 0.1);
  }

  .drawer-logo {
    height: 32px;
    width: auto;
  }

  .drawer-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    color: var(--encre-mid);
    transition: color 0.2s ease;
  }

  .drawer-close:hover {
    color: var(--laque);
  }

  .drawer-nav {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 16px 0;
    flex: 1;
  }

  .drawer-nav a {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 28px;
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 500;
    color: var(--encre);
    text-decoration: none;
    border-bottom: 1px solid rgba(196, 96, 122, 0.07);
    transition: background 0.2s ease, color 0.2s ease, padding-left 0.2s ease;
  }

  .drawer-nav a:hover {
    background: rgba(253, 232, 239, 0.5);
    padding-left: 36px;
    color: var(--laque);
  }

  .drawer-nav a.active {
    color: var(--sakura-deep);
    background: rgba(253, 232, 239, 0.4);
  }

  .link-num {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: 0.75rem;
    color: var(--sakura-deep);
    opacity: 0.6;
    flex-shrink: 0;
  }

  .drawer-footer {
    padding: 24px 28px;
    border-top: 1px solid rgba(196, 96, 122, 0.1);
  }

  .drawer-cta {
    display: block;
    text-align: center;
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px;
    border: 1px solid var(--laque-dark);
    color: var(--laque-dark);
    border-radius: 2px;
    transition: all 0.25s ease;
  }

  .drawer-cta:hover {
    background: var(--laque-dark);
    color: var(--washi);
  }

  @media (max-width: 768px) {
    header {
      padding: 0 24px;
    }

    .nav {
      display: none;
    }

    .burger {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    header {
      padding: 0 20px;
      height: 60px;
    }

    .logo img {
      height: 32px;
    }
  }
</style>
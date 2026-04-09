<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import Header from "$lib/components/header.svelte";
  import Loader from "$lib/components/loader.svelte";

  let showLoader = true;
  let loaderComplete = false;
  let loaderStartTime = 0;
  const MIN_LOADER_DURATION = 2000; // 2 secondes

  onMount(() => {
    // Toujours afficher le loader à chaque chargement de page
    showLoader = true;
    loaderStartTime = Date.now();
  });

  function handleLoaderComplete() {
    const elapsedTime = Date.now() - loaderStartTime;
    const remainingTime = Math.max(0, MIN_LOADER_DURATION - elapsedTime);

    // Attendre le temps restant avant de masquer le loader
    setTimeout(() => {
      loaderComplete = true;

      setTimeout(() => {
        showLoader = false;
      }, 300);

      setTimeout(() => {
        gsap.from(".page-content", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      }, 100);
    }, remainingTime);
  }
</script>

<svelte:head>
  <title>Maryline Biloa – Développeuse Web</title>
  <meta name="description" content="Portfolio de Maryline Biloa, développeuse web spécialisée en SvelteKit, UI/UX et création d’expériences digitales modernes." />
  <meta name="author" content="Maryline Biloa" />
  <meta property="og:title" content="Maryline Biloa – Développeuse Web" />
  <meta property="og:description" content="Découvrez le portfolio et les projets de Maryline Biloa." />
  <meta property="og:type" content="website" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maryline Biloa",
  "url": "https://tonsite.com",
  "sameAs": [
    "https://github.com/tonprofil",
    "https://linkedin.com/in/tonprofil"
  ]
}
</script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Noto+Serif+JP:wght@200..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</svelte:head>

{#if showLoader}
  <Loader on:complete={handleLoaderComplete} />
{/if}

{#if loaderComplete}
  <div class="page-content">
    <Header />
      <slot />
  </div>
{/if}

<style>
  .page-content {
    min-height: 100vh;
  }
</style>
<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import gsap from "gsap";

  const dispatch = createEventDispatcher();

  const welcomeText = "WELCOME";

  let loaderElement!: HTMLElement;
  let textElement!: HTMLSpanElement;
  let dotsElement!: HTMLSpanElement;

  onMount(() => {
    // Plus safe que document.querySelectorAll (scope dans le loader)
    const letters = loaderElement.querySelectorAll<HTMLSpanElement>(".letter");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(loaderElement, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            dispatch("complete");
          },
        });
      },
    });

    tl.from(loaderElement, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
    });

    tl.to(textElement, {
      opacity: 0.3,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });

    tl.to(
      dotsElement,
      {
        scale: 1.2,
        opacity: 0.6,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      },
      "-=0.25",
    );

    tl.from(
      letters,
      {
        opacity: 0,
        y: -120,
        rotate: -10,
        scale: 0.9,
        filter: "blur(4px)",
        duration: 0.6,
        stagger: 0.05,
        ease: "bounce.out",
      },
      "-=0.2",
    );

    tl.to({}, { duration: 0.2 });
  });
</script>

<section id="loader" bind:this={loaderElement}>
  <div class="circle-loader">
    <span class="text" bind:this={textElement}>MON PORTFOLIO</span>
    <span class="dots" bind:this={dotsElement}>...</span>

    <span class="texts">
      {#each welcomeText.split("") as char}
        <span class="letter">{char}</span>
      {/each}
    </span>
  </div>
</section>

<style>
  #loader {
    position: fixed;
    inset: 0;
    background: var(--sakura-pale);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .circle-loader {
    text-align: center;
    color: var(--laque);
    font-family: "serif";
  }

  .text {
    display: block;
    font-size: 56px;
    letter-spacing: 0.15em;
    margin-bottom: 0.4rem;
  }

  .dots {
    display: block;
    font-size: 80px;
    margin-bottom: 16px;
    font-weight: bold;
  }

  .texts {
    display: inline-flex;
    font-size: 56px;
    font-weight: bold;
    letter-spacing: 0.2em;
  }

  .letter {
    display: inline-block;
  }
</style>

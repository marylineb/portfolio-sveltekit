<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let titleElement: HTMLElement;
  let formCard: HTMLElement;
  let successCard: HTMLElement;
  let availabilitySection: HTMLElement;

  // Champs
  let name = "";
  let email = "";
  let subject = "";
  let message = "";

  // Honeypot anti-bot (doit rester vide)
  let website = "";

  // Mini-challenge anti-bot
  const a = 2;
  const b = 5;
  let challenge = ""; // l’utilisateur doit écrire 7

  // UI states
  let sent = false;
  let errorMsg = "";

  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/maryline-biloa/",
      icon: "💼",
    },
    { name: "GitHub", href: "https://github.com/marylineb", icon: "💻" },
  ];

  // Email reconstruit (pas en clair dans le HTML)
  function getEmail(): string {
    const u = "philippemarylineb";
    const d = "gmail";
    const t = "com";
    return `${u}@${d}.${t}`;
  }

  onMount(() => {
    gsap.fromTo(
      titleElement,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: "power2.out" },
    );

    gsap.fromTo(
      formCard,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.85, delay: 0.6, ease: "power3.out" },
    );
  });

  function validate(): boolean {
    errorMsg = "";

    // Anti-bot : si honeypot rempli, on ne bloque pas (on fait comme si OK)
    if (website.trim().length > 0) return true;

    if (!name.trim() || !email.trim() || !message.trim()) {
      errorMsg = "Merci de remplir les champs obligatoires 🙂";
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errorMsg = "Ton email a l’air incorrect 🙂";
      return false;
    }

    if (Number(challenge) !== a + b) {
      errorMsg = "Petit check anti-robot : vérifie le calcul 🙂";
      return false;
    }

    return true;
  }

  function animateSuccess() {
    requestAnimationFrame(() => {
      if (!successCard) return;

      gsap.fromTo(
        successCard,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" },
      );

      const tick = successCard.querySelector(".success-tick");
      if (tick) {
        gsap.fromTo(
          tick,
          { scale: 0.6, opacity: 0, rotation: -10 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.55,
            ease: "back.out(1.8)",
            delay: 0.1,
          },
        );
      }
    });
  }

  function submitForm() {
    if (!validate()) return;

    // ✅ Succès UX
    sent = true;
    animateSuccess();

    // Préparer un mailto pré-rempli (no backend)
    const to = encodeURIComponent(getEmail());
    const s = encodeURIComponent(
      subject.trim() || `Contact depuis ton portfolio - ${name.trim()}`,
    );
    const body = encodeURIComponent(
      `Nom: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    );

    // Ouvre le client mail après l’anim
    setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${s}&body=${body}`;
    }, 700);

    // Reset (optionnel)
    name = "";
    email = "";
    subject = "";
    message = "";
    website = "";
    challenge = "";
  }

  function resetToForm() {
    sent = false;
    errorMsg = "";

    requestAnimationFrame(() => {
      if (!formCard) return;
      gsap.fromTo(
        formCard,
        { opacity: 0.7, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    });
  }
</script>

<svelte:head>
  <title>Contact | Maryline</title>
  <meta
    name="description"
    content="Contactez-moi pour vos projets web, design et communication digitale."
  />
</svelte:head>

<main class="contact-page">
  <section id="contact-intro">
    <h1 bind:this={titleElement}>CONTACT</h1>
    <p class="subtitle">
      Laisse-moi un message, je te répondrai rapidement ✨<br />Disponible pour
      des stages, alternances et des collaborations😉
    </p>
  </section>

  <section class="content">
    {#if !sent}
      <div class="card" bind:this={formCard} aria-live="polite">
        <h2 class="card-title">Formulaire de contact</h2>

        {#if errorMsg}
          <div class="alert" role="alert">{errorMsg}</div>
        {/if}

        <form on:submit|preventDefault={submitForm}>
          <!-- Honeypot -->
          <input
            class="hp"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            bind:value={website}
            aria-hidden="true"
          />

          <div class="grid">
            <label class="field">
              <span>Nom *</span>
              <input
                type="text"
                bind:value={name}
                placeholder="Ton nom"
                required
              />
            </label>

            <label class="field">
              <span>Email *</span>
              <input
                type="email"
                bind:value={email}
                placeholder="ton@email.com"
                required
              />
            </label>
          </div>

          <label class="field">
            <span>Sujet</span>
            <input
              type="text"
              bind:value={subject}
              placeholder="Ex : Collaboration, stage, projet..."
            />
          </label>

          <label class="field">
            <span>Message *</span>
            <textarea
              rows="6"
              bind:value={message}
              placeholder="Décris ton besoin, ton idée ou ta demande 🙂"
              required
            ></textarea>
          </label>

          <label class="field">
            <span>Anti-robot : {a} + {b} = ? *</span>
            <input
              inputmode="numeric"
              bind:value={challenge}
              placeholder="Réponse"
              required
            />
          </label>

          <button class="btn" type="submit">Envoyer</button>
          <p class="form-legal">
            En envoyant ce formulaire, vous acceptez que les informations
            transmises soient utilisées uniquement pour répondre à votre
            demande. Pour en savoir plus, consultez la <br />
            <a href="/politique-confidentialite">Politique de confidentialité</a
            >.
          </p>
        </form>
      </div>
    {:else}
      <div
        class="card success"
        bind:this={successCard}
        role="status"
        aria-live="polite"
      >
        <div class="success-top">
          <span class="success-tick">✅</span>
          <div>
            <h2 class="card-title">Parfait !</h2>
            <p class="success-text">
              Ton message est prêt — ton client mail va s’ouvrir.
            </p>
          </div>
        </div>

        <button class="btn ghost" type="button" on:click={resetToForm}>
          Envoyer un autre message
        </button>
      </div>
    {/if}
  </section>

  <footer class="footer">
    <div class="socials">
      {#each socials as s}
        <a
          class="social-link"
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="social-icon">{s.icon}</span>
          <span>{s.name}</span>
          <span class="arrow">→</span>
        </a>
      {/each}
    </div>

    <div class="footer-inner">
      <p>© 2026 Maryline Biloa. Tous droits réservés.</p>
      <nav aria-label="Liens légaux">
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/politique-confidentialite">Politique de confidentialité</a>
      </nav>
    </div>
  </footer>
</main>

<style>
  .contact-page {
  padding: 180px 24px 40px; /* + haut pour laisser respirer sous le header */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--washi);
  }

  #contact-intro {
    text-align: center;
    max-width: 900px;
    padding: 0 2rem;
    margin-bottom: 22px;
  }

  #contact-intro h1 {
    margin: 16px 0 12px 0;
    color: var(--laque);
    font-size: clamp(44px, 6vw, 92px);
    font-family: "Cormorant Garamond", serif;
  }

  #contact-intro h1::after {
    content: "";
    display: block;
    width: min(400px, 80vw);
    height: 2.6px;
    background: linear-gradient(90deg, transparent, var(--sakura), transparent);
    margin: 8px auto 0;
  }

  .subtitle {
    margin: 0 auto;
    color: var(--encre-mid);
    font-size: 18px;
    font-style: italic;
    font-family: "serif";
    opacity: 0.9;
  }

  .content {
    width: 100%;
    max-width: 760px;
    padding: 0 2rem;
    margin-top: 22px;
  }

  .card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(242, 167, 187, 0.35);
    border-radius: 22px;
    box-shadow: var(--ombre-sm);
    padding: 28px;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(242, 167, 187, 0.16),
      transparent 55%
    );
    pointer-events: none;
  }

  .card-title {
    margin: 0 0 14px 0;
    font-family: "Cormorant Garamond", serif;
    font-size: 30px;
    color: var(--laque);
  }

  .alert {
    background: rgba(255, 90, 90, 0.1);
    border: 1px solid rgba(255, 90, 90, 0.25);
    color: rgba(160, 40, 40, 1);
    padding: 12px 14px;
    border-radius: 14px;
    margin: 0 0 14px 0;
    font-family: "serif";
    position: relative;
    z-index: 1;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field span {
    font-size: 12px;
    font-weight: 600;
    font-style: italic;
    font-family: "serif";
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--case-echec);
  }

  input,
  textarea {
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgba(242, 167, 187, 0.35);
    background: rgba(255, 255, 255, 0.92);
    padding: 14px 14px;
    font-family: "serif";
    font-size: 16px;
    color: var(--encre-mid);
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  textarea {
    resize: vertical;
    min-height: 160px;
  }

  input:focus,
  textarea:focus {
    border-color: rgba(242, 167, 187, 0.75);
    box-shadow: 0 0 0 4px rgba(242, 167, 187, 0.18);
    transform: translateY(-1px);
  }

  .btn {
    font-family: "serif";
    padding: 10px 20px;
    margin: 24px 32px;
    font-size: 24px;
    border-radius: 35px;
    text-decoration: none;
    font-weight: bold;
    color: var(--encre);
    border: 2px solid var(--sakura-deep);
    background-color: var(--case-echec);
    box-shadow: var(--ombre);
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .btn:hover {
    transform: translateY(-2px);
    background: var(--sakura-deep);
    border-color: var(--case-echec);
  }

  .btn.ghost {
    background: transparent;
    color: var(--laque);
    border: 1px solid rgba(242, 167, 187, 0.45);
    box-shadow: none;
  }

  .btn.ghost:hover {
    background: rgba(242, 167, 187, 0.12);
    transform: translateY(-1px);
  }

  .form-legal {
    margin-top: 0.9rem;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--encre-mid);
    text-align: center;
    font-family: "serif";
    opacity: 0.8;
  }

  .form-legal a {
    color: var(--bambou);
    text-decoration: none;
  }

  .form-legal a:hover {
    text-decoration: underline;
  }

  .hp {
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .success {
    border-color: rgba(70, 185, 42, 0.25);
  }

  .success-top {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
  }

  .success-tick {
    font-size: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: rgba(70, 185, 42, 0.12);
    border: 1px solid rgba(70, 185, 42, 0.18);
  }

  .success-text {
    margin: 4px 0 0 0;
    font-family: "serif";
    color: var(--encre-mid);
    opacity: 0.9;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  .footer {
    width: 100%;
    max-width: 760px;
    padding: 28px 2rem 0;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .socials {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(242, 167, 187, 0.28);
    text-decoration: none;
    color: var(--encre-mid);
    font-family: "serif";
    transition:
      transform 0.25s ease,
      background 0.25s ease,
      box-shadow 0.25s ease;
  }

  .social-link:hover {
    transform: translateY(-2px);
    background: rgba(242, 167, 187, 0.16);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
  }

  .social-icon {
    font-size: 18px;
  }
  .arrow {
    opacity: 0.6;
  }

  .footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(250, 243, 240, 0.08);
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    font-family: "cormorant garamond", serif;
  }

  .footer-inner p {
    margin: 0;
    color: var(--encre);
    font-size: 0.92rem;
  }

  .footer-inner nav {
    font-style: italic;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .footer-inner a {
    color: var(--bambou);
    text-decoration: none;
    font-size: 0.92rem;
  }

  .footer-inner a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .contact-page {
      padding: 22px 18px 40px;
    }
    .content,
    .footer {
      padding: 0 0.5rem;
    }
    .grid {
      grid-template-columns: 1fr;
    }
    .card {
      padding: 18px;
    }
    .card-title {
      font-size: 26px;
    }
    .btn {
      font-size: 20px;
    }
  }
</style>

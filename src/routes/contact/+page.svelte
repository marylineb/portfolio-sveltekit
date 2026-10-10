<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let pageContainer: HTMLElement;
  let formContainer: HTMLElement;
  let infoContainer: HTMLElement;

  let name = "";
  let email = "";
  let service = "";
  let message = "";

  let sent = false;

  const emailAddress = "philippemarylineb@gmail.com";

  onMount(() => {
    gsap.from(infoContainer, { opacity: 0, x: -30, duration: 1, ease: "power3.out", delay: 0.1 });
    gsap.from(formContainer, { opacity: 0, x: 30, duration: 1, ease: "power3.out", delay: 0.3 });
  });

  function submitForm() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    sent = true;

    const to = emailAddress;
    const s = encodeURIComponent(
      service ? `Contact via Portfolio - ${service}` : "Contact via Portfolio"
    );
    const body = encodeURIComponent(
      `Nom: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${s}&body=${body}`;
    }, 400);

    setTimeout(() => {
      sent = false;
      name = "";
      email = "";
      service = "";
      message = "";
    }, 3000);
  }
</script>

<svelte:head>
  <title>Contact | Maryline Biloa</title>
  <meta name="description" content="Contactez-moi pour discuter de votre projet ou d'une collaboration." />
</svelte:head>

<main class="contact-page" bind:this={pageContainer}>
  <div class="contact-grid">
    <!-- Colonne de gauche: Infos -->
    <section class="contact-info" bind:this={infoContainer}>
      <span class="eyebrow">Contact</span>
      <h1>Démarrons un <em>projet</em> ensemble.</h1>
      
      <p class="desc">
        Disponible pour des opportunités professionnelles, des collaborations créatives ou simplement pour échanger sur le développement web et le design.
      </p>

      <div class="contact-details">
        <div class="detail-block">
          <span class="detail-label">Email</span>
          <a href="mailto:philippemarylineb@gmail.com" class="detail-link">philippemarylineb@gmail.com</a>
        </div>
        <div class="detail-block">
          <span class="detail-label">Localisation</span>
          <span class="detail-text">Lyon, France</span>
        </div>
        <div class="detail-block">
          <span class="detail-label">Réseaux</span>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/maryline-biloa/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/marylineb" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Colonne de droite: Formulaire -->
    <section class="contact-form" bind:this={formContainer}>
      <form on:submit|preventDefault={submitForm}>
        <div class="form-row">
          <div class="input-group">
            <label for="name">Nom complet</label>
            <input type="text" id="name" bind:value={name} placeholder="Jane Doe" required />
          </div>
          <div class="input-group">
            <label for="email">Adresse email</label>
            <input type="email" id="email" bind:value={email} placeholder="jane@example.com" required />
          </div>
        </div>

        <div class="input-group">
          <label for="service">Sujet / Service (Optionnel)</label>
          <input type="text" id="service" bind:value={service} placeholder="Développement, Design, Stage..." />
        </div>

        <div class="input-group">
          <label for="message">Message</label>
          <textarea id="message" bind:value={message} rows="5" placeholder="Parlez-moi de votre projet..." required></textarea>
        </div>

        <button type="submit" class="submit-btn" class:sent>
          {#if sent}
            Préparation...
          {:else}
            Envoyer le message
          {/if}
        </button>
      </form>
    </section>
  </div>
</main>

<style>
  .contact-page {
    background: var(--washi);
    min-height: 100vh;
    padding: 160px 48px 80px;
    display: flex;
    justify-content: center;
    color: var(--encre);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    max-width: 1200px;
    width: 100%;
  }

  /* ─── Colonne Infos ─── */
  .eyebrow {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sakura-deep);
    margin-bottom: 20px;
  }

  .contact-info h1 {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: clamp(40px, 5vw, 64px);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--laque-dark);
    margin-bottom: 24px;
    max-width: 480px;
  }

  .contact-info h1 em {
    font-style: italic;
    color: var(--sakura-deep);
  }

  .desc {
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.8;
    color: var(--encre-mid);
    max-width: 420px;
    margin-bottom: 48px;
  }

  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .detail-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .detail-label {
    font-family: var(--font-sans);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sakura-deep);
  }

  .detail-text, .detail-link, .social-links a {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--encre);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .detail-link:hover, .social-links a:hover {
    color: var(--laque);
  }

  .social-links {
    display: flex;
    gap: 20px;
  }

  /* ─── Colonne Formulaire ─── */
  .contact-form {
    background: #ffffff;
    padding: 48px;
    border: 1px solid rgba(196, 96, 122, 0.12);
    border-radius: 4px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--encre-mid);
  }

  input, textarea {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--encre);
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(28, 16, 24, 0.15);
    padding: 12px 0;
    outline: none;
    transition: border-color 0.3s ease;
  }

  input::placeholder, textarea::placeholder {
    color: rgba(28, 16, 24, 0.25);
    font-weight: 300;
  }

  input:focus, textarea:focus {
    border-bottom-color: var(--laque);
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .submit-btn {
    align-self: flex-start;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--washi);
    background: var(--laque-dark);
    border: none;
    padding: 16px 40px;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.3s ease, transform 0.2s ease;
    margin-top: 16px;
  }

  .submit-btn:hover {
    background: var(--laque);
    transform: translateY(-2px);
  }

  .submit-btn.sent {
    background: var(--bambou);
    pointer-events: none;
  }

  /* ─── Responsive ─── */
  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 56px;
    }

    .contact-form {
      padding: 40px 32px;
    }
  }

  @media (max-width: 768px) {
    .contact-page {
      padding: 120px 24px 60px;
    }

    .contact-form {
      padding: 32px 24px;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .submit-btn {
      width: 100%;
    }
  }
</style>

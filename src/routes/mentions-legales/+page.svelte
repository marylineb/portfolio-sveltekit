<script lang="ts">
  const siteUrl = "https://marylinebiloa.com";
  const email = "philippemarylineb@gmail.com";
  const hostName = "Vercel Inc.";
  const hostAddress =
    "440 N Barranca Ave #4133, Covina, CA 91723, United States";
  const hostWebsite = "https://vercel.com";
</script>

<svelte:head>
  <title>Mentions légales | Maryline Biloa</title>
  <meta
    name="description"
    content="Mentions légales du portfolio de Maryline Biloa."
  />
</svelte:head>

<main class="legal-page">
  <section class="hero">
    <p class="eyebrow">Informations légales</p>
    <h1>Mentions légales</h1>
    <p class="intro">
      Cette page présente les informations légales relatives au portfolio de
      Maryline Biloa.
    </p>
  </section>

    <section id="container">
  <section class="legal-card">
    <h2>Éditeur du site</h2>
    <p>
      Le présent site est édité par <strong>Maryline Biloa</strong>, étudiante
      en développement web et créatrice du portfolio.
    </p>
    <p>
      Contact :
      <a href={`mailto:${email}`}>{email}</a>
    </p>
    <p>
      Site web :
      <a href={siteUrl} target="_blank" rel="noopener noreferrer">{siteUrl}</a>
    </p>
  </section>
    <section class="legal-card">
      <h2>Responsable de la publication</h2>
      <p>
        La responsable de la publication est <strong>Maryline Biloa</strong>.
      </p>
    </section>

    <section class="legal-card">
      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>{hostName}</strong>.
      </p>
      <p>{hostAddress}</p>
      <p>
        Site :
        <a href={hostWebsite} target="_blank" rel="noopener noreferrer"
          >{hostWebsite}</a
        >
      </p>
    </section>

    <section class="legal-card">
      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus présents sur ce portfolio, notamment les textes,
        visuels, éléments graphiques, maquettes, animations, code source,
        réalisations et projets, sauf mention contraire, sont protégés par le
        droit de la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, adaptation, diffusion ou
        exploitation partielle ou totale du contenu du site sans autorisation
        préalable est interdite.
      </p>
    </section>

    <section class="legal-card">
      <h2>Limitation de responsabilité</h2>
      <p>
        L’éditrice du site s’efforce de fournir des informations aussi exactes
        que possible. Toutefois, elle ne peut garantir l’exactitude,
        l’exhaustivité ou l’actualité de toutes les informations publiées.
      </p>
      <p>
        L’utilisation des informations présentes sur le site se fait sous la
        seule responsabilité de l’utilisateur.
      </p>
    </section>

    <section class="legal-card">
      <h2>Liens externes</h2>
      <p>
        Le site peut contenir des liens vers des sites externes. L’éditrice ne
        saurait être tenue responsable du contenu ou du fonctionnement de ces
        sites tiers.
      </p>
    </section>
  </section>
</main>
<style>
.legal-page {
 padding: 180px 24px 40px; /* + haut pour laisser respirer sous le header */
    min-height: 100vh;
    background: var(--washi);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero {
  max-width: 900px;
  width: 100%;
  margin: 0 auto 3rem;
}

.eyebrow {
  font-size: 1rem;
  color: var(--encre-mid);
  font-family: "Cormorant Garamond", serif;
  margin: 0 0 0.8rem;
  font-style: italic;
  text-align: left;
}

h1 {
  margin: 0 0 1.2rem;
  color: var(--laque);
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 900;
  letter-spacing: 0.02em;
  font-family: "Cormorant Garamond", serif;
  line-height: 1.1;
}

.intro {
  max-width: 65ch;
  color: var(--case-foncee);
  line-height: 1.75;
  font-size: 1.05rem;
}

#container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.legal-card {
  width: 100%;
  padding: 1.8rem 2rem;
  background: var(--washi-mid);
  border-radius: var(--radius);
  border: 1px solid rgba(196, 96, 122, 0.15);
  box-shadow: var(--ombre-sm);
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--laque);
  margin: 0 0 0.9rem;
  font-family: "Cormorant Garamond", serif;
}

p {
  font-size: 1rem;
  color: var(--encre-mid);
  line-height: 1.75;
  font-family: Georgia, serif;
  margin: 0 0 1rem;
}

a {
  color: var(--bambou);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .legal-page {
    padding: 100px 1rem 4rem;
  }

  .hero {
    margin-bottom: 2rem;
  }

  .legal-card {
    padding: 1.4rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  p {
    font-size: 0.98rem;
  }
}
</style>

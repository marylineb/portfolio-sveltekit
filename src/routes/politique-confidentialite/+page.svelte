<script lang="ts">
  const email = "philippemarylineb@gmail.com";
</script>

<svelte:head>
  <title>Politique de confidentialité | Maryline Biloa</title>
  <meta
    name="description"
    content="Politique de confidentialité du portfolio de Maryline Biloa."
  />
</svelte:head>

<main class="legal-page">
  <section class="hero">
    <p class="eyebrow">Protection des données</p>
    <h1>Politique de confidentialité</h1>
    <p class="intro">
      Cette politique explique quelles données peuvent être collectées sur ce
      portfolio, dans quel but et quels sont vos droits.
    </p>
  </section>

    <section id="container">
  <section class="legal-card">
    <h2>Responsable du traitement</h2>
    <p>
      La responsable du traitement des données est
      <strong>Maryline Biloa</strong>.
    </p>
    <p>
      Pour toute question relative à la protection des données, vous pouvez
      écrire à :
      <a href={`mailto:${email}`}>{email}</a>
    </p>
  </section>

  <section class="legal-card">
    <h2>Données collectées</h2>
    <p>
      Dans le cadre du formulaire de contact, les données susceptibles d’être
      collectées sont :
    </p>
    <p>– nom ou pseudonyme</p>
    <p>– adresse e-mail</p>
    <p>– contenu du message</p>
  </section>

  <section class="legal-card">
    <h2>Finalité de la collecte</h2>
    <p>
      Ces données sont collectées uniquement afin de répondre aux messages
      envoyés via le formulaire de contact, d’échanger au sujet d’une
      alternance, d’un stage, d’une collaboration ou d’un projet.
    </p>
  </section>

  <section class="legal-card">
    <h2>Base légale</h2>
    <p>
      Le traitement repose sur l’intérêt légitime à répondre aux demandes
      reçues, et, selon le cas, sur votre consentement lorsque vous choisissez
      d’envoyer volontairement vos informations via le formulaire.
    </p>
  </section>

  <section class="legal-card">
    <h2>Destinataires des données</h2>
    <p>
      Les données transmises via le formulaire sont destinées uniquement à
      Maryline Biloa et ne sont ni vendues ni cédées à des tiers.
    </p>
  </section>

  <section class="legal-card">
    <h2>Durée de conservation</h2>
    <p>
      Les données issues du formulaire de contact sont conservées pendant une
      durée maximale de <strong>12 mois</strong> à compter du dernier échange, sauf
      obligation légale contraire ou nécessité particulière liée au suivi d’un projet.
    </p>
  </section>

  <section class="legal-card">
    <h2>Vos droits</h2>
    <p>
      Conformément à la réglementation applicable, vous disposez d’un droit
      d’accès, de rectification, d’effacement, de limitation et, le cas échéant,
      d’opposition au traitement de vos données.
    </p>
    <p>
      Vous pouvez exercer ces droits à tout moment à l’adresse suivante :
      <a href={`mailto:${email}`}>{email}</a>
    </p>
  </section>

  <section class="legal-card">
    <h2>Cookies</h2>
    <p>
      Ce portfolio n’utilise pas de cookies publicitaires. Si des outils de
      mesure d’audience ou des services tiers sont ajoutés ultérieurement, cette
      politique pourra être mise à jour en conséquence.
    </p>
  </section>

  <section class="legal-card">
    <h2>Sécurité</h2>
    <p>
      Des mesures raisonnables sont mises en œuvre pour protéger les données
      transmises via le site. Toutefois, aucun système de transmission ou de
      stockage n’est totalement invulnérable.
    </p>
  </section>

  <section class="legal-card">
    <h2>Mise à jour</h2>
    <p>
      La présente politique de confidentialité peut être modifiée à tout moment
      pour refléter une évolution du site ou des obligations légales.
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
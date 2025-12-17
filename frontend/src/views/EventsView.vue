<template>
  <div class="events">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Nos événements</h1>
        <p class="page-subtitle">
          Découvrez tous les événements organisés par MTG Pau
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="events-intro">
          <p>
            MTG Pau organise régulièrement des événements pour tous les niveaux et tous les formats.
            Que vous soyez débutant ou joueur confirmé, vous trouverez des événements adaptés à
            vos envies et à votre niveau.
          </p>
        </div>

        <div class="events-grid">
          <div class="event-card">
            <div class="event-badge">Hebdomadaire</div>
            <h3 class="event-title">Soirée Commander</h3>
            <p class="event-time">Tous les mercredis, 19h00</p>
            <p class="event-description">
              Venez jouer au format Commander dans une ambiance détendue et conviviale.
              Tous les niveaux sont les bienvenus.
            </p>
            <ul class="event-details">
              <li>Format : Commander / EDH</li>
              <li>Niveau : Tous niveaux</li>
              <li>Inscription : Libre</li>
            </ul>
          </div>

          <div class="event-card">
            <div class="event-badge">Hebdomadaire</div>
            <h3 class="event-title">Friday Night Magic</h3>
            <p class="event-time">Tous les vendredis, 20h00</p>
            <p class="event-description">
              Le rendez-vous incontournable des joueurs ! Tournois Standard ou Modern selon
              les semaines.
            </p>
            <ul class="event-details">
              <li>Format : Standard / Modern</li>
              <li>Niveau : Intermédiaire à confirmé</li>
              <li>Inscription : Obligatoire</li>
            </ul>
          </div>

          <div class="event-card">
            <div class="event-badge event-badge-special">Mensuel</div>
            <h3 class="event-title">Draft du samedi</h3>
            <p class="event-time">Un samedi par mois, 14h00</p>
            <p class="event-description">
              Participez à un draft de la dernière extension et testez vos talents en format
              limité.
            </p>
            <ul class="event-details">
              <li>Format : Draft</li>
              <li>Niveau : Tous niveaux</li>
              <li>Inscription : Obligatoire (places limitées)</li>
            </ul>
          </div>

          <div class="event-card">
            <div class="event-badge event-badge-special">Occasionnel</div>
            <h3 class="event-title">Tournois spéciaux</h3>
            <p class="event-time">Dates variables</p>
            <p class="event-description">
              Tournois thématiques, pré-releases, et événements spéciaux tout au long de l'année.
            </p>
            <ul class="event-details">
              <li>Format : Variable</li>
              <li>Niveau : Tous niveaux</li>
              <li>Inscription : Selon événement</li>
            </ul>
          </div>

          <div class="event-card">
            <div class="event-badge">Hebdomadaire</div>
            <h3 class="event-title">Initiation débutants</h3>
            <p class="event-time">Tous les samedis, 15h00</p>
            <p class="event-description">
              Vous débutez à Magic ? Rejoignez nos sessions d'initiation pour apprendre les
              bases du jeu.
            </p>
            <ul class="event-details">
              <li>Format : Découverte</li>
              <li>Niveau : Débutant</li>
              <li>Inscription : Recommandée</li>
            </ul>
          </div>

          <div class="event-card event-card-highlight">
            <div class="event-badge event-badge-highlight">Nouveau</div>
            <h3 class="event-title">League Modern</h3>
            <p class="event-time">Saison en cours</p>
            <p class="event-description">
              Participez à notre league Modern ! Accumulez des points sur plusieurs semaines
              et gagnez des prix.
            </p>
            <ul class="event-details">
              <li>Format : Modern</li>
              <li>Niveau : Intermédiaire à confirmé</li>
              <li>Inscription : Ouverte</li>
            </ul>
          </div>
        </div>

        <div class="events-cta">
          <div class="cta-box">
            <h2>Intéressé par nos événements ?</h2>
            <p>
              Pour plus d'informations sur nos événements ou pour vous inscrire, n'hésitez pas
              à nous contacter.
            </p>
            <RouterLink to="/contact" class="btn btn-primary">Nous contacter</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.events {
  width: 100%;
}

.page-hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  color: var(--color-text-on-primary);
  padding: 5rem 2rem;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.page-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  max-width: 700px;
  margin: 0 auto;
}

.events-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.events-intro p {
  font-size: 1.125rem;
  color: var(--color-text-soft);
  line-height: 1.8;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.event-card {
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.event-card-highlight {
  border: 2px solid var(--color-primary);
}

.event-badge {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.event-badge-special {
  background-color: var(--color-brown);
}

.event-badge-highlight {
  background-color: var(--color-accent);
}

.event-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.event-time {
  font-size: 0.9375rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 1rem;
}

.event-description {
  color: var(--color-text-soft);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.event-details {
  list-style: none;
  padding: 1.5rem 0 0;
  margin: 0;
  border-top: 1px solid var(--color-border);
}

.event-details li {
  padding: 0.5rem 0;
  color: var(--color-text-soft);
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
}

.event-details li::before {
  content: '•';
  color: var(--color-primary);
  font-weight: 700;
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.events-cta {
  margin-top: 4rem;
}

.cta-box {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  color: var(--color-white);
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
}

.cta-box h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.cta-box p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-box .btn {
  background-color: var(--color-white);
  color: var(--color-primary);
}

.cta-box .btn:hover {
  background-color: var(--color-off-white);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .page-hero {
    padding: 4rem 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1.125rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 2rem 1.5rem;
  }

  .cta-box h2 {
    font-size: 1.5rem;
  }

  .cta-box p {
    font-size: 1rem;
  }
}
</style>

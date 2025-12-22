<template>
  <div class="cr-aquitaine">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ hero.title }}</h1>
        <p class="page-subtitle">{{ hero.subtitle }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="intro-text">
          <p>{{ intro }}</p>
        </div>

        <div class="content-grid">
          <div class="details-card">
            <h2>Informations pratiques</h2>
            <div class="detail-item">
              <h3>Format</h3>
              <p>{{ details.format }}</p>
            </div>
            <div class="detail-item">
              <h3>Dates</h3>
              <p>{{ details.dates }}</p>
            </div>
            <div class="detail-item">
              <h3>Lieu</h3>
              <p>{{ details.location.name }}</p>
              <p class="address">{{ details.location.fullAddress }}</p>
            </div>
          </div>

          <div class="sponsors-card">
            <h2>Sponsors & Partenaires</h2>
            <div v-for="sponsor in sponsors" :key="sponsor.name" class="sponsor-item">
              <h3>{{ sponsor.name }}</h3>
              <p>{{ sponsor.description }}</p>
            </div>
          </div>
        </div>

        <div class="price-highlight">
          <div class="price-box">
            <span class="price-label">Participation</span>
            <span class="price-value">{{ details.price }}</span>
          </div>
        </div>

        <div class="prize-pool-section">
          <h2>Prize Pool</h2>
          <p class="prize-pool-subtitle">(Dépendant du nombre de joueurs)</p>
          <div class="prize-pool-grid">
            <div v-for="pool in prizePool" :key="pool.playerCount" class="prize-pool-card">
              <h3>{{ pool.playerCount }} joueurs</h3>
              <div class="prizes-list">
                <div v-for="(prize, index) in pool.prizes" :key="index" class="prize-item">
                  <span class="prize-position">{{ prize.position }}</span>
                  <span class="prize-amount">{{ prize.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="side-events-section">
          <h2>Événements parallèles</h2>
          <div class="side-events-grid">
            <div v-for="event in sideEvents" :key="event.title" class="side-event-card">
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>

        <div class="registration-cta">
          <div class="cta-box">
            <h2>Prêt à participer ?</h2>
            <p>
              Inscrivez-vous dès maintenant sur notre serveur Discord pour réserver votre place !
            </p>
            <a
              :href="registration"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              S'inscrire sur Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import dataService from '@/services/dataService'
import { useSeo } from '@/composables/useSeo'
import { useCREventSchema } from '@/composables/useStructuredData'

const hero = dataService.get('crAquitaine.hero', { title: '', subtitle: '' })
const intro = dataService.get('crAquitaine.intro', '')
const details = dataService.get('crAquitaine.details', {
  format: '',
  dates: '',
  price: '',
  location: { name: '', fullAddress: '' },
})
const sideEvents = dataService.get('crAquitaine.sideEvents', [])
const sponsors = dataService.get('crAquitaine.sponsors', [])
const prizePool = dataService.get('crAquitaine.prizePool', [])
const registration = dataService.get('crAquitaine.registration', '')

// SEO
useSeo('cr')
useCREventSchema()
</script>

<style scoped>
.cr-aquitaine {
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

.intro-text {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.intro-text p {
  font-size: 1.125rem;
  color: var(--color-text-soft);
  line-height: 1.8;
}

.price-highlight {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.price-box {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  padding: 2rem 4rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: var(--shadow-xl);
}

.price-label {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.price-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-white);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.details-card,
.sponsors-card {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
}

.details-card h2,
.sponsors-card h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.detail-item,
.sponsor-item {
  margin-bottom: 1.5rem;
}

.detail-item:last-child,
.sponsor-item:last-child {
  margin-bottom: 0;
}

.detail-item h3,
.sponsor-item h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.detail-item p,
.sponsor-item p {
  color: var(--color-text-soft);
  margin: 0;
}

.address {
  font-size: 0.9375rem;
  margin-top: 0.25rem;
}

.prize-pool-section {
  margin-bottom: 4rem;
}

.prize-pool-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.prize-pool-subtitle {
  font-size: 0.875rem;
  text-align: center;
  color: var(--color-text-soft);
  margin-bottom: 2rem;
  font-style: italic;
}

.side-events-section {
  margin-bottom: 4rem;
}

.side-events-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.side-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.side-event-card {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
  transition: all var(--transition-base);
}

.side-event-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.side-event-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.side-event-card p {
  color: var(--color-text-soft);
  margin: 0;
  font-size: 0.9375rem;
}

.prize-pool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.prize-pool-card {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  border: 2px solid var(--color-primary);
}

.prize-pool-card h3 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.prizes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prize-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
}

.prize-position {
  font-weight: 600;
  color: var(--color-text);
}

.prize-amount {
  font-weight: 700;
  color: var(--color-primary);
  font-size: 1.125rem;
}

.registration-cta {
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

  .content-grid,
  .prize-pool-grid {
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

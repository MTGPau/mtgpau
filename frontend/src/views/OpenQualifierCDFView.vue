<template>
  <div class="open-qualifier-cdf">
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
              <h3>Date</h3>
              <p>{{ details.date }}</p>
            </div>
            <div class="detail-item">
              <h3>Lieu</h3>
              <p>{{ details.location.name }}</p>
              <p class="address">{{ details.location.fullAddress }}</p>
            </div>
          </div>

          <div class="sponsors-card">
            <h2>Sponsors & Partenaires</h2>
            <component
              :is="sponsor.url ? 'a' : 'div'"
              v-for="sponsor in sponsors"
              :key="sponsor.name"
              :href="sponsor.url"
              :target="sponsor.url ? '_blank' : undefined"
              :rel="sponsor.url ? 'noopener noreferrer' : undefined"
              class="sponsor-item"
            >
              <div v-if="sponsor.logo" class="sponsor-logo-container">
                <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
              </div>
              <div class="sponsor-info">
                <h3>{{ sponsor.name }}</h3>
                <p>{{ sponsor.description }}</p>
              </div>
            </component>
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

        <div class="qualification-section">
          <h2>Points pour le CDF</h2>
          <div class="qualification-card">
            <div class="qualification-icon">🏆</div>
            <div class="qualification-content">
              <h3>Championnats de France</h3>
              <p>
                Participez à l'Open Qualifier pour gagner des points précieux qui vous permettront
                d'accéder aux Championnats de France de Duel Commander. Chaque point compte pour
                atteindre l'événement national et représenter la région Aquitaine !
              </p>
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
              Inscrivez-vous dès maintenant pour réserver votre place et tenter votre chance de vous
              qualifier pour les Championnats de France !
            </p>
            <a
              :href="registration"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              S'inscrire
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
import { useOpenQualifierEventSchema } from '@/composables/useStructuredData'
import type { Hero, OpenQualifierDetails, SideEvent, Sponsor, PrizePool } from '@/types/data'

const hero = dataService.get('openQualifierCDF.hero', { title: '', subtitle: '' }) as Hero
const intro = dataService.get('openQualifierCDF.intro', '') as string
const details = dataService.get('openQualifierCDF.details', {
  format: '',
  date: '',
  price: '',
  location: { name: '', fullAddress: '' },
}) as OpenQualifierDetails
const sideEvents = dataService.get('openQualifierCDF.sideEvents', []) as SideEvent[]
const sponsors = dataService.get('openQualifierCDF.sponsors', []) as Sponsor[]
const prizePool = dataService.get('openQualifierCDF.prizePool', []) as PrizePool[]
const registration = dataService.get('openQualifierCDF.registration', '') as string

// SEO
useSeo('openQualifier')
useOpenQualifierEventSchema()
</script>

<style scoped>
.open-qualifier-cdf {
  width: 100%;
}

.page-hero {
  position: relative;
  color: var(--color-text-on-primary);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding: 2rem;
}

.page-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: -2;
}

.page-hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.85) 0%, rgba(101, 67, 33, 0.9) 100%);
  z-index: -1;
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

.sponsor-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 0.75rem;
  border: 2px solid transparent;
  transition: all var(--transition-base);
  text-decoration: none;
  color: inherit;
}

a.sponsor-item {
  cursor: pointer;
}

a.sponsor-item:hover {
  border-color: var(--color-primary);
  background-color: var(--color-white);
}

.sponsor-logo-container {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.sponsor-logo {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.sponsor-info {
  flex: 1;
}

.detail-item h3,
.sponsor-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.detail-item p,
.sponsor-info p {
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

.qualification-section {
  margin-bottom: 4rem;
}

.qualification-section h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.qualification-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: center;
  gap: 2rem;
  color: var(--color-white);
}

.qualification-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.qualification-content h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.qualification-content p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
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
    min-height: 300px;
    padding: 1.5rem;
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

  .sponsor-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .sponsor-logo-container {
    width: 100px;
    height: 100px;
  }

  .qualification-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .qualification-icon {
    font-size: 3rem;
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

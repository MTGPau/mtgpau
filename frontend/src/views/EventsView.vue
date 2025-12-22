<template>
  <div class="events">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ hero.title }}</h1>
        <p class="page-subtitle">{{ hero.subtitle }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="events-intro">
          <p>{{ intro }}</p>
        </div>

        <div class="events-grid">
          <div v-for="event in eventsList" :key="event.id" class="event-card">
            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-date">{{ formatDateWithDay(event.date) }}</p>
            <p class="event-format">Format : {{ event.format }}</p>
            <a
              :href="event.registration"
              target="_blank"
              rel="noopener noreferrer"
              class="event-registration-btn"
            >
              S'inscrire sur Discord
            </a>
          </div>
        </div>

        <div class="unity-league-section">
          <div class="unity-league-card">
            <div class="unity-league-logo-container">
              <img :src="unityLeague.logo" alt="Unity League" class="unity-league-logo" />
            </div>
            <h2>{{ unityLeague.title }}</h2>
            <p class="unity-league-highlight">
              {{ unityLeague.highlight.split('Unity League')[0] }}
              <a
                :href="unityLeague.links.mainUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="unity-league-link"
                >Unity League</a
              >
              !
            </p>
            <p class="unity-league-description">
              {{ unityLeague.description }}
            </p>
            <div class="unity-league-buttons">
              <a
                :href="unityLeague.links.leagueUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline-primary"
              >
                {{ unityLeague.buttons.viewRanking }}
              </a>
              <a
                :href="unityLeague.links.infoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                {{ unityLeague.buttons.howToRegister }}
              </a>
            </div>
          </div>
        </div>

        <div class="events-cta">
          <div class="cta-box">
            <h2>{{ cta.title }}</h2>
            <p>{{ cta.description }}</p>
            <RouterLink to="/contact" class="btn btn-primary">Nous contacter</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import dataService from '@/services/dataService'
import { useSeo } from '@/composables/useSeo'
import { useEventsSchema } from '@/composables/useStructuredData'
import type { Hero, Event, CTA, UnityLeague } from '@/types/data'

const hero = dataService.get('events.hero', { title: '', subtitle: '' }) as Hero
const intro = dataService.get('events.intro', '') as string
const rawEventsList = dataService.get('events.list', []) as Event[]
const cta = dataService.get('events.cta', { title: '', description: '' }) as CTA
const unityLeague = dataService.get('events.unityLeague', {
  title: '',
  icon: '',
  logo: '',
  highlight: '',
  description: '',
  links: { leagueUrl: '', infoUrl: '', mainUrl: '' },
  buttons: { viewRanking: '', howToRegister: '' },
}) as UnityLeague

// SEO
useSeo('events')
useEventsSchema()

// Parse date format: DD/MM/YYYY HH:MM
const parseDate = (dateStr: string) => {
  const [datePart = '', timePart = ''] = dateStr.split(' ')
  const [day = '1', month = '1', year = '2025'] = datePart.split('/')
  const [hours = '0', minutes = '0'] = timePart.split(':')
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
  )
}

// Get French day name
const getFrenchDayName = (date: Date) => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  return days[date.getDay()]
}

// Get French month name
const getFrenchMonthName = (monthIndex: number) => {
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ]
  return months[monthIndex]
}

// Format date with French day and month names
const formatDateWithDay = (dateStr: string) => {
  const date = parseDate(dateStr)
  const dayName = getFrenchDayName(date)
  const day = date.getDate()
  const monthName = getFrenchMonthName(date.getMonth())
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${dayName} ${day} ${monthName} ${year} - ${hours}:${minutes}`
}

const eventsList = computed(() => {
  return [...rawEventsList].sort((a: Event, b: Event) => {
    const dateA = parseDate(a.date)
    const dateB = parseDate(b.date)
    return dateA.getTime() - dateB.getTime() // Ascending order
  })
})
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

.event-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 0.9375rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 1rem;
}

.event-format {
  color: var(--color-text-soft);
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.event-registration-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  text-align: center;
  transition: all var(--transition-base);
}

.event-registration-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.unity-league-section {
  margin-top: 4rem;
  margin-bottom: 2rem;
}

.unity-league-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid var(--color-primary);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.unity-league-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 2rem 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all var(--transition-base);
}

.unity-league-logo-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.3);
}

.unity-league-logo {
  width: 280px;
  height: auto;
  display: block;
  filter: brightness(1) contrast(1.1);
}

.unity-league-card h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.unity-league-highlight {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.unity-league-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 700;
  border-bottom: 2px solid var(--color-primary);
  transition: all var(--transition-fast);
}

.unity-league-link:hover {
  color: var(--color-primary-dark);
  border-bottom-color: var(--color-primary-dark);
}

.unity-league-description {
  font-size: 1.0625rem;
  color: var(--color-text-soft);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.unity-league-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-outline-primary {
  display: inline-block;
  padding: 0.875rem 2rem;
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-base);
}

.btn-outline-primary:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  display: inline-block;
  padding: 0.875rem 2rem;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-base);
}

.btn-secondary:hover {
  background-color: var(--color-white);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.events-cta {
  margin-top: 2rem;
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

  .unity-league-card {
    padding: 2rem 1.5rem;
  }

  .unity-league-logo-container {
    padding: 1.5rem 2rem;
  }

  .unity-league-logo {
    width: 180px;
  }

  .unity-league-card h2 {
    font-size: 1.5rem;
  }

  .unity-league-highlight {
    font-size: 1.125rem;
  }

  .unity-league-description {
    font-size: 1rem;
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

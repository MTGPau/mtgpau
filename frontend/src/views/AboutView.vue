<template>
  <div class="about">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">{{ hero.title }}</h1>
        <p class="page-subtitle">{{ hero.subtitle }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="content-layout">
          <div class="content-main">
            <h2>{{ history.title }}</h2>
            <p v-for="(paragraph, index) in history.paragraphs" :key="index">
              {{ paragraph }}
            </p>

            <h2>{{ mission.title }}</h2>
            <p>{{ mission.intro }}</p>
            <ul class="mission-list">
              <li v-for="(item, index) in mission.items" :key="index">{{ item }}</li>
            </ul>

            <h2>{{ formats.title }}</h2>
            <p>{{ formats.intro }}</p>
            <div class="format-grid">
              <div v-for="format in formats.items" :key="format.name" class="format-card">
                <h3>{{ format.name }}</h3>
                <p>{{ format.description }}</p>
              </div>
            </div>
          </div>

          <aside class="content-sidebar">
            <div class="info-card">
              <h3>{{ info.title }}</h3>
              <div class="info-item">
                <h4>{{ info.items.membership.title }}</h4>
                <p>{{ info.items.membership.description }}</p>
              </div>
              <div class="info-item">
                <h4>{{ info.items.level.title }}</h4>
                <p>{{ info.items.level.description }}</p>
              </div>
              <div class="info-item">
                <h4>{{ info.items.atmosphere.title }}</h4>
                <p>{{ info.items.atmosphere.description }}</p>
              </div>
            </div>

            <div class="cta-card">
              <h3>{{ joinCta.title }}</h3>
              <p>{{ joinCta.description }}</p>
              <RouterLink to="/contact" class="btn btn-primary">Nous contacter</RouterLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import dataService from '@/services/dataService'
import { useSeo } from '@/composables/useSeo'

const hero = dataService.get('about.hero', { title: '', subtitle: '' })
const history = dataService.get('about.history', { title: '', paragraphs: [] })
const missionData = dataService.get('about.mission', { title: '', intro: '' })
const missionItems = dataService.get('mission', [])
const mission = { ...missionData, items: missionItems }
const formatsData = dataService.get('about.formats', { title: '', intro: '' })
const formatsList = dataService.get('formats', [])
const formats = { ...formatsData, items: formatsList }
const info = dataService.get('about.info', {
  title: '',
  items: {
    membership: { title: '', description: '' },
    level: { title: '', description: '' },
    atmosphere: { title: '', description: '' },
  },
})
const joinCta = dataService.get('about.joinCta', { title: '', description: '' })

// SEO
useSeo('about')
</script>

<style scoped>
.about {
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

.content-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  align-items: start;
}

.content-main h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.content-main h2:first-child {
  margin-top: 0;
}

.content-main p {
  color: var(--color-text-soft);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.mission-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.mission-list li {
  padding: 0.75rem 0 0.75rem 2rem;
  position: relative;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.mission-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.25rem;
}

.format-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.format-card {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid var(--color-border);
  transition: all var(--transition-base);
}

.format-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.format-card h3 {
  color: var(--color-primary);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.format-card p {
  color: var(--color-text-soft);
  font-size: 0.9375rem;
  margin: 0;
}

.content-sidebar {
  position: sticky;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card,
.cta-card {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
}

.info-card h3,
.cta-card h3 {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.info-item {
  margin-bottom: 1.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.info-item p {
  color: var(--color-text-soft);
  font-size: 0.9375rem;
  margin: 0;
}

.cta-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  color: var(--color-white);
  text-align: center;
}

.cta-card h3 {
  color: var(--color-white);
}

.cta-card p {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
}

.cta-card .btn {
  background-color: var(--color-white);
  color: var(--color-primary);
  width: 100%;
}

.cta-card .btn:hover {
  background-color: var(--color-off-white);
}

@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    position: relative;
    top: 0;
  }

  .page-title {
    font-size: 2.5rem;
  }
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

  .format-grid {
    grid-template-columns: 1fr;
  }
}
</style>

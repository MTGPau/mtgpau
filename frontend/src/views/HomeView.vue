<template>
  <div class="home">
    <section id="hero" class="hero">
      <div class="hero-content">
        <h1 class="hero-title">{{ hero.title }}</h1>
        <p class="hero-subtitle">{{ hero.subtitle }}</p>
      </div>
    </section>

    <section id="features" class="section">
      <div class="container">
        <div class="intro-grid">
          <div v-for="feature in features" :key="feature.title" class="intro-card">
            <div class="card-icon">
              <svg
                v-if="feature.title === 'Communauté active'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <svg
                v-else-if="feature.title === 'Événements réguliers'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            </div>
            <h3 class="card-title">{{ feature.title }}</h3>
            <p class="card-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="container">
        <div class="cta-section">
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
import { RouterLink } from 'vue-router'
import dataService from '@/services/dataService'
import { useSeo } from '@/composables/useSeo'
import { useOrganizationSchema } from '@/composables/useStructuredData'
import type { Hero, Feature, CTA } from '@/types/data'

const hero = dataService.get('home.hero', { title: '', subtitle: '' }) as Hero
const features = dataService.get('features', []) as Feature[]
const cta = dataService.get('home.cta', { title: '', description: '' }) as CTA

// SEO
useSeo('home')
useOrganizationSchema()
</script>

<style scoped>
.home {
  width: 100%;
}

.hero {
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

.hero::before {
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

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.85) 0%, rgba(101, 67, 33, 0.9) 100%);
  z-index: -1;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--color-white);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.intro-card {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.intro-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.card-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: var(--color-background-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.card-icon svg {
  width: 2rem;
  height: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.card-description {
  color: var(--color-text-soft);
  line-height: 1.6;
  margin: 0;
}

.cta-section {
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
  .hero {
    min-height: 300px;
    padding: 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .intro-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
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

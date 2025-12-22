<template>
  <div class="contact">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Nous contacter</h1>
        <p class="page-subtitle">
          Une question ? Envie de nous rejoindre ? N'hésitez pas à nous contacter
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-info">
            <h2>Rejoignez MTG Pau</h2>
            <p>
              Devenez membre de notre association et profitez d'une communauté passionnée de Magic:
              The Gathering. L'adhésion est ouverte à tous, quel que soit votre niveau !
            </p>

            <div class="join-section">
              <h3>Pourquoi devenir membre ?</h3>
              <ul class="benefits-list">
                <li v-for="benefit in benefits" :key="benefit">{{ benefit }}</li>
              </ul>
              <p>
                Pour adhérer, contactez-nous via Discord ou par email. Nous serons ravis de vous
                accueillir !
              </p>
            </div>
          </div>

          <div class="contact-actions-container">
            <h2>Comment nous contacter ?</h2>
            <p class="action-intro">
              Choisissez le moyen de communication qui vous convient le mieux
            </p>

            <div class="actions-grid">
              <a
                :href="discordUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-action-card"
              >
                <div class="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                    />
                  </svg>
                </div>
                <h3>Rejoignez Discord</h3>
                <p>Discutez en temps réel avec la communauté</p>
                <span class="action-link">Rejoindre →</span>
              </a>

              <a :href="getMailtoLink()" class="contact-action-card">
                <div class="action-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h3>Envoyez un email</h3>
                <p>{{ email }}</p>
                <span class="action-link">Contacter →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import dataService from '@/services/dataService'
import { useSeo } from '@/composables/useSeo'

const benefits = dataService.get('contact.benefits', []) as Array<string>
const discordUrl = dataService.get('contact.discord.url', '') as string
const email = dataService.get('contact.email', '') as string

const getMailtoLink = () => `mailto:${email}`

// SEO
useSeo('contact')
</script>

<style scoped>
.contact {
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.contact-info p {
  color: var(--color-text-soft);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.join-section {
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 1rem;
  border: 2px solid var(--color-border);
}

.join-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  font-weight: 600;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.benefits-list li {
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;
  color: var(--color-text-soft);
}

.benefits-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.125rem;
}

.contact-actions-container h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.action-intro {
  color: var(--color-text-soft);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.actions-grid {
  display: grid;
  gap: 1.5rem;
}

.contact-action-card {
  background-color: var(--color-background-soft);
  padding: 2rem;
  border-radius: 0.75rem;
  border: 2px solid var(--color-border);
  transition: all var(--transition-base);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.contact-action-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.action-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: 1.25rem;
}

.action-icon svg {
  width: 2rem;
  height: 2rem;
}

.contact-action-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.contact-action-card p {
  color: var(--color-text-soft);
  font-size: 0.9375rem;
  margin-bottom: 1rem;
}

.action-link {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9375rem;
}

@media (max-width: 1024px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .form-card {
    position: relative;
    top: 0;
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

  .form-card {
    padding: 2rem 1.5rem;
  }

  .join-section {
    padding: 1.5rem;
  }
}
</style>

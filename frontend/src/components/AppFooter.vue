<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-section">
          <h3 class="footer-title">{{ name }}</h3>
          <p class="footer-description">{{ description }}</p>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">Contact</h4>
          <ul class="footer-contact">
            <li>
              <RouterLink to="/contact" class="footer-link"> Nous contacter </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">{{ currentYear }} {{ copyright }}</p>
        <p class="footer-note">{{ trademark }}</p>
        <p class="footer-creator">
          Créé avec ❤️ par
          <a
            href="https://github.com/LPauzies"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-creator-link"
          >
            Lucas Pauzies
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import dataService from '@/services/dataService'

const name = dataService.get('general.name', '')
const description = dataService.get('general.description', '')
const copyright = dataService.get('general.legal.copyright', '')
const trademark = dataService.get('general.legal.trademark', '')
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.footer-description {
  color: var(--color-text-soft);
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--color-text-soft);
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color-text-soft);
}

.footer-contact-link {
  color: var(--color-primary);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.footer-contact-link:hover {
  color: var(--color-primary-dark);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-copyright,
.footer-note,
.footer-creator {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin: 0;
}

.footer-creator-link {
  color: var(--color-primary);
  font-weight: 500;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.footer-creator-link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-content {
    padding: 2rem 1rem 1.5rem;
  }
}
</style>

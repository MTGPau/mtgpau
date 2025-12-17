<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-section">
          <h3 class="footer-title">MTG Pau</h3>
          <p class="footer-description">
            Association de joueurs de Magic: The Gathering à Pau
          </p>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li><RouterLink to="/" class="footer-link">Accueil</RouterLink></li>
            <li><RouterLink to="/about" class="footer-link">À propos</RouterLink></li>
            <li><RouterLink to="/events" class="footer-link">Événements</RouterLink></li>
            <li><RouterLink to="/contact" class="footer-link">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">Contact</h4>
          <ul class="footer-contact">
            <li>Pau, France</li>
            <li>contact@mtgpau.fr</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          {{ currentYear }} MTG Pau. Tous droits réservés.
        </p>
        <p class="footer-note">
          Magic: The Gathering est une marque déposée de Wizards of the Coast
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
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

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-copyright,
.footer-note {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin: 0;
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

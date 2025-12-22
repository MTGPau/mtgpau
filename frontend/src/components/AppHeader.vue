<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav-content">
        <RouterLink to="/" class="logo">
          <span class="logo-text">MTG Pau</span>
        </RouterLink>

        <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="Toggle menu">
          <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
          <RouterLink to="/" class="nav-link" @click="closeMobileMenu">Accueil</RouterLink>
          <RouterLink to="/about" class="nav-link" @click="closeMobileMenu">À propos</RouterLink>
          <RouterLink to="/cr" class="nav-link" @click="closeMobileMenu">CR Aquitaine</RouterLink>
          <RouterLink to="/events" class="nav-link" @click="closeMobileMenu">Événements</RouterLink>
          <RouterLink to="/contact" class="nav-link" @click="closeMobileMenu">Contact</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.header {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  transition: color var(--transition-fast);
}

.logo:hover {
  color: var(--color-primary-dark);
}

.logo-text {
  letter-spacing: -0.02em;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.5rem;
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  position: relative;
  color: var(--color-text);
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color var(--transition-fast);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-link.router-link-active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    padding: 1rem 0;
    display: none;
  }

  .nav-links.mobile-open {
    display: flex;
  }

  .nav-link {
    width: 100%;
    padding: 1rem 2rem;
  }

  .nav-link::after {
    display: none;
  }

  .nav-link:hover {
    background-color: var(--color-background-soft);
  }
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

function getScrollOffset(): number {
  const width = window.innerWidth

  if (width < 768) {
    return 80
  } else if (width < 1024) {
    return 100
  } else {
    return 120
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Accueil - MTG Pau' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'À propos - MTG Pau' },
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      meta: { title: 'Événements - MTG Pau' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'Contact - MTG Pau' },
    },
    {
      path: '/cr',
      name: 'cr',
      component: () => import('../views/CRView.vue'),
      meta: { title: 'CR Aquitaine - MTG Pau' },
    },
    {
      path: '/open-qualifier-cdf',
      name: 'openQualifier',
      component: () => import('../views/OpenQualifierCDFView.vue'),
      meta: { title: 'Open Qualifier CDF - MTG Pau' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: getScrollOffset(),
      }
    } else {
      return { top: 0 }
    }
  },
})

// Update document title on route change
router.afterEach((to) => {
  const defaultTitle = 'MTG Pau - Association Magic: The Gathering'
  document.title = (to.meta.title as string) || defaultTitle
})

export default router

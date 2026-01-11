<template>
  <div class="photo-gallery">
    <div class="gallery-container">
      <div v-if="availableYears.length > 0" class="year-selector">
        <button
          v-for="year in availableYears"
          :key="year"
          class="year-button"
          :class="{ active: selectedYear === year }"
          @click="selectedYear = year"
          type="button"
        >
          {{ year }}
        </button>
      </div>

      <div class="gallery-content">
        <div v-if="currentPhotos.length > 0">
          <Transition name="gallery-fade" mode="out-in">
            <div
              :key="currentStartIndex"
              class="gallery-grid"
              @mouseenter="pauseAutoPlay"
              @mouseleave="resumeAutoPlay"
            >
              <div
                v-for="(photo, index) in visiblePhotos"
                :key="photo.filename"
                class="photo-card"
                @click="openLightbox(currentStartIndex + index)"
                @keydown.enter="openLightbox(currentStartIndex + index)"
                tabindex="0"
                role="button"
                :aria-label="`Voir ${photo.alt}`"
              >
                <img :src="photo.thumbnail" :alt="photo.alt" class="photo-image" loading="lazy" />
              </div>
            </div>
          </Transition>

          <div v-if="currentPhotos.length > photosPerPage" class="carousel-controls">
            <button
              class="carousel-button"
              @click="previousPage"
              :disabled="currentStartIndex === 0"
              aria-label="Photos précédentes"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <span class="carousel-indicator">
              {{ currentStartIndex + 1 }}-{{
                Math.min(currentStartIndex + photosPerPage, currentPhotos.length)
              }}
              sur {{ currentPhotos.length }}
            </span>

            <button
              class="carousel-button"
              @click="nextPage"
              :disabled="currentStartIndex + photosPerPage >= currentPhotos.length"
              aria-label="Photos suivantes"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>Aucune photo disponible pour cette année</p>
        </div>
      </div>
    </div>

    <PhotoLightbox
      v-model:isOpen="lightboxOpen"
      :photos="currentPhotos"
      :initialIndex="lightboxIndex"
      @change="lightboxIndex = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import PhotoLightbox from './PhotoLightbox.vue'
import photosData from '@/data/photos.json'
import type { PhotoManifest } from '@/types/photo'

const manifest = photosData as PhotoManifest

// Get all available years sorted in descending order
const availableYears = computed(() => {
  return Object.keys(manifest.photos)
    .filter((year) => {
      const photos = manifest.photos[year]
      return photos && photos.length > 0
    })
    .sort((a, b) => parseInt(b) - parseInt(a))
})

// Default to the most recent year with photos
const selectedYear = ref(availableYears.value[0] || '2025')

// Get photos for the selected year
const currentPhotos = computed(() => {
  return manifest.photos[selectedYear.value] || []
})

// Carousel state
const photosPerPage = 3
const currentStartIndex = ref(0)

// Get visible photos for the current page
const visiblePhotos = computed(() => {
  return currentPhotos.value.slice(currentStartIndex.value, currentStartIndex.value + photosPerPage)
})

// Reset carousel when year changes
watch(selectedYear, () => {
  currentStartIndex.value = 0
})

const previousPage = () => {
  if (currentStartIndex.value > 0) {
    currentStartIndex.value = Math.max(0, currentStartIndex.value - photosPerPage)
  }
}

const nextPage = () => {
  if (currentStartIndex.value + photosPerPage < currentPhotos.value.length) {
    currentStartIndex.value = Math.min(
      currentPhotos.value.length - photosPerPage,
      currentStartIndex.value + photosPerPage,
    )
  }
}

// Auto-play functionality
let autoPlayInterval: ReturnType<typeof setInterval> | null = null
const isAutoPlayPaused = ref(false)

const advanceCarousel = () => {
  if (currentPhotos.value.length <= photosPerPage) return

  // If we're at the end, loop back to the start
  if (currentStartIndex.value + photosPerPage >= currentPhotos.value.length) {
    currentStartIndex.value = 0
  } else {
    nextPage()
  }
}

const startAutoPlay = () => {
  if (autoPlayInterval) return

  autoPlayInterval = setInterval(() => {
    if (!isAutoPlayPaused.value) {
      advanceCarousel()
    }
  }, 6000) // Change photos every 6 seconds
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const pauseAutoPlay = () => {
  isAutoPlayPaused.value = true
}

const resumeAutoPlay = () => {
  isAutoPlayPaused.value = false
}

// Start auto-play when component mounts
onMounted(() => {
  startAutoPlay()
})

// Clean up on unmount
onUnmounted(() => {
  stopAutoPlay()
})

// Restart auto-play when year changes
watch(selectedYear, () => {
  stopAutoPlay()
  startAutoPlay()
})

// Lightbox state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}
</script>

<style scoped>
.photo-gallery {
  width: 100%;
}

.gallery-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.year-selector {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 120px;
  flex-shrink: 0;
}

.year-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.5rem;
  background: transparent;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: center;
}

.year-button:hover {
  background: var(--color-background-soft);
  transform: translateX(4px);
}

.year-button.active {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.year-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gallery-content {
  flex: 1;
  min-width: 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.photo-card {
  background-color: var(--color-white);
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  outline: none;
}

.photo-card:hover,
.photo-card:focus {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.photo-card:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.photo-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-soft);
}

.empty-state p {
  font-size: 1.125rem;
  margin: 0;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.carousel-button {
  background: var(--color-white);
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
}

.carousel-button:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.1);
}

.carousel-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: var(--color-text-soft);
  color: var(--color-text-soft);
}

.carousel-indicator {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  min-width: 100px;
  text-align: center;
}

/* Transition animations */
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.gallery-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.gallery-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .gallery-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .year-selector {
    flex-direction: row;
    min-width: auto;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
  }

  .year-button {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
    flex: 1;
    max-width: 100px;
  }

  .year-button:hover {
    transform: translateY(-2px);
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .photo-image {
    height: 200px;
  }

  .carousel-controls {
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .carousel-button {
    width: 40px;
    height: 40px;
  }

  .carousel-indicator {
    font-size: 0.875rem;
    min-width: 80px;
  }
}
</style>

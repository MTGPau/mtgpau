<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        class="lightbox-overlay"
        @click="handleOverlayClick"
        role="dialog"
        aria-modal="true"
        aria-label="Visionneuse de photos"
      >
        <button
          class="lightbox-close"
          @click="close"
          aria-label="Fermer la visionneuse"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button
          v-if="photos.length > 1"
          class="lightbox-nav lightbox-prev"
          @click.stop="prev"
          aria-label="Photo précédente"
          type="button"
          :disabled="currentIndex === 0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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

        <div class="lightbox-content" @click.stop>
          <img
            :src="currentPhoto.fullSize"
            :alt="currentPhoto.alt"
            class="lightbox-image"
            @load="handleImageLoad"
          />
          <div class="lightbox-counter" aria-live="polite">
            {{ currentIndex + 1 }} / {{ photos.length }}
          </div>
        </div>

        <button
          v-if="photos.length > 1"
          class="lightbox-nav lightbox-next"
          @click.stop="next"
          aria-label="Photo suivante"
          type="button"
          :disabled="currentIndex === photos.length - 1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Photo } from '@/types/photo'

interface Props {
  photos: Photo[]
  initialIndex: number
  isOpen: boolean
}

const props = withDefaults(defineProps<Props>(), {
  photos: () => [],
  initialIndex: 0,
  isOpen: false,
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  change: [index: number]
}>()

const currentIndex = ref(props.initialIndex)

const currentPhoto = computed(() => {
  const photo = props.photos[currentIndex.value] || props.photos[0]
  return (
    photo || {
      filename: '',
      alt: '',
      thumbnail: '',
      fullSize: '',
    }
  )
})

const close = () => {
  emit('update:isOpen', false)
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    emit('change', currentIndex.value)
  }
}

const next = () => {
  if (currentIndex.value < props.photos.length - 1) {
    currentIndex.value++
    emit('change', currentIndex.value)
  }
}

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    close()
  }
}

const handleImageLoad = () => {
  // Image loaded successfully
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return

  switch (e.key) {
    case 'Escape':
      close()
      break
    case 'ArrowLeft':
      prev()
      break
    case 'ArrowRight':
      next()
      break
  }
}

// Body scroll lock
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      currentIndex.value = props.initialIndex
    } else {
      document.body.style.overflow = ''
    }
  },
)

// Keyboard event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-white);
  transition: all var(--transition-base);
  z-index: 10001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.lightbox-image {
  max-width: 100%;
  max-height: calc(90vh - 3rem);
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-counter {
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-white);
  transition: all var(--transition-base);
  z-index: 10000;
}

.lightbox-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

/* Transition animations */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-content,
.lightbox-leave-active .lightbox-content {
  transition: transform 0.3s ease;
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .lightbox-overlay {
    padding: 1rem;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }

  .lightbox-nav {
    width: 48px;
    height: 48px;
  }

  .lightbox-prev {
    left: 0.5rem;
  }

  .lightbox-next {
    right: 0.5rem;
  }

  .lightbox-counter {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
}
</style>

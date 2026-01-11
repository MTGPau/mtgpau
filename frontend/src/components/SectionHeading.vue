<template>
  <component :is="tag" :id="anchor" class="section-heading">
    <slot />
    <button
      v-if="anchor"
      @click="copyLink"
      class="anchor-link-btn"
      :aria-label="`Copier le lien vers ${anchor}`"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="link-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
      <span v-if="showCopied" class="copied-tooltip">Copié !</span>
    </button>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  anchor?: string
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h2',
})

const showCopied = ref(false)

const copyLink = async () => {
  if (!props.anchor) return

  const url = `${window.location.origin}${window.location.pathname}#${props.anchor}`

  try {
    await navigator.clipboard.writeText(url)
    showCopied.value = true
    setTimeout(() => {
      showCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}
</script>

<style scoped>
.section-heading {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  scroll-margin-top: 100px;
  margin: 0 auto;
}

.anchor-link-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    color 0.2s ease;
  color: var(--color-text-soft);
  opacity: 0.3;
}

.anchor-link-btn:hover {
  opacity: 1;
  color: var(--color-primary);
}

.anchor-link-btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.link-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.copied-tooltip {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.copied-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--color-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .link-icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>

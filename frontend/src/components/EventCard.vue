<template>
  <div class="event-card">
    <h3 class="event-title">{{ event.name }}</h3>
    <p class="event-date">{{ formattedDate }}</p>
    <p class="event-format">Format : {{ formatLabel(event.format) }}</p>
    <a
      :href="event.url"
      target="_blank"
      rel="noopener noreferrer"
      class="event-registration-btn"
    >
      Voir l'évènement
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '@/types/data'
import { formatLabel } from '@/utils/formatLabels'
import { formatEventDate } from '@/utils/dateFormatting'

const props = defineProps<{
  event: Event
}>()

const formattedDate = computed(() => formatEventDate(props.event))
</script>

<style scoped>
.event-card {
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.event-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 0.9375rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 1rem;
}

.event-format {
  color: var(--color-text-soft);
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.event-registration-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  text-align: center;
  transition: all var(--transition-base);
}

.event-registration-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
</style>

<template>
  <div id="past-results" class="past-events-section">
    <SectionHeading anchor="past-results">Résultats des tournois du mois</SectionHeading>

    <div v-if="thisMonthEvents.length > 0" class="this-month">
      <h3 class="this-month-title">
        <svg
          class="calendar-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
            clip-rule="evenodd"
          />
        </svg>
        Résultats de ce mois-ci
      </h3>
      <div class="this-month-list">
        <PastEventCard
          v-for="event in thisMonthEvents"
          :key="event.api_url"
          :event="event"
          :is-expanded="expandedUrl === event.api_url"
          @toggle="toggleCard(event.api_url)"
        />
      </div>
    </div>

    <h3 v-if="thisMonthEvents.length > 0" class="older-title">Résultats précédents</h3>

    <div class="filter-chips">
      <button
        v-for="chip in formatChips"
        :key="chip.value ?? 'all'"
        class="filter-chip"
        :class="{ active: selectedFormat === chip.value }"
        @click="selectFormat(chip.value)"
        type="button"
      >
        {{ chip.label }}
        <span class="chip-count">{{ chip.count }}</span>
      </button>
    </div>

    <div v-if="visibleEvents.length > 0" class="events-list">
      <PastEventCard
        v-for="event in visibleEvents"
        :key="event.api_url"
        :event="event"
        :is-expanded="expandedUrl === event.api_url"
        @toggle="toggleCard(event.api_url)"
      />
    </div>

    <p v-else class="empty-state">Aucun résultat pour ces filtres.</p>

    <nav v-if="totalPages > 1" class="pagination" aria-label="Pagination des résultats">
      <button
        class="page-btn page-arrow"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        type="button"
        aria-label="Page précédente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <template v-for="page in pageNumbers" :key="page">
        <span v-if="page === '...'" class="page-ellipsis">...</span>
        <button
          v-else
          class="page-btn"
          :class="{ active: currentPage === page }"
          @click="goToPage(page as number)"
          type="button"
        >
          {{ page }}
        </button>
      </template>

      <button
        class="page-btn page-arrow"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        type="button"
        aria-label="Page suivante"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <span class="page-info">{{ currentPage }}/{{ totalPages }}</span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Event } from '@/types/data'
import { formatLabel } from '@/utils/formatLabels'
import { parseEventDate } from '@/utils/dateFormatting'
import SectionHeading from '@/components/SectionHeading.vue'
import PastEventCard from '@/components/PastEventCard.vue'

const PAGE_SIZE = 10

const props = defineProps<{
  events: Event[]
}>()

const selectedFormat = ref<string | null>(null)
const currentPage = ref(1)
const expandedUrl = ref<string | null>(null)

const thisMonthStart = (() => {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
})()

const isThisMonth = (event: Event) => parseEventDate(event) >= thisMonthStart

const thisMonthEvents = computed(() => props.events.filter(isThisMonth))

const olderEvents = computed(() => props.events.filter((e) => !isThisMonth(e)))

const formatChips = computed(() => {
  const counts = new Map<string, number>()
  for (const event of olderEvents.value) {
    counts.set(event.format, (counts.get(event.format) || 0) + 1)
  }

  const chips: { value: string | null; label: string; count: number }[] = [
    { value: null, label: 'Tous', count: olderEvents.value.length },
  ]

  for (const [format, count] of counts) {
    chips.push({ value: format, label: formatLabel(format), count })
  }

  return chips
})

const filteredEvents = computed(() => {
  if (!selectedFormat.value) return olderEvents.value
  return olderEvents.value.filter((e) => e.format === selectedFormat.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredEvents.value.length / PAGE_SIZE)))

const visibleEvents = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredEvents.value.slice(start, start + PAGE_SIZE)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
})

const scrollToList = () => {
  const el = document.getElementById('past-results')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goToPage = (page: number) => {
  currentPage.value = page
  expandedUrl.value = null
  scrollToList()
}

const resetView = () => {
  currentPage.value = 1
  expandedUrl.value = null
}

const selectFormat = (value: string | null) => {
  selectedFormat.value = value
  resetView()
}

const toggleCard = (url: string) => {
  expandedUrl.value = expandedUrl.value === url ? null : url
}
</script>

<style scoped>
.past-events-section {
  margin-top: 4rem;
  margin-bottom: 2rem;
}

.past-events-section :deep(.section-heading) {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2rem;
}

/* This month section */
.this-month {
  background: linear-gradient(135deg, rgba(217, 119, 6, 0.06) 0%, rgba(245, 158, 11, 0.04) 100%);
  border: 1.5px solid var(--color-border-hover);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.this-month-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

.calendar-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary);
}

.this-month-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.older-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Filters */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: 2rem;
  background-color: var(--color-white);
  color: var(--color-text-soft);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-chip.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.chip-count {
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0.7;
}

.filter-chip.active .chip-count {
  opacity: 0.9;
}

/* Events list */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-state {
  text-align: center;
  color: var(--color-text-light);
  font-size: 1rem;
  padding: 3rem 1rem;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border: 1.5px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-white);
  color: var(--color-text-soft);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-arrow svg {
  width: 1.125rem;
  height: 1.125rem;
}

.page-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 2.5rem;
  color: var(--color-text-light);
  font-size: 0.875rem;
  user-select: none;
}

.page-info {
  display: none;
}

@media (max-width: 768px) {
  .past-events-section :deep(.section-heading) {
    font-size: 1.5rem;
  }

  .this-month {
    padding: 1rem;
  }

  .this-month-title {
    font-size: 1.125rem;
  }

  .older-title {
    font-size: 1.125rem;
  }

  .filter-chips {
    gap: 0.375rem;
  }

  .filter-chip {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }

  .page-btn {
    min-width: 2.75rem;
    height: 2.75rem;
  }

  .page-ellipsis {
    display: none;
  }

  .page-info {
    display: inline-flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-soft);
    margin-left: 0.25rem;
  }
}
</style>

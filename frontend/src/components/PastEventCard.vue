<template>
  <div class="past-event-card" :class="{ 'is-expanded': isExpanded }">
    <button
      class="past-event-header"
      :aria-expanded="isExpanded"
      @click="$emit('toggle')"
      type="button"
    >
      <div class="header-left">
        <span class="event-name">{{ event.name }}</span>
        <span class="event-date-short">{{ shortDate }}</span>
      </div>
      <div class="header-right">
        <span class="format-badge">{{ formatLabel(event.format) }}</span>
        <span class="player-count">{{ event.results.length }} joueurs</span>
        <span v-if="winner" class="winner-name">
          <svg
            class="trophy-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.17a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 3.047 2.262 5.568 5.196 5.98a.75.75 0 0 1 .04 1.494A8.21 8.21 0 0 1 9.279 15h5.442a8.21 8.21 0 0 1-1.123-2.276.75.75 0 0 1 .04-1.495A6.002 6.002 0 0 0 18.834 5.25v-.607a48.48 48.48 0 0 0-13.668 0v.607ZM4.11 4.658a45.14 45.14 0 0 0-1.598.305 5.26 5.26 0 0 0 4.172 4.079A7.478 7.478 0 0 1 4.11 4.658ZM19.89 4.658a7.478 7.478 0 0 1-2.574 4.384 5.26 5.26 0 0 0 4.172-4.079 45.14 45.14 0 0 0-1.598-.305Z"
              clip-rule="evenodd"
            />
          </svg>
          {{ winner }}
        </span>
        <svg
          class="chevron-icon"
          :class="{ rotated: isExpanded }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>

    <div v-if="isExpanded" class="past-event-body">
      <div class="results-grid">
        <div class="results-header">
          <span class="col-rank">Place</span>
          <span class="col-player">Joueur</span>
          <span class="col-score">Score</span>
        </div>
        <div
          v-for="result in event.results"
          :key="result.ranking"
          class="results-row"
          :class="rankClass(result.ranking)"
        >
          <span class="col-rank">
            <span v-if="result.ranking <= 3" class="rank-badge" :class="rankClass(result.ranking)">
              {{ result.ranking }}
            </span>
            <span v-else class="rank-number">{{ result.ranking }}</span>
          </span>
          <span class="col-player">{{ result.player }}</span>
          <span class="col-score">
            <span class="win">{{ result.win_count }}</span>
            <span class="score-sep">-</span>
            <span class="draw">{{ result.draw_count }}</span>
            <span class="score-sep">-</span>
            <span class="loss">{{ result.loss_count }}</span>
          </span>
        </div>
      </div>
      <a
        :href="event.url"
        target="_blank"
        rel="noopener noreferrer"
        class="unity-link"
      >
        Voir sur Unity League
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="external-icon"
        >
          <path
            fill-rule="evenodd"
            d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.5-3.5a.75.75 0 0 0 0 1.5h2.19l-5.72 5.72a.75.75 0 1 0 1.06 1.06l5.72-5.72v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75h-4Z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '@/types/data'
import { formatLabel } from '@/utils/formatLabels'
import { formatEventDateShort } from '@/utils/dateFormatting'

const props = defineProps<{
  event: Event
  isExpanded: boolean
}>()

defineEmits<{
  toggle: []
}>()

const shortDate = computed(() => formatEventDateShort(props.event))

const winner = computed(() => {
  const first = props.event.results.find((r) => r.ranking === 1)
  return first?.player ?? null
})

const rankClass = (ranking: number) => {
  if (ranking === 1) return 'rank-gold'
  if (ranking === 2) return 'rank-silver'
  if (ranking === 3) return 'rank-bronze'
  return ''
}
</script>

<style scoped>
.past-event-card {
  background-color: var(--color-white);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: box-shadow var(--transition-base);
}

.past-event-card:hover {
  box-shadow: var(--shadow-md);
}

.past-event-card.is-expanded {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-hover);
}

.past-event-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 1rem;
  transition: background-color var(--transition-fast);
}

.past-event-header:hover {
  background-color: var(--color-background-soft);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.event-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-date-short {
  font-size: 0.8125rem;
  color: var(--color-primary);
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.format-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background-color: var(--color-background-mute);
  color: var(--color-text-soft);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 1rem;
  white-space: nowrap;
}

.player-count {
  font-size: 0.8125rem;
  color: var(--color-text-light);
  white-space: nowrap;
}

.winner-name {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  white-space: nowrap;
}

.trophy-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--color-primary);
}

.chevron-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-text-light);
  transition: transform var(--transition-base);
  flex-shrink: 0;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* Body / Results */
.past-event-body {
  border-top: 1px solid var(--color-border);
  padding: 1.25rem;
}

.results-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.results-header {
  display: grid;
  grid-template-columns: 3.5rem 1fr auto;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--color-border);
}

.results-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr auto;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  align-items: center;
  border-bottom: 1px solid var(--color-background-mute);
}

.results-row:last-child {
  border-bottom: none;
}

.results-row.rank-gold {
  background-color: rgba(217, 119, 6, 0.06);
}

.results-row.rank-silver {
  background-color: rgba(148, 163, 184, 0.08);
}

.results-row.rank-bronze {
  background-color: rgba(180, 83, 9, 0.05);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.75rem;
}

.rank-badge.rank-gold {
  background-color: #f59e0b;
  color: var(--color-white);
}

.rank-badge.rank-silver {
  background-color: #94a3b8;
  color: var(--color-white);
}

.rank-badge.rank-bronze {
  background-color: #b45309;
  color: var(--color-white);
}

.rank-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  font-weight: 600;
  color: var(--color-text-soft);
  font-size: 0.875rem;
}

.col-player {
  color: var(--color-text);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-score {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-weight: 600;
  font-size: 0.8125rem;
  white-space: nowrap;
}

.win {
  color: #16a34a;
}

.loss {
  color: #dc2626;
}

.draw {
  color: var(--color-text-light);
}

.score-sep {
  color: var(--color-text-light);
}

.unity-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.unity-link:hover {
  color: var(--color-primary-dark);
}

.external-icon {
  width: 0.875rem;
  height: 0.875rem;
}

@media (max-width: 768px) {
  .past-event-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.875rem 1rem;
  }

  .header-right {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .winner-name {
    display: none;
  }

  .results-header,
  .results-row {
    grid-template-columns: 2.5rem 1fr auto;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .results-header {
    font-size: 0.6875rem;
  }

  .results-row {
    font-size: 0.8125rem;
  }
}
</style>

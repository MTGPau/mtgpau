<template>
  <div class="secondary-tournament-section">
    <div class="secondary-tournament-card">
      <div class="tournament-header">
        <h3>{{ tournament.title }}</h3>
      </div>
      <div class="tournament-content">
        <div class="tournament-details">
          <div class="tournament-info-item">
            <span class="tournament-label">Date</span>
            <span class="tournament-value">{{ tournament.date }}</span>
          </div>
          <div class="tournament-info-item">
            <span class="tournament-label">Participation</span>
            <span class="tournament-value">PAF {{ tournament.details.price }}</span>
          </div>
          <div class="tournament-info-item">
            <span class="tournament-label">Début du tournoi</span>
            <span class="tournament-value">{{ tournament.details.startTime }}</span>
          </div>
          <div class="tournament-info-item">
            <span class="tournament-label">Lieu</span>
            <span class="tournament-value">
              {{ tournament.details.location.name }}<br />
              {{ tournament.details.location.address }}
            </span>
          </div>
        </div>
        <div class="tournament-prizes">
          <h4>Prize Pool</h4>
          <div class="tournament-prizes-grid">
            <div
              v-for="pool in tournament.prizePool"
              :key="pool.playerCount"
              class="tournament-prize-column"
            >
              <div class="tournament-prize-header">{{ pool.playerCount }}</div>
              <div v-for="(prize, index) in pool.prizes" :key="index" class="tournament-prize-row">
                <span>{{ prize.position }}</span>
                <span>{{ prize.amount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tournament-registration">
        <a
          :href="tournament.registration"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary-tournament"
        >
          S'inscrire
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtraTournament } from '@/types/data'

defineProps<{
  tournament: ExtraTournament
}>()
</script>

<style scoped>
.secondary-tournament-section {
  margin-bottom: 3rem;
}

.secondary-tournament-card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.tournament-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.tournament-header h3 {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 0;
  font-weight: 700;
}

.tournament-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.tournament-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tournament-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tournament-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.tournament-value {
  font-size: 1rem;
  color: var(--color-text-soft);
  font-weight: 400;
  line-height: 1.5;
}

.tournament-prizes h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
  text-align: center;
}

.tournament-prizes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.tournament-prize-column {
  background-color: var(--color-white);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
}

.tournament-prize-header {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.tournament-prize-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.tournament-prize-row:nth-child(even) {
  background-color: var(--color-background-soft);
  border-radius: 0.25rem;
}

.tournament-prize-row span:first-child {
  color: var(--color-text-soft);
  font-weight: 500;
}

.tournament-prize-row span:last-child {
  color: var(--color-primary);
  font-weight: 700;
}

.tournament-registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
}

.tournament-registration-text {
  font-size: 0.875rem;
  color: var(--color-text-soft);
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-secondary-tournament {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: var(--color-white);
  color: var(--color-text);
  border: 2px solid var(--color-primary);
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all var(--transition-base);
}

.btn-secondary-tournament:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .secondary-tournament-card {
    padding: 1.5rem;
  }

  .tournament-content {
    grid-template-columns: 1fr;
  }

  .tournament-prizes-grid {
    grid-template-columns: 1fr;
  }
}
</style>

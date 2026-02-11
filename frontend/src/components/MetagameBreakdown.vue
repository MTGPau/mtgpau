<template>
  <div v-if="metagame" class="metagame-breakdown">

    <!-- Overview Stats -->
    <div class="stats-card">
      <h3>Vue d'ensemble</h3>
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-number">{{ metagame.stats.totalPlayers }}</div>
          <div class="stat-label">Joueurs</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">{{ metagame.stats.totalCommanders }}</div>
          <div class="stat-label">Commandants</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">{{ metagame.stats.maxCopies }}</div>
          <div class="stat-label">Max copies</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">{{ metagame.stats.singletons }}</div>
          <div class="stat-label">Singletons</div>
        </div>
      </div>
    </div>

    <!-- Color Distribution -->
    <div class="card">
      <h3>Répartition par nombre de couleurs</h3>
      <div class="color-pills">
        <div class="color-pill">
          <div class="pill-number">{{ metagame.colorDistribution.mono }}</div>
          <div class="pill-label">Mono</div>
        </div>
        <div class="color-pill">
          <div class="pill-number">{{ metagame.colorDistribution.bicolor }}</div>
          <div class="pill-label">Bicolore</div>
        </div>
        <div class="color-pill">
          <div class="pill-number">{{ metagame.colorDistribution.tricolor }}</div>
          <div class="pill-label">Tricolore</div>
        </div>
        <div class="color-pill">
          <div class="pill-number">{{ metagame.colorDistribution.fourPlus }}</div>
          <div class="pill-label">4+ coul.</div>
        </div>
        <div v-if="metagame.colorDistribution.other" class="color-pill">
          <div class="pill-number">{{ metagame.colorDistribution.other }}</div>
          <div class="pill-label">Other</div>
        </div>
      </div>
    </div>

    <!-- Color Presence -->
    <div class="card">
      <h3>Présence par couleur</h3>
      <div class="color-bars">
        <div v-for="color in metagame.colorPresence" :key="color.color" class="color-bar">
          <div class="bar-icon">
            <img
              :src="`https://svgs.scryfall.io/card-symbols/${color.color}.svg`"
              :alt="color.name"
              class="mana-icon"
            />
          </div>
          <div class="bar-label">{{ color.name }}</div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :class="`color-${color.color}`"
              :style="{ width: `${color.percentage}%` }"
            >
              <span class="bar-value">{{ color.count }} ({{ color.percentage }}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Guild Distribution -->
    <div class="card">
      <h3>Répartition par identité de couleur</h3>
      <div class="guild-table">
        <div
          v-for="guild in metagame.guildDistribution"
          :key="guild.name"
          class="guild-row"
        >
          <div class="guild-name">{{ guild.name }}</div>
          <div class="guild-count">{{ guild.count }}</div>
          <div class="guild-percentage">{{ guild.percentage.toFixed(1) }}%</div>
          <div class="guild-bar">
            <div
              class="guild-bar-fill"
              :style="{
                width: `${metagame.guildDistribution[0] ? (guild.count / metagame.guildDistribution[0].count) * 100 : 0}%`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Commanders Ranking -->
    <div class="card commanders-card">
      <h3>Classement complet des commandants</h3>
      <div class="commanders-table">
        <div
          v-for="(commander, index) in metagame.commanders"
          :key="commander.name"
          :class="['commander-row', { 'top-commander': commander.isTopCommander, 'hidden-row': !showAllCommanders && index >= 5 }]"
        >
          <div class="col-commander">
            <div class="commander-name">
              <a
                :href="`https://scryfall.com/search?q=${encodeURIComponent(commander.scryfallQuery)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="commander-link"
              >
                {{ commander.name }}
              </a>
            </div>
            <div class="commander-info">
              <img
                v-for="color in commander.colors"
                :key="color"
                :src="`https://svgs.scryfall.io/card-symbols/${color}.svg`"
                :alt="color"
                class="mana-symbol-sm"
              />
              <span class="identity-label">{{ commander.colorIdentity }}</span>
            </div>
          </div>
          <div class="col-count">{{ commander.count }}</div>
          <div class="col-percent">{{ commander.percentage.toFixed(1) }}%</div>
          <div class="col-bar">
            <div class="bar-bg">
              <div
                class="bar-commander"
                :style="{
                  width: `${metagame.commanders[0] ? (commander.count / metagame.commanders[0].count) * 100 : 0}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="metagame.commanders.length > 5" class="expand-button-container">
        <button class="expand-button" @click="showAllCommanders = !showAllCommanders">
          <span>{{ showAllCommanders ? 'Voir moins' : `Voir tous les commandants (${metagame.commanders.length})` }}</span>
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
            :class="['chevron-icon', { 'rotated': showAllCommanders }]"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MetagameData } from '@/types/data'

defineProps<{
  metagame: MetagameData | null
}>()

const showAllCommanders = ref(false)
</script>

<style scoped>
.metagame-breakdown {
  width: 100%;
}

.metagame-header {
  text-align: center;
  margin-bottom: 2rem;
}

.metagame-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 1rem;
  color: var(--color-text-soft);
}

.card {
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Stats Grid */
.stats-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
  color: var(--color-white);
}

.stats-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-box {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem 1rem;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--color-white);
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Color Pills */
.color-pills {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.color-pill {
  flex: 1;
  min-width: 100px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem 1rem;
  text-align: center;
}

.pill-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.pill-label {
  font-size: 0.75rem;
  color: var(--color-text-soft);
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Color Bars */
.color-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.bar-icon {
  width: 32px;
  text-align: center;
  flex-shrink: 0;
}

.mana-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bar-label {
  width: 80px;
  font-size: 0.875rem;
  color: var(--color-text-soft);
  text-align: right;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  height: 28px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.75rem;
  min-width: 80px;
}

.bar-fill.color-R {
  background: linear-gradient(90deg, #d3202a, #e84040);
}

.bar-fill.color-U {
  background: linear-gradient(90deg, #0e68ab, #2088d0);
}

.bar-fill.color-W {
  background: linear-gradient(90deg, #c4b88a, #e0d5a8);
}

.bar-fill.color-B {
  background: linear-gradient(90deg, #3a3530, #5a5550);
}

.bar-fill.color-G {
  background: linear-gradient(90deg, #00733e, #20a060);
}

.bar-value {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-white);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Guild Table */
.guild-table {
  display: flex;
  flex-direction: column;
}

.guild-row {
  display: grid;
  grid-template-columns: 1fr 60px 80px 140px;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
}

.guild-row:last-child {
  border-bottom: none;
}

.guild-name {
  font-size: 0.9375rem;
  color: var(--color-text);
  font-weight: 600;
}

.guild-count {
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary);
}

.guild-percentage {
  text-align: right;
  font-size: 0.875rem;
  color: var(--color-text-soft);
}

.guild-bar {
  background-color: var(--color-background-soft);
  border-radius: 0.375rem;
  height: 12px;
  overflow: hidden;
}

.guild-bar-fill {
  background: linear-gradient(90deg, var(--color-primary), var(--color-brown));
  height: 100%;
  border-radius: 0.375rem;
  transition: width var(--transition-base);
}

/* Commanders Table */
.commanders-table {
  width: 100%;
}

.commander-row {
  display: grid;
  grid-template-columns: 2fr 80px 80px 140px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  border-left: 3px solid transparent;
  transition: all var(--transition-fast);
}

.commander-row:first-child {
  border-top: 1px solid var(--color-border);
}

.commander-row:hover {
  background-color: var(--color-background-soft);
}

.commander-row.top-commander {
  background-color: rgba(217, 119, 6, 0.05);
  border-left-color: var(--color-primary);
}

.col-commander {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.commander-name {
  font-size: 1rem;
  font-weight: 600;
}

.commander-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.commander-link:hover {
  color: var(--color-primary);
}

.commander-info {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.mana-symbol-sm {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.identity-label {
  font-size: 0.8125rem;
  color: var(--color-text-soft);
  margin-left: 0.25rem;
}

.col-count {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
}

.col-percent {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.9375rem;
  color: var(--color-text-soft);
}

.col-bar {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.bar-bg {
  flex: 1;
  background-color: var(--color-background-soft);
  border-radius: 0.375rem;
  height: 14px;
  overflow: hidden;
}

.bar-commander {
  background: linear-gradient(135deg, var(--color-primary), var(--color-brown));
  height: 100%;
  border-radius: 0.375rem;
  transition: width var(--transition-base);
}

/* Collapse functionality */
.commander-row.hidden-row {
  display: none;
}

.expand-button-container {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
}

.expand-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  color: var(--color-white);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.expand-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.expand-button:active {
  transform: translateY(0);
}

.chevron-icon {
  transition: transform var(--transition-base);
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .color-pills {
    flex-direction: column;
  }

  .color-pill {
    min-width: 100%;
  }

  .color-bar {
    flex-wrap: wrap;
  }

  .bar-track {
    flex-basis: 100%;
  }

  .guild-row {
    grid-template-columns: 1fr 60px;
    gap: 0.5rem;
  }

  .guild-percentage,
  .guild-bar {
    grid-column: 1 / -1;
  }

  .col-percent,
  .col-bar {
    display: none;
  }

  .commander-row {
    grid-template-columns: 2fr 60px;
  }
}
</style>

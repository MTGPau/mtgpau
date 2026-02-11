<template>
  <div v-if="results" class="tournament-results">
    <div class="results-header">
      <h2>{{ results.eventName }}</h2>
      <p class="event-date">{{ results.date }} • {{ results.playerCount }} joueurs</p>

      <div v-if="results.externalLinks" class="external-links">
        <a
          v-if="results.externalLinks.mtgtop8"
          :href="results.externalLinks.mtgtop8"
          target="_blank"
          rel="noopener noreferrer"
          class="external-link"
        >
          <img
            src="https://www.mtgtop8.com/graph/title.png"
            alt="MTGTop8"
            class="external-logo"
          />
        </a>
        <a
          v-if="results.externalLinks.melee"
          :href="results.externalLinks.melee"
          target="_blank"
          rel="noopener noreferrer"
          class="external-link"
        >
          <img
            src="https://melee.gg/images/logo.png"
            alt="Melee"
            class="external-logo melee-logo"
          />
        </a>
      </div>
    </div>

    <!-- Card Preview for tables -->
    <div id="card-preview" class="card-preview">
      <img id="card-preview-img" src="" alt="Card preview" />
    </div>

    <!-- Podium for Top 2 with card images -->
    <div v-if="results.top8 && results.top8.length >= 2" class="podium-section">
      <div class="podium-container">
        <!-- 1st Place -->
        <div class="podium-place first-place">
          <div class="podium-rank">
            <div class="rank-medal gold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="trophy-icon"
              >
                <path
                  d="M20 7h-1.209A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2h-7C6.57 2 5 3.57 5 5.5c0 .596.107 1.169.209 1.5H4c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2h.5c.313 2.317 1.946 4.232 4.141 4.868C8.23 19.375 7.5 20.603 7.5 22h9c0-1.397-.73-2.625-1.141-3.632C17.554 17.732 19.187 15.817 19.5 13.5h.5c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-1.5 7c-1.934 0-3.5-1.566-3.5-3.5V4h.5c.827 0 1.5.673 1.5 1.5V9c0 .551.448 1 1 1h1.5v1.5c0 1.378-1.122 2.5-2.5 2.5zm-10 0C6.622 14 5.5 12.878 5.5 11.5V10H7c.552 0 1-.449 1-1V5.5c0-.827.673-1.5 1.5-1.5H10v6.5c0 1.934-1.566 3.5-3.5 3.5z"
                />
              </svg>
            </div>
          </div>
          <div class="card-image-container">
            <img
              :src="`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(results.top8[0]?.commander || '')}&format=image&version=normal`"
              :alt="results.top8[0]?.commander"
              class="card-image"
              loading="lazy"
            />
          </div>
          <div class="player-info">
            <div class="player-name">{{ results.top8[0]?.name }}</div>
            <div class="commander-name-label">{{ results.top8[0]?.commander }}</div>
          </div>
        </div>

        <!-- 2nd Place -->
        <div class="podium-place second-place">
          <div class="podium-rank">
            <div class="rank-medal silver">2</div>
          </div>
          <div class="card-image-container">
            <img
              :src="`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(results.top8[1]?.commander || '')}&format=image&version=normal`"
              :alt="results.top8[1]?.commander"
              class="card-image"
              loading="lazy"
            />
          </div>
          <div class="player-info">
            <div class="player-name">{{ results.top8[1]?.name }}</div>
            <div class="commander-name-label">{{ results.top8[1]?.commander }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top 3-4 -->
    <div v-if="results.top8 && results.top8.length >= 4" class="results-section">
      <h3>Top 3-4</h3>
      <div class="results-table">
        <div class="table-header">
          <div class="col-rank">Place</div>
          <div class="col-player">Joueur</div>
          <div class="col-commander">Commandant</div>
        </div>
        <div
          v-for="player in results.top8.slice(2, 4)"
          :key="player.rank"
          class="table-row"
        >
          <div class="col-rank">
            <span class="rank-badge rank-top">{{ player.rank }}</span>
          </div>
          <div class="col-player">{{ player.name }}</div>
          <div class="col-commander">
            <span class="commander-name" :data-card-name="player.commander">
              {{ player.commander }}
            </span>
            <span class="color-identity-label">{{ player.colorIdentity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Top 5-8 -->
    <div v-if="results.top8 && results.top8.length > 4" class="results-section">
      <h3>Top 5-8</h3>
      <div class="results-table">
        <div class="table-header">
          <div class="col-rank">Place</div>
          <div class="col-player">Joueur</div>
          <div class="col-commander">Commandant</div>
        </div>
        <div
          v-for="player in results.top8.slice(4)"
          :key="player.rank"
          class="table-row"
        >
          <div class="col-rank">
            <span class="rank-badge">{{ player.rank }}</span>
          </div>
          <div class="col-player">{{ player.name }}</div>
          <div class="col-commander">
            <span class="commander-name" :data-card-name="player.commander">
              {{ player.commander }}
            </span>
            <span class="color-identity-label">{{ player.colorIdentity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Top 9-16 -->
    <div v-if="results.top16 && results.top16.length > 0" class="results-section">
      <h3>Top 9-16</h3>
      <div class="results-table">
        <div class="table-header">
          <div class="col-rank">Place</div>
          <div class="col-player">Joueur</div>
          <div class="col-commander">Commandant</div>
        </div>
        <div
          v-for="player in results.top16"
          :key="player.rank"
          class="table-row"
        >
          <div class="col-rank">
            <span class="rank-badge">{{ player.rank }}</span>
          </div>
          <div class="col-player">{{ player.name }}</div>
          <div class="col-commander">
            <span class="commander-name" :data-card-name="player.commander">
              {{ player.commander }}
            </span>
            <span class="color-identity-label">{{ player.colorIdentity }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { TournamentResults } from '@/types/data'

defineProps<{
  results: TournamentResults | null
}>()

// Card preview functionality for tables only
let cardPreview: HTMLElement | null = null
let cardPreviewImg: HTMLImageElement | null = null

const showCardPreview = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const cardName = target.getAttribute('data-card-name')

  if (!cardName || !cardPreview || !cardPreviewImg) return

  const scryfallUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal`

  cardPreviewImg.src = scryfallUrl
  cardPreview.style.opacity = '1'
}

const hideCardPreview = () => {
  if (cardPreview) {
    cardPreview.style.opacity = '0'
  }
}

const moveCardPreview = (e: MouseEvent) => {
  if (!cardPreview) return

  const x = e.clientX
  const y = e.clientY
  const offset = 20

  let previewX = x + offset
  let previewY = y + offset

  if (previewX + 250 > window.innerWidth) {
    previewX = x - 250 - offset
  }

  if (previewY + 350 > window.innerHeight) {
    previewY = window.innerHeight - 350 - offset
  }

  cardPreview.style.left = `${previewX}px`
  cardPreview.style.top = `${previewY}px`
}

onMounted(() => {
  cardPreview = document.getElementById('card-preview')
  cardPreviewImg = document.getElementById('card-preview-img') as HTMLImageElement

  document.addEventListener('mousemove', moveCardPreview)

  document.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('commander-name') || target.closest('.commander-name')) {
      const commanderElement = target.classList.contains('commander-name')
        ? target
        : target.closest('.commander-name') as HTMLElement

      if (commanderElement) {
        showCardPreview({ currentTarget: commanderElement } as unknown as MouseEvent)
      }
    }
  }, true)

  document.addEventListener('mouseleave', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('commander-name') || target.closest('.commander-name')) {
      hideCardPreview()
    }
  }, true)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', moveCardPreview)
})
</script>

<style scoped>
.tournament-results {
  width: 100%;
  margin-bottom: 3rem;
}

.results-header {
  text-align: center;
  margin-bottom: 3rem;
}

.results-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 1rem;
  color: var(--color-text-soft);
  margin-bottom: 1rem;
}

.external-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.external-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.external-link:hover {
  border-color: var(--color-primary);
  background-color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.external-logo {
  height: 30px;
  width: auto;
  display: block;
}

.external-logo.melee-logo {
  height: 24px;
}

/* Card Preview */
.card-preview {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 250px;
  border-radius: 14px;
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(217, 119, 6, 0.2);
  opacity: 0;
  transition: opacity 0.15s;
  overflow: hidden;
}

.card-preview img {
  width: 100%;
  display: block;
  border-radius: 14px;
}

/* Podium Section */
.podium-section {
  margin-bottom: 4rem;
}

.podium-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.podium-place {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 350px;
}

.second-place {
  padding-top: 3rem;
}

.first-place {
  max-width: 400px;
}

.podium-rank {
  margin-bottom: 1.5rem;
  z-index: 1;
}

.rank-medal {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
  box-shadow: var(--shadow-xl);
  position: relative;
}

.first-place .rank-medal {
  width: 90px;
  height: 90px;
}

.rank-medal.gold {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #8b6914;
}

.rank-medal.silver {
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
  color: #5a5a5a;
}

.trophy-icon {
  width: 48px;
  height: 48px;
}

.card-image-container {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-base);
  border: 3px solid var(--color-border);
}

.first-place .card-image-container {
  border-color: var(--color-primary);
  border-width: 4px;
  box-shadow: 0 12px 40px rgba(217, 119, 6, 0.3);
}

.card-image-container:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.first-place .card-image-container:hover {
  box-shadow: 0 16px 50px rgba(217, 119, 6, 0.4);
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}

.player-info {
  margin-top: 1.5rem;
  text-align: center;
  width: 100%;
}

.player-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.first-place .player-name {
  font-size: 1.75rem;
}

.commander-name-label {
  font-size: 1rem;
  color: var(--color-text-soft);
  font-weight: 500;
  line-height: 1.4;
}

/* Results Table */
.results-section {
  margin-bottom: 2.5rem;
}

.results-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.results-table {
  background-color: var(--color-white);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 2fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  color: var(--color-white);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 2fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-fast);
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: var(--color-background-soft);
}

.col-rank {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-weight: 700;
  font-size: 0.9375rem;
  border: 2px solid var(--color-border);
}

.rank-badge.rank-top {
  background: linear-gradient(135deg, #cd7f32, #e39d57);
  color: var(--color-white);
  border-color: #cd7f32;
}

.col-player {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--color-text);
}

.col-commander {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}

.col-commander .commander-name {
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.col-commander .commander-name:hover {
  color: var(--color-primary);
}

.color-identity-label {
  font-size: 0.75rem;
  color: var(--color-text-soft);
}


@media (max-width: 768px) {
  .podium-container {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .first-place,
  .second-place {
    max-width: 100%;
    width: 100%;
  }

  .card-image-container {
    max-width: 350px;
    margin: 0 auto;
  }

  .table-header,
  .table-row {
    grid-template-columns: 60px 1fr;
    gap: 0.5rem;
    padding: 1rem;
  }

  .col-commander {
    grid-column: 2;
  }

  .col-player {
    font-size: 0.9375rem;
  }

  .results-header h2 {
    font-size: 1.5rem;
  }
}
</style>

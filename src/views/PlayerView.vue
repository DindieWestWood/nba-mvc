<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/dataStore'
import { usePlayerHeadshot } from '@/composables/usePlayerHeadshot'
import Card from '@/components/Card.vue'
import Tag from '@/components/Tag.vue'

const route = useRoute()
const leaderboardStore = useDataStore()
const { getHeadshotUrl } = usePlayerHeadshot();
const { leaderboardData } = storeToRefs(leaderboardStore)

const playerId = computed(() => String(route.params.id ?? ''))

const ensureData = () => leaderboardStore.ensureData()

const headshotUrl = computed(() => playerContract.value?.id ? getHeadshotUrl('medium', playerContract.value.id) : null)

const sortedPlayers = computed(() => {
  if (!leaderboardData.value?.players?.length) return []
  return [...leaderboardData.value.players].sort((a, b) => b.contract.score - a.contract.score)
})

const playerContract = computed(() => {
  if (!playerId.value) return null
  return sortedPlayers.value.find((player) => String(player.id) === playerId.value) ?? null
})

const playerRank = computed(() => {
  const index = sortedPlayers.value.findIndex((player) => player === playerContract.value)
  return index >= 0 ? index + 1 : null
});

const summaryStats = computed(() => {
  return [
    {
      label: 'SCR.',
      value: playerContract.value ? playerContract.value.contract.score.toFixed(2) : '—',
    },
    {
      label: 'AVAIL.',
      title: 'availability',
      value: playerContract.value ? playerContract.value.contract.availability.toFixed(2) : '—',
    },
    {
      label: 'IMPCT.',
      title: 'impact',
      value: playerContract.value ? playerContract.value.contract.impact.toFixed(2) : '—',
    },
    {
      label: 'PERF.',
      title: 'performance',
      value: playerContract.value ? playerContract.value.contract.performance.toFixed(2) : '—',
    },
  ]
})

onMounted(() => {
  ensureData().catch((err) => {
    console.error('Failed to load player', err)
  })
})
</script>

<template>
  <div class="player-view">
    <div class="player-view__header">
      <span class="player-view__header-background"></span>
      <div class="player-view__headshot">
        <img v-if="headshotUrl" :src="headshotUrl" :alt="playerContract?.name" />
      </div>
      <div class="player-view__description">
        <p class="player-view__rank">
          <strong>{{ playerRank }}</strong>/{{ sortedPlayers.length }}
        </p>
        <h2 class="player-view__name">
          {{ playerContract?.name }}
        </h2>
        <p class="player-view__info">#{{ playerContract?.jersey_number }} | {{ playerContract?.positions.join(', ') }} | {{  }}</p>
          
        <div class="player-view__stats-summary-container">
          <Card class="player-view__stats-summary">
            <dl>
              <div v-for="stat in summaryStats" :key="stat.label">
                <dt :title="stat.title">{{ stat.label }}</dt>
                <dd aria-describedby="">
                  <Tag size="small">{{ stat.value }}</Tag>
                </dd>
              </div>
            </dl>
          </Card>
          <div class="player-view__stats-summary-legends" aria-hidden="true">
            <div id="above-league-median-legend" class="player-view__stats-summary-legend">
              <Tag size="small"></Tag>
              <span >Above Median</span>
            </div>
            <div id="below-league-median-legend" class="player-view__stats-summary-legend">
              <Tag size="small" color-sheme="red"></Tag>
              <span >Below Median</span>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<style scoped lang="scss">
.player-view {
  display: flex;
  flex-direction: column;

  &__header {
    display: grid;
    position: relative;
  }

  &__header-background {
    grid-area: 1 / 1 / 2 / 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--player-view-header-bg);
    z-index: 0;
    box-shadow: inset 0 -4px 6px rgba(0, 0, 0, 0.1);
  }

  &__headshot {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    max-height: 220px;
    padding-top: 2rem;
    z-index: 1;

    img {
      object-fit: contain;
      max-height: 100%;
      max-width: 100%;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    gap: 0.5rem;
  }

  &__rank {
    font-size: 12px;

    & strong {
      font-weight: bold;
      font-size: 16px;
    }
  }

  &__name {
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
  }

  &__info {
    color: var(--text-secondary-color);
    font-size: 12px;
  }

  &__stats-summary-container {
    max-width: 380px;
  }

  &__stats-summary {
    margin-top: 2rem;
    padding: 1rem;

    dl {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: .5rem;
      justify-content: space-between;

      div {
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 100%;&

        dt {
          font-size: 12px;
          color: var(--text-secondary-color);
          margin-left: .5rem;
        }

        dd {
          margin: 0;

          & > * {
            width: 100%;
          }
        }
      }
    }
  }

  &__stats-summary-legends {
    display: flex;
    flex-wrap: wrap;
    padding: 0 1rem;
    row-gap: .25rem;
    column-gap: 1rem;
    justify-content: center;

    margin-top: .5rem;
  }

  &__stats-summary-legend {
    display: flex;
    align-items: stretch;
    gap: .5rem;
    font-size: 12px;
    color: var(--text-secondary-color);
    text-align: left;

    & > *:first-child {
      min-width: 40px;
    }
  }
}

@media screen and (min-width: 360px) {
  .player-view {
    &__stats-summary {
      dl {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  
}
</style>

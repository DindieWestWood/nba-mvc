<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import PlayerCard from '@/components/PlayerCard.vue'
import Tag from '@/components/Tag.vue'
import { useDataStore } from '@/stores/dataStore'
import type { PlayerContract } from '@/services/contractsService'
import { useNumberTransform } from '@/transforms/number.transform'

const route = useRoute()
const leaderboardStore = useDataStore()
const { leaderboardData, isLoading, error } = storeToRefs(leaderboardStore)
const { numberToShortUSD } = useNumberTransform()

const playerId = computed(() => String(route.params.id ?? ''))

const ensureData = () => leaderboardStore.ensureData()

const getSalaryValue = (player: PlayerContract): number => {
  const { salary } = player.contract
  return (
    salary.y1 ??
    salary.y2 ??
    salary.y3 ??
    salary.y4 ??
    salary.y5 ??
    salary.y6 ??
    0
  )
}

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
})

const playerCardData = computed(() => {
  const player = playerContract.value
  if (!player) return null
  return {
    id: String(player.id),
    name: player.name,
    rank: playerRank.value ?? undefined,
    team: leaderboardData.value?.teams?.find((team) => team.id === player.team_id)?.name ?? '',
    salary: getSalaryValue(player),
    generalScore: player.contract.score,
  }
})

const statsList = computed(() => {
  const player = playerContract.value
  if (!player) return []
  return [
    { label: 'Contract score', value: player.contract.score.toFixed(2) },
    { label: 'Performance', value: player.contract.performance.toFixed(2) },
    { label: 'Impact', value: player.contract.impact.toFixed(2) },
    { label: 'Availability', value: player.contract.availability.toFixed(2) },
    { label: 'Cost', value: numberToShortUSD(player.contract.salary.y1 ?? 0) },
  ]
})

onMounted(() => {
  ensureData().catch((err) => {
    console.error('Failed to load player', err)
  })
})
</script>

<template>
  <section class="player-view">
    <div v-if="isLoading" class="player-view__status">Loading player data…</div>
    <div v-else-if="error" class="player-view__status">Unable to load player data.</div>
    <template v-else>
      <PlayerCard
        v-if="playerCardData"
        class="player-view__card"
        :player="playerCardData"
      />
      <div v-else class="player-view__status">
        Player not found.
      </div>

      <div v-if="playerContract" class="player-view__details">
        <h2>{{ playerContract.name }}</h2>
        <p class="player-view__meta">
          Team:
          {{
            leaderboardData?.teams?.find((team) => team.id === playerContract?.team_id)?.name ??
            '—'
          }}
        </p>
        <ul class="player-view__stats">
          <li v-for="stat in statsList" :key="stat.label">
            <span>{{ stat.label }}</span>
            <Tag size="small">{{ stat.value }}</Tag>
          </li>
        </ul>
      </div>
    </template>
  </section>
</template>

<style scoped>
.player-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 4rem;
}

.player-view__card {
  max-width: 600px;
}

.player-view__status {
  padding: 2rem 0;
  color: var(--secondary);
}

.player-view__details h2 {
  margin: 0;
}

.player-view__stats {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.player-view__stats li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

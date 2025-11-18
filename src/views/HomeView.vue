<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PlayerCard from '../components/PlayerCard.vue'
import Headline from '@/components/Headline.vue'
import { useLeaderboardStore } from '@/stores/leaderboardStore'
import type { PlayerContract } from '@/services/contractsService'

const { t } = useI18n()
const leaderboardStore = useLeaderboardStore()
const { leaderboardData, isLoading, error } = storeToRefs(leaderboardStore)

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

const teamLookup = computed(() => {
  const map = new Map<number, string>()
  leaderboardData.value?.teams?.forEach((team) => {
    map.set(team.id, team.name)
  })
  return map
})

const topPlayers = computed(() => {
  if (!leaderboardData.value?.players?.length) {
    return []
  }

  const teams = teamLookup.value

  return leaderboardData.value.players.slice(0, 10).map((player, index) => ({
    id: String(player.id),
    name: player.name,
    rank: index + 1,
    number: undefined,
    positions: undefined,
    team: teams.get(player.team_id) ?? '',
    salary: getSalaryValue(player),
    generalScore: player.contract.score,
  }))
})

const primaryPlayers = computed(() => topPlayers.value.slice(0, 5))
const condensedPlayers = computed(() => topPlayers.value.slice(5, 10))

onMounted(() => {
  leaderboardStore.ensureLeaderboardData().catch((err) => {
    console.error('Failed to load leaderboard', err)
  })
})
</script>

<template>
  <section>
    <Headline />
    <p>{{ t('sections.home.description') }}</p>
  </section>

  <section class="leaderboard">
    <h2>{{ t('sections.leaderboard.title') }}</h2>

    <p v-if="isLoading" class="leaderboard-status">Loading leaderboard…</p>
    <p v-else-if="error" class="leaderboard-status">Unable to load leaderboard.</p>
    <template v-else>
      <div class="leaderboard-grid">
        <PlayerCard
          v-for="player in primaryPlayers"
          :key="player.id ?? player.rank"
          class="leaderboard-player"
          :player="player"
        />
      </div>

      <div class="leaderboard-grid condensed">
        <PlayerCard
          v-for="player in condensedPlayers"
          :key="player.id ?? player.rank"
          class="leaderboard-player"
          :player="player"
          collapsed
        />
      </div>
    </template>
  </section>
</template>

<style scoped>
.leaderboard {
  padding-bottom: 4rem;
}

.leaderboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.leaderboard-grid.condensed {
  margin-top: 1.5rem;
}

.leaderboard-status {
  margin-top: 1rem;
  color: var(--secondary);
}

.leaderboard-player {
  width: 100%;
}
</style>

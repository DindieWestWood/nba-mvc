<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PlayerCard from '../components/PlayerCard.vue'
import Headline from '@/components/Headline.vue'
import { useLeaderboardStore } from '@/stores/leaderboardStore'
import type { PlayerContract } from '@/services/contractsService'
import Tag from '@/components/Tag.vue'
import PlayerListCard from '@/components/PlayerListCard.vue'
import { useNumberTransform } from '@/transforms/number.transform'

const { t } = useI18n()
const leaderboardStore = useLeaderboardStore()
const { numberToShortUSD } = useNumberTransform()
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

const player10minOrMore = computed(() =>
  leaderboardData.value?.players?.filter((player) => player.minutes_per_game > 10) ?? [],
)

const buildTopMetricList = (valueSelector: (player: PlayerContract) => number) =>
  computed(() =>
    player10minOrMore.value
      .filter((player) => valueSelector(player) > 0)
      .slice()
      .sort((a, b) => valueSelector(a) - valueSelector(b))
      .slice(0, 5),
  )

const topScorers = buildTopMetricList((player) => player.contract.dollars_per_point)
const topRebounders = buildTopMetricList((player) => player.contract.dollars_per_rebound)
const topPassers = buildTopMetricList((player) => player.contract.dollars_per_assist)
const topStealers = buildTopMetricList((player) => player.contract.dollars_per_steal)
const topBlockers = buildTopMetricList((player) => player.contract.dollars_per_block)

const statsCategories = computed(() => [
  {
    key: 'scorers',
    labelKey: 'sections.stats.scorers',
    headline: '$/PTS',
    players: topScorers.value,
    accessor: (player: PlayerContract) => player.contract.dollars_per_point,
    highlightLeader: true,
  },
  {
    key: 'rebounders',
    labelKey: 'sections.stats.rebounders',
    headline: '$/REB',
    players: topRebounders.value,
    accessor: (player: PlayerContract) => player.contract.dollars_per_rebound,
  },
  {
    key: 'passers',
    labelKey: 'sections.stats.passers',
    headline: '$/AST',
    players: topPassers.value,
    accessor: (player: PlayerContract) => player.contract.dollars_per_assist,
  },
  {
    key: 'stealers',
    labelKey: 'sections.stats.stealers',
    headline: '$/STL',
    players: topStealers.value,
    accessor: (player: PlayerContract) => player.contract.dollars_per_steal,
  },
  {
    key: 'blockers',
    labelKey: 'sections.stats.blockers',
    headline: '$/BLK',
    players: topBlockers.value,
    accessor: (player: PlayerContract) => player.contract.dollars_per_block,
  },
])

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
      <div class="cards-grid">
        <PlayerCard
          v-for="player in primaryPlayers"
          :key="player.id ?? player.rank"
          class="leaderboard-player"
          :player="player"
        />
        <PlayerListCard :list-label="t('sections.leaderboard.endoftop10')" headline="#6-10" :players="condensedPlayers">
          <template #detail="{ player }">
            <Tag size="small">
              {{ player.generalScore?.toFixed(2) ?? '-' }}
            </Tag>
          </template>
        </PlayerListCard>
      </div>
    </template>
  </section>

  <section class="stats">
    <h2>{{ t('sections.stats.title') }}</h2>
    <div class="cards-grid">
      <PlayerListCard
        v-for="category in statsCategories"
        :key="category.key"
        :list-label="t(category.labelKey)"
        :headline="category.headline"
        :players="category.players"
      >
        <template #term="{ player, index }">
          <template v-if="index">
            {{ player.name }}
          </template>
          <strong v-else>{{ player.name }}</strong>
        </template>

        <template #detail="{ player, index }">
          <span v-if="index" class="light">
            {{ numberToShortUSD(category.accessor(player)) }}
          </span>
          <Tag v-else size="small">
            {{ numberToShortUSD(category.accessor(player)) }}
          </Tag>
        </template>
      </PlayerListCard>
    </div>
    
  </section>
</template>

<style scoped>
.leaderboard,
.stats {
  padding-bottom: 4rem;
}

.cards-grid {
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

strong {
  font-weight: bold;
}

.light {
  font-size: 0.8rem;
}
</style>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PlayerCard from '../components/PlayerCard.vue'
import Headline from '@/components/Headline.vue'
import { useDataStore } from '@/stores/dataStore'
import type { PlayerContract } from '@/services/contractsService'
import Tag from '@/components/Tag.vue'
import PlayerListCard from '@/components/PlayerListCard.vue'
import { useNumberTransform } from '@/transforms/number.transform'
import MoreCard from '@/components/MoreCard.vue'

interface LeaderboardCardPlayer {
  id: string
  name: string
  rank: number
  number?: number
  positions?: string[] | string
  team: string
  salary: number
  generalScore: number
  link: string
  headshot?: string
}

interface StatsCategoryEntry {
  id: string
  name: string
  value: number
  link: string
  headshot?: string
}

interface StatsCategory {
  key: string
  labelKey: string
  headline: string
  players: StatsCategoryEntry[]
  highlightLeader?: boolean
}

const { t } = useI18n()
const dataStore = useDataStore()
const { numberToShortUSD } = useNumberTransform()
const { leaderboardData, isLoading, error, playersCount } = storeToRefs(dataStore)

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

const playerLink = (id: string | number) => `/players/${id}`

const teamLookup = computed(() => {
  const map = new Map<number, string>()
  leaderboardData.value?.teams?.forEach((team) => {
    map.set(team.id, team.name)
  })
  return map
})

const topPlayers = computed<LeaderboardCardPlayer[]>(() => {
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
    link: playerLink(player.id),
    headshot: player.headshot,
  }))
})

const primaryPlayers = computed(() => topPlayers.value.slice(0, 5))

const player10minOrMore = computed<PlayerContract[]>(() =>
  leaderboardData.value?.players?.filter((player) => player.minutes_per_game > 10) ?? [],
)

const buildTopMetricList = (valueSelector: (player: PlayerContract) => number) =>
  computed<PlayerContract[]>(() =>
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

const mapToStatsEntries = (
  players: PlayerContract[],
  valueSelector: (player: PlayerContract) => number,
): StatsCategoryEntry[] =>
  players.map((player) => ({
    id: String(player.id),
    name: player.name,
    value: valueSelector(player),
    link: playerLink(player.id),
    headshot: player.headshot,
  }))

const statsCategories = computed<StatsCategory[]>(() => [
  {
    key: 'scorers',
    labelKey: 'sections.stats.scorers',
    headline: '$/PTS',
    players: mapToStatsEntries(topScorers.value, (player) => player.contract.dollars_per_point),
    highlightLeader: true,
  },
  {
    key: 'rebounders',
    labelKey: 'sections.stats.rebounders',
    headline: '$/REB',
    players: mapToStatsEntries(topRebounders.value, (player) => player.contract.dollars_per_rebound),
  },
  {
    key: 'passers',
    labelKey: 'sections.stats.passers',
    headline: '$/AST',
    players: mapToStatsEntries(topPassers.value, (player) => player.contract.dollars_per_assist),
  },
  {
    key: 'stealers',
    labelKey: 'sections.stats.stealers',
    headline: '$/STL',
    players: mapToStatsEntries(topStealers.value, (player) => player.contract.dollars_per_steal),
  },
  {
    key: 'blockers',
    labelKey: 'sections.stats.blockers',
    headline: '$/BLK',
    players: mapToStatsEntries(topBlockers.value, (player) => player.contract.dollars_per_block),
  },
])

onMounted(() => {
  dataStore.ensureData().catch((err) => {
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
          :href="player.link"
        />
        <MoreCard
          background-text="#" 
          headline="Leaderboad"
          href="/leaderboard"
          :tag-label="`${ playersCount } players`"
        />
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
        :href="category.players[0]?.link ?? '#'"
      >
        <template #term="{ player, index }">
          <template v-if="index">
            {{ player.name }}
          </template>
          <strong v-else>{{ player.name }}</strong>
        </template>

        <template #detail="{ player, index }">
          <span v-if="category.highlightLeader && index" class="light">
            {{ numberToShortUSD(player.value) }}
          </span>
          <Tag v-else size="small">
            {{ numberToShortUSD(player.value) }}
          </Tag>
        </template>
      </PlayerListCard>
      <MoreCard
          background-text="$" 
          headline="Statistics"
          href="/stats"
          :tag-label="`${ playersCount } players`"
        />
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

.leaderboard-count {
  margin-top: 0.5rem;
  color: var(--secondary);
  font-size: 0.875rem;
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

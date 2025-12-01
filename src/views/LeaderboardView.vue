<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import PlayerCard from '@/components/PlayerCard.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/dataStore'
import { storeToRefs } from 'pinia'
import { getTeamAbbr } from '@/utils/teams'

const { t } = useI18n()
const dataStore = useDataStore()
const { leaderboardData, isLoading, error } = storeToRefs(dataStore)
const search = ref<string>('')
const visibleCount = ref(25)
const observerTarget = ref<HTMLElement | null>(null)

const ensureData = () => dataStore.ensureData()

const teamLookup = computed(() => {
  const map = new Map<number, string>()
  leaderboardData.value?.teams?.forEach((team) => {
    map.set(team.id, getTeamAbbr(team.name))
  })
  return map
})

const sortedPlayers = computed(() => {
  if (!leaderboardData.value?.players?.length) return []
  return [...leaderboardData.value.players].sort((a, b) => b.contract.score - a.contract.score)
})

const filteredPlayers = computed(() => {
  const normalize = (value?: string) => {
    if (!value) return ''
    // Remove accents in a cross-browser way
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  const term = normalize(search.value.trim())
  if (!term) return sortedPlayers.value

  return sortedPlayers.value.filter((player) => {
    const name = normalize(player.name)
    const team = normalize(teamLookup.value.get(player.team_id))
    return name.includes(term) || team.includes(term)
  })
})

const visiblePlayers = computed(() => filteredPlayers.value.slice(0, visibleCount.value))

const playerRankMap = computed(() => {
  const map = new Map<number, number>()
  sortedPlayers.value.forEach((player, index) => {
    map.set(player.id, index + 1)
  })
  return map
})

const loadMore = () => {
  if (visibleCount.value < filteredPlayers.value.length) {
    visibleCount.value += 25
  }
}

const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  ensureData().catch((err) => console.error('Failed to load leaderboard', err))

  observer.value = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadMore()
    }
  })

  if (observerTarget.value) {
    observer.value.observe(observerTarget.value)
  }
})

onUnmounted(() => {
  if (observer.value && observerTarget.value) {
    observer.value.unobserve(observerTarget.value)
  }
})

watch(
  () => observerTarget.value,
  (target) => {
    if (target && observer.value) {
      observer.value.observe(target)
    }
  },
)

watch(search, () => {
  visibleCount.value = 25
})
</script>

<template>
  <section>
    <h2>{{ t('leaderboard.title') }}</h2>
    <SearchBar v-model="search" />
    {{ search }}

    <p v-if="isLoading">Loading…</p>
    <p v-else-if="error">Unable to load leaderboard.</p>

    <div v-else class="leaderboard-list">
      <PlayerCard
        v-for="player in visiblePlayers"
        :key="player.id"
        :player="{
          id: player.id,
          name: player.name,
          rank: playerRankMap.get(player.id),
          team: getTeamAbbr(leaderboardData?.teams?.find((t) => t.id === player.team_id)?.name ?? ''),
          salary: player.contract.salary.y1 ?? 0,
          score: player.contract.score,
        }"
        :href="`/players/${player.id}`"
      />
      <div ref="observerTarget" class="sentinel" aria-hidden="true"></div>
    </div>
  </section>
</template>

<style scoped>
.leaderboard-list {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}

.sentinel {
  height: 1px;
}
</style>

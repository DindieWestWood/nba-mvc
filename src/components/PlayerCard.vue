<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import LinkCard from './LinkCard.vue'
import Tag from './Tag.vue'
import { usePlayerHeadshot } from '@/composables/usePlayerHeadshot'
import { useNumberTransform } from '@/transforms/number.transform'

interface PlayerCardPlayer {
  id: number
  name: string
  rank?: number
  salary: number
  score: number
  team: string
  positions: string[]
  jerseyNumber?: number | string
}

const props = defineProps<{
  player: PlayerCardPlayer
}>()

const attrs = useAttrs()

const { numberToShortUSD } = useNumberTransform()
const formattedSalary = computed(() => numberToShortUSD(props.player.salary))

const formattedScore = computed(() => {
  const value = props.player.score
  if (value === undefined || value === null) return '—'
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numeric) ? numeric.toFixed(2) : '—'
})

const { getHeadshotUrl } = usePlayerHeadshot()
const headshotUrl = computed(() => getHeadshotUrl('medium', props.player.id))

const numberAndMeta = computed(() => {
  const segments: string[] = []
  if (props.player.jerseyNumber) {
    segments.push(`#${props.player.jerseyNumber}`)
  }
  if (props.player.positions?.length) {
    segments.push(props.player.positions.join(', '))
  }
  return segments.join(' | ')
})
</script>

<template>
  <LinkCard v-bind="attrs">
    <article class="player-card" :aria-label="player.name">
      <p class="player-card__rank">
        #{{ player.rank ?? '' }}
      </p>

      <dl class="player-card__stats" aria-label="Player metrics">
        <div class="player-card__stat">
          <dt>Salary</dt>
          <dd><Tag size="small">{{ formattedSalary }}</Tag></dd>
        </div>
        <div class="player-card__stat">
          <dt>Score</dt>
          <dd><Tag size="small">{{ formattedScore }}</Tag></dd>
        </div>
      </dl>
      
      <figure class="player-card__headshot">
        <img :src="headshotUrl" alt="" loading="lazy"/>
      </figure>

      <div class="player-card__details">
        <p>
          <span class="player-card__name">{{ player.name }}</span>
          <span class="player-card__team" v-if="player.team">&ensp;{{ player.team }}</span>
        </p>
        <p class="player-card__meta">{{ numberAndMeta }}</p>
      </div>
    </article>
  </LinkCard>
  
</template>

<style scoped lang="scss">
.player-card {
  width: 100%;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(4, auto);
  align-items: center;
  justify-content: center;
}

.player-card__rank {
  grid-area: 1 / 1 / 3 / 2;
  font-family: 'Bungee Shade';
  font-size: 60px;
  line-height: 100%;
  margin-bottom: 1rem;
}

.player-card__stats {
  grid-area: 3 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;

  dt {
    color: var(--text-secondary-color);
    margin-left: 0.5rem;
    font-size: 0.75rem;
  }
}

.player-card__headshot {
  grid-area: 2 / 1 / 4 / 3;
  position: relative;
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: right center;
  }
}

.player-card__details {
  grid-area: 4 / 1 / 5 / -1;
  padding: 1rem .5rem 0.5rem;
  border-top: 1px solid var(--separator-color);
}

.player-card__name {
  font-weight: bold;
  margin: 0;
}

.player-card__team {
  font-size: 0.75rem;
  color: var(--text-secondary-color);

}

.player-card__meta {
  font-size: 0.75rem;
  color: var(--text-secondary-color);
}
</style>

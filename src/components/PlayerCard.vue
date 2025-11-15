<script setup lang="ts">
import { computed } from 'vue'
import Card from './Card.vue'
import Tag from './Tag.vue'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
})

const formattedSalary = computed(() => {
  const value = props.player.salary
  if (value === undefined || value === null || value === '') return '—'
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numeric) ? currencyFormatter.format(numeric) : '—'
})

const formattedScore = computed(() => {
  const value = props.player.generalScore
  if (value === undefined || value === null || value === '') return '—'
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numeric) ? numeric.toFixed(2) : '—'
})

const headshotUrl = computed(() => {
  if (props.player.headshot) {
    return props.player.headshot
  }

  if (props.player.id) {
    return `https://cdn.nba.com/headshots/nba/latest/1040x760/${props.player.id}.png`
  }

  return 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png'
})

const numberAndMeta = computed(() => {
  const segments = []
  if (props.player.number) {
    segments.push(`#${props.player.number}`)
  }
  if (props.player.positions?.length) {
    const positions = Array.isArray(props.player.positions)
      ? props.player.positions.join(', ')
      : props.player.positions
    segments.push(positions)
  }
  if (props.player.team) {
    segments.push(props.player.team)
  }
  return segments.join(' | ')
})
</script>

<template>
  <Card :clickable="true">
    <article class="player" :aria-label="player.name">
      <p class="player-rank">
        #{{ player.rank ?? '' }}
      </p>

      <dl class="player-stats" aria-label="Player metrics">
        <div class="player-stat">
          <dt>Salary</dt>
          <dd><Tag>{{ formattedSalary }}</Tag></dd>
        </div>
        <div class="player-stat">
          <dt>Score</dt>
          <dd><Tag>{{ formattedScore }}</Tag></dd>
        </div>
      </dl>
      
      <figure class="player-headshot">
        <img
          :src="headshotUrl"
          alt=""
          loading="lazy"
        />
      </figure>

      <div class="player-details">
        <h3>{{ player.name }}</h3>
        <p>{{ numberAndMeta }}</p>
      </div>
    </article>
  </Card>
  
</template>

<style scoped>
.player {
  width: 100%;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(4, auto);
  align-items: center;
  justify-content: center;
}

.player-rank {
  grid-area: 1 / 1 / 3 / 2;
  font-family: 'Bungee Shade';
  font-size: 60px;
  line-height: 100%;
  margin-bottom: 1rem;
}

.player-stats {
  grid-area: 3 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;

  dt {
    color: var(--secondary);
    margin-left: 0.5rem;
    font-size: 0.75rem;
  }
}

.player-headshot {
  grid-area: 2 / 2 / 4 / 3;
  overflow: hidden;
  border: 1px solid red;
  display: flex;


  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
}

.player-details {
  grid-area: 4 / 1 / 5 / -1;
  padding: 1rem .5rem 0.5rem;
  border-top: 1px solid var(--separator-color);
}

.player-details h3 {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.player-details p {
  font-size: 0.75rem;
  color: var(--secondary);
}
</style>

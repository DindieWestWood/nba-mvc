<script setup lang="ts">
import { computed } from 'vue'

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
  <article class="player-card" :aria-label="player.name">
    <div class="player-card__halo" aria-hidden="true">
      {{ player.number ?? '' }}
    </div>

    <dl class="player-card__stats" aria-label="Player metrics">
      <div class="player-card__stat">
        <dt>Salary</dt>
        <dd>{{ formattedSalary }}</dd>
      </div>
      <div class="player-card__stat">
        <dt>Gen. Score</dt>
        <dd>{{ formattedScore }}</dd>
      </div>
    </dl>

    <figure class="player-card__figure">
      <img
        :src="headshotUrl"
        :alt="`${player.name} headshot`"
        loading="lazy"
      />
    </figure>

    <div class="player-card__details">
      <h3>{{ player.name }}</h3>
      <p>{{ numberAndMeta }}</p>
    </div>
  </article>
</template>

<style scoped>
.player-card {
  position: relative;
  width: min(360px, 100%);
  border-radius: 32px;
  padding: 1.25rem 1.5rem 0;
  background: radial-gradient(120% 120% at 0% 0%, #172360 0%, #04031a 65%);
  color: #dbeafe;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(2, 6, 23, 0.65);
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.player-card__halo {
  position: absolute;
  inset: 1rem auto auto 1.25rem;
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  opacity: 0.05;
  color: #c7d2fe;
  pointer-events: none;
}

.player-card__stats {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin: 0;
}

.player-card__stat {
  text-align: right;
  color: rgba(226, 232, 240, 0.8);
}

.player-card__stat dt {
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.15rem;
}

.player-card__stat dd {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fdf4ff;
  margin: 0;
}

.player-card__figure {
  margin: 0 auto;
  margin-top: auto;
  width: 240px;
}

.player-card__figure img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(2, 6, 23, 0.45));
}

.player-card__details {
  padding: 1.25rem 0 1.5rem;
}

.player-card__details h3 {
  font-size: 1.5rem;
  margin: 0;
  color: #f8fafc;
}

.player-card__details p {
  margin-top: 0.25rem;
  color: rgba(226, 232, 240, 0.7);
}
</style>

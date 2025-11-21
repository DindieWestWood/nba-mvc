<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import Card from './Card.vue'
import Tag from './Tag.vue'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 2
});

const props = defineProps({
  player: {
    type: Object,
    required: true
  },
  collapsed: {
    type: Boolean,
    required: false
  },
})

const attrs = useAttrs()

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
  <Card v-bind="attrs" clickable>
    <article class="player-card" :class="{ collapsed: props.collapsed }" :aria-label="player.name">
      <p class="player-card__rank">
        #{{ player.rank ?? '' }}
      </p>

      <dl class="player-card__stats" aria-label="Player metrics">
        <div class="player-card__stat">
          <dt>Salary</dt>
          <dd><Tag :size="props.collapsed ? 'small' : 'regular'">{{ formattedSalary }}</Tag></dd>
        </div>
        <div class="player-card__stat">
          <dt>Score</dt>
          <dd><Tag :size="props.collapsed ? 'small' : 'regular'">{{ formattedScore }}</Tag></dd>
        </div>
      </dl>
      
      <figure class="player-card__headshot" v-if="!collapsed">
        <img
          :src="headshotUrl"
          alt=""
          loading="lazy"
        />
      </figure>

      <div class="player-card__details">
        <h3>{{ player.name }}</h3>
        <p>{{ numberAndMeta }}</p>
      </div>
    </article>
  </Card>
  
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
    color: var(--secondary);
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

.player-card__details h3 {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.player-card__details p {
  font-size: 0.75rem;
  color: var(--secondary);
}

.collapsed {
  .player-card__stats {
    padding-left: 0.5rem;
    grid-area: 1 / 2 / 3 / 3;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: end;
  }
}

</style>

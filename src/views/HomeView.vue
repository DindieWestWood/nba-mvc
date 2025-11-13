<script setup>
import { useI18n } from 'vue-i18n'
import PlayerCard from '../components/PlayerCard.vue'

const { t } = useI18n()

const featuredPlayer = {
  id: '1628973',
  name: 'Jalen Brunson',
  number: 11,
  positions: ['PG', 'SG'],
  team: 'New York Knicks',
  salary: 24960000,
  generalScore: 11.25,
  headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628973.png'
}
</script>

<template>
  <div class="description">
    <p class="h1-prefix">NBA's</p>
    <h1>Most Valuable Contract</h1>
    <p>{{ t('sections.home.description') }}</p>
  </div>

  <section class="featured-player">
    <PlayerCard :player="featuredPlayer" />

    <div class="featured-player__copy">
      <p>{{ t('sections.leaderboard.description') }}</p>
      <p class="featured-player__hint">
        {{ t('sections.home.description') }}
      </p>
    </div>
  </section>

  <section>
    <h2>{{ t('sections.leaderboard.title') }}</h2>

  </section>
</template>

<style scoped>
.description {
  margin-bottom: 72px;
}

.h1-prefix {
  margin-bottom: 0.5rem;
  color: var(--color-nav-link);
}

.featured-player {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 72px;
}

.featured-player__copy {
  flex: 1;
  min-width: 240px;
}

.featured-player__hint {
  margin-top: 1rem;
  color: var(--color-nav-link);
  opacity: 0.7;
}

@media (max-width: 640px) {
  .featured-player {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

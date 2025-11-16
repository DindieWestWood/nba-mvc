<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PlayerCard from '../components/PlayerCard.vue'
import Headline from '@/components/Headline.vue'

const { t } = useI18n()

const featuredPlayer = {
  id: '1628973',
  name: 'Jalen Brunson',
  rank: 42,
  number: 11,
  positions: ['PG', 'SG'],
  team: 'New York Knicks',
  salary: 24960000,
  generalScore: 11.25,
  headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628973.png'
}
</script>

<template>
  <section>
    <Headline/>
    <p>{{ t('sections.home.description') }}</p>
  </section>

  <section>
    <h2>{{ t('sections.leaderboard.title') }}</h2>
    <PlayerCard class="leaderboard-player" :player="featuredPlayer" />
    <PlayerCard class="leaderboard-player" :player="featuredPlayer" collapsed/>
  </section>
</template>

<style scoped>
.description {
  margin-bottom: 72px;
}

.featured-player {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 72px;
}

.leaderboard-player {
  width: 100%;
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

section:last-child {
  padding-bottom: 4rem;
}

@media (max-width: 640px) {
  .featured-player {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="description">
    <p class="h1-prefix">NBA's</p>
    <h1>Most Valuable Contract</h1>
    <p>{{ t('sections.home.description') }}</p>
  </div>

  <section>
    <h2>{{ t('sections.leaderboard.title') }}</h2>

  </section>
</template>

<style scoped>
  .description {
    margin-bottom: 120px;
  }

  .h1-prefix {
    margin-bottom: .5rem;
    color: var(--stone-color-400);
  }
</style>
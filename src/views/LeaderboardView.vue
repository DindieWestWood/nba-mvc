<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="panel">
    <h1>{{ t('sections.leaderboard.title') }}</h1>
    <p>{{ t('sections.leaderboard.description') }}</p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section >
    <h2>{{ t('sections.stats.title') }}</h2>
    <p>{{ t('sections.stats.description') }}</p>
  </section>
</template>

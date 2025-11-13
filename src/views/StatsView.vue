<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="panel">
    <h1>{{ t('sections.stats.title') }}</h1>
    <p>{{ t('sections.stats.description') }}</p>
  </section>
</template>

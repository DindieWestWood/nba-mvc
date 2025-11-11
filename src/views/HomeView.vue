<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="panel">
    <h1>{{ t('sections.home.title') }}</h1>
    <p>{{ t('sections.home.description') }}</p>
  </section>
</template>

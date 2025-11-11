<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, persistLocale } from '../plugins/i18n'

const { locale, t } = useI18n()

const options = SUPPORTED_LOCALES

const currentValue = computed({
  get: () => locale.value,
  set: (next) => {
    locale.value = next
  },
})

watch(
  () => locale.value,
  (value) => {
    persistLocale(value)
  }
)
</script>

<template>
  <label class="language-switcher">
    <span class="language-switcher__label">{{ t('language.label') }}</span>
    <select
      class="language-switcher__select"
      v-model="currentValue"
      :aria-label="t('language.label')"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ t(`language.${option.value}`) }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  color: var(--color-nav-link);
}

.language-switcher__select {
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--surface-panel-border);
  background: transparent;
  color: inherit;
  font-weight: 600;
}

.language-switcher__select:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.language-switcher__label {
  font-size: 0.85rem;
}

@media (max-width: 600px) {
  .language-switcher {
    width: 100%;
    justify-content: space-between;
  }

  .language-switcher__select {
    flex: 1;
  }
}
</style>

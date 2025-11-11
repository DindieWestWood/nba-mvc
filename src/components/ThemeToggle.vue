<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()
const { theme, toggleTheme, isDark } = useTheme()

const label = computed(() =>
  isDark.value ? t('theme.toggle.toLight') : t('theme.toggle.toDark')
)

const modeLabel = computed(() => t(`theme.modeLabel.${theme.value}`))
const icon = computed(() => (isDark.value ? '🌙' : '☀️'))
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-pressed="isDark"
    :title="label"
    @click="toggleTheme"
  >
    <span class="visually-hidden">{{ label }}</span>
    <span aria-hidden="true" class="theme-toggle__icon">{{ icon }}</span>
    <span class="theme-toggle__text">{{ modeLabel }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--surface-panel-border);
  background: transparent;
  color: var(--color-nav-link);
  cursor: pointer;
  font-weight: 600;
  text-transform: capitalize;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--color-nav-link-hover-border);
}

.theme-toggle:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.theme-toggle__icon {
  font-size: 1rem;
}

.theme-toggle__text {
  font-size: 0.875rem;
}
</style>

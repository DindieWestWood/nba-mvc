<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '../composables/useNavigation'

const { t } = useI18n()
const { items } = useNavigation()
</script>

<template>
  <ul class="nav-links">
    <li v-for="item in items" :key="item.id" class="nav-links__item">
      <RouterLink
        class="nav-links__link"
        :class="{ 'nav-links__link--active': item.isActive }"
        :to="item.path"
        :aria-current="item.isActive ? 'page' : undefined"
      >
        <span class="nav-links__text">{{ t(item.labelKey) }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.nav-links {
  list-style: none;
  display: flex;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}

.nav-links__item {
  flex: 1;
}

.nav-links__link {
  display: block;
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-nav-link);
  border: 2px solid transparent;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.nav-links__link:hover {
  border-color: var(--color-nav-link-hover-border);
}

.nav-links__link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.nav-links__link--active {
  background: var(--color-nav-link-active-bg);
  color: var(--color-nav-link-active-text);
}
</style>

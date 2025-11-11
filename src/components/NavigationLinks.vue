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
        <component :is="item.icon"></component>
        <!-- <span class="nav-links__text">{{ t(item.labelKey) }}</span> -->
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.nav-links {
  list-style: none;
  display: flex;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
}

.nav-links__item {
  flex: 1;
}

.nav-links__link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  border-radius: 999px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  color: var(--color-nav-link);
  border-bottom: 2px solid transparent;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2 ease, -webkit-box-shadow 0.2 ease;
}

.nav-links__link:hover {
  background-color: var(--color-nav-link-hover-bg);
}

.nav-links__link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.nav-links__link--active,
.nav-links__link--active:hover {
  background: linear-gradient(0deg, var(--color-nav-link-active-bg-g0) 0%, var(--color-nav-link-active-bg-g100) 100%);
  color: var(--color-nav-link-active-text);
  border-bottom: 2px solid var(--accent-color-500);
  -webkit-box-shadow: inset -2px -2px 6px 4px rgba(0,0,0,0.05), 
                      inset 2px 2px 6px 4px rgba(255,255,255,0.2),
                      rgba(99, 99, 99, 0.2) 2px 2px 8px 0px;
  box-shadow: inset -2px -2px 6px 6px rgba(0,0,0,0.05), 
              inset 2px 2px 6px 6px rgba(255,255,255,0.2),
              rgba(99, 99, 99, 0.2) 2px 2px 8px 0px;
}

.nav-links__link--active:hover {
  pointer-events: none;
}

@media screen and (min-width: 1280px) {
  .nav-links {
    flex-direction: column;
  }

  .nav-links__item {
    max-width: 44px;
  }
}
</style>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '../composables/useNavigation'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useI18n()
const { items } = useNavigation()
</script>

<template>
  <nav class="primary-nav" :aria-label="t('nav.ariaLabel')">
    <div class="primary-nav__inner">
      <ul class="primary-nav__list">
        <li v-for="item in items" :key="item.id" class="primary-nav__item">
          <RouterLink
            class="primary-nav__link"
            :class="{ 'primary-nav__link--active': item.isActive }"
            :to="item.path"
            :aria-current="item.isActive ? 'page' : undefined"
          >
            <span class="primary-nav__text">{{ t(item.labelKey) }}</span>
          </RouterLink>
        </li>
      </ul>

      <div class="primary-nav__controls">
        <LanguageSwitcher />
        <ThemeToggle class="primary-nav__toggle" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.primary-nav {
  border-bottom: 1px solid var(--surface-panel-border);
  background: var(--color-nav-bg);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
}

.primary-nav__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem clamp(1rem, 4vw, 4rem);
}

.primary-nav__list {
  list-style: none;
  display: flex;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  flex: 1;
}

.primary-nav__item {
  flex: 1;
}

.primary-nav__link {
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

.primary-nav__link:hover {
  border-color: var(--color-nav-link-hover-border);
}

.primary-nav__link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.primary-nav__link--active {
  background: var(--color-nav-link-active-bg);
  color: var(--color-nav-link-active-text);
}

.primary-nav__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.primary-nav__toggle {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .primary-nav__inner {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-nav__list {
    width: 100%;
  }

  .primary-nav__item {
    flex: 1 1 auto;
  }

  .primary-nav__controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

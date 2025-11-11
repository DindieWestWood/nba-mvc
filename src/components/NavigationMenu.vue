<script setup>
import { useI18n } from 'vue-i18n'
import NavigationControls from './NavigationControls.vue'
import NavigationLinks from './NavigationLinks.vue'

const { t } = useI18n()
</script>

<template>
  <nav class="primary-nav" :aria-label="t('nav.ariaLabel')">
    <div class="primary-nav__inner">
      <NavigationLinks class="primary-nav__links" />
      <NavigationControls class="primary-nav__controls" />
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

.primary-nav__links {
  flex: 1;
}

.primary-nav__controls {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .primary-nav__inner {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-nav__links {
    width: 100%;
  }

  .primary-nav__controls {
    width: 100%;
  }
}
</style>

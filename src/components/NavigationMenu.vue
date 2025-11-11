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
      <!-- <NavigationControls class="primary-nav__controls" /> -->
    </div>
  </nav>
</template>

<style scoped>
.primary-nav {
  border-top: 1px solid var(--surface-panel-border);
  border-left: 1px solid var(--surface-panel-border);
  border-right: 1px solid var(--surface-panel-border);
  border-bottom: 3px solid var(--surface-panel-border);
  background: var(--color-nav-bg);
  position: fixed;
  bottom: 1rem;
  left: 50%;
  width: calc(100% - 2rem);
  max-width: 400px;
  transform: translateX(-50%);
  z-index: 10;
  backdrop-filter: blur(8px);
  padding: .5rem;
  border-radius: 999px;
  -webkit-box-shadow: var(--surface-panel-shadow);
  box-shadow: var(--surface-panel-shadow);
}

.primary-nav__inner {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.primary-nav__links {
  flex-basis: 0;
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

@media screen and (min-width: 1280px) {
  .primary-nav { 
    width: fit-content;
    position: relative;
    transform: unset;
    top: unset;
    left: unset;
  }
}
</style>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <div class="nav-controls">
    <LanguageSwitcher />
    <ThemeToggle class="nav-controls__toggle" />
  </div>
</template>

<style scoped>
.nav-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-controls__toggle {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .nav-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

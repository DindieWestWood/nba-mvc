<script setup>
import { RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'
</script>

<template>
  <div class="app-shell">
    <NavigationMenu />

    <main class="content" role="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: var(--surface-body);
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
}

.content {
  padding: 2rem clamp(1rem, 4vw, 4rem);
  display: grid;
  gap: 1.5rem;
}

:global(.panel) {
  background: var(--surface-panel);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--surface-panel-border);
  box-shadow: var(--surface-panel-shadow);
}

:global(.panel h1),
:global(.panel h2) {
  margin-bottom: 0.5rem;
}

:global(.panel p) {
  margin: 0;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>

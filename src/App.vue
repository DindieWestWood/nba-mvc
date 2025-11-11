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
  background: #f3f4f6;
  color: #111827;
  font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
}

.content {
  padding: 2rem clamp(1rem, 4vw, 4rem);
  display: grid;
  gap: 1.5rem;
}

.panel {
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.05);
}

.panel h1,
.panel h2 {
  margin-bottom: 0.5rem;
}

.panel p {
  margin: 0;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'
import { useLeaderboardStore } from './stores/leaderboardStore'

const leaderboardStore = useLeaderboardStore()

onMounted(() => {
  leaderboardStore.ensureLeaderboardData().catch((err) => {
    console.error('Failed to load leaderboard data', err)
  })
})
</script>

<template>
  <div class="app-shell">
    <div class="nav-ctn">
      <NavigationMenu />
    </div>

    <main class="content" role="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  width: 100vw;
  height: 100vh;
  background: var(--surface-body);
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
}

.nav-ctn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  min-height: 100vh;
  padding: 2rem clamp(1rem, 4vw, 4rem);
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

@media (min-width: 1280px) {
  .app-shell {
    grid-template-columns: auto 1fr;
  }

  .nav-ctn {
    height: 100%;
    padding: 1rem;
  }
}
</style>

import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const LeaderboardView = () => import('../views/LeaderboardView.vue')
const StatsView = () => import('../views/StatsView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView,
      meta: { title: 'Leaderboard' },
    },
    { path: '/stats', name: 'stats', component: StatsView, meta: { title: 'Stats' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

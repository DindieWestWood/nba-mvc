import { createRouter, createWebHistory, type RouterHistory, type RouteRecordRaw } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const LeaderboardView = () => import('../views/LeaderboardView.vue')
const StatsView = () => import('../views/StatsView.vue')

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardView,
    meta: { title: 'Leaderboard' },
  },
  { path: '/stats', name: 'stats', component: StatsView, meta: { title: 'Stats' } },
]

export function createAppRouter(history: RouterHistory = createWebHistory(import.meta.env.BASE_URL)) {
  return createRouter({
    history,
    routes,
    scrollBehavior() {
      return { top: 0 }
    },
  })
}

const router = createAppRouter()

export default router

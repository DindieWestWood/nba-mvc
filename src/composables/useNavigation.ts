import type { Component } from 'vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChartLine, House, LayoutList } from 'lucide-vue-next'

export type NavigationItem = {
  id: string
  labelKey: string
  path: string
  icon: Component
}

const NAV_ITEMS: ReadonlyArray<NavigationItem> = Object.freeze([
  { id: 'home', labelKey: 'nav.home', path: '/', icon: House },
  { id: 'leaderboard', labelKey: 'nav.leaderboard', path: '/leaderboard', icon: LayoutList },
  { id: 'stats', labelKey: 'nav.stats', path: '/stats', icon: ChartLine },
])

export function useNavigation() {
  const router = useRouter()
  const route = useRoute()

  const activeId = computed(() => route.name as string | null)

  function navigate(id: string) {
    const target = NAV_ITEMS.find((item) => item.id === id)

    if (target && target.id !== activeId.value) {
      return router.push({ name: target.id })
    }

    return Promise.resolve()
  }

  const items = computed(() =>
    NAV_ITEMS.map((item) => ({
      ...item,
      isActive: activeId.value === item.id,
    })),
  )

  return {
    items,
    activeId,
    navigate,
  }
}

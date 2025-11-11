import { ChartLine, House, LayoutList } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const NAV_ITEMS = Object.freeze([
  { id: 'home', labelKey: 'nav.home', path: '/', icon: House },
  { id: 'leaderboard', labelKey: 'nav.leaderboard', path: '/leaderboard', icon: LayoutList },
  { id: 'stats', labelKey: 'nav.stats', path: '/stats', icon: ChartLine },

])

export function useNavigation() {
  const router = useRouter()
  const route = useRoute()

  const activeId = computed(() => route.name)

  function navigate(id) {
    const target = NAV_ITEMS.find((item) => item.id === id)

    if (target && target.id !== activeId.value) {
      router.push({ name: target.id })
    }
  }

  const items = computed(() =>
    NAV_ITEMS.map((item) => ({
      ...item,
      isActive: activeId.value === item.id,
    }))
  )

  return {
    items,
    activeId,
    navigate,
  }
}

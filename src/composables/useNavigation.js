import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const NAV_ITEMS = Object.freeze([
  { id: 'home', label: 'Home', path: '/' },
  { id: 'leaderboard', label: 'Leaderboard', path: '/leaderboard' },
  { id: 'stats', label: 'Stats', path: '/stats' },
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

import NavigationMenu from './NavigationMenu.vue'
import { useRouter } from 'vue-router'

/** @type { import('@storybook/vue3-vite').Meta<typeof NavigationMenu> } */
const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = {
  render: () => ({
    components: { NavigationMenu },
    template: '<NavigationMenu />',
  }),
}

export const StatsActive = {
  render: () => ({
    components: { NavigationMenu },
    setup() {
      const router = useRouter()
      router.push({ name: 'stats' }).catch(() => {})
      return {}
    },
    template: '<NavigationMenu />',
  }),
  name: 'Stats Active',
}

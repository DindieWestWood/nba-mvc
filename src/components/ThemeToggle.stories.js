import ThemeToggle from './ThemeToggle.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof ThemeToggle> } */
const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default = {
  render: () => ({
    components: { ThemeToggle },
    template: '<ThemeToggle />',
  }),
}

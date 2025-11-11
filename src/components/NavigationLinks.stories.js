import NavigationLinks from './NavigationLinks.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof NavigationLinks> } */
const meta = {
  title: 'Components/NavigationLinks',
  component: NavigationLinks,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = {
  render: () => ({
    components: { NavigationLinks },
    template: '<NavigationLinks />',
  }),
}
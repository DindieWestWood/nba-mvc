import MoreCard from './MoreCard.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof MoreCard> } */
const meta = {
  title: 'Components/Cards/More',
  component: MoreCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '#',
    title: 'Leaderboard',
    tagLabel: '475 Players',
    backgroundText: '#',
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { MoreCard },
    setup() {
      return { args }
    },
    template: '<MoreCard v-bind="args" />',
  }),
}

import Headline from './Headline.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof Headline> } */
const meta = {
  title: 'Components/Headline',
  component: Headline,
  args: {
    title: "NBA's Most Valuable Contract",
    description: 'Using advanced stats to find which player has the most valuable contract to his team',
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { Headline },
    setup() {
      return { args }
    },
    template: `
      <Headline v-bind="args" />
    `,
  }),
}

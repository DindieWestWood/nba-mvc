import Headshot from './Headshot.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof Headshot> } */
const meta = {
  title: 'Components/Headshot',
  component: Headshot,
  args: {
    playerId: 203507,
    size: 'small',
    alt: 'Player headshot',
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { Headshot },
    setup() {
      return { args }
    },
    template: '<Headshot v-bind="args" />',
  }),
}

export const WithoutPlayer = {
  render: () => ({
    components: { Headshot },
    template: '<Headshot :player-id="null" size="small" alt="Default headshot" />',
  }),
}

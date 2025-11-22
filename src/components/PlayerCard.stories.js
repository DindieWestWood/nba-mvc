import PlayerCard from './PlayerCard.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof PlayerCard> } */
const meta = {
  title: 'Components/Cards/Player',
  component: PlayerCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#020617' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  args: {
    player: {
      id: 1628973,
      name: 'Jalen Brunson',
      rank: 42,
      jerseyNumber: 11,
      positions: ['PG', 'SG'],
      team: 'NYC',
      salary: 24960000,
      score: 11.25,
    },
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { PlayerCard },
    setup() {
      return { args }
    },
    template: '<PlayerCard v-bind="args" />',
  }),
}

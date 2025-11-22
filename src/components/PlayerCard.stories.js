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
      id: '1628973',
      name: 'Jalen Brunson',
      rank: 42,
      number: 11,
      positions: ['PG', 'SG'],
      team: 'New York Knicks',
      salary: 24960000,
      generalScore: 11.25,
      headshot: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628973.png',
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

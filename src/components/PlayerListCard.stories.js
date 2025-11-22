import PlayerListCard from './PlayerListCard.vue'
import Tag from './Tag.vue'

const mockPlayers = [
  { id: 203999, name: 'Nikola Jokić', team: 'DEN', value: "$17.8K" },
  { id: 1629029, name: 'Luka Dončić', team: 'DAL', value: "$38.6K" },
  { id: 1628369, name: 'Jayson Tatum', team: 'BOS', value: "$59.4K" },
  { id: 1628983, name: 'Shai Gilgeous-Alexander', team: 'OKC', value: "$10.2K" },
  { id: 203507, name: 'Giannis Antetokounmpo', team: 'MIL', value: "$11.1K" },
]

/** @type { import('@storybook/vue3-vite').Meta<typeof PlayerListCard> } */
const meta = {
  title: 'Components/Cards/PlayerList',
  component: PlayerListCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    headline: '$/PTS',
    listLabel: 'Top value scorers',
    players: mockPlayers,
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { PlayerListCard, Tag },
    setup() {
      return { args }
    },
    template: `
      <PlayerListCard v-bind="args"/>
    `,
  }),
}

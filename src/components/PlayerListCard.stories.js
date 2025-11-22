import PlayerListCard from './PlayerListCard.vue'
import Tag from './Tag.vue'

const mockPlayers = [
  { id: 1, name: 'Player One', value: 12.34 },
  { id: 2, name: 'Player Two', value: 15.67 },
  { id: 3, name: 'Player Three', value: 18.25 },
  { id: 4, name: 'Player Four', value: 20.11 },
  { id: 5, name: 'Player Five', value: 23.45 },
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
      <PlayerListCard v-bind="args">
        <template #detail="{ player }">
          <Tag size="small">\${{ player.value.toFixed(2) }}</Tag>
        </template>
      </PlayerListCard>
    `,
  }),
}

import Card from './Card.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof Card> } */
const meta = {
  title: 'Components/Cards/Card',
  component: Card,
  args: {
    default: 'This is a card. Place any content you want inside the slot.',
    clickable: false,
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args" style="max-width: 320px;">
        {{ args.default }}
      </Card>
    `,
  }),
}

import LinkCard from './LinkCard.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof LinkCard> } */
const meta = {
  title: 'Components/Cards/Link',
  component: LinkCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    href: 'https://www.nba.com',
    target: '_blank',
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { LinkCard },
    setup() {
      return { args }
    },
    template: `
      <LinkCard v-bind="args">
        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          <strong>NBA.com</strong>
          <span>Visit the official NBA website.</span>
        </div>
      </LinkCard>
    `,
  }),
}

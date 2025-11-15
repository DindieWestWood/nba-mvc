import Star from './Star.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof Star> } */
const meta = {
  title: 'Components/Star',
  component: Star,
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
    size: 48,
    pulseFrequency: 2,
    scaleMin: 0.92,
    scaleMax: 1.08,
  },
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 120, step: 4 } },
    pulseFrequency: { control: { type: 'number', min: 0.5, max: 5, step: 0.1 } },
    scaleMin: { control: { type: 'number', min: 0.5, max: 1, step: 0.01 } },
    scaleMax: { control: { type: 'number', min: 1, max: 1.5, step: 0.01 } },
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { Star },
    setup() {
      return { args }
    },
    template: '<Star v-bind="args" />',
  }),
}

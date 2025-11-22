import Tag from './Tag.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof Tag> } */
const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    default: 'MVP',
    size: 'regular',
    colorSheme: 'accent',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'regular', 'large'],
    },
    colorSheme: {
      control: { type: 'radio' },
      options: ['accent', 'stone'],
    },
  },
}

export default meta

export const Playground = {
  render: (args) => ({
    components: { Tag },
    setup() {
      return { args }
    },
    template: '<Tag :size="args.size" :colorSheme="args.colorSheme">{{ args.default }}</Tag>',
  }),
}

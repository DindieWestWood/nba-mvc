import { ref, watch } from 'vue'
import SearchBar from './SearchBar.vue'

/** @type { import('@storybook/vue3-vite').Meta<typeof SearchBar> } */
const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  args: {
    modelValue: '',
    placeholder: 'Search players…',
    autofocus: false,
  },
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    autofocus: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  render: (args) => ({
    components: { SearchBar },
    setup() {
      const value = ref(args.modelValue)

      const onUpdate = (val) => {
        value.value = val
        args.modelValue = val
      }

      watch(
        () => args.modelValue,
        (val) => {
          value.value = val
        },
      )

      return { args, value, onUpdate }
    },
    template: `
      <div style="width: 420px; max-width: 100%;">
        <SearchBar
          v-bind="args"
          :modelValue="value"
          @update:modelValue="onUpdate"
        />
        <p style="margin-top: 0.5rem; font-family: monospace;">
          Value: {{ value }}
        </p>
      </div>
    `,
  }),
}

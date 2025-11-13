import { defineConfig, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfig(
  {
    ignores: ['dist', 'storybook-static'],
  },
  vueTsConfigs.recommendedTypeChecked,
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)

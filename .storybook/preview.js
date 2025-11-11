import { setup } from '@storybook/vue3';
import { createMemoryHistory } from 'vue-router';

import '../src/assets/main.css';
import { createAppRouter } from '../src/router';
import { createAppI18n } from '../src/plugins/i18n';

const router = createAppRouter(createMemoryHistory());
const i18n = createAppI18n('en');

setup((app) => {
  app.use(router);
  app.use(i18n);
});

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    layout: 'fullscreen',
  },
};

export default preview;

import { setup } from '@storybook/vue3';
import { createMemoryHistory } from 'vue-router';

import '../src/assets/main.css';
import { createAppRouter } from '../src/router';

const router = createAppRouter(createMemoryHistory());

setup((app) => {
  app.use(router);
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

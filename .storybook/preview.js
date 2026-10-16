import '../build/css/tokens.css';
import '../build/css/tokens-dashboard.css';
import '../stories/docs.css';

/** @type { import('@storybook/html').Preview } */
export default {
  parameters: {
    layout: 'fullscreen',
    options: { storySort: { order: ['Overview', ['Introduction', 'All tokens'], 'Color', 'Typography', 'Foundations'] } },
  },
};

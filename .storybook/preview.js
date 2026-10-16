import '../build/css/tokens.css';
import '../build/css/tokens-dashboard.css';
import '../stories/docs.css';

/** @type { import('@storybook/html').Preview } */
export default {
  // Adds a "Docs" page to every group in the sidebar.
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    options: { storySort: { order: ['Overview', ['Docs', 'Introduction', 'All tokens'], 'Color', ['Core palette', 'Semantic', ['Docs', 'All roles']], 'Typography', 'Foundations'] } },
  },
};

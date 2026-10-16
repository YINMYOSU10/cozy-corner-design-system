/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  stories: ['../stories/**/*.stories.@(js|tsx)', '../src/**/*.stories.@(ts|tsx)'],
};

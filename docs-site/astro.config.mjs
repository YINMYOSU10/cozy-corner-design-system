import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sidebar from './sidebar.generated.mjs';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Cozy Corner Design System',
      customCss: [
        './src/styles/tokens.css',
        './src/styles/fonts.css',
        './src/styles/theme.css',
      ],
      // Written out in the order the astro-page skill lists; a missing page fails the build.
      sidebar,
    }),
  ],
});

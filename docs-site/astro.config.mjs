import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Cozy Corner Design System',
      sidebar: [{ label: 'Start here', items: [{ label: 'Introduction', slug: 'index' }] }],
    }),
  ],
});

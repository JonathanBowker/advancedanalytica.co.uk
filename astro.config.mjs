// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://advancedanalytica.co.uk',
  vite: {
    optimizeDeps: {
      include: ['d3']
    },
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);

        if (pathname.startsWith('/AGENTS/')) return false;
        if (pathname.startsWith('/blog/')) return false;
        if (pathname.startsWith('/case-studies/')) return false;
        if (pathname.startsWith('/personas/')) return false;
        if (pathname.includes('/roles/')) return false;

        if (
          new Set([
            '/activate/',
            '/auth/callback/',
            '/auth/reset/',
            '/login/',
            '/logout/',
            '/opinions/tag/',
            '/portal/',
            '/rss/',
            '/search/',
          ]).has(pathname)
        ) {
          return false;
        }

        return true;
      }
    })
  ]
});

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
  redirects: {
    '/brand-oracle': '/brand-operator',
    '/dots-brand-oracle-animation': '/dots-brand-operator-animation',
    '/dots-brand-oracle-wordmark-animation': '/dots-brand-operator-wordmark-animation',
    '/use-cases/financial-services-brand-brain': '/use-cases/financial-services-brand-operator',
    '/case-studies/financial-services-brand-brain': '/case-studies/financial-services-brand-operator',
  },
  vite: {
    optimizeDeps: {
      include: ['d3']
    },
    // Tailwind's Vite 7 plugin types do not line up with Astro's Vite 6 config types.
    // Runtime build is unaffected; this keeps astro check from failing on the config.
    // @ts-expect-error Vite type versions differ between Astro and @tailwindcss/vite.
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

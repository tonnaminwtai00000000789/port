import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
export default defineConfig({
  output: 'server',
  // adapter: node({
  //   mode: 'standalone',
  // }),
   adapter: cloudflare(),

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [
        'framer-motion',
        'lucide-react',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-tooltip',
        'class-variance-authority',
        '@radix-ui/react-slot',
        '@radix-ui/react-label',
        'sonner',
        'react-markdown',
        'remark-gfm',
      ],
    },
  },
});

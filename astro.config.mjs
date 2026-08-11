import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [preact({ compat: true })],
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['framer-motion', 'lucide-react', '@radix-ui/react-hover-card', '@radix-ui/react-tooltip'],
    },
  },
});


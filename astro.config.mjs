import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import bun from '@nurodev/astro-bun';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: bun(),
  integrations: [react()],
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@supabase/supabase-js',
        'framer-motion',
        'lucide-react',
        'react',
        'react-dom',
      ],
    },
  },
});

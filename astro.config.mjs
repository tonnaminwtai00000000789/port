import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
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
    customLogger: {
      warn(msg, options) {
        if (msg.includes('esbuildOptions') || msg.includes('vite:react-babel')) {
          return;
        }
        console.warn(msg, options);
      },
      warnOnce(msg, options) {
        if (msg.includes('esbuildOptions') || msg.includes('vite:react-babel')) {
          return;
        }
        console.warn(msg, options);
      },
      info(msg) {
        console.info(msg);
      },
      error(msg, options) {
        console.error(msg, options);
      },
      clearScreen() {},
      hasErrorLogged() { return false; },
      hasWarned: false,
    },
  },
});

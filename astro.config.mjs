import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      rolldownOptions: {},
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

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const isCloudflare = process.argv.some(arg => arg.includes('build') || arg.includes('preview'));

export default defineConfig({
  output: 'server',
  adapter: isCloudflare ? cloudflare({ imageService: 'passthrough', platformProxy: { enabled: false } }) : undefined,
  integrations: [react()],
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

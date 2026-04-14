// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://sloanthomas.com',
  fonts: [
    {
      name: 'Fraunces',
      cssVariable: '--font-display',
      provider: fontProviders.fontsource(),
    },
    {
      name: 'DM Sans',
      cssVariable: '--font-body',
      provider: fontProviders.fontsource(),
    },
    {
      name: 'Space Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
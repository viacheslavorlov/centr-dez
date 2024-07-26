import markdoc from '@astrojs/markdoc';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  integrations: [markdoc(), process.env.MODE === 'dev' ? keystatic() : [], tailwind(), process.env.MODE === 'dev' ? react({
    include: ['**/keystatic']
  }) : [], preact()],
  output: process.env.MODE === 'dev' ? 'hybrid' : 'static',
  outDir: '../htdocs'
  // base: '/dist/'
});

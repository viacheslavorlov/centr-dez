import markdoc from '@astrojs/markdoc';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import preact from '@astrojs/preact';
import keystatic from '@keystatic/astro';
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
	integrations: [
		markdoc(),
		process.env.MODE === 'dev' ? keystatic() : [],
		tailwind(),
		process.env.MODE === 'dev' ? react({ include: ['**/keystatic'] }): [],
		preact(),
	],
	output: process.env.MODE === 'dev' ? 'hybrid' : 'static',
	// base: '/dist/'
});

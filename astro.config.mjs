import markdoc from '@astrojs/markdoc';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import preact from '@astrojs/preact';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
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
		// process.env.MODE === 'dev' ? sentry() : [],
		// process.env.MODE === 'dev' ? spotlightjs(): [],
		preact(),
	],
	output: process.env.MODE === 'dev' ? 'hybrid' : 'static',
	// base: '/dist/'
});

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-text': '#000000',
				'primary-bg': '#FAFAFA',
				'secondary-bg': 'rgba(3, 173, 227, 1)',
				accent: '#2BBC69',
				'accent-secondary': '#03ADE3' 

			},
		},
	},
	plugins: [],
};

import { config, fields, collection, singleton } from '@keystatic/core';

type Parasites = 'грызуны' | 'тараканы' | 'клопы' | '';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		posts: collection({
			label: 'Posts',
			slugField: 'title',
			path: 'src/content/posts/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				content: fields.document({
					label: 'Content',
					formatting: true,
					dividers: true,
					links: true,
					images: {
						directory: 'src/assets/images/posts',
						publicPath: '../../assets/images/posts/',
					},
				}),
			},
		}),
		questions: collection({
			label: 'Questions',
			slugField: 'title',
			path: 'src/content/questions/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'title' } }),
				ansvers: fields.array(
					fields.object({
						answer: fields.text({ label: 'answer' }),
						result: fields.text({ label: 'result' }),
					})
				),
				content: fields.document({
					label: 'Content',
					formatting: true,
					dividers: true,
					links: true,
					images: {
						directory: 'src/assets/images/posts',
						publicPath: '../../assets/images/posts/',
					},
				}),
			},
		}),
	},
	singletons: {
		hero: singleton({
			label: 'Hero',
			path: 'src/content/hero/',
			schema: {
				title: fields.text({ label: 'title' }),
				phone: fields.text({ label: 'phone' }),
				windowTitle: fields.text({ label: 'windowTitle' }),
				subtitle: fields.text({ label: 'subtitle' }),
				parasites: fields.array(fields.text({ label: 'parasite' })),
				video: fields.text({ label: 'video' }),
				videoWrapper: fields.text({ label: 'videoWrapper' }),
				dangerSign: fields.text({ label: 'dangerSign' }),
				giftImg: fields.text({ label: 'giftImg' }),
				arrowImg: fields.text({ label: 'arrowImg' }),
				smokeImg: fields.text({ label: 'smokeImg' }),
				buttonText: fields.text({ label: 'buttonText' }),
			},
		}),
		quiz: singleton({
			label: 'Quiz',
			path: 'src/content/quiz/',
			schema: {
				titel_1: fields.text({ label: 'titel_1' }),
				titel_2: fields.text({ label: 'titel_2' }),
				discount: fields.text({ label: 'discount' }),
				pizeTitle: fields.text({ label: 'prizeTitle' }),
				pizeImg: fields.text({ label: 'prizeImg' }),
			},
		}),
	},
});

import { collection, config, fields, singleton } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		dangers: collection({
			label: 'Dangers',
			slugField: 'title',
			path: 'src/content/dangers/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				type: fields.text({ label: 'Тип (type)' }),
				buttonLable: fields.text({ label: 'buttonLable' }),
				buttonLink: fields.text({ label: 'buttonLink' }),
				img: fields.text({ label: 'img' }),
				reverse: fields.text({ label: 'reverse' }),
				resons: fields.array(
					fields.object(
						{
							title: fields.text({ label: 'titel' }),
						},
						{ label: 'опасности' }
					)
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
		dontDoItUrself: singleton({
			label: 'Dont Do It Yourself',
			path: 'src/content/dontdoityrself/',
			schema: {
				titel: fields.text({ label: 'titel' }),
				buttonLable: fields.text({ label: 'buttonLable' }),
				buttonLink: fields.text({ label: 'buttonLink' }),
				resons: fields.array(
					fields.object({
						title: fields.text({ label: 'titel' }),
						img: fields.text({ label: 'img' }),
						description: fields.text({ label: 'description' }),
					})
				),
			},
		}),
		whatAwaits: singleton({
			label: 'Что вас ждет?',
			path: 'src/content/whatawaits/',
			schema: {
				titel: fields.text({ label: 'titel' }),
				features: fields.array(
					fields.object({
						title: fields.text({ label: 'titel' }),
					})
				),
			},
		}),
		paraisiteTypes: singleton({
			label: 'Види паразитов',
			path: 'src/content/paraisiteTypes/',
			schema: {
				titel: fields.text({ label: 'titel' }),
				buttonLable: fields.text({ label: 'buttonLable' }),
				buttonLink: fields.text({ label: 'buttonLink' }),
				parasites: fields.array(
					fields.object({
						title: fields.text({ label: 'titel' }),
						img: fields.text({ label: 'img' }),
					})
				),
			},
		}),
		form: singleton({
			label: 'Форма',
			path: 'src/content/form/',
			schema: {
				titel: fields.text({ label: 'titel' }),
				fields: fields.array(
					fields.object({
						lable: fields.text({ label: 'lable' }),
						type: fields.text({ label: 'type' }),
						placeholder: fields.text({ label: 'placeholder' }),
						options: fields.array(
							fields.object({
								title: fields.text({ label: 'titel' }),
								value: fields.text({ label: 'value' }),
							})
						),
					})
				),
				buttonLable: fields.text({ label: 'buttonLable' }),
				img: fields.text({ label: 'img' }),
			},
		}),
		contacts: singleton({
			label: 'Контакты',
			path: 'src/content/contacts/',
			schema: {
				titel: fields.text({ label: 'Заголовок' }),
				working: fields.text({ label: 'Режим работы' }),
				address: fields.text({ label: 'Адрес' }),
				email: fields.text({ label: 'Email' }),
				image: fields.text({ label: 'Картинка' }),
				contacts: fields.array(fields.object({
					titel: fields.text({ label: 'Название' }),
					href: fields.text({ label: 'ссылка' }),
					img: fields.text({ label: 'картинка' }),
				},
				{
					label: 'Контакт',
				}), {label: "Контакты"}),
			},
		}),
	},
});

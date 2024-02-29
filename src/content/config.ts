import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
	}),
});

// const questions = defineCollection({
// 	// Type-check frontmatter using a schema
// 	schema: z.object({
// 		title: z.string(),
// 		ansvers: z.object({
// 			answer: z.string(),
// 			result: z.string(),
// 		}),
// 	}),
// });

export const collections = { posts };

import { getArticleBySlug } from '@/services/article.service';
import { cache } from 'react';

export const readArticleBySlug = cache(async (slug: string) => {
	const article = await getArticleBySlug({ slug });

	if (!article) return null;

	return article;
});

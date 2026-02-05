import { cache } from 'react';
import { getArticleBySlug } from '@/services/article.service';

export const readArticleBySlug = cache(async (slug: string) => {
	const article = await getArticleBySlug({ slug });

	if (!article) return null;

	return article;
});

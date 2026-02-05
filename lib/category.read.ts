import { cache } from 'react';
import { getCategories } from '@/services/category.service';
import { getArticlesForTicker } from '@/services/article.service';

export const readCategories = cache(async () => {
	const categories = await getCategories();

	if (!categories) return [];

	return categories;
});

export const readTickerArticles = cache(async () => {
	const tickerArticles = (await getArticlesForTicker({ page: 1, pageSize: 10 }))
		.articles;

	if (!tickerArticles) return [];

	return tickerArticles;
});

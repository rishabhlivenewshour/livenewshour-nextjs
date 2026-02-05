export const CACHE_TIME = {
	ARTICLES: 60 * 60, // 1 hour
	CATEGORIES: 60 * 60 * 24, // 24 hours
	HERO: 60 * 30, // 30 minutes
	TICKER: 60 * 30, // 30 minutes
	SEARCH: 60 * 15, // 15 minutes
} as const;

export const CACHE_TAGS = {
	ARTICLES: 'articles',
	CATEGORIES: 'categories',
	HERO: 'hero-articles',
	TICKER: 'ticker-articles',
	RELATED: (categoryId: string) => `related-articles-${categoryId}`,
	SEARCH: (searchQuery: string) => `search-articles-${searchQuery}`,
	ARTICLES_BY_CATEGORY: (categoryId: string) => `articles-${categoryId}`,
	ARTICLE_BY_SLUG: (slug: string) => `article-${slug}`,
} as const;

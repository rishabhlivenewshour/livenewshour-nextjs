import {
	Article,
	ArticleByCategoryResponse,
	ArticleResponse,
	ArticlesByCategoryProps,
	ArticlesProps,
} from '@/types/article';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getArticlesForTicker = async (): Promise<Article[]> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${1}&page_size=${10}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles for ticker');
	}

	const data: ArticleResponse = await res.json();

	return data.results.map((article) => ({
		id: article.id,
		title: article.title,
		slug: article.slug,
	}));
};

export const getHeroArticles = async (): Promise<Article[]> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${1}&page_size=${4}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch hero article');
	}

	const data: ArticleResponse = await res.json();

	return data.results;
};

export const getArticles = async ({
	page = 1,
	pageSize = 25,
}: ArticlesProps): Promise<ArticleByCategoryResponse> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles');
	}

	const data: ArticleResponse = await res.json();

	return {
		articles: data.results,
		pagination: {
			page: data.page || page,
			pageSize: data.page_size || pageSize,
			totalPages: data.total_pages || 1,
			totalItems: data.total_items || data.results.length,
		},
	};
};

export const getArticlesByCategory = async ({
	categoryId,
	page = 1,
	pageSize = 4,
}: ArticlesByCategoryProps): Promise<ArticleByCategoryResponse | null> => {
	if (categoryId === null) return null;
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles by category');
	}

	const data: ArticleResponse = await res.json();

	return {
		articles: data.results,
		pagination: {
			page: data.page || page,
			pageSize: data.page_size || pageSize,
			totalPages: data.total_pages || 1,
			totalItems: data.total_items || data.results.length,
		},
	};
};

export const getArticlesByCategoryClient = async ({
	categoryId,
	page = 1,
	pageSize = 4,
}: ArticlesByCategoryProps): Promise<ArticleByCategoryResponse | null> => {
	if (categoryId === null) return null;
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ cache:'no-store' },
	); 

	if (res.status === 404) {
		return {
			articles: [],
			pagination: {
				page,
				pageSize,
				totalPages: page - 1,
				totalItems: 0,
			},
		};
	}

	if (!res.ok) {
		throw new Error('failed to fetch articles by category');
	}

	const data: ArticleResponse = await res.json();

	return {
		articles: data.results,
		pagination: {
			page: data.page || page,
			pageSize: data.page_size || pageSize,
			totalPages: data.total_pages || 1,
			totalItems: data.total_items || data.results.length,
		},
	};
};

interface ArticleBySlugProps {
	slug: string;
}

export const getArticleBySlug = async ({
	slug,
}: ArticleBySlugProps): Promise<Article> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&slug=${slug}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles');
	}

	const data: ArticleResponse = await res.json();

	return data?.results[0];
};

interface RelatedArticleProps {
	categoryId: number | null;
	articleId: number | null;
}

export const getRelatedArticles = async ({
	categoryId,
	articleId,
}: RelatedArticleProps): Promise<Article[] | null> => {
	if (categoryId === null) return null;

	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${1}&page_size=${4}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch hero article');
	}

	const data: ArticleResponse = await res.json();

	return data.results.filter((a) => a.id !== articleId).slice(0, 3);
};

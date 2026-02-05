import {
	Article,
	ArticleAPIResponse,
	BaseArticle,
	ServiceResult,
} from '@/types/article.types';
import {
	GetArticleBySlugParams,
	GetArticlesByCategoryParams,
	GetArticlesBySearchParams,
	GetArticlesParams,
	GetRelatedArticleParams,
} from '@/types/article.service.types';
import { CACHE_TAGS, CACHE_TIME } from '@/lib/cache';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getArticlesForTicker = async ({
	page = 1,
	pageSize = 10,
}: GetArticlesParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: CACHE_TIME.TICKER, tags: [CACHE_TAGS.TICKER] } },
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles for ticker');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getHeroArticles = async ({
	page = 1,
	pageSize = 4,
}: GetArticlesParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: CACHE_TIME.HERO, tags: [CACHE_TAGS.HERO] } },
	);

	if (!res.ok) {
		throw new Error('failed to fetch hero article');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticles = async ({
	page = 1,
	pageSize = 25,
}: GetArticlesParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: CACHE_TIME.ARTICLES, tags: [CACHE_TAGS.ARTICLES] } },
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesByCategory = async ({
	categoryId,
	page = 1,
	pageSize = 4,
}: GetArticlesByCategoryParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{
			next: {
				revalidate: CACHE_TIME.ARTICLES,
				tags: [CACHE_TAGS.ARTICLES_BY_CATEGORY(categoryId)],
			},
		},
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles by category');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesByCategoryClient = async ({
	categoryId,
	page = 1,
	pageSize = 4,
}: GetArticlesByCategoryParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ cache: 'no-store' },
	);

	if (res.status === 404) {
		return {
			articles: [],
			pagination: {
				page,
				page_size: pageSize,
				total_pages: page - 1,
				total_items: 0,
			},
		};
	}

	if (!res.ok) {
		throw new Error('failed to fetch articles by category');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticleBySlug = async ({
	slug,
}: GetArticleBySlugParams): Promise<Article> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&slug=${slug}`,
		{
			next: {
				revalidate: CACHE_TIME.ARTICLES,
				tags: [CACHE_TAGS.ARTICLE_BY_SLUG(slug)],
			},
		},
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles');
	}

	const data: ArticleAPIResponse = await res.json();

	return data?.results[0];
};

export const getRelatedArticles = async ({
	categoryId,
	articleId,
	page = 1,
	pageSize = 4,
}: GetRelatedArticleParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{
			next: {
				revalidate: CACHE_TIME.ARTICLES,
				tags: [CACHE_TAGS.RELATED(categoryId)],
			},
		},
	);

	if (!res.ok) {
		throw new Error('failed to fetch hero article');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles:
			mapBaseArticle(
				data.results.filter((a) => a.id !== articleId).slice(0, 3),
			) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesBySearch = async ({
	searchQuery = '',
	page = 1,
	pageSize = 15,
}: GetArticlesBySearchParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&search=${searchQuery}&page=${page}&page_size=${pageSize}`,
		{
			next: {
				revalidate: CACHE_TIME.SEARCH,
				tags: [CACHE_TAGS.SEARCH(searchQuery)],
			},
		},
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles by search');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesBySearchClient = async ({
	searchQuery = '',
	page = 1,
	pageSize = 15,
}: GetArticlesBySearchParams): Promise<ServiceResult<BaseArticle[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&search=${searchQuery}&page=${page}&page_size=${pageSize}`,
		{ cache: 'no-store' },
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles by search');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: mapBaseArticle(data.results) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

const mapPagination = (
	data: ArticleAPIResponse,
	page: number,
	pageSize: number,
) => {
	return {
		page: data.page || page,
		page_size: data.page_size || pageSize,
		total_pages: data.total_pages || 1,
		total_items: data.total_items || data.results.length,
	};
};

const mapBaseArticle = (data: Article[]): BaseArticle[] => {
	return data.map((article) => ({
		id: article.id,
		title: article.title,
		slug: article.slug,
		summary: article.summary,
		category_name: article.category_name,
		banner_image: article.banner_image,
		category: article.category,
		author: article.author,
		published_at: article.published_at,
	}));
};

import { Article, ArticleAPIResponse, ServiceResult } from '@/types/article';
import {
	GetArticleBySlugParams,
	GetArticlesByCategoryParams,
	GetArticlesBySearchParams,
	GetArticlesParams,
	GetRelatedArticleParams,
} from '@/types/article.service.types';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getArticlesForTicker = async ({
	page = 1,
	pageSize = 10,
}: GetArticlesParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles for ticker');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getHeroArticles = async ({
	page = 1,
	pageSize = 4,
}: GetArticlesParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch hero article');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticles = async ({
	page = 1,
	pageSize = 25,
}: GetArticlesParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesByCategory = async ({
	categoryId,
	page = 1,
	pageSize = 4,
}: GetArticlesByCategoryParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles by category');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesByCategoryClient = async ({
	categoryId,
	page = 1,
	pageSize = 4,
}: GetArticlesByCategoryParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ cache: 'no-store' },
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

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticleBySlug = async ({
	slug,
}: GetArticleBySlugParams): Promise<Article> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&slug=${slug}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

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
}: GetRelatedArticleParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/categories/${categoryId}/articles/?is_published=true&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch hero article');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results.filter((a) => a.id !== articleId).slice(0, 3) || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesBySearch = async ({
	searchQuery = '',
	page = 1,
	pageSize = 15,
}: GetArticlesBySearchParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&search=${searchQuery}&page=${page}&page_size=${pageSize}`,
		{ next: { revalidate: 60 * 60 } },
	); // 1 hour

	if (!res.ok) {
		throw new Error('failed to fetch articles by search');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
		pagination: mapPagination(data, page, pageSize),
	};
};

export const getArticlesBySearchClient = async ({
	searchQuery = '',
	page = 1,
	pageSize = 15,
}: GetArticlesBySearchParams): Promise<ServiceResult<Article[]>> => {
	const res = await fetch(
		`${API_URL}/news/articles/?is_published=true&search=${searchQuery}&page=${page}&page_size=${pageSize}`,
		{ cache: 'no-store' },
	);

	if (!res.ok) {
		throw new Error('failed to fetch articles by search');
	}

	const data: ArticleAPIResponse = await res.json();

	return {
		articles: data.results || [],
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
		pageSize: data.page_size || pageSize,
		totalPages: data.total_pages || 1,
		totalItems: data.total_items || data.results.length,
	};
};

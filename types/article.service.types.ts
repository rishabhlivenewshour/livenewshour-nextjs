export interface GetArticlesParams {
	page?: number;
	pageSize?: number;
}

export interface GetArticlesByCategoryParams {
	categoryId: string;
	page?: number;
	pageSize?: number;
}

export interface GetArticleBySlugParams {
	slug: string;
}

export interface GetRelatedArticleParams {
	categoryId: number;
	articleId: number;
	page?: number;
	pageSize?: number;
}

export interface GetArticlesBySearchParams {
	searchQuery: string;
	page?: number;
	pageSize?: number;
}

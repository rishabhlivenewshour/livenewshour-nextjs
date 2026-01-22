export interface Article {
	id: number;
	title: string;
	slug: string;
	summary?: string;
	category?: number;
	category_name?: string;
	author?: string;
	banner_image?: string;
	content?: string;
	secondary_banner_image?: string;
	secondary_content?: string;
	tag?: string;
	related_keywords?: string[];
	published_at?: string;
	created_at?: string;
}

export interface ArticleResponse {
	results: Article[];
	page?: number;
	page_size?: number;
	total_pages?: number;
	total_items?: number;
}

interface ArticlesProps {
	page: number;
	pageSize: number;
}

interface ArticlesByCategoryProps {
	categoryId: string;
	page: number;
	pageSize: number;
}

export interface ArticleByCategoryResponse {
	articles: Article[];
	pagination: {
		page: number;
		pageSize: number;
		totalPages: number;
		totalItems: number;
	};
}

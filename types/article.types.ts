export interface BaseArticle {
	id: number;
	title: string;
	slug: string;
	summary: string;
	category_name: string;
	author: string;
	banner_image: string;
	published_at: string;
}

export interface Article extends BaseArticle {
	category: string;
	content: string;
	secondary_banner_image?: string;
	secondary_content?: string;
	tag?: string;
	related_keywords: string[];
	created_at: string;
}

export interface ServiceResult<T> {
	articles: T;
	pagination: Pagination;
}

export interface Pagination {
	page: number;
	page_size: number;
	total_pages: number;
	total_items: number;
}

type PartialPagination = Partial<Pagination>;

export interface ArticleAPIResponse extends PartialPagination {
	results: Article[];
}

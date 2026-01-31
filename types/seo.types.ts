// Base SEO configuration for the site
export interface BaseSEOConfig {
	siteName: string;
	siteUrl: string;
	defaultTitle: string;
	defaultDescription: string;
	defaultImage: string;
	logoUrl: string;
	twitterHandle: string;
	locale: string;
	keywords: string[];
}

// SEO metadata for articles
export interface ArticleSEOData {
	title: string;
	description: string;
	slug: string;
	image: string;
	publishedAt: string;
	modifiedAt?: string;
	author: string;
	category_name: string;
	keywords: string[];
	tags?: string[];
}

// SEO metadata for category pages
export interface CategorySEOData {
	name: string;
	slug: string;
	description: string;
	image?: string;
}

// SEO metadata for search pages
export interface SearchSEOData {
	query: string;
	resultsCount?: number;
}

// Structured data types
export type StructuredDataType =
	| 'Article'
	| 'NewsArticle'
	| 'WebSite'
	| 'Organization'
	| 'BreadcrumbList'
	| 'SearchAction';

// Schema.org Article structured data
export interface ArticleStructuredData {
	'@context': 'https://schema.org';
	'@type': 'NewsArticle';
	headline: string;
	description: string;
	image: string | string[];
	datePublished: string;
	dateModified: string;
	author: {
		'@type': 'Person' | 'Organization';
		name: string;
		url?: string;
	};
	publisher: {
		'@type': 'Organization';
		name: string;
		logo: {
			'@type': 'ImageObject';
			url: string;
		};
	};
	mainEntityOfPage: {
		'@type': 'WebPage';
		'@id': string;
	};
	articleSection?: string;
	keywords?: string[];
}

// Schema.org WebSite structured data
export interface WebSiteStructuredData {
	'@context': 'https://schema.org';
	'@type': 'WebSite';
	name: string;
	url: string;
	description?: string;
	potentialAction?: {
		'@type': 'SearchAction';
		target: {
			'@type': 'EntryPoint';
			urlTemplate: string;
		};
		'query-input': string;
	};
	publisher?: {
		'@type': 'Organization';
		name: string;
		logo: {
			'@type': 'ImageObject';
			url: string;
		};
	};
}

// Schema.org Organization structured data
export interface OrganizationStructuredData {
	'@context': 'https://schema.org';
	'@type': 'Organization';
	name: string;
	url: string;
	logo: string;
	description?: string;
	sameAs?: string[];
	contactPoint?: {
		'@type': 'ContactPoint';
		contactType: string;
		email?: string;
	};
}

// Schema.org BreadcrumbList structured data
export interface BreadcrumbStructuredData {
	'@context': 'https://schema.org';
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item?: string;
	}>;
}

// Combined structured data type
export type StructuredData =
	| ArticleStructuredData
	| WebSiteStructuredData
	| OrganizationStructuredData
	| BreadcrumbStructuredData;

// Open Graph image configuration
export interface OpenGraphImage {
	url: string;
	width?: number;
	height?: number;
	alt?: string;
	type?: string;
}

// Complete metadata options
export interface SEOMetadataOptions {
	title: string;
	description: string;
	canonical?: string;
	noIndex?: boolean;
	noFollow?: boolean;
	keywords?: string[];
	image?: OpenGraphImage | string;
	type?: 'website' | 'article';
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	section?: string;
	tags?: string[];
}

import {
	ArticleStructuredData,
	WebSiteStructuredData,
	OrganizationStructuredData,
	BreadcrumbStructuredData,
	ArticleSEOData,
} from '@/types/seo.types';
import { SEO_CONFIG } from './seo.config';

// Generate Article structured data (Schema.org NewsArticle)
// Helps search engines understand article content and display rich results
export function generateArticleStructuredData(
	data: ArticleSEOData,
): ArticleStructuredData {
	const articleUrl = `${SEO_CONFIG.siteUrl}/news/articles/${data.slug}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		headline: data.title,
		description: data.description,
		image: data.image,
		datePublished: data.publishedAt,
		dateModified: data.modifiedAt || data.publishedAt,
		author: {
			'@type': 'Person',
			name: data.author || 'Live News Hour Team',
		},
		publisher: {
			'@type': 'Organization',
			name: SEO_CONFIG.siteName,
			logo: {
				'@type': 'ImageObject',
				url: SEO_CONFIG.logoUrl,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl,
		},
		articleSection: data.category_name,
		keywords: data.keywords,
	};
}

// Generate WebSite structured data with search action
// Enables Google Search box in search results
export function generateWebSiteStructuredData(): WebSiteStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SEO_CONFIG.siteName,
		url: SEO_CONFIG.siteUrl,
		description: SEO_CONFIG.defaultDescription,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
		publisher: {
			'@type': 'Organization',
			name: SEO_CONFIG.siteName,
			logo: {
				'@type': 'ImageObject',
				url: SEO_CONFIG.logoUrl,
			},
		},
	};
}

// Generate Organization structured data
// Helps establish site identity and credibility
export function generateOrganizationStructuredData(): OrganizationStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SEO_CONFIG.siteName,
		url: SEO_CONFIG.siteUrl,
		logo: SEO_CONFIG.logoUrl,
		description: SEO_CONFIG.defaultDescription,
		sameAs: [
			'https://facebook.com/livenewshour',
			'https://twitter.com/livenewshour',
			'https://instagram.com/livenewshour',
			'https://youtube.com/@livenewshour',
		],
	};
}

// Generate Breadcrumb structured data
// Helps Google display breadcrumb navigation in search results
export function generateBreadcrumbStructuredData(
	items: Array<{ name: string; url?: string }>,
): BreadcrumbStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url ? `${SEO_CONFIG.siteUrl}${item.url}` : undefined,
		})),
	};
}

// Convert structured data to JSON-LD script props
// Use this in Next.js <script> tags
export function structuredDataToJsonLd(
	data:
		| ArticleStructuredData
		| WebSiteStructuredData
		| OrganizationStructuredData
		| BreadcrumbStructuredData,
) {
	return {
		type: 'application/ld+json' as const,
		dangerouslySetInnerHTML: {
			__html: JSON.stringify(data),
		},
	};
}

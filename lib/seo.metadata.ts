import { Metadata } from 'next';
import {
	ArticleSEOData,
	CategorySEOData,
	SearchSEOData,
	SEOMetadataOptions,
	OpenGraphImage,
} from '@/types/seo.types';
import {
	SEO_CONFIG,
	DEFAULT_ROBOTS,
	NO_INDEX_ROBOTS,
	OG_IMAGE_DIMENSIONS,
	TWITTER_CARD_TYPE,
} from './seo.config';

// Generate base metadata with common fields
// Used as foundation for all page metadata
export function generateBaseMetadata(options: SEOMetadataOptions): Metadata {
	const {
		title,
		description,
		canonical,
		noIndex = false,
		noFollow = false,
		keywords,
		image,
		type = 'website',
		publishedTime,
		modifiedTime,
		author,
		section,
		tags,
	} = options;

	// Handle image configuration
	const ogImage: OpenGraphImage =
		typeof image === 'string'
			? {
					url: image,
					width: OG_IMAGE_DIMENSIONS.width,
					height: OG_IMAGE_DIMENSIONS.height,
					alt: title,
				}
			: image || {
					url: SEO_CONFIG.defaultImage,
					width: OG_IMAGE_DIMENSIONS.width,
					height: OG_IMAGE_DIMENSIONS.height,
					alt: SEO_CONFIG.siteName,
				};

	// Build robots configuration
	const robots = noIndex || noFollow ? NO_INDEX_ROBOTS : DEFAULT_ROBOTS;

	// Base metadata
	const metadata: Metadata = {
		title,
		description,
		keywords: keywords || SEO_CONFIG.keywords,
		authors: author ? [{ name: author }] : [{ name: 'Live News Hour Team' }],
		creator: SEO_CONFIG.siteName,
		publisher: SEO_CONFIG.siteName,
		robots,
		alternates: canonical
			? {
					canonical,
				}
			: undefined,
		openGraph: {
			type,
			locale: SEO_CONFIG.locale,
			url: canonical,
			siteName: SEO_CONFIG.siteName,
			title,
			description,
			images: [ogImage],
			...(type === 'article' && {
				publishedTime,
				modifiedTime,
				authors: author ? [author] : undefined,
				section,
				tags,
			}),
		},
		twitter: {
			card: TWITTER_CARD_TYPE,
			site: SEO_CONFIG.twitterHandle,
			creator: SEO_CONFIG.twitterHandle,
			title,
			description,
			images: [ogImage.url],
		},
	};

	return metadata;
}

// Generate metadata for article pages
// Includes all necessary SEO fields for news articles
export function generateArticleMetadata(articleData: ArticleSEOData): Metadata {
	const canonical = `/news/articles/${articleData.slug}`;
	const fullUrl = `${SEO_CONFIG.siteUrl}${canonical}`;

	return generateBaseMetadata({
		title: articleData.title,
		description: articleData.description,
		canonical: fullUrl,
		keywords: articleData.keywords,
		image: {
			url: articleData.image,
			width: OG_IMAGE_DIMENSIONS.width,
			height: OG_IMAGE_DIMENSIONS.height,
			alt: articleData.title,
		},
		type: 'article',
		publishedTime: articleData.publishedAt,
		modifiedTime: articleData.modifiedAt || articleData.publishedAt,
		author: articleData.author,
		section: articleData.category_name,
		tags: articleData.tags,
	});
}

// Generate metadata for category/topic pages
// Optimized for listing pages
export function generateCategoryMetadata(
	categoryData: CategorySEOData,
): Metadata {
	const canonical = `/news/topics/${categoryData.slug}`;
	const fullUrl = `${SEO_CONFIG.siteUrl}${canonical}`;

	const title = `${categoryData.name} News - ${SEO_CONFIG.siteName}`;
	const description =
		categoryData.description ||
		`Get the latest ${categoryData.name.toLowerCase()} news, updates, and headlines from ${SEO_CONFIG.siteName}. Stay informed with comprehensive coverage.`;

	return generateBaseMetadata({
		title,
		description,
		canonical: fullUrl,
		keywords: [
			categoryData.name,
			`${categoryData.name} News`,
			`Latest ${categoryData.name}`,
			...SEO_CONFIG.keywords,
		],
		image: categoryData.image || SEO_CONFIG.defaultImage,
		type: 'website',
	});
}

// Generate metadata for search results pages
// Includes dynamic query information
export function generateSearchMetadata(searchData: SearchSEOData): Metadata {
	const { query, resultsCount } = searchData;

	const title = query
		? `Search Results for "${query}" - ${SEO_CONFIG.siteName}`
		: `Search - ${SEO_CONFIG.siteName}`;

	const description = query
		? `Search results for "${query}" on ${SEO_CONFIG.siteName}. ${
				resultsCount !== undefined
					? `Found ${resultsCount} article${resultsCount !== 1 ? 's' : ''}.`
					: ''
			}`
		: `Search for news articles on ${SEO_CONFIG.siteName}.`;

	return generateBaseMetadata({
		title,
		description,
		noIndex: true, // Search pages typically shouldn't be indexed
		noFollow: true,
	});
}

// Generate metadata for home page
// Uses default configuration with enhanced description
export function generateHomeMetadata(): Metadata {
	return generateBaseMetadata({
		title: SEO_CONFIG.defaultTitle,
		description: SEO_CONFIG.defaultDescription,
		canonical: SEO_CONFIG.siteUrl,
		keywords: SEO_CONFIG.keywords,
		image: SEO_CONFIG.defaultImage,
		type: 'website',
	});
}

// Generate metadata for 404/error pages
// Prevents indexing of error pages
export function generateErrorMetadata(
	errorMessage: string = 'Page Not Found',
): Metadata {
	return generateBaseMetadata({
		title: `${errorMessage} - ${SEO_CONFIG.siteName}`,
		description: `This page could not be found on ${SEO_CONFIG.siteName}.`,
		noIndex: true,
		noFollow: true,
	});
}

// Utility to merge custom metadata with generated metadata
// Useful for page-specific overrides
export function mergeMetadata(
	base: Metadata,
	custom: Partial<Metadata>,
): Metadata {
	const baseRobots =
		typeof base.robots === 'object' && base.robots !== null ? base.robots : {};

	const customRobots =
		typeof custom.robots === 'object' && custom.robots !== null
			? custom.robots
			: {};

	return {
		...base,
		...custom,
		...(base.openGraph || custom.openGraph
			? {
					openGraph: {
						...(base.openGraph || {}),
						...(custom.openGraph || {}),
					},
				}
			: {}),
		...(base.twitter || custom.twitter
			? {
					twitter: {
						...(base.twitter || {}),
						...(custom.twitter || {}),
					},
				}
			: {}),
		...(base.robots || custom.robots
			? {
					robots: {
						...baseRobots,
						...customRobots,
					},
				}
			: {}),
	};
}

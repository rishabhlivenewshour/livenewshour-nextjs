import { BaseSEOConfig } from '@/types/seo.types';

// Base SEO configuration for Live News Hour Centralized configuration ensures consistency across the application
export const SEO_CONFIG: BaseSEOConfig = {
	siteName: 'Live News Hour',
	siteUrl: 'https://www.livenewshour.com',
	defaultTitle:
		'Live News Hour - Latest News, Breaking Headlines, and Live Updates',
	defaultDescription:
		'Get the latest breaking news, headlines, and in-depth coverage from Live News Hour – your trusted source for global, business, sports, entertainment, and tech news.',
	defaultImage: 'https://www.livenewshour.com/og-image.png',
	logoUrl: 'https://www.livenewshour.com/logo.jpeg',
	twitterHandle: '@livenewshour',
	locale: 'en_US',
	keywords: [
		'Live News Hour',
		'Live News',
		'News Hour',
		'LiveNewsHour',
		'LNH',
		'Breaking News',
		'Latest Headlines',
		'India News',
		'World News',
		'Sports News',
		'Entertainment News',
		'Technology Updates',
	],
};

// Default metadata for robots
export const DEFAULT_ROBOTS = {
	index: true,
	follow: true,
	googleBot: {
		index: true,
		follow: true,
		'max-video-preview': -1,
		'max-image-preview': 'large' as const,
		'max-snippet': -1,
	},
};

// NoIndex metadata for pages that shouldn't be indexed
export const NO_INDEX_ROBOTS = {
	index: false,
	follow: false,
	googleBot: {
		index: false,
		follow: false,
	},
};

// Image dimensions for Open Graph
export const OG_IMAGE_DIMENSIONS = {
	width: 1200,
	height: 630,
} as const;

// Twitter card type
export const TWITTER_CARD_TYPE = 'summary_large_image' as const;

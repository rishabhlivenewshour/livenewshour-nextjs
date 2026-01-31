import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo.config';

/**
 * Robots.txt configuration
 * Tells search engine crawlers which pages to index
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/api/',
					'/admin/',
					'/_next/',
					'/private/',
					'/*.json$',
					'/search?*', // Prevent indexing of search result pages
				],
			},
			{
				userAgent: 'Googlebot',
				allow: '/',
				disallow: ['/api/', '/admin/', '/private/'],
			},
		],
		sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
	};
}
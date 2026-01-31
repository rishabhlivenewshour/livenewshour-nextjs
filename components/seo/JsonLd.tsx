import { structuredDataToJsonLd } from '@/lib/seo.structured-data';
import {
	ArticleStructuredData,
	WebSiteStructuredData,
	OrganizationStructuredData,
	BreadcrumbStructuredData,
} from '@/types/seo.types';

interface JsonLdProps {
	data:
		| ArticleStructuredData
		| WebSiteStructuredData
		| OrganizationStructuredData
		| BreadcrumbStructuredData
		| Array<
				| ArticleStructuredData
				| WebSiteStructuredData
				| OrganizationStructuredData
				| BreadcrumbStructuredData
		  >;
}

/**
 * JsonLd Component
 *
 * Renders structured data (JSON-LD) for SEO purposes.
 * This helps search engines understand your content better.
 *
 * @example
 * ```tsx
 * import { generateArticleStructuredData } from '@/lib/seo.structured-data';
 *
 * <JsonLd data={generateArticleStructuredData(articleData)} />
 * ```
 *
 * @example Multiple structured data objects
 * ```tsx
 * <JsonLd
 *   data={[
 *     generateWebSiteStructuredData(),
 *     generateOrganizationStructuredData()
 *   ]}
 * />
 * ```
 */
export function JsonLd({ data }: JsonLdProps) {
	// Handle both single and multiple structured data objects
	const structuredDataArray = Array.isArray(data) ? data : [data];

	return (
		<>
			{structuredDataArray.map((item, index) => (
				<script key={index} {...structuredDataToJsonLd(item)} />
			))}
		</>
	);
}

export default JsonLd;

// Truncate text to specified length for meta descriptions
// Ensures description stays within optimal length (150-160 chars)
export function truncateDescription(
	text: string,
	maxLength: number = 160,
): string {
	if (text.length <= maxLength) return text;

	// Find the last space before maxLength to avoid cutting words
	const truncated = text.substring(0, maxLength);
	const lastSpace = truncated.lastIndexOf(' ');

	if (lastSpace > 0) {
		return truncated.substring(0, lastSpace) + '...';
	}

	return truncated + '...';
}

// Generate clean URL slug from text
// Useful for creating SEO-friendly URLs
export function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Extract plain text from HTML
// Useful for generating meta descriptions from HTML content
export function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();
}

// Format date for Open Graph and Schema.org
// Returns ISO 8601 format
export function formatDateForSEO(date: string | Date): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	return dateObj.toISOString();
}

// Validate and ensure absolute URL
// Converts relative URLs to absolute
export function ensureAbsoluteUrl(url: string, baseUrl: string): string {
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url;
	}

	// Remove leading slash if present
	const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
	// Remove trailing slash from baseUrl if present
	const cleanBaseUrl = baseUrl.endsWith('/')
		? baseUrl.substring(0, baseUrl.length - 1)
		: baseUrl;

	return `${cleanBaseUrl}/${cleanUrl}`;
}

// Generate reading time estimate
// Assumes average reading speed of 200 words per minute
export function estimateReadingTime(text: string): number {
	const wordsPerMinute = 200;
	const wordCount = text.trim().split(/\s+/).length;
	const readingTime = Math.ceil(wordCount / wordsPerMinute);
	return readingTime;
}

// Sanitize keywords array
// Removes empty strings, duplicates, and limits count
export function sanitizeKeywords(
	keywords: string[],
	maxKeywords: number = 10,
): string[] {
	return [...new Set(keywords)]
		.filter((keyword) => keyword.trim().length > 0)
		.slice(0, maxKeywords);
}

// Generate Twitter handle from username
// Ensures proper @ prefix
export function formatTwitterHandle(username: string): string {
	const clean = username.trim().replace('@', '');
	return `@${clean}`;
}

// Validate Open Graph image dimensions
// Checks if image meets recommended sizes
export function validateOgImageDimensions(
	width: number,
	height: number,
): {
	isValid: boolean;
	warnings: string[];
} {
	const warnings: string[] = [];
	let isValid = true;

	// Recommended: 1200x630
	if (width < 1200) {
		warnings.push(`Image width (${width}px) is less than recommended 1200px`);
		isValid = false;
	}

	if (height < 630) {
		warnings.push(`Image height (${height}px) is less than recommended 630px`);
		isValid = false;
	}

	// Aspect ratio check (1.91:1)
	const aspectRatio = width / height;
	const recommendedRatio = 1.91;
	if (Math.abs(aspectRatio - recommendedRatio) > 0.1) {
		warnings.push(
			`Image aspect ratio (${aspectRatio.toFixed(2)}:1) differs from recommended 1.91:1`,
		);
	}

	return { isValid, warnings };
}

// Generate breadcrumb schema items from path
// Useful for automatic breadcrumb generation
export function generateBreadcrumbItems(
	pathname: string,
	baseUrl: string,
): Array<{ name: string; url: string }> {
	const segments = pathname.split('/').filter(Boolean);
	const items = [{ name: 'Home', url: baseUrl }];

	let currentPath = '';
	segments.forEach((segment, index) => {
		currentPath += `/${segment}`;

		// Capitalize and clean segment for display
		const name = segment
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		// Don't add URL to last item (current page)
		const isLastItem = index === segments.length - 1;
		items.push({
			name,
			url: isLastItem ? '' : `${baseUrl}${currentPath}`,
		});
	});

	return items;
}

// Calculate content freshness score
// Returns score 0-100 based on how recent the content is
export function calculateFreshnessScore(publishedDate: Date): number {
	const now = new Date();
	const ageInDays = Math.floor(
		(now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	if (ageInDays === 0) return 100; // Published today
	if (ageInDays <= 1) return 95; // Published yesterday
	if (ageInDays <= 7) return 90; // Within a week
	if (ageInDays <= 30) return 80; // Within a month
	if (ageInDays <= 90) return 60; // Within 3 months
	if (ageInDays <= 180) return 40; // Within 6 months
	if (ageInDays <= 365) return 20; // Within a year

	return 10; // Older than a year
}

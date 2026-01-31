import type { Metadata, Viewport } from 'next';
import { Poppins } from '../public/fonts';
import '../styles/globals.css';
import { getCategories } from '@/services/category.service';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getArticlesForTicker } from '@/services/article.service';
import ArticleTicker from '@/components/article/ArticleTicker';
import { SEO_CONFIG } from '@/lib/seo.config';
import { generateHomeMetadata } from '@/lib/seo.metadata';
import JsonLd from '@/components/seo/JsonLd';
import {
	generateOrganizationStructuredData,
	generateWebSiteStructuredData,
} from '@/lib/seo.structured-data';

/**
 * Root metadata - applies to all pages unless overridden
 * Uses template pattern for dynamic title generation
 */
export const metadata: Metadata = {
	metadataBase: new URL(SEO_CONFIG.siteUrl),
	...generateHomeMetadata(),
	title: {
		default: SEO_CONFIG.defaultTitle,
		template: `%s | ${SEO_CONFIG.siteName}`,
	},
	applicationName: SEO_CONFIG.siteName,
	referrer: 'origin-when-cross-origin',
	category: 'news',
	// Verification tags (add your actual verification codes)
	verification: {
		google: 'your-google-site-verification-code',
		// yandex: 'your-yandex-verification-code',
		// bing: 'your-bing-verification-code',
	},
	// App-specific metadata
	appleWebApp: {
		capable: true,
		title: SEO_CONFIG.siteName,
		statusBarStyle: 'default',
	},
	formatDetection: {
		telephone: false,
		email: false,
		address: false,
	},
	// Manifest for PWA
	manifest: '/manifest.json',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.png', type: 'image/png' },
		],
		apple: '/apple-icon.png',
	},
};

/**
 * Viewport configuration
 * Separated from metadata in Next.js 14+
 */
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const categories = await getCategories();
	const tickerArticles = (await getArticlesForTicker({ page: 1, pageSize: 10 }))
		.articles;

	return (
		<html lang='en'>
			<head>
				{/* Structured Data for WebSite and Organization */}
				<JsonLd
					data={[
						generateWebSiteStructuredData(),
						generateOrganizationStructuredData(),
					]}
				/>
			</head>
			<body className={`${Poppins.variable} antialiased`}>
				<Navbar categories={categories} />
				<ArticleTicker articles={tickerArticles} />
				<div className='px-[5vw] sm:px-[14vw] py-5'>{children}</div>
				<Footer categories={categories} />
			</body>
		</html>
	);
}

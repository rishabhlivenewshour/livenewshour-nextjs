import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { generateArticleMetadata } from '@/lib/seo.metadata';
import {
	generateArticleStructuredData,
	generateBreadcrumbStructuredData,
} from '@/lib/seo.structured-data';
import { BaseArticle } from '@/types/article.types';
import { readArticleBySlug } from '@/lib/article.read';
import { getRelatedArticles } from '@/services/article.service';
import ArticleData from '@/components/article/ArticleData';
import ArticleInfo from '@/components/article/ArticleInfo';
import ArticleShare from '@/components/article/ArticleShare';
import RelatedArticles from '@/components/article/feed/RelatedArticles';

interface ArticlePageProps {
	params: {
		slug: string;
	};
}

// Generate metadata for article pages
// This runs at build time for static pages and on-demand for dynamic pages
export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = await readArticleBySlug(slug);

	// Return 404 metadata if article not found
	if (!article) {
		return {
			title: 'Article Not Found',
			description: 'The requested article could not be found.',
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	// Generate comprehensive article metadata
	return generateArticleMetadata({
		title: article.title,
		description: article.summary,
		slug: article.slug,
		image: article.banner_image,
		publishedAt: article.published_at,
		modifiedAt: article.created_at,
		author: article.author || 'Live News Hour Team',
		category_name: article.category_name,
		keywords: article.related_keywords,
		tags: article.tag ? [article.tag] : undefined,
	});
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
	const { slug } = await params;
	const article = await readArticleBySlug(slug);

	// Handle 404 case
	if (!article) {
		notFound();
	}

	// Fetch related articles
	let relatedArticles: BaseArticle[] = [];
	try {
		const response = await getRelatedArticles({
			categoryId: article.category,
			articleId: article.id,
		});
		relatedArticles = response.articles;
	} catch (error) {
		console.error('Error fetching related articles:', error);
	}

	// Generate structured data for the article
	const articleStructuredData = generateArticleStructuredData({
		title: article.title,
		description: article.summary,
		slug: article.slug,
		image: article.banner_image,
		publishedAt: article.published_at,
		modifiedAt: article.created_at,
		author: article.author || 'Live News Hour Team',
		category_name: article.category_name,
		keywords: article.related_keywords,
	});

	// Generate breadcrumb structured data
	const breadcrumbStructuredData = generateBreadcrumbStructuredData([
		{ name: 'Home', url: '/' },
		{
			name: article.category_name,
			url: `/news/topics/${article.category_name.toLowerCase()}`,
		},
		{ name: article.title },
	]);

	return (
		<>
			{/* Structured Data */}
			<JsonLd data={[articleStructuredData, breadcrumbStructuredData]} />

			<main className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<article className='lg:col-span-2'>
						<ArticleInfo article={article} />

						<ArticleShare article={article} />

						<ArticleData article={article} />
					</article>
					{relatedArticles !== null && (
						<aside className='space-y-8'>
							<RelatedArticles articles={relatedArticles} />
						</aside>
					)}
				</div>
			</main>
		</>
	);
};

export default ArticlePage;

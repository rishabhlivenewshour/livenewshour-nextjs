import ArticleFeed from '@/components/article/ArticleFeed';
import ArticleNotFound from '@/components/article/ArticleNotFound';
import HeroArticle from '@/components/article/HeroArticle';
import InfiniteArticles from '@/components/article/InfiniteArticles';
import JsonLd from '@/components/seo/JsonLd';
import Heading from '@/components/ui/Heading';
import { generateCategoryMetadata } from '@/lib/seo.metadata';
import { generateBreadcrumbStructuredData } from '@/lib/seo.structured-data';
import { getArticlesByCategory } from '@/services/article.service';
import { getCategories } from '@/services/category.service';
import { Article } from '@/types/article';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryArticlesProps {
	params: {
		category_slug: string;
	};
}

/**
 * Generate metadata for category pages
 */
export async function generateMetadata({
	params,
}: CategoryArticlesProps): Promise<Metadata> {
	const { category_slug } = await params;
	const categories = await getCategories();
	const category = categories.find((cat) => cat.slug === category_slug);

	if (!category) {
		return {
			title: 'Category Not Found',
			description: 'The requested category could not be found.',
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	return generateCategoryMetadata({
		name: category.name,
		slug: category.slug,
		description: `Browse the latest ${category.name.toLowerCase()} news and articles from Live News Hour. Stay updated with comprehensive coverage and breaking stories.`,
	});
}

const CategoryArticlesPage = async ({ params }: CategoryArticlesProps) => {
	const { category_slug } = await params;
	const categories = await getCategories();

	const category = categories.find((cat) => cat.slug === category_slug);

	let articles: Article[] = [];
	let total_pages = 1;

	if (category) {
		const data = await getArticlesByCategory({
			categoryId: category.id,
			page: 1,
			pageSize: 15,
		});

		articles = data.articles;
		total_pages = data?.pagination?.totalPages || 1;
	}

	// Handle 404 case
	if (!category || articles.length === 0) {
		notFound();
	}
	// Generate breadcrumb structured data
	const breadcrumbStructuredData = generateBreadcrumbStructuredData([
		{ name: 'Home', url: '/' },
		{ name: 'Topics', url: '/news/topics' },
		{ name: category.name },
	]);

	return (
		<>
			{/* Structured Data */}
			<JsonLd data={breadcrumbStructuredData} />
			<div className='w-full flex justify-center'>
				<div className='w-full lg:w-[60%] flex flex-col items-center'>
					<div className='w-full'>
						<Heading title={category?.name} size='lg' />
						<div className='mt-5 w-full h-fit'>
							<HeroArticle article={articles[0]} />
						</div>
						{articles.length > 1 && (
							<>
								<p className='h-[2px] bg-gray-200 w-full my-10'></p>
								<ArticleFeed
									heading={`Latest ${category.name} Stories`}
									articles={articles.slice(1)}
								/>
							</>
						)}

						{category && total_pages > 1 && (
							<InfiniteArticles
								categoryId={category.id}
								initialPage={2}
								totalPages={total_pages}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryArticlesPage;

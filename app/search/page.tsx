import { Metadata } from 'next';
import { generateSearchMetadata } from '@/lib/seo.metadata';
import { BaseArticle, ServiceResult } from '@/types/article.types';
import { readCategories } from '@/lib/category.read';
import { getArticlesBySearch } from '@/services/article.service';
import SearchClient from '@/components/article/search/SearchClient';
import ArticleFeedByCategory from '@/components/article/feed/ArticleFeedByCategory.server';

interface SearchPageProps {
	searchParams: {
		q: string;
	};
}

// Generate metadata for search pages
// Dynamically includes search query in title and description
export async function generateMetadata({
	searchParams,
}: SearchPageProps): Promise<Metadata> {
	const { q = '' } = await searchParams;

	return generateSearchMetadata({
		query: q,
	});
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { q } = await searchParams;

	let initialData: ServiceResult<BaseArticle[]> = {
		articles: [],
		pagination: {
			page: 1,
			page_size: 15,
			total_pages: 0,
			total_items: 0,
		},
	};

	if (q) {
		initialData = await getArticlesBySearch({
			searchQuery: q,
			page: 1,
			pageSize: 15,
		});
	}

	const categories = await readCategories();

	return (
		<div className=''>
			<div className='flex flex-col lg:flex-row gap-10 pt-5 pb-16 tracking-wide'>
				<div className='w-full lg:w-[25%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-10 order-2 lg:order-1'>
					{categories
						.slice(Math.floor(categories.length / 2))
						.map((category) => (
							<ArticleFeedByCategory key={category.id} category={category} />
						))}
				</div>

				<SearchClient initialQuery={q} initialData={initialData} />

				<div className='w-full lg:w-[25%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-10 order-3 lg:order-3'>
					{categories
						.slice(0, Math.floor(categories.length / 2))
						.map((category) => (
							<ArticleFeedByCategory key={category.id} category={category} />
						))}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;

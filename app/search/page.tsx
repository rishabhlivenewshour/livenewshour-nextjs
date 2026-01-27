import ArticleFeedByCategory from '@/components/article/ArticleFeedByCategory.server';
import SearchClient from '@/components/article/SearchClient';
import { getArticlesBySearch } from '@/services/article.service';
import { getCategories } from '@/services/category.service';

interface SearchPageProps {
	searchParams: {
		q: string;
	};
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { q } = await searchParams;
	const initialData = await getArticlesBySearch({
		searchQuery: q,
		page: 1,
		pageSize: 15,
	});

	const categories = await getCategories();

	return (
		<div className='py-5'>
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

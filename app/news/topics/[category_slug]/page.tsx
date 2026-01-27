import ArticleFeed from '@/components/article/ArticleFeed';
import HeroArticle from '@/components/article/HeroArticle';
import InfiniteArticles from '@/components/article/InfiniteArticles';
import Heading from '@/components/ui/Heading';
import { getArticlesByCategory } from '@/services/article.service';
import { getCategories } from '@/services/category.service';
import { Article } from '@/types/article';

interface CategoryArticlesProps {
	params: {
		category_slug: string;
	};
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
		articles = Array.isArray(data?.articles) ? data.articles : [];
		total_pages = data?.pagination?.totalPages || 1;
	} else {
		return null;
	}

	if (articles.length === 0) return null;

	return (
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
	);
};

export default CategoryArticlesPage;

import HeroSection from '@/components/article/HeroSection';
import Heading from '@/components/ui/Heading';
import { getArticles, getHeroArticles } from '@/services/article.service';
import FacebookFeed from '@/components/social/FacebookFeed';
import InstagramFeed from '@/components/social/InstagramFeed';
import YoutubeFeed from '@/components/social/YoutubeFeed';
import { getCategories } from '@/services/category.service';
import ArticleFeedByCategory from '@/components/article/ArticleFeedByCategory.server';
import ArticleSkeleton from '@/components/article/ArticleSkeleton';
import ArticleFeed from '@/components/article/ArticleFeed';

const Home = async () => {
	const heroArticles = await getHeroArticles();
	const categories = await getCategories();
	const articlesData = await getArticles({ page: 1, pageSize: 30 });

	const articles = Array.isArray(articlesData.articles)
		? articlesData.articles
		: [];

	return (
		<div className=''>
			<Heading title='Headlines' size='lg' />
			<HeroSection
				heroArticle={heroArticles[0]}
				articles={heroArticles.slice(1)}
			/>
			<div className='flex flex-col lg:flex-row gap-5 pt-5 pb-16'>
				<div className='w-full lg:w-[60%]'>
					{articles.length === 0 ? (
						<>
							<h2 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 mb-5 uppercase'>
								Latest Stories
							</h2>
							<div className='grid grid-cols-1 gap-6 mb-10'>
								{[...Array(10)].map((_, i: number) => (
									<ArticleSkeleton key={i} variant='list' />
								))}
							</div>
							<p className='h-0.5 bg-gray-200 w-full my-10'></p>
							<h2 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 mb-5 uppercase'>
								Most Read
							</h2>
							<div className='grid grid-cols-1 gap-6'>
								{[...Array(10)].map((_, i: number) => (
									<ArticleSkeleton key={i} variant='list' />
								))}
							</div>
						</>
					) : (
						<>
							<ArticleFeed
								heading='Latest Stories'
								articles={articles.slice(4, 17)}
							/>
							<p className='h-[2px] bg-gray-200 w-full my-10'></p>
							<ArticleFeed heading='Most Read' articles={articles.slice(17)} />
						</>
					)}
				</div>

				<div className='w-full lg:w-[40%] flex flex-row lg:flex-col gap-10 flex-wrap lg:flex-nowrap'>
					<div className='pl-0 lg:pl-5'>
						<FacebookFeed />
					</div>
					<div className='pl-0 lg:pl-5'>
						<YoutubeFeed />
					</div>
					<div className='pl-0 lg:pl-5'>
						<InstagramFeed />
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
						{categories.slice(0, 12).map((category) => (
							<ArticleFeedByCategory key={category.id} category={category} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateHomeMetadata } from '@/lib/seo.metadata';
import { Category } from '@/types/category.types';
import {  BaseArticle } from '@/types/article.types';
import { getArticles, getHeroArticles } from '@/services/article.service';
import { getCategories } from '@/services/category.service';
import ArticleSkeleton from '@/components/article/ui/ArticleSkeleton';
import Heading from '@/components/ui/Heading';
import HeroSection from '@/components/article/hero/HeroSection';
import ArticleFeed from '@/components/article/feed/ArticleFeed';
import ArticleFeedByCategory from '@/components/article/feed/ArticleFeedByCategory.server';
const FacebookFeed = dynamic(() => import('../components/social/FacebookFeed'));
const InstagramFeed = dynamic(
	() => import('../components/social/InstagramFeed'),
);
const YoutubeFeed = dynamic(() => import('../components/social/YoutubeFeed'));

// Home page metadata
// Uses the default SEO configuration
export const metadata: Metadata = generateHomeMetadata();

const Home = async () => {
	let heroArticles: BaseArticle[] = [];
	let articles: BaseArticle[] = [];
	let categories: Category[] = [];

	try {
		// Fetch all data in parallel for better performance
		const [heroData, articlesData, categoriesData] = await Promise.all([
			getHeroArticles({ page: 1, pageSize: 4 }),
			getArticles({ page: 1, pageSize: 30 }),
			getCategories(),
		]);

		heroArticles = heroData.articles;
		articles = articlesData.articles;
		categories = categoriesData;
	} catch (error) {
		console.error('Error fetching home page data:', error);
	}

	return (
		<div className=''>
			{/* Hero Section */}
			<Heading title='Headlines' size='xl' />
			<HeroSection
				heroArticle={heroArticles[0]}
				articles={heroArticles.slice(1)}
			/>

			<div className='flex flex-col lg:flex-row gap-5 pt-5 pb-16 mt-5'>
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

					{categories.length > 0 && (
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10'>
							{categories.slice(0).map((category) => (
								<ArticleFeedByCategory key={category.id} category={category} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;

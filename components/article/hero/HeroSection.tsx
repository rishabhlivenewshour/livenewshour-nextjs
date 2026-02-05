import { BaseArticle } from '@/types/article.types';
import HeroArticle from './HeroArticle';
import HeroArticleCard from './HeroArticleCard';
import ArticleSkeleton from '../ui/ArticleSkeleton';

interface HeroSectionProps {
	heroArticle: BaseArticle;
	articles: BaseArticle[];
}

const HeroSection = ({ heroArticle, articles }: HeroSectionProps) => {
	return (
		<div className='py-5 flex flex-col lg:flex-row gap-10 lg:gap-5'>
			<div className='w-full lg:w-[65%] h-fit min-h-[350px]'>
				{heroArticle ? (
					<HeroArticle article={heroArticle} />
				) : (
					<ArticleSkeleton variant='hero' />
				)}
			</div>
			<div className='w-full lg:w-[35%] flex flex-col gap-8 lg:gap-5 text-sm tracking-wide'>
				{articles.length > 0 ? (
					articles.map((article) => (
						<HeroArticleCard article={article} key={article.id} />
					))
				) : (
					<>
						<ArticleSkeleton variant='list' />
						<ArticleSkeleton variant='list' />
						<ArticleSkeleton variant='list' />
					</>
				)}
			</div>
		</div>
	);
};

export default HeroSection;

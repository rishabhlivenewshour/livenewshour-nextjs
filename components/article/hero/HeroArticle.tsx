import Link from 'next/link';
import { BaseArticle } from '@/types/article.types';
import { formatDate } from '@/lib/common';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';

interface HeroArticleProps {
	article: BaseArticle;
}

const HeroArticle = ({ article }: HeroArticleProps) => {
	return (
		<div className='w-full h-full'>
			{article && (
				<Link
					href={`/news/articles/${article.slug}`}
					className='flex flex-col tracking-wide'
					aria-label={`view ${article.title} article`}
				>
					{article.banner_image && (
						<ImageWithSkeleton
							src={article.banner_image}
							alt={article.title}
							parentClassName='w-full max-w-[450px] xl:max-w-full h-[350px]'
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
							priority={true}
						/>
					)}
					<div className='mt-2'>
						<h2 className='w-full font-semibold text-xl tracking-wider'>
							{article.title}
						</h2>
						<p className='w-[90%] text-base text-light h-13 overflow-hidden line-clamp-2'>
							{article.summary}
						</p>
					</div>

					<div className='flex justify-between text-sm mt-2'>
						<p className='font-semibold text-primary'>
							{article.category_name}
						</p>
						<p className='text-light'>
							{article.author + ' | ' + formatDate(article.published_at || '')}
						</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default HeroArticle;

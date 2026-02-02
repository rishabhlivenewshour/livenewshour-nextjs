import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import { Article } from '@/types/article.types';
import Image from 'next/image';
import Link from 'next/link';

interface HeroArticleCardProps {
	article: Article;
}

const HeroArticleCard = ({ article }: HeroArticleCardProps) => {
	return (
		<div className='h-fit min-h-[120px] w-fit min-w-[150px]'>
			{article && (
				<Link
					href={`/news/articles/${article.slug}`}
					key={article.id}
					className='flex gap-3'
					aria-label={`view ${article.title} article`}
				>
					{article.banner_image && (
						<ImageWithSkeleton
							src={article.banner_image}
							alt={article.title}
							parentClassName='w-[100px] h-[100px]'
						/>
					)}
					<div className='w-[70%]'>
						<h2 className='font-semibold'>{article.title}</h2>
						<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
							{article.summary}
						</p>
						<p className='font-semibold text-xs text-primary mt-1'>
							{article.category_name}
						</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default HeroArticleCard;

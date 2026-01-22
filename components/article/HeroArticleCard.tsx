import { Article } from '@/types/article';
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
				>
					{article.banner_image && (
						<Image
							src={article.banner_image}
							alt={article.title}
							width={100}
							height={100}
							className='w-[100px] h-[100px] object-cover rounded'
						/>
					)}
					<div className=''>
						<h2 className='font-semibold'>{article.title}</h2>
						<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
							{article.summary}
						</p>
						<p className='font-semibold text-xs text-primary'>
							{article.category_name}
						</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default HeroArticleCard;

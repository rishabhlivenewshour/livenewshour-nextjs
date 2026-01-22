import { Article } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '../ui/Heading';

interface ArticleFeedProps {
	heading: string;
	articles: Article[];
}

const ArticleFeed = ({ heading, articles }: ArticleFeedProps) => {
	return (
		<div className=''>
            <Heading title={heading} size='md'/>
			<div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10 text-sm tracking-wide'>
				{articles.map((article) => (
					<Link
						href={`/news/articles/${article.slug}`}
						key={article.id}
						className='group flex flex-col gap-2 rounded'
					>
						{article.banner_image && (
							<div className='flex gap-2'>
								<Image
									src={article.banner_image}
									alt={article.title}
                                    height={200}
                                    width={200}
									className='w-full h-[200px] object-cover rounded'
									
								/>
							</div>
						)}

						<h2 className='font-semibold group-hover:text-primary  rounded transition-all duration-150 ease-in-out'>
							{article.title}
						</h2>
						<div className=''>
							<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
								{article.summary}
							</p>
							<p className='font-semibold text-xs text-primary mt-1'>
								{article.category_name}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ArticleFeed;

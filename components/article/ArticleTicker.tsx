import { Article } from '@/types/article';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

interface ArticleTickerProps {
	articles: Article[];
}

const ArticleTicker = ({ articles }: ArticleTickerProps) => {
	if (articles.length === 0) return null;

	return (
		<div className='w-full bg-primary text-white shadow-sm pt-0.5 pb-1'>
			<div className='flex'>
				<p className='h-full px-3 text-base bg-primary'>Latest</p>
				<Marquee delay={1} pauseOnHover={true}>
					{articles.map((article) => (
						<Link
							key={article.id}
							href={`/news/articles/${article.slug}`}
							className='text-sm font-semibold px-4 border-r-2 border-white hover:text-white/95 transition'
						>
							<span className=''>{article.title}</span>
						</Link>
					))}
				</Marquee>
			</div>
		</div>
	);
};

export default ArticleTicker;

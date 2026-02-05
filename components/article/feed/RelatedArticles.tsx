import Link from 'next/link';
import { BaseArticle } from '@/types/article.types';
import { formatDate } from '@/lib/common';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';

interface RelatedArticlesProps {
	articles: BaseArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
	return (
		<>
			{articles.length > 0 && (
				<div className='bg-white border border-gray-300 rounded-lg overflow-hidden'>
					<div className='bg-gray-100 px-4 py-3 border-b border-gray-300'>
						<h3 className='font-bold text-lg'>Related Articles</h3>
					</div>
					<div className='divide-y divide-gray-200'>
						{articles.map((related) => (
							<Link
								key={related.id}
								href={`/news/articles/${related.slug}`}
								className='block p-4 hover:bg-gray-50 transition'
								aria-label={`view ${related.title} article`}
							>
								<div className='flex gap-3'>
									{related.banner_image && (
										<ImageWithSkeleton
											src={related.banner_image}
											alt={related.title}
											parentClassName='w-24 h-24'
										/>
									)}
									<div className='flex-1'>
										<h4 className='font-semibold text-sm leading-tight mb-2'>
											{related.title}
										</h4>
										<p className='text-xs text-gray-500'>
											{formatDate(related.published_at || '')}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default RelatedArticles;

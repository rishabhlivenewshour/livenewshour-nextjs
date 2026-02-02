import { Article } from '@/types/article.types';
import Link from 'next/link';
import ArticleSkeleton from '../ui/ArticleSkeleton';
import { LoaderIcon } from '../../common/Icons';
import ImageWithSkeleton from '../../common/ImageWithSkeleton';
import Heading from '../../ui/Heading';

interface SearchResultsProps {
	debouncedQuery: string;
	results: Article[];
	hasMore: boolean;
	observerRef: (node: HTMLDivElement | null) => void;
	loading: boolean;
	currentPage: number;
	recentArticles: Article[];
}

const SearchResults = ({
	debouncedQuery,
	results,
	hasMore,
	observerRef,
	loading,
	currentPage,
	recentArticles,
}: SearchResultsProps) => {
	return (
		<div className='flex flex-col gap-5 my-10'>
			{results.length > 0 ? (
				<>
					{results.map((article) => (
						<Link
							href={`/news/articles/${article.slug}`}
							key={article.id}
							className='flex gap-3 w-full hover:bg-gray-100 p-2 rounded transition'
							aria-label={`view ${article.title} article`}
						>
							{article.banner_image && (
								<ImageWithSkeleton
									src={article.banner_image}
									alt={article.title}
									parentClassName='w-full max-w-[150px] lg:max-w-[200px] h-[150px]'
								/>
							)}
							<div className='flex-1'>
								<h2 className='font-semibold'>{article.title}</h2>
								<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
									{article.summary}
								</p>
								<div className='flex justify-between text-xs mt-1'>
									<p className='font-semibold text-primary'>
										{article.category_name}
									</p>
									<p className='lg:hidden xl:block text-light italic'>
										{'- '}
										{article.author}
									</p>
								</div>
							</div>
						</Link>
					))}

					{hasMore && (
						<div
							ref={observerRef}
							className='flex justify-center items-center py-6'
						>
							{loading ? (
								<div className='flex flex-col items-center gap-3'>
									<LoaderIcon className='animate-spin text-red-600' size={40} />
									<p className='text-gray-600 text-sm'>
										Loading more results...
									</p>
								</div>
							) : (
								<div className='h-10'></div>
							)}
						</div>
					)}

					{!hasMore && results.length > 0 && (
						<div className='py-6 text-center'>
							<p className='text-gray-500 text-sm'>
								You&apos;ve reached the end of search results
							</p>
						</div>
					)}
				</>
			) : (
				<div className='w-full'>
					{loading && currentPage === 1 ? (
						<div className='flex flex-col gap-5'>
							<ArticleSkeleton variant='list' />
							<ArticleSkeleton variant='list' />
							<ArticleSkeleton variant='list' />
						</div>
					) : (
						<>
							<p className='text-light text-center mb-10'>
								{debouncedQuery
									? 'No results found'
									: 'Start typing to search articles'}
							</p>
							{recentArticles && recentArticles.length > 0 && (
								<div className='w-full flex flex-col'>
									<Heading title='Read Latest news' size='sm' />
									<div className='flex flex-col gap-5 mt-5'>
										{recentArticles.map((article) => (
											<Link
												href={`/news/articles/${article.slug}`}
												key={article.id}
												className='flex gap-3 hover:bg-gray-100 p-2 rounded transition'
												aria-label={`view ${article.title} article`}
											>
												{article.banner_image && (
													<ImageWithSkeleton
														src={article.banner_image}
														alt={article.title}
														parentClassName='w-full max-w-[150px] lg:max-w-[200px] h-[150px]'
													/>
												)}
												<div className='flex-1'>
													<h2 className='font-semibold'>{article.title}</h2>
													<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
														{article.summary}
													</p>
													<p className='font-semibold text-xs text-primary'>
														{article.category_name}
													</p>
												</div>
											</Link>
										))}
									</div>
								</div>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchResults;

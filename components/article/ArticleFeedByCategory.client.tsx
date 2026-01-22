'use client';

import { Article } from '@/types/article';
import Heading from '../ui/Heading';
import { useEffect, useRef, useState } from 'react';
import { Category } from '@/types/category';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleFeedByCategoryClientProps {
	category: Category;
	categoryArticles: Article[];
}

const ArticleFeedByCategoryClient = ({
	category,
	categoryArticles,
}: ArticleFeedByCategoryClientProps) => {
	const router = useRouter();
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{
				threshold: 0.1,
				rootMargin: '50px',
			},
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={elementRef} className='w-full'>
			<div className='flex justify-between items-start'>
				<Heading title={category.name} size='sm' />
				{categoryArticles.length >= 4 && (
					<button
						className='flex gap-0.5 py-0.75 hover:text-primary transition'
						onClick={() => router.push(`/news/topics/${category.slug}`)}
						aria-label={`View all ${category.name} articles`}
					>
						<span className='text-xs'>View all</span>
						{/* <ChevronRightIcon size={15} /> */}
					</button>
				)}
			</div>

			{!isVisible && (
				<div className='flex flex-col gap-3 animate-pulse'>
					<div className='h-40 bg-gray-300 rounded'></div>
					<div className='h-4 bg-gray-300 rounded w-3/4'></div>
					<div className='h-4 bg-gray-300 rounded w-1/2'></div>
				</div>
			)}

			<div className='flex flex-col gap-3 mt-2'>
				<Link
					href={`/news/articles/${categoryArticles[0].slug}`}
					key={categoryArticles[0].id}
					className='flex flex-col gap-2 rounded transition-all duration-150 ease-in-out group'
				>
					{categoryArticles[0].banner_image && (
						<Image
							src={categoryArticles[0].banner_image}
							alt={categoryArticles[0].title}
							height={200}
							width={100}
							className='w-full h-[200px] sm:max-w-[250px] lg:max-w-[300px] object-cover rounded'
						/>
					)}
					<h2 className='text-[13px] font-[500] w-full sm:max-w-[300px] mt-3 group-hover:text-primary transition'>
						{categoryArticles[0].title}
					</h2>
				</Link>

				{categoryArticles.slice(1, 4).map((article) => (
					<Link
						href={`/news/articles/${article.slug}`}
						key={article.id}
						className='flex flex-col gap-1 rounded hover:text-primary border-t border-gray-300 transition-all duration-150 ease-in-out'
					>
						<h2 className='text-[13px] font-[500] w-full sm:max-w-[300px] mt-2'>
							{article.title}
						</h2>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ArticleFeedByCategoryClient;

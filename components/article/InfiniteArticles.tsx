'use client';

import { Article } from '@/types/article';
import { useEffect, useRef, useState } from 'react';
import ArticleFeed from './ArticleFeed';
import { getArticlesByCategoryClient } from '@/services/article.service';
import ArticleSkeleton from './ArticleSkeleton';

interface InfiniteArticlesProps {
	categoryId: string;
	initialPage: number;
	totalPages: number;
}

const InfiniteArticles = ({
	categoryId,
	initialPage,
	totalPages,
}: InfiniteArticlesProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const pageRef = useRef(initialPage);
	const loadingRef = useRef(false);

	const hasMoreRef = useRef(initialPage < totalPages);
	const [hasMore, setHasMore] = useState(hasMoreRef.current);

	const [articles, setArticles] = useState<Article[]>([]);

	const loadNextPage = async () => {
		if (!hasMoreRef.current || loadingRef.current) return;

		loadingRef.current = true;
		try {
			const data = await getArticlesByCategoryClient({
				categoryId: categoryId,
				page: pageRef.current,
				pageSize: 15,
			});

			const newArticles = data?.articles || [];

			if (newArticles.length === 0) {
				setHasMore(false);
				return;
			}

			// Append new articles to existing ones
			setArticles((prev) => {
				// Avoid duplicates
				const existingIds = new Set(prev.map((a) => a.id));
				const uniqueNew = newArticles.filter((a) => !existingIds.has(a.id));
				return [...prev, ...uniqueNew];
			});

			if (data?.pagination && pageRef.current >= data?.pagination?.totalPages) {
				hasMoreRef.current = false;
				setHasMore(false);
			}

			pageRef.current += 1;
		} catch (error) {
			console.error('Failed to fetch articles:', error);
			setHasMore(false);
			hasMoreRef.current = false;
		} finally {
			loadingRef.current = false;
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadNextPage();
				}
			},
			{
				threshold: 0.1,
				rootMargin: '100px',
			},
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => observer.disconnect();
	}, []);

	if (!hasMore && articles.length === 0) return null;

	return (
		<>
			{articles.length > 0 && (
				<ArticleFeed heading='More Stories' articles={articles} />
			)}

			<div ref={elementRef} className='py-10 text-center text-sm text-gray-500'>
				{hasMore && (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full'>
						<ArticleSkeleton variant='card' />
						<ArticleSkeleton variant='card' />
						<ArticleSkeleton variant='card' />
						<ArticleSkeleton variant='card' />
					</div>
				)}
			</div>
		</>
	);
};

export default InfiniteArticles;

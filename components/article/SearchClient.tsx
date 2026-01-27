'use client';

import Input from '../ui/Input';
import { SearchIcon } from '../common/Icons';
import { Article, ArticleByCategoryResponse } from '@/types/article';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { getArticlesBySearchClient } from '@/services/article.service';
import { useRouter } from 'next/navigation';
import SearchResults from './SearchResults';

interface SearchClientProps {
	initialQuery: string;
	initialData: ArticleByCategoryResponse;
}

const SearchClient = ({ initialQuery, initialData }: SearchClientProps) => {
	const router = useRouter();

	const observer = useRef<IntersectionObserver | null>(null);
	const pageRef = useRef(2);
	const loadingRef = useRef(false);

	const [query, setQuery] = useState(initialQuery);
	const [results, setResults] = useState<Article[]>(initialData.articles);
	const [hasMore, setHasMore] = useState(initialData.pagination.totalPages > 1);

	const debouncedQuery = useDebounce({ value: query, delay: 500 });

	useEffect(() => {
		pageRef.current = 1;
		setResults([]);
		setHasMore(true);
		console.log(debouncedQuery);
		router.replace(
			debouncedQuery
				? `/search?q=${encodeURIComponent(debouncedQuery)}`
				: '/search',
			{ scroll: false },
		);

		loadNextPage(true);
	}, [debouncedQuery]);

	const loadNextPage = async (isFirst = false) => {
		if (!debouncedQuery || !hasMore || loadingRef.current) return;

		loadingRef.current = true;

		try {
			const data = await getArticlesBySearchClient({
				searchQuery: debouncedQuery,
				page: pageRef.current,
				pageSize: 15,
			});

			if (isFirst) {
				setResults(data?.articles || []);
			} else {
				setResults((prev) => {
					const existingIds = new Set(prev.map((a) => a.id));
					const uniqueNew =
						data?.articles.filter((a) => !existingIds.has(a.id)) || [];
					return [...prev, ...uniqueNew];
				});
			}

			console.log(data?.pagination);
			console.log(pageRef.current);

			if (data?.pagination && pageRef.current >= data?.pagination.totalPages) {
				setHasMore(false);
			}

			pageRef.current += 1;
		} catch (error) {
			console.error('Failed to fetch articles:', error);
			setHasMore(false);
		} finally {
			loadingRef.current = false;
		}
	};

	const observerRef = (node: HTMLDivElement | null) => {
		if (loadingRef.current) return null;

		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadNextPage();
				}
			},
			{
				threshold: 0.1,
				rootMargin: '50px',
			},
		);

		if (node) observer.current.observe(node);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div className='w-full lg:w-[50%] flex flex-col order-1 lg:order-2'>
			<div className='flex flex-col gap-2 w-full'>
				<p>Search news, topics and more</p>
				<Input
					type='text'
					placeholder='search here'
					value={query}
					onChange={handleChange}
					icon={SearchIcon}
				/>
			</div>

			<SearchResults
				debouncedQuery={debouncedQuery}
				results={results}
				hasMore={hasMore}
				observerRef={observerRef}
				loading={loadingRef.current}
				currentPage={pageRef.current}
			/>
		</div>
	);
};

export default SearchClient;

import { CACHE_TAGS, CACHE_TIME } from '@/lib/cache';
import { Category } from '@/types/category.types';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCategories = async (): Promise<Category[]> => {
	const res = await fetch(`${API_URL}/news/categories`, {
		next: {
			revalidate: CACHE_TIME.CATEGORIES,
			tags: [CACHE_TAGS.CATEGORIES],
		},
	});

	if (!res.ok) {
		throw new Error('no categories found');
	}

	return await res.json();
};

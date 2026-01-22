import { Category } from '@/types/category';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCategories = async (): Promise<Category[]> => {
	const res = await fetch(`${API_URL}/news/categories`, {
		next: { revalidate: 60 * 10 }, // 10 minutes
	});

	if (!res.ok) {
		throw new Error('no categories found');
	}

	return await res.json();
};

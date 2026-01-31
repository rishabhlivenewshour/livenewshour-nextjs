import { getCategories } from '@/services/category.service';
import { cache } from 'react';

export const readCategories = cache(async () => {
	const categories = await getCategories();

	if (!categories) return [];

	return categories;
});

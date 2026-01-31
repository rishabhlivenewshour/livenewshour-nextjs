import { getArticlesByCategory } from '@/services/article.service';
import { Category } from '@/types/category.types';
import ArticleFeedByCategoryClient from './ArticleFeedByCategory.client';

interface ArticleFeedByCategoryProps {
	category: Category;
}

const ArticleFeedByCategory = async ({
	category,
}: ArticleFeedByCategoryProps) => {
	if (!category.id) return null;

	const { articles } = await getArticlesByCategory({
		categoryId: category.id,
		page: 1,
		pageSize: 4,
	});

	if (articles.length === 0) return null;

	return (
		<ArticleFeedByCategoryClient
			category={category}
			categoryArticles={articles}
		/>
	);
};

export default ArticleFeedByCategory;

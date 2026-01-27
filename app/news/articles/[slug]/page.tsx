import ArticleData from '@/components/article/ArticleData';
import ArticleInfo from '@/components/article/ArticleInfo';
import ArticleShare from '@/components/article/ArticleShare';
import RelatedArticles from '@/components/article/RelatedArticles';
import {
	getArticleBySlug,
	getRelatedArticles,
} from '@/services/article.service';

interface ArticlePageProps {
	params: {
		slug: string;
	};
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
	const { slug } = await params;
	const article = await getArticleBySlug({ slug });
	const relatedArticles = await getRelatedArticles({
		categoryId: article.category || null,
		articleId:article.id || null
	});

	return (
		<main className='max-w-7xl mx-auto'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<article className='lg:col-span-2'>
					<ArticleInfo article={article} />

					<ArticleShare article={article} />

					<ArticleData article={article} />
				</article>
				{relatedArticles !== null && (
					<aside className='space-y-8'>
						<RelatedArticles articles={relatedArticles} />
					</aside>
				)}
			</div>
		</main>
	);
};

export default ArticlePage;

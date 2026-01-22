import ArticleData from '@/components/article/ArticleData';
import ArticleInfo from '@/components/article/ArticleInfo';
import { getArticleBySlug } from '@/services/article.service';

interface ArticlePageProps {
	params: {
		slug: string;
	};
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
	const { slug } = await params;
	const article = await getArticleBySlug({ slug });
	return (
		<main className='max-w-7xl mx-auto'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<article className='lg:col-span-2'>
					<ArticleInfo article={article} />

					{/* <ArticleShare article={article} /> */}

					<ArticleData article={article} />
				</article>
				<aside className='space-y-8'>
					{/* <RelatedArticles article={article} /> */}
				</aside>
			</div>
		</main>
	);
};

export default ArticlePage;

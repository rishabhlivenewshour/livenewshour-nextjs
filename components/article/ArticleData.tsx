import { Article } from '@/types/article';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { TagIcon } from '../common/Icons';

interface ArticleDataProps {
	article: Article;
}

const ArticleData = ({ article }: ArticleDataProps) => {
	const sanatizeHtml = (html?: string): string => {
		if (!html) return '';
		return DOMPurify.sanitize(html.replace(/\\"/g, '"'));
	};

	const purifiedContent = sanatizeHtml(article.content);
	const purifiedSecondaryContent = sanatizeHtml(article.secondary_content);

	return (
		<>
			{article.banner_image && (
				<figure className='mb-8'>
					<Image
						src={article.banner_image}
						alt={article.title}
						height={300}
						width={500}
						className='w-full rounded-lg shadow-lg'
					/>
				</figure>
			)}

			<div className='editor-content prose prose-lg max-w-none mb-12'>
				<div
					className='text-gray-800 leading-relaxed'
					dangerouslySetInnerHTML={{
						__html: purifiedContent,
					}}
				/>
			</div>

			{article.secondary_banner_image && (
				<figure className='mb-8'>
					<Image
						src={article.secondary_banner_image}
						alt={article.title}
						height={350}
						width={500}
						className='w-full rounded-lg shadow-lg'
					/>
				</figure>
			)}
			{article.secondary_content && (
				<div className='editor-content prose prose-lg max-w-none mb-12'>
					<div
						className='text-gray-800 leading-relaxed'
						dangerouslySetInnerHTML={{
							__html: purifiedSecondaryContent,
						}}
					/>
				</div>
			)}

			{article.related_keywords && article.related_keywords.length > 0 && (
				<div className='border-t border-gray-300 pt-6 mb-8 flex flex-wrap gap-4'>
					<div className='text-sm flex flex-wrap gap-2'>
						{article.related_keywords.map((keyword, index) => (
							<span
								key={`${keyword}-${index}`}
								className='flex items-center justify-center gap-1 px-2 py-1 bg-gray-500 text-white rounded'
							>
								<TagIcon size={14} />
								{keyword}
							</span>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default ArticleData;

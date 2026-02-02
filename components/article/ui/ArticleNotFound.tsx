import Link from 'next/link';

interface ArticleNotFoundProps {
	error?: string;
}

const ArticleNotFound = ({ error }: ArticleNotFoundProps) => {
	return (
		<div className='min-h-[500px] bg-gray-50 flex items-center justify-center'>
			<div className='text-center max-w-md'>
				<div className='text-6xl mb-4'>📰</div>
				<h2 className='text-2xl font-bold text-gray-800 mb-2'>
					Article Not Found
				</h2>
				<p className='text-gray-600 mb-6'>
					{error || 'The article you are looking for does not exist.'}
				</p>
				<Link
					href={'/'}
					className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition font-semibold'
					aria-label={'Go to Homepage'}
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
};

export default ArticleNotFound;

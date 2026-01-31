import Link from 'next/link';
import { Metadata } from 'next';
import { generateErrorMetadata } from '@/lib/seo.metadata';

// 404 page metadata
export const metadata: Metadata = generateErrorMetadata('Page Not Found');

// 404 Not Found Page
// Displayed when a route doesn't exist
export default function NotFound() {
	return (
		<div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
			<div className='text-center max-w-md'>
				<h1 className='text-9xl font-bold text-primary mb-4'>404</h1>
				<h2 className='text-3xl font-semibold text-gray-800 mb-4'>
					Page Not Found
				</h2>
				<p className='text-gray-600 mb-8'>
					Sorry, we couldn&apos;t find the page you&apos;re looking for. The
					page may have been moved, deleted, or the URL might be incorrect.
				</p>

				<div className='flex gap-4 justify-center'>
					<Link
						href='/'
						className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
					>
						Go to Homepage
					</Link>
					<Link
						href='/search'
						className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
					>
						Search Articles
					</Link>
				</div>

				<div className='mt-12'>
					<p className='text-sm text-gray-500 mb-4'>Popular Categories:</p>
					<div className='flex flex-wrap gap-2 justify-center'>
						{['World', 'Business', 'Technology', 'Sports', 'Entertainment'].map(
							(category) => (
								<Link
									key={category}
									href={`/news/topics/${category.toLowerCase()}`}
									className='px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors'
								>
									{category}
								</Link>
							),
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

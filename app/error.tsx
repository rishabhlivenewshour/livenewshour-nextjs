'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

// Error Page Component
// Handles runtime errors gracefully
// Note: Error pages cannot use generateMetadata, so SEO is handled via noindex
export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Application error:', error);
	}, [error]);

	return (
		<div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
			<div className='text-center max-w-md'>
				<h1 className='text-6xl font-bold text-primary mb-4'>Oops!</h1>
				<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
					Something went wrong
				</h2>
				<p className='text-gray-600 mb-8'>
					We encountered an unexpected error. Don&apos;t worry, our team has
					been notified and we&apos;re working on fixing it.
				</p>

				<div className='flex gap-4 justify-center'>
					<button
						onClick={reset}
						className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
						aria-label={'Try Again'}
					>
						Try Again
					</button>
					<Link
						href='/'
						className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
						aria-label={'Go to Homepage'}
					>
						Go Home
					</Link>
				</div>

				{process.env.NODE_ENV === 'development' && (
					<div className='mt-8 p-4 bg-gray-100 rounded-lg text-left'>
						<p className='font-mono text-sm text-red-600 break-all'>
							{error.message}
						</p>
						{error.digest && (
							<p className='font-mono text-xs text-gray-500 mt-2'>
								Digest: {error.digest}
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

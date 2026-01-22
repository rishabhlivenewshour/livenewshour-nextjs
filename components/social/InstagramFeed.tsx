'use client';

import { useEffect } from 'react';
import { InstagramIcon } from '../common/Icons';

export default function InstagramFeed({
	profileUrl = 'https://www.instagram.com/livenewshour/',
	profileName = 'livenewshour',
}) {
	useEffect(() => {
		// Load Instagram embed script
		if (window.instgrm) {
			window.instgrm.Embeds.process();
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://www.instagram.com/embed.js';
		script.async = true;
		script.defer = true;

		document.body.appendChild(script);

		return () => {
			// Cleanup is safe but not needed
		};
	}, []);

	return (
		<div className='w-full mx-auto mt-8'>
			<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
				{/* Header */}
				<div className='bg-gradient-to-r from-pink-600 to-purple-600 p-4'>
					<div className='flex items-center gap-3 text-white'>
						<InstagramIcon size={28} />
						<div>
							<h3 className='font-bold text-lg'>Follow Us on Instagram</h3>
							<p className='text-sm opacity-90'>{profileName}</p>
						</div>
					</div>
				</div>

				{/* Embed */}
				<div className='p-6 bg-gray-50'>
					<blockquote
						className='instagram-media w-full'
						data-instgrm-permalink={profileUrl}
						data-instgrm-version='14'
					>
						<div className='flex flex-col items-center justify-center py-20 text-gray-500'>
							<div className='animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600 mb-3'></div>
							<p className='text-sm'>Loading Instagram feed...</p>
						</div>
					</blockquote>
				</div>

				{/* Visit Button */}
				<div className='p-4 bg-white border-t border-gray-200'>
					<a
						href={profileUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md'
					>
						<InstagramIcon size={18} />
						Visit Our Instagram Profile
					</a>
				</div>
			</div>
		</div>
	);
}

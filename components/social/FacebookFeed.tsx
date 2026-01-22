'use client';

import { useEffect } from 'react';
import { FacebookIcon } from '../common/Icons';

const FacebookFeed = ({
	pageUrl = 'https://www.facebook.com/profile.php?id=61584092181307',
	pageName = 'livenewshour',
}) => {
	useEffect(() => {
		// Load Facebook SDK
		if (window.FB) {
			window.FB.XFBML.parse();
			return;
		}

		// Initialize Facebook SDK
		window.fbAsyncInit = function () {
			window.FB?.init({
				xfbml: true,
				version: 'v18.0',
			});
		};

		// Load the SDK script
		const script = document.createElement('script');
		script.id = 'facebook-jssdk';
		script.src = 'https://connect.facebook.net/en_US/sdk.js';
		script.async = true;
		script.defer = true;
		script.crossOrigin = 'anonymous';

		const firstScript = document.getElementsByTagName('script')[0];
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(script, firstScript);
		}

		return () => {
			// Cleanup if needed
			delete window.fbAsyncInit;
		};
	}, []);

	return (
		<div className='w-full mx-auto mt-8'>
			<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
				{/* Header */}
				<div className='bg-gradient-to-r from-blue-600 to-blue-700 p-4'>
					<div className='flex items-center gap-3 text-white'>
						<FacebookIcon size={28} />
						<div>
							<h3 className='font-bold text-lg'>Follow Us on Facebook</h3>
							<p className='text-sm opacity-90'>{pageName}</p>
						</div>
					</div>
				</div>

				{/* Facebook Page Plugin */}
				<div className='p-6 bg-gray-50'>
					<div id='fb-root'></div>
					<div
						className='fb-page ml-2'
						data-href={pageUrl}
						data-tabs='timeline'
						data-width='340'
						data-height='450'
						data-small-header='false'
						data-adapt-container-width='true'
						data-hide-cover='false'
						data-show-facepile='true'
					>
						<blockquote cite={pageUrl} className='fb-xfbml-parse-ignore'>
							<div className='flex flex-col items-center justify-center py-20 text-gray-500'>
								<div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3'></div>
								<p className='text-sm'>Loading Facebook feed...</p>
							</div>
						</blockquote>
					</div>
				</div>

				{/* Follow Button */}
				<div className='p-4 bg-white border-t border-gray-200'>
					<a
						href={pageUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md'
					>
						<FacebookIcon size={18} />
						Visit Our Facebook Page
					</a>
				</div>
			</div>
		</div>
	);
};

export default FacebookFeed;

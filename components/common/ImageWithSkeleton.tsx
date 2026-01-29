'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ArticleImageProps {
	src: string;
	alt: string;
	parentClassName?: string;
	imageClassName?: string;
}

const ImageWithSkeleton = ({
	src,
	alt,
	parentClassName,
	imageClassName,
}: ArticleImageProps) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className={`relative w-full max-w-[150px] lg:max-w-[250px] h-[100px] ${parentClassName}`}
		>
			{/* Skeleton */}
			{!loaded && (
				<div className='absolute inset-0 rounded bg-gray-200 overflow-hidden'>
					<div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent' />
				</div>
			)}

			<Image
				src={src}
				alt={alt}
				fill
				className={`object-cover rounded transition-opacity duration-300 ${
					loaded ? 'opacity-100' : 'opacity-0'
				} ${imageClassName}`}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
};

export default ImageWithSkeleton;

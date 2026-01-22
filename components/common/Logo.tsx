import Link from 'next/link';

const Logo = () => {
	return (
		<Link href={'/'} aria-label='Home'>
			<video
				src='/videos/livenewshour-logo.mp4'
				muted
				autoPlay
				playsInline
				preload='metadata'
                className='h-[70px] lg:h-[85px] w-[250px]'
			/>
		</Link>
	);
};

export default Logo;

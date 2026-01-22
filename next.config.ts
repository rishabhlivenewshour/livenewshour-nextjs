import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'site-bucket.blr1.digitaloceanspaces.com',
				pathname: '/site-bucket/**',
			},
			{
				protocol: 'https',
				hostname: 'yt3.ggpht.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;

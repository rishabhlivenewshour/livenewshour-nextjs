import localFont from 'next/font/local';

export const Poppins = localFont({
	src: [
		{ path: './poppins-regular.woff2', weight: '400' },
		{ path: './poppins-500.woff2', weight: '500' },
		{ path: './poppins-600.woff2', weight: '600' },
		{ path: './poppins-700.woff2', weight: '700' },
	],
	variable: '--font-poppins-local',
	display: 'swap',
	preload: true,
	fallback: ['system-ui', 'arial'],
	adjustFontFallback: 'Arial',
});

import type { Metadata } from 'next';
import { Poppins } from '../public/fonts';
import '../styles/globals.css';
import { getCategories } from '@/services/category.service';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getArticlesForTicker } from '@/services/article.service';
import ArticleTicker from '@/components/article/ArticleTicker';

export const metadata: Metadata = {
	title: 'Live News Hour - Latest News, Breaking Headlines, and Live Updates',
	description:
		'Get the latest breaking news, headlines, and in-depth coverage from Live News Hour – your trusted source for global, business, sports, entertainment, and tech news.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const categories = await getCategories();
	const tickerArticles = await getArticlesForTicker();

	return (
		<html lang='en'>
			<body className={`${Poppins.variable} antialiased`}>
				<Navbar categories={categories} />
				<ArticleTicker articles={tickerArticles} />
				<div className='px-[5vw] sm:px-[14vw] py-5'>{children}</div>
				<Footer categories={categories} />
			</body>
		</html>
	);
}

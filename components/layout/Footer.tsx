import Logo from '../common/Logo';
import { FacebookIcon, InstagramIcon, XTwitterIcon } from '../common/Icons';
import Link from 'next/link';
import { Category } from '@/types/category';
import { useMemo } from 'react';
import SocialLink from '../common/SocialLink';

interface FooterProps {
	categories: Category[];
}

const COMPANY_LINKS = [
	{ label: 'About Us', href: '/about' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Careers', href: '/careers' },
	{ label: 'Press', href: '/press' },
	{ label: 'Advertise', href: '/advertise' },
];

const LEGAL_LINKS = [
	{ label: 'Terms of Use', href: '/terms' },
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Cookie Policy', href: '/cookies' },
];

const Footer = ({ categories }: FooterProps) => {
	const topCategories = useMemo(
		() => [...categories].reverse().slice(0, 6),
		[categories],
	);

	return (
		<footer className='border-t-2'>
			<div className='py-10 px-[20px] sm:px-[40px] flex flex-wrap justify-between gap-6 text-sm text-light'>
				{/* About */}
				<div className='w-full sm:w-1/4 relative'>
					<div className='absolute left-[-40px] sm:left-[-20px] top-[-30px]'>
						<Logo />
					</div>
					<p className='mt-12 sm:mt-15'>
						LiveNewsHour brings you the latest news from around the world —
						fast, accurate, and unbiased. Stay informed with expert insights,
						trending stories, and real-time updates.
					</p>
				</div>

				{/* Sections */}
				<nav aria-label='News sections'>
					<p className='font-bold mb-2 text-dark'>Sections</p>
					<ul className='space-y-1'>
						{topCategories.map((section) => (
							<li key={section.id}>
								<Link
									href={`/news/topics/${section.slug}`}
									className='hover:text-primary transition'
								>
									{section.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Company */}
				<nav aria-label='Company links'>
					<p className='font-bold mb-2 text-dark'>Company</p>
					<ul className='space-y-1'>
						{COMPANY_LINKS.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className='hover:text-primary transition'
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Legal */}
				<nav aria-label='Legal links'>
					<p className='font-bold mb-2 text-dark'>Legal</p>
					<ul className='space-y-1'>
						{LEGAL_LINKS.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className='hover:text-primary transition'
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Social */}
				<div>
					<p className='font-semibold mb-2 text-dark'>
						Follow us on Social Media
					</p>
					<div className='flex gap-4'>
						<SocialLink
							href='https://www.facebook.com/profile.php?id=61584092181307'
							label='Facebook'
							className='bg-blue-600 hover:bg-blue-700'
						>
							<FacebookIcon size={24} />
						</SocialLink>

						<SocialLink
							href='https://www.instagram.com/livenewshour'
							label='Instagram'
							className='bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:bg-[#8C3AAA]'
						>
							<InstagramIcon size={24} />
						</SocialLink>

						<SocialLink
							href='https://x.com/livenewshour'
							label='X (Twitter)'
							className='bg-gray-800 hover:bg-gray-900'
						>
							<XTwitterIcon size={24} />
						</SocialLink>
					</div>
				</div>
			</div>

			<div className='py-3 text-center text-sm text-light border-t-2'>
				<p>© 2026 LiveNewsHour. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;

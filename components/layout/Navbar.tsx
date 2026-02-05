'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Category } from '@/types/category.types';
import Sidebar from './Sidebar';
import Logo from '../common/Logo';
import { MenuIcon, CloseIcon, SearchIcon } from '../common/Icons';

interface NavbarProps {
	categories: Category[];
}

const Navbar = ({ categories }: NavbarProps) => {
	const pathname = usePathname();
	const [showSidebar, setShowSidebar] = useState(false);

	const toogleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<div className='relative w-full bg-back'>
			<nav className='relative flex items-center justify-between p-3 px-[5vw] pl-[2vw] sm:pr-[40px] z-[100] bg-primary h-[70px] lg:h-[85px]'>
				<button
					onClick={toogleSidebar}
					className={`rounded-md active:scale-95 transition-all duration-300 ease-in-out p-1 border-2 ${
						!showSidebar ? 'border-transparent' : 'border-white'
					}  hover:border-white`}
					aria-label='Menu button'
				>
					{!showSidebar ? (
						<MenuIcon size={28} className='text-white' />
					) : (
						<CloseIcon size={28} className='text-white' />
					)}
				</button>
				<div
					onClick={() => setShowSidebar(false)}
					className='absolute left-1/2 transform -translate-x-1/2 '
				>
					<Logo />
				</div>
				<Link
					href='/search'
					className='p-2 flex items-center justify-center rounded bg-gray-100 active:scale-95 transition-all duration-300 ease-in-out hover:bg-gray-200'
					aria-label='Search'
				>
					<SearchIcon size={20} />
				</Link>
			</nav>
			<div
				className={`block absolute left-0 z-10 transition duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-[-100vw]'} `}
			>
				<Sidebar categories={categories} setShowSidebar={setShowSidebar} />
			</div>
			<div
				className={`hidden lg:flex items-center justify-center px-[5px] m-auto bg-white text-black text-[13px] mt-1.5 pb-1 tracking-wide font-[400]`}
			>
				{[...categories]
					.reverse()
					.slice(0, 6)
					.map((category, index) => (
						<Link
							key={index}
							href={`/news/topics/${category.slug}`}
							onClick={() => setShowSidebar(false)}
							className='flex flex-col justify-between items-center hover:text-primary active:text-primary transition-all duration-300 ease-in-out w-fit border-r-2 border-gray-400'
							aria-label={`view ${category.name} article`}
						>
							<p className='px-4'>{category.name}</p>
						</Link>
					))}
				<button onClick={() => setShowSidebar(true)} aria-label={'More'}>
					<p className='pl-3 hover:text-primary active:scale-95 transition-all duration-300 ease-in-out w-fit'>
						MORE
					</p>
				</button>
			</div>
		</div>
	);
};

export default Navbar;

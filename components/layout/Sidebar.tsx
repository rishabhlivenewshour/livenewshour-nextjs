'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Category } from '@/types/category.types';

interface SidebarProps {
	categories: Category[];
	setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ categories, setShowSidebar }: SidebarProps) => {
	const pathname = usePathname();

	return (
		<aside className='sm:w-full sm:min-w-[250px] w-[100vw] h-fit min-h-screen overflow-y-auto bg-white shadow-lg tracking-wider'>
			<ul className='text-sm font-semibold pr-3 pl-1'>
				<li
					className={`py-2 pl-2 ${
						pathname === '/' && 'border-b-4 border-primary text-primary'
					}`}
				>
					<Link
						href='/'
						aria-label='Home'
						onClick={() => setShowSidebar(false)}
					>
						Home
					</Link>
				</li>

				{categories.map((category, index) => (
					<li
						key={index}
						className={`border-t border-gray-300 ${
							pathname.includes(category.slug) &&
							'border-b-4 border-b-primary text-primary'
						}`}
					>
						<Link
							href={`/news/topics/${category.slug}`}
							onClick={() => setShowSidebar(false)}
							className='w-full flex items-center justify-between gap-2'
							aria-label={`view ${category.name} article`}
						>
							<span
								className={`py-2 pl-2 ${
									pathname.includes(category.name) &&
									'border-l-4 border-primary text-primary'
								}`}
							>
								{category.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;

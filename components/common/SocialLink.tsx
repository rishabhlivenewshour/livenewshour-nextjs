import Link from 'next/link';

const SocialLink = ({
	href,
	label,
	className,
	children,
}: {
	href: string;
	label: string;
	className?: string;
	children: React.ReactNode;
}) => (
	<Link
		href={href}
		target='_blank'
		rel='noopener noreferrer'
		aria-label={`Visit our ${label}`}
		className={`h-[42px] w-[42px] flex items-center justify-center rounded-full text-white transition hover:opacity-90 ${className}`}
	>
		{children}
	</Link>
);

export default SocialLink;

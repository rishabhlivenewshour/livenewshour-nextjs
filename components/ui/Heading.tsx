const SizeClasses: Record<HeadingSizes, string> = {
	sm: 'text-sm py-0.5 px-2',
	md: 'text-xl py-1 px-3',
	lg: 'text-2xl py-1 px-3',
	xl: 'text-3xl py-1.5 px-5',
};

const Heading = ({ title, className, size = 'md' }: HeadingProps) => {
	return (
		<h1
			className={`font-semibold tracking-wider text-dark border-l-4 border-primary uppercase ${SizeClasses[size]} ${className}`}
		>
			{title}
		</h1>
	);
};

export default Heading;

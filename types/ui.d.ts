type HeadingSizes = 'sm' | 'md' | 'lg' |'xl';

interface HeadingProps {
	title: string;
	className?: string;
	size: HeadingSizes;
}

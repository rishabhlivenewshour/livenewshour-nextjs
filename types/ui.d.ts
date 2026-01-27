import { ChangeEvent, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

type HeadingSizes = 'sm' | 'md' | 'lg' | 'xl';

interface HeadingProps {
	title: string;
	className?: string;
	size: HeadingSizes;
}

type InputTypeProps = 'text' | 'email' | 'password';

interface InputProps {
	type?: InputTypeProps;
	placeholder: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	icon: React.ComponentType<IconProps>;
}

import { ChangeEvent, SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type HeadingSizes = 'sm' | 'md' | 'lg' | 'xl';

export interface HeadingProps {
	title: string;
	className?: string;
	size: HeadingSizes;
}

export type InputTypeProps = 'text' | 'email' | 'password';

export interface InputProps {
	type?: InputTypeProps;
	placeholder: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	icon: React.ComponentType<IconProps>;
}

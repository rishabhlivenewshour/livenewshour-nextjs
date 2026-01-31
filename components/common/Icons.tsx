import { IconProps } from '@/types/ui.types';

export const MenuIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<line x1='4' x2='20' y1='12' y2='12' />
		<line x1='4' x2='20' y1='6' y2='6' />
		<line x1='4' x2='20' y1='18' y2='18' />
	</svg>
);

export const MailIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<rect width='20' height='16' x='2' y='4' rx='2' />
		<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
	</svg>
);

export const CopyIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
		<path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
	</svg>
);

export const TickIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<polyline points='20 6 9 17 4 12' />
	</svg>
);

export const CloseIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M18 6 6 18' />
		<path d='m6 6 12 12' />
	</svg>
);

export const SearchIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<circle cx='11' cy='11' r='8' />
		<path d='m21 21-4.3-4.3' />
	</svg>
);

export const FacebookIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
	</svg>
);

export const InstagramIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
		<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
		<line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
	</svg>
);

export const XTwitterIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M4 4l11.733 16h4.267l-11.733 -16z' />
		<path d='M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772' />
	</svg>
);

export const YoutubeIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17' />
		<path d='m10 15 5-3-5-3z' />
	</svg>
);

export const LinkedinIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
		<rect width='4' height='12' x='2' y='9' />
		<circle cx='4' cy='4' r='2' />
	</svg>
);

export const WhatsappIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21' />
		<path d='M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1' />
	</svg>
);

export const ClockIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<circle cx='12' cy='12' r='10' />
		<polyline points='12 6 12 12 16 14' />
	</svg>
);

export const TagIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z' />
		<path d='M7 7h.01' />
	</svg>
);

export const CalendarIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
		<line x1='16' x2='16' y1='2' y2='6' />
		<line x1='8' x2='8' y1='2' y2='6' />
		<line x1='3' x2='21' y1='10' y2='10' />
	</svg>
);

export const UserIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
		<circle cx='12' cy='7' r='4' />
	</svg>
);

export const ChevronRightIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='m9 18 6-6-6-6' />
	</svg>
);

export const LoaderIcon = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	>
		<path d='M21 12a9 9 0 1 1-6.219-8.56' />
	</svg>
);

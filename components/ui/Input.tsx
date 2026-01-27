import { InputProps } from '@/types/ui';

const Input = ({
	type = 'text',
	placeholder,
	value,
	onChange,
	icon: Icon,
}: InputProps) => {
	return (
		<div className='flex'>
			<input
				type={type}
				placeholder={placeholder}
				value={value || ''}
				onChange={onChange}
				required
				className='w-full border border-r-0 border-dark px-3 py-2 text-base rounded rounded-r-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
			/>
			<p className='px-5 py-2 bg-dark rounded-r flex items-center justify-center'>
				<Icon size={18} className='text-back' />
			</p>
		</div>
	);
};

export default Input;

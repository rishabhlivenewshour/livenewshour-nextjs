import { useEffect, useState } from 'react';

interface DebounceHookProps {
	value: string;
	delay: number;
}

const useDebounce = ({ value, delay = 500 }: DebounceHookProps) => {
	const [debouncedValue, setDebouncedValue] = useState('');

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;

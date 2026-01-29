export default function Loading() {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
			<div className='animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent' />
		</div>
	);
}

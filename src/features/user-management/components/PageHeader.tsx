import { Button } from '@/components/ui/button';

export const PageHeader = () => {
	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-bold'>Heading</h1>
			<Button>Add User</Button>
		</div>
	);
};

PageHeader.displayName = 'PageHeader';

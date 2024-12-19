import { Button } from './button';
import { Select } from './select';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	pageSize?: number;
	disabled?: boolean;
	onPageChange: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
}

const pageSizeOptions = [
	{ text: '10 / page', value: '10' },
	{ text: '25 / page', value: '25' },
	{ text: '50 / page', value: '50' },
	{ text: '100 / page', value: '100' },
];

export const Pagination = ({
	currentPage,
	totalPages,
	pageSize,
	disabled,
	onPageChange,
	onPageSizeChange,
}: PaginationProps) => {
	return (
		<div className='flex items-center justify-between gap-2 py-4'>
			<div className='text-sm text-muted-foreground'>
				Page {currentPage} of {totalPages}
			</div>
			<div className='flex gap-2'>
				{pageSize && onPageSizeChange && (
					<Select
						size='sm'
						options={pageSizeOptions}
						className='min-w-28'
						value={pageSize.toString()}
						onChange={(value) => onPageSizeChange(parseInt(value))}
					/>
				)}
				<Button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage <= 1 || disabled}
					size='sm'
					variant='outline'
				>
					Previous
				</Button>
				<Button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage >= totalPages || disabled}
					size='sm'
					variant='outline'
				>
					Next
				</Button>
			</div>
		</div>
	);
};

Pagination.displayName = 'Pagination';

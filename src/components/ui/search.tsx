import { SearchIcon } from '@/components/icons/search';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Search = ({ className, label, ...props }: SearchProps) => {
	return (
		<div className='w-full'>
			{label && (
				<label className='mb-2 block text-sm font-medium text-foreground'>
					{label}
				</label>
			)}
			<div className='relative'>
				<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
					<SearchIcon />
				</div>
				<input
					type='search'
					className={`block w-full rounded-lg border border-input bg-background p-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${className}`}
					{...props}
				/>
			</div>
		</div>
	);
};

Search.displayName = 'Search';

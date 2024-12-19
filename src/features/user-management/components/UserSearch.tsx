import { Search } from '@/components/ui/search';
import { useUserContext } from '../hooks/useUserContext';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import { debounce } from '@/utils/debounce';

const debouncedQuery = debounce(
	(query: string, updateSearch: (q: string) => void) => {
		updateSearch(query);
	},
	500
);

export const UserSearch = () => {
	const { updateSearch, filter } = useUserContext();
	const [query, setQuery] = useState(filter.query || '');

	const [, startTransition] = useTransition();

	useEffect(() => {
		setQuery(filter.query || '');
	}, [filter.query]);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		startTransition(() => {
			debouncedQuery(value, updateSearch);
		});
	};

	return (
		<div>
			<Search
				placeholder='Search users'
				value={query}
				onChange={handleSearch}
			/>
		</div>
	);
};

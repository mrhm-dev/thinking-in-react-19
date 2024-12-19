/**
 * Example 1:
 *
 * In this example, the DebouncedSearch component manages a search input that filters a list of items. The setTimeout creates a debounce effect, meaning the debouncedQuery is updated only after the user has stopped typing for 300 milliseconds.
 * Fiber optimizes rendering here by allowing React to batch updates and reduce the number of re-renders triggered by fast, repeated input. When the user types quickly, Fiber can prioritize other rendering tasks, improving responsiveness.
 */

import { useState, useEffect } from 'react';

const ItemList = ({ filter }: { filter: string }) => {
	const items = [
		'Apple',
		'Banana',
		'Cherry',
		'Date',
		'Elderberry',
		'Fig',
		'Grape',
	];

	const filteredItems = items.filter((item) =>
		item.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<ul>
			{filteredItems.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
};

export const DebouncedSearch = () => {
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	return (
		<div>
			<input
				type='text'
				placeholder='Search...'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<ItemList filter={debouncedQuery} />
		</div>
	);
};

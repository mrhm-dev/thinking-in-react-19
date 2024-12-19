/**
 * Example 1: Wrong way to do it
 *
 * In this example problem is the Itemlist component rerendered with every keystroke. It occurs some problems.
 * In a long list if the component rendered with every keystroke it will occur a performance issue.
 * If the data come from the server, it will hit the server with every keystroke and increase the server cost.
 * To Prevent that we will introduce debounce method.
 */

import { useState } from 'react';

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

export const NormalSearch = () => {
	const [query, setQuery] = useState('');

	return (
		<div>
			<input
				type='text'
				placeholder='Search...'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<ItemList filter={query} />
		</div>
	);
};

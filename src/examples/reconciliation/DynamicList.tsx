/**
 * Example 1
 *
 * This example demonstrates how React efficiently updates a list of items, handling both additions and removals while leveraging the reconciliation process.
 * Each Item has a unique key prop, enabling React to optimize updates.
 * When adding or removing items, only the affected components are re-rendered, not the entire list.
 */

import { useState } from 'react';

const Item = ({
	item,
	onRemove,
}: {
	item: string;
	onRemove: (item: string) => void;
}) => {
	console.log(`Rendering: ${item}`);
	return (
		<li>
			{item} <button onClick={() => onRemove(item)}>Remove</button>
		</li>
	);
};

export const DynamicList = () => {
	const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

	const addItem = () => {
		const newItem = `Fruit ${items.length + 1}`;
		setItems((prevItems) => [...prevItems, newItem]);
	};

	const removeItem = (itemToRemove: string) => {
		setItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
	};

	return (
		<div>
			<ul>
				{items.map((item) => (
					<Item key={item} item={item} onRemove={removeItem} />
				))}
			</ul>
			<button onClick={addItem}>Add Item</button>
		</div>
	);
};

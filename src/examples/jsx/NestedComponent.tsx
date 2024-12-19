/**
 * Example 2
 * In this example, we create a parent component that manages state for child components. It demonstrates how JSX facilitates component composition and state lifting.
 *
 * In this scenario, when the input in any child component changes, React efficiently updates only the relevant child in the Virtual DOM, ensuring that unnecessary re-renders are avoided.
 */

import { useState } from 'react';

const ChildComponent = ({
	index,
	value,
	onChange,
}: {
	index: number;
	value: string;
	onChange: (index: number, value: string) => void;
}) => (
	<div>
		<h3>Child {index + 1}</h3>
		<input
			type='text'
			value={value}
			onChange={(e) => onChange(index, e.target.value)}
		/>
	</div>
);

export const NestedComponent = () => {
	const [children, setChildren] = useState([{ id: Date.now(), value: '' }]);

	const handleChange = (index: number, value: string) => {
		const newChildren = children.map((child, i) =>
			i === index ? { ...child, value } : child
		);
		setChildren(newChildren);
	};

	const addChild = () => {
		setChildren([...children, { id: Date.now(), value: '' }]);
	};

	return (
		<div>
			{children.map((child, index) => (
				<ChildComponent
					key={child.id}
					index={index}
					value={child.value}
					onChange={handleChange}
				/>
			))}
			<button onClick={addChild}>Add Child</button>
		</div>
	);
};

/**
 * Example 1
 * This example illustrates a dynamic form where fields can be added or removed. It demonstrates how JSX compiles to React elements and how the Virtual DOM optimizes rendering when fields change.
 *
 * Each time a field is added or removed, the Virtual DOM is updated. React efficiently determines which inputs have changed and updates only those elements, improving performance.
 */

import { useState } from 'react';

export const DynamicForm = () => {
	const [fields, setFields] = useState([{ id: Date.now(), value: '' }]);

	const addField = () => {
		setFields([...fields, { id: Date.now(), value: '' }]);
	};

	const removeField = (id: number) => {
		setFields(fields.filter((field) => field.id !== id));
	};

	const handleChange = (id: number, value: string) => {
		setFields(
			fields.map((field) => (field.id === id ? { ...field, value } : field))
		);
	};

	return (
		<div>
			{fields.map((field) => (
				<div key={field.id} style={{ marginBottom: '10px' }}>
					<input
						type='text'
						value={field.value}
						onChange={(e) => handleChange(field.id, e.target.value)}
					/>
					<button onClick={() => removeField(field.id)}>Remove</button>
				</div>
			))}
			<button onClick={addField}>Add Field</button>
		</div>
	);
};

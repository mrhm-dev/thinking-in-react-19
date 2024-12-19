/**
 * Example 2
 *
 * In this example, we illustrate how a form updates fields dynamically. The reconciliation process ensures that only the changed fields are updated in the DOM.
 *
 * Each input field is controlled by its state.
 * When a user types in an input field, React efficiently updates only that field in the Virtual DOM, ensuring minimal re-renders.
 */

import { ChangeEvent, FormEvent, useState } from 'react';

export const UserProfile = () => {
	const [formData, setFormData] = useState({ name: '', email: '', age: '' });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Name:</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Age:</label>
				<input
					type='number'
					name='age'
					value={formData.age}
					onChange={handleChange}
				/>
			</div>
			<button type='submit'>Submit</button>
		</form>
	);
};

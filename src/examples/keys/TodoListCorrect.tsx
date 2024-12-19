import { useState } from 'react';

export const TodoList = () => {
	const [todos, setTodos] = useState([
		{ id: 1, text: 'Learn React', completed: false },
		{ id: 2, text: 'Practice Hooks', completed: false },
	]);

	const addTodo = () => {
		const newTodo = {
			id: Date.now(),
			text: `Todo: ${Date.now()}`,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	const toggleTodo = (id: number) => {
		console.log('Toggling todo with id:', id);
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(newTodos);
	};

	const removeTodo = (id: number) => {
		console.log('Removing todo with id:', id);
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const moveUp = (id: number) => {
		const index = todos.findIndex((todo) => todo.id === id);
		if (index === 0) return; // First item, can't move up
		const newTodos = [...todos];
		const temp = newTodos[index - 1];
		newTodos[index - 1] = newTodos[index];
		newTodos[index] = temp;
		setTodos(newTodos);
		console.log('Moved todo up with id:', id);
	};

	const moveDown = (id: number) => {
		const index = todos.findIndex((todo) => todo.id === id);
		if (index === todos.length - 1) return; // Last item, can't move down
		const newTodos = [...todos];
		const temp = newTodos[index + 1];
		newTodos[index + 1] = newTodos[index];
		newTodos[index] = temp;
		setTodos(newTodos);
		console.log('Moved todo down with id:', id);
	};

	return (
		<div>
			<h2>Todo List (Using Index as Key)</h2>
			<button onClick={addTodo}>Add Todo</button>
			<ul>
				{todos.map((todo) => (
					<div key={todo.id} style={{ display: 'flex' }}>
						<li
							onClick={() => toggleTodo(todo.id)}
							style={{
								textDecoration: todo.completed ? 'line-through' : 'none',
							}}
						>
							{todo.text}
						</li>
						<button onClick={() => removeTodo(todo.id)}>Remove</button>
						<button onClick={() => moveUp(todo.id)}>Move Up</button>
						<button onClick={() => moveDown(todo.id)}>Move Down</button>
					</div>
				))}
			</ul>
		</div>
	);
};

/**
 * Example 1: wrong way to do it
 *
 * We’ll create a simple todo list application where items can be added, removed, and reordered. We will first use the index as a key and then compare it with using unique IDs.
 *
 * Initial Addition: Add a few todos, mark some as complete, and reorder them. Then remove an item. After the removal, try toggling completion of remaining items. With the index as the key, React doesn’t know which state to associate with each todo, so it might toggle the wrong item.
 * For example:
 * You could move a todo down, and then toggle the completion of what appears to be a different todo, but the wrong one gets updated due to the key mismatch.
 */

import React, { useState } from 'react';

const TodoList = () => {
	const [todos, setTodos] = useState([
		{ text: 'Learn React', completed: false },
		{ text: 'Practice Hooks', completed: false },
	]);

	const addTodo = () => {
		const newTodo = { text: `Todo: ${todos.length + 1}`, completed: false };
		setTodos([newTodo, ...todos]);
	};

	const toggleTodo = (index: number) => {
		console.log('Toggling todo at index:', index);
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const removeTodo = (index: number) => {
		console.log('Removing todo at index:', index);
		const newTodos = todos.filter((_, i) => i !== index);
		setTodos(newTodos);
	};

	const moveUp = (index: number) => {
		if (index === 0) return; // First item, can't move up
		const newTodos = [...todos];
		const temp = newTodos[index - 1];
		newTodos[index - 1] = newTodos[index];
		newTodos[index] = temp;
		setTodos(newTodos);
		console.log('Moved todo up at index:', index);
	};

	const moveDown = (index: number) => {
		if (index === todos.length - 1) return; // Last item, can't move down
		const newTodos = [...todos];
		const temp = newTodos[index + 1];
		newTodos[index + 1] = newTodos[index];
		newTodos[index] = temp;
		setTodos(newTodos);
		console.log('Moved todo down at index:', index);
	};

	return (
		<div>
			<h2>Todo List (Using Index as Key)</h2>
			<button onClick={addTodo}>Add Todo</button>
			<ul>
				{todos.map((todo, index) => (
					<div key={index} style={{ display: 'flex' }}>
						<li
							onClick={() => toggleTodo(index)}
							style={{
								textDecoration: todo.completed ? 'line-through' : 'none',
							}}
						>
							{todo.text}
						</li>
						<button onClick={() => removeTodo(index)}>Remove</button>
						<button onClick={() => moveUp(index)}>Move Up</button>
						<button onClick={() => moveDown(index)}>Move Down</button>
					</div>
				))}
			</ul>
		</div>
	);
};

export default TodoList;

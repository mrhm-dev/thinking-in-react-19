// import { TodoList } from './examples/keys/TodoListCorrect';
// import { DynamicList } from './examples/reconciliation/DynamicList';
import { UserManagement } from './features/user-management';

export default function App() {
	return (
		<div className='container mx-auto max-w-4xl py-4'>
			<UserManagement />
			{/* <TodoList /> */}
			{/* <DynamicList /> */}
		</div>
	);
}

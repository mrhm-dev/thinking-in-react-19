import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { Action, State } from './types';

const initialState: State = {
	users: [],
	filter: {},
	sort: { column: 'id', direction: 'asc' },
	page: 1,
	pageSize: 10,
	totalPages: 0,
	totalUsers: 0,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_STATE':
			return action.payload;
		case 'UPDATE_STATE':
			return { ...state, ...action.payload };
		case 'RESET':
			return initialState;
		default:
			throw new Error('Invalid action type');
	}
};

export const UserContext = createContext<{
	state: State;
	dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const UserProvider = (props: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<UserContext value={{ state, dispatch }}>{props.children}</UserContext>
	);
};

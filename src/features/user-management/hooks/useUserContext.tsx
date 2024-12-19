import { use } from 'react';
import { UserContext } from '../UserProvider';
import { SortColumn, SortDirection, State } from '../types';

export const useUserContext = () => {
	const { state, dispatch } = use(UserContext);

	const updateFilter = (filter: State['filter']) => {
		dispatch({
			type: 'UPDATE_STATE',
			payload: { filter: { ...state.filter, ...filter } },
		});
	};

	const updateSort = ({
		column,
		direction,
	}: {
		column?: SortColumn;
		direction?: SortDirection;
	}) => {
		dispatch({
			type: 'UPDATE_STATE',
			payload: {
				sort: {
					...state.sort,
					...(column && { column }),
					...(direction && { direction }),
				},
			},
		});
	};

	const updatePage = (page: number) => {
		dispatch({ type: 'UPDATE_STATE', payload: { page } });
	};

	const updatePageSize = (pageSize: number) => {
		dispatch({ type: 'UPDATE_STATE', payload: { pageSize } });
	};

	const updateSearch = (query: string) => {
		dispatch({
			type: 'UPDATE_STATE',
			payload: {
				filter: {
					...state.filter,
					query,
				},
			},
		});
	};

	const resetFilter = () => {
		dispatch({ type: 'RESET' });
	};

	return {
		users: state.users,
		pagination: {
			page: state.page,
			pageSize: state.pageSize,
			totalPage: state.totalPages,
			totalUsers: state.totalUsers,
		},
		filter: state.filter,
		sort: state.sort,
		updateFilter,
		updateSort,
		updatePage,
		updatePageSize,
		updateSearch,
		resetFilter,
	};
};

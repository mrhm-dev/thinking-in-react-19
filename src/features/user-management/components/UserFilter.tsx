import { Select } from '@/components/ui/select';
import { useUserContext } from '../hooks/useUserContext';
import type { Role, SortColumn, SortDirection, Status } from '../types';

export const UserFilter = () => {
	const { filter, sort, updateFilter, updateSort } = useUserContext();

	return (
		<div className='flex gap-2'>
			<Select
				label='Role'
				options={[
					{ text: 'All', value: '' },
					{ text: 'User', value: 'user' },
					{ text: 'Admin', value: 'admin' },
					{ text: 'Manager', value: 'manager' },
				]}
				value={filter.role ?? ''}
				key={filter.role ?? 'default_role'}
				onChange={(value) => updateFilter({ role: value as Role })}
			/>
			<Select
				label='status'
				options={[
					{ text: 'All', value: '' },
					{ text: 'Active', value: 'active' },
					{ text: 'Inactive', value: 'inactive' },
					{ text: 'Pending', value: 'pending' },
					{ text: 'Suspended', value: 'suspended' },
				]}
				value={filter.status ?? ''}
				key={filter.status ?? 'default_status'}
				onChange={(value) => updateFilter({ status: value as Status })}
			/>
			<Select
				label='Sort By'
				options={[
					{ text: 'Id', value: 'id' },
					{ text: 'Name', value: 'name' },
					{ text: 'Email', value: 'email' },
					{ text: 'Role', value: 'role' },
					{ text: 'Status', value: 'status' },
				]}
				value={sort.column ?? ''}
				key={sort.column ?? 'default_column'}
				onChange={(value) => updateSort({ column: value as SortColumn })}
			/>

			<Select
				label='Order By'
				options={[
					{ text: 'Ascending', value: 'asc' },
					{ text: 'Descending', value: 'desc' },
				]}
				value={sort.direction}
				key={sort.direction ?? 'default_direction'}
				onChange={(value) => updateSort({ direction: value as SortDirection })}
			/>
		</div>
	);
};

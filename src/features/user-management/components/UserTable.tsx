import { Table } from '@/components/ui/table';
import type { User } from '../types';
import { ErrorInfoIcon } from '@/components/icons/error-info';
import { titleCase } from '@/utils/text';
import clsx from 'clsx';
import { getUserStatusColor } from '../utils';
import { UserRowActions } from './UserRowAction';

type UserTableProps = {
	users: User[];
	isLoading?: boolean;
	error?: string;
};

export const UserTable = ({ users, isLoading, error }: UserTableProps) => {
	const renderTable = () => {
		if (isLoading) return <UserTableSkeleton />;
		if (error) return <UserTableError message={error} />;
		if (users.length === 0) return <UserTableNoData />;
		return <UserTableBody users={users} />;
	};

	return (
		<div>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.Cell>ID</Table.Cell>
						<Table.Cell>Name</Table.Cell>
						<Table.Cell>Email</Table.Cell>
						<Table.Cell>Role</Table.Cell>
						<Table.Cell className='w-[150px] text-right'>Status</Table.Cell>
					</Table.Row>
				</Table.Header>
				{renderTable()}
			</Table>
		</div>
	);
};

UserTable.displayName = 'UserTable';

const UserTableBody = ({ users }: { users: User[] }) => {
	return (
		<Table.Body>
			{users.map((user) => (
				<Table.Row key={user.id} className='group'>
					<Table.Cell>{user.id.split('-')[0]}</Table.Cell>
					<Table.Cell className='font-medium'>{user.name}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{titleCase(user.role)}</Table.Cell>
					<Table.Cell className='w-[150px] text-right'>
						<span
							className={clsx(
								'group-hover:hidden inline-block',
								getUserStatusColor(user.status)
							)}
						>
							{titleCase(user.status)}
						</span>
						<div className='hidden group-hover:inline-flex justify-end items-center gap-2'>
							<UserRowActions />
						</div>
					</Table.Cell>
				</Table.Row>
			))}
		</Table.Body>
	);
};

UserTableBody.displayName = 'UserTableBody';

const UserTableSkeleton = () => {
	return (
		<Table.Body>
			{Array.from({ length: 10 }).map((_, index) => (
				<Table.Row key={index}>
					<Table.Cell>
						<div className='h-4 w-8 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-32 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-48 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
				</Table.Row>
			))}
		</Table.Body>
	);
};

const UserTableNoData = () => {
	return (
		<Table.Body>
			<Table.Row className='col-span-full'>
				<Table.Cell colSpan={5}>
					<div className='p-4 text-center'>
						<h3 className='mb-2 text-lg font-semibold text-gray-600'>
							No users found
						</h3>
						<p className='text-gray-500'>There are no users to display.</p>
					</div>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};

UserTableNoData.displayName = 'UserTableNoData';

const UserTableError = ({ message }: { message: string }) => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan={5}>
					<div className='p-4 text-center'>
						<div className='mb-4 flex justify-center'>
							<ErrorInfoIcon className='text-red-600' size={48} />
						</div>
						<h3 className='mb-2 text-lg font-semibold text-red-600'>
							Error Loading Users
						</h3>
						<p className='text-red-500'>{message}</p>
					</div>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};

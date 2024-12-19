import { Role, Status, User } from '../features/user-management/types';

// Simulate network latency between 200-800ms
const delay = () =>
	new Promise((resolve) => setTimeout(resolve, Math.random() * 600 + 200));

// Simulate random errors ~10% of the time
const shouldError = () => Math.random() < 0.1;

type GetUsersParams = {
	page?: number;
	pageSize?: number;
	query?: string;
	role?: Role;
	status?: Status;
	sortBy?: keyof User;
	sortDirection?: 'asc' | 'desc';
};

class UserAPI {
	private static async fetchUsers(): Promise<User[]> {
		const response = await fetch('/api/users.json');
		if (!response.ok) {
			throw new Error('Failed to fetch users');
		}
		return response.json();
	}

	private static filterUsers(
		users: User[],
		query: string,
		role?: Role,
		status?: Status
	): User[] {
		let filteredUsers = [...users];

		if (query) {
			const lowercaseQuery = query.toLowerCase();
			filteredUsers = filteredUsers.filter(
				(user) =>
					user.name.toLowerCase().includes(lowercaseQuery) ||
					user.email.toLowerCase().includes(lowercaseQuery)
			);
		}

		if (role) {
			filteredUsers = filteredUsers.filter((user) => user.role === role);
		}

		if (status) {
			filteredUsers = filteredUsers.filter((user) => user.status === status);
		}

		return filteredUsers;
	}

	private static sortUsers(
		users: User[],
		sortBy: keyof User,
		sortDirection: 'asc' | 'desc'
	): User[] {
		return [...users].sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];

			if (sortDirection === 'asc') {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
			}
		});
	}

	private static paginateUsers(users: User[], page: number, pageSize: number) {
		const totalUsers = users.length;
		const totalPages = Math.ceil(totalUsers / pageSize);
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const paginatedUsers = users.slice(start, end);

		return {
			users: paginatedUsers,
			totalUsers,
			totalPages,
			page,
			pageSize,
		};
	}

	static async get({
		page = 1,
		pageSize = 10,
		query = '',
		role,
		status,
		sortBy = 'name',
		sortDirection = 'asc',
	}: GetUsersParams = {}) {
		await delay();

		if (shouldError()) {
			throw new Error('Internal Server Error');
		}

		try {
			let users = await this.fetchUsers();
			users = this.filterUsers(users, query, role, status);
			users = this.sortUsers(users, sortBy, sortDirection);
			return this.paginateUsers(users, page, pageSize);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to fetch users: ${error.message}`);
			}
			throw new Error('An unexpected error occurred');
		}
	}
}

export { UserAPI };

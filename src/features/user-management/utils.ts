import { User } from './types';

export const getUserStatusColor = (status: User['status']) => {
	switch (status) {
		case 'active':
			return 'text-green-500';
		case 'inactive':
			return 'text-gray-500';
		case 'pending':
			return 'text-yellow-500';
		case 'suspended':
			return 'text-red-500';
		default:
			return 'text-gray-500';
	}
};

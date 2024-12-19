import { Button } from '@/components/ui/button';
import { useUserContext } from '../hooks/useUserContext';

export const ResetButton = () => {
	const { resetFilter } = useUserContext();
	return (
		<Button variant='outline' onClick={resetFilter}>
			Reset
		</Button>
	);
};

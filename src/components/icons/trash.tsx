import { clsx } from 'clsx';
import { SVGIconType } from './type';

export const TrashIcon = ({
	className,
	size = 15,
	strokeWidth = 2,
}: SVGIconType) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={strokeWidth}
			className={clsx(className)}
		>
			<path d='M3 6h18'></path>
			<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
		</svg>
	);
};

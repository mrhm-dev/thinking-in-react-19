import { clsx } from 'clsx';
import { SVGIconType } from './type';
export const EditPencilIcon = ({
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
			<path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
			<path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
		</svg>
	);
};

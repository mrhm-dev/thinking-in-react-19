import { clsx } from 'clsx';
import { SVGIconType } from './type';

export const EyeIcon = ({
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
			<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
			<circle cx='12' cy='12' r='3'></circle>
		</svg>
	);
};

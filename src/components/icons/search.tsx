import { clsx } from 'clsx';
import type { SVGIconType } from './type';

export const SearchIcon = ({
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
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
			/>
		</svg>
	);
};

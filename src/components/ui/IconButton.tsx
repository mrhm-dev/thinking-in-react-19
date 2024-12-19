import type { SVGIconType } from '@/components/icons';
import { clsx } from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: FC<SVGIconType>;
	size?: number;
	strokeWidth?: number;
	iconClassName?: string;
	variant?: 'circle' | 'square';
}

export const IconButton: FC<IconButtonProps> = ({
	icon: Icon,
	size = 16,
	strokeWidth = 2,
	className,
	iconClassName,
	variant = 'circle',
	...props
}) => {
	return (
		<button
			className={clsx(
				'p-2 hover:bg-zinc-100',
				variant === 'circle' ? 'rounded-full' : 'rounded',
				className
			)}
			{...props}
		>
			<Icon size={size} strokeWidth={strokeWidth} className={iconClassName} />
		</button>
	);
};

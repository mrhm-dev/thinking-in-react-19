import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
	className,
	variant = 'default',
	size = 'md',
	children,
	disabled,
	...props
}: ButtonProps) => {
	const variants = {
		default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90',
		outline:
			'border border-input bg-background hover:bg-muted/50 hover:text-primary',
		ghost: 'hover:bg-muted/50 hover:text-primary',
	};

	const sizes = {
		sm: 'h-8 px-3 text-xs',
		md: 'h-10 px-4 text-sm',
		lg: 'h-12 px-6 text-base',
	};

	return (
		<button
			className={clsx(
				'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				variants[variant],
				sizes[size],
				{
					'opacity-50 cursor-not-allowed': disabled,
				},
				className
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

Button.displayName = 'Button';

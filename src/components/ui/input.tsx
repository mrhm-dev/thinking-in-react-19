import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	ref?: React.RefObject<HTMLInputElement>;
}

export const Input = ({
	className,
	type,
	label,
	error,
	ref,
	...props
}: InputProps) => {
	return (
		<div className='w-full'>
			{label && (
				<label className='mb-2 block text-sm font-medium text-foreground'>
					{label}
				</label>
			)}
			<input
				type={type}
				className={clsx(
					'block w-full rounded-lg border border-input bg-background p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary',
					className
				)}
				ref={ref}
				{...props}
			/>
			{error && <p className='mt-2 text-sm text-destructive'>{error}</p>}
		</div>
	);
};

Input.displayName = 'Input';

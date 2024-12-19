import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface SelectOption {
	text: string;
	value: string;
}

interface SelectProps
	extends Omit<
		React.SelectHTMLAttributes<HTMLDivElement>,
		'value' | 'onChange'
	> {
	label?: string;
	error?: string;
	options: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
	size?: 'sm' | 'md' | 'lg';
}

const SelectContext = createContext<{
	isOpen: boolean;
	selectedValue?: string;
	onSelect: (value: string) => void;
	onToggle: () => void;
}>({
	isOpen: false,
	onSelect: () => {},
	onToggle: () => {},
});

const useSelect = (
	options: SelectOption[],
	value?: string,
	onChange?: (value: string) => void
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value);
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedOption = options.find(
		(option) => option.value === selectedValue
	);

	const handleSelect = (value: string) => {
		setSelectedValue(value);
		onChange?.(value);
		setIsOpen(false);
	};

	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return {
		isOpen,
		selectedValue,
		selectedOption,
		containerRef,
		handleSelect,
		toggleDropdown,
	};
};

export const Select = ({
	className,
	label,
	error,
	options,
	value,
	onChange,
	size = 'md',
	...props
}: SelectProps) => {
	const {
		isOpen,
		selectedValue,
		selectedOption,
		containerRef,
		handleSelect,
		toggleDropdown,
	} = useSelect(options, value, onChange);

	const sizes = {
		sm: 'h-8 text-xs',
		md: 'h-10 text-sm',
		lg: 'h-12 text-base',
	};

	return (
		<SelectContext.Provider
			value={{
				isOpen,
				selectedValue,
				onSelect: handleSelect,
				onToggle: toggleDropdown,
			}}
		>
			<div className='w-full' ref={containerRef} {...props}>
				{label && (
					<label className='mb-2 block text-sm font-medium text-foreground'>
						{label}
					</label>
				)}
				<div className='relative'>
					<button
						type='button'
						onClick={toggleDropdown}
						className={clsx(
							'flex w-full items-center justify-between rounded-lg border border-input bg-background px-3 text-foreground hover:bg-muted/50 focus:border-primary focus:ring-primary',
							sizes[size],
							className
						)}
					>
						<span>{selectedOption?.text || 'Select an option'}</span>
						<svg
							className={clsx('h-4 w-4 transition-transform', {
								'rotate-180': isOpen,
							})}
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</button>
					{isOpen && (
						<div className='absolute z-10 mt-1 w-full rounded-lg border border-input bg-white p-1 shadow-lg'>
							{options.length > 0 ? (
								options.map((option) => (
									<SelectOption
										key={option.value}
										text={option.text}
										value={option.value}
									/>
								))
							) : (
								<div className='px-4 py-2 text-sm text-muted-foreground'>
									No options available
								</div>
							)}
						</div>
					)}
				</div>
				{error && <p className='mt-2 text-sm text-destructive'>{error}</p>}
			</div>
		</SelectContext.Provider>
	);
};

const SelectOption = ({ text, value }: SelectOption) => {
	const { selectedValue, onSelect } = useContext(SelectContext);
	const isSelected = selectedValue === value;

	return (
		<div
			className={clsx(
				'cursor-pointer px-3 py-2 text-sm transition-colors rounded-lg hover:bg-black/5',
				{
					'text-primary font-medium': isSelected,
				}
			)}
			onClick={() => onSelect(value)}
		>
			{text}
		</div>
	);
};

Select.displayName = 'Select';

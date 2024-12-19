import { createContext, useContext } from 'react';
import { clsx } from 'clsx';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
	children: React.ReactNode;
}

interface TableContextValue {
	isHeader?: boolean;
}

const TableContext = createContext<TableContextValue>({});

export const Table = ({ className, children, ...props }: TableProps) => {
	return (
		<div className='w-full overflow-auto'>
			<table
				className={clsx(
					'w-full border-collapse text-sm border border-input rounded-lg table-auto',
					className
				)}
				{...props}
			>
				{children}
			</table>
		</div>
	);
};

interface TableHeaderProps {
	children: React.ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => {
	return (
		<TableContext.Provider value={{ isHeader: true }}>
			<thead className='border-b-2 border-input bg-black/5'>{children}</thead>
		</TableContext.Provider>
	);
};

interface TableBodyProps {
	children: React.ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => {
	return (
		<tbody className='[&>tr:nth-child(odd)]:bg-muted/50 [&>tr:nth-child(even)]:bg-muted/20'>
			{children}
		</tbody>
	);
};

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	children: React.ReactNode;
}

export const TableRow = ({ className, children, ...props }: TableRowProps) => {
	return (
		<tr
			className={clsx(
				'border-b border-input transition-colors hover:bg-black/5',
				className
			)}
			{...props}
		>
			{children}
		</tr>
	);
};

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	children: React.ReactNode;
}

export const TableCell = ({
	className,
	children,
	...props
}: TableCellProps) => {
	const { isHeader } = useContext(TableContext);

	const Component = isHeader ? 'th' : 'td';

	return (
		<Component
			className={clsx(
				'p-4 align-middle text-left border-x border-input first:border-l-0 last:border-r-0',
				isHeader ? 'font-semibold text-foreground' : 'text-foreground',
				className
			)}
			{...props}
		>
			{children}
		</Component>
	);
};

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

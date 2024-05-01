import {TableCell, TableCellProps, TableRow, TableRowProps} from '@mui/material';
import {PropsWithChildren} from 'react';

export type PropertiesTableRowProps = TableRowProps & PropsWithChildren<{
	header: string;
	align?: TableCellProps['align'];
}>

export default function PropertiesTableRow({header, children, align = 'left', ...rowProps}: PropertiesTableRowProps) {
	return (
		<TableRow {...rowProps}>
			<TableCell variant="head" scope="row" sx={{whiteSpace: 'nowrap'}}>{header}</TableCell>
			<TableCell variant="body" align={align} width="100%">{children}</TableCell>
		</TableRow>
	);
}
import {Card, Table, TableBody, TableProps, useTheme} from '@mui/material';
import {ReactElement, ReactNode} from 'react';
import PropertiesTableRow, {PropertiesTableRowProps} from './PropertiesTableRow';

export interface PropertiesTableData {
	header: string,
	content: ReactNode
}

export type PropertiesTableExtraData = [string, ReactNode][];

export type PropertiesTableProps = Omit<TableProps, 'border'> & {
	data?: Map<PropertiesTableData['header'], PropertiesTableData['content']> | PropertiesTableExtraData | PropertiesTableData[];
	children?: ReactElement<PropertiesTableRowProps>[] | ReactElement<PropertiesTableRowProps>;
	border?: boolean;
}

export default function PropertiesTable({children, data, size = 'small', border = false, sx = {}, ...tableProps}: PropertiesTableProps) {
	const theme = useTheme();
	if (border) {
		sx = {
			...sx,
			'& .MuiTableCell-head': {
				borderRight: `1px solid ${theme.palette.divider}`
			}
		};
	}
	
	const extraData: PropertiesTableExtraData = (() => {
		if (!data) {
			return [];
		}
		
		if (data instanceof Map) {
			return Array.from(data.entries());
		}
		
		if (!data.length) {
			return [];
		}
		
		if (Array.isArray(data[0])) {
			return data as PropertiesTableExtraData;
		} else {
			return data.map((data) => {
				const {header, content} = data as PropertiesTableData;
				return [header, content];
			});
		}
	})();
	
	const content = (
		<Table size={size} sx={sx} {...tableProps}>
			<TableBody>
				{children}
				{
					extraData.map(([key, value]) => (
						<PropertiesTableRow key={key} header={key}>{value}</PropertiesTableRow>
					))
				}
			</TableBody>
		</Table>
	);
	
	if (border) {
		return <Card elevation={0} sx={{p: 0}}>{content}</Card>;
	}
	
	return content;
}
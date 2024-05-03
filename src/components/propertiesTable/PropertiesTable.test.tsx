import {createTheme} from '@mui/material';
import {render, screen} from '@testing-library/react';
import {testForAccessibility} from '../jest';
import PropertiesTable, {PropertiesTableProps} from './PropertiesTable';
import PropertiesTableRow from './PropertiesTableRow';

const Testable = (props: PropertiesTableProps) => (
	<PropertiesTable {...props}>
		<PropertiesTableRow header="Name">Lorem</PropertiesTableRow>
		<PropertiesTableRow header="Job" align="center">Ipsum</PropertiesTableRow>
		<PropertiesTableRow header="Count" align="right">42</PropertiesTableRow>
	</PropertiesTable>
);

describe('PropertiesTable.tsx', () => {
	test('Render', async () => {
		render(<Testable data={[]}/>);
		expect(screen.getByText(/Lorem/i)).toBeInTheDocument();
		expect(screen.getByText(/Ipsum/i)).toBeInTheDocument();
		expect(screen.getByText(/42/i)).toBeInTheDocument();
	});
	
	test('Render: Border', async () => {
		render(<Testable border/>);
		expect(screen.getByText(/Lorem/i)).toBeInTheDocument();
		expect(screen.getByText(/Ipsum/i)).toBeInTheDocument();
		expect(screen.getByText(/42/i)).toBeInTheDocument();
	});
	
	test('Render: Data (objects)', async () => {
		render(<Testable data={[{header: 'Extra', content: 'Data'}]}/>);
		expect(screen.getByText(/Extra/i)).toBeInTheDocument();
		expect(screen.getByText(/Data/i)).toBeInTheDocument();
	});
	
	test('Render: Data (map)', async () => {
		render(<Testable data={new Map([['Extra', 'Data']])}/>);
		expect(screen.getByText(/Extra/i)).toBeInTheDocument();
		expect(screen.getByText(/Data/i)).toBeInTheDocument();
	});
	
	test('Render: Data (tuples)', async () => {
		render(<Testable data={[['Extra', 'Data']]}/>);
		expect(screen.getByText(/Extra/i)).toBeInTheDocument();
		expect(screen.getByText(/Data/i)).toBeInTheDocument();
	});
	
	const themes = [
		createTheme(),
		createTheme({palette: {mode: 'dark'}})
	];
	
	testForAccessibility(<Testable/>, themes);
});
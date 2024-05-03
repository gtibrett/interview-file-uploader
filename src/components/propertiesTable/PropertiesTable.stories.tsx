import type {Meta, StoryObj} from '@storybook/react';
import {DisabledArgType} from '../stories/constants';
import PropertiesTable from './PropertiesTable';
import PropertiesTableRow from './PropertiesTableRow';

type Story = StoryObj<typeof PropertiesTable>;

const meta = {
	title:      'MUI/Properties Table',
	component:  PropertiesTable,
	tags:       ['autodocs'],
	parameters: {
		layout: 'centered',
		docs:   {
			description: {
				component: "A simple properties table to list key value pairs"
			}
		}
	},
	args:       {
		data:     [['Name', 'Jane Smith'], ['Title', 'CEO']],
		children: <PropertiesTableRow header="Email">jane@company.com</PropertiesTableRow>
	},
	argTypes:   {
		border:   {type: 'boolean'},
		children: DisabledArgType,
		size: DisabledArgType,
		sx: DisabledArgType,
	}
	
} satisfies Meta<typeof PropertiesTable>;

export default meta;

export const Border: Story = {
	args: {
		border: true
	}
};
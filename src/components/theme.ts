import {createTheme} from '@mui/material';
import {blue, pink} from '@mui/material/colors';
import LinkBehavior from './LinkBehavior';

const theme = createTheme({
	palette:    {
		primary:    blue,
		secondary:  pink,
		background: {
			default: '#EEEEEE',
			paper:   '#FFFFFF'
		}
	},
	components: {
		MuiBackdrop: {
			styleOverrides: {
				root: {
					zIndex: 1600
				}
			}
		},
		MuiCard:     {
			defaultProps: {
				variant:   'outlined',
				elevation: 0
			}
		},
		MuiLink:     {
			defaultProps: {
				component: LinkBehavior,
				color:     'secondary'
			}
		}
	}
});

export default theme;
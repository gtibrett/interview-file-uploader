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
		MuiLink: {
			defaultProps: {
				component: LinkBehavior,
				color:     'secondary'
			}
		}
	}
});

export default theme;
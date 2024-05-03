import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {useSession} from 'next-auth/react';
import useIsLoggedIn from '../auth/useIsLoggedIn';

export default function Header() {
	const isLoggedIn      = useIsLoggedIn();
	const {data: session} = useSession();
	
	return (
		<>
			<AppBar component="header" position="fixed" color="secondary">
				<Toolbar>
					<Typography variant="h3" sx={{flexGrow: 1}}>Adim</Typography>
					{isLoggedIn && <Button color="inherit" href="/api/auth/signout">Sign Out</Button>}
				</Toolbar>
			</AppBar>
			<Toolbar sx={{mb: 2}}/>
		</>
	);
}
import {Box, Button, Card, CardContent, Container, useTheme} from '@mui/material';
import {type NextPage} from "next";
import useIsLoggedIn from '../auth/useIsLoggedIn';
import Header from '../components/Header';
import Profile from './components/Profile';

const SignIn = () => (
	<Container>
		<Card>
			<CardContent>
				<Button href="/api/auth/signin">Sign In</Button>
			</CardContent>
		</Card>
	</Container>
);

const Home: NextPage = () => {
	const theme      = useTheme();
	const isLoggedIn = useIsLoggedIn();
	
	let content = <SignIn/>;
	
	if (isLoggedIn) {
		content = (
			<Profile/>
		);
	}
	
	return (
		<Box sx={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: theme.palette.background.default, overflow: 'auto'}}>
			<Header/>
			<Box component="main" sx={{px: 4}}>
				{content}
			</Box>
		</Box>
	
	);
};

export default Home;
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Session} from 'next-auth';
import {SessionProvider} from "next-auth/react";
import {type AppType} from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import theme from '../components/theme';

const MyApp: AppType<{ session: Session }> = ({Component, pageProps: {session, ...pageProps}}) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	);
};

export default MyApp;

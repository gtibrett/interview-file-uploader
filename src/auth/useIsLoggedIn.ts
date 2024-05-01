import {useSession} from 'next-auth/react';

export default function useIsLoggedIn() {
	const {data: session} = useSession();
	
	return !!session;
}
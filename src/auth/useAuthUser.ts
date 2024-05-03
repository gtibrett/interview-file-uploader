import {useSession} from 'next-auth/react';

export default function useAuthUser() {
	const {data: session} = useSession();
	
	return session?.user;
}
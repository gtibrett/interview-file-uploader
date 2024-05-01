import {Avatar, Button, Grid} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import useAuthUser from '../../auth/useAuthUser';
import PfpDialog from './PfpDialog';

export default function ProfileImage() {
	const user            = useAuthUser();
	const [pfp, setPfp]   = useState<string>();
	const [open, setOpen] = useState<boolean>(false);
	
	useEffect(() => {
		if (user) {
			axios.get<{ url: string }>(`/api/pfp/${user.email}`)
			     .then((resp) => setPfp(resp.data.url));
		}
	}, [user]);
	
	return (
		<>
			<Grid container spacing={1} justifyContent="center" flexDirection="column">
				{pfp && <Grid item xs={12}><Avatar variant="rounded" src={pfp} sx={{height: 100, width: 100}}/></Grid>}
				{!pfp && <Grid item><Avatar variant="rounded" sx={{fontSize: 64, height: 100, width: 100}}>🙂</Avatar></Grid>}
				<Grid item sx={{textAlign: 'center'}}><Button onClick={() => setOpen(true)} size="small">edit image</Button></Grid>
			</Grid>
			<PfpDialog open={open} setOpen={setOpen}/>
		</>
	);
}
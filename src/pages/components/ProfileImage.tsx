import {Avatar, Button, Card, Grid} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import useAuthUser from '../../auth/useAuthUser';
import PfpDialog from './PfpDialog';

export default function ProfileImage() {
	const user            = useAuthUser();
	const [cb, setCb]     = useState<number>((new Date()).getTime());
	const [pfp, setPfp]   = useState<string>();
	const [open, setOpen] = useState<boolean>(false);
	
	useEffect(() => {
		if (user) {
			axios.get<{ url: string }>(`/api/pfp/${user.email}`)
			     .then((resp) => setPfp(resp.data.url));
		}
	}, [user]);
	
	useEffect(() => {
		if (!open) {
			setCb((new Date()).getTime());
		}
	}, [open]);
	
	
	return (
		<>
			<Grid container spacing={1} justifyContent="center" flexDirection="column">
				<Grid item>
					<Card>
						{!!pfp
						 ? <Avatar variant="rounded" src={`${pfp}?cb=${cb}`} sx={{height: 100, width: 100}}/>
						 : <Avatar variant="rounded" sx={{fontSize: 64, height: 100, width: 100}}>🙂</Avatar>
						}
					</Card>
				</Grid>
				<Grid item sx={{textAlign: 'center'}}><Button onClick={() => setOpen(true)} size="small">edit image</Button></Grid>
			</Grid>
			<PfpDialog open={open} setOpen={setOpen}/>
		</>
	);
}
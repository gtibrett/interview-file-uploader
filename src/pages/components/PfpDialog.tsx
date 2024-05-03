import {IGif} from '@giphy/js-types';
import {Button, DialogActions, DialogContent} from '@mui/material';
import axios from 'axios';
import {Dispatch, SetStateAction, useState} from 'react';
import useAuthUser from '../../auth/useAuthUser';
import Dialog from '../../components/Dialog';
import GiphySearch from './GiphySearch';

type PfpDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>
};

export default function PfpDialog({open, setOpen}: PfpDialogProps) {
	const user              = useAuthUser();
	const [image, setImage] = useState<IGif | undefined>();
	
	const handleCancel = () => {
		setImage(undefined);
		setOpen(false);
	};
	
	const handleSave = () => {
		axios.post(`/api/pfp/${user?.email}`, image?.images['480w_still'] || {})
		     .then(() => setOpen(false))
		     .catch((error) => {
			     console.error(error);
			     setOpen(false);
		     });
	};
	
	return (
		<Dialog fullWidth sx={{minHeight: 400}} open={open} title="Update Profile Picture" onClose={() => setOpen(false)}>
			<DialogContent>
				<GiphySearch setImage={setImage}/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleSave}>Save</Button>
				<Button variant="outlined" onClick={handleCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}
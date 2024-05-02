import {IGif} from '@giphy/js-types';
import {Backdrop, Button, DialogActions} from '@mui/material';
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
	const user                = useAuthUser();
	const [image, setImage]   = useState<IGif | undefined>();
	const [masked, setMasked] = useState(false);
	
	const handleCancel = () => {
		setImage(undefined);
		setOpen(false);
	};
	
	const handleSave = () => {
		if (image) {
			setMasked(true);
			
			axios.post(`/api/pfp/${user?.email}`, image?.images['fixed_height'] || {})
			     .then(() => {
				     setMasked(false);
				     setOpen(false);
			     })
			     .catch((error) => {
				     console.error(error);
				     setMasked(false);
				     setOpen(false);
			     });
		}
	};
	
	
	return (
		<Dialog fullWidth maxWidth="lg" open={open} title="Update Profile Picture" onClose={() => setOpen(false)}>
			<Backdrop open={masked}>Saving...</Backdrop>
			<GiphySearch image={image} setImage={setImage}/>
			<DialogActions>
				<Button variant="contained" onClick={handleSave}>Save</Button>
				<Button variant="outlined" onClick={handleCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}
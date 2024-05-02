import {GifsResult, GiphyFetch} from '@giphy/js-fetch-api';
import {IGif} from '@giphy/js-types';
import {Gif} from '@giphy/react-components';
import {Button, DialogActions, DialogContent, Grid, InputAdornment, SxProps, TextField, useTheme} from '@mui/material';
import {ChangeEvent, Dispatch, EventHandler, SetStateAction, useState} from 'react';

const gf = new GiphyFetch(process.env.GIPHY_API_KEY || '');

type GiphySearchProps = {
	image: IGif | undefined;
	setImage: Dispatch<SetStateAction<IGif | undefined>>
}

export default function GiphySearch({image, setImage}: GiphySearchProps) {
	const theme               = useTheme();
	const [search, setSearch] = useState('');
	const [images, setImages] = useState<GifsResult['data']>([]);
	
	const handleSearch: EventHandler<any> = (ev) => {
		ev.preventDefault();
		
		if (search) {
			gf.search(search, {sort: 'relevant', lang: 'en', limit: 10, type: 'gifs'})
			  .then(({data}) => setImages(data));
		}
		
		return false;
	};
	
	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSearch(ev.target.value);
	};
	
	const imageSx: SxProps = {
		'& picture': {
			borderRadius: 2,
			border:       '4px solid transparent',
			padding:      .5
		},
		
		'&[data-selected=true] picture': {
			borderColor: theme.palette.primary.dark
		}
	};
	
	return (
		<>
			<DialogActions sx={{pt: 0, pb: 2}}>
				<form onSubmit={handleSearch} style={{width: '100%'}}>
					<TextField
						label="Search"
						variant="outlined"
						size="small"
						color="secondary"
						value={search}
						onChange={handleChange}
						fullWidth
						InputProps={{
							endAdornment: (
								              <InputAdornment position="end">
									              <Button type="submit" size="small" color="secondary" variant="contained" onClick={handleSearch}>Search</Button>
								              </InputAdornment>
							              )
						}}
					/>
				</form>
			</DialogActions>
			<DialogContent sx={{height: '60vh', mx: -3, border: `1px solid ${theme.palette.divider}`}}>
				<Grid container spacing={2} justifyContent="center">
					{images.map(img => (
						<Grid item sx={imageSx} data-selected={img === image}>
							<Gif
								gif={img} width={200}
								hideAttribution noLink
								onGifClick={(gif) => setImage(gif)}
							/>
						</Grid>
					))}
				</Grid>
			</DialogContent>
		</>
	
	);
}
import {GifsResult, GiphyFetch} from '@giphy/js-fetch-api';
import {IGif} from '@giphy/js-types';
import {Gif} from '@giphy/react-components';
import {Button, Card, CardActions, CardContent, CardHeader, Grid, InputAdornment, TextField} from '@mui/material';
import {ChangeEvent, Dispatch, EventHandler, SetStateAction, useState} from 'react';

const gf = new GiphyFetch(process.env.GIPHY_API_KEY || '');


export default function GiphySearch({setImage}: { setImage: Dispatch<SetStateAction<IGif | undefined>> }) {
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
	
	return (
		<Card>
			<CardHeader title="Choose a Profile Picture"/>
			<CardActions>
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
			</CardActions>
			<CardContent>
				<Grid container spacing={2}>
					{images.map(img => (
						<Grid item>
							<Gif
								gif={img} width={200}
								hideAttribution noLink
								onGifClick={(gif) => setImage(gif)}
							/>
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	
	);
}
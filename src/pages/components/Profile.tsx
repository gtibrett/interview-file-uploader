import {Card, CardContent, CardHeader, Grid} from '@mui/material';
import useAuthUser from '../../auth/useAuthUser';
import {PropertiesTable, PropertiesTableRow} from '../../components/propertiesTable';
import ProfileImage from './ProfileImage';

export default function Profile() {
	const user = useAuthUser();
	
	if (!user) {
		return null;
	}
	
	return (
		<Card>
			<CardHeader
				title="Profile"
			/>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs>
						<Card variant="outlined" elevation={0}>
							<PropertiesTable border>
								<PropertiesTableRow header="Name">{user.name}</PropertiesTableRow>
								<PropertiesTableRow header="Email">{user.email}</PropertiesTableRow>
							</PropertiesTable>
						</Card>
					</Grid>
					<Grid item>
						<ProfileImage/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
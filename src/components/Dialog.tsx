import {Dialog as MuiDialog, DialogActions, DialogContent, DialogContentProps, DialogProps as MuiDialogProps, DialogTitle, DialogTitleProps, Grid, GridProps, IconButton, Tooltip} from '@mui/material';
import {PropsWithChildren, ReactNode} from 'react';

export type DialogProps = Omit<MuiDialogProps, 'children' | 'title'> & {
	title: DialogTitleProps['children'];
	closeIcon?: ReactNode;
	closeIconTitle?: string;
	onClose: () => void;
	children: DialogContentProps['children'];
	titleSpacing?: GridProps['spacing'];
	actions?: ReactNode;
};

export default function Dialog(props: PropsWithChildren<DialogProps>) {
	const {
		      title,
		      titleSpacing   = 2,
		      closeIcon,
		      closeIconTitle = 'close dialog',
		      onClose,
		      children,
		      actions,
		      ...dialogProps
	      } = props;
	
	return (
		<MuiDialog {...dialogProps} onClose={onClose}>
			<DialogTitle>
				<Grid container spacing={titleSpacing} alignItems="center">
					<Grid item xs>{title}</Grid>
					{
						closeIcon &&
						<Grid item>
							<Tooltip title={closeIconTitle} placement="left">
								<IconButton onClick={onClose}>
									{closeIcon}
								</IconButton>
							</Tooltip>
						</Grid>
					}
				</Grid>
			</DialogTitle>
			<DialogContent dividers>
				{children}
			</DialogContent>
			{actions && <DialogActions>{actions}</DialogActions>}
		</MuiDialog>
	);
}
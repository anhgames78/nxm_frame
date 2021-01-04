import FirebaseAuth from './FirebaseAuth';
import { Dialog, DialogTitle } from '@material-ui/core';

export default function AuthDialog(props){
	const { onClose, open } = props;
	const handleClose = () => {
    onClose();
  };
	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      		<DialogTitle id="simple-dialog-title">Log In or Sign Up</DialogTitle>
      		<FirebaseAuth />
      	</Dialog>
	);
}



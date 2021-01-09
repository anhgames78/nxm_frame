import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import firebase from '../utils/auth/initFirebase'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    display: 'flex',
    justifyContent: 'left',
    width: '50%',
  },
  }));

const StyledAvatar = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    
    padding: '0 30px',
    
  },
})(Avatar);

export default function Profile() {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState(null);
	const [user, setUser] = React.useState(firebase.auth().currentUser);
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    setUser(firebase.auth().currentUser);
  }
});
	const [profile, setProfile] = React.useState('hello');
	const [newvalue, setNewvalue] = React.useState();
	const classes = useStyles();

	var email, photoUrl, uid, emailVerified;

if (user != null) {
  if (name===null) {setName(user.displayName);}
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}

	const handleClick = (event) => {
    setOpen(true);
    setProfile(event.target.getAttribute("aria-label"));
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
  	event.preventDefault();
  	if (profile==="email"){
  		var credential;
		// Prompt the user to re-provide their sign-in credentials
		user.reauthenticateWithCredential(credential).then(function() {
  		// User re-authenticated.
	  		user.updateEmail(newvalue).then(function() {
	  			// Update successful.
	  		}).catch(function(error) {
	  			// An error happened.
			});
		}).catch(function(error) {
  		// An error happened.
		});
  	}
  	if (profile==="name"){
  		user.updateProfile({
  			displayName: newvalue
  		}).then(function() {
  			// Update successful.
  			setName(user.displayName);
  		}).catch(function(error) {
  			// An error happened.
  		});
  	}
  	if (profile==="photo"){
  		user.updateProfile({
  			photoURL: newvalue
  		}).then(function() {
  			// Update successful.
  		}).catch(function(error) {
  			// An error happened.
  		});
  	}
    setOpen(false);
  };
    return (
      <Container fixed disableGutters>
        <Box align="center" my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile page.
          </Typography>
          <Chip
        avatar={<StyledAvatar>Name</StyledAvatar>}
        label={name}
        aria-label='name'
        clickable
        color="primary"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar>E</Avatar>}
        label={email}
        aria-label='email'
        clickable
        color="primary"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar>P</Avatar>}
        label={photoUrl}
        aria-label='photo'
        clickable
        color="primary"
        onClick={handleClick}
        className={classes.chip}
      />
          <Button variant="contained" color="primary" component={Link} naked href="/">
            Go to the main page
          </Button>
          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      		<DialogTitle id="simple-dialog-title">Change your {profile} </DialogTitle>
      		<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      			<TextField id="standard-basic" label="Enter your new ${profile}" onChange={(e)=>{setNewvalue(e.target.value)}} />
      			<Button onClick={handleSubmit}>Change</Button>
      			<Button onClick={handleClose}>Cancel</Button>
    		</form>
      	</Dialog>
          <ProTip />
        </Box>
      </Container>
    );
}
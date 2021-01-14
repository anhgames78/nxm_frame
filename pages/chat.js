import React from 'react';
import { Container, Typography, Box, Button, Chip, Avatar } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Link from '../src/Link';
import ProTip from '../src/ProTip';

import { useUser, database } from '../utils/auth/useUser';

const useStyles = makeStyles((theme) => ({
	root: {
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      width: '95%',
      justifyContent: 'center',
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    display: 'flex',
    justifyContent: 'left',
    width: '50%',
  },
  }));


  

export default function Chat() {
	const classes = useStyles();
	const [show, setShow] = React.useState(false);
	const [room, setRoom] = React.useState('');
	const [groups, setGroups] = React.useState([]);
  	const { user, logout } = useUser();



  	React.useEffect(() => {
      // You know that the user is loaded: either logged in or out!
const groupsRef = database.ref('groups');
  		const groupsListener = groupsRef.on('value', (snapshot) => {
  			var tempGroups = [];
  			snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                tempGroups.push(data.name);
                });
  			setGroups(tempGroups);
  		});
    
  		
        return () => groupsRef.off('value', groupsListener);
    }, []);

	return (
		<React.Fragment>
		{!show && (
			<Container fixed disableGutters>
	        <Box align="center" my={4}>
	            <Typography variant="h4" component="h1" gutterBottom>
	              	<p>Here is some chat rooms</p>
	              	{
	                	groups.map((value,index)=>
	                		<Chip
	                			key={index}
						        avatar={<Avatar>value.charAt(0)</Avatar>}
						        label={value}
						        aria-label={value}
						        clickable
						        color="primary"
						        onClick={(e) => {
						        	setShow(true);
						        	setRoom(e.target.getAttribute("aria-label"));
					        	}}
						        className={classes.chip}
					   		/>)
	                }
	              	<p
	                	style={{
	                		display: 'inline-block',
	                  		color: 'red',
	                  		textDecoration: 'underline',
	                  		cursor: 'pointer',
	                	}}
	                	onClick={() => logout()}
	              	>
	                Log out
	              	</p>
	              	
	           	</Typography>
	          	<ProTip />
        	</Box>
	      	</Container>
      	)}
		{show && (
			<Container fixed disableGutters>
	        <Box align="center" my={4}>
					<Typography variant="h4" component="h1" gutterBottom>
					<p
	                	style={{
	                		display: 'inline-block',
	                  		color: 'red',
	                  		textDecoration: 'underline',
	                  		cursor: 'pointer',
	                	}}
	                	onClick={() => setShow(false)}
	              	>
	              	You join {room}
	                Back to rooms
	              	</p>
	              	</Typography>
              	</Box>
          	</Container>
		)}
		</React.Fragment>
  )
}
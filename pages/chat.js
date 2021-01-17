import React from 'react';
import { Container, Typography, Box, Button, Chip, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Link from '../src/Link';
import ProTip from '../src/ProTip';

import { useUser, database } from '../utils/auth/useUser';

const useStyles = makeStyles((theme) => ({
	root: {
    '& > *': {
    	display: 'flex',
    	flexWrap: 'wrap',
      	margin: theme.spacing(1),
      	padding: theme.spacing(1),
      	width: '95%',
      	justifyContent: 'center',
      	overflow: 'hidden',
    	backgroundColor: theme.palette.background.paper,
    },
  },
  chipGroup: {
    margin: theme.spacing(0.5),
    display: 'flex',
    justifyContent: 'left',
    width: '50%',
  },
  grid: {
    width: 500,
    height: 400,
    overflowY: 'auto'
  },
  gridMsg: {
    width: 100,
    height: 400,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  }));


const ChildComponent = props => (
  		<Box align={props.align} my={0.5}>
  		<Chip
		        avatar={<Avatar>M</Avatar>}
		        key={props.key}
		        label={props.msg}
		        aria-label="msg from users"
		        clickable
		        color="primary"
		        onClick={(e) => {
		        	e.preventDefault();
	        	}}
		        
	   		/>
	   		</Box>
	   		);

  	const ParentComponent = props => (
      <div id="children-pane">
      {props.children}
    </div>
  );  

export default function Chat() {
	const classes = useStyles();
	const [messages, setMessages] = React.useState([]);
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
                tempGroups.push({id:key,data:data});
                });
  			setGroups(tempGroups);
  		});
  		
  		const msgRef = database.ref('cho');
  			const msgListener = msgRef.on('value', (snapshot) => {
  				var tempMsg = [];
  				snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                tempMsg.push(<ChildComponent key={key} msg={data.message} align="right"/>);
                });
  				setMessages(tempMsg);
  			});
  			
  		
    
  		
        return () => {
        	groupsRef.off('value', groupsListener);
        	msgRef.off('value', msgListener);
        	
        }
    }, []);

	return (
		<div className={classes.root}>
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
						        label={value.data.name}
						        aria-label={value.id}
						        clickable
						        color="primary"
						        onClick={(e) => {
						        	setShow(true);
						        	setRoom(e.target.getAttribute("aria-label"));
						        	database.ref('groups/' + e.target.getAttribute("aria-label") + '/' + user.id).set({
						        		email:user.email,
						        		nickname: "",
						        		profile_picture : user.photo?user.photo:""
						        		});
					        	}}
						        className={classes.chipGroup}
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
	        		Welcome to {room}
        		</Typography>
        	</Box>
        		<Grid container spacing={3}>
        			<Grid item xs={3} component='ul' className={classes.grid}>
          				<Chip
		        avatar={<Avatar>M</Avatar>}
		        label="Members"
		        aria-label="list of users"
		        clickable
		        color="primary"
		        onClick={(e) => {
		        	e.preventDefault();
	        	}}
		        
	   		/>
        			</Grid>
        			<Grid item xs={9} component='ul' className={classes.grid} direction-xs-row-reverse>
          				<ParentComponent>
        		{messages}
      		</ParentComponent>
        			</Grid>
        			<Grid item xs={12} className={classes.gridMsg}>
          				<form className={classes.root} noValidate autoComplete="off">
  <TextField id="standard-basic" fullWidth label="Enter your message:" />
  
</form>
        			</Grid>
        		</Grid>


        		

					<Typography variant="h4" component="h1" gutterBottom>
					<p
	                	style={{
	                		display: 'inline-block',
	                  		color: 'red',
	                  		textDecoration: 'underline',
	                  		cursor: 'pointer',
	                	}}
	                	onClick={() => {
	                		database.ref('groups/' + room + '/' + user.id).remove();
	                		setShow(false);
	                		setRoom("");
	                	}}
	              	>
	              	    Back to rooms
	              	</p>
	              	</Typography>
          	</Container>
		)}
		</div>
  )
}
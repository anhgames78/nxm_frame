import React from 'react';
import { Container, Typography, Box, Button, Chip, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Face, ChatBubbleOutline } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../src/Link';
import ProTip from '../src/ProTip';

import { useUser, database } from '../utils/auth/useUser';

const useStyles = makeStyles((theme) => ({
	root: {
		
    	display: 'flex',
    	flexGrow: 1,
    	flexWrap: 'wrap',
    	justifyContent: 'center',
      	margin: theme.spacing(1),
      	padding: theme.spacing(1),
      	width: '80%',
      	overflow: 'hidden',
    	backgroundColor: theme.palette.background.paper,
   
  },
  chipGroup: {
    margin: theme.spacing(0.5),
    display: 'flex',
    justifyContent: 'left',
    width: '100%',
  },
  grid: {
    height: 400,
    overflowY: 'auto'
  },
  gridMsg: {
    height: 100,
  },
  
  }));



const ChildComponent = props => (
  		<Box align="left" my={0.5}>
  		<Chip
		        avatar={<Avatar></Avatar>}
		        key={props.key}
		        label={props.msg}
		        aria-label="msg from other users"
		        clickable
		        color="secondary"
		        onClick={(e) => {
		        	e.preventDefault();
	        	}}
		        
	   		/>
	   		</Box>
	   		);

const MyComponent = props => (
  		<Box align="right" my={0.5}>
  		<Chip
		        
		        key={props.key}
		        label={props.msg}
		        aria-label="my message"
		        
		        color="primary"
		        
		        
	   		/>
	   		</Box>
	   		);




export default function Chat() {
	const classes = useStyles();
	const [messages, setMessages] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [show, setShow] = React.useState(false);
	const [roomID, setRoomID] = React.useState(null);
	const [rooms, setRooms] = React.useState([]);
	const [members, setMembers] = React.useState([]);
	const [timejoin, setTimejoin] = React.useState(null);
  	const { user, logout } = useUser();
  	const [listTakers, setListTakers] = React.useState(["All members"]);
  	const [test, setTest] = React.useState(true);

  const handleDelete = (event) => {
  	event.preventDefault();
  	setTest(!test);
  }

  	const handleSubmit = (event) => {
  	event.preventDefault();
  	const currentTime = Date.now();
  	// Get a key for a new message.
  var newMsgKey = database.ref('messages/' + rooms[roomID]).push().key;
  	
database.ref('messages/' + rooms[roomID] + '/' + newMsgKey).set({
						        		message:message,
						        		sender: user.id,
						        		takers: "all",
						        		timestamp: currentTime
						        		});
setMessage('');
}

  	const handleRoom = param => {
  		const joinTime = Date.now();
        setShow(true);
	   	setRoomID(param);
	   	setTimejoin(joinTime);
	   	database.ref('groups/' + rooms[param] + '/' + user.id).set({
			nickname: user.email,
			photo: user.photo?user.photo:null,
			time: joinTime
			});
    }
          					

  	React.useEffect(() => {
      // You know that the user is loaded: either logged in or out!
const groupsRef = database.ref('groups');
  		const groupsListener = groupsRef.on('value', (snapshot) => {
  			var tempRooms = [];
  			var tempMembers = [];
  			snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                tempRooms.push(key);
                tempMembers.push(data);
                });
  			setRooms(tempRooms);
  			setMembers(tempMembers);
  		});
  		
  		if (roomID !== null) {
  		const msgRef = database.ref('messages/' + rooms[roomID]);
  			const msgListener = msgRef.on('value', (snapshot) => {
  				var tempMsg = [];
  				snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                if (data.timestamp >= timejoin) {
                	const sender = data.sender;
                	if (user.id==sender) {
                		tempMsg.push(<MyComponent key={key} msg={data.message} />);
                	} else {
                		var noidung = members[roomID].sender.nickname + ': ' + data.message;
                		tempMsg.push(<ChildComponent key={key} msg={noidung} />);
                	}

                
                }
  				
  			});
  				setMessages(tempMsg);
  	});
  		}
    
  		
        return () => {
        	groupsRef.off('value', groupsListener);

        }
    }, [roomID]);

	return (
		<div className={classes.root}>
		{!show && (
			<Container fixed disableGutters>
	        <Box align="center" my={4}>
	            <Typography variant="h4" component="h1" gutterBottom>
	              	<p>Here is some chat rooms</p>
	              	{
	                	members.map((value,index)=>
	                		<Chip
	                			key={index}
						        avatar={<Avatar>value.charAt(0)</Avatar>}
						        label={value.name}
						        clickable
						        color="primary"
						        onClick={() => handleRoom(index)}
						        	
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
	        		Welcome to {members[roomID].name}
        		</Typography>
        	
        		<Grid container spacing={3}>
        			<Grid item xs={2} component='ul' className={classes.grid}>
          				

          					{
          						
          						Object.values(members[roomID]).map(x =>
          									x.nickname && <Chip
						        avatar={<Avatar src={x.photo?x.photo:null}><Face /></Avatar>}
						        label={x.nickname}
						        aria-label="no"
						        clickable
        						color="primary"
        						onDelete={handleDelete}
        						deleteIcon={test?<ChatBubbleOutline />:<ChatIcon />}
						        className={classes.chipGroup}
					   		/>)
          							}
  
          				

          					
        			</Grid>
        			<Grid item xs={10} component='ul' className={classes.grid} direction-xs-row-reverse>
        				{messages}
        			</Grid>

        			<Grid item xs={2} className={classes.gridMsg}>
        				<Button variant="contained" color="primary">
  							Chat All
						</Button>
        			</Grid>
        			
        			<Grid item xs={10} className={classes.gridMsg}>
        			

      <TextField
          id="outlined-read-only-input"
          fullWidth
          label="Chat to: "
          defaultValue={listTakers.join(', ')}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

</Grid>

        			<Grid item xs={12} className={classes.gridMsg}>
          				<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
  <TextField autoFocus id="standard-basic" fullWidth label="Enter your message:" value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
  
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
	                		database.ref('groups/' + rooms[roomID] + '/' + user.id).remove();
	                		
	                		setShow(false);
	                		setRoomID(null);
	                		setMessages([]);
	                		setTimejoin(null);
	                		setListTakers(["All members"]);
	                		
	                	}}
	              	>
	              	    Back to rooms
	              	</p>
	              	</Typography>
	              	</Box>
          	</Container>
		)}
		</div>
  )
}
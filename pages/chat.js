import React from 'react';
import { Container, Typography, Box, Button, Chip, Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
		
    	display: 'flex',
    	flexGrow: 1,
    	flexWrap: 'wrap',
      	margin: theme.spacing(1),
      	padding: theme.spacing(1),
      	width: '95%',
      	justifyContent: 'center',
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
  	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
			
          	<div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container fixed disableGutters>
	        <Box align="center" my={4}>
	        	<Typography variant="h4" component="h1" gutterBottom>
	        		Welcome to {members[roomID].name}
        		</Typography>
        	</Box>
        		<Grid container spacing={3}>
        			<Grid item xs={3} component='ul' className={classes.grid}>
          				

          					{
          						
          						Object.values(members[roomID]).map(x =>
          									x.nickname && <Chip
						        avatar={<Avatar src={x.photo?x.photo:null}>{x.nickname.charAt(0)}</Avatar>}
						        label={x.nickname}
						        aria-label="no"
						        clickable
						        color="primary"
						        onClick={(e) => {
						        	e.preventDefault();
					        	}}
						        className={classes.chipGroup}
					   		/>)
          							}
  
          				

          					
        			</Grid>
        			<Grid item xs={9} component='ul' className={classes.grid} direction-xs-row-reverse>
        				{messages}
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
	                		
	                	}}
	              	>
	              	    Back to rooms
	              	</p>
	              	</Typography>
          	</Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
		)}
		</div>
  )
}
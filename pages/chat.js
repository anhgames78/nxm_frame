import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link as RLink } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from '../src/Link';
import ProTip from '../src/ProTip';

import { useUser, database } from '../utils/auth/useUser';

export default function Chat() {
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
	    <Router>
	      <Container fixed disableGutters>
	        <Box align="center" my={4}>
	          {!user && (
	            <Typography variant="h4" component="h1" gutterBottom>
	            	Hi there! You are not signed in.
	            </Typography>
	          )}
	          {user && (
	            <Typography variant="h4" component="h1" gutterBottom>
	              	<p>Here is some chat rooms</p>
	              	<p
	                	style={{
	                  		display: 'inline-block',
	                  		color: 'blue',
	                  		textDecoration: 'underline',
	                  		cursor: 'pointer',
	                	}}
	                >
	                {groups}
	                </p>
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
	          )}
	          <Switch>
	              <Route path="/me">
	                <h2>About me</h2>
	                <RLink to="/">Back to home</RLink>
	              </Route>
	              <Route exact path="/">
	                {!user && (<h2>Please Log In!!</h2>)}
	                {user && (<h2>Welcome User!!</h2>)}
	                <RLink to="/me">About me</RLink>
	              </Route>
	          </Switch>
	          <ProTip />
	        </Box>
	      </Container>
	    </Router>
  )
}
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link as RLink } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import AuthDialog from '../components/AuthDialog';


import useSWR from 'swr'
import { useUser } from '../utils/auth/useUser'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', 'token':token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useUser();
  const { data, error } = useSWR(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  );

  const handleLogIn = () => {
    setOpen(true);
  };

  const handleDialog = () => {
    setOpen(false);
  };

  return (
    <Router>
      <Container fixed disableGutters>
        <Box align="center" my={4}>
          {!user && (
            <Typography variant="h4" component="h1" gutterBottom>
            	Hi there! You are not signed in.
            	<Box bgcolor="warning.main" width={150} m={1}>
            		<Button color="secondary" onClick={handleLogIn}>
                		Log In or Sign Up
              		</Button>
				</Box>
            </Typography>
          )}
          {user && (
            <Typography variant="h4" component="h1" gutterBottom>
              <p>You're signed in. Email: {user.email}.</p>
              <Link href='/chat'>Go to chat page!</Link>
              <p
                style={{
                  display: 'inline-block',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => logout()}
              >
                Log out
              </p>
            {error && <div>Failed to fetch food!</div>}
            {data && !error ? (
              <div>Your favorite food is {data.food}.</div>
              ) : (
              <div>Loading...</div>
              )}
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
          <AuthDialog onClose={handleDialog} open={open}/>
          <ProTip />
        </Box>
      </Container>
    </Router>
  )
}
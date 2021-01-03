import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link as RLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import { UserAuth } from '../src/data';

import useSWR from 'swr'
import { useUser } from '../utils/auth/useUser'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', 'token':token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

export default function Index() {
	const [auth, setAuth] = React.useContext(UserAuth);
  const { user, logout } = useUser();
  const { data, error } = useSWR(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  );
  if (!user) {
    return (
      <Router>
        <Container fixed disableGutters>
          <Box align="center" my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Hi there! You are not signed in.{' '}
            </Typography>
            <Link href={'/auth'}>
              Sign in
            </Link>
            <Switch>
                <Route path="/me">
                  <h2>About me</h2>
                  <RLink to="/">Back to home</RLink>
                </Route>
                <Route path="/">
                  {auth && (<h2>Welcome User!!</h2>)}
                  {!auth && (<h2>Please Log In!!</h2>)}
                  <RLink to="/me">About me</RLink>
                </Route>
            </Switch>
            <ProTip />
          </Box>
        </Container>
      </Router>
    )
  } 
  return (
    <Router>
      <Container fixed disableGutters>
        <Box align="center" my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            <p>You're signed in. Email: {user.email}.</p>
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
          </Typography>
          <Link href={'/example'}>
            Another example page
          </Link>
          {error && <div>Failed to fetch food!</div>}
          {data && !error ? (
            <div>Your favorite food is {data.food}.</div>
            ) : (
            <div>Loading...</div>
            )}
          <Switch>
            <Route path="/me">
              <h2>About me</h2>
              <RLink to="/">Back to home</RLink>
            </Route>
            <Route path="/">
              {auth && (<h2>Welcome User!!</h2>)}
              {!auth && (<h2>Please Log In!!</h2>)}
              <RLink to="/me">About me</RLink>
            </Route>
          </Switch>
          <ProTip />
        </Box>
      </Container>
    </Router>
  );
}

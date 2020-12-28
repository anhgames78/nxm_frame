import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link as RLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import { UserAuth } from '../src/data';

export default function Index() {
	const [auth, setAuth] = React.useContext(UserAuth);
    return (
    	<Router>
        <Container fixed disableGutters>
	      	<Box align="center" my={4}>
		        <Typography variant="h4" component="h1" gutterBottom>
		          Next.js example
		        </Typography>
		        <Link href="/about" color="secondary">
		          Go to the about page
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
    );
}
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';

export default function Privacy() {
    return (
      <Container fixed disableGutters>
        <Box align="center" my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Privacy page.
          </Typography>
          <Button variant="contained" color="primary" component={Link} naked href="/">
            Go to the main page
          </Button>
          <ProTip />
        </Box>
      </Container>
    );
}
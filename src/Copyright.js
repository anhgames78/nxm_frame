import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Link from './Link';

export default function Copyright() {
  return (
    <React.Fragment>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://material-ui.com/">
          Your Website
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href="/privacy">
          Privacy
        </Link>{' - '}
        <Link href="/terms">
          Terms
        </Link>{' - '}
        <Link href="/faq">
          FAQ
        </Link>
      </Typography>
    </React.Fragment>
  );
}

import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../utils/auth/useUser';

import Link from './Link';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, Face, Home } from '@material-ui/icons';
import AuthDialog from '../components/AuthDialog';

const useStyles = makeStyles({
    navDisplayFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "white",
        fontSize: '2rem'
    }
});

export default function Nav() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const router = useRouter();
    const { user, logout } = useUser();
    const [open, setOpen] = React.useState(false);

    const handleLogIn = () => {
        setAnchorEl(null);
        setOpen(true);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        logout();
    };

    const handleAccount = () => {
        setAnchorEl(null);
        router.push('/profile');
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDialog = () => {
        setOpen(false);
    };

    return (
    	<AppBar position="static">
	  		<Toolbar>
			    <Container className={classes.navDisplayFlex}>
			      <IconButton edge="start" color="inherit" aria-label="home" onClick={() => router.push('/')}>
			        <Home fontSize="large" />
			      </IconButton>
			      <List
			        component="nav"
			        aria-labelledby="main navigation"
			        className={classes.navDisplayFlex}
			      >
			        <Link href="/about">
			          <ListItem button>
			            <ListItemText classes={{primary:classes.linkText}} primary="About Us" />
			          </ListItem>
			        </Link>
			        <Link href="/faq">
			          <ListItem button>
			            <ListItemText classes={{primary:classes.linkText}} primary="FAQ" />
			          </ListItem>
			        </Link>
			        <Link href="/contact">
			          <ListItem button>
			            <ListItemText classes={{primary:classes.linkText}} primary="Contact" />
			          </ListItem>
			        </Link>
			        {!user && (
			            <div>
			              <IconButton
			              	edge="end"
			                aria-label="account of current user"
			                aria-controls="menu-appbar"
			                aria-haspopup="true"
			                onClick={handleMenu}
			                color="inherit"
			              >
			                <AccountCircle fontSize="large" />
			              </IconButton>
			              <Menu
			                id="menu-appbar"
			                anchorEl={anchorEl}
			                anchorOrigin={{
			                  vertical: 'top',
			                  horizontal: 'right',
			                }}
			                keepMounted
			                transformOrigin={{
			                  vertical: 'top',
			                  horizontal: 'right',
			                }}
			                open={openMenu}
			                onClose={handleClose}
			              >
			                <MenuItem onClick={handleLogIn}>Log In</MenuItem>
			                <MenuItem onClick={handleLogIn}>Sign Up</MenuItem>
			              </Menu>
			            </div>
			        )}
			        {user && (
			            <div>
			              <IconButton
			              	edge="end"
			                aria-label="account of current user"
			                aria-controls="menu-appbar"
			                aria-haspopup="true"
			                onClick={handleMenu}
			                color="inherit"
			              >
			                <Face fontSize="large" />
			              </IconButton>
			              <Menu
			                id="menu-appbar"
			                anchorEl={anchorEl}
			                anchorOrigin={{
			                  vertical: 'top',
			                  horizontal: 'right',
			                }}
			                keepMounted
			                transformOrigin={{
			                  vertical: 'top',
			                  horizontal: 'right',
			                }}
			                open={openMenu}
			                onClose={handleClose}
			              >
			                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
			                <MenuItem onClick={handleAccount}>My account</MenuItem>
			              </Menu>
			            </div>
			        )}
			      </List>
			    </Container>
      		</Toolbar>
			<AuthDialog onClose={handleDialog} open={open}/>

  		</AppBar>
    );
}
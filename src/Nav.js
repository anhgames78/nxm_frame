import React from 'react';
import { UserAuth } from './data';

import Link from './Link';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, Face, Home } from '@material-ui/icons';

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
    const [auth, setAuth] = React.useContext(UserAuth);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = () => {
        setAuth(!auth);
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static">
      <Toolbar>
        <Container className={classes.navDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
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
            {!auth && (
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
	                open={open}
	                onClose={handleClose}
	              >
	                <MenuItem onClick={handleChange}>Log In</MenuItem>
	                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
	              </Menu>
	            </div>
	        )}
            {auth && (
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
	                open={open}
	                onClose={handleClose}
	              >
	                <MenuItem onClick={handleChange}>Log Out</MenuItem>
	                <MenuItem onClick={handleClose}>My account</MenuItem>
	              </Menu>
	            </div>
	        )}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
    );
}
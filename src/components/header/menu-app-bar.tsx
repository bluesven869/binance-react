import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../logo.svg';
import {
  Link,
  useLocation
} from "react-router-dom"



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      
    },
    menu: {
      marginLeft: 50,
    },
    selected: {
      color: '#fff !important',
      textDecoration: 'underline !important',
    },
    menuItem: {
      marginLeft: 10,
      marginRight: 10,
      color: '#aaa',
      textDecoration: 'none',
      fontSize: 15,
    },
    siteName: {
      color: '#fff',
      textDecoration: 'none'
    }
  }),
);

export default function MenuAppBar() {
  const classes = useStyles();
  let location = useLocation();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} className="App-logo" alt="logo" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.siteName} to="/">Exchange Example</Link>
          </Typography>
          <Typography variant="h6" className={classes.menu}>
            <Link className={[classes.menuItem, location.pathname === '/markets' ? classes.selected : ''].join(' ')} to="/markets">Markets</Link>
            <Link className={[classes.menuItem, location.pathname === '/exchange' ? classes.selected : ''].join(' ')} to="/exchange">Exchange</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

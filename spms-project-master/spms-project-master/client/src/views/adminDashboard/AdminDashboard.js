/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Auth from '../../Auth.js';
import PrivateRoute from '../../PrivateRoute.js';
import MainListItems from './dashboardComponents/listItems';
import AddNewAccount from './views/AddNewAccount.js';
import ViewAddCourse from './views/ViewAddCourse.js';
import ViewAddDegreeProgram from './views/ViewAddDegreeProgram.js';
import ViewAddDepartment from './views/ViewAddDepartment.js';
import ViewAddOfferedCourse from './views/ViewAddOfferedCourse.js';
import ViewAddSchool from './views/ViewAddSchool.js';
import ViewAddSemester from './views/ViewAddSemester.js';
import ViewAddFaculty from './views/ViewAddFaculty.js';
import ViewAddStudents from './views/ViewAddStudents.js';

const NotFound = ({ location }) => {
  
  return (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div> );
}
function Home () {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper>
        <Typography variant="h2" component="h2" gutterBottom>
          Welcome to your Dashboard
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          Refer to the left panel for your options
        </Typography>
      </Paper>
    </Grid>
  );
}

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AdminDashboard (props) {  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [accountID, setAccountID] = useState('');
  const [accountType, setAccountType] = useState('');
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOutClick = () => {
    console.log('click')
    if (Auth.isAuthenticated === true) {
      Auth.signOut();
      props.history.push('/');
    }
  }

  useEffect(()=> {
    return () => {
      setAccountType(props.accountType);
      setAccountID(props.accountID);
    };
  }, []);

  return (

    <Router>

      <div className={classes.root}>

        <CssBaseline />

        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Admin Dashboard
            </Typography>
            <Link>
              <ListItem button>
                  <ListItemText>
                    <Button onClick={handleSignOutClick}>
                      Sign Out
                    </Button>
                  </ListItemText>
              </ListItem>
            </Link>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems
              accountID={props.accountID}
              accountType={props.accountType}
            ></MainListItems>
          </List>
        </Drawer>

        <main className={classes.content}>

          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>

            <Switch>
              <PrivateRoute exact path='/dashboard' component={Home} />
              <PrivateRoute exact path={'/dashboard/view-add-courses'} component={ViewAddCourse} />
              <PrivateRoute exact path={'/dashboard/view-add-semester'} component={ViewAddSemester} />
              <PrivateRoute exact path={'/dashboard/view-add-offered-course'} component={ViewAddOfferedCourse} />
              <PrivateRoute exact path={'/dashboard/view-students'} component={ViewAddStudents} />
              <PrivateRoute exact path={'/dashboard/view-faculties'} component={ViewAddFaculty} />
              <PrivateRoute exact path={'/dashboard/add-new-account'} component={AddNewAccount} />
              <PrivateRoute exact path={'/dashboard/view-add-school'} component={ViewAddSchool} />
              <PrivateRoute exact path={'/dashboard/view-add-dept'} component={ViewAddDepartment} />
              <PrivateRoute exact path={'/dashboard/view-add-degree-programs'} component={ViewAddDegreeProgram} />
              <PrivateRoute component={NotFound} />
            </Switch>

            </Grid>

          </Container>

        </main>

      </div>

    </Router>
  );
}
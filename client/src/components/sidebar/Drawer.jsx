import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authAction/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@mui/icons-material/Update';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import store from '../../store';
import { loadUser } from '../../actions/authAction/auth';

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    background: '#fff',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  },
  active: {
    background: '#f4f4f4',
  },
});

function DrawerBar({ children, logout, auth: { user } }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [empcheck, setEmpCheck] = useState(false);
  const location = useLocation();
  const menuItems = [
    {
      text: 'My Profile',
      icon: <PermIdentityIcon color="gray" />,
      path: '/myprofile',
    },
    {
      text: 'Change Password',
      icon: <UpdateIcon color="gray" />,
      path: '/changepassword',
    },
  ];
  const levaemenuItems = [
    {
      text: 'Apply Leave',
      path: '/addleave',
    },
    {
      text: 'My Leaves',
      path: '/userleave',
    },
    {
      text: 'Manager Leaves',
      path: '/managerleave',
    },
  ];
  const Employees = [
    {
      text: 'Add Employee',
      path: '/register',
    },
    {
      text: 'Manage Employee',
      path: '/userleave',
    },
  ];
  const redirect = (path) => {
    navigate(path);
  };
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className={classes.root}>
      {/* app bar */}

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Logo here
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <>
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                className={
                  location.pathname == item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              <hr />
            </>
          ))}
          <ListItem button onClick={() => setCheck((prevCheck) => !prevCheck)}>
            <ListItemIcon>
              <SpeakerNotesIcon />
            </ListItemIcon>
            <ListItemText primary="Leave" />
            {check ? (
              <ArrowDropDownIcon />
            ) : (
              <KeyboardArrowRightIcon fontSize="small" />
            )}
          </ListItem>
          <hr />
          {check ? (
            <>
              {levaemenuItems.map((item) => (
                <>
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    className={
                      location.pathname == item.path ? classes.active : null
                    }
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </>
              ))}
            </>
          ) : null}
          {user.role === 'admin' ? (
            <>
              <ListItem
                button
                onClick={() => setEmpCheck((prevCheck) => !prevCheck)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Employee's" />
                {empcheck ? (
                  <ArrowDropDownIcon />
                ) : (
                  <KeyboardArrowRightIcon fontSize="small" />
                )}
              </ListItem>
              <hr />
              {empcheck ? (
                <>
                  {Employees.map((item) => (
                    <>
                      <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        className={
                          location.pathname == item.path ? classes.active : null
                        }
                      >
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    </>
                  ))}
                </>
              ) : null}
            </>
          ) : null}

          <ListItem button onClick={() => logout()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
        <hr />
      </Drawer>

      {/* main content */}
      <div className={classes.page}>{children}</div>
    </div>
  );
}
DrawerBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(DrawerBar);

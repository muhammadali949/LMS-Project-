import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { logout } from '../../actions/authAction/auth';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authAction/auth';
import UpdateIcon from '@mui/icons-material/Update';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CodeIcon from '@material-ui/icons/Code';
import PublicIcon from '@material-ui/icons/Public';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PersonIcon from '@material-ui/icons/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import store from '../../store';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    background: '#fff',
    width: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      marginBottom: '50px',
      background: 'linear-gradient(90deg, #2B5876 0%, #4E4376 100%) !important',
    },
  },
  active: {
    background: '#f4f4f4',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const dashboard = [
  {
    text: 'Dashboard',
    icon: <PublicIcon style={{ color: '#000' }} />,
    path: '/admindashboard',
  },
];
const menuItems = [
  {
    text: 'Change Password',
    icon: <UpdateIcon style={{ color: '#000' }} />,
    path: '/changepassword',
  },
];
const profile = [
  {
    text: 'My Profile',
    icon: <PermIdentityIcon style={{ color: '#000' }} />,
    path: '/myprofile',
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
    path: '/employee',
  },
];
const departmentData = [
  {
    text: 'Add Department',
    path: '/adddepartment',
  },
  {
    text: 'Manage Department',
    path: '/managedepartment',
  },
];
const leaveManagement = [
  {
    text: 'All Leaves',
    path: '/allleave',
  },
  {
    text: 'Pending Leave',
    path: '/pendingleave',
  },
  {
    text: 'Granted Leave',
    path: '/grantedleave',
  },
  {
    text: 'Rejected Leave',
    path: '/rejectedleave',
  },
];
const leaveType = [
  {
    text: 'Add Leave Type',
    path: '/addleavetype',
  },
  {
    text: 'Manage Leave type',
    path: '/updateleavetype',
  },
];

function DrawerBar({ children, window, logout, auth: { user } }) {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [check, setCheck] = useState(false);
  const [empcheck, setEmpCheck] = useState(false);
  const [leaveCheck, setLeaveCheck] = useState(false);
  const [departmentCheck, setDepartmentCheck] = useState(false);
  const [levaeManagementCheck, setLevaeManagementCheck] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    switch (location.pathname) {
      case '/employee':
        return (
          setEmpCheck(true),
          setDepartmentCheck(false),
          setLeaveCheck(false),
          setLevaeManagementCheck(false)
        );
        break;
      case '/managedepartment':
        return (
          setDepartmentCheck(true),
          setEmpCheck(false),
          setLeaveCheck(false),
          setLevaeManagementCheck(false)
        );
        break;
      case '/updateleavetype':
        return (
          setLeaveCheck(true),
          setEmpCheck(false),
          setDepartmentCheck(false),
          setLevaeManagementCheck(false)
        );
        break;
      case '/allleave':
        return (
          setLevaeManagementCheck(true),
          setEmpCheck(false),
          setDepartmentCheck(false),
          setLeaveCheck(false)
        );
        break;
      default:
        return location.pathname;
    }
  }, [location.pathname]);
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {user?.role === 'admin' ? (
          <>
            {dashboard.map((item) => (
              <>
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    navigate(item.path);
                    setEmpCheck(false);
                    setDepartmentCheck(false);
                    setLevaeManagementCheck(false);
                    setLeaveCheck(false);
                    setMobileOpen(false);
                  }}
                  className={
                    location.pathname == item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </>
            ))}
          </>
        ) : null}
        <Divider />
        {user?.role === 'user' ? (
          <>
            {profile.map((item) => (
              <>
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  className={
                    location.pathname == item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                <hr />
              </>
            ))}{' '}
          </>
        ) : null}
        {menuItems.map((item) => (
          <>
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setEmpCheck(false);
                setDepartmentCheck(false);
                setLevaeManagementCheck(false);
                setLeaveCheck(false);
                setMobileOpen(false);
              }}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            <hr />
          </>
        ))}{' '}
        {user?.role === 'user' ? (
          <>
            <ListItem
              button
              onClick={() => setCheck((prevCheck) => !prevCheck)}
            >
              <ListItemIcon>
                <SpeakerNotesIcon style={{ color: '#000' }} />
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
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
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
        {user?.role === 'admin' ? (
          <>
            <ListItem
              button
              onClick={() => {
                setDepartmentCheck((prevCheck) => !prevCheck);
                setEmpCheck(false);
                setLevaeManagementCheck(false);
                setLeaveCheck(false);
              }}
            >
              <ListItemIcon>
                <SpeakerNotesIcon style={{ color: '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Department" />
              {departmentCheck ? (
                <ArrowDropDownIcon />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </ListItem>
            <hr />
            {departmentCheck ? (
              <>
                {departmentData?.map((item) => (
                  <>
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
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
        {user?.role === 'admin' ? (
          <>
            <ListItem
              button
              onClick={() => {
                setLevaeManagementCheck((prevCheck) => !prevCheck);
                setEmpCheck(false);
                setDepartmentCheck(false);
                setLeaveCheck(false);
              }}
            >
              <ListItemIcon>
                <DesktopWindowsIcon style={{ color: '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Leave Management" />
              {levaeManagementCheck ? (
                <ArrowDropDownIcon />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </ListItem>
            <hr />
            {levaeManagementCheck ? (
              <>
                {leaveManagement?.map((item) => (
                  <>
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
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
        {user?.role === 'admin' ? (
          <>
            <ListItem
              button
              onClick={() => {
                setEmpCheck((prevCheck) => !prevCheck);
                setDepartmentCheck(false);
                setLevaeManagementCheck(false);
                setLeaveCheck(false);
              }}
            >
              <ListItemIcon>
                <PersonIcon style={{ color: '#000' }} />
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
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
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
        {user?.role === 'admin' ? (
          <>
            <ListItem
              button
              onClick={() => {
                setLeaveCheck((prevCheck) => !prevCheck);
                setEmpCheck(false);
                setDepartmentCheck(false);
                setLevaeManagementCheck(false);
              }}
            >
              <ListItemIcon>
                <CodeIcon style={{ color: '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Leave Type" />
              {leaveCheck ? (
                <ArrowDropDownIcon />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </ListItem>
            <hr />
            {leaveCheck ? (
              <>
                {leaveType.map((item) => (
                  <>
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
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
            <ExitToAppIcon style={{ color: '#000' }} />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.page}>{children}</div>
    </div>
  );
}

DrawerBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

DrawerBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(DrawerBar);

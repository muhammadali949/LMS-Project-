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
import Typography from '@material-ui/core/Typography';
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
const menuItems = [
  {
    text: 'My Profile',
    icon: <PermIdentityIcon style={{ color: '#000' }} />,
    path: '/myprofile',
  },
  {
    text: 'Change Password',
    icon: <UpdateIcon style={{ color: '#000' }} />,
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
    path: '/employee',
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const redirect = (path) => {
    navigate(path);
  };
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <>
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
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
        {user?.role === 'admin' ? (
          <>
            <ListItem
              button
              onClick={() => setEmpCheck((prevCheck) => !prevCheck)}
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
        {user?.role === 'admin' ? (
          <>
            <ListItem
              button
              onClick={() => setLeaveCheck((prevCheck) => !prevCheck)}
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

// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core';
// import Drawer from '@material-ui/core/Drawer';
// import Typography from '@material-ui/core/Typography';
// import { useNavigate, useLocation } from 'react-router-dom';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../../actions/authAction/auth';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import UpdateIcon from '@mui/icons-material/Update';
// import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import PersonIcon from '@material-ui/icons/Person';
// import store from '../../store';
// import { loadUser } from '../../actions/authAction/auth';

// const drawerWidth = 240;

// const useStyles = makeStyles({
//   page: {
//     background: '#fff',
//     width: '100%',
//   },
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     width: drawerWidth,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
//   },
//   active: {
//     background: '#f4f4f4',
//   },
// });

// function DrawerBar({ children, logout, auth: { user } }) {
//   const classes = useStyles();
//   const [check, setCheck] = useState(false);
//   const [empcheck, setEmpCheck] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       text: 'My Profile',
//       icon: <PermIdentityIcon color="gray" />,
//       path: '/myprofile',
//     },
//     {
//       text: 'Change Password',
//       icon: <UpdateIcon color="gray" />,
//       path: '/changepassword',
//     },
//   ];
//   const levaemenuItems = [
//     {
//       text: 'Apply Leave',
//       path: '/addleave',
//     },
//     {
//       text: 'My Leaves',
//       path: '/userleave',
//     },
//     {
//       text: 'Manager Leaves',
//       path: '/managerleave',
//     },
//   ];
//   const Employees = [
//     {
//       text: 'Add Employee',
//       path: '/register',
//     },
//     {
//       text: 'Manage Employee',
//       path: '/userleave',
//     },
//   ];
//   const redirect = (path) => {
//     navigate(path);
//   };
//   useEffect(() => {
//     store.dispatch(loadUser());
//   }, []);
//   return (
//     <div className={classes.root}>
//       {/* app bar */}

//       {/* side drawer */}
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{ paper: classes.drawerPaper }}
//         anchor="left"
//       >
//         <div>
//           <Typography variant="h5" className={classes.title}>
//             Logo here
//           </Typography>
//         </div>

//         {/* links/list section */}
//         <List>
//           {menuItems.map((item) => (
//             <>
//               <ListItem
//                 button
//                 key={item.text}
//                 onClick={() => navigate(item.path)}
//                 className={
//                   location.pathname == item.path ? classes.active : null
//                 }
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//               <hr />
//             </>
//           ))}
//           <ListItem button onClick={() => setCheck((prevCheck) => !prevCheck)}>
//             <ListItemIcon>
//               <SpeakerNotesIcon />
//             </ListItemIcon>
//             <ListItemText primary="Leave" />
//             {check ? (
//               <ArrowDropDownIcon />
//             ) : (
//               <KeyboardArrowRightIcon fontSize="small" />
//             )}
//           </ListItem>
//           <hr />
//           {check ? (
//             <>
//               {levaemenuItems.map((item) => (
//                 <>
//                   <ListItem
//                     button
//                     key={item.text}
//                     onClick={() => navigate(item.path)}
//                     className={
//                       location.pathname == item.path ? classes.active : null
//                     }
//                   >
//                     <ListItemIcon></ListItemIcon>
//                     <ListItemText primary={item.text} />
//                   </ListItem>
//                 </>
//               ))}
//             </>
//           ) : null}
//           {user?.role === 'admin' ? (
//             <>
//               <ListItem
//                 button
//                 onClick={() => setEmpCheck((prevCheck) => !prevCheck)}
//               >
//                 <ListItemIcon>
//                   <PersonIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Employee's" />
//                 {empcheck ? (
//                   <ArrowDropDownIcon />
//                 ) : (
//                   <KeyboardArrowRightIcon fontSize="small" />
//                 )}
//               </ListItem>
//               <hr />
//               {empcheck ? (
//                 <>
//                   {Employees.map((item) => (
//                     <>
//                       <ListItem
//                         button
//                         key={item.text}
//                         onClick={() => navigate(item.path)}
//                         className={
//                           location.pathname == item.path ? classes.active : null
//                         }
//                       >
//                         <ListItemIcon></ListItemIcon>
//                         <ListItemText primary={item.text} />
//                       </ListItem>
//                     </>
//                   ))}
//                 </>
//               ) : null}
//             </>
//           ) : null}

//           <ListItem button onClick={() => logout()}>
//             <ListItemIcon>
//               <ExitToAppIcon />
//             </ListItemIcon>
//             <ListItemText primary="Sign out" />
//           </ListItem>
//         </List>
//         <hr />
//       </Drawer>

//       {/* main content */}
//       <div className={classes.page}>{children}</div>
//     </div>
//   );
// }
// DrawerBar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logout })(DrawerBar);

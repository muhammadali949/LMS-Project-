import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import store from '../../../store';
import { getLeaveType } from '../../../actions/adminLeaveAction';
import { useSelector } from 'react-redux';
import Admin from '../Admin';
import { getDepartment } from '../../../actions/department/departmentAction';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainContainer: {
    width: '90%',
    height: '130vh',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
  },
  boxOne: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(14, 169, 0, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  boxFour: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(0, 118, 227, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },

  boxTwo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(237, 190, 23, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  boxThree: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '258px',
    background: 'rgba(255, 0, 0, 0.1)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
  },

  boxOneCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(14, 169, 0, 0.3)',
    border: '3px solid #0EA900',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  boxFourCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(0, 118, 227, 0.3)',
    border: '3px solid #0076E3',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  boxTwoCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(237, 190, 23, 0.1)',
    border: '3px solid #f9a825',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  boxThreeCircle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '120px',
    height: '120px',
    background: 'rgba(255, 0, 0, 0.1)',
    border: '3px solid red',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
}));

function AdminDashboard() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const adminleave = useSelector((state) => state.adminleave);
  const department = useSelector((state) => state.department);

  const getAllusers = () => {
    axios.get('http://localhost:5000/users/auth/alluser').then((user) => {
      setUsers(user.data);
    });
  };
  useEffect(() => {
    getAllusers();
  }, []);
  useEffect(() => {
    store.dispatch(getLeaveType());
    store.dispatch(getDepartment());
  }, []);

  return (
    <div className={classes.mainContainer}>
      <h1
        style={{
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '24px',
          lineHeight: '33px',
        }}
      >
        DASHBOARD
      </h1>
      <p
        style={{
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '33px',
        }}
      >
        Welcome to Leave Management System
      </p>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} xs={6}>
            <Link to="/employee">
              <Paper className={classes.boxOne}>
                <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                  Total Employee's
                </h1>
                <br />
                <div className={classes.boxOneCircle}>
                  <h1
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      fontSize: '26px',
                      fontWeight: 'bold',
                    }}
                  >
                    {users?.length}
                  </h1>
                </div>
              </Paper>
            </Link>
          </Grid>
          <Grid item lg={3} md={3} xs={6}>
            <Link to="/managedepartment">
              <Paper className={classes.boxFour}>
                <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                  Department
                </h1>
                <br />
                <div className={classes.boxFourCircle}>
                  <h1
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      fontSize: '26px',
                      fontWeight: 'bold',
                    }}
                  >
                    {department?.length}
                  </h1>
                </div>
              </Paper>
            </Link>
          </Grid>
          <Grid item lg={3} md={3} xs={6} button>
            <Link to="/updateleavetype">
              <Paper className={classes.boxTwo}>
                <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                  Leave Types
                </h1>
                <br />
                <div className={classes.boxTwoCircle}>
                  <h1
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      fontSize: '26px',
                      fontWeight: 'bold',
                    }}
                  >
                    {adminleave.length}
                  </h1>
                </div>
              </Paper>{' '}
            </Link>
          </Grid>
          <Grid item lg={3} md={3} xs={6}>
            <Paper className={classes.boxThree}>
              <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                Manages Leaves
              </h1>
              <br />
              <div className={classes.boxThreeCircle}>
                <h1
                  style={{
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    fontSize: '26px',
                    fontWeight: 'bold',
                  }}
                >
                  12
                </h1>
              </div>
            </Paper>{' '}
          </Grid>
        </Grid>
      </div>
      <br />

      <div
        style={{
          width: '100%%',
          borderRadius: '0px',
          background: '#F5F5F5',
          marginTop: '0.5%',
          boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Admin />
        <br />
      </div>
    </div>
  );
}

export default AdminDashboard;

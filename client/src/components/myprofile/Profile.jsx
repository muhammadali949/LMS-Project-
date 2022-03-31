import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import LaunchIcon from '@mui/icons-material/Launch';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { getLeaveType } from '../../actions/adminLeaveAction';
import store from '../../store';
import { loadUser } from '../../actions/authAction/auth';
import moment from 'moment';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '95vh',
    borderRadius: '0px',
    background: '#F5F5F5',
    marginTop: '0.5%',
    boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
  },
  paper: {
    background: '#F5F5F5',
  },
  bodyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '96%',
  },
});
const styles = (theme) => ({
  rootTable: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Casual', '05 Days', 2, 2),
  createData('Casual', '05 Days', 2, 2),
  createData('Casual', '05 Days', 2, 2),
];
function Profile() {
  const classes = useStyles();
  const [manageremail, setManageremail] = useState([]);
  const adminleave = useSelector((state) => state.adminleave);

  const auth = useSelector((state) => state.auth);
  let date = auth.user.datepicker;
  const newDate = new Date(date);
  let month = newDate.getMonth();
  console.log(adminleave);
  console.log(auth);
  useEffect(() => {
    store.dispatch(getLeaveType());
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/users/authid?id=${auth.user.manager}&type=single`
      )
      .then((res) => {
        setManageremail(res.data.email);
        console.log(res.data);
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
        height: '100vh',
        marginLeft: 'auto',
        marginTop: '2%',
        marginRight: 'auto',
        background: '#fff',
      }}
    >
      <h3 style={{ marginTop: '5px' }}>My Profile</h3>
      <div
        style={{
          minHeight: '85vh',
          width: '100%',
          borderRadius: '0px',
          background: '#F5F5F5',
          marginTop: '0.5%',
        }}
      >
        <Grid className={classes.bodyContainer}>
          <p style={{ fontWeight: 'bold' }}>Employee Detail</p>
          <LaunchIcon />
        </Grid>
        <br />
        <Grid className={classes.bodyContainer} xs={12}>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'flex-start',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Emp ID :</p>
            <p style={{ paddingLeft: '3.5rem' }}>{auth.user.employee}</p>
          </Grid>
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Emp Name :</p>
            <p style={{ paddingLeft: '1rem' }}>
              {auth.user.firstname} {auth.user.lastname}{' '}
            </p>
          </Grid>
          &nbsp;
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Gender :</p>
            <p style={{ paddingLeft: '2.9rem' }}>{auth.user.gender}</p>
          </Grid>
        </Grid>
        <Grid className={classes.bodyContainer} xs={12}>
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Emp Email ID :</p>
            <p style={{ paddingLeft: '0.5rem' }}>{auth.user.email}</p>
          </Grid>
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Phone No :</p>
            <p style={{ paddingLeft: '1.7rem' }}>{auth.user.phoneNo}</p>
          </Grid>
          &nbsp;
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Department :</p>
            <p style={{ paddingLeft: '0.5rem' }}>{auth.user.department}</p>
          </Grid>
        </Grid>
        <Grid className={classes.bodyContainer} xs={12}>
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Birthday :</p>
            <p style={{ paddingLeft: '2.8rem' }}>
              {moment(auth.user.datepicker).format('DD/MM/YYYY')}
            </p>
          </Grid>
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Manager :</p>
            <p style={{ paddingLeft: '1.9rem' }}>{manageremail}</p>
          </Grid>
          &nbsp;
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={4}
          >
            <p style={{ fontWeight: 'bold' }}>Position :</p>
            <p style={{ paddingLeft: '2.7rem' }}>{auth.user.position}</p>
          </Grid>
        </Grid>
        <Grid className={classes.bodyContainer} xs={12}>
          <Grid
            style={{
              display: 'flex',
              minWidth: '33%',
            }}
            xs={12}
          >
            <p style={{ fontWeight: 'bold' }}>Address :</p>
            <p style={{ paddingLeft: '2.9rem' }}>{auth.user.address}</p>
          </Grid>
        </Grid>
        <br />
        <Grid style={{ display: 'flex', justifyContent: 'center' }} xs={12}>
          <h2>Leave Details</h2>
        </Grid>
        <br />
        <Grid
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          xs={9}
        >
          <Paper
            className={classes.rootTable}
            style={{ background: '#F5F5F5' }}
          >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderBottom: '2px solid gray' }}>
                    Leave Type
                  </TableCell>
                  <TableCell style={{ borderBottom: '2px solid gray' }}>
                    Total Leave
                  </TableCell>
                  {/* <TableCell style={{ borderBottom: '2px solid gray' }}>
                    Used
                  </TableCell>
                  <TableCell style={{ borderBottom: '2px solid gray' }}>
                    Available
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {adminleave?.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell
                      style={{ borderBottom: 'none' }}
                      component="th"
                      scope="row"
                    >
                      {row?.leaveType}
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none' }}>
                      {((row?.numberLeave / 12) * (12 - month)).toFixed(1)}
                    </TableCell>
                    {/* <TableCell style={{ borderBottom: 'none' }}>
                      {row.fat}
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none' }}>
                      {row.carbs}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>{' '}
        </Grid>
      </div>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);

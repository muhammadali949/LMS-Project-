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
import TableContainer from '@material-ui/core/TableContainer';

import { useSelector } from 'react-redux';
import { getLeaveType } from '../../actions/adminLeaveAction';
import store from '../../store';
import { loadUser } from '../../actions/authAction/auth';
import moment from 'moment';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '95vh',
    borderRadius: '0px',
    background: '#F5F5F5',
    marginTop: '0.5%',
    boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: '100vh',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
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
}));

const styles = (theme) => ({
  rootTable: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    overflowY: 'auto',
  },
  table: {
    minWidth: 100,
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
  const [count, setCount] = useState(0);

  const adminleave = useSelector((state) => state.adminleave);

  const auth = useSelector((state) => state.auth);
  let date = auth.user.datepicker;
  const newDate = new Date(date);
  let month = newDate.getMonth();
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
  const getLeaveById = async () => {
    await axios
      .get(`http://localhost:5000/users/request/userleave/${auth.user._id}`)
      .then((res) => {
        res.data.map((data) => {
          if (data.status == 'Granted') {
            setCount((count) => count + 1);
          }
        });
      });
  };
  console.log(count);
  useEffect(() => {
    getLeaveById();
  }, []);

  return (
    <div className={classes.mainContainer}>
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
        <Grid container className={classes.bodyContainer}>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'flex-start',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Emp ID :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.employee} </Grid>
          </Grid>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Emp Name :{' '}
            </Grid>
            <Grid xs={8}>
              {`${auth.user.firstname} ${auth.user.lastname}`}{' '}
            </Grid>
          </Grid>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            sm={12}
            lg={4}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Gender :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.gender} </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.bodyContainer}>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Emp Email ID :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.email} </Grid>
          </Grid>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Phone No :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.phoneNo} </Grid>
          </Grid>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Department :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.department} </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.bodyContainer} container>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Birthday :{' '}
            </Grid>
            <Grid xs={8}>
              {moment(auth.user.datepicker).format('DD/MM/YYYY')}{' '}
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Manager :{' '}
            </Grid>
            <Grid xs={8}>{manageremail} </Grid>
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Position :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.position} </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.bodyContainer}>
          <Grid
            style={{
              display: 'flex',
            }}
            xs={12}
            lg={4}
            sm={12}
            md={6}
          >
            <Grid xs={4} style={{ fontWeight: 'bold' }}>
              Address :{' '}
            </Grid>
            <Grid xs={8}>{auth.user.address} </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid style={{ display: 'flex', justifyContent: 'center' }} xs={12}>
          <h2>Leave Details</h2>
        </Grid>
        <br />
        <Grid container className={classes.bodyContainer}>
          <Grid
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            xs={9}
            sm={9}
            lg={9}
            md={9}
          >
            {/* <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
            <TableContainer
              component={Paper}
              className={classes.rootTable}
              style={{ background: '#F5F5F5' }}
            >
              {/* <Paper
                className={classes.rootTable}
                style={{ background: '#F5F5F5' }}
              > */}
              <Table
                className={classes.table}
                style={{ maxWidth: '90vw', overflow: 'auto' }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ borderBottom: '2px solid gray' }}>
                      Leave Type
                    </TableCell>
                    <TableCell style={{ borderBottom: '2px solid gray' }}>
                      Total Leave
                    </TableCell>
                    <TableCell style={{ borderBottom: '2px solid gray' }}>
                      Used
                    </TableCell>
                    <TableCell style={{ borderBottom: '2px solid gray' }}>
                      Available
                    </TableCell>
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
                      <TableCell style={{ borderBottom: 'none' }}>
                        {count}
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none' }}>
                        {12}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);

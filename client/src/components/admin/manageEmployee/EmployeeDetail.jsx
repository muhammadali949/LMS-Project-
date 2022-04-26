import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector } from 'react-redux';
import { getLeaveType } from '../../../actions/adminLeaveAction';
import store from '../../../store';
import moment from 'moment';
import axios from 'axios';
import {
  LOAD_USER_URL,
  GET_MANAGER_URL,
  LEAVE_COUNT_URL,
} from '../../../apis/apiUrls';
import { leaveCount } from '../../../actions/leaveAction';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
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
    marginTop: '1%',
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
function EmployeeDetail() {
  const classes = useStyles();
  const [manageremail, setManageremail] = useState([]);
  const [user, setUser] = useState({ manager: '' });
  const [LeaveCount, setLeaveCount] = useState([]);

  const params = useParams();
  const adminleave = useSelector((state) => state.adminleave);
  const leave = useSelector((state) => state.leave);
  const dataArr = [];

  let date = user?.joinDate;
  const newDate = new Date(date);
  let month = newDate.getMonth();

  const getUser = () => {
    axios.get(`${LOAD_USER_URL}/${params.id}`).then((res) => {
      setUser(res?.data);
    });
  };
  useEffect(() => {
    store.dispatch(getLeaveType());
    getUser();
  }, []);
  useEffect(() => {
    axios
      .get(`${GET_MANAGER_URL}?id=${user?.manager}&type=single`)
      .then((res) => {
        setManageremail(res?.data?.email);
      });
  });
  useEffect(() => {
    axios.get(`${LEAVE_COUNT_URL}/${user._id}`).then((res) => {
      setLeaveCount(res?.data);
    });
  }, [user._id]);
  adminleave?.forEach(function (entry) {
    LeaveCount?.forEach(function (childrenEntry) {
      if (entry?.leaveType == childrenEntry?._id?.leaveCategory) {
        dataArr.push({ ...entry, count: childrenEntry.count });
      }
    });
  });
  const newArr = adminleave?.map((t1) => ({
    ...t1,
    ...dataArr?.find((t2) => t2._id === t1._id),
  }));
  console.log(leave);
  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }} className="title">
        EMPLOYEE DETAILS
      </h3>{' '}
      <div
        style={{
          minHeight: '85vh',
          width: '100%',
          borderRadius: '0px',
          background: '#F5F5F5',
          marginTop: '0.5%',
          boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
        }}
      >
        <br />
        <Grid container className={classes.bodyContainer}>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'flex-start',
            }}
            xs={12}
            lg={12}
            sm={12}
            md={12}
          >
            <Grid xs={12} style={{ fontWeight: 'bold' }}>
              <div>Empployee Details</div>
              <br />
            </Grid>
          </Grid>
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
            <Grid xs={8}>{user.employee} </Grid>
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
            <Grid xs={8}>{`${user.firstname} ${user.lastname}`} </Grid>
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
            <Grid xs={8}>{user.gender} </Grid>
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
            <Grid xs={8}>{user.email} </Grid>
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
            <Grid xs={8}>{user.phoneNo} </Grid>
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
            <Grid xs={8}>{user.department} </Grid>
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
            <Grid xs={8}>{moment(user.datepicker).format('DD/MM/YYYY')} </Grid>
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
            <Grid xs={8}>{user.position} </Grid>
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
            <Grid xs={8}>{user.address} </Grid>
          </Grid>
        </Grid>

        {user.role !== 'admin' ? (
          <>
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
                <TableContainer
                  className={classes.rootTable}
                  style={{ background: '#F5F5F5' }}
                >
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
                      {newArr?.map((row) => (
                        <TableRow key={row?.id}>
                          <TableCell
                            style={{ borderBottom: 'none' }}
                            component="th"
                            scope="row"
                          >
                            {row?.leaveType}
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none' }}>
                            {((row?.numberLeave / 12) * (12 - month)).toFixed(
                              1
                            )}
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none' }}>
                            {row?.count ? row?.count : 0}
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none' }}>
                            {(
                              ((row?.numberLeave / 12) * (12 - month)).toFixed(
                                1
                              ) - (row?.count ? row?.count : 0)
                            ).toFixed(1)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
              </Grid>
            </Grid>
          </>
        ) : null}
      </div>
    </div>
  );
}

EmployeeDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeDetail);

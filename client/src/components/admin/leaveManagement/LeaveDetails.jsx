import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useParams } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector } from 'react-redux';
import { getLeaveType } from '../../../actions/adminLeaveAction';
import store from '../../../store';
import axios from 'axios';
import { getLeave, leaveCount } from '../../../actions/leaveAction';
import Modal from './Modal';
import { LEAVE_COUNT_URL, LEAVE_URL } from '../../../apis/apiUrls';
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
  btn: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px',
    },
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

function LeaveDetail() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [update, setupdate] = useState(false);
  const [leaveCount, setLeaveCount] = useState([]);

  const dataArr = [];
  const adminleave = useSelector((state) => state.adminleave);
  const leave = useSelector((state) => state.leave);

  const { id } = useParams();

  let date = data?.joinDate;
  const newDate = new Date(date);
  let month = newDate.getMonth();
  useEffect(() => {
    store.dispatch(getLeaveType());
    store.dispatch(getLeave());
  }, [update]);

  const getLeaveById = async () => {
    await axios.get(`${LEAVE_URL}/${id}`).then((res) => {
      setData(res?.data);
    });
  };
  useEffect(() => {
    getLeaveById();
  }, [update]);
  useEffect(() => {
    axios.get(`${LEAVE_COUNT_URL}/${data?.userid}`).then((res) => {
      setLeaveCount(res?.data);
    });
  }, [data?.userid]);

  adminleave?.forEach(function (entry) {
    leaveCount?.forEach(function (childrenEntry) {
      if (entry?.leaveType == childrenEntry?._id?.leaveCategory) {
        dataArr.push({ ...entry, count: childrenEntry.count });
      }
    });
  });
  const newArr = adminleave?.map((t1) => ({
    ...t1,
    ...dataArr?.find((t2) => t2._id === t1._id),
  }));
  console.log('(*******)');
  console.log(newArr);
  console.log('(*******)');

  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }} className="title">
          LEAVE DETAILS
        </h3>
        <div
          style={{
            width: '100%',
            borderRadius: '0px',
            background: '#F5F5F5',
            marginTop: '0.5%',
            boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Grid className={classes.bodyContainer}>
            <p style={{ fontWeight: 'bold' }}>Leave Details</p>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Emp Name :{' '}
              </Grid>
              <Grid xs={6}>{data?.name} </Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Emp ID :{' '}
              </Grid>
              <Grid xs={6}>{data?.employee} </Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Gender :{' '}
              </Grid>
              <Grid xs={6}>{data?.gender} </Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Emp Email ID :{' '}
              </Grid>
              <Grid xs={6} style={{ overflowWrap: 'anywhere' }}>
                {data?.email}{' '}
              </Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Phone No :{' '}
              </Grid>
              <Grid xs={6}>{data?.phoneNo} </Grid>
            </Grid>
            <Grid
              style={{
                display: 'flex',
              }}
              xs={12}
              lg={4}
              sm={12}
              md={6}
            ></Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Leave Type :{' '}
              </Grid>
              <Grid xs={6}>{data?.leaveCategory} </Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Leave Date :{' '}
              </Grid>
              <Grid xs={6}>{data?.leaveDate}</Grid>
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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Posting date :{' '}
              </Grid>
              <Grid xs={6}> {data?.date}</Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.bodyContainer}>
            <Grid
              style={{
                display: 'flex',
              }}
              xs={12}
              lg={12}
              sm={12}
              md={6}
            >
              <Grid xs={12} lg={2} style={{ fontWeight: 'bold' }}>
                Emp Leave Description :{' '}
              </Grid>
              <Grid xs={12} lg={9} style={{ overflowWrap: 'anywhere' }}>
                {data?.leaveDescription}{' '}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.bodyContainer}>
            <Grid
              style={{
                display: 'flex',
              }}
              xs={12}
              lg={12}
              sm={12}
              md={6}
            >
              <Grid xs={12} lg={2} style={{ fontWeight: 'bold' }}>
                Leave Status :{' '}
              </Grid>
              <Grid
                xs={12}
                lg={2}
                style={{
                  color:
                    data?.status === 'Pending'
                      ? '#EDBE17'
                      : data?.status === 'Granted'
                      ? '#0EA900'
                      : 'red',
                }}
              >
                {data?.status}{' '}
              </Grid>
            </Grid>
          </Grid>
          {data?.adminActionDate !== '' ? (
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
                <Grid xs={6} style={{ fontWeight: 'bold' }}>
                  Admin Action Date :{' '}
                </Grid>
                <Grid xs={6}>{data?.adminActionDate} </Grid>
              </Grid>
            </Grid>
          ) : null}

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
              <Grid xs={6} style={{ fontWeight: 'bold' }}>
                Admin Remark :{' '}
              </Grid>
              <Grid xs={6}>{data?.adminRemark} </Grid>
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
              <Grid
                xs={6}
                style={{ fontWeight: 'bold' }}
                className={classes.btn}
              >
                <Modal id={id} setupdate={setupdate} update={update} />
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid style={{ display: 'flex', justifyContent: 'center' }} xs={12}>
            <h3 style={{ marginTop: '5px' }} className="title">
              Leave Details{' '}
            </h3>
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
                          {((row?.numberLeave / 12) * (12 - month)).toFixed(1)}
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
            </Grid>
          </Grid>
          <br />
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

LeaveDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaveDetail);

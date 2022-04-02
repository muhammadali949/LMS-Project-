import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: '90%',
  },
  delete: {
    color: '#ff0011',
    //   marginLeft:45
  },
  button1: {
    width: 20,
    height: 20,
    padding: 0,
  },
  button2: {
    width: 40,
    height: 20,
    padding: 0,
  },
  icon: {
    width: 64,
    height: 64,
  },
  MuiTableRowroot: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

function MyLeaveTable({ HandleDeleteLeaveType, id }) {
  const classes = useStyles();
  const [leaveMy, setleaveMy] = useState([]);

  const getLeaveById = async () => {
    await axios
      .get(`http://localhost:5000/users/request/userleave/${id}`)
      .then((res) => {
        setleaveMy(res.data);
        console.log(res.data);
      });
  };
  useEffect(() => {
    getLeaveById();
  }, []);

  const HandleDelete = (id) => {
    HandleDeleteLeaveType(id);
    getLeaveById();
  };
  return (
    <Grid
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      xs={11}
    >
      <Paper className={classes.rootTable} style={{ background: '#F5F5F5' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                LeaveDate{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                LeaveCategory{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                LeaveDescription{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Status
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveMy?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {moment(row.leaveDate).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>{row.leaveCategory}</TableCell>
                <TableCell>{row.leaveDescription}</TableCell>
                <TableCell>{row.status}</TableCell>

                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                    <IconButton
                      className={classes.button1}
                      component={Link}
                      to={`/updatemyleave/${row._id}`}
                    >
                      <LaunchIcon />
                    </IconButton>
                    <IconButton
                      className={classes.button2}
                      onClick={() => HandleDelete(row._id)}
                    >
                      <DeleteIcon className={classes.delete} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* {adminleave?.map((row) => (
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
                  {row.fat}
                </TableCell>
                <TableCell style={{ borderBottom: 'none' }}>
                  {row.carbs}
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </Paper>{' '}
    </Grid>
  );
}

export default MyLeaveTable;

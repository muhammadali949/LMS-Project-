import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

function EmployeeTable({ users, getAllusers, setDeleteCheck }) {
  const classes = useStyles();

  const HandleDeleteOne = (id) => {
    axios.delete(`http://localhost:5000/users/auth/${id}`).then((res) => {
      console.log(res.data);
    });
    getAllusers();
    setDeleteCheck((deleteCheck) => !deleteCheck);
  };
  return (
    <Grid
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      xs={11}
    >
      <TableContainer
        component={Paper}
        className={classes.rootTable}
        style={{ background: '#F5F5F5' }}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Emp .ID
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Full Name
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Position
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Reg Date
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.employee}
                </TableCell>
                <TableCell>{`${row.firstname} ${row.lastname} `}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>
                  {moment(row.datepicker).format('DD/MM/YYYY')}
                </TableCell>

                <TableCell>
                  <div style={{ display: 'flex' }}>
                    <IconButton
                      className={classes.button1}
                      style={{ paddingRight: '15px' }}
                      component={Link}
                      to={`/employee/${row._id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      className={classes.button1}
                      component={Link}
                      to={`/updateemployee/${row._id}`}
                    >
                      <LaunchIcon />
                    </IconButton>

                    <IconButton
                      className={classes.button2}
                      onClick={() => HandleDeleteOne(row._id)}
                    >
                      <DeleteIcon className={classes.delete} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default EmployeeTable;

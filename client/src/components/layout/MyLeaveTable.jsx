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
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';

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

function MyLeaveTable({
  HandleDeleteLeaveType,
  setcheckDelete,
  id,
  leaveMy,
  setQ,
  q,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, leaveMy?.length - page * rowsPerPage);
  return (
    <Grid
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      xs={11}
    >
      <br />
      <h3 style={{ marginTop: '5px', fontWeight: 'bold' }}>My Leave</h3>
      <br />
      <Grid
        spacing={1}
        container
        xs={12}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid item lg={5} xs={12} md={7} sm={12}>
          {' '}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            className="page"
            count={leaveMy?.length}
            style={{ width: '100%' }}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid item lg={3} xs={12} md={4} sm={12}>
          <input
            type="text"
            className="search-input"
            placeholder="Search Records"
            onChange={(e) => setQ(e.target.value)}
            style={{ width: '100%' }}
            value={q}
          />
        </Grid>
      </Grid>
      <br />
      <TableContainer
        className={classes.rootTable}
        style={{ background: '#F5F5F5' }}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                {' '}
                Leave Type
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Leave Date
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Description{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Posting Date
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Admin Remark
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Status
              </TableCell>
              {/* <TableCell style={{ borderBottom: '2px solid gray' }}>
                Action
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveMy
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row?._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ borderBottom: 'none' }}
                  >
                    {/* {moment(row.leaveDate).format('DD/MM/YYYY')} */}
                    {row.leaveCategory}
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    {row?.leaveDate}
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    {row?.leaveDescription}
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    {row?.date}
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    {row?.adminRemark}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        row.status === 'Pending'
                          ? '#EDBE17'
                          : row.status === 'Granted'
                          ? '#0EA900'
                          : 'red',
                      borderBottom: 'none',
                    }}
                  >
                    {row?.status}
                  </TableCell>

                  {/* <TableCell style={{ borderBottom: 'none' }}> */}
                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                    {/* <IconButton
                      className={classes.button1}
                      component={Link}
                      to={`/updatemyleave/${row?._id}`}
                    >
                      <LaunchIcon />
                    </IconButton> */}
                    {/* <IconButton
                      className={classes.button2}
                      onClick={() => {
                        HandleDeleteLeaveType(row?._id);
                        setcheckDelete((pre) => !pre);
                      }}
                    >
                      <DeleteIcon className={classes.delete} />
                    </IconButton> */}
                  </div>
                  {/* </TableCell> */}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default MyLeaveTable;

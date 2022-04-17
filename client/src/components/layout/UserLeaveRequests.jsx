import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

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

function UserLeaveRequests(props) {
  const classes = useStyles();

  const HandleDelete = (id) => {
    props.HandleDeleteLeave(id);
  };
  return (
    <Grid
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      xs={11}
    >
      <h1>Leatest Leave Application</h1>
      <br />
      <TableContainer
        component={Paper}
        className={classes.rootTable}
        style={{ background: '#F5F5F5' }}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Name{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Date{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Category{' '}
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Description
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                status
              </TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.leave?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell> {row.leaveDate}</TableCell>
                <TableCell>{row.leaveCategory}</TableCell>
                <TableCell>{row.leaveDescription}</TableCell>
                <TableCell>{row.status}</TableCell>

                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                    <IconButton
                      className={classes.button1}
                      component={Link}
                      to={`/updateStatus/${row._id}`}
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
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </Grid>
  );
}

export default UserLeaveRequests;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
  btn: {
    background: '#0076E3',
    color: '#fff',
    width: '63.51px',
    height: '30px',
    fontSize: '14px !important',
    '&:hover': {
      background: '#0076E3',
      color: '#fff',
    },
  },
});

function AllLeavetable({ leave }) {
  const classes = useStyles();
  const navigate = useNavigate();

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
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Emp's Name
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Leave Type
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Posting Date
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Status
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leave?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.leaveCategory}</TableCell>
                <TableCell>{moment(row.date).format('DD/MM/YYYY')}</TableCell>
                <TableCell
                  style={{
                    color:
                      row.status === 'Pending'
                        ? '#EDBE17'
                        : row.status === 'Granted'
                        ? '#0EA900'
                        : 'red',
                  }}
                >
                  {row.status}
                </TableCell>

                <TableCell>
                  <Button
                    className={classes.btn}
                    style={{ textTransform: 'none', fontSize: '8px' }}
                    onClick={() => navigate(`/leavedetails/${row._id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default AllLeavetable;

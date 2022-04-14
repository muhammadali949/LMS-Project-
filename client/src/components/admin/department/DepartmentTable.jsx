import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
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
});

function DepartmentTable({ department, HandleDeletedepartment }) {
  const classes = useStyles();

  const HandleDelete = (id) => {
    HandleDeletedepartment(id);
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
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Name
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Short Name
              </TableCell>
              <TableCell
                className={classes.MuiTableRowroot}
                style={{ borderBottom: '2px solid gray' }}
              >
                Code
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
            {department?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.shortName}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                    <IconButton
                      className={classes.button1}
                      component={Link}
                      to={`/updatedepartment/${row._id}`}
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
      </TableContainer>
    </Grid>
  );
}

export default DepartmentTable;

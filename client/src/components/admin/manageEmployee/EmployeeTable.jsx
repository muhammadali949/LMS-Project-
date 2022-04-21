import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { LOAD_USER_URL } from '../../../apis/apiUrls';

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

function EmployeeTable({ users, getAllusers, setDeleteCheck, setQ, q }) {
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
    rowsPerPage - Math.min(rowsPerPage, users?.length - page * rowsPerPage);

  const HandleDeleteOne = (id) => {
    axios.delete(`${LOAD_USER_URL}/${id}`).then((res) => {});
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
      <h3 style={{ marginTop: '5px', fontWeight: 'bold' }}>Employee's Info</h3>
      <br />
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
            count={users?.length}
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
            style={{ width: '100%' }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
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
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ borderBottom: 'none' }}
                  >
                    {row.employee}
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: 'none' }}
                  >{`${row.firstname} ${row.lastname} `}</TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    {row.position}
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }}>
                    {moment(row.datepicker).format('DD/MM/YYYY')}
                  </TableCell>

                  <TableCell style={{ borderBottom: 'none' }}>
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

export default EmployeeTable;

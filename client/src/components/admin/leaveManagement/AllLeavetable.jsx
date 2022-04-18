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
import TablePagination from '@material-ui/core/TablePagination';

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

function AllLeavetable({ leave, setQ, q }) {
  const classes = useStyles();
  const navigate = useNavigate();
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
    rowsPerPage - Math.min(rowsPerPage, leave?.length - page * rowsPerPage);
  return (
    <Grid
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      xs={11}
    >
      <Grid
        container
        xs={11}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid lg={6} xs={12}>
          {' '}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            className="page"
            count={leave?.length}
            style={{ width: '100%' }}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid lg={2} xs={12}>
          <input
            type="text"
            className="search-input"
            placeholder="Search Records"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
        </Grid>
      </Grid>
      <br />
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
            {leave
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
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

export default AllLeavetable;

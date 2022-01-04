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
import moment from 'moment';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    delete: {
        color: '#ff0011',
        //   marginLeft:45


    },
    button1: {
        width: 20, height: 20,
        padding: 0,
    },
    button2: {
        width: 40, height: 20,
        padding: 0,


    },
    icon: {
        width: 64, height: 64,
    },
    MuiTableRowroot: {
        fontWeight: 'bold',
        fontSize: 17
    }
});

function UserLeaveRequests(props) {

    const classes = useStyles();

    const HandleDelete = (id)=>{
        props.HandleDeleteLeave(id)
    }
    return (
        <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.MuiTableRowroot}>Name</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>leaveDate</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>leaveCategory</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>leaveDescription</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>status</TableCell>


                            <TableCell className={classes.MuiTableRowroot}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {props.leave.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{moment(row.leaveDate).format('DD/MM/YYYY')}</TableCell>
                                <TableCell>{row.leaveCategory}</TableCell>
                                <TableCell>{row.leaveDescription}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>

                                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                                        <IconButton className={classes.button1} component={Link} to={`/updateStatus/${row._id}`}><LaunchIcon /></IconButton>
                                        <IconButton className={classes.button2} onClick={()=>HandleDelete(row._id)}><DeleteIcon className={classes.delete} /></IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UserLeaveRequests;




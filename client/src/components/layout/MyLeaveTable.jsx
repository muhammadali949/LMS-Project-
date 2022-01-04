import React,{useState,useEffect} from 'react';
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
import axios from 'axios'

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

function MyLeaveTable({HandleDeleteLeaveType,id}) {

    const classes = useStyles();
    const [leaveMy, setleaveMy] = useState([])

    const getLeaveById = async ()=>{
        await axios.get(`http://localhost:5000/users/request/userleave/${id}`).then(res=>{
            setleaveMy(res.data)
        })
    }
    useEffect(() => {
        getLeaveById()
    }, [leaveMy])
    
    const HandleDelete = (id)=>{
        HandleDeleteLeaveType(id)
        getLeaveById()
    }
    return (
        <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.MuiTableRowroot}>LeaveDate</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>LeaveCategory</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>LeaveDescription</TableCell>
                            <TableCell className={classes.MuiTableRowroot}>Status</TableCell>


                            <TableCell className={classes.MuiTableRowroot}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {leaveMy?.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.leaveDate}
                                </TableCell>
                                <TableCell>{row.leaveCategory}</TableCell>
                                <TableCell>{row.leaveDescription}</TableCell>
                                <TableCell>{row.status}</TableCell>



                                <TableCell>

                                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                                        <IconButton className={classes.button1} component={Link} to={`/updatemyleave/${row._id}`}><LaunchIcon /></IconButton>
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

export default MyLeaveTable;





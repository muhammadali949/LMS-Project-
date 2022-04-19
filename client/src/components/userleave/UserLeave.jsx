import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import MyLeaveTable from '../layout/MyLeaveTable';
import { deleteLeave } from '../../actions/leaveAction';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
  },
}));

function UserLeave() {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const [leaveMy, setleaveMy] = useState([]);

  const getLeaveById = async () => {
    await axios
      .get(`http://localhost:5000/users/request/userleave/${id}`)
      .then((res) => {
        setleaveMy(res.data);
      });
  };
  useEffect(() => {
    getLeaveById();
  }, []);

  const id = auth?.user?._id;
  const dispatch = useDispatch();
  const HandleDeleteLeaveType = (id) => {
    dispatch(deleteLeave(id));
  };

  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }}>My Leave</h3>
      <div
        style={{
          minHeight: '59vh',
          width: '100%',
          borderRadius: '0px',
          background: '#F5F5F5',
          marginTop: '0.5%',
          boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
        }}
      >
        {' '}
        <br />
        <br />
        <br />
        <MyLeaveTable
          HandleDeleteLeaveType={HandleDeleteLeaveType}
          id={id}
          leaveMy={leaveMy}
          setleaveMy={setleaveMy}
          getLeaveById={getLeaveById}
        />
      </div>
    </div>
  );
}

export default UserLeave;

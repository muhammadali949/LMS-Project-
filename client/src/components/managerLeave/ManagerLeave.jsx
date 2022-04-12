import React, { useState, useEffect } from 'react';
import UserLeaveRequests from '../layout/UserLeaveRequests';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

function ManagerLeave() {
  const auth = useSelector((state) => state.auth);
  const [leave, setLeave] = useState([]);
  const classes = useStyles();
  const id = auth?.user?._id;
  const getManagerLeave = () => {
    axios
      .get(`http://localhost:5000/users/request/manageleave/${id}`)
      .then((user) => {
        setLeave(user.data);
      });
  };
  useEffect(() => {
    getManagerLeave();
  });
  const HandleDeleteLeave = () => {};
  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }}>Manager Leave</h3>
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
        <UserLeaveRequests
          leave={leave}
          HandleDeleteLeave={HandleDeleteLeave}
        />
      </div>
    </div>
  );
}

export default ManagerLeave;

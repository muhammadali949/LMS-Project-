import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';

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

function ManageEmployee() {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const getAllusers = () => {
    axios.get('http://localhost:5000/users/auth/alluser').then((user) => {
      setUsers(user.data);
    });
  };
  useEffect(() => {
    getAllusers();
  }, [deleteCheck]);

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
        <EmployeeTable
          users={users}
          getAllusers={getAllusers}
          setDeleteCheck={setDeleteCheck}
          deleteCheck={deleteCheck}
        />
      </div>
    </div>
  );
}

export default ManageEmployee;

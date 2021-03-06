import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';
import { LOAD_ALL_USER_URL } from '../../../apis/apiUrls';
import moment from 'moment';

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
  const [q, setQ] = useState('');

  function search(rows) {
    const columns = [
      'employee',
      'firstname',
      'lastname',
      'position',
      'joinDate',
    ];
    return rows?.filter((row) =>
      columns.some(
        (column) =>
          row[column]?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }
  const getAllusers = () => {
    axios.get(LOAD_ALL_USER_URL).then((user) => {
      setUsers(user.data);
    });
  };
  useEffect(() => {
    getAllusers();
  }, [deleteCheck]);
  const newUsers = users.map((user) => ({
    ...user,
    joinDate: moment(user.joinDate).format('DD/MM/YYYY'),
  }));

  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }} className="title">
        MANAGE EMPLOYEE
      </h3>{' '}
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
        <EmployeeTable
          users={search(newUsers)}
          getAllusers={getAllusers}
          setDeleteCheck={setDeleteCheck}
          deleteCheck={deleteCheck}
          setQ={setQ}
          q={q}
        />
      </div>
    </div>
  );
}

export default ManageEmployee;

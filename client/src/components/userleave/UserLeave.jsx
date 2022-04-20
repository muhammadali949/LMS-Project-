import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import MyLeaveTable from '../layout/MyLeaveTable';
import { deleteLeave } from '../../actions/leaveAction';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { UPDATE_USER_URL } from '../../apis/apiUrls';

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
  const [q, setQ] = useState('');
  const [checkDelete, setcheckDelete] = useState(false);
  const id = auth?.user?._id;
  const dispatch = useDispatch();

  function search(rows) {
    const columns = [
      'leaveCategory',
      'leaveDate',
      'leaveDescription',
      'date',
      'adminRemark',
      'status',
    ];
    return rows?.filter((row) =>
      columns.some(
        (column) =>
          row[column]?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const HandleDeleteLeaveType = (id) => {
    dispatch(deleteLeave(id));
  };
  const getLeaveById = async () => {
    await axios
      .get(`${UPDATE_USER_URL}/request/userleave/${id}`)
      .then((res) => {
        setleaveMy(res.data);
      });
  };
  useEffect(() => {
    getLeaveById();
  }, [dispatch]);
  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }} className="title">
        MY LEAVE
      </h3>
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
        <MyLeaveTable
          HandleDeleteLeaveType={HandleDeleteLeaveType}
          id={id}
          leaveMy={search(leaveMy)}
          setleaveMy={setleaveMy}
          getLeaveById={getLeaveById}
          setQ={setQ}
          q={q}
          setcheckDelete={setcheckDelete}
        />
        <br />
      </div>
    </div>
  );
}

export default UserLeave;

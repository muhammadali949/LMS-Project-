import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AllLeavetable from './AllLeavetable';
import { getLeaveRejected } from '../../../actions/leaveAction';
import { useDispatch, useSelector } from 'react-redux';

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

function RejectedLeave() {
  const [q, setQ] = useState('');

  const classes = useStyles();
  const leave = useSelector((state) => state.leave);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaveRejected());
  }, []);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows?.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }} className="title">
        REJECTED HISTORY
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
        <AllLeavetable leave={search(leave)} setQ={setQ} q={q} />
        <br />
      </div>
    </div>
  );
}

export default RejectedLeave;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import store from '../../../store';

import AllLeavetable from './AllLeavetable';
import { getLeave } from '../../../actions/leaveAction';

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

function AllLeave() {
  const leave = useSelector((state) => state.leave);
  const dispatch = useDispatch();
  const classes = useStyles();

  console.log(leave);
  useEffect(() => {
    dispatch(getLeave());
  }, []);
  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }}>All Leaves</h3>
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
        <br />
        <br />
        <br />
        <AllLeavetable leave={leave} />
        <br />
        <br />
      </div>
    </div>
  );
}

export default AllLeave;

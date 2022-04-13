import React, { useEffect } from 'react';
import LeaveTypeTable from '../layout/LeaveTypeTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLeaveType, getLeaveType } from '../../actions/adminLeaveAction';
import { makeStyles } from '@material-ui/core/styles';
import store from '../../store';

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

function UpdateLeaveType() {
  const adminleave = useSelector((state) => state.adminleave);
  const dispatch = useDispatch();
  const classes = useStyles();
  const HandleDeleteLeaveType = (id) => {
    dispatch(deleteLeaveType(id));
  };
  useEffect(() => {
    store.dispatch(getLeaveType());
  }, []);
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
        <br />
        <br />
        <br />{' '}
        <LeaveTypeTable
          adminleave={adminleave}
          HandleDeleteLeaveType={HandleDeleteLeaveType}
        />
      </div>
    </div>
  );
}

export default UpdateLeaveType;

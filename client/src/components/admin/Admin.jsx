import React, { useEffect } from 'react';
import { deleteLeave, getLeave } from '../../actions/leaveAction';
import { useDispatch, useSelector } from 'react-redux';
import UserLeaveRequests from '../layout/UserLeaveRequests';

function Admin() {
  const dispatch = useDispatch();
  const leave = useSelector((state) => state.leave);
  console.log(leave);

  useEffect(() => {
    dispatch(getLeave());
  }, [dispatch]);
  const HandleDeleteLeave = (id) => {
    dispatch(deleteLeave(id));
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}
    >
      <UserLeaveRequests leave={leave} HandleDeleteLeave={HandleDeleteLeave} />
    </div>
  );
}

export default Admin;

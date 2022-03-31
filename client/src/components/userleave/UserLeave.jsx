import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import MyLeaveTable from '../layout/MyLeaveTable';
import { deleteLeave } from '../../actions/leaveAction';

function UserLeave() {
  const auth = useSelector((state) => state.auth);

  const id = auth.user._id;
  const dispatch = useDispatch();
  const HandleDeleteLeaveType = (id) => {
    dispatch(deleteLeave(id));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
        height: '50vh',
        marginLeft: 'auto',
        marginTop: '2%',
        marginRight: 'auto',
        background: '#fff',
      }}
    >
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
        <MyLeaveTable HandleDeleteLeaveType={HandleDeleteLeaveType} id={id} />
      </div>
    </div>
  );
}

export default UserLeave;
import React, { useState, useEffect } from 'react';
import UserLeaveRequests from '../layout/UserLeaveRequests';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function ManagerLeave() {
  const auth = useSelector((state) => state.auth);
  const [leave, setLeave] = useState([]);
  const id = auth.user._id;
  const getManagerLeave = () => {
    axios
      .get(`http://localhost:5000/users/request/manageleave/${id}`)
      .then((user) => {
        setLeave(user.data);
      });
  };
  useEffect(() => {
    getManagerLeave();
  }, []);
  const HandleDeleteLeave = () => {};
  return (
    <div style={{ marginTop: '100px' }}>
      {leave && leave.length !== 0 ? (
        <UserLeaveRequests
          leave={leave}
          HandleDeleteLeave={HandleDeleteLeave}
        />
      ) : (
        <h1>Leave Not yet</h1>
      )}
    </div>
  );
}

export default ManagerLeave;

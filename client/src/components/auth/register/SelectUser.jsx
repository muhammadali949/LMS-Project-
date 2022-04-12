import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function SelectUser({ manager, setManager }) {
  const [users, setUsers] = useState([]);
  const getAllusers = () => {
    axios.get('http://localhost:5000/users/auth/alluser').then((user) => {
      setUsers(user.data);
    });
  };
  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <>
      <label htmlFor="">Manager</label>
      <select
        name="select"
        className="inputstyle"
        value={manager}
        onChange={(event) => setManager(event.target.value)}
      >
        <option value="" disabled hidden>
          Select
        </option>
        {users.map(function (user) {
          return (
            <option key={user._id} value={user._id} selected={manager}>
              {user.email}
            </option>
          );
        })}
      </select>
    </>
  );
}

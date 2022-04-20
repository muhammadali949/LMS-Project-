import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { LOAD_ALL_USER_URL } from '../../../apis/apiUrls';

export default function SelectUser({ manager, setManager }) {
  const [users, setUsers] = useState([]);
  const getAllusers = () => {
    axios.get(LOAD_ALL_USER_URL).then((user) => {
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

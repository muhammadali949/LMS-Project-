import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'

export default function SelectUser({manager,setManager}) {
  const [users, setUsers] = useState([])
  const getAllusers = ()=>{
      axios.get('http://localhost:5000/users/auth/alluser').then(user=>{
          setUsers(user.data)
      })
  }
  useEffect(() => {
      getAllusers()
  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">manager</InputLabel>
        <Select
         style={{width:'500px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={manager}
          label="Update"
          onChange={(e)=>setManager(e.target.value)}
        >
          {
              users?.map(user=>{
                return <MenuItem key={user._id} value={user._id}>{user.email}</MenuItem>
              })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
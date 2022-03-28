import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectData({ Istatus, setIStatus }) {
  const handleChange = (event) => {
    setIStatus({ ...Istatus, status: event.target.value });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">status</InputLabel>
        <Select
          style={{ width: '500px' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Istatus.status}
          label="Update"
          onChange={handleChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Granted">Granted</MenuItem>
          <MenuItem value={'Rejected'}>Rejected</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

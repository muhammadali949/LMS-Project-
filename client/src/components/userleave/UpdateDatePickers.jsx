import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

 function UpdateDatePickers({formData,setFormData}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2}>
        <DatePicker
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={formData.leaveDate}
          onChange={(newValue) => {
            setFormData({...formData,leaveDate:newValue});
          }}
          renderInput={(params) => <TextField {...params} style={{width:'505px'}} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
export default React.memo(UpdateDatePickers);

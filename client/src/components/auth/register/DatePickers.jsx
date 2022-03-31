import * as React from 'react';
// import TextField from '@mui/material/TextField';
import TextField from '@material-ui/core/TextField';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

const useStyles = makeStyles({
  inputstyle: {
    background: '#ffffff',
    borderRadius: '10px 10px 0px 0px !important',
    width: '100%',
    height: '50px',
    padding: '14px',
    borderBottom: '2px solid #000 !important',
    border: 'none !important',
    outline: 'none ',
  },
});

function DatePickers({ datepicker, setDatePicker }) {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2}>
        <MobileDatePicker
          value={datepicker}
          onChange={(newValue) => {
            setDatePicker(newValue);
          }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              className={classes.inputstyle}
              style={{ padding: '17px' }}
              {...params}
            />
          )}
        />
        {/* <DatePicker
          openTo="year"
          views={['day']}
          value={datepicker}
          onChange={(newValue) => {
            setDatePicker(newValue);
          }}
          renderInput={(params) => (
            <TextField className={classes.inputstyle} {...params} />
          )}
        /> */}
      </Stack>
    </LocalizationProvider>
  );
}
export default React.memo(DatePickers);

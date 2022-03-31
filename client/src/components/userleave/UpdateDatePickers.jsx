import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { makeStyles } from '@material-ui/core';

import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
  inputstyle: {
    background: '#ffffff',
    borderRadius: '10px 10px 0px 0px !important',
    width: '100%',
    height: '50px',
    padding: '14px',
    borderBottom: '2px solid #000 !important',
    border: 'none !important',
    outline: 'none !important',
  },
});
function UpdateDatePickers({ formData, setFormData }) {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2}>
        <MobileDatePicker
          value={formData.leaveDate}
          onChange={(newValue) => {
            setFormData({ ...formData, leaveDate: newValue });
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
      </Stack>
    </LocalizationProvider>
  );
}
export default React.memo(UpdateDatePickers);

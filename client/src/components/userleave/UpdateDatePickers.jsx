import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { makeStyles } from '@material-ui/core';

import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
  inputstyle: {
    background: '#ffffff',
    borderRadius: '10px 10px 0px 0px !important',
    height: '50px',
    padding: '14px',
    borderBottom: '2px solid #000 !important',
    border: 'none !important',
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
              style={{ width: '100%' }}
              className={classes.inputstyle}
              {...params}
              InputProps={{ disableUnderline: true }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
export default React.memo(UpdateDatePickers);

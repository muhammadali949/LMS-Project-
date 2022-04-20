import React, { useState, useEffect } from 'react';
import Alert from '../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveType, updateLeaveType } from '../../actions/adminLeaveAction';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateDatePickers from './UpdateDatePickers';
import { updateLeave } from '../../actions/leaveAction';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import store from '../../store';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';
import { UPDATE_USER_URL } from '../../apis/apiUrls';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
  },
  btn: {
    background: '#0EA900',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
  inputstyle: {
    background: '#ffffff',
    borderRadius: '10px 10px 0px 0px !important',
    height: '50px',
    padding: '14px',
    borderBottom: '2px solid #000 !important',
    border: 'none !important',
  },
}));
const UpdateMyLeave = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const adminleave = useSelector((state) => state.adminleave);

  const [formData, setFormData] = useState({
    leaveDate: new Date(),
    leaveCategory: '',
    leaveDescription: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { leaveCategory, leaveDescription, leaveDate, _id } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const d = moment(formData).format('DD/MM/YYYY');
    await setFormData({
      ...formData,
      _id: id,
      leaveDate: d,
    });
    // dispatch(updateLeave(formData, id));
    // navigate('/userleave');
  };
  const getLeaveById = async (id) => {
    await axios.get(`${UPDATE_USER_URL}/request/${id}`).then((res) => {
      setFormData(res.data);
    });
  };
  useEffect(() => {
    getLeaveById(id);
    store.dispatch(getLeaveType());
    return () => {};
  }, []);

  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }} className="title">
          UPDATE LEAVE
        </h3>
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
          <Grid
            style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <br />
            <form noValidate autoComplete="off">
              <div>
                <label htmlFor="">Leave Type</label>
                <select
                  name="leaveCategory"
                  className="inputstyle"
                  value={leaveCategory}
                  onChange={(e) => onChange(e)}
                >
                  <option value="" disabled hidden>
                    Select Leave Type
                  </option>{' '}
                  {adminleave?.map(function (n) {
                    return (
                      <option
                        key={n._id}
                        value={n.leaveType}
                        selected={leaveCategory}
                        placeholder="Enter a Description"
                      >
                        {n.leaveType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <br />
              <div>
                <label htmlFor="">Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={2}>
                    <MobileDatePicker
                      name="leaveDate"
                      minDate={new Date()}
                      value={leaveDate}
                      onChange={(newValue) => {
                        setFormData({
                          ...formData,
                          leaveDate: newValue,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          className={classes.inputstyle}
                          style={{ width: '100%' }}
                          {...params}
                          InputProps={{ disableUnderline: true }}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>{' '}
              </div>
              <br />
              <div>
                <label htmlFor="">Description</label>
                <input
                  id="standard-basic"
                  className="inputstyle"
                  placeholder="Enter a Description"
                  name="leaveDescription"
                  value={leaveDescription}
                  onChange={(e) => onChange(e)}
                  label="Standard"
                  fullWidth
                />
              </div>
              <br />
              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                onClick={onSubmit}
              >
                Update
              </Button>
            </form>
          </Grid>
        </div>
      </div>
    </>
  );
};
export default UpdateMyLeave;

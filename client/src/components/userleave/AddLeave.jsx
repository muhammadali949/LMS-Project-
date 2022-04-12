import React, { useEffect } from 'react';
import Alert from '../layout/Alert';
import { addLeave, clearState } from '../../actions/leaveAction';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import store from '../../store';
import { getLeaveType } from '../../actions/adminLeaveAction';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const AddLeave = ({ alerts }) => {
  const adminleave = useSelector((state) => state.adminleave);
  const auth = useSelector((state) => state.auth);
  const leave = useSelector((state) => state.leave);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  console.log('this is the user leave');
  console.log(leave);
  const formik = useFormik({
    initialValues: {
      leaveDate: new Date(),
      leaveCategory: '',
      leaveDescription: '',
    },
    validationSchema: Yup.object({
      leaveCategory: Yup.string().required('Leave Category is required'),
      leaveDescription: Yup.string().required('Leave Description is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (alert?.length === 0) {
        let leaveDate = moment(values.leaveDate).format('DD/MM/YYYY');
        let leaveCategory = values.leaveCategory;
        let leaveDescription = values.leaveDescription;
        dispatch(
          addLeave({
            leaveDate,
            leaveCategory,
            leaveDescription,
            userid: auth.user._id,
            name: `${auth.user.firstname} ${auth.user.lastname}`,
            manager: auth.user.manager,
          })
        );
      }
    },
  });
  if (leave[0]?.msg !== 'your leave request has been send') {
    store.dispatch(clearState());
    navigate('/userleave');
  }
  useEffect(() => {
    store.dispatch(getLeaveType());
  }, []);

  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }}>Apply For Leave</h3>
      <div
        style={{
          minHeight: '100%',
          width: '100%',
          borderRadius: '0px',
          background: '#F5F5F5',
          marginTop: '0.5%',
          boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Grid style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          <br />
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <label htmlFor="">Leave Type</label>
            <select
              placeholder="Enter a Description"
              name="leaveCategory"
              className={
                formik.touched.leaveCategory && formik.errors.leaveCategory
                  ? 'inputstyleTwo'
                  : 'inputstyle'
              }
              onChange={formik.handleChange}
              value={formik.values.leaveCategory}
            >
              <option value="" disabled hidden>
                Select Leave Type
              </option>{' '}
              {adminleave.map(function (n) {
                return (
                  <option
                    key={n._id}
                    value={n.leaveType}
                    selected={formik.values.leaveCategory}
                    placeholder="Enter a Description"
                  >
                    {n.leaveType}
                  </option>
                );
              })}
            </select>
            {formik.touched.leaveCategory && formik.errors.leaveCategory ? (
              <div style={{ color: 'red' }}>{formik.errors.leaveCategory}</div>
            ) : null}
            <br />
            <br />
            <label htmlFor="">Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                name="leaveDate"
                minDate={new Date()}
                onChange={(val) => {
                  //val is the variable which contain the selected date
                  //You can set it anywhere
                  formik.setFieldValue('leaveDate', val);
                }}
                value={formik.values.leaveDate}
                renderInput={(params) => (
                  <TextField
                    className={classes.inputstyle}
                    style={{ width: '100%' }}
                    {...params}
                    InputProps={{ disableUnderline: true }}
                  />
                )}
              />
            </LocalizationProvider>
            <br />
            <br />
            <label htmlFor="">Description</label>
            <input
              id="standard-basic"
              placeholder="Enter a Description"
              label="Standard"
              name="leaveDescription"
              className={
                formik.touched.leaveDescription &&
                formik.errors.leaveDescription
                  ? 'inputstyleTwo'
                  : 'inputstyle'
              }
              onChange={formik.handleChange}
              value={formik.values.leaveDescription}
              fullWidth
            />
            {formik.touched.leaveDescription &&
            formik.errors.leaveDescription ? (
              <div style={{ color: 'red' }}>
                {formik.errors.leaveDescription}
              </div>
            ) : null}
            <br />
            <br />
            <Alert />
            <Button
              variant="contained"
              className={classes.btn}
              color="secondary"
              type="submit"
            >
              Apply
            </Button>
          </form>
        </Grid>
      </div>
    </div>
  );
};

AddLeave.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AddLeave);

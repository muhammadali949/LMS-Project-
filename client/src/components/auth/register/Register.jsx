import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../actions/./authAction/auth';
import PropTypes from 'prop-types';
import Alert from '../../layout/Alert';
import { setAlert, remove } from '../../../actions/alert';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import store from '../../../store';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
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
  btn: {
    background: '#0EA900',
    '&:hover': {
      backgroundColor: '#0EA900',
    },
  },
}));

const Register = ({ setAlert, register }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const alert = useSelector((state) => state.alert);
  const navigate = useNavigate();

  const getAllusers = () => {
    axios.get('http://localhost:5000/users/auth/alluser').then((user) => {
      setUsers(user.data);
    });
  };
  useEffect(() => {
    getAllusers();
  }, []);
  const formik = useFormik({
    initialValues: {
      datepicker: new Date(),
      joinDate: new Date(),
      employee: '',
      gender: '',
      firstname: '',
      lastname: '',
      department: '',
      position: '',
      address: '',
      phoneNo: '',
      email: '',
      password: '',
      confirmPassword: '',
      manager: '',
    },
    validationSchema: Yup.object({
      employee: Yup.string().required('Emp Id is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      gender: Yup.string().required('Gender is required'),
      datepicker: Yup.string().required('Birthday is required'),
      firstname: Yup.string().required('Firstname  is required'),
      lastname: Yup.string().required('Lastname is required'),
      department: Yup.string().required('Department is required'),
      position: Yup.string().required('Position is required'),
      joinDate: Yup.string().required('Join Date is required'),
      manager: Yup.string().required('Manager is required'),
      address: Yup.string().required('Address is required'),
      phoneNo: Yup.string().required('Phone No is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .required('ConfirmPassword is required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
    }),
    onSubmit: (values) => {
      let datepicker = values.datepicker;
      let department = values.department;
      let employee = values.employee;
      let gender = values.gender;
      let firstname = values.firstname;
      let lastname = values.lastname;
      let position = values.position;
      let address = values.address;
      let phoneNo = values.phoneNo;
      let manager = values.manager;
      let email = values.email;
      let password = values.password;
      let joinDate = values.joinDate;
      register({
        datepicker,
        joinDate,
        employee,
        gender,
        firstname,
        lastname,
        department,
        position,
        address,
        phoneNo,
        email,
        password,
        manager,
      });
    },
  });
  if (alert[0]?.msg == 'Employee created successfully') {
    store.dispatch(remove(alert[0]?.msg, alert[0]?.alertType, alert[0]?.id));
    navigate('/employee');
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <div className={classes.mainContainer}>
          <h3 style={{ marginTop: '5px' }} className="title">
            ADD EMPLOYEE
          </h3>{' '}
          <div
            style={{
              width: '100%',
              borderRadius: '0px',
              background: '#F5F5F5',
              marginTop: '0.5%',
              boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
              padding: '15px',
            }}
          >
            <Grid
              container
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              xs={12}
              spacing={3}
            >
              <Grid item xs={12}>
                <h2 style={{ paddingTop: '10px' }}>Employee Info</h2>
              </Grid>
              <Grid item lg={6} xs={12} md={6}>
                <label htmlFor="">Employee Code</label>
                <input
                  id="standard-basic"
                  placeholder="Enter Emp Code"
                  label="Standard"
                  name="employee"
                  className={
                    formik.touched.employee && formik.errors.employee
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.employee}
                  fullWidth
                />
                {formik.touched.employee && formik.errors.employee ? (
                  <div style={{ color: 'red' }}>{formik.errors.employee}</div>
                ) : null}
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Gender</label>
                <select
                  name="gender"
                  placeholder="Enter a Description"
                  className={
                    formik.touched.gender && formik.errors.gender
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div style={{ color: 'red' }}>{formik.errors.gender}</div>
                ) : null}
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Birthdate</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    name="datepicker"
                    onChange={(val) => {
                      formik.setFieldValue('datepicker', val);
                    }}
                    value={formik.values.datepicker}
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
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">First Name</label>
                <input
                  id="standard-basic"
                  placeholder="First Name"
                  name="firstname"
                  label="Standard"
                  fullWidth
                  className={
                    formik.touched.firstname && formik.errors.firstname
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div style={{ color: 'red' }}>{formik.errors.firstname}</div>
                ) : null}
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Last Name</label>
                <input
                  id="standard-basic"
                  placeholder="Last Name"
                  name="lastname"
                  label="Standard"
                  className={
                    formik.touched.lastname && formik.errors.lastname
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  fullWidth
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div style={{ color: 'red' }}>{formik.errors.lastname}</div>
                ) : null}
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Department</label>
                <select
                  name="department"
                  className={
                    formik.touched.department && formik.errors.department
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.department}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                </select>
                {formik.touched.department && formik.errors.department ? (
                  <div style={{ color: 'red' }}>{formik.errors.department}</div>
                ) : null}
              </Grid>{' '}
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Position</label>
                <input
                  id="standard-basic"
                  placeholder="Add Position"
                  label="Standard"
                  name="position"
                  className={
                    formik.touched.position && formik.errors.position
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.position}
                  fullWidth
                />
                {formik.touched.position && formik.errors.position ? (
                  <div style={{ color: 'red' }}>{formik.errors.position}</div>
                ) : null}
              </Grid>
              <Grid item lg={6} xs={12} md={6}>
                <label htmlFor="">Email</label>
                <input
                  id="standard-basic"
                  placeholder="Enter Email"
                  label="Standard"
                  name="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  fullWidth
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                ) : null}
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Manager</label>
                <select
                  name="manager"
                  className={
                    formik.touched.manager && formik.errors.manager
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.manager}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {users.map(function (user) {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.email}
                      </option>
                    );
                  })}
                </select>
                {formik.touched.manager && formik.errors.manager ? (
                  <div style={{ color: 'red' }}>{formik.errors.manager}</div>
                ) : null}
              </Grid>
              <Grid item lg={3} xs={12} md={3}>
                <label htmlFor="">Join Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    name="joinDate"
                    onChange={(val) => {
                      formik.setFieldValue('joinDate', val);
                    }}
                    value={formik.values.joinDate}
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
              </Grid>
              <Grid item lg={6} xs={12}>
                <label htmlFor="">Address</label>
                <input
                  id="standard-basic"
                  placeholder="Enter Address"
                  label="Standard"
                  name="address"
                  fullWidth
                  className={
                    formik.touched.address && formik.errors.address
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div style={{ color: 'red' }}>{formik.errors.address}</div>
                ) : null}
              </Grid>
              <Grid item lg={6} xs={12} md={6}>
                <label htmlFor="">Phone No</label>
                <input
                  id="standard-basic"
                  placeholder="Enter Phone No"
                  label="Standard"
                  name="phoneNo"
                  fullWidth
                  className={
                    formik.touched.phoneNo && formik.errors.phoneNo
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.phoneNo}
                />
                {formik.touched.phoneNo && formik.errors.phoneNo ? (
                  <div style={{ color: 'red' }}>{formik.errors.phoneNo}</div>
                ) : null}
              </Grid>
              <Grid item lg={6} xs={12} md={6}>
                <label htmlFor="">Password</label>
                <input
                  id="standard-basic"
                  placeholder="Enter Password"
                  label="Standard"
                  type="password"
                  name="password"
                  fullWidth
                  className={
                    formik.touched.password && formik.errors.password
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                ) : null}
              </Grid>
              <Grid item lg={6} xs={12} md={6}>
                <label htmlFor="">Confirm Password</label>
                <input
                  id="standard-basic"
                  placeholder="Confirm Password"
                  label="Standard"
                  type="password"
                  name="confirmPassword"
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  fullWidth
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div style={{ color: 'red' }}>
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </Grid>
              <Grid item lg={6} md={12}>
                <Alert />
                <Button
                  variant="contained"
                  className={classes.btn}
                  color="secondary"
                  type="submit"
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </div>
          <br />
          <br />
        </div>
      </form>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

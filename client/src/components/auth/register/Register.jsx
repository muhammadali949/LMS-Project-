import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../../../actions/./authAction/auth';
import PropTypes from 'prop-types';
import Alert from '../../layout/Alert';
import { setAlert } from '../../../actions/alert';
import DatePickers from './DatePickers';
import { makeStyles } from '@material-ui/core';

import SelectUser from './SelectUser';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../register/DatePickers';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    background: '#0EA900',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
});

const Register = ({ setAlert, register }) => {
  const [datepicker, setDatePicker] = useState(new Date());
  const [employee, setEmployee] = useState('');
  const [gender, setGender] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [manager, setManager] = useState('');
  const classes = useStyles();

  console.log(manager);

  const Handlesubmit = (e) => {
    e.preventDefault();
    console.log({
      datepicker,
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
      password2,
      manager,
    });
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      console.log(datepicker);
      register({
        datepicker,
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
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: 'auto',
        marginTop: '2%',
        marginRight: 'auto',
        background: '#fff',
        height: '100%',
      }}
    >
      <h3 style={{ marginTop: '5px' }}>Apply For Leave</h3>
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
          <Grid item xs={6}>
            <label htmlFor="">Employee Code</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Emp Code"
              label="Standard"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="">Gender</label>
            <select
              name="select"
              className="inputstyle"
              placeholder="Enter a Description"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="">Birthdate</label>
            <DatePicker datepicker={datepicker} setDatePicker={setDatePicker} />
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="">First Name</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="First Name"
              label="Standard"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="">Last Name</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Last Name"
              label="Standard"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="">Department</label>
            <select
              name="select"
              className="inputstyle"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option>a</option>
              <option>b</option>
            </select>
          </Grid>{' '}
          <Grid item xs={3}>
            <label htmlFor="">Position</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Add Position"
              label="Standard"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="">Email</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Email"
              label="Standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <SelectUser manager={manager} setManager={setManager} />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="">Address</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Address"
              label="Standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="">Phone No</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Phone No"
              label="Standard"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="">Password</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Password"
              label="Standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="">Confirm Password</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Confirm Password"
              label="Standard"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Alert />
            <Button
              variant="contained"
              className={classes.btn}
              color="secondary"
              onClick={Handlesubmit}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
    // <div className="register-form">
    // 	<h1 className="heading">Add User</h1>
    // 	<p className="lead">
    // 		<i className="fas fa-user"></i> Create An Account
    // 	</p>
    // 	<Alert />
    // 	<br />
    // 	<form className="form">
    // 		<div className="form-group">
    // 			<input
    // 				type="text"
    // 				placeholder="Name"
    // 				name="name"
    // 				value={name}
    // 				onChange={(e) => setName(e.target.value)}
    // 			/>
    // 		</div>
    // 		<div className="form-group">
    // 			<input
    // 				type="email"
    // 				placeholder="Email Address"
    // 				name="email"
    // 				value={email}
    // 				onChange={(e) => setEmail(e.target.value)}
    // 			/>
    // 		</div>
    // 		<div className="form-group">
    // 			<input
    // 				type="password"
    // 				placeholder="Password"
    // 				name="password"
    // 				minLength="6"
    // 				value={password}
    // 				onChange={(e) => setPassword(e.target.value)}
    // 			/>
    // 		</div>
    // 		<div className="form-group">
    // 			<input
    // 				type="password"
    // 				placeholder="Confirm Password"
    // 				name="password2"
    // 				minLength="6"
    // 				value={password2}
    // 				onChange={(e) => setPassword2(e.target.value)}
    // 			/>
    // 		</div>
    // 		<div className="form-group" style={{marginLeft:'252px'}}>
    // 			<DatePickers datepicker={datepicker} setDatePicker={setDatePicker} />
    // 		</div>
    // 		<div className="form-group" style={{marginLeft:'252px',marginTop:'10px'}}>
    // 			<SelectUser manager={manager} setManager={setManager} />
    // 		</div>
    // 		<button  className="btn btn-primary" onClick={Handlesubmit} >Submit</button>
    // 	</form>

    // </div>
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

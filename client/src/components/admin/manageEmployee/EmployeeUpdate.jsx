import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../actions/./authAction/auth';
import PropTypes from 'prop-types';
import Alert from '../../layout/Alert';
import { setAlert } from '../../../actions/alert';
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

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

const EmployeeUpdate = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    datepicker: null,
    department: '',
    address: '',
    email: '',
    employee: '',
    firstname: '',
    gender: '',
    lastname: '',
    manager: '',
    password: '',
    phoneNo: '',
    position: '',
    joinDate: null,
  });
  const params = useParams();
  const navigate = useNavigate();

  const {
    datepicker,
    department,
    address,
    email,
    employee,
    firstname,
    gender,
    lastname,
    manager,
    phoneNo,
    position,
    joinDate,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const [users, setUsers] = useState([]);
  const getAllusers = () => {
    axios.get('http://localhost:5000/users/auth/alluser').then((user) => {
      setUsers(user.data);
    });
  };
  useEffect(() => {
    getAllusers();
  }, []);

  // const [datepicker, setDatePicker] = useState(new Date());
  // const [employee, setEmployee] = useState('');
  // const [gender, setGender] = useState('');
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  // const [department, setDepartment] = useState('');
  // const [position, setPosition] = useState('');
  // const [address, setAddress] = useState('');
  // const [phoneNo, setPhoneNo] = useState('');

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [manager, setManager] = useState('');
  const [user, setUser] = useState({ manager: '' });

  const classes = useStyles();

  const getUser = () => {
    axios.get(`http://localhost:5000/users/auth/${params.id}`).then((res) => {
      setFormData(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(joinDate);

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
      manager,
      joinDate,
    });

    axios
      .patch(`http://localhost:5000/users/${params.id}`, formData, config)
      .then((res) => {
        navigate(-1);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  return (
    <div className={classes.mainContainer}>
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
          <Grid item lg={6} xs={12} md={6}>
            <label htmlFor="">Employee Code</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Emp Code"
              label="Standard"
              value={employee}
              name="employee"
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Gender</label>
            <select
              className="inputstyle"
              value={gender}
              name="gender"
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Birthdate</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={2}>
                <MobileDatePicker
                  name="datepicker"
                  value={datepicker}
                  onChange={(newValue) => {
                    setFormData({ ...formData, datepicker: newValue });
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
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">First Name</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="First Name"
              name="firstname"
              label="Standard"
              value={firstname}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Last Name</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Last Name"
              name="lastname"
              label="Standard"
              value={lastname}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Department</label>
            <select
              name="department"
              className="inputstyle"
              value={department}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option>a</option>
              <option>b</option>
            </select>
          </Grid>{' '}
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Position</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Add Position"
              name="position"
              label="Standard"
              value={position}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} xs={12} md={6}>
            <label htmlFor="">Email</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Email"
              name="email"
              label="Standard"
              value={email}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Manager</label>
            <select
              className="inputstyle"
              value={manager}
              name="manager"
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled hidden>
                Select
              </option>
              {users.map(function (user) {
                return (
                  <option key={user._id} value={user._id} selected={manager}>
                    {user.email}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item lg={3} xs={12} md={3}>
            <label htmlFor="">Join Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={2}>
                <MobileDatePicker
                  name="joinDate"
                  value={joinDate}
                  onChange={(newValue) => {
                    setFormData({ ...formData, joinDate: newValue });
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
          </Grid>
          <Grid item lg={6} xs={12}>
            <label htmlFor="">Address</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Address"
              label="Standard"
              value={address}
              name="address"
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} xs={12} md={6}>
            <label htmlFor="">Phone No</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter Phone No"
              name="phoneNo"
              label="Standard"
              value={phoneNo}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={12}>
            <Alert />
            <Button
              variant="contained"
              className={classes.btn}
              color="secondary"
              onClick={Handlesubmit}
            >
              Update
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

EmployeeUpdate.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(EmployeeUpdate);

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authAction/auth';
import Alert from '../../layout/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(90deg, #2B5876 0%, #4E4376 100%)',
    height: '100vh',
    color: '#fff',
  },
  paper: {
    display: 'flex',
    position: 'fix',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '500px',
    height: '450px',
    [theme.breakpoints.down('md')]: {
      width: '370px',
      height: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '50px',
    },
    /* white */

    background: '#FFFFFF',
    /* drop shadow */

    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px',
  },
  centerUpperGrid: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          {/* <h1>Welcome To</h1> */}

          <Grid item xs={12}>
            <p
              style={{
                fontSize: '30px',
                paddingLeft: '115px',
                paddingTop: '30px',
              }}
            >
              Logo Here
            </p>
          </Grid>

          <Grid
            container
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
          >
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <div className={classes.centerUpperGrid}>
                <p style={{ fontSize: '30px' }}>Welcome To</p>
                <p style={{ fontSize: '30px', fontWeight: 'bold' }}>
                  Leave Management System
                </p>
                <p>Login To Access Your Account</p>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <div className="circle">
                <AccountCircleIcon
                  style={{
                    fontSize: '50px',
                    color: '#4E4376',
                  }}
                />
              </div>
              <Paper className={classes.paper}>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div>
                    <input
                      style={{ padding: '10px' }}
                      className="main"
                      type="email"
                      placeholder="email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div>
                    <br />
                    <input
                      style={{ padding: '10px' }}
                      className="main"
                      type="password"
                      placeholder="Password"
                      name="password"
                      minLength="6"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <br />
                  <Alert />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <input
                      type="submit"
                      className="btnTwo"
                      style={{ color: '#fff' }}
                      value="Login"
                    />
                  </div>
                </form>{' '}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/* <div className="main"> */}
      {/* <h1 className="heading">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <Alert />
        <br />
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn" value="Login" />
        </form> */}
      {/* </div> */}
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

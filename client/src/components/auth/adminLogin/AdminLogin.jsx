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
import '../login/Login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #2B5876 0%, #4E4376 100%)',
    height: '100vh',
    color: '#fff',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '568px',
    height: '500px',

    /* white */

    background: '#FFFFFF',
    /* drop shadow */

    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px',
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

          <Grid
            item
            xs={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <h1>Logo Here</h1>

            <h1>Welcome To</h1>
            <br />
            <h1>Leave Management System</h1>
            <br />
            <p>Login To Access Your Account</p>
          </Grid>
          <Grid item xs={6}>
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

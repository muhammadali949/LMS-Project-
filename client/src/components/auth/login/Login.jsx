import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authAction/auth';
import Alert from '../../layout/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
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
  smMain: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '50px',
    },
  },
}));

const Login = ({ login, isAuthenticated, role }) => {
  const classes = useStyles();
  const alert = useSelector((state) => state.alert);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      if (alert?.length === 0) {
        let email = values.email;
        let password = values.password;
        login(email, password);
      }
    },
  });

  // Redirect if logged in

  if (isAuthenticated) {
    if (role === 'admin') {
      return <Navigate to="/admindashboard" />;
    } else {
      return <Navigate to="/myprofile" />;
    }
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
            <Grid item xs={9.3} lg={5} md={5} sm={5}>
              <div>
                <p className="paragraph-Style">Welcome To</p>

                <p className="paragraph-Style" style={{ fontWeight: 'bold' }}>
                  Leave Management System
                </p>
                <br />
                <p>Login To Access Your Account</p>
              </div>
            </Grid>
            <Grid item xs={9.3} lg={5} md={5} sm={5}>
              <Grid>
                <div className="circle">
                  <AccountCircleIcon
                    style={{
                      fontSize: '50px',
                      color: '#4E4376',
                    }}
                  />
                </div>
              </Grid>
              <Grid>
                <Paper className={classes.paper}>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <input
                        style={{ padding: '10px' }}
                        type="email"
                        placeholder="Email"
                        name="email"
                        className={
                          formik.touched.email && formik.errors.email
                            ? 'mainTwo'
                            : 'main'
                        }
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <br />
                      <input
                        style={{ padding: '10px' }}
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        className={
                          formik.touched.password && formik.errors.password
                            ? 'mainTwo'
                            : 'main'
                        }
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }}>
                          {formik.errors.password}
                        </div>
                      ) : null}
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
                        className="btnTwo"
                        style={{ color: '#fff' }}
                        value="Login"
                        type="submit"
                      />
                    </div>
                  </form>{' '}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { login })(Login);

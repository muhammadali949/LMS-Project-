import React, { useEffect } from 'react';
import Alert from '../../layout/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, updatepassword } from '../../../actions/./authAction/auth';
import store from '../../../store';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './UpdatePassword.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    background: '#F5F5F5',
    marginTop: '0.5%',
  },
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
}));
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);
  const classes = useStyles();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const _id = auth?.user?._id;
  const role = auth?.user?.role;
  const email = auth?.user?.email;

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(6, 'Current password should be 6 digit or more')
        .required('Current password is required'),
      password: Yup.string()
        .min(6, 'Password should be 6 digit or more')
        .required('Password is required'),
      password2: Yup.string()
        .required('Confirm password is required')
        .min(6, 'Confirm password should be 6 digit or more')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
    }),
    onSubmit: (values) => {
      if (alert?.length === 0) {
        let password = values.password;
        let currentPassword = values.currentPassword;
        dispatch(
          updatepassword({ _id, role, password, currentPassword, email })
        );
      }
    },
  });

  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }} className="title">
          CHANGE PASSWORD
        </h3>
        <div
          style={{
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
            <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="">Current Password</label>
                <input
                  id="standard-basic"
                  label="Standard"
                  name="currentPassword"
                  fullWidth
                  placeholder="Enter Current Password"
                  className={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.currentPassword}
                  type="password"
                />
              </div>
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div style={{ color: 'red' }}>
                  {formik.errors.currentPassword}
                </div>
              ) : null}
              <br />
              <div>
                <label htmlFor="">New Password</label>
                <input
                  id="standard-basic"
                  label="Standard"
                  placeholder="Enter New Password"
                  name="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  fullWidth
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <br />
              <div>
                <label htmlFor="">Confirm Password</label>
                <input
                  id="standard-basic"
                  placeholder="Enter Confirm Password"
                  name="password2"
                  minLength="6"
                  className={
                    formik.touched.password2 && formik.errors.password2
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.password2}
                  label="Standard"
                  type="password"
                  fullWidth
                />
                {formik.touched.password2 && formik.errors.password2 ? (
                  <div style={{ color: 'red' }}>{formik.errors.password2}</div>
                ) : null}
              </div>
              <br />
              <Alert />
              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                type="submit"
                disabled={alert.length > 0 ? true : false}
              >
                Change
              </Button>
            </form>
          </Grid>
          <br />
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alert from '../../layout/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, updatepassword } from '../../../actions/./authAction/auth';
import store from '../../../store';
import { setAlert } from '../../../actions/alert';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './UpdatePassword.css';
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '50vh',
    borderRadius: '0px',
    background: '#F5F5F5',
    marginTop: '0.5%',
  },
  btn: {
    background: '#0EA900',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
});
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const classes = useStyles();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const _id = auth.user._id;
  const role = auth.user.role;
  const email = auth.user.email;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Password do not match', 'danger');
      alert('password do not match');
    } else {
      await dispatch(
        updatepassword({ _id, role, password, currentPassword, email })
      );
      setAlert('update...', 'success');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '90%',
          height: '50vh',
          marginLeft: 'auto',
          marginTop: '2%',
          marginRight: 'auto',
          background: '#fff',
        }}
      >
        <h3 style={{ marginTop: '5px' }}>Change Password</h3>
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
              <label htmlFor="">Current Password</label>
              <input
                id="standard-basic"
                label="Standard"
                fullWidth
                className="inputstyle"
                placeholder="Enter Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                type="password"
              />
              <br />
              <br />
              <label htmlFor="">New Password</label>
              <input
                id="standard-basic"
                label="Standard"
                className="inputstyle"
                placeholder="Enter New Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                fullWidth
              />
              <br />
              <br />
              <label htmlFor="">Confirm Password</label>
              <input
                id="standard-basic"
                className="inputstyle"
                placeholder="Confirm Password"
                minLength="6"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                label="Standard"
                type="password"
                fullWidth
              />
              <br />
              <br />
              <Alert />
              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                onClick={onSubmit}
              >
                Change
              </Button>
            </form>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
